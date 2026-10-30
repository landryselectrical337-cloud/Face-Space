import React, { useState } from 'react';
import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Eye, 
  Video, 
  BookOpen, 
  Radio, 
  Sparkles, 
  ShieldCheck, 
  Plus, 
  ArrowUpRight, 
  Layers, 
  HeartHandshake, 
  Gift, 
  CheckCircle2 
} from 'lucide-react';
import { UserProfile, CreatorStats } from '../types';
import { initialCreatorStats } from '../data/mockData';

interface CreatorStudioProps {
  profile: UserProfile;
  setActiveTab: (tab: string) => void;
  onDisburseRevenue?: (sourceName: string, amount: number) => void;
}

export const CreatorStudio: React.FC<CreatorStudioProps> = ({
  profile,
  setActiveTab,
  onDisburseRevenue,
}) => {
  const [stats, setStats] = useState<CreatorStats>(initialCreatorStats);
  const [tipSuccessMsg, setTipSuccessMsg] = useState('');

  const handleSendFanTip = (amount: number) => {
    onDisburseRevenue?.(`Fan Tip Jar ($${amount.toFixed(2)}) for ${profile.name}`, amount);
    const creatorCut = Number((amount * 0.70).toFixed(2));
    setStats(prev => ({
      ...prev,
      monthlyRevenueEstimate: Number((prev.monthlyRevenueEstimate + creatorCut).toFixed(2)),
      pendingPayout: Number((prev.pendingPayout + creatorCut).toFixed(2))
    }));

    setTipSuccessMsg(`Tip of $${amount.toFixed(2)} received! 70% ($${creatorCut.toFixed(2)}) instantly credited to your creator balance.`);
    setTimeout(() => setTipSuccessMsg(''), 4000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
      {/* Hero Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-purple-950 via-slate-900 to-cyan-950 p-6 sm:p-8 rounded-3xl border border-purple-500/40 shadow-2xl">
        <div className="flex items-center gap-4">
          <img
            src={profile.avatar}
            alt={profile.name}
            referrerPolicy="no-referrer"
            className="w-16 h-16 rounded-2xl object-cover border-2 border-purple-500 shadow-xl shrink-0"
          />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40">
                Creator Studio
              </span>
              <span className="text-xs text-yellow-300 font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                {stats.creatorRank}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {profile.name}'s Creator Hub
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Autonomous 70% Creator Revenue Distribution · Analytics · Publishing Studio
            </p>
          </div>
        </div>

        {/* Quick Launch Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => setActiveTab('reels')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white font-bold text-xs shadow-md shadow-pink-500/25 transition"
          >
            <Video className="w-4 h-4" />
            <span>Upload Reel</span>
          </button>
          <button
            onClick={() => setActiveTab('blog')}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-md shadow-purple-500/25 transition"
          >
            <BookOpen className="w-4 h-4" />
            <span>Write Story</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Views */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">30-Day Views</span>
            <Eye className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">
            {stats.monthlyViews.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+24.6% vs last month</span>
          </div>
        </div>

        {/* Total Followers */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Followers</span>
            <Users className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">
            {stats.totalFollowers.toLocaleString()}
          </div>
          <div className="text-[11px] text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+142 this week</span>
          </div>
        </div>

        {/* 70% Revenue Share */}
        <div className="p-5 rounded-2xl bg-slate-900 border-2 border-emerald-500/40 shadow-xl space-y-2 bg-gradient-to-br from-slate-900 to-emerald-950/30">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-300">70% Creator Earnings</span>
            <DollarSign className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400">
            ${stats.monthlyRevenueEstimate.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-emerald-300">
            Automated ledger payout
          </div>
        </div>

        {/* Pending Payout */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold uppercase tracking-wider">Ready for Payout</span>
            <ArrowUpRight className="w-4 h-4 text-yellow-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-yellow-300">
            ${stats.pendingPayout.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-slate-400">
            Disbursing every Friday
          </div>
        </div>
      </div>

      {/* 70/20/10 Revenue Ledger Transparency Banner */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-400" />
            <span>How Your 70% Creator Share Works</span>
          </h3>
          <span className="text-xs text-emerald-400 font-mono">Verified 70 / 20 / 10 Formula</span>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Unlike legacy platforms where creators receive scraps or ad cuts below 30%, Face Space's immutable ledger operates on a <strong>70/20/10 distribution</strong>. Every VIP subscription ($14.99/mo), Basic annual pass, and local venue ad placement is partitioned automatically:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
          <div className="p-3.5 rounded-xl bg-purple-950/60 border border-purple-500/40 space-y-1">
            <span className="text-purple-300 font-bold block text-sm">70% to Creators</span>
            <p className="text-slate-300 text-[11px]">Direct payouts to video vloggers, speakeasy scouts, writers, and event hosts.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-cyan-950/60 border border-cyan-500/40 space-y-1">
            <span className="text-cyan-300 font-bold block text-sm">20% to Device Infrastructure</span>
            <p className="text-slate-300 text-[11px]">Edge servers, fast video streaming CDN, and cross-platform sync nodes.</p>
          </div>
          <div className="p-3.5 rounded-xl bg-yellow-950/60 border border-yellow-500/40 space-y-1">
            <span className="text-yellow-300 font-bold block text-sm">10% to R&D & Students</span>
            <p className="text-slate-300 text-[11px]">Google Dev Student developer grants and Gemini AI Safety Shield research.</p>
          </div>
        </div>
      </div>

      {/* Fan Tip Jar Simulator */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Gift className="w-5 h-5 text-pink-400" />
            <span>Fan Tip Jar & Direct Appreciation</span>
          </h3>
          <span className="text-xs text-slate-400">Test fan tipping flow</span>
        </div>

        {tipSuccessMsg && (
          <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-500 text-emerald-200 text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>{tipSuccessMsg}</span>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs text-slate-300">Simulate incoming audience tip:</span>
          <button
            onClick={() => handleSendFanTip(5.00)}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-pink-300 font-bold text-xs border border-slate-700 transition"
          >
            +$5.00 Tip (Cocktail)
          </button>
          <button
            onClick={() => handleSendFanTip(15.00)}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-purple-300 font-bold text-xs border border-slate-700 transition"
          >
            +$15.00 Tip (Vinyl LP)
          </button>
          <button
            onClick={() => handleSendFanTip(50.00)}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold text-xs transition shadow-md shadow-pink-500/25"
          >
            +$50.00 Super Supporter Tip
          </button>
        </div>
      </div>
    </div>
  );
};
