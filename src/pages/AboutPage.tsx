import React from 'react';
import { 
  Truck, 
  ShieldCheck, 
  MapPin, 
  Users, 
  Layers, 
  Award, 
  CheckCircle2, 
  Flame, 
  ArrowRight,
  Building2,
  Compass,
  FileCheck2
} from 'lucide-react';
import { storageService } from '../services/storage';

interface AboutPageProps {
  setActivePage: (page: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ setActivePage }) => {
  const cms = storageService.getCMSContent();

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-sky-950/60 text-sky-400 text-xs font-mono font-bold uppercase mb-3 border border-sky-800/40">
            <span>CORPORATE PROFILE & LOGISTICS MISSION</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
            About Armtells Transport Services
          </h1>
          <p className="text-lg text-slate-300 max-w-3xl mt-2 leading-relaxed">
            “Moving Fuel Safely. Supporting Businesses Reliably.”
          </p>
        </div>

        {/* Hero Visual Banner */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden rounded-2xl border border-slate-800 bg-[#0A0A0B] shadow-2xl">
          <img 
            src="/images/armtells_terminal_depot_1787057958107.jpg" 
            alt="Armtells Bulk Petroleum Terminal Operations" 
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = 'https://images.unsplash.com/photo-1592838064575-70ed626d3a0e?auto=format&fit=crop&w=1400&q=80';
            }}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 right-4 flex items-end justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest bg-black/70 backdrop-blur px-2.5 py-1 rounded border border-amber-400/30 inline-block">
                TEMA BULK DEPOT & LOGISTICS CORRIDORS
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white uppercase">
                GSA-Calibrated Tanker Fleet • 24/7 Monitored Dispatch
              </h3>
            </div>
            <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-slate-300 bg-black/60 backdrop-blur px-3 py-1.5 rounded border border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>100% NPA Hazmat Certified</span>
            </div>
          </div>
        </div>

        {/* Narrative & Core Positioning */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl">
            <h2 className="text-xl font-bold text-white uppercase tracking-tight">
              Specialized Petroleum Tanker Haulage & Energy Logistics
            </h2>

            <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
              <p>
                {cms.aboutText || 'Armtells Transport Services is an enterprise petroleum road tanker logistics provider specializing in the safe, disciplined, and compliant transportation of refined petroleum products across Ghana.'}
              </p>
              <p>
                We bridge the critical supply chain link between primary coastal import and refinery terminals—such as the Tema Oil Refinery (TOR) Bulk Depot, BOST inland terminals, and Takoradi Bulk Hub—and authorized commercial, retail, mining, and industrial consumption points nationwide.
              </p>
              <p>
                Petroleum logistics demands absolute operational discipline. Every Bulk Road Vehicle (BRV) in our fleet is calibrated and certified by the Ghana Standards Authority (GSA), operated by ADR-certified hazardous materials drivers, and managed through rigorous journey management protocols.
              </p>
            </div>

            {/* Core Values Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase">Zero Contamination Policy</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Dedicated product lines with joint dipstick verification and hydrometer testing.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase">HSEQ Excellence</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Continuous safety audits, mandatory vapor recovery, and static grounding protocols.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase">Operational Transparency</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Instant digital Proof of Delivery with joint meter totalizers and timestamped signatures.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase">Uncompromised Custody</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">Numbered tamper-evident bolt seals on every manhole and discharge manifold.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Key Facts Summary Box */}
          <div className="lg:col-span-4 space-y-4">
            
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                OPERATIONS SNAPSHOT
              </h3>
              
              <div className="space-y-3 text-xs font-mono">
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Headquarters / Hub:</span>
                  <span className="text-white font-bold">Tema Heavy Industrial Area</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Primary Regulators:</span>
                  <span className="text-sky-400">NPA • EPA • GNFS • GSA</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Fleet Class:</span>
                  <span className="text-white">Class 3 Bulk Road Vehicles</span>
                </div>
                <div className="flex justify-between border-b border-slate-800/80 pb-2">
                  <span className="text-slate-400">Dispatch Desk:</span>
                  <span className="text-emerald-400">24/7 Operations Control</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-400">Products Handled:</span>
                  <span className="text-amber-400">AGO, PMS, Jet A-1, HFO</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
              <h3 className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
                WHO WE SERVE & WHERE
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {cms.whoWeServeText}
              </p>
              <p className="text-xs text-slate-400 leading-relaxed pt-2 border-t border-slate-800">
                {cms.whereWeOperateText}
              </p>
            </div>

          </div>
        </div>

        {/* Operational Flow Strip */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest">
              MANAGEMENT PRINCIPLES
            </span>
            <h2 className="text-2xl font-black text-white uppercase tracking-tight">
              Disciplined Fleet & Journey Architecture
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-sky-400 text-xs font-mono font-bold uppercase">
                <Compass className="w-4 h-4" /> 1. Terminal Gantry Clearance
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Strict adherence to depot loading protocols, ullage verification, bottom-loading connection checks, and dual bolt-seal verification before departure.
              </p>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-amber-400 text-xs font-mono font-bold uppercase">
                <Truck className="w-4 h-4" /> 2. Controlled Highway Transit
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Pre-approved hazmat transit corridors, continuous speed-governor monitoring at 60 km/h, driver fatigue rest breaks, and active tracking.
              </p>
            </div>

            <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold uppercase">
                <FileCheck2 className="w-4 h-4" /> 3. Certified Custody Offload
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Static ground bonding, tank water tests, joint dipstick and flow meter confirmation, supervised hose drainage, and digital signed POD generation.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-4">
          <button
            onClick={() => setActivePage('delivery-request')}
            className="px-8 py-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider rounded-lg shadow-lg transition"
          >
            Request Petroleum Delivery
          </button>
        </div>

      </div>
    </div>
  );
};
