export type ThemePreset = 'y2k_glitter' | 'neon_cyber' | 'retro_pastel' | 'midnight_purple' | 'warm_gold' | 'minimal_slate';

export type VerificationMethod = 'google' | 'facebook' | 'verify_id';

export interface UserSubscription {
  isLoggedIn: boolean;
  isVerified: boolean;
  verifiedMethod?: VerificationMethod;
  verifiedAge?: number;
  plan: 'free_trial' | 'basic' | 'vip';
  billingInterval: 'month' | 'year';
  price: number;
  renewalDate: string;
}

export interface Friend {
  id: string;
  name: string;
  username: string;
  avatar: string;
  headline: string;
  isOnline: boolean;
  topEightOrder?: number;
  songName?: string;
  relationshipStatus?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bannerUrl: string;
  headline: string;
  bio: string;
  theme: ThemePreset;
  customBgColor: string;
  customTextColor: string;
  customAccentColor: string;
  customCss?: string;
  statusMood: string;
  relationshipStatus: string;
  location: string;
  currentSong: {
    title: string;
    artist: string;
    albumArt: string;
    embedUrl?: string;
    isPlaying?: boolean;
  };
  topEight: Friend[];
  stats: {
    profileViews: number;
    wingsEarned: number;
    datesSuccess: number;
  };
}

export interface WingmanMessage {
  id: string;
  sender: 'user' | 'wingman';
  text: string;
  timestamp: string;
  audioUrl?: string;
  category?: 'icebreaker' | 'peptalk' | 'outfit' | 'scenario' | 'tip';
}

export interface HotspotPost {
  id: string;
  userName: string;
  userAvatar: string;
  venueName: string;
  city: string;
  address: string;
  vibe: '🔥 On Fire' | '🍸 Chill Vibe' | '💃 Packed Floor' | '🎵 Live DJ' | '🕯️ Romantic';
  crowdLevel: number; // 0 - 100%
  musicGenre: string;
  comment: string;
  timestamp: string;
  upvotes: number;
  verifiedCheckin: boolean;
  imageUrl?: string;
}

export interface VideoItem {
  id: string;
  creatorName: string;
  creatorAvatar: string;
  title: string;
  videoUrl: string;
  thumbnailUrl: string;
  likes: number;
  commentsCount: number;
  category: 'Date Vlog' | 'Spot Review' | 'Outfit Check' | 'Date Story' | 'Comedy';
  comments: CommentItem[];
}

export interface CommentItem {
  id: string;
  author: string;
  avatar: string;
  text: string;
  timestamp: string;
  likes: number;
  aiSafetyStatus?: {
    safe: boolean;
    category?: string;
    reason?: string;
    cleanedText?: string;
    flaggedByAI?: boolean;
  };
}

export interface SocialAppWindow {
  id: string;
  title: string;
  icon: string;
  embedType: 'spotify' | 'youtube' | 'twitter' | 'instagram' | 'reddit' | 'custom';
  url: string;
  isOpen: boolean;
  isMinimized: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export interface AdListing {
  id: string;
  businessName: string;
  tierName: 'Starter Hotspot' | 'Local Bar Special' | 'VIP Mainboard Banner';
  tagline: string;
  imageUrl: string;
  targetLink: string;
  discountCode?: string;
  pricePerMonth: number;
  impressionsCount: number;
}

export interface FundDisbursement {
  totalRevenue: number;
  creatorShare: number;       // 60%
  deviceShare: number;        // 20%
  rdAndStudentsShare: number; // 20%
  lastDisbursementDate: string;
  recentTransactions: DisbursementTransaction[];
}

export interface DisbursementTransaction {
  id: string;
  source: string;
  totalAmount: number;
  creatorCut: number; // 60%
  deviceCut: number;  // 20%
  rdCut: number;      // 20%
  timestamp: string;
  recipientName?: string;
  status: 'Completed (Automated Ledger)' | 'In Escrow';
}
