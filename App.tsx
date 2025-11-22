import React, { useState } from 'react';
import { BotCard } from './components/BotCard';
import { TransferModal } from './components/TransferModal';
import { ActiveCallWorkspace } from './components/ActiveCallWorkspace';
import { LandingPage } from './components/LandingPage';
import { useSimulation } from './hooks/useSimulation';
import { LayoutGrid, Activity, Settings, Phone, Sparkles } from 'lucide-react';
import { BotAgent } from './types';

function App() {
  const [showLanding, setShowLanding] = useState(true);
  const { bots, incomingTransfer, acceptTransfer, rejectTransfer } = useSimulation();
  const [activeSessionBot, setActiveSessionBot] = useState<BotAgent | null>(null);

  const handleAccept = () => {
    if (incomingTransfer) {
      const bot = incomingTransfer;
      acceptTransfer(bot.id); // Logic to clear bot from pool
      setActiveSessionBot(bot); // Move to active workspace
    }
  };

  const handleReject = () => {
    if (incomingTransfer) {
      rejectTransfer(incomingTransfer.id);
    }
  };

  const endActiveSession = () => {
    setActiveSessionBot(null);
  };

  if (showLanding) {
    return <LandingPage onLaunch={() => setShowLanding(false)} />;
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30">
      
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">Selai</span>
          </div>
          
          <div className="flex items-center gap-6 text-sm font-medium text-slate-400">
            <div className="hidden md:flex items-center gap-2 text-white">
              <Activity className="w-4 h-4 text-green-400" />
              <span>System Online</span>
            </div>
            <div className="hidden md:block h-4 w-px bg-slate-700"></div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span>4 Agents Active</span>
            </div>
          </div>

          <button className="p-2 hover:bg-slate-800 rounded-full transition">
            <Settings className="w-5 h-5 text-slate-400" />
          </button>
        </div>
      </nav>

      {/* Main Dashboard */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        
        <header className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">Live Transfer Hub</h1>
            <p className="text-slate-400">Monitoring AI agents. Waiting for qualified leads...</p>
          </div>
          <button onClick={() => setShowLanding(true)} className="text-sm text-slate-500 hover:text-white underline">
            Back to Home
          </button>
        </header>

        {/* Bot Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bots.map(bot => (
            <BotCard key={bot.id} bot={bot} />
          ))}
        </div>

        {/* Stats / Bottom Panel */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6">
           <div className="lg:col-span-2 bg-slate-900 rounded-xl border border-slate-800 p-6">
              <h3 className="font-bold text-white mb-4">Campaign Performance (Daily)</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                 <div className="p-4 bg-slate-950 rounded-lg">
                    <div className="text-2xl font-bold text-white">1,240</div>
                    <div className="text-xs text-slate-500 uppercase mt-1">Dials</div>
                 </div>
                 <div className="p-4 bg-slate-950 rounded-lg">
                    <div className="text-2xl font-bold text-indigo-400">42</div>
                    <div className="text-xs text-slate-500 uppercase mt-1">Conversations</div>
                 </div>
                 <div className="p-4 bg-slate-950 rounded-lg border border-green-500/20">
                    <div className="text-2xl font-bold text-green-400">8</div>
                    <div className="text-xs text-slate-500 uppercase mt-1">Transfers</div>
                 </div>
                 <div className="p-4 bg-slate-950 rounded-lg">
                    <div className="text-2xl font-bold text-white">19%</div>
                    <div className="text-xs text-slate-500 uppercase mt-1">Conv. Rate</div>
                 </div>
              </div>
           </div>
           
           <div className="bg-gradient-to-br from-indigo-900/50 to-slate-900 rounded-xl border border-indigo-500/20 p-6 flex flex-col justify-center items-center text-center">
              <div className="w-16 h-16 bg-indigo-500/20 rounded-full flex items-center justify-center mb-4">
                 <Activity className="w-8 h-8 text-indigo-400" />
              </div>
              <h3 className="text-white font-bold">AI Optimization Active</h3>
              <p className="text-sm text-slate-400 mt-2">
                Gemini is analyzing call patterns to improve rebuttal success rates in real-time.
              </p>
           </div>
        </div>

      </main>

      {/* Modals */}
      {incomingTransfer && !activeSessionBot && (
        <TransferModal 
          bot={incomingTransfer} 
          onAccept={handleAccept} 
          onReject={handleReject} 
        />
      )}

      {activeSessionBot && (
        <ActiveCallWorkspace 
          bot={activeSessionBot} 
          onEndCall={endActiveSession} 
        />
      )}

    </div>
  );
}

export default App;