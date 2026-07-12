'use client';

import React, { useState } from 'react';
import { PageHeader } from '@/components/ui/PageHeader';
import { SearchBar } from '@/components/ui/SearchBar';
import { useAssetStore } from '@/components/store/AssetStore';
import { Users, Plus, Mail } from 'lucide-react';

export default function EmployeesPage() {
  const { employees, departments } = useAssetStore();
  const [search, setSearch] = useState('');

  const filtered = employees.filter((emp) =>
    emp.name.toLowerCase().includes(search.toLowerCase()) ||
    emp.email.toLowerCase().includes(search.toLowerCase()) ||
    emp.role.toLowerCase().includes(search.toLowerCase())
  );

  const getDeptName = (deptId: string) => {
    return departments.find((d) => d.id === deptId)?.name || 'Unknown';
  };

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Employees" 
        description="View corporate staff directories and equipment ownership tokens."
      >
        <button className="px-3.5 py-1.5 bg-primary text-primary-foreground text-xs font-bold rounded-lg hover:bg-primary/95 shadow-sm transition-colors flex items-center gap-1">
          <Plus className="w-4 h-4" />
          Add Employee
        </button>
      </PageHeader>

      {/* Filters */}
      <div className="flex justify-between items-center bg-card/45 backdrop-blur-md p-4 rounded-xl border border-border/80">
        <SearchBar value={search} onChange={setSearch} placeholder="Search employees..." />
      </div>

      {/* Table */}
      <div className="glass-panel rounded-xl overflow-hidden border border-border/80 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-border/50 bg-muted/30 text-muted-foreground uppercase font-bold tracking-widest">
                <th className="p-4">Staff Member</th>
                <th className="p-4">Role</th>
                <th className="p-4">Department</th>
                <th className="p-4">Primary Contact</th>
                <th className="p-4 text-right">2FA Enabled</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground">
                    No employees found matching your criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((emp) => (
                  <tr key={emp.id} className="hover:bg-muted/20 transition-colors">
                    <td className="p-4 font-bold text-foreground flex items-center gap-2">
                      <Users className="w-4 h-4 text-primary" />
                      {emp.name}
                    </td>
                    <td className="p-4 text-muted-foreground font-medium">{emp.role}</td>
                    <td className="p-4 text-foreground font-medium">{getDeptName(emp.department_id || '')}</td>
                    <td className="p-4 text-muted-foreground font-mono flex items-center gap-1.5 pt-4">
                      <Mail className="w-3.5 h-3.5 text-muted-foreground/60" />
                      {emp.email}
                    </td>
                    <td className="p-4 text-right font-bold text-foreground">
                      <span className={`px-2 py-0.5 rounded-full ${
                        emp.two_factor_enabled ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                      }`}>
                        {emp.two_factor_enabled ? 'Yes' : 'No'}
                      </span>
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
