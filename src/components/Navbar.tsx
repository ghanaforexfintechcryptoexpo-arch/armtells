import React, { useState } from 'react';
import { 
  Truck, 
  ShieldCheck, 
  Phone, 
  Menu, 
  X, 
  MapPin, 
  Building2, 
  Flame, 
  Radio, 
  Lock, 
  ChevronDown,
  FileText,
  UserCheck,
  Cloud,
  LogIn,
  LogOut,
  User as UserIcon
} from 'lucide-react';
import { storageService } from '../services/storage';
import { useFirebase } from '../context/FirebaseContext';

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, setActivePage }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [portalsDropdownOpen, setPortalsDropdownOpen] = useState(false);
  const [authDropdownOpen, setAuthDropdownOpen] = useState(false);
  const cms = storageService.getCMSContent();
  const { firebaseUser, currentUser, isFirebaseConnected, signInWithGoogle, signOut, switchUserRole } = useFirebase();

  const handleNavClick = (page: string) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    setPortalsDropdownOpen(false);
    setAuthDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'fleet', label: 'Tanker Fleet' },
    { id: 'safety', label: 'Safety & Compliance' },
    { id: 'industries', label: 'Industries' },
    { id: 'corridors', label: 'Corridors' },
    { id: 'how-it-works', label: 'Operations' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#0A0A0B]/95 backdrop-blur border-b border-white/10 text-slate-100">
      
      {/* Top 24/7 Operations Bar */}
      <div className="bg-[#0A0A0B] border-b border-white/10 text-[11px] font-mono py-1.5 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Tema Logistics Hub: Active 24/7</span>
            </span>
            <span className="text-slate-600 hidden md:inline">•</span>
            <span className="text-slate-400 hidden md:inline">
              NPA Licensed Petroleum Haulage • Class 3 Flammable BRVs
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <a 
              href={`tel:${cms.contactEmergencyPhone || '+233240009999'}`}
              className="flex items-center gap-1.5 text-[#FF6B00] hover:text-[#ff8533] font-bold tracking-tight font-mono"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>24/7 Dispatch: {cms.contactEmergencyPhone || '+233 24 000 9999'}</span>
            </a>

            <div className="hidden lg:flex items-center gap-2 border-l border-white/10 pl-4">
              <button
                onClick={() => handleNavClick('track')}
                className="text-sky-400 hover:text-sky-300 font-mono text-[11px] font-bold flex items-center gap-1 cursor-pointer"
              >
                <Radio className="w-3 h-3 animate-pulse" />
                <span>Track Cargo</span>
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo - High Density Signature Style */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 cursor-pointer group select-none"
          >
            <div className="w-8 h-8 bg-[#FF6B00] rounded-sm flex items-center justify-center font-black text-black italic text-base shadow-sm">
              A
            </div>
            
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold tracking-tighter uppercase text-white font-sans">
                ARMTELLS
              </span>
              <span className="text-xl font-light text-slate-400 tracking-tighter uppercase font-sans">
                TRANSPORT
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center space-x-6 text-[11px] uppercase tracking-widest font-semibold text-slate-400">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`transition-colors py-1 cursor-pointer ${
                  activePage === link.id
                    ? 'text-white border-b-2 border-[#FF6B00]'
                    : 'hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Actions & Portals Dropdown */}
          <div className="hidden sm:flex items-center gap-3">
            
            {/* Quick Quote / Request Button */}
            <button
              onClick={() => handleNavClick('delivery-request')}
              className="px-5 py-2.5 bg-[#FF6B00] hover:bg-[#ff8533] text-black font-bold uppercase tracking-widest text-xs rounded-sm shadow transition-colors cursor-pointer"
            >
              Request Tanker
            </button>

              {/* Portals Access Menu */}
            <div className="relative">
              <button
                onClick={() => setPortalsDropdownOpen(!portalsDropdownOpen)}
                className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-sm text-xs font-mono font-bold uppercase flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span>Portals</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {portalsDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-[#0F0F11] border border-white/10 rounded-md shadow-2xl p-2 space-y-1 text-xs font-mono z-50">
                  <button
                    onClick={() => handleNavClick('customer-portal')}
                    className="w-full text-left px-3 py-2 hover:bg-white/5 rounded text-slate-200 flex items-center gap-2"
                  >
                    <Building2 className="w-4 h-4 text-sky-400" />
                    <span>Client Portal</span>
                  </button>

                  <button
                    onClick={() => handleNavClick('driver-portal')}
                    className="w-full text-left px-3 py-2 hover:bg-white/5 rounded text-slate-200 flex items-center gap-2"
                  >
                    <UserCheck className="w-4 h-4 text-emerald-400" />
                    <span>Driver Terminal</span>
                  </button>

                  <button
                    onClick={() => handleNavClick('operations-dashboard')}
                    className="w-full text-left px-3 py-2 hover:bg-white/5 rounded text-slate-200 flex items-center gap-2"
                  >
                    <Radio className="w-4 h-4 text-[#FF6B00]" />
                    <span>Operations Radar</span>
                  </button>

                  <button
                    onClick={() => handleNavClick('admin-dashboard')}
                    className="w-full text-left px-3 py-2 hover:bg-white/5 rounded text-slate-200 flex items-center gap-2 border-t border-white/10"
                  >
                    <ShieldCheck className="w-4 h-4 text-purple-400" />
                    <span>Admin Master Control</span>
                  </button>
                </div>
              )}
            </div>

            {/* Firebase Auth & User Profile Indicator */}
            <div className="relative">
              {firebaseUser ? (
                <button
                  onClick={() => setAuthDropdownOpen(!authDropdownOpen)}
                  className="px-3 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-sm text-xs font-mono font-medium flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="max-w-[110px] truncate">{currentUser.name || firebaseUser.displayName || 'User'}</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-emerald-500/20 rounded font-bold uppercase">{currentUser.role}</span>
                </button>
              ) : (
                <button
                  onClick={() => signInWithGoogle()}
                  className="px-3 py-2 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 rounded-sm text-xs font-mono flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Sign in with Google to sync fleet & orders"
                >
                  <Cloud className="w-3.5 h-3.5 text-amber-400" />
                  <span>Google Auth</span>
                </button>
              )}

              {authDropdownOpen && firebaseUser && (
                <div className="absolute right-0 mt-2 w-64 bg-[#0F0F11] border border-white/10 rounded-md shadow-2xl p-3 space-y-2 text-xs font-mono z-50">
                  <div className="border-b border-white/10 pb-2">
                    <div className="text-white font-bold truncate">{currentUser.name}</div>
                    <div className="text-slate-400 text-[11px] truncate">{currentUser.email}</div>
                    <div className="mt-1 inline-block text-[10px] bg-amber-500/10 text-amber-300 border border-amber-500/20 px-2 py-0.5 rounded uppercase font-bold">
                      Role: {currentUser.role}
                    </div>
                  </div>
                  <div className="text-[10px] text-emerald-400 flex items-center gap-1.5 pt-1">
                    <Cloud className="w-3 h-3" />
                    <span>Firebase Firestore Connected</span>
                  </div>
                  <button
                    onClick={() => {
                      signOut();
                      setAuthDropdownOpen(false);
                    }}
                    className="w-full text-left px-2 py-1.5 mt-2 hover:bg-red-500/10 text-red-400 hover:text-red-300 rounded flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>

          </div>

          {/* Mobile Menu Button */}
          <div className="flex xl:hidden items-center gap-2">
            <button
              onClick={() => handleNavClick('delivery-request')}
              className="sm:hidden px-3 py-1.5 bg-[#FF6B00] text-black font-black text-xs uppercase rounded-sm"
            >
              Book
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-sm bg-white/5 border border-white/10 text-slate-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-white/10 bg-[#0A0A0B] p-4 space-y-3 font-mono text-xs uppercase">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left p-2.5 rounded-sm ${
                  activePage === link.id
                    ? 'bg-white/10 text-[#FF6B00] font-bold border border-white/10'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-white/10 space-y-2">
            <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">
              System Portals & Operations
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleNavClick('customer-portal')}
                className="p-2.5 bg-white/5 border border-white/10 rounded-sm text-left text-sky-400 font-bold"
              >
                Client Portal
              </button>
              <button
                onClick={() => handleNavClick('driver-portal')}
                className="p-2.5 bg-white/5 border border-white/10 rounded-sm text-left text-emerald-400 font-bold"
              >
                Driver Terminal
              </button>
              <button
                onClick={() => handleNavClick('operations-dashboard')}
                className="p-2.5 bg-white/5 border border-white/10 rounded-sm text-left text-[#FF6B00] font-bold"
              >
                Ops Radar
              </button>
              <button
                onClick={() => handleNavClick('admin-dashboard')}
                className="p-2.5 bg-white/5 border border-white/10 rounded-sm text-left text-purple-400 font-bold"
              >
                Admin Master
              </button>
            </div>
          </div>
        </div>
      )}

    </header>
  );
};
