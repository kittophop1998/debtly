// Icon component wrapper
import React from 'react';

interface IconProps {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'muted' | 'error' | 'success' | 'warning';
  className?: string;
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 'md',
  color = 'primary',
  className = '',
}) => {
  const sizeClasses = {
    xs: 'w-3 h-3',
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
    xl: 'w-8 h-8',
  };

  const colorClasses = {
    primary: 'text-slate-900',
    secondary: 'text-slate-700',
    muted: 'text-slate-500',
    error: 'text-red-600',
    success: 'text-green-600',
    warning: 'text-yellow-600',
  };

  const classes = `${sizeClasses[size]} ${colorClasses[color]} ${className}`;

  // For now, return a simple placeholder
  // In the future, integrate with icon library like Heroicons, Lucide, etc.
  return (
    <div className={`${classes} bg-current opacity-20 rounded`} title={name} />
  );
};

export default Icon;