import React, { useEffect, useState } from 'react';
import { BotAgent, GeminiAnalysis } from '../types';
import { Mic, PhoneOff, BrainCircuit, MessageSquare, FileText, Sparkles } from 'lucide-react';
import { analyzeCallTranscript } from '../services/geminiService';

interface ActiveCallWorkspaceProps {
  bot: BotAgent;
  onEndCall: () => void;
}

export const ActiveCallWorkspace: React.FC<ActiveCallWorkspaceProps> = ({ bot, onEndCall }) => {
  const [analysis, setAnalysis] = useState<GeminiAnalysis | null>(null);
  const [loadingAnalysis, setLoadingAnalysis] = useState(false);

  useEffect(() => {
    // Auto-analyze when workspace opens
    const fetchAnalysis = async () => {
      setLoadingAnalysis(true);
      const result = await analyzeCallTranscript(bot.transcript);
      setAnalysis(result);
      setLoadingAnalysis(false);
    };
    fetchAnalysis();
  }, [bot]);

  return (
    <div className="fixed inset-0 z-40 bg-slate-950 flex flex-col">
      {/* Top Bar */}
      <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6">
        <div className="flex items-center gap-4">
           <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 text-red-500 rounded-full border border-red-500/20 animate-pulse">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              <span className="text-xs font-bold tracking-wide">LIVE CALL</span>
           </div>
           <h1 className="text-lg font-semibold text-white">{bot.currentLead?.name} <span className="text-slate-500 font-normal">| {bot.currentLead?.company}</span></h1>
        </div>
        <button 
          onClick={onEndCall}
          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 transition"
        >
          <PhoneOff className="w-4 h-4" /> End Call
        </button>
      </header>

      {/* Main Content Grid */}
      <div className="flex-1 grid grid-cols-3 gap-6 p-6 overflow-hidden">
        
        {/* Left: Lead CRM Data */}
        <div className="col-span-1 space-y-6 overflow-y-auto">
          <div className="bg-slate-900 p-5 rounded-xl border border-slate-800">
            <h3 className="text-slate-400 text-sm font-bold uppercase mb-4 flex items-center gap-2">
              <FileText className="w-4 h-4" /> Lead Details
            </h3>
            <div className="space-y-4">
               <div>
                 <label className="text-xs text-slate-500">Industry</label>
                 <div className="text-white">{bot.currentLead?.industry}</div>
               </div>
               <div>
                 <label className="text-xs text-slate-500">Pain Points</label>
                 <div className="flex flex-wrap gap-2 mt-1">
                   {bot.currentLead?.painPoints.map(p => (
                     <span key={p} className="text-xs bg-slate-800 px-2 py-1 rounded border border-slate-700 text-slate-300">{p}</span>
                   ))}
                 </div>
               </div>
               <div>
                 <label className="text-xs text-slate-500">Phone</label>
                 <div className="text-white font-mono">{bot.currentLead?.phone}</div>
               </div>
            </div>
          </div>

          {/* Gemini Insight Card */}
          <div className="bg-slate-900 p-5 rounded-xl border border-indigo-500/30 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-2 opacity-10">
               <BrainCircuit className="w-24 h-24 text-indigo-500" />
             </div>
             <h3 className="text-indigo-400 text-sm font-bold uppercase mb-4 flex items-center gap-2">
               <Sparkles className="w-4 h-4" /> Gemini Live Analysis
             </h3>
             
             {loadingAnalysis ? (
               <div className="space-y-3 animate-pulse">
                 <div className="h-4 bg-slate-800 rounded w-3/4"></div>
                 <div className="h-4 bg-slate-800 rounded w-full"></div>
                 <div className="h-4 bg-slate-800 rounded w-5/6"></div>
               </div>
             ) : analysis ? (
               <div className="space-y-4">
                 <div>
                   <span className="text-xs text-slate-500 block mb-1">Call Summary</span>
                   <p className="text-sm text-slate-300 leading-relaxed">{analysis.summary}</p>
                 </div>
                 <div className="bg-indigo-500/10 p-3 rounded border border-indigo-500/20">
                   <span className="text-xs text-indigo-300 block mb-1 font-bold">Recommended Strategy</span>
                   <p className="text-sm text-white font-medium">{analysis.recommendedStrategy}</p>
                 </div>
                 <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">Sentiment Detected</span>
                    <span className={`text-xs font-bold px-2 py-1 rounded ${analysis.sentiment === 'Positive' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                      {analysis.sentiment.toUpperCase()}
                    </span>
                 </div>
               </div>
             ) : (
               <p className="text-red-400 text-sm">Analysis unavailable.</p>
             )}
          </div>
        </div>

        {/* Center/Right: Transcript & Script */}
        <div className="col-span-2 bg-slate-900 rounded-xl border border-slate-800 flex flex-col overflow-hidden">
           <div className="p-4 border-b border-slate-800 flex items-center gap-2 bg-slate-900/50">
             <MessageSquare className="w-4 h-4 text-slate-400" />
             <h3 className="text-sm font-bold text-slate-300">Live Transcript</h3>
           </div>
           <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-950/30">
              {bot.transcript.map((line, i) => (
                <div key={i} className={`flex ${line.speaker === 'AI' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg text-sm ${
                    line.speaker === 'AI' 
                      ? 'bg-slate-800 text-slate-300 rounded-tl-none' 
                      : 'bg-blue-600 text-white rounded-tr-none'
                  }`}>
                    <p>{line.text}</p>
                    <span className="text-[10px] opacity-50 mt-1 block">
                      {line.speaker === 'AI' ? 'Bot' : 'Lead'} • {new Date(line.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second: '2-digit'})}
                    </span>
                  </div>
                </div>
              ))}
              {/* Human's turn now */}
              <div className="flex justify-center py-4">
                <span className="text-xs text-slate-500 font-mono">--- LIVE HANDOFF ---</span>
              </div>
           </div>
           
           {/* Helper Script */}
           <div className="p-4 bg-slate-900 border-t border-slate-800">
              <h4 className="text-xs text-slate-500 font-bold mb-2">SUGGESTED OPENER</h4>
              <div className="text-lg text-white font-medium">
                "Hi {bot.currentLead?.name.split(' ')[0]}, I've got your file here. My AI assistant mentioned you were concerned about {bot.currentLead?.painPoints[0].toLowerCase()}. Is that right?"
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};
