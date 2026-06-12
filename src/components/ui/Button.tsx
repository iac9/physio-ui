import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost' | 'white';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  children: ReactNode;
}

const base = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 cursor-pointer';

const variants = {
  primary: 'bg-primary text-white hover:bg-primary-hover active:scale-95 shadow-sm focus-visible:outline-primary',
  outline: 'border border-primary text-primary hover:bg-primary-light active:scale-95 focus-visible:outline-primary',
  ghost: 'text-primary hover:bg-primary-light active:scale-95',
  white: 'bg-white text-primary-dark hover:bg-neutral-50 active:scale-95 shadow-sm focus-visible:outline-primary-dark',
};

const sizes = {
  sm: 'text-sm px-4 py-2 gap-1.5',
  md: 'text-sm px-5 py-2.5 gap-2',
  lg: 'text-base px-7 py-3.5 gap-2',
};

export function Button({ variant = 'primary', size = 'md', href, children, className = '', ...props }: ButtonProps) {
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;
  if (href) {
    return (
      <Link to={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button className={cls} {...props}>
      {children}
    </button>
  );
}
