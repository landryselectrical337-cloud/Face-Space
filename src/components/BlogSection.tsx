import React, { useState } from 'react';
import { 
  BookOpen, 
  Heart, 
  MessageCircle, 
  Share2, 
  Calendar, 
  Clock, 
  Tag, 
  Send, 
  Plus, 
  Sparkles, 
  X, 
  UserCheck, 
  Check, 
  ArrowRight
} from 'lucide-react';
import { BlogPost, CommentItem, UserProfile } from '../types';

interface BlogSectionProps {
  posts: BlogPost[];
  setPosts: React.Dispatch<React.SetStateAction<BlogPost[]>>;
  profile: UserProfile;
}

export const BlogSection: React.FC<BlogSectionProps> = ({
  posts,
  setPosts,
  profile,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeArticle, setActiveArticle] = useState<BlogPost | null>(null);
  const [newCommentText, setNewCommentText] = useState('');
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  // New post form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<BlogPost['category']>('Dating Advice');
  const [newExcerpt, setNewExcerpt] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCover, setNewCover] = useState('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&auto=format&fit=crop&q=80');

  const categories = ['All', 'Dating Advice', 'City Hotspots', 'Music & Culture', 'Creator Economy', 'Style & Vibe'];

  const filteredPosts = selectedCategory === 'All'
    ? posts
    : posts.filter(p => p.category === selectedCategory);

  const handleToggleLike = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id === postId) {
        const nextLiked = !p.isLiked;
        return {
          ...p,
          isLiked: nextLiked,
          likes: nextLiked ? p.likes + 1 : p.likes - 1,
        };
      }
      return p;
    }));

    if (activeArticle && activeArticle.id === postId) {
      setActiveArticle(prev => prev ? {
        ...prev,
        isLiked: !prev.isLiked,
        likes: !prev.isLiked ? prev.likes + 1 : prev.likes - 1,
      } : null);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim() || !activeArticle) return;

    const newComment: CommentItem = {
      id: 'bc_' + Date.now(),
      author: profile.name,
      avatar: profile.avatar,
      text: newCommentText.trim(),
      timestamp: 'Just now',
      likes: 0,
      aiSafetyStatus: { safe: true },
    };

    const updatedComments = [newComment, ...activeArticle.comments];

    setPosts(prev => prev.map(p => p.id === activeArticle.id ? { ...p, comments: updatedComments } : p));
    setActiveArticle(prev => prev ? { ...prev, comments: updatedComments } : null);
    setNewCommentText('');
  };

  const handlePublishPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const paragraphs = newContent.split('\n\n').filter(p => p.trim().length > 0);

    const created: BlogPost = {
      id: 'blog_' + Date.now(),
      title: newTitle.trim(),
      slug: newTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      authorName: profile.name,
      authorUsername: profile.username,
      authorAvatar: profile.avatar,
      authorRole: 'Face Space Community Creator',
      category: newCategory,
      readTime: '4 min read',
      publishDate: 'Today',
      coverImage: newCover,
      excerpt: newExcerpt.trim() || paragraphs[0] || '',
      content: paragraphs,
      likes: 1,
      isLiked: true,
      shares: 0,
      tags: ['CommunityPost', newCategory.replace(/\s+/g, '')],
      comments: [],
    };

    setPosts([created, ...posts]);
    setIsPublishModalOpen(false);
    setNewTitle('');
    setNewExcerpt('');
    setNewContent('');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
      {/* Blog Hub Hero */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-gradient-to-r from-purple-950 via-slate-900 to-pink-950 p-6 rounded-3xl border border-pink-500/30 shadow-2xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/40">
              Community Voices & Articles
            </span>
            <span className="text-xs text-slate-400 font-mono">70% Creator Supported</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Face Space Community Blog
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mt-1">
            Real stories, nightlife guides, date psychology, and transparent creator economy essays.
          </p>
        </div>

        <button
          onClick={() => setIsPublishModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-pink-500/25 transition active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Write Story</span>
        </button>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
              selectedCategory === cat
                ? 'bg-pink-600 text-white shadow-md shadow-pink-500/25'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.map((post) => (
          <article
            key={post.id}
            className="group bg-slate-900/90 rounded-2xl border border-slate-800 hover:border-pink-500/50 shadow-xl overflow-hidden backdrop-blur-md flex flex-col transition duration-300"
          >
            {/* Cover Image */}
            <div className="relative h-48 w-full overflow-hidden bg-slate-950 cursor-pointer" onClick={() => setActiveArticle(post)}>
              <img
                src={post.coverImage}
                alt={post.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-pink-300 text-[10px] font-bold border border-pink-500/30">
                {post.category}
              </div>
            </div>

            {/* Card Content */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-500" />
                    {post.publishDate}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-500" />
                    {post.readTime}
                  </span>
                </div>

                <h3 
                  onClick={() => setActiveArticle(post)}
                  className="font-bold text-base text-white hover:text-pink-300 transition cursor-pointer line-clamp-2 leading-snug"
                >
                  {post.title}
                </h3>

                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              {/* Author & Stats Footer */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <img
                    src={post.authorAvatar}
                    alt={post.authorName}
                    referrerPolicy="no-referrer"
                    className="w-7 h-7 rounded-full object-cover border border-slate-700"
                  />
                  <div>
                    <span className="font-semibold text-xs text-slate-200 block">{post.authorName}</span>
                    <span className="text-[10px] text-slate-400 line-clamp-1">{post.authorRole}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-400">
                  <button
                    onClick={() => handleToggleLike(post.id)}
                    className={`flex items-center gap-1 hover:text-pink-400 transition ${post.isLiked ? 'text-pink-400' : ''}`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${post.isLiked ? 'fill-pink-500' : ''}`} />
                    <span>{post.likes}</span>
                  </button>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>{post.comments.length}</span>
                  </span>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Full Article Reader Modal */}
      {activeArticle && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="max-w-3xl w-full bg-slate-900 border-2 border-slate-800 rounded-3xl overflow-hidden shadow-2xl relative my-auto max-h-[92vh] flex flex-col">
            {/* Header Close */}
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80 sticky top-0 z-10">
              <span className="text-xs font-bold text-pink-400 uppercase tracking-wider">
                {activeArticle.category}
              </span>
              <button
                onClick={() => setActiveArticle(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Article Scroll Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
              {/* Cover Banner */}
              <div className="h-64 w-full rounded-2xl overflow-hidden bg-slate-950">
                <img
                  src={activeArticle.coverImage}
                  alt={activeArticle.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title & Metadata */}
              <div className="space-y-3">
                <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                  {activeArticle.title}
                </h1>

                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800 text-xs text-slate-400">
                  <div className="flex items-center gap-3">
                    <img
                      src={activeArticle.authorAvatar}
                      alt={activeArticle.authorName}
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 rounded-full object-cover border border-slate-700"
                    />
                    <div>
                      <span className="font-bold text-white text-sm block">{activeArticle.authorName}</span>
                      <span className="text-slate-400 text-xs">{activeArticle.authorRole}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs">
                    <span>{activeArticle.publishDate}</span>
                    <span>·</span>
                    <span>{activeArticle.readTime}</span>
                  </div>
                </div>
              </div>

              {/* Formatted Article Content */}
              <div className="space-y-4 text-sm sm:text-base text-slate-200 leading-relaxed font-sans">
                {activeArticle.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-4">
                {activeArticle.tags.map((tag, i) => (
                  <span key={i} className="text-xs px-2.5 py-1 rounded-full bg-slate-950 border border-slate-800 text-cyan-300">
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Reactions & Engagement */}
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => handleToggleLike(activeArticle.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition ${
                      activeArticle.isLiked
                        ? 'bg-pink-950/60 border-pink-500 text-pink-300'
                        : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${activeArticle.isLiked ? 'fill-pink-500' : ''}`} />
                    <span>{activeArticle.likes} Likes</span>
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText?.(window.location.href);
                      alert('Story link copied to clipboard!');
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700 transition"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share Story</span>
                  </button>
                </div>

                <span className="text-xs text-slate-400">{activeArticle.comments.length} Comments</span>
              </div>

              {/* Comments Section */}
              <div className="space-y-4 pt-2">
                <h3 className="font-bold text-white text-base">
                  Discussion & Replies ({activeArticle.comments.length})
                </h3>

                <form onSubmit={handleAddComment} className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Add to the conversation..."
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
                  />
                  <button
                    type="submit"
                    disabled={!newCommentText.trim()}
                    className="px-4 py-2.5 rounded-xl bg-pink-600 disabled:bg-slate-800 text-white text-xs font-semibold transition"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>

                <div className="space-y-3">
                  {activeArticle.comments.map((comment) => (
                    <div key={comment.id} className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 flex items-start gap-3">
                      <img
                        src={comment.avatar}
                        alt={comment.author}
                        referrerPolicy="no-referrer"
                        className="w-8 h-8 rounded-full object-cover border border-slate-700 shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-bold text-xs text-white">{comment.author}</span>
                          <span className="text-[10px] text-slate-400">{comment.timestamp}</span>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed">{comment.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Publish Article Modal */}
      {isPublishModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-slate-900 border border-pink-500/40 rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-pink-400" />
                <span>Write Community Blog Post</span>
              </h3>
              <button
                onClick={() => setIsPublishModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handlePublishPost} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Article Headline</label>
                <input
                  type="text"
                  placeholder="e.g. 5 Signs Your Date Has Real Potential"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Category</label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as BlogPost['category'])}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-pink-500"
                >
                  <option value="Dating Advice">Dating Advice</option>
                  <option value="City Hotspots">City Hotspots</option>
                  <option value="Music & Culture">Music & Culture</option>
                  <option value="Creator Economy">Creator Economy</option>
                  <option value="Style & Vibe">Style & Vibe</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Short Excerpt</label>
                <input
                  type="text"
                  placeholder="A one-sentence hook for the feed cards..."
                  value={newExcerpt}
                  onChange={(e) => setNewExcerpt(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Article Body (Separate paragraphs with blank lines)</label>
                <textarea
                  placeholder="Write your story, advice or venue review here..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  rows={6}
                  required
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Cover Image URL</label>
                <input
                  type="url"
                  value={newCover}
                  onChange={(e) => setNewCover(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-pink-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsPublishModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-bold transition shadow-md shadow-pink-500/25"
                >
                  Publish Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
