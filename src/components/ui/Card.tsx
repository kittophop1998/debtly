// Reusable Card component

import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  variant?: 'default' | 'elevated' | 'bordered';
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  padding = 'md',
  hover = false,
  variant = 'default'
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8'
  };

  const variantClasses = {
    default: 'bg-white rounded-lg border border-slate-200 shadow-sm',
    elevated: 'bg-white rounded-xl border border-slate-200 shadow-lg',
    bordered: 'bg-white rounded-2xl border-2 border-slate-300 shadow-xl'
  };

  const baseClasses = `
    ${variantClasses[variant]}
    ${hover ? 'hover:shadow-lg hover:shadow-teal-50 transition-all duration-300 ease-in-out hover:-translate-y-1' : ''}
    ${paddingClasses[padding]}
    ${className}
  `;

  return (
    <div className={baseClasses}>
      {children}
    </div>
  );
};

export default Card;