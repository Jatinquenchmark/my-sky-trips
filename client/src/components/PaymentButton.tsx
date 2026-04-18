import React, { useState } from 'react';
import { Button } from './ui/button';
import { loadRazorpayScript } from '@/lib/razorpay';
import { useAuth } from '@/admin/context/AuthContext';
import { toast } from 'sonner';
import { API_BASE_URL as BASE_URL } from '../lib/api';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface PaymentButtonProps {
    amount: number;
    packageName: string;
    onSuccess?: (data: any) => void;
    onError?: (error: any) => void;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({ amount, packageName, onSuccess, onError }) => {
    const [loading, setLoading] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [guestDetails, setGuestDetails] = useState({
        name: '',
        email: '',
        phone: ''
    });

    const { token, user } = useAuth();
    const API_BASE_URL = `${BASE_URL}/payment`;

    const handleInitiatePayment = () => {
        if (token) {
            // Logged in, proceed directly
            handlePayment(user.name, user.email, "");
        } else {
            // Not logged in, ask for details
            setIsDialogOpen(true);
        }
    };

    const handleGuestSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!guestDetails.name || !guestDetails.email || !guestDetails.phone) {
            toast.error("Please fill all details to proceed.");
            return;
        }
        setIsDialogOpen(false);
        handlePayment(guestDetails.name, guestDetails.email, guestDetails.phone);
    };

    const handlePayment = async (name: string, email: string, phone: string) => {
        setLoading(true);

        try {
            // 1. Load Razorpay Script
            const isLoaded = await loadRazorpayScript();
            if (!isLoaded) {
                toast.error("Razorpay SDK failed to load. Are you online?");
                setLoading(false);
                return;
            }

            // 2. Create Order on Backend
            const orderRes = await fetch(`${API_BASE_URL}/create-order`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // token is optional now for guest checkout
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                },
                body: JSON.stringify({
                    amount,
                    currency: 'INR',
                    customerName: name,
                    customerEmail: email,
                    customerPhone: phone,
                    notes: {
                        package: packageName,
                        userId: user?.id || "Guest"
                    }
                })
            });

            const orderData = await orderRes.json();

            if (!orderData.success) {
                throw new Error(orderData.error || "Failed to create order");
            }

            const { orderId, amount: orderAmount, currency } = orderData.data;

            // 3. Configure Razorpay Options
            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID || "your_key_id_here",
                amount: orderAmount,
                currency: currency,
                name: "Sky Trip",
                description: `Payment for ${packageName}`,
                image: "/logo.png",
                order_id: orderId,
                handler: async (response: any) => {
                    try {
                        const verifyRes = await fetch(`${API_BASE_URL}/verify-payment`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                            },
                            body: JSON.stringify({
                                razorpay_order_id: response.razorpay_order_id,
                                razorpay_payment_id: response.razorpay_payment_id,
                                razorpay_signature: response.razorpay_signature,
                            })
                        });

                        const verifyData = await verifyRes.json();

                        if (verifyData.success) {
                            toast.success("Payment Successful!");
                            if (onSuccess) onSuccess(verifyData.data);
                        } else {
                            toast.error(verifyData.error || "Payment verification failed");
                            if (onError) onError(verifyData.error);
                        }
                    } catch (err: any) {
                        toast.error(err.message || "An error occurred during verification");
                        if (onError) onError(err);
                    }
                },
                prefill: {
                    name,
                    email,
                    contact: phone,
                },
                theme: {
                    color: "#3b82f6",
                },
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.on('payment.failed', function (response: any) {
                toast.error(response.error.description);
                if (onError) onError(response.error);
            });
            rzp.open();

        } catch (err: any) {
            console.error("Payment Error:", err);
            toast.error(err.message || "Something went wrong");
            if (onError) onError(err);
        } finally {
            setLoading(false);
        }
    };

    const formatAmount = (amt: number) =>
        new Intl.NumberFormat('en-IN').format(amt);

    return (
        <>
            <Button 
                onClick={handleInitiatePayment} 
                disabled={loading}
                className="w-full py-6 text-lg font-bold bg-primary hover:bg-primary/90 shadow-soft-primary rounded-xl transition-all"
            >
                {loading ? "Processing..." : `Pay ₹${amount}`}
            </Button>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="p-0 overflow-hidden border-0 shadow-2xl" style={{ maxWidth: '460px', borderRadius: '20px' }}>
                    
                    {/* ── Gradient Header ── */}
                    <div style={{
                        background: 'linear-gradient(135deg, #1a56db 0%, #0e3fa8 60%, #0a2d7a 100%)',
                        padding: '28px 28px 24px',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        {/* decorative blobs */}
                        <div style={{ position:'absolute', top:-30, right:-30, width:120, height:120, borderRadius:'50%', background:'rgba(255,255,255,0.07)' }} />
                        <div style={{ position:'absolute', bottom:-20, left:-20, width:80, height:80, borderRadius:'50%', background:'rgba(255,255,255,0.05)' }} />

                        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:8 }}>
                            <div style={{
                                width:44, height:44, background:'rgba(255,255,255,0.15)',
                                borderRadius:12, display:'flex', alignItems:'center', justifyContent:'center',
                                backdropFilter:'blur(8px)'
                            }}>
                                {/* plane icon */}
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                                    <path d="M21 16v-2l-8-5V3.5A1.5 1.5 0 0 0 11.5 2 1.5 1.5 0 0 0 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z"/>
                                </svg>
                            </div>
                            <div>
                                <DialogTitle style={{ color:'white', fontSize:20, fontWeight:700, margin:0, lineHeight:1.2 }}>
                                    Complete Your Booking
                                </DialogTitle>
                                <p style={{ color:'rgba(255,255,255,0.75)', fontSize:13, margin:0, marginTop:2 }}>
                                    {packageName}
                                </p>
                            </div>
                        </div>

                        {/* Amount pill */}
                        <div style={{
                            display:'inline-flex', alignItems:'center', gap:6,
                            background:'rgba(255,255,255,0.15)', backdropFilter:'blur(8px)',
                            borderRadius:50, padding:'6px 14px', marginTop:4
                        }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="rgba(255,255,255,0.9)">
                                <path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/>
                            </svg>
                            <span style={{ color:'white', fontWeight:700, fontSize:16 }}>
                                ₹{formatAmount(amount)}
                            </span>
                        </div>
                    </div>

                    {/* ── Form Body ── */}
                    <form onSubmit={handleGuestSubmit} style={{ padding:'24px 28px 28px', background:'#fff' }}>
                        <p style={{ color:'#6b7280', fontSize:13, marginBottom:20, marginTop:0 }}>
                            Fill in your details to proceed with secure payment via Razorpay.
                        </p>

                        <div style={{ display:'flex', flexDirection:'column', gap:16 }}>

                            {/* Name */}
                            <div style={{ position:'relative' }}>
                                <label htmlFor="guest-name" style={{ display:'block', fontSize:12, fontWeight:600, color:'#374151', marginBottom:6, letterSpacing:'0.03em', textTransform:'uppercase' }}>
                                    Full Name
                                </label>
                                <div style={{ position:'relative' }}>
                                    <span style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'#9ca3af' }}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
                                        </svg>
                                    </span>
                                    <input
                                        id="guest-name"
                                        type="text"
                                        placeholder="Enter your full name"
                                        value={guestDetails.name}
                                        onChange={(e) => setGuestDetails({...guestDetails, name: e.target.value})}
                                        required
                                        style={{
                                            width:'100%', padding:'11px 12px 11px 38px',
                                            border:'1.5px solid #e5e7eb', borderRadius:10,
                                            fontSize:14, color:'#111827', outline:'none',
                                            transition:'border-color 0.2s, box-shadow 0.2s',
                                            boxSizing:'border-box', background:'#f9fafb'
                                        }}
                                        onFocus={e => { e.target.style.borderColor='#1a56db'; e.target.style.boxShadow='0 0 0 3px rgba(26,86,219,0.12)'; e.target.style.background='#fff'; }}
                                        onBlur={e => { e.target.style.borderColor='#e5e7eb'; e.target.style.boxShadow='none'; e.target.style.background='#f9fafb'; }}
                                    />
                                </div>
                            </div>

                            {/* Email */}
                            <div style={{ position:'relative' }}>
                                <label htmlFor="guest-email" style={{ display:'block', fontSize:12, fontWeight:600, color:'#374151', marginBottom:6, letterSpacing:'0.03em', textTransform:'uppercase' }}>
                                    Email Address
                                </label>
                                <div style={{ position:'relative' }}>
                                    <span style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'#9ca3af' }}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"/>
                                        </svg>
                                    </span>
                                    <input
                                        id="guest-email"
                                        type="email"
                                        placeholder="you@example.com"
                                        value={guestDetails.email}
                                        onChange={(e) => setGuestDetails({...guestDetails, email: e.target.value})}
                                        required
                                        style={{
                                            width:'100%', padding:'11px 12px 11px 38px',
                                            border:'1.5px solid #e5e7eb', borderRadius:10,
                                            fontSize:14, color:'#111827', outline:'none',
                                            transition:'border-color 0.2s, box-shadow 0.2s',
                                            boxSizing:'border-box', background:'#f9fafb'
                                        }}
                                        onFocus={e => { e.target.style.borderColor='#1a56db'; e.target.style.boxShadow='0 0 0 3px rgba(26,86,219,0.12)'; e.target.style.background='#fff'; }}
                                        onBlur={e => { e.target.style.borderColor='#e5e7eb'; e.target.style.boxShadow='none'; e.target.style.background='#f9fafb'; }}
                                    />
                                </div>
                            </div>

                            {/* Phone */}
                            <div style={{ position:'relative' }}>
                                <label htmlFor="guest-phone" style={{ display:'block', fontSize:12, fontWeight:600, color:'#374151', marginBottom:6, letterSpacing:'0.03em', textTransform:'uppercase' }}>
                                    Phone Number
                                </label>
                                <div style={{ position:'relative' }}>
                                    <span style={{ position:'absolute', left:12, top:'50%', transform:'translateY(-50%)', color:'#9ca3af' }}>
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                                        </svg>
                                    </span>
                                    <input
                                        id="guest-phone"
                                        type="tel"
                                        placeholder="+91 98765 43210"
                                        value={guestDetails.phone}
                                        onChange={(e) => setGuestDetails({...guestDetails, phone: e.target.value})}
                                        required
                                        style={{
                                            width:'100%', padding:'11px 12px 11px 38px',
                                            border:'1.5px solid #e5e7eb', borderRadius:10,
                                            fontSize:14, color:'#111827', outline:'none',
                                            transition:'border-color 0.2s, box-shadow 0.2s',
                                            boxSizing:'border-box', background:'#f9fafb'
                                        }}
                                        onFocus={e => { e.target.style.borderColor='#1a56db'; e.target.style.boxShadow='0 0 0 3px rgba(26,86,219,0.12)'; e.target.style.background='#fff'; }}
                                        onBlur={e => { e.target.style.borderColor='#e5e7eb'; e.target.style.boxShadow='none'; e.target.style.background='#f9fafb'; }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Pay Button */}
                        <button
                            type="submit"
                            style={{
                                marginTop:24, width:'100%', padding:'14px',
                                background:'linear-gradient(135deg, #1a56db, #0e3fa8)',
                                color:'white', border:'none', borderRadius:12,
                                fontSize:16, fontWeight:700, cursor:'pointer',
                                display:'flex', alignItems:'center', justifyContent:'center', gap:10,
                                boxShadow:'0 4px 15px rgba(26,86,219,0.4)',
                                transition:'transform 0.15s, box-shadow 0.15s'
                            }}
                            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform='translateY(-1px)'; (e.currentTarget as HTMLButtonElement).style.boxShadow='0 6px 20px rgba(26,86,219,0.5)'; }}
                            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform='translateY(0)'; (e.currentTarget as HTMLButtonElement).style.boxShadow='0 4px 15px rgba(26,86,219,0.4)'; }}
                        >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                                <path d="M20 4H4c-1.11 0-2 .89-2 2v12c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/>
                            </svg>
                            Proceed to Pay ₹{formatAmount(amount)}
                        </button>

                        {/* Trust badges */}
                        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:16, marginTop:16 }}>
                            <div style={{ display:'flex', alignItems:'center', gap:5, color:'#6b7280', fontSize:12 }}>
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="#22c55e">
                                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                                </svg>
                                <span>100% Secure</span>
                            </div>
                            <div style={{ display:'flex', alignItems:'center', gap:5, color:'#6b7280', fontSize:12 }}>
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="#3b82f6">
                                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
                                </svg>
                                <span>Encrypted Payment</span>
                            </div>
                            <div style={{ display:'flex', alignItems:'center', gap:5, color:'#6b7280', fontSize:12 }}>
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="#f59e0b">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                                </svg>
                                <span>Razorpay</span>
                            </div>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default PaymentButton;
