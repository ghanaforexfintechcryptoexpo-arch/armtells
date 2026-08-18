import React from 'react';
import { 
  Truck, 
  ShieldCheck, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Layers, 
  Wrench, 
  AlertCircle, 
  ArrowRight,
  Filter,
  PlusCircle,
  FileCheck2,
  Gauge
} from 'lucide-react';
import { storageService } from '../services/storage';
import { Tanker, TankerStatus } from '../types';

interface FleetPageProps {
  setActivePage: (page: string) => void;
  onSelectTanker?: (tankerId: string) => void;
}

export const FleetPage: React.FC<FleetPageProps> = ({ setActivePage, onSelectTanker }) => {
  const [statusFilter, setStatusFilter] = React.useState<string>('ALL');
  const [selectedTankerModal, setSelectedTankerModal] = React.useState<Tanker | null>(null);
  
  const tankers = storageService.getTankers();

  const filteredTankers = statusFilter === 'ALL' 
    ? tankers 
    : tankers.filter(t => t.status === statusFilter);

  const statusBadges: Record<TankerStatus, { label: string; bg: string; text: string; border: string }> = {
    AVAILABLE: { label: 'AVAILABLE FOR DISPATCH', bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
    ON_DELIVERY: { label: 'ON ACTIVE DELIVERY', bg: 'bg-[#FF6B00]/10', text: 'text-[#FF6B00]', border: 'border-[#FF6B00]/20' },
    IN_TRANSIT: { label: 'IN CORRIDOR TRANSIT', bg: 'bg-sky-500/10', text: 'text-sky-400', border: 'border-sky-500/20' },
    UNDER_MAINTENANCE: { label: 'UNDER MAINTENANCE', bg: 'bg-rose-500/10', text: 'text-rose-400', border: 'border-rose-500/20' },
    OFFLINE: { label: 'STAGED OFFLINE', bg: 'bg-white/5', text: 'text-slate-400', border: 'border-white/10' }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-slate-100 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-6 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-sm bg-white/5 text-[#FF6B00] text-xs font-mono font-bold uppercase mb-2 border border-white/10">
              <span>SPECIALIZED PETROLEUM ROAD TANKER ASSETS</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
              Tanker Fleet Management
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-3xl mt-1">
              Multi-compartment Bulk Road Vehicles (BRVs) calibrated to National Petroleum Authority (NPA) standards, equipped with bottom-loading vapor recovery and metered transfer pumps.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActivePage('delivery-request')}
              className="px-5 py-2.5 bg-[#FF6B00] hover:bg-[#E56000] text-black font-extrabold text-xs uppercase tracking-wider rounded-sm transition cursor-pointer font-mono"
            >
              Request a Tanker
            </button>
          </div>
        </div>

        {/* Filter Bar & Fleet Status Summary */}
        <div className="bg-[#0F0F11] border border-white/10 p-4 rounded-sm flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase flex items-center gap-1.5 mr-2">
              <Filter className="w-3.5 h-3.5 text-[#FF6B00]" /> Filter:
            </span>
            {['ALL', 'AVAILABLE', 'ON_DELIVERY', 'IN_TRANSIT', 'UNDER_MAINTENANCE'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 py-1.5 rounded-sm text-xs font-mono font-semibold transition cursor-pointer ${
                  statusFilter === status 
                    ? 'bg-[#FF6B00] text-black font-bold' 
                    : 'bg-[#0A0A0B] text-slate-400 hover:text-white border border-white/10'
                }`}
              >
                {status.replace('_', ' ')}
              </button>
            ))}
          </div>

          <div className="text-xs font-mono text-slate-400">
            Showing <span className="text-white font-bold">{filteredTankers.length}</span> of <span className="text-white font-bold">{tankers.length}</span> Bulk Road Vehicles
          </div>
        </div>

        {/* Tanker Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTankers.map((tanker) => {
            const badge = statusBadges[tanker.status] || statusBadges.AVAILABLE;
            return (
              <div
                key={tanker.id}
                id={`tanker-card-${tanker.tankerId}`}
                className="group bg-[#0F0F11] border border-white/10 rounded-sm overflow-hidden flex flex-col justify-between hover:border-white/30 transition shadow-xl"
              >
                <div>
                  {/* Tanker Image */}
                  <div className="relative h-48 w-full overflow-hidden bg-[#0A0A0B]">
                    <img 
                      src={tanker.imageUrl || 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80'} 
                      alt={`${tanker.tankerId} - ${tanker.makeModel}`}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F11] via-transparent to-black/60 pointer-events-none" />

                    {/* Top Overlays */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                      <div className="bg-[#0A0A0B]/90 backdrop-blur-sm border border-white/15 px-2.5 py-1 rounded-sm flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5 text-[#FF6B00]" />
                        <span className="font-mono font-extrabold text-xs text-white tracking-wider">
                          {tanker.tankerId}
                        </span>
                      </div>

                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-sm border uppercase backdrop-blur-sm ${badge.bg} ${badge.text} ${badge.border}`}>
                        {badge.label}
                      </span>
                    </div>

                    {/* Bottom Image Overlay */}
                    <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between pointer-events-none font-mono">
                      <span className="text-[11px] font-bold text-white bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-sm border border-white/10">
                        {tanker.registrationNumber}
                      </span>
                      <span className="text-xs font-black text-[#FF6B00] bg-black/80 backdrop-blur-sm px-2.5 py-0.5 rounded-sm border border-[#FF6B00]/40">
                        {(tanker.tankCapacityLiters).toLocaleString()} L
                      </span>
                    </div>
                  </div>

                  {/* Body Specs */}
                  <div className="p-4 space-y-3">
                    <h3 className="text-base font-bold text-white uppercase group-hover:text-[#FF6B00] transition-colors">
                      {tanker.makeModel}
                    </h3>
                    
                    <div className="bg-[#0A0A0B] p-2.5 rounded-sm border border-white/10 space-y-1.5 text-xs font-mono">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Assigned Driver:</span>
                        <span className="font-semibold text-white truncate max-w-[150px]">
                          {tanker.assignedDriverName || 'Staging Yard Reserve'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Current Base:</span>
                        <span className="text-slate-300 truncate max-w-[150px]">
                          {tanker.currentLocationName}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">NPA Calibration:</span>
                        <span className="text-sky-400">{tanker.calibrationCertificateNumber}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500">Next Recert:</span>
                        <span className="text-[#FF6B00]">{tanker.nextMaintenanceDate}</span>
                      </div>
                    </div>

                    {/* Features Checklist */}
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
                          ✓ Digital Meter
                        </span>
                      )}
                      {tanker.hasHighFlowPump && (
                        <span className="bg-[#0A0A0B] px-1.5 py-0.5 rounded-sm border border-white/10 text-purple-400">
                          ✓ High Flow Pump
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-4 pt-0">
                  <div className="pt-3 border-t border-white/10 flex items-center gap-2">
                    <button
                      onClick={() => setSelectedTankerModal(tanker)}
                      className="flex-1 py-2 bg-white/5 hover:bg-white/10 text-slate-300 font-mono font-bold text-xs uppercase tracking-wider rounded-sm border border-white/10 transition text-center cursor-pointer"
                    >
                      View Specs
                    </button>
                    <button
                      onClick={() => {
                        if (onSelectTanker) onSelectTanker(tanker.id);
                        setActivePage('delivery-request');
                      }}
                      className="flex-1 py-2 bg-[#FF6B00] hover:bg-[#E56000] text-black font-extrabold text-xs uppercase tracking-wider rounded-sm transition text-center font-mono cursor-pointer"
                    >
                      Book Tanker
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Spec Modal if clicked */}
        {selectedTankerModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0F0F11] border border-white/20 rounded-sm max-w-lg w-full p-6 space-y-4 shadow-2xl text-white">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <Truck className="w-5 h-5 text-[#FF6B00]" />
                  <h3 className="text-base font-black uppercase font-mono">
                    {selectedTankerModal.tankerId} • {selectedTankerModal.registrationNumber}
                  </h3>
                </div>
                <button 
                  onClick={() => setSelectedTankerModal(null)}
                  className="text-slate-400 hover:text-white p-1 cursor-pointer font-mono"
                >
                  ✕
                </button>
              </div>

              {selectedTankerModal.imageUrl && (
                <div className="h-40 w-full overflow-hidden rounded-sm border border-white/10">
                  <img 
                    src={selectedTankerModal.imageUrl} 
                    alt={selectedTankerModal.makeModel}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="space-y-3 text-xs font-mono">
                <div>
                  <span className="text-slate-500 uppercase block text-[10px]">Vehicle Make & Model</span>
                  <span className="text-sm font-bold text-white">{selectedTankerModal.makeModel}</span>
                </div>

                <div className="bg-[#0A0A0B] p-3 rounded-sm border border-white/10">
                  <span className="text-slate-400 uppercase font-bold block mb-2 text-[11px]">Compartment Breakdown</span>
                  <div className="space-y-1.5">
                    {selectedTankerModal.compartments.map((comp) => (
                      <div key={comp.compartmentNumber} className="flex justify-between border-b border-white/5 pb-1">
                        <span>Compartment #{comp.compartmentNumber}</span>
                        <span className="text-[#FF6B00] font-bold">{(comp.capacityLiters).toLocaleString()} Litres</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-500 uppercase block text-[10px]">Calibration Expiry</span>
                    <span className="text-slate-200">{selectedTankerModal.calibrationExpiry}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase block text-[10px]">Next Maintenance</span>
                    <span className="text-[#FF6B00]">{selectedTankerModal.nextMaintenanceDate}</span>
                  </div>
                </div>

                {selectedTankerModal.notes && (
                  <div className="bg-[#0A0A0B] p-2.5 rounded-sm border border-white/10 text-slate-300">
                    <span className="text-slate-500 uppercase block text-[10px]">Technical Notes</span>
                    {selectedTankerModal.notes}
                  </div>
                )}
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    setSelectedTankerModal(null);
                    setActivePage('delivery-request');
                  }}
                  className="w-full py-2.5 bg-[#FF6B00] hover:bg-[#E56000] text-black font-extrabold text-xs uppercase tracking-wider rounded-sm cursor-pointer font-mono"
                >
                  Request Delivery With This Unit
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
