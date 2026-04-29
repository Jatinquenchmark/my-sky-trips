import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Users,
  IndianRupee,
  Loader2,
  ChevronDown,
  ChevronUp,
  Phone,
  Mail,
  ShieldCheck,
  Waves,
  RefreshCw,
  CalendarDays,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../../lib/api';

interface OrderItem {
  name: string;
  persons: number;
  totalPrice: number;
  emoji: string;
  duration?: string;
}

interface Order {
  _id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAadhar?: string;
  amount: number;
  status: string;
  razorpayOrderId: string;
  items: OrderItem[];
  bookingDate: string;
  createdAt: string;
}

interface DateGroup {
  date: string;
  orders: Order[];
  totalRevenue: number;
  totalPersons: number;
}

const BookingsByDate = () => {
  const [groups, setGroups] = useState<DateGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedDates, setExpandedDates] = useState<Set<string>>(new Set());
  const { token } = useAuth();

  const fetchByDate = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/payment/orders-by-date`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        setGroups(data.data);
        // Auto-expand today's date if present
        const today = new Date().toISOString().split('T')[0];
        const hasToday = data.data.some((g: DateGroup) => g.date === today);
        if (hasToday) setExpandedDates(new Set([today]));
        else if (data.data.length > 0) setExpandedDates(new Set([data.data[0].date]));
      } else {
        throw new Error(data.error);
      }
    } catch (err: any) {
      toast.error('Failed to load bookings: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchByDate();
  }, []);

  const toggleDate = (date: string) => {
    setExpandedDates(prev => {
      const next = new Set(prev);
      if (next.has(date)) next.delete(date);
      else next.add(date);
      return next;
    });
  };

  const formatDate = (dateStr: string) => {
    if (dateStr === 'unspecified') return 'Date Not Specified';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  };

  const isToday = (dateStr: string) => {
    return dateStr === new Date().toISOString().split('T')[0];
  };

  const isTomorrow = (dateStr: string) => {
    const tmr = new Date();
    tmr.setDate(tmr.getDate() + 1);
    return dateStr === tmr.toISOString().split('T')[0];
  };

  const getDateLabel = (dateStr: string) => {
    if (isToday(dateStr)) return '🔴 TODAY';
    if (isTomorrow(dateStr)) return '🟡 TOMORROW';
    const d = new Date(dateStr);
    const now = new Date();
    if (d < now) return '✅ PAST';
    return '📅 UPCOMING';
  };

  const totalBookings = groups.reduce((s, g) => s + g.orders.length, 0);
  const totalRevenue = groups.reduce((s, g) => s + g.totalRevenue, 0);
  const totalPersons = groups.reduce((s, g) => s + g.totalPersons, 0);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <Loader2 className="animate-spin text-primary" size={44} />
        <p className="text-text-secondary font-medium animate-pulse">Loading all bookings by date...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-16">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Bookings', value: totalBookings, icon: CalendarDays, color: 'bg-blue-50 text-blue-600' },
          { label: 'Total Revenue', value: `₹${(totalRevenue / 100).toLocaleString('en-IN')}`, icon: IndianRupee, color: 'bg-emerald-50 text-emerald-600' },
          { label: 'Total Visitors', value: totalPersons, icon: Users, color: 'bg-purple-50 text-purple-600' },
        ].map(stat => (
          <div key={stat.label} className="bg-surface border border-border rounded-2xl p-5 flex items-center gap-4 shadow-sm">
            <div className={`p-3 rounded-xl ${stat.color}`}>
              <stat.icon size={22} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">{stat.label}</p>
              <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Refresh */}
      <div className="flex justify-end">
        <button
          onClick={fetchByDate}
          className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-text-secondary bg-white border border-border rounded-xl hover:bg-slate-50 transition-all"
        >
          <RefreshCw size={14} /> Refresh
        </button>
      </div>

      {/* Date Groups */}
      {groups.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <p className="text-5xl mb-4">📅</p>
          <p className="font-bold text-text-primary text-lg mb-1">No bookings yet</p>
          <p className="text-text-secondary text-sm">All confirmed bookings will appear here grouped by date.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {groups.map((group) => {
            const isExpanded = expandedDates.has(group.date);
            const today = isToday(group.date);

            return (
              <div
                key={group.date}
                className={`bg-surface border rounded-2xl overflow-hidden shadow-sm transition-all ${today ? 'border-blue-300 ring-2 ring-blue-100' : 'border-border'}`}
              >
                {/* Date Header */}
                <button
                  onClick={() => toggleDate(group.date)}
                  className="w-full flex items-center justify-between p-5 hover:bg-slate-50/60 transition-colors text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${today ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                      <Calendar size={22} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <h3 className="font-bold text-text-primary text-base">{formatDate(group.date)}</h3>
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          today ? 'bg-blue-100 text-blue-700' :
                          isTomorrow(group.date) ? 'bg-amber-100 text-amber-700' :
                          'bg-slate-100 text-slate-500'
                        }`}>
                          {getDateLabel(group.date)}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-[11px] text-text-secondary font-medium">
                        <span className="flex items-center gap-1"><CalendarDays size={11} /> {group.orders.length} booking{group.orders.length !== 1 ? 's' : ''}</span>
                        <span className="flex items-center gap-1"><Users size={11} /> {group.totalPersons} persons</span>
                        <span className="flex items-center gap-1 text-emerald-600 font-bold"><IndianRupee size={11} /> ₹{(group.totalRevenue / 100).toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-text-secondary">
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </button>

                {/* Orders List */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-border divide-y divide-slate-50">
                        {group.orders.map((order, idx) => (
                          <motion.div
                            key={order._id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.04 }}
                            className="p-5 hover:bg-slate-50/50 transition-colors"
                          >
                            <div className="flex flex-col lg:flex-row justify-between gap-4">
                              {/* Customer Info */}
                              <div className="space-y-1 min-w-0">
                                <div className="flex items-center gap-2">
                                  <p className="font-bold text-text-primary">{order.customerName}</p>
                                  {order.status === 'paid_but_overbooked' && (
                                    <span className="text-[9px] font-black px-2 py-0.5 rounded-full bg-red-100 text-red-600 uppercase tracking-wider">Overbooked</span>
                                  )}
                                </div>
                                <div className="flex flex-wrap gap-3 text-xs text-text-secondary">
                                  <span className="flex items-center gap-1"><Mail size={11} /> {order.customerEmail}</span>
                                  <span className="flex items-center gap-1"><Phone size={11} /> {order.customerPhone}</span>
                                  {order.customerAadhar && (
                                    <span className="flex items-center gap-1 text-blue-600 font-bold"><ShieldCheck size={11} /> {order.customerAadhar}</span>
                                  )}
                                </div>
                                <p className="text-[10px] text-slate-400 font-medium">Booked on: {new Date(order.createdAt).toLocaleString('en-IN')}</p>
                              </div>

                              {/* Activities */}
                              <div className="flex-1 max-w-sm">
                                <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-2 flex items-center gap-1">
                                  <Waves size={10} className="text-blue-400" /> Activities
                                </p>
                                <div className="space-y-1.5">
                                  {order.items.map((item, i) => (
                                    <div key={i} className="flex items-center justify-between bg-slate-50 border border-slate-100 rounded-xl px-3 py-2 text-xs">
                                      <span className="font-bold text-text-primary flex items-center gap-2">
                                        <span>{item.emoji}</span> {item.name}
                                        {item.duration && <span className="text-slate-400 font-normal">({item.duration})</span>}
                                      </span>
                                      <span className="text-blue-600 font-black">×{item.persons}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Amount */}
                              <div className="text-right shrink-0">
                                <p className="text-xl font-bold text-text-primary">₹{(order.amount / 100).toLocaleString('en-IN')}</p>
                                <p className="text-[10px] text-slate-400 font-medium mt-0.5">{order.razorpayOrderId}</p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BookingsByDate;
