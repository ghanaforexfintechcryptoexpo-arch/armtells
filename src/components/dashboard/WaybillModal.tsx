import React from 'react';
import { 
  X, 
  Printer, 
  Download, 
  ShieldCheck, 
  Truck, 
  Flame, 
  FileText, 
  MapPin, 
  Calendar,
  CheckCircle
} from 'lucide-react';
import { DeliveryRequest } from '../../types';
import { storageService } from '../../services/storage';

interface WaybillModalProps {
  delivery: DeliveryRequest | null;
  isOpen: boolean;
  onClose: () => void;
}

export const WaybillModal: React.FC<WaybillModalProps> = ({
  delivery,
  isOpen,
  onClose
}) => {
  if (!isOpen || !delivery) return null;

  const cms = storageService.getCMSContent();
  const tanker = delivery.assignedTankerId ? storageService.getTankerById(delivery.assignedTankerId) : null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in font-sans">
      <div className="bg-[#0F0F11] border border-white/20 rounded-md w-full max-w-3xl max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col">
        
        {/* Header Actions */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between bg-[#141417] print:hidden">
          <div className="flex items-center gap-2 text-white">
            <FileText className="w-5 h-5 text-[#FF6B00]" />
            <h3 className="text-sm font-black uppercase font-mono tracking-wider">
              NPA Official Bulk Road Vehicle (BRV) Electronic Waybill
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-3.5 py-1.5 bg-[#FF6B00] hover:bg-[#ff8533] text-black font-extrabold text-xs uppercase tracking-wider rounded-sm flex items-center gap-1.5 transition cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Waybill</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-sm bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Waybill Printable Document Body */}
        <div className="p-8 space-y-6 text-slate-200 bg-[#0A0A0B] text-xs font-mono">
          
          {/* Document Masthead */}
          <div className="border-b-2 border-white/20 pb-4 flex justify-between items-start">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-[#FF6B00] text-black font-black flex items-center justify-center rounded-xs text-xs">
                  A
                </div>
                <h1 className="text-xl font-black text-white uppercase tracking-tight font-sans">
                  ARMTELLS TRANSPORT SERVICES LTD
                </h1>
              </div>
              <p className="text-[11px] text-slate-400">
                NPA Licensed Petroleum Haulage Contractor • Class 3 Hazardous Liquid Transport
              </p>
              <p className="text-[10px] text-slate-500">
                Head Office: Heavy Industrial Area, Plot 14, Harbour Road, Tema, Ghana • Hotline: +233 24 000 1100
              </p>
            </div>

            <div className="text-right space-y-1">
              <span className="inline-block px-2.5 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded font-bold text-xs">
                ELECTRONIC WAYBILL
              </span>
              <div className="text-sm font-bold text-white">WB-{delivery.requestNumber}</div>
              <div className="text-[10px] text-slate-400">Date: {new Date(delivery.createdAt).toLocaleDateString()}</div>
            </div>
          </div>

          {/* Core Haulage Parameters Grid */}
          <div className="grid grid-cols-2 gap-4 border border-white/10 p-4 rounded-sm bg-white/5">
            
            <div className="space-y-2">
              <div className="text-[10px] text-[#FF6B00] uppercase font-bold tracking-widest border-b border-white/10 pb-1">
                CONSIGNMENT & CLIENT DETAILS
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Customer / Consignee:</span>
                <strong className="text-white block text-sm">{delivery.companyName}</strong>
                <span className="text-slate-300 block">{delivery.customerName} ({delivery.customerPhone})</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Discharge Destination:</span>
                <strong className="text-white block">{delivery.deliveryLocation}</strong>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-[10px] text-[#FF6B00] uppercase font-bold tracking-widest border-b border-white/10 pb-1">
                DISPATCH & TANKER PARAMETERS
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Allocated Tanker (BRV):</span>
                <strong className="text-white block">{delivery.assignedTankerReg || 'GT-1904-24 (Volvo FH 500)'}</strong>
                <span className="text-slate-400 text-[10px]">NPA BRV License: NPA/BRV/2026/0892</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px]">Authorized Dangerous Goods Driver:</span>
                <strong className="text-white block">{delivery.assignedDriverName || 'Samuel Mensah'}</strong>
                <span className="text-slate-400 text-[10px]">Phone: {delivery.assignedDriverPhone || '+233 24 555 3001'}</span>
              </div>
            </div>

          </div>

          {/* Petroleum Product & Compartment Table */}
          <div className="border border-white/10 rounded-sm overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-white/10 border-b border-white/10 text-slate-300 uppercase">
                  <th className="py-2.5 px-3">Product Description</th>
                  <th className="py-2.5 px-3">UN Number / Hazard</th>
                  <th className="py-2.5 px-3">Loading Depot</th>
                  <th className="py-2.5 px-3 text-right">Volume (Litres)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                <tr>
                  <td className="py-3 px-3">
                    <strong className="text-white block">{delivery.productName}</strong>
                    <span className="text-slate-400 text-[10px]">GSA Calibrated Density at 15°C: 0.840 kg/L</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-amber-400 font-bold block">UN 1202</span>
                    <span className="text-slate-400 text-[10px]">Class 3 Flammable Liquid</span>
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-white">{delivery.pickupDepot || 'Tema TOR Gantry 3'}</span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <strong className="text-base text-[#FF6B00]">{delivery.quantityLiters.toLocaleString()} L</strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Compartment & Seal Audit Grid */}
          <div className="grid grid-cols-2 gap-4 border border-white/10 p-3 rounded-sm text-[11px]">
            <div>
              <span className="text-slate-500 uppercase block text-[10px]">Security Seal Numbers</span>
              <strong className="text-emerald-400">ARM-99810, ARM-99811, ARM-99812, ARM-99813</strong>
            </div>
            <div>
              <span className="text-slate-500 uppercase block text-[10px]">Discharge Valve & Emergency Isolator</span>
              <strong className="text-white">Pneumatic Foot Valve Checked & Sealed Intact</strong>
            </div>
          </div>

          {/* Statutory Signatures Block */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10 text-[10px]">
            <div className="space-y-4">
              <span className="text-slate-500 uppercase block">Depot Dispatch Officer</span>
              <div className="h-10 border-b border-dashed border-slate-600 flex items-end">
                <span className="text-slate-400 italic">TOR Terminal Officer / Sign</span>
              </div>
            </div>
            <div className="space-y-4">
              <span className="text-slate-500 uppercase block">Authorized BRV Driver</span>
              <div className="h-10 border-b border-dashed border-slate-600 flex items-end">
                <span className="text-slate-400 italic">{delivery.assignedDriverName || 'Driver Signature'}</span>
              </div>
            </div>
            <div className="space-y-4">
              <span className="text-slate-500 uppercase block">Consignee Site Receiver</span>
              <div className="h-10 border-b border-dashed border-slate-600 flex items-end">
                <span className="text-slate-400 italic">Receiving Officer / Stamp</span>
              </div>
            </div>
          </div>

          {/* Footer Statutory Warning */}
          <div className="text-[9px] text-slate-500 border-t border-white/10 pt-3 flex justify-between">
            <span>Official Carrier: Armtells Transport Services Ltd (Ghana)</span>
            <span>Tampering with petroleum consignment seals is a statutory offense under NPA Act 691.</span>
          </div>

        </div>

      </div>
    </div>
  );
};
