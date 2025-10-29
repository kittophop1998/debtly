import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../src/theme/globals.css";
import { GoogleAnalytics } from "../src/components/analytics";
import { AppProvider } from "./providers/AppProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Debtly - จัดการหนี้แสนสนุก",
  description: "แอปพลิเคชันจัดการหนี้สินที่ทำให้การจัดการเงินและหนี้เป็นเรื่องง่ายและสนุก ติดตามรายรับรายจ่าย วางแผนการเงิน | Debtly",
  keywords: [
    "จัดการหนี้",
    "หนี้สิน",
    "การเงิน",
    "วางแผนการเงิน",
    "รายรับรายจ่าย",
    "debt management",
    "financial planning",
    "expense tracking",
    "budgeting",
    "money management",
    "ประเทศไทย",
    "thailand"
  ],
  authors: [{ name: "Debtly Team" }],
  creator: "Debtly",
  publisher: "Debtly",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'th_TH',
    alternateLocale: 'en_US',
    url: 'https://debtly.app',
    title: 'Debtly - จัดการหนี้แสนสนุก',
    description: 'แอปพลิเคชันจัดการหนี้สินที่ทำให้การจัดการเงินและหนี้เป็นเรื่องง่ายและสนุก ติดตามรายรับรายจ่าย วางแผนการเงิน',
    siteName: 'Debtly',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Debtly - จัดการหนี้แสนสนุก',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Debtly - จัดการหนี้แสนสนุก',
    description: 'แอปพลิเคชันจัดการหนี้สินที่ทำให้การจัดการเงินและหนี้เป็นเรื่องง่ายและสนุก',
    images: ['/twitter-image.jpg'],
    creator: '@debtly',
  },
  verification: {
    google: 'your-google-verification-code',
  },
  category: 'finance',
  alternates: {
    canonical: 'https://debtly.app',
    languages: {
      'th-TH': 'https://debtly.app',
      'en-US': 'https://debtly.app/en',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#4f46e5" />
        <meta name="format-detection" content="telephone=no" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="canonical" href="https://debtly.app" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Debtly",
              "description": "แอปพลิเคชันจัดการหนี้สินที่ทำให้การจัดการเงินและหนี้เป็นเรื่องง่ายและสนุก",
              "url": "https://debtly.app",
              "applicationCategory": "FinanceApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "THB"
              },
              "author": {
                "@type": "Organization",
                "name": "Debtly Team"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "100"
              }
            })
          }}
        />

        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics measurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
