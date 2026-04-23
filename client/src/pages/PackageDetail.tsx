import { useParams, useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Clock, Users, MapPin, CheckCircle2, XCircle, ArrowLeft, Calendar, Star, Download, Loader2, Play, ChevronRight, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { fetchPackageById, Package } from "@/lib/api";
import PaymentButton from "@/components/PaymentButton";

const PackageDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pkg, setPkg] = useState<Package | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedTier, setSelectedTier] = useState<any>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        const loadPackage = async () => {
            if (!id) return;
            try {
                const data = await fetchPackageById(id);
                setPkg(data);
                // Set default tier
                if (data.pricingTiers && data.pricingTiers.length > 0) {
                    setSelectedTier(data.pricingTiers[0]);
                } else {
                    setSelectedTier({ tier: 'Standard', price: data.price });
                }
            } catch (error) {
                console.error("Error loading package details:", error);
            } finally {
                setLoading(false);
            }
        };
        loadPackage();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center">
                <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
                <p className="text-muted-foreground font-medium">Preparing your journey...</p>
            </div>
        );
    }

    if (!pkg) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold mb-4">Package not found</h2>
                <Button onClick={() => navigate("/")}>Go Home</Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f8fafc]">
            <Header />

            <main className="pt-20">
                {/* Hero Section */}
                <div className="relative h-[70vh] min-h-[600px] w-full overflow-hidden">
                    <motion.div
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.5 }}
                        className="absolute inset-0"
                    >
                        <img
                            src={pkg.image}
                            alt={pkg.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-hero-overlay" />
                    </motion.div>

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-6"
                        >
                            <span className="text-white text-sm font-bold flex items-center gap-2">
                                ✨ Premium Travel Experiences in India
                            </span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold text-white mb-6"
                        >
                            Explore {pkg.locations.split(',')[0]}
                            <br />
                            <span className="text-gradient-sunset">Like Never Before</span>
                        </motion.h1>

                        <motion.div 
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           transition={{ delay: 0.4 }}
                           className="flex flex-wrap justify-center gap-8 mt-4 text-white/90"
                        >
                           <div className="flex flex-col items-center gap-1">
                              <Clock className="w-6 h-6 text-saffron" />
                              <span className="text-xs font-bold uppercase tracking-widest">{pkg.duration}</span>
                           </div>
                           <div className="flex flex-col items-center gap-1">
                              <Users className="w-6 h-6 text-saffron" />
                              <span className="text-xs font-bold uppercase tracking-widest">{pkg.groupSize}+ People</span>
                           </div>
                           <div className="flex flex-col items-center gap-1">
                              <MapPin className="w-6 h-6 text-saffron" />
                              <span className="text-xs font-bold uppercase tracking-widest">{pkg.locations}</span>
                           </div>
                        </motion.div>
                    </div>
                </div>

                <div className="container mx-auto px-4 -mt-20 relative z-20 pb-32 lg:pb-20">
                    <div className="grid lg:grid-cols-3 gap-12 items-start">
                        
                        {/* Main Detail Content */}
                        <div className="lg:col-span-2 space-y-8">
                            

                            {/* Section: Overview */}
                            <section id="overview" className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-premium border border-slate-100">
                                <h2 className="text-4xl font-serif font-bold mb-8">Overview</h2>
                                <p className="text-lg text-slate-600 leading-relaxed mb-10 whitespace-pre-line">
                                    {pkg.description}
                                </p>

                                {/* Feature Box */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                   <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 group hover:border-primary/20 transition-all">
                                      <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4">
                                         <Clock size={24} />
                                      </div>
                                      <h4 className="font-bold text-slate-800 mb-2">Duration</h4>
                                      <p className="text-sm text-slate-500">{pkg.duration}</p>
                                   </div>
                                   <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 group hover:border-primary/20 transition-all">
                                      <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-4">
                                         <Users size={24} />
                                      </div>
                                      <h4 className="font-bold text-slate-800 mb-2">Group Capacity</h4>
                                      <p className="text-sm text-slate-500">Ideal for {pkg.groupSize} People</p>
                                   </div>
                                </div>
                            </section>

                            {/* Section: Choose Your Travel Tier */}
                            <section className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-premium border border-slate-100">
                               <div className="flex justify-between items-end mb-8">
                                  <div>
                                     <h2 className="text-4xl font-serif font-bold">Choose Your Travel Tier</h2>
                                  </div>
                                  <span className="px-4 py-1.5 bg-sky-50 text-sky-600 text-xs font-bold rounded-full border border-sky-100">Tailored Experiences</span>
                               </div>

                               <div className={`grid grid-cols-1 ${(pkg.pricingTiers && pkg.pricingTiers.length > 2) ? 'md:grid-cols-3' : 'md:grid-cols-2'} gap-6`}>
                                  {(pkg.pricingTiers && pkg.pricingTiers.length > 0 ? pkg.pricingTiers : [
                                     { tier: 'Standard', price: pkg.price, features: ['+ 5% GST'] }
                                  ]).map((tier, idx) => {
                                     const isSelected = selectedTier?.tier === tier.tier;
                                     return (
                                       <div 
                                         key={idx} 
                                         onClick={() => setSelectedTier(tier)}
                                         className={`p-8 border-2 ${isSelected ? 'border-primary bg-primary/5 shadow-lg scale-[1.02]' : 'border-slate-100 hover:border-primary/20'} rounded-[2.5rem] relative overflow-hidden group transition-all cursor-pointer`}
                                       >
                                          <div className="absolute top-0 right-0 p-4">
                                             <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-colors ${isSelected ? 'bg-primary border-primary text-white' : 'border-slate-200 text-transparent'}`}>
                                                <CheckCircle2 size={14} />
                                             </div>
                                          </div>
                                          <p className={`text-[10px] font-bold uppercase tracking-widest mb-3 ${isSelected ? 'text-primary' : 'text-slate-400'}`}>{tier.tier}</p>
                                          <h3 className="text-4xl font-serif font-bold text-slate-800 mb-2">₹{tier.price.toLocaleString()}</h3>
                                          <p className="text-xs text-slate-500 mb-6">PER PERSON</p>
                                          <ul className="space-y-3">
                                             {(tier.features || ['+ 5% GST']).map((feat, fIdx) => (
                                                <li key={fIdx} className="flex items-center gap-2 text-xs font-medium text-slate-600">
                                                   <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-primary' : 'bg-slate-300'}`} /> {feat}
                                                </li>
                                             ))}
                                          </ul>
                                       </div>
                                     );
                                  })}
                               </div>
                            </section>

                            {/* Section: Itinerary */}
                            <section id="itinerary" className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-premium border border-slate-100">
                                <h2 className="text-4xl font-serif font-bold mb-10">Itinerary</h2>
                                <div className="space-y-0">
                                    {(pkg.itinerary && pkg.itinerary.length > 0 ? pkg.itinerary : [
                                       { day: 'Day 1', title: 'Arrival & Welcome', activities: 'Arrive at the destination, check-in to your premium stay, and enjoy a welcome dinner.' },
                                       { day: 'Day 2', title: 'Exploration', activities: 'Full day of guided tours and immersion into local culture and landmarks.' },
                                       { day: 'Day 3', title: 'Departure', activities: 'Morning experience followed by transfer to the airport/station.' }
                                    ]).map((item, idx) => (
                                       <div key={idx} className="flex gap-6 group">
                                          <div className="flex flex-col items-center">
                                             <div className="w-10 h-10 rounded-2xl bg-primary flex items-center justify-center text-white font-bold text-xs shrink-0 z-10">
                                                {item.day.match(/\d+/) ? item.day.match(/\d+/)[0] : idx + 1}
                                             </div>
                                             {idx !== (pkg.itinerary?.length || 3) - 1 && <div className="w-px h-full bg-slate-200" />}
                                          </div>
                                          <div className="pb-10 pt-1">
                                             <h4 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h4>
                                             <p className="text-slate-500 leading-relaxed text-sm">{item.activities}</p>
                                          </div>
                                       </div>
                                    ))}
                                </div>
                            </section>

                            {/* Section: Visual Journey */}
                            <section id="gallery" className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-premium border border-slate-100">
                                <h2 className="text-4xl font-serif font-bold mb-10 text-slate-800">Visual Journey</h2>
                                
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[600px]">
                                   {/* Main Image Slot */}
                                   <div className="md:col-span-2 h-full rounded-[2rem] overflow-hidden relative group">
                                      {pkg.gallery?.[0] ? (
                                        <a 
                                          href={pkg.gallery[0]} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="w-full h-full cursor-pointer block"
                                        >
                                           <img 
                                             src={pkg.gallery[0]} 
                                             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                                           />
                                           <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                                        </a>
                                      ) : (
                                        <div className="w-full h-full bg-slate-50 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center p-12 text-center">
                                           <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center text-slate-200 mb-6 group-hover:scale-110 transition-transform duration-500">
                                              <Info size={40} />
                                           </div>
                                           <h3 className="text-2xl font-serif font-bold text-slate-400 mb-2 italic">Gallery Coming Soon</h3>
                                           <p className="text-xs text-slate-300 uppercase tracking-[0.2em] font-bold">Capturing the magic for you</p>
                                        </div>
                                      )}
                                   </div>

                                   {/* Sidebar Gallery (Remaining Images) */}
                                   <div className="md:col-span-1 flex flex-col gap-4 h-full overflow-hidden">
                                      {pkg.gallery && pkg.gallery.length > 1 ? (
                                        <div className="flex flex-col gap-4 h-full overflow-y-auto no-scrollbar pr-1">
                                          {pkg.gallery.slice(1).map((img, idx) => (
                                            <a 
                                              key={idx}
                                              href={img} 
                                              target="_blank" 
                                              rel="noopener noreferrer" 
                                              className="w-full rounded-2xl overflow-hidden group relative bg-slate-100 flex-shrink-0 min-h-[180px] h-[calc(33.33%-11px)]"
                                            >
                                              <img 
                                                src={img} 
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                                              />
                                              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                                            </a>
                                          ))}
                                        </div>
                                      ) : (
                                        <div className="h-full rounded-2xl border-2 border-dashed border-slate-100 flex items-center justify-center text-slate-300 font-bold text-xs">
                                          More images coming soon
                                        </div>
                                      )}
                                   </div>
                                </div>
                                <p className="text-center text-xs text-slate-400 italic mt-6">Click on any image to view in full size</p>
                            </section>

                            {/* Section: Inclusions & Exclusions */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                               {/* Inclusions */}
                               <div className="bg-blue-50/50 rounded-[2.5rem] p-10 border border-blue-100/50">
                                  <h3 className="text-2xl font-serif font-bold text-blue-900 mb-8 flex items-center gap-3">
                                     <CheckCircle2 className="text-primary" /> Inclusions
                                  </h3>
                                  <ul className="space-y-4">
                                     {(pkg.inclusions && pkg.inclusions.length > 0 ? pkg.inclusions : [
                                       'Round-trip helicopter ride',
                                       'Premium hotel stays',
                                       'All meals included',
                                       'Personal tour guide'
                                     ]).map((item, idx) => (
                                       <li key={idx} className="flex items-start gap-3 text-sm font-medium text-slate-600">
                                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" /> {item}
                                       </li>
                                     ))}
                                  </ul>
                               </div>

                               {/* Exclusions */}
                               <div className="bg-rose-50/50 rounded-[2.5rem] p-10 border border-rose-100/50">
                                  <h3 className="text-2xl font-serif font-bold text-rose-900 mb-8 flex items-center gap-3">
                                     <XCircle className="text-rose-500" /> Exclusions
                                  </h3>
                                  <ul className="space-y-4">
                                     {(pkg.exclusions && pkg.exclusions.length > 0 ? pkg.exclusions : [
                                       'Personal shopping',
                                       'Anything not mentioned in inclusions',
                                       'Alcoholic beverages'
                                     ]).map((item, idx) => (
                                       <li key={idx} className="flex items-start gap-3 text-sm font-medium text-slate-600">
                                          <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" /> {item}
                                       </li>
                                     ))}
                                  </ul>
                               </div>
                            </div>

                            {/* Pricing Structure */}
                            <section id="pricing" className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-premium border border-slate-100">
                                <h3 className="text-2xl font-serif font-bold text-slate-800 mb-8 border-l-4 border-primary pl-4">Pricing Structure</h3>
                                <ul className="space-y-4">
                                   <li className="flex items-start gap-3 text-sm font-medium text-slate-600 leading-relaxed">
                                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" /> 
                                      Package Cost — ₹{(pkg.price).toLocaleString()} per person (+ 5% GST)
                                   </li>
                                   <li className="flex items-start gap-3 text-sm font-medium text-slate-600 leading-relaxed">
                                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" /> 
                                      Booking: Pay 50% now to book; Balance 30 days before trip.
                                   </li>
                                </ul>
                            </section>
                        </div>

                        {/* Sticky Booking Card (Desktop only) */}
                        <div className="lg:col-span-1 hidden lg:block sticky top-24">
                           <div className="bg-white rounded-[2rem] p-8 shadow-strong border border-slate-100 text-center">
                              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                                {selectedTier?.tier ? `${selectedTier.tier} Package` : 'STARTING FROM'}
                              </p>
                              <div className="flex justify-center items-center gap-2 mb-1">
                                <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary">₹{(selectedTier?.price || pkg.price).toLocaleString()}</h2>
                              </div>
                              <p className="text-[10px] text-slate-500 font-bold uppercase mb-8">Per person</p>

                               <div className="space-y-3 mb-8 text-left">
                                 <div className="flex items-center justify-between pb-3 border-b border-slate-50">
                                    <div className="flex items-center gap-2 text-slate-400"><Calendar size={16} /> <span className="text-[9px] font-bold uppercase">Duration</span></div>
                                    <span className="text-xs font-bold text-slate-700">{pkg.duration}</span>
                                 </div>
                                 <div className="flex items-center justify-between pb-3 border-b border-slate-50">
                                    <div className="flex items-center gap-2 text-slate-400"><Users size={16} /> <span className="text-[9px] font-bold uppercase">Group Size</span></div>
                                    <span className="text-xs font-bold text-slate-700">Customizable</span>
                                 </div>
                                 <div className="flex items-center justify-between pb-3 border-b border-slate-50">
                                    <div className="flex items-center gap-2 text-slate-400"><Star size={16} /> <span className="text-[9px] font-bold uppercase">Rating</span></div>
                                    <span className="text-xs font-bold text-slate-700">{pkg.rating}/5.0</span>
                                 </div>
                               </div>

                               {pkg.showPrice === true ? (
                                 <PaymentButton 
                                    amount={selectedTier?.price || pkg.price} 
                                    packageName={pkg.title}
                                    onSuccess={(data) => {
                                        console.log("Success:", data);
                                    }}
                                 />
                               ) : (
                                 <div className="w-full py-4 px-5 bg-amber-50 border border-amber-200 rounded-2xl text-center">
                                   <p className="text-xs font-bold text-amber-700 mb-1">📞 Contact Our Team</p>
                                   <p className="text-[11px] text-amber-600 leading-relaxed">To book this package, please reach out to us directly.</p>
                                 </div>
                               )}
                              <p className="text-[10px] text-slate-400 mt-6 italic">*PRICES VARY BASED ON SEASON AND AVAILABILITY</p>
                           </div>

                           <div className="mt-6 p-6 bg-slate-900 rounded-[2rem] text-white overflow-hidden relative group">
                              <h4 className="font-bold relative z-10">Need Help?</h4>
                              <p className="text-xs text-white/60 mb-4 relative z-10">Chat with our travel experts on WhatsApp.</p>
                              <a href="https://wa.me/91XXXXXXXXXX" className="px-4 py-2 bg-emerald-500 rounded-lg text-xs font-bold relative z-10 flex items-center justify-center gap-2">
                                 WhatsApp Support
                              </a>
                              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform -rotate-12 translate-x-4 -translate-y-4">
                                 <MapPin size={84} />
                              </div>
                           </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* ── Mobile Sticky Bottom Bar ── */}
            <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
                <div className="flex items-center justify-between px-4 py-3 gap-4">
                    {/* Price Info */}
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            {selectedTier?.tier ? `${selectedTier.tier} Package` : 'Starting From'}
                        </span>
                        <span className="text-2xl font-serif font-bold text-primary leading-tight">
                            ₹{(selectedTier?.price || pkg.price).toLocaleString()}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">per person + 5% GST</span>
                    </div>

                    {/* Pay Button */}
                    <div className="flex-1 max-w-[200px]">
                        {pkg.showPrice === true ? (
                          <PaymentButton
                              amount={selectedTier?.price || pkg.price}
                              packageName={pkg.title}
                              onSuccess={(data) => {
                                  console.log("Success:", data);
                              }}
                          />
                        ) : (
                          <div className="w-full py-2.5 px-4 bg-amber-50 border border-amber-200 rounded-xl text-center">
                            <p className="text-[10px] font-bold text-amber-700">📞 Contact Team</p>
                          </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default PackageDetail;
