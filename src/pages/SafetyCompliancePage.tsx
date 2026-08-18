import React from 'react';
import { 
  ShieldCheck, 
  Flame, 
  FileCheck2, 
  Award, 
  AlertTriangle, 
  Eye, 
  Compass, 
  CheckCircle2, 
  FileText, 
  ExternalLink,
  Lock,
  Download
} from 'lucide-react';
import { storageService } from '../services/storage';

interface SafetyCompliancePageProps {
  setActivePage: (page: string) => void;
}

export const SafetyCompliancePage: React.FC<SafetyCompliancePageProps> = ({ setActivePage }) => {
  const complianceDocs = storageService.getSafetyDocuments();

  const safetyProtocols = [
    {
      number: '01',
      title: 'Driver Hazardous Materials Certification',
      category: 'PERSONNEL STANDARDS',
      description: 'All Armtells tanker operators hold Class 3 Hazchem / ADR certifications, undergoing rigorous annual defensive driving courses, fatigue management assessments, and biometric medical fitness verifications.',
      specs: '100% Hazchem Certified • Random Alcohol & Substance Screening • Max 8-Hour Drive Limits'
    },
    {
      number: '02',
      title: 'Hydrostatic Barrel & Vessel Integrity',
      category: 'FLEET ENGINEERING',
      description: 'Tanker pressure vessels undergo hydrostatic pressure tests every 12 months, ultrasonic shell thickness measurements, and certified 5-year internal weld inspections certified by the Ghana Standards Authority.',
      specs: 'GSA Hydrostatic Certified • Dual-acting Breather Vents • 4-inch API Shear Valves'
    },
    {
      number: '03',
      title: 'Static Earthing & Vapor Recovery',
      category: 'TERMINAL & DISCHARGE SAFETY',
      description: 'Zero static discharge tolerance. Every loading and discharge cycle requires copper bonding earthing clamps with resistance verification below 10 Ohms and sealed vapor recovery to capture volatile hydrocarbons.',
      specs: 'Ground-Verification Interlocks • 99.2% Vapor Recovery Efficiency • Anti-Static Hoses'
    },
    {
      number: '04',
      title: 'Pre-Trip 360° Safety Walk-Arounds',
      category: 'JOURNEY MANAGEMENT',
      description: 'Mandatory 45-point digital checklist completed before any tanker turns a wheel. Covers tire tread depths, brake chamber stroke, fire extinguisher gauges, emergency cut-off levers, and manifold seals.',
      specs: 'Mandatory Pre-Departure Sign-Off • Tire Pressure Monitoring • Emergency Air Dump Verifications'
    },
    {
      number: '05',
      title: 'On-Board Hazchem Spill & Fire Suppression',
      category: 'EMERGENCY PREPAREDNESS',
      description: 'Every tanker carries certified Class B dry chemical and AFFF foam fire extinguishers, 200-liter hydrophobic hydrocarbon spill kits, drain-blocking neoprene mats, and non-sparking bronze brass shovels.',
      specs: 'Dual 9kg Dry Powder + 9L Foam • Level 1 Hydrophobic Spill Kits • Emergency Containment Booms'
    },
    {
      number: '06',
      title: 'Geofenced Corridor Risk Management',
      category: 'ROUTE SECURITY',
      description: 'Pre-approved hazardous materials routing avoids densely populated urban bottle-necks during peak hours. Tanker speeds are electronically capped at 60 km/h on highways with automated rollover alerts.',
      specs: 'Speed Governing (60 km/h Max) • Night Transit Protocols • Real-time Corridor Monitoring'
    },
    {
      number: '07',
      title: 'Joint Dipstick & Meter Custody Transfer',
      category: 'PRODUCT QUALITY ASSURANCE',
      description: 'Strict anti-contamination protocol. Before offloading, joint water-finding paste tests and specific gravity hydrometer checks are executed alongside the customer site engineer.',
      specs: 'Water Detection Paste Tests • Calibrated Flow Meters • Numbered Security Bolt Seals'
    },
    {
      number: '08',
      title: 'Environmental Protection & Waste Recovery',
      category: 'SUSTAINABILITY',
      description: 'Zero tolerance for soil or groundwater contamination. Any drip residue is captured in dedicated drip trays and recycled through EPA-licensed petroleum waste treatment facilities.',
      specs: 'Zero Ground Spillage Target • EPA Licensure • Sludge Recycling Partnerships'
    },
    {
      number: '09',
      title: '24/7 Rapid Incident Command Center',
      category: 'EMERGENCY HOTLINE',
      description: 'Direct hotline connecting our dispatch desk with the Ghana National Fire Service (GNFS) Hazardous Materials Division and dedicated heavy towing recovery contractors.',
      specs: '15-Minute Response Protocol • Hazmat Mutual Aid Coordinator • 24/7 Hotline'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Page Header */}
        <div className="border-b border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-emerald-950/70 text-emerald-400 text-xs font-mono font-bold uppercase mb-3 border border-emerald-800/60">
            <ShieldCheck className="w-4 h-4" />
            <span>OPERATIONAL HEALTH, SAFETY, ENVIRONMENT & QUALITY (HSEQ)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white uppercase tracking-tight">
            Safety & Regulatory Compliance
          </h1>
          <p className="text-base text-slate-300 max-w-3xl mt-2 leading-relaxed">
            “Safety Is Not an Option. It Is the Standard.” Petroleum logistics demands uncompromising discipline. Every gallon transported by Armtells complies with statutory National Petroleum Authority (NPA) and Environmental Protection Agency (EPA) mandates.
          </p>
        </div>

        {/* 9 Safety Pillars Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              9 Core Operational Safety Protocols
            </h2>
            <span className="text-xs font-mono text-slate-400">Class 3 Hazmat Standards</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {safetyProtocols.map((proto) => (
              <div 
                key={proto.number}
                className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between hover:border-slate-700 transition"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono font-bold text-sky-400 uppercase tracking-wider">
                      {proto.category}
                    </span>
                    <span className="text-lg font-mono font-black text-slate-600">
                      {proto.number}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white uppercase mb-2">
                    {proto.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    {proto.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800/80">
                  <div className="text-[10px] font-mono text-amber-400 bg-slate-950 p-2 rounded border border-slate-800">
                    {proto.specs}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Document Vault */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800 pb-4 gap-3">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-sky-400 uppercase tracking-widest mb-1">
                <FileCheck2 className="w-4 h-4" />
                <span>REGULATORY LICENSURE & AUDIT REPOSITORY</span>
              </div>
              <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                Active Regulatory Permits & Certifications
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1 rounded">
                ● All Statutory Licenses Active (2026)
              </span>
            </div>
          </div>

          {/* Documents Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400 uppercase">
                  <th className="py-3 px-4">Document Title</th>
                  <th className="py-3 px-4">Issuing Authority</th>
                  <th className="py-3 px-4">Certificate Number</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Expiry Date</th>
                  <th className="py-3 px-4 text-right">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800 text-slate-300">
                {complianceDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-slate-950/50 transition">
                    <td className="py-3.5 px-4 font-bold text-white">
                      {doc.title}
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">
                      {doc.issuingAuthority}
                    </td>
                    <td className="py-3.5 px-4 text-sky-400 font-semibold">
                      {doc.documentNumber}
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 text-[10px] px-2 py-0.5 rounded font-bold">
                        {doc.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400">
                      {doc.expiryDate}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span className="text-[10px] text-slate-400 bg-slate-950 px-2 py-1 rounded border border-slate-800 inline-flex items-center gap-1">
                        <Lock className="w-3 h-3 text-emerald-400" /> Audited
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Safety CTA */}
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 rounded-xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white uppercase">
              Need Specific Facility Safety Protocol Integration?
            </h3>
            <p className="text-xs text-slate-300 max-w-xl">
              Our safety compliance officers work directly with your site engineers to integrate site-specific entry requirements, induction badges, and customized offloading risk assessments.
            </p>
          </div>

          <button
            onClick={() => setActivePage('contact')}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs uppercase tracking-wider rounded transition shrink-0 cursor-pointer"
          >
            Speak with Safety Officer
          </button>
        </div>

      </div>
    </div>
  );
};
