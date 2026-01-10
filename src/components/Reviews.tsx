import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Aarav M.",
    location: "Mumbai",
    rating: 5,
    text: "They provided exceptional service and made the entire trip stress-free. The helicopter ride was breathtaking and the team ensured every detail was perfect.",
    avatar: "A",
  },
  {
    id: 2,
    name: "Sonya W.",
    location: "Delhi",
    rating: 5,
    text: "I recommend them because they truly care about customer satisfaction. From booking to the final day, everything was handled with utmost professionalism.",
    avatar: "S",
  },
  {
    id: 3,
    name: "Aryak",
    location: "Bangalore",
    rating: 5,
    text: "Their attention to detail ensured every part of our journey was perfect. The Chardham Yatra by helicopter was a life-changing experience.",
    avatar: "A",
  },
  {
    id: 4,
    name: "Bhavya",
    location: "Hyderabad",
    rating: 5,
    text: "I trust them completely — they deliver memorable experiences every time. Already planning my next trip with My Sky Trips!",
    avatar: "B",
  },
];

const ratingBreakdown = [
  { stars: 5, percentage: 100 },
  { stars: 4, percentage: 0 },
  { stars: 3, percentage: 0 },
  { stars: 2, percentage: 0 },
  { stars: 1, percentage: 0 },
];

export const Reviews = () => {
  return (
    <section id="reviews" className="py-24 bg-gradient-spiritual">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-saffron/10 text-saffron text-sm font-medium mb-4">
            Testimonials
          </span>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Why People <span className="text-gradient-sunset">Recommend Us</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join hundreds of happy travelers who have experienced the magic of India with us
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Rating Summary */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card rounded-2xl p-8 shadow-soft h-fit"
          >
            <div className="text-center mb-6">
              <p className="text-sm text-muted-foreground mb-2">Overall Rating</p>
              <div className="flex items-center justify-center gap-2 mb-2">
                <span className="text-5xl font-serif font-bold text-foreground">5.0</span>
                <div className="flex flex-col items-start">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-saffron fill-saffron" />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">out of 5</span>
                </div>
              </div>
            </div>

            {/* Rating Breakdown */}
            <div className="space-y-3">
              {ratingBreakdown.map((item) => (
                <div key={item.stars} className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground w-16">{item.stars} star</span>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="h-full bg-gradient-sunset rounded-full"
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-12">{item.percentage}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Review Cards */}
          <div className="lg:col-span-2 grid sm:grid-cols-2 gap-6">
            {reviews.map((review, index) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-card rounded-2xl p-6 shadow-soft hover:shadow-medium transition-shadow duration-300 relative"
              >
                <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/10" />
                
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-saffron fill-saffron" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-foreground mb-6 leading-relaxed">
                  "{review.text}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-sky flex items-center justify-center">
                    <span className="text-primary-foreground font-semibold">{review.avatar}</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{review.name}</p>
                    <p className="text-sm text-muted-foreground">{review.location}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
