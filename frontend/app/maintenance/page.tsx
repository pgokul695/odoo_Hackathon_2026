'use client';

import React, { useState } from 'react';
import { useAssetStore } from '@/components/store/AssetStore';
import { PageHeader } from '@/components/ui/PageHeader';
import { 
  User, 
  Check, 
  ArrowRight,
  Plus,
  X,
  PlusCircle
} from 'lucide-react';
import { MaintenanceStatus } from '@/types/api';

export default function MaintenancePage() {
  const { maintenance, assets, createMaintenance, updateMaintenanceStatus } = useAssetStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedAssetId, setSelectedAssetId] = useState('');

  const getAssetName = (id: string) => assets.find(a => a.id === id)?.name || 'Unknown';

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedAssetId) return alert('Select asset to raise maintenance ticket.');
    
    createMaintenance({
      asset_id: selectedAssetId,
    });
    
    setShowAddForm(false);
  };

  const getNextStatus = (curr: MaintenanceStatus): MaintenanceStatus | null => {
    if (curr === 'REQUESTED') return 'APPROVED';
    if (curr === 'APPROVED') return 'COMPLETED';
    return null;
  };

  // Status Stepper component inside list item
  const StatusStepper = ({ status }: { status: MaintenanceStatus }) => {
    const steps: MaintenanceStatus[] = ['REQUESTED', 'APPROVED', 'COMPLETED'];
    const activeIndex = steps.indexOf(status);

    return (
      <div className="flex items-center w-full max-w-sm mt-3 pt-2">
        {steps.map((stepName, index) => {
          const isActive = index <= activeIndex;
          const isCurrent = index === activeIndex;

          return (
            <React.Fragment key={stepName}>
              <div className="flex flex-col items-center relative">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center border text-[8px] font-bold transition-all ${
                  isCurrent 
                    ? 'bg-warning border-warning text-warning-foreground shadow-glow animate-pulse'
                    : isActive 
                    ? 'bg-primary border-primary text-primary-foreground' 
                    : 'bg-card border-border text-muted-foreground'
                }`}>
                  {isActive && !isCurrent ? '✓' : index + 1}
                </div>
                <span className={`absolute top-6 text-[8px] font-bold uppercase tracking-widest whitespace-nowrap ${
                  isCurrent ? 'text-warning' : isActive ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {stepName}
                </span>
              </div>
              {index < 2 && (
                <div className={`flex-1 h-0.5 mx-1.5 ${index < activeIndex ? 'bg-primary' : 'bg-border/60'}`} />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Maintenance Center" 
        description="Raise tickets and track operational progress updates of hardware repairs."
      >
        <button
          onClick={() => {
            if (assets.length > 0) setSelectedAssetId(assets[0].id);
            setShowAddForm(!showAddForm);
          }}
          className="px-3.5 py-1.5 bg-primary text-primary-foreground text-xs font-bold rounded-lg hover:bg-primary/95 shadow-sm transition-colors flex items-center gap-1"
        >
          {showAddForm ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {showAddForm ? 'Cancel Ticket' : 'Raise Ticket'}
        </button>
      </PageHeader>

      {/* Raise Ticket Form */}
      {showAddForm && (
        <form 
          onSubmit={handleCreateSubmit}
          className="glass-panel p-5 rounded-xl border border-border/80 shadow-sm max-w-xl mx-auto space-y-4 animate-fade-in"
        >
          <h3 className="text-xs font-bold text-foreground uppercase tracking-widest pb-1.5 border-b border-border/40">File Maintenance Work Order</h3>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Select Asset</label>
              <select
                value={selectedAssetId}
                onChange={(e) => setSelectedAssetId(e.target.value)}
                className="block w-full px-3 py-2 bg-card border border-border/80 rounded-lg text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                {assets.map((a) => (
                  <option key={a.id} value={a.id}>{a.name} ({a.id}) - Status: {a.status}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="px-4 py-2 bg-primary text-primary-foreground text-xs font-bold rounded-lg hover:bg-primary/95 transition-all shadow-sm flex items-center gap-1.5"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            File Ticket
          </button>
        </form>
      )}

      {/* Maintenance Logs List */}
      <div className="space-y-4">
        {maintenance.length === 0 ? (
          <div className="glass-panel text-center py-12 border rounded-xl">
            <p className="text-xs text-muted-foreground font-medium">No active maintenance work orders scheduled.</p>
          </div>
        ) : (
          maintenance.map((ticket) => {
            const next = getNextStatus(ticket.status);

            return (
              <div 
                key={ticket.id} 
                className="glass-panel p-5 rounded-xl border border-border/80 hover:border-border transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-6 shadow-sm"
              >
                {/* Details */}
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-xs font-bold text-primary">{ticket.id}</span>
                    <span className="text-[10px] text-muted-foreground font-mono">• Filed: {new Date(ticket.created_at).toLocaleDateString()}</span>
                  </div>
                  
                  <h4 className="text-xs font-bold text-foreground">{getAssetName(ticket.asset_id)} ({ticket.asset_id})</h4>
                  {ticket.resolution_notes && (
                    <p className="text-xs text-muted-foreground font-medium leading-relaxed max-w-lg">{ticket.resolution_notes}</p>
                  )}
                  
                  {/* Status Timeline */}
                  <StatusStepper status={ticket.status} />
                </div>

                {/* Actions Panel */}
                <div className="flex flex-col items-end gap-3 flex-shrink-0 pt-4 md:pt-0">
                  <div className="flex items-center space-x-1.5 text-xs text-muted-foreground font-semibold">
                    <User className="w-4 h-4 text-muted-foreground/60" />
                    <span>Requester ID: {ticket.employee_id}</span>
                  </div>

                  {next && (
                    <button
                      onClick={() => updateMaintenanceStatus(ticket.id, next)}
                      className="px-3.5 py-1.5 bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-primary-foreground text-[10px] font-extrabold rounded-lg uppercase tracking-wider transition-all flex items-center gap-1 shadow-sm"
                    >
                      Advance to {next}
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                  {ticket.status === 'COMPLETED' && (
                    <div className="flex items-center space-x-1 text-success text-[10px] font-bold uppercase tracking-widest leading-none">
                      <Check className="w-4.5 h-4.5" />
                      <span>Ledger Complete</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
