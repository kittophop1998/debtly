import { FC } from 'react'

interface StructuredDataProps {
  data: object
}

export const StructuredData: FC<StructuredDataProps> = ({ data }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data)
      }}
    />
  )
}

// Pre-defined structured data schemas
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "WeGoWhere",
  "description": "แพลตฟอร์มค้นหากิจกรรมและเชื่อมต่อเพื่อนใหม่",
  "url": "https://wegowhere.app",
  "logo": "https://wegowhere.app/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer service",
    "email": "support@wegowhere.app"
  },
  "sameAs": [
    "https://facebook.com/wegowhere",
    "https://twitter.com/wegowhere",
    "https://instagram.com/wegowhere"
  ]
}

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "WeGoWhere",
  "description": "ค้นหาและเข้าร่วมกิจกรรมที่น่าสนใจ พบปะเพื่อนใหม่",
  "url": "https://wegowhere.app",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://wegowhere.app/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}

export const breadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
})