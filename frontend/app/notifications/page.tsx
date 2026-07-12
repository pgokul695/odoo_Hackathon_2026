'use client';

import React, { useState } from 'react';
import { useAssetStore } from '@/components/store/AssetStore';
import { PageHeader } from '@/components/ui/PageHeader';
import { 
  Bell, 
  Check, 
  CheckCheck,
  Settings
} from 'lucide-react';

export default function NotificationsPage() {
  const { 
    notifications, 
    markNotificationRead, 
    markAllNotificationsRead 
  } = useAssetStore();

  const [prefEmail, setPrefEmail] = useState(true);
  const [prefMaintenance, setPrefMaintenance] = useState(true);
  const [prefAudits, setPrefAudits] = useState(false);

  const filtered = notifications;

  const unreadCount = filtered.filter(n => !n.is_read).length;

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Notification Center" 
        description="Monitor system actions, alerts, allocations, and verify preference toggles."
      >
        <button
          onClick={markAllNotificationsRead}
          className="px-3 py-1.5 border border-border hover:bg-muted/40 text-muted-foreground hover:text-foreground text-xs font-bold rounded-lg transition-all flex items-center gap-1.5"
        >
          <CheckCheck className="w-4 h-4" />
          Mark All Read
        </button>
      </PageHeader>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Pane: Categories list & preferences */}
        <div className="space-y-6">
          


          {/* Alert Preferences settings */}
          <div className="glass-panel p-4 rounded-xl border border-border/80 shadow-sm space-y-4">
            <div className="flex items-center gap-1 border-b border-border/40 pb-2">
              <Settings className="w-4 h-4 text-primary" />
              <h3 className="text-[10px] font-bold text-foreground uppercase tracking-widest">Alert Preferences</h3>
            </div>

            <div className="space-y-3 text-xs">
              <label className="flex items-center space-x-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={prefEmail}
                  onChange={(e) => setPrefEmail(e.target.checked)}
                  className="rounded border-border text-primary focus:ring-primary w-3.5 h-3.5"
                />
                <span className="font-medium text-foreground">Email digests on asset allocations</span>
              </label>

              <label className="flex items-center space-x-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={prefMaintenance}
                  onChange={(e) => setPrefMaintenance(e.target.checked)}
                  className="rounded border-border text-primary focus:ring-primary w-3.5 h-3.5"
                />
                <span className="font-medium text-foreground">Push notifications on critical repairs</span>
              </label>

              <label className="flex items-center space-x-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={prefAudits}
                  onChange={(e) => setPrefAudits(e.target.checked)}
                  className="rounded border-border text-primary focus:ring-primary w-3.5 h-3.5"
                />
                <span className="font-medium text-foreground">Reminder alerts for monthly QR audits</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Pane: Notifications feed */}
        <div className="lg:col-span-2 glass-panel rounded-xl overflow-hidden border border-border/80 shadow-sm min-h-[360px]">
          <div className="p-4 border-b border-border/55 bg-muted/20 flex items-center justify-between">
            <h3 className="text-xs font-bold text-foreground uppercase tracking-widest flex items-center gap-1">
              <Bell className="w-4 h-4 text-primary" />
              Recent alerts
            </h3>
            <span className="text-[10px] text-muted-foreground font-semibold">{unreadCount} unread entries</span>
          </div>

          <div className="divide-y divide-border/45">
            {filtered.length === 0 ? (
              <p className="p-12 text-center text-muted-foreground text-xs font-medium">No alerts filed in category.</p>
            ) : (
              filtered.map((item) => (
                <div 
                  key={item.id} 
                  className={`p-4 flex items-start justify-between gap-4 transition-colors ${
                    item.is_read ? 'hover:bg-muted/10' : 'bg-primary/5 hover:bg-primary/10'
                  }`}
                >
                  <div className="flex items-start space-x-3.5">
                    {/* Unread status dot */}
                    <div className="pt-1.5">
                      <span className={`block w-2 h-2 rounded-full ${item.is_read ? 'bg-transparent' : 'bg-primary shadow-glow'}`} />
                    </div>
                    <div>
                      <p className={`text-xs leading-normal ${item.is_read ? 'text-muted-foreground' : 'text-foreground font-semibold'}`}>
                        {item.message}
                      </p>
                      <span className="text-[9px] text-muted-foreground font-mono mt-1 block">
                        {new Date(item.created_at).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {!item.is_read && (
                    <button
                      onClick={() => markNotificationRead(item.id)}
                      className="p-1 rounded bg-card hover:bg-muted text-muted-foreground hover:text-primary border border-border/60 transition-colors"
                      title="Mark as read"
                    >
                      <Check className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
