'use client';

import React, { useState } from 'react';
import { useAssetStore } from '@/components/store/AssetStore';
import { PageHeader } from '@/components/ui/PageHeader';
import { 
  Building2, 
  ArrowRightLeft, 
  Check, 
  X, 
  Plus, 
  PlusCircle
} from 'lucide-react';

export default function TransfersPage() {
  const { 
    transfers, 
    assets, 
    departments, 
    createTransfer, 
    approveTransfer, 
    rejectTransfer 
  } = useAssetStore();

  const [showAddForm, setShowAddForm] = useState(false);
  const [newTransferAssetId, setNewTransferAssetId] = useState('');
  const [newTransferToDeptId, setNewTransferToDeptId] = useState('d-2');

  const getDeptName = (id: string) => departments.find(d => d.id === id)?.name || 'Unknown';
  const getAssetName = (id: string) => assets.find(a => a.id === id)?.name || 'Unknown';

  const handleCreateTransferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTransferAssetId) return alert('Select an asset to transfer.');
    createTransfer(newTransferAssetId, newTransferToDeptId, 'Keerthana Vinod');
    setShowAddForm(false);
    setNewTransferAssetId('');
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Asset Transfers" 
        description="Initiate and review inter-departmental equipment transfer coordinates."
      >
        <button
          onClick={() => {
            // Pick the first asset if none selected
            if (assets.length > 0) setNewTransferAssetId(assets[0].id);
            setShowAddForm(!showAddForm);
          }}
          className="px-3.5 py-1.5 bg-primary text-primary-foreground text-xs font-bold rounded-lg hover:bg-primary/95 shadow-sm transition-colors flex items-center gap-1"
        >
          {showAddForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showAddForm ? 'Cancel Request' : 'New Transfer'}
        </button>
      </PageHeader>

      {/* Transfer Request Drawer Panel */}
      {showAddForm && (
        <form 
          onSubmit={handleCreateTransferSubmit}
          className="glass-panel p-5 rounded-xl border border-border/80 shadow-sm max-w-xl mx-auto space-y-4 animate-fade-in"
        >
          <h3 className="text-xs font-bold text-foreground uppercase tracking-widest pb-1.5 border-b border-border/40">Request Asset Transfer</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Select Asset</label>
              <select
                value={newTransferAssetId}
                onChange={(e) => setNewTransferAssetId(e.target.value)}
                className="block w-full px-3 py-2 bg-card border border-border/80 rounded-lg text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              >
                {assets.map((a) => (
                  <option key={a.id} value={a.id}>{a.name} ({a.id}) - {getDeptName(a.departmentId)}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Target Department</label>
              <select
                value={newTransferToDeptId}
                onChange={(e) => setNewTransferToDeptId(e.target.value)}
                className="block w-full px-3 py-2 bg-card border border-border/80 rounded-lg text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
              >
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-primary text-primary-foreground text-xs font-bold rounded-lg hover:bg-primary/95 transition-all shadow-sm flex items-center gap-1.5"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            File Request
          </button>
        </form>
      )}

      {/* Active Transfer flow spotlight */}
      {transfers.length > 0 && transfers[0].status === 'Pending' && (
        <div className="glass-panel p-5 rounded-xl border border-border/80 shadow-sm max-w-xl mx-auto flex items-center justify-between text-xs">
          <div className="flex flex-col items-center">
            <div className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20"><Building2 className="w-4 h-4" /></div>
            <span className="font-bold text-foreground mt-2">{getDeptName(transfers[0].fromDepartmentId)}</span>
          </div>

          {/* Animated Directional Flow line */}
          <div className="flex-1 px-4 flex flex-col items-center justify-center">
            <span className="text-[9px] font-bold text-primary uppercase tracking-widest mb-1.5 animate-pulse">Ledger Transfer</span>
            <div className="relative w-full h-1 bg-border/60 rounded-full overflow-hidden">
              <div 
                className="absolute top-0 h-full w-12 bg-primary rounded-full" 
                style={{
                  animation: 'grid-move 1.5s linear infinite',
                  backgroundImage: 'linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)'
                }}
              />
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="p-2 rounded-lg bg-secondary/10 text-secondary border border-secondary/20"><Building2 className="w-4 h-4" /></div>
            <span className="font-bold text-foreground mt-2">{getDeptName(transfers[0].toDepartmentId)}</span>
          </div>
        </div>
      )}

      {/* Transfer History lists */}
      <div className="glass-panel rounded-xl overflow-hidden border border-border/80 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border/50 bg-muted/30 text-muted-foreground uppercase font-bold tracking-widest">
                <th className="p-4">Transfer ID</th>
                <th className="p-4">Asset Details</th>
                <th className="p-4">Origin Department</th>
                <th className="p-4 text-center">Flow Direction</th>
                <th className="p-4">Target Department</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {transfers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-muted-foreground">
                    No transfers logged in the ledger system.
                  </td>
                </tr>
              ) : (
                transfers.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/20 transition-colors">
                    <td className="p-4 font-mono font-bold text-primary">{item.id}</td>
                    <td className="p-4">
                      <p className="font-bold text-foreground">{getAssetName(item.assetId)}</p>
                      <p className="text-[10px] text-muted-foreground font-mono mt-0.5">{item.assetId}</p>
                    </td>
                    <td className="p-4 text-muted-foreground font-medium">{getDeptName(item.fromDepartmentId)}</td>
                    <td className="p-4 text-center">
                      <div className="mx-auto w-7 h-7 rounded-full bg-muted/50 border border-border flex items-center justify-center text-muted-foreground">
                        <ArrowRightLeft className="w-3.5 h-3.5" />
                      </div>
                    </td>
                    <td className="p-4 text-foreground font-semibold">{getDeptName(item.toDepartmentId)}</td>
                    <td className="p-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold border ${
                        item.status === 'Approved'
                          ? 'bg-success/10 border-success/20 text-success'
                          : item.status === 'Rejected'
                          ? 'bg-destructive/10 border-destructive/20 text-destructive'
                          : 'bg-warning/10 border-warning/20 text-warning'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      {item.status === 'Pending' ? (
                        <div className="flex justify-end gap-1.5">
                          <button
                            onClick={() => rejectTransfer(item.id)}
                            className="p-1 border border-destructive/20 text-destructive rounded-md hover:bg-destructive/10 transition-colors"
                            title="Reject transfer"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => approveTransfer(item.id)}
                            className="p-1 bg-success text-success-foreground rounded-md hover:bg-success/90 transition-all flex items-center justify-center shadow-sm"
                            title="Approve transfer"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <span className="text-[10px] text-muted-foreground font-mono">Processed</span>
                      )}
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
