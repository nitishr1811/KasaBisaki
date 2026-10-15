/**
 * EcoLens Domain Types & Schemas
 */

export type PrimaryCategory = 'Dry Waste' | 'Wet Waste' | 'Recyclable';

export type RegionalGuideline = 
  | 'swachh_bharat' 
  | 'universal_municipal' 
  | 'eu_uk_waste' 
  | 'north_america';

export interface RegionalConfig {
  id: RegionalGuideline;
  name: string;
  tagline: string;
  wetBinColor: string;
  dryBinColor: string;
  recyclableBinColor: string;
  authorityReference: string;
  referenceUrl: string;
  notes: string;
}

export interface ClassificationResult {
  id: string;
  timestamp: number;
  itemName: string;
  primaryCategory: PrimaryCategory;
  materialComposition: string;
  confidenceReasoning: string;
  visualCharacteristics: string[];
  secondaryProperties: string[];
  isContaminated: boolean;
  contaminationDetails?: string;
  preparationSteps: string[];
  disposalInstructions: string;
  binColor: string;
  reuseAlternatives?: string[];
  scrapValueEstimate?: {
    ratePerKg: number;
    estimatedUnitWeightGrams: number;
    estimatedValueINR: number;
    commodityName: string;
  };
  upcyclingIdea?: {
    title: string;
    summary: string;
    toolsNeeded: string[];
    steps: string[];
  };
  localGuidanceNotes: string;
  uncertaintyNotes?: string;
  thumbnailBase64?: string;
  regionalPreset: RegionalGuideline;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export interface UserCorrection {
  id: string;
  scanId: string;
  itemName: string;
  suggestedCategory: PrimaryCategory | 'Other';
  suggestedItemName?: string;
  notes?: string;
  submittedAt: number;
}

export interface QuizQuestion {
  id: string;
  itemName: string;
  realImageUrl: string;
  imageAlt: string;
  photoCredit: {
    photographer: string;
    source: 'Unsplash' | 'Pixabay' | 'Wikimedia Commons';
    sourceUrl: string;
    license: string;
  };
  primaryCategory: PrimaryCategory;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  explanation: string;
  segregationTip: string;
}

export interface QuizProgress {
  totalAnswered: number;
  correctAnswers: number;
  currentStreak: number;
  bestScore: number;
  recentMistakes: {
    questionId: string;
    itemName: string;
    userAnswer: PrimaryCategory;
    correctAnswer: PrimaryCategory;
    explanation: string;
    timestamp: number;
  }[];
}

export interface LearnTopic {
  id: string;
  title: string;
  category: PrimaryCategory | 'General' | 'Composting' | 'Hazardous';
  summary: string;
  detailedContent: string[];
  dos: string[];
  donts: string[];
  commonExamples: string[];
  realImageUrl?: string;
  photoCredit?: {
    photographer: string;
    source: 'Unsplash' | 'Pixabay';
    sourceUrl: string;
  };
}

export interface ExternalResourceRecord {
  id: string;
  name: string;
  sourceType: 'GitHub repository' | 'GitHub code' | 'Stack Overflow question' | 'Library / Framework' | 'Real-Life Photography';
  sourceUrl: string;
  whatWasUsed: string;
  purpose: string;
  component: string;
  license: string;
  attributionRequired: boolean;
  verificationStatus: 'verified' | 'unverified';
}
