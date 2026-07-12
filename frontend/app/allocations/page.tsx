'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAssetStore } from '@/components/store/AssetStore';
import { PageHeader } from '@/components/ui/PageHeader';

import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Laptop, 
  User, 
  Link2,
  Search,
  CheckCircle2
} from 'lucide-react';

export default function AllocationsPage() {
  const router = useRouter();
  const { assets, employees, allocateAsset } = useAssetStore();

  const [step, setStep] = useState(1);
  const [selectedAssetId, setSelectedAssetId] = useState<string | null>(null);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  
  const [assetSearch, setAssetSearch] = useState('');
  const [employeeSearch, setEmployeeSearch] = useState('');

  // Available assets
  const availableAssets = assets.filter(
    (a) => a.status === 'AVAILABLE' && 
    (a.name.toLowerCase().includes(assetSearch.toLowerCase()) || a.id.toLowerCase().includes(assetSearch.toLowerCase()))
  );

  // Employees
  const filteredEmployees = employees.filter(
    (e) => e.name.toLowerCase().includes(employeeSearch.toLowerCase()) || e.role.toLowerCase().includes(employeeSearch.toLowerCase())
  );

  const selectedAsset = assets.find((a) => a.id === selectedAssetId);
  const selectedEmployee = employees.find((e) => e.id === selectedEmployeeId);

  const handleConfirmAllocation = () => {
    if (selectedAssetId && selectedEmployeeId) {
      allocateAsset(selectedAssetId, selectedEmployeeId, notes);
      router.push('/assets');
    }
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Asset Allocation" 
        description="Bind available inventory resources with custodian employees."
      />

      {/* Allocation Progress Stepper */}
      <div className="flex justify-between items-center max-w-xl mx-auto py-2">
        {[
          { num: 1, label: 'Select Asset' },
          { num: 2, label: 'Select Employee' },
          { num: 3, label: 'Review Details' },
          { num: 4, label: 'Confirm Bind' }
        ].map((item, idx) => (
          <React.Fragment key={item.num}>
            <div className="flex flex-col items-center relative">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border transition-all ${
                step >= item.num 
                  ? 'bg-primary text-primary-foreground border-primary shadow-glow' 
                  : 'bg-card border-border text-muted-foreground'
              }`}>
                {step > item.num ? <Check className="w-4.5 h-4.5" /> : item.num}
              </div>
              <span className={`absolute top-10 text-[9px] font-bold uppercase tracking-widest whitespace-nowrap hidden sm:block ${
                step >= item.num ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {item.label}
              </span>
            </div>
            {idx < 3 && (
              <div className={`flex-1 h-0.5 mx-2 ${step > item.num ? 'bg-primary' : 'bg-border/60'}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Wizard Form Panel */}
      <div className="glass-panel rounded-xl p-6 max-w-2xl mx-auto border border-border/80 shadow-sm mt-10 min-h-[360px] flex flex-col justify-between">
        
        {/* Step 1: Select Asset */}
        {step === 1 && (
          <div className="space-y-4 flex-1">
            <div className="flex justify-between items-center border-b border-border/40 pb-2">
              <h3 className="text-sm font-bold text-foreground">Step 1: Select Available Asset</h3>
              <div className="relative w-48">
                <Search className="absolute left-2 top-2 h-3.5 w-3.5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Filter available..."
                  value={assetSearch}
                  onChange={(e) => setAssetSearch(e.target.value)}
                  className="block w-full pl-7 pr-3 py-1 bg-card border border-border/80 rounded-lg text-[10px] text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>

            {availableAssets.length === 0 ? (
              <p className="text-xs text-muted-foreground py-8 text-center">No available assets currently in reserve pool.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[220px] overflow-y-auto pr-1">
                {availableAssets.map((asset) => (
                  <div
                    key={asset.id}
                    onClick={() => setSelectedAssetId(asset.id)}
                    className={`p-3 rounded-lg border text-xs cursor-pointer transition-all ${
                      selectedAssetId === asset.id
                        ? 'border-primary bg-primary/10 shadow-glow'
                        : 'border-border/65 hover:border-primary/45 bg-card/40'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <Laptop className="w-4 h-4 text-primary" />
                      <div>
                        <p className="font-bold text-foreground">{asset.name}</p>
                        <p className="font-mono text-[9px] text-muted-foreground mt-0.5">{asset.id}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Step 2: Select Employee */}
        {step === 2 && (
          <div className="space-y-4 flex-1">
            <div className="flex justify-between items-center border-b border-border/40 pb-2">
              <h3 className="text-sm font-bold text-foreground">Step 2: Assignee Employee Target</h3>
              <div className="relative w-48">
                <Search className="absolute left-2 top-2 h-3.5 w-3.5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Filter employees..."
                  value={employeeSearch}
                  onChange={(e) => setEmployeeSearch(e.target.value)}
                  className="block w-full pl-7 pr-3 py-1 bg-card border border-border/80 rounded-lg text-[10px] text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[220px] overflow-y-auto pr-1">
              {filteredEmployees.map((emp) => (
                <div
                  key={emp.id}
                  onClick={() => setSelectedEmployeeId(emp.id)}
                  className={`p-3 rounded-lg border text-xs cursor-pointer transition-all ${
                    selectedEmployeeId === emp.id
                      ? 'border-primary bg-primary/10 shadow-glow'
                      : 'border-border/65 hover:border-primary/45 bg-card/40'
                  }`}
                >
                  <div className="flex items-center space-x-2">
                    <User className="w-4 h-4 text-primary" />
                    <div>
                      <p className="font-bold text-foreground">{emp.name}</p>
                      <p className="text-[9px] text-muted-foreground mt-0.5">{emp.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Review Details */}
        {step === 3 && (
          <div className="space-y-4 flex-1">
            <h3 className="text-sm font-bold text-foreground border-b border-border/40 pb-2">Step 3: Review Bind details</h3>
            
            {selectedAsset && selectedEmployee ? (
              <div className="space-y-4">
                <div className="flex items-center justify-around gap-4 p-4 bg-muted/30 rounded-xl border border-border/50">
                  <div className="text-center space-y-1">
                    <div className="mx-auto w-9 h-9 rounded bg-primary/10 flex items-center justify-center text-primary border border-primary/20"><Laptop className="w-4 h-4" /></div>
                    <p className="text-[10px] font-bold uppercase text-muted-foreground mt-1">Asset</p>
                    <p className="text-xs font-bold text-foreground">{selectedAsset.name}</p>
                  </div>
                  <Link2 className="w-6 h-6 text-muted-foreground/60 animate-pulse" />
                  <div className="text-center space-y-1">
                    <div className="mx-auto w-9 h-9 rounded bg-primary/10 flex items-center justify-center text-primary border border-primary/20"><User className="w-4 h-4" /></div>
                    <p className="text-[10px] font-bold uppercase text-muted-foreground mt-1">Assignee</p>
                    <p className="text-xs font-bold text-foreground">{selectedEmployee.name}</p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1">Allocation Notes (Optional)</label>
                  <textarea
                    rows={2}
                    placeholder="Describe purpose of assignment or physical receipt verification..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="block w-full px-3 py-2 bg-card border border-border/80 rounded-lg text-xs text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary resize-none"
                  />
                </div>
              </div>
            ) : (
              <p className="text-xs text-muted-foreground text-center py-4">Incomplete selection parameters. Please go back.</p>
            )}
          </div>
        )}

        {/* Step 4: Confirm Bind */}
        {step === 4 && (
          <div className="space-y-6 flex-1 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 rounded-full bg-success/10 border border-success/20 flex items-center justify-center text-success shadow-glow animate-bounce">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div className="space-y-1 max-w-sm">
              <h3 className="text-sm font-bold text-foreground">Confirm Inventory Bind</h3>
              <p className="text-xs text-muted-foreground">This will record the allocation in the system ledger. The asset status will change to Allocated.</p>
            </div>
            {selectedAsset && selectedEmployee && (
              <div className="text-xs p-3 bg-muted/40 rounded-lg border border-border/60 font-medium">
                Asset: <span className="font-bold text-foreground">{selectedAsset.name} ({selectedAsset.id})</span> → Assignee: <span className="font-bold text-foreground">{selectedEmployee.name}</span>
              </div>
            )}
          </div>
        )}

        {/* Stepper Navigation controls */}
        <div className="flex items-center justify-between border-t border-border/40 pt-4 mt-6">
          <button
            onClick={() => step > 1 ? setStep(step - 1) : router.push('/dashboard')}
            className="px-3.5 py-1.5 border border-border hover:bg-muted/45 text-muted-foreground hover:text-foreground text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back
          </button>

          {step < 4 ? (
            <button
              onClick={() => {
                if (step === 1 && !selectedAssetId) return alert('Select an asset to proceed.');
                if (step === 2 && !selectedEmployeeId) return alert('Select an employee assignee.');
                setStep(step + 1);
              }}
              className="px-3.5 py-1.5 bg-primary text-primary-foreground text-xs font-bold rounded-lg hover:bg-primary/95 shadow-sm transition-colors flex items-center gap-1.5"
            >
              Continue
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={handleConfirmAllocation}
              className="px-3.5 py-1.5 bg-primary text-primary-foreground text-xs font-bold rounded-lg hover:bg-primary/95 shadow-sm transition-colors flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              Confirm Bind
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
