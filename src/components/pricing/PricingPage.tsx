import React from 'react';
import { Shield, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Free',
    price: '0',
    description: 'Perfect for testing and evaluation',
    features: [
      '1 Agent',
      'Basic threat detection',
      'Manual reports',
      'Community support',
      '24-hour log retention'
    ],
    cta: 'Get Started',
    highlighted: false
  },
  {
    name: 'Pro',
    price: '29',
    description: 'For growing security teams',
    features: [
      '5 Agents',
      'Advanced threat detection',
      'AI-powered reports',
      'Real-time anomaly detection',
      'Email support',
      '30-day log retention',
      'Custom alert rules'
    ],
    cta: 'Start Free Trial',
    highlighted: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'For organizations requiring maximum security',
    features: [
      'Unlimited agents',
      'Custom ML models',
      'Advanced API access',
      'Dedicated support',
      'SLA guarantee',
      '1-year log retention',
      'SIEM integration',
      'Custom deployment'
    ],
    cta: 'Contact Sales',
    highlighted: false
  }
];

export const PricingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <Shield className="mx-auto h-12 w-12 text-cyan-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-white sm:text-4xl">
            Choose Your Security Level
          </h2>
          <p className="mt-4 text-xl text-gray-400">
            Protect your infrastructure with AI-powered defense
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-lg shadow-lg divide-y divide-gray-700 ${
                plan.highlighted
                  ? 'border-2 border-cyan-500 bg-gray-800'
                  : 'border border-gray-700 bg-gray-800'
              }`}
            >
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                <p className="mt-4 text-sm text-gray-400">{plan.description}</p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-white">
                    ${plan.price}
                  </span>
                  {plan.price !== 'Custom' && (
                    <span className="text-base font-medium text-gray-400">/month</span>
                  )}
                </p>
                <Link
                  to={plan.price === 'Custom' ? '/contact' : '/signup'}
                  className={`mt-8 block w-full py-3 px-6 rounded-md text-center font-medium ${
                    plan.highlighted
                      ? 'bg-cyan-500 hover:bg-cyan-600 text-white'
                      : 'bg-gray-700 hover:bg-gray-600 text-white'
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
              <div className="px-6 pt-6 pb-8">
                <h4 className="text-sm font-medium text-gray-400 uppercase tracking-wide">
                  What's included
                </h4>
                <ul className="mt-6 space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex">
                      <Check className="flex-shrink-0 h-5 w-5 text-cyan-500" />
                      <span className="ml-3 text-sm text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="text-xl font-bold text-white">
            Need a custom solution?
          </h3>
          <p className="mt-4 text-lg text-gray-400">
            Contact our sales team for a tailored security package
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-cyan-600 hover:bg-cyan-700"
          >
            Talk to Sales
          </Link>
        </div>
      </div>
    </div>
  );
};