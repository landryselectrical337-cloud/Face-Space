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
  Bot
} from 'lucide-react';
import { UserProfile, UserSubscription } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  profile: UserProfile;
  toggleMiniWindow: (appId: string) => void;
  activeAppCount: number;
  openDisclaimers: () => void;
  subscription: UserSubscription;
  openAuthModal: () => void;
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
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-pink-500/30 text-slate-100 shadow-lg shadow-purple-950/20">
      {/* Top Banner Statement */}
      <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 px-4 py-1 text-xs text-center font-medium tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 animate-pulse text-yellow-300" />
        <span>
          Face Space • Not trying to be the best social media, connecting everyone in one hub in Unity.
        </span>
        <span className="font-bold underline cursor-pointer hover:text-yellow-200" onClick={openDisclaimers}>
          #BetterTogether
        </span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('profile')}>
            <div className="relative w-12 h-12 rounded-full bg-slate-950 border border-indigo-500/50 shadow-[0_0_15px_rgba(79,70,229,0.5)] flex items-center justify-center overflow-hidden animate-bounce">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 via-purple-900/40 to-black rounded-full animate-pulse"></div>
              <div className="absolute top-1 right-1 w-1 h-1 bg-white rounded-full opacity-70 shadow-[0_0_5px_white]"></div>
              <div className="absolute bottom-2 left-2 w-0.5 h-0.5 bg-cyan-300 rounded-full opacity-80 shadow-[0_0_4px_cyan]"></div>
              <Bot className="w-7 h-7 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] z-10" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-xl tracking-tight bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent drop-shadow-sm">
                  Face Space
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-pink-500/20 border border-pink-500/40 text-pink-300 font-mono">
                  v2.5 Y2K
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                Social Hub & AI Date Wingman
              </p>
            </div>
          </div>

          {/* Primary Navigation Tabs */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-900/80 p-1.5 rounded-full border border-slate-800">
            <button
              id="tab-profile"
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'profile'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <User className="w-4 h-4" />
              <span>My Profile</span>
            </button>

            <button
              id="tab-wingman"
              onClick={() => setActiveTab('wingman')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'wingman'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <HeartHandshake className="w-4 h-4 text-pink-400" />
              <span>AI Wingman</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            </button>

            <button
              id="tab-hotspots"
              onClick={() => setActiveTab('hotspots')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'hotspots'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Flame className="w-4 h-4 text-orange-400" />
              <span>Hotspots Bulletin</span>
            </button>

            <button
              id="tab-videos"
              onClick={() => setActiveTab('videos')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'videos'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Video className="w-4 h-4 text-cyan-400" />
              <span>Video Safety Feed</span>
            </button>

            <button
              id="tab-ads"
              onClick={() => setActiveTab('ads')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'ads'
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Megaphone className="w-4 h-4 text-yellow-400" />
              <span>Ad Marketplace</span>
            </button>

            <button
              id="tab-disbursements"
              onClick={() => setActiveTab('disbursements')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeTab === 'disbursements'
                  ? 'bg-gradient-to-r from-emerald-500 to-cyan-600 text-white shadow-md shadow-emerald-500/25'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <PieChart className="w-4 h-4 text-emerald-400" />
              <span>Fund Ledger (60/20/20)</span>
            </button>
          </nav>

          {/* Quick Actions & Mini Window Toggle */}
          <div className="flex items-center gap-2">
            {/* Membership & Verification Badge */}
            <button
              onClick={openAuthModal}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-900 border border-cyan-500/50 hover:border-cyan-400 text-xs font-bold transition shadow-sm"
              title="Identity Verification & Membership Plan"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <div className="text-left hidden md:block">
                <div className="text-[10px] text-emerald-300 font-bold flex items-center gap-1">
                  <span>18+ VERIFIED</span>
                  <span className="text-[9px] text-slate-400 uppercase">({subscription.verifiedMethod || 'Google/FB/ID'})</span>
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
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60 text-xs font-medium transition"
              title="Toggle Floating Music / Social Window"
            >
              <Music className="w-3.5 h-3.5 animate-pulse text-emerald-400" />
              <span className="hidden sm:inline">Mini Music</span>
              {activeAppCount > 0 && (
                <span className="px-1.5 py-0.2 text-[10px] bg-emerald-500 text-slate-950 font-bold rounded-full">
                  {activeAppCount}
                </span>
              )}
            </button>

            <button
              id="btn-safety-disclaimer"
              onClick={openDisclaimers}
              className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:border-slate-700 transition"
              title="Terms, AI Safety Policy & Unity Statement"
            >
              <ShieldCheck className="w-4 h-4 text-purple-400" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="lg:hidden flex items-center justify-around py-2 border-t border-slate-800/80 overflow-x-auto gap-1 text-xs">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3 py-1 rounded-md ${activeTab === 'profile' ? 'bg-pink-600 text-white' : 'text-slate-400'}`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveTab('wingman')}
            className={`px-3 py-1 rounded-md ${activeTab === 'wingman' ? 'bg-pink-600 text-white' : 'text-slate-400'}`}
          >
            AI Wingman
          </button>
          <button
            onClick={() => setActiveTab('hotspots')}
            className={`px-3 py-1 rounded-md ${activeTab === 'hotspots' ? 'bg-pink-600 text-white' : 'text-slate-400'}`}
          >
            Hotspots
          </button>
          <button
            onClick={() => setActiveTab('videos')}
            className={`px-3 py-1 rounded-md ${activeTab === 'videos' ? 'bg-pink-600 text-white' : 'text-slate-400'}`}
          >
            Videos
          </button>
          <button
            onClick={() => setActiveTab('ads')}
            className={`px-3 py-1 rounded-md ${activeTab === 'ads' ? 'bg-pink-600 text-white' : 'text-slate-400'}`}
          >
            Ads
          </button>
          <button
            onClick={() => setActiveTab('disbursements')}
            className={`px-3 py-1 rounded-md ${activeTab === 'disbursements' ? 'bg-emerald-600 text-white' : 'text-slate-400'}`}
          >
            60/20/20 Funds
          </button>
        </div>
      </div>
    </header>
  );
};
