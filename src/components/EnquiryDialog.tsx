import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface EnquiryDialogProps {
    children: React.ReactNode;
}

export const EnquiryDialog = ({ children }: EnquiryDialogProps) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setLoading(false);
        setOpen(false);
        toast.success("Enquiry Sent Successfully!", {
            description: "We will get back to you shortly.",
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[600px] bg-card border-border">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-serif font-bold text-gradient-sky">
                        Plan Your Journey
                    </DialogTitle>
                    <DialogDescription>
                        Fill in the details below and our travel experts will contact you soon.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                placeholder="e.g. Rahul Sharma"
                                required
                                className="bg-background/50"
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                id="phone"
                                type="tel"
                                placeholder="+91 98765 43210"
                                required
                                className="bg-background/50"
                            />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="rahul@example.com"
                            required
                            className="bg-background/50"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="message">Message (Optional)</Label>
                        <Textarea
                            id="message"
                            placeholder="Tell us about your travel plans..."
                            className="resize-none bg-background/50"
                        />
                    </div>
                    <Button type="submit" variant="saffron" className="w-full mt-2" disabled={loading}>
                        {loading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Sending...
                            </>
                        ) : (
                            "Send Enquiry"
                        )}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};
