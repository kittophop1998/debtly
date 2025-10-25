'use client';

import React from 'react';
import { Card, Typography, Row, Col, Space } from 'antd';
import { colors } from '@/theme';

const { Title, Text } = Typography;

interface ColorSwatchProps {
  color: string;
  name: string;
  hex: string;
  description?: string;
}

const ColorSwatch: React.FC<ColorSwatchProps> = ({ color, name, hex, description }) => (
  <Card 
    size="small" 
    style={{ 
      backgroundColor: color,
      border: `1px solid ${color}`,
      minHeight: 120,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end'
    }}
    bodyStyle={{ 
      background: 'rgba(255, 255, 255, 0.9)', 
      backdropFilter: 'blur(4px)',
      padding: '8px 12px',
      margin: 4,
      borderRadius: 4
    }}
  >
    <Text strong style={{ fontSize: '12px', color: '#0f172a' }}>{name}</Text>
    <Text type="secondary" style={{ fontSize: '10px', color: '#475569' }}>{hex}</Text>
    {description && (
      <Text style={{ fontSize: '10px', color: '#64748b', marginTop: 2 }}>
        {description}
      </Text>
    )}
  </Card>
);

interface ColorPaletteProps {
  title: string;
  colors: Record<string, string>;
  descriptions?: Record<string, string>;
}

const ColorPaletteSection: React.FC<ColorPaletteProps> = ({ title, colors, descriptions = {} }) => (
  <div style={{ marginBottom: 32 }}>
    <Title level={4} style={{ marginBottom: 16, color: colors.primary || '#14b8a6' }}>
      {title}
    </Title>
    <Row gutter={[12, 12]}>
      {Object.entries(colors).map(([shade, color]) => (
        <Col xs={12} sm={8} md={6} lg={4} xl={3} key={shade}>
          <ColorSwatch
            color={color}
            name={shade}
            hex={color}
            description={descriptions[shade]}
          />
        </Col>
      ))}
    </Row>
  </div>
);

export const ColorPalette: React.FC = () => {
  return (
    <div style={{ padding: 24, backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 48, color: '#0f172a' }}>
          WeGoWhere Color Palette
        </Title>
        
        <Text 
          style={{ 
            display: 'block', 
            textAlign: 'center', 
            marginBottom: 48, 
            fontSize: 16,
            color: '#64748b' 
          }}
        >
          โทนสีเขียว/น้ำเงินอ่อน เพื่อสร้างความรู้สึกปลอดภัยและวางใจ
        </Text>

        <ColorPaletteSection
          title="Primary Colors (Teal - ความไว้วางใจ)"
          colors={colors.primary}
          descriptions={{
            '50': 'พื้นหลังอ่อน',
            '100': 'พื้นหลังอ่อนมาก',
            '200': 'เส้นขอบอ่อน',
            '300': 'ข้อความรอง',
            '400': 'ไอคอนรอง',
            '500': 'สีหลัก',
            '600': 'ปุ่มหลัก',
            '700': 'ลิงก์',
            '800': 'ข้อความเข้ม',
            '900': 'ข้อความเข้มมาก'
          }}
        />

        <ColorPaletteSection
          title="Secondary Colors (Light Blue - ความสงบ)"
          colors={colors.secondary}
          descriptions={{
            '50': 'พื้นหลังน้ำเงิน',
            '100': 'การ์ดรอง',
            '200': 'เส้นขอบรอง',
            '300': 'ไฮไลท์',
            '400': 'ลิงก์รอง',
            '500': 'สีรอง',
            '600': 'ปุ่มรอง',
            '700': 'เน้นข้อความ',
            '800': 'หัวข้อรอง',
            '900': 'ข้อความเข้ม'
          }}
        />

        <ColorPaletteSection
          title="Success Colors (Emerald - ความสำเร็จ)"
          colors={colors.success}
          descriptions={{
            '50': 'พื้นหลังสำเร็จ',
            '100': 'การแจ้งเตือนสำเร็จ',
            '200': 'เส้นขอบสำเร็จ',
            '300': 'ไฮไลท์สำเร็จ',
            '400': 'ไอคอนสำเร็จ',
            '500': 'ปุ่มสำเร็จ',
            '600': 'สถานะสำเร็จ',
            '700': 'ข้อความสำเร็จ',
            '800': 'การยืนยัน',
            '900': 'สำเร็จเข้ม'
          }}
        />

        <ColorPaletteSection
          title="Warning Colors (Amber - คำเตือน)"
          colors={colors.warning}
          descriptions={{
            '50': 'พื้นหลังเตือน',
            '100': 'การแจ้งเตือน',
            '200': 'เส้นขอบเตือน',
            '300': 'ไฮไลท์เตือน',
            '400': 'ไอคอนเตือน',
            '500': 'ปุ่มเตือน',
            '600': 'สถานะเตือน',
            '700': 'ข้อความเตือน',
            '800': 'เตือนสำคัญ',
            '900': 'เตือนเข้ม'
          }}
        />

        <ColorPaletteSection
          title="Error Colors (Red - ข้อผิดพลาด)"
          colors={colors.error}
          descriptions={{
            '50': 'พื้นหลังผิดพลาด',
            '100': 'การแจ้งผิดพลาด',
            '200': 'เส้นขอบผิดพลาด',
            '300': 'ไฮไลท์ผิดพลาด',
            '400': 'ไอคอนผิดพลาด',
            '500': 'ปุ่มผิดพลาด',
            '600': 'สถานะผิดพลาด',
            '700': 'ข้อความผิดพลาด',
            '800': 'ผิดพลาดสำคัญ',
            '900': 'ผิดพลาดเข้ม'
          }}
        />

        <ColorPaletteSection
          title="Neutral Colors (Slate - สีกลาง)"
          colors={colors.neutral}
          descriptions={{
            '50': 'พื้นหลังหลัก',
            '100': 'พื้นหลังการ์ด',
            '200': 'เส้นขอบ',
            '300': 'ตัวแบ่ง',
            '400': 'ข้อความรอง',
            '500': 'ข้อความปกติ',
            '600': 'ข้อความเข้ม',
            '700': 'หัวข้อ',
            '800': 'ข้อความสำคัญ',
            '900': 'ข้อความเข้มมาก'
          }}
        />

        <Card style={{ marginTop: 32, background: 'linear-gradient(135deg, #14b8a6 0%, #0ea5e9 100%)' }}>
          <Title level={3} style={{ color: 'white', textAlign: 'center', margin: 0 }}>
            🌊 ความรู้สึกปลอดภัยและวางใจ
          </Title>
          <Text style={{ color: 'rgba(255, 255, 255, 0.9)', display: 'block', textAlign: 'center', marginTop: 8 }}>
            สีเขียวฟ้าและน้ำเงินอ่อนช่วยให้ผู้ใช้รู้สึกมั่นใจและไว้วางใจในแพลตฟอร์ม
          </Text>
        </Card>
      </div>
    </div>
  );
};

export default ColorPalette;