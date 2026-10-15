import React, { useState, useEffect, useCallback } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { ScannerView } from './views/ScannerView';
import { LearnView } from './views/LearnView';
import { QuizView } from './views/QuizView';
import { HistoryView } from './views/HistoryView';
import { DashboardView } from './views/DashboardView';
import { CreditsView } from './views/CreditsView';
import { SettingsView } from './views/SettingsView';
import { LocationsView } from './views/LocationsView';
import { ScrapCalculatorView } from './views/ScrapCalculatorView';
import { UpcyclingView } from './views/UpcyclingView';
import { ClassificationResult, RegionalConfig } from './types/waste';
import { storageService, UserSettings } from './services/storageService';
import { REGIONAL_CONFIGS } from './data/regionalConfigs';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [scans, setScans] = useState<ClassificationResult[]>([]);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [userSettings, setUserSettings] = useState<UserSettings>(storageService.getUserSettings());

  // Load state on mount
  const refreshStorageData = useCallback(() => {
    setScans(storageService.getScanHistory());
    setCompletedLessons(storageService.getCompletedLessons());
    setUserSettings(storageService.getUserSettings());
  }, []);

  useEffect(() => {
    refreshStorageData();
  }, [refreshStorageData]);

  const activeRegionalConfig: RegionalConfig =
    REGIONAL_CONFIGS[userSettings.regionalGuideline] || REGIONAL_CONFIGS.swachh_bharat;

  const handleToggleLesson = (lessonId: string) => {
    const updated = storageService.toggleLessonCompleted(lessonId);
    setCompletedLessons(updated);
  };

  const handleUpdateSettings = (newSettings: Partial<UserSettings>) => {
    const updated = storageService.saveUserSettings(newSettings);
    setUserSettings(updated);
  };

  const handleSelectHistoricalScan = (_scan: ClassificationResult) => {
    setActiveTab('scanner');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA] text-slate-800">
      {/* Top Bar Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        scansCount={scans.length}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomeView
            setActiveTab={setActiveTab}
            regionalConfig={activeRegionalConfig}
          />
        )}

        {activeTab === 'scanner' && (
          <ScannerView
            regionalConfig={activeRegionalConfig}
            onScanSaved={refreshStorageData}
          />
        )}

        {activeTab === 'scrap_calculator' && <ScrapCalculatorView />}

        {activeTab === 'locations' && <LocationsView />}

        {activeTab === 'upcycling' && <UpcyclingView />}

        {activeTab === 'learn' && (
          <LearnView
            completedLessons={completedLessons}
            onToggleLesson={handleToggleLesson}
          />
        )}

        {activeTab === 'quiz' && <QuizView />}

        {activeTab === 'history' && (
          <HistoryView
            scans={scans}
            onScansUpdated={refreshStorageData}
            onSelectScan={handleSelectHistoricalScan}
          />
        )}

        {activeTab === 'dashboard' && (
          <DashboardView
            scans={scans}
            quizProgress={storageService.getQuizProgress()}
            completedLessons={completedLessons}
            setActiveTab={setActiveTab}
            onSelectScan={handleSelectHistoricalScan}
          />
        )}

        {activeTab === 'credits' && <CreditsView />}

        {activeTab === 'settings' && (
          <SettingsView
            currentSettings={userSettings}
            onUpdateSettings={handleUpdateSettings}
            onDataCleared={refreshStorageData}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        regionalConfig={activeRegionalConfig}
      />
    </div>
  );
}
