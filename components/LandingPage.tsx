import React from 'react';
import { ArrowRight, Phone, ShieldCheck, BrainCircuit, CheckCircle, XCircle, Sparkles, Users, TrendingUp } from 'lucide-react';

interface LandingPageProps {
  onLaunch: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onLaunch }) => {
  return (
    <div className="min-h-screen bg-[#0B1120] text-white overflow-x-hidden">
      
      {/* Hero Section */}
      <header className="relative pt-20 pb-32 px-6 border-b border-slate-800">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/20 to-[#0B1120] pointer-events-none" />
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-8 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            <span>The Future of Outbound Sales</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-500">
            Meet Selai.
          </h1>
          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed mb-10">
            Hire an elite team of AI agents who make thousands of calls, filter out the noise, and only transfer <span className="text-white font-semibold">interested buyers</span> to you.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={onLaunch}
              className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-lg shadow-lg shadow-indigo-600/25 transition-all transform hover:scale-105 flex items-center gap-3"
            >
              Launch Dashboard <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold text-lg border border-slate-700 transition-all">
              View Case Study
            </button>
          </div>
        </div>
      </header>

      {/* Feature 1: The Problem vs Solution */}
      <section className="py-24 px-6 bg-[#0f172a]">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-white">Stop listening to dial tones.</h2>
              <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                Traditional sales is broken. Your best humans waste 90% of their day hearing "hello?", voicemails, and angry hang-ups.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="p-1 bg-red-500/10 rounded text-red-400 mt-1"><XCircle className="w-5 h-5" /></div>
                  <span className="text-slate-300">Wasting hours on voicemails</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-1 bg-red-500/10 rounded text-red-400 mt-1"><XCircle className="w-5 h-5" /></div>
                  <span className="text-slate-300">Emotional burnout from rejection</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-1 bg-green-500/10 rounded text-green-400 mt-1"><CheckCircle className="w-5 h-5" /></div>
                  <span className="text-white font-medium">Selai filters all of this out.</span>
                </li>
              </ul>
            </div>
            
            {/* Mock UI: The Grid */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative bg-[#1e293b] border border-slate-700 rounded-xl overflow-hidden shadow-2xl">
                <div className="bg-slate-900 px-4 py-3 border-b border-slate-800 flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full bg-red-500"></div>
                   <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                   <div className="w-3 h-3 rounded-full bg-green-500"></div>
                   <span className="ml-2 text-xs text-slate-500 font-mono">Selai_Command_Center.exe</span>
                </div>
                <div className="p-6 grid grid-cols-2 gap-4">
                   {/* Mini Bot Card 1 */}
                   <div className="bg-slate-800/50 p-3 rounded border border-slate-700/50">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-mono text-slate-400">AGENT-01</span>
                        <span className="text-[10px] bg-yellow-500/20 text-yellow-400 px-1 rounded">DIALING</span>
                      </div>
                      <div className="h-2 w-3/4 bg-slate-700 rounded mb-1"></div>
                      <div className="h-2 w-1/2 bg-slate-700 rounded"></div>
                   </div>
                   {/* Mini Bot Card 2 */}
                   <div className="bg-slate-800/50 p-3 rounded border border-slate-700/50">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-mono text-slate-400">AGENT-02</span>
                        <span className="text-[10px] bg-slate-700 text-slate-400 px-1 rounded">HANGUP</span>
                      </div>
                      <div className="h-2 w-full bg-slate-700 rounded mb-1"></div>
                   </div>
                   {/* Mini Bot Card 3 (Active) */}
                   <div className="bg-indigo-500/10 p-3 rounded border border-indigo-500/30 col-span-2">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-mono text-indigo-300">AGENT-03</span>
                        <span className="text-[10px] bg-indigo-500 text-white px-1 rounded animate-pulse">INTEREST DETECTED</span>
                      </div>
                      <div className="text-xs text-indigo-100 italic">"Yes, I am actually looking for better security..."</div>
                   </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white text-slate-900 p-4 rounded-lg shadow-xl hidden md:block transform rotate-3">
                 <p className="font-bold flex items-center gap-2"><Users className="w-4 h-4"/> 4 Agents = 1 Human</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature 2: The Warm Transfer */}
      <section className="py-24 px-6 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
             {/* Mock UI: The Modal */}
            <div className="relative order-2 lg:order-1">
               <div className="bg-slate-900 border border-green-500/30 rounded-xl p-6 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
                  <div className="flex items-center gap-4 mb-6">
                     <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-slate-900">
                       <Phone className="w-6 h-6" />
                     </div>
                     <div>
                       <h3 className="text-lg font-bold text-white">Incoming Warm Transfer</h3>
                       <p className="text-green-400 text-sm">Lead is qualified & ready.</p>
                     </div>
                  </div>
                  <div className="bg-slate-950 p-4 rounded border border-slate-800 mb-4">
                     <p className="text-xs text-slate-500 uppercase font-bold mb-1">Summary</p>
                     <p className="text-slate-300 text-sm">"John from Metro Logistics. Validated pain point: Theft at warehouse. Wants a quote today."</p>
                  </div>
                  <button className="w-full py-3 bg-green-500 hover:bg-green-600 text-slate-900 font-bold rounded-lg transition">
                    Accept Call
                  </button>
               </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-3xl font-bold mb-6 text-white">Only talk to winners.</h2>
              <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                Selai sits on the line, qualifies the prospect, and summarizes the conversation. When your phone rings, it's not a cold call anymore. It's a closing opportunity.
              </p>
              <div className="flex flex-col gap-4">
                 <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                    <BrainCircuit className="w-8 h-8 text-indigo-400" />
                    <div>
                       <h4 className="font-bold text-white">Instant Context</h4>
                       <p className="text-sm text-slate-400">Read the summary before you even say "Hello".</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4 p-4 bg-slate-800/50 rounded-lg border border-slate-700">
                    <ShieldCheck className="w-8 h-8 text-green-400" />
                    <div>
                       <h4 className="font-bold text-white">Zero Spam</h4>
                       <p className="text-sm text-slate-400">Selai filters out gatekeepers and angry prospects.</p>
                    </div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

       {/* Feature 3: Real Time Assist */}
       <section className="py-24 px-6 bg-[#0f172a] border-t border-slate-800">
         <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">AI that whispers in your ear.</h2>
            <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto">
               Once you take the call, Selai doesn't leave. It listens to the conversation in real-time and gives you live objection handling advice.
            </p>

            <div className="relative bg-slate-900 rounded-xl border border-slate-800 p-2 max-w-3xl mx-auto shadow-2xl">
               <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold tracking-wide uppercase shadow-lg">
                  Live Workspace View
               </div>
               <div className="grid grid-cols-3 gap-1 h-64">
                  {/* Sidebar */}
                  <div className="col-span-1 bg-slate-950 rounded-l-lg p-4 flex flex-col gap-3 text-left border-r border-slate-800">
                     <div className="h-8 w-8 bg-slate-800 rounded-full mb-2"></div>
                     <div className="h-2 w-20 bg-slate-800 rounded"></div>
                     <div className="h-2 w-12 bg-slate-800 rounded"></div>
                     <div className="mt-auto p-3 bg-indigo-500/10 border border-indigo-500/20 rounded">
                        <p className="text-[10px] text-indigo-300 font-bold mb-1">AI TIP:</p>
                        <p className="text-[10px] text-white">"Mention the night-vision feature now."</p>
                     </div>
                  </div>
                  {/* Main */}
                  <div className="col-span-2 bg-slate-950 rounded-r-lg p-4 flex flex-col relative">
                     <div className="flex-1 space-y-3">
                        <div className="flex justify-start"><div className="bg-slate-800 text-slate-400 text-[10px] p-2 rounded-lg rounded-tl-none max-w-[80%]">What is the pricing model?</div></div>
                        <div className="flex justify-end"><div className="bg-blue-600 text-white text-[10px] p-2 rounded-lg rounded-tr-none max-w-[80%]">We have a flat monthly fee...</div></div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
       </section>

       {/* CTA */}
       <section className="py-20 text-center">
          <div className="max-w-2xl mx-auto px-6">
             <h2 className="text-3xl font-bold text-white mb-8">Ready to scale?</h2>
             <button 
              onClick={onLaunch}
              className="w-full md:w-auto px-12 py-4 bg-white text-slate-900 hover:bg-slate-200 rounded-xl font-bold text-lg transition-all transform hover:scale-105"
            >
              Launch Selai Dashboard
            </button>
          </div>
       </section>

       <footer className="py-8 text-center text-slate-600 text-sm border-t border-slate-900">
          &copy; {new Date().getFullYear()} Selai Systems. Powered by Google Gemini.
       </footer>

    </div>
  );
};
