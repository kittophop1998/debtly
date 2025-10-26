'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  Card,
  Row,
  Col,
  Typography,
  Space,
  Statistic,
  message,
} from 'antd';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';
import { PlusOutlined, CreditCardOutlined, CarOutlined } from '@ant-design/icons';
import { useAuthContext } from '../../src/components/auth/AuthProvider';
import ProtectedRoute from '../../src/components/auth/ProtectedRoute';
import Header from '../../src/components/layout/Header';
import { useThemeUtils } from '../../src/theme/hooks';
import { AddDebtModal, DebtFormData, PaymentModal } from '../../src/components/debt';

const { Title, Text } = Typography;

// Mock data for debts
const mockDebts = [
  {
    id: '1',
    name: 'กู้รถยนต์',
    amount: 60000,
    type: 'loan',
    color: '#ff6b6b',
    icon: <CarOutlined />
  },
  {
    id: '2',
    name: 'บัตรเครดิต SCB',
    amount: 20000,
    type: 'credit',
    color: '#4ecdc4',
    icon: <CreditCardOutlined />
  }
];

const mockSummary = {
  total: 120000,
  paid: 40000,
  remaining: 80000
};

const DashboardPage: React.FC = () => {
  const { user } = useAuthContext();
  const { t } = useTranslation('common');
  const { colors, spacing } = useThemeUtils();
  const [isAddDebtModalOpen, setIsAddDebtModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedDebt, setSelectedDebt] = useState<any>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('th-TH').format(amount);
  };

  const pieData = mockDebts.map(debt => ({
    name: debt.name,
    value: debt.amount,
    color: debt.color
  }));

  const handlePayNow = (debtId: string) => {
    const debt = mockDebts.find(d => d.id === debtId);
    if (debt) {
      setSelectedDebt(debt);
      setIsPaymentModalOpen(true);
    }
  };

  const handleAddDebt = () => {
    setIsAddDebtModalOpen(true);
  };

  const handleAddDebtSubmit = async (debtData: DebtFormData) => {
    try {
      // TODO: Implement actual API call to save debt
      console.log('Saving debt:', debtData);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      message.success('เพิ่มหนี้สำเร็จแล้ว!');
      setIsAddDebtModalOpen(false);

      // TODO: Refresh debt list
    } catch (error) {
      console.error('Error adding debt:', error);
      message.error('เกิดข้อผิดพลาดในการเพิ่มหนี้');
    }
  };

  const handlePaymentSubmit = async (amount: number) => {
    try {
      // TODO: Implement actual API call to process payment
      console.log('Processing payment:', { debtId: selectedDebt?.id, amount });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // TODO: Update debt amount in state/database
      // For now, just log the transaction
      console.log(`Payment of ${amount}฿ processed for debt: ${selectedDebt?.name}`);

    } catch (error) {
      console.error('Payment processing error:', error);
      throw error;
    }
  };

  const handleViewDetails = (debtId: string) => {
    console.log('View debt details:', debtId);
    // TODO: Navigate to debt details page
  };

  return (
    <ProtectedRoute>
      <div style={{ minHeight: '100vh', backgroundColor: colors.bg.base }}>
        {/* Header */}
        <Header />

        {/* Main Content */}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: `0 ${spacing.spacing[4]}px ${spacing.spacing[8]}px`,
          animation: 'fadeIn 0.6s ease-in-out'
        }}>

          {/* Dashboard Header with Add Debt Button */}
          <div
            className="dashboard-header"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: spacing.spacing[6],
              padding: `${spacing.spacing[4]}px 0`,
              borderBottom: `2px solid ${colors.colors.primary[100]}`
            }}>
            <div>
              <Title
                level={2}
                style={{
                  margin: 0,
                  color: colors.colors.primary[600],
                  fontSize: '28px',
                  fontWeight: 'bold'
                }}
              >
                ภาพรวมหนี้ของคุณ
              </Title>
              <Text style={{
                color: colors.colors.neutral[500],
                fontSize: '16px',
                marginTop: '4px',
                display: 'block'
              }}>
                จัดการและติดตามหนี้สินของคุณ
              </Text>
            </div>
            <Button
              type="primary"
              size="large"
              icon={<PlusOutlined />}
              onClick={handleAddDebt}
              className="add-debt-button"
              style={{
                backgroundColor: colors.colors.primary[500],
                borderColor: colors.colors.primary[500],
                borderRadius: '12px',
                fontWeight: 'bold',
                fontSize: '16px',
                height: '48px',
                padding: '0 24px',
                boxShadow: `0 4px 12px ${colors.colors.primary[200]}`,
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.3s ease-in-out'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 6px 16px ${colors.colors.primary[300]}`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `0 4px 12px ${colors.colors.primary[200]}`;
              }}
            >
              เพิ่มหนี้
            </Button>
          </div>

          <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes slideIn {
            from {
              opacity: 0;
              transform: translateX(-20px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }

          @media (max-width: 768px) {
            .dashboard-header {
              flex-direction: column !important;
              align-items: flex-start !important;
              gap: 16px !important;
            }
            
            .add-debt-button {
              width: 100% !important;
              justify-content: center !important;
            }
            
            .debt-card-content {
              flex-direction: column;
              text-align: center;
              gap: 16px !important;
            }
            
            .debt-info {
              align-items: center !important;
            }
            
            .debt-amount {
              font-size: 18px !important;
            }
            
            .debt-actions {
              width: 100% !important;
              justify-content: center !important;
            }
            
            .pay-button, .details-button {
              flex: 1;
              min-width: 120px;
            }
          }

          @media (max-width: 480px) {
            .debt-actions {
              flex-direction: column !important;
              width: 100% !important;
            }
            
            .pay-button, .details-button {
              width: 100% !important;
            }
          }
        `}</style>

          {/* Summary Cards */}
          <Row gutter={[16, 16]} style={{ marginBottom: spacing.spacing[6] }}>
            <Col xs={24} sm={8}>
              <Card
                style={{
                  background: 'linear-gradient(135deg, #ff6b6b 0%, #ff8a80 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(255, 107, 107, 0.3)',
                  animation: 'slideIn 0.6s ease-in-out 0.1s both',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease-in-out'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Statistic
                  title={
                    <span style={{ color: 'white', fontSize: '16px', fontWeight: 'bold' }}>
                      {t('dashboard.totalDebt')}
                    </span>
                  }
                  value={mockSummary.total}
                  suffix={
                    <span style={{ color: 'white' }}>
                      {t('dashboard.baht')}
                    </span>
                  }
                  valueStyle={{
                    color: 'white',
                    fontSize: '28px',
                    fontWeight: 'bold'
                  }}
                  formatter={(value) => formatCurrency(Number(value))}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card
                style={{
                  background: 'linear-gradient(135deg, #4ecdc4 0%, #6bcf7f 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(78, 205, 196, 0.3)',
                  animation: 'slideIn 0.6s ease-in-out 0.2s both',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease-in-out'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Statistic
                  title={
                    <span style={{ color: 'white', fontSize: '16px', fontWeight: 'bold' }}>
                      {t('dashboard.paidAmount')}
                    </span>
                  }
                  value={mockSummary.paid}
                  suffix={
                    <span style={{ color: 'white' }}>
                      {t('dashboard.baht')}
                    </span>
                  }
                  valueStyle={{
                    color: 'white',
                    fontSize: '28px',
                    fontWeight: 'bold'
                  }}
                  formatter={(value) => formatCurrency(Number(value))}
                />
              </Card>
            </Col>
            <Col xs={24} sm={8}>
              <Card
                style={{
                  background: 'linear-gradient(135deg, #f7971e 0%, #ffd200 100%)',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(247, 151, 30, 0.3)',
                  animation: 'slideIn 0.6s ease-in-out 0.3s both',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease-in-out'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Statistic
                  title={
                    <span style={{ color: 'white', fontSize: '16px', fontWeight: 'bold' }}>
                      {t('dashboard.remainingAmount')}
                    </span>
                  }
                  value={mockSummary.remaining}
                  suffix={
                    <span style={{ color: 'white' }}>
                      {t('dashboard.baht')}
                    </span>
                  }
                  valueStyle={{
                    color: 'white',
                    fontSize: '28px',
                    fontWeight: 'bold'
                  }}
                  formatter={(value) => formatCurrency(Number(value))}
                />
              </Card>
            </Col>
          </Row>

          {/* Pie Chart Section */}
          <Card
            title={
              <Title level={3} style={{ margin: 0, color: colors.colors.primary[600] }}>
                {t('dashboard.debtSummary')}
              </Title>
            }
            style={{
              marginBottom: spacing.spacing[6],
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              animation: 'fadeIn 0.8s ease-in-out 0.4s both'
            }}
          >
            <div style={{ height: '350px', width: '100%' }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }: any) => `${name}: ${formatCurrency(value)}฿`}
                    outerRadius={100}
                    innerRadius={40}
                    fill="#8884d8"
                    dataKey="value"
                    stroke="#fff"
                    strokeWidth={3}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: any) => [`${formatCurrency(Number(value))}฿`, 'จำนวน']}
                    contentStyle={{
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                    }}
                  />
                  <Legend
                    wrapperStyle={{
                      paddingTop: '20px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Debt List Section */}
          <Card
            title={
              <Title level={3} style={{ margin: 0, color: colors.colors.primary[600] }}>
                รายการหนี้:
              </Title>
            }
            style={{
              borderRadius: '12px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
              animation: 'fadeIn 0.8s ease-in-out 0.6s both'
            }}
          >
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              {mockDebts.map((debt) => (
                <Card
                  key={debt.id}
                  size="small"
                  style={{
                    border: `2px solid ${debt.color}`,
                    borderRadius: '12px',
                    background: `linear-gradient(135deg, ${debt.color}10 0%, ${debt.color}05 100%)`,
                    boxShadow: `0 2px 8px ${debt.color}30`,
                    transition: 'all 0.3s ease-in-out'
                  }}
                  bodyStyle={{ padding: '20px 24px' }}
                  hoverable
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = `0 4px 16px ${debt.color}40`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = `0 2px 8px ${debt.color}30`;
                  }}
                >
                  <div
                    className="debt-card-content"
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '16px'
                    }}
                  >
                    <div className="debt-info" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <div style={{
                        width: '50px',
                        height: '50px',
                        backgroundColor: debt.color,
                        borderRadius: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '20px',
                        color: 'white'
                      }}>
                        {debt.icon}
                      </div>
                      <div>
                        <Text strong style={{
                          fontSize: '18px',
                          display: 'block',
                          marginBottom: '4px',
                          color: colors.colors.neutral[800]
                        }}>
                          {debt.name}
                        </Text>
                        <Text
                          className="debt-amount"
                          style={{
                            fontSize: '22px',
                            color: debt.color,
                            fontWeight: 'bold'
                          }}
                        >
                          {formatCurrency(debt.amount)}{t('dashboard.baht')}
                        </Text>
                      </div>
                    </div>
                    <div className="debt-actions" style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <Button
                        type="primary"
                        size="large"
                        className="pay-button"
                        onClick={() => handlePayNow(debt.id)}
                        style={{
                          backgroundColor: debt.color,
                          borderColor: debt.color,
                          fontWeight: 'bold',
                          borderRadius: '8px',
                          boxShadow: `0 2px 4px ${debt.color}40`,
                          padding: '8px 20px',
                          height: 'auto',
                          fontSize: '14px'
                        }}
                      >
                        จ่าย
                      </Button>
                      <Button
                        type="default"
                        size="large"
                        className="details-button"
                        onClick={() => handleViewDetails(debt.id)}
                        style={{
                          borderColor: debt.color,
                          color: debt.color,
                          fontWeight: 'bold',
                          borderRadius: '8px',
                          padding: '8px 16px',
                          height: 'auto',
                          fontSize: '14px',
                          background: 'white'
                        }}
                      >
                        ดูรายละเอียด
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </Space>
          </Card>
        </div>

        {/* Add Debt Modal */}
        <AddDebtModal
          isOpen={isAddDebtModalOpen}
          onClose={() => setIsAddDebtModalOpen(false)}
          onSubmit={handleAddDebtSubmit}
        />

        {/* Payment Modal */}
        {selectedDebt && (
          <PaymentModal
            isOpen={isPaymentModalOpen}
            onClose={() => {
              setIsPaymentModalOpen(false);
              setSelectedDebt(null);
            }}
            debtName={selectedDebt.name}
            remainingAmount={selectedDebt.amount}
            onPaymentSubmit={handlePaymentSubmit}
          />
        )}
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;