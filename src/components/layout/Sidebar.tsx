import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Activity, 
  AlertTriangle, 
  FileText, 
  Settings, 
  Menu, 
  X
} from 'lucide-react';

type NavItem = {
  name: string;
  icon: React.ReactNode;
  path: string;
  count?: number;
};

interface SidebarProps {
  alertCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({ alertCount }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navItems: NavItem[] = [
    { name: 'Dashboard', icon: <Activity size={20} />, path: '/dashboard' },
    { name: 'Alerts', icon: <AlertTriangle size={20} />, path: '/dashboard/alerts', count: alertCount },
    { name: 'Reports', icon: <FileText size={20} />, path: '/dashboard/reports' },
    { name: 'Settings', icon: <Settings size={20} />, path: '/dashboard/settings' }
  ];

  const toggleMobile = () => setMobileOpen(!mobileOpen);

  return (
    <>
      {/* Mobile menu toggle */}
      <button 
        className="md:hidden fixed z-20 bottom-4 right-4 bg-cyan-600 p-3 rounded-full shadow-lg text-white"
        onClick={toggleMobile}
      >
        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      
      {/* Sidebar */}
      <aside className={`
        bg-gray-900 border-r border-gray-800
        md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col
        transition-all duration-300 ease-in-out
        ${mobileOpen ? 'fixed inset-0 z-10 flex flex-col' : 'hidden'}
      `}>
        <div className="flex flex-col flex-grow pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center flex-shrink-0 px-4 mb-5">
            <h2 className="text-xl font-bold text-gray-200">AutoSec</h2>
          </div>
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => {
                  navigate(item.path);
                  setMobileOpen(false);
                }}
                className={`${
                  location.pathname === item.path
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                } 
                group flex items-center justify-between px-3 py-3 text-sm font-medium rounded-md w-full transition-colors duration-150`}
              >
                <div className="flex items-center">
                  <span className="mr-3">{item.icon}</span>
                  {item.name}
                </div>
                {item.count !== undefined && item.count > 0 && (
                  <span className="bg-cyan-600 text-xs text-white px-2 py-0.5 rounded-full">
                    {item.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex-shrink-0 flex border-t border-gray-800 p-4">
          <div className="text-sm text-gray-400">
            <p>Version 1.0.0</p>
            <p className="mt-1">© 2025 AutoSec</p>
          </div>
        </div>
      </aside>
    </>
  );
};