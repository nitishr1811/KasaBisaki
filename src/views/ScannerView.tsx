import React, { useState, useRef } from 'react';
import { Camera, Upload, X, AlertCircle, RotateCcw, Check, Sparkles, Zap, Image as ImageIcon } from 'lucide-react';
import { CameraCaptureModal } from '../components/CameraCaptureModal';
import { ClassificationResultCard } from '../components/ClassificationResultCard';
import { ClassificationResult, RegionalConfig } from '../types/waste';
import { compressImageFile } from '../utils/imageCompressor';
import { storageService } from '../services/storageService';
import { SCANNER_SAMPLES, ScannerSampleItem } from '../data/scannerSamples';

interface ScannerViewProps {
  regionalConfig: RegionalConfig;
  onScanSaved: () => void;
}

export const ScannerView: React.FC<ScannerViewProps> = ({ regionalConfig, onScanSaved }) => {
  const [selectedImageBase64, setSelectedImageBase64] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string>('image/jpeg');
  const [isCameraModalOpen, setIsCameraModalOpen] = useState<boolean>(false);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [analysisStage, setAnalysisStage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [currentResult, setCurrentResult] = useState<ClassificationResult | null>(null);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handle file input
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    await processFile(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const processFile = async (file: File) => {
    setErrorMessage(null);
    setCurrentResult(null);

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please choose a valid image file (JPEG, PNG, or WebP).');
      return;
    }

    try {
      setAnalysisStage('Optimizing image size...');
      const compressed = await compressImageFile(file, 1280, 0.85);
      setSelectedImageBase64(compressed.base64);
      setMimeType(compressed.mimeType);
      setAnalysisStage('');
    } catch (err: any) {
      console.error('File compression error:', err);
      setErrorMessage(err.message || 'Could not process selected image file.');
    }
  };

  // Drag and drop handlers
  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      await processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  // Camera capture callback
  const handleCameraCapture = (base64Image: string) => {
    setIsCameraModalOpen(false);
    setSelectedImageBase64(base64Image);
    setMimeType('image/jpeg');
    setErrorMessage(null);
    setCurrentResult(null);
  };

  // Quick Sample selection
  const handleSelectSample = (sample: ScannerSampleItem, autoRun: boolean = true) => {
    setErrorMessage(null);
    setCurrentResult(null);
    setSelectedImageBase64(sample.dataUrl);
    setMimeType('image/svg+xml');

    if (autoRun) {
      runClassification(sample.dataUrl, 'image/svg+xml');
    }
  };

  // Run AI analysis
  const runClassification = async (imagePayload: string, mime: string) => {
    setIsAnalyzing(true);
    setErrorMessage(null);

    try {
      setAnalysisStage('Uploading photo to secure AI server...');
      await new Promise((r) => setTimeout(r, 250));

      setAnalysisStage('Inspecting material texture, plastic resin grade, and organic markers...');

      const response = await fetch('/api/classify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: imagePayload,
          mimeType: mime,
          region: regionalConfig.id,
        }),
      });

      setAnalysisStage('Cross-referencing regional disposal rules & scrap yield rates...');

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status ${response.status}`);
      }

      const result: ClassificationResult = await response.json();
      result.thumbnailBase64 = imagePayload;

      // Save to local persistence
      storageService.saveScanResult(result);
      onScanSaved();

      setCurrentResult(result);
    } catch (err: any) {
      console.error('Classification error:', err);
      setErrorMessage(err.message || 'An error occurred while analyzing the image. Please try again.');
    } finally {
      setIsAnalyzing(false);
      setAnalysisStage('');
    }
  };

  const handleAnalyze = () => {
    if (selectedImageBase64) {
      runClassification(selectedImageBase64, mimeType);
    }
  };

  const handleReset = () => {
    setSelectedImageBase64(null);
    setCurrentResult(null);
    setErrorMessage(null);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* View Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
          Smart Waste Item Scanner
        </h1>
        <p className="text-sm text-slate-600">
          Capture with live camera, upload a photo, or click any sample item to test instant 3-stream segregation and scrap commodity valuation.
        </p>
      </div>

      {/* If a result already exists, render the result card */}
      {currentResult ? (
        <ClassificationResultCard
          result={currentResult}
          onScanAnother={handleReset}
        />
      ) : (
        /* Image Selection & Upload Card */
        <div className="max-w-xl mx-auto bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
          <div className="p-6 space-y-6">
            {!selectedImageBase64 ? (
              /* Zero State: Choose Capture or Upload */
              <div className="space-y-5">
                <div
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                    isDragOver
                      ? 'border-emerald-500 bg-emerald-50/50'
                      : 'border-slate-300 hover:border-slate-400 bg-slate-50/50 hover:bg-slate-50'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 text-slate-600 flex items-center justify-center mx-auto mb-3">
                    <Upload className="w-5 h-5 text-slate-600" />
                  </div>
                  <h3 className="text-sm font-semibold text-slate-800">
                    Click to select an image, or drag &amp; drop here
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Supports JPEG, PNG, or WebP photographs up to 15MB
                  </p>
                </div>

                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-slate-200"></div>
                  <span className="flex-shrink mx-4 text-xs uppercase font-mono text-slate-400">or</span>
                  <div className="flex-grow border-t border-slate-200"></div>
                </div>

                <button
                  type="button"
                  onClick={() => setIsCameraModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 text-white text-sm font-semibold rounded-xl shadow-xs transition-colors"
                >
                  <Camera className="w-4 h-4" />
                  <span>Open Live Camera Viewfinder</span>
                </button>

                {/* Instant Quick-Test Waste Samples */}
                <div className="pt-2 border-t border-slate-100 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase font-bold text-slate-500 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      <span>Instant Test Items (Click to Scan)</span>
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">1-Click Test</span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {SCANNER_SAMPLES.map((sample) => (
                      <button
                        key={sample.id}
                        type="button"
                        onClick={() => handleSelectSample(sample, true)}
                        className="p-2.5 bg-slate-50 hover:bg-emerald-50/70 border border-slate-200 hover:border-emerald-300 rounded-xl text-left transition-all group flex flex-col justify-between space-y-1.5"
                      >
                        <div className="aspect-square w-full rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center border border-slate-200/60">
                          <img
                            src={sample.dataUrl}
                            alt={sample.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div>
                          <span className="text-[11px] font-bold text-slate-900 block truncate group-hover:text-emerald-900">
                            {sample.name}
                          </span>
                          <span className="text-[10px] font-mono text-emerald-700 block">
                            {sample.badge}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              /* Preview State */
              <div className="space-y-4">
                <div className="relative aspect-4/3 w-full bg-slate-900 rounded-xl overflow-hidden border border-slate-200 flex items-center justify-center">
                  <img
                    src={selectedImageBase64}
                    alt="Waste item preview"
                    className="w-full h-full object-contain"
                  />
                  {!isAnalyzing && (
                    <button
                      onClick={handleReset}
                      className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
                      aria-label="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Analysis Stage indicator */}
                {isAnalyzing ? (
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin shrink-0" />
                      <div className="text-xs font-semibold text-slate-800">
                        {analysisStage || 'Analyzing photo with Gemini AI vision...'}
                      </div>
                    </div>
                    <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-600 h-full w-2/3 animate-pulse" />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="flex-1 py-2.5 px-4 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                    >
                      Change Photo
                    </button>
                    <button
                      type="button"
                      onClick={handleAnalyze}
                      className="flex-2 flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-xs transition-colors"
                    >
                      <Sparkles className="w-4 h-4 text-emerald-400" />
                      <span>Classify Waste Stream</span>
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Error Banner */}
            {errorMessage && (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div className="flex-1 space-y-2">
                  <p className="font-semibold text-rose-900">Analysis Error</p>
                  <p className="text-rose-700 leading-relaxed">{errorMessage}</p>
                  <div className="pt-1 flex gap-2">
                    <button
                      onClick={handleAnalyze}
                      disabled={!selectedImageBase64 || isAnalyzing}
                      className="px-3 py-1 bg-rose-600 text-white font-medium rounded-md hover:bg-rose-700 transition-colors"
                    >
                      Retry Analysis
                    </button>
                    <button
                      onClick={handleReset}
                      className="px-3 py-1 bg-white border border-rose-200 text-rose-800 font-medium rounded-md hover:bg-rose-100 transition-colors"
                    >
                      Select Different Photo
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Hidden File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
      )}

      {/* Live Camera Modal */}
      <CameraCaptureModal
        isOpen={isCameraModalOpen}
        onClose={() => setIsCameraModalOpen(false)}
        onCapture={handleCameraCapture}
        onSelectFileFallback={() => fileInputRef.current?.click()}
      />
    </div>
  );
};
