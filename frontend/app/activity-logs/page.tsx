'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { SearchBar } from '@/components/ui/SearchBar';


export default function ActivityLogsPage() {
  const [search, setSearch] = useState('');

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
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground">
                    No activity entries found in the ledger.
                  </td>
                </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
