import React, { useState } from 'react';
import { 
  X, 
  Truck, 
  UserCheck, 
  MapPin, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Send, 
  MessageSquare, 
  FileText,
  AlertCircle,
  CheckCircle2
} from 'lucide-react';
import { DeliveryRequest, Tanker, Driver } from '../../types';
import { storageService } from '../../services/storage';

interface DispatchAssignmentModalProps {
  delivery: DeliveryRequest | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const DispatchAssignmentModal: React.FC<DispatchAssignmentModalProps> = ({
  delivery,
  isOpen,
  onClose,
  onSuccess
}) => {
  if (!isOpen || !delivery) return null;

  const tankers = storageService.getTankers();
  const drivers = storageService.getDrivers();

  const [selectedTankerId, setSelectedTankerId] = useState<string>(
    delivery.assignedTankerId || tankers.find(t => t.status === 'AVAILABLE')?.id || tankers[0]?.id || ''
  );
  const [selectedDriverId, setSelectedDriverId] = useState<string>(
    delivery.assignedDriverId || drivers[0]?.id || ''
  );
  const [estimatedArrival, setEstimatedArrival] = useState<string>(
    delivery.estimatedArrival || new Date(Date.now() + 6 * 3600 * 1000).toISOString().slice(0, 16)
  );
  const [loadingDepot, setLoadingDepot] = useState<string>(
    delivery.pickupDepot || 'Tema Oil Refinery (TOR) Gantry 3'
  );
  const [sealNumbers, setSealNumbers] = useState<string>(
    `ARM-${Math.floor(10000 + Math.random() * 90000)}, ARM-${Math.floor(10000 + Math.random() * 90000)}`
  );
  const [notes, setNotes] = useState<string>('Standard hazardous petroleum transit protocol. Speed governor restricted to 80 km/h.');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedTanker = tankers.find(t => t.id === selectedTankerId);
  const selectedDriver = drivers.find(d => d.id === selectedDriverId);

  const handleAssign = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      storageService.assignTankerAndDriver(
        delivery.id,
        selectedTankerId,
        selectedDriverId,
        estimatedArrival
      );

      storageService.addAuditLog(
        'DISPATCH_ALLOCATION',
        `Allocated Tanker ${selectedTanker?.registrationNumber} and Driver ${selectedDriver?.fullName} to order ${delivery.requestNumber}. Loading Depot: ${loadingDepot}`,
        'DeliveryRequest',
        delivery.id
      );

      onSuccess();
      onClose();
    } catch (err) {
      console.error('Dispatch assignment error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const generateWhatsAppDispatchText = () => {
    const text = `🚨 *ARMTELLS PETROLEUM DISPATCH ORDER* 🚨
*Order Ref:* ${delivery.requestNumber}
*Customer:* ${delivery.companyName}
*Cargo:* ${delivery.quantityLiters.toLocaleString()}L of ${delivery.productName}
*Loading Depot:* ${loadingDepot}
*Destination:* ${delivery.deliveryLocation}
*Tanker Assigned:* ${selectedTanker?.registrationNumber} (${selectedTanker?.makeModel})
*Driver:* ${selectedDriver?.fullName} (${selectedDriver?.phone})
*Seal Numbers:* ${sealNumbers}
*Est. Arrival:* ${new Date(estimatedArrival).toLocaleString()}
*Instructions:* ${notes}

*24/7 Operations Desk:* +233 24 000 1100
*Tracking URL:* https://armtellstransport.com/track?id=${delivery.requestNumber}`;

    return encodeURIComponent(text);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in font-sans">
      <div className="bg-[#0F0F11] border border-white/15 rounded-md w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
        
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-[#141417]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-[#FF6B00]/10 border border-[#FF6B00]/30 flex items-center justify-center text-[#FF6B00]">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-[#FF6B00] uppercase tracking-widest block">
                DISPATCH CONTROL • ASSET ALLOCATION
              </span>
              <h2 className="text-lg font-black text-white uppercase tracking-tight">
                Assign Tanker & Driver — {delivery.requestNumber}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-sm bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleAssign} className="p-6 space-y-5 flex-1">
          
          {/* Order Summary Strip */}
          <div className="bg-[#0A0A0B] border border-white/10 rounded-sm p-4 text-xs font-mono grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div>
              <span className="text-slate-500 uppercase block text-[10px]">Client / Account</span>
              <strong className="text-white truncate block">{delivery.companyName}</strong>
            </div>
            <div>
              <span className="text-slate-500 uppercase block text-[10px]">Cargo Volume</span>
              <strong className="text-[#FF6B00] block">{delivery.quantityLiters.toLocaleString()} L ({delivery.productName})</strong>
            </div>
            <div>
              <span className="text-slate-500 uppercase block text-[10px]">Destination Site</span>
              <strong className="text-slate-300 truncate block">{delivery.deliveryLocation}</strong>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Tanker Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 uppercase font-bold flex items-center justify-between">
                <span>Select Tanker (BRV)</span>
                <span className="text-[10px] text-slate-500">NPA Certified Fleet</span>
              </label>
              <select
                value={selectedTankerId}
                onChange={(e) => setSelectedTankerId(e.target.value)}
                className="w-full bg-[#0A0A0B] border border-white/10 rounded-sm px-3 py-2 text-xs font-mono text-white focus:border-[#FF6B00] focus:outline-none"
                required
              >
                {tankers.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.registrationNumber} — {t.makeModel} ({t.tankCapacityLiters.toLocaleString()}L, {t.status})
                  </option>
                ))}
              </select>
              {selectedTanker && (
                <div className="text-[11px] font-mono text-slate-400 bg-white/5 p-2 rounded flex justify-between">
                  <span>Capacity: <strong className="text-white">{selectedTanker.tankCapacityLiters.toLocaleString()}L</strong></span>
                  <span>Ullage Status: <strong className="text-emerald-400">{selectedTanker.status}</strong></span>
                </div>
              )}
            </div>

            {/* Driver Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 uppercase font-bold flex items-center justify-between">
                <span>Certified Dangerous Goods Driver</span>
                <span className="text-[10px] text-slate-500">ADR / Hazmat</span>
              </label>
              <select
                value={selectedDriverId}
                onChange={(e) => setSelectedDriverId(e.target.value)}
                className="w-full bg-[#0A0A0B] border border-white/10 rounded-sm px-3 py-2 text-xs font-mono text-white focus:border-[#FF6B00] focus:outline-none"
                required
              >
                {drivers.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.fullName} — {d.phone} (Exp: {d.yearsOfExperience} yrs)
                  </option>
                ))}
              </select>
              {selectedDriver && (
                <div className="text-[11px] font-mono text-slate-400 bg-white/5 p-2 rounded flex justify-between">
                  <span>License: <strong className="text-white">{selectedDriver.licenseNumber}</strong></span>
                  <span>Phone: <strong className="text-sky-400">{selectedDriver.phone}</strong></span>
                </div>
              )}
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Loading Depot */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 uppercase font-bold">
                Designated Loading Terminal / Gantry
              </label>
              <input
                type="text"
                value={loadingDepot}
                onChange={(e) => setLoadingDepot(e.target.value)}
                className="w-full bg-[#0A0A0B] border border-white/10 rounded-sm px-3 py-2 text-xs font-mono text-white focus:border-[#FF6B00] focus:outline-none"
                placeholder="e.g. Tema Oil Refinery (TOR) Gantry 3"
                required
              />
            </div>

            {/* Estimated Arrival */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono text-slate-300 uppercase font-bold">
                Target Estimated Arrival (ETA)
              </label>
              <input
                type="datetime-local"
                value={estimatedArrival}
                onChange={(e) => setEstimatedArrival(e.target.value)}
                className="w-full bg-[#0A0A0B] border border-white/10 rounded-sm px-3 py-2 text-xs font-mono text-white focus:border-[#FF6B00] focus:outline-none"
                required
              />
            </div>

          </div>

          {/* Security Seal Numbers & Dispatch Instructions */}
          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-300 uppercase font-bold">
              Tamper-Evident Security Seal Codes
            </label>
            <input
              type="text"
              value={sealNumbers}
              onChange={(e) => setSealNumbers(e.target.value)}
              className="w-full bg-[#0A0A0B] border border-white/10 rounded-sm px-3 py-2 text-xs font-mono text-white focus:border-[#FF6B00] focus:outline-none"
              placeholder="e.g. ARM-88910, ARM-88911, ARM-88912"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-mono text-slate-300 uppercase font-bold">
              Route & Site Clearance Instructions
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              className="w-full bg-[#0A0A0B] border border-white/10 rounded-sm px-3 py-2 text-xs font-mono text-white focus:border-[#FF6B00] focus:outline-none"
              placeholder="Specific safety notes, speed limits, or customer gate contact instructions"
            />
          </div>

          {/* Action Footer */}
          <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            
            <a
              href={`https://wa.me/?text=${generateWhatsAppDispatchText()}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-4 py-2.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 rounded-sm text-xs font-mono font-bold uppercase flex items-center justify-center gap-2 transition"
            >
              <MessageSquare className="w-4 h-4 text-emerald-400" />
              <span>Send WhatsApp Dispatch Slip</span>
            </a>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={onClose}
                className="w-full sm:w-auto px-4 py-2.5 bg-white/5 hover:bg-white/10 text-slate-300 rounded-sm text-xs font-mono font-bold uppercase transition"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-5 py-2.5 bg-[#FF6B00] hover:bg-[#ff8533] text-black font-extrabold text-xs uppercase tracking-wider rounded-sm shadow transition flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm & Dispatch Tanker</span>
              </button>
            </div>

          </div>

        </form>

      </div>
    </div>
  );
};
