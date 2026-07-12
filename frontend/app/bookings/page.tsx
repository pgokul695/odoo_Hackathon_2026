'use client';

import React, { useState } from 'react';
import { useAssetStore } from '@/components/store/AssetStore';
import { PageHeader } from '@/components/ui/PageHeader';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  AlertTriangle, 
  Plus, 
  X,
  Laptop
} from 'lucide-react';

export default function BookingsPage() {
  const { bookings, assets, createBooking } = useAssetStore();
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [assetId, setAssetId] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  const [bookingError, setBookingError] = useState<string | null>(null);

  const getAssetName = (id: string) => assets.find(a => a.id === id)?.name || 'Unknown';

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingError(null);

    if (!assetId || !startDate || !endDate) {
      setBookingError('Please enter all selection coordinates.');
      return;
    }

    const startISO = new Date(startDate).toISOString().slice(0, 16);
    const endISO = new Date(endDate).toISOString().slice(0, 16);

    const result = createBooking({
      asset_id: assetId,
      employee_id: 'u-1',
      start_time: startISO,
      end_time: endISO
    });

    if (result.success) {
      setShowAddForm(false);
      setAssetId('');
      setStartDate('');
      setEndDate('');
    } else if (result.error) {
      setBookingError(result.error);
    }
  };

  const formatDateTime = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ' ' + d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Asset Bookings" 
        description="Reserve shared department assets and devices for dedicated schedules."
      >
        <button
          onClick={() => {
            if (assets.length > 0) setAssetId(assets[0].id);
            setBookingError(null);
            setShowAddForm(!showAddForm);
          }}
          className="px-3.5 py-1.5 bg-primary text-primary-foreground text-xs font-bold rounded-lg hover:bg-primary/95 shadow-sm transition-colors flex items-center gap-1"
        >
          {showAddForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showAddForm ? 'Cancel Request' : 'Reserve Asset'}
        </button>
      </PageHeader>

      {/* Booking Form with Conflicts alerts */}
      {showAddForm && (
        <form 
          onSubmit={handleBookingSubmit}
          className="glass-panel p-5 rounded-xl border border-border/80 shadow-sm max-w-xl mx-auto space-y-4 animate-fade-in"
        >
          <h3 className="text-xs font-bold text-foreground uppercase tracking-widest pb-1.5 border-b border-border/40">Request Booking Reservation</h3>

          {/* Conflict Alert Box */}
          {bookingError && (
            <div className="p-3 bg-destructive/10 border border-destructive/20 text-destructive rounded-lg flex items-start space-x-2.5">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <p className="text-[10px] font-bold uppercase tracking-wider">Booking Conflict Detected</p>
                <p className="text-[11px] leading-relaxed">{bookingError}</p>
              </div>
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Select Shared Asset</label>
            <select
              value={assetId}
              onChange={(e) => setAssetId(e.target.value)}
              className="block w-full px-3 py-2 bg-card border border-border/80 rounded-lg text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
            >
              {assets.map((a) => (
                <option key={a.id} value={a.id}>{a.name} ({a.id}) - Status: {a.status}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest font-mono">Start Date & Time</label>
              <input
                type="datetime-local"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="block w-full px-3 py-2 bg-card border border-border/80 rounded-lg text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest font-mono">End Date & Time</label>
              <input
                type="datetime-local"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="block w-full px-3 py-2 bg-card border border-border/80 rounded-lg text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>



          <button
            type="submit"
            className="px-4 py-2 bg-primary text-primary-foreground text-xs font-bold rounded-lg hover:bg-primary/95 transition-all shadow-sm flex items-center gap-1.5"
          >
            <CalendarIcon className="w-3.5 h-3.5" />
            File Reservation
          </button>
        </form>
      )}

      {/* Reservation Block list */}
      <div className="glass-panel rounded-xl overflow-hidden border border-border/80 shadow-sm">
        <div className="p-4 border-b border-border/50 bg-muted/20 flex items-center gap-1.5">
          <CalendarIcon className="w-4 h-4 text-primary" />
          <h4 className="text-xs font-bold text-foreground uppercase tracking-widest">Confirmed reservations timeline</h4>
        </div>

        <div className="divide-y divide-border/45">
          {bookings.length === 0 ? (
            <p className="p-8 text-center text-muted-foreground text-xs">No reservations scheduled in ledger.</p>
          ) : (
            bookings.map((bk) => (
              <div key={bk.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-muted/15 transition-all">
                <div className="flex items-center space-x-3.5">
                  <div className="p-2 rounded bg-primary/10 border border-primary/20 text-primary"><Laptop className="w-4 h-4" /></div>
                  <div>
                    <h5 className="text-xs font-bold text-foreground">{getAssetName(bk.asset_id)}</h5>
                    <p className="text-[10px] text-muted-foreground leading-none mt-1">Requester ID: {bk.employee_id}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs md:text-right">
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <Clock className="w-3.5 h-3.5 text-muted-foreground/60" />
                    <span className="font-medium text-[11px]">{formatDateTime(bk.start_time)} ➔ {formatDateTime(bk.end_time)}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-bold border bg-success/10 border-success/20 text-success uppercase leading-none">
                    {bk.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
