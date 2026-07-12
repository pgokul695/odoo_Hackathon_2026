'use client';

import React, { useState } from 'react';
import { useAssetStore } from '@/components/store/AssetStore';
import { PageHeader } from '@/components/ui/PageHeader';
import { SearchBar } from '@/components/ui/SearchBar';
import { Clock, User } from 'lucide-react';

export default function ActivityLogsPage() {
  const { assets } = useAssetStore();
  const [search, setSearch] = useState('');

  // Gather and flatten histories across all assets
  const allLogs = assets.flatMap(asset => 
    asset.history.map(log => ({
      ...log,
      assetId: asset.id,
      assetName: asset.name
    }))
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const filteredLogs = allLogs.filter((log) =>
    log.description.toLowerCase().includes(search.toLowerCase()) ||
    log.type.toLowerCase().includes(search.toLowerCase()) ||
    log.performedBy.toLowerCase().includes(search.toLowerCase()) ||
    log.assetName.toLowerCase().includes(search.toLowerCase()) ||
    log.assetId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Activity logs" 
        description="Dense chronological ledger tracking all asset updates, allocations, and audits."
      />

      {/* Filters */}
      <div className="flex justify-between items-center bg-card/45 backdrop-blur-md p-4 rounded-xl border border-border/80">
        <SearchBar value={search} onChange={setSearch} placeholder="Filter logs by asset, action, or user..." />
      </div>

      {/* Dense Table */}
      <div className="glass-panel rounded-xl overflow-hidden border border-border/80 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border/50 bg-muted/30 text-muted-foreground uppercase font-bold tracking-widest">
                <th className="p-4">Action Date</th>
                <th className="p-4">Asset Details</th>
                <th className="p-4">Event Type</th>
                <th className="p-4">Ledger Entry Description</th>
                <th className="p-4 text-right">Custodian / Operator</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground">
                    No activity entries found in the ledger.
                  </td>
                </tr>
              ) : (
                filteredLogs.map((log, i) => (
                  <tr key={log.id || i} className="hover:bg-muted/15 transition-all">
                    <td className="p-4 font-mono font-bold text-muted-foreground flex items-center gap-1.5 pt-4">
                      <Clock className="w-3.5 h-3.5 text-muted-foreground/60" />
                      {log.date}
                    </td>
                    <td className="p-4">
                      <p className="font-bold text-foreground">{log.assetName}</p>
                      <p className="text-[10px] text-muted-foreground font-mono mt-0.5">{log.assetId}</p>
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-0.5 rounded border border-border text-[9px] font-bold uppercase tracking-widest bg-muted/30">
                        {log.type}
                      </span>
                    </td>
                    <td className="p-4 text-foreground font-medium max-w-sm truncate">{log.description}</td>
                    <td className="p-4 text-right text-foreground font-semibold flex items-center justify-end gap-1 pt-4">
                      <User className="w-3.5 h-3.5 text-muted-foreground/60" />
                      {log.performedBy}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
