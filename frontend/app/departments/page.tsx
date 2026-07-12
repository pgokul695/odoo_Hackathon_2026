'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { SearchBar } from '@/components/ui/SearchBar';
import { useAssetStore } from '@/components/store/AssetStore';
import { Building2, Plus } from 'lucide-react';

export default function DepartmentsPage() {
  const { departments } = useAssetStore();
  const [search, setSearch] = useState('');

  const filtered = departments.filter((dept) =>
    dept.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Departments" 
        description="Manage organizational groups and asset allocation divisions."
      >
        <button className="px-3.5 py-1.5 bg-primary text-primary-foreground text-xs font-bold rounded-lg hover:bg-primary/95 shadow-sm transition-colors flex items-center gap-1">
          <Plus className="w-4 h-4" />
          Add Department
        </button>
      </PageHeader>

      {/* Filter panel */}
      <div className="flex justify-between items-center bg-card/45 backdrop-blur-md p-4 rounded-xl border border-border/80">
        <SearchBar value={search} onChange={setSearch} placeholder="Search departments..." />
      </div>

      {/* Data Table */}
      <div className="glass-panel rounded-xl overflow-hidden border border-border/80 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border/50 bg-muted/30 text-muted-foreground uppercase font-bold tracking-widest">
                <th className="p-4">Department Name</th>
                <th className="p-4">Active Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={2} className="p-8 text-center text-muted-foreground">
                    No departments found matching your criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((dept) => (
                  <tr key={dept.id} className="hover:bg-muted/20 transition-colors">
                    <td className="p-4 font-bold text-foreground flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-primary" />
                      {dept.name}
                    </td>
                    <td className="p-4 text-muted-foreground font-medium">
                      {dept.is_active ? 'Active' : 'Inactive'}
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
