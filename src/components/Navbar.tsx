import React from 'react';
import { 
  Sparkles, 
  HeartHandshake, 
  Flame, 
  AppWindow, 
  Video, 
  Megaphone, 
  ShieldCheck, 
  User, 
  Music,
  Radio,
  PieChart,
  MessageSquare,
  BookOpen,
  Film,
  Sparkle,
  Compass,
  Briefcase
} from 'lucide-react';
import { UserProfile, UserSubscription } from '../types';
import { SpaceRobotLogo } from './SpaceRobotLogo';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  profile: UserProfile;
  toggleMiniWindow: (appId: string) => void;
  activeAppCount: number;
  openDisclaimers: () => void;
  subscription: UserSubscription;
  openAuthModal: () => void;
  unreadMessagesCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  profile,
  toggleMiniWindow,
  activeAppCount,
  openDisclaimers,
  subscription,
  openAuthModal,
  unreadMessagesCount = 3,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur-md border-b border-pink-500/30 text-slate-100 shadow-xl shadow-purple-950/20">
      {/* Top Banner Statement */}
      <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 px-4 py-1 text-xs text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 animate-pulse text-yellow-300 shrink-0" />
        <span className="truncate">
          Face Space • Not trying to be the best social media, connecting everyone in one hub in Unity.
        </span>
        <button 
          onClick={openDisclaimers}
          className="font-bold underline hover:text-yellow-200 shrink-0 cursor-pointer text-xs"
        >
          #BetterTogether & Safety Cautions
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* Logo: Space Robot Face floating in space */}
          <div 
            className="flex items-center gap-2.5 cursor-pointer shrink-0" 
            onClick={() => setActiveTab('feed')}
            title="Face Space Home Feed"
          >
            <SpaceRobotLogo size="md" />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-lg sm:text-xl tracking-tight bg-gradient-to-r from-cyan-400 via-pink-400 to-purple-400 bg-clip-text text-transparent drop-shadow-sm">
                  Face Space
                </span>
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-pink-500/20 border border-pink-500/40 text-pink-300 font-mono hidden sm:inline">
                  v3.0
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden md:block">
                Social Hub · Radio · AI Wingman
              </p>
            </div>
          </div>

          {/* Primary Navigation Tabs */}
          <nav className="hidden xl:flex items-center gap-0.5 bg-slate-900/90 p-1 rounded-full border border-slate-800 text-xs">
            <button
              onClick={() => setActiveTab('feed')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold transition ${
                activeTab === 'feed'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-pink-400" />
              <span>Feed</span>
            </button>

            <button
              onClick={() => setActiveTab('reels')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold transition ${
                activeTab === 'reels'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Film className="w-3.5 h-3.5 text-cyan-400" />
              <span>Reels</span>
            </button>

            <button
              onClick={() => setActiveTab('live')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold transition ${
                activeTab === 'live'
                  ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-md shadow-red-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>Live</span>
            </button>

            <button
              onClick={() => setActiveTab('messenger')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold transition relative ${
                activeTab === 'messenger'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 text-purple-400" />
              <span>Chat</span>
              {unreadMessagesCount > 0 && (
                <span className="px-1.5 py-0.2 text-[9px] bg-pink-500 text-white font-bold rounded-full">
                  {unreadMessagesCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('blog')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold transition ${
                activeTab === 'blog'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              <span>Blog</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold transition ${
                activeTab === 'profile'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>My Profile</span>
            </button>

            <button
              onClick={() => setActiveTab('wingman')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold transition ${
                activeTab === 'wingman'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <HeartHandshake className="w-3.5 h-3.5 text-pink-400" />
              <span>AI Wingman</span>
            </button>

            <button
              onClick={() => setActiveTab('hotspots')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold transition ${
                activeTab === 'hotspots'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span>Hotspots</span>
            </button>

            <button
              onClick={() => setActiveTab('creators')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold transition ${
                activeTab === 'creators'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5 text-yellow-400" />
              <span>Creator Studio</span>
            </button>

            <button
              onClick={() => setActiveTab('disbursements')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold transition ${
                activeTab === 'disbursements'
                  ? 'bg-gradient-to-r from-emerald-500 to-cyan-600 text-white shadow-md shadow-emerald-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <PieChart className="w-3.5 h-3.5 text-emerald-400" />
              <span>70/20/10 Ledger</span>
            </button>
          </nav>

          {/* Quick Actions & Mini Window Toggle */}
          <div className="flex items-center gap-2">
            {/* Membership & Verification Badge */}
            <button
              onClick={openAuthModal}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-cyan-500/50 hover:border-cyan-400 text-xs font-bold transition shadow-sm cursor-pointer"
              title="Identity Verification & Membership Plan"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <div className="text-left hidden md:block">
                <div className="text-[10px] text-emerald-300 font-bold flex items-center gap-1">
                  <span>18+ VERIFIED</span>
                </div>
                <div className="text-[9px] text-yellow-300 font-extrabold">
                  {subscription.plan === 'vip' ? 'VIP $14.99/mo' : 'Basic $7.99/mo'}
                </div>
              </div>
            </button>

            {/* Spotify / Social Floating Hub Toggle */}
            <button
              id="btn-toggle-spotify"
              onClick={() => toggleMiniWindow('app_spotify')}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60 text-xs font-medium transition cursor-pointer"
              title="Toggle Floating Music Window"
            >
              <Music className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
              <span className="hidden sm:inline">Mini Player</span>
              {activeAppCount > 0 && (
                <span className="px-1.5 py-0.2 text-[9px] bg-emerald-500 text-slate-950 font-bold rounded-full">
                  {activeAppCount}
                </span>
              )}
            </button>

            <button
              id="btn-safety-disclaimer"
              onClick={openDisclaimers}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition cursor-pointer"
              title="Dating Safety Cautions & Community Terms"
            >
              <ShieldCheck className="w-4 h-4 text-purple-400" />
            </button>
          </div>
        </div>

        {/* Mobile/Tablet Sub-Navigation Scroll Row */}
        <div className="xl:hidden flex items-center py-2 border-t border-slate-800/80 overflow-x-auto gap-1.5 text-xs no-scrollbar">
          {[
            { id: 'feed', label: 'Feed' },
            { id: 'reels', label: 'Reels' },
            { id: 'live', label: 'Live' },
            { id: 'messenger', label: `Chat (${unreadMessagesCount})` },
            { id: 'blog', label: 'Blog' },
            { id: 'profile', label: 'Profile' },
            { id: 'wingman', label: 'Wingman' },
            { id: 'hotspots', label: 'Hotspots' },
            { id: 'creators', label: 'Creator Studio' },
            { id: 'disbursements', label: '70/20/10 Funds' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1 rounded-full whitespace-nowrap text-xs font-semibold transition ${
                activeTab === tab.id 
                  ? 'bg-pink-600 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-white bg-slate-900/70'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};
