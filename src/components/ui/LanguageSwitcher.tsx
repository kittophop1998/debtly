'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'
import { Select } from 'antd'
import { GlobalOutlined } from '@ant-design/icons'

const { Option } = Select

interface LanguageSwitcherProps {
    size?: 'small' | 'middle' | 'large'
    showText?: boolean
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
    size = 'middle',
    showText = false
}) => {
    const { i18n } = useTranslation()

    const handleLanguageChange = (value: string) => {
        i18n.changeLanguage(value)
    }

    const languages = [
        { code: 'th', name: 'ไทย', flag: '🇹🇭' },
        { code: 'en', name: 'English', flag: '🇺🇸' }
    ]

    return (
        <Select
            value={i18n.language}
            onChange={handleLanguageChange}
            size={size}
            style={{ minWidth: showText ? 120 : 80 }}
            suffixIcon={<GlobalOutlined />}
            popupMatchSelectWidth={false}
        >
            {languages.map((lang) => (
                <Option key={lang.code} value={lang.code}>
                    <span style={{ marginRight: 8 }}>{lang.flag}</span>
                    {showText && lang.name}
                    {!showText && lang.code.toUpperCase()}
                </Option>
            ))}
        </Select>
    )
}

export default LanguageSwitcher