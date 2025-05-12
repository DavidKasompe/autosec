import React, { useState } from 'react';
import { format } from 'date-fns';
import { IncidentReport } from '../../types';
import { Card } from '../ui/Card';
import { StatusIndicator } from '../ui/StatusIndicator';
import { 
  AlertCircle,
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Download,
  FileText,
  Search,
  Server
} from 'lucide-react';

interface ReportsProps {
  reports: IncidentReport[];
  onResolve: (id: string) => void;
}

export const Reports: React.FC<ReportsProps> = ({ reports, onResolve }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'resolved'>('all');
  const [expandedReport, setExpandedReport] = useState<string | null>(null);

  const filteredReports = reports.filter(report => {
    const matchesSearch = searchTerm === '' || 
      report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.affectedIPs.some(ip => ip.includes(searchTerm));
      
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'resolved' && report.resolved) ||
      (statusFilter === 'pending' && !report.resolved);
      
    return matchesSearch && matchesStatus;
  }).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  const downloadReport = (report: IncidentReport, format: 'pdf' | 'json' | 'md') => {
    // In a real app, this would generate and download the report
    console.log(`Downloading report ${report.id} in ${format} format`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-white">Incident Reports</h1>
      </div>

      <Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search reports..."
              className="w-full bg-gray-700 border border-gray-600 rounded pl-10 pr-4 py-2 text-sm text-white placeholder-gray-400"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>

          <div>
            <select
              className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm text-white"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value as 'all' | 'pending' | 'resolved')}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>
        </div>
      </Card>

      <div className="space-y-4">
        {filteredReports.map(report => (
          <Card key={report.id}>
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4">
                <StatusIndicator status={report.severity} size="md" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <FileText size={16} className="text-cyan-400" />
                    <h3 className="font-medium text-white">{report.title}</h3>
                    {report.resolved ? (
                      <span className="text-xs bg-green-900 text-green-200 px-2 py-0.5 rounded">
                        Resolved
                      </span>
                    ) : (
                      <span className="text-xs bg-amber-900 text-amber-200 px-2 py-0.5 rounded">
                        Pending
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4 text-xs text-gray-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {format(new Date(report.timestamp), 'MMM d, yyyy HH:mm:ss')}
                    </span>
                    <span className="flex items-center gap-1">
                      <Server size={12} />
                      {report.affectedIPs.length} affected {report.affectedIPs.length === 1 ? 'system' : 'systems'}
                    </span>
                  </div>

                  <p className="text-sm text-gray-300">{report.summary}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setExpandedReport(expandedReport === report.id ? null : report.id)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {expandedReport === report.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </button>
              </div>
            </div>

            {expandedReport === report.id && (
              <div className="mt-4 pt-4 border-t border-gray-700 animate-fadeIn">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-3">Actions Taken</h4>
                    <ul className="space-y-2">
                      {report.actions.taken.map((action, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                          <CheckCircle size={16} className="text-green-500 mt-0.5" />
                          {action}
                        </li>
                      ))}
                    </ul>

                    <h4 className="text-sm font-medium text-gray-300 mt-4 mb-3">Suggested Actions</h4>
                    <ul className="space-y-2">
                      {report.actions.suggested.map((action, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-300">
                          <AlertCircle size={16} className="text-amber-500 mt-0.5" />
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-gray-300 mb-3">Affected Systems</h4>
                    <div className="grid grid-cols-2 gap-2">
                      {report.affectedIPs.map((ip, index) => (
                        <div key={index} className="bg-gray-700 rounded px-3 py-2 text-sm text-gray-300">
                          {ip}
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 space-y-2">
                      <button
                        onClick={() => downloadReport(report, 'pdf')}
                        className="w-full flex items-center justify-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded transition-colors"
                      >
                        <Download size={16} />
                        Download PDF Report
                      </button>
                      
                      <div className="flex gap-2">
                        <button
                          onClick={() => downloadReport(report, 'json')}
                          className="flex-1 flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
                        >
                          Export JSON
                        </button>
                        <button
                          onClick={() => downloadReport(report, 'md')}
                          className="flex-1 flex items-center justify-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors"
                        >
                          Export Markdown
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>
        ))}

        {filteredReports.length === 0 && (
          <div className="text-center py-12 bg-gray-800 rounded-lg">
            <p className="text-gray-400">No reports match your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};