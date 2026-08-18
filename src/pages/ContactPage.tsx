import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Send, 
  ShieldCheck, 
  Truck, 
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { storageService } from '../services/storage';

interface ContactPageProps {
  setActivePage: (page: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ setActivePage }) => {
  const cms = storageService.getCMSContent();

  const [name, setName] = React.useState('');
  const [company, setCompany] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [subject, setSubject] = React.useState('General Logistics Inquiry');
  const [message, setMessage] = React.useState('');
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-sky-950/60 text-sky-400 text-xs font-mono font-bold uppercase mb-3 border border-sky-800/40">
            <span>24/7 LOGISTICS DISPATCH & COMMERCIAL DESK</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
            Contact Armtells Transport Services
          </h1>
          <p className="text-base text-slate-300 max-w-3xl mt-2 leading-relaxed">
            Get in touch with our operations center in Tema or connect directly with our round-the-clock petroleum dispatch coordinators.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Direct Contacts & Operating Hubs */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 24/7 Emergency Dispatch Box */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
                <Phone className="w-4 h-4" /> 24/7 EMERGENCY & ACTIVE DISPATCH DESK
              </div>
              <p className="text-2xl font-black font-mono text-white">
                {cms.contactEmergencyPhone || '+233 24 000 9999'}
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                For active haulage updates, route clearance, urgent same-day fuel replenishment, or emergency spillage response coordination.
              </p>
            </div>

            {/* General Inquiries & Office */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5">
              <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">
                Commercial Office & Logistics Hubs
              </h3>

              <div className="space-y-4 text-xs font-mono text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-sky-400 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-white block uppercase">Operational Headquarters:</strong>
                    <span>{cms.officeAddress || 'Plot 8B Heavy Industrial Area, Tema, Ghana'}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-white block uppercase">Commercial Line:</strong>
                    <span>{cms.contactPhone || '+233 24 000 1100'}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-white block uppercase">Operations Email:</strong>
                    <span>{cms.contactEmail || 'operations@armtells.com'}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-white block uppercase">Operational Hours:</strong>
                    <span>Dispatch: 24/7/365 • Administration: Mon - Fri (08:00 - 17:00)</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Quick Chat */}
              <div className="pt-2 border-t border-slate-800">
                <a
                  href={`https://wa.me/${(cms.contactWhatsApp || '233240001100').replace(/[^0-9]/g, '')}?text=Hello%20Armtells%20Logistics%20Desk,%20I%20would%20like%20to%20inquire%20about%20petroleum%20tanker%20transportation.`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-wider rounded-lg transition flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat With Dispatch on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Terminal Base Points */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
              <h3 className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
                Gantry Staging & Terminal Bases
              </h3>
              <ul className="space-y-2 text-xs text-slate-300 font-mono">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-400" />
                  <span>Tema Terminal: Tema Oil Refinery / BOST Main Yard</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>Western Terminal: Takoradi Bulk Petroleum Hub</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>Middle Belt Hub: Kumasi BOST Inland Depot</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Right Column: Interactive Contact & Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-2xl space-y-6">
              
              <div className="border-b border-slate-800 pb-4">
                <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-widest block mb-1">
                  DIRECT DISPATCH INQUIRY
                </span>
                <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                  Send a Message to Operations
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  Submit commercial inquiries, Master Service Agreement (MSA) proposals, or fleet inquiries.
                </p>
              </div>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Isaac Mensah"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 text-sm text-white rounded-lg px-3.5 py-2.5 focus:border-sky-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Company Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Western Mining Logistics Ltd"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
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
                        placeholder="e.g. +233 24 555 7890"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 text-sm text-white rounded-lg px-3.5 py-2.5 focus:border-sky-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. procurement@western-mining.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-700 text-sm text-white rounded-lg px-3.5 py-2.5 focus:border-sky-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                      Inquiry Category *
                    </label>
                    <select
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 text-sm text-white rounded-lg px-3.5 py-2.5 focus:border-sky-500 focus:outline-none"
                    >
                      <option value="General Logistics Inquiry">General Logistics Inquiry</option>
                      <option value="Dedicated Fleet Contract / MSA">Dedicated Fleet Contract / MSA</option>
                      <option value="Mining Site Bulk Fuel Delivery">Mining Site Bulk Fuel Delivery</option>
                      <option value="Retail Fuel Station Haulage">Retail Fuel Station Haulage</option>
                      <option value="Emergency Fuel Delivery Request">Emergency Fuel Delivery Request</option>
                      <option value="HSEQ / Compliance Audit Inquiry">HSEQ / Compliance Audit Inquiry</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase mb-1">
                      Message / Operational Requirement *
                    </label>
                    <textarea
                      rows={4}
                      required
                      placeholder="Please specify your product type, estimated monthly volume (litres), loading terminal, and delivery destination..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-700 text-sm text-white rounded-lg p-3 focus:border-sky-500 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white font-black text-xs uppercase tracking-wider rounded-lg shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message to Operations</span>
                  </button>
                </form>
              ) : (
                <div className="bg-slate-950 border border-emerald-500/40 rounded-xl p-8 text-center space-y-4">
                  <div className="w-12 h-12 bg-emerald-950 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-700">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white uppercase">Message Dispatched Successfully</h3>
                  <p className="text-xs text-slate-300 max-w-md mx-auto">
                    Thank you, {name}. Our logistics coordinator will review your requirement and respond within 60 minutes.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-4 py-2 bg-slate-900 text-slate-300 border border-slate-700 rounded text-xs uppercase font-bold"
                  >
                    Send Another Message
                  </button>
                </div>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
