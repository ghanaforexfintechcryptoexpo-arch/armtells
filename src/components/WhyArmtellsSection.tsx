import React from 'react';
import { ShieldCheck, Clock, Eye, SlidersHorizontal, ArrowRight, Truck } from 'lucide-react';

interface WhyArmtellsProps {
  setActivePage: (page: string) => void;
}

export const WhyArmtellsSection: React.FC<WhyArmtellsProps> = ({ setActivePage }) => {
  const pillars = [
    {
      title: 'RELIABILITY',
      subtitle: 'Operational Consistency',
      icon: Clock,
      color: 'text-amber-400',
      borderColor: 'border-amber-500/30',
      description: 'Professional transportation coordination designed around dependable delivery schedules, terminal gantry clearance efficiency, and committed fleet capacity.'
    },
    {
      title: 'SAFETY',
      subtitle: 'Rigorous Hazard Standards',
      icon: ShieldCheck,
      color: 'text-emerald-400',
      borderColor: 'border-emerald-500/30',
      description: 'Safety-focused tanker operations and disciplined procedures. Certified Class 3 dangerous goods drivers, hydrostatic barrel recertification, and full spill mitigation readiness.'
    },
    {
      title: 'VISIBILITY',
      subtitle: 'End-to-End Tracking',
      icon: Eye,
      color: 'text-sky-400',
      borderColor: 'border-sky-500/30',
      description: 'Clear communication and delivery-status visibility. Direct stage updates from depot departure through to calibrated joint dipstick readings and digital Proof of Delivery.'
    },
    {
      title: 'FLEXIBILITY',
      subtitle: 'Commercial Agility',
      icon: SlidersHorizontal,
      color: 'text-purple-400',
      borderColor: 'border-purple-500/30',
      description: 'Adaptable logistics solutions tailored for scheduled retail drops, large-scale mining replenishment, tight urban construction sites, and dedicated contract fleet agreements.'
    }
  ];

  return (
    <section className="bg-[#0A0A0B] py-14 px-4 sm:px-6 lg:px-8 text-white border-b border-white/10">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#FF6B00] uppercase tracking-widest mb-1.5">
            <span>OUR CORE OPERATIONAL PILLARS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white uppercase tracking-tight font-sans">
            Why Armtells Transport Services?
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 font-normal">
            Petroleum logistics requires uncompromising standards. We build our operations on four disciplined cornerstones to protect your cargo, site, and supply continuity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div 
                key={idx}
                className="bg-[#0F0F11] border border-white/10 rounded-sm p-5 flex flex-col justify-between hover:border-white/30 transition-all duration-200"
              >
                <div>
                  <div className="flex items-center justify-between mb-3.5">
                    <div className="p-2.5 rounded-sm bg-white/5 border border-white/10 text-[#FF6B00]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] font-mono text-slate-500 uppercase font-bold tracking-widest">
                      PILLAR 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-sm font-extrabold text-white uppercase tracking-wider mb-0.5">
                    {pillar.title}
                  </h3>
                  <p className="text-[10px] font-semibold text-slate-400 font-mono mb-2">
                    {pillar.subtitle}
                  </p>

                  <p className="text-xs text-slate-400 leading-relaxed font-normal">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-3 mt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-500">Verified Protocol</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Corporate Commitment Banner */}
        <div className="mt-8 bg-[#0F0F11] border border-white/10 rounded-sm p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-white/5 border border-white/10 text-[#FF6B00] rounded-sm">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white uppercase font-sans">Corporate Master Logistics Agreements</h4>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Looking for recurring fuel transportation or dedicated tanker capacity? Learn about our enterprise contracts.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={() => setActivePage('corporate-logistics')}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 font-mono font-bold text-xs uppercase tracking-wider rounded-sm transition cursor-pointer"
            >
              Corporate Solutions
            </button>
            <button
              onClick={() => setActivePage('quote')}
              className="px-4 py-2 bg-[#FF6B00] hover:bg-[#ff8533] text-black font-extrabold text-xs uppercase tracking-wider rounded-sm transition cursor-pointer"
            >
              Request Quote
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
