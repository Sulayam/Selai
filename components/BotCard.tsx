import React from 'react';
import { BotAgent, BotStatus } from '../types';
import { Phone, Radio, User, Mic, Volume2, ArrowRightCircle, ShieldCheck } from 'lucide-react';

interface BotCardProps {
  bot: BotAgent;
}

const getStatusColor = (status: BotStatus) => {
  switch (status) {
    case BotStatus.DIALING: return 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10';
    case BotStatus.PITCHING: return 'text-blue-400 border-blue-400/30 bg-blue-400/10';
    case BotStatus.LISTENING: return 'text-purple-400 border-purple-400/30 bg-purple-400/10';
    case BotStatus.TRANSFERRING: return 'text-green-400 border-green-400/50 bg-green-400/20 animate-pulse';
    case BotStatus.IDLE: return 'text-slate-500 border-slate-700 bg-slate-800/50';
    case BotStatus.COOLDOWN: return 'text-orange-500 border-orange-700 bg-orange-900/20';
    default: return 'text-slate-500';
  }
};

export const BotCard: React.FC<BotCardProps> = ({ bot }) => {
  const statusStyle = getStatusColor(bot.status);

  return (
    <div className={`relative flex flex-col p-4 rounded-xl border ${statusStyle} transition-all duration-300 h-56`}>
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center">
            <Radio className="w-4 h-4" />
          </div>
          <span className="font-mono font-bold text-sm tracking-widest uppercase">{bot.name}</span>
        </div>
        <div className="flex items-center gap-1 text-xs font-mono bg-slate-900/50 px-2 py-1 rounded">
          {bot.status === BotStatus.DIALING && <span className="animate-pulse">DIALING...</span>}
          {bot.status === BotStatus.PITCHING && <span className="flex gap-1"><Volume2 className="w-3 h-3" /> SPEAKING</span>}
          {bot.status === BotStatus.LISTENING && <span className="flex gap-1"><Mic className="w-3 h-3" /> LISTENING</span>}
          {bot.status === BotStatus.TRANSFERRING && <span className="font-bold">TRANSFER READY</span>}
          {bot.status === BotStatus.IDLE && <span>IDLE</span>}
        </div>
      </div>

      {/* Lead Info */}
      {bot.currentLead ? (
        <div className="flex-1 space-y-2">
          <div className="flex items-start gap-3">
            <User className="w-8 h-8 text-slate-400 bg-slate-800 p-1.5 rounded-md" />
            <div>
              <h3 className="font-semibold text-sm text-white truncate">{bot.currentLead.name}</h3>
              <p className="text-xs text-slate-400 truncate">{bot.currentLead.company}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              {bot.currentLead.industry}
            </span>
             <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
              {bot.currentLead.phone}
            </span>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-slate-600 text-sm italic">
          Waiting for lead assignment...
        </div>
      )}

      {/* Footer / Visualizer */}
      <div className="mt-auto pt-4 border-t border-white/10">
         {bot.status === BotStatus.PITCHING || bot.status === BotStatus.LISTENING ? (
             <div className="flex items-center justify-between">
                 <div className="flex gap-1 h-4 items-end">
                     {[1,2,3,4,5].map(i => (
                         <div key={i} 
                              className={`w-1 bg-current rounded-full animate-bounce`} 
                              style={{ 
                                  height: `${Math.random() * 100}%`, 
                                  animationDelay: `${i * 0.1}s` 
                              }} 
                         />
                     ))}
                 </div>
                 <span className="text-xs font-mono opacity-70">
                   {Math.floor(bot.duration / 60)}:{(bot.duration % 60).toString().padStart(2, '0')}
                 </span>
             </div>
         ) : bot.status === BotStatus.TRANSFERRING ? (
             <div className="flex items-center justify-center gap-2 text-white font-bold animate-pulse">
                <ShieldCheck className="w-5 h-5" />
                <span>HOT LEAD DETECTED</span>
             </div>
         ) : (
             <div className="h-4 bg-slate-800/50 rounded w-full"></div>
         )}
      </div>
    </div>
  );
};
