import { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Download, CheckCircle2, AlertCircle, Home, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import { Ticket } from "@/components/Ticket";

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
          setTimeout(() => handleDownload(data.data), 2500);
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
    
    const captureTarget = document.getElementById('ticket-capture-area');
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

      // Small delay to ensure everything is settled
      await new Promise(resolve => setTimeout(resolve, 2000));
      
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
        link.download = `Ticket_MYSKYTRIPS_${orderData.customerName.replace(/\s+/g, '_')}.png`;
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
        const printWindow = window.open('', '_blank');
        if (printWindow) {
          const ticketHtml = captureTarget?.innerHTML;
          printWindow.document.write(`
            <html>
              <head>
                <title>MYSKYTRIPS Ticket - ${orderData.customerName}</title>
                <script src="https://cdn.tailwindcss.com"></script>
                <style>
                  @media print { .no-print { display: none; } }
                  body { background: #f8fafc; padding: 20px; font-family: sans-serif; }
                </style>
              </head>
              <body>
                <div class="max-w-[500px] mx-auto bg-white shadow-xl rounded-[2.5rem] overflow-hidden">
                  ${ticketHtml}
                </div>
                <div class="text-center mt-8 no-print">
                  <button onclick="window.print()" style="background: #004D56; color: white; padding: 12px 24px; border-radius: 12px; font-weight: bold; cursor: pointer;">
                    Print or Save as PDF
                  </button>
                </div>
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
        <p className="text-[#64748B] font-medium text-sm">Your ticket is being downloaded automatically.</p>
      </motion.div>

      {/* Unified Ticket Component */}
      <div className="w-full mb-10">
        <Ticket 
          bookedItems={order.items}
          total={order.amount / 100}
          customerName={order.customerName}
          bookingDate={order.bookingDate}
          orderId={order.razorpayOrderId}
        />
      </div>

      {/* Off-screen capture area */}
      <div id="ticket-capture-area" className="absolute left-[-9999px] top-0">
        <Ticket 
          bookedItems={order.items}
          total={order.amount / 100}
          customerName={order.customerName}
          bookingDate={order.bookingDate}
          orderId={order.razorpayOrderId}
        />
      </div>

      <div className="flex flex-col gap-4 w-full max-w-[300px]">
        <Button 
          onClick={() => handleDownload(order)}
          disabled={downloading}
          className="bg-[#004D56] hover:bg-[#003A41] text-white h-14 rounded-2xl font-black text-sm uppercase tracking-wider shadow-lg gap-2 cursor-pointer"
        >
          {downloading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
          {downloading ? 'Generating...' : 'Download Ticket Again'}
        </Button>
        <Link to="/" className="w-full">
          <Button variant="outline" className="w-full h-14 rounded-2xl font-black text-sm uppercase tracking-wider text-slate-600 gap-2 cursor-pointer">
            <Home className="w-5 h-5" />
            Go to Website
          </Button>
        </Link>
      </div>

      <div className="mt-12 text-slate-400 text-[10px] font-black uppercase tracking-widest max-w-[400px] text-center leading-relaxed">
        This is an official digital ticket of MYSKYTRIPS.
      </div>
    </div>
  );
};

export default DownloadTicket;
