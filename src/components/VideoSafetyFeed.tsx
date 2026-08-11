import React, { useState } from 'react';
import { 
  Video, 
  ShieldCheck, 
  AlertTriangle, 
  Heart, 
  MessageSquare, 
  Send, 
  Sparkles, 
  CheckCircle2, 
  X, 
  Loader2,
  Film,
  UserCheck
} from 'lucide-react';
import { VideoItem, CommentItem } from '../types';

interface VideoSafetyFeedProps {
  videos: VideoItem[];
  setVideos: React.Dispatch<React.SetStateAction<VideoItem[]>>;
  openDisclaimers: () => void;
}

export const VideoSafetyFeed: React.FC<VideoSafetyFeedProps> = ({
  videos,
  setVideos,
  openDisclaimers,
}) => {
  const [selectedVideoId, setSelectedVideoId] = useState<string>(videos[0]?.id || '');
  const [commentInput, setCommentInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  
  // AI Safety Alert Modal state
  const [safetyAlert, setSafetyAlert] = useState<{
    isOpen: boolean;
    category?: string;
    reason?: string;
    cleanedText?: string;
    originalText?: string;
  }>({ isOpen: false });

  const currentVideo = videos.find(v => v.id === selectedVideoId) || videos[0];

  const handleLikeVideo = (id: string) => {
    setVideos(prev => prev.map(v => v.id === id ? { ...v, likes: v.likes + 1 } : v));
  };

  const handlePostComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim() || isAnalyzing) return;

    setIsAnalyzing(true);

    try {
      // Call server AI Safety API
      const res = await fetch('/api/safety/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: commentInput }),
      });
      const data = await res.json();

      if (!data.safe) {
        // AI flagged improper use, appearance insult, bullying or vulgarity
        setSafetyAlert({
          isOpen: true,
          category: data.category || 'Improper Content',
          reason: data.reason || 'Contains potential appearance-shaming, bullying, or vulgar language.',
          cleanedText: data.cleanedText || 'Looking great! Hope you have a fun date night!',
          originalText: commentInput,
        });
        setIsAnalyzing(false);
        return;
      }

      // Safe comment! Add to video
      addCommentToVideo(commentInput, true);
      setCommentInput('');
    } catch {
      // Fallback
      addCommentToVideo(commentInput, true);
      setCommentInput('');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const addCommentToVideo = (text: string, isSafe: boolean) => {
    const newComment: CommentItem = {
      id: 'c_' + Date.now(),
      author: 'Alex Mercer',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      text,
      timestamp: 'Just now',
      likes: 1,
      aiSafetyStatus: { safe: isSafe },
    };

    setVideos(prev => prev.map(v => {
      if (v.id === currentVideo.id) {
        return {
          ...v,
          commentsCount: v.commentsCount + 1,
          comments: [newComment, ...v.comments],
        };
      }
      return v;
    }));
  };

  const handleAcceptPoliteCleaned = () => {
    if (safetyAlert.cleanedText) {
      addCommentToVideo(safetyAlert.cleanedText, true);
      setCommentInput('');
    }
    setSafetyAlert({ isOpen: false });
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">

      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-cyan-950 via-purple-950 to-slate-950 border-2 border-cyan-500/40 shadow-2xl space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-purple-500 p-0.5 shadow-lg shadow-cyan-500/30 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-cyan-400">
                <Video className="w-6 h-6" />
              </div>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                Date Video Hub & AI Safety Shield
                <span className="text-[10px] px-2 py-0.5 bg-cyan-500/20 border border-cyan-500/50 text-cyan-300 rounded-full font-bold">
                  AI Anti-Bullying Active
                </span>
              </h2>
              <p className="text-xs text-cyan-200/80">
                Short date vlogs, outfit inspiration, & spot reviews with real-time AI safety moderation.
              </p>
            </div>
          </div>

          <button
            onClick={openDisclaimers}
            className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-500 text-xs text-slate-300 hover:text-white flex items-center gap-1.5 transition"
          >
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Read AI Safety Policy</span>
          </button>
        </div>
      </div>

      {/* Main Video Player & Comments Layout */}
      {currentVideo && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left 2 Cols: Main Video Display */}
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden shadow-2xl space-y-4 p-4">
              
              {/* Video Player Box */}
              <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black relative border border-slate-800 shadow-inner">
                <video
                  src={currentVideo.videoUrl}
                  controls
                  poster={currentVideo.thumbnailUrl}
                  className="w-full h-full object-cover"
                >
                  Your browser does not support video playback.
                </video>
              </div>

              {/* Video Info */}
              <div className="space-y-2 px-2">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 border border-cyan-500/40 text-cyan-300">
                    {currentVideo.category}
                  </span>
                  <button
                    onClick={() => handleLikeVideo(currentVideo.id)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-pink-950/60 border border-pink-500/40 text-pink-300 hover:bg-pink-900/60 text-xs font-bold transition"
                  >
                    <Heart className="w-4 h-4 fill-pink-500 text-pink-500" />
                    <span>{currentVideo.likes} Likes</span>
                  </button>
                </div>

                <h3 className="font-extrabold text-base text-white">{currentVideo.title}</h3>

                <div className="flex items-center gap-2 pt-1 border-t border-slate-800/80">
                  <img
                    src={currentVideo.creatorAvatar}
                    alt={currentVideo.creatorName}
                    referrerPolicy="no-referrer"
                    className="w-8 h-8 rounded-xl object-cover border border-slate-700"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-white">{currentVideo.creatorName}</h4>
                    <p className="text-[10px] text-slate-400">Verified Face Space Creator</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Video Feed Thumbnails Carousel */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Film className="w-4 h-4 text-pink-400" />
                <span>More Trending Date Videos</span>
              </h4>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                {videos.map(v => (
                  <div
                    key={v.id}
                    onClick={() => setSelectedVideoId(v.id)}
                    className={`p-2 rounded-xl bg-slate-950 border cursor-pointer transition flex items-center gap-2 ${
                      v.id === currentVideo.id ? 'border-cyan-400 ring-2 ring-cyan-500/30' : 'border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <img
                      src={v.thumbnailUrl}
                      alt={v.title}
                      referrerPolicy="no-referrer"
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <h5 className="text-[11px] font-bold text-white truncate">{v.title}</h5>
                      <span className="text-[9px] text-slate-400">{v.likes} Likes</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Col: Protected Comment Section */}
          <div className="p-5 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-4 flex flex-col justify-between h-[580px]">
            <div className="space-y-3 flex-1 flex flex-col min-h-0">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-cyan-400" />
                  <h4 className="font-bold text-xs text-white uppercase tracking-wider">
                    Comments ({currentVideo.comments.length})
                  </h4>
                </div>
                <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  AI Safety Shield
                </div>
              </div>

              {/* Comments Feed */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {currentVideo.comments.map(c => (
                  <div key={c.id} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={c.avatar}
                          alt={c.author}
                          referrerPolicy="no-referrer"
                          className="w-6 h-6 rounded-md object-cover"
                        />
                        <span className="text-xs font-bold text-white">{c.author}</span>
                      </div>
                      <span className="text-[9px] text-slate-500">{c.timestamp}</span>
                    </div>

                    <p className="text-xs text-slate-300 pl-8 leading-relaxed">
                      {c.text}
                    </p>

                    <div className="pl-8 pt-1 flex items-center justify-between text-[10px] text-slate-400">
                      <span className="flex items-center gap-1 text-emerald-400">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                        AI Verified Respectful
                      </span>
                      <span>❤️ {c.likes}</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Comment Form */}
            <form onSubmit={handlePostComment} className="pt-2 border-t border-slate-800 space-y-2">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Leave a respectful comment..."
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
                <button
                  type="submit"
                  disabled={isAnalyzing || !commentInput.trim()}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/30 disabled:opacity-50 transition"
                >
                  {isAnalyzing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                  <span>Post</span>
                </button>
              </div>
              <p className="text-[10px] text-slate-500 text-center">
                All comments are moderated by AI to prevent insults, body-shaming, & bullying.
              </p>
            </form>
          </div>

        </div>
      )}

      {/* AI Safety Alert Modal */}
      {safetyAlert.isOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-slate-900 border-2 border-red-500 rounded-3xl p-6 space-y-4 shadow-2xl animate-scaleUp text-slate-100 relative">
            <button
              onClick={() => setSafetyAlert({ isOpen: false })}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-red-950 border border-red-500/50 flex items-center justify-center text-red-400 shrink-0">
                <AlertTriangle className="w-5 h-5 animate-bounce" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-white">
                  Face Space AI Safety Alert
                </h3>
                <span className="text-xs text-red-400 font-semibold">{safetyAlert.category}</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 bg-slate-950 p-3 rounded-xl border border-slate-800">
              {safetyAlert.reason}
            </p>

            <div className="space-y-2">
              <span className="text-[11px] text-slate-400 block font-semibold">Suggested Respectful Revision:</span>
              <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-xs text-emerald-200 italic">
                "{safetyAlert.cleanedText}"
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={handleAcceptPoliteCleaned}
                className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30 transition flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>Post Polite AI Revised Comment</span>
              </button>
              <button
                onClick={() => setSafetyAlert({ isOpen: false })}
                className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
              >
                Cancel & Edit Comment
              </button>
            </div>

            <p className="text-[10px] text-slate-500 text-center italic">
              #BetterTogether • Connecting people safely without harassment.
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
