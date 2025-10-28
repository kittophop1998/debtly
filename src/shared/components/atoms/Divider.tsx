// Divider component
import React from 'react';

interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  className?: string;
}

const Divider: React.FC<DividerProps> = ({
  orientation = 'horizontal',
  className = '',
}) => {
  const baseClasses = 'bg-slate-200';
  const orientationClasses = orientation === 'horizontal' 
    ? 'w-full h-px' 
    : 'w-px h-full';
  
  const classes = `${baseClasses} ${orientationClasses} ${className}`;

  return <div className={classes} />;
};

export default Divider;