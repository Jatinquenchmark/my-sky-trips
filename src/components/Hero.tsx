import { motion } from "framer-motion";
import { ChevronDown, Plane, Mountain, Compass, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-helicopter.jpg";

const features = [
  { icon: Plane, text: "Helicopter Rides" },
  { icon: Mountain, text: "Road Trips" },
  { icon: Heart, text: "Spiritual Journeys" },
  { icon: Compass, text: "Curated Experiences" },
];

export const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Helicopter flying over Himalayan mountains"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-hero-overlay" />
      </div>

      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-1/4 left-10 w-20 h-20 rounded-full bg-saffron/20 blur-2xl"
        animate={{ y: [0, 20, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/3 right-16 w-32 h-32 rounded-full bg-sky-light/20 blur-3xl"
        animate={{ y: [0, -30, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 text-primary-foreground text-sm font-medium">
            ✨ Premium Travel Experiences in India
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-primary-foreground mb-6 leading-tight"
        >
          Explore India
          <br />
          <span className="text-gradient-sunset">Like Never Before</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto mb-8"
        >
          From sacred pilgrimages to thrilling adventures, we craft unforgettable journeys through India's most breathtaking destinations.
        </motion.p>

        {/* Feature pills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.text}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.9 + index * 0.1 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20"
            >
              <feature.icon className="w-4 h-4 text-saffron" />
              <span className="text-primary-foreground text-sm font-medium">{feature.text}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Button variant="saffron" size="xl">
            Start Your Journey
          </Button>
          <Button variant="heroOutline" size="xl">
            View Packages
          </Button>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-primary-foreground/70 text-sm font-medium">Scroll to explore</span>
          <ChevronDown className="w-6 h-6 text-primary-foreground/70" />
        </motion.div>
      </motion.div>
    </section>
  );
};
