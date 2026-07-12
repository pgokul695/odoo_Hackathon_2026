'use client';

import React, { useState } from 'react';
import { useAssetStore, Audit } from '@/components/store/AssetStore';
import { PageHeader } from '@/components/ui/PageHeader';
import { ScanFrame } from '@/components/ui/ScanFrame';
import { 
  ClipboardCheck, 
  HelpCircle, 
  CheckCircle, 
  XCircle, 
  AlertTriangle 
} from 'lucide-react';

export default function AuditsPage() {
  const { assets, audits, submitAudit } = useAssetStore();
  const [selectedAssetId, setSelectedAssetId] = useState('');
  const [notes, setNotes] = useState('');

  const targetAsset = assets.find((a) => a.id === selectedAssetId);

  const handleAuditSubmit = (status: Audit['status']) => {
    if (!selectedAssetId) return alert('Select an asset to audit.');
    
    submitAudit(selectedAssetId, 'Keerthana Vinod', status, notes);
    
    // Reset form
    setSelectedAssetId('');
    setNotes('');
  };

  const getStatusIcon = (stat: Audit['status']) => {
    switch (stat) {
      case 'Found': return <CheckCircle className="w-4.5 h-4.5 text-success" />;
      case 'Missing': return <XCircle className="w-4.5 h-4.5 text-destructive" />;
      default: return <AlertTriangle className="w-4.5 h-4.5 text-warning" />;
    }
  };

  const getAssetName = (id: string) => assets.find(a => a.id === id)?.name || 'Unknown';

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Asset Audit Desk" 
        description="Verify physical inventory presence by simulating QR barcode scanning."
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
        
        {/* Left Side: Scanning HUD */}
        <div className="glass-panel p-6 rounded-xl border border-border/80 shadow-sm flex flex-col items-center justify-center space-y-4">
          <ScanFrame />

          <div className="space-y-1.5 w-full max-w-[280px]">
            <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1">Simulate scan target</label>
            <select
              value={selectedAssetId}
              onChange={(e) => setSelectedAssetId(e.target.value)}
              className="block w-full px-3 py-2 bg-card border border-border/80 rounded-lg text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="">-- Choose asset in scope --</option>
              {assets.map((a) => (
                <option key={a.id} value={a.id}>{a.name} ({a.id}) - Status: {a.status}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Right Side: Audit Controls Form */}
        <div className="glass-panel p-6 rounded-xl border border-border/80 shadow-sm min-h-[380px] flex flex-col justify-between">
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-foreground uppercase tracking-widest pb-1.5 border-b border-border/40">Audit Findings File</h3>

            {targetAsset ? (
              <div className="space-y-4 animate-fade-in">
                {/* Selected Asset Info */}
                <div className="p-3.5 bg-muted/40 rounded-lg border border-border/60 text-xs space-y-1.5">
                  <div className="flex justify-between font-medium">
                    <span className="text-muted-foreground">Scanned Asset</span>
                    <span className="font-bold text-foreground">{targetAsset.name}</span>
                  </div>
                  <div className="flex justify-between font-mono">
                    <span className="text-muted-foreground">Token ID</span>
                    <span className="font-bold text-primary">{targetAsset.id}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span className="text-muted-foreground">Serial Number</span>
                    <span className="font-bold text-foreground">{targetAsset.serialNumber}</span>
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1">Verification notes</label>
                  <input
                    type="text"
                    placeholder="e.g. Scanned at AI Department desk, pristine condition."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="block w-full px-3 py-2 bg-card/65 border border-border/80 rounded-lg text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center text-muted-foreground text-xs">
                <HelpCircle className="w-8 h-8 text-muted-foreground/50 mb-2" />
                <p>Simulate a barcode QR scan by picking an asset target on the left scope to open audit verification keys.</p>
              </div>
            )}
          </div>

          {/* Large Action Controls */}
          {targetAsset && (
            <div className="grid grid-cols-3 gap-3 border-t border-border/40 pt-4 mt-6">
              <button
                onClick={() => handleAuditSubmit('Missing')}
                className="py-3.5 bg-destructive/15 border border-destructive/25 text-destructive hover:bg-destructive hover:text-destructive-foreground text-xs font-bold rounded-lg uppercase tracking-wider transition-all flex flex-col items-center justify-center gap-1.5 shadow-sm"
              >
                <XCircle className="w-5 h-5" />
                Missing
              </button>
              <button
                onClick={() => handleAuditSubmit('Damaged')}
                className="py-3.5 bg-warning/15 border border-warning/25 text-warning hover:bg-warning hover:text-warning-foreground text-xs font-bold rounded-lg uppercase tracking-wider transition-all flex flex-col items-center justify-center gap-1.5 shadow-sm"
              >
                <AlertTriangle className="w-5 h-5" />
                Damaged
              </button>
              <button
                onClick={() => handleAuditSubmit('Found')}
                className="py-3.5 bg-success/15 border border-success/25 text-success hover:bg-success hover:text-success-foreground text-xs font-bold rounded-lg uppercase tracking-wider transition-all flex flex-col items-center justify-center gap-1.5 shadow-sm"
              >
                <CheckCircle className="w-5 h-5" />
                Verified
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Historical Ledger Audit Trails */}
      <div className="glass-panel rounded-xl overflow-hidden border border-border/80 shadow-sm">
        <div className="p-4 border-b border-border/50 bg-muted/20 flex items-center gap-1.5">
          <ClipboardCheck className="w-4.5 h-4.5 text-primary" />
          <h4 className="text-xs font-bold text-foreground uppercase tracking-widest">Audit Ledger Verification Trails</h4>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border/50 text-muted-foreground uppercase font-bold tracking-widest bg-muted/10">
                <th className="p-4">Asset Scanned</th>
                <th className="p-4">Audited Date</th>
                <th className="p-4">Auditor Name</th>
                <th className="p-4">Findings Outcome</th>
                <th className="p-4">Audit Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {audits.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground">No audit entries verified yet.</td>
                </tr>
              ) : (
                audits.map((item) => (
                  <tr key={item.id} className="hover:bg-muted/15 transition-all">
                    <td className="p-4">
                      <p className="font-bold text-foreground">{getAssetName(item.assetId)}</p>
                      <p className="text-[9px] text-muted-foreground font-mono mt-0.5">{item.assetId}</p>
                    </td>
                    <td className="p-4 font-mono font-medium text-muted-foreground">{item.auditDate}</td>
                    <td className="p-4 text-foreground font-semibold">{item.auditorName}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-1.5">
                        {getStatusIcon(item.status)}
                        <span className="font-bold">{item.status}</span>
                      </div>
                    </td>
                    <td className="p-4 text-muted-foreground font-medium max-w-xs truncate">{item.notes || 'No remarks recorded.'}</td>
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
