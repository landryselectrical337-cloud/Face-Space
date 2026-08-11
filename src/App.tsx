import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { MySpaceProfile } from './components/MySpaceProfile';
import { WingmanAssistant } from './components/WingmanAssistant';
import { HotspotsBulletin } from './components/HotspotsBulletin';
import { VideoSafetyFeed } from './components/VideoSafetyFeed';
import { AdMarketplace } from './components/AdMarketplace';
import { FundDisbursementDashboard } from './components/FundDisbursementDashboard';
import { MiniWindows } from './components/MiniWindows';
import { TermsDisclaimersModal } from './components/TermsDisclaimersModal';
import { AuthSubscriptionModal } from './components/AuthSubscriptionModal';
import { UserSubscription, FundDisbursement } from './types';
import { 
  initialProfile, 
  initialHotspots, 
  initialVideos, 
  initialSocialApps, 
  initialAds,
  initialDisbursement
} from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState(initialProfile);
  const [hotspots, setHotspots] = useState(initialHotspots);
  const [videos, setVideos] = useState(initialVideos);
  const [miniApps, setMiniApps] = useState(initialSocialApps);
  const [ads, setAds] = useState(initialAds);
  const [disbursement, setDisbursement] = useState<FundDisbursement>(initialDisbursement);
  
  // Subscription & Verification state
  const [subscription, setSubscription] = useState<UserSubscription>({
    isLoggedIn: true,
    isVerified: true,
    verifiedMethod: 'google',
    verifiedAge: 24,
    plan: 'vip',
    billingInterval: 'month',
    price: 14.99,
    renewalDate: 'Aug 24, 2026',
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isDisclaimersOpen, setIsDisclaimersOpen] = useState(false);

  const handleDisburseRevenue = (sourceName: string, amount: number) => {
    const creatorCut = Number((amount * 0.60).toFixed(2));
    const deviceCut = Number((amount * 0.20).toFixed(2));
    const rdCut = Number((amount * 0.20).toFixed(2));

    setDisbursement(prev => ({
      ...prev,
      totalRevenue: Number((prev.totalRevenue + amount).toFixed(2)),
      creatorShare: Number((prev.creatorShare + creatorCut).toFixed(2)),
      deviceShare: Number((prev.deviceShare + deviceCut).toFixed(2)),
      rdAndStudentsShare: Number((prev.rdAndStudentsShare + rdCut).toFixed(2)),
      lastDisbursementDate: 'Just now (Automated)',
      recentTransactions: [
        {
          id: 'tx_' + Date.now(),
          source: sourceName,
          totalAmount: amount,
          creatorCut,
          deviceCut,
          rdCut,
          timestamp: 'Just now',
          recipientName: 'Creators Pool & Student Grants',
          status: 'Completed (Automated Ledger)',
        },
        ...prev.recentTransactions,
      ],
    }));
  };

  // Wingman prompt pass-through
  const [wingmanInitialPrompt, setWingmanInitialPrompt] = useState('');

  const handleOpenWingmanWithPrompt = (promptText: string) => {
    setWingmanInitialPrompt(promptText);
    setActiveTab('wingman');
  };

  const handleToggleMiniWindow = (appId: string) => {
    setMiniApps(prev => prev.map(a => a.id === appId ? { ...a, isOpen: !a.isOpen, isMinimized: false } : a));
  };

  const activeAppCount = miniApps.filter(a => a.isOpen).length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-pink-500 selection:text-white">
      {/* Header Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        profile={profile}
        toggleMiniWindow={handleToggleMiniWindow}
        activeAppCount={activeAppCount}
        openDisclaimers={() => setIsDisclaimersOpen(true)}
        subscription={subscription}
        openAuthModal={() => setIsAuthModalOpen(true)}
      />

      {/* Main Tab Content */}
      <main className="pb-24">
        {activeTab === 'profile' && (
          <MySpaceProfile
            profile={profile}
            setProfile={setProfile}
            openWingmanWithPrompt={handleOpenWingmanWithPrompt}
            toggleMiniWindow={handleToggleMiniWindow}
            subscription={subscription}
            openAuthModal={() => setIsAuthModalOpen(true)}
          />
        )}

        {activeTab === 'wingman' && (
          <WingmanAssistant
            initialPrompt={wingmanInitialPrompt}
            onClearInitialPrompt={() => setWingmanInitialPrompt('')}
          />
        )}

        {activeTab === 'hotspots' && (
          <HotspotsBulletin
            hotspots={hotspots}
            setHotspots={setHotspots}
          />
        )}

        {activeTab === 'videos' && (
          <VideoSafetyFeed
            videos={videos}
            setVideos={setVideos}
            openDisclaimers={() => setIsDisclaimersOpen(true)}
          />
        )}

        {activeTab === 'ads' && (
          <AdMarketplace
            ads={ads}
            setAds={setAds}
            onDisburseRevenue={handleDisburseRevenue}
          />
        )}

        {activeTab === 'disbursements' && (
          <FundDisbursementDashboard
            disbursement={disbursement}
            setDisbursement={setDisbursement}
          />
        )}
      </main>

      {/* Floating Mini Window Container for Spotify, YouTube & Social Media */}
      <MiniWindows
        apps={miniApps}
        setApps={setMiniApps}
      />

      {/* Terms, Safety Policy & #BetterTogether Disclaimers Modal */}
      <TermsDisclaimersModal
        isOpen={isDisclaimersOpen}
        onClose={() => setIsDisclaimersOpen(false)}
      />

      {/* Age/Identity Verification & Subscription Sign-Up Modal */}
      <AuthSubscriptionModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        subscription={subscription}
        setSubscription={setSubscription}
        onDisburseRevenue={handleDisburseRevenue}
      />
    </div>
  );
}
