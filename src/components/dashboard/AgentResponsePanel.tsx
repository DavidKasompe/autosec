import React from 'react';
import { Agent } from '../../types';
import { Card } from '../ui/Card';
import { StatusIndicator } from '../ui/StatusIndicator';
import { Bot, Cpu, ShieldAlert, Lock } from 'lucide-react';

interface AgentResponsePanelProps {
  agents: Agent[];
}

export const AgentResponsePanel: React.FC<AgentResponsePanelProps> = ({ agents }) => {
  const getAgentIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'network security':
        return <ShieldAlert size={20} className="text-cyan-500" />;
      case 'authentication':
        return <Lock size={20} className="text-indigo-500" />;
      case 'endpoint security':
        return <Cpu size={20} className="text-emerald-500" />;
      default:
        return <Bot size={20} className="text-blue-500" />;
    }
  };

  const getLastActive = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffSeconds < 60) return `${diffSeconds}s ago`;
    if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)}m ago`;
    if (diffSeconds < 86400) return `${Math.floor(diffSeconds / 3600)}h ago`;
    return `${Math.floor(diffSeconds / 86400)}d ago`;
  };

  return (
    <Card title="Agent Response">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {agents.map(agent => (
          <div 
            key={agent.id} 
            className={`
              relative overflow-hidden border border-gray-700 rounded-md p-4
              transition-all duration-300 transform hover:translate-y-[-2px]
              ${agent.status === 'idle' ? 'bg-gray-800' : 
                agent.status === 'active' ? 'bg-gray-750 border-blue-900' : 
                'bg-gray-750 border-cyan-900'
              }
            `}
          >
            {/* Animated background for active agents */}
            {agent.status === 'action_taken' && (
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5"></div>
                <div className="absolute h-1 bottom-0 left-0 right-0 bg-cyan-600 animate-pulse"></div>
              </div>
            )}
            {agent.status === 'active' && (
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5"></div>
                <div className="absolute h-0.5 bottom-0 left-0 right-0 bg-blue-600 animate-pulse"></div>
              </div>
            )}
            
            <div className="relative z-10">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  {getAgentIcon(agent.type)}
                  <h3 className="font-medium text-white">{agent.name}</h3>
                </div>
                <StatusIndicator 
                  status={agent.status === 'idle' ? 'idle' : 
                    agent.status === 'active' ? 'active' : 'warning'} 
                  pulse={agent.status !== 'idle'}
                  size="sm" 
                />
              </div>
              
              <div className="mt-3">
                <p className="text-sm text-gray-300">{agent.currentAction}</p>
                <div className="mt-3 flex justify-between items-center">
                  <span className="text-xs text-gray-400">
                    {agent.type}
                  </span>
                  <span className="text-xs text-gray-500">
                    Last Active: {getLastActive(agent.lastActive)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};