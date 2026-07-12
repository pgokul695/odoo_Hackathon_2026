'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAssetStore } from '@/components/store/AssetStore';
import { PageHeader } from '@/components/ui/PageHeader';
import { AssetStatusBadge } from '@/components/ui/AssetStatusBadge';
import { 
  ArrowLeft, 
  Tag, 
  Building, 
  User, 
  ShieldAlert, 
  Wrench
} from 'lucide-react';
export default function AssetDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { assets, getAssetCategory, getAssetDepartment, getAssetEmployee } = useAssetStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'allocation' | 'maintenance'>('overview');
  
  const assetId = params.id as string;
  const asset = assets.find((a) => a.id === assetId);

  if (!asset) {
    return (
      <div className="text-center py-16">
        <h2 className="text-lg font-bold text-foreground">Asset Token not found</h2>
        <p className="text-xs text-muted-foreground mt-1">The requested asset ID {assetId} is not in the system ledger.</p>
        <button 
          onClick={() => router.push('/assets')}
          className="mt-4 px-3.5 py-1.5 bg-primary text-primary-foreground text-xs font-bold rounded-lg hover:bg-primary/95 transition-all"
        >
          Return to List
        </button>
      </div>
    );
  }

  const category = getAssetCategory(asset);
  const department = getAssetDepartment(asset);
  const employee = getAssetEmployee(asset);

  return (
    <div className="space-y-6">
      {/* Header */}
      <PageHeader 
        title={`${asset.name} (${asset.id})`}
        description={`Manage and track detail coordinates of ${asset.name}.`}
      >
        <button
          onClick={() => router.push('/assets')}
          className="px-3 py-1.5 border border-border hover:bg-muted/40 text-muted-foreground hover:text-foreground text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to list
        </button>
      </PageHeader>

      {/* Grid containing status stats on top */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-xl flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-primary/5 border border-border text-primary">
            <Tag className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest leading-none">Category</p>
            <p className="text-xs font-extrabold text-foreground mt-1 leading-none">{category?.name || 'Unassigned'}</p>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-xl flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-success/5 border border-border text-success">
            <Building className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest leading-none">Department</p>
            <p className="text-xs font-extrabold text-foreground mt-1 leading-none">{department?.name || 'Unassigned'}</p>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-xl flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-secondary/5 border border-border text-secondary">
            <User className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest leading-none">Assigned To</p>
            <p className="text-xs font-extrabold text-foreground mt-1 leading-none">{employee?.name || 'Available Pool'}</p>
          </div>
        </div>

        <div className="glass-panel p-4 rounded-xl flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-warning/5 border border-border text-warning">
            <ShieldAlert className="w-4 h-4" />
          </div>
          <div>
            <p className="text-[9px] text-muted-foreground font-bold uppercase tracking-widest leading-none">Operational Status</p>
            <div className="mt-1 leading-none flex"><AssetStatusBadge status={asset.status} /></div>
          </div>
        </div>
      </div>

      {/* Tabs Layout */}
      <div className="flex border-b border-border/50 gap-2">
        {(['overview', 'allocation', 'maintenance'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-xs font-bold uppercase tracking-widest border-b-2 transition-all ${
              activeTab === tab
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="glass-panel rounded-xl p-5 border border-border/80 min-h-[220px]">
        {activeTab === 'overview' && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider pb-2 border-b border-border/40">Technical Coordinates</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-xs">
              <div className="flex justify-between py-1.5 border-b border-border/30">
                <span className="text-muted-foreground">Asset Token ID</span>
                <span className="font-mono font-bold text-foreground">{asset.id}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border/30">
                <span className="text-muted-foreground">Asset Name</span>
                <span className="font-mono font-bold text-foreground">{asset.name}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border/30">
                <span className="text-muted-foreground">Is Active</span>
                <span className="font-bold text-success">{asset.is_active ? 'Yes' : 'No'}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'allocation' && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider pb-2 border-b border-border/40">Custodian Assignment</h4>
            {employee ? (
              <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-border/50 text-xs">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded bg-primary/10 text-primary flex items-center justify-center font-bold">
                    {employee.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-foreground">{employee.name}</p>
                    <p className="text-[10px] text-muted-foreground">{employee.role} • {employee.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-foreground">Status</p>
                  <p className="text-[10px] text-muted-foreground">Active Allocation</p>
                </div>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground py-4 text-center">This asset is not currently allocated to any staff member. It resides in the Available inventory pool.</p>
            )}
          </div>
        )}

        {activeTab === 'maintenance' && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider pb-2 border-b border-border/40">Maintenance Coordinates</h4>
            {asset.status === 'UNDER_MAINTENANCE' ? (
              <div className="p-3 bg-warning/5 rounded-lg border border-warning/20 text-xs flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-warning animate-ping" />
                    <span className="font-bold text-warning uppercase text-[10px]">Active ticket: In Progress</span>
                  </div>
                  <p className="text-foreground font-medium mt-1">Maintenance ticket is active</p>
                </div>
                <Wrench className="w-5 h-5 text-warning/70" />
              </div>
            ) : (
              <p className="text-xs text-muted-foreground py-4 text-center">No active maintenance work orders for this asset token. System status reports optimal health.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
