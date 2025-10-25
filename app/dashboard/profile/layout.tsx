import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'โปรไฟล์ - Go Mate',
    description: 'จัดการข้อมูลส่วนตัวและการตั้งค่าบัญชีของคุณ',
};

export default function ProfileLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}