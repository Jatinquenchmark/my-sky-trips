import chardhamImage from "@/assets/chardham.jpg";
import kedarnathImage from "@/assets/kedarnath.jpg";
import badrinathImage from "@/assets/badrinath.jpg";
import heroHelicopterImage from "@/assets/hero-helicopter.jpg";
import kachidhamImage from "@/assets/kachidham.png";
import kainchiGallery1 from "@/assets/nanitalKachi.jpeg";
import kainchiGallery2 from "@/assets/nanitalkachi2.jpeg";
import kainchiGallery3 from "@/assets/nanitalkachi3.jpeg";
import kainchiGallery4 from "@/assets/nanitalkachi4.png";
import tehriGallery1 from "@/assets/tehri1.png";
import tehriGallery2 from "@/assets/tehri2.png";
import tehriGallery3 from "@/assets/tehri3.png";
import tehriGallery4 from "@/assets/tehri4.png";
import auliGallery1 from "@/assets/auli1.png";
import auliGallery2 from "@/assets/auli2.png";
import auliGallery3 from "@/assets/auli3.png";
import auliGallery4 from "@/assets/auli4.png";

export interface Package {
  id: number;
  title: string;
  subtitle: string;
  image: string;
  duration: string;
  groupSize: string;
  locations: string;
  price: string;
  description: string;
  highlights: string[];
  rating: number;
  featured: boolean;
  overview?: string;
  itinerary?: { day: number; title: string; description: string }[];
  inclusions?: string[];
  exclusions?: string[];
  additionalInfo?: { title: string; content: string[] }[];
  gallery?: string[];
  pdfUrl?: string;
  tiers?: {
    name: string;
    itinerary?: { day: number; title: string; description: string }[];
    inclusions?: string[];
    exclusions?: string[];
  }[];
}

export const packages: Package[] = [
  {
    id: 6,
    title: "Tehri Lake Helicopter Adventure",
    subtitle: "Helicopter + Water Adventure (1N/2D)",
    image: tehriGallery3,
    duration: "2 Days",
    groupSize: "Customizable",
    locations: "Tehri Lake",
    price: "₹17,000",
    description: "Helicopter rides, water sports, luxury stay. All in 48 hours! Reach Tehri in just 15 minutes with breathtaking aerial views.",
    gallery: [tehriGallery1, tehriGallery2, tehriGallery3, tehriGallery4],
    pdfUrl: "/brochures/Tehri Lake Helicopter Adventure (1Night 2Days).pdf",
    highlights: ["Helicopter Ride", "Water Thrill", "Jet Ski Ride", "Fly Boarding"],
    rating: 4.9,
    featured: true,
    overview: "Reach Tehri in just 15 minutes — covering 3+ hours of mountain road distance with breathtaking aerial views of valleys and the lake. This 2-day adventure is perfectly packed with thrill and relaxation at the beautiful Tehri Lake.",
    itinerary: [
      {
        day: 1,
        title: "Helicopter Ride + Water Thrill",
        description: "Reporting at Dehradun Airport: 8:00 AM. Helicopter Departure: 9:00 AM. Arrival in Tehri around 9:15 AM. Transfer & early check-in at lake-facing hotel. Afternoon: Head out for thrilling water sports activities including Jet Ski Ride (1 Round) and Fly Boarding Experience. Post activities, explore the lakeside area and enjoy sunset views. Overnight stay in Tehri."
      },
      {
        day: 2,
        title: "Leisure Morning + Return",
        description: "Breakfast at the property. Morning lakeside walk & free time to soak in the views. Helicopter departure around 2:00 PM. Arrival in Dehradun by approx. 2:15 PM. Trip ends at Dehradun Airport."
      }
    ],
    inclusions: [
      "Round-trip helicopter ride (Dehradun ⇔ Tehri)",
      "1-night stay at a lake-facing property",
      "Breakfast at the property",
      "Water sports: 1 Round Jet Ski & Fly Boarding",
      "All transfers in Tehri"
    ],
    exclusions: [
      "Personal expenses and tips",
      "Lunch and Dinner",
      "Travel from your city to Dehradun",
      "Anything not mentioned in inclusions"
    ],
    additionalInfo: [
      {
        title: "Pricing Structure",
        content: [
          "Classic — ₹17,000 per person (+ 5% GST)",
        ]
      }
    ]
  },
  {
    id: 5,
    title: "Nainital/Kainchi Dham Helicopter trip (1N/2D)",
    subtitle: "Kainchi Dham And Lakes of Kumaon",
    image: kachidhamImage,
    duration: "2 Days",
    groupSize: "Customizable",
    locations: "Naukuchiatal, Nainital & Kainchi Dham",
    price: "₹20,000",
    description: "A serene lakeside escape. Visit the holy Kainchi Dham and explore the emerald lakes of Kumaon via helicopter.",
    gallery: [kainchiGallery1, kainchiGallery2, kainchiGallery3, kainchiGallery4],
    highlights: ["Kainchi Dham Visit", "Heritage Lakeside Stay", "Nainital Trip", "Private Cab"],
    rating: 4.9,
    featured: false,
    overview: "Embark on a soul-stirring journey to the heart of Kumaon. This 2-day helicopter tour takes you from Dehradun to the heritage lakeside of Naukuchiatal, with a special focus on the spiritual energy of Kainchi Dham.",
    itinerary: [
      {
        day: 1,
        title: "Dehradun → Naukuchiatal & Kainchi Dham",
        description: "Arrive at Jolly Grant Airport, Dehradun by 7:15 AM. Fly to Naukuchiatal by helicopter. Check in at a heritage lakeside property. Later, visit the holy Kainchi Dham Temple. Evening at leisure by the lake."
      },
      {
        day: 2,
        title: "Relaxed Morning + Return",
        description: "Breakfast at the property. Morning lakeside walk. Afternoon helicopter flight back to Dehradun."
      }
    ],
    inclusions: [
      "Round-trip helicopter ride (Dehradun ⇔ Naukuchiatal)",
      "1-night stay at a heritage lakeside property",
      "One breakfast",
      "High tea by the lake (one evening)",
      "Private cab for local sightseeing (1 day)"
    ],
    exclusions: ["Lunch, Dinner and Day 1 breakfast", "Anything not mentioned in inclusions"],
    additionalInfo: [
      {
        title: "Pricing Structure",
        content: [
          "Package Cost — ₹20,000 per person (+ 5% GST)",
          "Booking: Pay 50% now to book; Balance 30 days before trip."
        ]
      }
    ]
  },
  {
    id: 7,
    title: "Nainital/Kainchi Dham Helicopter Trip (2N/3D)",
    subtitle: "Kainchi Dham And Lakes of Kumaon",
    image: kainchiGallery1,
    duration: "3 Days",
    groupSize: "Customizable",
    locations: "Naukuchiatal, Nainital & Kainchi Dham",
    price: "₹25,000",
    description: "A serene lakeside escape. Visit the holy Kainchi Dham and explore the emerald lakes of Kumaon via helicopter.",
    gallery: [kainchiGallery1, kainchiGallery2, kainchiGallery3, kainchiGallery4],
    highlights: ["Kainchi Dham Visit", "Heritage Lakeside Stay", "Nainital Trip", "Private Cab"],
    rating: 4.9,
    featured: false,
    overview: "Embark on a soul-stirring journey to the heart of Kumaon. This 3-day helicopter tour takes you from Dehradun to the heritage lakeside of Naukuchiatal, with a focus on Kainchi Dham and Nainital's lakes.",
    itinerary: [
      {
        day: 1,
        title: "Dehradun → Naukuchiatal & Kainchi Dham",
        description: "Arrive at Jolly Grant Airport, Dehradun. Fly to Naukuchiatal by helicopter. Check in at a heritage lakeside property. Visit the holy Kainchi Dham Temple."
      },
      {
        day: 2,
        title: "Exploring Nainital & Surrounding Lakes",
        description: "After breakfast, head out for a day trip to Nainital. Enjoy boating at Naini Lake and local shopping. Spend a chill evening back at the property."
      },
      {
        day: 3,
        title: "Relaxed Morning + Helicopter Return",
        description: "Breakfast at the property. Morning lakeside walk. Afternoon helicopter flight back to Dehradun."
      }
    ],
    inclusions: [
      "Round-trip helicopter ride (Dehradun ⇔ Naukuchiatal)",
      "2-night stay at a heritage lakeside property",
      "Breakfast on both days",
      "High tea by the lake",
      "Private cab for local sightseeing (2 days)"
    ],
    exclusions: ["Lunch, Dinner and Day 1 breakfast", "Anything not mentioned in inclusions"],
    additionalInfo: [
      {
        title: "Pricing Structure",
        content: [
          "Package Cost — ₹25,000 per person (+ 5% GST)",
          "Booking: Pay 50% now to book; Balance 30 days before trip."
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Sky Trip to Auli",
    subtitle: "Auli and Joshimath (2 Nights 3 Days)",
    image: auliGallery1,
    duration: "3 Days",
    groupSize: "Customizable",
    locations: "Auli & Joshimath",
    price: "₹28,000",
    gallery: [auliGallery1, auliGallery2, auliGallery3, auliGallery4],
    pdfUrl: "/brochures/Sky Trip to Auli & Joshimath (Pricing Structure) (1).pdf",
    description: "Fly to the ski capital of India. A 3-day luxury escape to Auli and Joshimath with helicopter transfers.",
    highlights: ["Helicopter Ride", "Auli Skiing", "Joshimath Stay", "Snow Activities"],
    rating: 4.8,
    featured: true,
    overview: "Experience the winter wonderland of Auli with our exclusive Sky Trip. This carefully curated journey takes you from Dehradun to the snow-clad mountains of Joshimath and Auli, ensuring comfort, postcard views, and unforgettable memories.",
    itinerary: [
      {
        day: 1,
        title: "Dehradun → Gauchar → Joshimath",
        description: "Arrive at Jolly Grant Airport, Dehradun by 9:00 AM. Fly to Gauchar by helicopter (approx. 45 min). Transfer by road to Joshimath (80 KMs) through alpine valleys and snow-clad mountains with postcard views. Check-in at our beautiful resort in Joshimath. In the afternoon, explore the local market, visit Narsingh temple, or simply chill at the property."
      },
      {
        day: 2,
        title: "Full Day at Auli",
        description: "After breakfast at the property, head out for Auli which is just 12 KMs from Joshimath via a private taxi. Spend the day enjoying snow walks, skiing, chair car rides, sledging, and photography on the snowy slopes. Spend a chill evening back at the property with music, conversations, and campfire vibes."
      },
      {
        day: 3,
        title: "Relaxed Morning + Helicopter Return",
        description: "Enjoy a relaxed morning and breakfast at the property. Later, leave for Gauchar to catch your helicopter flight back to Dehradun. Afternoon helicopter flight back to Dehradun (Jolly Grant Airport). Bid a happy farewell to your group members as your Sky Trip concludes."
      }
    ],
    inclusions: [
      "Round-trip helicopter ride (Dehradun ⇔ Gauchar)",
      "2-night stay at one of the best resorts in Joshimath",
      "Breakfast and Dinner on two days",
      "Campfire if the group size is more than 4",
      "Private cab for transfer from Gauchar Helipad to Joshimath and back"
    ],
    exclusions: [
      "Lunch and Day 1 breakfast",
      "Travel from your city to Dehradun",
      "Transfer to Auli from Joshimath and back",
      "Snow activity and chair car tickets",
      "Anything not mentioned in inclusions"
    ],
    additionalInfo: [
      {
        title: "Pricing Structure",
        content: [
          "Standard — ₹28,000 per person (+ 5% GST)",
          "Luxury — ₹32,000 per person (+ 5% GST)",
          "Ultra — ₹36,000 per person (+ 5% GST)",
          "For every additional day, the package cost increases by ₹9,000 per person.",
          "Children under 8 years: 50% of adult fares. Infants below 2 years: ₹5,000."
        ]
      },
      {
        title: "Bank Details",
        content: [
          "Account Number: 43903688582",
          "Account Name: Outclass Media (My Sky Trips)",
          "Bank: SBI",
          "Branch: IT Park, Dehradun",
          "IFSC: SBIN0016121",
          "UPI Id: myskytrips@sbi"
        ]
      },
      {
        title: "Cancellation Policy",
        content: [
          "30 days or more before departure: 90% refund",
          "30–20 days before trip: 50% refund",
          "20–5 days before trip: 20% refund",
          "Within 5 days of trip: No refund",
          "All cancellations must be communicated in writing."
        ]
      },
      {
        title: "Helicopter Flight Disclaimer",
        content: [
          "Operations are highly dependent on weather (95% success rate).",
          "If unable to fly due to weather/regulations, road travel in a comfortable cab is provided at no extra cost.",
          "Flight timings may be adjusted for safety; Aviation operator decisions are final."
        ]
      },
      {
        title: "Weight & Luggage Policy",
        content: [
          "Maximum body weight: 75 kg per person.",
          "Luggage allowance: 5 kg per person (soft bags only).",
          "Excess weight (body or luggage) charged at Rs 100 per kg.",
          "Accurate weight declaration is mandatory at booking."
        ]
      }
    ]
  },
  {
    id: 8,
    title: "Helicopter trip to Tunganath and Chopta",
    subtitle: "Mini Switzerland Adventure (2N/3D)",
    image: heroHelicopterImage,
    duration: "3 Days",
    groupSize: "Customizable",
    locations: "Chopta & Tunganath",
    price: "₹26,000",
    description: "Visit the highest Shiva temple in the world and the breathtaking meadows of Chopta via helicopter.",
    highlights: ["Tunganath Temple", "Chandrashila Trek", "Chopta Stay", "Helicopter Ride"],
    rating: 4.9,
    featured: true,
    overview: "Explore the divine and scenic beauty of Chopta, often called the Mini Switzerland of India. This 3-day trip takes you to the serene Tunganath temple and the stunning Chandrashila peak.",
    itinerary: [
      {
        day: 1,
        title: "Dehradun → Chopta Base",
        description: "Helicopter flight to the base near Chopta. Transfer to your scenic campsite or resort. Afternoon at leisure."
      },
      {
        day: 2,
        title: "Tunganath & Chandrashila",
        description: "Trek to Tunganath Temple and further to Chandrashila Peak for panoramic Himalayan views. Return to Chopta for the night."
      },
      {
        day: 3,
        title: "Leisure Morning + Return",
        description: "Explore the local meadows before returning to the helipad for your flight back to Dehradun."
      }
    ],
    inclusions: [
      "Round-trip helicopter ride",
      "2-night stay in Chopta (Premium Camps/Resort)",
      "All meals (Breakfast, Lunch, Dinner)",
      "Guided trek to Tunganath"
    ],
    exclusions: [
      "Personal expenses",
      "Ponies or porters",
      "Anything not mentioned in inclusions"
    ],
    additionalInfo: [
      {
        title: "Pricing Structure",
        content: [
          "Package Cost — ₹26,000 per person (+ 5% GST)"
        ]
      }
    ]
  },
  {
    id: 3,
    title: "Do Dham Premium",
    subtitle: "4-Day Spiritual Retreat",
    image: badrinathImage,
    duration: "4 Days",
    groupSize: "2-6 persons",
    locations: "Kedarnath & Badrinath",
    price: "₹1,60,000",
    pdfUrl: "/brochures/Do Dham Yatra Package (3N4D) (1).pdf",
    description: "A peaceful 4-day journey covering Kedarnath and Badrinath with extended darshan time and overnight stays.",
    highlights: ["Overnight at Dhams", "Triyuginarayan Visit", "Mana Village"],
    rating: 4.9,
    featured: false,
    overview: "Ideal for pilgrims seeking a peaceful and well supported experience without the exhaustion of long road travel.",
    itinerary: [
      { day: 1, title: "Arrive Dehradun", description: "Mandatory tour briefing and stay." },
      { day: 2, title: "Kedarnath Ji Darshan", description: "Sersi base and shuttle to temple." },
      { day: 3, title: "Badrinath Ji Darshan", description: "VIP Darshan and Mana village visit." },
      { day: 4, title: "Return to Dehradun", description: "Breakfast and return flight." }
    ],
    inclusions: [
      "Helicopter flying from Dehradun and back",
      "03 Nights stay with all meals",
      "VIP Darshans and local sightseeing"
    ],
    exclusions: ["Personal tips", "Temple donations"],
    additionalInfo: [
      {
        title: "Pricing Structure",
        content: [
          "Package Cost — ₹1,60,000 per person",
          "Note: Rooms are booked on double sharing basis only."
        ]
      },
      {
        title: "Terms & Conditions",
        content: [
          "Children of 2 years and above will be considered as full passengers.",
          "Booking confirmed with 50% amount; Full amount 15 days prior to journey.",
          "Rescheduling (subject to availability) 10 days before: 10% extra cost.",
          "Weight Policy: Flights executed subject to total & individual weight; kindly cooperate.",
          "Company reserves right to shuffle destinations depending on weather/unforeseen circumstances.",
          "Any extras apart from prescribed meals will be borne by passengers directly."
        ]
      },
      {
        title: "Cancellation Policy",
        content: [
          "45 days before journey: 100% refund",
          "30 days before journey: 50% refund",
          "20 days before journey: 15% refund",
          "15 days or less: No refund",
          "No-show / After tour commencement: No refund"
        ]
      },
      {
        title: "Baggage & Weight Policy",
        content: [
          "Maximum baggage allowance is strictly 3 kg per passenger.",
          "Suitcases or big travel bags are not permitted in the helicopter.",
          "Duffel bags provided during briefing for necessary luggage.",
          "Staff will take body weight of each pilgrim during briefing."
        ]
      }
    ]
  },
  {
    id: 1,
    title: "Chardham Yatra",
    subtitle: "Sacred Circuit Helicopter Tour (5N/6D)",
    image: chardhamImage,
    duration: "6 Days",
    groupSize: "2-6 persons",
    locations: "4 Sacred Dhams",
    price: "₹2,30,000",
    pdfUrl: "/brochures/Chardham Yatra Package (5N6D) (1).pdf",
    description: "Experience the ultimate spiritual milestone with a seamless journey to Yamunotri, Gangotri, Kedarnath, and Badrinath.",
    highlights: ["VIP Darshans", "Premium Planning", "Seamless Logistics"],
    rating: 5.0,
    featured: true,
    overview: "Char Dham is not just a yatra. It is a once-in-a-lifetime spiritual milestone. With My Sky Trips, you experience the sacred circuit in comfort and safety.",
    itinerary: [
      { day: 1, title: "Arrival in Dehradun", description: "Briefing and stay at Hyatt/Centric." },
      { day: 2, title: "Yamunotri Darshan", description: "Flight to Kharsali and trek to temple." },
      { day: 3, title: "Gangotri Darshan", description: "Flight to Harsil and visit Gangotri Dham." },
      { day: 4, title: "Kedarnath Darshan", description: "Shuttle flight to Kedarnath and VIP Darshan." },
      { day: 5, title: "Badrinath Darshan", description: "Flight to Badrinath, Mana village visit." },
      { day: 6, title: "Return to Dehradun", description: "Final flight and departure." }
    ],
    inclusions: [
      "Helicopter flying from Dehradun to all Dhams",
      "05 Nights accommodation with all meals",
      "VIP Darshan at all four temples",
      "Airport and hotel transfers"
    ],
    exclusions: ["Personal tips", "Special Puja fees"],
    additionalInfo: [
      {
        title: "Pricing Structure",
        content: [
          "Package Starting at — ₹2,30,000 per person",
        ]
      },
      {
        title: "Important Guidelines",
        content: [
          "Baggage Allowance: Strictly 5 kg per passenger; only one duffel bag (provided by us) is allowed.",
          "Weight Policy: Operator reserves right to shuffle passengers; accurate weight mandatory at booking.",
          "Infants (<2 yrs): Accommodated free (Max 12kg); ID proof/Birth certificate required.",
          "Altitude: Carry medications and warm clothing; temperatures drop drastically at night.",
          "Medical: Senior citizens and those with ailments must consult a doctor before commencing yatra."
        ]
      },
      {
        title: "Cancellation Policy",
        content: [
          "45 days before journey: 100% refund",
          "30 days before journey: 50% refund",
          "20 days before journey: 15% refund",
          "15 days or less: No refund",
          "No-show / After tour commencement: No refund"
        ]
      }
    ]
  }
];
