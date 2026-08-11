import React, { useState } from 'react';
import { 
  X, 
  Minus, 
  Maximize2, 
  Music, 
  Tv, 
  Globe, 
  ExternalLink, 
  Move,
  Plus,
  Compass
} from 'lucide-react';
import { SocialAppWindow } from '../types';

interface MiniWindowsProps {
  apps: SocialAppWindow[];
  setApps: React.Dispatch<React.SetStateAction<SocialAppWindow[]>>;
}

export const MiniWindows: React.FC<MiniWindowsProps> = ({
  apps,
  setApps,
}) => {
  const [customTitle, setCustomTitle] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [showAddCustom, setShowAddCustom] = useState(false);

  const toggleOpen = (id: string) => {
    setApps(prev => prev.map(a => a.id === id ? { ...a, isOpen: !a.isOpen, isMinimized: false } : a));
  };

  const toggleMinimize = (id: string) => {
    setApps(prev => prev.map(a => a.id === id ? { ...a, isMinimized: !a.isMinimized } : a));
  };

  const closeWindow = (id: string) => {
    setApps(prev => prev.map(a => a.id === id ? { ...a, isOpen: false } : a));
  };

  const handleAddCustomApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customUrl.trim()) return;

    let embedUrl = customUrl;
    // Format YouTube links if full URL is pasted
    if (customUrl.includes('youtube.com/watch?v=')) {
      const v = customUrl.split('v=')[1]?.split('&')[0];
      if (v) embedUrl = `https://www.youtube.com/embed/${v}`;
    }

    const newApp: SocialAppWindow = {
      id: 'app_' + Date.now(),
      title: customTitle || 'Custom Media Hub',
      icon: '🌐',
      embedType: 'custom',
      url: embedUrl,
      isOpen: true,
      isMinimized: false,
      position: { x: 100, y: 120 },
      size: { width: 420, height: 380 },
    };

    setApps([...apps, newApp]);
    setCustomTitle('');
    setCustomUrl('');
    setShowAddCustom(false);
  };

  const activeApps = apps.filter(a => a.isOpen);

  return (
    <>
      {/* Floating Mini Window Dock Bar on Bottom-Right */}
      <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 bg-slate-950/90 border-2 border-pink-500/50 p-2 rounded-2xl shadow-2xl backdrop-blur-md text-xs">
        <span className="text-[10px] font-bold text-pink-400 px-1 uppercase tracking-wider hidden sm:inline">
          Social Hub Windows:
        </span>

        {apps.map(app => (
          <button
            key={app.id}
            onClick={() => toggleOpen(app.id)}
            className={`px-2.5 py-1.5 rounded-xl flex items-center gap-1.5 transition font-semibold text-xs ${
              app.isOpen
                ? 'bg-pink-600 text-white shadow-md shadow-pink-500/30'
                : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
            }`}
          >
            <span>{app.icon}</span>
            <span className="hidden md:inline">{app.title.split(' ')[0]}</span>
          </button>
        ))}

        <button
          onClick={() => setShowAddCustom(!showAddCustom)}
          className="p-2 rounded-xl bg-purple-950 border border-purple-500/40 text-purple-300 hover:bg-purple-900 transition"
          title="Add Custom Social / Embed URL"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Add Custom Social Embed Modal Drawer */}
      {showAddCustom && (
        <div className="fixed bottom-16 right-4 z-50 w-80 bg-slate-900 border-2 border-purple-500 rounded-2xl p-4 shadow-2xl space-y-3 text-xs text-slate-100">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h4 className="font-bold text-white flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-purple-400" />
              <span>Open Custom Social Embed</span>
            </h4>
            <button onClick={() => setShowAddCustom(false)} className="text-slate-400 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          </div>

          <form onSubmit={handleAddCustomApp} className="space-y-2">
            <div>
              <label className="text-[10px] text-slate-400 block mb-0.5">Window Title</label>
              <input
                type="text"
                placeholder="e.g. My Spotify Playlist / Twitch Channel"
                value={customTitle}
                onChange={e => setCustomTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-1.5 text-xs text-white"
              />
            </div>
            <div>
              <label className="text-[10px] text-slate-400 block mb-0.5">Embed URL *</label>
              <input
                type="text"
                placeholder="https://open.spotify.com/embed/... or YouTube URL"
                value={customUrl}
                onChange={e => setCustomUrl(e.target.value)}
                required
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-1.5 text-xs text-white"
              />
            </div>

            <button
              type="submit"
              className="w-full py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-bold transition"
            >
              Open Floating Mini Window
            </button>
          </form>
        </div>
      )}

      {/* Render Active Floating Windows */}
      {activeApps.map((app, index) => {
        if (app.isMinimized) return null;

        // Cascade positions slightly if multiple
        const posX = app.position.x + index * 20;
        const posY = app.position.y + index * 20;

        return (
          <div
            key={app.id}
            style={{
              top: `${posY}px`,
              left: `${posX}px`,
              width: `${app.size.width}px`,
              height: `${app.size.height}px`,
            }}
            className="fixed z-40 bg-slate-950 border-2 border-pink-500/60 rounded-2xl shadow-2xl flex flex-col overflow-hidden resize min-w-[300px] min-h-[220px]"
          >
            {/* Window Titlebar */}
            <div className="bg-slate-900 px-3 py-2 border-b border-slate-800 flex items-center justify-between cursor-move select-none">
              <div className="flex items-center gap-2">
                <span className="text-sm">{app.icon}</span>
                <span className="font-bold text-xs text-white truncate max-w-[200px]">
                  {app.title}
                </span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => toggleMinimize(app.id)}
                  className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
                  title="Minimize"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => closeWindow(app.id)}
                  className="p-1 text-slate-400 hover:text-red-400 rounded hover:bg-slate-800"
                  title="Close Window"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Window Content Body */}
            <div className="flex-1 bg-black/90 relative overflow-hidden">
              <iframe
                src={app.url}
                width="100%"
                height="100%"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                title={app.title}
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        );
      })}
    </>
  );
};
