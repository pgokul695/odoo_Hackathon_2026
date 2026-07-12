'use client';

import React, { useState } from 'react';
import { useAssetStore } from '@/components/store/AssetStore';
import { PageHeader } from '@/components/ui/PageHeader';
import { 
  FileText, 
  Download, 
  Settings
} from 'lucide-react';

export default function ReportsPage() {
  const { assets, categories, departments, addNotification } = useAssetStore();
  
  const [reportType, setReportType] = useState('Valuation');
  const [dateRange, setDateRange] = useState('90');
  const [deptId, setDeptId] = useState('all');
  const [catId, setCatId] = useState('all');

  const getFilteredAssets = () => {
    return assets.filter(a => {
      const matchDept = deptId === 'all' || a.department_id === deptId;
      const matchCat = catId === 'all' || a.category_id === catId;
      return matchDept && matchCat;
    });
  };

  const filtered = getFilteredAssets();
  const totalValuation = filtered.length * 45000;

  const handleExport = (format: 'PDF' | 'CSV') => {
    addNotification('System', `Report "${reportType} Summary" exported successfully in ${format} format.`);
    alert(`Generating ${format} file... Check your notification stream for the download token!`);
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Reports Hub" 
        description="Aggregate asset parameters and valuations into exportable corporate reports."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        
        {/* Left Panel: Report Config */}
        <div className="glass-panel p-5 rounded-xl border border-border/80 shadow-sm space-y-4">
          <div className="flex items-center gap-1.5 border-b border-border/40 pb-2">
            <Settings className="w-4 h-4 text-primary" />
            <h3 className="text-xs font-bold text-foreground uppercase tracking-widest">Report Builder Options</h3>
          </div>

          <div className="space-y-3.5">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Report Type</label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="block w-full px-3 py-2 bg-card border border-border/80 rounded-lg text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="Valuation">Asset Valuation Summary</option>
                <option value="Allocation">Allocation Rate review</option>
                <option value="Maintenance">Maintenance Frequency logs</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Date Range</label>
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="block w-full px-3 py-2 bg-card border border-border/80 rounded-lg text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="30">Last 30 Days</option>
                <option value="90">Last 90 Days</option>
                <option value="365">This Year</option>
                <option value="all">All Time Ledger</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Target Department</label>
              <select
                value={deptId}
                onChange={(e) => setDeptId(e.target.value)}
                className="block w-full px-3 py-2 bg-card border border-border/80 rounded-lg text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="all">All Departments</option>
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Asset Category</label>
              <select
                value={catId}
                onChange={(e) => setCatId(e.target.value)}
                className="block w-full px-3 py-2 bg-card border border-border/80 rounded-lg text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="all">All Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Right Panel: Live Report Preview */}
        <div className="lg:col-span-2 glass-panel p-5 rounded-xl border border-border/80 shadow-sm min-h-[380px] flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-border/40 pb-2">
              <h3 className="text-xs font-bold text-foreground uppercase tracking-widest">Live Report Preview</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => handleExport('CSV')}
                  className="px-2.5 py-1 border border-border hover:bg-muted/40 text-muted-foreground hover:text-foreground text-[10px] font-bold rounded-lg transition-colors flex items-center gap-1"
                >
                  <Download className="w-3 h-3" />
                  CSV
                </button>
                <button
                  onClick={() => handleExport('PDF')}
                  className="px-2.5 py-1 bg-primary text-primary-foreground text-[10px] font-bold rounded-lg hover:bg-primary/95 transition-colors flex items-center gap-1 shadow-sm"
                >
                  <FileText className="w-3 h-3" />
                  PDF
                </button>
              </div>
            </div>

            {/* Generated Stats Display */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-muted/30 border border-border/50 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Filtered items</span>
                <p className="text-2xl font-black text-foreground">{filtered.length} Assets</p>
              </div>
              <div className="p-4 bg-muted/30 border border-border/50 rounded-xl space-y-1">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Total Value</span>
                <p className="text-2xl font-black text-success">₹{totalValuation.toLocaleString()}</p>
              </div>
            </div>

            {/* Simulated report graphical distribution preview */}
            <div className="space-y-3 pt-2">
              <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1">Category valuation shares</h4>
              <div className="space-y-2">
                {categories.map((c) => {
                  const catAssets = filtered.filter(a => a.category_id === c.id);
                  const catVal = catAssets.length * 45000;
                  const percent = totalValuation > 0 ? (catVal / totalValuation) * 100 : 0;

                  return (
                    <div key={c.id} className="space-y-1 text-xs">
                      <div className="flex justify-between font-medium">
                        <span className="text-foreground">{c.name} ({catAssets.length} units)</span>
                        <span className="text-muted-foreground font-mono">₹{catVal.toLocaleString()} ({Math.round(percent)}%)</span>
                      </div>
                      <div className="w-full h-1.5 bg-muted/40 rounded-full overflow-hidden border border-border/40">
                        <div 
                          className="h-full bg-primary transition-all duration-500" 
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <span className="text-[9px] text-muted-foreground text-center block mt-6">
            Preview is live-synchronized with the browser local storage ledger.
          </span>
        </div>
      </div>
    </div>
  );
}
