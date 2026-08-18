import React from 'react';
import { Hero } from '../components/Hero';
import { QuickServiceSelector } from '../components/QuickServiceSelector';
import { AboutSection } from '../components/AboutSection';
import { WhyArmtellsSection } from '../components/WhyArmtellsSection';
import { HowItWorksSection } from '../components/HowItWorksSection';
import { 
  Truck, 
  ShieldCheck, 
  ArrowRight, 
  Fuel, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Search, 
  HelpCircle, 
  ChevronDown, 
  MapPin, 
  Flame,
  Radio
} from 'lucide-react';
import { storageService } from '../services/storage';

interface HomePageProps {
  setActivePage: (page: string) => void;
  onOpenTrackingModal: (id?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setActivePage, onOpenTrackingModal }) => {
  const [openFaq, setOpenFaq] = React.useState<string | null>('faq-01');
  const [trackQuery, setTrackQuery] = React.useState('');
  
  const faqs = storageService.getFAQs();
  const tankers = storageService.getTankers().slice(0, 6); // Displays 6 tanker trucks (at least 5)
  const products = storageService.getFuelProducts().slice(0, 4);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackQuery.trim()) {
      onOpenTrackingModal(trackQuery.trim());
    } else {
      setActivePage('track');
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-slate-100">
      
      {/* 1. HERO SECTION */}
      <Hero 
        setActivePage={setActivePage} 
        onOpenTrackingModal={onOpenTrackingModal} 
      />

      {/* 2. QUICK SERVICE SELECTOR (8 CARDS) */}
      <QuickServiceSelector 
        setActivePage={setActivePage} 
      />

      {/* 3. ABOUT ARMTELLS SECTION */}
      <AboutSection 
        setActivePage={setActivePage} 
      />

      {/* 4. CORE SERVICES HIGHLIGHT */}
      <section className="bg-[#0A0A0B] py-14 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-white/10 gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-[#FF6B00] uppercase tracking-widest block mb-1">
                PETROLEUM PRODUCTS & TANKER LOGISTICS
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight font-sans">
                Bulk Fuel Capabilities
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl font-normal">
                Transporting certified Class 3 flammable liquids in calibrated road tankers with vapor recovery and metrological custody verification.
              </p>
            </div>

            <button
              onClick={() => setActivePage('services')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-sm border border-white/10 transition cursor-pointer"
            >
              <span>Explore All 8 Services</span>
              <ArrowRight className="w-4 h-4 text-[#FF6B00]" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {products.map((prod) => (
              <div 
                key={prod.id}
                className="bg-[#0F0F11] border border-white/10 rounded-sm p-4 hover:border-white/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-white/5 text-[#FF6B00] border border-white/10 text-[10px] font-mono font-bold px-2 py-0.5 rounded-sm flex items-center gap-1">
                      <Flame className="w-3 h-3" /> {prod.unNumber}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">Flash Point {prod.flashPoint}</span>
                  </div>

                  <h3 className="text-sm font-bold text-white mb-1 uppercase">
                    {prod.name}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed mb-3 line-clamp-3 font-normal">
                    {prod.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-500">{prod.hazardClass.split('(')[0]}</span>
                  <button 
                    onClick={() => setActivePage('delivery-request')}
                    className="text-xs font-mono font-bold text-[#FF6B00] hover:text-[#ff8533] cursor-pointer"
                  >
                    Request Drop →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. HOW IT WORKS 5-STEP PROCESS */}
      <HowItWorksSection 
        setActivePage={setActivePage} 
      />

      {/* 6. TANKER FLEET PREVIEW WITH LIVE ASSET IMAGERY */}
      <section className="bg-[#0A0A0B] py-14 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-4 border-b border-white/10 gap-4">
            <div>
              <span className="text-xs font-mono font-bold text-[#FF6B00] uppercase tracking-widest block mb-1">
                ENGINEERED BULK ROAD VEHICLES (BRVs)
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight font-sans">
                Modern Tanker Fleet & Heavy Assets
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl font-normal">
                Multi-compartment aluminum & steel petroleum tankers equipped with high-flow pumps, digital flow meters, and bottom vapor recovery.
              </p>
            </div>

            <button
              onClick={() => setActivePage('fleet')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-sm border border-white/10 transition cursor-pointer"
            >
              <span>View Full Fleet Directory</span>
              <ArrowRight className="w-4 h-4 text-[#FF6B00]" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tankers.map((tanker) => {
              const statusColors: Record<string, { badge: string; dot: string; label: string }> = {
                AVAILABLE: { badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30', dot: 'bg-emerald-400', label: 'AVAILABLE' },
                ON_DELIVERY: { badge: 'bg-[#FF6B00]/10 text-[#FF6B00] border-[#FF6B00]/30', dot: 'bg-[#FF6B00]', label: 'ON DELIVERY' },
                IN_TRANSIT: { badge: 'bg-sky-500/10 text-sky-400 border-sky-500/30', dot: 'bg-sky-400', label: 'IN TRANSIT' },
                UNDER_MAINTENANCE: { badge: 'bg-rose-500/10 text-rose-400 border-rose-500/30', dot: 'bg-rose-400', label: 'MAINTENANCE' },
                OFFLINE: { badge: 'bg-white/5 text-slate-400 border-white/10', dot: 'bg-slate-400', label: 'OFFLINE' }
              };

              const st = statusColors[tanker.status] || statusColors.AVAILABLE;

              return (
                <div 
                  key={tanker.id}
                  id={`home-tanker-${tanker.tankerId}`}
                  className="group bg-[#0F0F11] border border-white/10 rounded-sm overflow-hidden flex flex-col justify-between hover:border-white/30 transition shadow-xl"
                >
                  <div>
                    {/* Tanker Image Container with High Density Overlays */}
                    <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-[#0A0A0B]">
                      <img 
                        src={tanker.imageUrl || 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80'} 
                        alt={`${tanker.tankerId} - ${tanker.makeModel}`}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.onerror = null;
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80';
                        }}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      {/* Gradient vignettes */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F11] via-transparent to-black/60 pointer-events-none" />

                      {/* Top Overlay: Tanker ID & Live Status */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                        <div className="bg-[#0A0A0B]/90 backdrop-blur-sm border border-white/15 px-2.5 py-1 rounded-sm flex items-center gap-1.5 shadow-md">
                          <Truck className="w-3.5 h-3.5 text-[#FF6B00]" />
                          <span className="font-mono font-extrabold text-xs text-white tracking-wider">
                            {tanker.tankerId}
                          </span>
                        </div>

                        <div className={`px-2 py-0.5 rounded-sm border font-mono text-[10px] font-bold backdrop-blur-md flex items-center gap-1.5 shadow-md ${st.badge}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${st.dot} ${tanker.status === 'IN_TRANSIT' || tanker.status === 'ON_DELIVERY' ? 'animate-ping' : ''}`} />
                          <span>{st.label}</span>
                        </div>
                      </div>

                      {/* Bottom Image Overlay: Registration & Capacity */}
                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between pointer-events-none font-mono">
                        <span className="text-[11px] font-bold text-white bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-sm border border-white/10">
                          {tanker.registrationNumber}
                        </span>

                        <span className="text-xs font-black text-[#FF6B00] bg-black/80 backdrop-blur-sm px-2.5 py-0.5 rounded-sm border border-[#FF6B00]/40">
                          {(tanker.tankCapacityLiters).toLocaleString()} Litres
                        </span>
                      </div>
                    </div>

                    {/* Card Body Details */}
                    <div className="p-4 space-y-3">
                      <div>
                        <h3 className="text-base font-bold text-white uppercase tracking-tight group-hover:text-[#FF6B00] transition-colors font-sans">
                          {tanker.makeModel}
                        </h3>
                        <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                          {tanker.dedicatedProducts.join(', ').replace(/_/g, ' ')}
                        </p>
                      </div>

                      {/* Spec Matrix */}
                      <div className="bg-[#0A0A0B] border border-white/10 p-2.5 rounded-sm space-y-1.5 font-mono text-xs">
                        <div className="flex justify-between text-[11px]">
                          <span className="text-slate-500">Compartments:</span>
                          <span className="text-slate-200 font-semibold">{tanker.compartments.length} Dedicated Cells</span>
                        </div>
                        <div className="flex justify-between text-[11px]">
                          <span className="text-slate-500">Current Hub:</span>
                          <span className="text-slate-300 truncate max-w-[150px]">{tanker.currentLocationName}</span>
                        </div>
                        <div className="flex justify-between text-[11px]">
                          <span className="text-slate-500">NPA Calibration:</span>
                          <span className="text-sky-400">{tanker.calibrationCertificateNumber}</span>
                        </div>
                      </div>

                      {/* Technical Equipment Pills */}
                      <div className="flex flex-wrap gap-1 text-[10px] font-mono text-slate-400">
                        {tanker.hasBottomLoading && (
                          <span className="bg-[#0A0A0B] px-1.5 py-0.5 rounded-sm border border-white/10 text-emerald-400">
                            ✓ Bottom Loading
                          </span>
                        )}
                        {tanker.hasVaporRecovery && (
                          <span className="bg-[#0A0A0B] px-1.5 py-0.5 rounded-sm border border-white/10 text-sky-400">
                            ✓ Vapor Recovery
                          </span>
                        )}
                        {tanker.hasDigitalFlowMeter && (
                          <span className="bg-[#0A0A0B] px-1.5 py-0.5 rounded-sm border border-white/10 text-[#FF6B00]">
                            ✓ Flow Meter
                          </span>
                        )}
                        {tanker.hasHighFlowPump && (
                          <span className="bg-[#0A0A0B] px-1.5 py-0.5 rounded-sm border border-white/10 text-purple-400">
                            ✓ Discharge Pump
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="p-4 pt-0">
                    <div className="pt-3 border-t border-white/10 flex items-center gap-2">
                      <button
                        onClick={() => setActivePage('fleet')}
                        className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white font-mono font-bold text-xs uppercase tracking-wider rounded-sm border border-white/10 transition cursor-pointer text-center"
                      >
                        Inspect Specs
                      </button>
                      <button
                        onClick={() => setActivePage('delivery-request')}
                        className="flex-1 py-2 bg-[#FF6B00] hover:bg-[#ff8533] text-black font-extrabold text-xs uppercase tracking-wider rounded-sm transition cursor-pointer text-center font-mono"
                      >
                        Book Tanker →
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. WHY ARMTELLS (4 PILLARS) */}
      <WhyArmtellsSection 
        setActivePage={setActivePage} 
      />

      {/* 8. LIVE DELIVERY TRACKING TEASER BANNER */}
      <section className="bg-[#0A0A0B] py-14 px-4 sm:px-6 lg:px-8 border-b border-white/10 relative">
        <div className="max-w-5xl mx-auto bg-[#0F0F11] border border-white/10 rounded-sm p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center relative z-10">
            <div className="lg:col-span-7 space-y-2.5">
              <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-sm bg-white/5 text-[#FF6B00] text-[10px] font-mono font-bold uppercase border border-white/10">
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>CUSTOMER SHIPMENT VISIBILITY</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight font-sans">
                Track Active Fuel Delivery
              </h2>
              <p className="text-xs text-slate-400 font-normal leading-relaxed">
                Enter your 10-digit Delivery Tracking ID to view live stage progress, assigned tanker registration, hazardous material placarding, and estimated arrival window.
              </p>
            </div>

            <div className="lg:col-span-5 space-y-2.5">
              <form onSubmit={handleTrackSubmit} className="space-y-2">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Enter ART-2026-000101..."
                    value={trackQuery}
                    onChange={(e) => setTrackQuery(e.target.value)}
                    className="w-full bg-[#0A0A0B] border border-white/10 text-xs text-white rounded-sm pl-9 pr-3 py-2.5 focus:border-[#FF6B00] focus:outline-none font-mono"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#FF6B00] hover:bg-[#ff8533] text-black font-bold text-xs uppercase tracking-wider rounded-sm transition shadow cursor-pointer font-mono"
                >
                  Locate Shipment Progress
                </button>
              </form>
              <div className="text-[10px] text-slate-500 text-center font-mono">
                Sample Live IDs: <button type="button" onClick={() => onOpenTrackingModal('ART-2026-000101')} className="text-slate-400 hover:text-white underline">ART-2026-000101</button> | <button type="button" onClick={() => onOpenTrackingModal('ART-2026-000102')} className="text-slate-400 hover:text-white underline">ART-2026-000102</button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 9. FAQ ACCORDION */}
      <section className="bg-[#0A0A0B] py-14 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-8">
            <span className="text-xs font-mono font-bold text-[#FF6B00] uppercase tracking-widest block mb-1">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white uppercase tracking-tight font-sans">
              Operational Inquiries
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 font-normal">
              Clear answers regarding our tanker fleet standards, delivery ordering, and commercial logistics.
            </p>
          </div>

          <div className="space-y-2.5">
            {faqs.map((faq) => {
              const isOpen = openFaq === faq.id;
              return (
                <div 
                  key={faq.id}
                  className="bg-[#0F0F11] border border-white/10 rounded-sm overflow-hidden transition"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : faq.id)}
                    className="w-full px-4 py-3.5 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                  >
                    <span className="font-bold text-xs sm:text-sm text-white font-sans">
                      {faq.question}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isOpen ? 'rotate-180 text-[#FF6B00]' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-3.5 text-xs text-slate-400 leading-relaxed border-t border-white/10 pt-2.5 font-normal">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 10. FINAL CONTACT / CALL TO ACTION STRIP */}
      <section className="bg-[#0A0A0B] py-14 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-white/5 border border-white/10 text-[#FF6B00] text-[10px] font-mono font-bold uppercase tracking-widest">
            <span>GET IN TOUCH WITH OUR LOGISTICS DESK</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white uppercase tracking-tight font-sans">
            Ready to Secure Tanker Transport Capacity?
          </h2>

          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal">
            Whether you require an immediate fuel delivery, a scheduled weekly bulk drop, or dedicated long-term tanker logistics, Armtells is ready to coordinate your transport.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <button
              onClick={() => setActivePage('delivery-request')}
              className="px-6 py-3 bg-[#FF6B00] hover:bg-[#ff8533] text-black font-bold uppercase tracking-widest text-xs rounded-sm shadow transition cursor-pointer"
            >
              Book Fuel Delivery
            </button>

            <button
              onClick={() => setActivePage('quote')}
              className="px-6 py-3 bg-white/5 hover:bg-white/10 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-sm border border-white/10 transition cursor-pointer"
            >
              Request Haulage Quote
            </button>

            <button
              onClick={() => setActivePage('contact')}
              className="px-6 py-3 bg-transparent hover:bg-white/5 text-slate-300 font-mono font-bold text-xs uppercase tracking-wider rounded-sm border border-white/10 transition cursor-pointer"
            >
              Contact Operations Desk
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
