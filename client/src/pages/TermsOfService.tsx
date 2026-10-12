import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  Building2, 
  CalendarCheck, 
  CreditCard, 
  UserCheck, 
  CloudRain, 
  CalendarClock, 
  Plane, 
  Camera, 
  ShieldCheck, 
  Copyright, 
  MessageSquareWarning, 
  Gavel, 
  RefreshCw, 
  Mail, 
  ArrowLeft, 
  Clock, 
  CheckCircle2, 
  Printer, 
  Phone, 
  MapPin, 
  AlertCircle,
  Luggage,
  Scale
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

const sections = [
  { id: "who-we-are", title: "1. Who We Are", icon: Building2 },
  { id: "bookings", title: "2. Bookings", icon: CalendarCheck },
  { id: "payment", title: "3. Payment", icon: CreditCard },
  { id: "passenger-requirements", title: "4. Passenger Requirements", icon: UserCheck },
  { id: "weather-operations", title: "5. Weather & Flight Ops", icon: CloudRain },
  { id: "changes-by-you", title: "6. Changes by You", icon: CalendarClock },
  { id: "private-charters", title: "7. Private Charters", icon: Plane },
  { id: "photos-videos", title: "8. Photos and Videos", icon: Camera },
  { id: "our-responsibility", title: "9. Our Responsibility", icon: ShieldCheck },
  { id: "website-content", title: "10. Website Content", icon: Copyright },
  { id: "complaints", title: "11. Complaints", icon: MessageSquareWarning },
  { id: "governing-law", title: "12. Governing Law", icon: Gavel },
  { id: "changes-to-terms", title: "13. Changes to These Terms", icon: RefreshCw },
  { id: "contact", title: "14. Contact Information", icon: Mail },
];

export const TermsOfService = () => {
  const [activeSection, setActiveSection] = useState("who-we-are");

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
                Legal & Terms
              </span>
            </div>

            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-saffron/15 text-saffron text-xs font-bold tracking-wide uppercase mb-4">
                <ShieldCheck className="w-4 h-4 text-saffron" />
                Service Agreement & Guidelines
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-extrabold tracking-tight text-foreground mb-5">
                Terms of <span className="text-gradient-sky">Service</span>
              </h1>
              
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-3xl mb-6">
                These terms apply to every enquiry, booking, and trip with <strong className="text-foreground font-semibold">My Sky Trips</strong>. By making a booking or payment, you agree to them on behalf of yourself and everyone travelling in your booking.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5 bg-card border border-border px-3 py-1.5 rounded-lg shadow-xs">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>Last Updated: <strong>11 October 2026</strong></span>
                </div>
                <div className="flex items-center gap-1.5 bg-card border border-border px-3 py-1.5 rounded-lg shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Binding Agreement for All Bookings</span>
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handlePrint}
                  className="gap-2 h-8 text-xs font-medium rounded-lg ml-auto hidden sm:flex print:hidden"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print Terms
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
                <Plane className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-foreground text-sm mb-1">DGCA Operator Partner</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                All flights are operated by DGCA-permitted licensed aviation operators.
              </p>
            </div>

            <div className="bg-card/90 backdrop-blur-md p-5 rounded-2xl border border-border shadow-soft">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 flex items-center justify-center mb-3">
                <Scale className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-foreground text-sm mb-1">75 kg Weight Allowance</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                75 kg passenger allowance. Excess above 75 kg is charged at ₹100/kg.
              </p>
            </div>

            <div className="bg-card/90 backdrop-blur-md p-5 rounded-2xl border border-border shadow-soft">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-3">
                <Luggage className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-foreground text-sm mb-1">5 kg Soft Baggage</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Strictly up to 5 kg in soft duffel bags per guest. Hard suitcases are prohibited.
              </p>
            </div>

            <div className="bg-card/90 backdrop-blur-md p-5 rounded-2xl border border-border shadow-soft">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-3">
                <CreditCard className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-foreground text-sm mb-1">Official Payments Only</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Pay only to official Outclass Media bank accounts or gateway links.
              </p>
            </div>
          </div>
        </div>

        {/* Content Section with Sticky Sidebar */}
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

            {/* Sticky Table of Contents (Desktop) */}
            <aside className="hidden lg:block lg:col-span-4 xl:col-span-3">
              <div className="sticky top-28 bg-card rounded-2xl border border-border p-5 shadow-soft max-h-[calc(100vh-140px)] overflow-y-auto">
                <div className="flex items-center gap-2 pb-3 mb-3 border-b border-border">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                    Terms Index
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
                    <p className="font-medium text-foreground">Related Policies</p>
                    <div className="space-y-1">
                      <Link to="/booking-policy" className="block text-primary hover:underline text-[11px] font-medium">
                        → Booking & Cancellation Policy
                      </Link>
                      <Link to="/privacy-policy" className="block text-primary hover:underline text-[11px] font-medium">
                        → Privacy Policy
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </aside>

            {/* Detailed Terms Text */}
            <div className="lg:col-span-8 xl:col-span-9 space-y-10">

              {/* Section 1 */}
              <section id="who-we-are" className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-soft scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                      1. Who We Are
                    </h2>
                    <p className="text-xs text-muted-foreground">Company background and operational model</p>
                  </div>
                </div>
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    <strong className="text-foreground">My Sky Trips</strong> is a brand of <strong className="text-foreground">Outclass Media</strong>, based in Dehradun, Uttarakhand ("My Sky Trips", "we", "us").
                  </p>
                  <p>
                    We design and sell helicopter travel packages and arrange private charters. We do not own or operate helicopters. Every flight is operated by a helicopter operator holding a permit from the <strong>Directorate General of Civil Aviation (DGCA)</strong>. Stays, cabs, and activities in your package are provided by our vetted hotel, transport, and activity partners.
                  </p>
                  
                  <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 text-foreground text-xs leading-relaxed flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <strong>Our Role:</strong> To plan your trip, book each part of it with our partners, and look after you before, during, and after it.
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 2 */}
              <section id="bookings" className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-soft scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <CalendarCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                      2. Bookings
                    </h2>
                    <p className="text-xs text-muted-foreground">Confirmation guidelines and passenger criteria</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <ul className="list-disc pl-5 space-y-2 text-xs">
                    <li>A booking is confirmed only after we receive the advance payment and send you a written confirmation on WhatsApp or email.</li>
                    <li>Each booking is for a minimum of 2 and a maximum of 6 passengers, unless we agree otherwise in writing.</li>
                    <li>Please check the names, dates, and details in your confirmation and tell us about any mistake straight away.</li>
                    <li>Prices, inclusions, and itineraries are as shown on our website or in the quote we send you. Package prices are subject to <strong>5% GST</strong> unless stated otherwise.</li>
                    <li>Child fares apply as shown on the package page or in your quote.</li>
                    <li>The price confirmed at booking will not change, except for changes in government taxes.</li>
                  </ul>
                </div>
              </section>

              {/* Section 3 */}
              <section id="payment" className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-soft scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                      3. Payment
                    </h2>
                    <p className="text-xs text-muted-foreground">Deposit schedule and authorized payment channels</p>
                  </div>
                </div>
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <ul className="list-disc pl-5 space-y-2 text-xs">
                    <li>An advance of <strong>50% of the package price</strong> is required to confirm a booking.</li>
                    <li>The balance is due at least <strong>10 days before your travel date</strong>. For bookings made within 10 days of travel, the full amount is due at booking.</li>
                    <li>If the balance is not received on time, we may treat the booking as cancelled by you, and the <Link to="/booking-policy" className="text-primary underline font-medium">Booking & Cancellation Policy</Link> will apply.</li>
                  </ul>

                  <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/20 text-foreground text-xs leading-relaxed flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Security Advisory:</strong> We accept bank transfer (NEFT/IMPS), UPI, and payments through our official payment gateway. Payments must be made only to the official <strong>My Sky Trips (Outclass Media)</strong> bank account, UPI ID, or secure payment link shared by our verified team. We will never ask you to pay into any personal bank account.
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 4 */}
              <section id="passenger-requirements" className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-soft scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                      4. Passenger Requirements
                    </h2>
                    <p className="text-xs text-muted-foreground">Aviation security, weight allowances, baggage, and health</p>
                  </div>
                </div>

                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  
                  {/* Identity */}
                  <div className="p-4 rounded-2xl bg-muted/40 border border-border/80 space-y-2">
                    <h4 className="font-semibold text-foreground text-xs uppercase tracking-wider flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" /> Identity & Verification
                    </h4>
                    <p className="text-xs">
                      Every passenger must carry an original government photo ID (Aadhaar card or passport) on the day of travel. The name must match the booking. Passengers without valid ID may be refused boarding by the operator or airport security. This is treated as a no-show.
                    </p>
                  </div>

                  {/* Weight and Luggage */}
                  <div className="p-4 rounded-2xl bg-muted/40 border border-border/80 space-y-2">
                    <h4 className="font-semibold text-foreground text-xs uppercase tracking-wider flex items-center gap-2">
                      <Scale className="w-4 h-4 text-primary" /> Weight and Luggage Rules
                    </h4>
                    <p className="text-xs">
                      Helicopters have strict weight limits that the pilot must follow for safety:
                    </p>
                    <ul className="list-disc pl-5 space-y-1.5 text-xs">
                      <li>Each passenger's body-weight allowance is <strong>75 kg</strong>. Weight above 75 kg is charged at <strong>₹100 per kg</strong>, payable at check-in.</li>
                      <li>Each passenger may carry up to <strong>5 kg of luggage in a soft bag</strong>. Hard suitcases are strictly not allowed on board.</li>
                      <li>You must tell us each passenger's correct body weight at the time of booking. Every passenger is weighed at check-in.</li>
                      <li>If the actual weight or luggage is much higher than declared, the operator may refuse boarding or change seating to keep the flight safe. Extra charges or a refused boarding in this case are not refundable.</li>
                    </ul>
                  </div>

                  {/* Reporting Time */}
                  <div className="p-4 rounded-2xl bg-muted/40 border border-border/80 space-y-2">
                    <h4 className="font-semibold text-foreground text-xs uppercase tracking-wider flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" /> Reporting Time
                    </h4>
                    <p className="text-xs">
                      Passengers must report at the airport or helipad by the time given in the confirmation (for example, 7:00 AM at Jolly Grant Airport, Dehradun, or 9:00 AM at Chandigarh Airport). Late arrival may mean the flight leaves without you, which will be treated as a no-show.
                    </p>
                  </div>

                  {/* Health and Safety */}
                  <div className="p-4 rounded-2xl bg-muted/40 border border-border/80 space-y-2">
                    <h4 className="font-semibold text-foreground text-xs uppercase tracking-wider flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-primary" /> Health & Safety Instructions
                    </h4>
                    <ul className="list-disc pl-5 space-y-1.5 text-xs">
                      <li>Please tell us at booking about any medical condition, mobility need, pregnancy, or recent surgery. The operator may ask for a doctor's fitness certificate or refuse carriage if it believes flying is not safe for the passenger.</li>
                      <li>Passengers must follow every instruction from the pilot, flight crew, and ground staff. The pilot's decision on safety is final.</li>
                      <li>Passengers who are under the influence of alcohol or drugs, or who behave in a way that puts others at risk, may be refused boarding without refund.</li>
                      <li>Dangerous goods, weapons, and flammable items are strictly prohibited on board.</li>
                    </ul>
                  </div>

                </div>
              </section>

              {/* Section 5 */}
              <section id="weather-operations" className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-soft scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 flex items-center justify-center">
                    <CloudRain className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                      5. Weather and Flight Operations
                    </h2>
                    <p className="text-xs text-muted-foreground">Mountain aviation conditions & pilot discretion</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    Helicopter flying in the mountains depends on weather, visibility, and operational conditions. Most of our flights operate as planned, but some may be delayed, rescheduled, or cancelled.
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-xs">
                    <li>The operator and pilot alone decide whether a flight can operate safely. We cannot override that decision.</li>
                    <li>Flight timings may change at short notice. We will keep you continuously updated on WhatsApp or by phone.</li>
                    <li>If a flight does not operate because of weather or an operational reason, the options set out in our <Link to="/booking-policy" className="text-primary underline font-medium">Booking & Cancellation Policy</Link> apply.</li>
                    <li>The operator may change the aircraft, route, or timing for safety or operational reasons.</li>
                  </ul>
                </div>
              </section>

              {/* Section 6 */}
              <section id="changes-by-you" className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-soft scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <CalendarClock className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                      6. Changes by You
                    </h2>
                    <p className="text-xs text-muted-foreground">Date change requests & fee policy</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p className="text-xs">
                    Date changes are possible only on a case-by-case basis, depending on availability with the operator and hotel. A change fee may apply, and you will be told the amount before we make the change. If a change is not possible, cancellation charges apply as per the <Link to="/booking-policy" className="text-primary underline font-medium">Booking & Cancellation Policy</Link>.
                  </p>
                </div>
              </section>

              {/* Section 7 */}
              <section id="private-charters" className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-soft scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Plane className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                      7. Private Charters
                    </h2>
                    <p className="text-xs text-muted-foreground">Custom quotation agreements</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p className="text-xs">
                    Private charter bookings are made on the basis of a separate written quotation. The payment schedule, cancellation terms, and inclusions in that quotation apply to the charter and take priority over these terms where they differ.
                  </p>
                </div>
              </section>

              {/* Section 8 */}
              <section id="photos-videos" className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-soft scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Camera className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                      8. Photos and Videos
                    </h2>
                    <p className="text-xs text-muted-foreground">Media capture, passenger privacy, and drone restrictions</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p className="text-xs">
                    We may photograph or film our trips for our website and social media. If you prefer not to appear, tell our team before or during the trip and we will gladly respect that.
                  </p>
                  <p className="text-xs">
                    Filming inside the helicopter is strictly at the pilot's discretion. <strong>Drones are strictly forbidden</strong> near airports or helipads under aviation security law.
                  </p>
                </div>
              </section>

              {/* Section 9 */}
              <section id="our-responsibility" className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-soft scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                      9. Our Responsibility
                    </h2>
                    <p className="text-xs text-muted-foreground">Partner obligations, force majeure & limitation of liability</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <ul className="list-disc pl-5 space-y-2 text-xs">
                    <li>We take utmost care in choosing our partners and arranging every part of your trip.</li>
                    <li>The helicopter operator is responsible for the flight itself, including safety, crew, aircraft, and flight decisions. Hotels, transport, and activity partners are responsible for their own services.</li>
                    <li>We are not responsible for delays, cancellations, loss, or damage caused by weather, natural events, strikes, government orders, road closures, operator decisions, or other events outside our control.</li>
                    <li>Our total responsibility to you for any booking is limited to the amount you paid us for that booking.</li>
                    <li>Travel insurance is not included unless stated in your quote. We strongly recommend that you take comprehensive travel insurance.</li>
                    <li>Nothing in these terms limits any statutory right you have under Indian consumer protection law.</li>
                  </ul>
                </div>
              </section>

              {/* Section 10 */}
              <section id="website-content" className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-soft scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Copyright className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                      10. Website Content
                    </h2>
                    <p className="text-xs text-muted-foreground">Intellectual property rights</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p className="text-xs">
                    The photos, videos, text, and logos on our website and social media belong to My Sky Trips or are used with permission. Please do not copy, reproduce, or reuse them without our written permission.
                  </p>
                </div>
              </section>

              {/* Section 11 */}
              <section id="complaints" className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-soft scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <MessageSquareWarning className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                      11. Complaints
                    </h2>
                    <p className="text-xs text-muted-foreground">Resolution protocol & turnaround times</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p className="text-xs">
                    If something goes wrong, please tell our team immediately during the trip so we can try to fix it on the spot. You can also write to us afterwards at <a href="mailto:contact@myskytrips.com" className="text-primary underline">contact@myskytrips.com</a>.
                  </p>
                  <p className="text-xs">
                    We will formally acknowledge your complaint within <strong>2 working days</strong> and aim to resolve it within <strong>30 days</strong>.
                  </p>
                </div>
              </section>

              {/* Section 12 */}
              <section id="governing-law" className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-soft scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Gavel className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                      12. Governing Law
                    </h2>
                    <p className="text-xs text-muted-foreground">Legal jurisdiction</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p className="text-xs">
                    These terms are governed by the laws of India. Any dispute will be subject to the exclusive jurisdiction of the courts at <strong>Dehradun, Uttarakhand</strong>.
                  </p>
                </div>
              </section>

              {/* Section 13 */}
              <section id="changes-to-terms" className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-soft scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <RefreshCw className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                      13. Changes to These Terms
                    </h2>
                    <p className="text-xs text-muted-foreground">Periodic amendments</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p className="text-xs">
                    We may update these terms from time to time. The version on our website when you make your booking applies to that booking.
                  </p>
                </div>
              </section>

              {/* Section 14 */}
              <section id="contact" className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-soft scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                      14. Contact Information
                    </h2>
                    <p className="text-xs text-muted-foreground">Registered office and assistance channels</p>
                  </div>
                </div>
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <div className="bg-muted/60 p-5 rounded-2xl border border-border space-y-3 text-xs">
                    <div className="font-bold text-foreground text-sm">My Sky Trips (Outclass Media)</div>
                    
                    <div className="flex items-center gap-3 text-foreground">
                      <MapPin className="w-4 h-4 text-primary shrink-0" />
                      <span>2nd Floor, ATS Arcade, Shop No. SF-09, Sahastradhara Road, near IT Park, Dehradun, Uttarakhand 248013, India</span>
                    </div>

                    <div className="flex items-center gap-3 text-foreground">
                      <Mail className="w-4 h-4 text-primary shrink-0" />
                      <a href="mailto:contact@myskytrips.com" className="hover:underline text-primary font-medium">contact@myskytrips.com</a>
                    </div>

                    <div className="flex items-center gap-3 text-foreground">
                      <Phone className="w-4 h-4 text-primary shrink-0" />
                      <a href="tel:+916395678642" className="hover:underline text-primary font-medium">+91 63956 78642</a>
                      <span className="text-muted-foreground">(Phone / WhatsApp)</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Quick Navigation Cards at Bottom */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-linear-to-r from-primary/10 via-background to-primary/5 rounded-3xl border border-border">
                <div>
                  <h4 className="font-serif font-bold text-foreground text-base">Ready to embark on your pilgrimage?</h4>
                  <p className="text-xs text-muted-foreground">Explore our curated luxury helicopter itineraries and private charters.</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <Link to="/booking-policy">
                    <Button variant="default" size="sm" className="rounded-xl">
                      Booking Policy
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

export default TermsOfService;
