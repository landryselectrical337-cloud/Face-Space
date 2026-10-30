import React, { useState } from 'react';
import { 
  Search, 
  RefreshCw, 
  Image, 
  MapPin, 
  Smile, 
  Send, 
  Heart, 
  MessageCircle, 
  Share2, 
  Sparkles, 
  ShieldCheck, 
  Tag, 
  Check, 
  Flame, 
  Radio, 
  Plus
} from 'lucide-react';
import { UserProfile, CommentItem } from '../types';

export interface FeedPost {
  id: string;
  authorName: string;
  authorUsername: string;
  authorAvatar: string;
  isVerified: boolean;
  content: string;
  imageUrl?: string;
  tags: string[];
  location?: string;
  mood?: string;
  timestamp: string;
  likes: number;
  isLiked?: boolean;
  shares: number;
  comments: CommentItem[];
}

interface SocialFeedProps {
  profile: UserProfile;
  onOpenWingmanWithPrompt?: (prompt: string) => void;
}

const initialFeedPosts: FeedPost[] = [
  {
    id: 'fp_1',
    authorName: 'Alex Mercer',
    authorUsername: 'alex_vibes',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80',
    isVerified: true,
    content: 'Checked out the hidden library door at Subterranean Speakeasy last night! Low-light velvet booths, 88.5 FM lofi radio playing in the background, and the best smoked old fashioned in town. 10/10 date spot if you want to actually hear each other talk! 🍸🕯️',
    imageUrl: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=900&auto=format&fit=crop&q=80',
    tags: ['Speakeasy', 'DateNight', 'Austin', 'Cocktails'],
    location: 'Subterranean Speakeasy, Austin TX',
    mood: '🍸 Chilling & Intimate',
    timestamp: '25 mins ago',
    likes: 48,
    isLiked: false,
    shares: 12,
    comments: [
      {
        id: 'fc_1',
        author: 'Maya Lin',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
        text: 'The velvet booths are so comfortable! Perfect recommendation.',
        timestamp: '18 mins ago',
        likes: 6,
        aiSafetyStatus: { safe: true }
      },
      {
        id: 'fc_2',
        author: 'Liam Chen',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
        text: 'Did they still require the bookshelf book pull to enter?',
        timestamp: '10 mins ago',
        likes: 3,
        aiSafetyStatus: { safe: true }
      }
    ]
  },
  {
    id: 'fp_2',
    authorName: 'Sofia Reyes',
    authorUsername: 'sofia_dates',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80',
    isVerified: true,
    content: 'Golden rule for first dates: meet for ONE cocktail or tea first. If the vibe is electric, you extend it. If not, nobody feels stuck during an awkward 3-course dinner! Your time and peace of mind are valuable ✨',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&auto=format&fit=crop&q=80',
    tags: ['FirstDate', 'DatingTips', 'Confidence', 'BetterTogether'],
    location: 'Congress Ave Rooftop',
    mood: '✨ Feeling Confident',
    timestamp: '1 hour ago',
    likes: 92,
    isLiked: true,
    shares: 34,
    comments: [
      {
        id: 'fc_3',
        author: 'Chloe Bennett',
        avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=200&auto=format&fit=crop&q=80',
        text: 'Preach Sofia! Low stakes = high confidence!',
        timestamp: '40 mins ago',
        likes: 14,
        aiSafetyStatus: { safe: true }
      }
    ]
  },
  {
    id: 'fp_3',
    authorName: 'Jordan Vance',
    authorUsername: 'jordan_nightlife',
    authorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    isVerified: true,
    content: 'Live DJ set confirmed for Skyline Rooftop this Friday! Patio heaters will be roaring, neon skyline views in full effect. Table reservations are opening up in our bulletin now! 🔥🎵',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=900&auto=format&fit=crop&q=80',
    tags: ['Nightlife', 'LiveMusic', 'Rooftop', 'Austin'],
    location: 'Skyline Rooftop Garden',
    mood: '🔥 Packed Floor',
    timestamp: '3 hours ago',
    likes: 64,
    isLiked: false,
    shares: 19,
    comments: []
  }
];

export const SocialFeed: React.FC<SocialFeedProps> = ({
  profile,
  onOpenWingmanWithPrompt,
}) => {
  const [posts, setPosts] = useState<FeedPost[]>(initialFeedPosts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshToast, setRefreshToast] = useState('');
  
  // Post Composer State
  const [newContent, setNewContent] = useState('');
  const [newTag, setNewTag] = useState('#DateNight');
  const [newLocation, setNewLocation] = useState('Austin, TX');
  const [newMood, setNewMood] = useState('✨ Feeling Confident');
  const [newImageUrl, setNewImageUrl] = useState('');
  const [isComposerOpen, setIsComposerOpen] = useState(false);

  // Active comment inputs keyed by post ID
  const [commentInputs, setCommentInputs] = useState<{ [postId: string]: string }>({});
  const [expandedComments, setExpandedComments] = useState<{ [postId: string]: boolean }>({
    'fp_1': true,
    'fp_2': true
  });

  const allTags = ['All', 'DateNight', 'Speakeasy', 'FirstDate', 'Austin', 'Cocktails', 'Nightlife', 'MusicVibes'];

  // Refresh Feed Handler
  const handleRefreshFeed = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Simulate live incoming post
      const incomingPost: FeedPost = {
        id: 'fp_' + Date.now(),
        authorName: 'Maya Lin',
        authorUsername: 'mayalin_music',
        authorAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
        isVerified: true,
        content: 'Just dropped a fresh live remix on our 88.5 FM Lofi Moon Lounge station! Put your headphones on and tune in from your profile! 🎧✨',
        imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=900&auto=format&fit=crop&q=80',
        tags: ['MusicVibes', 'Radio', 'DateNight'],
        location: 'Sound Collective Studio',
        mood: '🎵 In the Groove',
        timestamp: 'Just now',
        likes: 12,
        isLiked: false,
        shares: 4,
        comments: []
      };

      setPosts([incomingPost, ...posts]);
      setIsRefreshing(false);
      setRefreshToast('Feed refreshed! Fresh posts and radio updates loaded.');
      setTimeout(() => setRefreshToast(''), 3000);
    }, 800);
  };

  // Submit Post
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    const createdPost: FeedPost = {
      id: 'fp_' + Date.now(),
      authorName: profile.name,
      authorUsername: profile.username,
      authorAvatar: profile.avatar,
      isVerified: true,
      content: newContent.trim(),
      imageUrl: newImageUrl.trim() || undefined,
      tags: [newTag.replace('#', '')],
      location: newLocation,
      mood: newMood,
      timestamp: 'Just now',
      likes: 1,
      isLiked: true,
      shares: 0,
      comments: []
    };

    setPosts([createdPost, ...posts]);
    setNewContent('');
    setNewImageUrl('');
    setIsComposerOpen(false);
  };

  // Like Toggle
  const handleToggleLike = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const nextLiked = !p.isLiked;
        return {
          ...p,
          isLiked: nextLiked,
          likes: nextLiked ? p.likes + 1 : p.likes - 1
        };
      }
      return p;
    }));
  };

  // Add Comment to Post
  const handleAddComment = (postId: string) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;

    const newComment: CommentItem = {
      id: 'c_' + Date.now(),
      author: profile.name,
      avatar: profile.avatar,
      text,
      timestamp: 'Just now',
      likes: 0,
      aiSafetyStatus: { safe: true }
    };

    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [...p.comments, newComment]
        };
      }
      return p;
    }));

    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
    setExpandedComments(prev => ({ ...prev, [postId]: true }));
  };

  // Filter posts by search query and tag
  const filteredPosts = posts.filter(post => {
    const matchesTag = selectedTag === 'All' || post.tags.includes(selectedTag);
    const matchesQuery = 
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.authorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (post.location && post.location.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTag && matchesQuery;
  });

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">

      {/* Search Bar & Refresh Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-900/80 p-3.5 rounded-2xl border border-slate-800 backdrop-blur-md shadow-xl">
        {/* Search Input */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search posts, topics, #hashtags, venues..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 transition"
          />
        </div>

        {/* Refresh Feed Button */}
        <button
          onClick={handleRefreshFeed}
          disabled={isRefreshing}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700/80 transition shadow-sm w-full sm:w-auto justify-center"
          title="Refresh feed with latest posts and live activity"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>{isRefreshing ? 'Updating Feed...' : 'Refresh Feed'}</span>
        </button>
      </div>

      {/* Refresh Toast Notification */}
      {refreshToast && (
        <div className="p-3 bg-cyan-950 border border-cyan-500/50 rounded-xl text-cyan-200 text-xs font-semibold flex items-center gap-2 shadow-lg animate-fadeIn">
          <Check className="w-4 h-4 text-cyan-400" />
          <span>{refreshToast}</span>
        </div>
      )}

      {/* Tag Filtering Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider shrink-0 flex items-center gap-1">
          <Tag className="w-3.5 h-3.5 text-pink-400" />
          <span>Tags:</span>
        </span>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              selectedTag === tag
                ? 'bg-pink-600 text-white shadow-md shadow-pink-500/25'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            {tag === 'All' ? 'All Posts' : `#${tag}`}
          </button>
        ))}
      </div>

      {/* Post Composer Card */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 shadow-xl backdrop-blur-md">
        <div className="flex items-start gap-3">
          <img
            src={profile.avatar}
            alt={profile.name}
            referrerPolicy="no-referrer"
            className="w-10 h-10 rounded-full object-cover border-2 border-pink-500 shrink-0"
          />
          <div className="flex-1">
            <button
              onClick={() => setIsComposerOpen(true)}
              className="w-full text-left px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 hover:text-slate-200 hover:border-slate-700 transition"
            >
              Share date night recommendations, venue check-ins or thoughts, {profile.name}...
            </button>
          </div>
        </div>

        {/* Quick Media / Wingman Action Row */}
        <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-800/80 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsComposerOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 transition text-[11px]"
            >
              <Image className="w-3.5 h-3.5 text-emerald-400" />
              <span>Photo</span>
            </button>
            <button
              onClick={() => setIsComposerOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 transition text-[11px]"
            >
              <MapPin className="w-3.5 h-3.5 text-pink-400" />
              <span>Check-in</span>
            </button>
          </div>

          <button
            onClick={() => onOpenWingmanWithPrompt?.('Give me a funny date story opener for the feed!')}
            className="flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 font-semibold"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
            <span>Wingman Idea</span>
          </button>
        </div>
      </div>

      {/* Expanded Post Creator Modal */}
      {isComposerOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-slate-900 border border-pink-500/40 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Plus className="w-4 h-4 text-pink-400" />
                <span>Create Community Post</span>
              </h3>
              <button
                onClick={() => setIsComposerOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4 text-xs">
              <div>
                <textarea
                  placeholder="Share a hotspot tip, date observation, or music recommendation..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  rows={4}
                  required
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 text-xs sm:text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Hashtag Topic</label>
                  <select
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-pink-500"
                  >
                    <option value="#DateNight">#DateNight</option>
                    <option value="#Speakeasy">#Speakeasy</option>
                    <option value="#FirstDate">#FirstDate</option>
                    <option value="#MusicVibes">#MusicVibes</option>
                    <option value="#Cocktails">#Cocktails</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Current Mood / Vibe</label>
                  <select
                    value={newMood}
                    onChange={(e) => setNewMood(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-pink-500"
                  >
                    <option value="✨ Feeling Confident">✨ Feeling Confident</option>
                    <option value="🍸 Chilling & Intimate">🍸 Chilling & Intimate</option>
                    <option value="🔥 Packed Floor">🔥 Packed Floor</option>
                    <option value="🎵 In the Groove">🎵 In the Groove</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Location Check-in</label>
                <input
                  type="text"
                  placeholder="Venue name & city (e.g. Electric Velvet Lounge, Austin)"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Image URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsComposerOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold transition shadow-md shadow-pink-500/25"
                >
                  Publish Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Feed Posts List */}
      <div className="space-y-5">
        {filteredPosts.length === 0 ? (
          <div className="text-center py-12 bg-slate-900/60 rounded-2xl border border-slate-800 p-8 space-y-3">
            <Search className="w-8 h-8 text-slate-500 mx-auto" />
            <h4 className="text-white font-bold text-sm">No matching posts found</h4>
            <p className="text-xs text-slate-400">Try adjusting your search keyword or selected tag.</p>
            <button
              onClick={() => { setSelectedTag('All'); setSearchQuery(''); }}
              className="text-xs text-pink-400 hover:underline font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-slate-900/90 rounded-2xl border border-slate-800/80 shadow-xl overflow-hidden backdrop-blur-md transition hover:border-slate-700"
            >
              {/* Post Header */}
              <div className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={post.authorAvatar}
                    alt={post.authorName}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover border border-slate-700 shrink-0"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm text-white">{post.authorName}</span>
                      {post.isVerified && (
                        <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" title="18+ Verified Member" />
                      )}
                      <span className="text-slate-500 text-xs">@{post.authorUsername}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <span>{post.timestamp}</span>
                      {post.location && (
                        <>
                          <span>·</span>
                          <span className="flex items-center gap-1 text-pink-300">
                            <MapPin className="w-3 h-3" />
                            {post.location}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {post.mood && (
                  <span className="text-[11px] font-medium text-slate-300 px-2 py-0.5 rounded-full bg-slate-950 border border-slate-800">
                    {post.mood}
                  </span>
                )}
              </div>

              {/* Post Body Content */}
              <div className="px-4 pb-3 space-y-3">
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {post.content}
                </p>

                {/* Hashtags */}
                <div className="flex flex-wrap gap-1.5">
                  {post.tags.map((tag, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedTag(tag)}
                      className="text-[11px] font-medium text-cyan-300 hover:text-cyan-200 cursor-pointer"
                    >
                      #{tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Post Attached Image */}
              {post.imageUrl && (
                <div className="max-h-96 w-full overflow-hidden bg-slate-950">
                  <img
                    src={post.imageUrl}
                    alt="Post media"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover hover:scale-102 transition duration-500"
                  />
                </div>
              )}

              {/* Action Buttons Row */}
              <div className="p-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-4">
                  {/* Like Button */}
                  <button
                    onClick={() => handleToggleLike(post.id)}
                    className={`flex items-center gap-1.5 transition cursor-pointer ${
                      post.isLiked ? 'text-pink-400 font-bold' : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-pink-500' : ''}`} />
                    <span>{post.likes}</span>
                  </button>

                  {/* Comment Button */}
                  <button
                    onClick={() => setExpandedComments(prev => ({ ...prev, [post.id]: !prev[post.id] }))}
                    className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 transition cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.comments.length}</span>
                  </button>

                  {/* Share Button */}
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText?.(window.location.href);
                      alert('Post link copied to clipboard!');
                    }}
                    className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 transition cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>{post.shares}</span>
                  </button>
                </div>

                <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-mono">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>AI Shield Verified</span>
                </div>
              </div>

              {/* Comments Section */}
              {expandedComments[post.id] && (
                <div className="bg-slate-950/60 p-4 border-t border-slate-800/60 space-y-3">
                  {/* Existing Comments */}
                  <div className="space-y-2">
                    {post.comments.map((comment) => (
                      <div key={comment.id} className="flex items-start gap-2.5 text-xs">
                        <img
                          src={comment.avatar}
                          alt={comment.author}
                          referrerPolicy="no-referrer"
                          className="w-7 h-7 rounded-full object-cover shrink-0 border border-slate-700"
                        />
                        <div className="flex-1 bg-slate-900 p-2.5 rounded-xl border border-slate-800">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-white text-[11px]">{comment.author}</span>
                            <span className="text-[10px] text-slate-400">{comment.timestamp}</span>
                          </div>
                          <p className="text-slate-300 text-xs leading-relaxed">{comment.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Write Comment Box */}
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      value={commentInputs[post.id] || ''}
                      onChange={(e) => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddComment(post.id);
                        }
                      }}
                      className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
                    />
                    <button
                      onClick={() => handleAddComment(post.id)}
                      disabled={!commentInputs[post.id]?.trim()}
                      className="p-2 rounded-xl bg-pink-600 disabled:bg-slate-800 text-white transition hover:bg-pink-500"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>

    </div>
  );
};
