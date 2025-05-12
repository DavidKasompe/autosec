import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Shield, 
  Brain, 
  Bot, 
  Zap, 
  Clock, 
  Lock, 
  Settings, 
  Code, 
  ArrowRight
} from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 to-blue-900/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24">
          <div className="text-center">
            <Shield className="h-16 w-16 text-cyan-500 mx-auto mb-6 animate-pulse" />
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              AI-Powered Cyber Defense
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              AutoSec combines advanced AI with real-time threat detection to protect your infrastructure 24/7. Built by engineers and AI researchers for modern security challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-medium transition-colors"
              >
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/login"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-medium transition-colors"
              >
                Open Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Intelligent Security Features
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our multi-agent system combines cutting-edge AI with robust security practices
              to provide comprehensive protection for your infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="bg-cyan-500/10 rounded-lg p-3 inline-block mb-4">
                <Brain className="h-6 w-6 text-cyan-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Autonomous Detection
              </h3>
              <p className="text-gray-400">
                Advanced AI models continuously monitor your systems for potential threats,
                providing real-time detection and analysis.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="bg-cyan-500/10 rounded-lg p-3 inline-block mb-4">
                <Bot className="h-6 w-6 text-cyan-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Multi-Agent System
              </h3>
              <p className="text-gray-400">
                Specialized AI agents work together to reconnaissance, triage, and respond
                to security incidents automatically.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
              <div className="bg-cyan-500/10 rounded-lg p-3 inline-block mb-4">
                <Zap className="h-6 w-6 text-cyan-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Adaptive Response
              </h3>
              <p className="text-gray-400">
                Reinforcement learning enables our system to improve its response
                strategies over time based on real-world threats.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Why AutoSec Section */}
      <div className="py-24 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Why Choose AutoSec?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Built with modern technology and designed for scalability, AutoSec provides
              enterprise-grade security for organizations of all sizes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start space-x-4">
              <div className="bg-cyan-500/10 rounded-lg p-3">
                <Clock className="h-6 w-6 text-cyan-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">24/7 Monitoring</h3>
                <p className="text-gray-400">
                  Continuous monitoring and real-time alerts ensure your systems are
                  protected around the clock.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-cyan-500/10 rounded-lg p-3">
                <Lock className="h-6 w-6 text-cyan-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Secure Backend</h3>
                <p className="text-gray-400">
                  Built on Supabase for enterprise-grade security, real-time updates,
                  and scalable infrastructure.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-cyan-500/10 rounded-lg p-3">
                <Settings className="h-6 w-6 text-cyan-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Customizable</h3>
                <p className="text-gray-400">
                  Flexible AI policies and configuration options to match your
                  organization's security requirements.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-cyan-500/10 rounded-lg p-3">
                <Code className="h-6 w-6 text-cyan-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white mb-2">Open Source</h3>
                <p className="text-gray-400">
                  Community-driven development with transparent security practices and
                  extensible architecture.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-cyan-600 to-blue-600 rounded-2xl p-8 md:p-12 shadow-xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Secure Your Infrastructure?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join organizations worldwide using AutoSec to protect their systems
                with AI-powered defense.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/signup"
                  className="inline-flex items-center px-8 py-4 rounded-lg bg-white hover:bg-gray-100 text-gray-900 font-medium transition-colors"
                >
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link
                  to="/docs"
                  className="inline-flex items-center px-8 py-4 rounded-lg bg-gray-800 hover:bg-gray-700 text-white font-medium transition-colors"
                >
                  View Documentation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};