import React from 'react';
import { 
  Building2, 
  Truck, 
  FileText, 
  Clock, 
  CheckCircle2, 
  Radio, 
  Search, 
  ArrowRight, 
  Download, 
  PlusCircle,
  ExternalLink,
  Flame,
  ShieldCheck,
  Calendar
} from 'lucide-react';
import { storageService } from '../../services/storage';
import { DeliveryRequest, Invoice } from '../../types';

interface CustomerPortalProps {
  setActivePage: (page: string) => void;
  onOpenTrackingModal: (id: string) => void;
  onOpenPodModal: (podId: string) => void;
  onOpenInvoiceModal: (invoice: Invoice) => void;
}

export const CustomerPortal: React.FC<CustomerPortalProps> = ({
  setActivePage,
  onOpenTrackingModal,
  onOpenPodModal,
  onOpenInvoiceModal
}) => {
  const [activeTab, setActiveTab] = React.useState<'deliveries' | 'invoices' | 'quotes'>('deliveries');
  
  const deliveries = storageService.getDeliveries();
  const invoices = storageService.getInvoices();
  const quotes = storageService.getQuotes();

  const totalLitres = deliveries
    .filter(d => d.status === 'DELIVERED')
    .reduce((acc, curr) => acc + curr.quantityLiters, 0);

  const activeDeliveriesCount = deliveries.filter(d => d.status !== 'DELIVERED' && d.status !== 'CANCELLED').length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Portal Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-6 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-900 border border-sky-500/40 flex items-center justify-center text-sky-400">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold text-sky-400 uppercase tracking-widest block">
                CLIENT LOGISTICS PORTAL
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                GoldRidge Mining & Industrial Energy Ltd
              </h1>
              <span className="text-xs font-mono text-slate-400">
                Account ID: ACC-GR-8891 • Master Service Agreement (Active)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActivePage('delivery-request')}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded-lg shadow transition flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Book New Tanker Drop</span>
            </button>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">Active In-Transit Drops</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-amber-400 font-mono">{activeDeliveriesCount}</span>
              <span className="text-xs text-emerald-400 font-mono">Real-time Telemetry</span>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">Delivered Volume (2026)</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-white font-mono">{totalLitres.toLocaleString()} L</span>
              <span className="text-xs text-sky-400 font-mono">100% Reconciled</span>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">Total Invoiced (USD)</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-emerald-400 font-mono">
                ${invoices.reduce((a, c) => a + c.total, 0).toLocaleString()}
              </span>
              <span className="text-xs text-slate-400 font-mono">30-Day Credit</span>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-1">
            <span className="text-[10px] font-mono text-slate-400 uppercase block">Safety Incident Rate</span>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-emerald-400 font-mono">0.00%</span>
              <span className="text-xs text-emerald-400 font-mono">Zero Contamination</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab('deliveries')}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase transition cursor-pointer ${
              activeTab === 'deliveries' 
                ? 'bg-sky-600 text-white shadow' 
                : 'text-slate-400 hover:text-white bg-slate-900'
            }`}
          >
            Delivery Orders ({deliveries.length})
          </button>
          <button
            onClick={() => setActiveTab('invoices')}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase transition cursor-pointer ${
              activeTab === 'invoices' 
                ? 'bg-sky-600 text-white shadow' 
                : 'text-slate-400 hover:text-white bg-slate-900'
            }`}
          >
            Invoices & Statements ({invoices.length})
          </button>
          <button
            onClick={() => setActiveTab('quotes')}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase transition cursor-pointer ${
              activeTab === 'quotes' 
                ? 'bg-sky-600 text-white shadow' 
                : 'text-slate-400 hover:text-white bg-slate-900'
            }`}
          >
            Haulage Quotes ({quotes.length})
          </button>
        </div>

        {/* Tab Content: Deliveries */}
        {activeTab === 'deliveries' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center">
              <h3 className="text-sm font-black text-white uppercase font-mono">
                Recent Petroleum Transport Orders
              </h3>
              <span className="text-xs font-mono text-slate-400">Click any record for live tracking & POD</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase bg-slate-950/60">
                    <th className="py-3 px-4">Tracking ID</th>
                    <th className="py-3 px-4">Product & Volume</th>
                    <th className="py-3 px-4">Destination</th>
                    <th className="py-3 px-4">Allocated Tanker</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {deliveries.map((del) => (
                    <tr key={del.id} className="hover:bg-slate-950/40 transition">
                      <td className="py-3.5 px-4 font-bold text-amber-400">
                        {del.requestNumber}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="text-white font-semibold">{del.productName}</span>
                        <span className="text-slate-400 block text-[11px]">{(del.quantityLiters).toLocaleString()} Litres</span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-200">
                        {del.deliveryLocation}
                      </td>
                      <td className="py-3.5 px-4 text-slate-300">
                        {del.assignedTankerReg || 'Dispatch Allocating...'}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                          del.status === 'DELIVERED' 
                            ? 'bg-emerald-950 text-emerald-400 border-emerald-800' 
                            : 'bg-amber-950 text-amber-400 border-amber-800'
                        }`}>
                          {del.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2">
                        <button
                          onClick={() => onOpenTrackingModal(del.requestNumber)}
                          className="px-2.5 py-1 bg-sky-600/30 hover:bg-sky-600 text-sky-300 hover:text-white rounded border border-sky-500/40 text-[11px] transition inline-flex items-center gap-1 cursor-pointer"
                        >
                          <Radio className="w-3 h-3 animate-pulse" /> Track
                        </button>
                        {del.status === 'DELIVERED' && del.proofOfDeliveryId && (
                          <button
                            onClick={() => onOpenPodModal(del.proofOfDeliveryId!)}
                            className="px-2.5 py-1 bg-emerald-600/30 hover:bg-emerald-600 text-emerald-300 hover:text-white rounded border border-emerald-500/40 text-[11px] transition inline-flex items-center gap-1 cursor-pointer"
                          >
                            <FileText className="w-3 h-3" /> POD
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab Content: Invoices */}
        {activeTab === 'invoices' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center">
              <h3 className="text-sm font-black text-white uppercase font-mono">
                Commercial Transport Billing & Tax Invoices
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase bg-slate-950/60">
                    <th className="py-3 px-4">Invoice #</th>
                    <th className="py-3 px-4">Delivery Ref</th>
                    <th className="py-3 px-4">Issue Date</th>
                    <th className="py-3 px-4">Due Date</th>
                    <th className="py-3 px-4">Total Amount</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">View / PDF</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-slate-950/40 transition">
                      <td className="py-3.5 px-4 font-bold text-white">
                        {inv.invoiceNumber}
                      </td>
                      <td className="py-3.5 px-4 text-sky-400">
                        {inv.deliveryNumber || 'ART-DEL-2026'}
                      </td>
                      <td className="py-3.5 px-4 text-slate-400">
                        {inv.issueDate}
                      </td>
                      <td className="py-3.5 px-4 text-slate-400">
                        {inv.dueDate}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-amber-400">
                        ${inv.total.toLocaleString()} {inv.currency}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                          inv.status === 'PAID' 
                            ? 'bg-emerald-950 text-emerald-400 border-emerald-800' 
                            : 'bg-amber-950 text-amber-400 border-amber-800'
                        }`}>
                          {inv.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => onOpenInvoiceModal(inv)}
                          className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded border border-slate-700 text-[11px] inline-flex items-center gap-1 transition cursor-pointer"
                        >
                          <FileText className="w-3 h-3" /> View Tax Invoice
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab Content: Quotes */}
        {activeTab === 'quotes' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-black text-white uppercase font-mono">
              Saved Logistics Rate Quotations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quotes.map((q) => (
                <div key={q.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs font-mono">
                  <div className="flex justify-between items-center">
                    <span className="text-sky-400 font-bold">{q.quoteNumber}</span>
                    <span className="bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded text-[10px] uppercase font-bold">
                      {q.status}
                    </span>
                  </div>
                  <div className="text-white font-semibold">
                    {q.pickupLocation} → {q.deliveryLocation}
                  </div>
                  <div className="text-slate-400">
                    Product: {q.productType} • Volume: {(q.quantityLiters).toLocaleString()} L
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-slate-900">
                    <span className="text-slate-400">Estimated Rate:</span>
                    <span className="text-amber-400 font-bold text-sm">${q.totalAmount.toLocaleString()} {q.currency}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
