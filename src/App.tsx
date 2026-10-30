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
import { SocialFeed } from './components/SocialFeed';
import { ReelsSection } from './components/ReelsSection';
import { LiveSpaces } from './components/LiveSpaces';
import { Messenger } from './components/Messenger';
import { BlogSection } from './components/BlogSection';
import { CreatorStudio } from './components/CreatorStudio';
import { UserSubscription, FundDisbursement } from './types';
import { 
  initialProfile, 
  initialHotspots, 
  initialVideos, 
  initialSocialApps, 
  initialAds,
  initialDisbursement,
  initialBlogPosts,
  initialConversations,
  initialReels
} from './data/mockData';

export default function App() {
  const [activeTab, setActiveTab] = useState('feed');
  const [profile, setProfile] = useState(initialProfile);
  const [hotspots, setHotspots] = useState(initialHotspots);
  const [videos, setVideos] = useState(initialVideos);
  const [miniApps, setMiniApps] = useState(initialSocialApps);
  const [ads, setAds] = useState(initialAds);
  const [disbursement, setDisbursement] = useState<FundDisbursement>(initialDisbursement);
  
  // New social media state: blogs, conversations, reels
  const [blogPosts, setBlogPosts] = useState(initialBlogPosts);
  const [conversations, setConversations] = useState(initialConversations);
  const [reels, setReels] = useState(initialReels);
  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
  
  // Subscription & Verification state
  const [subscription, setSubscription] = useState<UserSubscription>({
    isLoggedIn: true,
    isVerified: true,
    verifiedMethod: 'google',
    verifiedAge: 24,
    plan: 'vip',
    billingInterval: 'month',
    price: 14.99,
    renewalDate: 'Nov 24, 2026',
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isDisclaimersOpen, setIsDisclaimersOpen] = useState(false);

  // 70 / 20 / 10 Revenue Disbursement Handler
  const handleDisburseRevenue = (sourceName: string, amount: number) => {
    const creatorCut = Number((amount * 0.70).toFixed(2));
    const deviceCut = Number((amount * 0.20).toFixed(2));
    const rdCut = Number((amount * 0.10).toFixed(2));

    setDisbursement(prev => ({
      ...prev,
      totalRevenue: Number((prev.totalRevenue + amount).toFixed(2)),
      creatorShare: Number((prev.creatorShare + creatorCut).toFixed(2)),
      deviceShare: Number((prev.deviceShare + deviceCut).toFixed(2)),
      rdAndStudentsShare: Number((prev.rdAndStudentsShare + rdCut).toFixed(2)),
      lastDisbursementDate: 'Just now (Automated 70/20/10)',
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
  const unreadMessagesCount = conversations.reduce((acc, c) => acc + (c.unreadCount || 0), 0);

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
        unreadMessagesCount={unreadMessagesCount}
      />

      {/* Main Tab Content */}
      <main className="pb-24">
        {/* Social Feed: Search, Post Composer, Tag Filters, Comments, Feed Refresh */}
        {activeTab === 'feed' && (
          <SocialFeed
            profile={profile}
            onOpenWingmanWithPrompt={handleOpenWingmanWithPrompt}
          />
        )}

        {/* Reels Section: Vertical Video Shorts, Likes, Comment Sheet, Tags, Music Marquee */}
        {activeTab === 'reels' && (
          <ReelsSection
            reels={reels}
            setReels={setReels}
            profile={profile}
          />
        )}

        {/* Live Spaces: Live Broadcast Stream, Live Audience Chat, Reactions, Go Live Studio */}
        {activeTab === 'live' && (
          <LiveSpaces
            profile={profile}
          />
        )}

        {/* In-App Messenger: Direct Messaging, Typing Simulation, Quick Replies, Voice Note Mock */}
        {activeTab === 'messenger' && (
          <Messenger
            conversations={conversations}
            setConversations={setConversations}
            profile={profile}
          />
        )}

        {/* Community & Personal Blog Section: Articles, Categories, Reader Modal, Story Publisher */}
        {activeTab === 'blog' && (
          <BlogSection
            posts={blogPosts}
            setPosts={setBlogPosts}
            profile={profile}
          />
        )}

        {/* Profile: Customizable Theme, Bio, Quote, and Live Radio / Music Runner */}
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

        {/* AI Date Wingman & Confidence Coach */}
        {activeTab === 'wingman' && (
          <WingmanAssistant
            initialPrompt={wingmanInitialPrompt}
            onClearInitialPrompt={() => setWingmanInitialPrompt('')}
          />
        )}

        {/* Hotspots Bulletin: Bar & Club Live Crowd Tracker */}
        {activeTab === 'hotspots' && (
          <HotspotsBulletin
            hotspots={hotspots}
            setHotspots={setHotspots}
          />
        )}

        {/* Content Creator Studio: Analytics, 70% Pool Share, Tip Jar, Publish */}
        {activeTab === 'creators' && (
          <CreatorStudio
            profile={profile}
            setActiveTab={setActiveTab}
            onDisburseRevenue={handleDisburseRevenue}
          />
        )}

        {/* Video Safety Feed */}
        {activeTab === 'videos' && (
          <VideoSafetyFeed
            videos={videos}
            setVideos={setVideos}
            openDisclaimers={() => setIsDisclaimersOpen(true)}
          />
        )}

        {/* Local Business Ad Marketplace */}
        {activeTab === 'ads' && (
          <AdMarketplace
            ads={ads}
            setAds={setAds}
            onDisburseRevenue={handleDisburseRevenue}
          />
        )}

        {/* Automated Revenue Disbursement Ledger (70 / 20 / 10) */}
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

      {/* Online Dating Safety Cautions, Terms & Conditions Modal with Checkbox Agreement */}
      <TermsDisclaimersModal
        isOpen={isDisclaimersOpen}
        onClose={() => setIsDisclaimersOpen(false)}
        hasAccepted={hasAcceptedTerms}
        onAcceptTerms={() => setHasAcceptedTerms(true)}
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
