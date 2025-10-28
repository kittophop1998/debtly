'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import ErrorBoundary from './ErrorBoundary';

interface AsyncErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error) => void;
}

// Hook to catch async errors
export const useAsyncError = () => {
  const [, setError] = useState();
  
  return (error: Error) => {
    setError(() => {
      throw error;
    });
  };
};

// Wrapper component for async error handling
const AsyncErrorBoundary: React.FC<AsyncErrorBoundaryProps> = ({ 
  children, 
  fallback, 
  onError 
}) => {
  const [asyncError, setAsyncError] = useState<Error | null>(null);

  useEffect(() => {
    // Global handler for unhandled promise rejections
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      console.error('Unhandled promise rejection:', event.reason);
      
      if (event.reason instanceof Error) {
        setAsyncError(event.reason);
        onError?.(event.reason);
      } else {
        const error = new Error('Unhandled promise rejection: ' + String(event.reason));
        setAsyncError(error);
        onError?.(error);
      }
      
      event.preventDefault();
    };

    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, [onError]);

  // If there's an async error, throw it so ErrorBoundary can catch it
  if (asyncError) {
    throw asyncError;
  }

  return (
    <ErrorBoundary fallback={fallback} onError={onError}>
      {children}
    </ErrorBoundary>
  );
};

export default AsyncErrorBoundary;