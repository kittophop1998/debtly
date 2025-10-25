"use client";

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

// Import translation files directly
import enCommon from '../../public/locales/en/common.json'
import thCommon from '../../public/locales/th/common.json'

// Translation resources
const resources = {
    en: {
        common: enCommon
    },
    th: {
        common: thCommon
    }
}

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: typeof window !== 'undefined' ? localStorage.getItem('language') || 'th' : 'th',
        fallbackLng: 'en',
        defaultNS: 'common',
        ns: ['common'],
        interpolation: { escapeValue: false },
        react: { useSuspense: false },
    }, () => {
        console.log("i18n initialized", i18n.language);
    });

// Save language preference to localStorage when changed
i18n.on('languageChanged', (lng) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('language', lng)
    }
})

export default i18n