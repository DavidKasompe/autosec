import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { HomePage } from './components/home/HomePage';
import { Layout } from './components/layout/Layout';
import { Dashboard } from './components/dashboard/Dashboard';
import { Alerts } from './components/alerts/Alerts';
import { Reports } from './components/reports/Reports';
import { Settings } from './components/settings/Settings';
import { LoginForm } from './components/auth/LoginForm';
import { SignupForm } from './components/auth/SignupForm';
import { PricingPage } from './components/pricing/PricingPage';
import { useRealTimeData } from './hooks/useRealTimeData';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import './index.css';

// Add global styles for animations
const globalStyles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes lineDrawIn {
    from { stroke-dasharray: 1000; stroke-dashoffset: 1000; }
    to { stroke-dasharray: 1000; stroke-dashoffset: 0; }
  }
  
  .animate-fadeIn {
    animation: fadeIn 0.5s ease-out forwards;
  }
  
  .animate-lineDrawIn {
    animation: lineDrawIn 1.5s ease-out forwards;
  }
`;

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

function App() {
  const {
    threatEvents,
    agents,
    incidentReports,
    anomalyData,
    systemStatus,
    lastUpdate,
    resolveThreat,
    resolveIncident
  } = useRealTimeData();

  const alertCount = threatEvents.filter(
    threat => !threat.resolved && (threat.severity === 'critical' || threat.severity === 'high')
  ).length;

  return (
    <BrowserRouter>
      <AuthProvider>
        <style>{globalStyles}</style>
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/pricing" element={<PricingPage />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Layout 
                  systemStatus={systemStatus} 
                  lastUpdate={lastUpdate}
                  alertCount={alertCount}
                >
                  <Outlet />
                </Layout>
              </PrivateRoute>
            }
          >
             <Route
              index
              element={
                <Dashboard 
                  threatEvents={threatEvents}
                  agents={agents}
                  incidentReports={incidentReports}
                  anomalyData={anomalyData}
                  resolveThreat={resolveThreat}
                  resolveIncident={resolveIncident}
                />
              }
            />
            <Route
              path="alerts"
              element={
                <Alerts 
                  threats={threatEvents}
                  onResolve={resolveThreat}
                />
              }
            />
             <Route
              path="reports"
              element={
                <Reports 
                  reports={incidentReports}
                  onResolve={resolveIncident}
                />
              }
            />
            <Route path="settings" element={<Settings />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;