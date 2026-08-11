import React, { useState } from 'react';
import { 
  Music, 
  Palette, 
  Users, 
  Sparkles, 
  MessageSquare, 
  Heart, 
  MapPin, 
  Edit3, 
  Play, 
  Pause, 
  Volume2, 
  ShieldCheck, 
  CheckCircle2, 
  Send, 
  Zap, 
  Star,
  ExternalLink
} from 'lucide-react';
import { UserProfile, ThemePreset, Friend, UserSubscription } from '../types';

interface MySpaceProfileProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  openWingmanWithPrompt: (prompt: string) => void;
  toggleMiniWindow: (appId: string) => void;
  subscription: UserSubscription;
  openAuthModal: () => void;
}

export const MySpaceProfile: React.FC<MySpaceProfileProps> = ({
  profile,
  setProfile,
  openWingmanWithPrompt,
  toggleMiniWindow,
  subscription,
  openAuthModal,
}) => {
  const [isPlayingSong, setIsPlayingSong] = useState(true);
  const [isEditingTheme, setIsEditingTheme] = useState(false);
  const [newWallPost, setNewWallPost] = useState('');
  const [wallPosts, setWallPosts] = useState([
    {
      id: 'w1',
      author: 'Maya Lin',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
      text: 'Thanks for recommending Speakeasy 1928 for my date! The atmosphere was 10/10.',
      time: 'Yesterday at 9:42 PM',
      likes: 5,
    },
    {
      id: 'w2',
      author: 'AI Wingman Bot',
      avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80',
      text: 'Confidence streak active! 3 successful date check-ins this month! Keep shining Alex! 🌟',
      time: '2 days ago',
      likes: 12,
    },
  ]);

  // Theme background styles
  const getThemeBackground = () => {
    switch (profile.theme) {
      case 'y2k_glitter':
        return 'bg-gradient-to-br from-slate-950 via-purple-950 to-pink-950 text-pink-100';
      case 'neon_cyber':
        return 'bg-gradient-to-br from-slate-950 via-cyan-950 to-blue-950 text-cyan-100';
      case 'retro_pastel':
        return 'bg-gradient-to-br from-slate-900 via-indigo-950 to-rose-950 text-rose-100';
      case 'midnight_purple':
        return 'bg-gradient-to-br from-slate-950 via-purple-900 to-slate-900 text-purple-100';
      case 'warm_gold':
        return 'bg-gradient-to-br from-slate-950 via-amber-950 to-stone-900 text-amber-100';
      default:
        return 'bg-slate-950 text-slate-100';
    }
  };

  const handleAddWallPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWallPost.trim()) return;
    setWallPosts([
      {
        id: Date.now().toString(),
        author: profile.name,
        avatar: profile.avatar,
        text: newWallPost,
        time: 'Just now',
        likes: 0,
      },
      ...wallPosts,
    ]);
    setNewWallPost('');
  };

  return (
    <div className={`min-h-screen p-4 sm:p-6 transition-all duration-500 ${getThemeBackground()}`}>
      <div className="max-w-6xl mx-auto space-y-6">

        {/* Theme & Profile Banner */}
        <div className="relative rounded-2xl overflow-hidden border-2 border-pink-500/40 shadow-2xl shadow-purple-950/50">
          {/* Banner Image */}
          <div className="h-48 sm:h-64 w-full relative overflow-hidden bg-slate-900">
            <img
              src={profile.bannerUrl}
              alt="Profile Banner"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

            {/* Quick Theme Customizer Button */}
            <button
              onClick={() => setIsEditingTheme(!isEditingTheme)}
              className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-pink-500/50 text-pink-300 text-xs font-semibold backdrop-blur-md transition shadow-lg"
            >
              <Palette className="w-4 h-4 text-pink-400 animate-spin" style={{ animationDuration: '8s' }} />
              <span>Custom Skin & Colors</span>
            </button>
          </div>

          {/* Profile Header Bar */}
          <div className="relative px-6 pb-6 pt-0 bg-slate-950/90 backdrop-blur-md">
            <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between -mt-16 sm:-mt-20 gap-4">
              {/* Avatar + Main Info */}
              <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 text-center sm:text-left">
                <div className="relative group">
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    referrerPolicy="no-referrer"
                    className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-4 border-pink-500 shadow-xl shadow-pink-500/20"
                  />
                  <div className="absolute bottom-1 right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-slate-950" title="Online on Face Space"></div>
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-1.5">
                      <span>{profile.name}</span>
                      <ShieldCheck className="w-5 h-5 text-emerald-400" title="Verified Age 18+ & Identity" />
                    </h1>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-pink-500/20 border border-pink-500/50 text-pink-300">
                      @{profile.username}
                    </span>
                    <button
                      onClick={openAuthModal}
                      className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-950 border border-emerald-500/60 text-emerald-300 hover:bg-emerald-900 transition flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>18+ Verified ({subscription.verifiedMethod || 'Google/FB/ID'})</span>
                    </button>
                    <button
                      onClick={openAuthModal}
                      className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-yellow-950 border border-yellow-500/60 text-yellow-300 hover:bg-yellow-900 transition"
                    >
                      {subscription.plan === 'vip' ? 'VIP Pass ($14.99/mo)' : 'Basic Pass ($7.99/mo)'}
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-pink-200/80 max-w-xl italic">
                    "{profile.headline}"
                  </p>

                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-300 pt-1">
                    <span className="flex items-center gap-1 text-slate-400">
                      <MapPin className="w-3.5 h-3.5 text-pink-400" />
                      {profile.location}
                    </span>
                    <span className="flex items-center gap-1 text-pink-300 font-medium bg-pink-950/50 px-2 py-0.5 rounded-md border border-pink-800/40">
                      <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
                      {profile.relationshipStatus}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Mood Pill */}
              <div className="flex flex-col items-center sm:items-end gap-2 w-full sm:w-auto">
                <div className="px-3.5 py-1.5 rounded-xl bg-slate-900 border border-purple-500/40 text-purple-200 text-xs font-semibold flex items-center gap-2 shadow-inner">
                  <Zap className="w-4 h-4 text-yellow-400 animate-bounce" />
                  <span>{profile.statusMood}</span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => openWingmanWithPrompt("Give me a fast confidence boost for my upcoming date!")}
                    className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-md shadow-pink-500/30 transition"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Wingman Boost</span>
                  </button>
                  <button
                    onClick={() => toggleMiniWindow('app_spotify')}
                    className="px-3 py-1.5 rounded-xl bg-emerald-950 border border-emerald-500/50 text-emerald-300 text-xs font-semibold flex items-center gap-1.5 hover:bg-emerald-900/60 transition"
                  >
                    <Music className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Open Music Hub</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Theme Customizer Drawer (If Toggled) */}
        {isEditingTheme && (
          <div className="p-5 rounded-2xl bg-slate-900/95 border-2 border-pink-500/60 shadow-2xl space-y-4 animate-fadeIn text-slate-200">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Palette className="w-5 h-5 text-pink-400" />
                <h3 className="font-bold text-sm text-white">Customize MySpace Theme & Background Skin</h3>
              </div>
              <button
                onClick={() => setIsEditingTheme(false)}
                className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800"
              >
                Done
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
              {[
                { id: 'y2k_glitter', label: '✨ Y2K Glitter', bg: 'bg-gradient-to-br from-purple-900 to-pink-900' },
                { id: 'neon_cyber', label: '⚡ Cyber Neon', bg: 'bg-gradient-to-br from-cyan-950 to-blue-900' },
                { id: 'retro_pastel', label: '🌸 Retro Pastel', bg: 'bg-gradient-to-br from-indigo-950 to-rose-900' },
                { id: 'midnight_purple', label: '🌌 Midnight Purple', bg: 'bg-gradient-to-br from-purple-950 to-slate-900' },
                { id: 'warm_gold', label: '👑 Warm Gold', bg: 'bg-gradient-to-br from-amber-950 to-stone-900' },
                { id: 'minimal_slate', label: '🖤 Minimal Slate', bg: 'bg-slate-900' },
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setProfile({ ...profile, theme: t.id as ThemePreset })}
                  className={`p-3 rounded-xl border text-left text-xs font-semibold transition ${t.bg} ${
                    profile.theme === t.id ? 'border-pink-400 ring-2 ring-pink-500/50' : 'border-slate-800 opacity-80 hover:opacity-100'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Status Mood Message</label>
                <input
                  type="text"
                  value={profile.statusMood}
                  onChange={e => setProfile({ ...profile, statusMood: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-pink-500"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">Profile Headline</label>
                <input
                  type="text"
                  value={profile.headline}
                  onChange={e => setProfile({ ...profile, headline: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-pink-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* Main 2-Column MySpace Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* Left Column: Music Player Box, Bio, Wingman Badges */}
          <div className="space-y-6">

            {/* MySpace Music Box */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-purple-500/40 shadow-xl space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-pink-500/10 rounded-full blur-2xl pointer-events-none"></div>

              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <div className="flex items-center gap-2 text-pink-400 font-bold text-xs uppercase tracking-wider">
                  <Music className="w-4 h-4 animate-bounce" />
                  <span>Face Space Music Box</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                  AUTOPLAY ON
                </span>
              </div>

              <div className="flex items-center gap-3 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                <img
                  src={profile.currentSong.albumArt}
                  alt={profile.currentSong.title}
                  referrerPolicy="no-referrer"
                  className="w-14 h-14 rounded-lg object-cover border border-purple-500/40 shadow"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-white truncate">{profile.currentSong.title}</h4>
                  <p className="text-[11px] text-slate-400 truncate">{profile.currentSong.artist}</p>
                  <div className="flex items-center gap-1 mt-1 text-[10px] text-pink-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-ping"></span>
                    <span>Playing on Profile</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsPlayingSong(!isPlayingSong)}
                  className="w-9 h-9 rounded-full bg-pink-600 hover:bg-pink-500 text-white flex items-center justify-center shadow-lg shadow-pink-500/30 transition"
                >
                  {isPlayingSong ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
                </button>
              </div>

              {/* Embedded Spotify / Music Iframe Widget Preview */}
              <div className="rounded-xl overflow-hidden border border-slate-800 bg-black/60">
                <iframe
                  src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M?utm_source=generator&theme=0"
                  width="100%"
                  height="152"
                  frameBorder="0"
                  allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                  loading="lazy"
                  title="Spotify Player"
                  className="w-full rounded-xl"
                ></iframe>
              </div>
            </div>

            {/* About Me & Bio Box */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-3">
              <h3 className="font-bold text-sm text-white flex items-center gap-2 border-b border-slate-800 pb-2">
                <Edit3 className="w-4 h-4 text-pink-400" />
                <span>About Me & Date Vibes</span>
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {profile.bio}
              </p>
            </div>

            {/* Wingman Stats & Achievements */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-purple-500/30 shadow-xl space-y-3">
              <h3 className="font-bold text-sm text-white flex items-center gap-2 border-b border-slate-800 pb-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>Wingman Ratings & Badges</span>
              </h3>

              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-lg font-black text-pink-400">{profile.stats.profileViews}</div>
                  <div className="text-[10px] text-slate-400">Views</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-lg font-black text-purple-400">{profile.stats.wingsEarned}</div>
                  <div className="text-[10px] text-slate-400">Wings</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="text-lg font-black text-emerald-400">{profile.stats.datesSuccess}</div>
                  <div className="text-[10px] text-slate-400">Great Dates</div>
                </div>
              </div>

              <div className="space-y-2 pt-1 text-xs">
                <div className="flex items-center gap-2 text-emerald-300 bg-emerald-950/40 p-2 rounded-lg border border-emerald-500/30">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Verified Respectful Communicator</span>
                </div>
                <div className="flex items-center gap-2 text-yellow-300 bg-amber-950/40 p-2 rounded-lg border border-amber-500/30">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <span>Icebreaker Specialist Level 4</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Top 8 Friends, Wall Posts */}
          <div className="lg:col-span-2 space-y-6">

            {/* MySpace Top 8 Friends Grid */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-pink-400" />
                  <h3 className="font-bold text-sm text-white">Alex's Top 8 Friends</h3>
                </div>
                <span className="text-xs text-pink-400 font-semibold cursor-pointer hover:underline">
                  View All Friends (142)
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {profile.topEight.map((friend, idx) => (
                  <div
                    key={friend.id}
                    className="p-2.5 rounded-xl bg-slate-950 border border-slate-800/80 hover:border-pink-500/50 transition group flex flex-col items-center text-center space-y-1.5 relative"
                  >
                    {/* Top 8 Badge */}
                    <span className="absolute top-1 left-1 px-1.5 py-0.2 text-[9px] font-bold bg-pink-600 text-white rounded">
                      #{idx + 1}
                    </span>

                    <div className="relative mt-1">
                      <img
                        src={friend.avatar}
                        alt={friend.name}
                        referrerPolicy="no-referrer"
                        className="w-16 h-16 rounded-xl object-cover border-2 border-slate-800 group-hover:border-pink-500 transition"
                      />
                      {friend.isOnline && (
                        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-slate-950"></div>
                      )}
                    </div>

                    <div className="w-full min-w-0">
                      <h4 className="text-xs font-bold text-white truncate group-hover:text-pink-300">
                        {friend.name}
                      </h4>
                      <p className="text-[10px] text-slate-400 truncate">{friend.headline}</p>
                    </div>

                    {friend.songName && (
                      <span className="text-[9px] text-pink-400 truncate max-w-full flex items-center gap-0.5">
                        <Music className="w-2.5 h-2.5 shrink-0" />
                        {friend.songName}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Profile Wall & Comments */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-purple-400" />
                  <h3 className="font-bold text-sm text-white">Profile Wall & Date Vibe Comments</h3>
                </div>
                <span className="text-xs text-slate-400">
                  Protected by AI Safety Shield
                </span>
              </div>

              {/* Add Wall Comment Box */}
              <form onSubmit={handleAddWallPost} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Leave a comment on Alex's wall..."
                  value={newWallPost}
                  onChange={(e) => setNewWallPost(e.target.value)}
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-pink-500 transition"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-md shadow-pink-600/30 transition"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Post</span>
                </button>
              </form>

              {/* Wall Posts Feed */}
              <div className="space-y-3">
                {wallPosts.map((post) => (
                  <div key={post.id} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={post.avatar}
                          alt={post.author}
                          referrerPolicy="no-referrer"
                          className="w-8 h-8 rounded-lg object-cover"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-white">{post.author}</h4>
                          <p className="text-[10px] text-slate-500">{post.time}</p>
                        </div>
                      </div>

                      <button className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-pink-400">
                        <Heart className="w-3.5 h-3.5" />
                        <span>{post.likes}</span>
                      </button>
                    </div>

                    <p className="text-xs text-slate-300 pl-10 leading-relaxed">
                      {post.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
