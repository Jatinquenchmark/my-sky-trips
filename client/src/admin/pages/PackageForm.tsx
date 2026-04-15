import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, 
  Upload, 
  Image as ImageIcon, 
  X,
  Plus,
  Info,
  Loader2,
  CheckCircle2,
  Trash2,
  Check,
  Ban,
  Wallet
} from 'lucide-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';

const PackageForm = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const navigate = useNavigate();
  const { token } = useAuth();
  
  const heroFileRef = useRef<HTMLInputElement>(null);
  const galleryFileRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    locations: '',
    duration: '3 Days / 2 Nights',
    price: '',
    featured: false,
    groupSize: 6,
    status: 'Active'
  });

  const [itinerary, setItinerary] = useState([{ day: 'Day 1', title: '', activities: '' }]);
  const [inclusions, setInclusions] = useState(['']);
  const [exclusions, setExclusions] = useState(['']);
  const [pricingStructure, setPricingStructure] = useState(['']);
  const [pricingTiers, setPricingTiers] = useState([{ tier: 'Standard', price: '', features: ['+ 5% GST'] }]);
  
  // Gallery State: mixing existing URLs and new Files
  const [existingGallery, setExistingGallery] = useState<string[]>([]);
  const [newGalleryFiles, setNewGalleryFiles] = useState<File[]>([]);
  const [newGalleryPreviews, setNewGalleryPreviews] = useState<string[]>([]);

  const [heroImage, setHeroImage] = useState<File | null>(null);
  const [heroPreview, setHeroPreview] = useState<string | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    if (id) {
      fetchPackageDetails();
    }
  }, [id]);

  const fetchPackageDetails = async () => {
    try {
      setFetching(true);
      const response = await fetch(`http://localhost:5000/api/packages/${id}`);
      const data = await response.json();
      if (data.success) {
        const pkg = data.data;
        setFormData({
          title: pkg.title,
          description: pkg.description,
          locations: pkg.locations,
          duration: pkg.duration,
          price: pkg.price.toString(),
          featured: pkg.featured,
          groupSize: pkg.groupSize,
          status: pkg.status
        });
        if (pkg.itinerary?.length > 0) setItinerary(pkg.itinerary);
        if (pkg.inclusions?.length > 0) setInclusions(pkg.inclusions);
        if (pkg.exclusions?.length > 0) setExclusions(pkg.exclusions);
        if (pkg.pricingStructure?.length > 0) setPricingStructure(pkg.pricingStructure);
        if (pkg.pricingTiers?.length > 0) setPricingTiers(pkg.pricingTiers.map((t: any) => ({ ...t, price: t.price.toString() })));
        if (pkg.gallery?.length > 0) setExistingGallery(pkg.gallery);
        setHeroPreview(pkg.image);
      }
    } catch (err: any) {
      toast.error('Could not fetch package details');
    } finally {
      setFetching(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  // List Handlers
  const handleListUpdate = (setter: any, list: string[], idx: number, val: string) => {
    const next = [...list];
    next[idx] = val;
    setter(next);
  };
  const addListItem = (setter: any, list: string[]) => setter([...list, '']);
  const removeListItem = (setter: any, list: string[], idx: number) => setter(list.filter((_, i) => i !== idx));

  // Itinerary Handlers
  const addItineraryDay = () => setItinerary([...itinerary, { day: `Day ${itinerary.length + 1}`, title: '', activities: '' }]);
  const updateItinerary = (idx: number, field: string, val: string) => {
    const next = [...itinerary];
    (next[idx] as any)[field] = val;
    setItinerary(next);
  };
  
  // Pricing Tier Handlers
  const addPricingTier = () => setPricingTiers([...pricingTiers, { tier: '', price: '', features: ['+ 5% GST'] }]);
  const updatePricingTier = (idx: number, field: string, val: any) => {
    const next = [...pricingTiers];
    (next[idx] as any)[field] = val;
    setPricingTiers(next);
  };
  const removePricingTier = (idx: number) => setPricingTiers(pricingTiers.filter((_, i) => i !== idx));

  // Image Handlers
  const handleHeroChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setHeroImage(file);
      const reader = new FileReader();
      reader.onloadend = () => setHeroPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setNewGalleryFiles(prev => [...prev, ...files]);
      files.forEach(file => {
        const reader = new FileReader();
        reader.onloadend = () => setNewGalleryPreviews(prev => [...prev, reader.result as string]);
        reader.readAsDataURL(file);
      });
    }
  };

  const removeExistingGalleryItem = (idx: number) => setExistingGallery(prev => prev.filter((_, i) => i !== idx));
  const removeNewGalleryItem = (idx: number) => {
    setNewGalleryFiles(prev => prev.filter((_, i) => i !== idx));
    setNewGalleryPreviews(prev => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading(id ? 'Updating package...' : 'Creating package...');

    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, (formData as any)[key]));
    
    data.append('itinerary', JSON.stringify(itinerary.filter(i => i.title)));
    data.append('inclusions', JSON.stringify(inclusions.filter(i => i.trim())));
    data.append('exclusions', JSON.stringify(exclusions.filter(i => i.trim())));
    data.append('pricingStructure', JSON.stringify(pricingStructure.filter(i => i.trim())));
    data.append('pricingTiers', JSON.stringify(pricingTiers.filter(t => t.tier && t.price)));
    
    data.append('gallery', JSON.stringify(existingGallery));
    newGalleryFiles.forEach(file => data.append('galleryFiles', file));

    if (heroImage) data.append('image', heroImage);

    try {
      const url = id ? `http://localhost:5000/api/packages/${id}` : 'http://localhost:5000/api/packages';
      const response = await fetch(url, {
        method: id ? 'PUT' : 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: data
      });
      const result = await response.json();
      if (result.success) {
        toast.success(id ? 'Package updated successfully!' : 'Package created successfully!', { id: toastId });
        setTimeout(() => navigate('/admin/packages'), 1200);
      } else {
        throw new Error(result.error || 'Failed to save');
      }
    } catch (err: any) {
      toast.error(err.message, { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return (
    <div className="flex flex-col justify-center items-center py-20 gap-4">
      <Loader2 className="animate-spin text-primary" size={40} />
      <p className="text-sm font-bold text-slate-400 animate-pulse uppercase tracking-widest">Loading Package Details...</p>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12 text-slate-700">
      <div className="flex items-center gap-4">
        <Link to="/admin/packages" className="p-2 bg-surface border border-slate-200 rounded-lg text-text-secondary hover:text-primary transition-colors cursor-pointer"><ArrowLeft size={20} /></Link>
        <h2 className="text-2xl font-bold">{id ? 'Edit' : 'Create'} Package</h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-surface border border-slate-200 rounded-3xl p-6 md:p-10 space-y-10 shadow-premium">
        {/* Section 1: Basic */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2"><span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">01</span><h3 className="font-bold text-xs uppercase tracking-widest text-slate-700">Base Details</h3></div>
          <input name="title" value={formData.title} onChange={handleInputChange} placeholder="Title (e.g. Magical Goa Retreat)" className="input-field font-semibold" required />
          <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Write a compelling description..." rows={4} className="input-field" required />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Price (₹)</label>
              <input name="price" type="number" value={formData.price} onChange={handleInputChange} placeholder="Price" className="input-field" required />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Duration</label>
              <input name="duration" value={formData.duration} onChange={handleInputChange} placeholder="Duration" className="input-field" />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Location</label>
              <input name="locations" value={formData.locations} onChange={handleInputChange} placeholder="Locations" className="input-field" />
            </div>
          </div>
        </section>

        {/* Section 2: Itinerary */}
        <section className="space-y-6">
          <div className="flex justify-between border-b border-slate-200 pb-2"><div className="flex items-center gap-2"><span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">02</span><h3 className="font-bold text-xs uppercase tracking-widest text-slate-700">Itinerary</h3></div><button type="button" onClick={addItineraryDay} className="text-primary text-xs font-bold cursor-pointer transition-opacity hover:opacity-80">+ Add Day</button></div>
          {itinerary.map((day, ix) => (
            <div key={ix} className="p-4 bg-slate-50 rounded-xl border border-slate-100 relative group transition-all hover:bg-slate-100/50">
              <button type="button" onClick={() => setItinerary(itinerary.filter((_, i) => i !== ix))} className="absolute top-2 right-2 text-rose-300 opacity-0 group-hover:opacity-100 transition-opacity hover:text-rose-500 cursor-pointer"><X size={16} /></button>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input value={day.day} onChange={e => updateItinerary(ix, 'day', e.target.value)} className="input-field text-sm font-bold bg-white" />
                <input value={day.title} onChange={e => updateItinerary(ix, 'title', e.target.value)} placeholder="Title of the day" className="md:col-span-3 input-field text-sm font-semibold bg-white" />
                <textarea value={day.activities} onChange={e => updateItinerary(ix, 'activities', e.target.value)} placeholder="What will happen on this day?" className="md:col-span-4 input-field text-sm bg-white" />
              </div>
            </div>
          ))}
        </section>

        {/* Section 3: Gallery Upload */}
        <section className="space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2"><span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs">03</span><h3 className="font-bold text-xs uppercase tracking-widest text-slate-700">Visual Gallery</h3></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {newGalleryPreviews.map((src, i) => (
               <div key={i} className="aspect-square rounded-xl overflow-hidden relative group border border-slate-200 shadow-sm">
                  <img src={src} className="w-full h-full object-cover" />
                  <button type="button" onClick={() => removeNewGalleryItem(i)} className="absolute top-1 right-1 bg-white/90 p-1 rounded-full text-rose-500 cursor-pointer hover:bg-white transition-colors"><X size={12} /></button>
               </div>
             ))}
             {existingGallery.map((src, i) => (
               <div key={`ex-${i}`} className="aspect-square rounded-xl overflow-hidden relative group border border-slate-200 opacity-80 hover:opacity-100 transition-opacity">
                  <img src={src} className="w-full h-full object-cover" />
                  <button type="button" onClick={() => removeExistingGalleryItem(i)} className="absolute top-1 right-1 bg-white/90 p-1 rounded-full text-rose-500 cursor-pointer hover:bg-white transition-colors"><X size={12} /></button>
               </div>
             ))}
             <button 
               type="button" 
               onClick={() => galleryFileRef.current?.click()}
               className="aspect-square rounded-xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center gap-2 hover:bg-slate-50 transition-all hover:border-primary/30 group cursor-pointer"
             >
                <Plus size={24} className="text-slate-300 group-hover:text-primary transition-colors" />
                <span className="text-[10px] font-bold text-slate-400 group-hover:text-primary transition-colors uppercase tracking-widest">UPLOAD IMAGE</span>
                <input type="file" multiple ref={galleryFileRef} onChange={handleGalleryChange} className="hidden" accept="image/*" />
             </button>
          </div>
        </section>

        {/* Section 4: Inclusions & Exclusions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
           <section className="space-y-4">
              <div className="flex justify-between border-b border-slate-200 pb-2"><div className="flex items-center gap-2 text-primary"><Check size={16} strokeWidth={3} /><h3 className="font-bold text-xs uppercase tracking-widest">Inclusions</h3></div><button type="button" onClick={() => addListItem(setInclusions, inclusions)} className="text-primary text-xs font-bold cursor-pointer transition-opacity hover:opacity-80">+ Add</button></div>
              {inclusions.map((item, ix) => (
                <div key={ix} className="flex gap-2 group">
                   <input value={item} onChange={e => handleListUpdate(setInclusions, inclusions, ix, e.target.value)} placeholder="Entry tickets, transfers, etc." className="input-field text-sm py-2 bg-slate-50/50" />
                   <button type="button" onClick={() => removeListItem(setInclusions, inclusions, ix)} className="text-slate-300 hover:text-rose-400 cursor-pointer transition-colors px-1"><X size={16}/></button>
                </div>
              ))}
           </section>
           <section className="space-y-4">
              <div className="flex justify-between border-b border-slate-200 pb-2"><div className="flex items-center gap-2 text-rose-500"><Ban size={16} strokeWidth={3} /><h3 className="font-bold text-xs uppercase tracking-widest">Exclusions</h3></div><button type="button" onClick={() => addListItem(setExclusions, exclusions)} className="text-primary text-xs font-bold cursor-pointer transition-opacity hover:opacity-80">+ Add</button></div>
              {exclusions.map((item, ix) => (
                <div key={ix} className="flex gap-2 group">
                   <input value={item} onChange={e => handleListUpdate(setExclusions, exclusions, ix, e.target.value)} placeholder="Flight tickets, lunch, etc." className="input-field text-sm py-2 bg-slate-50/50" />
                   <button type="button" onClick={() => removeListItem(setExclusions, exclusions, ix)} className="text-slate-300 hover:text-rose-400 cursor-pointer transition-colors px-1"><X size={16}/></button>
                </div>
              ))}
           </section>
        </div>

        {/* Section 4.5: Pricing Tiers */}
        <section className="space-y-6">
           <div className="flex justify-between border-b border-slate-200 pb-2">
             <div className="flex items-center gap-2 text-primary">
               <Wallet size={16}/>
               <h3 className="font-bold text-xs uppercase tracking-widest text-slate-700">Travel Tiers (Pricing)</h3>
             </div>
             <button type="button" onClick={addPricingTier} className="text-primary text-xs font-bold cursor-pointer transition-opacity hover:opacity-80">+ Add Tier</button>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pricingTiers.map((tier, ix) => (
                <div key={ix} className="p-6 bg-slate-50 rounded-2xl border border-slate-100 relative group transition-all hover:bg-slate-100/50 space-y-4">
                  <button type="button" onClick={() => removePricingTier(ix)} className="absolute top-2 right-2 text-rose-300 opacity-0 group-hover:opacity-100 transition-opacity hover:text-rose-500 cursor-pointer"><X size={16}/></button>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Tier Name</label>
                        <input value={tier.tier} onChange={e => updatePricingTier(ix, 'tier', e.target.value)} placeholder="Standard / Luxury / Ultra" className="input-field text-sm font-bold bg-white" />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Price (₹)</label>
                        <input type="number" value={tier.price} onChange={e => updatePricingTier(ix, 'price', e.target.value)} placeholder="32000" className="input-field text-sm font-bold bg-white" />
                      </div>
                    </div>
                    <div className="space-y-1">
                       <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Highlights (Comma separated)</label>
                       <input value={tier.features?.join(', ')} onChange={e => updatePricingTier(ix, 'features', e.target.value.split(',').map((s: string) => s.trim()))} placeholder="+ 5% GST, Premium Stay" className="input-field text-xs bg-white" />
                    </div>
                  </div>
                </div>
              ))}
           </div>
        </section>

        {/* Section 5: Pricing Structure */}
        <section className="space-y-6">
           <div className="flex justify-between border-b border-slate-200 pb-2"><div className="flex items-center gap-2 text-emerald-600"><Wallet size={16}/><h3 className="font-bold text-xs uppercase tracking-widest">Pricing Structure</h3></div><button type="button" onClick={() => addListItem(setPricingStructure, pricingStructure)} className="text-primary text-xs font-bold cursor-pointer transition-opacity hover:opacity-80">+ Add Detail</button></div>
           {pricingStructure.map((item, ix) => (
             <div key={ix} className="flex gap-2 group">
                <input value={item} onChange={e => handleListUpdate(setPricingStructure, pricingStructure, ix, e.target.value)} placeholder="Payment terms, GST details, refund policy..." className="input-field text-sm py-2 bg-slate-50/50" />
                <button type="button" onClick={() => removeListItem(setPricingStructure, pricingStructure, ix)} className="text-slate-300 hover:text-rose-400 cursor-pointer transition-colors px-1"><X size={16}/></button>
             </div>
           ))}
        </section>

        {/* Section 6: Hero Image */}
        <section className="space-y-6">
           <div className="flex items-center gap-2 border-b border-slate-200 pb-2"><span className="w-6 h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs">06</span><h3 className="font-bold text-xs uppercase tracking-widest text-slate-700">Hero Image (Cover)</h3></div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div 
                onClick={() => heroFileRef.current?.click()}
                className="aspect-video border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-slate-50 transition-all hover:border-primary/30 group"
              >
                 <Upload className="text-primary transition-transform group-hover:-translate-y-1" />
                 <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest group-hover:text-primary transition-colors">Select Hero Photo</span>
                 <input type="file" ref={heroFileRef} onChange={handleHeroChange} className="hidden" accept="image/*" />
              </div>
              <div className="aspect-video rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-inner">
                 {heroPreview ? (
                    <img src={heroPreview} className="w-full h-full object-cover" />
                 ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-300">
                       <ImageIcon size={48} />
                       <span className="text-[10px] font-bold mt-2">PREVIEW</span>
                    </div>
                 )}
              </div>
           </div>
        </section>

        <div className="flex justify-end gap-4 pt-10 border-t border-slate-200">
           <button type="button" onClick={() => navigate('/admin/packages')} className="px-6 py-2 font-bold text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">Cancel</button>
           <button type="submit" disabled={loading} className="primary-btn px-12 min-w-[200px]">
              {loading ? <Loader2 className="animate-spin" size={20} /> : (id ? 'Update Package' : 'Publish Package')}
           </button>
        </div>
      </form>
    </div>
  );
};

export default PackageForm;
