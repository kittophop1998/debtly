// Text component with consistent typography
import React from 'react';

interface TextProps {
    children: React.ReactNode;
    variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'caption' | 'small';
    weight?: 'normal' | 'medium' | 'semibold' | 'bold';
    color?: 'primary' | 'secondary' | 'muted' | 'error' | 'success' | 'warning';
    className?: string;
    as?: React.ElementType;
}

const Text: React.FC<TextProps> = ({
    children,
    variant = 'body',
    weight = 'normal',
    color = 'primary',
    className = '',
    as,
}) => {
    const variantClasses = {
        h1: 'text-4xl leading-tight',
        h2: 'text-3xl leading-tight',
        h3: 'text-2xl leading-tight',
        h4: 'text-xl leading-snug',
        h5: 'text-lg leading-snug',
        h6: 'text-base leading-normal',
        body: 'text-base leading-normal',
        caption: 'text-sm leading-normal',
        small: 'text-xs leading-normal',
    };

    const weightClasses = {
        normal: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
    };

    const colorClasses = {
        primary: 'text-slate-900',
        secondary: 'text-slate-700',
        muted: 'text-slate-500',
        error: 'text-red-600',
        success: 'text-green-600',
        warning: 'text-yellow-600',
    };

    const classes = `${variantClasses[variant]} ${weightClasses[weight]} ${colorClasses[color]} ${className}`;

    const elementType = as || getDefaultElement(variant);

    return React.createElement(
        elementType,
        { className: classes },
        children
    );
};

const getDefaultElement = (variant: TextProps['variant']): React.ElementType => {
    const elementMap: Record<NonNullable<TextProps['variant']>, React.ElementType> = {
        h1: 'h1',
        h2: 'h2',
        h3: 'h3',
        h4: 'h4',
        h5: 'h5',
        h6: 'h6',
        body: 'p',
        caption: 'span',
        small: 'small',
    };

    return elementMap[variant || 'body'];
};

export default Text;