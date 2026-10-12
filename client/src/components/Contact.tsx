import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter, ShieldCheck } from "lucide-react";

export const Contact = () => {

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-saffron/10 text-saffron text-sm font-medium mb-4">
            Get In Touch
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Start Your <span className="text-gradient-sunset">Journey Today</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ready to explore the skies? Drop us a message and our travel experts will craft the perfect itinerary for you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card rounded-2xl p-6 sm:p-8 shadow-medium border border-border flex flex-col justify-between"
          >
            <div>
              <h3 className="text-2xl font-serif font-bold text-foreground mb-4">
                Send Us a Message
              </h3>
              <div className="w-full h-130 overflow-hidden rounded-xl border border-border bg-background mb-4">
                <iframe
                  src="https://docs.google.com/forms/d/e/1FAIpQLSeoQQ_MRmgTWWM1-EKTo-Z6pWALUK34g5BwNcWnkpkMcDdK1Q/viewform?embedded=true"
                  className="w-full h-full border-0"
                  title="Contact Form"
                >
                  Loading…
                </iframe>
              </div>
            </div>
            
            {/* Consent & Policy Note */}
            <div className="p-4 bg-muted/60 rounded-xl border border-border/80 text-xs text-muted-foreground leading-relaxed space-y-1.5">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <p>
                  By submitting your enquiry, you agree to My Sky Trips contacting you via WhatsApp, phone, and email, and confirm that you have reviewed our{" "}
                  <a href="/privacy-policy" className="text-primary underline font-medium hover:text-primary/80">Privacy Policy</a>
                  {" "}and{" "}
                  <a href="/terms-of-service" className="text-primary underline font-medium hover:text-primary/80">Terms of Service</a>.
                </p>
              </div>
              <p className="text-[11px] text-muted-foreground/80 pl-6">
                You may also receive occasional trip updates on WhatsApp (reply STOP anytime to opt out).
              </p>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-between"
          >
            <div>
              <h3 className="text-2xl font-serif font-bold text-foreground mb-6">
                Contact Information
              </h3>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                We're here to help you plan your perfect Indian adventure.
                Reach out through any of these channels and our team will respond within 24 hours.
              </p>

              <div className="space-y-6">
                <motion.a
                  href="mailto:contact@myskytrips.com"
                  className="flex items-center gap-4 p-4 rounded-xl bg-card hover:shadow-soft transition-shadow group"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-gradient-sky transition-colors">
                    <Mail className="w-5 h-5 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email Us</p>
                    <p className="font-medium text-foreground">contact@myskytrips.com</p>
                  </div>
                </motion.a>

                <motion.a
                  href="tel:+916395678642"
                  className="flex items-center gap-4 p-4 rounded-xl bg-card hover:shadow-soft transition-shadow group"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-saffron/10 flex items-center justify-center group-hover:bg-gradient-sunset transition-colors">
                    <Phone className="w-5 h-5 text-saffron group-hover:text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Call / WhatsApp</p>
                    <p className="font-medium text-foreground">+91 6395678642</p>
                  </div>
                </motion.a>

                <motion.a
                  href="https://maps.app.goo.gl/sMda3MK58omkibfb6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-card hover:shadow-soft transition-shadow group"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-gradient-sky transition-colors">
                    <MapPin className="w-5 h-5 text-primary group-hover:text-primary-foreground" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Office Address</p>
                    <p className="font-medium text-foreground text-sm">
                      2nd floor, ATS Arcade, Shop no, SF-09, Sahastradhara Rd, near IT park, Dehradun, Uttarakhand 248013
                    </p>
                  </div>
                </motion.a>
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-8 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">Follow Us</p>
              <div className="flex gap-4">
                {[
                  { icon: Instagram, href: "#", label: "Instagram" },
                  { icon: Facebook, href: "#", label: "Facebook" },
                  { icon: Twitter, href: "#", label: "Twitter" },
                ].map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Google Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 w-full h-100 rounded-3xl overflow-hidden shadow-strong border border-border"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3442.8256561576403!2d78.07727407556553!3d30.35588307476834!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3908d1f7c164ed25%3A0x1e36f86134b9d07!2sMy%20Sky%20Trips!5e0!3m2!1sen!2sin!4v1740409552123!5m2!1sen!2sin"
            className="w-full h-full border-0"
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Office Location"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
};
