import React, { useState } from 'react';
import { 
  Megaphone, 
  Check, 
  Sparkles, 
  Building2, 
  Tag, 
  ExternalLink, 
  Zap, 
  CreditCard,
  PlusCircle,
  Eye,
  BarChart2
} from 'lucide-react';
import { AdListing } from '../types';

interface AdMarketplaceProps {
  ads: AdListing[];
  setAds: React.Dispatch<React.SetStateAction<AdListing[]>>;
  onDisburseRevenue?: (source: string, amount: number) => void;
}

export const AdMarketplace: React.FC<AdMarketplaceProps> = ({
  ads,
  setAds,
  onDisburseRevenue,
}) => {
  const [selectedTier, setSelectedTier] = useState<'Starter Hotspot' | 'Local Bar Special' | 'VIP Mainboard Banner'>('Local Bar Special');
  
  // Ad creation form
  const [bizName, setBizName] = useState('');
  const [tagline, setTagline] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [bannerUrl, setBannerUrl] = useState('https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&auto=format&fit=crop&q=80');
  const [targetLink, setTargetLink] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCreateAd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bizName.trim() || !tagline.trim()) return;

    const priceMap = {
      'Starter Hotspot': 29,
      'Local Bar Special': 79,
      'VIP Mainboard Banner': 199,
    };

    const price = priceMap[selectedTier];

    const newAd: AdListing = {
      id: 'ad_' + Date.now(),
      businessName: bizName,
      tierName: selectedTier,
      tagline,
      imageUrl: bannerUrl || 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&auto=format&fit=crop&q=80',
      targetLink: targetLink || '#',
      discountCode: discountCode || 'FACESPACE20',
      pricePerMonth: price,
      impressionsCount: 100,
    };

    setAds([newAd, ...ads]);

    if (onDisburseRevenue) {
      onDisburseRevenue(
        `Ad Sponsor Purchase: ${selectedTier} (${bizName})`,
        price
      );
    }

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setBizName('');
      setTagline('');
      setDiscountCode('');
    }, 4000);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-8">

      {/* Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-yellow-950 via-purple-950 to-slate-950 border-2 border-yellow-500/40 shadow-2xl space-y-3">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-yellow-500 to-pink-500 p-0.5 shadow-lg shadow-yellow-500/30 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-yellow-400">
                <Megaphone className="w-6 h-6 animate-pulse" />
              </div>
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                Face Space Media & Ad Hub
                <span className="text-[10px] px-2 py-0.5 bg-yellow-500/20 border border-yellow-500/50 text-yellow-300 rounded-full font-bold">
                  Sponsor Date Spots
                </span>
              </h2>
              <p className="text-xs text-yellow-200/80">
                Promote your bar, lounge, venue, or product directly to active daters looking for great spots!
              </p>
              <div className="mt-2 text-[10px] text-emerald-300 bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-1 rounded-lg inline-flex items-center gap-1.5 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span>AUTOMATIC DISBURSEMENT: 70% Creators • 20% Device Network • 10% R&D & Google Dev Students</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Pricing Tiers */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-yellow-400" />
          <span>Short Ad Subscription Packages</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Tier 1 */}
          <div
            onClick={() => setSelectedTier('Starter Hotspot')}
            className={`p-6 rounded-3xl bg-slate-900 border transition cursor-pointer flex flex-col justify-between space-y-4 ${
              selectedTier === 'Starter Hotspot' ? 'border-yellow-400 ring-2 ring-yellow-500/40 shadow-xl' : 'border-slate-800 opacity-90 hover:opacity-100'
            }`}
          >
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800">
                🥉 Starter Tier
              </span>
              <h4 className="text-lg font-black text-white">Starter Hotspot</h4>
              <div className="text-3xl font-black text-yellow-400">$29 <span className="text-xs text-slate-400 font-normal">/ month</span></div>
              <p className="text-xs text-slate-400">Ideal for small coffee shops or pop-up lounge events.</p>
            </div>

            <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-800">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Hotspot Bulletin listing</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Custom discount promo codes</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Standard impression analytics</span>
              </li>
            </ul>
          </div>

          {/* Tier 2 */}
          <div
            onClick={() => setSelectedTier('Local Bar Special')}
            className={`p-6 rounded-3xl bg-slate-900 border relative transition cursor-pointer flex flex-col justify-between space-y-4 ${
              selectedTier === 'Local Bar Special' ? 'border-yellow-400 ring-2 ring-yellow-500/40 shadow-2xl scale-105' : 'border-slate-800 opacity-90 hover:opacity-100'
            }`}
          >
            <div className="absolute -top-3 right-4 px-3 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow">
              MOST POPULAR
            </div>

            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-purple-950 text-purple-300 border border-purple-800">
                🥈 Local Bar Special
              </span>
              <h4 className="text-lg font-black text-white">Local Bar Special</h4>
              <div className="text-3xl font-black text-pink-400">$79 <span className="text-xs text-slate-400 font-normal">/ month</span></div>
              <p className="text-xs text-slate-400">Recommended for popular bars, cocktail lounges, & night venues.</p>
            </div>

            <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-800">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Featured Hotspot Bulletin priority</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>AI Wingman venue spot recommendations</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Sponsor badge & click-through tracking</span>
              </li>
            </ul>
          </div>

          {/* Tier 3 */}
          <div
            onClick={() => setSelectedTier('VIP Mainboard Banner')}
            className={`p-6 rounded-3xl bg-slate-900 border transition cursor-pointer flex flex-col justify-between space-y-4 ${
              selectedTier === 'VIP Mainboard Banner' ? 'border-yellow-400 ring-2 ring-yellow-500/40 shadow-xl' : 'border-slate-800 opacity-90 hover:opacity-100'
            }`}
          >
            <div className="space-y-2">
              <span className="px-3 py-1 rounded-full text-[10px] font-bold bg-yellow-950 text-yellow-300 border border-yellow-800">
                🥇 VIP Tier
              </span>
              <h4 className="text-lg font-black text-white">VIP Mainboard Banner</h4>
              <div className="text-3xl font-black text-yellow-300">$199 <span className="text-xs text-slate-400 font-normal">/ month</span></div>
              <p className="text-xs text-slate-400">For major entertainment venues, club franchises, or brands.</p>
            </div>

            <ul className="text-xs text-slate-300 space-y-2 pt-2 border-t border-slate-800">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Top Profile & Header Banner placement</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Video Feed integration & priority spot</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Unlimited impression cap</span>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Ad Creator & Simulator Form */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="font-extrabold text-base text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-yellow-400" />
              <span>Create Your Short Ad Listing</span>
            </h3>
            <p className="text-xs text-slate-400">Selected Tier: <strong className="text-yellow-300">{selectedTier}</strong></p>
          </div>
        </div>

        {isSubmitted ? (
          <div className="p-6 rounded-2xl bg-emerald-950/80 border border-emerald-500/50 text-center space-y-2 animate-fadeIn">
            <Sparkles className="w-8 h-8 text-yellow-300 mx-auto animate-bounce" />
            <h4 className="font-bold text-white text-base">Ad Campaign Activated!</h4>
            <p className="text-xs text-emerald-200">
              Your venue short ad is now live on Face Space under the {selectedTier} tier! #BetterTogether
            </p>
          </div>
        ) : (
          <form onSubmit={handleCreateAd} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Business / Venue Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Velvet Room Cocktail Bar"
                  value={bizName}
                  onChange={e => setBizName(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-yellow-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Ad Tagline / Promo Pitch *</label>
                <input
                  type="text"
                  placeholder="e.g. 2-for-1 Date Night Signature Cocktails every Thursday!"
                  value={tagline}
                  onChange={e => setTagline(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-yellow-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Discount Promo Code (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. FACESPACE20"
                  value={discountCode}
                  onChange={e => setDiscountCode(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-yellow-500"
                />
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1">Image Banner URL</label>
                <input
                  type="text"
                  value={bannerUrl}
                  onChange={e => setBannerUrl(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white focus:outline-none focus:border-yellow-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-yellow-500 to-pink-600 hover:from-yellow-600 hover:to-pink-700 text-white rounded-xl font-bold text-xs shadow-lg shadow-yellow-500/30 transition flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Launch Subscription Campaign</span>
              </button>
            </div>

            {/* Live Ad Simulator Preview Card */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-400 block">Live Ad Card Preview:</span>
              <div className="p-4 rounded-2xl bg-slate-950 border-2 border-yellow-500/50 shadow-xl space-y-3 relative overflow-hidden">
                <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-[9px] font-bold bg-yellow-500 text-slate-950">
                  SPONSORED
                </span>

                <img
                  src={bannerUrl || 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&auto=format&fit=crop&q=80'}
                  alt="Banner preview"
                  referrerPolicy="no-referrer"
                  className="w-full h-36 object-cover rounded-xl border border-slate-800"
                />

                <div className="space-y-1">
                  <h4 className="font-extrabold text-white text-sm">
                    {bizName || 'Your Venue Name'}
                  </h4>
                  <p className="text-xs text-slate-300">
                    {tagline || 'Your catchy date night promotional tagline goes here.'}
                  </p>
                </div>

                {discountCode && (
                  <div className="flex items-center gap-2 text-xs text-yellow-300 font-mono bg-yellow-950/60 p-2 rounded-lg border border-yellow-800/40">
                    <Tag className="w-3.5 h-3.5 text-yellow-400" />
                    <span>Use Code: <strong>{discountCode}</strong></span>
                  </div>
                )}
              </div>
            </div>
          </form>
        )}
      </div>

      {/* Active Sponsor Showcase Feed */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
          <Eye className="w-4 h-4 text-cyan-400" />
          <span>Active Business Sponsor Listings</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ads.map(ad => (
            <div
              key={ad.id}
              className="p-5 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-3 relative overflow-hidden hover:border-yellow-500/40 transition"
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-yellow-500/20 text-yellow-300 border border-yellow-500/40">
                  {ad.tierName}
                </span>
                <span className="text-[10px] text-slate-500 flex items-center gap-1">
                  <BarChart2 className="w-3 h-3 text-cyan-400" />
                  {ad.impressionsCount} Impressions
                </span>
              </div>

              <img
                src={ad.imageUrl}
                alt={ad.businessName}
                referrerPolicy="no-referrer"
                className="w-full h-40 object-cover rounded-2xl border border-slate-800"
              />

              <div className="space-y-1">
                <h4 className="font-extrabold text-base text-white">{ad.businessName}</h4>
                <p className="text-xs text-slate-300 leading-relaxed">{ad.tagline}</p>
              </div>

              {ad.discountCode && (
                <div className="flex items-center justify-between text-xs bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-400">Exclusive Face Space Code:</span>
                  <span className="font-mono font-bold text-yellow-400">{ad.discountCode}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
