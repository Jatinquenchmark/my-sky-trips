import { useParams, useNavigate } from "react-router-dom";
import { packages } from "@/data/packages";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Clock, Users, MapPin, CheckCircle2, XCircle, ArrowLeft, Calendar, Star } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const PackageDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const pkg = packages.find((p) => p.id === Number(id));
    const [selectedPrice, setSelectedPrice] = useState(pkg?.price || "");
    const [selectedTier, setSelectedTier] = useState<string | null>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    useEffect(() => {
        if (pkg) {
            setSelectedPrice(pkg.price);
            setSelectedTier(null);
        }
    }, [pkg]);

    if (!pkg) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold mb-4">Package not found</h2>
                <Button onClick={() => navigate("/")}>Go Home</Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="pt-20">
                {/* Hero Section */}
                <div className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
                    <motion.div
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.5 }}
                        className="absolute inset-0"
                    >
                        <img
                            src={pkg.image}
                            alt={pkg.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40" />
                    </motion.div>

                    {/* Back Button Overlay */}
                    <div className="absolute top-24 left-4 z-20 md:left-8">
                        <Button
                            variant="outline"
                            size="sm"
                            className="bg-background/20 backdrop-blur-md border-white/30 text-white hover:bg-white/20 hover:text-white transition-all gap-2"
                            onClick={() => navigate("/")}
                        >
                            <ArrowLeft className="w-4 h-4" /> Back
                        </Button>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="container px-4 text-center text-white">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                <span className="inline-block px-3 py-1 bg-saffron/80 rounded-full text-sm font-medium mb-4 backdrop-blur-sm">
                                    {pkg.subtitle}
                                </span>
                                <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">
                                    {pkg.title}
                                </h1>
                                <div className="flex flex-wrap justify-center gap-6 text-sm md:text-base font-medium">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-5 h-5 text-saffron" />
                                        {pkg.duration}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Users className="w-5 h-5 text-saffron" />
                                        {pkg.groupSize}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin className="w-5 h-5 text-saffron" />
                                        {pkg.locations}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-12">
                    <Button
                        variant="ghost"
                        className="mb-8 hover:bg-transparent pl-0 hover:pl-2 transition-all gap-2"
                        onClick={() => navigate("/")}
                    >
                        <ArrowLeft className="w-4 h-4" /> Back to Packages
                    </Button>

                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-12">
                            {/* Overview */}
                            <section>
                                <h2 className="text-3xl font-serif font-bold mb-6 text-foreground">Overview</h2>
                                <p className="text-lg text-muted-foreground leading-relaxed">
                                    {pkg.overview || pkg.description}
                                </p>
                            </section>

                            {/* Pricing Tiers Section */}
                            <section className="scroll-mt-24">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                                    <h2 className="text-3xl font-serif font-bold text-foreground">Choose Your Travel Tier</h2>
                                    <span className="text-sm font-medium text-primary px-4 py-1.5 bg-primary/10 rounded-full border border-primary/20">
                                        Tailored Experiences
                                    </span>
                                </div>
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {pkg.additionalInfo?.find(info => info.title === "Pricing Structure")?.content.filter(line => line.includes("—")).map((line, idx) => {
                                        const name = line.split("—")[0].trim();
                                        const rest = line.split("—")[1]?.trim() || "";

                                        // Extract price excluding what's in parentheses
                                        const rawPricePart = rest.split("(")[0].trim();
                                        // Remove "per person" suffix if present
                                        const pricePart = rawPricePart.replace(/ per person$/i, "");

                                        // Extract content inside parentheses
                                        const featuresMatch = rest.match(/\((.*?)\)/);
                                        let featuresStr = featuresMatch ? featuresMatch[1] : "";

                                        // Extract discount if present
                                        const discountMatch = featuresStr.match(/after (₹[0-9,]+) discount/i);
                                        let originalPrice = "";
                                        if (discountMatch) {
                                            const discountValStr = discountMatch[1].replace(/[₹,]/g, "");
                                            const currentPriceValStr = pricePart.replace(/[₹,]/g, "");
                                            const discountVal = parseInt(discountValStr);
                                            const currentPriceVal = parseInt(currentPriceValStr);

                                            if (!isNaN(discountVal) && !isNaN(currentPriceVal)) {
                                                const originalVal = currentPriceVal + discountVal;
                                                originalPrice = "₹" + originalVal.toLocaleString("en-IN");
                                            }
                                            // Remove discount mention from features string
                                            featuresStr = featuresStr.replace(/,? ?after ₹[0-9,]+ discount/i, "").trim();
                                        }

                                        const features = featuresStr;
                                        const isSelected = selectedTier === name;

                                        return (
                                            <motion.div
                                                key={idx}
                                                whileHover={{ y: -5 }}
                                                onClick={() => {
                                                    setSelectedPrice(pricePart);
                                                    setSelectedTier(name);
                                                }}
                                                className={`relative p-8 rounded-[2rem] border cursor-pointer transition-all duration-300 flex flex-col ${isSelected
                                                    ? "bg-gradient-to-b from-primary/10 to-transparent border-primary shadow-strong-primary ring-2 ring-primary/20"
                                                    : "bg-card border-border hover:border-primary/20 shadow-soft"
                                                    }`}
                                            >
                                                <div className="text-center mb-8">
                                                    <span className={`text-[10px] uppercase tracking-[0.2em] font-bold ${isSelected ? "text-primary" : "text-muted-foreground"}`}>
                                                        {name}
                                                    </span>
                                                    <div className="mt-4 flex flex-col items-center justify-center gap-1">
                                                        {originalPrice && (
                                                            <span className="text-sm line-through text-red-500 font-medium">
                                                                {originalPrice}
                                                            </span>
                                                        )}
                                                        <span className="text-3xl font-serif font-bold text-foreground leading-none">{pricePart}</span>
                                                        <span className="text-[10px] mt-1 text-muted-foreground font-bold uppercase tracking-wider">Per Person</span>
                                                    </div>
                                                </div>

                                                <div className="space-y-4">
                                                    {features.split(",").map((feat, fIdx) => (
                                                        <div key={fIdx} className="flex items-center gap-3 text-sm text-foreground/80 font-medium">
                                                            <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-primary" : "bg-primary/30"}`} />
                                                            {feat.trim()}
                                                        </div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        );
                                    })}
                                </div>
                            </section>

                            {/* Itinerary */}
                            {pkg.itinerary && (
                                <section>
                                    <h2 className="text-3xl font-serif font-bold mb-8 text-foreground">Itinerary</h2>
                                    <div className="space-y-8">
                                        {pkg.itinerary.map((item, index) => (
                                            <div key={index} className="relative pl-8 border-l-2 border-saffron/20 pb-8 last:pb-0 last:border-l-0">
                                                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-saffron ring-4 ring-background" />
                                                <div className="mb-2 flex items-center gap-3">
                                                    <span className="text-sm font-bold text-saffron uppercase tracking-wider">
                                                        Day {item.day}
                                                    </span>
                                                </div>
                                                <h3 className="text-xl font-semibold mb-3 text-foreground">{item.title}</h3>
                                                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}

                            {/* Inclusions & Exclusions */}
                            <div className="grid md:grid-cols-2 gap-8">
                                {pkg.inclusions && (
                                    <div className="bg-primary/5 p-8 rounded-2xl border border-primary/10">
                                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-primary">
                                            <CheckCircle2 className="w-6 h-6" />
                                            Inclusions
                                        </h3>
                                        <ul className="space-y-3">
                                            {pkg.inclusions.map((inc, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                                                    <span className="text-sm text-foreground/80">{inc}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {pkg.exclusions && (
                                    <div className="bg-destructive/5 p-8 rounded-2xl border border-destructive/10">
                                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-destructive">
                                            <XCircle className="w-6 h-6" />
                                            Exclusions
                                        </h3>
                                        <ul className="space-y-3">
                                            {pkg.exclusions.map((exc, i) => (
                                                <li key={i} className="flex items-start gap-3">
                                                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-destructive shrink-0" />
                                                    <span className="text-sm text-foreground/80">{exc}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>

                            {/* Additional Info */}
                            {pkg.additionalInfo && (
                                <section className="space-y-8 mt-12 bg-card/50 rounded-2xl border border-border/50 p-8 hover:border-border transition-colors">
                                    {pkg.additionalInfo.map((info, index) => (
                                        <div key={index} className="space-y-4">
                                            <h3 className="text-xl font-serif font-bold text-foreground flex items-center gap-2">
                                                <div className="w-1.5 h-6 bg-saffron rounded-full" />
                                                {info.title}
                                            </h3>
                                            <ul className="space-y-3 pl-4">
                                                {info.content.map((line, i) => (
                                                    <li key={i} className="flex items-start gap-3 group">
                                                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-saffron/50 group-hover:bg-saffron transition-colors shrink-0" />
                                                        <span className="text-muted-foreground leading-relaxed text-sm md:text-base">{line}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                            {index !== pkg.additionalInfo!.length - 1 && (
                                                <div className="h-px w-full bg-border/50 my-8" />
                                            )}
                                        </div>
                                    ))}
                                </section>
                            )}
                        </div>

                        <div className="lg:col-span-1">
                            <div className="sticky top-24 rounded-[2.5rem] border border-border/50 bg-card p-10 shadow-soft">
                                <div className="mb-10 text-center">
                                    <span className="text-muted-foreground text-[10px] uppercase tracking-[0.2em] font-bold">
                                        {selectedTier ? `Selected Tier: ${selectedTier}` : "Starting from"}
                                    </span>
                                    <div className="text-5xl md:text-6xl font-serif font-bold text-primary mt-3">
                                        {selectedPrice}
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-2">Per person</p>
                                </div>

                                <div className="space-y-6 mb-10">
                                    <div className="flex items-center justify-between py-4 border-b border-border/50">
                                        <div className="flex items-center gap-3 text-muted-foreground">
                                            <Calendar className="w-5 h-5" />
                                            <span className="text-sm font-medium uppercase tracking-wider">Duration</span>
                                        </div>
                                        <span className="font-bold text-lg">{pkg.duration}</span>
                                    </div>
                                    <div className="flex items-center justify-between py-4 border-b border-border/50">
                                        <div className="flex items-center gap-3 text-muted-foreground">
                                            <Users className="w-5 h-5" />
                                            <span className="text-sm font-medium uppercase tracking-wider">Group Size</span>
                                        </div>
                                        <span className="font-bold text-lg">{pkg.groupSize}</span>
                                    </div>
                                    <div className="flex items-center justify-between py-4 border-b border-border/50">
                                        <div className="flex items-center gap-3 text-muted-foreground">
                                            <Star className="w-5 h-5" />
                                            <span className="text-sm font-medium uppercase tracking-wider">Rating</span>
                                        </div>
                                        <span className="font-bold text-lg">{pkg.rating}/5.0</span>
                                    </div>
                                </div>

                                <Button className="w-full h-14 text-xl font-bold bg-primary hover:bg-primary/90 rounded-2xl shadow-lg transition-all" size="lg">
                                    Request Booking
                                </Button>
                                <p className="text-center text-[10px] uppercase tracking-wider text-muted-foreground mt-6 font-medium">
                                    *Prices vary based on season and availability
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PackageDetail;
