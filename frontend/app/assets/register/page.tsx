'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/ui/PageHeader';
import { useAssetStore } from '@/components/store/AssetStore';
import { 
  FileText, 
  UploadCloud, 
  Trash2, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2 
} from 'lucide-react';

export default function RegisterAssetPage() {
  const router = useRouter();
  const { categories, departments, addAsset } = useAssetStore();

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    category_id: 'c-1',
    department_id: 'd-1',
  });

  const [attachments, setAttachments] = useState<{ name: string; size: string; date: string }[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    // Simulate drop files
    const fileList = Array.from(e.dataTransfer.files);
    const newFiles = fileList.map((f) => ({
      name: f.name,
      size: `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
      date: new Date().toISOString().split('T')[0],
    }));

    setAttachments((prev) => [...prev, ...newFiles]);
  };

  const handleRemoveFile = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRegister = () => {
    // Save to global context
    addAsset({
      name: formData.name || 'Generic Device',
      category_id: formData.category_id,
      department_id: formData.department_id,
      status: 'AVAILABLE',
      is_active: true
    });

    router.push('/assets');
  };


  return (
    <div className="space-y-6">
      <PageHeader 
        title="Register Asset" 
        description="Add a new physical or digital equipment token into the enterprise ledger."
      >
        <button
          onClick={() => router.push('/assets')}
          className="px-3.5 py-1.5 border border-border hover:bg-muted/40 text-muted-foreground hover:text-foreground text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Cancel
        </button>
      </PageHeader>

      {/* Progress Stepper */}
      <div className="flex items-center justify-center max-w-xl mx-auto py-2">
        <div className="flex items-center w-full">
          <div className="flex items-center relative">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border ${
              step >= 1 ? 'bg-primary text-primary-foreground border-primary shadow-glow' : 'bg-card border-border text-muted-foreground'
            }`}>
              1
            </div>
            <div className="absolute top-10 -left-4 text-[10px] font-bold text-foreground uppercase tracking-widest whitespace-nowrap">Identity</div>
          </div>
          <div className={`flex-1 h-0.5 mx-2 ${step >= 2 ? 'bg-primary' : 'bg-border/60'}`} />
          
          <div className="flex items-center relative">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border ${
              step >= 2 ? 'bg-primary text-primary-foreground border-primary shadow-glow' : 'bg-card border-border text-muted-foreground'
            }`}>
              2
            </div>
            <div className="absolute top-10 -left-6 text-[10px] font-bold text-foreground uppercase tracking-widest whitespace-nowrap">Financials</div>
          </div>
          <div className={`flex-1 h-0.5 mx-2 ${step >= 3 ? 'bg-primary' : 'bg-border/60'}`} />
          
          <div className="flex items-center relative">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border ${
              step >= 3 ? 'bg-primary text-primary-foreground border-primary shadow-glow' : 'bg-card border-border text-muted-foreground'
            }`}>
              3
            </div>
            <div className="absolute top-10 -left-8 text-[10px] font-bold text-foreground uppercase tracking-widest whitespace-nowrap">Attachments</div>
          </div>
        </div>
      </div>

      {/* Form Content panel */}
      <div className="glass-panel rounded-xl p-6 max-w-2xl mx-auto border border-border/80 shadow-sm mt-10">
        
        {/* Step 1: Asset Identity & Category */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-foreground border-b border-border/40 pb-2">Step 1: Asset Identity</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Asset Name *</label>
                <input
                  required
                  name="name"
                  type="text"
                  placeholder="e.g. MacBook Pro M4"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 bg-card border border-border/80 rounded-lg text-xs text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Category *</label>
                <select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 bg-card border border-border/80 rounded-lg text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Financials & Dept */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-foreground border-b border-border/40 pb-2">Step 2: Financials & Assignment</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Initial Status</label>
                <input
                  disabled
                  value="AVAILABLE"
                  className="block w-full px-3 py-2 bg-card border border-border/80 rounded-lg text-xs text-foreground placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all opacity-50"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Custodian Department *</label>
                <select
                  name="department_id"
                  value={formData.department_id}
                  onChange={handleInputChange}
                  className="block w-full px-3 py-2 bg-card border border-border/80 rounded-lg text-xs text-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                >
                  {departments.map((d) => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Assignment Note</label>
                <p className="text-xs text-muted-foreground">To assign an employee, please use the allocations module after the asset is successfully registered and available.</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Attachments */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-foreground border-b border-border/40 pb-2">Step 3: Upload Invoices & Manuals</h3>

            {/* Drag & Drop Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-xl p-8 text-center flex flex-col items-center justify-center cursor-pointer transition-all ${
                isDragOver
                  ? 'border-primary bg-primary/5'
                  : 'border-border/60 hover:border-primary/50 bg-card/10'
              }`}
            >
              <UploadCloud className="w-10 h-10 text-muted-foreground/75 mb-2" />
              <p className="text-xs font-bold text-foreground mb-1">Drag files here or click to upload</p>
              <p className="text-[10px] text-muted-foreground">PDF, DOCX, PNG up to 10MB (Simulated)</p>
            </div>

            {/* File List cards */}
            {attachments.length > 0 && (
              <div className="space-y-2 mt-4">
                <h4 className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider pl-1">Uploaded attachments</h4>
                {attachments.map((file, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 bg-muted/40 rounded-lg border border-border/60">
                    <div className="flex items-center space-x-2.5">
                      <FileText className="w-4 h-4 text-primary flex-shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-foreground leading-none">{file.name}</p>
                        <p className="text-[9px] text-muted-foreground mt-0.5">{file.size} • Uploaded today</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveFile(i)}
                      className="text-muted-foreground hover:text-destructive p-1 rounded-md hover:bg-muted transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-between border-t border-border/40 pt-4 mt-6">
          <button
            onClick={() => step > 1 ? setStep(step - 1) : router.push('/assets')}
            disabled={step === 1 && false}
            className="px-3.5 py-1.5 border border-border hover:bg-muted/40 text-muted-foreground hover:text-foreground text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            {step === 1 ? 'Discard' : 'Back'}
          </button>
          
          <div className="flex items-center gap-2">
            {step < 3 ? (
              <button
                onClick={() => {
                  // Basic validate for step 1
                  if (step === 1 && !formData.name) return alert('Please enter an asset name');
                  setStep(step + 1);
                }}
                className="px-3.5 py-1.5 bg-primary text-primary-foreground text-xs font-bold rounded-lg hover:bg-primary/95 shadow-sm transition-colors flex items-center gap-1.5"
              >
                Continue
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <>
                <button
                  onClick={handleRegister}
                  className="px-3.5 py-1.5 border border-border hover:bg-muted/45 text-muted-foreground hover:text-foreground text-xs font-bold rounded-lg transition-colors"
                >
                  Save Draft
                </button>
                <button
                  onClick={handleRegister}
                  className="px-3.5 py-1.5 bg-primary text-primary-foreground text-xs font-bold rounded-lg hover:bg-primary/95 shadow-sm transition-colors flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Register Token
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
