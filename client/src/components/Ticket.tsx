import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import LogoImg from '../assets/logo-DFfutrEX.png';

interface TicketProps {
  bookedItems: any[];
  subtotal: number;
  gst: number;
  total: number;
  customerName: string;
  bookingDate?: string;
  orderId?: string;
  customerAadhar?: string;
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
  customerAadhar,
  ticketRef 
}) => {
  const displayOrderId = orderId || 'MST-TEST';

  return (
    <div 
      ref={ticketRef} 
      data-ticket-container
      className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden font-sans border border-slate-100 w-full max-w-[500px] mx-auto text-left print:shadow-none print:border-none"
    >
      {/* Header - Moved Info Grid here */}
      <div className="bg-[#0066FF] p-6 text-white relative">
        <div className="flex justify-between items-start mb-6">
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
            <p className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-1">Venue Timing</p>
            <p className="text-sm font-bold text-amber-300 uppercase">09 AM - 06 PM</p>
          </div>
          <div>
            <p className="text-[10px] font-black text-white/50 uppercase tracking-widest mb-1">Venue</p>
            <p className="text-sm font-bold">Tehri Lake Zone</p>
          </div>
        </div>
      </div>

      <div className="p-5">
        {/* Booking ID & Aadhar */}
        <div className="mb-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col gap-3">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Booking ID</p>
              <p className="font-black text-slate-900 text-lg tracking-tight uppercase leading-none">{displayOrderId}</p>
            </div>
            <div className="bg-[#E6FFFA] text-[#00A389] px-3 py-1.5 rounded-xl font-black text-[10px] uppercase border border-[#B2F5EA] shrink-0">
              Paid Status
            </div>
          </div>
          <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
            <div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Aadhar Number</p>
              <p className="font-black text-slate-900 text-base tracking-[0.1em]">{customerAadhar || 'XXXX XXXX XXXX'}</p>
            </div>
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
              <CheckCircle2 size={16} />
            </div>
          </div>
        </div>

        {/* Customer Info */}
        <div className="flex items-center gap-3 mb-4 p-3 bg-slate-50 rounded-2xl border border-slate-100">
          <div className="w-10 h-10 bg-[#0066FF] rounded-xl flex items-center justify-center text-lg font-black text-white">
            {customerName.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Customer Name</p>
            <h3 className="text-base font-black text-slate-900 leading-tight">{customerName}</h3>
          </div>
        </div>

        {/* Activities List */}
        <div className="mb-3">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Booked Activities</p>
          <div className={bookedItems.length > 4 ? "grid grid-cols-2 gap-2" : "space-y-1.5"}>
            {bookedItems.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 bg-white border border-slate-100 rounded-xl shadow-sm">
                <div className="flex items-center gap-2 overflow-hidden">
                  <div className="w-6 h-6 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 text-xs shrink-0">
                    {item.emoji || '🎫'}
                  </div>
                  <div className="min-w-0">
                    <p className="font-black text-slate-900 text-[10px] uppercase tracking-tight truncate">{item.name}</p>
                    <p className="text-[8px] text-slate-500 font-bold uppercase truncate">{item.quantity || item.persons || 1} P • {item.duration || 'Std'}</p>
                  </div>
                </div>
                <p className="font-black text-slate-900 text-[10px] shrink-0 ml-1">₹{(item.totalPrice || item.price).toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="pt-4 border-t-2 border-dashed border-slate-100 space-y-1 mb-4">
          <div className="flex justify-between items-center text-[11px] font-bold text-slate-500">
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center text-[11px] font-bold text-emerald-600">
            <span>GST (5%)</span>
            <span>₹{gst.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center pt-2">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Amount</span>
            <span className="text-2xl font-black text-[#0066FF] tracking-tighter">₹{total.toLocaleString()}</span>
          </div>
        </div>

        {/* Disclaimers */}
        <div className="space-y-2 pt-3 border-t border-slate-100">
          <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em]">Disclaimers</p>
          <ul className="space-y-1">
            {[
              "Heart conditions or pregnancy must not participate.",
              "Subject to weather. Operator may reschedule.",
              "Safety gear must be worn at all times."
            ].map((text, i) => (
              <li key={i} className="flex gap-2 text-[9px] leading-tight text-slate-400 font-bold">
                <span className="text-slate-200 shrink-0">•</span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Help Footer */}
        <div className="mt-4 pt-3 border-t border-slate-100 text-center">
          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
            Help: +91 6395678642 | BOOKING@MYSKYTRIPS.COM
          </p>
        </div>
      </div>
    </div>
  );
};
