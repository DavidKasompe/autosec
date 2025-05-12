import React from 'react';
import { ThreatTimeline } from './ThreatTimeline';
import { AgentResponsePanel } from './AgentResponsePanel';
import { AnomalyGraph } from './AnomalyGraph';
import { IncidentReportViewer } from './IncidentReportViewer';
import { ThreatEvent, Agent, IncidentReport, SystemStatus, AnomalyData } from '../../types';

interface DashboardProps {
  threatEvents: ThreatEvent[];
  agents: Agent[];
  incidentReports: IncidentReport[];
  anomalyData: AnomalyData[];
  resolveThreat: (id: string) => void;
  resolveIncident: (id: string) => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  threatEvents,
  agents,
  incidentReports,
  anomalyData,
  resolveThreat,
  resolveIncident
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <ThreatTimeline 
          threats={threatEvents} 
          onResolve={resolveThreat} 
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AgentResponsePanel agents={agents} />
        <AnomalyGraph data={anomalyData} />
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <IncidentReportViewer 
          reports={incidentReports}
          onResolve={resolveIncident}
        />
      </div>
    </div>
  );
};