import { generateSEOMetadata, loginSEOConfig } from '../../src/lib/seo'

export const metadata = generateSEOMetadata(loginSEOConfig)

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}