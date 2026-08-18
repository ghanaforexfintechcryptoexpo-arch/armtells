import React from 'react';
import { 
  MapPin, 
  Truck, 
  Compass, 
  ShieldCheck, 
  Clock, 
  ArrowRight,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { storageService } from '../services/storage';

interface RegionalCorridorsPageProps {
  setActivePage: (page: string) => void;
}

export const RegionalCorridorsPage: React.FC<RegionalCorridorsPageProps> = ({ setActivePage }) => {
  const corridors = [
    {
      name: 'Tema Heavy Industrial & Coastal Corridor',
      origin: 'Tema Oil Refinery (TOR) & BOST Bulk Depot',
      destinations: 'Greater Accra, Kpone, Prampram, Spintex, North Industrial Area',
      distance: '15 - 65 Km',
      transitTime: '1 - 3 Hours',
      products: 'AGO Diesel, PMS Petrol, Heavy Fuel Oil (HFO), Jet A-1',
      features: 'High-frequency daily shuttle runs, night discharge options for retail stations, dedicated industrial park delivery.'
    },
    {
      name: 'Accra - Kumasi Commercial Arterial Corridor',
      origin: 'Tema / Accra Bulk Terminals',
      destinations: 'Suhum, Nsawam, Nkawkaw, Kumasi Central, Kaase Industrial Hub',
      distance: '240 - 270 Km',
      transitTime: '5 - 7 Hours',
      products: 'AGO Diesel, PMS Petrol, Lubricants',
      features: 'Approved N6 Highway hazardous haulage route, mandatory mid-journey fatigue stops, dual-driver long-haul protocols.'
    },
    {
      name: 'Takoradi - Western Mining Belt Corridor',
      origin: 'Takoradi Bulk Terminal (Main Harbor)',
      destinations: 'Tarkwa, Prestea, Bogoso, Damang, Awaso Mining Concessions',
      distance: '120 - 220 Km',
      transitTime: '3 - 6 Hours',
      products: 'High-Spec Low-Sulphur AGO Diesel, Industrial Lubricants',
      features: 'Reinforced rough-road tanker suspensions, mining site induction clearances, GPS geofencing with speed alerts.'
    },
    {
      name: 'Buipe - Northern & Savannah Inland Corridor',
      origin: 'Buipe Inland River Terminal / Kumasi Depot',
      destinations: 'Tamale, Yendi, Bolgatanga, Wa, Upper East Border Hubs',
      distance: '180 - 450 Km',
      transitTime: '4 - 10 Hours',
      products: 'AGO Diesel, PMS Petrol, Illuminating Kerosene',
      features: 'Long-haul high-volume Super B-Train combinations, strategic fuel reserve replenishment, inter-depot bulk transfers.'
    },
    {
      name: 'Eastern & Volta Agricultural Corridors',
      origin: 'Tema Oil Depot',
      destinations: 'Koforidua, Ho, Sogakope, Akosombo, Juapong Mills',
      distance: '85 - 190 Km',
      transitTime: '2 - 5 Hours',
      products: 'AGO Diesel, Farm Equipment Gas Oil',
      features: 'Agro-processing facility drops, textile factory scheduled deliveries, river transport staging refueling.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-sky-950/60 text-sky-400 text-xs font-mono font-bold uppercase mb-3 border border-sky-800/40">
            <Compass className="w-4 h-4" />
            <span>PRIMARY TRANSIT NETWORKS & ROUTE ARCHITECTURE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
            Operating Regional Corridors
          </h1>
          <p className="text-base text-slate-300 max-w-3xl mt-2 leading-relaxed">
            Armtells Transport Services operates along pre-approved, safety-cleared petroleum transit corridors connecting primary coastal refineries and terminals with inland industrial hubs and mining centers nationwide.
          </p>
        </div>

        {/* Corridors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {corridors.map((c, idx) => (
            <div 
              key={idx}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between hover:border-slate-700 transition shadow-xl"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-amber-400" /> CORRIDOR 0{idx + 1}
                  </span>
                  <span className="text-xs font-mono text-slate-400">
                    Est. {c.transitTime}
                  </span>
                </div>

                <h3 className="text-lg font-black text-white uppercase tracking-tight">
                  {c.name}
                </h3>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2 text-xs font-mono">
                  <div>
                    <span className="text-slate-500 uppercase text-[10px] block">Primary Loading Terminal:</span>
                    <span className="text-amber-400 font-semibold">{c.origin}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase text-[10px] block">Key Destination Hubs:</span>
                    <span className="text-slate-200">{c.destinations}</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-slate-900">
                    <span className="text-slate-500">Typical Distance:</span>
                    <span className="text-slate-300">{c.distance}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {c.features}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">
                  Products: {c.products.split(',')[0]}...
                </span>
                <button
                  onClick={() => setActivePage('delivery-request')}
                  className="text-xs font-bold text-sky-400 hover:text-sky-300 flex items-center gap-1"
                >
                  <span>Book Route</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Corridor Safety Protocol Box */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-4">
          <h3 className="text-xl font-bold text-white uppercase flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            Hazardous Cargo Journey Management Protocols
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">
            To ensure zero road incidents, every long-haul journey is governed by electronic speed limiters (60 km/h max for loaded tankers), mandatory rest checkpoints, curfew rules preventing travel through congested city centers during rush hours, and 24/7 telemetry monitoring.
          </p>
        </div>

      </div>
    </div>
  );
};
