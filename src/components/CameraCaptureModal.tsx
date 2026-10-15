import React, { useRef, useState, useEffect, useCallback } from 'react';
import { X, Camera, RefreshCw, AlertCircle, Upload } from 'lucide-react';

interface CameraCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (base64Image: string) => void;
  onSelectFileFallback: () => void;
}

export const CameraCaptureModal: React.FC<CameraCaptureModalProps> = ({
  isOpen,
  onClose,
  onCapture,
  onSelectFileFallback,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isInitializing, setIsInitializing] = useState<boolean>(true);

  // Stop camera tracks helper
  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  }, []);

  // Start camera stream
  const startCamera = useCallback(async () => {
    setIsInitializing(true);
    setErrorMsg(null);
    stopStream();

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setErrorMsg('Camera access is not supported by your current browser. You can upload an image file instead.');
      setIsInitializing(false);
      return;
    }

    try {
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch((err) => {
          console.warn('Video play warning:', err);
        });
      }
      setIsInitializing(false);
    } catch (err: any) {
      console.error('Camera stream error:', err);
      let message = 'Unable to access camera.';
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        message = 'Camera permission was denied. Please allow camera access in your browser address bar, or upload an image file.';
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        message = 'No camera hardware found on this device. Please upload an image file instead.';
      } else {
        message = `Camera error: ${err.message || 'Device camera could not be opened.'}`;
      }
      setErrorMsg(message);
      setIsInitializing(false);
    }
  }, [facingMode, stopStream]);

  useEffect(() => {
    if (isOpen) {
      startCamera();
    } else {
      stopStream();
    }
    return () => {
      stopStream();
    };
  }, [isOpen, startCamera, stopStream]);

  // Capture frame to canvas (SO #61833501 pattern)
  const handleShutter = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;

    const width = video.videoWidth || 640;
    const height = video.videoHeight || 480;

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // If using front camera, mirror image back to natural orientation
    if (facingMode === 'user') {
      ctx.translate(width, 0);
      ctx.scale(-1, 1);
    }

    ctx.drawImage(video, 0, 0, width, height);
    const base64 = canvas.toDataURL('image/jpeg', 0.88);

    stopStream();
    onCapture(base64);
  };

  const toggleFacingMode = () => {
    setFacingMode((prev) => (prev === 'environment' ? 'user' : 'environment'));
  };

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Camera Viewfinder"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4"
    >
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
        {/* Top Viewfinder Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800 text-white z-10">
          <div className="flex items-center gap-2">
            <Camera className="w-4 h-4 text-emerald-400" />
            <span className="text-sm font-semibold tracking-wide">Live Camera Viewfinder</span>
          </div>
          <button
            onClick={() => {
              stopStream();
              onClose();
            }}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            aria-label="Close camera"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Stage Area */}
        <div className="relative aspect-4/3 w-full bg-black flex items-center justify-center overflow-hidden">
          {errorMsg ? (
            <div className="p-6 text-center text-white max-w-sm space-y-4">
              <AlertCircle className="w-10 h-10 text-amber-400 mx-auto" />
              <p className="text-sm text-slate-300 leading-relaxed">{errorMsg}</p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center pt-2">
                <button
                  onClick={startCamera}
                  className="px-4 py-2 text-xs font-semibold bg-slate-800 hover:bg-slate-700 rounded-lg text-white transition-colors"
                >
                  Retry Camera
                </button>
                <button
                  onClick={() => {
                    stopStream();
                    onClose();
                    onSelectFileFallback();
                  }}
                  className="px-4 py-2 text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 rounded-lg text-white transition-colors flex items-center justify-center gap-1.5"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Choose Image File</span>
                </button>
              </div>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                playsInline
                muted
                autoPlay
                className={`w-full h-full object-cover ${facingMode === 'user' ? 'scale-x-[-1]' : ''}`}
              />

              {/* Viewfinder Target Reticle */}
              <div className="pointer-events-none absolute inset-8 border border-white/40 rounded-xl flex items-center justify-center">
                <div className="w-12 h-12 border-t-2 border-l-2 border-emerald-400 absolute top-0 left-0 rounded-tl-lg" />
                <div className="w-12 h-12 border-t-2 border-r-2 border-emerald-400 absolute top-0 right-0 rounded-tr-lg" />
                <div className="w-12 h-12 border-b-2 border-l-2 border-emerald-400 absolute bottom-0 left-0 rounded-bl-lg" />
                <div className="w-12 h-12 border-b-2 border-r-2 border-emerald-400 absolute bottom-0 right-0 rounded-br-lg" />
                <span className="text-[11px] font-medium text-white/80 bg-black/50 px-2 py-0.5 rounded tracking-wide">
                  Position Waste Item in Frame
                </span>
              </div>

              {isInitializing && (
                <div className="absolute inset-0 bg-slate-900 flex items-center justify-center text-white gap-2">
                  <div className="w-5 h-5 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                  <span className="text-sm">Starting camera...</span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Shutter & Controls Bottom Bar */}
        <div className="p-4 bg-slate-900 border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={toggleFacingMode}
            disabled={Boolean(errorMsg) || isInitializing}
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors disabled:opacity-50"
            title="Switch front/back camera"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Flip Camera</span>
          </button>

          {/* Shutter Button */}
          <button
            onClick={handleShutter}
            disabled={Boolean(errorMsg) || isInitializing}
            className="w-14 h-14 rounded-full bg-white hover:bg-slate-200 active:scale-95 transition-transform flex items-center justify-center p-1 shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label="Capture photo"
          >
            <div className="w-11 h-11 rounded-full border-2 border-slate-900 bg-white flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-emerald-600" />
            </div>
          </button>

          <button
            onClick={() => {
              stopStream();
              onClose();
              onSelectFileFallback();
            }}
            className="text-xs text-slate-400 hover:text-white px-3 py-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            Use File
          </button>
        </div>
      </div>
    </div>
  );
};
