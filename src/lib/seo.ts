import { Metadata } from 'next'

interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
  twitterImage?: string
  canonical?: string
  noIndex?: boolean
  noFollow?: boolean
}

export const generateSEOMetadata = (config: SEOConfig): Metadata => {
  const {
    title,
    description,
    keywords = [],
    ogImage = '/og-image.jpg',
    twitterImage = '/twitter-image.jpg',
    canonical,
    noIndex = false,
    noFollow = false,
  } = config

  const fullTitle = title.includes('WeGoWhere') ? title : `${title} | WeGoWhere`

  return {
    title: fullTitle,
    description,
    keywords: [
      ...keywords,
      'กิจกรรม',
      'เพื่อน',
      'พบปะ',
      'สังสรรค์',
      'ชุมชน',
      'activities',
      'meet friends',
      'community',
      'events',
      'social',
      'ประเทศไทย',
      'thailand',
    ],
    robots: {
      index: !noIndex,
      follow: !noFollow,
      googleBot: {
        index: !noIndex,
        follow: !noFollow,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'website',
      locale: 'th_TH',
      url: canonical || 'https://wegowhere.app',
      title: fullTitle,
      description,
      siteName: 'WeGoWhere',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [twitterImage],
      creator: '@wegowhere',
    },
    alternates: {
      canonical: canonical || 'https://wegowhere.app',
    },
  }
}

export const defaultSEOConfig: SEOConfig = {
  title: 'WeGoWhere - ค้นหากิจกรรม เชื่อมต่อเพื่อนใหม่',
  description: 'ค้นหาและเข้าร่วมกิจกรรมที่น่าสนใจ พบปะเพื่อนใหม่ที่มีความสนใจเหมือนกัน สร้างประสบการณ์ดีๆ ร่วมกัน',
}

// Predefined metadata for common pages
export const loginSEOConfig: SEOConfig = {
  title: 'เข้าสู่ระบบ',
  description: 'เข้าสู่ระบบ WeGoWhere เพื่อเข้าร่วมกิจกรรมและพบปะเพื่อนใหม่',
  canonical: 'https://wegowhere.app/login',
  noIndex: true,
}

export const registerSEOConfig: SEOConfig = {
  title: 'สมัครสมาชิก',
  description: 'สมัครสมาชิก WeGoWhere ฟรี เพื่อเริ่มต้นค้นหากิจกรรมและพบปะเพื่อนใหม่',
  canonical: 'https://wegowhere.app/register',
  keywords: ['สมัครสมาชิก', 'register', 'join', 'เข้าร่วม'],
}

export const dashboardSEOConfig: SEOConfig = {
  title: 'แดชบอร์ด',
  description: 'จัดการกิจกรรมและเชื่อมต่อกับเพื่อนใหม่ใน WeGoWhere',
  canonical: 'https://wegowhere.app/dashboard',
  noIndex: true,
  noFollow: true,
}