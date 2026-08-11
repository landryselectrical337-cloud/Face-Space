import React, { useState, useRef, useEffect } from 'react';
import { 
  HeartHandshake, 
  Sparkles, 
  Volume2, 
  VolumeX, 
  Send, 
  Zap, 
  Shirt, 
  MessageCircle, 
  Drama, 
  Flame, 
  Lightbulb, 
  Bot, 
  User,
  Loader2,
  Smile,
  RefreshCw
} from 'lucide-react';
import { WingmanMessage } from '../types';

interface WingmanAssistantProps {
  initialPrompt?: string;
  onClearInitialPrompt?: () => void;
}

export const WingmanAssistant: React.FC<WingmanAssistantProps> = ({
  initialPrompt,
  onClearInitialPrompt,
}) => {
  const [messages, setMessages] = useState<WingmanMessage[]>([
    {
      id: 'm1',
      sender: 'wingman',
      text: "Hey! I'm your AI Social Wingman on Face Space 🚀. Whether you're heading on a first date, feeling pre-date jitters, or need a witty icebreaker, I'm right here in your corner. What are we prepping for tonight?",
      timestamp: 'Just now',
    },
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [targetVibe, setTargetVibe] = useState('Casual Cocktail Date');
  const [isLoading, setIsLoading] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  // If passed an initial prompt from profile or navbar
  useEffect(() => {
    if (initialPrompt && initialPrompt.trim() !== '') {
      handleSendMessage(initialPrompt);
      if (onClearInitialPrompt) onClearInitialPrompt();
    }
  }, [initialPrompt]);

  const handleSendMessage = async (textToSend?: string, modeOverride?: string) => {
    const prompt = textToSend || inputPrompt;
    if (!prompt.trim() || isLoading) return;

    const userMsg: WingmanMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: prompt,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputPrompt('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/wingman/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
          mode: modeOverride || 'general',
          targetVibe,
          history: messages.map((m) => ({ role: m.sender, text: m.text })),
        }),
      });

      const data = await response.json();
      const wingmanMsg: WingmanMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'wingman',
        text: data.reply || "You've got this! Remember to stay present and ask curious questions!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, wingmanMsg]);
    } catch (err) {
      const errorMsg: WingmanMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'wingman',
        text: "Deep breath! You've got naturally charming energy. Just be yourself and focus on enjoying the night! ✨",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  // Speak AI Wingman message using browser Web Speech API as instant TTS or server audio
  const handleVoiceover = (msgId: string, text: string) => {
    if (isPlayingAudio === msgId) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(null);
      return;
    }

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      utterance.onstart = () => setIsPlayingAudio(msgId);
      utterance.onend = () => setIsPlayingAudio(null);
      utterance.onerror = () => setIsPlayingAudio(null);

      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6">

      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-pink-950 via-purple-950 to-indigo-950 border-2 border-pink-500/50 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-500 p-0.5 shadow-lg shadow-pink-500/30 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-pink-400">
                <HeartHandshake className="w-6 h-6 animate-pulse" />
              </div>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                AI Social Wingman
                <span className="text-xs px-2 py-0.5 bg-pink-500/20 border border-pink-500/50 text-pink-300 rounded-full font-semibold">
                  Voice & Confidence Coach
                </span>
              </h2>
              <p className="text-xs text-pink-200/80">
                Building dating confidence, conversation starters, and date scenarios under #BetterTogether.
              </p>
            </div>
          </div>

          {/* Vibe Dropdown */}
          <div className="flex items-center gap-2 bg-slate-900/90 p-2 rounded-xl border border-slate-800 text-xs text-slate-300">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span>Target Vibe:</span>
            <select
              value={targetVibe}
              onChange={(e) => setTargetVibe(e.target.value)}
              className="bg-slate-950 border border-slate-700 text-white rounded-lg px-2 py-1 focus:outline-none focus:border-pink-500"
            >
              <option value="Casual Cocktail Date">Cocktail Bar Date</option>
              <option value="Coffee & Walk">Coffee & Walk</option>
              <option value="Speakeasy & Jazz">Speakeasy & Jazz</option>
              <option value="Arcade & Fun Games">Arcade & Activity</option>
              <option value="First Time Dinner">First Time Dinner</option>
            </select>
          </div>
        </div>

        {/* Quick Wingman Action Chips */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
          <button
            onClick={() => handleSendMessage("Give me a 30-second pre-date confidence pep-talk! I'm feeling nervous.", 'peptalk')}
            className="p-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-pink-500/40 text-left space-y-1 transition group"
          >
            <div className="flex items-center gap-1.5 text-xs font-bold text-pink-300 group-hover:text-pink-200">
              <Zap className="w-4 h-4 text-yellow-400 animate-bounce" />
              <span>Pre-Date Pep Talk</span>
            </div>
            <p className="text-[10px] text-slate-400">Instant confidence hype</p>
          </button>

          <button
            onClick={() => handleSendMessage(`Give me 3 witty, non-cheesy icebreakers for a ${targetVibe}.`, 'icebreaker')}
            className="p-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-purple-500/40 text-left space-y-1 transition group"
          >
            <div className="flex items-center gap-1.5 text-xs font-bold text-purple-300 group-hover:text-purple-200">
              <MessageCircle className="w-4 h-4 text-cyan-400" />
              <span>3 Icebreakers</span>
            </div>
            <p className="text-[10px] text-slate-400">Tailored to your date vibe</p>
          </button>

          <button
            onClick={() => handleSendMessage("Check my outfit plan: Dark fitted denim, black linen shirt, and clean white sneakers. Does this fit a cocktail date?", 'outfit')}
            className="p-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-cyan-500/40 text-left space-y-1 transition group"
          >
            <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300 group-hover:text-cyan-200">
              <Shirt className="w-4 h-4 text-pink-400" />
              <span>Outfit & Vibe Check</span>
            </div>
            <p className="text-[10px] text-slate-400">Assesses style & fit</p>
          </button>

          <button
            onClick={() => handleSendMessage("Let's roleplay a mock date! You act as my date at a quiet lounge. I'll practice my opening line.", 'scenario')}
            className="p-3 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-emerald-500/40 text-left space-y-1 transition group"
          >
            <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-300 group-hover:text-emerald-200">
              <Drama className="w-4 h-4 text-emerald-400" />
              <span>Mock Date Simulator</span>
            </div>
            <p className="text-[10px] text-slate-400">Practice live conversation</p>
          </button>
        </div>
      </div>

      {/* Main Chat Box */}
      <div className="rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl flex flex-col h-[520px] overflow-hidden">
        
        {/* Chat Messages Feed */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 ${
                  msg.sender === 'user'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gradient-to-tr from-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/20'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
              </div>

              <div className={`space-y-1 max-w-xl ${msg.sender === 'user' ? 'text-right' : ''}`}>
                <div className="flex items-center gap-2 text-[10px] text-slate-400 px-1">
                  <span>{msg.sender === 'user' ? 'You' : 'AI Wingman'}</span>
                  <span>•</span>
                  <span>{msg.timestamp}</span>
                </div>

                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-purple-600 text-white rounded-tr-none'
                      : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none shadow-inner'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {/* AI Voiceover Play Button */}
                  {msg.sender === 'wingman' && (
                    <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                      <button
                        onClick={() => handleVoiceover(msg.id, msg.text)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium transition ${
                          isPlayingAudio === msg.id
                            ? 'bg-pink-600 text-white animate-pulse'
                            : 'bg-slate-900 hover:bg-slate-800 text-pink-300 border border-pink-500/30'
                        }`}
                      >
                        {isPlayingAudio === msg.id ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5" />
                            <span>Stop Voiceover</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5 text-pink-400" />
                            <span>Listen Voiceover</span>
                          </>
                        )}
                      </button>

                      {isPlayingAudio === msg.id && (
                        <div className="flex items-center gap-0.5">
                          <span className="w-1 h-3 bg-pink-400 animate-bounce"></span>
                          <span className="w-1 h-4 bg-purple-400 animate-bounce" style={{ animationDelay: '0.1s' }}></span>
                          <span className="w-1 h-2 bg-pink-400 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-3 text-slate-400 text-xs">
              <div className="w-8 h-8 rounded-xl bg-pink-600/30 flex items-center justify-center text-pink-400">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
              <span className="italic">AI Wingman is formulating your strategy...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Controls */}
        <div className="p-4 bg-slate-950 border-t border-slate-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask Wingman anything (e.g. 'What if there is an awkward silence?')..."
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 text-xs sm:text-sm text-white focus:outline-none focus:border-pink-500 transition"
            />
            <button
              type="submit"
              disabled={isLoading || !inputPrompt.trim()}
              className="px-5 py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-2xl font-bold text-xs flex items-center gap-2 shadow-lg shadow-pink-500/30 disabled:opacity-50 transition"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
