import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Check, 
  Lock, 
  Sparkles, 
  X, 
  UserCheck, 
  CreditCard, 
  Zap, 
  ArrowRight,
  AlertCircle,
  Calendar,
  CheckCircle2,
  Crown
} from 'lucide-react';
import { UserSubscription, VerificationMethod } from '../types';

interface AuthSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  subscription: UserSubscription;
  setSubscription: React.Dispatch<React.SetStateAction<UserSubscription>>;
  onDisburseRevenue?: (source: string, amount: number) => void;
}

export const AuthSubscriptionModal: React.FC<AuthSubscriptionModalProps> = ({
  isOpen,
  onClose,
  subscription,
  setSubscription,
  onDisburseRevenue,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<VerificationMethod | null>(
    subscription.verifiedMethod || null
  );
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'vip'>(
    subscription.plan === 'vip' ? 'vip' : 'basic'
  );
  const [billingInterval, setBillingInterval] = useState<'month' | 'year'>(
    subscription.billingInterval || 'month'
  );
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationSuccess, setVerificationSuccess] = useState(subscription.isVerified);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleSimulateVerification = (method: VerificationMethod) => {
    setSelectedMethod(method);
    setIsVerifying(true);
    setErrorMsg('');

    setTimeout(() => {
      setIsVerifying(false);
      setVerificationSuccess(true);
    }, 1200);
  };

  const handleCompleteSubscription = (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationSuccess || !selectedMethod) {
      setErrorMsg('Please complete age & identity verification first.');
      return;
    }

    const prices = {
      basic: { month: 7.99, year: 80.00 },
      vip: { month: 14.99, year: 149.00 },
    };

    const price = prices[selectedPlan][billingInterval];

    setSubscription({
      isLoggedIn: true,
      isVerified: true,
      verifiedMethod: selectedMethod,
      verifiedAge: 24,
      plan: selectedPlan,
      billingInterval,
      price,
      renewalDate: new Date(Date.now() + (billingInterval === 'month' ? 30 : 365) * 86400000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    });

    if (onDisburseRevenue) {
      onDisburseRevenue(
        `${selectedPlan === 'vip' ? 'VIP' : 'Basic'} ${billingInterval === 'month' ? 'Monthly' : 'Annual'} Membership ($${price.toFixed(2)})`,
        price
      );
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
      <div className="max-w-2xl w-full bg-slate-900 border-2 border-cyan-500/80 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl relative my-8 text-slate-100 animate-scaleUp">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 via-purple-500 to-pink-500 p-0.5 shadow-lg shadow-cyan-500/30 flex items-center justify-center">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-cyan-400">
              <ShieldCheck className="w-6 h-6 animate-pulse" />
            </div>
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
              Identity Sign-Up & Membership
              <span className="text-[10px] px-2 py-0.5 bg-emerald-500/20 border border-emerald-500/50 text-emerald-300 rounded-full font-bold">
                18+ Verified
              </span>
            </h2>
            <p className="text-xs text-slate-300">
              All Face Space users verify age & identity to maintain a safe, authentic dating community.
            </p>
          </div>
        </div>

        {/* Step 1: Verification Method Selection */}
        <div className="space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-cyan-400" />
              <span>Step 1: Verify Age & Identity</span>
            </h3>
            {verificationSuccess && (
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Age & Identity Verified (18+)
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Verify ID */}
            <button
              type="button"
              onClick={() => handleSimulateVerification('verify_id')}
              className={`p-3.5 rounded-2xl border text-left transition flex flex-col justify-between space-y-2 ${
                selectedMethod === 'verify_id'
                  ? 'bg-cyan-950/80 border-cyan-400 ring-2 ring-cyan-500/40'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-xl bg-cyan-900/60 border border-cyan-500/40 flex items-center justify-center text-cyan-300 font-bold text-xs">
                  ID
                </div>
                {selectedMethod === 'verify_id' && verificationSuccess && (
                  <Check className="w-4 h-4 text-emerald-400" />
                )}
              </div>
              <div>
                <h4 className="font-bold text-xs text-white">Govt ID & Photo</h4>
                <p className="text-[10px] text-slate-400">Secure Instant Age Verification</p>
              </div>
            </button>

            {/* Google */}
            <button
              type="button"
              onClick={() => handleSimulateVerification('google')}
              className={`p-3.5 rounded-2xl border text-left transition flex flex-col justify-between space-y-2 ${
                selectedMethod === 'google'
                  ? 'bg-purple-950/80 border-purple-400 ring-2 ring-purple-500/40'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-xl bg-purple-900/60 border border-purple-500/40 flex items-center justify-center text-purple-300 font-black text-xs">
                  G
                </div>
                {selectedMethod === 'google' && verificationSuccess && (
                  <Check className="w-4 h-4 text-emerald-400" />
                )}
              </div>
              <div>
                <h4 className="font-bold text-xs text-white">Google Sign-In</h4>
                <p className="text-[10px] text-slate-400">Verified Google Identity</p>
              </div>
            </button>

            {/* Facebook */}
            <button
              type="button"
              onClick={() => handleSimulateVerification('facebook')}
              className={`p-3.5 rounded-2xl border text-left transition flex flex-col justify-between space-y-2 ${
                selectedMethod === 'facebook'
                  ? 'bg-blue-950/80 border-blue-400 ring-2 ring-blue-500/40'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-xl bg-blue-900/60 border border-blue-500/40 flex items-center justify-center text-blue-300 font-black text-xs">
                  f
                </div>
                {selectedMethod === 'facebook' && verificationSuccess && (
                  <Check className="w-4 h-4 text-emerald-400" />
                )}
              </div>
              <div>
                <h4 className="font-bold text-xs text-white">Facebook Sign-In</h4>
                <p className="text-[10px] text-slate-400">Verified Social Account</p>
              </div>
            </button>
          </div>

          {isVerifying && (
            <div className="p-3 bg-cyan-950/60 border border-cyan-500/40 rounded-xl text-xs text-cyan-300 flex items-center gap-2 animate-pulse">
              <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" />
              <span>Verifying age & identity credentials with secure auth server...</span>
            </div>
          )}
        </div>

        {/* Step 2: Subscription Plan Tier Selection */}
        <div className="space-y-4 pt-2 border-t border-slate-800">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <h3 className="text-xs font-bold text-yellow-400 uppercase tracking-wider flex items-center gap-1.5">
              <CreditCard className="w-4 h-4 text-yellow-400" />
              <span>Step 2: Select Subscription Plan</span>
            </h3>

            {/* Billing Interval Toggle Switch */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-1 flex items-center text-xs">
              <button
                type="button"
                onClick={() => setBillingInterval('month')}
                className={`px-3 py-1 rounded-lg font-bold transition ${
                  billingInterval === 'month' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() => setBillingInterval('year')}
                className={`px-3 py-1 rounded-lg font-bold transition flex items-center gap-1 ${
                  billingInterval === 'year' ? 'bg-cyan-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Annual</span>
                <span className="text-[9px] px-1 py-0.2 bg-yellow-500 text-slate-950 rounded font-black">
                  SAVE 16%+
                </span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Basic Pass Plan ($7.99/mo or $80.00/yr) */}
            <div
              onClick={() => setSelectedPlan('basic')}
              className={`p-5 rounded-2xl bg-slate-950 border transition cursor-pointer flex flex-col justify-between space-y-3 relative ${
                selectedPlan === 'basic'
                  ? 'border-yellow-400 ring-2 ring-yellow-500/40 shadow-xl'
                  : 'border-slate-800 opacity-90 hover:opacity-100'
              }`}
            >
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-950 text-amber-300 border border-amber-800">
                  Min Sign Up
                </span>
                <h4 className="font-extrabold text-base text-white">Basic Date Pass</h4>
                <div className="text-2xl font-black text-yellow-400">
                  {billingInterval === 'month' ? '$7.99' : '$80.00'}
                  <span className="text-xs text-slate-400 font-normal">
                    /{billingInterval === 'month' ? 'mo' : 'year'}
                  </span>
                </div>
                <p className="text-xs text-slate-400">Essential verified access & social profile features.</p>
              </div>

              <ul className="text-xs text-slate-300 space-y-1.5 pt-2 border-t border-slate-800/80">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Full MySpace style profile customization</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Current Song & Audio Player</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Hotspots Bulletin post & upvote access</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Standard AI Wingman Assistant Chat</span>
                </li>
              </ul>
            </div>

            {/* VIP All-Access Plan ($14.99/mo or $149.00/yr) */}
            <div
              onClick={() => setSelectedPlan('vip')}
              className={`p-5 rounded-2xl bg-slate-950 border transition cursor-pointer flex flex-col justify-between space-y-3 relative overflow-hidden ${
                selectedPlan === 'vip'
                  ? 'border-pink-500 ring-2 ring-pink-500/40 shadow-2xl bg-gradient-to-b from-purple-950/40 to-slate-950'
                  : 'border-slate-800 opacity-90 hover:opacity-100'
              }`}
            >
              <div className="absolute top-0 right-0 px-3 py-1 rounded-bl-2xl bg-gradient-to-r from-pink-500 to-purple-600 text-[10px] font-black text-white flex items-center gap-1">
                <Crown className="w-3 h-3 fill-yellow-300 text-yellow-300" />
                <span>ALL FEATURES INCLUDED</span>
              </div>

              <div className="space-y-1 pt-1">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-pink-950 text-pink-300 border border-pink-800">
                  👑 VIP Pass
                </span>
                <h4 className="font-extrabold text-base text-white">VIP All-Access Pass</h4>
                <div className="text-2xl font-black text-pink-400">
                  {billingInterval === 'month' ? '$14.99' : '$149.00'}
                  <span className="text-xs text-slate-400 font-normal">
                    /{billingInterval === 'month' ? 'mo' : 'year'}
                  </span>
                </div>
                <p className="text-xs text-slate-400">Unlocks 100% of Face Space features & premium AI capabilities.</p>
              </div>

              <ul className="text-xs text-slate-300 space-y-1.5 pt-2 border-t border-slate-800/80">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                  <span><strong>ALL Basic Pass Features</strong></span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                  <span>AI Voiceover Pep-Talk & Audio Speech (TTS)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                  <span>Video Hub & Real-time AI Safety Moderation</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                  <span>Floating Social Media Mini-Windows</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                  <span>Business Ad Marketplace Spot Placement</span>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {errorMsg && (
          <div className="p-3 bg-red-950/80 border border-red-500/50 rounded-xl text-xs text-red-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Submit Button */}
        <form onSubmit={handleCompleteSubscription} className="pt-2">
          <button
            type="submit"
            disabled={!verificationSuccess || !selectedMethod}
            className="w-full py-3.5 bg-gradient-to-r from-cyan-500 via-purple-600 to-pink-600 hover:from-cyan-600 hover:to-pink-700 text-white font-extrabold rounded-2xl text-xs sm:text-sm shadow-xl shadow-cyan-500/20 disabled:opacity-50 transition flex items-center justify-center gap-2"
          >
            <span>Confirm & Start {selectedPlan === 'vip' ? 'VIP All-Access Pass' : 'Basic Date Pass'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <p className="text-[10px] text-slate-400 text-center mt-2">
            Cancel anytime in subscription settings. Secure 256-bit encrypted checkout. #BetterTogether
          </p>
        </form>

      </div>
    </div>
  );
};
