import { Agent, IncidentReport, ThreatEvent, AnomalyData } from '../types';

const generateRandomIP = () => {
  return Array(4).fill(0).map(() => Math.floor(Math.random() * 256)).join('.');
};

// Initial threat events
export const initialThreatEvents: ThreatEvent[] = [
  {
    id: '1',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    sourceIP: '45.132.192.54',
    destinationIP: '10.0.0.12',
    threatType: 'reconnaissance',
    severity: 'medium',
    details: 'Port scanning detected from external IP',
    resolved: false
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    sourceIP: '187.213.98.12',
    destinationIP: '10.0.0.5',
    threatType: 'brute_force',
    severity: 'high',
    details: 'Multiple failed authentication attempts on admin portal',
    resolved: true
  },
  {
    id: '3',
    timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(), 
    sourceIP: '103.87.56.234',
    destinationIP: '10.0.0.8',
    threatType: 'malware',
    severity: 'critical',
    details: 'Suspicious file execution detected in user directory',
    resolved: false
  },
  {
    id: '4',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    sourceIP: '10.0.0.15', 
    destinationIP: '204.79.197.200',
    threatType: 'data_exfiltration',
    severity: 'high',
    details: 'Unusual data transfer to external IP',
    resolved: false
  },
  {
    id: '5',
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    sourceIP: '10.0.0.22',
    destinationIP: '10.0.0.1',
    threatType: 'privilege_escalation',
    severity: 'high',
    details: 'Attempt to elevate privileges detected',
    resolved: true
  }
];

// Initial agents
export const initialAgents: Agent[] = [
  {
    id: '1',
    name: 'Network Guardian',
    type: 'Network Security',
    status: 'active',
    currentAction: 'Monitoring traffic patterns',
    lastActive: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Access Defender',
    type: 'Authentication',
    status: 'action_taken',
    currentAction: 'Blocking suspicious IP 187.213.98.12',
    lastActive: new Date(Date.now() - 1000 * 60 * 2).toISOString()
  },
  {
    id: '3',
    name: 'Data Sentinel',
    type: 'Data Protection',
    status: 'idle',
    currentAction: 'Standby',
    lastActive: new Date(Date.now() - 1000 * 60 * 10).toISOString()
  },
  {
    id: '4',
    name: 'Endpoint Protector',
    type: 'Endpoint Security',
    status: 'active',
    currentAction: 'Scanning system files',
    lastActive: new Date().toISOString()
  },
];

// Initial incident reports
export const initialIncidentReports: IncidentReport[] = [
  {
    id: '1',
    timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
    title: 'Brute Force Attack Attempt',
    summary: 'Multiple failed login attempts detected from external IP 187.213.98.12 targeting the admin portal. Pattern suggests automated brute force attack.',
    affectedIPs: ['10.0.0.5'],
    threatEvents: ['2'],
    actions: {
      taken: [
        'Temporarily blocked source IP',
        'Increased login attempt monitoring',
        'Alerted admin via email'
      ],
      suggested: [
        'Review admin portal security controls',
        'Implement rate limiting on login attempts',
        'Consider adding CAPTCHA verification'
      ]
    },
    severity: 'high',
    resolved: true
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    title: 'Potential Malware Detected',
    summary: 'Suspicious file with known malware signature detected on workstation 10.0.0.8. File was quarantined before execution completed.',
    affectedIPs: ['10.0.0.8'],
    threatEvents: ['3'],
    actions: {
      taken: [
        'Quarantined suspicious file',
        'Initiated deep scan of affected system',
        'Isolated workstation from network'
      ],
      suggested: [
        'Update antivirus definitions across network',
        'Review user training on email attachments',
        'Scan all systems for similar files'
      ]
    },
    severity: 'critical',
    resolved: false
  },
  {
    id: '3',
    timestamp: new Date(Date.now() - 1000 * 60 * 50).toISOString(),
    title: 'Unusual Data Transfer',
    summary: 'Unusual outbound data transfer detected from internal host 10.0.0.15 to external IP. Volume and destination suggest potential data exfiltration.',
    affectedIPs: ['10.0.0.15'],
    threatEvents: ['4'],
    actions: {
      taken: [
        'Throttled connection to external IP',
        'Captured packet samples for analysis',
        'Alerted security team'
      ],
      suggested: [
        'Investigate user activity on affected system',
        'Review firewall rules for outbound connections',
        'Consider implementing DLP solution'
      ]
    },
    severity: 'high',
    resolved: false
  }
];

// Generate anomaly data for the past 24 hours
export const generateAnomalyData = (): AnomalyData[] => {
  const categories = ['network_traffic', 'authentication', 'system_resources', 'data_access'];
  const data: AnomalyData[] = [];
  
  // Generate 24 hours of data points at 15-minute intervals
  for (let i = 0; i < 24 * 4; i++) {
    const timestamp = new Date(Date.now() - (24 * 60 * 60 * 1000) + (i * 15 * 60 * 1000)).toISOString();
    
    categories.forEach(category => {
      // Base value + random noise + occasional spikes
      let value = 0.3 + Math.random() * 0.3;
      
      // Add occasional anomaly spikes (higher probability for more recent timestamps)
      if (Math.random() < 0.05 * (i / (24 * 4))) {
        value += Math.random() * 0.7;
      }
      
      data.push({
        timestamp,
        value,
        category
      });
    });
  }
  
  return data;
};

export const initialAnomalyData = generateAnomalyData();

// Function to generate a new random threat event
export const generateNewThreatEvent = (): ThreatEvent => {
  const threatTypes: ThreatType[] = ['malware', 'intrusion', 'ddos', 'ransomware', 'reconnaissance', 'data_exfiltration', 'brute_force', 'privilege_escalation'];
  const severities: Severity[] = ['low', 'medium', 'high', 'critical'];
  
  const id = `${Date.now()}`;
  const threatType = threatTypes[Math.floor(Math.random() * threatTypes.length)];
  const severity = severities[Math.floor(Math.random() * severities.length)];
  
  let details = '';
  switch (threatType) {
    case 'malware':
      details = 'Potential malware activity detected';
      break;
    case 'intrusion':
      details = 'Possible unauthorized access attempt';
      break;
    case 'ddos':
      details = 'Unusual traffic volume detected';
      break;
    case 'ransomware':
      details = 'Suspicious encryption activity';
      break;
    case 'reconnaissance':
      details = 'Port scanning detected';
      break;
    case 'data_exfiltration':
      details = 'Unusual outbound data transfer';
      break;
    case 'brute_force':
      details = 'Multiple failed authentication attempts';
      break;
    case 'privilege_escalation':
      details = 'Attempt to elevate privileges';
      break;
    default:
      details = 'Unknown threat activity';
  }
  
  return {
    id,
    timestamp: new Date().toISOString(),
    sourceIP: generateRandomIP(),
    destinationIP: `10.0.0.${Math.floor(Math.random() * 254) + 1}`,
    threatType,
    severity,
    details,
    resolved: false
  };
};

// Function to update agent states
export const updateAgentStatuses = (agents: Agent[]): Agent[] => {
  return agents.map(agent => {
    // 30% chance to change agent status
    if (Math.random() < 0.3) {
      const statuses: AgentStatus[] = ['idle', 'active', 'action_taken'];
      const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      let newAction = '';
      if (newStatus === 'idle') {
        newAction = 'Standby';
      } else if (newStatus === 'active') {
        const actions = [
          'Monitoring traffic patterns', 
          'Scanning system files', 
          'Analyzing authentication logs', 
          'Checking file integrity'
        ];
        newAction = actions[Math.floor(Math.random() * actions.length)];
      } else {
        const actions = [
          `Blocking suspicious IP ${generateRandomIP()}`,
          'Isolating affected endpoint',
          'Quarantining suspicious file',
          'Enforcing additional authentication'
        ];
        newAction = actions[Math.floor(Math.random() * actions.length)];
      }
      
      return {
        ...agent,
        status: newStatus,
        currentAction: newAction,
        lastActive: newStatus !== 'idle' ? new Date().toISOString() : agent.lastActive
      };
    }
    
    return agent;
  });
};

// Function to generate a new incident report based on threat events
export const generateIncidentReport = (threatEvents: ThreatEvent[]): IncidentReport | null => {
  // Only generate a report if there are unreported critical or high threats
  const unreportedThreats = threatEvents.filter(
    event => (event.severity === 'critical' || event.severity === 'high') && 
    !initialIncidentReports.some(report => report.threatEvents.includes(event.id))
  );
  
  if (unreportedThreats.length === 0) return null;
  
  // Use the most recent unreported threat
  const latestThreat = unreportedThreats.sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )[0];
  
  // Generate report title based on threat type
  let title = '';
  switch (latestThreat.threatType) {
    case 'malware':
      title = 'Malware Detection Incident';
      break;
    case 'ransomware':
      title = 'Potential Ransomware Activity';
      break;
    case 'data_exfiltration':
      title = 'Data Exfiltration Attempt';
      break;
    case 'brute_force':
      title = 'Brute Force Attack Detected';
      break;
    default:
      title = `${latestThreat.threatType.replace('_', ' ')} Incident`;
  }
  
  // Generate actions taken and suggested
  const actionsTaken = [];
  const actionsSuggested = [];
  
  if (latestThreat.threatType === 'brute_force') {
    actionsTaken.push('Temporarily blocked source IP', 'Increased login monitoring');
    actionsSuggested.push('Implement multi-factor authentication', 'Review account lockout policies');
  } else if (latestThreat.threatType === 'malware' || latestThreat.threatType === 'ransomware') {
    actionsTaken.push('Isolated affected system', 'Initiated malware scan');
    actionsSuggested.push('Update endpoint protection', 'Review user permissions');
  } else if (latestThreat.threatType === 'data_exfiltration') {
    actionsTaken.push('Blocked outbound connection', 'Captured traffic for analysis');
    actionsSuggested.push('Implement data loss prevention', 'Review firewall rules');
  } else {
    actionsTaken.push('Alerted security team', 'Increased monitoring');
    actionsSuggested.push('Review security controls', 'Update threat detection rules');
  }
  
  return {
    id: `${Date.now()}`,
    timestamp: new Date().toISOString(),
    title,
    summary: `${title} involving IP ${latestThreat.sourceIP} targeting ${latestThreat.destinationIP}. ${latestThreat.details}`,
    affectedIPs: [latestThreat.destinationIP],
    threatEvents: [latestThreat.id],
    actions: {
      taken: actionsTaken,
      suggested: actionsSuggested
    },
    severity: latestThreat.severity,
    resolved: false
  };
};