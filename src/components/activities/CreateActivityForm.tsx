'use client';

import React, { useState } from 'react';
import {
    Form,
    Input,
    Select,
    DatePicker,
    TimePicker,
    InputNumber,
    Switch,
    Button,
    Card,
    Row,
    Col,
    Typography,
    Space,
    message,
    Tooltip,
    Divider,
} from 'antd';
import {
    PlusOutlined,
    EnvironmentOutlined,
    TeamOutlined,
    LockOutlined,
    UnlockOutlined,
    ClockCircleOutlined,
    FileTextOutlined,
    TagOutlined,
} from '@ant-design/icons';
import dayjs, { Dayjs } from 'dayjs';
import { ActivityType, CreateActivityData, Location } from '../../types';
import { activityService } from '../../services/activity';
import { useTheme } from '../../theme/theme';
import { useThemeUtils } from '../../theme/hooks';

const { Title, Text } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface CreateActivityFormProps {
    onSubmit?: (activity: any) => void;
    onCancel?: () => void;
    loading?: boolean;
}

interface CreateActivityFormData {
    title: string;
    category: ActivityType;
    date: Dayjs | null;
    time: Dayjs | null;
    location: string;
    locationDetails?: {
        address: string;
        latitude?: number;
        longitude?: number;
    };
    maxParticipants: number;
    isPrivate: boolean;
    inviteCode?: string;
    description: string;
    duration: number;
}

const CreateActivityForm: React.FC<CreateActivityFormProps> = ({
    onSubmit,
    onCancel,
    loading = false,
}) => {
    const [form] = Form.useForm<CreateActivityFormData>();
    const [submitting, setSubmitting] = useState(false);
    const [isPrivate, setIsPrivate] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const { locale } = useTheme();
    const { colors, spacing } = useThemeUtils();

    // Check for mobile screen size
    React.useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const text = {
        th: {
            createActivity: 'สร้างกิจกรรม',
            title: 'ชื่อกิจกรรม',
            titlePlaceholder: 'กรอกชื่อกิจกรรมที่น่าสนใจ...',
            category: 'หมวดหมู่',
            categoryPlaceholder: 'เลือกหมวดหมู่กิจกรรม',
            date: 'วันที่',
            datePlaceholder: 'เลือกวันที่จัดกิจกรรม',
            time: 'เวลา',
            timePlaceholder: 'เลือกเวลาเริ่มกิจกรรม',
            location: 'สถานที่',
            locationPlaceholder: 'กรอกชื่อสถานที่หรือที่อยู่...',
            mapPin: 'เลือกจากแผนที่',
            maxParticipants: 'จำนวนผู้เข้าร่วมสูงสุด',
            privateToggle: 'กิจกรรมส่วนตัว',
            inviteCode: 'รหัสเข้าร่วม',
            inviteCodePlaceholder: 'รหัสสำหรับเข้าร่วมกิจกรรม (ไม่บังคับ)',
            description: 'รายละเอียด',
            descriptionPlaceholder: 'บอกเล่าเกี่ยวกับกิจกรรมของคุณ...',
            duration: 'ระยะเวลา (ชั่วโมง)',
            create: 'สร้างกิจกรรม',
            cancel: 'ยกเลิก',
            required: 'จำเป็นต้องกรอก',
            minParticipants: 'ต้องมีอย่างน้อย 2 คน',
            maxParticipantsLimit: 'ไม่เกิน 100 คน',
            minDuration: 'อย่างน้อย 0.5 ชั่วโมง',
            maxDuration: 'ไม่เกิน 24 ชั่วโมง',
            success: 'สร้างกิจกรรมเรียบร้อยแล้ว!',
            error: 'เกิดข้อผิดพลาดในการสร้างกิจกรรม',
            // Activity types
            outdoor: 'กิจกรรมกลางแจ้ง',
            indoor: 'กิจกรรมในที่ร่ม',
            sport: 'กีฬา',
            food: 'อาหาร',
            cultural: 'วัฒนธรรม',
            entertainment: 'บันเทิง',
            learning: 'การเรียนรู้',
            travel: 'ท่องเที่ยว',
            other: 'อื่นๆ',
        },
        en: {
            createActivity: 'Create Activity',
            title: 'Activity Title',
            titlePlaceholder: 'Enter an interesting activity title...',
            category: 'Category',
            categoryPlaceholder: 'Select activity category',
            date: 'Date',
            datePlaceholder: 'Select activity date',
            time: 'Time',
            timePlaceholder: 'Select start time',
            location: 'Location',
            locationPlaceholder: 'Enter location name or address...',
            mapPin: 'Choose from map',
            maxParticipants: 'Max Participants',
            privateToggle: 'Private Activity',
            inviteCode: 'Invite Code',
            inviteCodePlaceholder: 'Code to join activity (optional)',
            description: 'Description',
            descriptionPlaceholder: 'Tell us about your activity...',
            duration: 'Duration (hours)',
            create: 'Create Activity',
            cancel: 'Cancel',
            required: 'This field is required',
            minParticipants: 'Minimum 2 participants',
            maxParticipantsLimit: 'Maximum 100 participants',
            minDuration: 'Minimum 0.5 hours',
            maxDuration: 'Maximum 24 hours',
            success: 'Activity created successfully!',
            error: 'Failed to create activity',
            // Activity types
            outdoor: 'Outdoor',
            indoor: 'Indoor',
            sport: 'Sport',
            food: 'Food',
            cultural: 'Cultural',
            entertainment: 'Entertainment',
            learning: 'Learning',
            travel: 'Travel',
            other: 'Other',
        },
    };

    const t = text[locale];

    // Helper functions
    const getActivityTypeLabel = (type: ActivityType) => {
        const typeMap = {
            [ActivityType.OUTDOOR]: t.outdoor,
            [ActivityType.INDOOR]: t.indoor,
            [ActivityType.SPORT]: t.sport,
            [ActivityType.FOOD]: t.food,
            [ActivityType.CULTURAL]: t.cultural,
            [ActivityType.ENTERTAINMENT]: t.entertainment,
            [ActivityType.LEARNING]: t.learning,
            [ActivityType.TRAVEL]: t.travel,
            [ActivityType.OTHER]: t.other,
        };
        return typeMap[type] || type;
    };

    const generateInviteCode = () => {
        const code = Math.random().toString(36).substring(2, 8).toUpperCase();
        form.setFieldsValue({ inviteCode: code });
    };

    const handleSubmit = async (values: CreateActivityFormData) => {
        try {
            setSubmitting(true);

            // Combine date and time
            const dateTime = values.date && values.time
                ? values.date
                    .hour(values.time.hour())
                    .minute(values.time.minute())
                    .second(0)
                    .millisecond(0)
                : null;

            if (!dateTime) {
                message.error('Please select both date and time');
                return;
            }

            // Create location object
            const location: Location = {
                name: values.location,
                address: values.locationDetails?.address || values.location,
                latitude: values.locationDetails?.latitude || 0,
                longitude: values.locationDetails?.longitude || 0,
            };

            // Prepare activity data
            const activityData: CreateActivityData = {
                title: values.title,
                description: values.description,
                type: values.category,
                location,
                dateTime: dateTime.toISOString(),
                duration: values.duration * 60, // Convert hours to minutes
                maxParticipants: values.maxParticipants,
                tags: [], // Can be extended later
            };

            // Create activity
            const newActivity = await activityService.createActivity(activityData);

            message.success(t.success);

            // Reset form
            form.resetFields();
            setIsPrivate(false);

            // Call onSubmit callback
            onSubmit?.(newActivity);

        } catch (error) {
            console.error('Create activity error:', error);
            message.error(t.error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleCancel = () => {
        form.resetFields();
        setIsPrivate(false);
        onCancel?.();
    };

    const handlePrivateToggle = (checked: boolean) => {
        setIsPrivate(checked);
        if (checked && !form.getFieldValue('inviteCode')) {
            generateInviteCode();
        } else if (!checked) {
            form.setFieldsValue({ inviteCode: undefined });
        }
    };

    // Disable past dates
    const disabledDate = (current: Dayjs) => {
        return current && current < dayjs().startOf('day');
    };

    return (
        <Card
            style={{
                maxWidth: isMobile ? '100%' : 800,
                margin: '0 auto',
                borderRadius: isMobile ? '12px 12px 0 0' : '12px',
                boxShadow: isMobile ? 'none' : '0 4px 12px rgba(0, 0, 0, 0.1)',
                border: isMobile ? 'none' : undefined,
            }}
            bodyStyle={{
                padding: isMobile ? '16px' : '24px',
            }}
        >
            <div style={{ marginBottom: spacing.spacing[6] }}>
                <Title level={3} style={{ margin: 0, textAlign: 'center' }}>
                    <PlusOutlined style={{ marginRight: '8px', color: colors.primary[500] }} />
                    {t.createActivity}
                </Title>
            </div>

            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                requiredMark={false}
                size={isMobile ? 'middle' : 'large'}
            >
                {/* Title */}
                <Form.Item
                    name="title"
                    label={
                        <Space>
                            <TagOutlined />
                            <Text strong>{t.title}</Text>
                        </Space>
                    }
                    rules={[{ required: true, message: t.required }]}
                >
                    <Input
                        placeholder={t.titlePlaceholder}
                        maxLength={100}
                        showCount
                    />
                </Form.Item>

                {/* Category, Date, Time Row */}
                <Row gutter={isMobile ? [0, 16] : 16}>
                    <Col xs={24} sm={8}>
                        <Form.Item
                            name="category"
                            label={<Text strong>{t.category}</Text>}
                            rules={[{ required: true, message: t.required }]}
                        >
                            <Select placeholder={t.categoryPlaceholder}>
                                {Object.values(ActivityType).map(type => (
                                    <Option key={type} value={type}>
                                        {getActivityTypeLabel(type)}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Form.Item
                            name="date"
                            label={<Text strong>{t.date}</Text>}
                            rules={[{ required: true, message: t.required }]}
                        >
                            <DatePicker
                                style={{ width: '100%' }}
                                placeholder={t.datePlaceholder}
                                disabledDate={disabledDate}
                                format="DD/MM/YYYY"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={8}>
                        <Form.Item
                            name="time"
                            label={<Text strong>{t.time}</Text>}
                            rules={[{ required: true, message: t.required }]}
                        >
                            <TimePicker
                                style={{ width: '100%' }}
                                placeholder={t.timePlaceholder}
                                format="HH:mm"
                                minuteStep={15}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                {/* Location */}
                <Form.Item
                    name="location"
                    label={
                        <Space>
                            <EnvironmentOutlined />
                            <Text strong>{t.location}</Text>
                        </Space>
                    }
                    rules={[{ required: true, message: t.required }]}
                >
                    <Input.Group compact>
                        <Input
                            style={{ width: 'calc(100% - 120px)' }}
                            placeholder={t.locationPlaceholder}
                        />
                        <Tooltip title={t.mapPin}>
                            <Button
                                style={{ width: '120px' }}
                                icon={<EnvironmentOutlined />}
                                onClick={() => {
                                    // TODO: Implement map picker
                                    message.info('Map picker coming soon!');
                                }}
                            >
                                {t.mapPin}
                            </Button>
                        </Tooltip>
                    </Input.Group>
                </Form.Item>

                {/* Max Participants and Private Toggle Row */}
                <Row gutter={isMobile ? [0, 16] : 16}>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            name="maxParticipants"
                            label={
                                <Space>
                                    <TeamOutlined />
                                    <Text strong>{t.maxParticipants}</Text>
                                </Space>
                            }
                            rules={[
                                { required: true, message: t.required },
                                { type: 'number', min: 2, message: t.minParticipants },
                                { type: 'number', max: 100, message: t.maxParticipantsLimit },
                            ]}
                            initialValue={5}
                        >
                            <InputNumber
                                style={{ width: '100%' }}
                                min={2}
                                max={100}
                                placeholder="5"
                            />
                        </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                        <Form.Item
                            name="isPrivate"
                            label={
                                <Space>
                                    {isPrivate ? <LockOutlined /> : <UnlockOutlined />}
                                    <Text strong>{t.privateToggle}</Text>
                                </Space>
                            }
                            valuePropName="checked"
                        >
                            <Switch
                                onChange={handlePrivateToggle}
                                checkedChildren="Private"
                                unCheckedChildren="Public"
                            />
                        </Form.Item>
                    </Col>
                </Row>

                {/* Invite Code (conditionally shown) */}
                {isPrivate && (
                    <Form.Item
                        name="inviteCode"
                        label={<Text strong>{t.inviteCode}</Text>}
                    >
                        <Input.Group compact>
                            <Input
                                style={{ width: 'calc(100% - 100px)' }}
                                placeholder={t.inviteCodePlaceholder}
                                maxLength={20}
                            />
                            <Button
                                style={{ width: '100px' }}
                                onClick={generateInviteCode}
                                type="dashed"
                            >
                                Generate
                            </Button>
                        </Input.Group>
                    </Form.Item>
                )}

                {/* Duration */}
                <Form.Item
                    name="duration"
                    label={
                        <Space>
                            <ClockCircleOutlined />
                            <Text strong>{t.duration}</Text>
                        </Space>
                    }
                    rules={[
                        { required: true, message: t.required },
                        { type: 'number', min: 0.5, message: t.minDuration },
                        { type: 'number', max: 24, message: t.maxDuration },
                    ]}
                    initialValue={2}
                >
                    <InputNumber
                        style={{ width: '100%' }}
                        min={0.5}
                        max={24}
                        step={0.5}
                        placeholder="2"
                        addonAfter="hours"
                    />
                </Form.Item>

                {/* Description */}
                <Form.Item
                    name="description"
                    label={
                        <Space>
                            <FileTextOutlined />
                            <Text strong>{t.description}</Text>
                        </Space>
                    }
                    rules={[{ required: true, message: t.required }]}
                >
                    <TextArea
                        rows={4}
                        placeholder={t.descriptionPlaceholder}
                        maxLength={500}
                        showCount
                    />
                </Form.Item>

                <Divider />

                {/* Action Buttons */}
                <Form.Item style={{ marginBottom: 0 }}>
                    <Row gutter={isMobile ? [0, 12] : 16}>
                        <Col xs={24} sm={12} order={isMobile ? 2 : 1}>
                            <Button
                                size="large"
                                block
                                onClick={handleCancel}
                                disabled={submitting || loading}
                            >
                                {t.cancel}
                            </Button>
                        </Col>
                        <Col xs={24} sm={12} order={isMobile ? 1 : 2}>
                            <Button
                                type="primary"
                                size="large"
                                block
                                htmlType="submit"
                                loading={submitting || loading}
                                icon={<PlusOutlined />}
                            >
                                {t.create}
                            </Button>
                        </Col>
                    </Row>
                </Form.Item>
            </Form>
        </Card>
    );
};

export default CreateActivityForm;