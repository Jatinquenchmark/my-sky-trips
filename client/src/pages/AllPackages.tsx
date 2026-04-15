import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, SlidersHorizontal, ArrowLeft } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { PackageCard } from "@/components/PackageCard";
import { fetchPackages, Package } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const AllPackages = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loadPackages = async () => {
      try {
        const data = await fetchPackages();
        setPackages(data);
      } catch (error) {
        console.error("Error loading packages:", error);
      } finally {
        setLoading(false);
      }
    };
    loadPackages();
  }, []);

  const filteredPackages = packages.filter(
    (pkg) =>
      pkg.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pkg.locations.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
              <button 
                onClick={() => navigate('/')}
                className="flex items-center gap-2 text-primary text-sm font-bold uppercase tracking-wider mb-4 hover:gap-3 transition-all"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Home
              </button>
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-4">
                All <span className="text-gradient-sky">Packages</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Discover our complete collection of spiritual and adventure journeys across the Himalayas.
              </p>
            </div>
          </div>

          {/* Search and Filters Bar */}
          <div className="bg-card/50 backdrop-blur-md border border-border/50 p-6 rounded-3xl mb-12 flex flex-col md:flex-row gap-4 shadow-soft">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search by destination or package name..."
                className="pl-12 h-14 bg-background/50 border-border/50 rounded-2xl focus:ring-primary/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="premium" className="h-14 px-8 rounded-2xl gap-2">
              <SlidersHorizontal className="w-5 h-5" />
              More Filters
            </Button>
          </div>

          {/* Packages Grid */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
              <p className="text-muted-foreground font-medium">Loading your journeys...</p>
            </div>
          ) : filteredPackages.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPackages.map((pkg) => (
                <PackageCard key={pkg._id} pkg={pkg} />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-card/30 rounded-[2rem] border border-dashed border-border">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-primary" />
              </div>
              <h3 className="text-2xl font-serif font-bold text-foreground mb-2">No Packages Found</h3>
              <p className="text-muted-foreground">
                We couldn't find any packages matching "{searchQuery}". Try a different search term.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AllPackages;
