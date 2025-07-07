import React from 'react';
import { cn } from '@/utils/cn';

const Card = React.forwardRef(({ 
  className, 
  children,
  variant = 'default',
  ...props 
}, ref) => {
  const baseStyles = "bg-white rounded-xl";
  
  const variants = {
    default: "card-shadow",
    elevated: "card-shadow-lg",
    flat: "border border-gray-200",
  };

  return (
    <div
      ref={ref}
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </div>
  );
});

Card.displayName = "Card";

export default Card;