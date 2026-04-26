import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PackageCard } from "./PackageCard";
import { fetchPackages, Package } from "@/lib/api";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

interface PackagesProps {
  limit?: number;
}

export const Packages = ({ limit }: PackagesProps) => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPackages = async () => {
      try {
        const data = await fetchPackages();
        setPackages(data);
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        setLoading(false);
      }
    };
    loadPackages();
  }, []);

  const displayedPackages = limit ? packages.slice(0, limit) : packages;
  const hasMore = limit ? packages.length > limit : false;

  if (loading) {
    return (
      <section id="packages" className="py-24 bg-gradient-spiritual">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground font-medium">Loading amazing journeys...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="packages" className="py-24 bg-gradient-spiritual">
      <div className="max-w-7xl mx-auto px-6">
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
            Curated <span className="text-gradient-sky">Helicopter Journeys</span>
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
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {displayedPackages.map((pkg) => (
            <PackageCard key={pkg._id} pkg={pkg} />
          ))}
        </motion.div>

        {/* View All Button */}
        {(hasMore || limit === 9) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Button
              variant="premium"
              size="xl"
              onClick={() => window.open('/all-packages', '_blank')}
              className="group rounded-2xl shadow-strong-primary px-10"
            >
              View All Packages
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

