import React, { useState } from 'react';
import { Sparkles, Scissors, Clock, Wrench, CheckCircle2, ChevronDown, ChevronUp, Leaf, ArrowRight } from 'lucide-react';
import { UPCYCLING_PROJECTS, UpcyclingProject } from '../data/upcyclingProjects';

export const UpcyclingView: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>('upcycle-self-watering-planter');

  const categories = ['All', 'Plastics', 'Paper & Cardboard', 'Glass', 'Metals', 'Kitchen Organics'];

  const filteredProjects = UPCYCLING_PROJECTS.filter((p) => {
    return selectedCategory === 'All' || p.category === selectedCategory;
  });

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 font-mono">
          <Scissors className="w-3.5 h-3.5 text-emerald-600" />
          <span>Zero-Cost Second Life Studio</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
          Household Upcycling Blueprints
        </h1>
        <p className="text-sm text-slate-600">
          Before discarding containers and packaging, discover practical DIY projects to repurpose waste into garden planters, organizers, and kitchen cleaners.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center justify-center gap-1.5 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              selectedCategory === cat
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects List */}
      <div className="space-y-4">
        {filteredProjects.map((project) => {
          const isExpanded = expandedId === project.id;

          return (
            <div
              key={project.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs transition-all hover:border-slate-300"
            >
              <div
                onClick={() => toggleExpand(project.id)}
                className="p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/70 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase font-bold text-slate-400">
                      {project.category}
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="text-xs font-mono font-semibold text-emerald-700">
                      {project.difficulty}
                    </span>
                  </div>
                  <h3 className="text-lg font-display font-bold text-slate-900">
                    {project.title}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Target Material: <span className="font-semibold text-slate-700">{project.targetWasteMaterial}</span>
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-slate-400 hidden sm:inline">
                    {isExpanded ? 'Hide Steps' : 'View Guide'}
                  </span>
                  {isExpanded ? (
                    <ChevronUp className="w-5 h-5 text-slate-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-slate-500" />
                  )}
                </div>
              </div>

              {isExpanded && (
                <div className="px-5 pb-6 pt-2 border-t border-slate-100 space-y-4 animate-in fade-in duration-150">
                  {/* Benefits & Impact row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs">
                    <div>
                      <span className="font-bold text-slate-800 block text-[11px] uppercase font-mono">Household Value</span>
                      <p className="text-slate-600 mt-0.5 leading-snug">{project.householdBenefit}</p>
                    </div>
                    <div>
                      <span className="font-bold text-emerald-800 block text-[11px] uppercase font-mono">Waste Diverted</span>
                      <p className="text-emerald-950 mt-0.5 leading-snug">{project.environmentalValue}</p>
                    </div>
                  </div>

                  {/* Tools Needed */}
                  <div>
                    <h4 className="text-xs font-bold text-slate-700 uppercase font-mono tracking-wider flex items-center gap-1.5 mb-1.5">
                      <Wrench className="w-3.5 h-3.5 text-slate-500" />
                      <span>Items & Tools Required</span>
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {project.toolsNeeded.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 text-xs bg-slate-100 text-slate-700 rounded-md border border-slate-200"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Step-by-Step Instructions */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <h4 className="text-xs font-bold text-slate-700 uppercase font-mono tracking-wider">
                      Step-by-Step Blueprint
                    </h4>
                    <div className="space-y-2 text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {project.steps.map((s, idx) => (
                        <div key={idx} className="flex items-start gap-2 bg-slate-50/50 p-2.5 rounded-lg border border-slate-200/60">
                          <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 font-mono font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <p className="flex-1">{s.replace(/^\d+\.\s*/, '')}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
