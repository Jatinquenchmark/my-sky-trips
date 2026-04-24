import React from 'react';
import LogoImg from '../assets/logo-DFfutrEX.png';

interface TicketProps {
  bookedItems: any[];
  total: number;
  customerName: string;
  bookingDate?: string;
  orderId?: string;
  ticketRef?: React.RefObject<HTMLDivElement | null>;
}

export const Ticket: React.FC<TicketProps> = ({ 
  bookedItems, 
  total, 
  customerName, 
  bookingDate, 
  orderId,
  ticketRef 
}) => {
  const comboName = bookedItems.map(i => i.name).join(' + ');
  const displayOrderId = orderId ? `MST-${orderId.slice(-8)}` : 'MST-TEST';

  return (
    <div 
      ref={ticketRef} 
      data-ticket-container
      className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden font-sans border border-slate-100 w-full max-w-[500px] mx-auto text-left"
    >
      {/* Header */}
      <div className="bg-[#0066FF] p-8 text-white relative">
        <div className="flex justify-between items-start mb-6">
          <div className="flex flex-col">
            <img src={LogoImg} alt="MYSKYTRIPS" crossOrigin="anonymous" className="h-10 w-auto mb-2 brightness-0 invert" />
            <span className="text-xl font-black tracking-tighter">
              MYSKYTRIPS
            </span>
          </div>
          <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
            <span className="text-xs font-bold italic text-white/40">i</span>
          </div>
        </div>

        <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-widest mb-3 text-[#00F2FF]">
          Water Sports
        </div>
        
        <h1 className="text-3xl font-black leading-tight mb-2 uppercase">
          {comboName}
        </h1>
        <p className="text-white/60 text-sm font-medium">
          Tehri Lake Adventure Hub, Uttarakhand
        </p>
      </div>

      <div className="p-8">
        {/* Info Grid */}
        <div className="grid grid-cols-2 gap-y-6 mb-8">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Date</p>
            <p className="font-bold text-slate-900">
              {bookingDate ? new Date(bookingDate).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) : 'TBA'}
            </p>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Time Slot</p>
            <p className="font-bold text-slate-900">09:00 — 11:00 AM</p>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Report By</p>
            <p className="font-bold text-slate-900 font-mono">08:45 AM</p>
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Venue</p>
            <p className="font-bold text-slate-900">Tehri Lake Zone</p>
          </div>
        </div>

        {/* Booking ID Section */}
        <div className="flex items-center gap-4 p-6 bg-slate-50 rounded-3xl mb-8 border border-slate-100">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-slate-100">
            {bookedItems[0]?.emoji || '🎫'}
          </div>
          <div className="flex-1">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Booking ID</p>
            <p className="font-black text-slate-900 text-lg tracking-tight uppercase">{displayOrderId}</p>
          </div>
          <div className="bg-[#E6FFFA] text-[#00A389] px-3 py-1.5 rounded-xl font-black text-[10px] uppercase border border-[#B2F5EA]">
            Paid
          </div>
        </div>

        {/* Customer Info */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-3xl font-black text-slate-300 border-2 border-dashed border-slate-200 uppercase">
            {customerName.charAt(0)}
          </div>
          <div>
            <h3 className="text-xl font-black text-slate-900 leading-tight">{customerName}</h3>
            <p className="text-xs font-bold text-slate-500 mt-1">Ticket #1 — Adult Package</p>
          </div>
        </div>

        {/* Amount Section */}
        <div className="pt-8 border-t-2 border-dashed border-slate-100 mb-8">
          <div className="flex justify-between items-baseline">
            <span className="text-sm font-bold text-slate-400 italic">Total Paid (incl. GST)</span>
            <span className="text-4xl font-black text-[#004D56] tracking-tighter">₹{total.toLocaleString()}</span>
          </div>
        </div>

        {/* Disclaimers */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Important Disclaimers</p>
          <ul className="space-y-2">
            {[
              "Participants with heart conditions, back/neck injuries, or pregnancy must not participate.",
              "Activities subject to weather & lake conditions. Operator may reschedule.",
              "Life jacket and safety gear must be worn at all times.",
              "Participants under alcohol/substance influence will be denied entry — no refund.",
              "Company is not liable for loss of personal valuables during activity."
            ].map((text, i) => (
              <li key={i} className="flex gap-3 text-[11px] leading-relaxed text-slate-500 font-medium">
                <span className="text-slate-300 shrink-0">•</span>
                <span className={i === 1 ? "text-red-500 font-bold" : ""}>{text}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Help Footer */}
        <div className="mt-10 text-center">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
            Help: +91 98765 43210 | SUPPORT@MYSKYTRIPS.COM
          </p>
        </div>
      </div>
    </div>
  );
};
