// Add Debt Modal component

import React, { useState } from 'react';
import { Modal, Input, Button, Select, DatePicker, Typography, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title, Text } = Typography;
const { Option } = Select;

interface AddDebtModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (debtData: DebtFormData) => void;
}

export interface DebtFormData {
    name: string;
    creditor: string;
    totalAmount: number;
    dueDate: string;
    category: string;
}

interface FormErrors {
    name?: string;
    creditor?: string;
    totalAmount?: string;
    dueDate?: string;
    category?: string;
}

const debtCategories = [
    { value: 'credit_card', label: 'บัตรเครดิต' },
    { value: 'loan', label: 'กู้ยืม' },
    { value: 'mortgage', label: 'สินเชื่อบ้าน' },
    { value: 'car_loan', label: 'สินเชื่อรถยนต์' },
    { value: 'personal_loan', label: 'สินเชื่อส่วนบุคคล' },
    { value: 'other', label: 'อื่นๆ' },
];

const AddDebtModal: React.FC<AddDebtModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
}) => {
    const [formData, setFormData] = useState<DebtFormData>({
        name: '',
        creditor: '',
        totalAmount: 0,
        dueDate: '',
        category: '',
    });

    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (field: keyof DebtFormData, value: string | number) => {
        setFormData(prev => ({
            ...prev,
            [field]: value,
        }));

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: undefined,
            }));
        }
    };

    const validateForm = (): boolean => {
        const newErrors: FormErrors = {};

        if (!formData.name.trim()) {
            newErrors.name = 'กรุณาใส่ชื่อหนี้';
        }

        if (!formData.creditor.trim()) {
            newErrors.creditor = 'กรุณาใส่ชื่อเจ้าหนี้';
        }

        if (!formData.totalAmount || formData.totalAmount <= 0) {
            newErrors.totalAmount = 'กรุณาใส่ยอดเงินที่ถูกต้อง';
        }

        if (!formData.dueDate) {
            newErrors.dueDate = 'กรุณาเลือกวันครบกำหนด';
        }

        if (!formData.category) {
            newErrors.category = 'กรุณาเลือกหมวดหมู่';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            await onSubmit(formData);
            message.success('เพิ่มหนี้สำเร็จแล้ว!');
            handleClose();
        } catch (error) {
            console.error('Error submitting debt:', error);
            message.error('เกิดข้อผิดพลาดในการเพิ่มหนี้');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleClose = () => {
        setFormData({
            name: '',
            creditor: '',
            totalAmount: 0,
            dueDate: '',
            category: '',
        });
        setErrors({});
        setIsSubmitting(false);
        onClose();
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('th-TH').format(amount);
    };

    return (
        <Modal
            title={
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <PlusOutlined style={{ fontSize: '20px', color: '#1890ff' }} />
                    <span>เพิ่มหนี้ใหม่</span>
                </div>
            }
            open={isOpen}
            onCancel={handleClose}
            footer={null}
            width={600}
            centered
            destroyOnClose
            styles={{
                body: { padding: '24px' },
                header: { borderBottom: '1px solid #f0f0f0', marginBottom: '24px' }
            }}
        >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* ชื่อหนี้ */}
                <div>
                    <Text strong style={{ fontSize: '16px', color: '#262626', display: 'block', marginBottom: '8px' }}>
                        ชื่อหนี้ <span style={{ color: '#ff4d4f' }}>*</span>
                    </Text>
                    <Input
                        size="large"
                        placeholder="เช่น บัตรเครดิต SCB, กู้รถยนต์"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        status={errors.name ? 'error' : ''}
                        style={{ borderRadius: '8px' }}
                    />
                    {errors.name && (
                        <Text type="danger" style={{ fontSize: '14px', marginTop: '4px', display: 'block' }}>
                            {errors.name}
                        </Text>
                    )}
                </div>

                {/* เจ้าหนี้ */}
                <div>
                    <Text strong style={{ fontSize: '16px', color: '#262626', display: 'block', marginBottom: '8px' }}>
                        เจ้าหนี้ <span style={{ color: '#ff4d4f' }}>*</span>
                    </Text>
                    <Input
                        size="large"
                        placeholder="เช่น ธนาคารไทยพาณิชย์, บริษัท ABC"
                        value={formData.creditor}
                        onChange={(e) => handleInputChange('creditor', e.target.value)}
                        status={errors.creditor ? 'error' : ''}
                        style={{ borderRadius: '8px' }}
                    />
                    {errors.creditor && (
                        <Text type="danger" style={{ fontSize: '14px', marginTop: '4px', display: 'block' }}>
                            {errors.creditor}
                        </Text>
                    )}
                </div>

                {/* ยอดทั้งหมด */}
                <div>
                    <Text strong style={{ fontSize: '16px', color: '#262626', display: 'block', marginBottom: '8px' }}>
                        ยอดทั้งหมด <span style={{ color: '#ff4d4f' }}>*</span>
                    </Text>
                    <Input
                        size="large"
                        type="number"
                        placeholder="0"
                        value={formData.totalAmount || ''}
                        onChange={(e) => handleInputChange('totalAmount', parseFloat(e.target.value) || 0)}
                        suffix="฿"
                        min={0}
                        step={0.01}
                        status={errors.totalAmount ? 'error' : ''}
                        style={{ borderRadius: '8px' }}
                    />
                    {errors.totalAmount && (
                        <Text type="danger" style={{ fontSize: '14px', marginTop: '4px', display: 'block' }}>
                            {errors.totalAmount}
                        </Text>
                    )}
                    {formData.totalAmount > 0 && (
                        <Text style={{ fontSize: '14px', marginTop: '4px', display: 'block', color: '#52c41a' }}>
                            จำนวน: {formatCurrency(formData.totalAmount)} บาท
                        </Text>
                    )}
                </div>

                {/* วันครบกำหนด */}
                <div>
                    <Text strong style={{ fontSize: '16px', color: '#262626', display: 'block', marginBottom: '8px' }}>
                        วันครบกำหนด <span style={{ color: '#ff4d4f' }}>*</span>
                    </Text>
                    <DatePicker
                        size="large"
                        placeholder="เลือกวันครบกำหนด"
                        value={formData.dueDate ? dayjs(formData.dueDate) : null}
                        onChange={(date) => handleInputChange('dueDate', date ? date.format('YYYY-MM-DD') : '')}
                        disabledDate={(current) => current && current < dayjs().startOf('day')}
                        format="DD/MM/YYYY"
                        status={errors.dueDate ? 'error' : ''}
                        style={{ width: '100%', borderRadius: '8px' }}
                    />
                    {errors.dueDate && (
                        <Text type="danger" style={{ fontSize: '14px', marginTop: '4px', display: 'block' }}>
                            {errors.dueDate}
                        </Text>
                    )}
                </div>

                {/* หมวดหมู่ */}
                <div>
                    <Text strong style={{ fontSize: '16px', color: '#262626', display: 'block', marginBottom: '8px' }}>
                        หมวดหมู่ <span style={{ color: '#ff4d4f' }}>*</span>
                    </Text>
                    <Select
                        size="large"
                        placeholder="เลือกหมวดหมู่"
                        value={formData.category || undefined}
                        onChange={(value) => handleInputChange('category', value)}
                        status={errors.category ? 'error' : ''}
                        style={{ width: '100%', borderRadius: '8px' }}
                    >
                        {debtCategories.map((category) => (
                            <Option key={category.value} value={category.value}>
                                {category.label}
                            </Option>
                        ))}
                    </Select>
                    {errors.category && (
                        <Text type="danger" style={{ fontSize: '14px', marginTop: '4px', display: 'block' }}>
                            {errors.category}
                        </Text>
                    )}
                </div>

                {/* ปุ่มบันทึก */}
                <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
                    <Button
                        size="large"
                        onClick={handleClose}
                        disabled={isSubmitting}
                        style={{
                            flex: 1,
                            height: '48px',
                            fontSize: '16px',
                            borderRadius: '8px'
                        }}
                    >
                        ยกเลิก
                    </Button>
                    <Button
                        type="primary"
                        size="large"
                        loading={isSubmitting}
                        onClick={handleSubmit}
                        style={{
                            flex: 1,
                            height: '48px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            borderRadius: '8px',
                            backgroundColor: '#1890ff',
                            borderColor: '#1890ff'
                        }}
                    >
                        {isSubmitting ? 'กำลังบันทึก...' : 'บันทึก'}
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default AddDebtModal;