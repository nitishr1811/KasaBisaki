import React from 'react';
import { ActiveTab } from './Navbar';
import { RegionalConfig } from '../types/waste';
import { ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: ActiveTab) => void;
  regionalConfig: RegionalConfig;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, regionalConfig }) => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-emerald-700 text-white flex items-center justify-center font-display font-bold text-xs">
                E
              </div>
              <span className="font-display font-bold text-lg text-slate-900 tracking-tight">
                EcoLens
              </span>
            </div>
            <p className="text-xs text-slate-500">
              See It. Sort It. Sustain It. · AI-Powered Household Waste Segregation
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-600">
            <button
              onClick={() => setActiveTab('home')}
              className="hover:text-slate-900 transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab('scanner')}
              className="hover:text-slate-900 transition-colors"
            >
              Scan Waste
            </button>
            <button
              onClick={() => setActiveTab('learn')}
              className="hover:text-slate-900 transition-colors"
            >
              Learn Hub
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className="hover:text-slate-900 transition-colors"
            >
              Interactive Quiz
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className="hover:text-slate-900 transition-colors"
            >
              Scan History
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className="hover:text-slate-900 transition-colors"
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('credits')}
              className="hover:text-emerald-700 font-semibold transition-colors flex items-center gap-1 text-emerald-800"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Credits & Sources</span>
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className="hover:text-slate-900 transition-colors"
            >
              Settings
            </button>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            <span>Regional Preset: </span>
            <span className="font-semibold text-slate-700">{regionalConfig.name}</span>
          </div>

          <div className="flex items-center gap-1">
            <span>Built for responsible household waste management. 100% verified GitHub & Stack Overflow provenance.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
