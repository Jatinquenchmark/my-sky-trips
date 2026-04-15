import React, { useState, useEffect } from 'react';
import { 
  Package, 
  MapPin,
  Star,
  Plus,
  ArrowRight,
  TrendingUp,
  Map,
  Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const StatCard = ({ title, value, icon: Icon, color }: any) => {
  const colorMap: any = {
    blue: 'bg-blue-50 text-blue-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600'
  };

  return (
    <div className="stat-card">
      <div className={`p-3 rounded-xl ${colorMap[color] || 'bg-slate-50 text-slate-600'} w-fit mb-4`}>
        <Icon size={24} />
      </div>
      <p className="text-text-secondary text-xs font-bold uppercase tracking-widest mb-1">{title}</p>
      <h3 className="text-2xl font-bold text-text-primary">{value}</h3>
    </div>
  );
};

const PackageStatusItem = ({ title, location, status, rating }: any) => (
  <div className="flex items-start gap-4 p-4 hover:bg-slate-50 rounded-xl transition-colors group border border-transparent hover:border-slate-100">
    <div className="p-2.5 rounded-lg bg-primary/10 text-primary">
      <Package size={20} />
    </div>
    <div className="flex-1">
      <div className="flex justify-between items-start mb-1">
        <h4 className="font-bold text-text-primary text-sm">{title}</h4>
        <div className="flex items-center gap-1 text-amber-500 text-[10px] font-bold">
           <Star size={12} fill="currentColor" /> {rating}
        </div>
      </div>
      <div className="flex items-center gap-2 text-text-secondary text-xs">
        <MapPin size={12} /> {location} • <span className="text-emerald-600 font-bold uppercase tracking-widest text-[10px]">{status}</span>
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPackages: 0,
    totalDestinations: 0,
    avgRating: 0
  });
  const [allPackages, setAllPackages] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      const [statsRes, pkgsRes] = await Promise.all([
        fetch('http://localhost:5000/api/packages/dashboard/stats', {
          headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
        }),
        fetch('http://localhost:5000/api/packages')
      ]);

      const statsData = await statsRes.json();
      const pkgsData = await pkgsRes.json();

      if (statsData.success && pkgsData.success) {
        setStats(statsData.data);
        setAllPackages(pkgsData.data);
      } else {
        throw new Error('Failed to fetch dashboard data');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <Loader2 className="animate-spin text-primary mb-4" size={40} />
        <p className="text-text-secondary">Crunching data for you...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Total Packages" value={stats.totalPackages} icon={Package} color="blue" />
        <StatCard title="Total Destinations" value={stats.totalDestinations} icon={MapPin} color="purple" />
        <StatCard title="Avg. Package Rating" value={`${stats.avgRating}/5.0`} icon={Star} color="orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Package Summary Feed */}
        <div className="lg:col-span-3 bg-surface border border-border rounded-2xl p-8 shadow-premium">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h3 className="text-lg font-bold text-text-primary">Package Status</h3>
              <p className="text-text-secondary text-xs mt-1">Live status of your travel experiences.</p>
            </div>
            <Link to="/admin/packages" className="text-primary text-xs font-bold uppercase tracking-wider hover:underline flex items-center gap-1">
              Manage Packages <ArrowRight size={14} />
            </Link>
          </div>

          <div className="space-y-2">
            {allPackages.length === 0 ? (
              <div className="text-center py-10 text-text-secondary italic text-sm bg-slate-50 rounded-xl">
                 No packages uploaded yet.
              </div>
            ) : (
              <>
                {allPackages.slice((currentPage - 1) * pageSize, currentPage * pageSize).map(pkg => (
                  <PackageStatusItem 
                    key={pkg._id}
                    title={pkg.title}
                    location={pkg.locations}
                    status={pkg.status || 'Active'}
                    rating={pkg.rating}
                  />
                ))}
                
                {allPackages.length > pageSize && (
                  <div className="flex items-center justify-between pt-6 mt-4 border-t border-slate-50">
                    <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest">
                      Showing {Math.min((currentPage - 1) * pageSize + 1, allPackages.length)} to {Math.min(currentPage * pageSize, allPackages.length)} of {allPackages.length}
                    </p>
                    <div className="flex gap-2">
                       <button 
                         disabled={currentPage === 1}
                         onClick={() => setCurrentPage(p => p - 1)}
                         className="p-2 border border-border rounded-lg hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
                       >
                         <ArrowRight className="rotate-180" size={14} />
                       </button>
                       <button 
                         disabled={currentPage * pageSize >= allPackages.length}
                         onClick={() => setCurrentPage(p => p + 1)}
                         className="p-2 border border-border rounded-lg hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer"
                       >
                         <ArrowRight size={14} />
                       </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="bg-surface border border-border rounded-2xl p-6 shadow-premium">
             <h4 className="text-sm font-bold text-text-primary mb-4">Quick Actions</h4>
             <div className="grid grid-cols-1 gap-3">
                <Link to="/admin/add-package" className="flex items-center gap-3 p-3 bg-primary/10 text-primary rounded-xl hover:bg-primary/20 transition-all group">
                   <div className="p-2 bg-primary rounded-lg text-white group-hover:scale-110 transition-transform">
                      <Plus size={18} />
                   </div>
                   <span className="text-xs font-bold">Add New Package</span>
                </Link>
                <div className="p-4 bg-slate-50 rounded-xl relative overflow-hidden group">
                   <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1">Total Packages</p>
                   <p className="text-xl font-bold text-text-primary">{stats.totalPackages}</p>
                   <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:scale-125 transition-transform duration-500">
                      <TrendingUp size={64} />
                   </div>
                </div>
             </div>
          </div>

          {/* Featured Highlight */}
          <div className="bg-slate-900 p-6 rounded-2xl text-white relative overflow-hidden group shadow-xl">
             <div className="relative z-10">
                <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2">Internal Stats</p>
                <h4 className="text-lg font-bold mb-1">Sky Trip Pro</h4>
                <p className="text-white/60 text-[10px] leading-relaxed mb-6">You have {stats.totalPackages} packages live.</p>
                <Link to="/admin/packages" className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold transition-all inline-block">
                   View All
                </Link>
             </div>
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform duration-500">
                <Map size={84} />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
