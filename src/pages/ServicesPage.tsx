import React from 'react';
import { 
  Fuel, 
  Factory, 
  HardHat, 
  Pickaxe, 
  Zap, 
  Truck, 
  ShieldCheck, 
  CalendarClock, 
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Flame,
  Layers
} from 'lucide-react';

interface ServicesPageProps {
  setActivePage: (page: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ setActivePage }) => {
  const serviceList = [
    {
      id: 'fuel-station',
      number: '01',
      title: 'Fuel Station Delivery',
      subtitle: 'Retail Forecourt Distribution',
      icon: Fuel,
      tagline: 'Reliable replenishment for retail fuel service stations',
      description: 'Transportation and multi-compartment delivery of petroleum products (PMS Unleaded and AGO Diesel) directly to authorized filling stations and retail commercial forecourts.',
      keyFeatures: [
        'Multi-compartment drops allowing simultaneous delivery of Petrol & Diesel',
        'Standard 4-inch API bottom-loading camlock couplers and vapor recovery lines',
        'Precision dipstick custody verification before and after tank discharge',
        'Early morning and off-peak night delivery scheduling to avoid station traffic'
      ],
      equipment: '36,000L - 45,000L 4-5 Compartment Tankers • Calibrated Metrology',
      hazardPlacard: 'Class 3 Flammable Liquid (UN 1202 / UN 1203)'
    },
    {
      id: 'industrial-fuel',
      number: '02',
      title: 'Industrial Fuel Delivery',
      subtitle: 'Manufacturing, Mills & Heavy Processing',
      icon: Factory,
      tagline: 'Bulk energy logistics for continuous factory operations',
      description: 'Dependable delivery of Automotive Gas Oil (AGO) and Heavy Fuel Oil (HFO) to factories, warehouses, steel mills, food processing plants, and commercial operations.',
      keyFeatures: [
        'Dedicated product lines ensuring absolute zero cross-contamination',
        'Insulated and heated tankers for heavy viscosity industrial fuel oils (HFO)',
        'Continuous replenishment schedules aligned with industrial shift demand',
        'Emergency response spill kits and dual bonding grounding clamps on-site'
      ],
      equipment: '45,000L Bulk Tankers & Heated Heavy Oil Barrels',
      hazardPlacard: 'UN 1202 (AGO) / UN 3082 (HFO Industrial)'
    },
    {
      id: 'construction-site',
      number: '03',
      title: 'Construction Site Fuel Delivery',
      subtitle: 'Civil Works & Infrastructure Projects',
      icon: HardHat,
      tagline: 'Direct-to-equipment refueling for remote job sites',
      description: 'Support civil construction projects, road-building works, and heavy infrastructure developments requiring dependable fuel transportation to authorized project locations.',
      keyFeatures: [
        'Compact rigid tankers (18,000L - 28,000L) engineered for unpaved site access roads',
        'Extended 45-meter electric hose reels with automatic trigger shut-off nozzles',
        'Direct-to-machine refueling for excavators, dump trucks, batching plants, and cranes',
        'Flexible on-demand dispatch to keep active project machinery operating without downtime'
      ],
      equipment: '18,000L - 28,000L High-Maneuverability Rigid Tankers with Hose Reels',
      hazardPlacard: 'UN 1202 Automotive Gas Oil (Diesel)'
    },
    {
      id: 'mining-operations',
      number: '04',
      title: 'Mining Operations Logistics',
      subtitle: 'Heavy Extraction & Remote Pit Depots',
      icon: Pickaxe,
      tagline: 'Heavy-duty long-haul bulk logistics for remote mining belts',
      description: 'Tanker logistics for authorized mining concessions, gold extraction hubs, remote pit bulk fuel farms, and remote industrial mineral extraction sites.',
      keyFeatures: [
        'High-capacity 48,000L aluminum Super B-Train tankers for high-volume efficiency',
        'Experienced long-distance mining corridor drivers trained in defensive rough-road driving',
        'Tamper-evident numbered steel bolt seals on all manholes and discharge valves',
        'Dedicated radio communication, emergency escort clearance, and GPS telemetry'
      ],
      equipment: '48,000L Aluminum High-Payload B-Trains • Reinforced Heavy Chassis',
      hazardPlacard: 'UN 1202 High-Spec Low-Sulphur Diesel'
    },
    {
      id: 'generator-power',
      number: '05',
      title: 'Generator & Power Fuel Delivery',
      subtitle: 'Continuous & Standby Power Plants',
      icon: Zap,
      tagline: 'Precision refueling for corporate generators and power installations',
      description: 'Fuel transportation for commercial buildings, data centers, hospitals, telecommunications hubs, and industrial facilities operating primary and standby diesel generators.',
      keyFeatures: [
        'High-flow metered pumping systems (up to 850 Litres/min) with digital totalizers',
        'Strict clean fuel protocols (water-separator filtration during discharge)',
        'Scheduled automatic top-up routines based on generator runtime cycles',
        'Quiet evening and weekend delivery options for commercial office zones'
      ],
      equipment: 'Metered Pump Tankers with Digital In-Line Filtration',
      hazardPlacard: 'UN 1202 Clean Spec Diesel (50ppm)'
    },
    {
      id: 'bulk-petroleum',
      number: '06',
      title: 'Bulk Petroleum Transportation',
      subtitle: 'Terminal-to-Depot Inter-City Haulage',
      icon: Truck,
      tagline: 'High-volume haulage between major petroleum terminals',
      description: 'Bulk transportation of approved petroleum products between primary coastal supply points (TOR / BOST) and authorized inland storage terminals nationwide.',
      keyFeatures: [
        'NPA-licensed Bulk Road Vehicles (BRVs) calibrated by Ghana Standards Authority',
        'Real-time transit tracking and geofenced transit corridor adherence',
        'Electronic terminal gantry clearance and custody transfer documentation',
        'Comprehensive Goods-in-Transit insurance and environmental spillage coverage'
      ],
      equipment: 'Standard 45,000L - 48,000L BRV Road Tankers',
      hazardPlacard: 'Class 3 Flammable Liquids (ADR / Hazchem Compliant)'
    },
    {
      id: 'dedicated-tanker',
      number: '07',
      title: 'Dedicated Tanker Services',
      subtitle: 'Exclusive Fleet Contracts',
      description: 'Provide dedicated tanker transportation capacity and assigned drivers for corporate clients requiring continuous, recurring logistics support and guaranteed availability.',
      icon: ShieldCheck,
      tagline: 'Reserved logistics capacity for your supply chain security',
      keyFeatures: [
        'Dedicated tanker branding or assigned fleet units reserved exclusively for your company',
        'Dedicated ADR-certified drivers trained on your specific facility access protocols',
        'Master Service Agreements (MSA) with predictable, locked-in commercial transport rates',
        'Priority loading terminal queue allocation and customized ERP reporting integration'
      ],
      equipment: 'Custom Allocated Fleet Units (28,000L - 48,000L Capacity)',
      hazardPlacard: 'Client-Dedicated Hazard placards'
    },
    {
      id: 'scheduled-ondemand',
      number: '08',
      title: 'Scheduled & On-Demand Deliveries',
      subtitle: 'Emergency & Routine Logistics',
      icon: CalendarClock,
      tagline: 'Planned recurring deliveries and urgent transportation response',
      description: 'Support planned weekly/monthly recurring deliveries as well as urgent emergency transportation requests, subject to terminal availability and regulatory approvals.',
      keyFeatures: [
        'Urgent 24-Hour and Emergency Same-Day dispatch coordination for critical outages',
        'Automated recurring delivery schedules with automated reminder confirmations',
        'Flexible batch sizing from 18,000 Litres to multi-tanker convoy logistics',
        '24/7 active dispatch desk managing driver rotations and terminal loading slots'
      ],
      equipment: 'Rapid-Dispatch Fleet Units • 24/7 Operations Desk',
      hazardPlacard: 'All Certified Class 3 Petroleum Grades'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Page Header */}
        <div className="border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-sky-950/60 text-sky-400 text-xs font-mono font-bold uppercase mb-3 border border-sky-800/40">
            <span>ARMTELLS SPECIALIZED LOGISTICS PORTFOLIO</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
            Petroleum Tanker Transportation Services
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl mt-2 leading-relaxed">
            Armtells Transport Services operates high-spec road tankers for the transportation of petroleum products across Ghana. Every service complies strictly with National Petroleum Authority (NPA) and Environmental Protection Agency (EPA) standards.
          </p>
        </div>

        {/* Services Grid (8 Detailed Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {serviceList.map((svc) => {
            const Icon = svc.icon;
            return (
              <div 
                key={svc.id}
                id={`service-detail-${svc.id}`}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:border-slate-700 transition shadow-xl relative overflow-hidden"
              >
                <div>
                  {/* Top Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-slate-950 text-sky-400 rounded-xl border border-slate-800">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-widest block">
                          SERVICE {svc.number} • {svc.subtitle}
                        </span>
                        <h2 className="text-xl font-black text-white uppercase tracking-tight">
                          {svc.title}
                        </h2>
                      </div>
                    </div>

                    <span className="text-2xl font-mono font-black text-slate-700">
                      {svc.number}
                    </span>
                  </div>

                  {/* Tagline & Description */}
                  <p className="text-xs font-semibold text-slate-200 mb-2">
                    {svc.tagline}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    {svc.description}
                  </p>

                  {/* Key Operational Features */}
                  <div className="space-y-2 mb-4 bg-slate-950/60 p-3.5 rounded-lg border border-slate-800/80">
                    <span className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-1">
                      OPERATIONAL PROTOCOLS & SPECIFICATIONS
                    </span>
                    {svc.keyFeatures.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer: Equipment Specs & Action Buttons */}
                <div className="pt-4 border-t border-slate-800/80 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-400">
                    <span className="text-slate-300 font-semibold">{svc.equipment}</span>
                    <span className="bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/30">
                      {svc.hazardPlacard}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <button
                      onClick={() => setActivePage('delivery-request')}
                      className="flex-1 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded transition text-center cursor-pointer"
                    >
                      Request Delivery
                    </button>
                    <button
                      onClick={() => setActivePage('quote')}
                      className="flex-1 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider rounded border border-slate-700 transition text-center cursor-pointer"
                    >
                      Get Logistics Quote
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Regulatory & Safety Compliance Strip */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="p-3 bg-emerald-950 text-emerald-400 rounded-lg border border-emerald-800 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase">
                Zero Compromise Safety Standard
              </h3>
              <p className="text-xs text-slate-400 mt-0.5 max-w-2xl">
                Armtells only transports petroleum products to verified customer locations with approved reception tanks, certified earthing points, and regulatory clearances.
              </p>
            </div>
          </div>

          <button
            onClick={() => setActivePage('safety')}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded text-xs font-bold uppercase tracking-wider shrink-0 transition"
          >
            Review Safety Standards
          </button>
        </div>

      </div>
    </div>
  );
};
