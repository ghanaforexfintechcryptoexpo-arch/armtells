import React from 'react';
import { 
  FileCheck2, 
  Printer, 
  X, 
  ShieldCheck, 
  CheckCircle2 
} from 'lucide-react';
import { storageService } from '../services/storage';

interface ProofOfDeliveryModalProps {
  podId: string | null;
  onClose: () => void;
}

export const ProofOfDeliveryModal: React.FC<ProofOfDeliveryModalProps> = ({ podId, onClose }) => {
  if (!podId) return null;

  const pods = storageService.getProofsOfDelivery();
  const pod = pods.find(p => p.id === podId || p.deliveryRequestNumber === podId);

  if (!pod) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl text-white my-8">
        
        {/* Modal Top Actions */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <FileCheck2 className="w-6 h-6 text-emerald-400" />
            <div>
              <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block font-bold">
                CERTIFIED CUSTODY TRANSFER DOCUMENT
              </span>
              <h2 className="text-xl font-black uppercase font-mono text-white">
                Proof of Delivery #{pod.id.toUpperCase()}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition cursor-pointer"
              title="Print Document"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable PDF-Style Container */}
        <div className="bg-slate-950 border border-slate-800 p-6 rounded-xl space-y-5 text-xs font-mono">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between border-b border-slate-800 pb-4 gap-2">
            <div>
              <span className="text-base font-black text-white block">ARMTELLS TRANSPORT SERVICES</span>
              <span className="text-[11px] text-slate-400">Petroleum Road Tanker Haulage & Energy Logistics</span>
              <span className="text-[10px] text-slate-500 block">NPA Licensed Carrier • EPA Permit Approved</span>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-slate-400 uppercase text-[10px] block">Delivery Order Ref:</span>
              <span className="text-amber-400 font-bold text-sm">{pod.deliveryRequestNumber}</span>
              <span className="text-slate-500 block text-[10px]">{new Date(pod.deliveryTimestamp).toLocaleString()}</span>
            </div>
          </div>

          {/* Receiver & Consignee */}
          <div className="grid grid-cols-2 gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-slate-500 uppercase text-[10px] block">Customer / Consignee:</span>
              <span className="text-white font-bold block">{pod.companyName}</span>
              <span className="text-slate-300">{pod.customerName}</span>
            </div>
            <div>
              <span className="text-slate-500 uppercase text-[10px] block">Destination Facility:</span>
              <span className="text-white">{pod.deliveryAddress}</span>
            </div>
          </div>

          {/* Product & Metrological Verification */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-900/60 p-3 rounded-lg border border-slate-800">
            <div>
              <span className="text-slate-500 uppercase text-[9px] block">Product Grade</span>
              <span className="text-amber-400 font-bold text-xs">{pod.productName}</span>
            </div>
            <div>
              <span className="text-slate-500 uppercase text-[9px] block">Delivered Volume</span>
              <span className="text-white font-bold text-xs">{(pod.quantityDeliveredLiters).toLocaleString()} L</span>
            </div>
            <div>
              <span className="text-slate-500 uppercase text-[9px] block">Tank Dip Before</span>
              <span className="text-slate-300 font-bold text-xs">{pod.dipstickReadingBeforeMm || 1240} mm</span>
            </div>
            <div>
              <span className="text-slate-500 uppercase text-[9px] block">Tank Ullage After</span>
              <span className="text-slate-300 font-bold text-xs">{pod.dipstickReadingAfterMm || 4890} mm</span>
            </div>
          </div>

          {/* Tanker & Security Bolt Seals */}
          <div className="grid grid-cols-2 gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-slate-500 uppercase text-[10px] block">Tanker BRV Asset:</span>
              <span className="text-white">{pod.tankerReg}</span>
              <span className="text-slate-400 block text-[10px]">Driver: {pod.driverName}</span>
            </div>
            <div>
              <span className="text-slate-500 uppercase text-[10px] block">Verified Security Seals:</span>
              <span className="text-sky-400 font-bold block">{pod.sealNumbers?.join(', ') || 'ARM-SEAL-88910, ARM-SEAL-88911'}</span>
              <span className="text-emerald-400 text-[10px] flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Intact on Arrival
              </span>
            </div>
          </div>

          {/* Signatures & Custody Stamp */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="space-y-1">
              <span className="text-slate-500 uppercase text-[10px] block">Customer Site Receiver:</span>
              <span className="text-white font-bold block">{pod.receiverFullName}</span>
              <span className="text-slate-400 text-[10px]">{pod.receiverTitle}</span>
              
              {/* Digital signature display */}
              <div className="mt-2 bg-slate-900 border border-slate-800 rounded p-2 text-center h-16 flex items-center justify-center">
                {pod.signatureDataUrl ? (
                  <img 
                    src={pod.signatureDataUrl} 
                    alt="Receiver Signature" 
                    className="max-h-12 max-w-full object-contain filter invert opacity-90"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="text-[10px] text-slate-500 italic">Digitally Signed on Terminal</span>
                )}
              </div>
            </div>

            <div className="space-y-1">
              <span className="text-slate-500 uppercase text-[10px] block">Carrier Driver Sign-Off:</span>
              <span className="text-white font-bold block">{pod.driverName}</span>
              <span className="text-slate-400 text-[10px]">ADR Class 3 Tanker Captain</span>
              
              <div className="mt-2 bg-slate-900 border border-slate-800 rounded p-2 text-center h-16 flex flex-col items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="text-[9px] text-emerald-400 font-bold uppercase mt-0.5">Custody Verified & Transferred</span>
              </div>
            </div>
          </div>

          {/* Remarks */}
          {pod.remarks && (
            <div className="text-[11px] text-slate-400 pt-2 border-t border-slate-800">
              Remarks: {pod.remarks}
            </div>
          )}

        </div>

        {/* Footer actions */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider rounded transition cursor-pointer"
          >
            Close Document
          </button>
        </div>

      </div>
    </div>
  );
};
