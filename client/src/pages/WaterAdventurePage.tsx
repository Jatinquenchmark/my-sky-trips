import React, { useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { WaterAdventureSection } from '@/components/WaterAdventureSection';
import { motion } from 'framer-motion';

const WaterAdventurePage = () => {
  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20">
        <div className="bg-blue-600 py-16 relative overflow-hidden">
           {/* Decorative elements */}
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
           <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
           
           <div className="container mx-auto px-4 relative z-10 text-center">
             <motion.h1 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="text-4xl md:text-6xl font-serif font-black text-white mb-4"
             >
               Tehri Lake <span className="italic text-blue-200">Adventures</span>
             </motion.h1>
             <motion.p 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ delay: 0.2 }}
               className="text-blue-100 text-lg max-w-2xl mx-auto font-medium"
             >
               Asia's largest man-made lake awaits you. Book your water sports activities in advance for a hassle-free experience.
             </motion.p>
           </div>
        </div>

        <WaterAdventureSection />
      </main>
      <Footer />
    </div>
  );
};

export default WaterAdventurePage;
