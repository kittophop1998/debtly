import React, { useState } from 'react';
import { Modal, Input, Button, Typography, message } from 'antd';
import { CreditCardOutlined } from '@ant-design/icons';

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
  onPaymentSubmit
}) => {
  const [paymentAmount, setPaymentAmount] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('th-TH').format(amount);
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Only allow numbers and decimal point
    if (/^\d*\.?\d*$/.test(value)) {
      setPaymentAmount(value);
    }
  };

  const handleSubmit = async () => {
    const amount = parseFloat(paymentAmount);

    if (!paymentAmount || amount <= 0) {
      message.error('กรุณากรอกจำนวนเงินที่ถูกต้อง');
      return;
    }

    if (amount > remainingAmount) {
      message.error('จำนวนเงินที่จ่ายไม่สามารถเกินยอดคงเหลือได้');
      return;
    }

    try {
      setLoading(true);
      await onPaymentSubmit(amount);
      setPaymentAmount('');
      onClose();
      message.success('ชำระเงินสำเร็จแล้ว!');
    } catch (error) {
      console.error('Payment error:', error);
      message.error('เกิดข้อผิดพลาดในการชำระเงิน');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setPaymentAmount('');
    onClose();
  };

  return (
    <Modal
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <CreditCardOutlined style={{ fontSize: '20px', color: '#1890ff' }} />
          <span>ชำระเงิน</span>
        </div>
      }
      open={isOpen}
      onCancel={handleClose}
      footer={null}
      width={480}
      centered
      destroyOnClose
      styles={{
        body: { padding: '24px' },
        header: { borderBottom: '1px solid #f0f0f0', marginBottom: '24px' }
      }}
    >
      <div style={{ textAlign: 'center' }}>
        {/* Debt Information */}
        <div style={{ marginBottom: '32px' }}>
          <Text strong style={{ fontSize: '16px', color: '#595959', display: 'block', marginBottom: '8px' }}>
            หนี้:
          </Text>
          <Title level={4} style={{ margin: '0 0 16px 0', color: '#262626' }}>
            {debtName}
          </Title>

          <Text strong style={{ fontSize: '16px', color: '#595959', display: 'block', marginBottom: '8px' }}>
            ยอดคงเหลือ:
          </Text>
          <Title level={3} style={{ margin: 0, color: '#ff6b6b', fontWeight: 'bold' }}>
            {formatCurrency(remainingAmount)}฿
          </Title>
        </div>

        {/* Payment Amount Input */}
        <div style={{ marginBottom: '32px', textAlign: 'left' }}>
          <Text strong style={{ fontSize: '16px', color: '#262626', display: 'block', marginBottom: '12px' }}>
            จำนวนที่จะจ่าย:
          </Text>
          <Input
            size="large"
            placeholder="กรอกจำนวนเงิน"
            value={paymentAmount}
            onChange={handlePaymentChange}
            suffix="฿"
            style={{
              fontSize: '18px',
              textAlign: 'center',
              fontWeight: 'bold',
              borderRadius: '8px',
              border: '2px solid #d9d9d9',
              padding: '12px 16px'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#1890ff';
              e.target.style.boxShadow = '0 0 0 2px rgba(24, 144, 255, 0.2)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = '#d9d9d9';
              e.target.style.boxShadow = 'none';
            }}
          />
          {paymentAmount && parseFloat(paymentAmount) > remainingAmount && (
            <Text type="danger" style={{ fontSize: '14px', marginTop: '8px', display: 'block' }}>
              จำนวนเงินไม่สามารถเกินยอดคงเหลือได้
            </Text>
          )}
        </div>

        {/* Payment Summary */}
        {paymentAmount && parseFloat(paymentAmount) > 0 && parseFloat(paymentAmount) <= remainingAmount && (
          <div style={{
            marginBottom: '24px',
            padding: '16px',
            backgroundColor: '#f6ffed',
            border: '1px solid #b7eb8f',
            borderRadius: '8px'
          }}>
            <Text strong style={{ color: '#52c41a', display: 'block', marginBottom: '8px' }}>
              ยอดคงเหลือหลังชำระ:
            </Text>
            <Text style={{ fontSize: '20px', fontWeight: 'bold', color: '#52c41a' }}>
              {formatCurrency(remainingAmount - parseFloat(paymentAmount))}฿
            </Text>
          </div>
        )}

        {/* Submit Button */}
        <Button
          type="primary"
          size="large"
          loading={loading}
          onClick={handleSubmit}
          disabled={!paymentAmount || parseFloat(paymentAmount) <= 0 || parseFloat(paymentAmount) > remainingAmount}
          style={{
            width: '100%',
            height: '48px',
            fontSize: '16px',
            fontWeight: 'bold',
            borderRadius: '8px',
            backgroundColor: '#52c41a',
            borderColor: '#52c41a'
          }}
        >
          {loading ? 'กำลังประมวลผล...' : 'ยืนยันการจ่าย'}
        </Button>
      </div>
    </Modal>
  );
};

export default PaymentModal;