'use client';

import React, { useState, useEffect } from 'react';
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
  FileText,
  Wrench
} from 'lucide-react';

export default function AssetDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { assets, getAssetCategory, getAssetDepartment, getAssetEmployee } = useAssetStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'allocation' | 'maintenance' | 'attachments' | 'logs'>('overview');
  
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

  // Asset Journey States
  const journeyStates = [
    { label: 'REGISTERED', key: 'Registration', date: asset.history.find(h => h.type === 'Registration')?.date || asset.purchaseDate },
    { label: 'ALLOCATED', key: 'Allocation', date: asset.history.find(h => h.type === 'Allocation')?.date },
    { label: 'TRANSFERRED', key: 'Transfer Approval', date: asset.history.find(h => h.type === 'Transfer Approval')?.date },
    { label: 'MAINTENANCE', key: 'Maintenance Request', date: asset.history.find(h => h.type === 'Maintenance Request')?.date },
  ];

  // Determine active steps
  const hasHistoryType = (type: string) => asset.history.some(h => h.type === type);
  const getStepActiveStatus = (index: number) => {
    if (index === 0) return true; // Registered always active
    if (index === 1) return hasHistoryType('Allocation') || asset.status === 'Allocated';
    if (index === 2) return hasHistoryType('Transfer Approval');
    if (index === 3) return hasHistoryType('Maintenance Request') || asset.status === 'Under Maintenance';
    return false;
  };

  const AssetJourney = () => {
    const [animateLine, setAnimateLine] = useState(false);
    
    useEffect(() => {
      // Trigger slide in animation for progress
      const t = setTimeout(() => setAnimateLine(true), 200);
      return () => clearTimeout(t);
    }, []);

    return (
      <div className="glass-panel rounded-xl p-5 border border-border/80 relative overflow-hidden">
        <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-6">Asset Token Lifecycle Journey</h4>
        
        <div className="relative flex flex-col md:flex-row justify-between items-center md:items-start w-full gap-8 md:gap-4 px-4 py-2">
          {/* Connecting line */}
          <div className="absolute top-4 left-10 right-10 hidden md:block h-1 bg-border/50 -z-10 rounded-full overflow-hidden">
            <div 
              style={{ width: animateLine ? '100%' : '0%' }}
              className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000 ease-out" 
            />
          </div>

          {journeyStates.map((state, index) => {
            const isActive = getStepActiveStatus(index);
            
            return (
              <div key={state.label} className="flex flex-row md:flex-col items-center gap-3 md:gap-2 text-left md:text-center z-10 w-full md:w-auto">
                {/* Node node circle */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border-2 transition-all duration-300 ${
                  isActive 
                    ? 'bg-primary border-primary text-primary-foreground shadow-glow' 
                    : 'bg-card border-border text-muted-foreground'
                }`}>
                  {isActive ? '✓' : index + 1}
                </div>
                
                {/* Label metadata */}
                <div className="flex flex-col md:items-center">
                  <span className={`text-[10px] font-bold tracking-widest ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                    {state.label}
                  </span>
                  <span className="text-[9px] text-muted-foreground font-mono mt-0.5">
                    {isActive && state.date ? state.date : 'Not reached'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

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

      {/* Asset Journey Stepper */}
      <AssetJourney />

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
        {(['overview', 'allocation', 'maintenance', 'attachments', 'logs'] as const).map((tab) => (
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
                <span className="text-muted-foreground">Serial Number</span>
                <span className="font-mono font-bold text-foreground">{asset.serialNumber}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border/30">
                <span className="text-muted-foreground">Purchase Date</span>
                <span className="font-bold text-foreground">{asset.purchaseDate}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border/30">
                <span className="text-muted-foreground">Valuation (INR)</span>
                <span className="font-bold text-foreground">₹{asset.purchaseValue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border/30">
                <span className="text-muted-foreground">Warranty Scope</span>
                <span className="font-bold text-success">Active (3 Years)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-border/30">
                <span className="text-muted-foreground">Last Ledger Sync</span>
                <span className="font-bold text-foreground">{asset.lastActivity}</span>
              </div>
            </div>
            {asset.notes && (
              <div className="mt-4 p-3 bg-muted/40 rounded-lg border border-border/40 text-xs">
                <p className="font-bold text-muted-foreground mb-1 uppercase text-[9px] tracking-wider">Custodian Notes</p>
                <p className="text-foreground leading-relaxed">{asset.notes}</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'allocation' && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider pb-2 border-b border-border/40">Custodian Assignment History</h4>
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
                  <p className="font-bold text-foreground">Allocated on</p>
                  <p className="text-[10px] text-muted-foreground">{asset.history.find(h => h.type === 'Allocation')?.date || asset.purchaseDate}</p>
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
            {asset.status === 'Under Maintenance' ? (
              <div className="p-3 bg-warning/5 rounded-lg border border-warning/20 text-xs flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-warning animate-ping" />
                    <span className="font-bold text-warning uppercase text-[10px]">Active ticket: In Progress</span>
                  </div>
                  <p className="text-foreground font-medium mt-1">Thermal throttling and CPU fan check</p>
                  <p className="text-[10px] text-muted-foreground">Assigned: Alex Mercer (Technician)</p>
                </div>
                <Wrench className="w-5 h-5 text-warning/70" />
              </div>
            ) : (
              <p className="text-xs text-muted-foreground py-4 text-center">No active maintenance work orders for this asset token. System status reports optimal health.</p>
            )}
          </div>
        )}

        {activeTab === 'attachments' && (
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider pb-2 border-b border-border/40">Asset attachments</h4>
            {asset.attachments && asset.attachments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {asset.attachments.map((file, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 bg-muted/40 rounded-lg border border-border/60 text-xs">
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-primary flex-shrink-0" />
                      <div>
                        <p className="font-bold text-foreground leading-none">{file.name}</p>
                        <p className="text-[9px] text-muted-foreground mt-0.5">{file.size} • {file.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-muted-foreground py-4 text-center">No invoices, documentation, or warranty certificates uploaded for this asset token.</p>
            )}
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-foreground uppercase tracking-wider pb-2 border-b border-border/40">Chronological Event Logs</h4>
            <div className="relative pl-4 space-y-4 border-l border-border/60">
              {asset.history.map((h, i) => (
                <div key={h.id || i} className="relative text-xs">
                  {/* Timeline dot */}
                  <span className="absolute -left-[21px] top-1.5 w-2 h-2 rounded-full bg-primary border border-card" />
                  
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-bold text-foreground uppercase text-[10px] tracking-wider bg-muted px-1.5 py-0.5 rounded mr-2">
                        {h.type}
                      </span>
                      <span className="text-foreground font-medium">{h.description}</span>
                    </div>
                    <span className="text-[10px] text-muted-foreground font-mono">{h.date}</span>
                  </div>
                  <p className="text-[9px] text-muted-foreground mt-0.5">Performed by: {h.performedBy}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
