import React, { useState, useEffect, useMemo } from 'react';
import { 
  HelpCircle, 
  Award, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  ArrowRight, 
  Flame, 
  ShieldCheck, 
  Leaf, 
  Package, 
  RefreshCw,
  Trash2
} from 'lucide-react';
import { QUIZ_QUESTIONS } from '../data/quizData';
import { PrimaryCategory, QuizProgress, QuizQuestion } from '../types/waste';
import { storageService } from '../services/storageService';

export const QuizView: React.FC = () => {
  const [selectedDifficulty, setSelectedDifficulty] = useState<'All' | 'Beginner' | 'Intermediate' | 'Advanced'>('All');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<PrimaryCategory | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [sessionScore, setSessionScore] = useState<number>(0);
  const [isQuizComplete, setIsQuizComplete] = useState<boolean>(false);
  const [sessionMistakes, setSessionMistakes] = useState<{
    question: QuizQuestion;
    userAnswer: PrimaryCategory;
  }[]>([]);

  const [quizProgress, setQuizProgress] = useState<QuizProgress>(storageService.getQuizProgress());

  // Filter questions by difficulty
  const questionsList = useMemo(() => {
    let pool = QUIZ_QUESTIONS;
    if (selectedDifficulty !== 'All') {
      pool = QUIZ_QUESTIONS.filter((q) => q.difficulty === selectedDifficulty);
    }
    // Deterministic shuffle based on array order
    return [...pool].sort((a, b) => a.id.localeCompare(b.id));
  }, [selectedDifficulty]);

  const currentQuestion: QuizQuestion | undefined = questionsList[currentIndex];

  const handleSelectAnswer = (category: PrimaryCategory) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(category);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer || !currentQuestion || isAnswerSubmitted) return;

    const isCorrect = selectedAnswer === currentQuestion.primaryCategory;
    setIsAnswerSubmitted(true);

    if (isCorrect) {
      setSessionScore((prev) => prev + 1);
    } else {
      setSessionMistakes((prev) => [
        ...prev,
        { question: currentQuestion, userAnswer: selectedAnswer },
      ]);
    }

    // Persist to local storage
    const updated = storageService.saveQuizAnswer(isCorrect, isCorrect ? undefined : {
      questionId: currentQuestion.id,
      itemName: currentQuestion.itemName,
      userAnswer: selectedAnswer,
      correctAnswer: currentQuestion.primaryCategory,
      explanation: currentQuestion.explanation,
      timestamp: Date.now(),
    });

    setQuizProgress(updated);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);

    if (currentIndex + 1 < questionsList.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsQuizComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setSessionScore(0);
    setSessionMistakes([]);
    setIsQuizComplete(false);
  };

  const handleClearQuizHistory = () => {
    if (window.confirm('Reset all saved quiz scores, streaks, and mistake records?')) {
      storageService.resetQuizProgress();
      setQuizProgress(storageService.getQuizProgress());
      handleRestart();
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Header & Scoreboard */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
          Waste Segregation Quiz
        </h1>
        <p className="text-sm text-slate-600">
          Identify the correct primary stream for real household waste items and sharpen your sorting reflexes.
        </p>

        {/* Live Score & Streak Bar */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-3 text-xs">
          <div className="flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-lg shadow-2xs font-mono">
            <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="text-slate-500">Streak:</span>
            <span className="font-bold text-slate-900">{quizProgress.currentStreak}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-lg shadow-2xs font-mono">
            <Award className="w-4 h-4 text-emerald-600" />
            <span className="text-slate-500">Personal Best:</span>
            <span className="font-bold text-slate-900">{quizProgress.bestScore}</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-lg shadow-2xs font-mono">
            <span className="text-slate-500">Total Answered:</span>
            <span className="font-bold text-slate-900">{quizProgress.totalAnswered}</span>
          </div>

          {quizProgress.totalAnswered > 0 && (
            <button
              onClick={handleClearQuizHistory}
              className="text-slate-400 hover:text-rose-600 p-1 transition-colors"
              title="Reset Quiz Statistics"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Difficulty Filter Tabs (Shown before quiz finish) */}
      {!isQuizComplete && (
        <div className="flex items-center justify-center gap-2">
          {(['All', 'Beginner', 'Intermediate', 'Advanced'] as const).map((lvl) => (
            <button
              key={lvl}
              onClick={() => {
                setSelectedDifficulty(lvl);
                handleRestart();
              }}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-colors ${
                selectedDifficulty === lvl
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      )}

      {/* Main Quiz Card */}
      {isQuizComplete ? (
        /* Results View */
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl font-display font-bold text-slate-900">Quiz Completed!</h2>
            <p className="text-sm text-slate-600">Here is how you performed in this session:</p>
          </div>

          <div className="grid grid-cols-3 gap-3 max-w-sm mx-auto font-mono">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-[11px] text-slate-500 uppercase block">Score</span>
              <span className="text-xl font-bold text-slate-900">{sessionScore} / {questionsList.length}</span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-[11px] text-slate-500 uppercase block">Accuracy</span>
              <span className="text-xl font-bold text-emerald-700">
                {questionsList.length > 0 ? Math.round((sessionScore / questionsList.length) * 100) : 0}%
              </span>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
              <span className="text-[11px] text-slate-500 uppercase block">Best Streak</span>
              <span className="text-xl font-bold text-amber-600">{quizProgress.bestScore}</span>
            </div>
          </div>

          {/* Review of Mistakes */}
          {sessionMistakes.length > 0 && (
            <div className="text-left pt-4 border-t border-slate-200 space-y-3">
              <h3 className="text-xs uppercase font-mono font-bold text-rose-700 tracking-wider">
                Review Incorrect Answers ({sessionMistakes.length})
              </h3>
              <div className="space-y-3">
                {sessionMistakes.map((m, idx) => (
                  <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs">
                    <div className="font-bold text-slate-900 flex items-center justify-between">
                      <span>{m.question.itemName}</span>
                      <span className="text-emerald-700 font-semibold">Correct: {m.question.primaryCategory}</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">{m.question.explanation}</p>
                    <div className="text-[11px] text-slate-500 bg-white p-2 rounded border border-slate-200">
                      💡 Tip: {m.question.segregationTip}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={handleRestart}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Quiz</span>
            </button>
          </div>
        </div>
      ) : currentQuestion ? (
        /* Active Question Card */
        <div className="bg-white border border-slate-200 rounded-2xl shadow-xs overflow-hidden">
          {/* Progress Header Bar */}
          <div className="px-5 py-3.5 bg-slate-50 border-b border-slate-200 flex items-center justify-between text-xs font-mono">
            <span className="font-bold text-slate-700">
              Question {currentIndex + 1} of {questionsList.length}
            </span>
            <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-800 text-[11px] font-semibold">
              {currentQuestion.difficulty}
            </span>
          </div>

          {/* Question Body */}
          <div className="p-5 sm:p-6 space-y-6">
            {/* Real-Life Photo Container */}
            <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-900 aspect-16/9 sm:aspect-21/9 max-h-72 flex items-center justify-center relative">
              <img
                src={currentQuestion.realImageUrl}
                alt={currentQuestion.imageAlt}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 text-[10px] text-white/90 bg-black/60 px-2 py-0.5 rounded font-mono">
                Photo: {currentQuestion.photoCredit.photographer} ({currentQuestion.photoCredit.source})
              </div>
            </div>

            {/* Prompt Heading */}
            <div className="text-center space-y-1">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-semibold">
                Classify This Item
              </span>
              <h2 className="text-xl sm:text-2xl font-display font-bold text-slate-900">
                {currentQuestion.itemName}
              </h2>
            </div>

            {/* Selectable Options */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(['Wet Waste', 'Dry Waste', 'Recyclable'] as PrimaryCategory[]).map((category) => {
                let btnStyle = 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300';

                if (selectedAnswer === category) {
                  btnStyle = 'bg-slate-900 text-white border-slate-900 shadow-xs';
                }

                if (isAnswerSubmitted) {
                  if (category === currentQuestion.primaryCategory) {
                    btnStyle = 'bg-emerald-700 text-white border-emerald-700 ring-2 ring-emerald-300 font-bold';
                  } else if (selectedAnswer === category && category !== currentQuestion.primaryCategory) {
                    btnStyle = 'bg-rose-600 text-white border-rose-600 opacity-90 line-through';
                  } else {
                    btnStyle = 'bg-slate-50 text-slate-400 border-slate-200 opacity-60';
                  }
                }

                const icon =
                  category === 'Wet Waste' ? (
                    <Leaf className="w-4 h-4 shrink-0" />
                  ) : category === 'Recyclable' ? (
                    <RefreshCw className="w-4 h-4 shrink-0" />
                  ) : (
                    <Package className="w-4 h-4 shrink-0" />
                  );

                return (
                  <button
                    key={category}
                    disabled={isAnswerSubmitted}
                    onClick={() => handleSelectAnswer(category)}
                    className={`py-3 px-4 rounded-xl border text-sm font-semibold flex items-center justify-center gap-2 transition-all ${btnStyle}`}
                  >
                    {icon}
                    <span>{category}</span>
                  </button>
                );
              })}
            </div>

            {/* Immediate Feedback Card */}
            {isAnswerSubmitted && (
              <div
                className={`p-4 rounded-xl border space-y-2 animate-in fade-in duration-150 ${
                  selectedAnswer === currentQuestion.primaryCategory
                    ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950'
                    : 'bg-rose-50/70 border-rose-200 text-rose-950'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm">
                  {selectedAnswer === currentQuestion.primaryCategory ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                      <span>Correct! Classified as {currentQuestion.primaryCategory}.</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      <span>
                        Incorrect. This belongs in{' '}
                        <span className="font-extrabold">{currentQuestion.primaryCategory}</span>.
                      </span>
                    </>
                  )}
                </div>

                <p className="text-xs leading-relaxed text-slate-700">
                  {currentQuestion.explanation}
                </p>

                <div className="pt-2 text-xs text-slate-800 bg-white/80 p-2.5 rounded-lg border border-slate-200/80">
                  <span className="font-bold text-slate-900">💡 Segregation Tip: </span>
                  {currentQuestion.segregationTip}
                </div>
              </div>
            )}

            {/* Action Bar */}
            <div className="pt-2 flex items-center justify-end">
              {!isAnswerSubmitted ? (
                <button
                  type="button"
                  disabled={!selectedAnswer}
                  onClick={handleSubmitAnswer}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-xs"
                >
                  Submit Answer
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-colors shadow-xs"
                >
                  <span>{currentIndex + 1 < questionsList.length ? 'Next Question' : 'View Results'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
