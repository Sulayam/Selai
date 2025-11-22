import React from 'react';
import { BotAgent } from '../types';
import { PhoneIncoming, CheckCircle, XCircle, Building2, MapPin } from 'lucide-react';

interface TransferModalProps {
  bot: BotAgent;
  onAccept: () => void;
  onReject: () => void;
}

export const TransferModal: React.FC<TransferModalProps> = ({ bot, onAccept, onReject }) => {
  if (!bot.currentLead) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-green-500/50 rounded-2xl w-full max-w-lg shadow-2xl shadow-green-500/20 overflow-hidden">
        
        {/* Header */}
        <div className="bg-green-600/10 p-6 border-b border-green-500/30 flex items-center gap-4">
          <div className="relative">
             <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-slate-900">
               <PhoneIncoming className="w-6 h-6 animate-bounce" />
             </div>
             <div className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Warm Transfer Request</h2>
            <p className="text-green-400 text-sm font-mono">AI DETECTED BUYING INTENT</p>
          </div>
        </div>

        {/* Lead Details */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
               <span className="text-slate-500 text-xs uppercase font-bold">Prospect</span>
               <div className="text-lg font-semibold text-white mt-1">{bot.currentLead.name}</div>
               <div className="flex items-center gap-1 text-sm text-slate-400 mt-1">
                  <Building2 className="w-3 h-3" /> {bot.currentLead.company}
               </div>
            </div>
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
               <span className="text-slate-500 text-xs uppercase font-bold">Context</span>
               <div className="text-sm text-white mt-1">
                 {bot.currentLead.painPoints[0]}
               </div>
               <div className="flex items-center gap-1 text-xs text-slate-400 mt-2">
                  <MapPin className="w-3 h-3" /> {bot.currentLead.industry} Sector
               </div>
            </div>
          </div>

          <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
             <span className="text-slate-500 text-xs uppercase font-bold">Last AI Interaction</span>
             <p className="text-slate-300 text-sm italic mt-2">
               "...{bot.transcript[bot.transcript.length - 1]?.text || 'Customer expressed interest in pricing'}..."
             </p>
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 pt-0 flex gap-3">
          <button 
            onClick={onReject}
            className="flex-1 py-3 rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition font-semibold flex items-center justify-center gap-2"
          >
            <XCircle className="w-5 h-5" /> Reject
          </button>
          <button 
            onClick={onAccept}
            className="flex-[2] py-3 rounded-lg bg-green-500 hover:bg-green-600 text-slate-900 font-bold shadow-lg shadow-green-500/25 transition flex items-center justify-center gap-2"
          >
            <CheckCircle className="w-5 h-5" /> Accept Transfer
          </button>
        </div>
      </div>
    </div>
  );
};
