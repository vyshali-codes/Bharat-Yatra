import React, { useState, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { recognizeMonument, RecognitionResult } from '../services/recognitionService';
import { getMonumentStaticImage, getMonumentHeritageFact } from '../data/monumentImageAssets';
import {
  Upload,
  Sparkles,
  CheckCircle2,
  XCircle,
  Award,
  AlertCircle,
  RefreshCw,
  HelpCircle,
  ArrowRight,
  Eye,
  MapPin,
  Compass,
  FileQuestion,
  ShieldCheck,
  Image as ImageIcon,
  BookOpen
} from 'lucide-react';

export const HeritageHuntPage: React.FC = () => {
  const {
    currentPlayer,
    currentLocation,
    activeHuntTarget,
    activeHuntClue,
    isHuntCompletedThisTurn,
    completeHeritageHunt,
    generateHuntChallengeForLocation,
    setActiveScreen,
    nextTurn
  } = useGame();

  // 1. Explicit Image State Management (Requirement 2)
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<
    'idle' | 'ready' | 'verifying' | 'success' | 'failed'
  >('idle');
  const [recognitionResult, setRecognitionResult] = useState<RecognitionResult | null>(null);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [isClaiming, setIsClaiming] = useState<boolean>(false);

  // Initialize hunt target if not already set
  useEffect(() => {
    if (!activeHuntTarget) {
      generateHuntChallengeForLocation(currentLocation.id, currentLocation.city);
    }
  }, [activeHuntTarget, currentLocation, generateHuntChallengeForLocation]);

  const target = activeHuntTarget;

  // Cleanup object URL on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (imagePreview && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
    };
  }, [imagePreview]);

  // Handle user uploading an image via file picker
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setVerificationStatus('ready');
      setRecognitionResult(null);
    }
  };

  // Handle drag and drop upload
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setVerificationStatus('ready');
      setRecognitionResult(null);
    }
  };

  // Handle demo test sample selection (for jury, testing, and presentation mode)
  const handleSelectSampleTest = (
    sampleType: 'correct' | 'generic_screenshot' | 'unrelated' | 'different'
  ) => {
    if (!target) return;

    let sampleFilename = 'sample_photo.jpg';
    if (sampleType === 'generic_screenshot') {
      // Specifically testing generic filename (e.g. Screenshot) with visually correct target content
      sampleFilename = 'Screenshot 2026-09-16 234826.png';
    } else if (sampleType === 'correct') {
      sampleFilename =
        target.sampleFilename ||
        `${target.monument.toLowerCase().replace(/\s+/g, '_')}.jpg`;
    } else if (sampleType === 'unrelated') {
      sampleFilename = 'random_street_cat.jpg';
    } else {
      sampleFilename = 'unrelated_monument.jpg';
    }

    // Create authentic high quality SVG markup matching target or foil
    const svgPreview =
      sampleType === 'correct' || sampleType === 'generic_screenshot'
        ? getMonumentStaticImage(target)
        : sampleType === 'unrelated'
        ? `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%23b91c1c"/><circle cx="300" cy="180" r="70" fill="%23f87171"/><text x="50%" y="45%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="sans-serif" font-weight="bold" font-size="28">🐱 Random Street Cat</text><text x="50%" y="65%" dominant-baseline="middle" text-anchor="middle" fill="%23fecaca" font-family="sans-serif" font-size="16">random_street_cat.jpg</text></svg>`
        : `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect width="600" height="400" fill="%23b45309"/><rect x="180" y="140" width="240" height="120" fill="%2378350f" rx="4"/><polygon points="300,60 440,140 160,140" fill="%23991b1b"/><text x="50%" y="48%" dominant-baseline="middle" text-anchor="middle" fill="white" font-family="sans-serif" font-weight="bold" font-size="22">🏯 Unrelated Red Fortress</text><text x="50%" y="65%" dominant-baseline="middle" text-anchor="middle" fill="%23fde68a" font-family="sans-serif" font-size="16">unrelated_monument.jpg</text></svg>`;

    // Convert SVG to an actual image/svg+xml Blob so canvas can draw and analyze its real pixels
    let svgText = '';
    if (svgPreview.startsWith('data:image/svg+xml;utf8,')) {
      svgText = decodeURIComponent(svgPreview.replace('data:image/svg+xml;utf8,', ''));
    } else if (svgPreview.startsWith('data:image/svg+xml;base64,')) {
      try {
        svgText = atob(svgPreview.replace('data:image/svg+xml;base64,', ''));
      } catch {
        svgText = svgPreview;
      }
    } else {
      svgText = svgPreview;
    }

    const blob = new Blob([svgText], { type: 'image/svg+xml' });
    const mockFile = new File([blob], sampleFilename, { type: 'image/svg+xml' });

    setSelectedImage(mockFile);
    setImagePreview(svgPreview);
    setVerificationStatus('ready');
    setRecognitionResult(null);
  };

  // 3. Verify Button Execution (Requirement 3 & 4)
  const handleVerifyImage = async () => {
    if (!target || !selectedImage || verificationStatus === 'verifying') return;

    setVerificationStatus('verifying');
    setRecognitionResult(null);

    try {
      const res = await recognizeMonument(selectedImage, target);
      setRecognitionResult(res);
      if (res.isSuccess) {
        setVerificationStatus('success');
      } else {
        setVerificationStatus('failed');
      }
    } catch (err) {
      console.error('Recognition error:', err);
      setVerificationStatus('failed');
    }
  };

  // Reset helper when changing image before verification
  const handleTryAgain = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setVerificationStatus('idle');
    setRecognitionResult(null);
  };

  // Return to game dashboard, switch to next player, prevent duplicate scoring
  const handleReturnToGame = () => {
    if (isClaiming) return;
    setIsClaiming(true);
    if (verificationStatus === 'success') {
      completeHeritageHunt(50);
    } else {
      nextTurn();
    }
  };

  // Rotate challenge to another mystery target
  const handleRotateChallenge = () => {
    handleTryAgain();
    setShowHint(false);
    generateHuntChallengeForLocation(currentLocation.id, currentLocation.city);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:px-6 space-y-6">
      {/* Title & Location Banner */}
      <div className="bg-white border border-rose-200/90 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-rose-100">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-100 text-rose-900 text-xs font-bold uppercase tracking-wider mb-2">
              <Compass className="w-3.5 h-3.5 text-rose-600" />
              <span>Special Landmark Scanner</span>
            </div>
            <h2 className="font-serif-heritage text-2xl sm:text-3xl font-black text-slate-900 flex items-center gap-2">
              <span>🏛 HERITAGE HUNT</span>
            </h2>
            <div className="flex items-center gap-2 mt-1.5 text-slate-600 text-xs sm:text-sm">
              <MapPin className="w-4 h-4 text-rose-600 shrink-0" />
              <span className="font-semibold text-slate-800">
                📍 {currentLocation.city}, {currentLocation.state}
              </span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500">Milestone #{currentLocation.id}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Demo Recognition Badge */}
            <div className="px-3 py-1.5 rounded-xl bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-700" />
              <span>DEMO RECOGNITION</span>
            </div>

            {/* Points Award Badge */}
            <div className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-black shadow-xs flex items-center gap-1.5">
              <Award className="w-4 h-4" />
              <span>+50 POINTS</span>
            </div>
          </div>
        </div>

        {/* Turn Explorer Context */}
        <div className="py-3 px-4 my-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs text-slate-600">
          <div>
            Active Explorer: <strong className="text-slate-900">{currentPlayer.name}</strong> ({currentPlayer.tokenSymbol} {currentPlayer.color})
          </div>
          {verificationStatus !== 'verifying' && verificationStatus !== 'success' && (
            <button
              onClick={handleRotateChallenge}
              className="text-rose-700 hover:text-rose-800 font-bold flex items-center gap-1 cursor-pointer transition text-[11px]"
              title="Rotate to another mystery target or clue"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Rotate Mystery Target</span>
            </button>
          )}
        </div>

        {/* Mystery Clue Section */}
        {target && (
          <div className="my-6 rounded-2xl bg-linear-to-br from-amber-50/90 via-orange-50/50 to-rose-50/60 border-2 border-amber-300/80 p-6 sm:p-7 shadow-sm space-y-4">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-900 bg-amber-200/70 px-3 py-1 rounded-lg">
                <FileQuestion className="w-4 h-4 text-amber-800" />
                <span>MYSTERY TARGET</span>
              </div>
              <span className="text-xs font-semibold text-slate-500">
                Period: <strong className="text-slate-700">{target.historicalPeriod || 'Historic Heritage'}</strong>
              </span>
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] font-black uppercase tracking-widest text-amber-800">
                CLUE:
              </span>
              <p className="font-serif-heritage text-base sm:text-lg text-slate-900 font-semibold leading-relaxed italic bg-white/70 p-4 rounded-xl border border-amber-200/80 shadow-xs">
                "{activeHuntClue || target.clues[0]}"
              </p>
            </div>

            {/* Optional Hint */}
            <div className="pt-2">
              {!showHint ? (
                <button
                  id="heritage-hunt-reveal-hint-btn"
                  onClick={() => setShowHint(true)}
                  className="text-xs font-bold text-amber-800 hover:text-amber-900 inline-flex items-center gap-1.5 bg-amber-100/80 hover:bg-amber-200/80 px-3 py-1.5 rounded-lg transition cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Reveal Architectural Hint</span>
                </button>
              ) : (
                <div className="p-3.5 rounded-xl bg-white/90 border border-amber-300 text-xs text-slate-700 space-y-1 animate-in fade-in">
                  <div className="font-bold text-amber-900 flex items-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
                    <span>ARCHITECTURAL HINT:</span>
                  </div>
                  <p className="italic text-slate-600">{target.description}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* MAIN SCANNER / VERIFICATION / RESULT WORKFLOW */}

        {/* 1. INITIAL UPLOAD SCREEN (verificationStatus === 'idle') */}
        {verificationStatus === 'idle' && (
          <div className="space-y-6">
            <div
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="border-2 border-dashed border-rose-300 hover:border-rose-500 bg-rose-50/40 rounded-2xl p-8 text-center transition cursor-pointer relative"
            >
              <input
                id="heritage-hunt-file-input"
                type="file"
                accept="image/*"
                capture="environment"
                onChange={handleFileChange}
                className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
              />
              <div className="flex flex-col items-center justify-center pointer-events-none">
                <div className="w-14 h-14 rounded-2xl bg-white border border-rose-200 text-rose-600 flex items-center justify-center mb-3 shadow-xs">
                  <Upload className="w-7 h-7" />
                </div>
                <h4 className="font-serif-heritage text-base font-bold text-slate-800">
                  UPLOAD / TAKE PHOTO
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mt-1">
                  Upload an authentic monument photograph matching the clue for {currentLocation.city}.
                </p>
                <span className="mt-4 px-5 py-2.5 rounded-xl bg-rose-600 text-white font-bold text-xs shadow-xs">
                  Browse Image / Take Photo
                </span>
              </div>
            </div>

            {/* Test Sample Cards for Jury / Presentation Demo */}
            {target && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Jury & Presentation Demo Test Samples:
                  </label>
                  <span className="text-[11px] text-slate-500">
                    Click to load test image and verify
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {/* Test 1: Generic Screenshot Photo (Charminar bug fix test) */}
                  <button
                    id="heritage-hunt-test-generic-screenshot-btn"
                    onClick={() => handleSelectSampleTest('generic_screenshot')}
                    className="p-3 rounded-xl border border-emerald-300 bg-emerald-50/80 hover:bg-emerald-100 transition text-left cursor-pointer group"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-900 mb-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Generic Screenshot</span>
                    </div>
                    <p className="text-[11px] text-emerald-800 font-mono truncate">
                      Screenshot 2026-09-16 234826.png
                    </p>
                    <span className="text-[10px] text-emerald-700 block mt-1 font-semibold">
                      Expected: MATCHED (+50 pts)
                    </span>
                  </button>

                  {/* Test 2: Standard Target Photo */}
                  <button
                    id="heritage-hunt-test-correct-btn"
                    onClick={() => handleSelectSampleTest('correct')}
                    className="p-3 rounded-xl border border-teal-300 bg-teal-50/80 hover:bg-teal-100 transition text-left cursor-pointer group"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold text-teal-900 mb-1">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0" />
                      <span>Target Photo</span>
                    </div>
                    <p className="text-[11px] text-teal-800 font-mono truncate">
                      {target.sampleFilename || `${target.monument.toLowerCase().replace(/\s+/g, '_')}.jpg`}
                    </p>
                    <span className="text-[10px] text-teal-700 block mt-1 font-semibold">
                      Expected: MATCHED (+50 pts)
                    </span>
                  </button>

                  {/* Test 3: Different Monument Photo */}
                  <button
                    id="heritage-hunt-test-different-monument-btn"
                    onClick={() => handleSelectSampleTest('different')}
                    className="p-3 rounded-xl border border-amber-300 bg-amber-50/80 hover:bg-amber-100 transition text-left cursor-pointer group"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 mb-1">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Different Monument</span>
                    </div>
                    <p className="text-[11px] text-amber-800 font-mono truncate">
                      unrelated_monument.jpg
                    </p>
                    <span className="text-[10px] text-amber-700 block mt-1 font-semibold">
                      Expected: NOT MATCHED (0 pts)
                    </span>
                  </button>

                  {/* Test 4: Unrelated Photo */}
                  <button
                    id="heritage-hunt-test-unrelated-btn"
                    onClick={() => handleSelectSampleTest('unrelated')}
                    className="p-3 rounded-xl border border-rose-300 bg-rose-50/80 hover:bg-rose-100 transition text-left cursor-pointer group"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold text-rose-900 mb-1">
                      <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>Unrelated Photo</span>
                    </div>
                    <p className="text-[11px] text-rose-800 font-mono truncate">
                      random_street_cat.jpg
                    </p>
                    <span className="text-[10px] text-rose-700 block mt-1 font-semibold">
                      Expected: NOT MATCHED (0 pts)
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. IMAGE SELECTED & READY OR VERIFYING (verificationStatus === 'ready' | 'verifying') */}
        {(verificationStatus === 'ready' || verificationStatus === 'verifying') && (
          <div className="space-y-6 bg-slate-50/70 border border-slate-200 rounded-2xl p-6 sm:p-7">
            <div className="flex flex-col items-center text-center">
              {/* Image Preview - Remains available and visible */}
              {imagePreview && (
                <div className="relative max-w-md w-full rounded-2xl overflow-hidden shadow-md border-2 border-white bg-slate-900 flex items-center justify-center min-h-[220px]">
                  <img
                    src={imagePreview}
                    alt="Uploaded Monument Preview"
                    className="max-h-72 w-full object-contain"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-black/60 backdrop-blur-xs text-white text-xs px-3 py-1.5 rounded-lg flex items-center justify-between">
                    <span className="font-mono truncate">{selectedImage?.name}</span>
                    <span className="text-[10px] text-slate-300 uppercase font-semibold">
                      Image Selected
                    </span>
                  </div>
                </div>
              )}

              {/* Processing State (Requirement 4) */}
              {verificationStatus === 'verifying' ? (
                <div className="mt-6 flex flex-col items-center space-y-2">
                  <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-100 border border-amber-300 text-amber-900 font-bold text-sm shadow-xs animate-pulse">
                    <RefreshCw className="w-4 h-4 animate-spin text-amber-700" />
                    <span>🔍 VERIFYING IMAGE...</span>
                  </div>
                  <p className="text-xs text-slate-500">Please wait while recognition processes...</p>
                </div>
              ) : (
                /* Ready State: VERIFY IMAGE button (Requirement 3) */
                <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    id="heritage-hunt-change-image-btn"
                    onClick={handleTryAgain}
                    className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs transition cursor-pointer"
                  >
                    Change Image
                  </button>

                  <button
                    id="heritage-hunt-verify-btn"
                    onClick={handleVerifyImage}
                    className="px-8 py-3 rounded-xl bg-linear-to-r from-rose-600 to-orange-600 hover:from-rose-700 hover:to-orange-700 text-white font-black text-sm shadow-md transition flex items-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>VERIFY IMAGE</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 3. SUCCESS RESULT (verificationStatus === 'success') */}
        {verificationStatus === 'success' && target && (
          <div
            id="heritage-hunt-success-card"
            className="space-y-6 animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Header Banner */}
            <div className="p-5 sm:p-6 rounded-2xl bg-emerald-50 border-2 border-emerald-400 flex items-center justify-between flex-wrap gap-4 shadow-sm">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif-heritage text-2xl sm:text-3xl font-black text-emerald-950 tracking-wide">
                      CORRECT!
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-md bg-amber-100 border border-amber-300 text-amber-900 text-[10px] font-bold tracking-wider">
                      DEMO RECOGNITION
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-emerald-800 font-semibold mt-0.5">
                    Authentic heritage landmark visually verified for {target.city}!
                  </p>
                </div>
              </div>

              <div className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-black text-base shadow-sm flex items-center gap-2">
                <Award className="w-5 h-5" />
                <span>+50 POINTS</span>
              </div>
            </div>

            {/* Comparison Cards: YOUR IMAGE vs CORRECT IMAGE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Card 1: YOUR IMAGE */}
              <div className="bg-white border-2 border-emerald-200 rounded-2xl p-5 shadow-sm space-y-3 flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-900 bg-emerald-100 px-3 py-1 rounded-lg">
                    YOUR IMAGE
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Matched</span>
                  </span>
                </div>

                <div className="w-full h-56 rounded-xl overflow-hidden border border-emerald-300 bg-slate-900 flex items-center justify-center relative shadow-inner">
                  {imagePreview ? (
                    <img
                      id="heritage-hunt-your-image"
                      src={imagePreview}
                      alt="Player's Uploaded Image"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="text-slate-400 text-xs text-center p-4">
                      No Image Uploaded
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2 right-2 bg-black/75 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded flex items-center justify-between">
                    <span className="truncate font-mono">{selectedImage?.name || 'uploaded_image.png'}</span>
                    <span className="text-emerald-400 font-bold shrink-0">Submitted</span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 italic text-center pt-1">
                  Visually verified against {target.monument}'s architectural profile.
                </p>
              </div>

              {/* Card 2: CORRECT IMAGE */}
              <div className="bg-[#FFFDF9] border-2 border-emerald-300 rounded-2xl p-5 shadow-sm space-y-3 flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-900 bg-emerald-100 px-3 py-1 rounded-lg">
                    CORRECT IMAGE
                  </span>
                  <span className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verified Landmark</span>
                  </span>
                </div>

                <div className="w-full h-56 rounded-xl overflow-hidden border-2 border-emerald-400 bg-slate-900 flex items-center justify-center relative shadow-inner">
                  <img
                    id="heritage-hunt-correct-image"
                    src={getMonumentStaticImage(target)}
                    alt={`Correct Image: ${target.monument}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-black/75 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded flex items-center justify-between">
                    <span className="truncate font-bold text-emerald-300">{target.monument}</span>
                    <span className="text-emerald-400 font-bold shrink-0">Reference Target</span>
                  </div>
                </div>

                <div className="text-center pt-1">
                  <h4 className="font-serif-heritage text-base font-black text-slate-900">
                    {target.monument}
                  </h4>
                  <p className="text-xs text-slate-600 font-semibold">
                    📍 {target.city}, {target.state}
                  </p>
                </div>
              </div>
            </div>

            {/* Learn the Heritage Card */}
            <div
              id="heritage-hunt-learn-heritage"
              className="bg-linear-to-r from-amber-50/90 via-orange-50/60 to-amber-50/90 border-2 border-amber-300/80 rounded-2xl p-6 shadow-sm space-y-2"
            >
              <div className="flex items-center gap-2 text-amber-900">
                <BookOpen className="w-5 h-5 text-amber-700" />
                <h4 className="font-serif-heritage text-base sm:text-lg font-black tracking-wide uppercase">
                  📚 Learn the Heritage
                </h4>
              </div>
              <p
                id="heritage-hunt-verified-fact"
                className="font-serif-heritage text-slate-800 text-sm sm:text-base leading-relaxed italic bg-white/80 p-4 rounded-xl border border-amber-200"
              >
                "{getMonumentHeritageFact(target)}"
              </p>
            </div>

            {/* Action Button: [ RETURN TO GAME ] */}
            <div className="flex items-center justify-end pt-2">
              <button
                id="heritage-hunt-return-btn"
                onClick={handleReturnToGame}
                disabled={isClaiming || isHuntCompletedThisTurn}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>RETURN TO GAME</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* 4. FAILURE RESULT (verificationStatus === 'failed') */}
        {verificationStatus === 'failed' && target && (
          <div
            id="heritage-hunt-failed-card"
            className="space-y-6 animate-in fade-in zoom-in-95 duration-200"
          >
            {/* Header Banner */}
            <div className="p-5 sm:p-6 rounded-2xl bg-rose-50 border-2 border-rose-300 flex items-center justify-between flex-wrap gap-4 shadow-sm">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-xs">
                  <XCircle className="w-7 h-7" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-serif-heritage text-2xl sm:text-3xl font-black text-rose-950 tracking-wide">
                      WRONG IMAGE
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-md bg-amber-100 border border-amber-300 text-amber-900 text-[10px] font-bold tracking-wider">
                      DEMO RECOGNITION
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-rose-800 font-semibold mt-0.5">
                    The submitted image does not match the target monument for {target.city}.
                  </p>
                </div>
              </div>

              <div className="px-5 py-2.5 rounded-xl bg-rose-100 border-2 border-rose-300 text-rose-900 font-mono font-black text-base shadow-xs">
                +0 POINTS
              </div>
            </div>

            {/* Comparison Cards: YOUR IMAGE vs CORRECT ANSWER & CORRECT IMAGE */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Card 1: YOUR IMAGE */}
              <div className="bg-white border-2 border-rose-200 rounded-2xl p-5 shadow-sm space-y-3 flex flex-col">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-rose-900 bg-rose-100 px-3 py-1 rounded-lg">
                    YOUR IMAGE
                  </span>
                  <span className="text-[11px] font-bold text-rose-600 flex items-center gap-1">
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Not Matched</span>
                  </span>
                </div>

                <div className="w-full h-56 rounded-xl overflow-hidden border border-rose-300 bg-slate-900 flex items-center justify-center relative shadow-inner">
                  {imagePreview ? (
                    <img
                      id="heritage-hunt-your-image"
                      src={imagePreview}
                      alt="Player's Uploaded Image"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="text-slate-400 text-xs text-center p-4">
                      No Image Uploaded
                    </div>
                  )}
                  <div className="absolute bottom-2 left-2 right-2 bg-black/75 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded flex items-center justify-between">
                    <span className="truncate font-mono">{selectedImage?.name || 'uploaded_image.jpg'}</span>
                    <span className="text-rose-400 font-bold shrink-0">Submitted</span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 italic text-center pt-1">
                  This image did not match the architectural features of {target.monument}.
                </p>
              </div>

              {/* Card 2: CORRECT ANSWER & CORRECT IMAGE */}
              <div className="bg-[#FFFDF9] border-2 border-emerald-300 rounded-2xl p-5 shadow-sm space-y-3 flex flex-col">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-slate-500 block">
                    Correct Answer:
                  </span>
                  <h4 id="heritage-hunt-correct-answer" className="font-serif-heritage text-2xl font-black text-slate-900 mt-0.5">
                    {target.monument}
                  </h4>
                  <p className="text-xs font-semibold text-slate-600 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3.5 h-3.5 text-rose-600" />
                    <span>📍 {target.city}, {target.state}</span>
                  </p>
                </div>

                <div className="space-y-1.5 flex-1 flex flex-col">
                  <span className="text-[11px] font-black uppercase tracking-wider text-emerald-900 bg-emerald-100 px-2.5 py-0.5 rounded-md inline-block self-start">
                    CORRECT IMAGE
                  </span>
                  <div className="w-full h-56 rounded-xl overflow-hidden border-2 border-emerald-400 bg-slate-900 flex items-center justify-center relative shadow-inner">
                    <img
                      id="heritage-hunt-correct-image"
                      src={getMonumentStaticImage(target)}
                      alt={`Correct Image: ${target.monument}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 left-2 right-2 bg-black/75 backdrop-blur-xs text-white text-[11px] px-2.5 py-1 rounded flex items-center justify-between">
                      <span className="truncate font-bold text-emerald-300">{target.monument}</span>
                      <span className="text-emerald-400 font-bold shrink-0">Correct Answer</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Learn the Heritage Card */}
            <div id="heritage-hunt-learn-heritage" className="bg-linear-to-r from-amber-50/90 via-orange-50/60 to-amber-50/90 border-2 border-amber-300/80 rounded-2xl p-6 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-amber-900">
                <BookOpen className="w-5 h-5 text-amber-700" />
                <h4 className="font-serif-heritage text-base sm:text-lg font-black tracking-wide uppercase">
                  📚 Learn the Heritage
                </h4>
              </div>
              <p className="font-serif-heritage text-slate-800 text-sm sm:text-base leading-relaxed italic bg-white/80 p-4 rounded-xl border border-amber-200">
                "{getMonumentHeritageFact(target)}"
              </p>
            </div>

            {/* Action Buttons: [ TRY ANOTHER IMAGE ] & [ RETURN TO GAME ] */}
            <div className="flex items-center justify-end gap-3 pt-2 flex-wrap">
              <button
                id="heritage-hunt-try-another-btn"
                onClick={handleTryAgain}
                className="px-5 py-3 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs transition cursor-pointer"
              >
                Try Another Image
              </button>
              <button
                id="heritage-hunt-failed-return-btn"
                onClick={handleReturnToGame}
                disabled={isClaiming}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 hover:from-amber-700 hover:to-orange-700 text-white font-black text-sm shadow-md transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <span>RETURN TO GAME</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
