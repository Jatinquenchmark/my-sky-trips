import { useState, cloneElement, isValidElement } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { EnquiryAnimation } from "./EnquiryAnimation";
import { AnimatePresence } from "framer-motion";
import { ShieldCheck } from "lucide-react";

interface EnquiryDialogProps {
    children: React.ReactNode;
}

export const EnquiryDialog = ({ children }: EnquiryDialogProps) => {
    const [open, setOpen] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleTriggerClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsAnimating(true);
    };

    const handleAnimationComplete = () => {
        setIsAnimating(false);
        setOpen(true);
    };


    // Clone the child element to attach the click handler
    const trigger = isValidElement(children) ? (
        cloneElement(children as React.ReactElement<any>, {
            onClick: handleTriggerClick,
        })
    ) : (
        <div onClick={handleTriggerClick}>{children}</div>
    );

    return (
        <>
            {trigger}

            <AnimatePresence>
                {isAnimating && (
                    <EnquiryAnimation onComplete={handleAnimationComplete} />
                )}
            </AnimatePresence>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-150 bg-card border-border">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-serif font-bold text-gradient-sky">
                            Plan Your Journey
                        </DialogTitle>
                        <DialogDescription>
                            Fill in the details below and our travel experts will contact you soon.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="w-full h-115 overflow-hidden rounded-xl border border-border bg-background mb-3">
                        <iframe
                            src="https://docs.google.com/forms/d/e/1FAIpQLSeoQQ_MRmgTWWM1-EKTo-Z6pWALUK34g5BwNcWnkpkMcDdK1Q/viewform?embedded=true"
                            className="w-full h-full border-0"
                            title="Enquiry Form"
                        >
                            Loading…
                        </iframe>
                    </div>
                    <div className="p-3 bg-muted/60 rounded-xl border border-border text-[11px] text-muted-foreground leading-relaxed flex items-start gap-2">
                        <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>
                            By submitting your details, you agree to My Sky Trips contacting you via WhatsApp, phone, and email, and confirm you have read our{" "}
                            <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-primary underline font-medium hover:text-primary/80">Privacy Policy</a>
                            {" "}and{" "}
                            <a href="/terms-of-service" target="_blank" rel="noopener noreferrer" className="text-primary underline font-medium hover:text-primary/80">Terms of Service</a>.
                        </span>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};
