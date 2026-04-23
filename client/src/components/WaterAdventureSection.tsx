import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart, Plus, Minus, Trash2, Users, AlertCircle,
  CheckCircle2, Loader2, X, PartyPopper, MapPin, Phone
} from 'lucide-react';
import { toast } from 'sonner';
import { API_BASE_URL } from '@/lib/api';
import { loadRazorpayScript } from '@/lib/razorpay';

// Import local assets
import SpeedBoatImg from '../assets/Speed Boat.jpg.jpeg';
import HighSpeedBoatImg from '../assets/High speed boat.jpg.jpeg';
import JetSkiImg from '../assets/Jet ski.jpg.jpeg';
import BumperRideImg from '../assets/Bumper Ride .jpg.jpeg';
import BananaRideImg from '../assets/Banana ride.jpg.jpeg';
import FlyBoardingImg from '../assets/Fly boarding.jpg.jpeg';
import ParaSailingImg from '../assets/Para sailing.jpg.jpeg';
import ShikaraImg from '../assets/Shikara.jpg.jpeg';

// ── Success Modal ─────────────────────────────────────────────────────────────
const SuccessModal = ({ bookedItems, total, customerName, onClose }: {
  bookedItems: { name: string; emoji: string; persons: number; totalPrice: number }[];
  total: number;
  customerName: string;
  onClose: () => void;
}) => (
  <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
    <motion.div
      initial={{ opacity: 0, scale: 0.8, y: 40 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md overflow-hidden"
    >
      {/* Top gradient */}
      <div style={{ background: 'linear-gradient(135deg, #0ea5e9 0%, #1a56db 60%, #4f46e5 100%)' }} className="relative px-8 pt-10 pb-8 text-center overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-20 h-20 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />

        {/* Animated checkmark */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', damping: 15, stiffness: 400 }}
          className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.35, type: 'spring' }}
            className="w-14 h-14 bg-white rounded-full flex items-center justify-center"
          >
            <CheckCircle2 size={36} className="text-blue-600" />
          </motion.div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-white text-2xl font-bold mb-1"
        >
          Booking Confirmed! 🎉
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-white/80 text-sm"
        >
          Hey {customerName}, see you at Tehri Lake!
        </motion.p>
      </div>

      {/* Body */}
      <div className="px-8 py-6">
        {/* Booked rides */}
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Your Rides</p>
        <div className="space-y-2 mb-5">
          {bookedItems.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + i * 0.08 }}
              className="flex items-center justify-between p-3 bg-blue-50 rounded-2xl"
            >
              <div className="flex items-center gap-2">
                <span className="text-xl">{item.emoji}</span>
                <div>
                  <p className="text-xs font-bold text-slate-800">{item.name}</p>
                  <p className="text-[10px] text-slate-400">{item.persons} person{item.persons > 1 ? 's' : ''}</p>
                </div>
              </div>
              <span className="text-xs font-bold text-blue-600">₹{item.totalPrice.toLocaleString()}</span>
            </motion.div>
          ))}
        </div>

        {/* Total */}
        <div className="flex justify-between items-center p-4 bg-slate-900 rounded-2xl mb-5">
          <span className="text-white/70 text-sm font-medium">Total Paid</span>
          <span className="text-white font-bold text-xl">₹{total.toLocaleString()}</span>
        </div>

        {/* Info */}
        <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-100 rounded-2xl mb-5">
          <MapPin size={16} className="text-amber-500 shrink-0 mt-0.5" />
          <p className="text-xs text-amber-700 leading-relaxed">
            Our team will contact you with your ride schedule. Please arrive <strong>15 minutes early</strong> at Tehri Lake Adventure Zone.
          </p>
        </div>

        {/* Close button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onClose}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-colors cursor-pointer"
        >
          Done — Back to Activities
        </motion.button>
      </div>
    </motion.div>
  </div>
);

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

// ── Activity Card ─────────────────────────────────────────────────────────────
const ActivityCard = ({ activity, onAddToCart }: { activity: Activity; onAddToCart: (item: CartItem) => void }) => {
  const isMulti = activity.durations?.length > 0;
  const [selDur, setSelDur] = useState<Duration | null>(isMulti ? activity.durations[0] : null);
  const [persons, setPersons] = useState(1);

  const price = isMulti ? (selDur?.price || 0) : activity.price;
  const available = activity.totalSeats - activity.bookedSeats;
  const isFull = available <= 0;
  const isLow = !isFull && available <= 10;

  const handleAdd = () => {
    if (isFull) return;
    if (persons > available) { toast.error(`Only ${available} seat(s) left for ${activity.name}`); return; }
    onAddToCart({ activityId: activity._id, name: activity.name, emoji: activity.emoji, persons, selectedDuration: selDur, pricePerPerson: price, totalPrice: price * persons });
    toast.success(`${activity.name} added to cart!`);
    setPersons(1);
  };

  return (
    <motion.div layout initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
      className={`group relative bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-blue-900/5 hover:-translate-y-2 ${isFull ? 'opacity-70 grayscale-[0.5]' : ''}`}>
      
      {/* Image Header */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={
            activity.name === 'Speed Boat' ? SpeedBoatImg : 
            activity.name === 'High Speed Boat' ? HighSpeedBoatImg : 
            activity.name === 'Jet Ski' ? JetSkiImg : 
            activity.name === 'Bumper Ride' ? BumperRideImg : 
            activity.name === 'Banana Ride' ? BananaRideImg : 
            activity.name === 'Fly Boarding' ? FlyBoardingImg : 
            activity.name === 'Para Sailing' ? ParaSailingImg : 
            activity.name === 'Shikara' ? ShikaraImg : 
            activity.image || 'https://images.unsplash.com/photo-1544551763-71a747970908?auto=format&fit=crop&q=80&w=800'
          } 
          alt={activity.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        
        {/* Floating Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <div className="bg-white/90 backdrop-blur-md text-slate-800 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
            <Users size={12} className="text-blue-600" />
            {available} / {activity.totalSeats} LEFT
          </div>
          {isFull && <div className="bg-rose-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg shadow-rose-500/30">FULL</div>}
          {isLow && !isFull && <div className="bg-amber-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg shadow-amber-500/30 animate-pulse">LOW SEATS</div>}
        </div>

        {/* Emoji Badge */}
        <div className="absolute -bottom-4 right-6 w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center text-2xl z-10 border-4 border-white">
          {activity.emoji}
        </div>
      </div>

      <div className="p-7 pt-8">
        <div>
          <h3 className="text-xl font-bold text-slate-900 leading-tight group-hover:text-blue-600 transition-colors uppercase tracking-tight">{activity.name}</h3>
          <p className="text-xs text-slate-500 mt-2 leading-relaxed font-medium line-clamp-2 italic h-8">
            {activity.description || "Experience the thrill of Tehri's top-rated water adventure."}
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between">
          <div>
            {!isMulti ? (
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-serif font-black text-slate-900 tracking-tighter">₹{price.toLocaleString()}</span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">/ person</span>
              </div>
            ) : (
              <span className="text-[10px] text-blue-600 font-black uppercase tracking-widest bg-blue-50 px-2 py-0.5 rounded">Multiple Options</span>
            )}
          </div>
        </div>

        {isMulti && (
          <div className="flex gap-2 mt-4">
            {activity.durations.map(d => (
              <button key={d.label} onClick={() => setSelDur(d)} disabled={isFull}
                className={`flex-1 py-2.5 px-3 rounded-2xl text-[11px] font-black border-2 transition-all cursor-pointer ${selDur?.label === d.label ? 'border-blue-600 bg-blue-600 text-white shadow-lg shadow-blue-200' : 'border-slate-100 text-slate-500 hover:border-blue-200 bg-slate-50'}`}>
                {d.label} — ₹{d.price}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center gap-4 mt-6">
          <div className="flex items-center gap-1.5 bg-slate-100/50 p-1.5 rounded-2xl border border-slate-200/50">
            <button onClick={() => setPersons(p => Math.max(1, p - 1))} disabled={isFull || persons <= 1}
              className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all disabled:opacity-30 cursor-pointer shadow-sm">
              <Minus size={14} className="text-slate-600" />
            </button>
            <span className="w-8 text-center font-black text-base text-slate-800">{persons}</span>
            <button onClick={() => setPersons(p => Math.min(available, 50, p + 1))} disabled={isFull || persons >= available}
              className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all disabled:opacity-30 cursor-pointer shadow-sm">
              <Plus size={14} className="text-slate-600" />
            </button>
          </div>
          
          <button onClick={handleAdd} disabled={isFull}
            className={`flex-1 h-12 rounded-2xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer shadow-lg active:scale-95 ${isFull ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-200'}`}>
            {isFull ? 'Full' : `Book Total: ₹${(price * persons).toLocaleString()}`}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

// ── Guest Details Modal ───────────────────────────────────────────────────────
const GuestModal = ({ total, onConfirm, onClose, loading }: {
  total: number; onConfirm: (name: string, email: string, phone: string) => void;
  onClose: () => void; loading: boolean;
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) { toast.error('Please fill all fields'); return; }
    onConfirm(name, email, phone);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #1a56db 0%, #0e3fa8 100%)', padding: '24px 24px 20px' }} className="relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/60 hover:text-white cursor-pointer"><X size={20} /></button>
          <h3 className="text-white font-bold text-lg">Complete Your Booking</h3>
          <p className="text-white/70 text-sm mt-1">Tehri Water Adventure Activities</p>
          <div className="mt-3 inline-flex items-center gap-2 bg-white/15 rounded-full px-4 py-2">
            <span className="text-white font-bold text-base">₹{total.toLocaleString()}</span>
          </div>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {[
            { id: 'wa-name', label: 'Full Name', type: 'text', val: name, set: setName, placeholder: 'Enter your full name' },
            { id: 'wa-email', label: 'Email Address', type: 'email', val: email, set: setEmail, placeholder: 'you@example.com' },
            { id: 'wa-phone', label: 'Phone Number', type: 'tel', val: phone, set: setPhone, placeholder: '+91 98765 43210' },
          ].map(f => (
            <div key={f.id}>
              <label htmlFor={f.id} className="block text-xs font-bold text-slate-600 uppercase tracking-widest mb-1">{f.label}</label>
              <input id={f.id} type={f.type} value={f.val} onChange={e => f.set(e.target.value)} placeholder={f.placeholder} required
                className="w-full px-4 py-3 border-2 border-slate-100 rounded-xl text-sm focus:outline-none focus:border-blue-400 bg-slate-50 transition-colors" />
            </div>
          ))}
          <button type="submit" disabled={loading}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all mt-2 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70">
            {loading ? <><Loader2 size={16} className="animate-spin" /> Processing...</> : `Proceed to Pay ₹${total.toLocaleString()}`}
          </button>
          <div className="flex items-center justify-center gap-4 text-xs text-slate-400 mt-2">
            <span>✅ 100% Secure</span>
            <span>🔒 Encrypted</span>
            <span>⚡ Razorpay</span>
          </div>
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
  const total = cart.reduce((acc, i) => acc + i.totalPrice, 0);
  const meetsMin = total >= MIN_BOOKING_AMOUNT;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[50] cursor-pointer"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 w-full max-w-[400px] bg-white shadow-2xl z-[51] flex flex-col"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-white sticky top-0 z-10">
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
                <div className="flex justify-between items-center mb-5">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Total Amount</span>
                    <p className="text-3xl font-serif font-bold text-blue-600 mt-1">₹{total.toLocaleString()}</p>
                  </div>
                  {!meetsMin && (
                    <div className="text-right">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-[10px] font-bold">
                        <AlertCircle size={10} /> Min Error
                      </div>
                      <p className="text-[10px] text-slate-400 mt-1">Need ₹{(MIN_BOOKING_AMOUNT - total).toLocaleString()} more</p>
                    </div>
                  )}
                </div>

                <div className="space-y-3">
                  {!meetsMin ? (
                    <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl flex items-start gap-2">
                      <AlertCircle size={14} className="text-amber-500 shrink-0 mt-0.5" />
                      <p className="text-[10px] text-amber-700 leading-relaxed font-medium">
                        Booking requires minimum <strong>₹5,000</strong>. Please add more activities to proceed.
                      </p>
                    </div>
                  ) : (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-500" />
                      <p className="text-[10px] text-emerald-700 font-bold">Minimum amount met! You can proceed.</p>
                    </div>
                  )}

                  <button onClick={onPay} disabled={!meetsMin}
                    className={`w-full py-4 rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-2 ${meetsMin ? 'bg-blue-600 hover:bg-blue-700 text-white cursor-pointer shadow-lg shadow-blue-200 active:scale-95' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}>
                    {meetsMin ? `Proceed to Pay ₹${total.toLocaleString()}` : `Needs ₹5,000 to Book`}
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
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState<CartItem[]>(() => {
    // Initial load from localStorage
    const saved = localStorage.getItem('sky_trip_water_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [showModal, setShowModal] = useState(false);
  const [paying, setPaying] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [successData, setSuccessData] = useState<{ items: CartItem[]; total: number; name: string } | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Sync cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('sky_trip_water_cart', JSON.stringify(cart));
  }, [cart]);

  // Fetch without showing spinner (for background polls)
  const fetchActivities = async (showLoader = false) => {
    if (showLoader) setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/water-activities`);
      const data = await res.json();
      if (data.success) setActivities(data.data);
    } catch (err) {
      console.error('Failed to fetch activities', err);
    } finally {
      if (showLoader) setLoading(false);
    }
  };

  useEffect(() => {
    // First load with spinner
    fetchActivities(true);
    // Background poll every 60s — NO spinner, NO loading state
    intervalRef.current = setInterval(() => fetchActivities(false), 60000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, []);

  const addToCart = (item: CartItem) => {
    setCart(prev => {
      const exists = prev.findIndex(c => c.activityId === item.activityId);
      if (exists >= 0) { const u = [...prev]; u[exists] = item; return u; }
      return [...prev, item];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (activityId: string) => setCart(prev => prev.filter(i => i.activityId !== activityId));
  const clearCart = () => setCart([]);

  // ── Payment Flow (correct order) ──────────────────────────────────────────
  // 1. User clicks Pay → Modal opens for guest details
  // 2. User fills → Razorpay opens
  // 3. Payment SUCCESS → THEN book seats via API
  // 4. Payment FAIL/CANCEL → No seat change
  const handlePay = () => setShowModal(true);

  const handleConfirmPayment = async (name: string, email: string, phone: string) => {
    setPaying(true);
    try {
      const total = cart.reduce((a, i) => a + i.totalPrice, 0);

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
          notes: { package: 'Tehri Water Adventure', userId: 'Guest' },
          items: cart.map(i => ({
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
              // Step 5: ONLY NOW deduct seats
              const bookRes = await fetch(`${API_BASE_URL}/water-activities/book`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  cartItems: cart.map(i => ({
                    activityId: i.activityId,
                    persons: i.persons,
                    durationLabel: i.selectedDuration?.label || null,
                  })),
                }),
              });
              const bookData = await bookRes.json();

              if (bookData.success) {
                // Show premium success popup
                setSuccessData({ items: [...cart], total, name });
                setShowSuccess(true);
              }

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

  const cartTotal = cart.reduce((a, i) => a + i.totalPrice, 0);

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
            Book your tickets in advance to avoid walk-in rush.{' '}
            <span className="font-bold text-amber-600">Minimum booking: ₹5,000.</span>
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
          {/* Activity Cards */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 gap-4">
                <Loader2 size={40} className="animate-spin text-blue-500" />
                <p className="text-slate-400 text-sm font-medium animate-pulse">Loading activities...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {activities.map(a => <ActivityCard key={a._id} activity={a} onAddToCart={addToCart} />)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Cart Button */}
      {cart.length > 0 && (
        <motion.button
          initial={{ scale: 0, y: 100 }}
          animate={{ scale: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-8 left-8 z-40 bg-blue-600 text-white p-5 rounded-full shadow-2xl shadow-blue-300 flex items-center gap-3 group cursor-pointer"
        >
          <div className="relative">
            <ShoppingCart size={24} />
            <span className="absolute -top-3 -right-3 w-6 h-6 bg-rose-500 text-white text-[11px] font-bold rounded-full flex items-center justify-center ring-4 ring-blue-600">
              {cart.length}
            </span>
          </div>
          <div className="pr-2 text-left">
            <p className="text-[10px] font-bold uppercase tracking-widest opacity-70">Checkout</p>
            <p className="text-sm font-bold">₹{cartTotal.toLocaleString()}</p>
          </div>
        </motion.button>
      )}

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
          <GuestModal total={cartTotal} onConfirm={handleConfirmPayment} onClose={() => setShowModal(false)} loading={paying} />
        )}
      </AnimatePresence>

      {/* Payment Success Modal */}
      <AnimatePresence>
        {showSuccess && successData && (
          <SuccessModal
            bookedItems={successData.items}
            total={successData.total}
            customerName={successData.name}
            onClose={() => { setShowSuccess(false); setSuccessData(null); }}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default WaterAdventureSection;
