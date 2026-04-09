import { useState, cloneElement, isValidElement } from "react";
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
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { EnquiryAnimation } from "./EnquiryAnimation";
import { AnimatePresence } from "framer-motion";

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
                <DialogContent className="sm:max-w-[600px] bg-card border-border">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-serif font-bold text-gradient-sky">
                            Plan Your Journey
                        </DialogTitle>
                        <DialogDescription>
                            Fill in the details below and our travel experts will contact you soon.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="w-full h-[500px] overflow-hidden rounded-lg border border-border bg-background/50">
                        <iframe
                            src="https://docs.google.com/forms/d/e/1FAIpQLSeoQQ_MRmgTWWM1-EKTo-Z6pWALUK34g5BwNcWnkpkMcDdK1Q/viewform?embedded=true"
                            className="w-full h-full border-0"
                            title="Enquiry Form"
                        >
                            Loading…
                        </iframe>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};
