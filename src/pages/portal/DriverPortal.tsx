import React, { useRef, useState } from 'react';
import { 
  Truck, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  FileCheck2, 
  PenTool, 
  RotateCcw, 
  Flame, 
  Phone, 
  AlertTriangle,
  ArrowRight,
  Radio
} from 'lucide-react';
import { storageService } from '../../services/storage';
import { DeliveryRequest, DeliveryStatus } from '../../types';

interface DriverPortalProps {
  setActivePage: (page: string) => void;
  onOpenPodModal: (podId: string) => void;
}

export const DriverPortal: React.FC<DriverPortalProps> = ({
  setActivePage,
  onOpenPodModal
}) => {
  const [activeTrip, setActiveTrip] = useState<DeliveryRequest | null>(() => {
    const all = storageService.getDeliveries();
    return all.find(d => d.status !== 'DELIVERED') || all[0] || null;
  });

  // Offloading Form States
  const [isGroundingConnected, setIsGroundingConnected] = useState(true);
  const [waterPasteTestClean, setWaterPasteTestClean] = useState(true);
  const [dipstickBefore, setDipstickBefore] = useState('1425');
  const [dipstickAfter, setDipstickAfter] = useState('4890');
  const [receiverName, setReceiverName] = useState('Eng. K. Mensah (Site Depot Manager)');
  const [receiverTitle, setReceiverTitle] = useState('Authorized Fuel Custodian');
  const [driverNotes, setDriverNotes] = useState('All seals intact upon arrival. Offloaded with standard vapor recovery.');

  // Signature canvas
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);
  const [isSubmittingPOD, setIsSubmittingPOD] = useState(false);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('clientX' in e ? e.clientX : e.touches[0].clientX) - rect.left;
    const y = ('clientY' in e ? e.clientY : e.touches[0].clientY) - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#38bdf8';
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = ('clientX' in e ? e.clientX : e.touches[0].clientX) - rect.left;
    const y = ('clientY' in e ? e.clientY : e.touches[0].clientY) - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
    setHasSignature(true);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const handleUpdateStatus = (newStatus: DeliveryStatus) => {
    if (!activeTrip) return;
    const updated = storageService.updateDeliveryStatus(activeTrip.id, newStatus, 'In Transit Corridor', 'Driver mobile terminal update');
    if (updated) {
      setActiveTrip(updated);
    }
  };

  const handleCompleteDelivery = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeTrip) return;
    setIsSubmittingPOD(true);

    setTimeout(() => {
      const signatureDataUrl = canvasRef.current?.toDataURL() || 'data:image/png;base64,signature';

      const pod = storageService.createProofOfDelivery({
        deliveryId: activeTrip.id,
        deliveryRequestNumber: activeTrip.requestNumber,
        customerName: activeTrip.customerName,
        companyName: activeTrip.companyName,
        productName: activeTrip.productName,
        quantityDeliveredLiters: activeTrip.quantityLiters,
        dipstickReadingBeforeMm: parseFloat(dipstickBefore) || 1240,
        dipstickReadingAfterMm: parseFloat(dipstickAfter) || 4890,
        deliveryTimestamp: new Date().toISOString(),
        deliveryAddress: activeTrip.deliveryLocation,
        tankerReg: activeTrip.assignedTankerReg || 'GN-4821-23',
        driverName: activeTrip.assignedDriverName || 'Samuel Mensah',
        receiverFullName: receiverName,
        receiverTitle: receiverTitle,
        signatureDataUrl,
        remarks: driverNotes,
        sealNumbers: ['ARM-88910', 'ARM-88911', 'ARM-88912']
      });

      storageService.updateDeliveryStatus(activeTrip.id, 'DELIVERED', activeTrip.deliveryLocation, `Custody signed by ${receiverName}`);

      setIsSubmittingPOD(false);
      onOpenPodModal(pod.id);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-6 px-4 sm:px-6 max-w-2xl mx-auto space-y-6">
      
      {/* Driver Badge Top Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center font-black font-mono">
            SM
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white uppercase">Samuel Mensah</span>
              <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[9px] font-mono font-bold px-1.5 py-0.2 rounded">
                ON DUTY
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              ADR Hazchem #HZ-90214-GH • Tanker: GN-4821-23 (45,000L)
            </span>
          </div>
        </div>

        <button
          onClick={() => setActivePage('home')}
          className="text-xs font-mono text-slate-400 hover:text-white cursor-pointer"
        >
          Exit Portal
        </button>
      </div>

      {/* Active Trip Manifest Card */}
      {activeTrip && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-5 shadow-2xl">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block font-bold">
                ASSIGNED CARGO MANIFEST
              </span>
              <span className="text-xl font-black font-mono text-white">
                {activeTrip.requestNumber}
              </span>
            </div>

            <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded border uppercase ${
              activeTrip.status === 'DELIVERED' 
                ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                : 'bg-sky-950 text-sky-400 border-sky-800'
            }`}>
              {activeTrip.status.replace('_', ' ')}
            </span>
          </div>

          {/* Quick Details */}
          <div className="grid grid-cols-2 gap-3 text-xs font-mono bg-slate-950 p-3.5 rounded-xl border border-slate-800">
            <div>
              <span className="text-slate-500 uppercase text-[10px] block">Cargo</span>
              <span className="text-amber-400 font-bold">{activeTrip.productName}</span>
            </div>
            <div>
              <span className="text-slate-500 uppercase text-[10px] block">Volume</span>
              <span className="text-white font-bold">{(activeTrip.quantityLiters).toLocaleString()} Litres</span>
            </div>
            <div className="col-span-2">
              <span className="text-slate-500 uppercase text-[10px] block">Destination</span>
              <span className="text-slate-200">{activeTrip.deliveryLocation}</span>
            </div>
          </div>

          {/* 1-Click Status Quick Actions for Driver */}
          {activeTrip.status !== 'DELIVERED' && (
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                1-Touch Journey Updates
              </span>
              
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleUpdateStatus('LOADING')}
                  className={`py-2 px-3 rounded text-xs font-mono font-bold uppercase transition cursor-pointer ${
                    activeTrip.status === 'LOADING' 
                      ? 'bg-amber-500 text-slate-950' 
                      : 'bg-slate-950 text-slate-300 border border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  At Loading Gantry
                </button>

                <button
                  onClick={() => handleUpdateStatus('IN_TRANSIT')}
                  className={`py-2 px-3 rounded text-xs font-mono font-bold uppercase transition cursor-pointer ${
                    activeTrip.status === 'IN_TRANSIT' 
                      ? 'bg-sky-500 text-white' 
                      : 'bg-slate-950 text-slate-300 border border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  Departed on Corridor
                </button>

                <button
                  onClick={() => handleUpdateStatus('ARRIVING')}
                  className={`py-2 px-3 rounded text-xs font-mono font-bold uppercase transition col-span-2 cursor-pointer ${
                    activeTrip.status === 'ARRIVING' 
                      ? 'bg-purple-600 text-white' 
                      : 'bg-slate-950 text-slate-300 border border-slate-800 hover:bg-slate-800'
                  }`}
                >
                  Arrived at Customer Site / Ready to Offload
                </button>
              </div>
            </div>
          )}

          {/* Custody Transfer Offloading & Digital Signature Form */}
          {activeTrip.status !== 'DELIVERED' ? (
            <form onSubmit={handleCompleteDelivery} className="space-y-4 pt-4 border-t border-slate-800">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4" /> Custody Offload Verification
              </div>

              {/* Safety Toggles */}
              <div className="space-y-2 bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs font-mono">
                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isGroundingConnected}
                    onChange={(e) => setIsGroundingConnected(e.target.checked)}
                    className="w-4 h-4 rounded text-sky-500 focus:ring-0 bg-slate-900 border-slate-700"
                  />
                  <span className="text-slate-200">Static Bonding Earthing Clamp Verified &lt; 10Ω</span>
                </label>

                <label className="flex items-center gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={waterPasteTestClean}
                    onChange={(e) => setWaterPasteTestClean(e.target.checked)}
                    className="w-4 h-4 rounded text-sky-500 focus:ring-0 bg-slate-900 border-slate-700"
                  />
                  <span className="text-slate-200">Water Finding Paste Dip Test: Zero Water Ingress</span>
                </label>
              </div>

              {/* Dipstick Measurements */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">
                    Tank Dip Before Offload (mm)
                  </label>
                  <input
                    type="text"
                    required
                    value={dipstickBefore}
                    onChange={(e) => setDipstickBefore(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-xs font-mono text-white rounded p-2.5"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">
                    Tanker Ullage After Drop (mm)
                  </label>
                  <input
                    type="text"
                    required
                    value={dipstickAfter}
                    onChange={(e) => setDipstickAfter(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-xs font-mono text-white rounded p-2.5"
                  />
                </div>
              </div>

              {/* Receiver Information */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">
                    Site Receiver Person Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={receiverName}
                    onChange={(e) => setReceiverName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-xs font-mono text-white rounded p-2.5"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">
                    Receiver Designation *
                  </label>
                  <input
                    type="text"
                    required
                    value={receiverTitle}
                    onChange={(e) => setReceiverTitle(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-xs font-mono text-white rounded p-2.5"
                  />
                </div>
              </div>

              {/* Digital Signature Canvas Pad */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[10px] font-mono text-slate-400 uppercase flex items-center gap-1.5">
                    <PenTool className="w-3.5 h-3.5 text-sky-400" /> Customer Receiver Digital Signature Pad *
                  </label>
                  <button
                    type="button"
                    onClick={clearSignature}
                    className="text-[10px] font-mono text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" /> Clear
                  </button>
                </div>

                <div className="bg-slate-950 border-2 border-dashed border-slate-700 rounded-xl overflow-hidden touch-none relative">
                  <canvas
                    ref={canvasRef}
                    width={480}
                    height={140}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    className="w-full h-32 cursor-crosshair"
                  />
                  {!hasSignature && (
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-slate-600 text-xs font-mono">
                      Draw signature here using touchscreen or mouse
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!hasSignature || isSubmittingPOD}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-slate-950 font-black text-xs uppercase tracking-wider rounded-lg shadow-xl transition disabled:opacity-40 cursor-pointer"
              >
                {isSubmittingPOD ? 'Generating Signed Proof of Delivery...' : 'Confirm Drop & Complete Signed POD'}
              </button>
            </form>
          ) : (
            <div className="bg-emerald-950/40 border border-emerald-600/40 p-5 rounded-xl text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h3 className="text-base font-bold text-white uppercase">Delivery Completed & Signed</h3>
              <p className="text-xs text-slate-300">
                Proof of Delivery #{activeTrip.proofOfDeliveryId} has been archived in the central operations registry.
              </p>
              {activeTrip.proofOfDeliveryId && (
                <button
                  onClick={() => onOpenPodModal(activeTrip.proofOfDeliveryId!)}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded transition inline-flex items-center gap-1.5 cursor-pointer"
                >
                  <FileCheck2 className="w-4 h-4" /> View Certified POD
                </button>
              )}
            </div>
          )}

        </div>
      )}

    </div>
  );
};
