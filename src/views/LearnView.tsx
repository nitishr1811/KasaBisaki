import React, { useState } from 'react';
import { Search, BookOpen, CheckCircle, Check, ChevronDown, ChevronUp, AlertCircle, X, Leaf, Package, RefreshCw } from 'lucide-react';
import { LEARN_TOPICS } from '../data/learnTopics';
import { LearnTopic, PrimaryCategory } from '../types/waste';
import { storageService } from '../services/storageService';

interface LearnViewProps {
  completedLessons: string[];
  onToggleLesson: (lessonId: string) => void;
}

export const LearnView: React.FC<LearnViewProps> = ({ completedLessons, onToggleLesson }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>('topic-1');

  const categories = ['All', 'Wet Waste', 'Dry Waste', 'Recyclable', 'Composting', 'General'];

  // Filter topics
  const filteredTopics = LEARN_TOPICS.filter((topic) => {
    const matchesCategory = activeCategory === 'All' || topic.category === activeCategory;
    const query = searchQuery.toLowerCase().trim();
    if (!query) return matchesCategory;

    const matchesSearch =
      topic.title.toLowerCase().includes(query) ||
      topic.summary.toLowerCase().includes(query) ||
      topic.commonExamples.some((ex) => ex.toLowerCase().includes(query)) ||
      topic.dos.some((d) => d.toLowerCase().includes(query));

    return matchesCategory && matchesSearch;
  });

  const toggleExpand = (id: string) => {
    setExpandedTopicId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-10 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-slate-900 tracking-tight">
          Household Segregation Guide
        </h1>
        <p className="text-sm text-slate-600">
          Master the rules of waste separation, prevent recycling contamination, and explore accessible home composting methods.
        </p>

        {/* Progress Tracker */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold font-mono mt-2">
          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
          <span>Completed: {completedLessons.length} of {LEARN_TOPICS.length} Lessons</span>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search waste items (e.g. pizza box, milk pouch, eggshells, thermocol)..."
            className="w-full pl-10 pr-10 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-600 shadow-2xs text-slate-900 placeholder:text-slate-400"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Topics List */}
      {filteredTopics.length === 0 ? (
        <div className="p-12 text-center bg-white border border-slate-200 rounded-2xl">
          <BookOpen className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <h3 className="text-sm font-bold text-slate-800">No matching lessons found</h3>
          <p className="text-xs text-slate-500 mt-1">Try searching for a different term or clear your category filter.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveCategory('All');
            }}
            className="mt-4 px-4 py-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 rounded-lg hover:bg-emerald-100"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredTopics.map((topic) => {
            const isExpanded = expandedTopicId === topic.id;
            const isCompleted = completedLessons.includes(topic.id);

            return (
              <div
                key={topic.id}
                className={`bg-white border rounded-2xl overflow-hidden transition-all shadow-xs ${
                  isCompleted ? 'border-emerald-200/80' : 'border-slate-200'
                }`}
              >
                {/* Topic Header Accordion Bar */}
                <div
                  onClick={() => toggleExpand(topic.id)}
                  className="p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/70 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleLesson(topic.id);
                      }}
                      className={`w-6 h-6 rounded-md flex items-center justify-center transition-colors shrink-0 ${
                        isCompleted
                          ? 'bg-emerald-700 text-white'
                          : 'border border-slate-300 hover:border-slate-400 bg-white'
                      }`}
                      title={isCompleted ? 'Mark as incomplete' : 'Mark as completed'}
                    >
                      {isCompleted && <Check className="w-4 h-4 stroke-[2.5]" />}
                    </button>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                          {topic.category}
                        </span>
                        {isCompleted && (
                          <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                            Completed
                          </span>
                        )}
                      </div>
                      <h2 className="text-base sm:text-lg font-display font-bold text-slate-900 mt-0.5">
                        {topic.title}
                      </h2>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-slate-400 hidden sm:inline">
                      {isExpanded ? 'Hide' : 'Read'}
                    </span>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-slate-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-500" />
                    )}
                  </div>
                </div>

                {/* Expanded Content */}
                {isExpanded && (
                  <div className="px-5 pb-6 pt-2 border-t border-slate-100 space-y-5 animate-in fade-in duration-150">
                    <p className="text-sm text-slate-700 leading-relaxed font-medium bg-slate-50/60 p-3.5 rounded-xl border border-slate-200/80">
                      {topic.summary}
                    </p>

                    {/* Real-Life Photograph if present */}
                    {topic.realImageUrl && (
                      <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                        <div className="aspect-16/9 max-h-64 w-full">
                          <img
                            src={topic.realImageUrl}
                            alt={topic.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {topic.photoCredit && (
                          <div className="p-2 text-[10px] text-slate-500 font-mono bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                            <span>Photo: {topic.photoCredit.photographer}</span>
                            <a
                              href={topic.photoCredit.sourceUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="text-emerald-700 hover:underline"
                            >
                              Source: {topic.photoCredit.source} ↗
                            </a>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Detailed Paragraphs */}
                    <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {topic.detailedContent.map((para, i) => (
                        <p key={i} className="whitespace-pre-line">{para}</p>
                      ))}
                    </div>

                    {/* Do's and Don'ts Columns */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-xl space-y-2">
                        <h4 className="text-xs font-bold text-emerald-900 uppercase font-mono tracking-wider flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 text-emerald-700" />
                          <span>Do's</span>
                        </h4>
                        <ul className="space-y-1.5 text-xs text-emerald-950">
                          {topic.dos.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-emerald-700 font-bold mt-0.5">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="p-4 bg-rose-50/50 border border-rose-200 rounded-xl space-y-2">
                        <h4 className="text-xs font-bold text-rose-900 uppercase font-mono tracking-wider flex items-center gap-1.5">
                          <X className="w-3.5 h-3.5 text-rose-700" />
                          <span>Don'ts</span>
                        </h4>
                        <ul className="space-y-1.5 text-xs text-rose-950">
                          {topic.donts.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-rose-700 font-bold mt-0.5">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Common Household Examples */}
                    {topic.commonExamples.length > 0 && (
                      <div className="pt-2 border-t border-slate-100">
                        <span className="text-xs font-semibold text-slate-700 block mb-2">
                          Common Household Examples:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {topic.commonExamples.map((ex, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 text-xs bg-slate-100 text-slate-800 rounded-md border border-slate-200"
                            >
                              {ex}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Mark as Completed Button */}
                    <div className="pt-3 flex justify-end">
                      <button
                        onClick={() => onToggleLesson(topic.id)}
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                          isCompleted
                            ? 'bg-emerald-50 text-emerald-900 border border-emerald-300'
                            : 'bg-slate-900 text-white hover:bg-slate-800 shadow-2xs'
                        }`}
                      >
                        <Check className="w-4 h-4" />
                        <span>{isCompleted ? 'Completed (Click to Unmark)' : 'Mark Lesson as Completed'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
