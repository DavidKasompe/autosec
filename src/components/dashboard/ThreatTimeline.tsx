import React, { useState } from 'react';
import { ThreatEvent, Severity, ThreatType } from '../../types';
import { Card } from '../ui/Card';
import { StatusIndicator } from '../ui/StatusIndicator';
import { AlertTriangle, Check, Clock, Shield } from 'lucide-react';

interface ThreatTimelineProps {
  threats: ThreatEvent[];
  onResolve: (id: string) => void;
}

export const ThreatTimeline: React.FC<ThreatTimelineProps> = ({ threats, onResolve }) => {
  const [severityFilter, setSeverityFilter] = useState<Severity | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<ThreatType | 'all'>('all');

  const formatTimestamp = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString();
  };

  const getRelativeTime = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
    if (diffSeconds < 60) return `${diffSeconds}s ago`;
    if (diffSeconds < 3600) return `${Math.floor(diffSeconds / 60)}m ago`;
    return `${Math.floor(diffSeconds / 3600)}h ago`;
  };

  const getThreatTypeIcon = (type: ThreatType) => {
    switch (type) {
      case 'malware':
      case 'ransomware':
        return <Shield size={16} className="text-red-400" />;
      case 'intrusion':
      case 'data_exfiltration':
      case 'privilege_escalation':
        return <AlertTriangle size={16} className="text-amber-400" />;
      default:
        return <Clock size={16} className="text-blue-400" />;
    }
  };

  const filteredThreats = threats.filter(threat => {
    if (severityFilter !== 'all' && threat.severity !== severityFilter) return false;
    if (typeFilter !== 'all' && threat.threatType !== typeFilter) return false;
    return true;
  });

  const threatTypeOptions: {value: ThreatType | 'all', label: string}[] = [
    { value: 'all', label: 'All Types' },
    { value: 'malware', label: 'Malware' },
    { value: 'intrusion', label: 'Intrusion' },
    { value: 'ddos', label: 'DDoS' },
    { value: 'ransomware', label: 'Ransomware' },
    { value: 'reconnaissance', label: 'Reconnaissance' },
    { value: 'data_exfiltration', label: 'Data Exfiltration' },
    { value: 'brute_force', label: 'Brute Force' },
    { value: 'privilege_escalation', label: 'Privilege Escalation' },
  ];

  const severityOptions: {value: Severity | 'all', label: string}[] = [
    { value: 'all', label: 'All Severities' },
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'critical', label: 'Critical' },
  ];

  return (
    <Card 
      title="Threat Timeline" 
      className="h-full"
      headerRight={
        <div className="flex items-center gap-2 text-sm">
          <select 
            className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm text-gray-200"
            value={severityFilter}
            onChange={e => setSeverityFilter(e.target.value as Severity | 'all')}
          >
            {severityOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          
          <select 
            className="bg-gray-700 border border-gray-600 rounded px-2 py-1 text-sm text-gray-200"
            value={typeFilter}
            onChange={e => setTypeFilter(e.target.value as ThreatType | 'all')}
          >
            {threatTypeOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>
      }
    >
      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
        {filteredThreats.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p>No threats match the current filters</p>
          </div>
        ) : (
          filteredThreats.map(threat => (
            <div 
              key={threat.id}
              className={`
                p-3 rounded-md border-l-4 bg-gray-800 hover:bg-gray-750 transition-colors
                ${threat.resolved ? 'border-green-500 opacity-70' : 
                  threat.severity === 'critical' ? 'border-red-500' :
                  threat.severity === 'high' ? 'border-amber-500' :
                  threat.severity === 'medium' ? 'border-blue-500' :
                  'border-green-500'
                }
              `}
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-3 items-start">
                  <div className="mt-1">
                    {getThreatTypeIcon(threat.threatType)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <StatusIndicator status={threat.severity} size="sm" />
                      <span className="font-medium text-gray-200">
                        {threat.threatType.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}
                      </span>
                      <span className="text-xs text-gray-400">
                        {formatTimestamp(threat.timestamp)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-300 mt-1">{threat.details}</p>
                    <div className="flex mt-2 text-xs text-gray-400 space-x-3">
                      <span>Source: {threat.sourceIP}</span>
                      <span>Target: {threat.destinationIP}</span>
                      <span className="text-gray-500">{getRelativeTime(threat.timestamp)}</span>
                    </div>
                  </div>
                </div>
                
                {!threat.resolved && (
                  <button 
                    onClick={() => onResolve(threat.id)}
                    className="bg-gray-700 hover:bg-gray-600 text-xs rounded px-2 py-1 text-gray-200 flex items-center gap-1 transition-colors"
                  >
                    <Check size={12} />
                    Resolve
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </Card>
  );
};