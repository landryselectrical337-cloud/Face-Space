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
  quote?: string;
  quoteAuthor?: string;
  occupation?: string;
  zodiac?: string;
  interests?: string[];
  theme: ThemePreset;
  customBgColor: string;
  customTextColor: string;
  customAccentColor: string;
  customCss?: string;
  statusMood: string;
  relationshipStatus: string;
  location: string;
  audioMode?: 'song' | 'radio';
  radioStationId?: string;
  currentSong: {
    title: string;
    artist: string;
    albumArt: string;
    embedUrl?: string;
    isPlaying?: boolean;
    audioUrl?: string;
  };
  topEight: Friend[];
  stats: {
    profileViews: number;
    wingsEarned: number;
    datesSuccess: number;
    followersCount?: number;
    blogPostsCount?: number;
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
  creatorShare: number;       // 70%
  deviceShare: number;        // 20%
  rdAndStudentsShare: number; // 10%
  lastDisbursementDate: string;
  recentTransactions: DisbursementTransaction[];
}

export interface DisbursementTransaction {
  id: string;
  source: string;
  totalAmount: number;
  creatorCut: number; // 70%
  deviceCut: number;  // 20%
  rdCut: number;      // 10%
  timestamp: string;
  recipientName?: string;
  status: 'Completed (Automated Ledger)' | 'In Escrow';
}

export interface RadioStation {
  id: string;
  name: string;
  genre: string;
  frequency: string;
  tagline: string;
  currentTrack: string;
  currentArtist: string;
  listenersCount: number;
  badge: string;
  streamAudioUrl: string;
  accentColor: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  authorName: string;
  authorUsername: string;
  authorAvatar: string;
  authorRole: string;
  category: 'Dating Advice' | 'City Hotspots' | 'Music & Culture' | 'Creator Economy' | 'Style & Vibe';
  readTime: string;
  publishDate: string;
  coverImage: string;
  excerpt: string;
  content: string[];
  likes: number;
  isLiked?: boolean;
  shares: number;
  comments: CommentItem[];
  tags: string[];
}

export interface ChatMessage {
  id: string;
  senderId: 'user' | string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
  isRead?: boolean;
  isAudio?: boolean;
  audioDuration?: string;
}

export interface ChatConversation {
  id: string;
  contactId: string;
  contactName: string;
  contactUsername: string;
  contactAvatar: string;
  contactRole?: string;
  isOnline: boolean;
  lastActive?: string;
  unreadCount: number;
  isTyping?: boolean;
  messages: ChatMessage[];
}

export interface ReelItem {
  id: string;
  creatorName: string;
  creatorUsername: string;
  creatorAvatar: string;
  isFollowing: boolean;
  title: string;
  caption: string;
  tags: string[];
  songTitle: string;
  songArtist: string;
  videoUrl: string;
  thumbnailUrl: string;
  likes: number;
  isLiked?: boolean;
  shares: number;
  views: number;
  comments: CommentItem[];
  location?: string;
}

export interface CreatorStats {
  monthlyViews: number;
  totalFollowers: number;
  monthlyRevenueEstimate: number;
  pendingPayout: number;
  subscribersCount: number;
  engagementRate: number;
  creatorRank: string;
}

