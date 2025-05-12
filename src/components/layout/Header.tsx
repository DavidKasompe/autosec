import React from 'react';
import { SystemStatus } from '../../types';
import { StatusIndicator } from '../ui/StatusIndicator';
import { Shield } from 'lucide-react';

interface HeaderProps {
  systemStatus: SystemStatus;
  lastUpdate: string;
}

export const Header: React.FC<HeaderProps> = ({ systemStatus, lastUpdate }) => {
  const formatLastUpdate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString();
  };

  return (
    <header className="bg-gray-900 border-b border-gray-800 py-4 px-6 flex justify-between items-center sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <Shield size={28} className="text-cyan-500" />
        <h1 className="text-xl font-semibold text-white">AutoSec Dashboard</h1>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">Last Update:</span>
          <span className="text-sm text-gray-200">{formatLastUpdate(lastUpdate)}</span>
        </div>
        
        <StatusIndicator 
          status={systemStatus} 
          pulse={systemStatus === 'active' || systemStatus === 'warning'} 
          size="md"
          label={systemStatus.charAt(0).toUpperCase() + systemStatus.slice(1)}
        />
      </div>
    </header>
  );
};