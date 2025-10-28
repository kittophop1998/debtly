'use client';

import React from 'react';
import ErrorBoundary from './ErrorBoundary';
import { useRouter } from 'next/navigation';
import Button from './atoms/Button';

interface RouteErrorBoundaryProps {
  children: React.ReactNode;
}

const RouteErrorFallback: React.FC<{ error?: Error }> = ({ error }) => {
  const router = useRouter();
  const [errorId] = React.useState(() => Date.now());

  const handleGoHome = () => {
    router.push('/');
  };

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center max-w-lg p-8">
        <div className="mb-6">
          <svg
            className="w-20 h-20 text-slate-400 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m6 5H3a2 2 0 01-2-2V5a2 2 0 012-2h18a2 2 0 012 2v14a2 2 0 01-2 2z"
            />
          </svg>
        </div>
        
        <h1 className="text-3xl font-bold text-slate-900 mb-3">
          เกิดข้อผิดพลาดในหน้าเว็บ
        </h1>
        
        <p className="text-lg text-slate-600 mb-8">
          เราพบปัญหาในการโหลดหน้าเว็บนี้ 
          ทีมพัฒนาได้รับแจ้งแล้วและกำลังดำเนินการแก้ไข
        </p>
        
        <div className="space-y-4">
          <div className="flex gap-4 justify-center">
            <Button onClick={handleGoHome}>
              กลับหน้าหลัก
            </Button>
            <Button variant="outline" onClick={handleGoBack}>
              กลับหน้าก่อนหน้า
            </Button>
          </div>
          
          <Button 
            variant="ghost" 
            onClick={() => window.location.reload()}
            className="text-sm"
          >
            รีเฟรชหน้าเว็บ
          </Button>
        </div>

        <div className="mt-8 text-xs text-slate-400">
          <p>Error ID: {errorId}</p>
          {process.env.NODE_ENV === 'development' && error && (
            <details className="mt-4 text-left">
              <summary className="cursor-pointer">ดูรายละเอียดข้อผิดพลาด</summary>
              <pre className="mt-2 text-xs text-red-600 bg-red-50 p-2 rounded overflow-auto max-h-40">
                {error.stack}
              </pre>
            </details>
          )}
        </div>
      </div>
    </div>
  );
};

const RouteErrorBoundary: React.FC<RouteErrorBoundaryProps> = ({ children }) => {
  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    // Log error to monitoring service
    console.error('Route Error:', error, errorInfo);
    
    // In production, send to error tracking service
    if (process.env.NODE_ENV === 'production') {
      // TODO: Send to Sentry, LogRocket, etc.
    }
  };

  return (
    <ErrorBoundary 
      fallback={<RouteErrorFallback />}
      onError={handleError}
    >
      {children}
    </ErrorBoundary>
  );
};

export default RouteErrorBoundary;