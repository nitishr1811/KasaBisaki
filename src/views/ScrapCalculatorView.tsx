import React, { useState } from 'react';
import { Calculator, TrendingUp, IndianRupee, Sparkles, Printer, CheckCircle2, RotateCcw, PackageCheck } from 'lucide-react';
import { SCRAP_COMMODITIES, ScrapCommodity } from '../data/scrapCommodityRates';

export const ScrapCalculatorView: React.FC = () => {
  // Store item counts: Record<commodityId, number>
  const [quantities, setQuantities] = useState<Record<string, number>>({
    'scrap-pet-bottles': 12,
    'scrap-cardboard': 4,
    'scrap-newspaper': 2,
    'scrap-aluminum-cans': 6,
  });

  const [manifestGenerated, setManifestGenerated] = useState<boolean>(false);
  const [stashSavedToast, setStashSavedToast] = useState<boolean>(false);

  const handleQuantityChange = (id: string, val: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(0, val),
    }));
  };

  const handleReset = () => {
    setQuantities({});
    setManifestGenerated(false);
  };

  // Calculations
  let totalEstimatedWeightKg = 0;
  let totalEstimatedEarnings = 0;

  const itemizedCalculations = SCRAP_COMMODITIES.map((c) => {
    const qty = quantities[c.id] || 0;
    const weightKg = qty * c.avgUnitWeightKg;
    const value = weightKg * c.currentRatePerKg;

    totalEstimatedWeightKg += weightKg;
    totalEstimatedEarnings += value;

    return {
      commodity: c,
      quantity: qty,
      weightKg,
      value,
    };
  });

  const activeItems = itemizedCalculations.filter((i) => i.quantity > 0);

  const handleSaveToStash = () => {
    setStashSavedToast(true);
    setTimeout(() => setStashSavedToast(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-900 font-mono">
          <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
          <span>Waste-to-Value Circular Exchange</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
          Recyclable Scrap Yield Calculator
        </h1>
        <p className="text-sm text-slate-600">
          Estimate the market recovery value of your household recyclables based on current benchmark rates per kilogram.
        </p>
      </div>

      {stashSavedToast && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          <span>Scrap valuation recorded in your household stash!</span>
        </div>
      )}

      {/* Primary KPI Earnings Card */}
      <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-md grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="space-y-1">
          <span className="text-xs uppercase font-mono tracking-wider text-emerald-400 font-semibold">
            Estimated Scrap Revenue
          </span>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl sm:text-4xl font-bold font-mono text-white tabular-nums">
              ₹{totalEstimatedEarnings.toFixed(2)}
            </span>
          </div>
          <p className="text-xs text-slate-400">Cash value from authorized scrap collection</p>
        </div>

        <div className="space-y-1 border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6">
          <span className="text-xs uppercase font-mono tracking-wider text-sky-400 font-semibold">
            Total Weight Recovered
          </span>
          <div className="text-2xl sm:text-3xl font-bold font-mono text-white tabular-nums">
            {totalEstimatedWeightKg.toFixed(2)} <span className="text-sm font-normal text-slate-400">kg</span>
          </div>
          <p className="text-xs text-slate-400">Clean dry recyclables saved from landfill</p>
        </div>

        <div className="flex flex-col gap-2 pt-2 md:pt-0">
          <button
            onClick={handleSaveToStash}
            disabled={totalEstimatedEarnings === 0}
            className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-xs transition-colors shadow-xs flex items-center justify-center gap-1.5 disabled:opacity-40"
          >
            <PackageCheck className="w-4 h-4" />
            <span>Record in Scrap Stash</span>
          </button>
          <button
            onClick={() => setManifestGenerated(!manifestGenerated)}
            disabled={activeItems.length === 0}
            className="w-full py-2 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5 disabled:opacity-40"
          >
            <Printer className="w-4 h-4 text-slate-400" />
            <span>{manifestGenerated ? 'Hide Manifest' : 'View Collector Manifest'}</span>
          </button>
        </div>
      </div>

      {/* Printable/Exportable Manifest Box */}
      {manifestGenerated && activeItems.length > 0 && (
        <div className="p-5 bg-white border border-slate-300 rounded-2xl shadow-xs space-y-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <span className="font-bold text-slate-900">RECYCLING SEGREGATION MANIFEST</span>
            <span className="text-[11px] text-slate-500">{new Date().toLocaleDateString()}</span>
          </div>

          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-500 border-b border-slate-100 text-[11px]">
                <th className="pb-1">Commodity</th>
                <th className="pb-1 text-right">Units</th>
                <th className="pb-1 text-right">Est. Weight</th>
                <th className="pb-1 text-right">Market Rate</th>
                <th className="pb-1 text-right">Est. Payout</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {activeItems.map((item) => (
                <tr key={item.commodity.id} className="text-slate-800">
                  <td className="py-1.5 font-sans font-medium">{item.commodity.name}</td>
                  <td className="py-1.5 text-right">{item.quantity}</td>
                  <td className="py-1.5 text-right">{item.weightKg.toFixed(2)} kg</td>
                  <td className="py-1.5 text-right">₹{item.commodity.currentRatePerKg}/kg</td>
                  <td className="py-1.5 text-right font-bold">₹{item.value.toFixed(2)}</td>
                </tr>
              ))}
              <tr className="font-bold text-slate-900 border-t border-slate-200">
                <td className="pt-2">TOTAL VALUE</td>
                <td className="pt-2 text-right"></td>
                <td className="pt-2 text-right">{totalEstimatedWeightKg.toFixed(2)} kg</td>
                <td className="pt-2 text-right"></td>
                <td className="pt-2 text-right text-emerald-700">₹{totalEstimatedEarnings.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
          <p className="text-[10px] text-slate-500 pt-1">
            * Note: Actual payout depends on spot market prices and manual weight verification by your local Dry Waste Collection Centre or authorized scrap dealer.
          </p>
        </div>
      )}

      {/* Interactive Commodities List */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-base font-display font-bold text-slate-900">
            Household Recyclable Inventory
          </h2>
          <button
            onClick={handleReset}
            className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Counts</span>
          </button>
        </div>

        <div className="space-y-4">
          {SCRAP_COMMODITIES.map((c) => {
            const count = quantities[c.id] || 0;
            const weight = (count * c.avgUnitWeightKg).toFixed(2);
            const value = (count * c.avgUnitWeightKg * c.currentRatePerKg).toFixed(2);

            return (
              <div
                key={c.id}
                className="p-4 rounded-xl border border-slate-200 hover:border-slate-300 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1 max-w-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase font-bold text-slate-400">
                      {c.category}
                    </span>
                    <span className="text-slate-300">·</span>
                    <span className="text-xs font-mono font-bold text-emerald-700">
                      ₹{c.currentRatePerKg.toFixed(2)} / kg
                    </span>
                  </div>
                  <h3 className="text-sm font-display font-bold text-slate-900">{c.name}</h3>
                  <p className="text-xs text-slate-500 leading-snug">{c.description}</p>
                  <p className="text-[11px] text-slate-400 pt-0.5">Tip: {c.preparationTip}</p>
                </div>

                {/* Counter & Output */}
                <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-200">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleQuantityChange(c.id, count - 1)}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 flex items-center justify-center text-sm"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min={0}
                      value={count}
                      onChange={(e) => handleQuantityChange(c.id, parseInt(e.target.value) || 0)}
                      className="w-14 text-center py-1 bg-white border border-slate-300 rounded-lg text-xs font-mono font-bold text-slate-900"
                    />
                    <button
                      onClick={() => handleQuantityChange(c.id, count + 1)}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-300 text-slate-700 font-bold hover:bg-slate-100 flex items-center justify-center text-sm"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right min-w-20 font-mono">
                    <span className="text-xs font-bold text-slate-900 block">₹{value}</span>
                    <span className="text-[10px] text-slate-400 block">{weight} kg</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
