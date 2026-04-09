import { motion } from "framer-motion";
import { Plane } from "lucide-react";
import { useEffect } from "react";
import { createPortal } from "react-dom";

interface EnquiryAnimationProps {
    onComplete: () => void;
}

export const EnquiryAnimation = ({ onComplete }: EnquiryAnimationProps) => {
    useEffect(() => {
        // Disable scroll
        document.body.style.overflow = 'hidden';

        // Shorter, snappier duration (2.5s)
        const timer = setTimeout(onComplete, 2500);

        return () => {
            clearTimeout(timer);
            // Re-enable scroll
            document.body.style.overflow = '';
        };
    }, [onComplete]);

    return createPortal(
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl"
        >
            {/* Container */}
            <div className="relative flex flex-col items-center">

                {/* Pulsing Circles Background */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <motion.div
                        animate={{ scale: [1, 1.5, 2], opacity: [0.5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                        className="w-24 h-24 rounded-full border border-blue-500/30"
                    />
                    <motion.div
                        animate={{ scale: [1, 1.5, 2], opacity: [0.5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
                        className="w-24 h-24 rounded-full border border-blue-500/20 absolute"
                    />
                </div>

                {/* Central Logo */}
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-24 h-24 bg-gradient-to-br from-blue-600 to-blue-900 rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(37,99,235,0.5)] z-10"
                >
                    <Plane className="w-12 h-12 text-white -rotate-45 mb-1 mr-1" strokeWidth={1.5} />
                </motion.div>

                {/* Brand Name */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-8 text-center"
                >
                    <h2 className="text-3xl font-bold text-white tracking-tight font-serif">
                        Sky Trip
                    </h2>
                    <p className="text-blue-400 text-xs uppercase tracking-[0.3em] mt-2">
                        Loading Experience
                    </p>
                </motion.div>

                {/* Loading Dots */}
                <div className="flex gap-2 mt-6">
                    {[0, 1, 2].map((i) => (
                        <motion.div
                            key={i}
                            animate={{ y: [0, -6, 0] }}
                            transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
                            className="w-2 h-2 bg-blue-500 rounded-full"
                        />
                    ))}
                </div>

            </div>
        </motion.div>,
        document.body
    );
};
