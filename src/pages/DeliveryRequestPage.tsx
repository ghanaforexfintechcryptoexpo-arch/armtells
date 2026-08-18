import React from 'react';
import { 
  Truck, 
  CheckCircle2, 
  ArrowRight, 
  Flame, 
  MapPin, 
  Calendar, 
  Clock, 
  Phone, 
  Mail, 
  Building2, 
  FileCheck2, 
  Printer, 
  Radio,
  ExternalLink
} from 'lucide-react';
import { storageService } from '../services/storage';
import { FuelProductType, DeliveryRequest } from '../types';

interface DeliveryRequestPageProps {
  setActivePage: (page: string) => void;
  onOpenTrackingModal: (id?: string) => void;
}

export const DeliveryRequestPage: React.FC<DeliveryRequestPageProps> = ({ 
  setActivePage,
  onOpenTrackingModal 
}) => {
  const [customerName, setCustomerName] = React.useState('');
  const [companyName, setCompanyName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [deliveryLocation, setDeliveryLocation] = React.useState('');
  const [deliveryAddressDetails, setDeliveryAddressDetails] = React.useState('');
  const [siteType, setSiteType] = React.useState('Fuel Retail Service Station');
  const [productType, setProductType] = React.useState<FuelProductType>('DIESEL_AGO');
  const [quantityLiters, setQuantityLiters] = React.useState('36000');
  const [preferredDate, setPreferredDate] = React.useState('');
  const [preferredTimeWindow, setPreferredTimeWindow] = React.useState('08:00 - 12:00');
  const [specialInstructions, setSpecialInstructions] = React.useState('');
  
  const [submittedRequest, setSubmittedRequest] = React.useState<DeliveryRequest | null>(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const products = storageService.getFuelProducts();
  const selectedProductObj = products.find(p => p.code === productType);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const newRequest = storageService.createDeliveryRequest({
        customerId: 'comp-cust-web',
        customerName: customerName || 'Authorized Site Representative',
        companyName: companyName || 'Commercial Client',
        customerPhone: phone || '+233 24 000 0000',
        customerEmail: email || 'orders@clientcompany.com',
        pickupLocation: 'Tema Oil Refinery (TOR) Bulk Depot',
        deliveryLocation: deliveryLocation || 'Authorized Customer Storage Site',
        deliveryAddressDetails: deliveryAddressDetails || deliveryLocation,
        siteType,
        productType,
        productName: selectedProductObj?.name || 'Automotive Gas Oil (AGO)',
        quantityLiters: parseInt(quantityLiters) || 36000,
        preferredDate: preferredDate || new Date().toISOString().split('T')[0],
        preferredTimeWindow,
        specialInstructions,
        quotedAmount: Math.round((parseInt(quantityLiters) || 36000) * 0.08 + 450),
        currency: 'USD',
        isUrgent: false
      });

      setSubmittedRequest(newRequest);
      setIsSubmitting(false);
    }, 600);
  };

  const handleReset = () => {
    setSubmittedRequest(null);
    setCustomerName('');
    setCompanyName('');
    setPhone('');
    setEmail('');
    setDeliveryLocation('');
    setDeliveryAddressDetails('');
    setSpecialInstructions('');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-amber-500/10 text-amber-400 text-xs font-mono font-bold uppercase mb-2 border border-amber-500/30">
            <Flame className="w-3.5 h-3.5" />
            <span>BULK PETROLEUM ORDER DISPATCH DESK</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Request a Fuel Delivery
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            Submit your fuel transportation requirements to secure tanker allocation. Every request generates an official tracked Delivery ID.
          </p>
        </div>

        {/* Form or Confirmation Card */}
        {!submittedRequest ? (
          <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
            
            {/* Section 1: Customer & Company Details */}
            <div>
              <h2 className="text-xs font-mono font-bold text-sky-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Building2 className="w-4 h-4" /> 1. Customer & Company Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Contact Person Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kwame Ansah"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-sm text-white rounded-lg px-3.5 py-2.5 focus:border-sky-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Company / Registered Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. GoldRidge Heavy Mining Ltd"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-sm text-white rounded-lg px-3.5 py-2.5 focus:border-sky-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +233 24 555 3001"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-sm text-white rounded-lg px-3.5 py-2.5 focus:border-sky-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Corporate Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. procurement@goldridge-mining.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-sm text-white rounded-lg px-3.5 py-2.5 focus:border-sky-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Section 2: Delivery Destination & Site Type */}
            <div className="pt-4 border-t border-slate-800">
              <h2 className="text-xs font-mono font-bold text-sky-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> 2. Delivery Destination & Facility Type
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Delivery Site Name / Facility *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tarkwa Main Pit Bulk Storage Depot"
                    value={deliveryLocation}
                    onChange={(e) => setDeliveryLocation(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-sm text-white rounded-lg px-3.5 py-2.5 focus:border-sky-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Site / Facility Classification *
                  </label>
                  <select
                    value={siteType}
                    onChange={(e) => setSiteType(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-sm text-white rounded-lg px-3.5 py-2.5 focus:border-sky-500 focus:outline-none"
                  >
                    <option value="Fuel Retail Service Station">Fuel Retail Service Station</option>
                    <option value="Mining Site Fuel Farm">Mining Site Heavy Fuel Farm</option>
                    <option value="Industrial Manufacturing Plant">Industrial Manufacturing Plant</option>
                    <option value="Construction & Civil Site">Construction & Civil Project Site</option>
                    <option value="Generator & Power Facility">Commercial Generator / Power Plant</option>
                    <option value="Commercial Fleet Transport Yard">Commercial Fleet Transport Yard</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Precise Address / Access Landmark Details *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Plot 14 Industrial Mining Belt, Off Tarkwa-Bogoso Road, Western Region"
                    value={deliveryAddressDetails}
                    onChange={(e) => setDeliveryAddressDetails(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-sm text-white rounded-lg px-3.5 py-2.5 focus:border-sky-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Section 3: Petroleum Product & Volume */}
            <div className="pt-4 border-t border-slate-800">
              <h2 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Flame className="w-4 h-4" /> 3. Petroleum Product & Quantity
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Select Petroleum Product *
                  </label>
                  <select
                    value={productType}
                    onChange={(e) => setProductType(e.target.value as FuelProductType)}
                    className="w-full bg-slate-950 border border-slate-700 text-sm text-white rounded-lg px-3.5 py-2.5 focus:border-sky-500 focus:outline-none"
                  >
                    {products.map((p) => (
                      <option key={p.code} value={p.code}>
                        {p.name} ({p.unNumber})
                      </option>
                    ))}
                  </select>
                  {selectedProductObj && (
                    <span className="text-[11px] font-mono text-slate-400 mt-1 block">
                      Hazard Class: {selectedProductObj.hazardClass} • Flash Point: {selectedProductObj.flashPoint}
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Requested Volume (Litres) *
                  </label>
                  <select
                    value={quantityLiters}
                    onChange={(e) => setQuantityLiters(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-sm text-white rounded-lg px-3.5 py-2.5 focus:border-sky-500 focus:outline-none"
                  >
                    <option value="18000">18,000 Litres (Compact Rigid Tanker)</option>
                    <option value="28000">28,000 Litres (Medium Tanker)</option>
                    <option value="36000">36,000 Litres (Standard 4-Compartment)</option>
                    <option value="45000">45,000 Litres (Heavy 5-Compartment Hauler)</option>
                    <option value="48000">48,000 Litres (Aluminum Super B-Train)</option>
                    <option value="90000">90,000 Litres (Dual Tanker Convoy)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Section 4: Schedule & Operational Instructions */}
            <div className="pt-4 border-t border-slate-800">
              <h2 className="text-xs font-mono font-bold text-sky-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4" /> 4. Preferred Schedule & Site Instructions
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Preferred Delivery Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-sm text-white rounded-lg px-3.5 py-2.5 focus:border-sky-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Preferred Time Window *
                  </label>
                  <select
                    value={preferredTimeWindow}
                    onChange={(e) => setPreferredTimeWindow(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-sm text-white rounded-lg px-3.5 py-2.5 focus:border-sky-500 focus:outline-none"
                  >
                    <option value="05:00 - 08:00 (Early Morning Pre-Traffic)">05:00 - 08:00 (Early Morning Pre-Traffic)</option>
                    <option value="08:00 - 12:00 (Morning Shift)">08:00 - 12:00 (Morning Shift)</option>
                    <option value="12:00 - 16:00 (Afternoon Shift)">12:00 - 16:00 (Afternoon Shift)</option>
                    <option value="16:00 - 20:00 (Evening Shift)">16:00 - 20:00 (Evening Shift)</option>
                    <option value="20:00 - 24:00 (Night Drop - Retail Stations)">20:00 - 24:00 (Night Drop - Retail Stations)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Special Site Access / Offloading Instructions (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="e.g. High-visibility PPE and spark-arrestor check required at gate. Long 30m hose connection needed for generator underground tank."
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-sm text-white rounded-lg p-3 focus:border-sky-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Disclaimer & Submit Button */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-[11px] text-slate-400 max-w-md">
                Armtells verifies authorized reception tanks and earthing before discharge. Licensed under NPA and EPA hazardous materials transport regulations.
              </p>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs uppercase tracking-wider rounded-lg shadow-lg transition cursor-pointer disabled:opacity-50"
              >
                {isSubmitting ? 'Registering Order...' : 'Submit Delivery Request'}
              </button>
            </div>

          </form>
        ) : (
          /* Confirmation State */
          <div className="bg-slate-900 border border-emerald-500/40 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
            
            <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
              <div className="p-3 bg-emerald-950 text-emerald-400 rounded-xl border border-emerald-800">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                  ORDER REGISTERED SUCCESSFULLY
                </span>
                <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                  Your Delivery Request Has Been Received
                </h2>
              </div>
            </div>

            {/* Unique Delivery ID Banner */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase block">
                  Official Delivery Request Tracking ID
                </span>
                <span className="text-2xl sm:text-3xl font-mono font-black text-amber-400 tracking-wider">
                  {submittedRequest.requestNumber}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onOpenTrackingModal(submittedRequest.requestNumber)}
                  className="px-4 py-2.5 bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider rounded transition flex items-center gap-1.5 cursor-pointer"
                >
                  <Radio className="w-4 h-4 animate-pulse" />
                  <span>Live Track Shipment</span>
                </button>
              </div>
            </div>

            {/* Request Summary Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono bg-slate-950/60 p-4 rounded-xl border border-slate-800">
              <div>
                <span className="text-slate-500 uppercase block">Company / Client:</span>
                <span className="text-white font-bold text-sm">{submittedRequest.companyName}</span>
              </div>
              <div>
                <span className="text-slate-500 uppercase block">Contact Person:</span>
                <span className="text-white">{submittedRequest.customerName} ({submittedRequest.customerPhone})</span>
              </div>
              <div>
                <span className="text-slate-500 uppercase block">Product:</span>
                <span className="text-amber-400 font-bold">{submittedRequest.productName}</span>
              </div>
              <div>
                <span className="text-slate-500 uppercase block">Quantity:</span>
                <span className="text-white font-bold">{(submittedRequest.quantityLiters).toLocaleString()} Litres</span>
              </div>
              <div>
                <span className="text-slate-500 uppercase block">Delivery Location:</span>
                <span className="text-white">{submittedRequest.deliveryLocation}</span>
              </div>
              <div>
                <span className="text-slate-500 uppercase block">Target Schedule:</span>
                <span className="text-white">{submittedRequest.preferredDate} • {submittedRequest.preferredTimeWindow}</span>
              </div>
            </div>

            {/* Actions for customer */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs uppercase tracking-wider rounded border border-slate-700 transition"
              >
                Submit Another Delivery
              </button>

              <div className="flex items-center gap-3">
                <a
                  href="tel:+233240001100"
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-sky-400 font-bold text-xs uppercase tracking-wider rounded border border-slate-700 transition flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" /> Call Dispatch Desk
                </a>
                <button
                  onClick={() => setActivePage('customer-portal')}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded transition"
                >
                  Go to Client Portal →
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
