import React from 'react';
import { Camera, BookOpen, HelpCircle, Leaf, Package, RefreshCw, CheckCircle2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { ActiveTab } from '../components/Navbar';
import { RegionalConfig } from '../types/waste';

interface HomeViewProps {
  setActiveTab: (tab: ActiveTab) => void;
  regionalConfig: RegionalConfig;
}

export const HomeView: React.FC<HomeViewProps> = ({ setActiveTab, regionalConfig }) => {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="relative pt-6 sm:pt-12 pb-8 border-b border-slate-200">
        <div className="max-w-4xl mx-auto text-center space-y-5 px-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>AI-Powered Household Waste Segregation</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold text-slate-900 tracking-tight leading-[1.1] text-balance">
            See It. Sort It. Sustain It.
          </h1>

          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Snap or upload a photo of any waste item in your kitchen or home. EcoLens uses computer vision to instantly identify the item, determine its primary waste stream, and guide responsible disposal.
          </p>

          {/* Regional Context Banner */}
          <div className="inline-flex items-center gap-2 text-xs text-slate-600 bg-white border border-slate-200 px-3.5 py-1.5 rounded-lg shadow-2xs font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Active Guideline: </span>
            <span className="font-semibold text-slate-900">{regionalConfig.name}</span>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
            <button
              onClick={() => setActiveTab('scanner')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white font-semibold text-sm transition-colors shadow-sm"
            >
              <Camera className="w-4 h-4" />
              <span>Scan & Value Waste Item</span>
            </button>
            <button
              onClick={() => setActiveTab('scrap_calculator')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-900 font-bold text-sm transition-colors shadow-2xs"
            >
              <span className="font-mono font-extrabold">₹</span>
              <span>Scrap Yield Calculator</span>
            </button>
            <button
              onClick={() => setActiveTab('locations')}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 font-semibold text-sm border border-slate-200 transition-colors shadow-2xs"
            >
              <span>Bangalore Centres</span>
            </button>
          </div>
        </div>

        {/* Live Scrap Commodity Ticker Strip */}
        <div className="max-w-4xl mx-auto mt-8 px-4">
          <div className="bg-slate-900 text-white rounded-xl p-3 flex flex-wrap items-center justify-between gap-3 text-xs font-mono shadow-xs">
            <div className="flex items-center gap-2 shrink-0 text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE SCRAP BENCHMARK RATES:</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-slate-300">
              <span>PET Bottles: <strong className="text-white">₹22/kg</strong></span>
              <span>Cardboard: <strong className="text-white">₹13.50/kg</strong></span>
              <span>Aluminium Cans: <strong className="text-white">₹115/kg</strong></span>
              <span>Newspaper: <strong className="text-white">₹15/kg</strong></span>
              <span>HDPE Plastic: <strong className="text-white">₹26/kg</strong></span>
            </div>
            <button
              onClick={() => setActiveTab('scrap_calculator')}
              className="text-amber-400 hover:underline text-[11px] font-sans font-semibold shrink-0"
            >
              Calculate Yield →
            </button>
          </div>
        </div>
      </section>

      {/* The Three Mandatory Primary Streams */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900">
            The 3 Primary Waste Streams
          </h2>
          <p className="text-sm text-slate-600">
            Every household waste item is strictly classified into one of three primary categories to prevent landfill contamination.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Stream 1: Wet Waste */}
          <div className="bg-white border border-emerald-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:border-emerald-300 transition-colors">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl">
                  <Leaf className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                  {regionalConfig.wetBinColor}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-display font-bold text-slate-900">Wet Waste</h3>
                <p className="text-xs text-emerald-800 font-medium mt-0.5">Biodegradable Organic Matter</p>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Kitchen scraps, fruit/vegetable peelings, cooked leftovers, coffee grounds, eggshells, and garden clippings. Biodegrades naturally into nutrient-rich compost or biogas.
              </p>
              <div className="pt-2 border-t border-slate-100">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide font-mono">
                  Common items:
                </span>
                <p className="text-xs text-slate-700 mt-1">Banana peels, tea leaves, vegetable trimmings, leftover rice, wilted flowers.</p>
              </div>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 text-xs text-emerald-800 font-semibold flex items-center gap-1">
              <span>Kept free from plastic bags</span>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Stream 2: Dry Waste */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:border-slate-300 transition-colors">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-slate-100 text-slate-800 rounded-xl">
                  <Package className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-slate-100 text-slate-800 border border-slate-200">
                  {regionalConfig.dryBinColor}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-display font-bold text-slate-900">Dry Waste</h3>
                <p className="text-xs text-slate-600 font-medium mt-0.5">Non-Biodegradable Refuse</p>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Domestic dry waste that does not decompose and cannot be easily recycled at standard mills: multi-layer packaging, chip packets, soiled paper, thermocol, and broken ceramics.
              </p>
              <div className="pt-2 border-t border-slate-100">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide font-mono">
                  Common items:
                </span>
                <p className="text-xs text-slate-700 mt-1">Snack wrappers (MLP), thermocol foam, toothbrushes, soiled napkins, wax cups.</p>
              </div>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 text-xs text-slate-700 font-semibold flex items-center gap-1">
              <span>Heads to Refuse-Derived Fuel or Landfill</span>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Stream 3: Recyclable */}
          <div className="bg-white border border-sky-200 rounded-2xl p-6 shadow-xs flex flex-col justify-between hover:border-sky-300 transition-colors">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="p-3 bg-sky-100 text-sky-800 rounded-xl">
                  <RefreshCw className="w-6 h-6" />
                </div>
                <span className="px-2.5 py-1 text-xs font-bold rounded-md bg-sky-50 text-sky-800 border border-sky-200">
                  {regionalConfig.recyclableBinColor}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-display font-bold text-slate-900">Recyclable</h3>
                <p className="text-xs text-sky-700 font-medium mt-0.5">High-Value Dry Commodities</p>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Clean recoverable materials that can be mechanically remelted or repulped into new products. Requires being empty, clean, and dry before disposal.
              </p>
              <div className="pt-2 border-t border-slate-100">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wide font-mono">
                  Common items:
                </span>
                <p className="text-xs text-slate-700 mt-1">PET water bottles (#1), aluminum beverage cans, corrugated shipping boxes, glass bottles.</p>
              </div>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-100 text-xs text-sky-800 font-semibold flex items-center gap-1">
              <span>Recovers circular manufacturing raw materials</span>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Flow */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 sm:p-10 space-y-8">
          <div className="text-center max-w-lg mx-auto space-y-1">
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-800 font-bold">
              Simple 3-Step Process
            </span>
            <h2 className="text-2xl font-display font-bold text-slate-900">
              How EcoLens Works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
              <div className="w-8 h-8 rounded-lg bg-slate-900 text-white font-mono font-bold flex items-center justify-center text-sm">
                1
              </div>
              <h3 className="font-display font-bold text-slate-900 text-base">Photograph Item</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Use your device camera or upload an image file of the waste packaging, peel, or container.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white font-mono font-bold flex items-center justify-center text-sm">
                2
              </div>
              <h3 className="font-display font-bold text-slate-900 text-base">AI Material Analysis</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Gemini 3.8 Flash inspects texture, transparency, material composition, and checks for food or grease contamination.
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-2">
              <div className="w-8 h-8 rounded-lg bg-sky-700 text-white font-mono font-bold flex items-center justify-center text-sm">
                3
              </div>
              <h3 className="font-display font-bold text-slate-900 text-base">Sort with Confidence</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Receive practical preparation steps (empty, rinse, crush), the designated bin color, and ask follow-up questions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Quiz & Learn Teaser */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="p-2.5 bg-amber-50 text-amber-800 rounded-xl w-fit">
                <HelpCircle className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-display font-bold text-slate-900">
                Test Your Segregation Knowledge
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Do you know where a greasy pizza box or a medicine blister pack goes? Challenge yourself with real-life waste item scenarios and track your streak!
              </p>
            </div>
            <button
              onClick={() => setActiveTab('quiz')}
              className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-emerald-700 transition-colors"
            >
              <span>Play Interactive Quiz</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="p-6 bg-white border border-slate-200 rounded-2xl shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="p-2.5 bg-emerald-50 text-emerald-800 rounded-xl w-fit">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-display font-bold text-slate-900">
                13 Essential Segregation Lessons
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Explore home composting, preparing recyclables, avoiding wishcycling, and understanding local municipal collection rules.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('learn')}
              className="mt-5 inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-emerald-700 transition-colors"
            >
              <span>Browse Knowledge Base</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Privacy & Trust Guarantee */}
      <section className="max-w-4xl mx-auto px-4 text-center">
        <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row items-center gap-4 text-left">
          <ShieldCheck className="w-8 h-8 text-emerald-700 shrink-0" />
          <div className="text-xs text-slate-600 leading-relaxed space-y-1">
            <p className="font-bold text-slate-900">Family-Friendly & Privacy-First by Design</p>
            <p>
              EcoLens requires zero user accounts, zero logins, and collects no personal data. Scan history and quiz records are stored exclusively in your local browser and can be cleared at any time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
