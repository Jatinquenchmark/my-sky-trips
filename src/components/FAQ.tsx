import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How can I book a trip with My Sky Trips?",
    answer: "You can reach out via WhatsApp, call, DM, email, or simply fill out our enquiry form. We'll take it from there — smooth, simple, and personal. Our team will get back to you within 24 hours with a customized itinerary.",
  },
  {
    question: "Are helicopter rides available for solo travelers?",
    answer: "Yes! While helicopter packages are typically priced per seat, solo travelers can join group departures or book exclusive private charters. Contact us for the best options tailored to your preferences.",
  },
  {
    question: "Do you offer international tours too?",
    answer: "Currently, we specialize in domestic Indian travel experiences, particularly pilgrimage and adventure tours in the Himalayan region. However, we're expanding our offerings and will announce international packages soon.",
  },
  {
    question: "Is Char Dham Yatra via helicopter safe?",
    answer: "Absolutely. We partner only with DGCA-certified operators with impeccable safety records. All helicopters undergo rigorous maintenance checks, and flights only operate in favorable weather conditions for your safety.",
  },
  {
    question: "Can our booked helicopter trip be cancelled from the company's end?",
    answer: "Cancellations from our end only occur due to extreme weather conditions or technical issues that compromise safety. In such cases, we offer full refunds or rescheduling options at no additional cost.",
  },
  {
    question: "What if our helicopter flight is cancelled due to bad weather?",
    answer: "Safety is our priority. If weather conditions prevent flying, we'll either reschedule your trip or provide a full refund. We also offer comprehensive travel insurance options for added peace of mind.",
  },
  {
    question: "Can you help plan a surprise honeymoon or proposal?",
    answer: "Yes! We love creating magical moments. Our team can arrange special decorations, private dinners at scenic locations, and customized experiences to make your special occasion unforgettable.",
  },
  {
    question: "Do you cater to international clients?",
    answer: "Absolutely! We welcome travelers from around the world and provide comprehensive support including visa guidance, airport transfers, and English-speaking guides throughout your journey.",
  },
];

export const FAQ = () => {
  return (
    <section id="faq" className="py-24 bg-card">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            FAQ
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Frequently Asked <span className="text-gradient-sky">Questions</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know about traveling with My Sky Trips
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-background border border-border rounded-xl px-6 data-[state=open]:shadow-soft transition-shadow duration-300"
              >
                <AccordionTrigger className="text-left text-foreground hover:text-primary font-medium py-5 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};
