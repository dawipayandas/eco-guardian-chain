import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: number | string;
  suffix?: string;
  icon?: React.ReactNode;
  className?: string;
  animated?: boolean;
  color?: 'primary' | 'secondary' | 'accent' | 'success' | 'pending';
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  suffix = '',
  icon,
  className,
  animated = true,
  color = 'primary'
}) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (animated && typeof value === 'number') {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    } else {
      setDisplayValue(typeof value === 'number' ? value : 0);
    }
  }, [value, animated]);

  const colorClasses = {
    primary: 'text-primary',
    secondary: 'text-secondary', 
    accent: 'text-accent',
    success: 'text-success',
    pending: 'text-pending'
  };

  return (
    <div className={cn("stat-card", className)}>
      {icon && (
        <div className={`mb-3 ${colorClasses[color]}`}>
          {icon}
        </div>
      )}
      <div className={`stat-number ${colorClasses[color]}`}>
        {typeof value === 'number' ? displayValue.toLocaleString() : value}
        {suffix}
      </div>
      <p className="text-sm text-muted-foreground font-medium">
        {title}
      </p>
    </div>
  );
};