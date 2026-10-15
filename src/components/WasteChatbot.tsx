import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageSquare, AlertCircle, RefreshCw, Sparkles } from 'lucide-react';
import { ClassificationResult, ChatMessage } from '../types/waste';

interface WasteChatbotProps {
  itemResult: ClassificationResult;
}

const QUICK_QUESTIONS = [
  'Can I recycle the bottle cap or lid?',
  'How clean does this need to be before binning?',
  'What happens if this enters the wrong waste stream?',
  'Can I reuse or upcycle this at home?',
  'Why did you classify it in this stream?',
];

export const WasteChatbot: React.FC<WasteChatbotProps> = ({ itemResult }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputVal, setInputVal] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  // Initialize with greeting
  useEffect(() => {
    setMessages([
      {
        id: 'msg-welcome',
        role: 'assistant',
        content: `I'm here to help with your **${itemResult.itemName}** (${itemResult.primaryCategory}). Feel free to ask about cleaning tips, cap recycling, local municipal rules, or home reuse ideas!`,
        timestamp: Date.now(),
      },
    ]);
  }, [itemResult.id, itemResult.itemName, itemResult.primaryCategory]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = async (questionText: string) => {
    const trimmed = questionText.trim();
    if (!trimmed || isLoading) return;

    setErrorMessage(null);
    const userMsg: ChatMessage = {
      id: `usr_${Date.now()}`,
      role: 'user',
      content: trimmed,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          itemContext: itemResult,
          history: messages.map((m) => ({ role: m.role, content: m.content })),
          question: trimmed,
          region: itemResult.regionalPreset,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `Server responded with status ${response.status}`);
      }

      const data = await response.json();
      const assistantMsg: ChatMessage = {
        id: `ai_${Date.now()}`,
        role: 'assistant',
        content: data.reply || 'No response returned from assistant.',
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      console.error('Chat error:', err);
      setErrorMessage(err.message || 'Failed to reach AI assistant. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([
      {
        id: `msg-reset-${Date.now()}`,
        role: 'assistant',
        content: `Conversation reset. What else would you like to know about disposing of this ${itemResult.itemName}?`,
        timestamp: Date.now(),
      },
    ]);
    setErrorMessage(null);
  };

  return (
    <div className="border border-slate-200 rounded-xl bg-white overflow-hidden shadow-xs mt-6">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-emerald-700" />
          <h4 className="text-sm font-semibold text-slate-800">
            Ask EcoLens about this {itemResult.itemName}
          </h4>
        </div>
        <button
          onClick={resetChat}
          className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1 transition-colors px-2 py-1 rounded hover:bg-slate-200/60"
          title="Reset conversation"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="p-4 space-y-3 max-h-72 overflow-y-auto bg-[#FAFAFA]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] rounded-xl px-3.5 py-2.5 text-sm leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-slate-900 text-white'
                  : 'bg-white text-slate-800 border border-slate-200 shadow-2xs'
              }`}
            >
              <div className="whitespace-pre-line">{msg.content}</div>
              <div
                className={`text-[10px] mt-1 font-mono tabular-nums ${
                  msg.role === 'user' ? 'text-slate-400 text-right' : 'text-slate-400'
                }`}
              >
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-500 flex items-center gap-2 shadow-2xs">
              <div className="w-3.5 h-3.5 border-2 border-emerald-600 border-t-transparent rounded-full animate-spin" />
              <span>EcoLens is analyzing your question...</span>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium">Assistant temporarily unavailable</p>
              <p className="text-rose-700 mt-0.5">{errorMessage}</p>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Suggested Quick Prompt Buttons */}
      <div className="px-4 py-2 bg-slate-50/70 border-t border-slate-200 flex items-center gap-1.5 overflow-x-auto text-xs">
        <span className="text-slate-400 font-medium whitespace-nowrap shrink-0 text-[11px] flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-500" />
          <span>Suggestions:</span>
        </span>
        {QUICK_QUESTIONS.map((q, idx) => (
          <button
            key={idx}
            disabled={isLoading}
            onClick={() => handleSend(q)}
            className="whitespace-nowrap shrink-0 px-2.5 py-1 bg-white hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-200 hover:border-emerald-300 rounded-md text-[11px] transition-colors disabled:opacity-50"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSend(inputVal);
        }}
        className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
      >
        <input
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          placeholder={`Ask about recycling, washing, or reusing this ${itemResult.itemName}...`}
          disabled={isLoading}
          className="flex-1 px-3 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
        />
        <button
          type="submit"
          disabled={!inputVal.trim() || isLoading}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 shrink-0"
        >
          <Send className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Ask</span>
        </button>
      </form>
    </div>
  );
};
