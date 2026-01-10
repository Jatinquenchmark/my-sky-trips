import { motion } from "framer-motion";
import { Sparkles, Heart, Globe, Shield } from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "Adventuring, Simplified",
    description: "Our expert travel consultants handle all the planning, bookings, and logistics so you can focus on what truly matters—enjoying the journey.",
  },
  {
    icon: Heart,
    title: "Guided Comfort",
    description: "Travel with ease knowing our local guides are there to support you every step of the way. From hidden gems to cultural insights, they ensure a seamless experience.",
  },
  {
    icon: Globe,
    title: "Responsible Travel",
    description: "Over 70% of your trip cost directly supports the local economy—ensuring that the people, culture, and environment benefit the most from your visit.",
  },
  {
    icon: Shield,
    title: "Safety First",
    description: "We partner with certified operators and maintain the highest safety standards. Your security and comfort are our top priorities on every journey.",
  },
];

export const About = () => {
  return (
    <section id="about" className="py-24 bg-card">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-6 leading-tight">
              Your Journey,{" "}
              <span className="text-gradient-sky">Our Passion</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              At My Sky Trips, we believe travel should be transformative, not stressful. 
              Whether it's a thrilling adventure or a peaceful pilgrimage, your only tasks 
              are to dream, pack, and go. We handle everything else.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-center p-4 rounded-xl bg-muted"
              >
                <p className="text-3xl font-serif font-bold text-primary mb-1">500+</p>
                <p className="text-sm text-muted-foreground">Happy Travelers</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-center p-4 rounded-xl bg-muted"
              >
                <p className="text-3xl font-serif font-bold text-saffron mb-1">50+</p>
                <p className="text-sm text-muted-foreground">Destinations</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center p-4 rounded-xl bg-muted"
              >
                <p className="text-3xl font-serif font-bold text-primary mb-1">5.0</p>
                <p className="text-sm text-muted-foreground">Avg Rating</p>
              </motion.div>
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
      </div>
    </section>
  );
};
