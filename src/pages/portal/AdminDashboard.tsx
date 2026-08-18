import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Truck, 
  Users, 
  FileText, 
  DollarSign, 
  Settings, 
  PlusCircle, 
  Download, 
  Edit, 
  Trash2, 
  CheckCircle2, 
  Flame, 
  MapPin, 
  Phone,
  Save,
  RotateCcw,
  ExternalLink
} from 'lucide-react';
import { storageService } from '../../services/storage';
import { 
  Tanker, 
  Driver, 
  DeliveryRequest, 
  Quote, 
  Invoice, 
  CMSContent,
  FuelProductType
} from '../../types';

interface AdminDashboardProps {
  setActivePage: (page: string) => void;
  onOpenTrackingModal: (id: string) => void;
  onOpenPodModal: (podId: string) => void;
  onOpenInvoiceModal: (invoice: Invoice) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  setActivePage,
  onOpenTrackingModal,
  onOpenPodModal,
  onOpenInvoiceModal
}) => {
  const [activeTab, setActiveTab] = useState<'deliveries' | 'fleet' | 'drivers' | 'quotes' | 'invoices' | 'cms'>('deliveries');
  
  // Data states
  const [deliveries, setDeliveries] = useState<DeliveryRequest[]>(() => storageService.getDeliveries());
  const [tankers, setTankers] = useState<Tanker[]>(() => storageService.getTankers());
  const [drivers, setDrivers] = useState<Driver[]>(() => storageService.getDrivers());
  const [quotes, setQuotes] = useState<Quote[]>(() => storageService.getQuotes());
  const [invoices, setInvoices] = useState<Invoice[]>(() => storageService.getInvoices());
  const [cms, setCms] = useState<CMSContent>(() => storageService.getCMSContent());

  const [cmsSavedAlert, setCmsSavedAlert] = useState(false);

  // New Tanker Modal state
  const [isAddingTanker, setIsAddingTanker] = useState(false);
  const [newTankerReg, setNewTankerReg] = useState('');
  const [newTankerModel, setNewTankerModel] = useState('');
  const [newTankerCap, setNewTankerCap] = useState('45000');

  const refreshAll = () => {
    setDeliveries(storageService.getDeliveries());
    setTankers(storageService.getTankers());
    setDrivers(storageService.getDrivers());
    setQuotes(storageService.getQuotes());
    setInvoices(storageService.getInvoices());
    setCms(storageService.getCMSContent());
  };

  const handleSaveCMS = (e: React.FormEvent) => {
    e.preventDefault();
    storageService.updateCMSContent(cms);
    setCmsSavedAlert(true);
    setTimeout(() => setCmsSavedAlert(false), 3000);
  };

  const handleAddTanker = (e: React.FormEvent) => {
    e.preventDefault();
    const count = tankers.length + 1;
    const tankerId = `ART-TK-0${count}`;
    const cap = parseInt(newTankerCap) || 45000;

    const newT: Tanker = {
      id: `tanker-${Date.now()}`,
      tankerId,
      registrationNumber: newTankerReg || `GN-${Math.floor(1000 + Math.random() * 9000)}-26`,
      makeModel: newTankerModel || 'Mercedes-Benz Actros 3344 (Bulk Hauler)',
      tankCapacityLiters: cap,
      compartments: [
        { compartmentNumber: 1, capacityLiters: Math.round(cap * 0.25), currentProduct: 'DIESEL_AGO' },
        { compartmentNumber: 2, capacityLiters: Math.round(cap * 0.25), currentProduct: 'DIESEL_AGO' },
        { compartmentNumber: 3, capacityLiters: Math.round(cap * 0.25), currentProduct: 'PETROL_PMS' },
        { compartmentNumber: 4, capacityLiters: Math.round(cap * 0.25), currentProduct: 'PETROL_PMS' }
      ],
      dedicatedProducts: ['DIESEL_AGO', 'PETROL_PMS'],
      status: 'AVAILABLE',
      currentLocationName: 'Tema Industrial Base Yard',
      lastInspectionDate: new Date().toISOString().split('T')[0],
      nextMaintenanceDate: '2026-11-30',
      calibrationCertificateNumber: `GSA-CAL-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      calibrationExpiry: '2027-02-15',
      hasBottomLoading: true,
      hasVaporRecovery: true,
      hasDigitalFlowMeter: true,
      hasHighFlowPump: true
    };

    storageService.saveTanker(newT);
    setIsAddingTanker(false);
    setNewTankerReg('');
    setNewTankerModel('');
    refreshAll();
  };

  const handleCreateInvoiceForDelivery = (del: DeliveryRequest) => {
    const subtotal = del.quotedAmount || Math.round(del.quantityLiters * 0.085);
    const tax = Math.round(subtotal * 0.15);
    const total = subtotal + tax;

    const inv = storageService.createInvoice({
      customerId: del.customerId,
      deliveryId: del.id,
      deliveryNumber: del.requestNumber,
      contactPerson: del.customerName,
      companyName: del.companyName,
      customerEmail: del.customerEmail,
      customerPhone: del.customerPhone,
      billingAddress: del.deliveryLocation,
      items: [
        {
          description: `Bulk Petroleum Transportation: ${del.productName} (${del.quantityLiters.toLocaleString()} L) - Route: ${del.pickupLocation} to ${del.deliveryLocation}`,
          quantity: del.quantityLiters,
          unit: 'Litres',
          unitPrice: 0.085,
          amount: subtotal
        }
      ],
      subtotal,
      transportationFee: subtotal,
      additionalCharges: 0,
      discount: 0,
      tax,
      total,
      currency: 'USD',
      status: 'ISSUED',
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: '2026-04-15'
    });

    refreshAll();
    onOpenInvoiceModal(inv);
  };

  const handleExportJSON = () => {
    const data = {
      deliveries,
      tankers,
      drivers,
      quotes,
      invoices,
      cms,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `armtells_operations_backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-slate-800 pb-6 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-slate-900 border border-sky-500/40 flex items-center justify-center text-sky-400">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-sky-400 uppercase tracking-widest">
                <span>CENTRAL LOGISTICS MASTER CONTROL</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
                Armtells Enterprise Administration
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={handleExportJSON}
              className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 rounded border border-slate-700 text-xs font-mono font-bold uppercase transition flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" /> Export Data Backup
            </button>
            <button
              onClick={() => setActivePage('operations-dashboard')}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded text-xs font-extrabold uppercase tracking-wider transition cursor-pointer"
            >
              Live Radar →
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
          {[
            { id: 'deliveries', label: `Deliveries (${deliveries.length})`, icon: Truck },
            { id: 'fleet', label: `Tanker Fleet (${tankers.length})`, icon: Flame },
            { id: 'drivers', label: `Certified Drivers (${drivers.length})`, icon: Users },
            { id: 'quotes', label: `Quote Requests (${quotes.length})`, icon: FileText },
            { id: 'invoices', label: `Billing & Invoices (${invoices.length})`, icon: DollarSign },
            { id: 'cms', label: 'Company CMS Settings', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase flex items-center gap-2 whitespace-nowrap transition cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-sky-600 text-white shadow'
                    : 'text-slate-400 hover:text-white bg-slate-900'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: DELIVERIES CRUD */}
        {activeTab === 'deliveries' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl space-y-4">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center">
              <h3 className="text-sm font-black text-white uppercase font-mono">
                All Customer Deliveries
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase bg-slate-950/60">
                    <th className="py-3 px-4">Ref #</th>
                    <th className="py-3 px-4">Customer & Company</th>
                    <th className="py-3 px-4">Product & Volume</th>
                    <th className="py-3 px-4">Assigned Unit</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Admin Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {deliveries.map((del) => (
                    <tr key={del.id} className="hover:bg-slate-950/40 transition">
                      <td className="py-3 px-4 font-bold text-amber-400">{del.requestNumber}</td>
                      <td className="py-3 px-4">
                        <strong className="text-white block uppercase">{del.companyName}</strong>
                        <span className="text-slate-400 block text-[11px]">{del.customerName} ({del.customerPhone})</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-white">{del.productName}</span>
                        <span className="text-sky-400 block text-[11px]">{(del.quantityLiters).toLocaleString()} Litres</span>
                      </td>
                      <td className="py-3 px-4">{del.assignedTankerReg || 'Unallocated'}</td>
                      <td className="py-3 px-4">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded border uppercase bg-slate-950 text-slate-300 border-slate-700">
                          {del.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => handleCreateInvoiceForDelivery(del)}
                          className="px-2.5 py-1 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded text-[11px] font-bold cursor-pointer"
                        >
                          + Invoice
                        </button>
                        {del.proofOfDeliveryId && (
                          <button
                            onClick={() => onOpenPodModal(del.proofOfDeliveryId!)}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[11px] cursor-pointer"
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
        )}

        {/* TAB 2: FLEET CRUD */}
        {activeTab === 'fleet' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-black text-white uppercase font-mono">
                Tanker Assets Management
              </h3>
              <button
                onClick={() => setIsAddingTanker(true)}
                className="px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider rounded flex items-center gap-1.5 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" /> Add Road Tanker
              </button>
            </div>

            {isAddingTanker && (
              <form onSubmit={handleAddTanker} className="bg-slate-900 border border-sky-500/50 p-5 rounded-xl space-y-4">
                <h4 className="text-xs font-mono font-bold text-sky-400 uppercase">Register New Petroleum Tanker</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Registration #</label>
                    <input
                      type="text"
                      required
                      placeholder="GN-4990-26"
                      value={newTankerReg}
                      onChange={(e) => setNewTankerReg(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 text-xs text-white rounded p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Make & Model</label>
                    <input
                      type="text"
                      required
                      placeholder="MAN TGS 33.480 (Aluminum Tanker)"
                      value={newTankerModel}
                      onChange={(e) => setNewTankerModel(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 text-xs text-white rounded p-2"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono text-slate-400 uppercase mb-1">Tank Capacity (Litres)</label>
                    <input
                      type="number"
                      required
                      value={newTankerCap}
                      onChange={(e) => setNewTankerCap(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 text-xs text-white rounded p-2"
                    />
                  </div>
                </div>
                <div className="flex gap-2 justify-end">
                  <button
                    type="button"
                    onClick={() => setIsAddingTanker(false)}
                    className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded text-xs cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-amber-500 text-slate-950 font-bold rounded text-xs uppercase cursor-pointer"
                  >
                    Save Tanker Asset
                  </button>
                </div>
              </form>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tankers.map((t) => (
                <div key={t.id} className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sky-400 font-mono font-bold">{t.tankerId}</span>
                    <span className="bg-slate-950 text-amber-400 border border-slate-800 px-2 py-0.5 rounded text-[10px] font-mono font-bold">
                      {t.status}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white uppercase">{t.makeModel}</h4>
                  <div className="text-xs font-mono text-slate-400 space-y-1">
                    <p>Registration: <span className="text-white">{t.registrationNumber}</span></p>
                    <p>Capacity: <span className="text-amber-400">{(t.tankCapacityLiters).toLocaleString()} Litres</span></p>
                    <p>GSA Cert: <span className="text-slate-300">{t.calibrationCertificateNumber}</span></p>
                    <p>Driver: <span className="text-slate-300">{t.assignedDriverName || 'Unassigned'}</span></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: DRIVERS */}
        {activeTab === 'drivers' && (
          <div className="space-y-4">
            <h3 className="text-base font-black text-white uppercase font-mono">
              Certified Hazardous Materials Drivers
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {drivers.map((d) => (
                <div key={d.id} className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white font-bold text-sm uppercase">{d.fullName}</span>
                    <span className="bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                      {d.status}
                    </span>
                  </div>
                  <div className="text-xs font-mono text-slate-400 space-y-1">
                    <p>Phone: <span className="text-slate-200">{d.phone}</span></p>
                    <p>ADR License: <span className="text-sky-400">{d.licenseNumber}</span></p>
                    <p>Medical Fitness: <span className="text-slate-200">{d.medicalFitnessExpiry}</span></p>
                    <p>Assigned: <span className="text-amber-400">{d.assignedTankerRegistration || 'Yard Reserve'}</span></p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: QUOTES */}
        {activeTab === 'quotes' && (
          <div className="space-y-4">
            <h3 className="text-base font-black text-white uppercase font-mono">
              Commercial Quote Requests
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {quotes.map((q) => (
                <div key={q.id} className="bg-slate-900 border border-slate-800 p-5 rounded-xl space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-amber-400 font-mono font-bold">{q.quoteNumber}</span>
                    <span className="text-[10px] font-mono bg-slate-950 text-slate-400 px-2 py-0.5 rounded border border-slate-800">
                      {q.status}
                    </span>
                  </div>
                  <div>
                    <strong className="text-white block uppercase">{q.companyName}</strong>
                    <span className="text-xs text-slate-400 font-mono">{q.customerName} ({q.phone})</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded text-xs font-mono text-slate-300 space-y-1">
                    <p>Route: {q.pickupLocation} → {q.deliveryLocation} ({q.distanceKm} Km)</p>
                    <p>Product: {q.productType} • {(q.quantityLiters).toLocaleString()} Litres</p>
                    <p className="text-amber-400 font-bold">Estimated Haulage: ${q.totalAmount.toLocaleString()} {q.currency}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: INVOICES */}
        {activeTab === 'invoices' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl space-y-4">
            <div className="p-4 border-b border-slate-800">
              <h3 className="text-sm font-black text-white uppercase font-mono">
                Tax Invoices & Billing Records
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 uppercase bg-slate-950/60">
                    <th className="py-3 px-4">Invoice #</th>
                    <th className="py-3 px-4">Company</th>
                    <th className="py-3 px-4">Issue Date</th>
                    <th className="py-3 px-4">Total Amount</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {invoices.map((inv) => (
                    <tr key={inv.id} className="hover:bg-slate-950/40 transition">
                      <td className="py-3 px-4 font-bold text-white">{inv.invoiceNumber}</td>
                      <td className="py-3 px-4">{inv.companyName}</td>
                      <td className="py-3 px-4 text-slate-400">{inv.issueDate}</td>
                      <td className="py-3 px-4 font-bold text-amber-400">${inv.total.toLocaleString()} USD</td>
                      <td className="py-3 px-4">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase ${
                          inv.status === 'PAID' ? 'bg-emerald-950 text-emerald-400 border-emerald-800' : 'bg-amber-950 text-amber-400 border-amber-800'
                        }`}>
                          {inv.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => onOpenInvoiceModal(inv)}
                          className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded text-[11px] cursor-pointer"
                        >
                          View PDF
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 6: CMS CONFIGURATION */}
        {activeTab === 'cms' && (
          <form onSubmit={handleSaveCMS} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-black text-white uppercase font-mono">
                  Company Identity & Operations CMS Editor
                </h3>
                <span className="text-xs text-slate-400">Update company phone numbers, email addresses, address and text</span>
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded flex items-center gap-1.5 cursor-pointer"
              >
                <Save className="w-4 h-4" /> Save CMS Changes
              </button>
            </div>

            {cmsSavedAlert && (
              <div className="bg-emerald-950 border border-emerald-600 text-emerald-400 p-3 rounded-lg text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> CMS changes saved successfully!
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">24/7 Dispatch Hotline Phone</label>
                <input
                  type="text"
                  value={cms.contactPhone}
                  onChange={(e) => setCms({ ...cms, contactPhone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 text-xs text-white rounded p-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Emergency 24/7 Hotline</label>
                <input
                  type="text"
                  value={cms.contactEmergencyPhone}
                  onChange={(e) => setCms({ ...cms, contactEmergencyPhone: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 text-xs text-white rounded p-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Operations Email Address</label>
                <input
                  type="email"
                  value={cms.contactEmail}
                  onChange={(e) => setCms({ ...cms, contactEmail: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 text-xs text-white rounded p-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">WhatsApp Chat Line</label>
                <input
                  type="text"
                  value={cms.contactWhatsApp}
                  onChange={(e) => setCms({ ...cms, contactWhatsApp: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 text-xs text-white rounded p-2.5"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Physical Office Address</label>
                <input
                  type="text"
                  value={cms.officeAddress}
                  onChange={(e) => setCms({ ...cms, officeAddress: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 text-xs text-white rounded p-2.5"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Company Positioning Tagline</label>
                <input
                  type="text"
                  value={cms.headline}
                  onChange={(e) => setCms({ ...cms, headline: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 text-xs text-white rounded p-2.5"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">About Company Narrative</label>
                <textarea
                  rows={3}
                  value={cms.aboutText}
                  onChange={(e) => setCms({ ...cms, aboutText: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 text-xs text-white rounded p-2.5"
                />
              </div>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
