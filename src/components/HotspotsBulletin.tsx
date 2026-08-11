import React, { useState } from 'react';
import { 
  Flame, 
  MapPin, 
  Sparkles, 
  ThumbsUp, 
  PlusCircle, 
  CheckCircle2, 
  Music, 
  Search, 
  Compass, 
  Loader2, 
  Radio, 
  Clock,
  Share2
} from 'lucide-react';
import { HotspotPost } from '../types';

interface HotspotsBulletinProps {
  hotspots: HotspotPost[];
  setHotspots: React.Dispatch<React.SetStateAction<HotspotPost[]>>;
}

export const HotspotsBulletin: React.FC<HotspotsBulletinProps> = ({
  hotspots,
  setHotspots,
}) => {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [selectedCity, setSelectedCity] = useState<string>('Austin, TX');
  const [isPosting, setIsPosting] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<any[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // New check-in state
  const [newVenue, setNewVenue] = useState('');
  const [newCity, setNewCity] = useState('Austin, TX');
  const [newAddress, setNewAddress] = useState('');
  const [newVibe, setNewVibe] = useState<HotspotPost['vibe']>('🔥 On Fire');
  const [newCrowdLevel, setNewCrowdLevel] = useState(75);
  const [newMusic, setNewMusic] = useState('House & Synthwave');
  const [newComment, setNewComment] = useState('');

  const handleUpvote = (id: string) => {
    setHotspots(prev => prev.map(h => h.id === id ? { ...h, upvotes: h.upvotes + 1 } : h));
  };

  const handleCreateCheckin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVenue.trim() || !newComment.trim()) return;

    const post: HotspotPost = {
      id: 'hs_' + Date.now(),
      userName: 'Alex Mercer',
      userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      venueName: newVenue,
      city: newCity,
      address: newAddress || 'Downtown Entertainment District',
      vibe: newVibe,
      crowdLevel: newCrowdLevel,
      musicGenre: newMusic,
      comment: newComment,
      timestamp: 'Just now',
      upvotes: 1,
      verifiedCheckin: true,
      imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80',
    };

    setHotspots([post, ...hotspots]);
    setNewVenue('');
    setNewComment('');
    setIsPosting(false);
  };

  const fetchAiHotspots = async () => {
    setIsAiLoading(true);
    try {
      const res = await fetch('/api/hotspots/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city: selectedCity, vibePreference: activeFilter }),
      });
      const data = await res.json();
      setAiSuggestions(data.recommendations || []);
    } catch {
      setAiSuggestions([]);
    } finally {
      setIsAiLoading(false);
    }
  };

  const filteredHotspots = hotspots.filter(h => {
    if (activeFilter !== 'ALL' && !h.vibe.includes(activeFilter)) return false;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6">

      {/* Header & City Selector */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-orange-950 via-purple-950 to-slate-950 border-2 border-orange-500/40 shadow-2xl space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-500 to-pink-500 p-0.5 shadow-lg shadow-orange-500/30 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-orange-400">
                <Flame className="w-6 h-6 animate-pulse" />
              </div>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                Live Hotspots Bulletin
                <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 bg-red-500/20 border border-red-500/50 text-red-300 rounded-full font-bold">
                  <Radio className="w-3 h-3 text-red-400 animate-ping" />
                  LIVE NOW
                </span>
              </h2>
              <p className="text-xs text-orange-200/80">
                Real-time active club, bar, and lounge check-ins posted by the Face Space community.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPosting(!isPosting)}
              className="px-4 py-2 bg-gradient-to-r from-orange-500 to-pink-600 hover:from-orange-600 hover:to-pink-700 text-white rounded-2xl font-bold text-xs flex items-center gap-1.5 shadow-lg shadow-orange-500/30 transition"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post Live Check-In</span>
            </button>

            <button
              onClick={fetchAiHotspots}
              className="px-3.5 py-2 bg-slate-900 border border-purple-500/50 hover:bg-slate-800 text-purple-300 rounded-2xl font-semibold text-xs flex items-center gap-1.5 transition"
            >
              <Sparkles className="w-4 h-4 text-yellow-400" />
              <span>AI Spotter</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {['ALL', 'On Fire', 'Chill Vibe', 'Packed Floor', 'Live DJ', 'Romantic'].map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                activeFilter === f
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                  : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {f === 'ALL' ? '🌟 All Vibe Check-Ins' : f}
            </button>
          ))}
        </div>
      </div>

      {/* Post Live Check-In Form Drawer */}
      {isPosting && (
        <form onSubmit={handleCreateCheckin} className="p-6 rounded-3xl bg-slate-900/95 border-2 border-orange-500/60 shadow-2xl space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Flame className="w-4 h-4 text-orange-400" />
              <span>Post Live Nightlife Check-In</span>
            </h3>
            <button type="button" onClick={() => setIsPosting(false)} className="text-xs text-slate-400 hover:text-white">
              Cancel
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-400 block mb-1">Venue Name *</label>
              <input
                type="text"
                placeholder="e.g. Velvet Lounge, Rainey Speakeasy"
                value={newVenue}
                onChange={e => setNewVenue(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Address / Landmark</label>
              <input
                type="text"
                placeholder="e.g. 6th Street Downtown"
                value={newAddress}
                onChange={e => setNewAddress(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Vibe Category</label>
              <select
                value={newVibe}
                onChange={e => setNewVibe(e.target.value as HotspotPost['vibe'])}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-orange-500"
              >
                <option value="🔥 On Fire">🔥 On Fire</option>
                <option value="🍸 Chill Vibe">🍸 Chill Vibe</option>
                <option value="💃 Packed Floor">💃 Packed Floor</option>
                <option value="🎵 Live DJ">🎵 Live DJ</option>
                <option value="🕯️ Romantic">🕯️ Romantic</option>
              </select>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Crowd Capacity: {newCrowdLevel}%</label>
              <input
                type="range"
                min="10"
                max="100"
                value={newCrowdLevel}
                onChange={e => setNewCrowdLevel(Number(e.target.value))}
                className="w-full accent-orange-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs text-slate-400 block mb-1">Live Report Comment *</label>
            <textarea
              placeholder="How is the line, music, crowd energy, and date vibe right now?"
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              required
              rows={3}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-orange-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-orange-600/30 transition"
          >
            Publish Live Hotspot Report
          </button>
        </form>
      )}

      {/* AI Spotter Recommendation Results */}
      {isAiLoading && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-purple-500/30 text-center space-y-2">
          <Loader2 className="w-6 h-6 text-purple-400 animate-spin mx-auto" />
          <p className="text-xs text-purple-300">Scanning AI nightlife intelligence for {selectedCity}...</p>
        </div>
      )}

      {aiSuggestions.length > 0 && (
        <div className="p-5 rounded-2xl bg-purple-950/60 border border-purple-500/50 space-y-3">
          <h3 className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span>AI Spotter Recommended Date Venues</span>
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {aiSuggestions.map((rec, i) => (
              <div key={i} className="p-3 bg-slate-950 rounded-xl border border-purple-800/40 text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-white">
                  <span>{rec.name}</span>
                  <span className="text-pink-400">{rec.status}</span>
                </div>
                <p className="text-slate-400 text-[11px]">{rec.description || 'Great atmosphere for dates.'}</p>
                <div className="text-[10px] text-amber-300 font-semibold italic">💡 Date Tip: {rec.dateTip || 'Arrive around 9 PM.'}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hotspots Feed Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredHotspots.map(post => (
          <div
            key={post.id}
            className="rounded-3xl bg-slate-900/90 border border-slate-800 overflow-hidden hover:border-orange-500/40 transition shadow-xl flex flex-col justify-between"
          >
            {/* Image & Overlay */}
            {post.imageUrl && (
              <div className="h-44 w-full relative overflow-hidden bg-slate-950">
                <img
                  src={post.imageUrl}
                  alt={post.venueName}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

                {/* Vibe Tag Badge */}
                <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-slate-950/80 border border-orange-500/60 text-orange-300 backdrop-blur-md">
                  {post.vibe}
                </div>

                {/* Crowd meter */}
                <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg text-[11px] font-bold bg-slate-950/90 text-emerald-400 border border-emerald-500/40 backdrop-blur-md">
                  Crowd Level: {post.crowdLevel}%
                </div>
              </div>
            )}

            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-extrabold text-base text-white">{post.venueName}</h3>
                    <p className="text-xs text-slate-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-pink-400" />
                      {post.address}, {post.city}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block">{post.timestamp}</span>
                    {post.verifiedCheckin && (
                      <span className="inline-flex items-center gap-0.5 text-[10px] text-emerald-400 font-medium">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-200 leading-relaxed bg-slate-950/60 p-3 rounded-xl border border-slate-800">
                  "{post.comment}"
                </p>

                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <Music className="w-3.5 h-3.5 text-purple-400" />
                  <span>Music Vibe: <strong className="text-purple-300">{post.musicGenre}</strong></span>
                </div>
              </div>

              {/* User Author & Upvote */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={post.userAvatar}
                    alt={post.userName}
                    referrerPolicy="no-referrer"
                    className="w-7 h-7 rounded-lg object-cover"
                  />
                  <span className="text-xs font-semibold text-slate-300">{post.userName}</span>
                </div>

                <button
                  onClick={() => handleUpvote(post.id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-orange-400 text-xs font-bold transition"
                >
                  <ThumbsUp className="w-3.5 h-3.5 text-orange-400" />
                  <span>{post.upvotes}</span>
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
