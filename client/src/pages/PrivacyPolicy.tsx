import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  ShieldCheck, 
  Lock, 
  Plane, 
  Scale, 
  FileText, 
  Eye, 
  UserCheck, 
  HelpCircle, 
  Mail, 
  Phone, 
  MapPin, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Printer,
  Bot,
  BellRing,
  Baby,
  Calendar,
  ExternalLink,
  Cookie,
  RefreshCw,
  Building2
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

const sections = [
  { id: "who-we-are", title: "1. Who We Are", icon: Building2 },
  { id: "information-collected", title: "2. Information We Collect", icon: FileText },
  { id: "how-we-use-info", title: "3. How We Use Information", icon: Eye },
  { id: "data-sharing", title: "4. Who We Share Data With", icon: UserCheck },
  { id: "ai-assistants", title: "5. Automated Replies & AI", icon: Bot },
  { id: "marketing-messages", title: "6. Marketing Messages", icon: BellRing },
  { id: "children", title: "7. Children's Privacy", icon: Baby },
  { id: "data-retention", title: "8. How Long We Keep Data", icon: Calendar },
  { id: "data-protection", title: "9. How We Protect Data", icon: Lock },
  { id: "your-rights", title: "10. Your Rights (DPDPA 2023)", icon: Scale },
  { id: "cookies-analytics", title: "11. Cookies & Analytics", icon: Cookie },
  { id: "external-links", title: "12. Links to Other Websites", icon: ExternalLink },
  { id: "policy-changes", title: "13. Changes to This Policy", icon: RefreshCw },
  { id: "grievance-officer", title: "14. Grievance Officer & Contact", icon: Mail },
];

export const PrivacyPolicy = () => {
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
                At <strong className="text-foreground font-semibold">My Sky Trips</strong> (a brand of Outclass Media), we protect your personal and aviation travel data with the utmost transparency, in accordance with the Digital Personal Data Protection Act, 2023.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5 bg-card border border-border px-3 py-1.5 rounded-lg shadow-xs">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>Last Updated: <strong>11 October 2026</strong></span>
                </div>
                <div className="flex items-center gap-1.5 bg-card border border-border px-3 py-1.5 rounded-lg shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>DPDPA 2023 & DGCA Aviation Compliant</span>
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
                <Building2 className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-foreground text-sm mb-1">DGCA Operator Partner</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Flights are operated exclusively by DGCA-permitted licensed aviation operators.
              </p>
            </div>

            <div className="bg-card/90 backdrop-blur-md p-5 rounded-2xl border border-border shadow-soft">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 flex items-center justify-center mb-3">
                <Lock className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-foreground text-sm mb-1">Zero Financial Passwords</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We never ask for or store your card CVVs, UPI PINs, or banking passwords.
              </p>
            </div>

            <div className="bg-card/90 backdrop-blur-md p-5 rounded-2xl border border-border shadow-soft">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-3">
                <Calendar className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-foreground text-sm mb-1">90-Day ID Deletion</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Passenger photo IDs and body weights are securely deleted within 90 days after your trip.
              </p>
            </div>

            <div className="bg-card/90 backdrop-blur-md p-5 rounded-2xl border border-border shadow-soft">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-foreground text-sm mb-1">No Data Selling</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We never sell, rent, or trade your personal information to third-party marketing brokers.
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
                    <p className="font-medium text-foreground">Grievance Desk</p>
                    <p className="text-muted-foreground text-[11px] leading-relaxed">
                      Officer: <strong>Surya Pratap</strong><br />
                      Response time: Within 2 working days
                    </p>
                    <a
                      href="mailto:contact@myskytrips.com"
                      className="inline-flex items-center gap-1.5 text-primary font-bold text-xs hover:underline"
                    >
                      <Mail className="w-3.5 h-3.5" /> contact@myskytrips.com
                    </a>
                  </div>
                </div>
              </div>
            </aside>

            {/* Detailed Policy Text */}
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
                    <p className="text-xs text-muted-foreground">About My Sky Trips & operational structure</p>
                  </div>
                </div>
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    <strong className="text-foreground">My Sky Trips</strong> is a helicopter travel company based in Dehradun, Uttarakhand. We design and sell helicopter travel packages and arrange private charters in Uttarakhand, Himachal Pradesh, and other parts of India.
                  </p>
                  
                  <div className="p-4 rounded-2xl bg-sky-500/5 border border-sky-500/20 text-foreground text-xs leading-relaxed flex items-start gap-3">
                    <Plane className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Aviation Operations:</strong> We do not own or operate helicopters. Every flight we sell is operated by a helicopter operator holding a valid permit from the <strong>Directorate General of Civil Aviation (DGCA)</strong>. We plan your trip and look after you before, during, and after it. Your flight is operated by our certified operator partner.
                    </div>
                  </div>

                  <p>
                    My Sky Trips is a brand of <strong className="text-foreground">Outclass Media</strong> ("My Sky Trips", "we", "us", "our"). Outclass Media is responsible for the personal data described in this policy.
                  </p>
                  <p>
                    This policy explains what personal data we collect, why we collect it, who we share it with, how long we keep it, and what your rights are. It applies to our website (<a href="https://www.myskytrips.com" className="text-primary underline font-medium">www.myskytrips.com</a>), our social media pages, WhatsApp, phone calls, email, and any booking you make with us.
                  </p>
                  <p>
                    We strictly follow the <strong className="text-foreground">Digital Personal Data Protection Act, 2023</strong> and other Indian laws that apply to us.
                  </p>
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
                    <p className="text-xs text-muted-foreground">Enquiries, booking details, and passenger data</p>
                  </div>
                </div>
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  
                  <div className="space-y-3">
                    <h4 className="font-semibold text-foreground text-sm flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" /> When You Enquire:
                    </h4>
                    <ul className="text-xs space-y-1.5 list-disc pl-5 text-muted-foreground">
                      <li>Your name, mobile number and, if you share it, your email address</li>
                      <li>Your travel dates, number of travellers, preferred trip, and any questions you send us</li>
                      <li>Messages you send us on WhatsApp, Instagram, Facebook, email, or our website forms, and notes from our phone calls with you</li>
                    </ul>
                  </div>

                  <div className="space-y-3 pt-2">
                    <h4 className="font-semibold text-foreground text-sm flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" /> When You Book:
                    </h4>
                    <ul className="text-xs space-y-1.5 list-disc pl-5 text-muted-foreground">
                      <li><strong>Full name:</strong> of each traveller, as printed on their government photo ID</li>
                      <li><strong>Age:</strong> of each traveller (for child fares and flight requirements)</li>
                      <li><strong>Body weight:</strong> of each traveller (helicopters have strict weight limits; operators need this to plan every flight safely)</li>
                      <li><strong>Government photo ID:</strong> of each traveller, such as Aadhaar or passport (operators and airport or helipad security need this before boarding)</li>
                      <li><strong>Billing details:</strong> name, address, and GSTIN, if you need a GST invoice</li>
                      <li><strong>Payment details:</strong> such as the amount paid, payment date, and transaction or UTR reference</li>
                    </ul>
                  </div>

                  <div className="space-y-3 pt-2">
                    <h4 className="font-semibold text-foreground text-sm flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-primary" /> If You Choose to Tell Us:
                    </h4>
                    <ul className="text-xs space-y-1.5 list-disc pl-5 text-muted-foreground">
                      <li>Health or mobility needs, such as wheelchair assistance or a medical condition the pilot or ground team should know about</li>
                      <li>Food preferences or special requests for your stay</li>
                      <li>An emergency contact name and number</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 text-foreground text-xs leading-relaxed flex items-start gap-3 mt-4">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <strong>Zero Sensitive Banking Storage:</strong> We do not need, and never ask for, your card number, CVV, UPI PIN, or banking passwords.
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 3 */}
              <section id="how-we-use-info" className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-soft scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Eye className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                      3. How We Use Your Information
                    </h2>
                    <p className="text-xs text-muted-foreground">Strictly necessary purposes for seamless journeys</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>We use your information only to:</p>
                  
                  <div className="grid sm:grid-cols-2 gap-3 pt-1 text-xs">
                    <div className="p-3.5 rounded-xl bg-muted/40 border border-border/80">
                      <strong className="text-foreground block mb-1">Enquiries & Quotations</strong>
                      Reply to your enquiries and send you tailored quotes.
                    </div>
                    <div className="p-3.5 rounded-xl bg-muted/40 border border-border/80">
                      <strong className="text-foreground block mb-1">Bookings & Logistics</strong>
                      Book your helicopter seats, stays, cabs, and other parts of your trip.
                    </div>
                    <div className="p-3.5 rounded-xl bg-muted/40 border border-border/80">
                      <strong className="text-foreground block mb-1">Aviation Safety & Manifests</strong>
                      Share passenger details with the helicopter operator for flight manifest, weight planning, and security checks.
                    </div>
                    <div className="p-3.5 rounded-xl bg-muted/40 border border-border/80">
                      <strong className="text-foreground block mb-1">Trip Alerts & Weather Updates</strong>
                      Send confirmations, invoices, reminders, and updates including weather delays, schedule changes, and cancellations.
                    </div>
                    <div className="p-3.5 rounded-xl bg-muted/40 border border-border/80">
                      <strong className="text-foreground block mb-1">Payments & Statutory Accounts</strong>
                      Process payments and refunds, and keep accounts and tax records.
                    </div>
                    <div className="p-3.5 rounded-xl bg-muted/40 border border-border/80">
                      <strong className="text-foreground block mb-1">On-Trip Assistance & Support</strong>
                      Help you during your trip and handle any complaints or special requests.
                    </div>
                    <div className="p-3.5 rounded-xl bg-muted/40 border border-border/80">
                      <strong className="text-foreground block mb-1">Feedback & Quality Reviews</strong>
                      Ask for your feedback after your trip to ensure premier service.
                    </div>
                    <div className="p-3.5 rounded-xl bg-muted/40 border border-border/80">
                      <strong className="text-foreground block mb-1">News & Travel Updates</strong>
                      Send you news and offers about our trips, if you have not opted out (see Section 6).
                    </div>
                  </div>

                  <p className="text-xs pt-2">
                    We will meet our legal obligations and protect our rights in a dispute. We will not use your information for any other purpose without telling you first.
                  </p>
                </div>
              </section>

              {/* Section 4 */}
              <section id="data-sharing" className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-soft scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                      4. Who We Share Your Information With
                    </h2>
                    <p className="text-xs text-muted-foreground">Authorized operational partners</p>
                  </div>
                </div>
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    <strong className="text-foreground">We do not sell, rent, or trade your personal data to anyone.</strong>
                  </p>
                  <p>
                    We share only the information needed for each purpose, and only with:
                  </p>

                  <div className="space-y-2.5 text-xs">
                    <div className="p-3.5 bg-muted/40 rounded-xl border border-border/70">
                      <strong className="text-foreground">Helicopter operators:</strong> The DGCA-permitted operator flying your trip receives each passenger's name, age, body weight, and photo ID details for the flight manifest, safety planning, and boarding.
                    </div>
                    <div className="p-3.5 bg-muted/40 rounded-xl border border-border/70">
                      <strong className="text-foreground">Airports, helipads & government authorities:</strong> Where required for security or boarding, for example airport security, helipad authorities, or the Uttarakhand Civil Aviation Development Authority (UCADA).
                    </div>
                    <div className="p-3.5 bg-muted/40 rounded-xl border border-border/70">
                      <strong className="text-foreground">Hotels, homestays & transport partners:</strong> The property and cab provider for your trip receive names, contact numbers, and travel details needed to host and transfer you.
                    </div>
                    <div className="p-3.5 bg-muted/40 rounded-xl border border-border/70">
                      <strong className="text-foreground">Payment providers & banks:</strong> Our bank and payment gateway process your payment and any refund.
                    </div>
                    <div className="p-3.5 bg-muted/40 rounded-xl border border-border/70">
                      <strong className="text-foreground">Technology service providers:</strong> Tools that help us run the business, such as WhatsApp and other Meta services, our customer-management (CRM) software, email and cloud storage providers, and our website host. They handle data only on our instructions.
                    </div>
                    <div className="p-3.5 bg-muted/40 rounded-xl border border-border/70">
                      <strong className="text-foreground">Professional advisers:</strong> Our chartered accountant, lawyers, or auditors, where needed.
                    </div>
                    <div className="p-3.5 bg-muted/40 rounded-xl border border-border/70">
                      <strong className="text-foreground">Law enforcement or regulators:</strong> When the law requires it, or in an emergency involving your safety.
                    </div>
                  </div>

                  <p className="text-xs">
                    Some of these service providers may store data on servers outside India. Where that happens, we use providers who protect data to a reasonable standard, and we follow any restrictions set by the Government of India.
                  </p>
                </div>
              </section>

              {/* Section 5 */}
              <section id="ai-assistants" className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-soft scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                      5. Automated Replies & AI Assistants
                    </h2>
                    <p className="text-xs text-muted-foreground">Rapid 24/7 responsiveness</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    When you message us on WhatsApp or Instagram, the first replies may come from an automated assistant, including AI-powered replies, so you get answers quickly at any hour.
                  </p>
                  <p className="text-xs">
                    These replies use information we have written about our trips and policies. A member of our team takes over for bookings, payments, and anything the assistant cannot answer, and you can ask to speak to a person at any time.
                  </p>
                </div>
              </section>

              {/* Section 6 */}
              <section id="marketing-messages" className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-soft scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <BellRing className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                      6. Marketing Messages
                    </h2>
                    <p className="text-xs text-muted-foreground">Opt-in notifications & opt-out controls</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    If you have enquired or booked with us, we may send you occasional updates and offers about our trips by WhatsApp, SMS, or email.
                  </p>
                  <p className="text-xs">
                    You can stop these at any time by replying <strong>STOP</strong> on WhatsApp, using the unsubscribe link in our emails, or writing to <a href="mailto:contact@myskytrips.com" className="text-primary underline">contact@myskytrips.com</a>. We will still send important transactional messages about trips you have actively booked.
                  </p>
                </div>
              </section>

              {/* Section 7 */}
              <section id="children" className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-soft scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Baby className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                      7. Children's Privacy
                    </h2>
                    <p className="text-xs text-muted-foreground">Parental & guardian consent</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    We take bookings for children only from a parent or legal guardian. When a parent or guardian gives us a child's details, they confirm that they have the right to do so and consent on the child's behalf.
                  </p>
                  <p className="text-xs">
                    We use children's data only to plan and operate their trip safely, and <strong>never for marketing</strong>.
                  </p>
                </div>
              </section>

              {/* Section 8 */}
              <section id="data-retention" className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-soft scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                      8. How Long We Keep Your Information
                    </h2>
                    <p className="text-xs text-muted-foreground">Clear retention & timely deletion schedules</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <div className="space-y-2.5 text-xs">
                    <div className="p-3.5 bg-muted/40 rounded-xl border border-border/70 flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-foreground">Copies of Government Photo ID:</strong> Deleted within <strong>90 days</strong> after your trip is completed or cancelled, unless needed for an open dispute or legal requirement.
                      </div>
                    </div>

                    <div className="p-3.5 bg-muted/40 rounded-xl border border-border/70 flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-foreground">Body weight and health or mobility information:</strong> Kept with your booking for the same <strong>90 days</strong>, then permanently deleted.
                      </div>
                    </div>

                    <div className="p-3.5 bg-muted/40 rounded-xl border border-border/70 flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-foreground">Booking records, invoices and payment records:</strong> Kept for as long as GST, income-tax, and other Indian statutory laws require.
                      </div>
                    </div>

                    <div className="p-3.5 bg-muted/40 rounded-xl border border-border/70 flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <strong className="text-foreground">Enquiry details and messages from people who did not book:</strong> Kept for up to <strong>2 years</strong> after your last contact with us, then deleted.
                      </div>
                    </div>
                  </div>

                  <p className="text-xs pt-1">
                    When information is no longer needed, we securely delete it or anonymise it so it can no longer identify you.
                  </p>
                </div>
              </section>

              {/* Section 9 */}
              <section id="data-protection" className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-soft scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Lock className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                      9. How We Protect Your Information
                    </h2>
                    <p className="text-xs text-muted-foreground">Technical and administrative safeguards</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>We take reasonable and diligent steps to keep your data safe, including:</p>
                  <ul className="list-disc pl-5 space-y-1.5 text-xs">
                    <li>Our website uses HTTPS end-to-end encryption</li>
                    <li>Only team members who need your information to serve you can access it</li>
                    <li>Our business accounts and tools are password-protected with role restrictions</li>
                    <li>We work only with partners we trust to handle passenger information responsibly</li>
                  </ul>
                  <p className="text-xs">
                    No system is completely secure. If a data breach affects your personal data, we will inform you and the authorities as the law requires.
                  </p>
                </div>
              </section>

              {/* Section 10 */}
              <section id="your-rights" className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-soft scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Scale className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                      10. Your Rights
                    </h2>
                    <p className="text-xs text-muted-foreground">Under the Digital Personal Data Protection Act, 2023</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    Under the <strong className="text-foreground">Digital Personal Data Protection Act, 2023</strong> you have the right to:
                  </p>

                  <div className="grid sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3.5 bg-muted/40 rounded-xl border border-border/70">
                      <strong className="text-foreground block mb-1">Access & Summary</strong>
                      Ask what personal data we hold about you and how we use it.
                    </div>
                    <div className="p-3.5 bg-muted/40 rounded-xl border border-border/70">
                      <strong className="text-foreground block mb-1">Correction & Updates</strong>
                      Ask us to correct or update inaccurate or incomplete data.
                    </div>
                    <div className="p-3.5 bg-muted/40 rounded-xl border border-border/70">
                      <strong className="text-foreground block mb-1">Erasure / Deletion</strong>
                      Ask us to delete your data, unless we must keep it by law.
                    </div>
                    <div className="p-3.5 bg-muted/40 rounded-xl border border-border/70">
                      <strong className="text-foreground block mb-1">Withdraw Consent</strong>
                      Withdraw your consent at any time (this will not affect anything already done, and we may not be able to complete a booking without required details).
                    </div>
                    <div className="p-3.5 bg-muted/40 rounded-xl border border-border/70">
                      <strong className="text-foreground block mb-1">Nomination</strong>
                      Nominate another person to exercise these rights for you in case of death or incapacity.
                    </div>
                    <div className="p-3.5 bg-muted/40 rounded-xl border border-border/70">
                      <strong className="text-foreground block mb-1">Grievance Redressal</strong>
                      Raise a complaint with us, and, if not satisfied, with the Data Protection Board of India.
                    </div>
                  </div>

                  <p className="text-xs pt-2">
                    To use any of these rights, write to <a href="mailto:contact@myskytrips.com" className="text-primary underline font-medium">contact@myskytrips.com</a> from the email address or phone number you used with us, so we can confirm it is you.
                  </p>
                </div>
              </section>

              {/* Section 11 */}
              <section id="cookies-analytics" className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-soft scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Cookie className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                      11. Cookies and Website Analytics
                    </h2>
                    <p className="text-xs text-muted-foreground">Optimizing your website visit</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    Our website uses cookies and similar tools to keep the site working, understand how visitors use it, and measure our advertising. These may include Google Analytics and Meta (Facebook and Instagram) tools.
                  </p>
                  <p className="text-xs">
                    You can block or delete cookies in your browser settings. Some parts of the website may not work properly without them.
                  </p>
                </div>
              </section>

              {/* Section 12 */}
              <section id="external-links" className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-soft scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <ExternalLink className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                      12. Links to Other Websites
                    </h2>
                    <p className="text-xs text-muted-foreground">External platforms & third parties</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    Our website and messages may link to other websites, such as our partners' sites or social media. We are not responsible for their privacy practices, so please read their policies.
                  </p>
                </div>
              </section>

              {/* Section 13 */}
              <section id="policy-changes" className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-soft scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <RefreshCw className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                      13. Changes to This Policy
                    </h2>
                    <p className="text-xs text-muted-foreground">Updates & revisions</p>
                  </div>
                </div>
                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    We may update this policy as our services or the law change. The latest version will always be on this page, with the date it was last updated. If we make an important change, we will let you know through our website or by message.
                  </p>
                </div>
              </section>

              {/* Section 14 */}
              <section id="grievance-officer" className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-soft scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                      14. Grievance Officer and Contact
                    </h2>
                    <p className="text-xs text-muted-foreground">Designated authority under Indian data protection law</p>
                  </div>
                </div>
                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    If you have a question or complaint about your personal data, please contact our Grievance Officer:
                  </p>

                  <div className="bg-muted/60 p-5 rounded-2xl border border-border space-y-3 text-xs">
                    <div>
                      <div className="font-bold text-foreground text-sm">Surya Pratap</div>
                      <div className="text-primary font-medium">Grievance Officer, My Sky Trips (Outclass Media)</div>
                    </div>
                    
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

                  <p className="text-xs text-muted-foreground">
                    We will acknowledge your request within <strong>2 working days</strong> and aim to resolve it within <strong>30 days</strong>.
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

export default PrivacyPolicy;
