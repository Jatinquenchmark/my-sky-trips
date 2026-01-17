import chardhamImage from "@/assets/chardham.jpg";
import kedarnathImage from "@/assets/kedarnath.jpg";
import badrinathImage from "@/assets/badrinath.jpg";

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
}

export const packages: Package[] = [
  {
    id: 1,
    title: "Chardham Yatra",
    subtitle: "Complete Sacred Journey",
    image: chardhamImage,
    duration: "6 Days",
    groupSize: "2-6 persons",
    locations: "4 Sacred Dhams",
    price: "₹2,35,000",
    description: "Cover all 4 dhams - Yamunotri, Gangotri, Kedarnath & Badrinath in a luxurious helicopter journey.",
    highlights: ["VIP Darshan", "Luxury Accommodation", "Expert Guides"],
    rating: 5.0,
    featured: true,
    overview: "Embark on a spiritually uplifting journey to the Chardham shrines—Yamunotri, Gangotri, Kedarnath, and Badrinath. Our luxury helicopter package ensures a comfortable, time-saving, and divine experience without the rigors of road travel.",
    itinerary: [
      { day: 1, title: "Arrival in Dehradun", description: "Arrive at Dehradun airport. Transfer to a luxury hotel. Briefing about the yatra." },
      { day: 2, title: "Dehradun to Yamunotri", description: "Fly to Kharsali helipad. VIP Darshan at Yamunotri Temple. Return to Kharsali for overnight stay." },
      { day: 3, title: "Yamunotri to Gangotri", description: "Fly to Harsil helipad. Drive to Gangotri Dham for Darshan. Explore the beautiful Harsil valley." },
      { day: 4, title: "Gangotri to Kedarnath", description: "Fly to Phata/Guptkashi, then shuttle to Kedarnath. VIP Darshan. Overnight stay at Kedarnath (if weather permits) or return strictly." },
      { day: 5, title: "Kedarnath to Badrinath", description: "Fly to Badrinath. VIP Darshan and Maha Abhishek Puja participation availability. Visit Mana Village." },
      { day: 6, title: "Return to Dehradun", description: "Morning darshan if missed. Fly back to Dehradun Sahastradhara helipad. Tour concludes." },
    ],
    inclusions: ["Helicopter flying charges", "VIP Darshan slips", "Luxury hotel accommodation", "All meals (Veg)", "Local transfers by Innova/Crysta"],
    exclusions: ["Personal expenses", "Tips", "Insurance"],
  },
  {
    id: 2,
    title: "Do Dham Express",
    subtitle: "Same Day Pilgrimage",
    image: kedarnathImage,
    duration: "1 Day",
    groupSize: "2-4 persons",
    locations: "Kedarnath & Badrinath",
    price: "₹1,30,000",
    description: "Experience both Kedarnath and Badrinath in a single day with our express helicopter service.",
    highlights: ["Same Day Return", "Priority Darshan", "Breakfast Included"],
    rating: 4.9,
    featured: false,
    overview: "Short on time but longing for blessings? The Do Dham Express covers the two most vital shrines, Kedarnath and Badrinath, in a single day starting from Dehradun.",
    itinerary: [
        { day: 1, title: "Dehradun - Kedarnath - Badrinath - Dehradun", description: "Early morning departure from Sahastradhara. Fly to Kedarnath for Darshan. Proceed to Badrinath for Darshan and lunch. Return to Dehradun by evening." }
    ],
    inclusions: ["Helicopter charges ex-Dehradun", "Priority Darshan", "Shuttle tickets", "Lunch at Badrinath"],
    exclusions: ["Special Puja charges", "Personal expenses"],
  },
  {
    id: 3,
    title: "Do Dham Premium",
    subtitle: "3-Day Spiritual Retreat",
    image: badrinathImage,
    duration: "3 Days",
    groupSize: "2-6 persons",
    locations: "Kedarnath & Badrinath",
    price: "₹1,50,000",
    description: "A peaceful 3-day journey covering Kedarnath and Badrinath with extended darshan time.",
    highlights: ["Extended Stay", "Special Puja", "Local Sightseeing"],
    rating: 4.9,
    featured: false,
    overview: "A relaxed pace for the devout. Spend a night at both Kedarnath and Badrinath (or nearby) to absorb the spiritual energy and attend evening Aartis.",
    itinerary: [
      { day: 1, title: "Dehradun to Kedarnath", description: "Fly to the Kedarnath region. Shuttle services to the temple. VIP Darshan and overnight stay." },
      { day: 2, title: "Kedarnath to Badrinath", description: "Fly to Badrinath. Check-in to hotel. Evening Darshan and Aarti attendance." },
      { day: 3, title: "Badrinath to Dehradun", description: "Morning Abhishek Puja (optional). Departure for Dehradun around noon." },
    ],
    inclusions: ["Round trip Helicopter tickets", "2 Nights Accommodation", "All Meals", "VIP Darshan assistance"],
    exclusions: ["Palki/Pony charges", "Ritual charges"],
  },
];
