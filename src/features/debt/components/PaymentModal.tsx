import React from 'react';
import { Modal, InputNumber, Button, Typography, Form, message } from 'antd';
import { CreditCardOutlined } from '@ant-design/icons';
import { useThemeColors } from '../../theme/hooks';

const { Title, Text } = Typography;

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  debtName: string;
  remainingAmount: number;
  onPaymentSubmit: (amount: number) => Promise<void>;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  debtName,
  remainingAmount,
  onPaymentSubmit,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);
  const { text } = useThemeColors();

  const formatCurrency = (amount: number) => new Intl.NumberFormat('th-TH').format(amount);

  const handleFinish = async (values: { amount: number }) => {
    const { amount } = values;
    try {
      setLoading(true);
      await onPaymentSubmit(amount);
      message.success('ชำระเงินสำเร็จแล้ว!');
      form.resetFields();
      onClose();
    } catch (err) {
      console.error(err);
      message.error('เกิดข้อผิดพลาดในการชำระเงิน');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <CreditCardOutlined style={{ fontSize: 20, color: '#1890ff' }} />
          <span style={{ color: text.primary }}>ชำระเงิน</span>
        </div>
      }
      open={isOpen}
      onCancel={() => {
        form.resetFields();
        onClose();
      }}
      footer={null}
      centered
      width={480}
      destroyOnClose
    >
      <div style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: 32 }}>
          <Text strong style={{ fontSize: 16, color: text.secondary }}>
            หนี้:
          </Text>
          <Title level={4} style={{ margin: '4px 0 16px 0', color: text.primary }}>
            {debtName}
          </Title>

          <Text strong style={{ fontSize: 16, color: text.secondary }}>
            ยอดคงเหลือ:
          </Text>
          <Title level={3} style={{ margin: 0, color: '#ff6b6b' }}>
            {formatCurrency(remainingAmount)}฿
          </Title>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{ amount: undefined }}
        >
          <Form.Item
            name="amount"
            label={<Text strong style={{ color: text.primary }}>จำนวนที่จะจ่าย:</Text>}
            rules={[
              { required: true, message: 'กรุณากรอกจำนวนเงิน' },
              {
                validator: (_, value) => {
                  if (!value || value <= 0)
                    return Promise.reject('จำนวนเงินต้องมากกว่า 0');
                  if (value > remainingAmount)
                    return Promise.reject('จำนวนเงินไม่สามารถเกินยอดคงเหลือได้');
                  return Promise.resolve();
                },
              },
            ]}
          >
            <InputNumber
              size="large"
              min={0}
              step={10}
              style={{
                width: '100%',
                fontSize: 18,
                textAlign: 'center',
                fontWeight: 'bold',
                borderRadius: 8,
              }}
              placeholder="กรอกจำนวนเงิน"
              addonAfter="฿"
            />
          </Form.Item>

          {/* Summary */}
          {form.getFieldValue('amount') &&
            form.getFieldValue('amount') > 0 &&
            form.getFieldValue('amount') <= remainingAmount && (
              <div
                style={{
                  marginBottom: 24,
                  padding: 16,
                  backgroundColor: '#f6ffed',
                  border: '1px solid #b7eb8f',
                  borderRadius: 8,
                }}
              >
                <Text strong style={{ color: '#52c41a' }}>
                  ยอดคงเหลือหลังชำระ:
                </Text>
                <Text
                  style={{
                    display: 'block',
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: '#52c41a',
                  }}
                >
                  {formatCurrency(
                    remainingAmount - (form.getFieldValue('amount') || 0)
                  )}
                  ฿
                </Text>
              </div>
            )}

          <Button
            type="primary"
            size="large"
            htmlType="submit"
            loading={loading}
            style={{
              width: '100%',
              height: 48,
              fontSize: 16,
              fontWeight: 'bold',
              borderRadius: 8,
              backgroundColor: '#52c41a',
              borderColor: '#52c41a',
            }}
          >
            {loading ? 'กำลังประมวลผล...' : 'ยืนยันการจ่าย'}
          </Button>
        </Form>
      </div>
    </Modal>
  );
};

export default PaymentModal;
