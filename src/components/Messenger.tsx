import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Send, 
  Phone, 
  Video, 
  MoreVertical, 
  Smile, 
  Paperclip, 
  Mic, 
  CheckCheck, 
  Bot, 
  Sparkles,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { ChatConversation, ChatMessage, UserProfile } from '../types';

interface MessengerProps {
  conversations: ChatConversation[];
  setConversations: React.Dispatch<React.SetStateAction<ChatConversation[]>>;
  profile: UserProfile;
}

export const Messenger: React.FC<MessengerProps> = ({
  conversations,
  setConversations,
  profile,
}) => {
  const [activeConvId, setActiveConvId] = useState<string>(conversations[0]?.id || 'conv_1');
  const [searchTerm, setSearchTerm] = useState('');
  const [newMessageText, setNewMessageText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const activeConversation = conversations.find(c => c.id === activeConvId) || conversations[0];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeConversation?.messages]);

  // Mark active conversation messages as read
  useEffect(() => {
    if (activeConvId) {
      setConversations(prev => prev.map(c => {
        if (c.id === activeConvId) {
          return {
            ...c,
            unreadCount: 0,
            messages: c.messages.map(m => ({ ...m, isRead: true }))
          };
        }
        return c;
      }));
    }
  }, [activeConvId]);

  const filteredConversations = conversations.filter(c => 
    c.contactName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.contactUsername.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || newMessageText).trim();
    if (!text || !activeConversation) return;

    const userMsg: ChatMessage = {
      id: 'm_' + Date.now(),
      senderId: 'user',
      senderName: profile.name,
      senderAvatar: profile.avatar,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: false,
    };

    // Update conversation
    setConversations(prev => prev.map(c => {
      if (c.id === activeConversation.id) {
        return {
          ...c,
          messages: [...c.messages, userMsg],
        };
      }
      return c;
    }));

    setNewMessageText('');

    // Simulate realistic response from the contact
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);

      let replyText = "That sounds awesome! Let's definitely coordinate for Friday.";
      if (activeConversation.contactId === 'f8') {
        // AI Wingman reply
        replyText = "Great point! Staying authentic and curious is your strongest asset on any date. Want me to draft a follow-up line?";
      } else if (activeConversation.contactId === 'f1') {
        replyText = "Can't wait! The sound system at Electric Velvet is sounding incredible tonight. Meet by the patio bar around 9:45?";
      } else if (activeConversation.contactId === 'f3') {
        replyText = "Love that energy! You have great taste in venues, let's keep the confidence high! 💃";
      }

      const contactMsg: ChatMessage = {
        id: 'reply_' + Date.now(),
        senderId: activeConversation.contactId,
        senderName: activeConversation.contactName,
        senderAvatar: activeConversation.contactAvatar,
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRead: true,
      };

      setConversations(prev => prev.map(c => {
        if (c.id === activeConversation.id) {
          return {
            ...c,
            messages: [...c.messages, contactMsg],
          };
        }
        return c;
      }));
    }, 1400);
  };

  const quickPrompts = [
    "Are you going to the rooftop tonight?",
    "That spot looks incredible!",
    "What's the password for the speakeasy door?",
    "Need any wingman advice for tomorrow?"
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Top Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6 bg-slate-900/80 p-4 rounded-2xl border border-slate-800 backdrop-blur-md">
        <div>
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <span>Face Space Messenger</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30 font-medium">
              Real-Time Direct
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Encrypted community chats, mutual match conversations, and instant Wingman coaching
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-emerald-400">
          <ShieldCheck className="w-4 h-4" />
          <span>AI Safety Shield Enabled #BetterTogether</span>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[620px]">
        {/* Left Sidebar: Conversations List */}
        <div className="md:col-span-4 border-r border-slate-800/80 flex flex-col bg-slate-950/60">
          {/* Search Contacts Bar */}
          <div className="p-3 border-b border-slate-800/80">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search friends & conversations..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-700/80 rounded-xl text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-pink-500"
              />
            </div>
          </div>

          {/* Conversations Scrollable List */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-800/40">
            {filteredConversations.map((conv) => {
              const lastMsg = conv.messages[conv.messages.length - 1];
              const isSelected = conv.id === activeConvId;

              return (
                <button
                  key={conv.id}
                  onClick={() => setActiveConvId(conv.id)}
                  className={`w-full p-3.5 flex items-start gap-3 transition text-left ${
                    isSelected 
                      ? 'bg-slate-800/90 border-l-4 border-pink-500' 
                      : 'hover:bg-slate-900/50'
                  }`}
                >
                  {/* Contact Avatar */}
                  <div className="relative shrink-0">
                    <img
                      src={conv.contactAvatar}
                      alt={conv.contactName}
                      referrerPolicy="no-referrer"
                      className="w-11 h-11 rounded-full object-cover border border-slate-700"
                    />
                    {conv.isOnline && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-slate-900" />
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-semibold text-xs text-slate-100 truncate">
                        {conv.contactName}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {lastMsg ? lastMsg.timestamp : ''}
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-400 truncate">
                      {lastMsg ? (
                        <span>
                          {lastMsg.senderId === 'user' ? 'You: ' : ''}
                          {lastMsg.text}
                        </span>
                      ) : (
                        'No messages yet'
                      )}
                    </p>
                  </div>

                  {/* Unread Pill */}
                  {conv.unreadCount > 0 && (
                    <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-pink-500 text-white shrink-0">
                      {conv.unreadCount}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Area: Active Conversation Thread */}
        <div className="md:col-span-8 flex flex-col bg-slate-900/40">
          {/* Active Contact Header */}
          <div className="p-3.5 border-b border-slate-800/80 flex items-center justify-between bg-slate-950/40">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={activeConversation.contactAvatar}
                  alt={activeConversation.contactName}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border border-slate-700"
                />
                {activeConversation.isOnline && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-slate-900" />
                )}
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm text-white">
                    {activeConversation.contactName}
                  </h3>
                  {activeConversation.contactId === 'f8' ? (
                    <span className="text-[9px] px-1.5 py-0.2 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded font-mono">
                      AI Coach
                    </span>
                  ) : (
                    <UserCheck className="w-3.5 h-3.5 text-cyan-400" />
                  )}
                </div>
                <p className="text-[11px] text-slate-400">
                  {activeConversation.contactRole || activeConversation.lastActive}
                </p>
              </div>
            </div>

            {/* Header Actions */}
            <div className="flex items-center gap-1">
              <button 
                onClick={() => alert(`Starting voice audio session with ${activeConversation.contactName}...`)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                title="Voice Call"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
              </button>
              <button 
                onClick={() => alert(`Starting face-to-face video session with ${activeConversation.contactName}...`)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
                title="Video Call"
              >
                <Video className="w-4 h-4 text-cyan-400" />
              </button>
            </div>
          </div>

          {/* Messages Bubble Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 max-h-[460px]">
            {activeConversation.messages.map((msg) => {
              const isUser = msg.senderId === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <img
                      src={msg.senderAvatar}
                      alt={msg.senderName}
                      referrerPolicy="no-referrer"
                      className="w-7 h-7 rounded-full object-cover border border-slate-700 shrink-0"
                    />
                  )}

                  <div
                    className={`max-w-[78%] sm:max-w-[70%] rounded-2xl p-3 shadow-md ${
                      isUser
                        ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white rounded-br-xs'
                        : 'bg-slate-800 text-slate-100 rounded-bl-xs border border-slate-700/60'
                    }`}
                  >
                    <p className="text-xs sm:text-sm leading-relaxed">{msg.text}</p>
                    <div className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${isUser ? 'text-pink-200' : 'text-slate-400'}`}>
                      <span>{msg.timestamp}</span>
                      {isUser && <CheckCheck className="w-3.5 h-3.5 text-cyan-300" />}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <img
                  src={activeConversation.contactAvatar}
                  alt={activeConversation.contactName}
                  referrerPolicy="no-referrer"
                  className="w-6 h-6 rounded-full object-cover"
                />
                <div className="bg-slate-800 px-3 py-2 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce delay-100" />
                  <span className="w-1.5 h-1.5 bg-pink-400 rounded-full animate-bounce delay-200" />
                  <span className="text-[11px] ml-1.5 text-slate-300">{activeConversation.contactName} is typing...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Bar */}
          <div className="px-4 py-2 bg-slate-950/40 border-t border-slate-800/60 overflow-x-auto flex items-center gap-2">
            <span className="text-[10px] text-slate-400 font-semibold shrink-0">Quick reply:</span>
            {quickPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(prompt)}
                className="text-[11px] px-2.5 py-1 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded-full border border-slate-700 whitespace-nowrap transition"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 border-t border-slate-800 bg-slate-950/80 flex items-center gap-2"
          >
            <button
              type="button"
              onClick={() => setNewMessageText(prev => prev + ' ✨ ')}
              className="p-2 text-slate-400 hover:text-pink-400 transition"
              title="Add emoji"
            >
              <Smile className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => alert('Photo & Audio clips attachments ready.')}
              className="p-2 text-slate-400 hover:text-cyan-400 transition"
              title="Attach media"
            >
              <Paperclip className="w-5 h-5" />
            </button>

            <input
              type="text"
              placeholder={`Message ${activeConversation.contactName}...`}
              value={newMessageText}
              onChange={(e) => setNewMessageText(e.target.value)}
              className="flex-1 bg-slate-900 border border-slate-700/80 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-pink-500"
            />

            <button
              type="submit"
              disabled={!newMessageText.trim()}
              className={`p-2.5 rounded-xl transition flex items-center justify-center ${
                newMessageText.trim()
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-md shadow-pink-500/25 hover:scale-105 active:scale-95'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
