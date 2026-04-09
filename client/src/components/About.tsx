import { motion } from "framer-motion";
import { Sparkles, Heart, Globe, Shield, Target, Eye, Quote } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "End-to-End Curation",
    description: "We don't just book helicopters—we craft complete travel moments. Every itinerary is thoughtfully designed for comfort and safety.",
  },
  {
    icon: Shield,
    title: "Safety First",
    description: "We collaborate with trusted aviation operators and certified pilots, keeping safety at the core of every journey.",
  },
  {
    icon: Globe,
    title: "Accessible Luxury",
    description: "Making aerial travel more accessible and seamless, bridging the gap between luxury aviation and personalized planning.",
  },
  {
    icon: Heart,
    title: "Exceptional Service",
    description: "From transparent booking assistance to real-time travel support, we ensure your journey is extraordinary.",
  },
];

const offerings = [
  "Char Dham Helicopter Yatra",
  "Private Helicopter Charters",
  "Wedding & Event Logistics",
  "Himalayan Joyrides",
  "Luxury & Adventure Packages",
  "Honeymoon Getaways",
  "Corporate Travel Solutions",
];

export const About = () => {
  return (
    <section id="about" className="py-24 bg-card overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              About Us — My Sky Trips
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6 leading-tight">
              Redefining Travel Through{" "}
              <span className="text-gradient-sky">Aerial Excellence</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
              My Sky Trips is a Dehradun-based experiential travel brand specializing in helicopter journeys and curated travel experiences across Uttarakhand and beyond.
            </p>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Founded with the vision of making aerial travel more accessible, seamless, and memorable, we bridge the gap between luxury aviation services and personalized travel planning. From sacred pilgrimages like Char Dham to leisure joyrides—we design journeys that go far beyond transportation.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              {offerings.map((offering, index) => (
                <motion.div
                  key={offering}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center gap-2"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-saffron" />
                  <span className="text-foreground font-medium">{offering}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Feature Cards */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid sm:grid-cols-2 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="group p-6 rounded-2xl bg-background border border-border hover:border-primary/30 hover:shadow-medium transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-sky flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-serif font-bold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl bg-primary/5 border border-primary/10 relative overflow-hidden"
          >
            <Target className="absolute -right-4 -bottom-4 w-32 h-32 text-primary/5" />
            <h3 className="text-2xl font-serif font-bold text-primary mb-4 flex items-center gap-2">
              <Target className="w-6 h-6" /> Our Mission
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              To redefine travel by combining aviation, luxury, and personalized service — making extraordinary journeys accessible, efficient, and unforgettable.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl bg-saffron/5 border border-saffron/10 relative overflow-hidden"
          >
            <Eye className="absolute -right-4 -bottom-4 w-32 h-32 text-saffron/5" />
            <h3 className="text-2xl font-serif font-bold text-saffron mb-4 flex items-center gap-2">
              <Eye className="w-6 h-6" /> Our Vision
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              To become India's most trusted helicopter travel and experiential tour operator platform, known for operational excellence, premium service, and transformative travel experiences.
            </p>
          </motion.div>
        </div>

        {/* Founder's Note */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto p-8 md:p-12 rounded-[2rem] bg-gradient-to-br from-card to-background border border-border shadow-strong relative"
        >
          <Quote className="absolute top-8 left-8 w-12 h-12 text-primary/10" />
          <div className="text-center relative z-10">
            <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground mb-6">Founder's Note</h3>
            <p className="text-lg md:text-xl text-muted-foreground italic mb-8 leading-relaxed">
              "Founded by Surya Pratap, a travel creator and experiential storyteller, My Sky Trips was born from a simple belief — travel should feel extraordinary, not transactional. After years of exploring destinations, I envisioned a platform that blends aerial access with curated ground experiences — giving people a new perspective on travel, literally and emotionally."
            </p>
            <div className="flex flex-col items-center">
              <div className="w-16 h-1 bg-primary rounded-full mb-4" />
              <p className="font-serif font-bold text-xl text-foreground">Surya Pratap</p>
              <p className="text-primary font-medium">Founder, My Sky Trips</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
