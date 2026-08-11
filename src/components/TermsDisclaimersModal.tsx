import React from 'react';
import { ShieldCheck, HeartHandshake, Sparkles, X, AlertCircle, Lock, Users } from 'lucide-react';

interface TermsDisclaimersModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsDisclaimersModal: React.FC<TermsDisclaimersModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="max-w-2xl w-full bg-slate-900 border-2 border-pink-500 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 text-slate-100">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-600 p-0.5 shadow-lg shadow-pink-500/30 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-pink-400">
              <HeartHandshake className="w-6 h-6 animate-pulse" />
            </div>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Face Space Terms & Mission
            </h2>
            <span className="text-xs text-pink-400 font-bold tracking-wide">
              #BetterTogether • Social Unity Hub
            </span>
          </div>
        </div>

        {/* Core Philosophy Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-950/80 via-purple-950/80 to-slate-950 border border-pink-500/40 space-y-2">
          <h3 className="font-extrabold text-sm text-pink-300 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span>Our Mission & Core Philosophy</span>
          </h3>
          <p className="text-xs text-slate-200 leading-relaxed font-medium">
            "Face Space is not trying to be the 'best' or 'biggest' social media platform. Our true purpose is to bring people together in one unified hub — connecting music, live date spots, and community vibes in true Unity."
          </p>
          <div className="text-right">
            <span className="text-xs font-black text-pink-400">#BetterTogether</span>
          </div>
        </div>

        {/* Terms & Disclaimers */}
        <div className="space-y-4 text-xs text-slate-300">
          
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="font-bold text-white flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-yellow-400" />
              <span>Third-Party Content Disclaimer</span>
            </h4>
            <p className="leading-relaxed text-slate-400">
              Face Space allows participating media platforms (including Spotify, YouTube, X, and others) to be embedded or accessed through our floating window hub. <strong>Face Space is not responsible for the external content, music, lyrics, or media produced or distributed by third-party services.</strong>
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="font-bold text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>AI Safety, Vulgarity & Anti-Bullying Shield</span>
            </h4>
            <p className="leading-relaxed text-slate-400">
              We actively strive to prevent insults, body-shaming ("ugly" comments), harassment, and vulgarity across all community video comment threads and profile walls. Powered by Google Gemini AI, our Community Safety Shield scans comments in real-time to preserve a safe, confidence-boosting environment.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="font-bold text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-400" />
              <span>AI Social Wingman Assistance</span>
            </h4>
            <p className="leading-relaxed text-slate-400">
              Our AI Wingman provides dating tips, pre-date confidence pep-talks, and icebreaker suggestions. It is designed to foster genuine, respectful, and safe real-world interactions.
            </p>
          </div>

        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold rounded-2xl text-xs shadow-lg shadow-pink-500/30 transition"
        >
          I Accept & Support #BetterTogether
        </button>

      </div>
    </div>
  );
};
