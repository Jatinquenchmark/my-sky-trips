import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  ShieldCheck, 
  Lock, 
  Plane, 
  Scale, 
  FileText, 
  Eye, 
  UserCheck, 
  CreditCard, 
  HelpCircle, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Clock,
  Printer
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

const sections = [
  { id: "overview", title: "1. Overview & Commitment", icon: ShieldCheck },
  { id: "information-collected", title: "2. Information We Collect", icon: FileText },
  { id: "aviation-compliance", title: "3. Aviation & DGCA Data", icon: Plane },
  { id: "how-we-use-data", title: "4. How We Use Information", icon: Eye },
  { id: "payment-security", title: "5. Payment & Financial Data", icon: CreditCard },
  { id: "third-party-sharing", title: "6. Data Sharing & Disclosure", icon: UserCheck },
  { id: "data-retention", title: "7. Storage & Security", icon: Lock },
  { id: "passenger-rights", title: "8. Your Privacy Rights", icon: Scale },
  { id: "cookies-tracking", title: "9. Cookies & Tracking", icon: HelpCircle },
  { id: "grievance-officer", title: "10. Grievance & Contact", icon: Mail },
];

export const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -120;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-primary/20 selection:text-primary">
      <Header />

      <main className="flex-1 pt-28 pb-20">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-linear-to-b from-primary/10 via-background to-background border-b border-border/60">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(14,165,233,0.12),transparent_50%)] pointer-events-none" />
          <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 pt-8 pb-14">
            
            {/* Breadcrumb / Back Link */}
            <div className="flex items-center gap-3 mb-6">
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors bg-primary/10 px-3 py-1.5 rounded-full"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
              <span className="text-muted-foreground text-xs">•</span>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Legal & Compliance
              </span>
            </div>

            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-saffron/15 text-saffron text-xs font-bold tracking-wide uppercase mb-4">
                <ShieldCheck className="w-4 h-4 text-saffron" />
                Your Privacy Is Protected
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-extrabold tracking-tight text-foreground mb-5">
                Privacy <span className="text-gradient-sky">Policy</span>
              </h1>
              
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-3xl mb-6">
                At <strong className="text-foreground font-semibold">My Sky Trips</strong>, we prioritize your sacred journeys and passenger security. 
                This Privacy Policy explains how we collect, handle, protect, and safeguard your personal and aviation data in compliance with the Digital Personal Data Protection Act (DPDPA), DGCA aviation regulations, and industry standards.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5 bg-card border border-border px-3 py-1.5 rounded-lg shadow-xs">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>Last Updated: <strong>October 2024</strong></span>
                </div>
                <div className="flex items-center gap-1.5 bg-card border border-border px-3 py-1.5 rounded-lg shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Applicable to all My Sky Trips Heli & Travel Services</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handlePrint}
                  className="gap-2 h-8 text-xs font-medium rounded-lg ml-auto hidden sm:flex print:hidden"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print Policy
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Highlights Summary Cards */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 -mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-card/90 backdrop-blur-md p-5 rounded-2xl border border-border shadow-soft">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-3">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-foreground text-sm mb-1">256-Bit SSL Protection</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                All personal details and communications are encrypted with enterprise-grade SSL certificates.
              </p>
            </div>

            <div className="bg-card/90 backdrop-blur-md p-5 rounded-2xl border border-border shadow-soft">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 flex items-center justify-center mb-3">
                <Plane className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-foreground text-sm mb-1">DGCA Heli Compliance</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Passenger weight and government IDs are collected exclusively for mandatory aviation flight manifests.
              </p>
            </div>

            <div className="bg-card/90 backdrop-blur-md p-5 rounded-2xl border border-border shadow-soft">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-3">
                <CreditCard className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-foreground text-sm mb-1">Zero Card Storage</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We never store card CVVs or bank passwords. Payments are processed via RBI-approved PCI-DSS gateways.
              </p>
            </div>

            <div className="bg-card/90 backdrop-blur-md p-5 rounded-2xl border border-border shadow-soft">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-foreground text-sm mb-1">No Data Selling</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We will never sell or rent your personal contact information to any third-party marketing brokers.
              </p>
            </div>
          </div>
        </div>

        {/* Content Section with Sticky Sidebar */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

            {/* Sticky Table of Contents (Desktop) */}
            <aside className="hidden lg:block lg:col-span-4 xl:col-span-3">
              <div className="sticky top-28 bg-card rounded-2xl border border-border p-5 shadow-soft">
                <div className="flex items-center gap-2 pb-3 mb-3 border-b border-border">
                  <FileText className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                    Table of Contents
                  </span>
                </div>
                <nav className="space-y-1">
                  {sections.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full flex items-center gap-2.5 text-left text-xs font-medium px-3 py-2 rounded-xl transition-all ${
                          isActive
                            ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                            : "text-muted-foreground hover:bg-muted hover:text-foreground"
                        }`}
                      >
                        <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? "text-primary-foreground" : "text-muted-foreground"}`} />
                        <span className="truncate">{item.title}</span>
                      </button>
                    );
                  })}
                </nav>

                <div className="mt-6 pt-4 border-t border-border">
                  <div className="p-3 bg-muted/60 rounded-xl text-xs space-y-2">
                    <p className="font-medium text-foreground">Need Instant Help?</p>
                    <p className="text-muted-foreground text-[11px] leading-relaxed">
                      Our support desk is operational 24/7 during Yatra seasons.
                    </p>
                    <a
                      href="tel:+916395678642"
                      className="inline-flex items-center gap-1.5 text-primary font-bold text-xs hover:underline"
                    >
                      <Phone className="w-3.5 h-3.5" /> +91 6395678642
                    </a>
                  </div>
                </div>
              </div>
            </aside>

            {/* Detailed Policy Text */}
            <div className="lg:col-span-8 xl:col-span-9 space-y-10">

              {/* Section 1 */}
              <section id="overview" className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-soft scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                      1. Overview & Commitment
                    </h2>
                    <p className="text-xs text-muted-foreground">Scope and legal foundations</p>
                  </div>
                </div>
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    Welcome to <strong className="text-foreground">My Sky Trips</strong> ("we," "our," "us"). 
                    We are an elite experiential travel and helicopter pilgrimage provider headquartered in Dehradun, Uttarakhand, India. 
                    We specialize in Chardham and Do Dham Yatra by helicopter, Kedarnath and Badrinath charter flights, VIP shrine facilitation, luxury mountain getaways, and thrilling water adventures.
                  </p>
                  <p>
                    This Privacy Policy governs the manner in which My Sky Trips collects, uses, maintains, and discloses information collected from users (each, a "Passenger" or "User") of the website{" "}
                    <a href="https://myskytrips.com" className="text-primary underline font-medium">myskytrips.com</a> and our offline booking helipads.
                  </p>
                  <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 text-foreground text-xs leading-relaxed flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <strong>Our Promise:</strong> We respect your personal sanctity and will never misuse or trade your data. Because helicopter operations in high Himalayan altitudes demand strict weight calculations and aviation security checks, some data collection is required by civil aviation law.
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 2 */}
              <section id="information-collected" className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-soft scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                      2. Information We Collect
                    </h2>
                    <p className="text-xs text-muted-foreground">Data required for bookings and passenger management</p>
                  </div>
                </div>
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    We collect personal information directly when you request a flight quote, submit an enquiry form, complete an online booking, contact our helipad coordination desk, or communicate via WhatsApp or phone.
                  </p>

                  <div className="grid md:grid-cols-2 gap-4 my-4">
                    <div className="p-4 rounded-2xl bg-muted/50 border border-border/80">
                      <h4 className="font-semibold text-foreground text-sm mb-2 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary" /> Primary Passenger Details
                      </h4>
                      <ul className="text-xs space-y-1.5 list-disc pl-4 text-muted-foreground">
                        <li>Full Name (as printed on Government Photo ID)</li>
                        <li>Date of birth, age, and gender</li>
                        <li>Mobile phone number & primary email address</li>
                        <li>Residential / Postal address for invoicing</li>
                        <li>Emergency contact person & mobile number</li>
                      </ul>
                    </div>

                    <div className="p-4 rounded-2xl bg-muted/50 border border-border/80">
                      <h4 className="font-semibold text-foreground text-sm mb-2 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-primary" /> Pilgrimage & Medical Information
                      </h4>
                      <ul className="text-xs space-y-1.5 list-disc pl-4 text-muted-foreground">
                        <li>Aadhaar Card / Passport number (mandatory for helipad pass)</li>
                        <li>Individual body weight in kilograms (mandatory for flight manifest)</li>
                        <li>High-altitude health declarations or mobility assistance requests</li>
                        <li>Special dietary preferences for included VIP hospitality</li>
                      </ul>
                    </div>
                  </div>

                  <p className="text-xs">
                    You may visit our website anonymously to browse packages and view helicopter itineraries without submitting personal information. However, requesting a quote or booking tickets will require furnishing the above information.
                  </p>
                </div>
              </section>

              {/* Section 3 */}
              <section id="aviation-compliance" className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-soft scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 flex items-center justify-center">
                    <Plane className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                      3. Aviation & DGCA Passenger Data Compliance
                    </h2>
                    <p className="text-xs text-muted-foreground">Special guidelines for helicopter operations & Himalayan safety</p>
                  </div>
                </div>
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    Operating helicopters in the sensitive Himalayan terrain (such as Kedarnath Dham, Badrinath Dham, Gangotri, Yamunotri, and Hemkund Sahib) is strictly regulated by the 
                    <strong className="text-foreground"> Directorate General of Civil Aviation (DGCA)</strong>, the 
                    <strong className="text-foreground"> Uttarakhand Civil Aviation Development Authority (UCADA)</strong>, and local administration.
                  </p>

                  <div className="p-5 rounded-2xl bg-sky-500/5 border border-sky-500/20 space-y-3">
                    <h4 className="font-semibold text-foreground text-sm flex items-center gap-2">
                      <Scale className="w-4 h-4 text-sky-600" /> Weight Manifest Mandate
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Helicopter carrying capacity varies significantly based on air temperature, altitude, barometric pressure, and fuel loads. 
                      Passengers must supply accurate individual body weights at booking. Exact body weight is verified at the helipad scale. 
                      This data is shared solely with the flight crew, pilot-in-command, and helipad dispatch authority for passenger load manifests.
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-saffron/5 border border-saffron/20 space-y-3">
                    <h4 className="font-semibold text-foreground text-sm flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-saffron" /> Shrine Board & Security Verification
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Government photo IDs and biometric details are transmitted to the 
                      <em> Badrinath-Kedarnath Temple Committee (BKTC)</em>, police checkposts, and civil aviation marshals for priority VIP darshan tokens and helipad security clearance.
                    </p>
                  </div>
                </div>
              </section>

              {/* Section 4 */}
              <section id="how-we-use-data" className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-soft scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Eye className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                      4. How We Use Collected Information
                    </h2>
                    <p className="text-xs text-muted-foreground">Purposes for processing your details</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>My Sky Trips uses collected information for the following legitimate business and operational purposes:</p>
                  
                  <div className="grid sm:grid-cols-2 gap-3 pt-2">
                    <div className="p-3.5 rounded-xl bg-background border border-border">
                      <h5 className="font-semibold text-foreground text-xs mb-1">Ticket Issuance & Invoicing</h5>
                      <p className="text-[11px] text-muted-foreground">
                        Generating official boarding passes, digital e-tickets, GST-compliant tax invoices, and booking confirmations.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-background border border-border">
                      <h5 className="font-semibold text-foreground text-xs mb-1">Real-time Weather & Flight Alerts</h5>
                      <p className="text-[11px] text-muted-foreground">
                        Sending automated WhatsApp and SMS updates regarding Himalayan weather windows, take-off slots, and schedule adjustments.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-background border border-border">
                      <h5 className="font-semibold text-foreground text-xs mb-1">Ground VIP Coordination</h5>
                      <p className="text-[11px] text-muted-foreground">
                        Coordinating hotel transfers, helipad check-ins, local puja samagri arrangements, and temple priest coordination.
                      </p>
                    </div>

                    <div className="p-3.5 rounded-xl bg-background border border-border">
                      <h5 className="font-semibold text-foreground text-xs mb-1">Customer Service & Feedback</h5>
                      <p className="text-[11px] text-muted-foreground">
                        Addressing your pre-tour queries, accommodating family charter customizations, and post-trip satisfaction reviews.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 5 */}
              <section id="payment-security" className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-soft scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                      5. Payment & Financial Data Security
                    </h2>
                    <p className="text-xs text-muted-foreground">PCI-DSS compliance and financial confidentiality</p>
                  </div>
                </div>
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    Financial security is paramount to us. When you make an advance or full payment for any helicopter package or water adventure activity:
                  </p>
                  
                  <ul className="space-y-2 text-xs">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>No Card Data Stored:</strong> My Sky Trips servers never view, store, or log your full credit/debit card numbers, CVVs, UPI PINs, or net banking passwords.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Authorized Payment Gateways:</strong> Payments are processed directly through Reserve Bank of India (RBI) authorized, PCI-DSS Level 1 compliant payment gateways (such as Razorpay, Cashfree, or direct NEFT/RTGS bank escrow).</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>End-to-End Encryption:</strong> All transaction communication with our banking partners is transmitted over 256-bit Transport Layer Security (TLS/HTTPS).</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section 6 */}
              <section id="third-party-sharing" className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-soft scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                      6. Data Sharing & Third-Party Disclosure
                    </h2>
                    <p className="text-xs text-muted-foreground">Who we share data with and why</p>
                  </div>
                </div>
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    We do not sell, trade, or rent personal identification info to marketing brokers or data aggregation agencies. We only share necessary passenger details with authorized entities strictly to execute your itinerary:
                  </p>

                  <div className="space-y-2 text-xs">
                    <div className="p-3 bg-muted/40 rounded-xl">
                      <strong className="text-foreground">Aviation & Helipad Partners:</strong> Certified helicopter charter operators, ground handling crews, and fuel coordinators for flight plan filing.
                    </div>
                    <div className="p-3 bg-muted/40 rounded-xl">
                      <strong className="text-foreground">Government & Shrine Authorities:</strong> UCADA, DGCA, Uttarakhand Tourism Development Board, and Temple Committees for mandatory bio-metrics and permits.
                    </div>
                    <div className="p-3 bg-muted/40 rounded-xl">
                      <strong className="text-foreground">Emergency Rescue Services:</strong> In the rare event of severe altitude sickness or medical emergency, health and contact information will be immediately coordinated with local disaster management and medical air-ambulance units.
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 7 */}
              <section id="data-retention" className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-soft scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                      7. Data Retention & Safeguards
                    </h2>
                    <p className="text-xs text-muted-foreground">How we safeguard your files and records</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    We retain personal information only for as long as necessary to fulfill the purposes outlined in this policy, complete our contractual commitments, or satisfy legal and tax accounting requirements under Indian Law:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs">
                    <li>Booking and passenger manifests are securely archived for statutory compliance under civil aviation safety directives.</li>
                    <li>Financial invoices are retained for the mandatory period required by the Goods and Services Tax (GST) Act.</li>
                    <li>Technical security includes firewalls, role-based database authentication, and SSL certification across all web touchpoints.</li>
                  </ul>
                </div>
              </section>

              {/* Section 8 */}
              <section id="passenger-rights" className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-soft scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                      8. Your Privacy Rights (DPDPA 2023)
                    </h2>
                    <p className="text-xs text-muted-foreground">Your control over your digital personal data</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    Under the <strong className="text-foreground">Digital Personal Data Protection Act, 2023 (India)</strong> and international best practices, you have the right to:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 bg-muted/40 rounded-xl">
                      <strong className="text-foreground">Right of Access:</strong> Request a summary of the personal data processed by us and the processing activities undertaken.
                    </div>
                    <div className="p-3 bg-muted/40 rounded-xl">
                      <strong className="text-foreground">Right to Correction:</strong> Request correction of inaccurate or misleading personal data, and completion of incomplete data.
                    </div>
                    <div className="p-3 bg-muted/40 rounded-xl">
                      <strong className="text-foreground">Right to Erasure:</strong> Request deletion of your personal data where retention is no longer necessary for legal or aviation purposes.
                    </div>
                    <div className="p-3 bg-muted/40 rounded-xl">
                      <strong className="text-foreground">Right to Grievance Redressal:</strong> Readily register grievances with our dedicated data privacy officer.
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 9 */}
              <section id="cookies-tracking" className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-soft scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                      9. Cookies & Web Analytics
                    </h2>
                    <p className="text-xs text-muted-foreground">How we enhance your browsing experience</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    Our website may use "cookies" to optimize your digital experience. A cookie is a small text file placed on your hard drive by your web browser:
                  </p>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs">
                    <li><strong>Essential Cookies:</strong> Required to keep our itinerary viewer, enquiry dialogs, and navigation functional.</li>
                    <li><strong>Performance & Analytics Cookies:</strong> Used to understand visitor traffic, average page session length, and popular pilgrimage packages, enabling us to continuously improve our web performance.</li>
                  </ul>
                  <p className="text-xs">
                    You may choose to set your web browser to refuse cookies or to alert you when cookies are being sent. Note that some portions of the site may not function smoothly if cookies are fully disabled.
                  </p>
                </div>
              </section>

              {/* Section 10 */}
              <section id="grievance-officer" className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-soft scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                      10. Grievance Officer & Contact Details
                    </h2>
                    <p className="text-xs text-muted-foreground">Reach our official data protection desk</p>
                  </div>
                </div>
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    If you have questions, feedback, or requests regarding this Privacy Policy or your personal information, please contact our designated Grievance & Compliance team:
                  </p>

                  <div className="bg-muted/60 p-5 rounded-2xl border border-border space-y-3 text-xs">
                    <div className="font-semibold text-foreground text-sm">My Sky Trips Legal & Grievance Desk</div>
                    
                    <div className="flex items-center gap-3 text-foreground">
                      <MapPin className="w-4 h-4 text-primary shrink-0" />
                      <span>2nd Floor, ATS Arcade, Shop no. SF-09, Sahastradhara Rd, near IT Park, Dehradun, Uttarakhand 248013, India</span>
                    </div>

                    <div className="flex items-center gap-3 text-foreground">
                      <Mail className="w-4 h-4 text-primary shrink-0" />
                      <a href="mailto:contact@myskytrips.com" className="hover:underline text-primary font-medium">contact@myskytrips.com</a>
                    </div>

                    <div className="flex items-center gap-3 text-foreground">
                      <Phone className="w-4 h-4 text-primary shrink-0" />
                      <a href="tel:+916395678642" className="hover:underline text-primary font-medium">+91 6395678642</a>
                    </div>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    We pledge to acknowledge all formal privacy grievances within 48 business hours and resolve them within the timelines prescribed under Indian Information Technology Rules.
                  </p>
                </div>
              </section>

              {/* Quick Navigation Cards at Bottom */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-linear-to-r from-primary/10 via-background to-primary/5 rounded-3xl border border-border">
                <div>
                  <h4 className="font-serif font-bold text-foreground text-base">Have questions about your upcoming trip?</h4>
                  <p className="text-xs text-muted-foreground">Our travel consultants are available to assist with itinerary planning and helicopter slots.</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <Link to="/#contact">
                    <Button variant="default" size="sm" className="rounded-xl">
                      Contact Us
                    </Button>
                  </Link>
                  <Link to="/all-packages">
                    <Button variant="outline" size="sm" className="rounded-xl">
                      Explore Packages
                    </Button>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
