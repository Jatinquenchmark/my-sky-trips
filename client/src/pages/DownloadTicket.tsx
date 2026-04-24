import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Download, CheckCircle2, AlertCircle, Home, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import LogoImg from '../assets/logo-DFfutrEX.png';

const DownloadTicket = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const ticketRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const baseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace(/\/+api\/*$/, '');
        const response = await fetch(`${baseUrl}/api/payment/order/${orderId}`);
        const data = await response.json();
        if (data.success) {
          setOrder(data.data);
          // Auto-trigger download after a short delay
          setTimeout(() => handleDownload(data.data), 1500);
        } else {
          setError(data.error || "Order not found");
        }
      } catch (err) {
        setError("Failed to load ticket details");
      } finally {
        setLoading(false);
      }
    };

    if (orderId) fetchOrder();
  }, [orderId]);

  const handleDownload = async (orderData: any) => {
    if (!ticketRef.current) return;
    setDownloading(true);
    const toastId = toast.loading('Generating your ticket...');
    
    try {
      // Small delay to ensure everything is settled
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const canvas = await html2canvas(ticketRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
        onclone: (clonedDoc) => {
          const el = clonedDoc.querySelector('[data-ticket-container]');
          if (el instanceof HTMLElement) {
             el.style.boxShadow = 'none';
             el.style.borderRadius = '0';
          }
        }
      });
      
      const link = document.createElement('a');
      link.download = `Ticket_MYSKYTRIPS_${orderData.customerName.replace(/\s+/g, '_')}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
      toast.success('Ticket downloaded!', { id: toastId });
    } catch (err) {
      console.error('Download failed', err);
      toast.error('Download failed. Try again or take a screenshot.', { id: toastId });
    } finally {
      setDownloading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-center">
        <Loader2 className="w-12 h-12 text-[#004D56] animate-spin mb-4" />
        <h2 className="text-2xl font-bold text-[#0F172A]">Fetching your ticket...</h2>
        <p className="text-[#64748B] mt-2 font-medium">Please wait a moment</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-6">
          <AlertCircle className="w-10 h-10 text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-[#0F172A]">{error}</h2>
        <p className="text-[#64748B] mt-2 mb-8 font-medium">We couldn't find your booking details.</p>
        <Link to="/">
          <Button variant="outline" className="gap-2">
            <Home className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
      </div>
    );
  }

  const totalPaid = order.amount / 100;

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-[500px] w-full text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 bg-[#E6FFFA] text-[#00A389] px-4 py-2 rounded-full font-bold text-sm mb-4 border border-[#B2F5EA]">
          <CheckCircle2 className="w-4 h-4" />
          Booking Confirmed
        </div>
        <h1 className="text-3xl font-black text-[#0F172A] tracking-tight mb-2">Your Adventure Awaits!</h1>
        <p className="text-[#64748B] font-medium">Your ticket is being downloaded automatically. If it doesn't start, click the button below.</p>
      </motion.div>

      {/* Ticket Render (Hidden from view but used for capture) */}
      <div className="fixed -left-[9999px] top-0">
        <div 
          ref={ticketRef}
          data-ticket-container
          className="w-[500px] bg-white rounded-[40px] overflow-hidden shadow-2xl border border-slate-100 font-sans"
        >
          {/* Header */}
          <div className="bg-[#004D56] p-8 text-white relative">
             <div className="flex justify-between items-start mb-6">
               <div className="flex flex-col">
                 <img src={LogoImg} alt="MYSKYTRIPS" crossOrigin="anonymous" className="h-10 w-auto mb-2 brightness-0 invert" />
                 <span className="text-xl font-black tracking-tighter">
                   MYSKYTRIPS
                 </span>
               </div>
               <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center">
                 <span className="text-xs font-bold italic">i</span>
               </div>
             </div>
             
             <div className="mb-4">
               <span className="inline-block px-3 py-1 bg-white/10 rounded-full text-[10px] font-black uppercase tracking-wider text-[#00F2FF] mb-2">
                 Water Sports
               </span>
               <h2 className="text-2xl font-black leading-tight uppercase">
                 {order.items.map((i: any) => i.name).join(' + ')}
               </h2>
               <p className="text-white/60 text-xs font-medium mt-1">Tehri Lake Adventure Hub, Uttarakhand</p>
             </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-2 gap-y-6 mb-8">
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Date</p>
                <p className="font-bold text-slate-900">
                  {order.bookingDate ? new Date(order.bookingDate).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' }) : 'TBA'}
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
                <p className="font-bold text-slate-900">Tehri Lake Adventure Zone</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-6 bg-slate-50 rounded-3xl mb-8 border border-slate-100">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-slate-100">
                {order.items[0]?.emoji || '🎫'}
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Booking ID</p>
                <p className="font-black text-slate-900 text-lg tracking-tight uppercase">MST-{order.razorpayOrderId.slice(-8)}</p>
              </div>
              <div className="bg-[#E6FFFA] text-[#00A389] px-3 py-1.5 rounded-xl font-black text-[10px] uppercase border border-[#B2F5EA]">
                Paid
              </div>
            </div>

            <div className="flex items-center gap-4 mb-8">
               <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-3xl font-black text-slate-300 border-2 border-dashed border-slate-200">
                 {order.customerName.charAt(0)}
               </div>
               <div>
                 <h3 className="text-xl font-black text-slate-900 leading-tight">{order.customerName}</h3>
                 <p className="text-xs font-bold text-slate-500 mt-1">Ticket #1 — Adult Package</p>
               </div>
            </div>

            <div className="pt-8 border-t-2 border-dashed border-slate-100 mb-8">
               <div className="flex justify-between items-baseline">
                 <span className="text-sm font-bold text-slate-400 italic">Total Paid (incl. GST)</span>
                 <span className="text-4xl font-black text-[#004D56] tracking-tighter">₹{totalPaid.toLocaleString()}</span>
               </div>
            </div>

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
            
            <div className="mt-10 text-center">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">
                Help: +91 98765 43210 | SUPPORT@MYSKYTRIPS.COM
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-[300px]">
        <Button 
          onClick={() => handleDownload(order)}
          disabled={downloading}
          className="bg-[#004D56] hover:bg-[#003A41] text-white h-14 rounded-2xl font-black text-sm uppercase tracking-wider shadow-lg gap-2"
        >
          {downloading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
          {downloading ? 'Generating...' : 'Download Ticket Again'}
        </Button>
        <Link to="/" className="w-full">
          <Button variant="outline" className="w-full h-14 rounded-2xl font-black text-sm uppercase tracking-wider text-slate-600 gap-2">
            <Home className="w-5 h-5" />
            Go to Website
          </Button>
        </Link>
      </div>

      <div className="mt-12 text-slate-400 text-xs font-medium max-w-[400px] text-center leading-relaxed">
        This is an official digital ticket. Please present this image or the booking ID at the counter upon arrival at the venue.
      </div>
    </div>
  );
};

export default DownloadTicket;
