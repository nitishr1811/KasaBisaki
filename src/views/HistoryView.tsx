import React, { useState } from 'react';
import { History as HistoryIcon, Search, Trash2, Leaf, Package, RefreshCw, X, AlertCircle } from 'lucide-react';
import { ClassificationResult, PrimaryCategory } from '../types/waste';
import { storageService } from '../services/storageService';

interface HistoryViewProps {
  scans: ClassificationResult[];
  onScansUpdated: () => void;
  onSelectScan: (scan: ClassificationResult) => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  scans,
  onScansUpdated,
  onSelectScan,
}) => {
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    storageService.deleteScanResult(id);
    onScansUpdated();
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to delete your entire scan history?')) {
      storageService.clearScanHistory();
      onScansUpdated();
    }
  };

  const filteredScans = scans.filter((scan) => {
    const matchesCategory = filterCategory === 'All' || scan.primaryCategory === filterCategory;
    const q = searchQuery.toLowerCase().trim();
    if (!q) return matchesCategory;

    const matchesSearch =
      scan.itemName.toLowerCase().includes(q) ||
      scan.materialComposition.toLowerCase().includes(q) ||
      scan.confidenceReasoning.toLowerCase().includes(q);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-extrabold text-slate-900 tracking-tight">
            Waste Scan History
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Review previous item classifications and disposal guidance stored locally on this device.
          </p>
        </div>

        {scans.length > 0 && (
          <button
            onClick={handleClearAll}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg border border-rose-200 transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>
        )}
      </div>

      {/* Toolbar: Search & Category Filter */}
      {scans.length > 0 && (
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search previous scans..."
              className="w-full pl-9 pr-8 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 text-slate-900"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-1 overflow-x-auto">
            {['All', 'Wet Waste', 'Dry Waste', 'Recyclable'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                  filterCategory === cat
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Scans List / Empty State */}
      {scans.length === 0 ? (
        <div className="p-12 text-center bg-white border border-slate-200 rounded-2xl space-y-3">
          <div className="w-12 h-12 bg-slate-100 text-slate-400 rounded-full flex items-center justify-center mx-auto">
            <HistoryIcon className="w-6 h-6" />
          </div>
          <h2 className="text-base font-display font-bold text-slate-800">No Scan History Yet</h2>
          <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
            Whenever you photograph and classify a waste item, it will be automatically cataloged here for quick reference.
          </p>
        </div>
      ) : filteredScans.length === 0 ? (
        <div className="p-8 text-center bg-white border border-slate-200 rounded-2xl">
          <p className="text-xs text-slate-500">No scans match your current filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredScans.map((scan) => {
            const isWet = scan.primaryCategory === 'Wet Waste';
            const isRecycle = scan.primaryCategory === 'Recyclable';

            const badgeColor = isWet
              ? 'bg-emerald-100 text-emerald-950 border-emerald-300'
              : isRecycle
              ? 'bg-sky-100 text-sky-950 border-sky-300'
              : 'bg-slate-100 text-slate-900 border-slate-300';

            const icon = isWet ? (
              <Leaf className="w-4 h-4 text-emerald-800" />
            ) : isRecycle ? (
              <RefreshCw className="w-4 h-4 text-sky-800" />
            ) : (
              <Package className="w-4 h-4 text-slate-800" />
            );

            return (
              <div
                key={scan.id}
                onClick={() => onSelectScan(scan)}
                className="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-4 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex gap-4 group"
              >
                {/* Thumbnail */}
                <div className="w-20 h-20 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center">
                  {scan.thumbnailBase64 ? (
                    <img
                      src={scan.thumbnailBase64}
                      alt={scan.itemName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="p-2 text-slate-400">{icon}</div>
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${badgeColor} inline-flex items-center gap-1`}>
                      {icon}
                      <span>{scan.primaryCategory}</span>
                    </span>
                    <button
                      onClick={(e) => handleDelete(scan.id, e)}
                      className="text-slate-300 hover:text-rose-600 p-1 transition-colors"
                      title="Delete record"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <h2 className="text-sm font-display font-bold text-slate-900 truncate">
                    {scan.itemName}
                  </h2>

                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    {scan.confidenceReasoning}
                  </p>

                  <div className="text-[10px] text-slate-400 font-mono pt-1">
                    {new Date(scan.timestamp).toLocaleDateString([], {
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
