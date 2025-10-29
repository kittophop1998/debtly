'use client';

import React, { useState } from 'react';
import {
    Button,
    Card,
    Input,
    Form,
    Avatar,
    Typography,
    Space,
    Row,
    Col,
    Statistic,
    Divider,
    Switch,
    notification,
    Modal,
    Upload,
    message,
} from 'antd';
import {
    UserOutlined,
    EditOutlined,
    SaveOutlined,
    CloseOutlined,
    SettingOutlined,
    BellOutlined,
    LockOutlined,
    DeleteOutlined,
    CameraOutlined,
    PhoneOutlined,
    MailOutlined,
    EnvironmentOutlined,
} from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { useAuthContext } from '../../../src/hooks';
import { ProtectedRoute } from '../../../src/components/layout';
import { useThemeUtils } from '../../../src/theme/hooks';
import Header from '../../../src/components/layout/Header';
import { useTranslation } from 'react-i18next';

const { Title, Text, Paragraph } = Typography;
const { TextArea } = Input;

const ProfilePage: React.FC = () => {
    const { user } = useAuthContext();
    const { colors, spacing } = useThemeUtils();
    const [form] = Form.useForm();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation('common');

    const [profileData, setProfileData] = useState({
        name: user?.displayName || '',
        email: user?.email || '',
        username: user?.username || '',
        bio: '',
        location: '',
        phone: '',
        avatar: '',
        notificationsEnabled: true,
        profilePrivate: false,
    });

    const handleEdit = () => {
        setIsEditing(true);
        form.setFieldsValue(profileData);
    };

    const handleCancel = () => {
        setIsEditing(false);
        form.resetFields();
    };

    const handleSave = async () => {
        try {
            setLoading(true);
            const values = await form.validateFields();
            setProfileData({ ...profileData, ...values });
            setIsEditing(false);
            notification.success({
                message: t('profile.updateSuccess'),
                placement: 'topRight',
            });
        } catch (error) {
            console.error('Validation failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteAccount = () => {
        Modal.confirm({
            title: t('profile.deleteAccount'),
            content: t('profile.deleteConfirm'),
            okText: t('common.delete'),
            okType: 'danger',
            onOk: () => {
                // TODO: Implement delete account
                message.error(t('profile.notImplemented'));
            },
        });
    };

    const uploadProps: UploadProps = {
        name: 'avatar',
        listType: 'picture-card',
        className: 'avatar-uploader',
        showUploadList: false,
        beforeUpload: (file) => {
            const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJpgOrPng) {
                message.error(t('profile.uploadError'));
                return false;
            }
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                message.error(t('profile.fileSizeError'));
                return false;
            }

            // Preview the uploaded image immediately
            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    setProfileData(prev => ({
                        ...prev,
                        avatar: e.target?.result as string
                    }));
                    message.success(t('profile.uploadSuccess'));
                }
            };
            reader.readAsDataURL(file);

            return false; // Prevent actual upload, just show preview
        },
    };

    return (
        <ProtectedRoute>
            <div style={{ minHeight: '100vh', backgroundColor: colors.bg.base }}>
                {/* Header */}
                <Header title={t('profile.title')} isBackButton={true} />

                {/* Main Content */}
                <div style={{
                    maxWidth: '1200px',
                    margin: '0 auto',
                    padding: `0 ${spacing.spacing[4]}px ${spacing.spacing[8]}px`
                }}>
                    <Row gutter={[24, 24]}>
                        <Col xs={24} lg={8}>
                            {/* Profile Card */}
                            <Card style={{ textAlign: 'center' }}>
                                <Space direction="vertical" size="middle" style={{ width: '100%' }}>
                                    <div
                                        style={{
                                            position: 'relative',
                                            width: 130,
                                            height: 130,
                                            margin: '0 auto',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        {!isEditing && (
                                            <Avatar
                                                size={120}
                                                src={profileData.avatar || undefined}
                                                icon={
                                                    !profileData.avatar && !profileData.name && !user?.username ? (
                                                        <UserOutlined />
                                                    ) : undefined
                                                }
                                                style={{
                                                    backgroundColor: colors.colors.primary[500],
                                                    fontSize: '48px',
                                                    width: 120,
                                                    height: 120,
                                                    lineHeight: '120px',
                                                }}
                                            >
                                                {!profileData.avatar &&
                                                    (profileData.name?.charAt(0)?.toUpperCase() ||
                                                        user?.username?.charAt(0)?.toUpperCase() ||
                                                        'U')}
                                            </Avatar>
                                        )}

                                        {isEditing && (
                                            <Upload {...uploadProps} showUploadList={false}>
                                                <Button
                                                    shape="circle"
                                                    icon={<CameraOutlined />}
                                                    style={{
                                                        position: 'absolute',
                                                        bottom: 4,
                                                        right: 4,
                                                        width: 36,
                                                        height: 36,
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        backgroundColor: colors.colors.primary[500],
                                                        borderColor: colors.colors.primary[500],
                                                        color: 'white',
                                                        zIndex: 10,
                                                        boxShadow: '0 0 6px rgba(0,0,0,0.25)',
                                                    }}
                                                />
                                            </Upload>
                                        )}
                                    </div>


                                    <div>
                                        <Title level={3} style={{ margin: 0 }}>
                                            {profileData.name || user?.username || t('profile.defaultUser')}
                                        </Title>
                                        <Text type="secondary">{profileData.email}</Text>
                                    </div>

                                    <Space direction="vertical" size="small">
                                        {profileData.location && (
                                            <Text type="secondary">
                                                <EnvironmentOutlined /> {profileData.location}
                                            </Text>
                                        )}
                                        {profileData.phone && (
                                            <Text type="secondary">
                                                <PhoneOutlined /> {profileData.phone}
                                            </Text>
                                        )}
                                        {profileData.email && (
                                            <Text type="secondary">
                                                <MailOutlined /> {profileData.email}
                                            </Text>
                                        )}
                                    </Space>

                                    {profileData.bio && (
                                        <Paragraph ellipsis={{ rows: 3 }} style={{ margin: 0 }}>
                                            {profileData.bio}
                                        </Paragraph>
                                    )}

                                    {!isEditing ? (
                                        <Button
                                            type="primary"
                                            icon={<EditOutlined />}
                                            onClick={handleEdit}
                                            block
                                        >
                                            {t('profile.editProfile')}
                                        </Button>
                                    ) : (
                                        <Space>
                                            <Button
                                                type="primary"
                                                icon={<SaveOutlined />}
                                                onClick={handleSave}
                                                loading={loading}
                                            >
                                                {t('common.save')}
                                            </Button>
                                            <Button
                                                icon={<CloseOutlined />}
                                                onClick={handleCancel}
                                            >
                                                {t('common.cancel')}
                                            </Button>
                                        </Space>
                                    )}
                                </Space>
                            </Card>

                            {/* Statistics */}
                            <Card title={t('profile.usageStats')} style={{ marginTop: spacing.spacing[4] }}>
                                <Row gutter={16}>
                                    <Col span={24}>
                                        <Statistic
                                            title={t('profile.createdActivities')}
                                            value={0}
                                            valueStyle={{ color: colors.colors.primary[500] }}
                                        />
                                        <Divider />
                                    </Col>
                                    <Col span={24}>
                                        <Statistic
                                            title={t('profile.joinedActivities')}
                                            value={0}
                                            valueStyle={{ color: colors.colors.success[500] }}
                                        />
                                        <Divider />
                                    </Col>
                                    <Col span={24}>
                                        <Statistic
                                            title={t('profile.friends')}
                                            value={0}
                                            valueStyle={{ color: colors.colors.warning[500] }}
                                        />
                                    </Col>
                                </Row>
                            </Card>
                        </Col>

                        <Col xs={24} lg={16}>
                            {/* Personal Information */}
                            <Card title={t('profile.personalInfo')}>
                                <Form
                                    form={form}
                                    layout="vertical"
                                    initialValues={profileData}
                                    disabled={!isEditing}
                                >
                                    <Row gutter={16}>
                                        <Col xs={24} sm={12}>
                                            <Form.Item
                                                label={t('profile.name')}
                                                name="name"
                                                rules={[
                                                    { required: true, message: t('profile.nameRequired') }
                                                ]}
                                            >
                                                <Input placeholder={t('profile.enterName')} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={12}>
                                            <Form.Item
                                                label={t('profile.email')}
                                                name="email"
                                                rules={[
                                                    { required: true, message: t('profile.emailRequired') },
                                                    { type: 'email', message: t('profile.emailInvalid') }
                                                ]}
                                            >
                                                <Input placeholder={t('profile.enterEmail')} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={12}>
                                            <Form.Item
                                                label={t('profile.phone')}
                                                name="phone"
                                            >
                                                <Input placeholder={t('profile.enterPhone')} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} sm={12}>
                                            <Form.Item
                                                label={t('profile.location')}
                                                name="location"
                                            >
                                                <Input placeholder={t('profile.enterLocation')} />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24}>
                                            <Form.Item
                                                label={t('profile.aboutMe')}
                                                name="bio"
                                            >
                                                <TextArea
                                                    rows={4}
                                                    placeholder={t('profile.tellAboutYou')}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                </Form>
                            </Card>

                            {/* Account Settings */}
                            <Card title={t('profile.accountSettings')} style={{ marginTop: spacing.spacing[4] }}>
                                <Space direction="vertical" size="large" style={{ width: '100%' }}>
                                    <Row justify="space-between" align="middle">
                                        <Col>
                                            <Space direction="vertical" size="small">
                                                <Text strong>
                                                    <BellOutlined /> {t('profile.notifications')}
                                                </Text>
                                                <Text type="secondary">{t('profile.notificationDesc')}</Text>
                                            </Space>
                                        </Col>
                                        <Col>
                                            <Switch
                                                checked={profileData.notificationsEnabled}
                                                onChange={(checked) => setProfileData({
                                                    ...profileData,
                                                    notificationsEnabled: checked
                                                })}
                                            />
                                        </Col>
                                    </Row>

                                    <Divider />

                                    <Row justify="space-between" align="middle">
                                        <Col>
                                            <Space direction="vertical" size="small">
                                                <Text strong>
                                                    <LockOutlined /> {t('profile.privacy')}
                                                </Text>
                                                <Text type="secondary">{t('profile.privacyDesc')}</Text>
                                            </Space>
                                        </Col>
                                        <Col>
                                            <Switch
                                                checked={profileData.profilePrivate}
                                                onChange={(checked) => setProfileData({
                                                    ...profileData,
                                                    profilePrivate: checked
                                                })}
                                            />
                                        </Col>
                                    </Row>

                                    <Divider />

                                    <Row justify="space-between" align="middle">
                                        <Col>
                                            <Space direction="vertical" size="small">
                                                <Text strong>
                                                    <SettingOutlined /> {t('profile.changePassword')}
                                                </Text>
                                                <Text type="secondary">{t('profile.changePasswordDesc')}</Text>
                                            </Space>
                                        </Col>
                                        <Col>
                                            <Button>
                                                {t('common.edit')}
                                            </Button>
                                        </Col>
                                    </Row>

                                    <Divider />

                                    <Row justify="space-between" align="middle">
                                        <Col>
                                            <Space direction="vertical" size="small">
                                                <Text strong style={{ color: colors.colors.error[500] }}>
                                                    <DeleteOutlined /> {t('profile.deleteAccount')}
                                                </Text>
                                                <Text type="secondary">{t('profile.deleteAccountDesc')}</Text>
                                            </Space>
                                        </Col>
                                        <Col>
                                            <Button danger onClick={handleDeleteAccount}>
                                                {t('common.delete')}
                                            </Button>
                                        </Col>
                                    </Row>
                                </Space>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        </ProtectedRoute>
    );
};

export default ProfilePage;