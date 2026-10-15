import React, { useState } from 'react';
import { Settings as SettingsIcon, MapPin, Camera, Trash2, ShieldCheck, CheckCircle2, ExternalLink } from 'lucide-react';
import { RegionalGuideline, RegionalConfig } from '../types/waste';
import { REGIONAL_CONFIGS } from '../data/regionalConfigs';
import { storageService, UserSettings } from '../services/storageService';

interface SettingsViewProps {
  currentSettings: UserSettings;
  onUpdateSettings: (newSettings: Partial<UserSettings>) => void;
  onDataCleared: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  currentSettings,
  onUpdateSettings,
  onDataCleared,
}) => {
  const [selectedRegion, setSelectedRegion] = useState<RegionalGuideline>(currentSettings.regionalGuideline);
  const [showSavedToast, setShowSavedToast] = useState<boolean>(false);

  const handleRegionChange = (reg: RegionalGuideline) => {
    setSelectedRegion(reg);
    onUpdateSettings({ regionalGuideline: reg });
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 2000);
  };

  const handleCameraChange = (facing: 'environment' | 'user') => {
    onUpdateSettings({ preferredCameraFacing: facing });
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 2000);
  };

  const handleClearAllData = () => {
    if (window.confirm('Are you sure you want to delete all locally stored scans, quiz progress, and settings? This action cannot be undone.')) {
      storageService.clearAllAppData();
      onDataCleared();
      alert('All local application data has been cleared.');
    }
  };

  const activeConfig: RegionalConfig = REGIONAL_CONFIGS[selectedRegion] || REGIONAL_CONFIGS.swachh_bharat;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-extrabold text-slate-900 tracking-tight">
          Application Preferences
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 mt-1">
          Customize your regional waste management guidelines, camera preferences, and local data.
        </p>
      </div>

      {showSavedToast && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-700" />
          <span>Preferences updated successfully!</span>
        </div>
      )}

      {/* Regional Guideline Preset */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-5">
        <div className="flex items-center gap-2.5">
          <MapPin className="w-5 h-5 text-emerald-700" />
          <h2 className="text-base font-display font-bold text-slate-900">
            Regional Waste Segregation Guideline
          </h2>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          Municipal collection and bin color standards vary internationally. Choose your jurisdiction to align AI disposal instructions with your local urban local body (ULB).
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.values(REGIONAL_CONFIGS).map((cfg) => {
            const isSelected = selectedRegion === cfg.id;
            return (
              <div
                key={cfg.id}
                onClick={() => handleRegionChange(cfg.id)}
                className={`p-4 rounded-xl border cursor-pointer transition-all space-y-2 ${
                  isSelected
                    ? 'border-slate-900 bg-slate-50/80 shadow-xs'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-900">{cfg.name}</span>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    isSelected ? 'border-slate-900 bg-slate-900' : 'border-slate-300'
                  }`}>
                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">{cfg.tagline}</p>
              </div>
            );
          })}
        </div>

        {/* Selected Guideline Summary Card */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900">{activeConfig.name} Specs:</span>
            <a
              href={activeConfig.referenceUrl}
              target="_blank"
              rel="noreferrer"
              className="text-emerald-700 hover:underline flex items-center gap-1 font-mono text-[11px]"
            >
              <span>Official Reference</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="grid grid-cols-3 gap-2 font-mono text-[11px]">
            <div className="p-2 bg-emerald-50 text-emerald-950 rounded border border-emerald-200">
              <span className="text-[10px] uppercase font-bold text-emerald-800 block">Wet Waste</span>
              <span>{activeConfig.wetBinColor}</span>
            </div>
            <div className="p-2 bg-slate-100 text-slate-900 rounded border border-slate-200">
              <span className="text-[10px] uppercase font-bold text-slate-700 block">Dry Waste</span>
              <span>{activeConfig.dryBinColor}</span>
            </div>
            <div className="p-2 bg-sky-50 text-sky-950 rounded border border-sky-200">
              <span className="text-[10px] uppercase font-bold text-sky-800 block">Recyclable</span>
              <span>{activeConfig.recyclableBinColor}</span>
            </div>
          </div>

          <p className="text-slate-600 leading-relaxed text-[11px]">
            <span className="font-semibold text-slate-800">Framework Note: </span>
            {activeConfig.notes}
          </p>
        </div>
      </div>

      {/* Camera Hardware Preference */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5">
          <Camera className="w-5 h-5 text-slate-700" />
          <h2 className="text-base font-display font-bold text-slate-900">
            Camera Facing Mode
          </h2>
        </div>
        <p className="text-xs text-slate-600">
          Default camera orientation when opening the live viewfinder.
        </p>

        <div className="flex gap-3">
          <button
            onClick={() => handleCameraChange('environment')}
            className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all ${
              currentSettings.preferredCameraFacing === 'environment'
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            Back Camera (Environment)
          </button>
          <button
            onClick={() => handleCameraChange('user')}
            className={`flex-1 py-2.5 px-3 rounded-xl border text-xs font-semibold transition-all ${
              currentSettings.preferredCameraFacing === 'user'
                ? 'bg-slate-900 text-white border-slate-900'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            Front / Selfie Camera
          </button>
        </div>
      </div>

      {/* Data Management & Privacy */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-emerald-700" />
          <h2 className="text-base font-display font-bold text-slate-900">
            Privacy & Local Data Management
          </h2>
        </div>
        <p className="text-xs text-slate-600 leading-relaxed">
          All your scan history records, quiz streak milestones, lesson completion badges, and preferences are stored exclusively on this device using HTML5 LocalStorage. No user profile is created and no personal trackers exist.
        </p>

        <div className="pt-2">
          <button
            onClick={handleClearAllData}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-xl border border-rose-200 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear All Local Application Data</span>
          </button>
        </div>
      </div>
    </div>
  );
};
