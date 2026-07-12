'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '@/lib/api';

export type {
  Department,
  User as Employee,
  Category,
  Asset,
  Allocation,
  Transfer,
  Booking,
  MaintenanceRecord as Maintenance,
  Audit,
  AuditResultType,
  Notification
} from '@/types/api';

import {
  Department,
  User as Employee,
  Category,
  Asset,
  Allocation,
  Transfer,
  Booking,
  MaintenanceRecord as Maintenance,
  Audit,
  AuditResultType,
  Notification
} from '@/types/api';

interface AssetStoreContextType {
  departments: Department[];
  employees: Employee[];
  categories: Category[];
  assets: Asset[];
  allocations: Allocation[];
  transfers: Transfer[];
  bookings: Booking[];
  maintenance: Maintenance[];
  audits: Audit[];
  notifications: Notification[];
  
  // Actions
  addAsset: (asset: Omit<Asset, 'id' | 'history'>) => Asset;
  updateAsset: (id: string, updates: Partial<Asset>) => void;
  allocateAsset: (assetId: string, employeeId: string, notes?: string) => void;
  createTransfer: (assetId: string, toDeptId: string, requestedBy: string) => void;
  approveTransfer: (transferId: string) => void;
  rejectTransfer: (transferId: string) => void;
  createBooking: (booking: Omit<Booking, 'id' | 'status' | 'created_at'>) => { success: boolean; error?: string };
  createMaintenance: (mt: { asset_id: string }) => void;
  updateMaintenanceStatus: (id: string, status: Maintenance['status']) => void;
  submitAudit: (assetId: string, auditor: string, status: AuditResultType, notes?: string) => void;
  addNotification: (category: string, message: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  
  // Helpers
  getAssetCategory: (asset: Asset) => Category | undefined;
  getAssetDepartment: (asset: Asset) => Department | undefined;
  getAssetEmployee: (asset: Asset) => Employee | undefined;
}

const AssetStoreContext = createContext<AssetStoreContextType | undefined>(undefined);

// Initial Data
const initialDepartments: Department[] = [];

const initialEmployees: Employee[] = [];

const initialCategories: Category[] = [];

const initialAssets: Asset[] = [];

const initialAllocations: Allocation[] = [];

const initialTransfers: Transfer[] = [];

const initialBookings: Booking[] = [];

const initialMaintenance: Maintenance[] = [];

const initialAudits: Audit[] = [];

const initialNotifications: Notification[] = [];

export function AssetStoreProvider({ children }: { children: React.ReactNode }) {
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [assets, setAssets] = useState<Asset[]>(initialAssets);
  const [allocations, setAllocations] = useState<Allocation[]>(initialAllocations);
  const [transfers, setTransfers] = useState<Transfer[]>(initialTransfers);
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [maintenance, setMaintenance] = useState<Maintenance[]>(initialMaintenance);
  const [audits, setAudits] = useState<Audit[]>(initialAudits);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  // Load from local storage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const loadData = async () => {
      try {
        const [
          deptRes, empRes, catRes, astRes, 
          allocRes, transRes, bookRes, maintRes, audRes, notifRes
        ] = await Promise.all([
          api.get('/departments/').catch(() => ({ data: [] })),
          api.get('/employees/').catch(() => ({ data: [] })),
          api.get('/categories/').catch(() => ({ data: [] })),
          api.get('/assets/').catch(() => ({ data: [] })),
          api.get('/allocations/').catch(() => ({ data: [] })),
          api.get('/transfers/').catch(() => ({ data: [] })),
          api.get('/bookings/').catch(() => ({ data: [] })),
          api.get('/maintenance/').catch(() => ({ data: [] })),
          api.get('/audits/').catch(() => ({ data: [] })),
          api.get('/notifications/').catch(() => ({ data: [] }))
        ]);
        
        if (deptRes.data) setDepartments(deptRes.data);
        if (empRes.data) setEmployees(empRes.data);
        if (catRes.data) setCategories(catRes.data);
        if (astRes.data) setAssets(astRes.data);
        if (allocRes.data) setAllocations(allocRes.data);
        if (transRes.data) setTransfers(transRes.data);
        if (bookRes.data) setBookings(bookRes.data);
        if (maintRes.data) setMaintenance(maintRes.data);
        if (audRes.data) setAudits(audRes.data);
        if (notifRes.data) setNotifications(notifRes.data);
      } catch (err) {
        console.error('Failed to fetch initial data', err);
      }
    };

    loadData();
  }, []);

  // Save to local storage helper
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const saveData = (_key: string, _data: unknown) => {};

  const addAsset = (newAsset: Omit<Asset, 'id' | 'history'>) => {
    api.post('/assets/', newAsset).catch(console.error);
    
    const nextId = `AST-${String(assets.length + 1).padStart(3, '0')}`;
    const assetWithId: Asset = {
      ...newAsset,
      id: nextId,
      department_id: newAsset.department_id || null,
      status: newAsset.status || 'AVAILABLE',
      is_active: newAsset.is_active !== false
    };
    
    const updated = [assetWithId, ...assets];
    setAssets(updated);
    saveData('assets', updated);

    api.get('/categories/').then(res => {
      if (res.data) setCategories(res.data);
    }).catch(console.error);

    // Add activity log
    addNotification('Assets', `New asset registered: ${newAsset.name} (${nextId})`);

    return assetWithId;
  };

  const updateAsset = (id: string, updates: Partial<Asset>) => {
    api.put(`/assets/${id}`, updates).catch(console.error);
    
    const updated = assets.map(asset => {
      if (asset.id === id) {
        return { ...asset, ...updates };
      }
      return asset;
    });
    setAssets(updated);
    saveData('assets', updated);
  };

  const allocateAsset = (assetId: string, employeeId: string, notes?: string) => {
    api.post('/allocations/', { asset_id: assetId, employee_id: employeeId, notes }).catch(console.error);
    
    const today = new Date().toISOString().split('T')[0];
    
    // Create allocation
    const newAllocation: Allocation = {
      id: `al-${allocations.length + 1}`,
      asset_id: assetId,
      employee_id: employeeId,
      allocated_at: today,
      returned_at: null,
      status: 'ACTIVE',
      condition_notes: notes || null
    };
    const updatedAllocations = [newAllocation, ...allocations];
    setAllocations(updatedAllocations);
    saveData('allocations', updatedAllocations);

    // Update asset details
    const updatedAssets = assets.map(asset => {
      if (asset.id === assetId) {
        return {
          ...asset,
          status: 'ALLOCATED' as const,
        };
      }
      return asset;
    });
    setAssets(updatedAssets);
    saveData('assets', updatedAssets);

    // Refresh employees & categories from backend to ensure accuracy
    api.get('/employees/').then(res => { if(res.data) setEmployees(res.data) }).catch(console.error);
    api.get('/categories/').then(res => { if(res.data) setCategories(res.data) }).catch(console.error);

    addNotification('Assets', `Asset ${assetId} successfully allocated.`);
  };

  const createTransfer = (assetId: string, toDeptId: string, requestedBy: string) => {
    api.post('/transfers/', { asset_id: assetId, to_department_id: toDeptId }).catch(console.error);
    
    const today = new Date().toISOString().split('T')[0];
    const targetAsset = assets.find(a => a.id === assetId);
    if (!targetAsset) return;

    const newTransfer: Transfer = {
      id: `TR-${String(transfers.length + 24).padStart(3, '0')}`,
      asset_id: assetId,
      from_department_id: targetAsset.department_id,
      to_department_id: toDeptId,
      status: 'PENDING',
      requested_at: today,
      resolved_at: null,
      requested_by_id: requestedBy
    };

    const updated = [newTransfer, ...transfers];
    setTransfers(updated);
    saveData('transfers', updated);

    addNotification('Assets', `Transfer requested for asset ${assetId}`);
  };

  const approveTransfer = (transferId: string) => {
    api.put(`/transfers/${transferId}/approve/`).catch(console.error);
    
    const today = new Date().toISOString().split('T')[0];
    const transfer = transfers.find(t => t.id === transferId);
    if (!transfer) return;

    // Approve transfer
    const updatedTransfers = transfers.map(t => {
      if (t.id === transferId) {
        return { ...t, status: 'APPROVED' as const, resolved_at: today };
      }
      return t;
    });
    setTransfers(updatedTransfers);
    saveData('transfers', updatedTransfers);

    // Move asset to new department & reset allocation
    const updatedAssets = assets.map(asset => {
      if (asset.id === transfer.asset_id) {
        return {
          ...asset,
          department_id: transfer.to_department_id,
          status: 'AVAILABLE' as const,
        };
      }
      return asset;
    });
    setAssets(updatedAssets);
    saveData('assets', updatedAssets);

    api.get('/employees/').then(res => { if(res.data) setEmployees(res.data) }).catch(console.error);
    api.get('/categories/').then(res => { if(res.data) setCategories(res.data) }).catch(console.error);

    addNotification('Assets', `Transfer ${transferId} approved.`);
  };

  const rejectTransfer = (transferId: string) => {
    api.put(`/transfers/${transferId}/reject/`).catch(console.error);
    
    const transfer = transfers.find(t => t.id === transferId);
    if (!transfer) return;

    const updatedTransfers = transfers.map(t => {
      if (t.id === transferId) {
        return { ...t, status: 'REJECTED' as const };
      }
      return t;
    });
    setTransfers(updatedTransfers);
    saveData('transfers', updatedTransfers);

    addNotification('Assets', `Transfer ${transferId} was rejected.`);
  };

  const createBooking = (booking: Omit<Booking, 'id' | 'status' | 'created_at'>) => {
    api.post('/bookings/', { asset_id: booking.asset_id, start_time: booking.start_time, end_time: booking.end_time }).catch(console.error);
    
    const today = new Date().toISOString();
    
    // Check conflicts
    const conflict = bookings.find(b => {
      if (b.asset_id !== booking.asset_id || b.status === 'CANCELLED') return false;
      const bStart = new Date(b.start_time).getTime();
      const bEnd = new Date(b.end_time).getTime();
      const newStart = new Date(booking.start_time).getTime();
      const newEnd = new Date(booking.end_time).getTime();
      
      return (newStart < bEnd && newEnd > bStart);
    });

    if (conflict) {
      return { 
        success: false, 
        error: `Booking conflict: This asset is already reserved between ${new Date(conflict.start_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} and ${new Date(conflict.end_time).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}.`
      };
    }

    const newBk: Booking = {
      ...booking,
      id: `bk-${bookings.length + 1}`,
      status: 'CONFIRMED',
      created_at: today
    };

    const updated = [newBk, ...bookings];
    setBookings(updated);
    saveData('bookings', updated);

    addNotification('Bookings', `Reservation confirmed for asset ${booking.asset_id}.`);
    return { success: true };
  };

  const createMaintenance = (mt: { asset_id: string }) => {
    api.post('/maintenance/', { asset_id: mt.asset_id }).catch(console.error);
    
    const today = new Date().toISOString();
    const newId = `MR-${String(maintenance.length + 12).padStart(3, '0')}`;
    const newMaintenance: Maintenance = {
      id: newId,
      asset_id: mt.asset_id,
      employee_id: 'u-1',
      department_id: null,
      status: 'REQUESTED',
      created_at: today,
      resolution_notes: null
    };

    const updated = [newMaintenance, ...maintenance];
    setMaintenance(updated);
    saveData('maintenance', updated);

    // Update asset status
    const updatedAssets = assets.map(asset => {
      if (asset.id === mt.asset_id) {
        return { ...asset, status: 'UNDER_MAINTENANCE' as const };
      }
      return asset;
    });
    setAssets(updatedAssets);
    saveData('assets', updatedAssets);

    addNotification('Maintenance', `New Maintenance ticket ${newId} raised for asset ${mt.asset_id}.`);
  };

  const updateMaintenanceStatus = (id: string, status: Maintenance['status']) => {
    if(status === 'APPROVED') api.put(`/maintenance/${id}/approve/`).catch(console.error); else if(status === 'REJECTED') api.put(`/maintenance/${id}/reject/`).catch(console.error); else if(status === 'COMPLETED') api.put(`/maintenance/${id}/complete/`, { resolution_notes: '' }).catch(console.error);
    
    const ticket = maintenance.find(m => m.id === id);
    if (!ticket) return;

    const updatedM = maintenance.map(m => {
      if (m.id === id) {
        return { ...m, status };
      }
      return m;
    });
    setMaintenance(updatedM);
    saveData('maintenance', updatedM);

    // If completed, move asset back to Available
    const updatedAssets = assets.map(asset => {
      if (asset.id === ticket.asset_id) {
        let newStatus = asset.status;
        if (status === 'COMPLETED') {
          newStatus = 'AVAILABLE';
        }
        
        return { ...asset, status: newStatus };
      }
      return asset;
    });
    setAssets(updatedAssets);
    saveData('assets', updatedAssets);

    addNotification('Maintenance', `Maintenance ticket ${id} has been marked as ${status}.`);
  };

  const submitAudit = (assetId: string, auditor: string, status: AuditResultType, notes?: string) => {
    api.post(`/audits/${audits.length ? audits[0].id : 1}/results/`, { asset_id: assetId, result: status, notes }).catch(console.error);
    
    // Update asset status if needed based on audit result
    const updatedAssets = assets.map(asset => {
      if (asset.id === assetId) {
        let newStatus = asset.status;
        if (status === 'DAMAGED') {
          newStatus = 'UNDER_MAINTENANCE';
        } else if (status === 'MISSING') {
          newStatus = 'RETIRED';
        }
        return { ...asset, status: newStatus };
      }
      return asset;
    });
    setAssets(updatedAssets);
    saveData('assets', updatedAssets);
  };

  const addNotification = (category: string, message: string) => {
    const newNotif: Notification = {
      id: `n-${notifications.length + 1}`,
      user_id: 'e-1',
      message,
      created_at: new Date().toISOString(),
      is_read: false
    };
    const updated = [newNotif, ...notifications];
    setNotifications(updated);
    saveData('notifications', updated);
  };

  const markNotificationRead = (id: string) => {
    const updated = notifications.map(n => n.id === id ? { ...n, is_read: true } : n);
    setNotifications(updated);
    saveData('notifications', updated);
  };

  const markAllNotificationsRead = () => {
    const updated = notifications.map(n => ({ ...n, is_read: true }));
    setNotifications(updated);
    saveData('notifications', updated);
  };

  const getAssetCategory = (asset: Asset) => categories.find(c => c.id === asset.category_id);
  const getAssetDepartment = (asset: Asset) => departments.find(d => d.id === asset.department_id);
  const getAssetEmployee = (asset: Asset) => allocations.find(a => a.asset_id === asset.id && a.status === 'ACTIVE') ? employees.find(e => e.id === allocations.find(a => a.asset_id === asset.id && a.status === 'ACTIVE')?.employee_id) : undefined;

  return (
    <AssetStoreContext.Provider value={{
      departments,
      employees,
      categories,
      assets,
      allocations,
      transfers,
      bookings,
      maintenance,
      audits,
      notifications,
      
      addAsset,
      updateAsset,
      allocateAsset,
      createTransfer,
      approveTransfer,
      rejectTransfer,
      createBooking,
      createMaintenance,
      updateMaintenanceStatus,
      submitAudit,
      addNotification,
      markNotificationRead,
      markAllNotificationsRead,
      
      getAssetCategory,
      getAssetDepartment,
      getAssetEmployee
    }}>
      {children}
    </AssetStoreContext.Provider>
  );
}

export function useAssetStore() {
  const context = useContext(AssetStoreContext);
  if (context === undefined) {
    throw new Error('useAssetStore must be used within an AssetStoreProvider');
  }
  return context;
}
