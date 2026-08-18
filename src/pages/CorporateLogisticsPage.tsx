import React from 'react';
import { 
  Building2, 
  Truck, 
  ShieldCheck, 
  Layers, 
  CalendarClock, 
  FileText, 
  ArrowRight,
  CheckCircle2,
  Lock,
  Flame,
  Award
} from 'lucide-react';

interface CorporateLogisticsProps {
  setActivePage: (page: string) => void;
}

export const CorporateLogisticsPage: React.FC<CorporateLogisticsProps> = ({ setActivePage }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/10 text-amber-400 text-xs font-mono font-bold uppercase mb-3 border border-amber-500/30">
            <Building2 className="w-4 h-4" />
            <span>ENTERPRISE PETROLEUM LOGISTICS AGREEMENTS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
            Corporate & Dedicated Tanker Contracts
          </h1>
          <p className="text-base text-slate-300 max-w-3xl mt-2 leading-relaxed">
            Reserved tanker capacity, dedicated certified drivers, locked-in commercial transport tariffs, and priority terminal loading for high-volume commercial enterprises.
          </p>
        </div>

        {/* 4 Pillars of Dedicated Logistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-3">
            <div className="p-3 bg-slate-950 text-sky-400 rounded-lg border border-slate-800 w-fit">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white uppercase">Dedicated Fleet Units</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Tankers reserved exclusively for your supply chain, eliminating vehicle shortages during peak demand cycles or fuel market constraints.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-3">
            <div className="p-3 bg-slate-950 text-amber-400 rounded-lg border border-slate-800 w-fit">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white uppercase">Assigned Driver Teams</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Experienced, ADR-certified drivers trained specifically on your facility’s induction protocols, site layout, and emergency shutdown valves.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-3">
            <div className="p-3 bg-slate-950 text-emerald-400 rounded-lg border border-slate-800 w-fit">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white uppercase">Master Service Agreements</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Predictable, index-linked haulage pricing frameworks with standardized 30-day corporate credit terms and monthly automated reconciliations.
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-3">
            <div className="p-3 bg-slate-950 text-purple-400 rounded-lg border border-slate-800 w-fit">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-white uppercase">Priority Gantry Access</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Streamlined depot loading slots at Tema Oil Refinery and BOST hubs through dedicated dispatch coordination and advance order scheduling.
            </p>
          </div>
        </div>

        {/* Agreement Framework & Enterprise Features */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <h2 className="text-xl font-bold text-white uppercase tracking-tight">
            Enterprise Logistics SLA Deliverables
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300">
            <div className="flex items-start gap-2.5 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
              <div>
                <strong className="text-white block uppercase mb-0.5">Guaranteed Vehicle Availability</strong>
                Continuous standby capacity with backup replacement tanker guarantee within 4 hours in case of scheduled vehicle maintenance.
              </div>
            </div>

            <div className="flex items-start gap-2.5 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
              <div>
                <strong className="text-white block uppercase mb-0.5">Digital ERP & Telemetry Integration</strong>
                Real-time automated delivery notifications, electronic Proof of Delivery PDFs directly ingested into your enterprise procurement system.
              </div>
            </div>

            <div className="flex items-start gap-2.5 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
              <div>
                <strong className="text-white block uppercase mb-0.5">Dedicated Account Dispatch Manager</strong>
                A single point of operational contact available 24/7 to manage your terminal schedules, route clearances, and emergency drops.
              </div>
            </div>

            <div className="flex items-start gap-2.5 bg-slate-950 p-4 rounded-xl border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
              <div>
                <strong className="text-white block uppercase mb-0.5">Full Goods-in-Transit & Spillage Coverage</strong>
                Comprehensive commercial insurance coverage protecting your petroleum product from gantry meter loading through to final site reception.
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              Ideal for Mining Companies, Forecourt Retail Chains, and Large Industrial Plants requiring &gt; 150,000 Litres/month.
            </div>

            <button
              onClick={() => setActivePage('quote')}
              className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded transition"
            >
              Request Corporate Contract Proposal
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
