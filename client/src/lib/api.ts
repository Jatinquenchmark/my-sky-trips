export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export interface Package {
  _id: string;
  title: string;
  description: string;
  locations: string;
  duration: string;
  price: number;
  rating: number;
  image: string;
  featured: boolean;
  showPrice: boolean;
  groupSize: number;
  status: string;
  itinerary?: { day: string; title: string; activities: string }[];
  inclusions?: string[];
  exclusions?: string[];
  gallery?: string[];
  pricingStructure?: string[];
  pricingTiers?: { tier: string; price: number; features?: string[] }[];
}

export const fetchPackages = async (): Promise<Package[]> => {
  const response = await fetch(`${API_BASE_URL}/packages`);
  if (!response.ok) {
    throw new Error("Failed to fetch packages");
  }
  const data = await response.json();
  return data.data;
};

export const fetchPackageById = async (id: string): Promise<Package> => {
  const response = await fetch(`${API_BASE_URL}/packages/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch package details");
  }
  const data = await response.json();
  return data.data;
};
