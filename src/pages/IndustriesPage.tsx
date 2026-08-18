import React from 'react';
import { 
  Fuel, 
  Pickaxe, 
  HardHat, 
  Factory, 
  Sprout, 
  Zap, 
  Building2, 
  Anchor, 
  Truck, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';

interface IndustriesPageProps {
  setActivePage: (page: string) => void;
}

export const IndustriesPage: React.FC<IndustriesPageProps> = ({ setActivePage }) => {
  const industries = [
    {
      id: 'fuel-retail',
      title: 'Fuel Retail & Forecourt Networks',
      icon: Fuel,
      accent: 'text-amber-400',
      description: 'Reliable bulk deliveries of PMS Petrol and AGO Diesel directly to dealer-owned and company-operated service stations across national highway routes.',
      useCase: 'Multi-compartment drops, night offloading, rapid forecourt replenishment',
      tankerType: '36,000L - 45,000L Multi-Cell Road Tankers'
    },
    {
      id: 'mining',
      title: 'Mining & Mineral Extraction',
      icon: Pickaxe,
      accent: 'text-emerald-400',
      description: 'Continuous long-haul diesel transport for remote open-pit mining operations, gold extraction circuits, heavy haul trucks, and pit generator stations.',
      useCase: 'Dedicated Super B-Train capacity, tamper-proof bolt seals, rough-road corridor escort',
      tankerType: '48,000L High-Payload Aluminum Tankers'
    },
    {
      id: 'construction',
      title: 'Civil Construction & Infrastructure',
      icon: HardHat,
      accent: 'text-sky-400',
      description: 'Mobile on-site refueling for road construction projects, earthworks, dam projects, heavy cranes, batching plants, and remote quarry plants.',
      useCase: 'Direct-to-equipment fueling with 45m motorized hose reels, flexible on-demand dispatch',
      tankerType: '18,000L - 28,000L High-Maneuverability Rigid Tankers'
    },
    {
      id: 'manufacturing',
      title: 'Industrial Manufacturing & Mills',
      icon: Factory,
      accent: 'text-purple-400',
      description: 'Uninterrupted energy logistics for industrial boilers, steel smelting plants, textile factories, beverage bottling facilities, and plastics manufacturing.',
      useCase: 'Continuous 24/7 AGO & HFO supply, calibrated custody transfer, certified testing',
      tankerType: '45,000L Bulk Tankers & Heated Heavy Oil Barrels'
    },
    {
      id: 'agriculture',
      title: 'Agro-Industrial & Commercial Farming',
      icon: Sprout,
      accent: 'text-lime-400',
      description: 'Bulk diesel delivery for industrial rubber estates, oil palm processing plantations, commercial harvesters, irrigation pump farms, and tractor depots.',
      useCase: 'Seasonal harvest demand scaling, farm tank drop-offs, clean fuel assurance',
      tankerType: '28,000L - 36,000L All-Terrain Road Tankers'
    },
    {
      id: 'power-energy',
      title: 'Power Generation & Data Centers',
      icon: Zap,
      accent: 'text-yellow-400',
      description: 'Mission-critical diesel supply for corporate high-rises, data centers, telecommunications tower hubs, hospitals, and independent power producer installations.',
      useCase: 'Emergency priority response within 2-4 hours, metered high-speed filtration pumps',
      tankerType: 'Metered High-Flow Pump Tankers (850 L/min)'
    },
    {
      id: 'commercial-fleets',
      title: 'Commercial Fleets & Transport Hubs',
      icon: Truck,
      accent: 'text-cyan-400',
      description: 'Bulk logistics for inter-city haulage staging yards, passenger bus terminals, shipping container depots, and heavy logistics staging centers.',
      useCase: 'Scheduled weekly replenishment, bulk yard tank filling, automated volume logs',
      tankerType: '36,000L - 45,000L Standard Haulers'
    },
    {
      id: 'marine-ports',
      title: 'Marine Bunkering & Port Terminals',
      icon: Anchor,
      accent: 'text-blue-400',
      description: 'Transportation of Marine Gas Oil (MGO) to authorized commercial harbor terminals, tugboat staging piers, and industrial port logistics staging zones.',
      useCase: 'Quayside bunkering coordination, port authority safety clearance, custom hose couplers',
      tankerType: '45,000L High-Volume MGO Transport Tankers'
    },
    {
      id: 'corporate-facilities',
      title: 'Corporate Campuses & Facilities',
      icon: Building2,
      accent: 'text-indigo-400',
      description: 'Scheduled fuel delivery for banking headquarters, commercial shopping malls, educational institutions, and corporate office parks.',
      useCase: 'Clean, spill-free basement and underground tank deliveries during off-peak hours',
      tankerType: 'Quiet Compact Metered Delivery Tankers'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-sky-950/60 text-sky-400 text-xs font-mono font-bold uppercase mb-3 border border-sky-800/40">
            <span>SECTOR SPECIALIZATIONS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
            Industries We Serve
          </h1>
          <p className="text-base text-slate-300 max-w-3xl mt-2 leading-relaxed">
            Armtells Transport Services provides tailored bulk fuel haulage and customized offloading solutions for commercial, industrial, mining, and retail petroleum sectors.
          </p>
        </div>

        {/* Industries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {industries.map((ind) => {
            const Icon = ind.icon;
            return (
              <div 
                key={ind.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between hover:border-slate-700 transition shadow-xl"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-3 bg-slate-950 rounded-xl border border-slate-800 ${ind.accent}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-base font-black text-white uppercase tracking-tight">
                      {ind.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {ind.description}
                  </p>

                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80 space-y-2 mb-4 text-xs font-mono">
                    <div>
                      <span className="text-slate-500 uppercase text-[10px] block">Key Operational Capability</span>
                      <span className="text-slate-200">{ind.useCase}</span>
                    </div>
                    <div>
                      <span className="text-slate-500 uppercase text-[10px] block">Allocated Tanker Standard</span>
                      <span className="text-amber-400 font-semibold">{ind.tankerType}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => setActivePage('delivery-request')}
                    className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1"
                  >
                    <span>Request Transport</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={() => setActivePage('quote')}
                    className="text-[11px] font-mono text-slate-400 hover:text-white"
                  >
                    Get Sector Rate
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center max-w-3xl mx-auto space-y-4">
          <h3 className="text-2xl font-black text-white uppercase tracking-tight">
            Have Specific Industry Requirements?
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            From remote mining concessions requiring escort permits to city center retail stations requiring night deliveries, we tailor logistics to your operational reality.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setActivePage('delivery-request')}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-lg transition"
            >
              Book Industry Transport Capacity
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
