import React from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { SystemStatus } from '../../types';

interface LayoutProps {
  children: React.ReactNode;
  systemStatus: SystemStatus;
  lastUpdate: string;
  alertCount: number;
}

export const Layout: React.FC<LayoutProps> = ({ 
  children, 
  systemStatus, 
  lastUpdate,
  alertCount
}) => {
  return (
    <div className="h-screen flex flex-col bg-gray-900 text-gray-100">
      <Header systemStatus={systemStatus} lastUpdate={lastUpdate} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar alertCount={alertCount} />
        
        <main className="flex-1 overflow-auto p-6 md:ml-64">
          {children}
        </main>
      </div>
    </div>
  );
};