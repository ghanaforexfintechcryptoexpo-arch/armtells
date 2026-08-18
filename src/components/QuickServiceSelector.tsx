import React from 'react';
import { 
  Fuel, 
  Factory, 
  HardHat, 
  Pickaxe, 
  Zap, 
  Truck, 
  ShieldCheck, 
  Building2, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';

interface QuickServiceSelectorProps {
  setActivePage: (page: string) => void;
  onSelectService?: (serviceTitle: string) => void;
}

export const QuickServiceSelector: React.FC<QuickServiceSelectorProps> = ({ 
  setActivePage,
  onSelectService 
}) => {
  const services = [
    {
      id: 'fuel-station',
      title: 'Fuel Station Delivery',
      subtitle: 'Retail Filling Stations',
      description: 'Transportation and multi-compartment delivery of PMS and AGO to authorized filling stations and retail forecourts.',
      icon: Fuel,
      accentColor: 'text-amber-400',
      bgColor: 'bg-amber-950/20 border-amber-800/30 group-hover:border-amber-500/50',
      capacityInfo: 'Multi-compartment drops • 36k - 45k Litres'
    },
    {
      id: 'industrial-fuel',
      title: 'Industrial Fuel Delivery',
      subtitle: 'Manufacturing & Plants',
      description: 'Dependable bulk fuel logistics for factories, processing mills, heavy smelters, and industrial steam boilers.',
      icon: Factory,
      accentColor: 'text-sky-400',
      bgColor: 'bg-sky-950/20 border-sky-800/30 group-hover:border-sky-500/50',
      capacityInfo: 'Dedicated AGO & HFO • Continuous supply schedules'
    },
    {
      id: 'construction-site',
      title: 'Construction Site Delivery',
      subtitle: 'Civil & Infrastructure',
      description: 'Fuel transportation for earthmovers, heavy excavators, and generators on active infrastructure sites.',
      icon: HardHat,
      accentColor: 'text-amber-500',
      bgColor: 'bg-amber-950/20 border-amber-800/30 group-hover:border-amber-500/50',
      capacityInfo: 'Compact & rigid tankers • 18k - 28k Litres with long hose reels'
    },
    {
      id: 'mining-site',
      title: 'Mining Site Delivery',
      subtitle: 'Extraction & Remote Sites',
      description: 'Heavy-duty tanker logistics for authorized mining operations, remote pit tanks, and mineral processing facilities.',
      icon: Pickaxe,
      accentColor: 'text-emerald-400',
      bgColor: 'bg-emerald-950/20 border-emerald-800/30 group-hover:border-emerald-500/50',
      capacityInfo: 'Super B-Train 48k Litres • Mining corridor escorts'
    },
    {
      id: 'generator-power',
      title: 'Generator / Power Fuel Delivery',
      subtitle: 'Prime & Backup Power',
      description: 'Direct-to-tank fuel replenishment for corporate towers, data centers, hospitals, and heavy generator farms.',
      icon: Zap,
      accentColor: 'text-yellow-400',
      bgColor: 'bg-yellow-950/20 border-yellow-800/30 group-hover:border-yellow-500/50',
      capacityInfo: 'High-flow metered pumps (850 L/min) • Automatic shut-off'
    },
    {
      id: 'bulk-petroleum',
      title: 'Bulk Petroleum Transportation',
      subtitle: 'Depot to Terminal Haulage',
      description: 'Inter-terminal haulage between primary supply points (TOR/BOST) and authorized inland distribution depots.',
      icon: Truck,
      accentColor: 'text-sky-300',
      bgColor: 'bg-slate-900 border-slate-800 group-hover:border-sky-500/50',
      capacityInfo: 'Class 3 Hazchem BRVs • Electronic seal integrity'
    },
    {
      id: 'dedicated-tanker',
      title: 'Dedicated Tanker Services',
      subtitle: 'Exclusive Fleet Contracts',
      description: 'Reserved tanker fleet capacity with dedicated drivers for corporate clients requiring continuous logistics support.',
      icon: ShieldCheck,
      accentColor: 'text-indigo-400',
      bgColor: 'bg-indigo-950/20 border-indigo-800/30 group-hover:border-indigo-500/50',
      capacityInfo: 'Master Service Agreements (MSA) • Priority dispatch'
    },
    {
      id: 'commercial-logistics',
      title: 'Commercial Fuel Logistics',
      subtitle: 'Fleet & Logistics Depots',
      description: 'Scheduled fuel delivery for transport hubs, bus companies, haulage staging yards, and shipping logistics hubs.',
      icon: Building2,
      accentColor: 'text-teal-400',
      bgColor: 'bg-teal-950/20 border-teal-800/30 group-hover:border-teal-500/50',
      capacityInfo: 'Batch deliveries • Calibrated metrology custody transfer'
    }
  ];

  return (
    <section className="bg-[#0A0A0B] py-14 px-4 sm:px-6 lg:px-8 border-b border-white/10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-white/10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#FF6B00] uppercase tracking-widest mb-1.5">
              <span>SPECIALIZED PETROLEUM CAPABILITIES</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight font-sans">
              What Do You Need Transported?
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-2xl font-normal">
              Select your required fuel logistics service to view operational specifications, equipment standards, and request transport capacity.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActivePage('services')}
              className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-[#FF6B00] hover:text-[#ff8533] transition uppercase tracking-wider cursor-pointer"
            >
              <span>View All Service Specs</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 8 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <div
                key={svc.id}
                id={`service-card-${svc.id}`}
                className="group rounded-sm border border-white/10 bg-[#0F0F11] p-4 transition-all duration-200 hover:border-white/30 hover:bg-white/5 flex flex-col justify-between"
              >
                <div>
                  {/* Top Icon & Subtitle */}
                  <div className="flex items-start justify-between mb-3">
                    <div className="p-2.5 rounded-sm bg-white/5 border border-white/10 text-[#FF6B00]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] font-mono font-semibold text-slate-400 uppercase tracking-widest">
                      {svc.subtitle}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-sm font-bold text-white group-hover:text-[#FF6B00] transition-colors uppercase tracking-tight mb-1.5">
                    {svc.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[11px] text-slate-400 leading-relaxed mb-3">
                    {svc.description}
                  </p>
                </div>

                {/* Card Footer: Spec snippet & Action */}
                <div className="pt-3 border-t border-white/10 space-y-2">
                  <div className="text-[10px] text-slate-500 font-mono">
                    {svc.capacityInfo}
                  </div>
                  
                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => {
                        if (onSelectService) onSelectService(svc.title);
                        setActivePage('services');
                      }}
                      className="text-xs font-mono font-bold text-slate-300 hover:text-white flex items-center gap-1 transition cursor-pointer"
                    >
                      <span>Learn More</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => setActivePage('delivery-request')}
                      className="text-[10px] font-mono font-bold text-[#FF6B00] hover:text-[#ff8533] uppercase tracking-wider cursor-pointer"
                    >
                      Book Delivery
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
