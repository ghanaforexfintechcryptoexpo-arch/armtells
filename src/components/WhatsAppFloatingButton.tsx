import React from 'react';
import { MessageSquare, PhoneCall } from 'lucide-react';
import { storageService } from '../services/storage';

export const WhatsAppFloatingButton: React.FC = () => {
  const cms = storageService.getCMSContent();
  const phone = (cms.contactWhatsApp || '233240001100').replace(/[^0-9]/g, '');

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 group">
      {/* Floating Tooltip */}
      <div className="bg-slate-900 text-slate-200 text-[11px] font-mono font-bold px-3 py-1 rounded-lg border border-slate-700 shadow-xl opacity-0 group-hover:opacity-100 transition duration-200 pointer-events-none whitespace-nowrap">
        24/7 Petroleum Dispatch Hotline
      </div>

      <a
        href={`https://wa.me/${phone}?text=Hello%20Armtells%20Transport%20Desk,%20I%20need%20assistance%20with%20petroleum%20haulage%20and%20tanker%20dispatch.`}
        target="_blank"
        rel="noreferrer"
        className="w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-400 text-white shadow-2xl flex items-center justify-center transition transform hover:scale-105 active:scale-95 border-2 border-emerald-300/40"
        aria-label="Direct WhatsApp Dispatch"
      >
        <MessageSquare className="w-7 h-7" />
      </a>
    </div>
  );
};
