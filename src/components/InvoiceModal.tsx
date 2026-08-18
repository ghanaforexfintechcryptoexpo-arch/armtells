import React from 'react';
import { 
  DollarSign, 
  Printer, 
  X, 
  Building2, 
  FileText, 
  CheckCircle2, 
  Clock 
} from 'lucide-react';
import { Invoice } from '../types';

interface InvoiceModalProps {
  invoice: Invoice | null;
  onClose: () => void;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({ invoice, onClose }) => {
  if (!invoice) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 shadow-2xl text-white my-8">
        
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-6 h-6 text-sky-400" />
            <div>
              <span className="text-[10px] font-mono text-sky-400 uppercase tracking-widest block font-bold">
                COMMERCIAL FREIGHT INVOICE
              </span>
              <h2 className="text-xl font-black uppercase font-mono text-white">
                {invoice.invoiceNumber}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg border border-slate-700 transition cursor-pointer"
              title="Print Invoice"
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

        {/* Printable Invoice Container */}
        <div className="bg-slate-950 border border-slate-800 p-6 rounded-xl space-y-5 text-xs font-mono">
          
          <div className="flex flex-col sm:flex-row justify-between border-b border-slate-800 pb-4 gap-2">
            <div>
              <span className="text-base font-black text-white block">ARMTELLS TRANSPORT SERVICES</span>
              <span className="text-[11px] text-slate-400">Plot 8B Heavy Industrial Area, Tema, Ghana</span>
              <span className="text-[10px] text-slate-500 block">TIN: C002918842X • VAT Reg: 994012</span>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-[10px] text-slate-400 uppercase block">Status:</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded border inline-block uppercase ${
                invoice.status === 'PAID' ? 'bg-emerald-950 text-emerald-400 border-emerald-800' : 'bg-amber-950 text-amber-400 border-amber-800'
              }`}>
                {invoice.status}
              </span>
              <span className="text-slate-400 block text-[10px] mt-1">Due: {invoice.dueDate}</span>
            </div>
          </div>

          {/* Billed To */}
          <div className="grid grid-cols-2 gap-4 border-b border-slate-800 pb-4">
            <div>
              <span className="text-slate-500 uppercase text-[10px] block">Billed To:</span>
              <span className="text-white font-bold block">{invoice.companyName}</span>
              <span className="text-slate-300">{invoice.contactPerson}</span>
              <span className="text-slate-400 block text-[10px]">{invoice.customerEmail}</span>
            </div>
            <div>
              <span className="text-slate-500 uppercase text-[10px] block">Invoice Dates:</span>
              <p>Issued: <span className="text-white">{invoice.issueDate}</span></p>
              <p>Payment Terms: <span className="text-sky-400">Net 30 Days</span></p>
            </div>
          </div>

          {/* Line Items */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase">
                  <th className="py-2">Description</th>
                  <th className="py-2 text-right">Volume / Qty</th>
                  <th className="py-2 text-right">Rate</th>
                  <th className="py-2 text-right">Amount (USD)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {invoice.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-2.5 font-sans text-xs text-white">{item.description}</td>
                    <td className="py-2.5 text-right font-mono">{(item.quantity).toLocaleString()} {item.unit}</td>
                    <td className="py-2.5 text-right font-mono">${item.unitPrice}</td>
                    <td className="py-2.5 text-right font-mono font-bold text-white">${item.amount.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="border-t border-slate-800 pt-3 space-y-1.5 text-right">
            <div className="flex justify-end gap-6 text-slate-400">
              <span>Subtotal:</span>
              <span className="text-white font-bold">${invoice.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-end gap-6 text-slate-400">
              <span>Statutory VAT / NHIL (15%):</span>
              <span className="text-white font-bold">${invoice.tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-end gap-6 text-base font-black text-amber-400 pt-2 border-t border-slate-800">
              <span>TOTAL INVOICE AMOUNT:</span>
              <span>${invoice.total.toLocaleString()} {invoice.currency}</span>
            </div>
          </div>

          {/* Banking details */}
          <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-[10px] text-slate-400 space-y-0.5">
            <span className="text-white font-bold block uppercase">Commercial Wire Remittance:</span>
            <p>Bank: Standard Chartered Bank Ghana PLC • Account: 0100192881001</p>
            <p>SWIFT: SCBLGHAC • Currency: USD / GHS Equivalent at official BoG rate</p>
          </div>

        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider rounded transition cursor-pointer"
          >
            Close Invoice
          </button>
        </div>

      </div>
    </div>
  );
};
