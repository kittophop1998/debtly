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
} from 'antd';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  Legend,
  Tooltip
} from 'recharts';
import { useAuthContext } from '../../src/components/auth/AuthProvider';
import ProtectedRoute from '../../src/components/auth/ProtectedRoute';
import Header from '../../src/components/layout/Header';
import { useThemeUtils } from '../../src/theme/hooks';

const { Title, Text } = Typography;

// Mock data for debts
const mockDebts = [
  {
    id: '1',
    name: 'Home Loan',
    amount: 80000,
    type: 'loan',
    color: '#ff6b6b'
  },
  {
    id: '2', 
    name: 'บัตรเครดิต SCB',
    amount: 20000,
    type: 'credit',
    color: '#4ecdc4'
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('th-TH').format(amount);
  };

  const pieData = mockDebts.map(debt => ({
    name: debt.name,
    value: debt.amount,
    color: debt.color
  }));

  const handlePayNow = (debtId: string) => {
    console.log('Pay debt:', debtId);
    // TODO: Implement payment logic
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
            .debt-card-content {
              flex-direction: column;
              text-align: center;
              gap: 12px !important;
            }
            
            .debt-amount {
              font-size: 18px !important;
            }
            
            .pay-button {
              width: 100%;
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
                    label={({name, value}: any) => `${name}: ${formatCurrency(value)}฿`}
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

          {/* Recent Debts Section */}
          <Card
            title={
              <Title level={3} style={{ margin: 0, color: colors.colors.primary[600] }}>
                {t('dashboard.recentDebts')}:
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
                    boxShadow: `0 2px 8px ${debt.color}30`
                  }}
                  bodyStyle={{ padding: '16px 20px' }}
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
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '8px',
                        height: '40px',
                        backgroundColor: debt.color,
                        borderRadius: '4px'
                      }} />
                      <div>
                        <Text strong style={{ 
                          fontSize: '18px', 
                          display: 'block',
                          marginBottom: '4px'
                        }}>
                          {debt.name}
                        </Text>
                        <Text 
                          className="debt-amount"
                          style={{ 
                            fontSize: '20px', 
                            color: debt.color, 
                            fontWeight: 'bold'
                          }}
                        >
                          {formatCurrency(debt.amount)}{t('dashboard.baht')}
                        </Text>
                      </div>
                    </div>
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
                        padding: '8px 24px',
                        height: 'auto'
                      }}
                    >
                      [{t('dashboard.payNow')}]
                    </Button>
                  </div>
                </Card>
              ))}
            </Space>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default DashboardPage;