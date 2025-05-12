import React from 'react';
import { Card } from '../ui/Card';
import { 
  Bell,
  Bot,
  FileText,
  Save,
  Shield,
  Sliders,
  Upload
} from 'lucide-react';

export const Settings: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-white">System Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Suricata Integration */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <Shield size={20} className="text-cyan-500" />
            <h2 className="text-lg font-medium text-white">Suricata Integration</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Rule Set Configuration
              </label>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded transition-colors">
                  <Upload size={16} />
                  Upload Rules
                </button>
                <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors">
                  Download Current
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Alert Threshold
              </label>
              <input
                type="range"
                min="0"
                max="100"
                className="w-full"
                defaultValue="75"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Agent Configuration */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <Bot size={20} className="text-cyan-500" />
            <h2 className="text-lg font-medium text-white">Agent Configuration</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Operation Mode
              </label>
              <select className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm">
                <option value="reactive">Reactive (Immediate Response)</option>
                <option value="passive">Passive (Monitor Only)</option>
                <option value="learning">Learning Mode</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confidence Threshold
              </label>
              <input
                type="range"
                min="0"
                max="100"
                className="w-full"
                defaultValue="85"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Conservative</span>
                <span>Aggressive</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Report Customization */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <FileText size={20} className="text-cyan-500" />
            <h2 className="text-lg font-medium text-white">Report Customization</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Summary Length
              </label>
              <select className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm">
                <option value="brief">Brief (1-2 paragraphs)</option>
                <option value="detailed">Detailed (3-4 paragraphs)</option>
                <option value="comprehensive">Comprehensive</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Include Technical Details
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded bg-gray-700 border-gray-600" />
                  <span className="text-sm text-gray-300">Raw Log Data</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded bg-gray-700 border-gray-600" />
                  <span className="text-sm text-gray-300">System Metrics</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded bg-gray-700 border-gray-600" />
                  <span className="text-sm text-gray-300">Network Traces</span>
                </label>
              </div>
            </div>
          </div>
        </Card>

        {/* Notifications */}
        <Card>
          <div className="flex items-center gap-3 mb-4">
            <Bell size={20} className="text-cyan-500" />
            <h2 className="text-lg font-medium text-white">Notification Settings</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Integration Services
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded bg-gray-700 border-gray-600" />
                  <span className="text-sm text-gray-300">Slack</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded bg-gray-700 border-gray-600" />
                  <span className="text-sm text-gray-300">Email</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded bg-gray-700 border-gray-600" />
                  <span className="text-sm text-gray-300">PagerDuty</span>
                </label>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Notification Rules
              </label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <select className="flex-1 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm">
                    <option value="critical">Critical Severity</option>
                  </select>
                  <select className="flex-1 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm">
                    <option value="all">All Channels</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <select className="flex-1 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm">
                    <option value="high">High Severity</option>
                  </select>
                  <select className="flex-1 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm">
                    <option value="slack">Slack Only</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex justify-end gap-4">
        <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition-colors">
          Reset to Defaults
        </button>
        <button className="flex items-center gap-2 bg-cyan-600 hover:bg-cyan-500 text-white px-4 py-2 rounded transition-colors">
          <Save size={16} />
          Save Changes
        </button>
      </div>
    </div>
  );
};