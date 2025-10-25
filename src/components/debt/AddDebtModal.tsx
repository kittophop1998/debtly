// Add Debt Modal component

import React, { useState } from 'react';
import { Button, Input, Modal } from '../ui';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit(formData);
      handleClose();
    } catch (error) {
      console.error('Error submitting debt:', error);
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

  // Format today's date for min attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="เพิ่มหนี้ใหม่"
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ชื่อหนี้ */}
        <div>
          <Input
            label="ชื่อหนี้"
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="เช่น บัตรเครดิต SCB, กู้รถยนต์"
            error={errors.name}
          />
        </div>

        {/* เจ้าหนี้ */}
        <div>
          <Input
            label="เจ้าหนี้"
            type="text"
            value={formData.creditor}
            onChange={(e) => handleInputChange('creditor', e.target.value)}
            placeholder="เช่น ธนาคารไทยพาณิชย์, บริษัท ABC"
            error={errors.creditor}
          />
        </div>

        {/* ยอดทั้งหมด */}
        <div>
          <Input
            label="ยอดทั้งหมด (บาท)"
            type="number"
            value={formData.totalAmount || ''}
            onChange={(e) => handleInputChange('totalAmount', parseFloat(e.target.value) || 0)}
            placeholder="0"
            min="0"
            step="0.01"
            error={errors.totalAmount}
          />
        </div>

        {/* วันครบกำหนด */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            วันครบกำหนด
          </label>
          <input
            type="date"
            value={formData.dueDate}
            onChange={(e) => handleInputChange('dueDate', e.target.value)}
            min={today}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
              errors.dueDate ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
            }`}
          />
          {errors.dueDate && (
            <p className="mt-1 text-sm text-red-600">
              {errors.dueDate}
            </p>
          )}
        </div>

        {/* หมวดหมู่ */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            หมวดหมู่
          </label>
          <select
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 ${
              errors.category ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">-- เลือกหมวดหมู่ --</option>
            {debtCategories.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">
              {errors.category}
            </p>
          )}
        </div>

        {/* ปุ่มบันทึก */}
        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={handleClose}
            disabled={isSubmitting}
            className="flex-1"
          >
            ยกเลิก
          </Button>
          <Button
            type="submit"
            variant="primary"
            size="lg"
            loading={isSubmitting}
            className="flex-1"
          >
            บันทึก
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddDebtModal;