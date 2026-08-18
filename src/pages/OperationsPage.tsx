import React from 'react';
import { 
  FileText, 
  Compass, 
  Truck, 
  MapPin, 
  FileCheck2, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Flame,
  Radio
} from 'lucide-react';
import { HowItWorksSection } from '../components/HowItWorksSection';

interface OperationsPageProps {
  setActivePage: (page: string) => void;
}

export const OperationsPage: React.FC<OperationsPageProps> = ({ setActivePage }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-sky-950/60 text-sky-400 text-xs font-mono font-bold uppercase mb-3 border border-sky-800/40">
            <span>OPERATIONAL PROCESS ARCHITECTURE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
            How Armtells Operates
          </h1>
          <p className="text-base text-slate-300 max-w-3xl mt-2 leading-relaxed">
            From initial terminal loading clearance to joint on-site meter readings and instant digital Proof of Delivery, discover our disciplined 5-stage logistics framework.
          </p>
        </div>

        {/* 5-Step Process Section */}
        <HowItWorksSection setActivePage={setActivePage} />

        {/* Deep Dive on Operational Integrity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-3 text-sky-400">
              <ShieldCheck className="w-6 h-6" />
              <h3 className="text-lg font-black text-white uppercase">
                Depot Gantry Loading Standards
              </h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              At loading terminals (Tema Oil Refinery and BOST bulk hubs), Armtells tankers interface via calibrated 4-inch API dry-break bottom-loading adaptors. Tank compartments are checked for dryness, zero vapor leaks, and strict grounding verification before high-speed gantry meters initiate product transfer.
            </p>
            <div className="space-y-2 text-xs font-mono text-slate-400 pt-2 border-t border-slate-800">
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Dual Tamper-Evident Steel Bolt Seals logged per manhole</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Density & Temperature hydrometer readings taken at rack</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Ghana Standards Authority (GSA) verified metrology totalizers</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-3 text-amber-400">
              <FileCheck2 className="w-6 h-6" />
              <h3 className="text-lg font-black text-white uppercase">
                Customer Site Custody Transfer
              </h3>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Upon arrival at the customer facility, the driver conducts a mandatory joint verification alongside the authorized site reception engineer. Seal numbers are cross-referenced with the waybill before manifold security locks are released.
            </p>
            <div className="space-y-2 text-xs font-mono text-slate-400 pt-2 border-t border-slate-800">
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Water-finding paste dipstick inspection to prove zero water ingress</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Static bonding ground clamp connected before opening dust caps</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Digital sign-off on driver terminal generates instant PDF POD</span>
              </div>
            </div>
          </div>

        </div>

        {/* CTA */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-base font-bold text-white uppercase">
              Ready to Book Your Next Delivery?
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              Secure dedicated tanker capacity with our 24/7 logistics dispatch desk.
            </p>
          </div>

          <button
            onClick={() => setActivePage('delivery-request')}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded transition"
          >
            Submit Delivery Request
          </button>
        </div>

      </div>
    </div>
  );
};
