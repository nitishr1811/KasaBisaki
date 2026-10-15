/**
 * Client-Side Local Storage Service
 * Pattern sourced from Stack Overflow #11929099:
 * "HTML5 localStorage error handling and quota exceeded"
 * https://stackoverflow.com/questions/11929099/html5-localstorage-error-handling-and-quota-exceeded
 */

import { ClassificationResult, QuizProgress, UserCorrection, RegionalGuideline } from '../types/waste';

const KEYS = {
  SCAN_HISTORY: 'ecolens_scan_history_v1',
  QUIZ_PROGRESS: 'ecolens_quiz_progress_v1',
  COMPLETED_LESSONS: 'ecolens_completed_lessons_v1',
  USER_CORRECTIONS: 'ecolens_user_corrections_v1',
  USER_SETTINGS: 'ecolens_user_settings_v1',
};

export interface UserSettings {
  regionalGuideline: RegionalGuideline;
  preferredCameraFacing: 'environment' | 'user';
  soundEnabled: boolean;
}

const DEFAULT_SETTINGS: UserSettings = {
  regionalGuideline: 'swachh_bharat',
  preferredCameraFacing: 'environment',
  soundEnabled: true,
};

const DEFAULT_QUIZ_PROGRESS: QuizProgress = {
  totalAnswered: 0,
  correctAnswers: 0,
  currentStreak: 0,
  bestScore: 0,
  recentMistakes: [],
};

// In-memory fallback if localStorage is disabled or restricted
const memoryFallback: Record<string, string> = {};

function safeGetItem(key: string): string | null {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage.getItem(key);
    }
  } catch (e) {
    console.warn(`localStorage read error for key "${key}":`, e);
  }
  return memoryFallback[key] || null;
}

function safeSetItem(key: string, value: string): void {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      window.localStorage.setItem(key, value);
      return;
    }
  } catch (e) {
    console.warn(`localStorage write error for key "${key}":`, e);
  }
  memoryFallback[key] = value;
}

export const storageService = {
  // Scans History
  getScanHistory(): ClassificationResult[] {
    const raw = safeGetItem(KEYS.SCAN_HISTORY);
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  },

  saveScanResult(result: ClassificationResult): void {
    const history = this.getScanHistory();
    // Prepend new scan, cap at 50 records to manage storage space responsibly
    const updated = [result, ...history.filter((s) => s.id !== result.id)].slice(0, 50);
    safeSetItem(KEYS.SCAN_HISTORY, JSON.stringify(updated));
  },

  deleteScanResult(id: string): void {
    const history = this.getScanHistory();
    const updated = history.filter((item) => item.id !== id);
    safeSetItem(KEYS.SCAN_HISTORY, JSON.stringify(updated));
  },

  clearScanHistory(): void {
    safeSetItem(KEYS.SCAN_HISTORY, JSON.stringify([]));
  },

  // Quiz Progress
  getQuizProgress(): QuizProgress {
    const raw = safeGetItem(KEYS.QUIZ_PROGRESS);
    if (!raw) return { ...DEFAULT_QUIZ_PROGRESS };
    try {
      return { ...DEFAULT_QUIZ_PROGRESS, ...JSON.parse(raw) };
    } catch {
      return { ...DEFAULT_QUIZ_PROGRESS };
    }
  },

  saveQuizAnswer(isCorrect: boolean, mistakeData?: QuizProgress['recentMistakes'][0]): QuizProgress {
    const current = this.getQuizProgress();
    const newStreak = isCorrect ? current.currentStreak + 1 : 0;
    const newBest = Math.max(current.bestScore, newStreak);
    const newMistakes = isCorrect || !mistakeData
      ? current.recentMistakes
      : [mistakeData, ...current.recentMistakes.filter((m) => m.questionId !== mistakeData.questionId)].slice(0, 20);

    const updated: QuizProgress = {
      totalAnswered: current.totalAnswered + 1,
      correctAnswers: isCorrect ? current.correctAnswers + 1 : current.correctAnswers,
      currentStreak: newStreak,
      bestScore: newBest,
      recentMistakes: newMistakes,
    };

    safeSetItem(KEYS.QUIZ_PROGRESS, JSON.stringify(updated));
    return updated;
  },

  resetQuizProgress(): void {
    safeSetItem(KEYS.QUIZ_PROGRESS, JSON.stringify(DEFAULT_QUIZ_PROGRESS));
  },

  // Completed Lessons
  getCompletedLessons(): string[] {
    const raw = safeGetItem(KEYS.COMPLETED_LESSONS);
    if (!raw) return [];
    try {
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  },

  toggleLessonCompleted(lessonId: string): string[] {
    const list = this.getCompletedLessons();
    const exists = list.includes(lessonId);
    const updated = exists ? list.filter((id) => id !== lessonId) : [...list, lessonId];
    safeSetItem(KEYS.COMPLETED_LESSONS, JSON.stringify(updated));
    return updated;
  },

  // User Corrections & Feedback
  getCorrections(): UserCorrection[] {
    const raw = safeGetItem(KEYS.USER_CORRECTIONS);
    if (!raw) return [];
    try {
      return JSON.parse(raw) || [];
    } catch {
      return [];
    }
  },

  saveCorrection(correction: UserCorrection): void {
    const list = this.getCorrections();
    safeSetItem(KEYS.USER_CORRECTIONS, JSON.stringify([correction, ...list]));
  },

  // Settings
  getUserSettings(): UserSettings {
    const raw = safeGetItem(KEYS.USER_SETTINGS);
    if (!raw) return { ...DEFAULT_SETTINGS };
    try {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
    } catch {
      return { ...DEFAULT_SETTINGS };
    }
  },

  saveUserSettings(settings: Partial<UserSettings>): UserSettings {
    const current = this.getUserSettings();
    const updated = { ...current, ...settings };
    safeSetItem(KEYS.USER_SETTINGS, JSON.stringify(updated));
    return updated;
  },

  // Clear all local app data
  clearAllAppData(): void {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        Object.values(KEYS).forEach((k) => window.localStorage.removeItem(k));
      }
    } catch (e) {
      console.warn('Error clearing localStorage:', e);
    }
    Object.keys(memoryFallback).forEach((k) => delete memoryFallback[k]);
  },
};
