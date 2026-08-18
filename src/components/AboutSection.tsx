import React from 'react';
import { 
  ShieldCheck, 
  Truck, 
  MapPin, 
  Layers, 
  Users, 
  CheckCircle2, 
  ArrowRight,
  Radio,
  FileCheck2
} from 'lucide-react';
import { storageService } from '../services/storage';

interface AboutSectionProps {
  setActivePage: (page: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ setActivePage }) => {
  const cms = storageService.getCMSContent();

  return (
    <section className="bg-[#0A0A0B] py-14 px-4 sm:px-6 lg:px-8 text-white border-b border-white/10 relative">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Mission & Operational Discipline */}
          <div className="lg:col-span-7 space-y-5">
            
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm bg-white/5 border border-white/10 text-[#FF6B00] text-[10px] font-mono font-bold uppercase tracking-widest">
              <span>ABOUT ARMTELLS TRANSPORT SERVICES</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white uppercase tracking-tight leading-tight font-sans">
              Moving Fuel Safely. <br />
              <span className="text-[#FF6B00]">
                Supporting Businesses Reliably.
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-normal">
              {cms.aboutText || 'Armtells Transport Services provides specialized petroleum tanker transportation and bulk fuel logistics designed to seamlessly connect authorized fuel supply depots with commercial and industrial destinations.'}
            </p>

            {/* Operational Pillars Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-start gap-2.5 bg-[#0F0F11] border border-white/10 p-3 rounded-sm">
                <CheckCircle2 className="w-4 h-4 text-[#FF6B00] mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase font-sans">Operational Discipline</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">Strict depot gantry clearance, tamper-evident seals, and metered transfer.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 bg-[#0F0F11] border border-white/10 p-3 rounded-sm">
                <CheckCircle2 className="w-4 h-4 text-[#FF6B00] mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase font-sans">Professional Drivers</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">Hazardous materials (ADR/Hazchem) certified, defensive driving trained.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 bg-[#0F0F11] border border-white/10 p-3 rounded-sm">
                <CheckCircle2 className="w-4 h-4 text-[#FF6B00] mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase font-sans">Tanker Fleet Integrity</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">Bottom-loading, vapor recovery, hydrostatic pressure certified barrels.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 bg-[#0F0F11] border border-white/10 p-3 rounded-sm">
                <CheckCircle2 className="w-4 h-4 text-[#FF6B00] mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-bold text-white uppercase font-sans">Real-Time Coordination</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5">Dedicated dispatch updates, active tracking, and instant digital POD.</p>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setActivePage('about')}
                className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white font-bold text-xs uppercase tracking-wider rounded-sm border border-white/10 transition flex items-center gap-1.5 cursor-pointer font-mono"
              >
                <span>Read Full Profile</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setActivePage('safety')}
                className="px-5 py-2.5 bg-transparent hover:bg-white/5 text-slate-300 font-bold text-xs uppercase tracking-wider rounded-sm border border-white/10 transition flex items-center gap-1.5 cursor-pointer font-mono"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Safety & Compliance Standards</span>
              </button>
            </div>

          </div>

          {/* Right Column: Key Operational Areas (Who / Where / How) */}
          <div className="lg:col-span-5 space-y-3">
            
            {/* Box 1: Who We Serve */}
            <div className="bg-[#0F0F11] border border-white/10 p-4 rounded-sm">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#FF6B00] uppercase mb-1.5">
                <Users className="w-4 h-4" />
                <span>Who We Serve</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                {cms.whoWeServeText || 'Fuel retail networks, mining operations, civil contractors, industrial manufacturing plants, commercial fleet depots, and continuous power generation facilities.'}
              </p>
            </div>

            {/* Box 2: Where We Operate */}
            <div className="bg-[#0F0F11] border border-white/10 p-4 rounded-sm">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#FF6B00] uppercase mb-1.5">
                <MapPin className="w-4 h-4" />
                <span>Where We Operate</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed mb-2 font-normal">
                {cms.whereWeOperateText || 'Operating across major national industrial corridors, connecting primary bulk supply terminals (Tema Oil Refinery and Takoradi) to authorized commercial destinations nationwide.'}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {cms.operatingCorridors?.slice(0, 3).map((corridor, idx) => (
                  <span key={idx} className="bg-black/60 text-slate-300 text-[10px] font-mono px-2 py-0.5 rounded-sm border border-white/10">
                    {corridor}
                  </span>
                ))}
              </div>
            </div>

            {/* Box 3: How We Work */}
            <div className="bg-[#0F0F11] border border-white/10 p-4 rounded-sm">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#FF6B00] uppercase mb-1.5">
                <Layers className="w-4 h-4" />
                <span>How We Work</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-normal">
                {cms.howWeWorkText || 'Through a disciplined 5-step operational framework: Order Validation → Depot Terminal Clearance → Safe Corridor Transit → Calibrated Meter Discharge → Instant Signed Proof of Delivery.'}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
