import { ReactNode } from 'react';

export interface CardProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  hoverable?: boolean;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  footer?: ReactNode;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  hoverable = false,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
  footer,
  onClick,
}) => {
  const cardClasses = `card ${hoverable ? 'card-hover' : 'shadow-sm'} ${
    onClick ? 'cursor-pointer' : ''
  } ${className}`;

  return (
    <div className={cardClasses} onClick={onClick}>
      {(title || subtitle) && (
        <div
          className={`px-6 py-4 border-b border-neutral-200 dark:border-neutral-700 ${headerClassName}`}
        >
          {title && (
            <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100">
              {title}
            </h3>
          )}
          {subtitle && (
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              {subtitle}
            </p>
          )}
        </div>
      )}
      <div className={`p-6 ${bodyClassName}`}>{children}</div>
      {footer && (
        <div
          className={`px-6 py-4 border-t border-neutral-200 dark:border-neutral-700 ${footerClassName}`}
        >
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
