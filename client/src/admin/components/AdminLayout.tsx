import React from 'react';
import { 
  LayoutDashboard, 
  Package, 
  PlusCircle, 
  LogOut, 
  User,
  Waves,
  CreditCard,
  CalendarDays
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAuth } from '../context/AuthContext';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const links = [
    { name: 'Dashboard',         icon: LayoutDashboard, path: '/admin' },
    { name: 'Packages',          icon: Package,         path: '/admin/packages' },
    { name: 'Add Package',       icon: PlusCircle,      path: '/admin/add-package' },
    { name: 'Water Activities',  icon: Waves,           path: '/admin/activities' },
    { name: 'All Orders',        icon: CreditCard,      path: '/admin/orders' },
    { name: 'Bookings by Date',  icon: CalendarDays,    path: '/admin/bookings-by-date' },
  ];

  return (
    <aside className="w-64 bg-surface border-r border-border h-screen sticky top-0 flex flex-col p-6">
      <div className="flex flex-col gap-1 mb-10">
        <h1 className="text-xl font-bold text-primary tracking-tight">TravelAdmin</h1>
        <p className="text-[10px] uppercase font-bold text-text-secondary tracking-widest">Premium Management</p>
      </div>

      <nav className="flex-1 space-y-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === '/admin'}
            className={({ isActive }) => 
              cn("sidebar-link", isActive && "active")
            }
          >
            <link.icon size={20} />
            {link.name}
          </NavLink>
        ))}
      </nav>

      <div className="pt-6 border-t border-border space-y-2">
        <button 
          onClick={handleLogout}
          className="sidebar-link w-full text-rose-500 hover:text-rose-600 hover:bg-rose-50 border-none bg-transparent cursor-pointer"
        >
          <LogOut size={20} /> Logout
        </button>
      </div>
    </aside>
  );
};

const Header = ({ title }: { title: string }) => {
  const { user } = useAuth();

  return (
    <header className="flex justify-between items-center mb-8">
      <div>
        <h2 className="text-2xl font-bold text-text-primary">{title}</h2>
        <p className="text-text-secondary text-sm">Manage your premium travel experiences.</p>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-text-primary">{user?.name || 'Admin User'}</p>
            <p className="text-[10px] text-text-secondary capitalize">{user?.role || 'Super Admin'}</p>
          </div>
          <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-text-secondary border border-border overflow-hidden">
            <User size={24} />
          </div>
        </div>
      </div>
    </header>
  );
};


export const AdminLayout = ({ children, title }: { children: React.ReactNode, title: string }) => {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 px-8 py-10 lg:px-14 lg:py-12 overflow-x-hidden">
        <Header title={title} />
        {children}
      </main>
    </div>
  );
};
