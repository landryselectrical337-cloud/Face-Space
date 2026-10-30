import { 
  UserProfile, 
  HotspotPost, 
  VideoItem, 
  AdListing, 
  SocialAppWindow, 
  FundDisbursement,
  RadioStation,
  BlogPost,
  ChatConversation,
  ReelItem,
  CreatorStats
} from '../types';

export const initialProfile: UserProfile = {
  id: 'usr_01',
  name: 'Alex Mercer',
  username: 'alex_vibes',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
  bannerUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&auto=format&fit=crop&q=80',
  headline: 'Exploring city night spots & prepping for Friday date night ✨',
  bio: 'Music enthusiast, cocktail connoisseur, and believer in authentic connections. Seeking great conversation & live music spots with open-minded thinkers.',
  quote: 'You don\'t find chemistry in a rigid algorithm, you create it across a cocktail table with real conversation and good music.',
  quoteAuthor: 'Alex M.',
  occupation: 'Creative Director & Vinyl Collector',
  zodiac: 'Scorpio ♏',
  interests: ['Indie Vinyl', 'Speakeasies', 'Late-night Drives', 'Synthwave', 'Street Photography', 'Film Grain'],
  theme: 'y2k_glitter',
  customBgColor: '#0d0d1a',
  customTextColor: '#e2e8f0',
  customAccentColor: '#ec4899',
  statusMood: '😎 Feeling Confident & Ready for Weekend',
  relationshipStatus: 'Single & Looking for Great Dates',
  location: 'Austin, TX',
  audioMode: 'radio',
  radioStationId: 'radio_lofi',
  currentSong: {
    title: 'Midnight City (Remix)',
    artist: 'M83 / Neon Vibe',
    albumArt: 'https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?w=300&auto=format&fit=crop&q=80',
    embedUrl: 'https://www.youtube.com/embed/dX3k_QDnzHE?autoplay=1',
    isPlaying: true,
    audioUrl: 'https://actions.google.com/sounds/v1/ambient/rain_heavy.ogg'
  },
  topEight: [
    {
      id: 'f1',
      name: 'Maya Lin',
      username: 'mayalin_music',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
      headline: 'Indie DJ & Coffee Critic',
      isOnline: true,
      topEightOrder: 1,
      songName: 'Electric Feel - MGMT',
    },
    {
      id: 'f2',
      name: 'Jordan Vance',
      username: 'jordan_nightlife',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      headline: 'Downtown Event Promoter',
      isOnline: true,
      topEightOrder: 2,
      songName: 'Starboy - The Weeknd',
    },
    {
      id: 'f3',
      name: 'Sofia Reyes',
      username: 'sofia_dates',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
      headline: 'Wingwoman extraodinaire 💫',
      isOnline: false,
      topEightOrder: 3,
      songName: 'Levitating - Dua Lipa',
    },
    {
      id: 'f4',
      name: 'Liam Chen',
      username: 'liam_c',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
      headline: 'Speakeasy collector',
      isOnline: true,
      topEightOrder: 4,
    },
    {
      id: 'f5',
      name: 'Chloe Bennett',
      username: 'chloe_b',
      avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=80',
      headline: 'Fashion & Vibe Consultant',
      isOnline: false,
      topEightOrder: 5,
    },
    {
      id: 'f6',
      name: 'Marcus Bell',
      username: 'marcus_b',
      avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80',
      headline: 'Mixologist & Foodie',
      isOnline: true,
      topEightOrder: 6,
    },
    {
      id: 'f7',
      name: 'Aria Thorne',
      username: 'aria_t',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      headline: 'Rooftop Bar Scout',
      isOnline: false,
      topEightOrder: 7,
    },
    {
      id: 'f8',
      name: 'Face Space Wingman',
      username: 'ai_wingman',
      avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80',
      headline: 'Your 24/7 AI Confidence Coach 🤖',
      isOnline: true,
      topEightOrder: 8,
    },
  ],
  stats: {
    profileViews: 1420,
    wingsEarned: 89,
    datesSuccess: 12,
  },
};

export const initialHotspots: HotspotPost[] = [
  {
    id: 'hs_1',
    userName: 'Jordan Nightlife',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    venueName: 'The Electric Velvet Lounge',
    city: 'Austin, TX',
    address: '402 E 6th Street',
    vibe: '🔥 On Fire',
    crowdLevel: 92,
    musicGenre: 'House & Synthwave',
    comment: 'DJ just dropped the midnight set! Line is moving fast, patio bar is open. Perfect energy for a date intro!',
    timestamp: '12 mins ago',
    upvotes: 34,
    verifiedCheckin: true,
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'hs_2',
    userName: 'Sofia Reyes',
    userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    venueName: 'Subterranean Speakeasy',
    city: 'Austin, TX',
    address: '118 Rainey St (Hidden Door behind books)',
    vibe: '🍸 Chill Vibe',
    crowdLevel: 65,
    musicGenre: 'Lo-Fi Jazz & Soul',
    comment: 'Super intimate lighting, dim velvet booths. Perfect if you want to actually talk on a first date without shouting!',
    timestamp: '28 mins ago',
    upvotes: 49,
    verifiedCheckin: true,
    imageUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&auto=format&fit=crop&q=80',
  },
  {
    id: 'hs_3',
    userName: 'Maya Lin',
    userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    venueName: 'Skyline Rooftop Garden',
    city: 'Austin, TX',
    address: '301 Congress Ave',
    vibe: '🕯️ Romantic',
    crowdLevel: 50,
    musicGenre: 'Deep House & Chillout',
    comment: 'Breezy evening, fire pits are lit! Great craft mocktails & cocktails. High date approval rating.',
    timestamp: '1 hour ago',
    upvotes: 27,
    verifiedCheckin: true,
    imageUrl: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=600&auto=format&fit=crop&q=80',
  },
];

export const initialVideos: VideoItem[] = [
  {
    id: 'vid_1',
    creatorName: 'Chloe Bennett',
    creatorAvatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=80',
    title: 'Top 3 First Date Outfits that scream confidence without trying too hard 💃',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop&q=80',
    likes: 382,
    commentsCount: 14,
    category: 'Outfit Check',
    comments: [
      {
        id: 'c1',
        author: 'Liam Chen',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
        text: 'That jacket in option 2 is killer! Where did you get it?',
        timestamp: '2h ago',
        likes: 12,
        aiSafetyStatus: { safe: true },
      },
      {
        id: 'c2',
        author: 'AI Safety Bot',
        avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80',
        text: 'Clean comment thread verified by Face Space AI Safety Shield. #BetterTogether',
        timestamp: '1h ago',
        likes: 45,
        aiSafetyStatus: { safe: true },
      },
    ],
  },
  {
    id: 'vid_2',
    creatorName: 'Marcus Mixology',
    creatorAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80',
    title: 'How to order drinks on a first date like a pro 🍸 (3 Easy Rules)',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80',
    likes: 512,
    commentsCount: 22,
    category: 'Spot Review',
    comments: [
      {
        id: 'c3',
        author: 'Sofia Reyes',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
        text: 'Rule #2 saved me on my date last Tuesday! Highly recommend.',
        timestamp: '3h ago',
        likes: 18,
        aiSafetyStatus: { safe: true },
      },
    ],
  },
];

export const initialSocialApps: SocialAppWindow[] = [
  {
    id: 'app_spotify',
    title: 'Spotify Player Widget',
    icon: '🎵',
    embedType: 'spotify',
    url: 'https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M',
    isOpen: true,
    isMinimized: false,
    position: { x: 40, y: 80 },
    size: { width: 340, height: 420 },
  },
  {
    id: 'app_youtube',
    title: 'YouTube Date Music Vibe',
    icon: '📺',
    embedType: 'youtube',
    url: 'https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=0',
    isOpen: false,
    isMinimized: false,
    position: { x: 400, y: 100 },
    size: { width: 440, height: 320 },
  },
  {
    id: 'app_twitter',
    title: 'X / Twitter #DateNight Feed',
    icon: '🌐',
    embedType: 'twitter',
    url: 'https://platform.twitter.com/widgets.js',
    isOpen: false,
    isMinimized: false,
    position: { x: 120, y: 140 },
    size: { width: 380, height: 450 },
  },
];

export const initialAds: AdListing[] = [
  {
    id: 'ad_1',
    businessName: 'Velvet Room Cocktail Lounge',
    tierName: 'VIP Mainboard Banner',
    tagline: '2-for-1 Date Night Signature Cocktails every Thursday!',
    imageUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=600&auto=format&fit=crop&q=80',
    targetLink: '#',
    discountCode: 'FACESPACE241',
    pricePerMonth: 199,
    impressionsCount: 14250,
  },
  {
    id: 'ad_2',
    businessName: 'Retro Arcade Bar & Kitchen',
    tierName: 'Local Bar Special',
    tagline: 'Play pinball & break the ice! Free arcade tokens with any burger order.',
    imageUrl: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&auto=format&fit=crop&q=80',
    targetLink: '#',
    discountCode: 'ARCADEWINGMAN',
    pricePerMonth: 79,
    impressionsCount: 8900,
  },
];

export const initialDisbursement: FundDisbursement = {
  totalRevenue: 24500.00,
  creatorShare: 17150.00,       // 70%
  deviceShare: 4900.00,         // 20%
  rdAndStudentsShare: 2450.00,  // 10%
  lastDisbursementDate: 'Today (Automated Ledger 70/20/10)',
  recentTransactions: [
    {
      id: 'tx_101',
      source: 'VIP Monthly Subscription ($14.99)',
      totalAmount: 14.99,
      creatorCut: 10.49,
      deviceCut: 3.00,
      rdCut: 1.50,
      timestamp: '2 mins ago',
      recipientName: 'Alex Mercer & Creator Pool',
      status: 'Completed (Automated Ledger)',
    },
    {
      id: 'tx_102',
      source: 'Sponsor Ad Placement ($199.00)',
      totalAmount: 199.00,
      creatorCut: 139.30,
      deviceCut: 39.80,
      rdCut: 19.90,
      timestamp: '1 hour ago',
      recipientName: 'Hotspot Venue Hosts & Event Pool',
      status: 'Completed (Automated Ledger)',
    },
    {
      id: 'tx_103',
      source: 'Basic Annual Pass ($80.00)',
      totalAmount: 80.00,
      creatorCut: 56.00,
      deviceCut: 16.00,
      rdCut: 8.00,
      timestamp: '3 hours ago',
      recipientName: 'Google Dev Student Grants & AI R&D',
      status: 'Completed (Automated Ledger)',
    },
  ],
};

export const radioStations: RadioStation[] = [
  {
    id: 'radio_lofi',
    name: 'Lofi Moon Lounge',
    genre: 'Lofi Hip-Hop & Chillhop',
    frequency: '88.5 FM',
    tagline: 'Warm tape saturation, vinyl crackle, and late-night study romance.',
    currentTrack: 'Midnight Coffee & Starlight',
    currentArtist: 'Komorebi Sound Collective',
    listenersCount: 1420,
    badge: 'LIVE ON AIR',
    streamAudioUrl: 'https://actions.google.com/sounds/v1/ambient/rain_heavy.ogg',
    accentColor: '#ec4899'
  },
  {
    id: 'radio_synth',
    name: 'Cyberwave 2084',
    genre: 'Synthwave & Retrowave',
    frequency: '94.7 FM',
    tagline: 'Neon night drives, analog synthesizers, and midnight skyline vibes.',
    currentTrack: 'Neon Boulevard 80s',
    currentArtist: 'Vector Highway',
    listenersCount: 980,
    badge: 'POPULAR',
    streamAudioUrl: 'https://actions.google.com/sounds/v1/science_fiction/scifi_engine_drone.ogg',
    accentColor: '#06b6d4'
  },
  {
    id: 'radio_jazz',
    name: 'Speakeasy Velvet Jazz',
    genre: 'Lo-Fi Jazz & Warm Soul',
    frequency: '101.3 FM',
    tagline: 'Muted trumpets, acoustic upright bass, and candlelit cocktail conversations.',
    currentTrack: 'Autumn in Austin',
    currentArtist: 'The 6th Street Quintet',
    listenersCount: 650,
    badge: 'CURATED',
    streamAudioUrl: 'https://actions.google.com/sounds/v1/ambient/coffee_shop_background.ogg',
    accentColor: '#f59e0b'
  },
  {
    id: 'radio_house',
    name: 'Sunset Terrace House',
    genre: 'Deep Melodic House',
    frequency: '105.9 FM',
    tagline: 'Euphoric sunset grooves, deep basslines, and rooftop weekend energy.',
    currentTrack: 'Golden Hour Reflections',
    currentArtist: 'Maya Lin Live Rooftop Set',
    listenersCount: 1840,
    badge: 'HOTSPOT STREAM',
    streamAudioUrl: 'https://actions.google.com/sounds/v1/foley/water_lapping_against_boat.ogg',
    accentColor: '#8b5cf6'
  },
  {
    id: 'radio_indie',
    name: 'Bedroom Tape Radio',
    genre: 'Indie Dream Pop & Alt',
    frequency: '98.1 FM',
    tagline: 'Fuzzy guitars, nostalgia, and intimate acoustic melodies.',
    currentTrack: 'Ghost In My Headphones',
    currentArtist: 'Sunday Cassette',
    listenersCount: 512,
    badge: 'COMMUNITY',
    streamAudioUrl: 'https://actions.google.com/sounds/v1/ambient/camp_fire_ambience.ogg',
    accentColor: '#10b981'
  }
];

export const initialBlogPosts: BlogPost[] = [
  {
    id: 'blog_1',
    title: 'The Art of the 1-Hour First Date: Why Keeping It Short Sparks Real Chemistry',
    slug: 'art-of-the-1-hour-first-date',
    authorName: 'Alex Mercer',
    authorUsername: 'alex_vibes',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    authorRole: 'Community Curator & Singles Host',
    category: 'Dating Advice',
    readTime: '4 min read',
    publishDate: 'Oct 28, 2026',
    coverImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&auto=format&fit=crop&q=80',
    excerpt: 'Marathon dinner dates put unnecessary pressure on both people. Here is how planning a low-stakes 60-minute cocktail or coffee date creates effortless attraction.',
    content: [
      'We’ve all made the mistake: booking an elaborate three-course dinner for a first date with someone you matched with online. By minute twenty, you realize there is zero chemistry, yet you are stuck waiting for the entrée and dessert.',
      'The modern standard is the intentional 1-hour window. Meet at an intimate speakeasy or vibrant tea lounge. You have a definitive end time planned ("I have a friend’s gallery opening at 8:30"), which removes the fear of being trapped.',
      'If the conversation is electric, you leave both of you wanting more—which guarantees excitement for date two. If it’s polite but lacking spark, you hug, say thank you, and everyone leaves feeling respected.'
    ],
    likes: 142,
    isLiked: false,
    shares: 29,
    tags: ['FirstDate', 'Confidence', 'ModernRomance', 'Speakeasies'],
    comments: [
      {
        id: 'bc_1',
        author: 'Sofia Reyes',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
        text: 'This advice changed my entire dating experience! 1 hour max at an intimate lounge means you never feel drained.',
        timestamp: '1 day ago',
        likes: 18,
        aiSafetyStatus: { safe: true }
      },
      {
        id: 'bc_2',
        author: 'Jordan Vance',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
        text: 'Spot on Alex. Plus venues love it because turn-around is smooth and vibes stay energetic.',
        timestamp: '18 hours ago',
        likes: 9,
        aiSafetyStatus: { safe: true }
      }
    ]
  },
  {
    id: 'blog_2',
    title: 'Austin & LA Speakeasy Guide: 7 Hidden Entrances for Unforgettable Nights',
    slug: 'austin-la-speakeasy-guide',
    authorName: 'Liam Chen',
    authorUsername: 'liam_c',
    authorAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    authorRole: 'Venue Explorer & Nightlife Writer',
    category: 'City Hotspots',
    readTime: '6 min read',
    publishDate: 'Oct 26, 2026',
    coverImage: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=900&auto=format&fit=crop&q=80',
    excerpt: 'From fake bookcase entrances to secret cocktail lockers behind laundromats, here are the city gems that make date night feel like an adventure.',
    content: [
      'Nothing kicks off a date with more curiosity than whispering a secret code to a guy standing next to a vintage vending machine and stepping into a 1920s underground room.',
      'Our top picks this season feature low-decibel ambient jazz where you can whisper across the table, bespoke custom cocktails crafted to your mood, and velvet booth seating that encourages proximity.',
      'Remember: check our Hotspots bulletin for live crowd percentages before heading out to ensure you don\'t hit a 45-minute lineup.'
    ],
    likes: 215,
    isLiked: true,
    shares: 64,
    tags: ['Nightlife', 'Speakeasies', 'CityGuide', 'DateSpots'],
    comments: [
      {
        id: 'bc_3',
        author: 'Maya Lin',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
        text: 'The Electric Velvet Lounge is definitely #1 for synth lovers. Great write-up Liam!',
        timestamp: '2 days ago',
        likes: 14,
        aiSafetyStatus: { safe: true }
      }
    ]
  },
  {
    id: 'blog_3',
    title: 'Why We Put Profile Songs & Radio Back: The Psychology of Audio Identity',
    slug: 'psychology-of-profile-songs-and-audio',
    authorName: 'Maya Lin',
    authorUsername: 'mayalin_music',
    authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    authorRole: 'DJ & Sound Designer',
    category: 'Music & Culture',
    readTime: '5 min read',
    publishDate: 'Oct 23, 2026',
    coverImage: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=900&auto=format&fit=crop&q=80',
    excerpt: 'Remembering when a profile song revealed everything about a person\'s soul. How audio curation tells a story words never can.',
    content: [
      'When you land on someone\'s page and hear muted lofi keys or driving synth basslines, you instantly grasp their emotional wavelength before reading a single word.',
      'In an era of sanitized, uniform profiles, Face Space allows you to broadcast who you are through sound—whether it\'s our live curated radio stations or your personal anthem.',
      'Music is the highest form of emotional resonance. Let your profile speak in rhythm.'
    ],
    likes: 310,
    isLiked: false,
    shares: 88,
    tags: ['Music', 'Nostalgia', 'Y2K', 'AudioIdentity'],
    comments: [
      {
        id: 'bc_4',
        author: 'Chloe Bennett',
        avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=80',
        text: 'Yes!! Having radio stations live on our profiles gives the platform that nostalgic 2000s magic with modern polish.',
        timestamp: '3 days ago',
        likes: 22,
        aiSafetyStatus: { safe: true }
      }
    ]
  },
  {
    id: 'blog_4',
    title: 'The 70% Creator Pool: How Autonomous Revenue Sharing Empowers Real People',
    slug: 'the-70-percent-creator-pool-explained',
    authorName: 'Face Space Core Team',
    authorUsername: 'facespace_dev',
    authorAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80',
    authorRole: 'Ecosystem & Ledger Team',
    category: 'Creator Economy',
    readTime: '7 min read',
    publishDate: 'Oct 20, 2026',
    coverImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=900&auto=format&fit=crop&q=80',
    excerpt: 'Traditional platforms take 70% to 100% of ad revenue. Here is how our transparent 70/20/10 ledger distributes real wealth to video creators and community scouts.',
    content: [
      'Big tech platforms extract value from users and creators, leaving creators begging for sponsorships. Face Space operates on an immutable 70/20/10 rule: 70% of all platform subscription and ad revenue is pooled directly to creators.',
      '20% is earmarked for device distribution and edge hosting, and 10% goes to research, developer students, and open AI safety initiatives.',
      'Every time a user joins VIP or a venue buys an ad spot, the smart ledger allocates funds immediately.'
    ],
    likes: 420,
    isLiked: true,
    shares: 112,
    tags: ['CreatorEconomy', 'Transparency', 'Disbursements', 'FairShare'],
    comments: [
      {
        id: 'bc_5',
        author: 'Alex Mercer',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
        text: 'This is the model the internet was always supposed to have. 70% direct to creators is unmatched.',
        timestamp: '5 days ago',
        likes: 35,
        aiSafetyStatus: { safe: true }
      }
    ]
  }
];

export const initialConversations: ChatConversation[] = [
  {
    id: 'conv_1',
    contactId: 'f1',
    contactName: 'Maya Lin',
    contactUsername: 'mayalin_music',
    contactAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    contactRole: 'Indie DJ & Sound Curator',
    isOnline: true,
    lastActive: 'Online now',
    unreadCount: 2,
    messages: [
      {
        id: 'm1_1',
        senderId: 'f1',
        senderName: 'Maya Lin',
        senderAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
        text: 'Hey Alex! Loved your profile track update. Is that the remix from Neon Vibe?',
        timestamp: '2:14 PM',
        isRead: true
      },
      {
        id: 'm1_2',
        senderId: 'user',
        senderName: 'Alex Mercer',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
        text: 'Yes exactly! Dropped it on my profile radio station. Are you spinning at Electric Velvet this Friday?',
        timestamp: '2:18 PM',
        isRead: true
      },
      {
        id: 'm1_3',
        senderId: 'f1',
        senderName: 'Maya Lin',
        senderAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
        text: 'I am! Taking the decks at 10 PM. Put you on the VIP list + 1 in case you bring a date 😉',
        timestamp: '2:25 PM',
        isRead: false
      },
      {
        id: 'm1_4',
        senderId: 'f1',
        senderName: 'Maya Lin',
        senderAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
        text: 'Also I previewed your new blog draft—the 1-hour date rule is pure gold.',
        timestamp: '2:26 PM',
        isRead: false
      }
    ]
  },
  {
    id: 'conv_2',
    contactId: 'f3',
    contactName: 'Sofia Reyes',
    contactUsername: 'sofia_dates',
    contactAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    contactRole: 'Wingwoman Extraordinaire',
    isOnline: true,
    lastActive: 'Active 5m ago',
    unreadCount: 0,
    messages: [
      {
        id: 'm2_1',
        senderId: 'f3',
        senderName: 'Sofia Reyes',
        senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
        text: 'Alex! Did you see the new Speakeasy check-in on the bulletin? That bookcase entrance looks unbelievable.',
        timestamp: 'Yesterday',
        isRead: true
      },
      {
        id: 'm2_2',
        senderId: 'user',
        senderName: 'Alex Mercer',
        senderAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
        text: 'I did! Saving it for my Friday night date. Used the AI Wingman for some icebreakers about record collecting too.',
        timestamp: 'Yesterday',
        isRead: true
      },
      {
        id: 'm2_3',
        senderId: 'f3',
        senderName: 'Sofia Reyes',
        senderAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
        text: 'You got this! Remember: genuine questions, no interview energy! Let me know how it goes! ✨',
        timestamp: 'Yesterday',
        isRead: true
      }
    ]
  },
  {
    id: 'conv_3',
    contactId: 'f8',
    contactName: 'Face Space AI Wingman',
    contactUsername: 'ai_wingman',
    contactAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80',
    contactRole: '24/7 AI Dating & Confidence Coach',
    isOnline: true,
    lastActive: 'Always online',
    unreadCount: 1,
    messages: [
      {
        id: 'm3_1',
        senderId: 'f8',
        senderName: 'Face Space AI Wingman',
        senderAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80',
        text: 'Good afternoon Alex! Your date confidence rating is at 89 Wings. Need any customized openers for today?',
        timestamp: '1:00 PM',
        isRead: true
      },
      {
        id: 'm3_2',
        senderId: 'f8',
        senderName: 'Face Space AI Wingman',
        senderAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80',
        text: 'Tip of the day: When your date mentions a favorite band, ask "What memory does that song bring up for you?" It shifts conversation from facts to deep emotions! 💡',
        timestamp: '1:01 PM',
        isRead: false
      }
    ]
  },
  {
    id: 'conv_4',
    contactId: 'f2',
    contactName: 'Jordan Vance',
    contactUsername: 'jordan_nightlife',
    contactAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    contactRole: 'Downtown Event Host',
    isOnline: false,
    lastActive: 'Active 2h ago',
    unreadCount: 0,
    messages: [
      {
        id: 'm4_1',
        senderId: 'f2',
        senderName: 'Jordan Vance',
        senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
        text: 'Rooftop Garden just hit 85% crowd level. Patio heaters are on. Perfect date spot tonight.',
        timestamp: '3 days ago',
        isRead: true
      }
    ]
  }
];

export const initialReels: ReelItem[] = [
  {
    id: 'reel_1',
    creatorName: 'Chloe Bennett',
    creatorUsername: 'chloe_b',
    creatorAvatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=80',
    isFollowing: false,
    title: '3 First Date Outfit Rules (That actually work)',
    caption: 'Never wear brand new shoes on a date! Rule #2 is the most important: dress for the venue vibe, not Pinterest expectations. What’s your go-to outfit?',
    tags: ['OutfitCheck', 'DateAdvice', 'StyleVibe', 'FaceSpace'],
    songTitle: 'Midnight City (Remix)',
    songArtist: 'Neon Vibe',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop&q=80',
    likes: 1240,
    isLiked: false,
    shares: 184,
    views: 8920,
    location: 'Austin Downtown Boutique',
    comments: [
      {
        id: 'rc_1',
        author: 'Sofia Reyes',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
        text: 'The layered leather jacket look is so clean! Taking notes for Friday.',
        timestamp: '2h ago',
        likes: 31,
        aiSafetyStatus: { safe: true }
      },
      {
        id: 'rc_2',
        author: 'Liam Chen',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
        text: 'Great lighting in this reel Chloe! High production quality.',
        timestamp: '1h ago',
        likes: 8,
        aiSafetyStatus: { safe: true }
      }
    ]
  },
  {
    id: 'reel_2',
    creatorName: 'Marcus Mixology',
    creatorUsername: 'marcus_b',
    creatorAvatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=200&auto=format&fit=crop&q=80',
    isFollowing: true,
    title: 'Secret Bartender Hacks for First Dates 🍸',
    caption: 'How to order for someone when they say "surprise me". Here is the foolproof 3-question method to guarantee they love the drink.',
    tags: ['Cocktails', 'Speakeasy', 'DateNightHacks', 'Mixology'],
    songTitle: 'Speakeasy Autumn Jazz',
    songArtist: 'The 6th Street Quintet',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=600&auto=format&fit=crop&q=80',
    likes: 2480,
    isLiked: true,
    shares: 412,
    views: 14500,
    location: 'Subterranean Speakeasy',
    comments: [
      {
        id: 'rc_3',
        author: 'Alex Mercer',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
        text: 'Saved this! Used the citrus vs smokey question and it broke the ice immediately.',
        timestamp: '4h ago',
        likes: 42,
        aiSafetyStatus: { safe: true }
      }
    ]
  },
  {
    id: 'reel_3',
    creatorName: 'Maya Lin',
    creatorUsername: 'mayalin_music',
    creatorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    isFollowing: true,
    title: 'Rooftop Sunset Soundcheck 🎧',
    caption: 'Setting up the synths for Friday sunset at Skyline Rooftop. The golden hour acoustics here are immaculate. Who is coming?',
    tags: ['LiveDJ', 'SunsetVibes', 'AustinMusic', 'DeepHouse'],
    songTitle: 'Golden Hour Reflections',
    songArtist: 'Maya Lin Live',
    videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    thumbnailUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80',
    likes: 1890,
    isLiked: false,
    shares: 230,
    views: 11200,
    location: 'Skyline Rooftop Garden',
    comments: [
      {
        id: 'rc_4',
        author: 'Jordan Vance',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
        text: 'Tables are already sold out for this set! Going to be electric.',
        timestamp: '3h ago',
        likes: 15,
        aiSafetyStatus: { safe: true }
      }
    ]
  }
];

export const initialCreatorStats: CreatorStats = {
  monthlyViews: 48900,
  totalFollowers: 3840,
  monthlyRevenueEstimate: 1420.50,
  pendingPayout: 384.20,
  subscribersCount: 89,
  engagementRate: 8.7,
  creatorRank: 'Verified Hotspot Ambassador'
};

