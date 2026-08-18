import React from 'react';
import { 
  Truck, 
  ShieldCheck, 
  ArrowRight, 
  Search, 
  Flame, 
  CheckCircle2, 
  Layers, 
  Navigation, 
  Gauge, 
  MapPin, 
  Clock, 
  Radio
} from 'lucide-react';
import { storageService } from '../services/storage';

interface HeroProps {
  setActivePage: (page: string) => void;
  onOpenTrackingModal: (id?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ setActivePage, onOpenTrackingModal }) => {
  const [trackInput, setTrackInput] = React.useState('');
  const cms = storageService.getCMSContent();
  const analytics = storageService.getAnalyticsSummary();

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackInput.trim()) {
      onOpenTrackingModal(trackInput.trim());
    } else {
      setActivePage('track');
    }
  };

  return (
    <section className="relative bg-[#0A0A0B] text-white overflow-hidden border-b border-white/10">
      
      {/* Background Subtle Gradient & Grid Pattern */}
      <div className="absolute inset-0 opacity-15 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      <div className="absolute -left-20 top-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#1a365d] to-transparent rotate-12 scale-150" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left Hero Content - High Density Display */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-12 bg-[#FF6B00]"></span>
              <span className="text-[#FF6B00] uppercase tracking-[0.3em] text-xs font-bold font-mono">
                Premium Fuel Logistics
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[0.95] tracking-tighter uppercase font-sans">
              PETROLEUM <br />
              LOGISTICS YOU <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-500">
                CAN COUNT ON.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-slate-400 text-base sm:text-lg max-w-lg leading-relaxed font-normal">
              Safe, dependable tanker transportation and bulk fuel delivery to filling stations, industrial facilities, and mining operations.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                id="hero-request-delivery-btn"
                onClick={() => setActivePage('delivery-request')}
                className="px-8 py-4 bg-[#FF6B00] text-black font-bold uppercase tracking-widest text-xs hover:bg-[#ff8533] transition-colors rounded-sm shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>Request a Delivery</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-track-delivery-btn"
                onClick={() => setActivePage('track')}
                className="px-8 py-4 bg-transparent border border-white/20 text-white font-bold uppercase tracking-widest text-xs hover:bg-white/5 transition-colors rounded-sm flex items-center gap-2 cursor-pointer"
              >
                <Radio className="w-4 h-4 text-[#FF6B00] animate-pulse" />
                <span>Track Shipment</span>
              </button>
            </div>

            {/* Compact Search Row */}
            <div className="pt-2 max-w-md">
              <form onSubmit={handleTrack} className="flex items-center gap-2 bg-white/5 border border-white/10 p-1 rounded-sm">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Enter Delivery ID (e.g. ART-2026-000101)..."
                    value={trackInput}
                    onChange={(e) => setTrackInput(e.target.value)}
                    className="w-full bg-transparent pl-9 pr-3 py-1 text-xs text-white placeholder:text-slate-500 focus:outline-none font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-[#FF6B00] hover:bg-[#ff8533] text-black font-bold text-xs uppercase tracking-wider rounded-sm transition"
                >
                  Locate
                </button>
              </form>
              <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono mt-1.5 pl-1">
                <span>Sample IDs:</span>
                <button type="button" onClick={() => onOpenTrackingModal('ART-2026-000101')} className="text-slate-400 hover:text-white underline">ART-2026-000101</button>
                <span>•</span>
                <button type="button" onClick={() => onOpenTrackingModal('ART-2026-000102')} className="text-slate-400 hover:text-white underline">ART-2026-000102</button>
              </div>
            </div>

            {/* High Density Metric Counter Strip */}
            <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-6 mt-4">
              <div>
                <div className="text-2xl font-mono font-bold text-[#FF6B00]">100%</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Safety Compliance</div>
              </div>
              <div>
                <div className="text-2xl font-mono font-bold text-white uppercase">Real-Time</div>
                <div className="text-[10px] text-slate-500 uppercase tracking-widest mt-1">Logistics Visibility</div>
              </div>
            </div>

          </div>

          {/* Right Hero: High Density Operations Dashboard Section */}
          <div className="lg:col-span-5 bg-[#0F0F11] border border-white/10 p-6 rounded-lg flex flex-col justify-between shadow-2xl">
            
            {/* Dashboard Live Bar */}
            <div className="flex items-center justify-between mb-4 border-b border-white/10 pb-3">
              <h2 className="text-xs font-bold uppercase tracking-widest flex items-center gap-2 text-white">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                Operations Dashboard
              </h2>
              <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">
                LIVE FEED: TEMA LOGISTICS HUB
              </span>
            </div>

            <div className="flex-1 flex flex-col gap-3.5">
              
              {/* Active Delivery Telemetry Card */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider mb-0.5">Active Delivery</div>
                    <div className="font-mono text-sm text-white font-bold">ART-2026-000492</div>
                  </div>
                  <span className="px-2 py-0.5 bg-blue-500/10 text-blue-400 text-[9px] font-bold rounded border border-blue-500/20 uppercase font-mono">
                    In Transit
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs mb-3 font-mono">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-white"></div>
                    <div className="w-[1px] h-4 bg-white/20"></div>
                    <div className="w-2 h-2 border border-white/40 rounded-full"></div>
                  </div>
                  <div className="flex flex-col gap-1.5 text-[11px]">
                    <div>Tema Bulk Loading Terminal <span className="text-slate-500 ml-2">08:30 AM</span></div>
                    <div className="text-slate-400">Mining Site Alpha / Tarkwa <span className="text-slate-500 ml-2">(Est. 2:45 PM)</span></div>
                  </div>
                </div>

                <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#FF6B00] w-[65%] h-full"></div>
                </div>
                <div className="flex justify-between text-[9px] font-mono text-slate-500 mt-1">
                  <span>Speed: 62 km/h • GN-4821-23</span>
                  <span className="text-[#FF6B00]">65% Corridor Completed</span>
                </div>
              </div>

              {/* High Density Status Metrics Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/5 border border-white/10 p-3.5 rounded-lg">
                  <div className="text-xs text-slate-400 mb-0.5">Fleet Status</div>
                  <div className="text-xl font-bold font-mono text-white">24 / 28</div>
                  <div className="text-[9px] text-slate-500 uppercase tracking-wider mt-1 font-mono">Tankers Active</div>
                </div>

                <div className="bg-white/5 border border-white/10 p-3.5 rounded-lg">
                  <div className="text-xs text-slate-400 mb-0.5">Fuel Delivered</div>
                  <div className="text-xl font-bold font-mono text-white">1.2M L</div>
                  <div className="text-[9px] text-slate-500 uppercase tracking-wider mt-1 font-mono">MTD Volume</div>
                </div>
              </div>

              {/* Visual Radar Viewport */}
              <div className="border border-white/10 rounded-lg relative overflow-hidden bg-[#0A0A0B] p-4 min-h-[110px] flex flex-col justify-between">
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                <div className="absolute top-1/2 left-1/4 w-[180px] h-[1px] bg-gradient-to-r from-transparent via-[#FF6B00] to-transparent -rotate-45 pointer-events-none"></div>

                <div className="flex justify-between items-center relative z-10">
                  <span className="text-[9px] font-mono uppercase text-slate-500">Telemetry Radar</span>
                  <span className="text-[9px] font-mono text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> GPS Governed
                  </span>
                </div>

                <div className="relative z-10 p-2 bg-black/80 backdrop-blur border border-white/10 rounded-sm text-[10px] self-start mt-2">
                  <div className="text-slate-400 uppercase font-bold text-[9px] mb-0.5">Tanker Corridor Ping</div>
                  <div className="font-mono text-white font-bold text-[10px]">TKR-88-GH | VOLVO FM440 (45,000L AGO)</div>
                </div>
              </div>

            </div>

            {/* Card Footer Link */}
            <div className="mt-3 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
              <span className="text-[11px] text-slate-400 font-mono flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                EPA & NPA Approved
              </span>
              <button
                onClick={() => setActivePage('fleet')}
                className="text-xs font-mono text-[#FF6B00] hover:text-[#ff8533] flex items-center gap-1 cursor-pointer"
              >
                <span>Fleet Specs →</span>
              </button>
            </div>

          </div>

        </div>

        {/* High Density Trust Indicators Strip */}
        <div className="mt-12 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-[#FF6B00] uppercase tracking-widest">
              <Truck className="w-4 h-4" />
              <span>Filling Stations</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-tight">
              Dedicated bulk logistics for high-volume retail fuel networks across the region.
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-[#FF6B00] uppercase tracking-widest">
              <Gauge className="w-4 h-4" />
              <span>Industrial Supply</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-tight">
              Precision delivery for manufacturing and power generation sites with zero downtime.
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-[#FF6B00] uppercase tracking-widest">
              <MapPin className="w-4 h-4" />
              <span>Mining & Remote</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-tight">
              Logistical support for remote mining operations requiring heavy-duty tanker capability.
            </p>
          </div>

          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-xs font-bold text-[#FF6B00] uppercase tracking-widest">
              <Clock className="w-4 h-4" />
              <span>Scheduled Ops</span>
            </div>
            <p className="text-[11px] text-slate-500 leading-tight">
              Recurring supply contracts with integrated inventory management and dispatch.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
