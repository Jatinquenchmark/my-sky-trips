import chardhamImage from "@/assets/chardham.jpg";
import kedarnathImage from "@/assets/kedarnath.jpg";
import badrinathImage from "@/assets/badrinath.jpg";
import heroHelicopterImage from "@/assets/hero-helicopter.jpg";

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
}

export const packages: Package[] = [
  {
    id: 6,
    title: "Tehri Lake Helicopter Adventure",
    subtitle: "Helicopter + Water Adventure (1N/2D)",
    image: heroHelicopterImage,
    duration: "2 Days",
    groupSize: "Customizable",
    locations: "Tehri Lake",
    price: "₹15,000",
    description: "Helicopter + Water Adventure. All in 48 hours! Reach Tehri in just 15 minutes with breathtaking aerial views.",
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
          "Classic — ₹15,000 per person (Standard lake-facing room, Helicopter travel, Water sports included)",
        ]
      }
    ]
  },
  {
    id: 5,
    title: "Sky Trip to Kainchi Dham",
    subtitle: "Kainchi Dham And Lakes of Kumaon",
    image: heroHelicopterImage,
    duration: "3 Days",
    groupSize: "Customizable",
    locations: "Naukuchiatal, Nainital & Kainchi Dham",
    price: "₹25,000",
    description: "A serene lakeside escape. Visit the holy Kainchi Dham and explore the emerald lakes of Kumaon via helicopter.",
    highlights: ["Kainchi Dham Visit", "Heritage Lakeside Stay", "Nainital Trip", "Private Cab"],
    rating: 4.9,
    featured: false,
    overview: "Embark on a soul-stirring journey to the heart of Kumaon. This 3-day helicopter tour takes you from Dehradun to the heritage lakeside of Naukuchiatal, with a special focus on the spiritual energy of Kainchi Dham and the scenic beauty of Nainital's lakes.",
    itinerary: [
      {
        day: 1,
        title: "Dehradun → Naukuchiatal & Kainchi Dham",
        description: "Arrive at Jolly Grant Airport, Dehradun by 7:15 AM. Fly to Naukuchiatal by helicopter (approx. 40 min). Check in at a heritage lakeside property surrounded by mountains and enjoy a refreshing welcome drink. Later, visit the holy Kainchi Dham Temple. You may also opt for a light trek to a nearby viewpoint. Spend the evening at Bhimtal or Sattal, followed by high tea by the lakeside. Night at the property with bonfire & dinner."
      },
      {
        day: 2,
        title: "Exploring Nainital & Surrounding Lakes",
        description: "After breakfast at the property, head out for a day trip to Nainital. Enjoy boating at Naini Lake, mall road café hopping, and local shopping. Continue exploring hidden gems like Sattal and Bhimtal. Spend a chill evening back at the property with music, conversations, and lakeside vibes. Perfect for group bonding and picture-perfect spots."
      },
      {
        day: 3,
        title: "Relaxed Morning + Helicopter Return",
        description: "Start your day with a peaceful morning walk or nature hike. After breakfast at the property, enjoy your last few hours soaking in the mountain air. Afternoon helicopter flight back to Dehradun (Jolly Grant Airport). Optional: Visit the Colonel's cafe just 5 minutes walking distance from the helipad before your farewell."
      }
    ],
    inclusions: [
      "Round-trip helicopter ride (Dehradun ⇔ Naukuchiatal)",
      "2-night stay at a heritage lakeside property",
      "Breakfast on both days",
      "High tea by the lake (one evening)",
      "Private cab for local sightseeing (2 days)"
    ],
    exclusions: [
      "Lunch, Dinner and Day 1 breakfast",
      "Travel from your city to Dehradun",
      "Anything not mentioned in inclusions"
    ],
    additionalInfo: [
      {
        title: "Pricing Structure",
        content: [
          "Luxury — ₹25,000 per person (Premium lakeside suites, Lakeside high tea, Dedicated private cab, Priority darshan assistance after ₹5,000 discount)",
          "Booking: Pay 50% now to book; Balance 30 days before trip.",
          "Extra day: ₹9,000 per person.",
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
          "Declare accurate weight at booking to avoid last-minute issues."
        ]
      }
    ]
  },
  {
    id: 4,
    title: "Sky Trip to Auli",
    subtitle: "Auli and Joshimath (2 Nights 3 Days)",
    image: heroHelicopterImage,
    duration: "3 Days",
    groupSize: "Customizable",
    locations: "Auli & Joshimath",
    price: "₹26,000",
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
          "Classic — ₹26,000 per person (Budget hotel stay, 2 meals included, Helicopter travel, Transfer in Swift Dzire/Ertiga)",
          "Luxury — ₹30,000 per person (Deluxe rooms in premium Joshimath resort, 2 meals, Helicopter travel, Private cab transfers)",
          "Ultra — ₹34,000 per person (Upgraded premium suites, 2 meals, Helicopter travel, Luxury car: Kia/Innova, Transfer to Auli included)",
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
    id: 3,
    title: "Do Dham Premium",
    subtitle: "4-Day Spiritual Retreat",
    image: badrinathImage,
    duration: "4 Days",
    groupSize: "2-6 persons",
    locations: "Kedarnath & Badrinath",
    price: "₹1,50,000",
    description: "A peaceful 4-day journey covering Kedarnath and Badrinath with extended darshan time and overnight stays.",
    highlights: ["Overnight at Dhams", "Triyuginarayan Visit", "Mana Village"],
    rating: 4.9,
    featured: false,
    overview: "Dehradun is the official starting point of your Do Dham Helicopter Yatra. This journey is ideal for pilgrims seeking a peaceful and well supported experience without the exhaustion of long road travel.",
    itinerary: [
      {
        day: 1,
        title: "Arrival & Briefing in Dehradun",
        description: "Welcome to Dehradun, the official starting point of your Do Dham Helicopter Yatra. This is the reporting day at Dehradun, our main base and starting point for the Heli-tour. We arrange this extra night halt for you with dinner and breakfast included, allowing you to wind down and be fully ready for the journey ahead. In the evening at 1900 Hrs, there will be a mandatory tour briefing conducted by our team. During this session, you will receive detailed journey instructions, and we will conduct a weight verification for flight safety. Duffel bags will be provided in which you must pack your necessary luggage (Maximum 3 kg per person permitted)."
      },
      {
        day: 2,
        title: "Kedarnath Ji Darshan",
        description: "Your sacred journey begins with a hotel check-out at 11:15 AM after breakfast. Our team will pick you up and take you to the Sahastradhara Helidrome (Reporting at 11:30 Hrs). Departure is at 12:30 PM, arriving at the Sersi Heli-base by 01:00 PM. From there, you will board a 07-minute shuttle helicopter flight to Kedarnath Dham for Darshan. The average time for temple darshan is approximately 02 hours. Please note that passengers travelling together may be ferried in different shuttle flights due to weight capacity constraints. After darshan, we bring you back to Sersi for sightseeing at the Triyuginarayan Temple, the historic venue of the celestial marriage of Lord Shiva and Goddess Parvati."
      },
      {
        day: 3,
        title: "Badrinath Ji Darshan",
        description: "After enjoying breakfast and lunch at Sersi, be ready for your flight to Badrinath by 12:00 PM. Departing Sersi at 01:00 PM, you will arrive at the Badrinath Helipad at 01:30 PM, where our staff will assist with hotel check-in. In the afternoon, you will be taken to the Badrinath Temple by car for VIP Darshan (Approx. 1-1.5 hours). Later, experience a guided visit to Mana Village, the 'First Village of India' near the China border. You also have the option to arrange for the Swaran/Chandi Aarti at the temple on an additional direct payment basis. Enjoy the divine atmosphere of Badrinath with an overnight stay."
      },
      {
        day: 4,
        title: "Return to Dehradun",
        description: "On the final day, have your breakfast and lunch by 12:30 PM and be ready for the return flight at 12:45 PM. Departure from Badrinath is at 01:30 PM, with an estimated arrival at Sahastradhara Helidrome by 02:30 PM (1430 hrs). Upon arrival, our team will receive you and escort you to the Dehradun hotel to collect your luggage from the cloak rooms. Your Do Dham Yatra concludes here with sacred blessings and seamless memories."
      },
    ],
    inclusions: [
      "Helicopter flying from Dehradun to Kedarnath & Badrinath and back",
      "One night halt at Dehradun on arrival (Dinner & Breakfast included)",
      "01 Night stay with all meals at both Sersi & Badrinath",
      "Kedarnath ji helicopter shuttle services (Sersi-Kedar-Sersi)",
      "VIP Darshans at both Temples (as per Government orders)",
      "Local sight-seeing at both dhams (Triyuginarayan and Mana Village)",
      "Ground Handling, Royalty Taxes & government levies",
      "Airport/Hotel transfers in Dehradun"
    ],
    exclusions: ["Personal tips, pitthu, or porter charges", "Special puja fees or temple donations", "Luxury hotel upgrades", "Haridwar/Rishikesh extensions"],
    additionalInfo: [
      {
        title: "Pricing Structure",
        content: [
          "Luxury — ₹1,50,000 per person (Premium rooms at Dhams, Priority darshan assistance, Comfortable road transfers, Full 4-day tour after ₹10,000 discount)",
          "Single Occupancy: Extra charge of ₹35,000 per person.",
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
    price: "₹2,20,000",
    description: "Experience the ultimate spiritual milestone with a seamless journey to Yamunotri, Gangotri, Kedarnath, and Badrinath.",
    highlights: ["VIP Darshans", "Premium Planning", "Seamless Logistics"],
    rating: 5.0,
    featured: true,
    overview: "Char Dham is not just a yatra. It is a once-in-a-lifetime spiritual milestone. With My Sky Trips, you experience the sacred circuit of Yamunotri, Gangotri, Kedarnath, and Badrinath in comfort, safety, and complete peace of mind. Starting and ending from Dehradun, this yatra is carefully planned to ensure comfort, smooth transfers, and proper acclimatization.",
    itinerary: [
      {
        day: 1,
        title: "Arrival in Dehradun",
        description: "Welcome to Dehradun, the official starting point of your Char Dham journey. Our team will receive you at the airport or railway station and assist with hotel check-in (Standard check-in time is 1400 Hrs). This day is dedicated to unwinding and getting ready for your yatra. After check-in, join us for a mandatory evening tour briefing where we will discuss the journey instructions and assist with luggage planning for helicopter travel. Dinner is included on Day 1, followed by breakfast the next morning."
      },
      {
        day: 2,
        title: "Yamunotri Darshan (Kharsali)",
        description: "The starting day of your Char Dham yatra begins with a 06:30 AM check-out from the hotel after an early breakfast. Our team will take you to Sahastradhara Helidrome for your flight to the Kharsali heli-base, the source of River Yamuna. On arrival, our ground staff will welcome and settle you into your hotel. To avoid the yatra rush, we proceed for VIP-assisted Darshan at Yamunotri Temple immediately. The trek is 06 km one-way (approx. 5.5 hours round-trip); we provide Palki/Pony support as trekking is not advised for safety reasons. Explore the hot springs, Yamuna Mata Temple, and take a guided evening walk to Shani Temple. Night Halt: Kharsali (please note: accommodation here is basic as it is the least developed destination)."
      },
      {
        day: 3,
        title: "Gangotri Darshan (Harsil)",
        description: "After breakfast, check-out from Kharsali at 07:00 AM for your flight to the Harsil/Jhalla helipad. Harsil, known as the 'Mini Switzerland of India', is the most scenic destination of the tour, famous for its abundant apple orchards. After checking into your hotel, we drive 25 km (approx. 50 mins) to Gangotri Dham for Darshan of the birthplace of the Ganga. Depending on the rush, darshan will be done before or after lunch. The afternoon is free for leisure to enjoy the beautiful surroundings, Bagodi Village, or the ancient Laxmi Narayan Temple. Night Halt: Harsil."
      },
      {
        day: 4,
        title: "Kedarnath Darshan",
        description: "After an early breakfast, fly from Harsil to the Kedarnath region (via Guptkashi/Phata/Sersi Heli-base). Here, you will board a shuttle helicopter to the holy Kedarnath Helipad in the Mandakini valley. With VIP Darshan Entry and priority support, you avoid the physically exhausting trek to this spiritually intense Jyotirlinga. The shuttle flight is approximately 07 minutes long, and darshan takes about 02 hours. Please note that waiting time at the shuttle base can be 1-2 hours. In the evening, visit Triyuginarayan Temple, the celestial marriage venue of Lord Shiva and Goddess Parvati (subject to weather). Night Halt: Phata/Sersi/Guptkashi."
      },
      {
        day: 5,
        title: "Badrinath Darshan & Mana Village",
        description: "After breakfast, fly to the final Dham, Badrinath, dedicated to Lord Vishnu and surrounded by the Nar-Narayan peaks. After checking into your hotel and having breakfast/lunch, proceed for VIP Darshan at the Badrinath Temple (approx. 1-1.5 hours, transfer by car). In the afternoon, enjoy a day trip to Mana Village, the 'First Village of India' near the China border. You may also participate in the optional Swaran/Chandi Aarti (additional payment basis) or spend the evening at leisure. Night Halt: Badrinath Town."
      },
      {
        day: 6,
        title: "Return to Dehradun",
        description: "Enjoy your final morning in the divine atmosphere of Badrinath. After breakfast, check-out and proceed to the helipad for your return flight to Dehradun. Arrival at Sahastradhara Helidrome is expected by 10 AM. Our team will receive you and escort you to the Dehradun hotel to collect your luggage from the cloak rooms. Finally, we provide a drop-off at the airport or railway station, bidding you farewell as your Char Dham Yatra concludes with blessings, comfort, and lifelong memories."
      },
    ],
    inclusions: [
      "Helicopter flying from Dehradun to the Char Dham shrines & back",
      "Accommodation at Dehradun on MAP Basis (Arrival Day)",
      "05 Nights accommodation: 01 night at each Dham with all meals",
      "Airport and hotel transfers in Dehradun",
      "Local sightseeing with guides and private transportation",
      "Palki/Pony support at Yamunotri (subject to availability)",
      "VIP Darshan Entry at all four temples",
      "Kedarnath Ji helicopter shuttle services",
      "Royalty taxes, Landing & Parking charges"
    ],
    exclusions: [
      "Personal expenses, tips, and temple donations",
      "Special Puja charges or ritual fees",
      "Luxury hotel segment upgrades",
      "Haridwar/Rishikesh extensions"
    ],
    additionalInfo: [
      {
        title: "Pricing Structure",
        content: [
          "Deluxe — ₹2,20,000 per person (Comfortable 3-star stay, VIP Darshan at all Dhams, All vegetarian meals, Private transfers in Dehradun after ₹15,000 discount)",
          "Premium — ₹2,30,000 per person (Premium hotels: Hyatt Centric / Sarovar Portico, Priority darshan assistance, Specialized group coordinator, Complimentary kit after ₹15,000 discount)",
          "Single Occupancy: Extra charge of ₹45,000 per person.",
          "Note: Rooms are booked on double sharing basis."
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
