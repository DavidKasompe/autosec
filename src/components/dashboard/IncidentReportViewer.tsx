import React, { useState } from 'react';
import { IncidentReport } from '../../types';
import { Card } from '../ui/Card';
import { StatusIndicator } from '../ui/StatusIndicator';
import { ChevronDown, ChevronUp, CheckCircle, AlertCircle, Calendar, Server } from 'lucide-react';

interface IncidentReportViewerProps {
  reports: IncidentReport[];
  onResolve: (id: string) => void;
}

export const IncidentReportViewer: React.FC<IncidentReportViewerProps> = ({ reports, onResolve }) => {
  const [expandedReports, setExpandedReports] = useState<string[]>([]);

  const toggleExpand = (id: string) => {
    setExpandedReports(current => 
      current.includes(id) 
        ? current.filter(reportId => reportId !== id) 
        : [...current, id]
    );
  };

  const formatTimestamp = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  return (
    <Card title="Incident Reports">
      <div className="space-y-4">
        {reports.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p>No incident reports available</p>
          </div>
        ) : (
          reports.map(report => {
            const isExpanded = expandedReports.includes(report.id);
            
            return (
              <div 
                key={report.id} 
                className={`
                  bg-gray-800 rounded-md border border-gray-700 overflow-hidden
                  transition-all duration-300
                  ${isExpanded ? 'shadow-lg' : ''}
                `}
              >
                <div 
                  className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-750"
                  onClick={() => toggleExpand(report.id)}
                >
                  <div className="flex items-center gap-3">
                    <StatusIndicator status={report.severity} size="md" />
                    <div>
                      <h3 className="font-medium text-gray-200">{report.title}</h3>
                      <div className="flex gap-3 mt-1 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {formatTimestamp(report.timestamp)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Server size={12} />
                          {report.affectedIPs.length} affected {report.affectedIPs.length === 1 ? 'IP' : 'IPs'}
                        </span>
                        {report.resolved && (
                          <span className="flex items-center gap-1 text-green-500">
                            <CheckCircle size={12} />
                            Resolved
                          </span>
                        )}
                        {!report.resolved && report.severity === 'critical' && (
                          <span className="flex items-center gap-1 text-red-500">
                            <AlertCircle size={12} />
                            Critical
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <button className="text-gray-400">
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                </div>
                
                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-gray-700 pt-3 animate-fadeIn">
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Summary</h4>
                      <p className="text-sm text-gray-400">{report.summary}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-300 mb-2">Actions Taken</h4>
                        <ul className="list-disc pl-5 text-sm text-gray-400 space-y-1">
                          {report.actions.taken.map((action, index) => (
                            <li key={index}>{action}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-gray-300 mb-2">Suggested Actions</h4>
                        <ul className="list-disc pl-5 text-sm text-gray-400 space-y-1">
                          {report.actions.suggested.map((action, index) => (
                            <li key={index}>{action}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-300 mb-2">Affected Systems</h4>
                      <div className="flex flex-wrap gap-2">
                        {report.affectedIPs.map((ip, index) => (
                          <span 
                            key={index} 
                            className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs"
                          >
                            {ip}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {!report.resolved && (
                      <div className="flex justify-end">
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            onResolve(report.id);
                          }}
                          className="bg-cyan-700 hover:bg-cyan-600 text-white text-sm px-3 py-1.5 rounded transition-colors flex items-center gap-1"
                        >
                          <CheckCircle size={14} />
                          Mark as Resolved
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
};