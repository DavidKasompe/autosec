import React from 'react';
import { SystemStatus, Severity } from '../../types';

interface StatusIndicatorProps {
  status: SystemStatus | Severity;
  pulse?: boolean;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

export const StatusIndicator: React.FC<StatusIndicatorProps> = ({ 
  status, 
  pulse = false,
  size = 'md',
  label
}) => {
  const getStatusColor = (status: SystemStatus | Severity) => {
    switch (status) {
      case 'active':
      case 'low':
        return 'bg-green-500';
      case 'idle':
      case 'medium':
        return 'bg-blue-500';
      case 'warning':
      case 'high':
        return 'bg-amber-500';
      case 'error':
      case 'critical':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getSizeClasses = (size: string) => {
    switch (size) {
      case 'sm': return 'h-2 w-2';
      case 'lg': return 'h-4 w-4';
      default: return 'h-3 w-3';
    }
  };

  const baseClasses = `rounded-full ${getSizeClasses(size)} ${getStatusColor(status)}`;
  const pulseClasses = pulse ? 'animate-pulse' : '';

  return (
    <div className="flex items-center gap-2">
      <div className={`${baseClasses} ${pulseClasses}`} />
      {label && <span className="text-sm text-gray-300">{label}</span>}
    </div>
  );
};