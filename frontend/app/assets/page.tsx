'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/ui/PageHeader';
import { SearchBar } from '@/components/ui/SearchBar';
import { AssetStatusBadge } from '@/components/ui/AssetStatusBadge';
import { useAssetStore } from '@/components/store/AssetStore';
import { 
  Plus, 
  LayoutGrid, 
  List, 
  ExternalLink,
  Laptop
} from 'lucide-react';
import { AssetStatus, Asset } from '@/types/api';

export default function AssetsPage() {
  const router = useRouter();
  const { assets, categories, departments, getAssetEmployee } = useAssetStore();
  
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | AssetStatus>('ALL');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const getCategoryName = (catId: string | null) => {
    if (!catId) return 'Unknown';
    return categories.find(c => c.id === catId)?.name || 'Unknown';
  };
  const getDeptName = (deptId: string | null) => {
    if (!deptId) return 'Unknown';
    return departments.find(d => d.id === deptId)?.name || 'Unknown';
  };
  const getEmployeeName = (asset: Asset) => {
    const emp = getAssetEmployee(asset);
    return emp ? emp.name : 'Available Pool';
  };

  // Filter logic
  const filteredAssets = assets.filter((asset) => {
    const matchesSearch = 
      asset.name.toLowerCase().includes(search.toLowerCase()) ||
      asset.id.toLowerCase().includes(search.toLowerCase());
    
    const matchesStatus = statusFilter === 'ALL' || asset.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader 
        title="Assets" 
        description="Manage and monitor your organization's physical and digital asset ecosystem."
      >
        <button 
          onClick={() => router.push('/assets/register')}
          className="px-3.5 py-1.5 bg-primary text-primary-foreground text-xs font-bold rounded-lg hover:bg-primary/95 shadow-sm transition-colors flex items-center gap-1"
        >
          <Plus className="w-4 h-4" />
          Register Asset
        </button>
      </PageHeader>

      {/* Filter panel */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-card/45 backdrop-blur-md p-4 rounded-xl border border-border/80">
        
        {/* Search */}
        <SearchBar value={search} onChange={setSearch} placeholder="Search assets, IDs..." />

        {/* Status filters */}
        <div className="flex flex-wrap items-center gap-1">
          {(['ALL', 'AVAILABLE', 'ALLOCATED', 'UNDER_MAINTENANCE', 'RETIRED'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              className={`px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-lg border transition-all ${
                statusFilter === filter
                  ? 'bg-primary/10 border-primary text-primary shadow-glow'
                  : 'bg-card border-border/70 hover:border-border text-muted-foreground hover:text-foreground'
              }`}
            >
              {filter.replace('_', ' ')}
            </button>
          ))}
        </div>

        {/* List/Grid switcher */}
        <div className="hidden sm:flex items-center bg-muted/30 p-0.5 rounded-lg border border-border/60">
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded-md transition-colors ${viewMode === 'list' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            aria-label="List view"
          >
            <List className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`p-1.5 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            aria-label="Grid view"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Data display panels */}
      {filteredAssets.length === 0 ? (
        <div className="glass-panel text-center py-12 rounded-xl border border-border/80">
          <p className="text-sm text-muted-foreground font-medium">No assets matches the criteria.</p>
        </div>
      ) : viewMode === 'list' ? (
        /* SpotlightTable List view */
        <div className="glass-panel rounded-xl overflow-hidden border border-border/80 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-border/50 bg-muted/30 text-muted-foreground uppercase font-bold tracking-widest">
                  <th className="p-4">Asset Details</th>
                  <th className="p-4">Asset ID</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Department</th>
                  <th className="p-4">Assigned To</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/40">
                {filteredAssets.map((asset) => (
                  <tr 
                    key={asset.id} 
                    onClick={() => router.push(`/assets/${asset.id}`)}
                    className="hover:bg-muted/25 transition-all duration-150 cursor-pointer transform hover:-translate-y-[1px] hover:shadow-sm"
                  >
                    <td className="p-4 font-bold text-foreground flex items-center gap-2">
                      <div className="p-1 rounded bg-primary/5 border border-primary/10 text-primary">
                        <Laptop className="w-3.5 h-3.5" />
                      </div>
                      {asset.name}
                    </td>
                    <td className="p-4 font-mono font-bold text-muted-foreground">{asset.id}</td>
                    <td className="p-4 text-foreground font-medium">{getCategoryName(asset.category_id)}</td>
                    <td className="p-4 text-muted-foreground font-medium">{getDeptName(asset.department_id)}</td>
                    <td className="p-4 text-foreground font-medium">{getEmployeeName(asset)}</td>
                    <td className="p-4"><AssetStatusBadge status={asset.status} /></td>
                    <td className="p-4 text-right" onClick={(e) => e.stopPropagation()}>
                      <button 
                        onClick={() => router.push(`/assets/${asset.id}`)}
                        className="p-1.5 border border-border rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-all"
                        title="Open asset file"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Grid card presentation */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAssets.map((asset) => (
            <div 
              key={asset.id}
              onClick={() => router.push(`/assets/${asset.id}`)}
              className="glass-panel p-5 rounded-xl border border-border/80 hover:border-primary/40 hover:-translate-y-1 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start">
                  <span className="font-mono text-[10px] font-bold text-muted-foreground">{asset.id}</span>
                  <AssetStatusBadge status={asset.status} />
                </div>
                <h4 className="font-extrabold text-foreground mt-2 text-sm leading-snug">{asset.name}</h4>
                <p className="text-[10px] text-muted-foreground font-medium mt-1 uppercase tracking-wider">{getCategoryName(asset.category_id)}</p>
              </div>

              <div className="border-t border-border/40 mt-4 pt-3 space-y-1.5 text-[11px]">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Department</span>
                  <span className="text-foreground font-semibold">{getDeptName(asset.department_id)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Assigned to</span>
                  <span className="text-foreground font-semibold">{getEmployeeName(asset)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
