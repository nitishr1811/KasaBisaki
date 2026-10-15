import React, { useState } from 'react';
import { X, Check, Flag } from 'lucide-react';
import { ClassificationResult, PrimaryCategory, UserCorrection } from '../types/waste';
import { storageService } from '../services/storageService';

interface CorrectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: ClassificationResult;
  onCorrectionSubmitted: () => void;
}

export const CorrectionModal: React.FC<CorrectionModalProps> = ({
  isOpen,
  onClose,
  result,
  onCorrectionSubmitted,
}) => {
  const [suggestedCategory, setSuggestedCategory] = useState<PrimaryCategory | 'Other'>(result.primaryCategory);
  const [correctedItemName, setCorrectedItemName] = useState<string>(result.itemName);
  const [userNotes, setUserNotes] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const correction: UserCorrection = {
      id: `corr_${Date.now()}`,
      scanId: result.id,
      itemName: result.itemName,
      suggestedCategory,
      suggestedItemName: correctedItemName !== result.itemName ? correctedItemName : undefined,
      notes: userNotes.trim() ? userNotes.trim() : undefined,
      submittedAt: Date.now(),
    };

    storageService.saveCorrection(correction);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onCorrectionSubmitted();
      onClose();
    }, 1400);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Report or Correct Classification"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4"
    >
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2">
            <Flag className="w-4 h-4 text-amber-600" />
            <h3 className="font-display font-semibold text-slate-900 text-sm">
              Report or Correct Classification
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isSubmitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="font-display font-semibold text-slate-900">Thank you for your feedback!</h4>
            <p className="text-xs text-slate-500 leading-relaxed max-w-xs mx-auto">
              Your correction has been recorded locally to improve transparency and assist local sorting accuracy.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <p className="text-xs text-slate-600 leading-relaxed">
              Help refine EcoLens. If the AI misidentified this waste item or placed it in the wrong bin stream, specify the correction below.
            </p>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Item Name
              </label>
              <input
                type="text"
                value={correctedItemName}
                onChange={(e) => setCorrectedItemName(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white text-slate-900"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Suggested Correct Stream
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['Dry Waste', 'Wet Waste', 'Recyclable'] as PrimaryCategory[]).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSuggestedCategory(cat)}
                    className={`py-2 px-2 text-xs font-medium rounded-lg border text-center transition-all ${
                      suggestedCategory === cat
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Additional Notes (Optional)
              </label>
              <textarea
                value={userNotes}
                onChange={(e) => setUserNotes(e.target.value)}
                placeholder="e.g. In my city, tetrapaks go to specialized paper recycling, not dry waste."
                rows={2}
                className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white text-slate-900 resize-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-3.5 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-800 rounded-lg hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors shadow-xs"
              >
                Submit Correction
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
