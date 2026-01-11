import { motion } from "framer-motion";
import { Facebook, Youtube, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroMountains from "@/assets/hero-mountains.jpg";
import chardhamImage from "@/assets/chardham.jpg";
import kedarnathImage from "@/assets/kedarnath.jpg";
import badrinathImage from "@/assets/badrinath.jpg";

const packages = [
  {
    id: 1,
    title: "Chardham yatra by helicopter",
    description: "Cover all 4 dhams in 6 days",
    image: chardhamImage,
    price: "₹2,35,000",
  },
  {
    id: 2,
    title: "Do Dham Yatra by helicopter",
    description: "Cover Kedarnath and Badrinath in same day",
    image: kedarnathImage,
    price: "₹1,30,000",
  },
  {
    id: 3,
    title: "Do Dham Yatra by helicopter",
    description: "Cover kedarnath and Badrinath in 3 days",
    image: badrinathImage,
    price: "₹1,50,000",
  },
];

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com" },
  { icon: Youtube, href: "https://youtube.com" },
  { icon: Instagram, href: "https://instagram.com" },
];

export const Packages = () => {
  return (
    <section id="packages" className="relative">
      {/* Hero Section with Background */}
      <div className="relative min-h-[70vh] flex flex-col items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={heroMountains}
            alt="Himalayan mountains"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 pt-24 pb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-serif italic font-bold text-white mb-6"
          >
            Explore India Like Never Before
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-white/90 text-base md:text-lg mb-10"
          >
            Helicopter rides || Road trips || Spiritual journeys || Curated experiences
          </motion.p>

          {/* Social Icons with Lines */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex items-center justify-center gap-4"
          >
            <div className="w-16 md:w-24 h-[1px] bg-white/60" />
            <div className="flex items-center gap-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-white/80 transition-colors"
                >
                  <social.icon className="w-5 h-5 md:w-6 md:h-6" />
                </a>
              ))}
            </div>
            <div className="w-16 md:w-24 h-[1px] bg-white/60" />
          </motion.div>
        </div>
      </div>

      {/* Package Cards Section */}
      <div className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                {/* Package Image */}
                <div className="p-4 pb-0">
                  <div className="rounded-xl overflow-hidden">
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-full h-48 md:h-56 object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                {/* Package Content */}
                <div className="p-6 pt-4">
                  <h3 className="text-lg font-semibold text-foreground mb-1">
                    {pkg.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {pkg.description}
                  </p>
                  <p className="text-foreground font-medium mb-4">
                    From {pkg.price}
                  </p>
                  <Button 
                    variant="outline" 
                    className="rounded-full border-primary text-primary hover:bg-primary hover:text-white px-6"
                  >
                    See more
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* WhatsApp Floating Button */}
      <a
        href="https://wa.me/916395678642"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="white"
          className="w-7 h-7"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>
    </section>
  );
};
