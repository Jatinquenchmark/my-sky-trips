import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Cookie, ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const COOKIE_CONSENT_KEY = "myskytrips_cookie_consent";

export const CookieBanner = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      // Small timeout to animate in smoothly
      const timer = setTimeout(() => setIsVisible(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "all");
    setIsVisible(false);
    // Allow tracking scripts if any are initialized dynamically
    if (typeof window !== "undefined") {
      (window as any).allowAnalytics = true;
    }
  };

  const handleOnlyNecessary = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "necessary");
    setIsVisible(false);
    // Disable analytics & meta pixels
    if (typeof window !== "undefined") {
      (window as any).allowAnalytics = false;
    }
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Cookie consent banner"
      className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 animate-in fade-in slide-in-from-bottom-5 duration-300"
    >
      <div className="bg-card/95 backdrop-blur-md border border-border/80 text-foreground p-5 rounded-2xl shadow-2xl flex flex-col gap-3">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 mt-0.5">
            <Cookie className="w-5 h-5" />
          </div>
          <div className="flex-1 pr-2">
            <h4 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-1.5">
              Cookie Preferences
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We use cookies to keep our website working, understand how visitors use it and measure our ads. Read our{" "}
              <Link to="/privacy-policy" className="text-primary underline font-medium hover:text-primary/80">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
          <button
            onClick={handleOnlyNecessary}
            className="text-muted-foreground hover:text-foreground p-1 transition-colors rounded-lg"
            aria-label="Close cookie banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-end gap-2.5 pt-1">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleOnlyNecessary}
            className="text-xs h-8 px-3 rounded-xl border-border hover:bg-muted"
          >
            Only necessary
          </Button>
          <Button
            type="button"
            variant="default"
            size="sm"
            onClick={handleAcceptAll}
            className="text-xs h-8 px-4 rounded-xl shadow-xs"
          >
            Accept all
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default CookieBanner;
