import React from 'react';
import { BarChart3, Leaf, Package, RefreshCw, Award, BookOpen, Camera, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { ClassificationResult, QuizProgress } from '../types/waste';
import { ActiveTab } from '../components/Navbar';
import { LEARN_TOPICS } from '../data/learnTopics';

interface DashboardViewProps {
  scans: ClassificationResult[];
  quizProgress: QuizProgress;
  completedLessons: string[];
  setActiveTab: (tab: ActiveTab) => void;
  onSelectScan: (scan: ClassificationResult) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  scans,
  quizProgress,
  completedLessons,
  setActiveTab,
  onSelectScan,
}) => {
  // Aggregate real stats
  const totalScans = scans.length;
  const wetScans = scans.filter((s) => s.primaryCategory === 'Wet Waste').length;
  const dryScans = scans.filter((s) => s.primaryCategory === 'Dry Waste').length;
  const recyclableScans = scans.filter((s) => s.primaryCategory === 'Recyclable').length;

  const wetPercent = totalScans > 0 ? Math.round((wetScans / totalScans) * 100) : 0;
  const dryPercent = totalScans > 0 ? Math.round((dryScans / totalScans) * 100) : 0;
  const recyclablePercent = totalScans > 0 ? Math.round((recyclableScans / totalScans) * 100) : 0;

  const quizAccuracy = quizProgress.totalAnswered > 0
    ? Math.round((quizProgress.correctAnswers / quizProgress.totalAnswered) * 100)
    : 0;

  const lessonPercent = Math.round((completedLessons.length / LEARN_TOPICS.length) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-extrabold text-slate-900 tracking-tight">
          Household Activity Dashboard
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Real-time summary of your household waste classifications, quiz performance, and completed guides.
        </p>
      </div>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Total Scanned */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-1">
          <span className="text-[11px] font-mono uppercase text-slate-500 font-semibold">Total Items</span>
          <div className="text-2xl font-bold font-mono text-slate-900 tabular-nums">{totalScans}</div>
          <p className="text-[11px] text-slate-400">Classified by EcoLens</p>
        </div>

        {/* Recyclables Found */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-1">
          <span className="text-[11px] font-mono uppercase text-sky-700 font-semibold">Recyclables</span>
          <div className="text-2xl font-bold font-mono text-sky-800 tabular-nums">{recyclableScans}</div>
          <p className="text-[11px] text-slate-400">{recyclablePercent}% of total scans</p>
        </div>

        {/* Quiz Accuracy */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-1">
          <span className="text-[11px] font-mono uppercase text-emerald-700 font-semibold">Quiz Accuracy</span>
          <div className="text-2xl font-bold font-mono text-emerald-800 tabular-nums">{quizAccuracy}%</div>
          <p className="text-[11px] text-slate-400">{quizProgress.correctAnswers}/{quizProgress.totalAnswered} correct</p>
        </div>

        {/* Learning Mastery */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-2xs space-y-1">
          <span className="text-[11px] font-mono uppercase text-amber-700 font-semibold">Guide Progress</span>
          <div className="text-2xl font-bold font-mono text-amber-800 tabular-nums">
            {completedLessons.length}/{LEARN_TOPICS.length}
          </div>
          <p className="text-[11px] text-slate-400">{lessonPercent}% completed</p>
        </div>
      </div>

      {/* Primary Category Distribution Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-display font-bold text-slate-900">
            Household Waste Stream Breakdown
          </h2>
          <span className="text-xs text-slate-400 font-mono">
            {totalScans} items recorded
          </span>
        </div>

        {totalScans === 0 ? (
          <div className="py-6 text-center text-xs text-slate-500 bg-slate-50 rounded-xl border border-slate-200">
            No waste items scanned yet. Start scanning items to view your household distribution.
          </div>
        ) : (
          <>
            {/* Visual stacked bar */}
            <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
              <div
                style={{ width: `${wetPercent}%` }}
                className="bg-emerald-600 transition-all duration-500"
                title={`Wet Waste: ${wetPercent}%`}
              />
              <div
                style={{ width: `${dryPercent}%` }}
                className="bg-slate-700 transition-all duration-500"
                title={`Dry Waste: ${dryPercent}%`}
              />
              <div
                style={{ width: `${recyclablePercent}%` }}
                className="bg-sky-600 transition-all duration-500"
                title={`Recyclable: ${recyclablePercent}%`}
              />
            </div>

            {/* Legend & Count Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Leaf className="w-4 h-4 text-emerald-700" />
                  <span className="text-xs font-semibold text-emerald-950">Wet (Organic)</span>
                </div>
                <span className="text-xs font-mono font-bold text-emerald-800">{wetScans} ({wetPercent}%)</span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4 text-slate-700" />
                  <span className="text-xs font-semibold text-slate-900">Dry (Refuse)</span>
                </div>
                <span className="text-xs font-mono font-bold text-slate-800">{dryScans} ({dryPercent}%)</span>
              </div>

              <div className="p-3 rounded-xl bg-sky-50/60 border border-sky-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-sky-700" />
                  <span className="text-xs font-semibold text-sky-950">Recyclable</span>
                </div>
                <span className="text-xs font-mono font-bold text-sky-800">{recyclableScans} ({recyclablePercent}%)</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Recent Scans Strip */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-display font-bold text-slate-900">
            Recent Household Classifications
          </h2>
          {scans.length > 0 && (
            <button
              onClick={() => setActiveTab('history')}
              className="text-xs text-emerald-700 hover:text-emerald-900 font-semibold flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          )}
        </div>

        {scans.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-500 bg-slate-50 rounded-xl space-y-3">
            <Camera className="w-6 h-6 text-slate-400 mx-auto" />
            <p>Ready to classify your first kitchen or household waste item?</p>
            <button
              onClick={() => setActiveTab('scanner')}
              className="px-4 py-2 bg-emerald-700 text-white rounded-lg text-xs font-semibold hover:bg-emerald-800 transition-colors inline-flex items-center gap-1.5"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Launch Scanner</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {scans.slice(0, 3).map((scan) => (
              <div
                key={scan.id}
                onClick={() => onSelectScan(scan)}
                className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200 transition-colors cursor-pointer space-y-2 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between gap-1 text-[11px]">
                  <span className="font-semibold text-slate-800 truncate">{scan.itemName}</span>
                  <span className="text-[10px] font-mono text-slate-500 shrink-0">{scan.primaryCategory}</span>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                  {scan.confidenceReasoning}
                </p>
                <div className="text-[10px] text-slate-400 font-mono">
                  {new Date(scan.timestamp).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Honest Environmental Integrity Note */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 space-y-1">
        <span className="font-bold text-slate-800 block">📊 Transparent Metrics Policy:</span>
        <p className="leading-relaxed">
          EcoLens reports verified user counts and quiz metrics directly from your device. We do not display synthetic estimates of carbon emissions saved or trees diverted without verified municipal scales and weighing sensors.
        </p>
      </div>
    </div>
  );
};
