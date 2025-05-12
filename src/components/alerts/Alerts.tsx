import React, { useState } from 'react';
import { format } from 'date-fns';
import { ThreatEvent, Severity, ThreatType } from '../../types';
import { Card } from '../ui/Card';
import { StatusIndicator } from '../ui/StatusIndicator';
import { 
  AlertTriangle, 
  Calendar, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Filter, 
  Shield, 
  XCircle 
} from 'lucide-react';

interface AlertsProps {
  threats: ThreatEvent[];
  onResolve: (id: string) => void;
}

export const Alerts: React.FC<AlertsProps> = ({ threats, onResolve }) => {
  const [severityFilter, setSeverityFilter] = useState<Severity | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<ThreatType | 'all'>('all');
  const [timeFilter, setTimeFilter] = useState<'1h' | '24h' | '7d' | 'all'>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedThreat, setSelectedThreat] = useState<string | null>(null);

  const getTimeFilterDate = (filter: '1h' | '24h' | '7d' | 'all'): Date => {
    const now = new Date();
    switch (filter) {
      case '1h':
        return new Date(now.getTime() - 60 * 60 * 1000);
      case '24h':
        return new Date(now.getTime() - 24 * 60 * 60 * 1000);
      case '7d':
        return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      default:
        return new Date(0);
    }
  };

  const filteredThreats = threats.filter(threat => {
    if (severityFilter !== 'all' && threat.severity !== severityFilter) return false;
    if (typeFilter !== 'all' && threat.threatType !== typeFilter) return false;
    if (timeFilter !== 'all') {
      const filterDate = getTimeFilterDate(timeFilter);
      if (new Date(threat.timestamp) < filterDate) return false;
    }
    return true;
  }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

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

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-white">Security Alerts</h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-3 py-2 bg-gray-800 rounded-md hover:bg-gray-700 transition-colors"
        >
          <Filter size={16} />
          <span>Filters</span>
          {showFilters ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {showFilters && (
        <Card>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Severity</label>
              <select
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm"
                value={severityFilter}
                onChange={e => setSeverityFilter(e.target.value as Severity | 'all')}
              >
                <option value="all">All Severities</option>
                <option value="critical">Critical</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Threat Type</label>
              <select
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm"
                value={typeFilter}
                onChange={e => setTypeFilter(e.target.value as ThreatType | 'all')}
              >
                <option value="all">All Types</option>
                <option value="malware">Malware</option>
                <option value="intrusion">Intrusion</option>
                <option value="ddos">DDoS</option>
                <option value="ransomware">Ransomware</option>
                <option value="reconnaissance">Reconnaissance</option>
                <option value="data_exfiltration">Data Exfiltration</option>
                <option value="brute_force">Brute Force</option>
                <option value="privilege_escalation">Privilege Escalation</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Time Range</label>
              <select
                className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm"
                value={timeFilter}
                onChange={e => setTimeFilter(e.target.value as '1h' | '24h' | '7d' | 'all')}
              >
                <option value="all">All Time</option>
                <option value="1h">Last Hour</option>
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
              </select>
            </div>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-4">
        {filteredThreats.map(threat => (
          <Card key={threat.id}>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <StatusIndicator status={threat.severity} size="md" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {getThreatTypeIcon(threat.threatType)}
                    <h3 className="font-medium text-white">
                      {threat.threatType.replace('_', ' ').replace(/\b\w/g, c => c.toUpperCase())}
                    </h3>
                    {threat.resolved && (
                      <span className="text-xs bg-green-900 text-green-200 px-2 py-0.5 rounded">
                        Resolved
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-2">{threat.details}</p>
                  
                  <div className="flex flex-wrap gap-4 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {format(new Date(threat.timestamp), 'MMM d, yyyy HH:mm:ss')}
                    </span>
                    <span>Source IP: {threat.sourceIP}</span>
                    <span>Target IP: {threat.destinationIP}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedThreat(selectedThreat === threat.id ? null : threat.id)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {selectedThreat === threat.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
                {!threat.resolved && (
                  <button
                    onClick={() => onResolve(threat.id)}
                    className="flex items-center gap-1 bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded text-sm transition-colors"
                  >
                    <Check size={14} />
                    Resolve
                  </button>
                )}
              </div>
            </div>

            {selectedThreat === threat.id && (
              <div className="mt-4 pt-4 border-t border-gray-700 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Raw Log Data</h4>
                    <pre className="bg-gray-800 p-3 rounded text-xs text-gray-300 overflow-x-auto">
                      {JSON.stringify({
                        timestamp: threat.timestamp,
                        source_ip: threat.sourceIP,
                        destination_ip: threat.destinationIP,
                        threat_type: threat.threatType,
                        severity: threat.severity,
                        details: threat.details,
                        status: threat.resolved ? 'resolved' : 'active'
                      }, null, 2)}
                    </pre>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Actions</h4>
                    <div className="space-y-2">
                      <button className="w-full flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded transition-colors">
                        <AlertTriangle size={16} />
                        Escalate to Incident
                      </button>
                      <button className="w-full flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors">
                        <XCircle size={16} />
                        Suppress Similar Alerts
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}

        {filteredThreats.length === 0 && (
          <div className="text-center py-12 bg-gray-800 rounded-lg">
            <p className="text-gray-400">No alerts match the current filters</p>
          </div>
        )}
      </div>
    </div>
  );
};