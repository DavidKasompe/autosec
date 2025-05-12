import { useState, useEffect } from 'react';
import { 
  initialThreatEvents, 
  initialAgents, 
  initialIncidentReports,
  initialAnomalyData,
  generateNewThreatEvent,
  updateAgentStatuses,
  generateIncidentReport
} from '../data/mockData';
import { ThreatEvent, Agent, IncidentReport, SystemStatus, AnomalyData } from '../types';

export function useRealTimeData() {
  const [threatEvents, setThreatEvents] = useState<ThreatEvent[]>(initialThreatEvents);
  const [agents, setAgents] = useState<Agent[]>(initialAgents);
  const [incidentReports, setIncidentReports] = useState<IncidentReport[]>(initialIncidentReports);
  const [anomalyData, setAnomalyData] = useState<AnomalyData[]>(initialAnomalyData);
  const [systemStatus, setSystemStatus] = useState<SystemStatus>('active');
  const [lastUpdate, setLastUpdate] = useState<string>(new Date().toISOString());

  // Simulate real-time updates
  useEffect(() => {
    // Random interval between 10-20 seconds for threat events
    const threatInterval = setInterval(() => {
      if (Math.random() < 0.7) { // 70% chance to generate a new threat
        const newThreat = generateNewThreatEvent();
        setThreatEvents(prev => [newThreat, ...prev]);
        setLastUpdate(new Date().toISOString());
        
        // If it's a high severity threat, update system status
        if (newThreat.severity === 'critical' || newThreat.severity === 'high') {
          setSystemStatus('warning');
          // Reset to active after 30 seconds
          setTimeout(() => setSystemStatus('active'), 30000);
        }
      }
    }, 10000 + Math.random() * 10000);
    
    // Update agent statuses every 8-15 seconds
    const agentInterval = setInterval(() => {
      const updatedAgents = updateAgentStatuses(agents);
      setAgents(updatedAgents);
      setLastUpdate(new Date().toISOString());
    }, 8000 + Math.random() * 7000);
    
    // Generate incident reports every 30-45 seconds
    const reportInterval = setInterval(() => {
      const newReport = generateIncidentReport(threatEvents);
      if (newReport) {
        setIncidentReports(prev => [newReport, ...prev]);
        setLastUpdate(new Date().toISOString());
      }
    }, 30000 + Math.random() * 15000);
    
    // Update anomaly data every 20 seconds
    const anomalyInterval = setInterval(() => {
      setAnomalyData(prev => {
        // Add new data points
        const newData: AnomalyData[] = [...prev];
        const categories = ['network_traffic', 'authentication', 'system_resources', 'data_access'];
        
        categories.forEach(category => {
          // Base value + random noise + occasional spikes
          let value = 0.3 + Math.random() * 0.3;
          
          // Add occasional anomaly spikes
          if (Math.random() < 0.1) {
            value += Math.random() * 0.7;
          }
          
          newData.push({
            timestamp: new Date().toISOString(),
            value,
            category
          });
        });
        
        // Keep only the last 24 hours of data
        const twentyFourHoursAgo = Date.now() - 24 * 60 * 60 * 1000;
        return newData.filter(item => new Date(item.timestamp).getTime() > twentyFourHoursAgo);
      });
      
      setLastUpdate(new Date().toISOString());
    }, 20000);

    return () => {
      clearInterval(threatInterval);
      clearInterval(agentInterval);
      clearInterval(reportInterval);
      clearInterval(anomalyInterval);
    };
  }, [agents, threatEvents]);

  // Function to resolve a threat
  const resolveThreat = (id: string) => {
    setThreatEvents(prev => 
      prev.map(threat => 
        threat.id === id ? { ...threat, resolved: true } : threat
      )
    );
  };

  // Function to resolve an incident
  const resolveIncident = (id: string) => {
    setIncidentReports(prev => 
      prev.map(report => 
        report.id === id ? { ...report, resolved: true } : report
      )
    );
  };

  return {
    threatEvents,
    agents,
    incidentReports,
    anomalyData,
    systemStatus,
    lastUpdate,
    resolveThreat,
    resolveIncident
  };
}