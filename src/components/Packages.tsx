import { motion } from "framer-motion";
import { Clock, Users, MapPin, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import chardhamImage from "@/assets/chardham.jpg";
import kedarnathImage from "@/assets/kedarnath.jpg";
import badrinathImage from "@/assets/badrinath.jpg";

const packages = [
  {
    id: 1,
    title: "Chardham Yatra",
    subtitle: "Complete Sacred Journey",
    image: chardhamImage,
    duration: "6 Days",
    groupSize: "2-6 persons",
    locations: "4 Sacred Dhams",
    price: "₹2,35,000",
    description: "Cover all 4 dhams - Yamunotri, Gangotri, Kedarnath & Badrinath in a luxurious helicopter journey.",
    highlights: ["VIP Darshan", "Luxury Accommodation", "Expert Guides"],
    rating: 5.0,
    featured: true,
  },
  {
    id: 2,
    title: "Do Dham Express",
    subtitle: "Same Day Pilgrimage",
    image: kedarnathImage,
    duration: "1 Day",
    groupSize: "2-4 persons",
    locations: "Kedarnath & Badrinath",
    price: "₹1,30,000",
    description: "Experience both Kedarnath and Badrinath in a single day with our express helicopter service.",
    highlights: ["Same Day Return", "Priority Darshan", "Breakfast Included"],
    rating: 4.9,
    featured: false,
  },
  {
    id: 3,
    title: "Do Dham Premium",
    subtitle: "3-Day Spiritual Retreat",
    image: badrinathImage,
    duration: "3 Days",
    groupSize: "2-6 persons",
    locations: "Kedarnath & Badrinath",
    price: "₹1,50,000",
    description: "A peaceful 3-day journey covering Kedarnath and Badrinath with extended darshan time.",
    highlights: ["Extended Stay", "Special Puja", "Local Sightseeing"],
    rating: 4.9,
    featured: false,
  },
];

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
              className={`group relative bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-strong transition-all duration-500 ${
                pkg.featured ? "md:col-span-2 lg:col-span-1 ring-2 ring-saffron" : ""
              }`}
            >
              {/* Featured Badge */}
              {pkg.featured && (
                <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-gradient-sunset text-primary-foreground text-xs font-semibold">
                  Most Popular
                </div>
              )}

              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-mountain-dark/60 to-transparent" />
                
                {/* Rating */}
                <div className="absolute bottom-4 left-4 flex items-center gap-1 px-2 py-1 rounded-full bg-card/90 backdrop-blur-sm">
                  <Star className="w-4 h-4 text-saffron fill-saffron" />
                  <span className="text-sm font-semibold text-foreground">{pkg.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-primary text-sm font-medium mb-1">{pkg.subtitle}</p>
                <h3 className="text-xl font-serif font-bold text-foreground mb-2">{pkg.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{pkg.description}</p>

                {/* Details */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>{pkg.duration}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Users className="w-4 h-4 text-primary" />
                    <span>{pkg.groupSize}</span>
                  </div>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>{pkg.locations}</span>
                  </div>
                </div>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {pkg.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="px-2 py-1 rounded-full bg-muted text-muted-foreground text-xs"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <span className="text-sm text-muted-foreground">Starting from</span>
                    <p className="text-2xl font-serif font-bold text-foreground">{pkg.price}</p>
                  </div>
                  <Button variant="premium" size="lg" className="group/btn">
                    Book Now
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
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
