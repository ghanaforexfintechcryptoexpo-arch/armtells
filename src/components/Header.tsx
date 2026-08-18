import React from 'react';
import { 
  Phone, 
  Clock, 
  MapPin, 
  FileCheck2, 
  Truck, 
  ShieldCheck, 
  UserCheck, 
  LogIn, 
  Menu, 
  X, 
  ChevronRight,
  Search,
  ExternalLink,
  Flame
} from 'lucide-react';
import { UserRole } from '../types';
import { storageService } from '../services/storage';

interface HeaderProps {
  activePage: string;
  setActivePage: (page: string) => void;
  onOpenRoleSwitcher: () => void;
  onOpenTrackingModal: (initialId?: string) => void;
  onOpenQuoteModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  setActivePage,
  onOpenRoleSwitcher,
  onOpenTrackingModal,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [quickTrackId, setQuickTrackId] = React.useState('');
  const currentUser = storageService.getCurrentUser();
  const cms = storageService.getCMSContent();

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickTrackId.trim()) {
      onOpenTrackingModal(quickTrackId.trim());
      setQuickTrackId('');
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'fleet', label: 'Tanker Fleet' },
    { id: 'delivery-request', label: 'Fuel Delivery' },
    { id: 'track', label: 'Track Delivery' },
    { id: 'safety', label: 'Safety & Compliance' },
    { id: 'industries', label: 'Industries' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'quote', label: 'Request Quote' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-950 text-slate-100 border-b border-slate-800 shadow-xl">
      {/* Top Operations & Emergency Hotline Strip */}
      <div className="bg-slate-900/90 text-slate-300 text-xs px-4 py-2 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5 font-medium text-amber-400">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
            </span>
            <span>24/7 BULK DISPATCH DESK:</span>
            <a href={`tel:${cms.contactEmergencyPhone.replace(/[^0-9+]/g, '')}`} className="text-white hover:text-amber-300 font-bold transition">
              {cms.contactEmergencyPhone}
            </a>
          </div>
          <span className="hidden md:inline text-slate-600">|</span>
          <div className="hidden lg:flex items-center gap-1.5 text-slate-400">
            <MapPin className="w-3.5 h-3.5 text-sky-400" />
            <span>Depot Hubs: Tema Oil Refinery & Takoradi Bulk Corridors</span>
          </div>
        </div>

        <div className="flex items-center gap-3 ml-auto">
          {/* Active User / Role Badge */}
          <button 
            id="header-role-switcher-btn"
            onClick={onOpenRoleSwitcher}
            className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded text-xs transition cursor-pointer"
            title="Switch portal view / user session"
          >
            <UserCheck className="w-3.5 h-3.5 text-sky-400" />
            <span className="font-semibold text-sky-300">{currentUser.role.replace('_', ' ')}</span>
            <span className="text-slate-400 text-[10px]">({currentUser.name.split(' ')[0]})</span>
          </button>

          {/* Quick Portal Jumps */}
          <div className="hidden sm:flex items-center gap-1">
            {currentUser.role === 'CUSTOMER' && (
              <button 
                onClick={() => setActivePage('customer-portal')}
                className={`px-2 py-0.5 rounded text-xs font-medium transition ${activePage === 'customer-portal' ? 'bg-sky-600 text-white' : 'text-slate-400 hover:text-white'}`}
              >
                Client Portal
              </button>
            )}
            {currentUser.role === 'DRIVER' && (
              <button 
                onClick={() => setActivePage('driver-portal')}
                className={`px-2 py-0.5 rounded text-xs font-medium transition ${activePage === 'driver-portal' ? 'bg-amber-600 text-white' : 'text-amber-400 hover:text-white'}`}
              >
                Driver View
              </button>
            )}
            {(currentUser.role === 'DISPATCHER' || currentUser.role === 'SUPER_ADMIN') && (
              <button 
                onClick={() => setActivePage('operations-dashboard')}
                className={`px-2 py-0.5 rounded text-xs font-medium transition ${activePage === 'operations-dashboard' ? 'bg-emerald-600 text-white' : 'text-emerald-400 hover:text-white'}`}
              >
                Ops Radar
              </button>
            )}
            {(currentUser.role === 'ADMIN' || currentUser.role === 'SUPER_ADMIN' || currentUser.role === 'FINANCE') && (
              <button 
                onClick={() => setActivePage('admin-dashboard')}
                className={`px-2 py-0.5 rounded text-xs font-medium transition ${activePage === 'admin-dashboard' ? 'bg-sky-600 text-white' : 'text-slate-300 hover:text-white'}`}
              >
                Admin Panel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo & Hazmat Class Placard */}
        <div 
          onClick={() => setActivePage('home')}
          className="flex items-center gap-3 cursor-pointer group"
          id="brand-logo-btn"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-sky-500 rounded-lg flex items-center justify-center shadow-lg group-hover:border-amber-500 transition">
            <Truck className="w-6 h-6 text-sky-400 group-hover:text-amber-400 transition" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold tracking-tight text-lg sm:text-xl text-white font-mono">
                ARMTELLS
              </span>
              <span className="bg-amber-500/20 text-amber-400 text-[10px] font-bold px-1.5 py-0.5 rounded border border-amber-500/40 uppercase tracking-widest flex items-center gap-0.5">
                <Flame className="w-2.5 h-2.5" /> Class 3
              </span>
            </div>
            <p className="text-[11px] text-slate-400 tracking-wider uppercase font-semibold">
              Transport Services • Bulk Fuel Logistics
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center space-x-1">
          {navLinks.map((link) => {
            const isActive = activePage === link.id;
            return (
              <button
                key={link.id}
                id={`nav-link-${link.id}`}
                onClick={() => setActivePage(link.id)}
                className={`px-3 py-2 rounded-md text-xs font-semibold uppercase tracking-wider transition ${
                  isActive 
                    ? 'bg-sky-600/20 text-sky-400 border border-sky-500/30' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-900'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Action Controls & Quick Tracking Search */}
        <div className="hidden lg:flex items-center gap-3">
          {/* Quick Track Input */}
          <form onSubmit={handleTrackSubmit} className="relative">
            <input
              type="text"
              placeholder="Track ART-2026-..."
              value={quickTrackId}
              onChange={(e) => setQuickTrackId(e.target.value)}
              className="w-36 lg:w-44 bg-slate-900 border border-slate-700 text-xs text-white rounded-md pl-7 pr-2 py-1.5 focus:w-48 focus:border-sky-500 focus:outline-none transition-all placeholder:text-slate-500"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2 top-2.5" />
          </form>

          {/* Direct Delivery Request CTA */}
          <button
            id="header-delivery-cta"
            onClick={() => setActivePage('delivery-request')}
            className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-md shadow-md transition transform hover:-translate-y-0.5 cursor-pointer"
          >
            Request Delivery
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 xl:hidden">
          <button
            onClick={() => setActivePage('delivery-request')}
            className="px-3 py-1.5 bg-amber-500 text-slate-950 font-bold text-xs uppercase rounded"
          >
            Book
          </button>
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-md bg-slate-900 text-slate-300 hover:text-white border border-slate-800 focus:outline-none"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-slate-900 border-t border-slate-800 px-4 pt-3 pb-6 space-y-2 shadow-2xl">
          {/* Quick Track Mobile */}
          <form onSubmit={(e) => { handleTrackSubmit(e); setMobileMenuOpen(false); }} className="relative mb-3">
            <input
              type="text"
              placeholder="Enter Delivery ID (e.g. ART-2026-000101)..."
              value={quickTrackId}
              onChange={(e) => setQuickTrackId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 text-sm text-white rounded-md pl-9 pr-3 py-2 focus:border-sky-500 focus:outline-none"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </form>

          <div className="grid grid-cols-2 gap-1.5 pb-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActivePage(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 rounded text-xs font-semibold uppercase tracking-wider ${
                  activePage === link.id ? 'bg-sky-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-800 grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                setActivePage('customer-portal');
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2 bg-slate-800 text-slate-200 border border-slate-700 rounded text-xs font-medium text-center"
            >
              Client Portal
            </button>
            <button
              onClick={() => {
                setActivePage('driver-portal');
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2 bg-amber-950/60 text-amber-300 border border-amber-800/60 rounded text-xs font-medium text-center"
            >
              Driver View
            </button>
            <button
              onClick={() => {
                setActivePage('operations-dashboard');
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2 bg-emerald-950/60 text-emerald-300 border border-emerald-800/60 rounded text-xs font-medium text-center"
            >
              Ops Radar
            </button>
            <button
              onClick={() => {
                setActivePage('admin-dashboard');
                setMobileMenuOpen(false);
              }}
              className="px-3 py-2 bg-sky-950/60 text-sky-300 border border-sky-800/60 rounded text-xs font-medium text-center"
            >
              Admin Suite
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
