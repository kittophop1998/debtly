'use client';

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../src/contexts";
import { LoadingSpinner } from "../src/components/ui";

export default function Home() {
  const { isAuthenticated, isLoading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    // ถ้า login แล้วให้ redirect ไป dashboard
    if (!isLoading && isAuthenticated) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, isLoading, router]);

  // แสดง loading ขณะตรวจสอบ auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-sky-100">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-slate-600">กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  // ถ้า authenticated แล้วจะ redirect ใน useEffect แต่แสดง loading ก่อน
  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-sky-100">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-slate-600">กำลังเปลี่ยนเส้นทาง...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-teal-50 via-cyan-50 to-sky-100 font-sans">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center justify-center py-16 px-8 text-center">
        <div className="mb-8">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-teal-600 to-sky-600 bg-clip-text text-transparent mb-4">
            Debtly
          </h1>
          <p className="text-2xl text-slate-700 font-medium mb-2">
            จัดการหนี้แสนสนุก
          </p>
          <div className="h-1 w-32 bg-gradient-to-r from-teal-500 to-sky-500 mx-auto rounded-full"></div>
        </div>

        <div className="mb-12">
          <p className="text-xl text-slate-600 max-w-2xl leading-relaxed">
            แพลตฟอร์มจัดการหนี้สินที่ง่าย ปลอดภัย และสนุก ติดตามรายรับรายจ่าย 
            วางแผนการเงิน และจัดการหนี้อย่างเป็นระบบ
          </p>
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:gap-8">
          <Link
            href="/login"
            className="flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-teal-600 to-sky-600 px-8 text-white font-semibold text-lg transition-all duration-200 hover:from-teal-700 hover:to-sky-700 hover:scale-105 shadow-lg hover:shadow-xl sm:w-auto"
          >
            🔐 เข้าสู่ระบบ
          </Link>
          
          <Link
            href="/register"
            className="flex h-14 w-full items-center justify-center rounded-xl border-2 border-teal-600 px-8 text-teal-600 font-semibold text-lg transition-all duration-200 hover:bg-teal-600 hover:text-white hover:scale-105 shadow-md hover:shadow-lg sm:w-auto"
          >
            ✨ สมัครสมาชิก
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3 max-w-4xl">
          <div className="bg-white p-6 rounded-xl shadow-lg border border-teal-100 hover:border-teal-200 transition-all duration-200 hover:shadow-xl">
            <div className="text-4xl mb-4">�</div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">จัดการหนี้</h3>
            <p className="text-slate-600">ติดตามและจัดการหนี้สินได้อย่างเป็นระบบ</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border border-sky-100 hover:border-sky-200 transition-all duration-200 hover:shadow-xl">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">วิเคราะห์เงิน</h3>
            <p className="text-slate-600">รายงานและสถิติการเงินที่เข้าใจง่าย</p>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-lg border border-emerald-100 hover:border-emerald-200 transition-all duration-200 hover:shadow-xl">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">วางแผนการเงิน</h3>
            <p className="text-slate-600">ตั้งเป้าหมายและแผนการชำระหนี้</p>
          </div>
        </div>
      </main>
    </div>
  );
}
