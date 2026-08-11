import React, { useState } from 'react';
import { 
  PieChart, 
  DollarSign, 
  Users, 
  Smartphone, 
  GraduationCap, 
  Cpu, 
  ShieldCheck, 
  ArrowUpRight, 
  Sparkles, 
  CheckCircle2, 
  RefreshCw,
  TrendingUp,
  Layers,
  Building2,
  Lock
} from 'lucide-react';
import { FundDisbursement, DisbursementTransaction } from '../types';

interface FundDisbursementDashboardProps {
  disbursement: FundDisbursement;
  setDisbursement: React.Dispatch<React.SetStateAction<FundDisbursement>>;
}

export const FundDisbursementDashboard: React.FC<FundDisbursementDashboardProps> = ({
  disbursement,
  setDisbursement,
}) => {
  const [customAmount, setCustomAmount] = useState<number>(14.99);
  const [testSource, setTestSource] = useState<string>('VIP Monthly Subscription ($14.99)');
  const [recipient, setRecipient] = useState<string>('Creator Community Fund & Alex Mercer');
  const [disbursementSuccessMsg, setDisbursementSuccessMsg] = useState('');

  const calculateBreakdown = (amount: number) => {
    const creator = Number((amount * 0.60).toFixed(2));
    const device = Number((amount * 0.20).toFixed(2));
    const rdStudents = Number((amount * 0.20).toFixed(2));
    return { creator, device, rdStudents };
  };

  const currentCalc = calculateBreakdown(customAmount);

  const handleRunSimulatedDisbursement = (e: React.FormEvent) => {
    e.preventDefault();
    if (customAmount <= 0) return;

    const breakdown = calculateBreakdown(customAmount);

    const newTx: DisbursementTransaction = {
      id: 'tx_' + Date.now(),
      source: testSource,
      totalAmount: customAmount,
      creatorCut: breakdown.creator,
      deviceCut: breakdown.device,
      rdCut: breakdown.rdStudents,
      timestamp: 'Just now',
      recipientName: recipient,
      status: 'Completed (Automated Ledger)',
    };

    setDisbursement(prev => ({
      ...prev,
      totalRevenue: Number((prev.totalRevenue + customAmount).toFixed(2)),
      creatorShare: Number((prev.creatorShare + breakdown.creator).toFixed(2)),
      deviceShare: Number((prev.deviceShare + breakdown.device).toFixed(2)),
      rdAndStudentsShare: Number((prev.rdAndStudentsShare + breakdown.rdStudents).toFixed(2)),
      lastDisbursementDate: 'Just now (Automated)',
      recentTransactions: [newTx, ...prev.recentTransactions],
    }));

    setDisbursementSuccessMsg(`Disbursed $${customAmount.toFixed(2)} automatically across 60/20/20 accounts!`);
    setTimeout(() => setDisbursementSuccessMsg(''), 4000);
  };

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-8">

      {/* Main Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-cyan-950 via-purple-950 to-slate-950 border-2 border-emerald-500/50 shadow-2xl space-y-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-emerald-400 via-cyan-500 to-purple-600 p-0.5 shadow-xl shadow-emerald-500/30 flex items-center justify-center">
              <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center text-emerald-400">
                <PieChart className="w-7 h-7 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Automated Revenue Disbursement Ledger
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 border border-emerald-500/60 text-emerald-300">
                  SMART CONTRACT 60/20/20
                </span>
              </div>
              <p className="text-xs sm:text-sm text-emerald-200/90 font-medium">
                100% Transparent, automated fund distribution: 60% Creators, 20% Device Network, & 20% Developers (AI Infrastructure & Google Dev Students).
              </p>
            </div>
          </div>

          <div className="bg-slate-950/80 border border-emerald-500/40 p-3.5 rounded-2xl flex items-center gap-3">
            <DollarSign className="w-6 h-6 text-emerald-400" />
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Total Processed Platform Revenue</div>
              <div className="text-xl font-black text-white">${disbursement.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Core Fund Breakdown Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* 60% Creators */}
        <div className="p-6 rounded-3xl bg-slate-900 border-2 border-purple-500/60 shadow-xl space-y-4 relative overflow-hidden group hover:border-purple-400 transition">
          <div className="absolute top-0 right-0 px-4 py-1.5 rounded-bl-2xl bg-purple-600 text-white font-black text-xs">
            60% SHARE
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-950 border border-purple-500/50 flex items-center justify-center text-purple-300">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">Content Creators</h3>
              <p className="text-[11px] text-purple-300">Creators, Venue Partners & Hosts</p>
            </div>
          </div>

          <div className="space-y-1 bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <div className="text-[10px] font-bold text-slate-400 uppercase">Allocated Creator Funds</div>
            <div className="text-2xl font-black text-purple-400">
              ${disbursement.creatorShare.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
          </div>

          <ul className="text-xs text-slate-300 space-y-2 pt-1">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
              <span>Direct payout to video vlog creators</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
              <span>Hotspot bulletin venue hosts & discounts</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
              <span>Community event host incentives</span>
            </li>
          </ul>
        </div>

        {/* 20% Device & Infrastructure */}
        <div className="p-6 rounded-3xl bg-slate-900 border-2 border-cyan-500/60 shadow-xl space-y-4 relative overflow-hidden group hover:border-cyan-400 transition">
          <div className="absolute top-0 right-0 px-4 py-1.5 rounded-bl-2xl bg-cyan-600 text-white font-black text-xs">
            20% SHARE
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-cyan-950 border border-cyan-500/50 flex items-center justify-center text-cyan-300">
              <Smartphone className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">Device & Edge Network</h3>
              <p className="text-[11px] text-cyan-300">Device Servers & Infrastructure</p>
            </div>
          </div>

          <div className="space-y-1 bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <div className="text-[10px] font-bold text-slate-400 uppercase">Allocated Device Pool</div>
            <div className="text-2xl font-black text-cyan-400">
              ${disbursement.deviceShare.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
          </div>

          <ul className="text-xs text-slate-300 space-y-2 pt-1">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Cross-device media streaming latency</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Mobile & browser client sync edge nodes</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>High-speed video CDN & image bandwidth</span>
            </li>
          </ul>
        </div>

        {/* 20% Developers, AI Tech & Google Dev Students */}
        <div className="p-6 rounded-3xl bg-slate-900 border-2 border-yellow-500/60 shadow-xl space-y-4 relative overflow-hidden group hover:border-yellow-400 transition">
          <div className="absolute top-0 right-0 px-4 py-1.5 rounded-bl-2xl bg-yellow-500 text-slate-950 font-black text-xs">
            20% SHARE
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-yellow-950 border border-yellow-500/50 flex items-center justify-center text-yellow-300">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-white">Developers & AI Tech</h3>
              <p className="text-[11px] text-yellow-300">Google Dev Students & R&D</p>
            </div>
          </div>

          <div className="space-y-1 bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <div className="text-[10px] font-bold text-slate-400 uppercase">Allocated Developers Fund</div>
            <div className="text-2xl font-black text-yellow-400">
              ${disbursement.rdAndStudentsShare.toLocaleString('en-US', { minimumFractionDigits: 2 })}
            </div>
          </div>

          <ul className="text-xs text-slate-300 space-y-2 pt-1">
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0" />
              <span>Google Developer Student grants & scholarships</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0" />
              <span>Gemini AI Safety Shield & Anti-Bullying research</span>
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-yellow-400 shrink-0" />
              <span>Next-generation AI Wingman feature development</span>
            </li>
          </ul>
        </div>

      </div>

      {/* Interactive Disbursement Calculator & Tester */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <span>Live Automatic Disbursement Tester & Calculator</span>
            </h3>
            <p className="text-xs text-slate-400">
              Test how any membership payment or ad subscription is instantly split 60% / 20% / 20%.
            </p>
          </div>
          <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950 border border-emerald-500/40 px-3 py-1 rounded-full hidden sm:inline">
            Automated Escrow Active
          </span>
        </div>

        {disbursementSuccessMsg && (
          <div className="p-4 rounded-2xl bg-emerald-950 border border-emerald-500 text-emerald-200 text-xs font-bold flex items-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{disbursementSuccessMsg}</span>
          </div>
        )}

        <form onSubmit={handleRunSimulatedDisbursement} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-4 md:col-span-2">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1 font-semibold">Payment Source / Plan</label>
                <select
                  value={testSource}
                  onChange={e => {
                    setTestSource(e.target.value);
                    if (e.target.value.includes('7.99')) setCustomAmount(7.99);
                    else if (e.target.value.includes('14.99')) setCustomAmount(14.99);
                    else if (e.target.value.includes('80.00')) setCustomAmount(80.00);
                    else if (e.target.value.includes('149.00')) setCustomAmount(149.00);
                    else if (e.target.value.includes('79.00')) setCustomAmount(79.00);
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="Basic Monthly Sign-Up ($7.99)">Basic Monthly Sign-Up ($7.99)</option>
                  <option value="VIP Monthly Subscription ($14.99)">VIP Monthly Subscription ($14.99)</option>
                  <option value="Basic Annual Pass ($80.00)">Basic Annual Pass ($80.00)</option>
                  <option value="VIP Annual Pass ($149.00)">VIP Annual Pass ($149.00)</option>
                  <option value="Sponsor Ad Purchase ($79.00)">Sponsor Ad Purchase ($79.00)</option>
                  <option value="Custom Amount">Custom Payment Amount</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 block mb-1 font-semibold">Total Funds Amount ($)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0.01"
                  value={customAmount}
                  onChange={e => setCustomAmount(parseFloat(e.target.value) || 0)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1 font-semibold">Designated Creator Payout Recipient</label>
              <input
                type="text"
                value={recipient}
                onChange={e => setRecipient(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-emerald-500 via-cyan-600 to-purple-600 hover:from-emerald-600 hover:to-purple-700 text-white font-extrabold rounded-xl text-xs shadow-lg shadow-emerald-500/20 transition flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Simulate Instant 60 / 20 / 20 Smart Disbursement</span>
            </button>

          </div>

          {/* Breakdown Preview Box */}
          <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5 border-b border-slate-800 pb-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>Calculated Split Preview</span>
            </h4>

            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-purple-950/60 border border-purple-500/30">
                <span className="text-purple-300 font-bold">60% Creator Cut:</span>
                <span className="font-extrabold text-white">${currentCalc.creator.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-cyan-950/60 border border-cyan-500/30">
                <span className="text-cyan-300 font-bold">20% Device Cut:</span>
                <span className="font-extrabold text-white">${currentCalc.device.toFixed(2)}</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-yellow-950/60 border border-yellow-500/30">
                <span className="text-yellow-300 font-bold">20% Developers (R&D / Google Students):</span>
                <span className="font-extrabold text-white">${currentCalc.rdStudents.toFixed(2)}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 text-[10px] text-slate-400 text-center">
              100% of inputted revenue is instantly routed to verified wallets.
            </div>
          </div>
        </form>
      </div>

      {/* Audit Log / Recent Transactions Table */}
      <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>Recent Automated Disbursement Log</span>
          </h3>
          <span className="text-xs text-slate-400 font-mono">Ledger Block #84920</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-bold border-b border-slate-800">
              <tr>
                <th className="p-3">Source</th>
                <th className="p-3">Total ($)</th>
                <th className="p-3">60% Creator</th>
                <th className="p-3">20% Device</th>
                <th className="p-3">20% Developers (R&D / Students)</th>
                <th className="p-3">Recipient / Target</th>
                <th className="p-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {disbursement.recentTransactions.map(tx => (
                <tr key={tx.id} className="hover:bg-slate-950/60 transition">
                  <td className="p-3 font-semibold text-white">{tx.source}</td>
                  <td className="p-3 font-extrabold text-emerald-400">${tx.totalAmount.toFixed(2)}</td>
                  <td className="p-3 text-purple-300 font-bold">${tx.creatorCut.toFixed(2)}</td>
                  <td className="p-3 text-cyan-300 font-bold">${tx.deviceCut.toFixed(2)}</td>
                  <td className="p-3 text-yellow-300 font-bold">${tx.rdCut.toFixed(2)}</td>
                  <td className="p-3 text-slate-400 text-[11px]">{tx.recipientName || 'Community Pool'}</td>
                  <td className="p-3 text-right">
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
