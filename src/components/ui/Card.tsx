import React, { ReactNode } from 'react';

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  headerRight?: ReactNode;
}

export const Card: React.FC<CardProps> = ({ 
  title, 
  children, 
  className = '',
  headerRight
}) => {
  return (
    <div className={`bg-gray-800 rounded-lg border border-gray-700 shadow-md overflow-hidden ${className}`}>
      {title && (
        <div className="flex justify-between items-center px-4 py-3 border-b border-gray-700 bg-gray-800">
          <h3 className="font-medium text-gray-200">{title}</h3>
          {headerRight && <div>{headerRight}</div>}
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};