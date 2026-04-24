import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  User, 
  CreditCard, 
  Phone, 
  Mail, 
  ExternalLink, 
  Loader2,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  Waves,
  ShieldCheck
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
  razorpayPaymentId?: string;
  items: OrderItem[];
  bookingDate: string;
  createdAt: string;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const { token } = useAuth();

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/payment/orders`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setOrders(data.data);
      } else {
        throw new Error(data.error);
      }
    } catch (err: any) {
      toast.error('Failed to fetch orders: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.razorpayOrderId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  // Pagination Logic
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, startIndex + itemsPerPage);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when search/filter changes
  }, [searchTerm, statusFilter]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full border border-emerald-100 flex items-center gap-1 w-fit uppercase tracking-wider"><CheckCircle2 size={12} /> Paid</span>;
      case 'failed':
        return <span className="px-3 py-1 bg-red-50 text-red-600 text-[10px] font-bold rounded-full border border-red-100 flex items-center gap-1 w-fit uppercase tracking-wider"><XCircle size={12} /> Failed</span>;
      default:
        return <span className="px-3 py-1 bg-amber-50 text-amber-600 text-[10px] font-bold rounded-full border border-amber-100 flex items-center gap-1 w-fit uppercase tracking-wider"><Clock size={12} /> {status}</span>;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <Loader2 className="animate-spin text-primary" size={40} />
        <p className="text-text-secondary font-medium animate-pulse">Loading adventure bookings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10">
      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-surface p-4 rounded-2xl border border-border shadow-sm">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
          <input 
            type="text" 
            placeholder="Search by name, email or order ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-primary transition-all"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Filter size={18} className="text-text-secondary" />
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="flex-1 md:w-40 bg-slate-50 border border-slate-200 rounded-xl text-sm px-3 py-2 focus:outline-none focus:border-primary cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="paid">Paid</option>
            <option value="created">Created</option>
            <option value="failed">Failed</option>
          </select>
          <button onClick={fetchOrders} className="p-2 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-all text-text-secondary">
             <ExternalLink size={18} />
          </button>
        </div>
      </div>

      {/* Orders List */}
      <div className="grid grid-cols-1 gap-4">
        {currentOrders.length === 0 ? (
          <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <p className="text-4xl mb-4">📜</p>
            <p className="font-bold text-text-primary mb-2">No bookings found</p>
            <p className="text-text-secondary text-sm">Try adjusting your search or filters.</p>
          </div>
        ) : (
          currentOrders.map((order, idx) => (
            <motion.div 
              key={order._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-surface border border-border rounded-2xl overflow-hidden hover:shadow-premium transition-all group"
            >
              <div className="p-6">
                <div className="flex flex-col lg:flex-row justify-between gap-6">
                  {/* Left: Customer Info */}
                  <div className="space-y-4 flex-1">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl shrink-0">
                        <User size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-text-primary text-base">{order.customerName}</h4>
                        <div className="flex flex-wrap gap-4 mt-1 text-text-secondary text-xs">
                          <span className="flex items-center gap-1"><Mail size={12} /> {order.customerEmail}</span>
                          <span className="flex items-center gap-1"><Phone size={12} /> {order.customerPhone}</span>
                          {order.customerAadhar && (
                            <span className="flex items-center gap-1 text-blue-600 font-bold bg-blue-50 px-1.5 py-0.5 rounded">
                              <ShieldCheck size={12} /> {order.customerAadhar}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-6 pl-12">
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Visit Date</p>
                        <p className="text-sm font-bold text-emerald-600 flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-100">
                          <CalendarIcon size={14} /> {order.bookingDate ? new Date(order.bookingDate).toLocaleDateString('en-IN', { dateStyle: 'long' }) : 'Not Specified'}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">Booking Date</p>
                        <p className="text-xs font-medium text-text-primary flex items-center gap-1">
                          <Clock size={12} className="text-slate-400" /> {new Date(order.createdAt).toLocaleString('en-IN')}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Middle: Items */}
                  <div className="flex-1 lg:border-x border-slate-100 lg:px-8">
                    <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Waves size={10} className="text-blue-500" /> Booked Activities
                    </p>
                    <div className="space-y-2">
                      {order.items.map((item, i) => (
                        <div key={i} className="flex justify-between items-center text-sm bg-slate-50/50 border border-slate-100 p-2.5 rounded-xl">
                          <span className="font-bold text-text-primary flex items-center gap-2">
                            <span className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm border border-slate-100">{item.emoji}</span> 
                            {item.name}
                          </span>
                          <div className="text-right">
                            <span className="text-[10px] block text-slate-400 font-bold uppercase tracking-tighter">Qty</span>
                            <span className="text-blue-600 font-black">x{item.persons}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Payment Info */}
                  <div className="lg:w-64 space-y-4 text-right flex flex-col justify-between">
                    <div>
                      <div className="flex justify-end mb-2">{getStatusBadge(order.status)}</div>
                      <p className="text-2xl font-bold text-text-primary">₹{(order.amount / 100).toLocaleString()}</p>
                      <p className="text-[10px] font-medium text-slate-400 mt-1 flex items-center justify-end gap-1 uppercase tracking-tight">
                        <CreditCard size={10} /> ID: {order.razorpayOrderId}
                      </p>
                    </div>
                    {order.razorpayPaymentId && (
                      <p className="text-[10px] text-emerald-600 font-bold bg-emerald-50 py-1 px-2 rounded inline-block">
                        Payment ID: {order.razorpayPaymentId}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Progress Bar for Paid Orders */}
              {order.status === 'paid' && (
                <div className="h-1 w-full bg-emerald-500 opacity-20" />
              )}
            </motion.div>
          ))
        )}
      </div>

      {/* Pagination Controller */}
      {totalPages > 1 && (
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-border shadow-sm mt-6">
          <p className="text-xs text-text-secondary font-medium">
            Showing <span className="text-text-primary font-bold">{startIndex + 1}</span> to <span className="text-text-primary font-bold">{Math.min(startIndex + itemsPerPage, filteredOrders.length)}</span> of <span className="text-text-primary font-bold">{filteredOrders.length}</span> bookings
          </p>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-xs font-bold bg-slate-50 text-text-secondary rounded-xl border border-slate-200 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Previous
            </button>
            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 flex items-center justify-center rounded-xl text-xs font-bold transition-all ${
                    currentPage === i + 1 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' 
                    : 'bg-slate-50 text-text-secondary border border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <button 
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-xs font-bold bg-slate-50 text-text-secondary rounded-xl border border-slate-200 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
