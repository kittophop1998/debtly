// Label component for form inputs
import React from 'react';

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  required?: boolean;
  error?: boolean;
  className?: string;
}

const Label: React.FC<LabelProps> = ({
  children,
  required = false,
  error = false,
  className = '',
  ...props
}) => {
  const baseClasses = 'block text-sm font-medium mb-1';
  const colorClasses = error ? 'text-red-600' : 'text-slate-700';
  const classes = `${baseClasses} ${colorClasses} ${className}`;

  return (
    <label className={classes} {...props}>
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
};

export default Label;