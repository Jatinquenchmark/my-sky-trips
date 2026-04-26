import React from 'react';
import LogoImg from '../assets/logo-DFfutrEX.png';

interface TicketProps {
  bookedItems: any[];
  subtotal: number;
  gst: number;
  total: number;
  customerName: string;
  bookingDate?: string;
  orderId?: string;
  ticketRef?: React.RefObject<HTMLDivElement | null>;
}

export const Ticket: React.FC<TicketProps> = ({ 
  bookedItems, 
  subtotal,
  gst,
  total, 
  customerName, 
  bookingDate, 
  orderId,
  ticketRef 
}) => {
  const displayOrderId = orderId || 'MST-TEST';

  return (
    <div 
      ref={ticketRef} 
      data-ticket-container
      className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden font-sans border border-slate-100 w-full max-w-[500px] mx-auto text-left"
    >
      {/* Header - Moved Info Grid here */}
      <div className="bg-[#0066FF] p-8 text-white relative">
        <div className="flex justify-between items-start mb-8">
          <div className="flex flex-col">
            <img src={LogoImg} alt="MY SKY TRIPS" crossOrigin="anonymous" className="h-10 w-auto mb-2 brightness-0 invert" />
            <span className="text-xl font-black tracking-tighter">MY SKY TRIPS</span>
          </div>
          <div className="bg-white/20 px-3 py-1.5 rounded-xl font-black text-[10px] uppercase border border-white/20">
            Water Sports
          </div>
        </div>

        {/* Info Grid - Moved UP */}
        <div className="grid grid-cols-2 gap-x-8 gap-y-4">
          <div>
            <p className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-1">Date</p>
            <p className="text-sm font-bold">{bookingDate ? new Date(bookingDate).toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) : 'Mon, 27 Apr, 2026'}</p>
          </div>
          <div>
            <p className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-1">Report By</p>
            <p className="text-sm font-bold text-amber-300">08:45 AM</p>
          </div>
          <div>
            <p className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-1">Venue</p>
            <p className="text-sm font-bold">Tehri Lake Zone</p>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Booking ID & Badge */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Booking ID</p>
            <p className="font-black text-slate-900 text-xl tracking-tight uppercase">{displayOrderId}</p>
          </div>
          <div className="bg-[#E6FFFA] text-[#00A389] px-4 py-2 rounded-2xl font-black text-[11px] uppercase border border-[#B2F5EA]">
            Paid Status
          </div>
        </div>

        {/* Customer Info */}
        <div className="flex items-center gap-4 mb-8 p-4 bg-slate-50 rounded-3xl border border-slate-100">
          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-xl font-black text-blue-600 shadow-sm border border-slate-100 uppercase">
            {customerName.charAt(0)}
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer Name</p>
            <h3 className="text-lg font-black text-slate-900 leading-tight">{customerName}</h3>
          </div>
        </div>

        {/* Activities List - One per line with Price */}
        <div className="mb-8">
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Booked Activities</p>
          <div className="space-y-3">
            {bookedItems.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{item.emoji || '🎫'}</span>
                  <div>
                    <p className="font-black text-slate-900 text-sm uppercase tracking-tight">{item.name}</p>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">{item.persons} Persons • {item.duration || 'Standard'}</p>
                  </div>
                </div>
                <p className="font-black text-slate-900 text-sm">₹{item.totalPrice?.toLocaleString() || '0'}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="pt-6 border-t-2 border-dashed border-slate-100 space-y-2 mb-8">
          <div className="flex justify-between items-center text-sm font-bold text-slate-500">
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center text-sm font-bold text-emerald-600">
            <span>GST (5%)</span>
            <span>₹{gst.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center pt-4">
            <span className="text-base font-black text-slate-400 uppercase tracking-widest">Total Amount</span>
            <span className="text-4xl font-black text-[#0066FF] tracking-tighter">₹{total.toLocaleString()}</span>
          </div>
        </div>

        {/* Disclaimers */}
        <div className="space-y-4 pt-6 border-t border-slate-100">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Important Disclaimers</p>
          <ul className="space-y-2">
            {[
              "Participants with heart conditions or pregnancy must not participate.",
              "Activities subject to weather conditions. Operator may reschedule.",
              "Life jacket and safety gear must be worn at all times.",
              "Participants under influence will be denied entry — no refund."
            ].map((text, i) => (
              <li key={i} className="flex gap-3 text-[10px] leading-relaxed text-slate-400 font-medium">
                <span className="text-slate-300 shrink-0">•</span>
                <span className={i === 1 ? "text-red-500 font-bold" : ""}>{text}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Help Footer */}
        <div className="mt-10 text-center">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
            Help: +91 98765 43210 | BOOKING@MYSKYTRIPS.COM
          </p>
        </div>
      </div>
    </div>
  );
};
