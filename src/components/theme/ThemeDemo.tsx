'use client';

import React from 'react';
import Link from 'next/link';
import {
    Button,
    Card,
    Space,
    Typography,
    Row,
    Col,
    Tag,
    Avatar,
    Divider,
    Flex,
} from 'antd';
import {
    UserOutlined,
    SettingOutlined,
    BellOutlined,
    HomeOutlined,
    ArrowLeftOutlined,
} from '@ant-design/icons';
import { useTheme, ThemeToggle, LocaleToggle } from '../../theme/theme';
import { useThemeUtils } from '../../theme/hooks';

const { Title, Text, Paragraph } = Typography;

const ThemeDemo: React.FC = () => {
    const { themeMode, locale } = useTheme();
    const { colors, typography, spacing } = useThemeUtils();

    const demoCards = [
        {
            title: locale === 'th' ? 'กิจกรรมแนะนำ' : 'Recommended Activities',
            description: locale === 'th'
                ? 'ค้นหากิจกรรมที่น่าสนใจและเหมาะกับคุณ'
                : 'Find interesting activities that suit you',
            icon: <HomeOutlined />,
            color: colors.colors.primary[500],
        },
        {
            title: locale === 'th' ? 'เพื่อนใหม่' : 'New Friends',
            description: locale === 'th'
                ? 'เชื่อมต่อกับเพื่อนใหม่ที่มีความสนใจเดียวกัน'
                : 'Connect with new friends who share your interests',
            icon: <UserOutlined />,
            color: colors.colors.success[500],
        },
        {
            title: locale === 'th' ? 'การแจ้งเตือน' : 'Notifications',
            description: locale === 'th'
                ? 'รับการแจ้งเตือนเกี่ยวกับกิจกรรมที่คุณสนใจ'
                : 'Get notifications about activities you\'re interested in',
            icon: <BellOutlined />,
            color: colors.colors.warning[500],
        },
        {
            title: locale === 'th' ? 'การตั้งค่า' : 'Settings',
            description: locale === 'th'
                ? 'ปรับแต่งประสบการณ์การใช้งานของคุณ'
                : 'Customize your user experience',
            icon: <SettingOutlined />,
            color: colors.colors.error[500],
        },
    ];

    return (
        <div style={{ padding: spacing.spacing[6] }}>
            {/* Header */}
            <Card style={{ marginBottom: spacing.spacing[6] }}>
                <Flex justify="space-between" align="center" wrap="wrap" gap="middle">
                    <div style={{ flex: 1 }}>
                        <Space align="center" style={{ marginBottom: 8 }}>
                            <Link href="/dashboard">
                                <Button
                                    type="text"
                                    icon={<ArrowLeftOutlined />}
                                    style={{ color: colors.colors.primary[600] }}
                                >
                                    {locale === 'th' ? 'กลับหน้าหลัก' : 'Back to Home'}
                                </Button>
                            </Link>
                        </Space>
                        <Title level={2} style={{ margin: 0 }}>
                            {locale === 'th' ? 'ระบบ Theme ของ Debtly' : 'Debtly Theme System'}
                        </Title>
                        <Text type="secondary">
                            {locale === 'th'
                                ? `กำลังใช้โหมด: ${themeMode === 'light' ? 'สว่าง' : 'มืด'} | ภาษา: ${locale === 'th' ? 'ไทย' : 'อังกฤษ'}`
                                : `Current mode: ${themeMode === 'light' ? 'Light' : 'Dark'} | Language: ${locale === 'en' ? 'English' : 'Thai'}`
                            }
                        </Text>
                    </div>
                    <Space>
                        <LocaleToggle className="p-md rounded-md bg-theme-container shadow-sm hover:shadow-md transition-smooth" />
                        <ThemeToggle className="p-md rounded-md bg-theme-container shadow-sm hover:shadow-md transition-smooth" />
                    </Space>
                </Flex>
            </Card>

            {/* Demo Cards */}
            <Row gutter={[16, 16]}>
                {demoCards.map((card, index) => (
                    <Col xs={24} sm={12} lg={6} key={index}>
                        <Card
                            hoverable
                            style={{ height: '100%' }}
                            actions={[
                                <Button key="view" type="link">
                                    {locale === 'th' ? 'ดูรายละเอียด' : 'View Details'}
                                </Button>
                            ]}
                        >
                            <Card.Meta
                                avatar={
                                    <Avatar
                                        size="large"
                                        style={{ backgroundColor: card.color }}
                                        icon={card.icon}
                                    />
                                }
                                title={card.title}
                                description={card.description}
                            />
                        </Card>
                    </Col>
                ))}
            </Row>

            <Divider />

            {/* Theme Colors Demo */}
            <Card title={locale === 'th' ? 'ตัวอย่างสีธีม' : 'Theme Colors Demo'}>
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Title level={4}>
                            {locale === 'th' ? 'สีหลัก (Primary Colors)' : 'Primary Colors'}
                        </Title>
                        <Space wrap>
                            {Object.entries(colors.colors.primary).map(([shade, color]) => (
                                <div key={shade} style={{ textAlign: 'center' }}>
                                    <div
                                        style={{
                                            width: 60,
                                            height: 60,
                                            backgroundColor: color,
                                            borderRadius: 8,
                                            marginBottom: 8,
                                            border: '1px solid #e5e5e5',
                                        }}
                                    />
                                    <Text style={{ fontSize: 12 }}>{shade}</Text>
                                </div>
                            ))}
                        </Space>
                    </Col>
                </Row>

                <Divider />

                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Title level={4}>
                            {locale === 'th' ? 'สีสถานะ (Status Colors)' : 'Status Colors'}
                        </Title>
                        <Space size="large">
                            <div style={{ textAlign: 'center' }}>
                                <div
                                    style={{
                                        width: 60,
                                        height: 60,
                                        backgroundColor: colors.colors.success[500],
                                        borderRadius: 8,
                                        marginBottom: 8,
                                    }}
                                />
                                <Text>{locale === 'th' ? 'สำเร็จ' : 'Success'}</Text>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div
                                    style={{
                                        width: 60,
                                        height: 60,
                                        backgroundColor: colors.colors.warning[500],
                                        borderRadius: 8,
                                        marginBottom: 8,
                                    }}
                                />
                                <Text>{locale === 'th' ? 'เตือน' : 'Warning'}</Text>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div
                                    style={{
                                        width: 60,
                                        height: 60,
                                        backgroundColor: colors.colors.error[500],
                                        borderRadius: 8,
                                        marginBottom: 8,
                                    }}
                                />
                                <Text>{locale === 'th' ? 'ผิดพลาด' : 'Error'}</Text>
                            </div>
                        </Space>
                    </Col>
                </Row>
            </Card>

            <Divider />

            {/* Typography Demo */}
            <Card title={locale === 'th' ? 'ตัวอย่างตัวอักษร' : 'Typography Demo'}>
                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                    <div>
                        <Title level={1}>
                            {locale === 'th' ? 'หัวข้อหลัก (H1)' : 'Main Heading (H1)'}
                        </Title>
                        <Title level={2}>
                            {locale === 'th' ? 'หัวข้อรอง (H2)' : 'Secondary Heading (H2)'}
                        </Title>
                        <Title level={3}>
                            {locale === 'th' ? 'หัวข้อย่อย (H3)' : 'Sub Heading (H3)'}
                        </Title>
                        <Title level={4}>
                            {locale === 'th' ? 'หัวข้อเล็ก (H4)' : 'Small Heading (H4)'}
                        </Title>
                    </div>

                    <div>
                        <Paragraph>
                            {locale === 'th'
                                ? 'นี่คือตัวอย่างข้อความปกติ (Body Text) ที่ใช้ในเนื้อหาหลักของเว็บไซต์ มีขนาดและระยะห่างที่เหมาะสมสำหรับการอ่าน'
                                : 'This is an example of regular body text used in the main content of the website. It has an appropriate size and spacing for reading.'
                            }
                        </Paragraph>

                        <Text>
                            {locale === 'th' ? 'ข้อความธรรมดา' : 'Regular Text'}
                        </Text>
                        <br />
                        <Text type="secondary">
                            {locale === 'th' ? 'ข้อความรอง' : 'Secondary Text'}
                        </Text>
                        <br />
                        <Text strong>
                            {locale === 'th' ? 'ข้อความหนา' : 'Bold Text'}
                        </Text>
                        <br />
                        <Text italic>
                            {locale === 'th' ? 'ข้อความเอียง' : 'Italic Text'}
                        </Text>
                        <br />
                        <Text code>
                            {locale === 'th' ? 'โค้ด (Code Text)' : 'Code Text'}
                        </Text>
                    </div>
                </Space>
            </Card>

            <Divider />

            {/* Button Demo */}
            <Card title={locale === 'th' ? 'ตัวอย่างปุ่ม' : 'Button Demo'}>
                <Space wrap size="middle">
                    <Button type="primary">
                        {locale === 'th' ? 'ปุ่มหลัก' : 'Primary Button'}
                    </Button>
                    <Button>
                        {locale === 'th' ? 'ปุ่มปกติ' : 'Default Button'}
                    </Button>
                    <Button type="dashed">
                        {locale === 'th' ? 'ปุ่มขอบประ' : 'Dashed Button'}
                    </Button>
                    <Button type="text">
                        {locale === 'th' ? 'ปุ่มข้อความ' : 'Text Button'}
                    </Button>
                    <Button type="link">
                        {locale === 'th' ? 'ปุ่มลิงก์' : 'Link Button'}
                    </Button>
                </Space>

                <Divider />

                <Space wrap size="middle">
                    <Button type="primary" size="large">
                        {locale === 'th' ? 'ปุ่มใหญ่' : 'Large Button'}
                    </Button>
                    <Button type="primary">
                        {locale === 'th' ? 'ปุ่มกลาง' : 'Medium Button'}
                    </Button>
                    <Button type="primary" size="small">
                        {locale === 'th' ? 'ปุ่มเล็ก' : 'Small Button'}
                    </Button>
                </Space>
            </Card>

            <Divider />

            {/* Tags Demo */}
            <Card title={locale === 'th' ? 'ตัวอย่างแท็ก' : 'Tags Demo'}>
                <Space wrap>
                    <Tag color="blue">
                        {locale === 'th' ? 'กิจกรรม' : 'Activity'}
                    </Tag>
                    <Tag color="green">
                        {locale === 'th' ? 'กีฬา' : 'Sports'}
                    </Tag>
                    <Tag color="orange">
                        {locale === 'th' ? 'ศิลปะ' : 'Arts'}
                    </Tag>
                    <Tag color="red">
                        {locale === 'th' ? 'ดนตรี' : 'Music'}
                    </Tag>
                    <Tag color="purple">
                        {locale === 'th' ? 'เทคโนโลยี' : 'Technology'}
                    </Tag>
                    <Tag color="cyan">
                        {locale === 'th' ? 'การเรียนรู้' : 'Learning'}
                    </Tag>
                </Space>
            </Card>
        </div>
    );
};

export default ThemeDemo;