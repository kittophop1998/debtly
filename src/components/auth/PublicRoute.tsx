'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from './AuthProvider';

interface PublicRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  redirectIfAuthenticated?: boolean;
}

const PublicRoute: React.FC<PublicRouteProps> = ({
  children,
  redirectTo = '/',
  redirectIfAuthenticated = true
}) => {
  const { isAuthenticated, isLoading } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated && redirectIfAuthenticated) {
      // ถ้า login แล้วและอยู่ในหน้าที่ไม่ควรเข้า (เช่น login page) ให้ redirect ไปหน้าหลัก
      router.push(redirectTo);
    }
  }, [isAuthenticated, isLoading, router, redirectTo, redirectIfAuthenticated]);

  // แสดง children เสมอสำหรับ public routes
  return <>{children}</>;
};

export default PublicRoute;