import React, { useState } from 'react';
import { 
  BarChart3, 
  Package, 
  Users, 
  Calendar, 
  Settings, 
  LogOut, 
  Search,
  Bell,
  Menu,
  Plus,
  TrendingUp,
  MapPin,
  ChevronRight
} from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = () => (
  <aside className="w-64 bg-slate-900 border-r border-slate-800 h-screen sticky top-0 hidden md:flex flex-col p-6">
    <div className="flex items-center gap-2 mb-10">
      <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
        <MapPin className="text-white w-5 h-5" />
      </div>
      <h1 className="text-xl font-bold text-white tracking-tight">Sky-trip Admin</h1>
    </div>

    <nav className="flex-1 space-y-2">
      <a href="#" className="sidebar-link active"><BarChart3 size={20} /> Dashboard</a>
      <a href="#" className="sidebar-link"><Package size={20} /> Packages</a>
      <a href="#" className="sidebar-link"><Calendar size={20} /> Bookings</a>
      <a href="#" className="sidebar-link"><Users size={20} /> Customers</a>
    </nav>

    <div className="pt-6 border-t border-slate-800">
      <a href="#" className="sidebar-link"><Settings size={20} /> Settings</a>
      <a href="#" className="sidebar-link text-red-400 hover:text-red-300 hover:bg-red-400/10">
        <LogOut size={20} /> Logout
      </a>
    </div>
  </aside>
);

const StatsCard = ({ title, value, change, icon: Icon, trend }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="glass-card p-6"
  >
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-primary/10 rounded-lg text-primary">
        <Icon size={24} />
      </div>
      <span className={`text-sm font-medium ${trend === 'up' ? 'text-emerald-400' : 'text-rose-400'} flex items-center gap-1`}>
        {change} <TrendingUp size={14} className={trend === 'up' ? '' : 'rotate-180'} />
      </span>
    </div>
    <h3 className="text-slate-400 text-sm mb-1">{title}</h3>
    <p className="text-2xl font-bold text-white">{value}</p>
  </motion.div>
);

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 bg-slate-950 p-4 md:p-8 overflow-x-hidden">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white">Overview</h2>
            <p className="text-slate-400 text-sm">Welcome back, Admin!</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <button className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-white relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full border-2 border-slate-900"></span>
            </button>
            <button className="md:hidden p-2 text-slate-400" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu size={24} />
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard title="Total Revenue" value="₹12,45,000" change="+12.5%" icon={BarChart3} trend="up" />
          <StatsCard title="Active Bookings" value="142" change="+18.2%" icon={Calendar} trend="up" />
          <StatsCard title="Total Packages" value="24" change="0%" icon={Package} trend="up" />
          <StatsCard title="New Customers" value="89" change="+5.4%" icon={Users} trend="up" />
        </div>

        {/* Recent Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 glass-card overflow-hidden">
            <div className="p-6 border-b border-slate-800 flex justify-between items-center">
              <h3 className="font-bold text-white">Recent Packages</h3>
              <button className="text-primary text-sm font-semibold flex items-center gap-1 hover:underline">
                View All <ChevronRight size={16} />
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-slate-900/50 text-slate-400 text-xs uppercase tracking-wider">
                    <th className="px-6 py-4 font-semibold">Package Name</th>
                    <th className="px-6 py-4 font-semibold">Location</th>
                    <th className="px-6 py-4 font-semibold">Price</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {[
                    { name: 'Kashmir Luxury Retreat', loc: 'Kashmir', price: '₹45,000', status: 'Active' },
                    { name: 'Himachal Adventure', loc: 'Manali', price: '₹32,000', status: 'Active' },
                    { name: 'Ladakh Bike Expedition', loc: 'Leh', price: '₹55,000', status: 'Draft' },
                    { name: 'Char Dham Yatra', loc: 'Uttarakhand', price: '₹65,000', status: 'Active' },
                  ].map((item, i) => (
                    <tr key={i} className="hover:bg-slate-900/30 transition-colors">
                      <td className="px-6 py-4 font-medium text-white">{item.name}</td>
                      <td className="px-6 py-4 text-slate-400">{item.loc}</td>
                      <td className="px-6 py-4 text-white">{item.price}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${item.status === 'Active' ? 'bg-emerald-400/10 text-emerald-400' : 'bg-amber-400/10 text-amber-400'}`}>
                          {item.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="font-bold text-white mb-6">Quick Actions</h3>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-3 rounded-lg transition-all shadow-lg shadow-primary/20">
                <Plus size={20} /> Create New Package
              </button>
              <button className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold py-3 rounded-lg transition-all border border-slate-800">
                Generate Monthly Report
              </button>
            </div>
            
            <div className="mt-8 p-4 bg-primary/5 rounded-xl border border-primary/10">
              <h4 className="text-primary text-sm font-semibold mb-2">Pro Tip</h4>
              <p className="text-slate-400 text-xs leading-relaxed">
                Update seasonal packages early to attract more summer bookings. Current trend shows 25% increase in Himachal interest.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
