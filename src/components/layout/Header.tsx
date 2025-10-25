'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import {
  Card,
  Typography,
  Avatar,
  Dropdown,
  MenuProps,
  Button,
} from 'antd'
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons'
import { useAuthContext } from '../auth/AuthProvider'
import { ThemeToggle } from '../../theme/theme'
import { useThemeUtils } from '../../theme/hooks'
import { LanguageSwitcher } from '../ui'

const { Title } = Typography

interface HeaderProps {
  title?: string
  isBackButton?: boolean
}

const Header: React.FC<HeaderProps> = ({
  title,
  isBackButton = false,
}) => {
  const { user, logout } = useAuthContext()
  const { t } = useTranslation('common')
  const { colors, spacing } = useThemeUtils()
  const router = useRouter()

  const userMenuItems: MenuProps['items'] = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: t('navigation.profile'),
      onClick: () => router.push('/dashboard/profile'),
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: t('navigation.settings'),
      onClick: () => {/* TODO: Navigate to settings */ },
    },
    {
      type: 'divider',
    },
    {
      key: 'theme',
      label: (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            padding: '4px 0'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <span>{t('header.theme')}</span>
          <ThemeToggle size="small" showLabel={true} />
        </div>
      ),
      onClick: (e) => e?.domEvent?.stopPropagation(),
    },
    {
      key: 'language',
      label: (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            padding: '4px 0',
            gap: '8px',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <span className='flex justify-between'>{t('header.language')}</span>
          <LanguageSwitcher size="small" />
        </div>
      ),
      onClick: (e) => e?.domEvent?.stopPropagation(),
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: t('navigation.logout'),
      danger: true,
      onClick: logout,
    },
  ]

  return (
    <Card
      style={{
        marginBottom: spacing.spacing[6],
        borderRadius: 0,
        boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
      }}
      bodyStyle={{ padding: `${spacing.spacing[3]}px ${spacing.spacing[4]}px` }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: spacing.spacing[3],
        flexWrap: 'wrap',
      }}>
        {/* Left Section: Back Button (if needed) + Logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: spacing.spacing[3],
          flexShrink: 0,
        }}>
          {isBackButton && (
            <Button
              type="text"
              icon={<ArrowLeftOutlined />}
              onClick={() => router.push('/dashboard')}
              className="back-button"
              style={{
                color: colors.colors.primary[600],
                display: 'flex',
                alignItems: 'center',
                padding: '4px 8px',
              }}
            >
              <span className="back-button-text">{t('navigation.backToDashboard')}</span>
            </Button>
          )}

          <Title
            level={2}
            className="header-logo"
            style={{
              margin: 0,
              background: `linear-gradient(45deg, ${colors.colors.primary[600]}, ${colors.colors.primary[400]})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: 'clamp(18px, 4vw, 24px)',
              cursor: 'pointer',
            }}
            onClick={() => router.push('/dashboard')}
          >
            {title || `${t('dashboard.hello')} ${user?.name || user?.username || 'Kittiphop'} ${t('dashboard.greeting')}`}
          </Title>
        </div>

        {/* User Avatar with Dropdown */}
        <Dropdown
          menu={{ items: userMenuItems }}
          placement="bottomRight"
          trigger={['click']}
        >
          <Avatar
            size="large"
            icon={<UserOutlined />}
            src={user?.avatar}
            style={{
              backgroundColor: colors.colors.primary[500],
              cursor: 'pointer',
              flexShrink: 0,
            }}
          />
        </Dropdown>
      </div>

      {/* Mobile Layout Adjustments */}
      <style jsx>{`
        @media (max-width: 768px) {
          .back-button {
            font-size: 12px !important;
            padding: 2px 6px !important;
          }
          
          .back-button span {
            font-size: 12px !important;
          }
          
          .header-logo {
            font-size: 18px !important;
          }
        }
        
        @media (max-width: 480px) {
          .back-button-text {
            display: none;
          }
        }
      `}</style>
    </Card>
  )
}

export default Header
