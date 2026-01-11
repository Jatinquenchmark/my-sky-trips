import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About Us", href: "#about" },
  { name: "Contact", href: "#contact" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <motion.a
          href="#home"
          className="flex items-center gap-3"
          whileHover={{ scale: 1.02 }}
        >
          <Plane className="w-8 h-8 text-white" />
          <div className="flex flex-col">
            <span className="font-serif font-bold text-xl text-white leading-tight">
              My Sky Trips
            </span>
            <span className="text-[10px] font-sans tracking-[0.2em] text-white/80 uppercase">
              Travel Elevated
            </span>
          </div>
        </motion.a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link, index) => (
            <div key={link.name} className="flex items-center">
              <motion.a
                href={link.href}
                className="font-sans text-white text-sm font-medium px-4 py-2 transition-colors hover:text-white/80"
                whileHover={{ y: -1 }}
                transition={{ duration: 0.2 }}
              >
                {link.name}
              </motion.a>
              {index < navLinks.length - 1 && (
                <span className="text-white/40">|</span>
              )}
            </div>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden md:block">
          <Button 
            variant="outline" 
            size="lg"
            className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary rounded-full px-6"
          >
            Enquire Now
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <Menu className="w-6 h-6 text-white" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-primary"
          >
            <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="font-sans text-white hover:text-white/80 py-2 border-b border-white/20"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <Button 
                variant="outline" 
                size="lg" 
                className="mt-4 bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary rounded-full"
              >
                Enquire Now
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
