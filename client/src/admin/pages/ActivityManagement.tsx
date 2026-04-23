import React, { useState, useEffect } from 'react';
import {
  RefreshCw,
  Users,
  Loader2,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Wifi,
  WifiOff,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { useAuth } from '../context/AuthContext';
import { API_BASE_URL } from '../../lib/api';

interface Activity {
  _id: string;
  name: string;
  emoji: string;
  price: number;
  durations: { label: string; price: number }[];
  totalSeats: number;
  bookedSeats: number;
  availableSeats: number;
  isFull: boolean;
  isActive: boolean;
}

const ActivityRow = ({
  activity,
  onReset,
  onToggle,
  onDelete,
  resettingId,
}: {
  activity: Activity;
  onReset: (id: string) => void;
  onToggle: (id: string, current: boolean) => void;
  onDelete: (id: string, name: string) => void;
  resettingId: string | null;
}) => {
  const available = activity.totalSeats - activity.bookedSeats;
  const fillPercent = Math.round((activity.bookedSeats / activity.totalSeats) * 100);
  const isFull = available <= 0;
  const isLow = !isFull && available <= 10;

  const priceDisplay =
    activity.durations && activity.durations.length > 0
      ? activity.durations.map((d) => `${d.label}: ₹${d.price.toLocaleString()}`).join(' / ')
      : `₹${activity.price.toLocaleString()} / person`;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`bg-surface border rounded-2xl p-6 transition-all ${
        !activity.isActive ? 'opacity-50 border-slate-200' : isFull ? 'border-red-200' : 'border-border'
      }`}
    >
      <div className="flex items-start justify-between gap-4 flex-wrap">
        {/* Left: Info */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl shrink-0">
            {activity.emoji}
          </div>
          <div>
            <h3 className="font-bold text-text-primary text-base">{activity.name}</h3>
            <p className="text-text-secondary text-xs mt-0.5">{priceDisplay}</p>
            {/* Status badge */}
            <div className="flex items-center gap-2 mt-2">
              {isFull ? (
                <span className="px-2 py-0.5 bg-red-50 text-red-600 text-[10px] font-bold rounded-full border border-red-100 uppercase tracking-wider">
                  FULL
                </span>
              ) : isLow ? (
                <span className="px-2 py-0.5 bg-amber-50 text-amber-600 text-[10px] font-bold rounded-full border border-amber-100 uppercase tracking-wider">
                  ⚠️ Low Seats
                </span>
              ) : (
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full border border-emerald-100 uppercase tracking-wider">
                  Available
                </span>
              )}
              {!activity.isActive && (
                <span className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-bold rounded-full uppercase tracking-wider">
                  Inactive
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Right: Controls */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Toggle Active */}
          <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
              {activity.isActive ? (
                <Wifi size={13} className="text-emerald-500 inline mr-1" />
              ) : (
                <WifiOff size={13} className="text-slate-400 inline mr-1" />
              )}
              {activity.isActive ? 'Live' : 'Offline'}
            </span>
            <button
              onClick={() => onToggle(activity._id, activity.isActive)}
              className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 cursor-pointer ${
                activity.isActive ? 'bg-emerald-500' : 'bg-slate-300'
              }`}
            >
              <span
                className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform duration-200 ${
                  activity.isActive ? 'translate-x-4' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          {/* Reset Seats */}
          <button
            onClick={() => onReset(activity._id)}
            disabled={resettingId === activity._id || activity.bookedSeats === 0}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activity.bookedSeats === 0
                ? 'bg-slate-50 text-slate-300 cursor-not-allowed'
                : 'bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white border border-blue-100 hover:border-blue-600'
            }`}
          >
            {resettingId === activity._id ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <RotateCcw size={14} />
            )}
            Mark Ride Complete
          </button>

          {/* Delete Activity */}
          <button
            onClick={() => onDelete(activity._id, activity.name)}
            className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-bold bg-red-50 text-red-500 hover:bg-red-500 hover:text-white border border-red-100 hover:border-red-500 transition-all cursor-pointer"
            title="Delete this activity"
          >
            🗑️
          </button>
        </div>
      </div>

      {/* Seat Progress Bar */}
      <div className="mt-5">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-1.5 text-text-secondary">
            <Users size={13} />
            <span className="text-[11px] font-bold uppercase tracking-wider">Seat Occupancy</span>
          </div>
          <span className="text-[11px] font-bold text-text-primary">
            {activity.bookedSeats} / {activity.totalSeats} booked ({fillPercent}%)
          </span>
        </div>
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${fillPercent}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className={`h-full rounded-full ${
              fillPercent >= 100
                ? 'bg-red-500'
                : fillPercent >= 80
                ? 'bg-amber-500'
                : 'bg-emerald-500'
            }`}
          />
        </div>
        <p className="text-[10px] text-text-secondary mt-1.5">
          {available > 0
            ? `${available} seat${available !== 1 ? 's' : ''} remaining`
            : 'No seats available — click "Mark Ride Complete" to reset'}
        </p>
      </div>
    </motion.div>
  );
};

const ActivityManagement = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [resettingId, setResettingId] = useState<string | null>(null);
  const [resettingAll, setResettingAll] = useState(false);
  const [error, setError] = useState('');

  const { token } = useAuth();

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE_URL}/water-activities/admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) setActivities(data.data);
      else throw new Error(data.error || 'Failed to fetch');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  const handleSeed = async () => {
    if (!confirm('This will add the default 8 Tehri Water Adventure activities. Continue?')) return;
    setSeeding(true);
    try {
      const res = await fetch(`${API_BASE_URL}/water-activities/seed`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        fetchActivities();
      } else {
        toast.error(data.error);
      }
    } catch {
      toast.error('Failed to seed activities');
    } finally {
      setSeeding(false);
    }
  };

  const handleReset = async (id: string) => {
    if (!confirm('Mark this ride as complete? This will reset booked seats to 0.')) return;
    setResettingId(id);
    try {
      const res = await fetch(`${API_BASE_URL}/water-activities/${id}/reset`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        setActivities((prev) =>
          prev.map((a) => (a._id === id ? { ...a, bookedSeats: 0 } : a))
        );
      } else {
        toast.error(data.error);
      }
    } catch {
      toast.error('Failed to reset seats');
    } finally {
      setResettingId(null);
    }
  };

  const handleToggle = async (id: string, current: boolean) => {
    try {
      const res = await fetch(`${API_BASE_URL}/water-activities/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isActive: !current }),
      });
      const data = await res.json();
      if (data.success) {
        setActivities((prev) =>
          prev.map((a) => (a._id === id ? { ...a, isActive: !current } : a))
        );
        toast.success(`Activity ${!current ? 'activated' : 'deactivated'}`);
      } else {
        toast.error(data.error);
      }
    } catch {
      toast.error('Failed to update activity');
    }
  };

  const handleResetAll = async () => {
    if (!confirm('Reset ALL activity seats to 0? This will remove all booked seat counts.')) return;
    setResettingAll(true);
    try {
      const res = await fetch(`${API_BASE_URL}/water-activities/reset-all`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        toast.success('✅ All seats reset to 0!');
        setActivities(prev => prev.map(a => ({ ...a, bookedSeats: 0 })));
      } else {
        toast.error(data.error);
      }
    } catch {
      toast.error('Failed to reset all seats');
    } finally {
      setResettingAll(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) return;
    try {
      const res = await fetch(`${API_BASE_URL}/water-activities/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (data.success) {
        toast.success(`Activity "${name}" deleted successfully`);
        setActivities((prev) => prev.filter((a) => a._id !== id));
      } else {
        toast.error(data.error);
      }
    } catch {
      toast.error('Failed to delete activity');
    }
  };

  const totalBooked = activities.reduce((a, act) => a + act.bookedSeats, 0);
  const totalFull = activities.filter((a) => a.bookedSeats >= a.totalSeats).length;

  return (
    <div className="space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-surface p-6 rounded-2xl border border-border shadow-premium">
        <div>
          <h3 className="font-bold text-text-primary text-lg">🌊 Tehri Water Adventure</h3>
          <p className="text-text-secondary text-xs mt-1">
            Manage ride availability and reset seats after each session.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <button onClick={fetchActivities}
            className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-200 text-slate-600 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors cursor-pointer">
            <RefreshCw size={14} /> Refresh
          </button>
          {activities.length > 0 && (
            <button
              onClick={handleResetAll}
              disabled={resettingAll}
              className="flex items-center gap-2 px-5 py-2.5 bg-red-50 text-red-600 border border-red-200 rounded-xl text-xs font-bold hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
            >
              {resettingAll ? <Loader2 size={14} className="animate-spin" /> : <RotateCcw size={14} />}
              Reset All Seats to 0
            </button>
          )}
          {activities.length === 0 && !loading && (
            <button
              onClick={handleSeed}
              disabled={seeding}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-xs font-bold hover:bg-blue-700 transition-colors cursor-pointer shadow-sm"
            >
              {seeding ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle2 size={14} />}
              Seed Default Activities
            </button>
          )}
        </div>
      </div>

      {/* Stats Row */}
      {activities.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'Total Activities', value: activities.length, color: 'blue' },
            { label: 'Total Seats Booked', value: totalBooked, color: 'emerald' },
            { label: 'Rides Full', value: totalFull, color: totalFull > 0 ? 'red' : 'emerald' },
          ].map((stat) => (
            <div key={stat.label} className="bg-surface p-5 rounded-xl border border-border shadow-sm">
              <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-1">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color === 'red' && stat.value > 0 ? 'text-red-500' : 'text-text-primary'}`}>
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <Loader2 className="animate-spin text-primary" size={40} />
          <p className="text-text-secondary text-sm animate-pulse">Loading activities...</p>
        </div>
      )}

      {/* Error */}
      {error && !loading && (
        <div className="bg-rose-50 text-rose-500 p-6 rounded-2xl border border-rose-100 flex items-center gap-3">
          <AlertTriangle size={24} />
          <p className="font-bold">{error}</p>
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && activities.length === 0 && (
        <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
          <p className="text-4xl mb-4">🌊</p>
          <p className="font-bold text-text-primary mb-2">No activities yet</p>
          <p className="text-text-secondary text-sm">Click "Seed Default Activities" to add the 8 Tehri water sports.</p>
        </div>
      )}

      {/* Activity Cards */}
      {!loading && activities.length > 0 && (
        <div className="space-y-4">
          {activities.map((activity) => (
            <ActivityRow
              key={activity._id}
              activity={activity}
              onReset={handleReset}
              onToggle={handleToggle}
              onDelete={handleDelete}
              resettingId={resettingId}
            />
          ))}
        </div>
      )}

      <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
        <p className="text-xs text-blue-600 font-medium">
          💡 <strong>How it works:</strong> When all 50 seats are booked for a ride, it shows as "FULL" on the website.
          After the session is complete, click <strong>"Mark Ride Complete"</strong> to reset seats to 0 so new bookings can come in.
        </p>
      </div>
    </div>
  );
};

export default ActivityManagement;
