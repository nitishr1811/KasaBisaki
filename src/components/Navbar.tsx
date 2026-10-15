import React from 'react';
import { Camera, BookOpen, HelpCircle, History, BarChart3, ShieldCheck, Settings as SettingsIcon } from 'lucide-react';

export type ActiveTab = 'home' | 'scanner' | 'scrap_calculator' | 'locations' | 'upcycling' | 'learn' | 'quiz' | 'history' | 'dashboard' | 'credits' | 'settings';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  scansCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, scansCount }) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FBFBFA]/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4 sm:gap-8">
          {/* Zone 1: Brand wordmark in display face */}
          <button
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 rounded-md shrink-0"
            aria-label="EcoLens Home"
          >
            <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-display font-bold text-lg shadow-xs">
              E
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg sm:text-xl tracking-tight text-slate-900 leading-tight">
                EcoLens
              </span>
              <span className="text-[10px] text-slate-500 font-medium tracking-wide uppercase hidden sm:inline">
                Waste-to-Value
              </span>
            </div>
          </button>

          {/* Zone 2: Navigation Links (Single-line, unboxed, subtle hover) */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'home'
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => setActiveTab('scanner')}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'scanner'
                  ? 'bg-emerald-50 text-emerald-900 font-semibold border border-emerald-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Scan Waste
            </button>
            <button
              onClick={() => setActiveTab('scrap_calculator')}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'scrap_calculator'
                  ? 'bg-amber-50 text-amber-900 font-semibold border border-amber-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Scrap Value
            </button>
            <button
              onClick={() => setActiveTab('locations')}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'locations'
                  ? 'bg-emerald-50 text-emerald-900 font-semibold border border-emerald-200'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Locations (Bangalore)
            </button>
            <button
              onClick={() => setActiveTab('upcycling')}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'upcycling'
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Upcycling
            </button>
            <button
              onClick={() => setActiveTab('learn')}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'learn'
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Learn
            </button>
            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'quiz'
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Quiz
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'history'
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              History
              {scansCount > 0 && (
                <span className="ml-1 text-[11px] text-slate-500 font-mono tabular-nums">
                  ({scansCount})
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'dashboard'
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('credits')}
              className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                activeTab === 'credits'
                  ? 'bg-slate-100 text-slate-900 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Credits
            </button>
          </nav>

          {/* Zone 3: Primary Action & Settings */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setActiveTab('settings')}
              title="Regional Guidelines & Settings"
              aria-label="Settings"
              className={`p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors ${
                activeTab === 'settings' ? 'bg-slate-100 text-slate-900' : ''
              }`}
            >
              <SettingsIcon className="w-5 h-5" />
            </button>

            <button
              onClick={() => setActiveTab('scanner')}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-sm font-semibold text-white bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 rounded-lg shadow-xs transition-colors whitespace-nowrap"
            >
              <Camera className="w-4 h-4" />
              <span>Scan Item</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation Bar for touch ergonomics */}
      <div className="lg:hidden flex items-center justify-around border-t border-slate-200 bg-white py-1.5 px-1 overflow-x-auto">
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 text-[11px] font-medium shrink-0 ${
            activeTab === 'home' ? 'text-emerald-700 font-semibold' : 'text-slate-500'
          }`}
        >
          <div className="w-4 h-4 text-center">🏠</div>
          <span>Home</span>
        </button>
        <button
          onClick={() => setActiveTab('scanner')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 text-[11px] font-medium shrink-0 ${
            activeTab === 'scanner' ? 'text-emerald-700 font-semibold' : 'text-slate-500'
          }`}
        >
          <Camera className="w-4 h-4" />
          <span>Scanner</span>
        </button>
        <button
          onClick={() => setActiveTab('scrap_calculator')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 text-[11px] font-medium shrink-0 ${
            activeTab === 'scrap_calculator' ? 'text-amber-700 font-semibold' : 'text-slate-500'
          }`}
        >
          <div className="w-4 h-4 text-center font-bold font-mono">₹</div>
          <span>Scrap</span>
        </button>
        <button
          onClick={() => setActiveTab('locations')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 text-[11px] font-medium shrink-0 ${
            activeTab === 'locations' ? 'text-emerald-700 font-semibold' : 'text-slate-500'
          }`}
        >
          <div className="w-4 h-4 text-center">📍</div>
          <span>Centres</span>
        </button>
        <button
          onClick={() => setActiveTab('upcycling')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 text-[11px] font-medium shrink-0 ${
            activeTab === 'upcycling' ? 'text-emerald-700 font-semibold' : 'text-slate-500'
          }`}
        >
          <div className="w-4 h-4 text-center">✂️</div>
          <span>Upcycle</span>
        </button>
        <button
          onClick={() => setActiveTab('learn')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 text-[11px] font-medium shrink-0 ${
            activeTab === 'learn' ? 'text-emerald-700 font-semibold' : 'text-slate-500'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Learn</span>
        </button>
        <button
          onClick={() => setActiveTab('dashboard')}
          className={`flex flex-col items-center gap-0.5 py-1 px-2 text-[11px] font-medium shrink-0 ${
            activeTab === 'dashboard' ? 'text-emerald-700 font-semibold' : 'text-slate-500'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Stats</span>
        </button>
      </div>
    </header>
  );
};
