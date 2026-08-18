import React from 'react';
import { ShieldCheck, FileText, Lock, AlertTriangle, ArrowLeft } from 'lucide-react';

interface LegalPagesProps {
  pageType: 'privacy' | 'terms' | 'safety-disclaimer';
  setActivePage: (page: string) => void;
}

export const LegalPages: React.FC<LegalPagesProps> = ({ pageType, setActivePage }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <button
          onClick={() => setActivePage('home')}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-white uppercase transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Operations
        </button>

        {pageType === 'privacy' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-widest block mb-1">
                LEGAL COMPLIANCE
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                Privacy Policy & Data Security
              </h1>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                Effective Date: January 1, 2026 • Armtells Transport Services
              </p>
            </div>

            <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
              <h3 className="text-sm font-bold text-white uppercase">1. Information We Collect</h3>
              <p>
                Armtells Transport Services collects customer information necessary for hazardous petroleum transport coordination, including company registration details, authorized contact persons, site delivery GPS coordinates, and reception facility authorizations.
              </p>

              <h3 className="text-sm font-bold text-white uppercase">2. Use of Telemetry & GPS Data</h3>
              <p>
                Real-time geolocation telemetry is collected strictly for journey management, corridor safety compliance, ETA forecasting, and insurance verification under NPA standards.
              </p>

              <h3 className="text-sm font-bold text-white uppercase">3. Custody & Digital Signature Archival</h3>
              <p>
                All digital Proof of Delivery records, receiver signatures, meter calibration logs, and seal numbers are encrypted and retained for 7 years in compliance with national metrology and tax audits.
              </p>
            </div>
          </div>
        )}

        {pageType === 'terms' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block mb-1">
                COMMERCIAL CONDITIONS
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                Terms & Conditions of Carriage
              </h1>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                Bulk Petroleum Transportation & Logistics Carriage Rules
              </p>
            </div>

            <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
              <h3 className="text-sm font-bold text-white uppercase">1. Regulatory Authorization</h3>
              <p>
                Carriage of petroleum products is conducted under the licensing of the National Petroleum Authority (NPA) and Environmental Protection Agency (EPA). Armtells only discharges products into verified, authorized storage tanks.
              </p>

              <h3 className="text-sm font-bold text-white uppercase">2. Demurrage & Site Offloading</h3>
              <p>
                Standard offloading window allows 2.5 hours from tanker arrival. Additional waiting time caused by customer tank ullage unavailability or site delays will be billed under standard demurrage tariffs.
              </p>

              <h3 className="text-sm font-bold text-white uppercase">3. Custody Transfer & Dipstick Reconciliation</h3>
              <p>
                Product quantity and quality are jointly verified by dipstick or calibrated meter before the tanker discharge valve is unsealed. Once the customer signs the digital Proof of Delivery, custody is legally transferred.
              </p>
            </div>
          </div>
        )}

        {pageType === 'safety-disclaimer' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest block mb-1">
                HSEQ SAFETY DECLARATION
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                Safety & Regulatory Disclaimer
              </h1>
              <p className="text-xs text-slate-400 mt-1 font-mono">
                Hazardous Materials Transportation Notice
              </p>
            </div>

            <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
              <p>
                Petroleum products (including AGO Diesel UN 1202, PMS Petrol UN 1203, and Jet A-1 UN 1863) are Class 3 hazardous flammable liquids.
              </p>
              <p>
                Armtells drivers reserve the right to abort offloading operations immediately if the customer delivery site exhibits unsafe conditions, including lack of certified static earthing points, open flames, active smoking, inadequate containment bunds, or missing fire extinguishers.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
