'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthContext } from './AuthProvider';
import { LoadingSpinner } from '@/components/ui';

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  redirectTo = '/login',
  requiredRole
}) => {
  const { isAuthenticated, user, isLoading } = useAuthContext();
  const router = useRouter();

  const hasRequiredRole = (user: { username: string; role?: string }, role: string): boolean => {
    // สำหรับ demo ให้ admin เข้าได้ทุก role
    if (user.username === 'admin') return true;
    
    // ในความเป็นจริงจะตรวจสอบจาก user.roles หรือ user.permissions
    return user.role === role;
  };

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        // ถ้ายังไม่ login ให้ redirect ไป login page
        router.push(redirectTo);
        return;
      }

      // ตรวจสอบ role ถ้าจำเป็น
      if (requiredRole && user && !hasRequiredRole(user, requiredRole)) {
        router.push('/unauthorized');
        return;
      }
    }
  }, [isAuthenticated, user, isLoading, router, redirectTo, requiredRole]);

  // แสดง loading ขณะตรวจสอบ auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">กำลังตรวจสอบสิทธิ์การเข้าถึง...</p>
        </div>
      </div>
    );
  }

  // ถ้ายังไม่ authenticated ให้แสดง loading (จะ redirect ใน useEffect)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">กำลังเปลี่ยนเส้นทาง...</p>
        </div>
      </div>
    );
  }

  // ถ้า authenticated แล้วให้แสดง children
  return <>{children}</>;
};

export default ProtectedRoute;