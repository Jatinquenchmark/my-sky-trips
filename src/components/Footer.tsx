import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const footerLinks = {
  company: [
    { name: "About Us", href: "#about" },
    { name: "Our Team", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Contact", href: "#contact" },
  ],
  packages: [
    { name: "Chardham Yatra", href: "#packages" },
    { name: "Do Dham Yatra", href: "#packages" },
    { name: "Kedarnath", href: "#packages" },
    { name: "Badrinath", href: "#packages" },
  ],
  support: [
    { name: "FAQ", href: "#faq" },
    { name: "Booking Policy", href: "#" },
    { name: "Cancellation", href: "#" },
    { name: "Safety Guidelines", href: "#" },
  ],
};

export const Footer = () => {
  return (
    <footer className="bg-mountain-dark text-primary-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <div className="flex items-center mb-6">
                <img
                  src="/src/assets/logo-DFfutrEX.png"
                  alt="My Sky Trips"
                  className="w-32 h-32 object-contain brightness-0 invert"
                />
              </div>
              <p className="text-primary-foreground/70 leading-relaxed max-w-sm">
                My Sky Trips is your premier partner for helicopter journeys and curated travel experiences.
                From sacred pilgrimages to luxury escapes, we make every journey seamless and extraordinary.
              </p>
            </motion.div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-serif font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-saffron transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-semibold text-lg mb-4">Packages</h4>
            <ul className="space-y-3">
              {footerLinks.packages.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-saffron transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-serif font-semibold text-lg mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-primary-foreground/70 hover:text-saffron transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-primary-foreground/60 text-sm">
              © 2024 My Sky Trips. All rights reserved.
            </p>
            <p className="text-primary-foreground/60 text-sm flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-saffron fill-saffron" /> in India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
