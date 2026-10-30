import React, { useState, useEffect, useRef } from 'react';
import { 
  Radio, 
  Music, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  RadioTower, 
  Disc3, 
  Headphones, 
  Sparkles,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { RadioStation, UserProfile } from '../types';
import { radioStations } from '../data/mockData';

interface ProfileRadioPlayerProps {
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  isOwner?: boolean;
}

export const ProfileRadioPlayer: React.FC<ProfileRadioPlayerProps> = ({
  profile,
  setProfile,
  isOwner = true
}) => {
  const currentStation = radioStations.find(s => s.id === (profile.radioStationId || 'radio_lofi')) || radioStations[0];
  const [mode, setMode] = useState<'radio' | 'song'>(profile.audioMode || 'radio');
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [isStationSelectorOpen, setIsStationSelectorOpen] = useState(false);
  
  // Audio element reference for ambient streams / audio
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  // Web Audio synth fallback generator for instant retro synthesizer radio
  const audioCtxRef = useRef<AudioContext | null>(null);
  const synthNodesRef = useRef<{ osc1?: OscillatorNode; osc2?: OscillatorNode; gain?: GainNode } | null>(null);

  // Sync mode changes with profile
  const handleModeChange = (newMode: 'radio' | 'song') => {
    setMode(newMode);
    setProfile(prev => ({
      ...prev,
      audioMode: newMode
    }));
  };

  // Station switch
  const handleStationSelect = (stationId: string) => {
    setProfile(prev => ({
      ...prev,
      radioStationId: stationId
    }));
    setIsStationSelectorOpen(false);
  };

  const startSynthVibe = () => {
    try {
      if (!audioCtxRef.current) {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioContextClass();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      // Stop previous nodes if active
      if (synthNodesRef.current?.gain) {
        synthNodesRef.current.gain.disconnect();
      }

      const ctx = audioCtxRef.current;
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(isMuted ? 0 : volume * 0.12, ctx.currentTime);
      masterGain.connect(ctx.destination);

      // Create warm dual chord oscillator for authentic radio ambiance
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();

      const baseFreq = mode === 'radio' 
        ? (currentStation.id === 'radio_synth' ? 146.83 : currentStation.id === 'radio_jazz' ? 130.81 : 164.81)
        : 220.00;

      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(baseFreq, ctx.currentTime);

      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(baseFreq * 1.5, ctx.currentTime);

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(masterGain);

      osc1.start();
      osc2.start();

      synthNodesRef.current = { osc1, osc2, gain: masterGain };
    } catch {
      // AudioContext autoplay restriction handled silently
    }
  };

  const stopSynthVibe = () => {
    if (synthNodesRef.current?.gain && audioCtxRef.current) {
      try {
        synthNodesRef.current.gain.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
        synthNodesRef.current.osc1?.stop();
        synthNodesRef.current.osc2?.stop();
        synthNodesRef.current.osc1?.disconnect();
        synthNodesRef.current.osc2?.disconnect();
      } catch {
        // Ignored
      }
      synthNodesRef.current = null;
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      stopSynthVibe();
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      // Attempt audio stream playback with synth backup
      if (audioRef.current) {
        audioRef.current.volume = isMuted ? 0 : volume;
        audioRef.current.play().catch(() => {
          // If browser restricts audio stream URL, kick off the synth stream
          startSynthVibe();
        });
      } else {
        startSynthVibe();
      }
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
    if (synthNodesRef.current?.gain && audioCtxRef.current) {
      synthNodesRef.current.gain.gain.setValueAtTime(isMuted ? 0 : volume * 0.12, audioCtxRef.current.currentTime);
    }
  }, [volume, isMuted]);

  useEffect(() => {
    if (isPlaying) {
      stopSynthVibe();
      if (audioRef.current) {
        audioRef.current.src = mode === 'radio' ? currentStation.streamAudioUrl : (profile.currentSong.audioUrl || currentStation.streamAudioUrl);
        audioRef.current.play().catch(() => {
          startSynthVibe();
        });
      }
    }
  }, [currentStation.id, mode]);

  useEffect(() => {
    return () => {
      stopSynthVibe();
    };
  }, []);

  return (
    <div className="relative rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl overflow-hidden backdrop-blur-md p-4 transition-all">
      {/* Hidden audio element */}
      <audio 
        ref={audioRef} 
        loop 
        src={mode === 'radio' ? currentStation.streamAudioUrl : (profile.currentSong.audioUrl || currentStation.streamAudioUrl)} 
      />

      {/* Header bar: Mode switcher (Radio Station vs Personal Song) */}
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-400">
            {mode === 'radio' ? <Radio className="w-4 h-4" /> : <Music className="w-4 h-4" />}
          </div>
          <div>
            <span className="text-xs font-bold text-slate-200">
              {mode === 'radio' ? 'Profile Live Radio' : 'Personal Profile Track'}
            </span>
            <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span>{isPlaying ? 'Broadcasting Now' : 'Station Ready'}</span>
              <span>·</span>
              <span className="text-pink-400 font-mono">{currentStation.frequency}</span>
            </div>
          </div>
        </div>

        {/* Audio Mode Switcher */}
        <div className="flex items-center bg-slate-950 p-0.5 rounded-lg border border-slate-800">
          <button
            onClick={() => handleModeChange('radio')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium transition ${
              mode === 'radio'
                ? 'bg-pink-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Radio className="w-3 h-3" />
            <span>Radio</span>
          </button>
          <button
            onClick={() => handleModeChange('song')}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-medium transition ${
              mode === 'song'
                ? 'bg-purple-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Music className="w-3 h-3" />
            <span>My Song</span>
          </button>
        </div>
      </div>

      {/* Main Track / Station Info Area */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* Album Art / Radio Tower Disc */}
        <div className="relative group shrink-0">
          <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl overflow-hidden border border-slate-700 shadow-md relative bg-slate-950">
            <img
              src={mode === 'radio' ? profile.currentSong.albumArt : profile.currentSong.albumArt}
              alt="Track Art"
              referrerPolicy="no-referrer"
              className={`w-full h-full object-cover transition-transform duration-700 ${isPlaying ? 'scale-105' : 'scale-100 opacity-80'}`}
            />
            {/* Spinning vinyl center badge */}
            <div className="absolute inset-0 bg-slate-950/30 flex items-center justify-center">
              <Disc3 className={`w-8 h-8 text-pink-400/90 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '4s' }} />
            </div>
          </div>

          {/* Quick Play/Pause Overlay */}
          <button
            onClick={togglePlay}
            className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white flex items-center justify-center shadow-lg shadow-pink-500/30 hover:scale-110 active:scale-95 transition"
            title={isPlaying ? 'Pause Profile Audio' : 'Play Profile Audio'}
          >
            {isPlaying ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
          </button>
        </div>

        {/* Track / Station Details */}
        <div className="flex-1 min-w-0 text-center sm:text-left">
          {mode === 'radio' ? (
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <span className="text-[10px] font-bold tracking-wider text-pink-400 uppercase bg-pink-500/10 px-2 py-0.5 rounded border border-pink-500/30">
                  {currentStation.genre}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  {currentStation.listenersCount.toLocaleString()} listeners
                </span>
              </div>
              <h4 className="text-base font-bold text-white truncate flex items-center justify-center sm:justify-start gap-1.5">
                <span>{currentStation.name}</span>
                <span className="text-xs text-pink-400 font-normal">({currentStation.frequency})</span>
              </h4>
              <p className="text-xs text-slate-300 truncate mt-0.5">
                <span className="text-pink-300 font-semibold">{currentStation.currentTrack}</span>
                <span className="text-slate-500 mx-1.5">·</span>
                <span className="text-slate-400">{currentStation.currentArtist}</span>
              </p>
              <p className="text-[11px] text-slate-400 italic line-clamp-1 mt-1">
                "{currentStation.tagline}"
              </p>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
                <span className="text-[10px] font-bold tracking-wider text-purple-400 uppercase bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/30">
                  Profile Anthem
                </span>
                <span className="text-[11px] text-slate-400">Featured Pick</span>
              </div>
              <h4 className="text-base font-bold text-white truncate">
                {profile.currentSong.title}
              </h4>
              <p className="text-xs text-slate-300 truncate mt-0.5">
                {profile.currentSong.artist}
              </p>
              <p className="text-[11px] text-slate-400 italic mt-1">
                "Playing automatically when friends visit your Face Space"
              </p>
            </div>
          )}
        </div>

        {/* Volume & Equalizer Bars */}
        <div className="flex flex-col items-center sm:items-end gap-2 shrink-0">
          {/* Animated Frequency Bars */}
          <div className="flex items-end gap-1 h-6 px-2 py-1 bg-slate-950/80 rounded-md border border-slate-800">
            <span className={`w-1 bg-pink-500 rounded-full transition-all duration-300 ${isPlaying ? 'h-5 animate-pulse' : 'h-1.5'}`} />
            <span className={`w-1 bg-cyan-400 rounded-full transition-all duration-300 ${isPlaying ? 'h-3 animate-pulse delay-75' : 'h-2'}`} />
            <span className={`w-1 bg-purple-400 rounded-full transition-all duration-300 ${isPlaying ? 'h-6 animate-pulse delay-150' : 'h-1'}`} />
            <span className={`w-1 bg-pink-400 rounded-full transition-all duration-300 ${isPlaying ? 'h-4 animate-pulse delay-100' : 'h-2.5'}`} />
            <span className={`w-1 bg-emerald-400 rounded-full transition-all duration-300 ${isPlaying ? 'h-5 animate-pulse delay-200' : 'h-1.5'}`} />
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="text-slate-400 hover:text-white transition"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setVolume(parseFloat(e.target.value));
                if (isMuted) setIsMuted(false);
              }}
              className="w-16 h-1 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-pink-500"
            />
          </div>
        </div>
      </div>

      {/* Station Selector Dropdown (When in Radio Mode) */}
      {mode === 'radio' && (
        <div className="mt-3 pt-3 border-t border-slate-800/80">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-slate-400 font-medium">
              Tuned to: <strong className="text-slate-200">{currentStation.name}</strong>
            </span>
            <button
              onClick={() => setIsStationSelectorOpen(!isStationSelectorOpen)}
              className="flex items-center gap-1 text-[11px] text-pink-400 hover:text-pink-300 font-semibold"
            >
              <span>Change Station</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isStationSelectorOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>

          {/* Expanded Station List */}
          {isStationSelectorOpen && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-800/60">
              {radioStations.map((station) => (
                <button
                  key={station.id}
                  onClick={() => handleStationSelect(station.id)}
                  className={`text-left p-2 rounded-xl border transition flex items-center justify-between ${
                    station.id === currentStation.id
                      ? 'bg-pink-950/40 border-pink-500/60 text-white'
                      : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <div className="min-w-0 pr-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold truncate">{station.name}</span>
                      <span className="text-[9px] font-mono text-pink-400 px-1 py-0.2 bg-pink-500/10 rounded">
                        {station.frequency}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400 truncate">{station.genre}</p>
                  </div>
                  {station.id === currentStation.id && (
                    <span className="w-2 h-2 rounded-full bg-pink-400 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Custom Song Editor (When in Song Mode & Owner is logged in) */}
      {mode === 'song' && isOwner && (
        <div className="mt-3 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="text-slate-400 text-[11px]">
            Embed or pick your profile track
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const title = prompt('Enter song title:', profile.currentSong.title) || profile.currentSong.title;
                const artist = prompt('Enter artist name:', profile.currentSong.artist) || profile.currentSong.artist;
                setProfile(prev => ({
                  ...prev,
                  currentSong: {
                    ...prev.currentSong,
                    title,
                    artist
                  }
                }));
              }}
              className="text-[11px] px-2.5 py-1 rounded-md bg-purple-950/60 border border-purple-500/40 text-purple-300 hover:bg-purple-900/60 transition"
            >
              Edit Song Title
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
