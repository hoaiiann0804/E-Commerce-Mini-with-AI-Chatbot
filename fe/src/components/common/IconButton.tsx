import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => {
    const baseClasses = [
      'inline-flex',
      'items-center',
      'justify-center',
      'rounded-md',
      'font-medium',
      'transition-colors',
      'focus:outline-none',
      'focus:ring-2',
      'focus:ring-offset-2',
      'disabled:opacity-50',
      'disabled:pointer-events-none',
    ];

    const variantClasses = {
      primary: [
        'bg-primary-600',
        'text-white',
        'hover:bg-primary-700',
        'focus:ring-primary-500',
      ],
      secondary: [
        'bg-neutral-200',
        'text-neutral-900',
        'hover:bg-neutral-300',
        'focus:ring-neutral-500',
        'dark:bg-neutral-700',
        'dark:text-neutral-100',
        'dark:hover:bg-neutral-600',
      ],
      outline: [
        'border',
        'border-neutral-300',
        'bg-transparent',
        'text-neutral-700',
        'hover:bg-neutral-50',
        'focus:ring-neutral-500',
        'dark:border-neutral-600',
        'dark:text-neutral-300',
        'dark:hover:bg-neutral-800',
      ],
      ghost: [
        'bg-transparent',
        'text-neutral-700',
        'hover:bg-neutral-100',
        'focus:ring-neutral-500',
        'dark:text-neutral-300',
        'dark:hover:bg-neutral-800',
      ],
      danger: [
        'bg-red-600',
        'text-white',
        'hover:bg-red-700',
        'focus:ring-red-500',
      ],
    };

    const sizeClasses = {
      sm: ['h-8', 'w-8', 'text-sm'],
      md: ['h-10', 'w-10', 'text-base'],
      lg: ['h-12', 'w-12', 'text-lg'],
    };

    const classes = cn(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      className
    );

    return (
      <button
        className={classes}
        disabled={disabled || isLoading}
        ref={ref}
        {...props}
      >
        {isLoading ? (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          children
        )}
      </button>
    );
  }
);

IconButton.displayName = 'IconButton';

export default IconButton;
