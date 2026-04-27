import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart, Plus, Minus, Trash2, Users, AlertCircle,
  CheckCircle2, Loader2, X, PartyPopper, MapPin, Phone, Calendar as CalendarIcon,
  ChevronLeft, ChevronRight, Star, Waves, Download
} from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { PackageCard } from './PackageCard';
import { API_BASE_URL, Package as PackageType, fetchPackageById } from '@/lib/api';
import { loadRazorpayScript } from '@/lib/razorpay';
import { Ticket } from './Ticket';

// Import local assets
import SpeedBoatImg from '../assets/Speed Boat.jpg.jpeg';
import HighSpeedBoatImg from '../assets/High speed boat.jpg.jpeg';
import JetSkiImg from '../assets/Jet ski.jpg.jpeg';
import BumperRideImg from '../assets/Bumper Ride .jpg.jpeg';
import BananaRideImg from '../assets/Banana ride.jpg.jpeg';
import FlyBoardingImg from '../assets/Fly boarding.jpg.jpeg';
import ParaSailingImg from '../assets/Para sailing.jpg.jpeg';
import ShikaraImg from '../assets/Shikara.jpg.jpeg';
import TehriHeliImg from '../assets/tehri3.png';


// ── Success Modal (Ticket Design) ─────────────────────────────────────────────
const SuccessModal = ({ bookedItems, total, subtotal, gst, customerName, customerAadhar, bookingDate, orderId, onClose }: {
  bookedItems: any[];
  total: number;
  subtotal: number;
  gst: number;
  customerName: string;
  customerAadhar?: string;
  bookingDate?: string;
  orderId?: string;
  onClose: () => void;
}) => {
  const ticketRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    const captureTarget = ticketRef.current;
    const toastId = toast.loading('Generating your ticket...');
    
    try {
      // Ensure all images are loaded
      if (captureTarget) {
        const images = captureTarget.getElementsByTagName('img');
        const imagePromises = Array.from(images).map(img => {
          if (img.complete) return Promise.resolve();
          return new Promise(resolve => {
            img.onload = resolve;
            img.onerror = resolve;
          });
        });
        await Promise.all(imagePromises);
      }

      // Small delay to ensure everything is settled (increased for reliability)
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      if (!captureTarget) throw new Error('Capture target not found');

      const canvas = await html2canvas(captureTarget, {
        useCORS: true,
        backgroundColor: '#ffffff',
        scale: 2,
        logging: false,
        allowTaint: true,
      });
      
      canvas.toBlob((blob) => {
        if (!blob) throw new Error('Canvas to Blob failed');
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `Ticket_MYSKYTRIPS_${customerName.replace(/\s+/g, '_')}.png`;
        link.href = url;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        toast.success('Ticket downloaded!', { id: toastId });
      }, 'image/png', 1.0);
    } catch (err) {
      console.error('PNG Download failed, falling back to PDF/Print', err);
      try {
        // Fallback: Open a printable window
        const printWindow = window.open('', '_blank');
        if (printWindow) {
          const ticketHtml = captureTarget?.innerHTML;
          printWindow.document.write(`
            <html>
              <head>
                <title>MYSKYTRIPS Ticket - ${customerName}</title>
                <script src="https://cdn.tailwindcss.com"></script>
                <style>
                  @media print { 
                    .no-print { display: none; } 
                    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
                  }
                  body { background: #f8fafc; padding: 20px; font-family: sans-serif; }
                </style>
              </head>
              <body>
                <div class="max-w-[500px] mx-auto bg-white shadow-xl rounded-[2.5rem] overflow-hidden border border-slate-200 text-slate-900">
                  <div class="bg-white p-8 border-b border-slate-100">
                    <h1 class="text-2xl font-black">MYSKYTRIPS</h1>
                    <p class="text-xs font-bold text-slate-500 uppercase tracking-widest">Official Ticket</p>
                  </div>
                  <div class="p-8">
                    ${ticketHtml}
                  </div>
                </div>
                <div class="text-center mt-8 no-print">
                  <button onclick="window.print()" style="background: #004D56; color: white; padding: 12px 24px; border-radius: 12px; font-weight: bold; cursor: pointer;">
                    Print or Save as PDF
                  </button>
                </div>
                <script>
                  window.onload = () => {
                    setTimeout(() => {
                       // window.print();
                    }, 500);
                  }
                </script>
              </body>
            </html>
          `);
          printWindow.document.close();
          toast.success('Opening printable ticket...', { id: toastId });
        } else {
          throw new Error('Pop-up blocked');
        }
      } catch (fallbackErr) {
        toast.error('Download failed. Please take a screenshot.', { id: toastId });
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto pt-10 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="w-full max-w-lg h-fit"
      >
        <div className="flex flex-col items-center gap-6">
          <Ticket 
            ticketRef={ticketRef}
            bookedItems={bookedItems}
            subtotal={subtotal}
            gst={gst}
            total={total}
            customerName={customerName}
            customerAadhar={customerAadhar}
            bookingDate={bookingDate}
            orderId={orderId}
          />

          <div className="flex flex-col gap-3 w-full max-w-[300px]">
            <button 
              onClick={handleDownload}
              className="w-full h-14 bg-[#004D56] hover:bg-[#003A41] text-white rounded-2xl font-black text-sm uppercase tracking-wider shadow-xl flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Download size={20} /> Download Ticket
            </button>
            <button 
              onClick={onClose}
              className="w-full h-14 bg-white text-slate-500 hover:text-slate-700 rounded-2xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer border border-slate-200"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
      
      {/* Off-screen capture area */}
      <div ref={ticketRef} className="absolute left-[-9999px] top-0">
        <Ticket 
          bookedItems={bookedItems}
          subtotal={subtotal}
          gst={gst}
          total={total}
          customerName={customerName}
          customerAadhar={customerAadhar}
          bookingDate={bookingDate}
          orderId={orderId}
        />
      </div>
    </div>
  );
};

// ── Types ─────────────────────────────────────────────────────────────────────
interface Duration { label: string; price: number; }
interface Activity {
  _id: string; name: string; emoji: string; price: number;
  description?: string; image?: string;
  durations: Duration[]; totalSeats: number; bookedSeats: number;
  availableSeats: number; isFull: boolean; isActive: boolean;
}
interface CartItem {
  activityId: string; name: string; emoji: string; persons: number;
  selectedDuration: Duration | null; pricePerPerson: number; totalPrice: number;
}

const MIN_BOOKING_AMOUNT = 1;
const CONVENIENCE_CHARGE_THRESHOLD = 5000;
const CONVENIENCE_CHARGE_AMOUNT = 500;

// ── Activity Card ─────────────────────────────────────────────────────────────
const ActivityCard = ({ activity, onAddToCart }: { activity: Activity; onAddToCart: (item: CartItem) => void }) => {
  const navigate = useNavigate();
  const isMulti = (activity.durations?.length ?? 0) > 0;
  const [selDur, setSelDur] = useState<Duration | null>(
    isMulti 
      ? [...activity.durations].sort((a, b) => b.price - a.price)[0] 
      : null
  );
  const [persons, setPersons] = useState(0);

  const price = isMulti ? (selDur?.price || 0) : activity.price;
  const available = activity.totalSeats - activity.bookedSeats;
  const isFull = available <= 0;
  const isLow = !isFull && available <= 5;

  const handleAdd = () => {
    if (isFull) return;
    if (persons <= 0) { toast.error(`Please select at least 1 person`); return; }
    if (persons > available) { toast.error(`Only ${available} seat(s) left for ${activity.name}`); return; }
    onAddToCart({ activityId: activity._id, name: activity.name, emoji: activity.emoji, persons, selectedDuration: selDur, pricePerPerson: price, totalPrice: price * persons });
    toast.success(`${activity.name} added to cart!`);
    setPersons(0);
  };

  return (
    <motion.div layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
      className={`group relative aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-700 hover:shadow-blue-900/20 ${isFull ? 'opacity-70 grayscale-[0.5]' : ''}`}>
      
      {/* Full Background Image */}
      <img 
        src={
          activity.name === 'Speed Boat' ? FlyBoardingImg : 
          activity.name === 'Motor Boat' ? SpeedBoatImg : 
          activity.name === 'Jet Ski' ? JetSkiImg : 
          activity.name === 'Bumper Ride' ? BumperRideImg : 
          activity.name === 'Banana Ride' ? BananaRideImg : 
          activity.name === 'Flyboarding' ? FlyBoardingImg : 
          activity.name === 'Parasailing' ? ParaSailingImg : 
          activity.name === 'Shikara Ride' ? ShikaraImg : 
          activity.name === 'Helicopter Adventure' ? TehriHeliImg :
          activity.image || 'https://images.unsplash.com/photo-1544551763-71a747970908?auto=format&fit=crop&q=80&w=800'
        } 
        alt={activity.name}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
      />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent opacity-60" />
      
      {/* Floating Badges */}
      <div className="absolute top-6 left-6 flex flex-col gap-2 z-20">
        {isFull && <div className="bg-rose-500/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">FULL</div>}
        {isLow && !isFull && (
          <div className="bg-amber-500/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
            <AlertCircle size={14} className="text-white" />
            {available} SEATS LEFT
          </div>
        )}
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-x-0 bottom-0 p-8 z-20 flex flex-col gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl drop-shadow-lg">{activity.emoji}</span>
            <h3 className="text-2xl font-black text-white leading-tight uppercase tracking-tighter drop-shadow-lg">{activity.name}</h3>
          </div>
          <p className="text-sm text-white/80 leading-relaxed font-medium line-clamp-3 drop-shadow-md">
            {activity.description || "Experience the thrill of Tehri's top-rated water adventure and create unforgettable memories with your loved ones."}
          </p>
        </div>

        <div className="flex items-center justify-between">
          {!isMulti ? (
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl font-serif font-black text-white tracking-tighter">₹{price.toLocaleString()}</span>
              <span className="text-[10px] text-white/60 font-bold uppercase tracking-widest">/ person</span>
            </div>
          ) : (
            <span className="text-[10px] text-white font-black uppercase tracking-[0.2em] bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">Choice Available</span>
          )}
        </div>

        {isMulti && (
          <div className="grid grid-cols-2 gap-2 mt-2">
            {activity.durations.map(d => (
              <button key={d.label} onClick={() => setSelDur(d)} disabled={isFull}
                className={`py-2.5 px-3 rounded-2xl text-[10px] font-black border transition-all cursor-pointer ${selDur?.label === d.label ? 'bg-white text-blue-900 border-white shadow-xl' : 'bg-white/10 text-white/80 border-white/20 hover:bg-white/20 backdrop-blur-sm'}`}>
                {d.label} — ₹{d.price}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur-xl p-1.5 rounded-2xl border border-white/20">
            <button onClick={() => setPersons(p => Math.max(0, p - 1))} disabled={isFull || persons <= 0}
              className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all disabled:opacity-30 cursor-pointer">
              <Minus size={16} className="text-white" />
            </button>
            <span className="w-8 text-center font-black text-lg text-white">{persons}</span>
            <button onClick={() => setPersons(p => Math.min(available, 50, p + 1))} disabled={isFull || persons >= available}
              className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all disabled:opacity-30 cursor-pointer">
              <Plus size={16} className="text-white" />
            </button>
          </div>
          
          <button onClick={() => {
            if (activity.name === 'Helicopter Adventure') {
              navigate('/package/6');
            } else {
              handleAdd();
            }
          }} disabled={isFull}
            className={`flex-1 h-14 rounded-2xl text-xs font-black uppercase tracking-[0.2em] transition-all cursor-pointer shadow-2xl active:scale-95 ${isFull ? 'bg-white/10 text-white/40 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-900/40 border-b-4 border-blue-800'}`}>
            {isFull ? 'Sold Out' : (activity.name === 'Helicopter Adventure' ? 'Explore' : `Add To Cart`)}
          </button>
        </div>
      </div>
    </motion.div>
  );
};


const GuestModal = ({ total, subtotal, charge, gst, onConfirm, onClose, loading, bookedItems, bookingDate, onSuccess }: {
  total: number; subtotal: number; charge: number; gst: number; 
  onConfirm: (name: string, email: string, phone: string, aadhar: string) => void;
  onClose: () => void; loading: boolean; bookedItems: any[]; bookingDate: string; onSuccess: (data: any) => void;
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [aadhar, setAadhar] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !aadhar) { toast.error('Please fill all fields'); return; }
    
    // Aadhar Validation (12 digits)
    if (aadhar.length !== 12) {
      toast.error('Aadhar Number must be exactly 12 digits');
      return;
    }
    
    onConfirm(name, email, phone, aadhar);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto py-10">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden my-auto">
        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #1a56db 0%, #0e3fa8 100%)', padding: '24px 24px 20px' }} className="relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/60 hover:text-white cursor-pointer"><X size={20} /></button>
          <h3 className="text-white font-bold text-lg">Complete Your Booking</h3>
          <p className="text-white/70 text-sm mt-1">Tehri Water Adventure Activities</p>
          
          <div className="mt-4 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10">
            <div className="flex justify-between items-center text-white/80 text-xs mb-1">
              <span>Convenience Charge</span>
              <span>{charge > 0 ? `+ ₹${charge.toLocaleString()}` : 'FREE'}</span>
            </div>
            <div className="flex justify-between items-center text-white/80 text-xs mb-2">
              <span>GST (5%)</span>
              <span>+ ₹{gst.toLocaleString()}</span>
            </div>
            <div className="pt-2 border-t border-white/20 flex justify-between items-center text-white">
              <span className="font-bold text-xs uppercase tracking-widest">Total Amount</span>
              <span className="font-bold text-xl">₹{total.toLocaleString()}</span>
            </div>
          </div>
          {charge > 0 && (
            <p className="text-[10px] text-white/60 mt-3 text-center italic">
              * Convenience charge applies to bookings under ₹5,000
            </p>
          )}
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {[
            { id: 'wa-name', label: 'Full Name', type: 'text', val: name, set: setName, placeholder: 'Enter your full name' },
            { id: 'wa-email', label: 'Email Address', type: 'email', val: email, set: setEmail, placeholder: 'you@example.com' },
            { id: 'wa-phone', label: 'Phone Number', type: 'tel', val: phone, set: setPhone, placeholder: '+91 98765 43210' },
            { id: 'wa-aadhar', label: 'Aadhar Card Number', type: 'text', val: aadhar, set: setAadhar, placeholder: '12 Digit Aadhar Number', maxLength: 12 },
          ].map(f => (
            <div key={f.id}>
              <label htmlFor={f.id} className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1">{f.label}</label>
              <input 
                id={f.id} 
                type={f.type} 
                value={f.val} 
                maxLength={f.maxLength}
                onChange={e => {
                  const val = f.id === 'wa-aadhar' ? e.target.value.replace(/\D/g, '') : e.target.value;
                  f.set(val);
                }} 
                placeholder={f.placeholder} 
                required
                className="w-full px-4 py-3 border-2 border-slate-100 rounded-xl text-sm focus:outline-none focus:border-blue-400 bg-slate-50 transition-colors" 
              />
              {f.id === 'wa-aadhar' && <p className="text-[9px] text-slate-400 mt-1 font-bold uppercase tracking-tight">Required for insurance and safety clearance</p>}
            </div>
          ))}
          <button type="submit" disabled={loading}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all mt-2 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70">
            {loading ? <><Loader2 size={16} className="animate-spin" /> Processing...</> : `Confirm & Book ₹${total.toLocaleString()}`}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

// ── Cart Drawer ───────────────────────────────────────────────────────────────
const CartDrawer = ({ cart, onRemove, onClear, onPay, isOpen, onClose }: {
  cart: CartItem[]; onRemove: (id: string) => void;
  onClear: () => void; onPay: () => void;
  isOpen: boolean; onClose: () => void;
}) => {
  const subtotal = cart.reduce((acc, i) => acc + i.totalPrice, 0);
  const isTestBooking = subtotal <= 10;
  const convenienceCharge = (subtotal < CONVENIENCE_CHARGE_THRESHOLD && !isTestBooking) ? CONVENIENCE_CHARGE_AMOUNT : 0;
  const gst = isTestBooking ? 0 : Math.round((subtotal + convenienceCharge) * 0.05);
  const total = subtotal + convenienceCharge + gst;
  const meetsMin = subtotal >= MIN_BOOKING_AMOUNT;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop for click-outside-to-close */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-full max-w-[400px] bg-white shadow-2xl z-[51] flex flex-col"
          >
            {/* Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
                  <ShoppingCart size={20} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">Your Cart</h3>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{cart.length} ride{cart.length !== 1 ? 's' : ''} added</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {cart.length > 0 && (
                  <button onClick={onClear} className="text-[10px] font-bold text-rose-400 hover:text-rose-600 uppercase tracking-widest cursor-pointer">Clear All</button>
                )}
                <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors cursor-pointer text-slate-400">
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                  <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                    <ShoppingCart size={32} className="text-slate-400" />
                  </div>
                  <p className="text-slate-800 font-bold">Your cart is empty</p>
                  <p className="text-sm text-slate-500 mt-1">Add some water activities to get started!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence>
                    {cart.map((item, idx) => (
                      <motion.div key={`${item.activityId}-${idx}`} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }}
                        className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 group">
                        <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-2xl shrink-0">{item.emoji}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-slate-800 truncate">{item.name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[11px] text-slate-500">{item.persons} person{item.persons > 1 ? 's' : ''}</span>
                            <span className="w-1 h-1 bg-slate-300 rounded-full" />
                            <span className="text-[11px] font-bold text-blue-600">₹{item.pricePerPerson.toLocaleString()}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-slate-900 text-sm">₹{item.totalPrice.toLocaleString()}</p>
                          <button onClick={() => onRemove(item.activityId)} className="mt-1 text-slate-300 hover:text-rose-500 transition-colors cursor-pointer"><Trash2 size={14} /></button>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 bg-slate-50 border-t border-slate-200">
                <div className="space-y-2 mb-5">
                  <div className="flex justify-between items-center text-sm font-medium">
                    <span className="text-slate-500">Subtotal</span>
                    <span className="text-slate-800">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm font-medium">
                    <span className="text-slate-500">Convenience Charge</span>
                    {convenienceCharge > 0 ? (
                      <span className="text-rose-500">+ ₹{convenienceCharge.toLocaleString()}</span>
                    ) : (
                      <span className="text-emerald-600 font-bold italic">FREE</span>
                    )}
                  </div>
                  <div className="flex justify-between items-center text-sm font-medium">
                    <span className="text-slate-500">GST (5%)</span>
                    <span className="text-slate-800">+ ₹{gst.toLocaleString()}</span>
                  </div>
                  {convenienceCharge > 0 && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mt-1 mb-4 flex items-start gap-2 shadow-sm">
                      <AlertCircle size={14} className="text-amber-500 shrink-0 mt-0.5" />
                      <p className="text-[10px] text-amber-800 leading-relaxed">
                        A <strong>₹500 convenience charge</strong> is applied to bookings under ₹5,000. 
                        Add <strong>₹{(CONVENIENCE_CHARGE_THRESHOLD - subtotal).toLocaleString()}</strong> more to your cart to get <strong>FREE convenience!</strong>
                      </p>
                    </div>
                  )}
                  <div className="pt-3 mt-3 border-t border-slate-200 flex justify-between items-center">
                    <div>
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Total Amount</span>
                      <p className="text-3xl font-serif font-bold text-blue-600 mt-1">₹{total.toLocaleString()}</p>
                    </div>
                    {subtotal >= CONVENIENCE_CHARGE_THRESHOLD && (
                      <div className="bg-emerald-50 text-emerald-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-emerald-100">
                        Top Deal!
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  {!meetsMin && (
                    <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl flex items-start gap-2">
                      <AlertCircle size={14} className="text-amber-500 shrink-0 mt-0.5" />
                      <p className="text-[10px] text-amber-700 leading-relaxed font-medium">
                        Booking requires minimum <strong>₹5,000</strong>. Please add more activities to proceed.
                      </p>
                    </div>
                  )}

                  <button onClick={onPay} disabled={!meetsMin}
                    className={`w-full py-4 rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-2 ${meetsMin ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-lg shadow-blue-200 active:scale-95' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}>
                    {meetsMin ? `Proceed to Pay ₹${total.toLocaleString()}` : `Add items to book`}
                  </button>
                  <p className="text-[10px] text-slate-400 text-center">Seats are reserved only after successful payment</p>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ── Main Section ──────────────────────────────────────────────────────────────
export const WaterAdventureSection = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [heliPackage, setHeliPackage] = useState<PackageType | null>(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>(() => {
    // Initial load from localStorage
    const saved = localStorage.getItem('sky_trip_water_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [showModal, setShowModal] = useState(false);
  const [paying, setPaying] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successData, setSuccessData] = useState<{ items: any[]; total: number; subtotal: number; gst: number; name: string; aadhar: string; date?: string; orderId: string } | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('sky_trip_water_cart', JSON.stringify(cart));
  }, [cart]);

  // Body Scroll Lock for Modal & Cart
  useEffect(() => {
    if (showModal || showSuccess || isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal, showSuccess, isCartOpen]);

  // Fetch without showing spinner (for background polls)
  const fetchActivities = async (showLoader = false, dateToFetch = selectedDate) => {
    if (showLoader) setLoading(true);
    try {
      // Fetch Helicopter Package
      try {
        const heliData = await fetchPackageById('69d9dac47e9892bc71afb965');
        setHeliPackage(heliData);
      } catch (err) {
        console.error('Failed to fetch helicopter package', err);
      }

      const url = dateToFetch 
        ? `${API_BASE_URL}/water-activities?date=${dateToFetch}`
        : `${API_BASE_URL}/water-activities`;
        
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        // Filter out Test Ride and sort Flyboarding to top
        const filtered = data.data.filter((a: Activity) => a.name !== 'Test Ride');
        const sorted = filtered.sort((a: Activity, b: Activity) => {
          if (a.name === 'Flyboarding') return -1;
          if (b.name === 'Flyboarding') return 1;
          return 0;
        });
        setActivities(sorted);
      }
    } catch (err) {
      console.error('Failed to fetch activities', err);
    } finally {
      if (showLoader) setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedDate) {
      fetchActivities(true, selectedDate);
    }
  }, [selectedDate]);

  useEffect(() => {
    // Initial load
    fetchActivities(true);
    // Background poll every 60s
    intervalRef.current = setInterval(() => fetchActivities(false), 60000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const exists = prev.findIndex(c => c.activityId === item.activityId);
      if (exists >= 0) { const u = [...prev]; u[exists] = item; return u; }
      return [...prev, item];
    });
    
    // Auto-open drawer only on desktop screens
    if (window.innerWidth > 768) {
      setIsCartOpen(true);
    }
  };

  const removeFromCart = (activityId: string) => setCart(prev => prev.filter(i => i.activityId !== activityId));
  const clearCart = () => setCart([]);

  // ── Payment Flow (correct order) ──────────────────────────────────────────
  // 1. User clicks Pay → Modal opens for guest details
  // 2. User fills → Razorpay opens
  // 3. Payment SUCCESS → THEN book seats via API
  // 4. Payment FAIL/CANCEL → No seat change
  const handlePay = () => {
    if (!selectedDate) {
      toast.error('Please select a visit date first!');
      // Scroll to calendar
      const cal = document.getElementById('visit-date-selector');
      if (cal) cal.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    setIsCartOpen(false);
    setShowModal(true);
  };

  const handleConfirmPayment = async (name: string, email: string, phone: string, aadhar: string) => {
    setPaying(true);
    try {
      const subtotal = cart.reduce((a, i) => a + i.totalPrice, 0);
      const isTest = subtotal <= 10;
      const charge = (subtotal < CONVENIENCE_CHARGE_THRESHOLD && !isTest) ? CONVENIENCE_CHARGE_AMOUNT : 0;
      const gst = isTest ? 0 : Math.round((subtotal + charge) * 0.05);
      const total = subtotal + charge + gst;
      const date = selectedDate;

      // Step 1: Load Razorpay SDK
      const isLoaded = await loadRazorpayScript();
      if (!isLoaded) {
        toast.error('Razorpay SDK failed to load. Check your internet connection.');
        setPaying(false);
        return;
      }

      // Step 2: Create order on backend
      const orderRes = await fetch(`${API_BASE_URL}/payment/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: total,
          currency: 'INR',
          customerName: name,
          customerEmail: email,
          customerPhone: phone,
          customerAadhar: aadhar,
          bookingDate: date,
          notes: { package: 'Tehri Water Adventure', userId: 'Guest', bookingDate: date, aadhar },
          items: cart.map(i => ({
            activityId: i.activityId, // Added activityId
            name: i.name,
            emoji: i.emoji,
            persons: i.persons,
            totalPrice: i.totalPrice,
            duration: i.selectedDuration?.label || null,
          })),
        }),
      });
      const orderData = await orderRes.json();

      if (!orderData.success) throw new Error(orderData.error || 'Failed to create order');

      const { orderId, amount: orderAmount, currency } = orderData.data;

      // Step 3: Open Razorpay
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderAmount,
        currency,
        name: 'Sky Trip',
        description: 'Tehri Water Adventure Activities',
        image: '/logo.png',
        order_id: orderId,
        handler: async (response: any) => {
          try {
            // Step 4: Verify payment
            const verifyRes = await fetch(`${API_BASE_URL}/payment/verify-payment`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });
            const verifyData = await verifyRes.json();

            if (verifyData.success) {
              // Show premium success popup
              setSuccessData({ items: [...cart], total, subtotal, gst, name, aadhar, date, orderId: response.razorpay_order_id });
              setShowSuccess(true);

              setShowModal(false);
              clearCart();
              fetchActivities(false); // Refresh seat counts silently
            } else {
              toast.error(verifyData.error || 'Payment verification failed. Contact support.');
            }
          } catch (err) {
            toast.error('Error during verification. Please contact support.');
          } finally {
            setPaying(false);
          }
        },
        prefill: { name, email, contact: phone },
        theme: { color: '#1a56db' },
        modal: {
          ondismiss: () => {
            // User closed Razorpay without paying — no seat deduction
            setPaying(false);
            toast.info('Payment cancelled. Your cart is intact.');
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', (response: any) => {
        toast.error(response.error?.description || 'Payment failed. Please try again.');
        setPaying(false);
      });
      rzp.open();
      setShowModal(false); // Close our modal after Razorpay opens
    } catch (err: any) {
      console.error('Payment error:', err);
      toast.error(err.message || 'Something went wrong. Please try again.');
      setPaying(false);
    }
  };

  const cartSubtotal = cart.reduce((a, i) => a + i.totalPrice, 0);
  const isCartTest = cartSubtotal <= 10;
  const cartCharge = (cartSubtotal < CONVENIENCE_CHARGE_THRESHOLD && !isCartTest) ? CONVENIENCE_CHARGE_AMOUNT : 0;
  const cartGst = isCartTest ? 0 : Math.round((cartSubtotal + cartCharge) * 0.05);
  const cartTotal = cartSubtotal + cartCharge + cartGst;

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50/50 to-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-600" />

      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-14">
          <motion.span initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest rounded-full mb-4">
            🌊 Water Sports
          </motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">
            Tehri Water <span className="text-blue-600">Adventure Activities</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="text-slate-500 text-base leading-relaxed max-w-xl mx-auto">
            Book your tickets in advance to avoid walk-in rush.
          </motion.p>
        </div>



        {/* Date Selector */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          id="visit-date-selector"
          className="max-w-md mx-auto mb-16"
        >
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-blue-900/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -translate-y-1/2 translate-x-1/2 opacity-50 group-hover:scale-110 transition-transform duration-500" />
            <div className="relative">
              <label className="block text-center text-xs font-black text-slate-500 uppercase tracking-[0.2em] mb-5">
                Step 1: Choose Your Adventure Date
              </label>
              <div 
                className="relative cursor-pointer"
                onClick={() => dateInputRef.current?.showPicker()}
              >
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                  <CalendarIcon size={24} className="text-blue-600" />
                </div>
                <input 
                  ref={dateInputRef}
                  type="date" 
                  min={minDate}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full pl-16 pr-8 py-5 bg-slate-50 border-2 border-slate-200 rounded-3xl text-slate-900 font-bold text-lg md:text-2xl focus:outline-none focus:border-blue-600 focus:bg-white transition-all cursor-pointer hover:border-blue-300 shadow-sm min-h-[4rem] appearance-none"
                />
              </div>
              {!selectedDate && (
                <p className="text-xs text-amber-600 font-bold text-center mt-4 animate-pulse italic">
                  * Please select a date to enable activity booking
                </p>
              )}
              {selectedDate && (
                <p className="text-sm text-emerald-600 font-bold text-center mt-5 flex items-center justify-center gap-2">
                  <CheckCircle2 size={18} /> Date selected: {new Date(selectedDate).toLocaleDateString('en-IN', { dateStyle: 'long' })}
                </p>
              )}
            </div>
          </div>
        </motion.div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {/* Activity Cards */}
          <div className="lg:col-span-3">
            <div className="flex items-center gap-4 mb-12">
              <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight">Available <span className="text-blue-600">Activities</span></h3>
              <div className="h-px flex-1 bg-slate-100" />
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 size={40} className="animate-spin text-blue-500" />
                <p className="text-slate-400 text-sm font-medium animate-pulse">Loading activities...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {activities
                  .sort((a, b) => {
                    const order = [
                      'Flyboarding',
                      'Parasailing',
                      'Jet Ski',
                      'Speed Boat',
                      'Motor Boat',
                      'Banana Ride',
                      'Bumper Ride',
                      'Shikara Ride'
                    ];
                    const indexA = order.indexOf(a.name);
                    const indexB = order.indexOf(b.name);
                    if (indexA !== -1 && indexB !== -1) return indexA - indexB;
                    if (indexA !== -1) return -1;
                    if (indexB !== -1) return 1;
                    return 0;
                  })
                  .map(a => <ActivityCard key={a._id} activity={a} onAddToCart={addToCart} />)}
              </div>
            )}
          </div>
        </div>

        {/* Unique Header-Integrated Recommendation */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mt-24 mb-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full">
              <Waves size={14} /> Official Water Sports Zone
            </div>
            <h2 className="text-4xl md:text-6xl font-serif font-black text-slate-900 leading-tight">
              Adventure <br /> 
              <span className="text-blue-600 italic">Awaits You</span>
            </h2>
            <p className="text-slate-500 text-lg max-w-md font-medium leading-relaxed mx-auto lg:mx-0">
              Pick your thrill from our curated list of water activities. From high-speed rides to peaceful boating, we have it all.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative group"
          >
            {/* Suggestion Bubble */}
            <div className="absolute -top-6 -left-6 z-20 bg-blue-600 text-white p-4 rounded-[1.5rem] shadow-xl shadow-blue-200 animate-bounce cursor-default max-w-[150px]">
              <div className="flex items-center gap-2 mb-1">
                <Star size={12} className="fill-white" />
                <span className="text-[10px] font-black uppercase tracking-tighter">Smart Suggestion</span>
              </div>
              <p className="text-[9px] font-bold leading-tight">People visiting Tehri often prefer this Helicopter Combo!</p>
              <div className="absolute -bottom-2 left-8 w-4 h-4 bg-blue-600 rotate-45" />
            </div>

            {/* The Actual Package Card */}
            <div className="relative z-10 transform lg:rotate-2 group-hover:rotate-0 transition-transform duration-500 shadow-2xl">
              {heliPackage && <PackageCard pkg={heliPackage} />}
            </div>

            {/* Decorative background for the suggestion */}
            <div className="absolute inset-0 bg-blue-100/50 rounded-[3rem] -rotate-3 scale-105 -z-10 group-hover:rotate-0 transition-transform duration-700" />
          </motion.div>
        </div>
      </div>



      {/* Cart Drawer Component */}
      <CartDrawer 
        cart={cart} 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        onRemove={removeFromCart} 
        onClear={clearCart} 
        onPay={handlePay} 
      />

      {/* Guest Modal */}
      <AnimatePresence>
        {showModal && (
          <GuestModal 
            total={cartTotal} 
            subtotal={cartSubtotal} 
            charge={cartCharge} 
            gst={cartGst}
            onConfirm={handleConfirmPayment} 
            onClose={() => setShowModal(false)} 
            loading={paying}
            bookedItems={cart}
            bookingDate={selectedDate}
            onSuccess={(data) => {
              setSuccessData({
                items: data.items,
                total: data.amount / 100,
                subtotal: Math.round((data.amount / 100) / 1.05),
                gst: Math.round((data.amount / 100) - ((data.amount / 100) / 1.05)),
                name: data.customerName,
                aadhar: data.customerAadhar,
                date: data.bookingDate,
                orderId: data.razorpayOrderId
              });
              setShowSuccess(true);
              clearCart();
              setShowModal(false);
            }}
          />
        )}
      </AnimatePresence>

      {/* Payment Success Modal */}
      <AnimatePresence>
        {showSuccess && successData && (
          <SuccessModal
            bookedItems={successData.items}
            total={successData.total}
            subtotal={successData.subtotal}
            gst={successData.gst}
            customerName={successData.name}
            customerAadhar={successData.aadhar}
            bookingDate={successData.date}
            orderId={successData.orderId}
            onClose={() => { setShowSuccess(false); setSuccessData(null); }}
          />
        )}
      </AnimatePresence>
      {/* Mobile Floating Cart Button */}
      <AnimatePresence>
        {cart.length > 0 && !isCartOpen && !showModal && !showSuccess && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40"
          >
            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-blue-600 text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-3 font-black text-sm uppercase tracking-wider border-4 border-white active:scale-95 transition-transform"
            >
              <div className="relative">
                <ShoppingCart size={20} />
                <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                  {cart.length}
                </span>
              </div>
              View My Cart
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default WaterAdventureSection;
