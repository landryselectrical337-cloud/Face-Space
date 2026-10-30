import React, { useState } from 'react';
import { 
  ShieldCheck, 
  HeartHandshake, 
  Sparkles, 
  X, 
  AlertTriangle, 
  Lock, 
  Users, 
  Check, 
  PhoneCall, 
  MapPin, 
  DollarSign, 
  Eye, 
  Car,
  CheckCircle2
} from 'lucide-react';

interface TermsDisclaimersModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAcceptTerms?: () => void;
  hasAccepted?: boolean;
}

export const TermsDisclaimersModal: React.FC<TermsDisclaimersModalProps> = ({
  isOpen,
  onClose,
  onAcceptTerms,
  hasAccepted = false,
}) => {
  const [agreedToSafetyRules, setAgreedToSafetyRules] = useState(hasAccepted);
  const [agreedToAgeAndTerms, setAgreedToAgeAndTerms] = useState(hasAccepted);
  const [submitted, setSubmitted] = useState(hasAccepted);

  if (!isOpen) return null;

  const canAccept = agreedToSafetyRules && agreedToAgeAndTerms;

  const handleConfirmAcceptance = () => {
    if (!canAccept) return;
    setSubmitted(true);
    onAcceptTerms?.();
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="max-w-2xl w-full bg-slate-900 border-2 border-pink-500 rounded-3xl p-5 sm:p-8 space-y-5 shadow-2xl relative my-auto text-slate-100 max-h-[92vh] overflow-y-auto">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition"
          title="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-600 to-indigo-600 p-0.5 shadow-lg shadow-pink-500/30 flex items-center justify-center shrink-0">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-pink-400">
              <ShieldCheck className="w-6 h-6 animate-pulse" />
            </div>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Online Dating Safety & Terms
            </h2>
            <p className="text-xs text-pink-300 font-medium">
              Mandatory Safety Cautions & Community Agreement · #BetterTogether
            </p>
          </div>
        </div>

        {/* Safety First Red Alert Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-red-950/70 via-pink-950/70 to-slate-950 border border-red-500/50 space-y-2">
          <div className="flex items-center gap-2 text-red-300 font-bold text-xs sm:text-sm">
            <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
            <span>CRITICAL: Online Dating Safety Rules & Cautions</span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed">
            Your physical safety is our paramount priority. Please review these essential guidelines before meeting anyone from Face Space in the real world:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-red-900/40 flex items-start gap-2">
              <MapPin className="w-4 h-4 text-pink-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Meet in Public Spaces</strong>
                <span className="text-slate-400 text-[11px]">Always meet at verified venues, cafés, or restaurants. Never meet in secluded or private locations for a first date.</span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-red-900/40 flex items-start gap-2">
              <Users className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Tell a Trusted Wingman</strong>
                <span className="text-slate-400 text-[11px]">Share your live location, venue details, and date's name with a close friend or family member before leaving.</span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-red-900/40 flex items-start gap-2">
              <DollarSign className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Never Send Money</strong>
                <span className="text-slate-400 text-[11px]">Never wire money, gift cards, or crypto. Anyone asking for financial assistance or deposits is an immediate violation—report them.</span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-950/80 border border-red-900/40 flex items-start gap-2">
              <Car className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block">Your Own Transportation</strong>
                <span className="text-slate-400 text-[11px]">Drive yourself, ride-share, or use public transit. Do not accept rides in your date's personal vehicle on day one.</span>
              </div>
            </div>
          </div>
        </div>

        {/* 70/20/10 Smart Ledger & Third-Party Disclaimer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <h4 className="font-bold text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>70 / 20 / 10 Revenue Model</span>
            </h4>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              70% of subscription & ad proceeds flow directly to Content Creators, 20% to Device & CDN Network, and 10% to Google Dev Students & open AI safety research.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
            <h4 className="font-bold text-white flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-purple-400" />
              <span>Third-Party Media Disclaimer</span>
            </h4>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              Floating music & video widgets (Spotify, YouTube, X) are external. Face Space does not endorse or bear liability for external broadcast lyrics or media.
            </p>
          </div>
        </div>

        {/* Safety Hotline Support Box */}
        <div className="p-3 bg-purple-950/40 border border-purple-500/30 rounded-xl flex items-center justify-between text-xs text-purple-200">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-pink-400 shrink-0" />
            <span>Emergency or Helpline Assistance: <strong>National Domestic Violence Hotline: 1-800-799-SAFE (7233)</strong></span>
          </div>
        </div>

        {/* Mandatory Agreement Checkboxes */}
        <div className="space-y-3 pt-2 border-t border-slate-800 text-xs">
          <label className="flex items-start gap-2.5 cursor-pointer group">
            <input
              type="checkbox"
              checked={agreedToSafetyRules}
              onChange={(e) => setAgreedToSafetyRules(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-slate-700 bg-slate-950 text-pink-600 focus:ring-pink-500 cursor-pointer"
            />
            <span className="text-slate-200 group-hover:text-white leading-tight">
              I have read, understood, and pledge to adhere to all <strong>Online Dating Safety Cautions</strong> (meeting in public, keeping my own transportation, and never sending money).
            </span>
          </label>

          <label className="flex items-start gap-2.5 cursor-pointer group">
            <input
              type="checkbox"
              checked={agreedToAgeAndTerms}
              onChange={(e) => setAgreedToAgeAndTerms(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-slate-700 bg-slate-950 text-pink-600 focus:ring-pink-500 cursor-pointer"
            />
            <span className="text-slate-200 group-hover:text-white leading-tight">
              I confirm I am <strong>18 years of age or older</strong> and agree to the Face Space Community Conduct Rules, AI Safety Shield Policy, and Terms & Conditions.
            </span>
          </label>
        </div>

        {/* Acceptance Confirmation */}
        {submitted && (
          <div className="p-3 bg-emerald-950 border border-emerald-500 rounded-xl text-emerald-300 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>Terms & Safety Guidelines Accepted! Your account is verified for safe dating.</span>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={handleConfirmAcceptance}
          disabled={!canAccept}
          className={`w-full py-3.5 rounded-2xl font-black text-xs sm:text-sm tracking-wide transition flex items-center justify-center gap-2 ${
            canAccept 
              ? 'bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-400 hover:to-indigo-500 text-white shadow-xl shadow-pink-500/25 cursor-pointer active:scale-98'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
          }`}
        >
          <Check className="w-4 h-4" />
          <span>I Accept Terms, Conditions & Dating Safety Cautions</span>
        </button>

      </div>
    </div>
  );
};
