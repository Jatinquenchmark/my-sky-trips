import React, { useState, useEffect } from 'react';
import { 
  Search, 
  MapPin, 
  Clock, 
  Users, 
  Edit3, 
  Trash2, 
  Plus,
  TrendingUp,
  Star,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertTriangle
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { API_BASE_URL } from '../../lib/api';

interface Package {
  _id: string;
  title: string;
  description: string;
  locations: string;
  duration: string;
  price: number;
  rating: number;
  image: string;
  featured: boolean;
  groupSize: number;
  status: string;
}

const PackageCard = ({ item, onDelete, onEdit }: { item: Package; onDelete: (id: string) => void; onEdit: (id: string) => void }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="bg-surface border border-border rounded-2xl overflow-hidden group hover:shadow-premium-hover transition-all duration-300"
  >
    <div className="relative h-48 overflow-hidden">
      <img 
        src={item.image} 
        alt={item.title} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute top-4 left-4 flex gap-2">
        {item.featured && (
          <span className="bg-primary text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md shadow-lg shadow-primary/20">
            Trending
          </span>
        )}
        <span className="bg-white/90 backdrop-blur-md text-text-primary text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-md">
           Eco-Choice
        </span>
      </div>
      <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-md text-primary font-bold px-3 py-1 rounded-lg shadow-lg">
        ₹{item.price}
      </div>
    </div>
    
    <div className="p-6">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-bold text-text-primary text-lg leading-tight group-hover:text-primary transition-colors">
          {item.title}
        </h3>
        <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
          <Star size={14} fill="currentColor" /> {item.rating}
        </div>
      </div>
      
      <div className="flex items-center gap-2 text-text-secondary text-xs mb-4">
        <MapPin size={14} className="text-primary" /> {item.locations}
      </div>

      <div className="flex items-center gap-4 text-text-secondary text-[10px] font-bold uppercase tracking-wider mb-6 border-y border-slate-50 py-3">
        <div className="flex items-center gap-1.5">
          <Clock size={14} /> {item.duration}
        </div>
        <div className="flex items-center gap-1.5 border-l border-slate-200 pl-4">
          <TrendingUp size={14} /> up to {item.groupSize || '6 People'}
        </div>
      </div>

      <div className="flex gap-2">
        <button 
          onClick={() => onEdit(item._id)}
          className="flex-1 py-2 bg-slate-100 text-text-primary text-[10px] font-bold uppercase tracking-widest rounded-lg hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
        >
          <Edit3 size={14} /> Edit
        </button>
        <button 
          onClick={() => onDelete(item._id)}
          className="p-2 bg-rose-50 text-rose-500 rounded-lg hover:bg-rose-100 transition-colors cursor-pointer"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  </motion.div>
);

const Packages = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const itemsPerPage = 6;
  
  const { token } = useAuth();
  const navigate = useNavigate();

  const fetchPackages = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/packages`);
      const data = await response.json();
      if (data.success) {
        setPackages(data.data);
      } else {
        throw new Error(data.error || 'Failed to fetch packages');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const confirmDelete = async () => {
    if (!deleteId) return;
    
    setIsDeleting(true);
    const toastId = toast.loading('Deleting package...');

    try {
      const response = await fetch(`${API_BASE_URL}/packages/${deleteId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setPackages(prev => prev.filter(p => p._id !== deleteId));
        toast.success('Package deleted successfully', { id: toastId });
      } else {
        throw new Error(data.error || 'Failed to delete package');
      }
    } catch (err: any) {
      toast.error(err.message, { id: toastId });
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  const handleEdit = (id: string) => {
    navigate(`/admin/add-package?id=${id}`);
  };

  const filteredPackages = packages.filter(p => 
    p.title.toLowerCase().includes(search.toLowerCase()) || 
    p.locations.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPackages.length / itemsPerPage);
  const currentItems = filteredPackages.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8">
      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center mb-4 mx-auto sm:mx-0">
               <AlertTriangle className="text-rose-500" size={24} />
            </div>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the travel package from your database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={(e) => {
                e.preventDefault();
                confirmDelete();
              }}
              className="bg-rose-500 hover:bg-rose-600 text-white"
              disabled={isDeleting}
            >
              {isDeleting ? <Loader2 className="animate-spin" size={18} /> : 'Delete Package'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Search and Action Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-surface p-6 rounded-2xl border border-border shadow-premium">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary w-5 h-5" />
          <input 
            type="text" 
            placeholder="Search packages, destinations..." 
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <Link to="/admin/add-package" className="primary-btn w-full md:w-auto px-8">
          <Plus size={20} /> Create New Package
        </Link>
      </div>

      {loading && (
        <div className="flex flex-col justify-center items-center py-20 gap-4">
          <Loader2 className="animate-spin text-primary" size={40} />
          <p className="text-sm font-bold text-slate-400 animate-pulse">FETCHING PACKAGES...</p>
        </div>
      )}

      {error && !loading && (
        <div className="bg-rose-50 text-rose-500 p-6 rounded-2xl border border-rose-100 text-center flex flex-col items-center gap-2">
           <AlertTriangle size={32} />
           <p className="font-bold">{error}</p>
           <button onClick={fetchPackages} className="text-xs underline font-bold mt-2">Retry Loading</button>
        </div>
      )}

      {!loading && !error && currentItems.length === 0 && (
        <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <p className="text-text-secondary font-medium">No packages found. Start by creating one!</p>
        </div>
      )}

      {/* Mini Stats */}
      {!loading && packages.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { label: 'Total Destinations', value: new Set(packages.map(p => p.locations)).size, color: 'blue' },
            { label: 'Total Packages', value: packages.length, color: 'emerald' },
            { label: 'Featured Tours', value: packages.filter(p => p.featured).length, color: 'purple' },
          ].map(stat => (
            <div key={stat.label} className="bg-surface p-5 rounded-xl border border-border shadow-sm transition-transform hover:scale-[1.02]">
              <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1">{stat.label}</p>
              <p className="text-xl font-bold text-text-primary">{stat.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentItems.map(item => (
          <PackageCard key={item._id} item={item} onDelete={setDeleteId} onEdit={handleEdit} />
        ))}
      </div>

      {/* Pagination Container */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 pt-8">
          <button 
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2.5 rounded-xl border border-border bg-surface text-text-secondary disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary hover:text-primary transition-all shadow-premium cursor-pointer"
          >
            <ChevronLeft size={20} />
          </button>
          
          <div className="flex items-center gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={cn(
                  "w-10 h-10 rounded-xl border font-extrabold text-xs transition-all shadow-premium cursor-pointer",
                  currentPage === i + 1 
                    ? "bg-primary border-primary text-white" 
                    : "bg-surface border-border text-text-secondary hover:border-primary"
                )}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button 
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2.5 rounded-xl border border-border bg-surface text-text-secondary disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary hover:text-primary transition-all shadow-premium cursor-pointer"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Packages;
