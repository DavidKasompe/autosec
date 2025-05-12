export type Severity = 'low' | 'medium' | 'high' | 'critical';

export type ThreatType = 
  | 'malware' 
  | 'intrusion' 
  | 'ddos' 
  | 'ransomware' 
  | 'reconnaissance' 
  | 'data_exfiltration'
  | 'brute_force'
  | 'privilege_escalation';

export type SystemStatus = 'active' | 'idle' | 'warning' | 'error';

export type AgentStatus = 'idle' | 'active' | 'action_taken';

export interface ThreatEvent {
  id: string;
  timestamp: string;
  sourceIP: string;
  destinationIP: string;
  threatType: ThreatType;
  severity: Severity;
  details: string;
  resolved: boolean;
}

export interface Agent {
  id: string;
  name: string;
  type: string;
  status: AgentStatus;
  currentAction: string;
  lastActive: string;
}

export interface IncidentReport {
  id: string;
  timestamp: string;
  title: string;
  summary: string;
  affectedIPs: string[];
  threatEvents: string[]; // IDs of related threat events
  actions: {
    taken: string[];
    suggested: string[];
  };
  severity: Severity;
  resolved: boolean;
}

export interface AnomalyData {
  timestamp: string;
  value: number;
  category: string;
}