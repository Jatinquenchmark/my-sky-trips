import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { EnquiryDialog } from "@/components/EnquiryDialog";
import logo from '@/assets/logo-DFfutrEX.png';

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "Packages", href: "#packages" },
  { name: "About Us", href: "#about" },
  { name: "Reviews", href: "#reviews" },
  { name: "FAQ", href: "#faq" },
  { name: "Contact", href: "#contact" },
];

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle scroll to section when landing from another page
  useEffect(() => {
    if (isHome && location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [isHome, location.hash]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsMobileMenuOpen(false);

    if (isHome) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        // Use a small timeout to allow the mobile menu animation to finish if needed
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 50);
      }
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled || !isHome
        ? "bg-card/95 backdrop-blur-lg shadow-medium py-2"
        : "bg-transparent py-3"
        }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center"
        >
          <img
            src={logo}
            alt="My Sky Trips"
            className={`w-16 h-16 lg:w-24 lg:h-24 object-contain transition-all duration-300 ${isScrolled || !isHome ? "brightness-0" : ""
              }`}
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={isHome ? link.href : `/${link.href}`}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`font-sans text-sm font-medium transition-colors hover:text-primary ${(isScrolled || !isHome) ? "text-foreground" : "text-primary-foreground"
                }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center gap-4">
          <a href="tel:+916395678642" className={`flex items-center gap-2 text-sm font-medium ${(isScrolled || !isHome) ? 'text-foreground' : 'text-primary-foreground'}`}>
            <Phone className="w-4 h-4" />
            +91 6395678642
          </a>
          <EnquiryDialog>
            <Button variant={(isScrolled || !isHome) ? "saffron" : "hero"} size="lg">
              Enquire Now
            </Button>
          </EnquiryDialog>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className={`w-6 h-6 ${(isScrolled || !isHome) ? 'text-foreground' : 'text-primary-foreground'}`} />
          ) : (
            <Menu className={`w-6 h-6 ${(isScrolled || !isHome) ? 'text-foreground' : 'text-primary-foreground'}`} />
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
            className="lg:hidden bg-card shadow-strong"
          >
            <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={isHome ? link.href : `/${link.href}`}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="font-sans text-foreground hover:text-primary py-2 border-b border-border"
                >
                  {link.name}
                </Link>
              ))}
              <EnquiryDialog>
                <Button variant="saffron" size="lg" className="mt-4 w-full">
                  Enquire Now
                </Button>
              </EnquiryDialog>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
