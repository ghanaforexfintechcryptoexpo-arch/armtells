import React from 'react';
import { 
  Calculator, 
  Truck, 
  Flame, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  FileText, 
  Phone, 
  Building2, 
  ShieldCheck,
  Zap,
  Printer
} from 'lucide-react';
import { storageService } from '../services/storage';
import { FuelProductType } from '../types';

interface QuotePageProps {
  setActivePage: (page: string) => void;
}

export const QuotePage: React.FC<QuotePageProps> = ({ setActivePage }) => {
  const [customerName, setCustomerName] = React.useState('');
  const [companyName, setCompanyName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [origin, setOrigin] = React.useState('Tema Oil Refinery (TOR) Depot');
  const [destination, setDestination] = React.useState('');
  const [distanceKm, setDistanceKm] = React.useState('85');
  const [productType, setProductType] = React.useState<FuelProductType>('DIESEL_AGO');
  const [volumeLiters, setVolumeLiters] = React.useState('36000');
  const [frequency, setFrequency] = React.useState<'ONE_TIME' | 'WEEKLY' | 'BI_WEEKLY' | 'MONTHLY' | 'ON_CALL_CONTRACT'>('ONE_TIME');
  const [urgency, setUrgency] = React.useState<'STANDARD' | 'URGENT_24H' | 'EMERGENCY_SAME_DAY'>('STANDARD');
  const [notes, setNotes] = React.useState('');

  const [quoteResult, setQuoteResult] = React.useState<{
    quoteId: string;
    subtotal: number;
    hazardFee: number;
    distanceFee: number;
    totalAmount: number;
    currency: string;
  } | null>(null);

  const [isCalculating, setIsCalculating] = React.useState(false);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);

    setTimeout(() => {
      const vol = parseInt(volumeLiters) || 36000;
      const dist = parseInt(distanceKm) || 50;
      
      let baseRatePerLiterKm = 0.00065;
      if (productType === 'HEAVY_FUEL_OIL_HFO') baseRatePerLiterKm = 0.00085;
      if (productType === 'JET_A1') baseRatePerLiterKm = 0.00095;

      const haulageBase = Math.round(vol * dist * baseRatePerLiterKm);
      const hazardHandling = 180;
      let urgencyMultiplier = 1.0;
      if (urgency === 'URGENT_24H') urgencyMultiplier = 1.25;
      if (urgency === 'EMERGENCY_SAME_DAY') urgencyMultiplier = 1.5;

      const total = Math.round((haulageBase + hazardHandling) * urgencyMultiplier);

      const quote = storageService.createQuote({
        customerName: customerName || 'Procurement Manager',
        companyName: companyName || 'Commercial Industrial Client',
        phone: phone || '+233 24 000 0000',
        email: email || 'quote@clientcompany.com',
        pickupLocation: origin,
        deliveryLocation: destination || 'Commercial Destination Site',
        distanceKm: dist,
        productType,
        quantityLiters: vol,
        deliveryDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
        frequency,
        urgency,
        baseTransportRatePerLiter: 0.085,
        distanceRatePerKm: 3.5,
        urgencySurcharge: urgency === 'STANDARD' ? 0 : 350,
        handlingFee: hazardHandling,
        subtotal: haulageBase,
        taxAmount: Math.round(haulageBase * 0.15),
        totalAmount: total,
        currency: 'USD',
        status: 'PENDING',
        validUntil: new Date(Date.now() + 86400000 * 14).toISOString().split('T')[0],
        notes: notes || 'Standard commercial haulage quotation.'
      });

      setQuoteResult({
        quoteId: quote.quoteNumber,
        subtotal: haulageBase,
        hazardFee: hazardHandling,
        distanceFee: Math.round(dist * 2.8),
        totalAmount: total,
        currency: 'USD'
      });

      setIsCalculating(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="border-b border-slate-800 pb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-sky-950/60 text-sky-400 text-xs font-mono font-bold uppercase mb-2 border border-sky-800/40">
            <Calculator className="w-3.5 h-3.5" />
            <span>COMMERCIAL HAULAGE PRICING ENGINE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
            Request a Logistics & Haulage Quote
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            Calculate estimated transportation rates based on product type, tank volume, haulage distance, and delivery frequency.
          </p>
        </div>

        {!quoteResult ? (
          <form onSubmit={handleCalculate} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
            
            {/* 1. Contact & Corporate Identity */}
            <div>
              <h2 className="text-xs font-mono font-bold text-sky-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Building2 className="w-4 h-4" /> 1. Client & Organization Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Samuel Ofori"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-sm text-white rounded-lg px-3.5 py-2.5 focus:border-sky-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Company / Organization Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Industrial Energy Ltd"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-sm text-white rounded-lg px-3.5 py-2.5 focus:border-sky-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +233 24 999 1234"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-sm text-white rounded-lg px-3.5 py-2.5 focus:border-sky-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Corporate Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. logistics@apex-energy.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-sm text-white rounded-lg px-3.5 py-2.5 focus:border-sky-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 2. Loading Origin & Delivery Destination */}
            <div className="pt-4 border-t border-slate-800">
              <h2 className="text-xs font-mono font-bold text-sky-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <MapPin className="w-4 h-4" /> 2. Origin Terminal & Delivery Destination
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Loading Origin Terminal *
                  </label>
                  <select
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-sm text-white rounded-lg px-3.5 py-2.5 focus:border-sky-500 focus:outline-none"
                  >
                    <option value="Tema Oil Refinery (TOR) Bulk Depot">Tema Oil Refinery (TOR) Depot</option>
                    <option value="Takoradi Bulk Petroleum Terminal">Takoradi Bulk Petroleum Terminal</option>
                    <option value="Kumasi BOST Inland Depot">Kumasi BOST Inland Depot</option>
                    <option value="Buipe Inland River Terminal">Buipe Inland River Terminal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Destination City / Site *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Tarkwa Mining Hub / Kumasi Industrial"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-sm text-white rounded-lg px-3.5 py-2.5 focus:border-sky-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Estimated Distance (Km) *
                  </label>
                  <input
                    type="number"
                    required
                    min="10"
                    max="1500"
                    value={distanceKm}
                    onChange={(e) => setDistanceKm(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-sm text-white rounded-lg px-3.5 py-2.5 focus:border-sky-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 3. Product & Quantity */}
            <div className="pt-4 border-t border-slate-800">
              <h2 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Flame className="w-4 h-4" /> 3. Cargo Volume & Petroleum Grade
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Petroleum Product *
                  </label>
                  <select
                    value={productType}
                    onChange={(e) => setProductType(e.target.value as FuelProductType)}
                    className="w-full bg-slate-950 border border-slate-700 text-sm text-white rounded-lg px-3.5 py-2.5 focus:border-sky-500 focus:outline-none"
                  >
                    <option value="DIESEL_AGO">Automotive Gas Oil / AGO Diesel (UN 1202)</option>
                    <option value="PETROL_PMS">Premium Motor Spirit / PMS Petrol (UN 1203)</option>
                    <option value="JET_A1">Aviation Fuel / Jet A-1 (UN 1863)</option>
                    <option value="HEAVY_FUEL_OIL_HFO">Heavy Fuel Oil / HFO (UN 3082)</option>
                    <option value="KEROSENE">Illuminating Kerosene (UN 1223)</option>
                    <option value="LUBRICANTS_BULK">Bulk Industrial Lubricants</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Volume Capacity Required (Litres) *
                  </label>
                  <select
                    value={volumeLiters}
                    onChange={(e) => setVolumeLiters(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-sm text-white rounded-lg px-3.5 py-2.5 focus:border-sky-500 focus:outline-none"
                  >
                    <option value="18000">18,000 Litres (Compact Rigid Tanker)</option>
                    <option value="28000">28,000 Litres (Medium Road Tanker)</option>
                    <option value="36000">36,000 Litres (Standard 4-Compartment BRV)</option>
                    <option value="45000">45,000 Litres (Heavy 5-Compartment Hauler)</option>
                    <option value="48000">48,000 Litres (High-Payload Super B-Train)</option>
                    <option value="90000">90,000 Litres (Multi-Tanker Convoy Fleet)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 4. Frequency & Urgency */}
            <div className="pt-4 border-t border-slate-800">
              <h2 className="text-xs font-mono font-bold text-sky-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4" /> 4. Delivery Frequency & Dispatch Urgency
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Service Frequency *
                  </label>
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 text-sm text-white rounded-lg px-3.5 py-2.5 focus:border-sky-500 focus:outline-none"
                  >
                    <option value="ONE_TIME">One-Time On-Demand Haulage</option>
                    <option value="WEEKLY">Weekly Recurring Replenishment</option>
                    <option value="BI_WEEKLY">Bi-Weekly Scheduled Drops</option>
                    <option value="MONTHLY">Monthly Scheduled Logistics</option>
                    <option value="ON_CALL_CONTRACT">Dedicated Tanker Contract (Exclusive MSA)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Dispatch Urgency *
                  </label>
                  <select
                    value={urgency}
                    onChange={(e) => setUrgency(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-700 text-sm text-white rounded-lg px-3.5 py-2.5 focus:border-sky-500 focus:outline-none"
                  >
                    <option value="STANDARD">Standard Planned Dispatch (48-72 Hours)</option>
                    <option value="URGENT_24H">Expedited Priority (24 Hours)</option>
                    <option value="EMERGENCY_SAME_DAY">Emergency Same-Day Response</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                    Special Equipment or Access Requirements (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Calibrated electronic flow meter required; site requires flame-proof spark arrestor and safety escort."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 text-sm text-white rounded-lg p-3 focus:border-sky-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-[11px] text-slate-400 max-w-md">
                Formal quote will include Goods-In-Transit insurance, NPA-compliant terminal gantry clearance, and metered custody transfer.
              </p>

              <button
                type="submit"
                disabled={isCalculating}
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-black text-xs uppercase tracking-wider rounded-lg shadow-lg transition cursor-pointer"
              >
                {isCalculating ? 'Computing Logistics Rates...' : 'Generate Official Quote'}
              </button>
            </div>

          </form>
        ) : (
          /* Official Quote Result Card */
          <div className="bg-slate-900 border border-sky-500/50 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl text-white">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-3">
              <div>
                <span className="text-[10px] font-mono text-sky-400 uppercase tracking-widest block font-bold">
                  OFFICIAL LOGISTICS RATE QUOTATION
                </span>
                <span className="text-2xl sm:text-3xl font-black font-mono text-white">
                  {quoteResult.quoteId}
                </span>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Status</span>
                <span className="bg-amber-500/20 text-amber-400 border border-amber-500/40 text-xs font-mono font-bold px-2.5 py-0.5 rounded">
                  OFFICIAL PROPOSAL GENERATED
                </span>
              </div>
            </div>

            {/* Estimated Rate Overview */}
            <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 space-y-4 font-mono">
              <div className="flex justify-between items-center text-sm border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Base Bulk Haulage ({volumeLiters} Litres @ {distanceKm} Km):</span>
                <span className="text-white font-bold">${quoteResult.subtotal.toLocaleString()} USD</span>
              </div>

              <div className="flex justify-between items-center text-sm border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Class 3 Hazmat Loading & Terminal Clearance:</span>
                <span className="text-white font-bold">${quoteResult.hazardFee.toLocaleString()} USD</span>
              </div>

              <div className="flex justify-between items-center text-sm border-b border-slate-800/80 pb-2">
                <span className="text-slate-400">Transit Corridor Protocol & Metered Transfer:</span>
                <span className="text-white font-bold">${quoteResult.distanceFee.toLocaleString()} USD</span>
              </div>

              <div className="flex justify-between items-center pt-2 text-base sm:text-lg font-black text-amber-400">
                <span>ESTIMATED TOTAL HAULAGE FEE:</span>
                <span>${quoteResult.totalAmount.toLocaleString()} {quoteResult.currency}</span>
              </div>
            </div>

            <div className="text-xs text-slate-400 leading-relaxed font-mono">
              * Rates are indicative based on prevailing terminal loading tariffs, toll corridors, and scheduled discharge windows. A dedicated Armtells Logistics Coordinator will contact you within 60 minutes to finalize transport contracts.
            </div>

            {/* Next Steps */}
            <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={() => setQuoteResult(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs uppercase tracking-wider rounded border border-slate-700"
              >
                Modify Parameters
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase tracking-wider rounded border border-slate-700 flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" /> Print Quote PDF
                </button>
                <button
                  onClick={() => setActivePage('delivery-request')}
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded"
                >
                  Convert to Active Delivery →
                </button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
