import React, { useState, useEffect, useRef } from 'react';
import { 
  Radio, 
  Users, 
  Heart, 
  Send, 
  MessageCircle, 
  Video, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Share2, 
  Plus, 
  X, 
  Flame, 
  ShieldCheck, 
  Disc3 
} from 'lucide-react';
import { UserProfile } from '../types';

interface LiveMessage {
  id: string;
  user: string;
  avatar: string;
  text: string;
  isHost?: boolean;
}

interface LiveSpacesProps {
  profile: UserProfile;
}

const initialLiveChat: LiveMessage[] = [
  {
    id: 'l1',
    user: 'Maya Lin',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    text: 'Welcome everyone! Testing the synth filters for tonight\'s sunset set at Skyline Rooftop! 🎧✨',
    isHost: true,
  },
  {
    id: 'l2',
    user: 'Jordan Vance',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    text: 'Sound is crisp Maya! Patio is already filling up!',
  },
  {
    id: 'l3',
    user: 'Sofia Reyes',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    text: 'Bringing three friends tonight! Love this track!',
  },
  {
    id: 'l4',
    user: 'Liam Chen',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    text: 'What is that synth chord progression called?',
  }
];

export const LiveSpaces: React.FC<LiveSpacesProps> = ({ profile }) => {
  const [messages, setMessages] = useState<LiveMessage[]>(initialLiveChat);
  const [newMsg, setNewMsg] = useState('');
  const [viewerCount, setViewerCount] = useState(1420);
  const [likeCount, setLikeCount] = useState(389);
  const [isMuted, setIsMuted] = useState(true);
  const [isGoLiveModalOpen, setIsGoLiveModalOpen] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; left: number }[]>([]);
  const chatBottomRef = useRef<HTMLDivElement | null>(null);

  // Stream info
  const [streamTitle, setStreamTitle] = useState('Maya Lin Live Sunset DJ & Synth Session 🌇');
  const [streamCategory, setStreamCategory] = useState('Live Music & Date Vibes');
  const [isBroadcasting, setIsBroadcasting] = useState(true);

  // Auto-scroll chat
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Periodic simulated live viewer fluctuations & chat messages
  useEffect(() => {
    const interval = setInterval(() => {
      setViewerCount(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const triggerHeartReaction = () => {
    setLikeCount(prev => prev + 1);
    const newHeart = { id: Date.now(), left: Math.random() * 80 + 10 };
    setFloatingHearts(prev => [...prev, newHeart]);
    setTimeout(() => {
      setFloatingHearts(prev => prev.filter(h => h.id !== newHeart.id));
    }, 2000);
  };

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMsg.trim()) return;

    const msg: LiveMessage = {
      id: 'lm_' + Date.now(),
      user: profile.name,
      avatar: profile.avatar,
      text: newMsg.trim(),
    };

    setMessages(prev => [...prev, msg]);
    setNewMsg('');
    triggerHeartReaction();
  };

  const handleStartBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBroadcasting(true);
    setIsGoLiveModalOpen(false);
    setStreamTitle(`${profile.name}'s Live Face Space Broadcast 🎙️`);
    setStreamCategory('Community Hangout & Date Chat');
    setMessages([
      {
        id: 'host_' + Date.now(),
        user: profile.name,
        avatar: profile.avatar,
        text: `Hey Face Space family! I am now LIVE from ${profile.location}. Ask me anything!`,
        isHost: true,
      }
    ]);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-800 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
            <span className="text-[11px] font-black uppercase tracking-wider text-red-400 bg-red-500/10 px-2 py-0.5 rounded border border-red-500/30">
              LIVE BROADCAST
            </span>
            <span className="text-xs text-slate-400 font-mono">
              {viewerCount.toLocaleString()} Watching
            </span>
          </div>
          <h2 className="text-xl font-black text-white">Face Space Live Lounge</h2>
          <p className="text-xs text-slate-400">Stream rooftop sets, date discussions, and venue tours in real-time</p>
        </div>

        <button
          onClick={() => setIsGoLiveModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-bold text-xs shadow-lg shadow-red-500/25 transition active:scale-95 shrink-0"
        >
          <Video className="w-4 h-4" />
          <span>Go Live Studio</span>
        </button>
      </div>

      {/* Main Broadcast Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Live Video Player Area */}
        <div className="lg:col-span-8 bg-black rounded-3xl overflow-hidden border-2 border-slate-800 shadow-2xl relative flex flex-col justify-between h-[520px]">
          {/* Simulated Video Feed */}
          <video
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-85"
          />

          {/* Top Video Overlay Controls */}
          <div className="relative z-10 p-4 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-red-600 text-white font-black text-xs tracking-wider flex items-center gap-1.5 animate-pulse">
                <span className="w-2 h-2 rounded-full bg-white" />
                LIVE
              </span>
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-xs text-white border border-white/10">
                <Users className="w-3.5 h-3.5 text-cyan-400" />
                <span className="font-mono font-bold">{viewerCount.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMuted(!isMuted)}
                className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/10 hover:bg-black/80 transition"
              >
                {isMuted ? <VolumeX className="w-4 h-4 text-pink-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
              </button>
              <button
                onClick={() => {
                  navigator.clipboard?.writeText?.(window.location.href);
                  alert('Live Stream link copied!');
                }}
                className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/10 hover:bg-black/80 transition"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Floating Reaction Hearts */}
          <div className="relative flex-1 pointer-events-none overflow-hidden">
            {floatingHearts.map((heart) => (
              <div
                key={heart.id}
                className="absolute bottom-4 text-pink-500 animate-floatUp text-2xl"
                style={{ left: `${heart.left}%` }}
              >
                ❤️
              </div>
            ))}
          </div>

          {/* Bottom Video Meta & Quick Reaction */}
          <div className="relative z-10 p-5 bg-gradient-to-t from-black via-black/80 to-transparent flex items-end justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-500/30">
                {streamCategory}
              </span>
              <h3 className="text-lg font-black text-white drop-shadow">
                {streamTitle}
              </h3>
              <p className="text-xs text-slate-300 drop-shadow flex items-center gap-1.5">
                <Disc3 className="w-3.5 h-3.5 text-pink-400 animate-spin" />
                <span>Hosting: Maya Lin · 70% Creator Supported Stream</span>
              </p>
            </div>

            {/* Quick Heart Reaction Button */}
            <button
              onClick={triggerHeartReaction}
              className="p-3.5 rounded-full bg-pink-600/90 hover:bg-pink-500 text-white backdrop-blur-md shadow-lg shadow-pink-500/40 hover:scale-110 active:scale-90 transition flex items-center gap-1.5 shrink-0"
              title="Send Heart"
            >
              <Heart className="w-5 h-5 fill-white" />
              <span className="text-xs font-bold">{likeCount}</span>
            </button>
          </div>
        </div>

        {/* Live Chat Stream Area */}
        <div className="lg:col-span-4 bg-slate-900/90 rounded-3xl border border-slate-800 shadow-2xl flex flex-col h-[520px] overflow-hidden">
          {/* Chat Header */}
          <div className="p-3.5 border-b border-slate-800 bg-slate-950/80 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-pink-400" />
              <h4 className="font-bold text-xs text-white">Live Audience Chat</h4>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
              <ShieldCheck className="w-3 h-3" />
              <span>Shield Active</span>
            </div>
          </div>

          {/* Chat Messages Log */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-2.5 text-xs">
            {messages.map((m) => (
              <div key={m.id} className="flex items-start gap-2 bg-slate-950/40 p-2 rounded-xl border border-slate-800/40">
                <img
                  src={m.avatar}
                  alt={m.user}
                  referrerPolicy="no-referrer"
                  className="w-6 h-6 rounded-full object-cover shrink-0 border border-slate-700"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="font-bold text-slate-200 text-[11px] truncate">{m.user}</span>
                    {m.isHost && (
                      <span className="text-[9px] px-1 rounded bg-pink-500/20 text-pink-300 font-mono">HOST</span>
                    )}
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed break-words">{m.text}</p>
                </div>
              </div>
            ))}
            <div ref={chatBottomRef} />
          </div>

          {/* Chat Input */}
          <form onSubmit={handleSendChat} className="p-3 border-t border-slate-800 bg-slate-950 flex items-center gap-2">
            <input
              type="text"
              placeholder="Chat as Alex Mercer..."
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
            />
            <button
              type="submit"
              disabled={!newMsg.trim()}
              className="p-2 rounded-xl bg-pink-600 disabled:bg-slate-800 text-white hover:bg-pink-500 transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Go Live Studio Modal */}
      {isGoLiveModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-red-500/40 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Video className="w-4 h-4 text-red-400" />
                <span>Go Live on Face Space</span>
              </h3>
              <button
                onClick={() => setIsGoLiveModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleStartBroadcast} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Broadcast Title</label>
                <input
                  type="text"
                  placeholder="e.g. DJ Set & First Date Stories from Austin"
                  defaultValue={`${profile.name}'s Live Community Space`}
                  required
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Topic Category</label>
                <select className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-red-500">
                  <option value="Live Music & DJ">Live Music & DJ</option>
                  <option value="Venue & Speakeasy Tour">Venue & Speakeasy Tour</option>
                  <option value="Dating Q&A & Wingman Advice">Dating Q&A & Wingman Advice</option>
                  <option value="Casual Hangout">Casual Hangout</option>
                </select>
              </div>

              <div className="p-3 bg-red-950/30 border border-red-500/20 rounded-xl text-slate-300 leading-relaxed text-[11px]">
                🛡️ All live broadcasts must follow our Anti-Bullying Shield & Community Safety rules. 70% of live viewer tips are instantly disbursed to your creator account.
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsGoLiveModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold transition shadow-md shadow-red-500/25"
                >
                  Start Live Stream
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
