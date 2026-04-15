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
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Guest Details</DialogTitle>
                        <DialogDescription>
                            Please provide your contact details to proceed with the booking for {packageName}.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleGuestSubmit}>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">Name</Label>
                                <Input 
                                    id="name" 
                                    className="col-span-3" 
                                    value={guestDetails.name}
                                    onChange={(e) => setGuestDetails({...guestDetails, name: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="email" className="text-right">Email</Label>
                                <Input 
                                    id="email" 
                                    type="email"
                                    className="col-span-3" 
                                    value={guestDetails.email}
                                    onChange={(e) => setGuestDetails({...guestDetails, email: e.target.value})}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="phone" className="text-right">Phone</Label>
                                <Input 
                                    id="phone" 
                                    type="tel"
                                    className="col-span-3" 
                                    value={guestDetails.phone}
                                    onChange={(e) => setGuestDetails({...guestDetails, phone: e.target.value})}
                                    required
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Proceed to Pay ₹{amount}</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default PaymentButton;
