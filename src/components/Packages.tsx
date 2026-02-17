import { motion } from "framer-motion";
import { Clock, Users, MapPin, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { packages } from "@/data/packages";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export const Packages = () => {
  const navigate = useNavigate();

  return (
    <section id="packages" className="py-24 bg-gradient-spiritual">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Our Signature Packages
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Curated <span className="text-gradient-sky">Spiritual Journeys</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Experience the divine beauty of the Himalayas with our premium helicopter yatra packages
          </p>
        </motion.div>

        {/* Package Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {packages.map((pkg) => (
            <motion.div
              key={pkg.id}
              variants={itemVariants}
              className={`group relative bg-card rounded-[2rem] overflow-hidden shadow-soft hover:shadow-strong transition-all duration-700 cursor-pointer border border-border/50 ${pkg.featured ? "md:col-span-2 lg:col-span-1 border-primary/20 bg-gradient-to-b from-card to-primary/5" : ""
                }`}
              onClick={() => navigate(`/package/${pkg.id}`)}
            >
              {/* Image Section */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000"
                />

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-mountain-dark/80 via-transparent to-black/20" />

                {/* Top Badges */}
                <div className="absolute top-5 left-5 right-5 flex justify-between items-start z-10">
                  {pkg.featured ? (
                    <div className="px-4 py-1.5 rounded-full bg-primary/20 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                      Trending Choice
                    </div>
                  ) : <div></div>}

                  <div className="px-4 py-2 rounded-2xl bg-primary backdrop-blur-md border border-white/20 text-white shadow-xl group/price">
                    <span className="block text-[10px] text-white/90 font-medium leading-none mb-0.5">Starting at</span>
                    <span className="text-lg font-serif font-bold leading-none">{pkg.price}</span>
                  </div>
                </div>

                {/* Bottom Badges */}
                <div className="absolute bottom-5 left-5 flex items-center gap-2 z-10">
                  <div className="px-3 py-1.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-white text-xs font-semibold flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    {pkg.duration}
                  </div>
                  <div className="px-3 py-1.5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-white text-xs font-semibold flex items-center gap-2">
                    <Users className="w-3.5 h-3.5 text-primary" />
                    {pkg.groupSize}
                  </div>
                </div>

                {/* Rating Badge */}
                <div className="absolute bottom-5 right-5 z-10 px-2.5 py-1.5 rounded-xl bg-saffron/90 backdrop-blur-md text-mountain-dark shadow-lg scale-90 group-hover:scale-100 transition-transform duration-500">
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-mountain-dark" />
                    <span className="text-sm font-bold leading-none">{pkg.rating}</span>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-8 relative">
                {/* Floating Decoration */}
                {pkg.featured && (
                  <div className="absolute -top-6 right-8 w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-strong-primary transform rotate-6 group-hover:rotate-0 transition-transform duration-500">
                    <Star className="w-6 h-6 fill-white" />
                  </div>
                )}

                <div className="mb-6">
                  <p className="text-primary text-xs font-bold uppercase tracking-[0.2em] mb-2">{pkg.subtitle}</p>
                  <h3 className="text-2xl font-serif font-bold text-foreground mb-3 leading-tight group-hover:text-primary transition-colors duration-300">
                    {pkg.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                    {pkg.description}
                  </p>
                </div>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {pkg.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="px-3 py-1 rounded-lg bg-primary/5 text-primary text-[11px] font-bold border border-primary/10"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                {/* Footer Section */}
                <div className="flex items-center justify-between pt-6 border-t border-border/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <span className="block text-[10px] text-muted-foreground font-bold uppercase tracking-wider">Destinations</span>
                      <span className="text-sm font-semibold text-foreground">{pkg.locations}</span>
                    </div>
                  </div>

                  <Button variant="premium" size="icon" className="w-12 h-12 rounded-2xl group/btn overflow-hidden relative shadow-strong-primary" onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/package/${pkg.id}`);
                  }}>
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-10 transition-transform duration-500 absolute" />
                    <ArrowRight className="w-5 h-5 -translate-x-10 group-hover/btn:translate-x-0 transition-transform duration-500" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
