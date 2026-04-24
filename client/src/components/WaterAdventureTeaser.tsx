import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Waves, Anchor, Compass } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import local assets
import SpeedBoatImg from '../assets/Speed Boat.jpg.jpeg';
import JetSkiImg from '../assets/Jet ski.jpg.jpeg';
import ParaSailingImg from '../assets/Para sailing.jpg.jpeg';
import HighSpeedImg from '../assets/High speed boat.jpg.jpeg';

export const WaterAdventureTeaser = () => {
  const images = [
    { url: SpeedBoatImg, label: 'Speed Boat', icon: <Anchor size={14} /> },
    { url: JetSkiImg, label: 'Jet Ski', icon: <Waves size={14} /> },
    { url: ParaSailingImg, label: 'Para Sailing', icon: <Compass size={14} /> },
    { url: HighSpeedImg, label: 'Water Sports', icon: <Waves size={14} /> },
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Side: Text Content */}
          <div className="lg:w-1/2 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 text-xs font-black uppercase tracking-[0.2em] rounded-full">
                <Waves size={16} /> Exclusive Experience
              </span>
              <h2 className="text-4xl md:text-6xl font-serif font-black text-slate-900 leading-tight">
                Tehri Water <br />
                <span className="text-blue-600 italic">Adventure Activities</span>
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed max-w-lg font-medium">
                Feel the adrenaline rush at Asia's largest man-made lake. From high-speed jet skis to peaceful shikara rides, we have something for every soul.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-6 items-center"
            >
              <Link 
                to="/water-adventure"
                className="group relative inline-flex items-center gap-3 px-8 py-5 bg-blue-600 text-white rounded-[2rem] font-black uppercase tracking-widest text-sm shadow-2xl shadow-blue-200 hover:bg-blue-700 transition-all active:scale-95"
              >
                Explore All Activities
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </Link>
              
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-slate-100 flex items-center justify-center overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                  </div>
                ))}
                <div className="pl-6">
                  <p className="text-xs font-bold text-slate-900">500+ Bookings</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">In last 30 days</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Image Grid (Landscape Style) */}
          <div className="lg:w-1/2 relative">
            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <div className="h-48 md:h-64 rounded-[2.5rem] overflow-hidden relative group">
                  <img src={images[0].url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Adventure 1" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-6 left-6 text-white text-xs font-black uppercase tracking-widest flex items-center gap-2">
                    {images[0].icon} {images[0].label}
                  </span>
                </div>
                <div className="h-40 md:h-48 rounded-[2.5rem] overflow-hidden relative group">
                  <img src={images[1].url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Adventure 2" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-6 left-6 text-white text-xs font-black uppercase tracking-widest flex items-center gap-2">
                    {images[1].icon} {images[1].label}
                  </span>
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="space-y-4 pt-8"
              >
                <div className="h-40 md:h-48 rounded-[2.5rem] overflow-hidden relative group">
                  <img src={images[2].url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Adventure 3" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-6 left-6 text-white text-xs font-black uppercase tracking-widest flex items-center gap-2">
                    {images[2].icon} {images[2].label}
                  </span>
                </div>
                <div className="h-48 md:h-64 rounded-[2.5rem] overflow-hidden relative group">
                  <img src={images[3].url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Adventure 4" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <span className="absolute bottom-6 left-6 text-white text-xs font-black uppercase tracking-widest flex items-center gap-2">
                    {images[3].icon} {images[3].label}
                  </span>
                </div>
              </motion.div>
            </div>

            {/* Decorative Element */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-50 rounded-full blur-3xl opacity-50" />
          </div>

        </div>
      </div>
    </section>
  );
};
