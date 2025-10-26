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

  const fullTitle = title.includes('Debtly') ? title : `${title} | Debtly`

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
      url: canonical || 'https://debtly.app',
      title: fullTitle,
      description,
      siteName: 'Debtly',
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
      creator: '@debtly',
    },
    alternates: {
      canonical: canonical || 'https://debtly.app',
    },
  }
}

export const defaultSEOConfig: SEOConfig = {
  title: 'Debtly - จัดการหนี้แสนสนุก',
  description: 'แอปพลิเคชันจัดการหนี้สินที่ทำให้การจัดการเงินและหนี้เป็นเรื่องง่ายและสนุก ติดตามรายรับรายจ่าย วางแผนการเงิน',
}

// Predefined metadata for common pages
export const loginSEOConfig: SEOConfig = {
  title: 'เข้าสู่ระบบ',
  description: 'เข้าสู่ระบบ Debtly เพื่อเริ่มจัดการหนี้และวางแผนการเงินของคุณ',
  canonical: 'https://debtly.app/login',
  noIndex: true,
}

export const registerSEOConfig: SEOConfig = {
  title: 'สมัครสมาชิก',
  description: 'สมัครสมาชิk Debtly ฟรี เพื่อเริ่มต้นจัดการหนี้และวางแผนการเงินที่ดีขึ้น',
  canonical: 'https://debtly.app/register',
  keywords: ['สมัครสมาชิก', 'register', 'join', 'เข้าร่วม', 'จัดการหนี้'],
}

export const dashboardSEOConfig: SEOConfig = {
  title: 'แดชบอร์ด',
  description: 'จัดการหนี้สิน ติดตามรายรับรายจ่าย และวางแผนการเงินใน Debtly',
  canonical: 'https://debtly.app/dashboard',
  noIndex: true,
  noFollow: true,
}