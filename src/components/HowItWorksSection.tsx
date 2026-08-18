import React from 'react';
import { 
  FileText, 
  Compass, 
  Truck, 
  MapPin, 
  FileCheck2, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

interface HowItWorksSectionProps {
  setActivePage: (page: string) => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ setActivePage }) => {
  const steps = [
    {
      step: '01',
      title: 'REQUEST',
      subtitle: 'Order Submission',
      icon: FileText,
      description: 'Customer submits fuel delivery requirements including product type, quantity (litres), destination coordinates, and preferred time window.',
      details: 'Online Booking • WhatsApp • API Order Transfer'
    },
    {
      step: '02',
      title: 'PLAN',
      subtitle: 'Terminal & Route Clearance',
      icon: Compass,
      description: 'Our logistics desk verifies loading terminal allocations (TOR/BOST), route safety parameters, transit permits, and custody transfer protocols.',
      details: 'Depot Allocation • Hazmat Route Planning'
    },
    {
      step: '03',
      title: 'ASSIGN',
      subtitle: 'Fleet & Driver Dispatch',
      icon: Truck,
      description: 'The optimal calibrated tanker (18k to 48k Litres) and ADR-certified driver are assigned. Tamper-evident bolt seals and gantry meters are recorded.',
      details: 'Tanker Allocation • Bolt Seal Number Logging'
    },
    {
      step: '04',
      title: 'DELIVER',
      subtitle: 'Controlled Corridor Transit',
      icon: MapPin,
      description: 'Fuel is safely transported along approved corridors. Driver initiates arrival safety check, grounding bonding earthing clamp, and joint dipstick reading.',
      details: 'Vapor Recovery • Static Earthing • Supervised Drop'
    },
    {
      step: '05',
      title: 'CONFIRM',
      subtitle: 'Digital POD & Reconciliation',
      icon: FileCheck2,
      description: 'Authorized site receiver verifies meter/dipstick reading and executes digital signature. Official PDF Proof of Delivery is instantly generated and archived.',
      details: 'Instant Signed PDF • Automatic Invoicing'
    }
  ];

  return (
    <section className="bg-[#0A0A0B] py-14 px-4 sm:px-6 lg:px-8 text-white border-b border-white/10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#FF6B00] uppercase tracking-widest mb-1.5">
            <span>DISCIPLINED 5-STEP FRAMEWORK</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white uppercase tracking-tight font-sans">
            How Armtells Delivers
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 font-normal">
            From initial terminal order booking to certified custody transfer, every delivery follows strict petroleum logistics and hazardous material protocols.
          </p>
        </div>

        {/* 5-Step Process Visual Flow */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3.5 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.step}
                className="bg-[#0F0F11] border border-white/10 rounded-sm p-4 flex flex-col justify-between hover:border-white/30 transition-all duration-200 group relative"
              >
                <div>
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-black font-mono text-slate-600 group-hover:text-[#FF6B00] transition-colors">
                      {item.step}
                    </span>
                    <div className="p-2 rounded-sm bg-white/5 border border-white/10 text-[#FF6B00]">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xs font-extrabold text-white uppercase tracking-wider mb-0.5">
                    {item.title}
                  </h3>
                  <p className="text-[10px] font-bold text-[#FF6B00] font-mono mb-2">
                    {item.subtitle}
                  </p>

                  {/* Description */}
                  <p className="text-[11px] text-slate-400 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Tag */}
                <div className="mt-3 pt-2.5 border-t border-white/10 text-[9px] font-mono text-slate-500">
                  {item.details}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Footer */}
        <div className="mt-8 text-center">
          <button
            onClick={() => setActivePage('delivery-request')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF6B00] hover:bg-[#ff8533] text-black font-extrabold text-xs uppercase tracking-wider rounded-sm shadow-md transition cursor-pointer"
          >
            <span>Book a Petroleum Tanker Delivery</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
