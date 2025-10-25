import { generateSEOMetadata, dashboardSEOConfig } from '../../src/lib/seo'

export const metadata = generateSEOMetadata(dashboardSEOConfig)

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}