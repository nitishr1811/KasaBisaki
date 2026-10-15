import React, { useState } from 'react';
import { 
  Leaf, 
  Package, 
  RefreshCw, 
  AlertTriangle, 
  CheckCircle2, 
  ChevronRight, 
  Flag, 
  Info, 
  RotateCcw,
  Sparkles,
  MapPin
} from 'lucide-react';
import { ClassificationResult, PrimaryCategory } from '../types/waste';
import { WasteChatbot } from './WasteChatbot';
import { CorrectionModal } from './CorrectionModal';

interface ClassificationResultCardProps {
  result: ClassificationResult;
  onScanAnother: () => void;
}

export const ClassificationResultCard: React.FC<ClassificationResultCardProps> = ({
  result,
  onScanAnother,
}) => {
  const [isCorrectionOpen, setIsCorrectionOpen] = useState<boolean>(false);
  const [showCorrectionToast, setShowCorrectionToast] = useState<boolean>(false);

  // Stream visual styling and iconography
  const getCategoryTheme = (category: PrimaryCategory) => {
    switch (category) {
      case 'Wet Waste':
        return {
          icon: <Leaf className="w-5 h-5 text-emerald-800" />,
          binBadgeClass: 'bg-emerald-100 text-emerald-950 border border-emerald-300',
          cardBorderClass: 'border-emerald-200',
          accentColor: 'text-emerald-800',
          indicatorBg: 'bg-emerald-800',
          streamLabel: 'Wet Waste (Biodegradable / Organic)',
        };
      case 'Recyclable':
        return {
          icon: <RefreshCw className="w-5 h-5 text-sky-800" />,
          binBadgeClass: 'bg-sky-100 text-sky-950 border border-sky-300',
          cardBorderClass: 'border-sky-200',
          accentColor: 'text-sky-800',
          indicatorBg: 'bg-sky-700',
          streamLabel: 'Recyclable Commodity (High-Value Dry)',
        };
      case 'Dry Waste':
      default:
        return {
          icon: <Package className="w-5 h-5 text-slate-800" />,
          binBadgeClass: 'bg-slate-100 text-slate-900 border border-slate-300',
          cardBorderClass: 'border-slate-300',
          accentColor: 'text-slate-800',
          indicatorBg: 'bg-slate-700',
          streamLabel: 'Dry Waste (Non-Biodegradable / Refuse)',
        };
    }
  };

  const theme = getCategoryTheme(result.primaryCategory);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Toast confirmation */}
      {showCorrectionToast && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            Thank you! Your correction has been recorded locally.
          </span>
          <button
            onClick={() => setShowCorrectionToast(false)}
            className="text-emerald-700 hover:text-emerald-900 font-bold"
          >
            ×
          </button>
        </div>
      )}

      {/* Main Analysis Card */}
      <div className={`bg-white border ${theme.cardBorderClass} rounded-2xl shadow-xs overflow-hidden`}>
        {/* Stream Banner Header */}
        <div className="p-4 sm:p-5 bg-slate-50/80 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${theme.binBadgeClass} shadow-2xs`}>
              {theme.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-bold tracking-wider text-slate-500 font-mono">
                  Primary Classification
                </span>
                <span className="text-slate-300">·</span>
                <span className="text-xs text-slate-500 font-medium">
                  {new Date(result.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-slate-900 leading-tight">
                {result.itemName}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 rounded-lg text-xs font-bold tracking-wide ${theme.binBadgeClass}`}>
              {result.primaryCategory}
            </span>
          </div>
        </div>

        {/* Card Body Grid */}
        <div className="p-5 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Left Column: Photo & Key Metadata */}
          <div className="md:col-span-5 space-y-4">
            {result.thumbnailBase64 && (
              <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 aspect-4/3 flex items-center justify-center">
                <img
                  src={result.thumbnailBase64}
                  alt={result.itemName}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/60 text-white text-[11px] font-mono">
                  Analyzed Photo
                </div>
              </div>
            )}

            {/* Material & Bin Tag */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <div className="text-xs text-slate-600">
                <span className="font-semibold text-slate-800">Material Composition: </span>
                <span>{result.materialComposition}</span>
              </div>
              <div className="text-xs text-slate-600 flex items-start gap-1.5 pt-1 border-t border-slate-200">
                <span className="font-semibold text-slate-800 shrink-0">Designated Bin: </span>
                <span className="font-medium text-slate-900">{result.binColor}</span>
              </div>
            </div>

            {/* Contamination Alert */}
            {result.isContaminated ? (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-amber-800">
                  <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Contamination Detected</span>
                </div>
                <p className="text-amber-800 leading-relaxed text-[11px]">
                  {result.contaminationDetails || 'Visible food, oil, or chemical residue may impede recycling.'}
                </p>
              </div>
            ) : (
              <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                <span className="text-[11px]">Item appears clean of heavy food or moisture contamination.</span>
              </div>
            )}

            {/* Uncertainty Notice if any */}
            {result.uncertaintyNotes && (
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 flex items-start gap-2">
                <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div className="text-[11px] leading-relaxed">
                  <span className="font-semibold text-slate-700">Observation note: </span>
                  {result.uncertaintyNotes}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Reasoning, Prep Steps & Disposal Instructions */}
          <div className="md:col-span-7 space-y-4">
            {/* Why this category */}
            <div>
              <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400 font-mono mb-1">
                Classification Reasoning
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed">
                {result.confidenceReasoning}
              </p>
            </div>

            {/* Visual Characteristics */}
            {result.visualCharacteristics.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-slate-600 mb-1.5">Visual Traits Identified:</h4>
                <div className="flex flex-wrap gap-1.5">
                  {result.visualCharacteristics.map((trait, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 bg-slate-100 text-slate-700 rounded-md text-xs border border-slate-200"
                    >
                      {trait}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Step-by-Step Preparation Checklist */}
            <div className="pt-2 border-t border-slate-100">
              <h3 className="text-xs uppercase font-bold tracking-wider text-slate-500 font-mono mb-2 flex items-center gap-1.5">
                <span>Preparation Checklist Before Disposal</span>
              </h3>
              <ol className="space-y-1.5">
                {result.preparationSteps.map((step, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed bg-slate-50 p-2 rounded-lg border border-slate-200/80"
                  >
                    <span className="w-4 h-4 rounded-full bg-slate-200 text-slate-800 text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Scrap Commodity Valuation (Waste-to-Value) */}
            {result.scrapValueEstimate && result.scrapValueEstimate.estimatedValueINR > 0 ? (
              <div className="p-4 bg-amber-50/80 border border-amber-200 rounded-xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase font-bold text-amber-900 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>Scrap Commodity Yield Valuation</span>
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-200/80 text-amber-900">
                    Est. Value: ₹{result.scrapValueEstimate.estimatedValueINR.toFixed(2)}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 text-[11px] font-mono text-amber-950">
                  <div className="bg-white/80 p-2 rounded-lg border border-amber-200/60">
                    <span className="text-[10px] text-amber-700 block">Commodity</span>
                    <span className="font-bold truncate block">{result.scrapValueEstimate.commodityName}</span>
                  </div>
                  <div className="bg-white/80 p-2 rounded-lg border border-amber-200/60">
                    <span className="text-[10px] text-amber-700 block">Market Rate</span>
                    <span className="font-bold">₹{result.scrapValueEstimate.ratePerKg.toFixed(2)}/kg</span>
                  </div>
                  <div className="bg-white/80 p-2 rounded-lg border border-amber-200/60 col-span-2 sm:col-span-1">
                    <span className="text-[10px] text-amber-700 block">Estimated Weight</span>
                    <span className="font-bold">~{result.scrapValueEstimate.estimatedUnitWeightGrams}g</span>
                  </div>
                </div>
                <p className="text-[11px] text-amber-900 leading-relaxed pt-0.5">
                  Deposit at your neighborhood DWCC or authorized scrap collector to monetize segregated recyclables.
                </p>
              </div>
            ) : result.primaryCategory === 'Wet Waste' ? (
              <div className="p-3.5 bg-emerald-50/80 border border-emerald-200 rounded-xl space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                  <Leaf className="w-4 h-4 text-emerald-700" />
                  <span>Circular Compost &amp; Biogas Yield</span>
                </div>
                <p className="text-xs text-emerald-950 leading-relaxed">
                  Transforms into 100% nutrient-dense organic fertilizer or renewable biomethane, preventing anaerobic landfill methane emissions.
                </p>
              </div>
            ) : null}

            {/* DIY Upcycling Blueprint before binning */}
            {result.upcyclingIdea && (
              <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-xl space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900">
                    <Sparkles className="w-4 h-4 text-emerald-700" />
                    <span>Upcycling Blueprint: {result.upcyclingIdea.title}</span>
                  </div>
                  <span className="text-[10px] font-mono uppercase font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    DIY Second-Life
                  </span>
                </div>
                <p className="text-xs text-emerald-950 leading-relaxed font-medium">
                  {result.upcyclingIdea.summary}
                </p>
                {result.upcyclingIdea.toolsNeeded && result.upcyclingIdea.toolsNeeded.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    <span className="text-[10px] font-mono text-emerald-800 font-semibold mr-1">Tools:</span>
                    {result.upcyclingIdea.toolsNeeded.map((tool, idx) => (
                      <span key={idx} className="px-2 py-0.5 text-[10px] bg-white border border-emerald-200 text-emerald-800 rounded">
                        {tool}
                      </span>
                    ))}
                  </div>
                )}
                {result.upcyclingIdea.steps && result.upcyclingIdea.steps.length > 0 && (
                  <ol className="space-y-1 text-xs text-emerald-950 pt-1">
                    {result.upcyclingIdea.steps.map((st, idx) => (
                      <li key={idx} className="flex items-start gap-1.5 bg-white/70 p-1.5 rounded border border-emerald-100">
                        <span className="w-3.5 h-3.5 rounded-full bg-emerald-200 text-emerald-900 text-[10px] font-mono font-bold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <span>{st}</span>
                      </li>
                    ))}
                  </ol>
                )}
              </div>
            )}

            {/* Disposal Instruction */}
            <div className="p-3.5 bg-slate-900 text-white rounded-xl space-y-1">
              <div className="text-[11px] uppercase tracking-wider text-emerald-400 font-mono font-bold">
                Disposal Instruction
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                {result.disposalInstructions}
              </p>
            </div>

            {/* Municipal Guidance */}
            <div className="flex items-start gap-2 text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <MapPin className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <div className="text-[11px] leading-relaxed">
                <span className="font-semibold text-slate-800">Regional Guidance: </span>
                {result.localGuidanceNotes}
              </div>
            </div>

            {/* Bangalore Civic Drop-off note */}
            <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl text-xs text-sky-950 flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-sky-700 shrink-0 mt-0.5" />
              <div className="text-[11px] leading-relaxed">
                <span className="font-bold text-sky-900">Bengaluru Drop-Off Alert: </span>
                Take your dry recyclables directly to BBMP / Hasiru Dala Dry Waste Collection Centres (DWCCs) across HSR Layout, Koramangala, Indiranagar, Whitefield, or Jayanagar. See all centres on the <strong>Locations</strong> page.
              </div>
            </div>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <button
            onClick={() => setIsCorrectionOpen(true)}
            className="flex items-center gap-1.5 text-slate-500 hover:text-slate-800 transition-colors"
          >
            <Flag className="w-3.5 h-3.5 text-slate-400" />
            <span>Report or Correct Result</span>
          </button>

          <button
            onClick={onScanAnother}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-medium rounded-lg transition-colors shadow-2xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Scan Another Item</span>
          </button>
        </div>
      </div>

      {/* Embedded Contextual Follow-up Chatbot */}
      <WasteChatbot itemResult={result} />

      {/* Correction Modal */}
      <CorrectionModal
        isOpen={isCorrectionOpen}
        onClose={() => setIsCorrectionOpen(false)}
        result={result}
        onCorrectionSubmitted={() => setShowCorrectionToast(true)}
      />
    </div>
  );
};
