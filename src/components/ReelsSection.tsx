import React, { useState } from 'react';
import { 
  Heart, 
  MessageCircle, 
  Share2, 
  Volume2, 
  VolumeX, 
  ChevronUp, 
  ChevronDown, 
  Disc3, 
  Plus, 
  Send, 
  X, 
  Sparkles,
  MapPin,
  Check
} from 'lucide-react';
import { ReelItem, CommentItem, UserProfile } from '../types';

interface ReelsSectionProps {
  reels: ReelItem[];
  setReels: React.Dispatch<React.SetStateAction<ReelItem[]>>;
  profile: UserProfile;
}

export const ReelsSection: React.FC<ReelsSectionProps> = ({
  reels,
  setReels,
  profile,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [newCommentText, setNewCommentText] = useState('');
  const [showShareToast, setShowShareToast] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // New reel creation state
  const [newReelTitle, setNewReelTitle] = useState('');
  const [newReelCaption, setNewReelCaption] = useState('');
  const [newReelTag, setNewReelTag] = useState('#DateNight');
  const [newReelSong, setNewReelSong] = useState('Midnight City (Remix)');

  const currentReel = reels[currentIndex] || reels[0];

  const handleNext = () => {
    if (currentIndex < reels.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0); // loop back
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    } else {
      setCurrentIndex(reels.length - 1);
    }
  };

  const handleToggleLike = (reelId: string) => {
    setReels(prev => prev.map(r => {
      if (r.id === reelId) {
        const nextLiked = !r.isLiked;
        return {
          ...r,
          isLiked: nextLiked,
          likes: nextLiked ? r.likes + 1 : r.likes - 1,
        };
      }
      return r;
    }));
  };

  const handleToggleFollow = (reelId: string) => {
    setReels(prev => prev.map(r => {
      if (r.id === reelId) {
        return {
          ...r,
          isFollowing: !r.isFollowing,
        };
      }
      return r;
    }));
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim() || !currentReel) return;

    const newComment: CommentItem = {
      id: 'rc_' + Date.now(),
      author: profile.name,
      avatar: profile.avatar,
      text: newCommentText.trim(),
      timestamp: 'Just now',
      likes: 0,
      aiSafetyStatus: { safe: true },
    };

    setReels(prev => prev.map(r => {
      if (r.id === currentReel.id) {
        return {
          ...r,
          comments: [newComment, ...r.comments],
        };
      }
      return r;
    }));

    setNewCommentText('');
  };

  const handleShare = () => {
    setShowShareToast(true);
    navigator.clipboard?.writeText?.(window.location.href);
    setTimeout(() => setShowShareToast(false), 2400);
  };

  const handleCreateReel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReelTitle.trim()) return;

    const created: ReelItem = {
      id: 'reel_' + Date.now(),
      creatorName: profile.name,
      creatorUsername: profile.username,
      creatorAvatar: profile.avatar,
      isFollowing: true,
      title: newReelTitle,
      caption: newReelCaption,
      tags: [newReelTag.replace('#', ''), 'FaceSpace'],
      songTitle: newReelSong,
      songArtist: profile.name,
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      thumbnailUrl: profile.bannerUrl,
      likes: 1,
      isLiked: true,
      shares: 0,
      views: 1,
      location: profile.location,
      comments: [],
    };

    setReels([created, ...reels]);
    setCurrentIndex(0);
    setIsCreateModalOpen(false);
    setNewReelTitle('');
    setNewReelCaption('');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 sm:py-6 flex flex-col items-center">
      {/* Top Controls Bar */}
      <div className="w-full max-w-md flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <span>Face Space Reels</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/40">
              Shorts & Vibe Clips
            </span>
          </h2>
          <p className="text-xs text-slate-400">Date fits, speakeasy tours & authentic moments</p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white rounded-xl text-xs font-bold shadow-md shadow-pink-500/25 transition active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Post Reel</span>
        </button>
      </div>

      {/* Main Vertical Reel Player Container */}
      <div className="relative w-full max-w-sm sm:max-w-md h-[650px] bg-black rounded-3xl overflow-hidden border-2 border-slate-800 shadow-2xl flex items-center justify-center">
        {/* Video Player */}
        <video
          key={currentReel.id}
          src={currentReel.videoUrl}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover"
        />

        {/* Top Overlay: Mute toggle & index pill */}
        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-auto">
          <div className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/10">
            {currentIndex + 1} / {reels.length}
          </div>
          <button
            onClick={() => setIsMuted(!isMuted)}
            className="p-2 rounded-full bg-black/60 backdrop-blur-md text-white border border-white/10 hover:bg-black/80 transition"
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-4 h-4 text-pink-400" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>
        </div>

        {/* Right Action Icons Stack */}
        <div className="absolute right-3 bottom-20 flex flex-col items-center gap-4 z-20 pointer-events-auto">
          {/* Creator Avatar & Follow Button */}
          <div className="relative mb-2">
            <img
              src={currentReel.creatorAvatar}
              alt={currentReel.creatorName}
              referrerPolicy="no-referrer"
              className="w-11 h-11 rounded-full object-cover border-2 border-pink-500 shadow-lg"
            />
            {!currentReel.isFollowing && (
              <button
                onClick={() => handleToggleFollow(currentReel.id)}
                className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-pink-500 text-white flex items-center justify-center hover:scale-110 transition shadow-md"
                title="Follow Creator"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Like Button */}
          <button
            onClick={() => handleToggleLike(currentReel.id)}
            className="flex flex-col items-center group transition"
          >
            <div className={`p-3 rounded-full backdrop-blur-md transition ${
              currentReel.isLiked ? 'bg-pink-600/80 text-white' : 'bg-black/50 text-white hover:bg-black/70'
            }`}>
              <Heart className={`w-6 h-6 transition-transform ${currentReel.isLiked ? 'fill-white scale-110' : 'group-hover:scale-110'}`} />
            </div>
            <span className="text-[11px] font-bold text-white drop-shadow mt-1">
              {currentReel.likes}
            </span>
          </button>

          {/* Comments Button */}
          <button
            onClick={() => setIsCommentsOpen(true)}
            className="flex flex-col items-center group transition"
          >
            <div className="p-3 rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur-md">
              <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-[11px] font-bold text-white drop-shadow mt-1">
              {currentReel.comments.length}
            </span>
          </button>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="flex flex-col items-center group transition"
          >
            <div className="p-3 rounded-full bg-black/50 text-white hover:bg-black/70 backdrop-blur-md">
              <Share2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </div>
            <span className="text-[11px] font-bold text-white drop-shadow mt-1">
              {currentReel.shares}
            </span>
          </button>

          {/* Spinning Audio Disc */}
          <div className="p-1 rounded-full bg-black/60 border border-slate-700 animate-spin" style={{ animationDuration: '4s' }}>
            <Disc3 className="w-6 h-6 text-pink-400" />
          </div>
        </div>

        {/* Bottom Information Overlay */}
        <div className="absolute left-0 right-16 bottom-0 p-4 bg-gradient-to-t from-black via-black/70 to-transparent z-10 pointer-events-auto">
          {/* Creator & Location */}
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-bold text-sm text-white drop-shadow">
              @{currentReel.creatorUsername}
            </span>
            {currentReel.isFollowing && (
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800/80 text-cyan-300 font-medium">
                Following
              </span>
            )}
            {currentReel.location && (
              <div className="flex items-center gap-1 text-[11px] text-slate-300">
                <MapPin className="w-3 h-3 text-pink-400" />
                <span className="truncate">{currentReel.location}</span>
              </div>
            )}
          </div>

          {/* Reel Caption */}
          <p className="text-xs text-white/95 leading-relaxed line-clamp-2 drop-shadow mb-2">
            {currentReel.caption}
          </p>

          {/* Hashtags */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {currentReel.tags.map((tag, i) => (
              <span key={i} className="text-[11px] font-medium text-cyan-300 hover:underline cursor-pointer">
                #{tag}
              </span>
            ))}
          </div>

          {/* Audio Track Ticker */}
          <div className="flex items-center gap-2 text-[11px] text-slate-300 overflow-hidden">
            <Disc3 className="w-3.5 h-3.5 text-pink-400 shrink-0" />
            <span className="truncate font-mono">
              {currentReel.songTitle} · {currentReel.songArtist}
            </span>
          </div>
        </div>

        {/* Up / Down Navigation Controls */}
        <div className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
          <button
            onClick={handlePrev}
            className="p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md border border-white/10 transition"
            title="Previous Reel"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="p-2 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md border border-white/10 transition"
            title="Next Reel"
          >
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Share Toast */}
      {showShareToast && (
        <div className="fixed bottom-10 z-50 bg-slate-900 border border-emerald-500 text-emerald-300 px-4 py-2 rounded-xl text-xs font-semibold shadow-2xl flex items-center gap-2">
          <Check className="w-4 h-4" />
          <span>Reel link copied to clipboard! Share anywhere.</span>
        </div>
      )}

      {/* Comments Drawer / Modal */}
      {isCommentsOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-t-3xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-pink-400" />
                <h3 className="font-bold text-white text-base">
                  Comments ({currentReel.comments.length})
                </h3>
              </div>
              <button
                onClick={() => setIsCommentsOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Comments List */}
            <div className="flex-1 overflow-y-auto py-4 space-y-3">
              {currentReel.comments.length === 0 ? (
                <p className="text-center text-slate-500 text-xs py-8">
                  No comments yet. Be the first to spark the conversation!
                </p>
              ) : (
                currentReel.comments.map((comment) => (
                  <div key={comment.id} className="flex items-start gap-3 p-2 rounded-xl bg-slate-950/40 border border-slate-800/60">
                    <img
                      src={comment.avatar}
                      alt={comment.author}
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 rounded-full object-cover border border-slate-700 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-slate-200">
                          {comment.author}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {comment.timestamp}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {comment.text}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Add Comment Input */}
            <form onSubmit={handleAddComment} className="pt-3 border-t border-slate-800 flex items-center gap-2">
              <input
                type="text"
                placeholder="Add a verified comment..."
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
              />
              <button
                type="submit"
                disabled={!newCommentText.trim()}
                className="px-3.5 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 disabled:bg-slate-800 text-white text-xs font-semibold transition"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Create New Reel Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-slate-900 border border-pink-500/30 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-pink-400" />
                <span>Create New Reel</span>
              </h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateReel} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Reel Title</label>
                <input
                  type="text"
                  placeholder="e.g. Secret Rooftop Cocktail Tour"
                  value={newReelTitle}
                  onChange={(e) => setNewReelTitle(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Caption</label>
                <textarea
                  placeholder="Tell your viewers the story or tips..."
                  value={newReelCaption}
                  onChange={(e) => setNewReelCaption(e.target.value)}
                  rows={3}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Hashtag</label>
                  <select
                    value={newReelTag}
                    onChange={(e) => setNewReelTag(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-pink-500"
                  >
                    <option value="#DateNight">#DateNight</option>
                    <option value="#OutfitCheck">#OutfitCheck</option>
                    <option value="#Speakeasy">#Speakeasy</option>
                    <option value="#MusicVibes">#MusicVibes</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Sound Track</label>
                  <select
                    value={newReelSong}
                    onChange={(e) => setNewReelSong(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-pink-500"
                  >
                    <option value="Midnight City (Remix)">Midnight City</option>
                    <option value="Speakeasy Autumn Jazz">Speakeasy Jazz</option>
                    <option value="Golden Hour Reflections">Sunset House</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold transition shadow-md shadow-pink-500/25"
                >
                  Publish to Reels
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
