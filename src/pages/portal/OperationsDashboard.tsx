import React, { useState } from 'react';
import { 
  Radio, 
  Truck, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  Filter, 
  Flame, 
  Phone,
  RefreshCw,
  Search,
  ExternalLink,
  Activity,
  Layers,
  FileText,
  UserCheck,
  MessageSquare,
  Plus,
  Send,
  Navigation,
  Gauge
} from 'lucide-react';
import { storageService } from '../../services/storage';
import { DeliveryRequest, DeliveryStatus, Tanker } from '../../types';
import { LiveOperationsMap } from '../../components/dashboard/LiveOperationsMap';
import { DispatchAssignmentModal } from '../../components/dashboard/DispatchAssignmentModal';
import { WaybillModal } from '../../components/dashboard/WaybillModal';

interface OperationsDashboardProps {
  setActivePage: (page: string) => void;
  onOpenTrackingModal: (id: string) => void;
  onOpenPodModal: (podId: string) => void;
}

export const OperationsDashboard: React.FC<OperationsDashboardProps> = ({
  setActivePage,
  onOpenTrackingModal,
  onOpenPodModal
}) => {
  const [deliveries, setDeliveries] = useState<DeliveryRequest[]>(() => storageService.getDeliveries());
  const [tankers, setTankers] = useState<Tanker[]>(() => storageService.getTankers());
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedTankerId, setSelectedTankerId] = useState<string | null>('ART-TK-01');
  
  // Modals state
  const [selectedDeliveryForDispatch, setSelectedDeliveryForDispatch] = useState<DeliveryRequest | null>(null);
  const [selectedDeliveryForWaybill, setSelectedDeliveryForWaybill] = useState<DeliveryRequest | null>(null);
  const [activeCorridorFilter, setActiveCorridorFilter] = useState<string>('ALL');

  const refreshData = () => {
    setDeliveries(storageService.getDeliveries());
    setTankers(storageService.getTankers());
  };

  const handleStatusChange = (id: string, newStatus: DeliveryStatus) => {
    storageService.updateDeliveryStatus(id, newStatus, 'Operations controller update');
    refreshData();
  };

  const filteredDeliveries = deliveries.filter(d => {
    const matchesSearch = d.requestNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.deliveryLocation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || d.status === statusFilter;
    const matchesCorridor = activeCorridorFilter === 'ALL' || 
      (activeCorridorFilter === 'WESTERN' && (d.deliveryLocation.toLowerCase().includes('tarkwa') || d.deliveryLocation.toLowerCase().includes('takoradi') || d.deliveryLocation.toLowerCase().includes('damang'))) ||
      (activeCorridorFilter === 'EASTERN' && (d.deliveryLocation.toLowerCase().includes('tema') || d.deliveryLocation.toLowerCase().includes('accra') || d.deliveryLocation.toLowerCase().includes('spintex'))) ||
      (activeCorridorFilter === 'CENTRAL' && (d.deliveryLocation.toLowerCase().includes('kumasi') || d.deliveryLocation.toLowerCase().includes('ashanti') || d.deliveryLocation.toLowerCase().includes('obuasi')));
    return matchesSearch && matchesStatus && matchesCorridor;
  });

  const terminals = [
    { name: 'Tema Oil Refinery (TOR) Gantry', status: 'OPERATIONAL', activeLoadings: 4, queueLength: 2 },
    { name: 'Takoradi Bulk Petroleum Terminal', status: 'OPERATIONAL', activeLoadings: 2, queueLength: 1 },
    { name: 'Kumasi BOST Inland Terminal', status: 'OPERATIONAL', activeLoadings: 1, queueLength: 0 },
    { name: 'Buipe Inland River Gantry', status: 'MAINTENANCE_LANE', activeLoadings: 0, queueLength: 0 }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-slate-100 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-white/10 pb-6 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-sm bg-[#0F0F11] border border-white/10 flex items-center justify-center text-[#FF6B00]">
              <Radio className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#FF6B00] uppercase tracking-widest">
                <span>ARMTELLS OPERATIONS & FLEET DISPATCH</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                Operations & Dispatch Control Center
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setActivePage('delivery-request')}
              className="px-4 py-2 bg-[#FF6B00] hover:bg-[#ff8533] text-black font-extrabold text-xs uppercase tracking-wider rounded-sm transition flex items-center gap-1.5 cursor-pointer shadow"
            >
              <Plus className="w-4 h-4" /> New Delivery Order
            </button>
            <button
              onClick={refreshData}
              className="px-3.5 py-2 bg-[#0F0F11] hover:bg-white/5 text-slate-300 rounded-sm border border-white/10 text-xs font-mono font-bold uppercase transition flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Refresh Telemetry
            </button>
            <button
              onClick={() => setActivePage('admin-dashboard')}
              className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white font-extrabold text-xs uppercase tracking-wider rounded-sm border border-white/10 transition cursor-pointer"
            >
              Admin Master Control →
            </button>
          </div>
        </div>

        {/* Loading Terminal Staging Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {terminals.map((t, idx) => (
            <div key={idx} className="bg-[#0F0F11] border border-white/10 rounded-sm p-4 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono text-slate-400 uppercase">Gantry Staging</span>
                <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-sm border ${
                  t.status === 'OPERATIONAL' 
                    ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                    : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                }`}>
                  {t.status}
                </span>
              </div>
              <h4 className="text-xs font-bold text-white uppercase truncate">{t.name}</h4>
              <div className="flex justify-between text-xs font-mono text-slate-400 pt-2 border-t border-white/10">
                <span>Active Loads: <strong className="text-white">{t.activeLoadings}</strong></span>
                <span>Queue: <strong className="text-[#FF6B00]">{t.queueLength} BRVs</strong></span>
              </div>
            </div>
          ))}
        </div>

        {/* Live GPS Fleet Map Visualization */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#FF6B00]" />
              <h2 className="text-base font-bold text-white uppercase tracking-tight font-sans">
                National Corridor Live Map & GPS Asset Tracker
              </h2>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono">
              <button 
                onClick={() => setActiveCorridorFilter('ALL')}
                className={`px-2.5 py-1 rounded-sm border text-[11px] ${activeCorridorFilter === 'ALL' ? 'bg-[#FF6B00] text-black font-bold border-[#FF6B00]' : 'bg-white/5 text-slate-300 border-white/10'}`}
              >
                All Ghana
              </button>
              <button 
                onClick={() => setActiveCorridorFilter('EASTERN')}
                className={`px-2.5 py-1 rounded-sm border text-[11px] ${activeCorridorFilter === 'EASTERN' ? 'bg-[#FF6B00] text-black font-bold border-[#FF6B00]' : 'bg-white/5 text-slate-300 border-white/10'}`}
              >
                Tema-Accra Metro
              </button>
              <button 
                onClick={() => setActiveCorridorFilter('WESTERN')}
                className={`px-2.5 py-1 rounded-sm border text-[11px] ${activeCorridorFilter === 'WESTERN' ? 'bg-[#FF6B00] text-black font-bold border-[#FF6B00]' : 'bg-white/5 text-slate-300 border-white/10'}`}
              >
                Western Mining Belt
              </button>
              <button 
                onClick={() => setActiveCorridorFilter('CENTRAL')}
                className={`px-2.5 py-1 rounded-sm border text-[11px] ${activeCorridorFilter === 'CENTRAL' ? 'bg-[#FF6B00] text-black font-bold border-[#FF6B00]' : 'bg-white/5 text-slate-300 border-white/10'}`}
              >
                Kumasi Corridor
              </button>
            </div>
          </div>

          <LiveOperationsMap
            tankers={tankers}
            deliveries={deliveries}
            onOpenTrackingModal={onOpenTrackingModal}
            onOpenPodModal={onOpenPodModal}
            selectedTankerId={selectedTankerId}
            onSelectTanker={setSelectedTankerId}
          />
        </div>

        {/* Live Active Deliveries Registry & Dispatch Actions */}
        <div className="bg-[#0F0F11] border border-white/10 rounded-sm overflow-hidden shadow-2xl space-y-4">
          
          <div className="p-4 sm:p-6 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-white uppercase tracking-tight">
                Live Petroleum Haulage Consignments & Dispatch Pipeline
              </h2>
              <span className="text-xs font-mono text-slate-400">
                Allocate Tankers, advance transit stages, generate waybills & execute electronic POD custody transfer
              </span>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search order ref, client, site..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-[#0A0A0B] border border-white/10 text-xs text-white rounded-sm pl-9 pr-3 py-2 focus:border-[#FF6B00] focus:outline-none"
                />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-[#0A0A0B] border border-white/10 text-xs text-white rounded-sm px-3 py-2 focus:border-[#FF6B00] focus:outline-none font-mono"
              >
                <option value="ALL">All Stages</option>
                <option value="REQUEST_RECEIVED">Request Received</option>
                <option value="DISPATCH_CONFIRMED">Dispatch Confirmed</option>
                <option value="TANKER_ASSIGNED">Tanker Assigned</option>
                <option value="LOADING">Loading at Gantry</option>
                <option value="IN_TRANSIT">In Transit</option>
                <option value="ARRIVING">Arriving</option>
                <option value="DELIVERED">Delivered</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 uppercase bg-[#0A0A0B]">
                  <th className="py-3.5 px-4">Order Ref</th>
                  <th className="py-3.5 px-4">Client / Destination</th>
                  <th className="py-3.5 px-4">Cargo Volume</th>
                  <th className="py-3.5 px-4">Allocated Asset</th>
                  <th className="py-3.5 px-4">Dispatch Workflow Stage</th>
                  <th className="py-3.5 px-4 text-right">Operations Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-slate-300">
                {filteredDeliveries.map((del) => (
                  <tr key={del.id} className="hover:bg-white/5 transition">
                    <td className="py-4 px-4 font-bold text-[#FF6B00]">
                      <div>{del.requestNumber}</div>
                      <span className="text-[10px] text-slate-500 font-normal">{new Date(del.createdAt).toLocaleDateString()}</span>
                    </td>
                    <td className="py-4 px-4">
                      <strong className="text-white block uppercase">{del.companyName}</strong>
                      <span className="text-slate-400 block text-[11px] truncate max-w-xs">{del.deliveryLocation}</span>
                      <span className="text-[10px] text-sky-400 block">{del.customerName} ({del.customerPhone})</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-slate-200">{del.productName}</span>
                      <span className="text-[#FF6B00] font-bold block text-sm">{(del.quantityLiters).toLocaleString()} L</span>
                      <span className="text-[10px] text-slate-500">Depot: {del.pickupDepot || 'Tema TOR'}</span>
                    </td>
                    <td className="py-4 px-4">
                      {del.assignedTankerReg ? (
                        <div>
                          <span className="text-white font-bold block">{del.assignedTankerReg}</span>
                          <span className="text-emerald-400 block text-[11px]">{del.assignedDriverName}</span>
                          <span className="text-[10px] text-slate-400">{del.assignedDriverPhone}</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => setSelectedDeliveryForDispatch(del)}
                          className="px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-sm text-[10px] font-bold uppercase transition flex items-center gap-1 cursor-pointer"
                        >
                          <UserCheck className="w-3 h-3" /> Allocate Tanker
                        </button>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <select
                        value={del.status}
                        onChange={(e) => handleStatusChange(del.id, e.target.value as DeliveryStatus)}
                        className={`text-xs font-mono font-bold px-2 py-1 rounded-sm border uppercase ${
                          del.status === 'DELIVERED'
                            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                            : del.status === 'IN_TRANSIT'
                            ? 'bg-[#FF6B00]/10 text-[#FF6B00] border-[#FF6B00]/20'
                            : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        }`}
                      >
                        <option value="REQUEST_RECEIVED">REQUEST RECEIVED</option>
                        <option value="DISPATCH_CONFIRMED">DISPATCH CONFIRMED</option>
                        <option value="TANKER_ASSIGNED">TANKER ASSIGNED</option>
                        <option value="LOADING">LOADING AT GANTRY</option>
                        <option value="IN_TRANSIT">IN TRANSIT (GPS)</option>
                        <option value="ARRIVING">ARRIVING DESTINATION</option>
                        <option value="DELIVERED">DELIVERED & SIGNED</option>
                      </select>
                    </td>
                    <td className="py-4 px-4 text-right space-x-2 whitespace-nowrap">
                      
                      {/* Assign / Reassign Button */}
                      <button
                        onClick={() => setSelectedDeliveryForDispatch(del)}
                        className="px-2 py-1 bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white rounded-sm border border-white/10 text-[11px] transition inline-flex items-center gap-1 cursor-pointer"
                        title="Allocate or modify assigned Tanker & Driver"
                      >
                        <UserCheck className="w-3 h-3 text-[#FF6B00]" />
                        <span>Dispatch</span>
                      </button>

                      {/* Waybill Button */}
                      <button
                        onClick={() => setSelectedDeliveryForWaybill(del)}
                        className="px-2 py-1 bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white rounded-sm border border-white/10 text-[11px] transition inline-flex items-center gap-1 cursor-pointer"
                        title="View & Print Official Electronic Waybill"
                      >
                        <FileText className="w-3 h-3 text-sky-400" />
                        <span>Waybill</span>
                      </button>

                      {/* Track Button */}
                      <button
                        onClick={() => {
                          if (del.assignedTankerId) {
                            const foundTanker = tankers.find(t => t.id === del.assignedTankerId || t.tankerId === del.assignedTankerId);
                            if (foundTanker) {
                              setSelectedTankerId(foundTanker.tankerId);
                            }
                          }
                          onOpenTrackingModal(del.requestNumber);
                        }}
                        className="px-2 py-1 bg-[#FF6B00]/10 hover:bg-[#FF6B00]/20 text-[#FF6B00] rounded-sm border border-[#FF6B00]/30 text-[11px] transition inline-flex items-center gap-1 cursor-pointer"
                      >
                        <Radio className="w-3 h-3" /> Track
                      </button>

                      {/* POD Button if delivered */}
                      {del.status === 'DELIVERED' && del.proofOfDeliveryId && (
                        <button
                          onClick={() => onOpenPodModal(del.proofOfDeliveryId!)}
                          className="px-2 py-1 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 rounded-sm border border-emerald-500/20 text-[11px] transition inline-flex items-center gap-1 cursor-pointer"
                        >
                          POD
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>

      </div>

      {/* Dispatch Assignment Modal */}
      <DispatchAssignmentModal
        delivery={selectedDeliveryForDispatch}
        isOpen={!!selectedDeliveryForDispatch}
        onClose={() => setSelectedDeliveryForDispatch(null)}
        onSuccess={refreshData}
      />

      {/* Official Electronic Waybill Modal */}
      <WaybillModal
        delivery={selectedDeliveryForWaybill}
        isOpen={!!selectedDeliveryForWaybill}
        onClose={() => setSelectedDeliveryForWaybill(null)}
      />

    </div>
  );
};

