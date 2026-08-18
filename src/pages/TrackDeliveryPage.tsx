import React from 'react';
import { 
  Search, 
  Truck, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  CheckCircle2, 
  Flame, 
  Phone, 
  FileText, 
  AlertCircle, 
  Layers, 
  Radio, 
  Compass,
  ArrowRight,
  Printer
} from 'lucide-react';
import { storageService } from '../services/storage';
import { DeliveryRequest, DeliveryStatus } from '../types';

interface TrackDeliveryPageProps {
  initialTrackId?: string;
  setActivePage: (page: string) => void;
  onOpenPodModal?: (podId: string) => void;
}

export const TrackDeliveryPage: React.FC<TrackDeliveryPageProps> = ({
  initialTrackId = '',
  setActivePage,
  onOpenPodModal
}) => {
  const [searchInput, setSearchInput] = React.useState(initialTrackId);
  const [activeDelivery, setActiveDelivery] = React.useState<DeliveryRequest | null>(null);
  const [searchError, setSearchError] = React.useState('');

  React.useEffect(() => {
    if (initialTrackId) {
      handleSearch(initialTrackId);
    } else {
      // Default to first active delivery for immediate richness
      const deliveries = storageService.getDeliveries();
      if (deliveries.length > 0) {
        setActiveDelivery(deliveries[0]);
      }
    }
  }, [initialTrackId]);

  const handleSearch = (query: string) => {
    setSearchError('');
    if (!query.trim()) {
      setSearchError('Please enter a valid Delivery Tracking ID.');
      return;
    }

    const found = storageService.getDeliveryByNumber(query);
    if (found) {
      setActiveDelivery(found);
      setSearchError('');
    } else {
      setSearchError(`No active petroleum delivery found matching "${query}". Please check the ID and try again.`);
    }
  };

  const stages: { key: DeliveryStatus; label: string; number: string }[] = [
    { key: 'REQUEST_RECEIVED', label: 'Request Received', number: '01' },
    { key: 'DISPATCH_CONFIRMED', label: 'Dispatch Confirmed', number: '02' },
    { key: 'TANKER_ASSIGNED', label: 'Tanker Assigned', number: '03' },
    { key: 'LOADING', label: 'Loading at Depot', number: '04' },
    { key: 'IN_TRANSIT', label: 'In Transit Corridor', number: '05' },
    { key: 'ARRIVING', label: 'Arriving at Site', number: '06' },
    { key: 'DELIVERED', label: 'Delivered & Custody Transferred', number: '07' },
  ];

  const getStageIndex = (status: DeliveryStatus) => {
    return stages.findIndex(s => s.key === status);
  };

  const currentStageIdx = activeDelivery ? getStageIndex(activeDelivery.status) : -1;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="border-b border-slate-800 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-sky-950/60 text-sky-400 text-xs font-mono font-bold uppercase mb-2 border border-sky-800/40">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>REAL-TIME CORRIDOR TRACKING</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
              Track Petroleum Delivery
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Monitor active tanker haulage from terminal gantry loading through to on-site joint dipstick reconciliation.
            </p>
          </div>

          {/* Quick sample chips */}
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span>Quick Lookups:</span>
            <button 
              onClick={() => { setSearchInput('ART-2026-000101'); handleSearch('ART-2026-000101'); }}
              className="px-2 py-1 bg-slate-900 hover:bg-slate-800 text-sky-400 rounded border border-slate-800"
            >
              ART-2026-000101
            </button>
            <button 
              onClick={() => { setSearchInput('ART-2026-000102'); handleSearch('ART-2026-000102'); }}
              className="px-2 py-1 bg-slate-900 hover:bg-slate-800 text-amber-400 rounded border border-slate-800"
            >
              ART-2026-000102
            </button>
          </div>
        </div>

        {/* Search Input Bar */}
        <div className="bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-lg">
          <form 
            onSubmit={(e) => { e.preventDefault(); handleSearch(searchInput); }}
            className="flex flex-col sm:flex-row items-center gap-3"
          >
            <div className="relative flex-1 w-full">
              <Search className="w-5 h-5 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Enter Delivery ID (e.g. ART-2026-000101)..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-sm text-white rounded-lg pl-11 pr-4 py-3 focus:border-sky-500 focus:outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-lg transition shrink-0 cursor-pointer"
            >
              Track Shipment
            </button>
          </form>
          {searchError && (
            <p className="text-xs text-rose-400 mt-2 font-mono flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5" /> {searchError}
            </p>
          )}
        </div>

        {/* Active Delivery Details View */}
        {activeDelivery ? (
          <div className="space-y-8">
            
            {/* Top Shipment Status Overview Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-3">
                <div>
                  <span className="text-[11px] font-mono text-slate-500 uppercase block">Shipment Reference</span>
                  <div className="flex items-center gap-3">
                    <span className="text-2xl sm:text-3xl font-black font-mono text-amber-400">
                      {activeDelivery.requestNumber}
                    </span>
                    <span className="bg-sky-950/80 text-sky-400 border border-sky-800/60 text-xs font-mono font-bold px-2.5 py-1 rounded">
                      {activeDelivery.status.replace('_', ' ')}
                    </span>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[11px] font-mono text-slate-500 uppercase block">Estimated Arrival</span>
                  <span className="text-sm font-bold font-mono text-white">
                    {activeDelivery.estimatedArrival || 'Scheduled per dispatch window'}
                  </span>
                </div>
              </div>

              {/* 7-STAGE PROGRESS STEPPER */}
              <div>
                <div className="hidden lg:grid grid-cols-7 gap-2">
                  {stages.map((st, idx) => {
                    const isCompleted = idx <= currentStageIdx;
                    const isCurrent = idx === currentStageIdx;

                    return (
                      <div key={st.key} className="space-y-2 relative">
                        <div className="flex items-center">
                          <div 
                            className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-mono font-bold border ${
                              isCurrent
                                ? 'bg-amber-500 text-slate-950 border-amber-400 ring-4 ring-amber-500/20'
                                : isCompleted
                                ? 'bg-emerald-600 text-white border-emerald-500'
                                : 'bg-slate-950 text-slate-600 border-slate-800'
                            }`}
                          >
                            {isCompleted && !isCurrent ? '✓' : st.number}
                          </div>
                          {idx < stages.length - 1 && (
                            <div className={`flex-1 h-1 ml-1 ${idx < currentStageIdx ? 'bg-emerald-500' : 'bg-slate-800'}`} />
                          )}
                        </div>

                        <div>
                          <p className={`text-[11px] font-bold uppercase leading-tight ${isCurrent ? 'text-amber-400' : isCompleted ? 'text-slate-200' : 'text-slate-600'}`}>
                            {st.label}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Mobile Stepper View */}
                <div className="lg:hidden bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <span className="text-[10px] font-mono text-slate-500 uppercase block">Current Stage:</span>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-amber-500 animate-ping" />
                    <span className="font-bold text-sm text-amber-400 uppercase">
                      Stage {stages[currentStageIdx]?.number || '01'}: {stages[currentStageIdx]?.label || activeDelivery.status}
                    </span>
                  </div>
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden mt-2">
                    <div 
                      className="bg-amber-500 h-full transition-all duration-500" 
                      style={{ width: `${Math.round(((currentStageIdx + 1) / stages.length) * 100)}%` }} 
                    />
                  </div>
                </div>
              </div>

              {/* Core Logistics Specification Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800 text-xs font-mono">
                
                {/* Cargo Details */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
                  <div className="flex items-center gap-2 text-amber-400 font-bold uppercase text-[11px]">
                    <Flame className="w-4 h-4" /> Cargo Details
                  </div>
                  <div className="space-y-1 text-slate-300">
                    <p><span className="text-slate-500">Product:</span> {activeDelivery.productName}</p>
                    <p><span className="text-slate-500">Volume:</span> {(activeDelivery.quantityLiters).toLocaleString()} Litres</p>
                    <p><span className="text-slate-500">Hazard:</span> Class 3 Flammable Liquid</p>
                  </div>
                </div>

                {/* Assigned Tanker & Driver */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
                  <div className="flex items-center gap-2 text-sky-400 font-bold uppercase text-[11px]">
                    <Truck className="w-4 h-4" /> Allocated Fleet Asset
                  </div>
                  <div className="space-y-1 text-slate-300">
                    <p><span className="text-slate-500">Tanker:</span> {activeDelivery.assignedTankerReg || 'Allocation in progress'}</p>
                    <p><span className="text-slate-500">Driver:</span> {activeDelivery.assignedDriverName || 'Terminal Dispatch'}</p>
                    {activeDelivery.assignedDriverPhone && (
                      <p><span className="text-slate-500">Dispatch Tel:</span> {activeDelivery.assignedDriverPhone}</p>
                    )}
                  </div>
                </div>

                {/* Route Points */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800/80 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold uppercase text-[11px]">
                    <MapPin className="w-4 h-4" /> Route & Depot Terminal
                  </div>
                  <div className="space-y-1 text-slate-300">
                    <p><span className="text-slate-500">Origin:</span> {activeDelivery.pickupLocation}</p>
                    <p><span className="text-slate-500">Destination:</span> {activeDelivery.deliveryLocation}</p>
                    <p><span className="text-slate-500">Facility:</span> {activeDelivery.siteType}</p>
                  </div>
                </div>

              </div>

              {/* Proof of Delivery Action if completed */}
              {activeDelivery.status === 'DELIVERED' && activeDelivery.proofOfDeliveryId && (
                <div className="bg-emerald-950/40 border border-emerald-600/40 p-4 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase">Proof of Delivery Verified</h4>
                      <p className="text-[11px] text-slate-300">Custody transfer executed and signed on digital meter manifest.</p>
                    </div>
                  </div>

                  <button
                    onClick={() => onOpenPodModal && onOpenPodModal(activeDelivery.proofOfDeliveryId!)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded transition flex items-center gap-1.5"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>View Signed POD</span>
                  </button>
                </div>
              )}

            </div>

            {/* Timeline Audit History */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-4">
              <h3 className="text-sm font-mono font-bold text-sky-400 uppercase tracking-widest flex items-center gap-2">
                <Clock className="w-4 h-4" /> Custody & Status History Log
              </h3>

              <div className="space-y-4 relative pl-6 border-l-2 border-slate-800">
                {activeDelivery.statusHistory.map((item, idx) => (
                  <div key={idx} className="relative space-y-1">
                    <div className="absolute -left-[31px] top-0 w-3.5 h-3.5 rounded-full bg-sky-500 border-2 border-slate-900" />
                    
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-bold text-white font-mono uppercase">
                        {item.status.replace('_', ' ')}
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">
                        {new Date(item.timestamp).toLocaleString()}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300">
                      {item.note}
                    </p>

                    <div className="text-[10px] font-mono text-slate-500">
                      Location: <span className="text-slate-400">{item.location}</span> • Updated by: <span className="text-slate-400">{item.updatedBy}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* GPS Telemetry Note */}
            <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-center text-xs text-slate-400 font-mono">
              GPS Telemetry: Real-time corridor telemetry active for registered transit corridors. All custody transfers recorded under NPA metrological guidelines.
            </div>

          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400 space-y-3">
            <Radio className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-white">No Shipment Selected</h3>
            <p className="text-xs max-w-sm mx-auto">
              Please enter your Delivery ID (e.g. ART-2026-000101) above to view the active route progress.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
