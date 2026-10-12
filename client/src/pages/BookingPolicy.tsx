import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { 
  CreditCard, 
  CalendarX2, 
  CloudRain, 
  ShieldAlert, 
  CalendarDays, 
  UserCheck, 
  Ban, 
  Banknote, 
  Plane, 
  HelpCircle, 
  Mail, 
  Phone, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  Printer,
  Car,
  RefreshCw,
  MessageCircle
} from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";

const sections = [
  { id: "payment-schedule", title: "1. Payment Schedule", icon: CreditCard },
  { id: "if-you-cancel", title: "2. If You Cancel", icon: CalendarX2 },
  { id: "flight-disruption", title: "3. If Flight Does Not Operate", icon: CloudRain },
  { id: "we-cancel", title: "4. If We Have to Cancel", icon: ShieldAlert },
  { id: "changing-date", title: "5. Changing Your Date", icon: CalendarDays },
  { id: "name-changes", title: "6. Name Changes", icon: UserCheck },
  { id: "unused-services", title: "7. Unused Services", icon: Ban },
  { id: "how-refunds-paid", title: "8. How Refunds Are Paid", icon: Banknote },
  { id: "private-charters", title: "9. Private Charters", icon: Plane },
  { id: "questions", title: "10. Questions & Contact", icon: HelpCircle },
];

export const BookingPolicy = () => {
  const [activeSection, setActiveSection] = useState("payment-schedule");

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
                Terms & Policies
              </span>
            </div>

            <div className="max-w-4xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-saffron/15 text-saffron text-xs font-bold tracking-wide uppercase mb-4">
                <CreditCard className="w-4 h-4 text-saffron" />
                Clear, Fair & Transparent Bookings
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-extrabold tracking-tight text-foreground mb-5">
                Booking & Cancellation <span className="text-gradient-sky">Policy</span>
              </h1>
              
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed max-w-3xl mb-6">
                This policy explains how payments, cancellations, changes, and refunds work for <strong className="text-foreground font-semibold">My Sky Trips</strong> packages. It forms part of our Terms of Service.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs md:text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5 bg-card border border-border px-3 py-1.5 rounded-lg shadow-xs">
                  <Clock className="w-4 h-4 text-primary" />
                  <span>Last Updated: <strong>11 October 2026</strong></span>
                </div>
                <div className="flex items-center gap-1.5 bg-card border border-border px-3 py-1.5 rounded-lg shadow-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Applicable to all My Sky Trips Packages & Charters</span>
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
                <CreditCard className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-foreground text-sm mb-1">50% Advance Booking</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Confirm your seats with 50% deposit; balance payable 10 days before travel.
              </p>
            </div>

            <div className="bg-card/90 backdrop-blur-md p-5 rounded-2xl border border-border shadow-soft">
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 flex items-center justify-center mb-3">
                <CloudRain className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-foreground text-sm mb-1">Weather Protection</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Continue comfortably by arranged road cab or cancel with hotel charges only.
              </p>
            </div>

            <div className="bg-card/90 backdrop-blur-md p-5 rounded-2xl border border-border shadow-soft">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center mb-3">
                <Banknote className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-foreground text-sm mb-1">Fast 5-7 Day Refunds</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Refunds processed directly back to your original source account or UPI ID.
              </p>
            </div>

            <div className="bg-card/90 backdrop-blur-md p-5 rounded-2xl border border-border shadow-soft">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center mb-3">
                <UserCheck className="w-5 h-5" />
              </div>
              <h4 className="font-semibold text-foreground text-sm mb-1">Name Replacement</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Replace a passenger up to 10 days prior with operator approval and valid ID.
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
                  <CreditCard className="w-4 h-4 text-primary" />
                  <span className="font-semibold text-xs uppercase tracking-wider text-muted-foreground">
                    Policy Index
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
                    <p className="font-medium text-foreground">Need Assistance?</p>
                    <p className="text-muted-foreground text-[11px] leading-relaxed">
                      Questions regarding cancellation or payments? Connect with our team.
                    </p>
                    <a
                      href="https://wa.me/916395678642"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-emerald-600 font-bold text-xs hover:underline"
                    >
                      <MessageCircle className="w-3.5 h-3.5" /> WhatsApp +91 63956 78642
                    </a>
                  </div>
                </div>
              </div>
            </aside>

            {/* Detailed Policy Text */}
            <div className="lg:col-span-8 xl:col-span-9 space-y-10">

              {/* Section 1 */}
              <section id="payment-schedule" className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-soft scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                      1. Payment Schedule
                    </h2>
                    <p className="text-xs text-muted-foreground">Booking deposits & timeline</p>
                  </div>
                </div>

                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    To guarantee helicopter slots, ground logistics, and luxury accommodations, payments are scheduled as follows:
                  </p>

                  <div className="grid sm:grid-cols-3 gap-4 my-2">
                    <div className="p-4 rounded-2xl bg-muted/50 border border-border/80">
                      <div className="text-primary font-bold text-lg mb-1">50%</div>
                      <h4 className="font-semibold text-foreground text-xs mb-1">At Booking</h4>
                      <p className="text-[11px] text-muted-foreground">
                        Due at the time of booking to confirm and secure your passenger seats.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-muted/50 border border-border/80">
                      <div className="text-primary font-bold text-lg mb-1">Balance Due</div>
                      <h4 className="font-semibold text-foreground text-xs mb-1">10 Days Prior</h4>
                      <p className="text-[11px] text-muted-foreground">
                        The balance amount must be settled at least 10 days before your travel date.
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-muted/50 border border-border/80">
                      <div className="text-primary font-bold text-lg mb-1">100%</div>
                      <h4 className="font-semibold text-foreground text-xs mb-1">Within 10 Days</h4>
                      <p className="text-[11px] text-muted-foreground">
                        For bookings made within 10 days of travel, the full amount is due at booking.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 2 */}
              <section id="if-you-cancel" className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-soft scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <CalendarX2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                      2. If You Cancel
                    </h2>
                    <p className="text-xs text-muted-foreground">Cancellation guidelines and refund slabs</p>
                  </div>
                </div>

                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    Cancellations must be sent to us in writing, via WhatsApp at{" "}
                    <a href="https://wa.me/916395678642" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">
                      +91 63956 78642
                    </a>{" "}
                    or by email to{" "}
                    <a href="mailto:contact@myskytrips.com" className="text-primary font-semibold hover:underline">
                      contact@myskytrips.com
                    </a>
                    . The date and time we receive your written message is officially treated as the cancellation date.
                  </p>

                  <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 text-foreground text-xs leading-relaxed flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <div>
                      <strong>Calculation Basis:</strong> Refunds are calculated strictly on the total amount you have paid.
                    </div>
                  </div>

                  {/* Refund Slabs Table */}
                  <div className="overflow-hidden rounded-2xl border border-border">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-muted/80 text-foreground uppercase tracking-wider font-semibold border-b border-border">
                        <tr>
                          <th className="py-3.5 px-4">Cancellation Notice Period</th>
                          <th className="py-3.5 px-4 text-right">Refund Payable</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        <tr className="hover:bg-muted/30 transition-colors">
                          <td className="py-3.5 px-4 font-medium text-foreground">30 days or more before travel</td>
                          <td className="py-3.5 px-4 text-right">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 font-bold text-xs">
                              90% refund
                            </span>
                          </td>
                        </tr>
                        <tr className="hover:bg-muted/30 transition-colors">
                          <td className="py-3.5 px-4 font-medium text-foreground">20 to 29 days before travel</td>
                          <td className="py-3.5 px-4 text-right">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-600 font-bold text-xs">
                              50% refund
                            </span>
                          </td>
                        </tr>
                        <tr className="hover:bg-muted/30 transition-colors">
                          <td className="py-3.5 px-4 font-medium text-foreground">5 to 19 days before travel</td>
                          <td className="py-3.5 px-4 text-right">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 font-bold text-xs">
                              20% refund
                            </span>
                          </td>
                        </tr>
                        <tr className="hover:bg-muted/30 transition-colors">
                          <td className="py-3.5 px-4 font-medium text-foreground">Less than 5 days before travel</td>
                          <td className="py-3.5 px-4 text-right">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-600 font-bold text-xs">
                              No refund
                            </span>
                          </td>
                        </tr>
                        <tr className="hover:bg-muted/30 transition-colors bg-rose-500/5">
                          <td className="py-3.5 px-4 font-medium text-foreground">
                            No-show, late arrival or refused boarding (e.g. missing Government ID or undeclared excess weight)
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-600 font-bold text-xs">
                              No refund
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p className="text-xs text-muted-foreground pt-1">
                    * <strong>GST Note:</strong> GST is refunded in proportion to the refund amount, as permitted under prevailing government tax rules.
                  </p>
                </div>
              </section>

              {/* Section 3 */}
              <section id="flight-disruption" className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-soft scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 flex items-center justify-center">
                    <CloudRain className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                      3. If the Flight Does Not Operate
                    </h2>
                    <p className="text-xs text-muted-foreground">Weather and operational contingencies</p>
                  </div>
                </div>

                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    If the helicopter operator cancels your flight because of weather or an operational reason, you can choose one of two options:
                  </p>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="p-5 rounded-2xl bg-sky-500/5 border border-sky-500/20 space-y-2">
                      <div className="flex items-center gap-2 text-sky-600 font-bold text-sm">
                        <Car className="w-4 h-4" /> Option 1: Continue by Road
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        We arrange a cab at <strong>no extra cost</strong> so you can continue your trip smoothly. The remainder of your package (stay, meals, temple darshan activities) stays as booked.
                      </p>
                    </div>

                    <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 space-y-2">
                      <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                        <RefreshCw className="w-4 h-4" /> Option 2: Cancel the Trip
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        We refund the amount you paid, minus only any unavoidable cancellation charges that the hotel or stay applies for your booking. We will transparently provide you with proof of these charges.
                      </p>
                    </div>
                  </div>

                  <div className="p-3.5 bg-muted/60 rounded-xl text-xs flex items-center gap-2.5 text-foreground">
                    <Clock className="w-4 h-4 text-primary shrink-0" />
                    <span>
                      <strong>Flight Delays:</strong> If the flight is delayed rather than cancelled, we will keep you continuously updated, and the trip continues once the flight operates.
                    </span>
                  </div>
                </div>
              </section>

              {/* Section 4 */}
              <section id="we-cancel" className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-soft scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                      4. If We Have to Cancel
                    </h2>
                    <p className="text-xs text-muted-foreground">Operator & agency initiated cancellations</p>
                  </div>
                </div>

                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    If we cancel your booking for a reason within our direct control, you will receive:
                  </p>
                  <ul className="space-y-2 text-xs">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span><strong>100% Full Refund:</strong> A complete, unconditional refund of the entire amount paid.</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span><strong>Alternative Rescheduling:</strong> Or a new travel date of your choice, if you prefer to postpone.</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section 5 */}
              <section id="changing-date" className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-soft scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <CalendarDays className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                      5. Changing Your Date
                    </h2>
                    <p className="text-xs text-muted-foreground">Rescheduling requests</p>
                  </div>
                </div>

                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    Date changes are possible only on a case-by-case basis, depending on availability with the helicopter operator and the partnered hotel.
                  </p>
                  <p className="text-xs">
                    A change fee may apply, and our support team will clearly communicate the exact amount to you before making any modifications. If a date change is not possible due to lack of slots, the standard cancellation charges outlined in <strong>Section 2</strong> apply.
                  </p>
                </div>
              </section>

              {/* Section 6 */}
              <section id="name-changes" className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-soft scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                      6. Name Changes
                    </h2>
                    <p className="text-xs text-muted-foreground">Passenger substitution guidelines</p>
                  </div>
                </div>

                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    You may replace a traveller with someone else up to <strong>10 days before travel</strong>, subject to the aviation operator's formal approval.
                  </p>
                  <p className="text-xs">
                    The replacement traveller must satisfy all aviation and shrine passenger requirements, including valid Government photo ID registration and DGCA body weight compliance.
                  </p>
                </div>
              </section>

              {/* Section 7 */}
              <section id="unused-services" className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-soft scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-600 flex items-center justify-center">
                    <Ban className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                      7. Unused Services
                    </h2>
                    <p className="text-xs text-muted-foreground">Partially utilized packages</p>
                  </div>
                </div>

                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    No refund is given for any portion or component of a package that you choose not to utilize once the tour has commenced (for example: voluntary omission of an included meal, unused hotel night, or skipped ground transfer).
                  </p>
                </div>
              </section>

              {/* Section 8 */}
              <section id="how-refunds-paid" className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-soft scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center">
                    <Banknote className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                      8. How Refunds Are Paid
                    </h2>
                    <p className="text-xs text-muted-foreground">Methods, processing windows and fees</p>
                  </div>
                </div>

                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <ul className="space-y-2.5 text-xs">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Original Payment Source:</strong> Refunds are remitted directly to the original bank account, debit/credit card, or UPI ID used to make the payment.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Processing Timeline:</strong> Once a refund is approved, it is processed within <strong>5 to 7 working days</strong>. Depending on your financial institution, your bank may require a few additional days to reflect the credit.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Payment Gateway Charges:</strong> Gateway convenience charges, if any, may be deducted from refunds for cancellations initiated by you.</span>
                    </li>
                  </ul>
                </div>
              </section>

              {/* Section 9 */}
              <section id="private-charters" className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-soft scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <Plane className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                      9. Private Charters
                    </h2>
                    <p className="text-xs text-muted-foreground">Exclusive VIP and family helicopter bookings</p>
                  </div>
                </div>

                <div className="space-y-3 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    Private helicopter charter flights follow the specialized payment and cancellation terms stipulated in their personalized written quotation and agreement.
                  </p>
                </div>
              </section>

              {/* Section 10 */}
              <section id="questions" className="bg-card rounded-3xl p-6 md:p-8 border border-border shadow-soft scroll-mt-28">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="text-xl md:text-2xl font-serif font-bold text-foreground">
                      10. Questions & Assistance
                    </h2>
                    <p className="text-xs text-muted-foreground">Dedicated booking helpline</p>
                  </div>
                </div>

                <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                  <p>
                    For any questions regarding a booking, schedule change, cancellation, or refund status, please reach out to our team:
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4 text-xs">
                    <a 
                      href="mailto:contact@myskytrips.com"
                      className="p-4 rounded-2xl bg-muted/50 border border-border/80 flex items-center gap-3 hover:border-primary/50 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Mail className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground text-xs">Email Us</div>
                        <div className="text-primary font-medium">contact@myskytrips.com</div>
                      </div>
                    </a>

                    <a 
                      href="https://wa.me/916395678642"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-4 rounded-2xl bg-muted/50 border border-border/80 flex items-center gap-3 hover:border-emerald-500/50 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                        <Phone className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-semibold text-foreground text-xs">WhatsApp / Call</div>
                        <div className="text-emerald-600 font-bold">+91 63956 78642</div>
                      </div>
                    </a>
                  </div>
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

export default BookingPolicy;
