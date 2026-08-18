import React from 'react';
import { 
  Truck, 
  Phone, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  Flame, 
  Clock, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { storageService } from '../services/storage';

interface FooterProps {
  setActivePage: (page: string) => void;
  onOpenTrackingModal: (id?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActivePage, onOpenTrackingModal }) => {
  const cms = storageService.getCMSContent();

  return (
    <footer className="bg-[#0A0A0B] text-slate-400 border-t border-white/10 text-xs">
      
      {/* Top Banner: Emergency Contact & Quick Assistance */}
      <div className="bg-[#0F0F11] border-b border-white/10 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-white/5 border border-white/10 text-[#FF6B00] rounded-sm">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-[#FF6B00] uppercase tracking-widest block font-bold">
                24/7 EMERGENCY & DISPATCH HOTLINE
              </span>
              <span className="text-sm font-black text-white font-mono tracking-tight">
                {cms.contactEmergencyPhone || '+233 24 000 9999'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setActivePage('track')}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 rounded-sm font-bold uppercase tracking-wider text-xs transition"
            >
              Track Existing Delivery
            </button>
            <button
              onClick={() => setActivePage('delivery-request')}
              className="px-4 py-2 bg-[#FF6B00] hover:bg-[#ff8533] text-black rounded-sm font-extrabold uppercase tracking-wider text-xs transition"
            >
              Request a Tanker
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1: Brand & Positioning */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 bg-[#FF6B00] rounded-sm flex items-center justify-center font-black text-black italic text-sm">
                A
              </div>
              <span className="text-base font-extrabold text-white font-mono uppercase tracking-tight">
                ARMTELLS TRANSPORT SERVICES
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
              “Reliable Tanker Transport. Safe Fuel Delivery. Wherever Your Business Needs It.”
            </p>

            <p className="text-[11px] text-slate-400 leading-relaxed max-w-sm">
              Specialized petroleum road tanker logistics connecting approved bulk depots with filling stations, mining pits, factories, construction sites, and generator installations.
            </p>

            <div className="flex items-center gap-2 pt-1 text-[11px] text-slate-400 font-mono">
              <Flame className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span>UN 1202 / UN 1203 Certified Bulk Haulage</span>
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Logistics Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActivePage('services')} className="hover:text-[#FF6B00] transition text-left">
                  Fuel Station Delivery
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('services')} className="hover:text-[#FF6B00] transition text-left">
                  Industrial Fuel Delivery
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('services')} className="hover:text-[#FF6B00] transition text-left">
                  Construction Site Refueling
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('services')} className="hover:text-[#FF6B00] transition text-left">
                  Mining Operations Tankers
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('services')} className="hover:text-[#FF6B00] transition text-left">
                  Generator & Power Fuel
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('corporate-logistics')} className="hover:text-[#FF6B00] transition text-left text-sky-400">
                  Dedicated Tanker Contracts
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Company & Portals */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Operations & Portals
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => setActivePage('about')} className="hover:text-white transition">
                  About Armtells
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('fleet')} className="hover:text-white transition">
                  Tanker Fleet Specifications
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('safety')} className="hover:text-white transition">
                  Safety & Compliance
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('how-it-works')} className="hover:text-white transition">
                  5-Step Process
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('industries')} className="hover:text-white transition">
                  Industries Served
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('regional-corridors')} className="hover:text-white transition">
                  Regional Transit Corridors
                </button>
              </li>
              <li className="pt-1">
                <button onClick={() => setActivePage('customer-portal')} className="text-sky-400 hover:underline font-mono">
                  Client Portal Login →
                </button>
              </li>
              <li>
                <button onClick={() => setActivePage('driver-portal')} className="text-emerald-400 hover:underline font-mono">
                  Driver Mobile Portal →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Terminal Bases & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
              Operating Hubs
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#FF6B00] shrink-0 mt-0.5" />
                <span>{cms.officeAddress || 'Plot 8B Heavy Industrial Area, Tema, Ghana'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#FF6B00] shrink-0" />
                <span>{cms.contactPhone || '+233 24 000 1100'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>{cms.contactEmail || 'operations@armtells.com'}</span>
              </div>
              <div className="flex items-start gap-2 text-slate-400 text-[11px]">
                <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                <span>Dispatch: 24/7 • Office: Mon-Fri 08:00-17:00</span>
              </div>
            </div>
          </div>

        </div>

        {/* Legal, Copyright & Safety Disclaimer */}
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <div>
            © 2026 Armtells Transport Services. All rights reserved. Petroleum Tanker Transportation & Bulk Fuel Logistics.
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            <button onClick={() => setActivePage('privacy')} className="hover:text-white transition">
              Privacy Policy
            </button>
            <span>•</span>
            <button onClick={() => setActivePage('terms')} className="hover:text-white transition">
              Terms & Conditions
            </button>
            <span>•</span>
            <button onClick={() => setActivePage('safety')} className="hover:text-white transition">
              Safety & Regulatory Disclaimer
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
