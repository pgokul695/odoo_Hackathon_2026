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
  addAsset: (asset: Omit<Asset, 'id' | 'history'>) => Promise<void>;
  updateAsset: (id: string, updates: Partial<Asset>) => Promise<void>;
  allocateAsset: (assetId: string, employeeId: string, notes?: string) => Promise<void>;
  createTransfer: (assetId: string, toDeptId: string, requestedBy: string) => Promise<void>;
  approveTransfer: (transferId: string) => Promise<void>;
  rejectTransfer: (transferId: string) => Promise<void>;
  createBooking: (booking: Omit<Booking, 'id' | 'status' | 'created_at'>) => Promise<{ success: boolean; error?: string }>;
  createMaintenance: (mt: { asset_id: string }) => Promise<void>;
  updateMaintenanceStatus: (id: string, status: Maintenance['status']) => Promise<void>;
  submitAudit: (assetId: string, auditor: string, status: AuditResultType, notes?: string) => Promise<void>;
  addNotification: (category: string, message: string) => void;
  markNotificationRead: (id: string) => Promise<void>;
  markAllNotificationsRead: () => Promise<void>;
  
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

  const loadData = async () => {
    try {
      const [
        deptRes, empRes, catRes, astRes, 
        allocRes, transRes, bookRes, maintRes, audRes, notifRes
      ] = await Promise.all([
        api.get('/departments/'),
        api.get('/employees/'),
        api.get('/categories/'),
        api.get('/assets/'),
        api.get('/allocations/'),
        api.get('/transfers/'),
        api.get('/bookings/'),
        api.get('/maintenance/'),
        api.get('/audits/'),
        api.get('/notifications/')
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
      console.error('Failed to fetch data', err);
    }
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;
    loadData();
  }, []);

  // Save to local storage helper
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const saveData = (_key: string, _data: unknown) => {};

  const addAsset = async (newAsset: Omit<Asset, 'id' | 'history'>) => {
    try {
      await api.post('/assets/', newAsset);
      await loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const updateAsset = async (id: string, updates: Partial<Asset>) => {
    try {
      await api.put(`/assets/${id}`, updates);
      await loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const allocateAsset = async (assetId: string, employeeId: string, notes?: string) => {
    try {
      await api.post('/allocations/', { asset_id: assetId, employee_id: employeeId, notes });
      await loadData();
    } catch (err) {
      console.error(err);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const createTransfer = async (assetId: string, toDeptId: string, _requestedBy: string) => {
    try {
      await api.post('/transfers/', { asset_id: assetId, to_department_id: toDeptId });
      await loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const approveTransfer = async (transferId: string) => {
    try {
      await api.put(`/transfers/${transferId}/approve/`);
      await loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const rejectTransfer = async (transferId: string) => {
    try {
      await api.put(`/transfers/${transferId}/reject/`);
      await loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const createBooking = async (booking: Omit<Booking, 'id' | 'status' | 'created_at'>) => {
    try {
      await api.post('/bookings/', { asset_id: booking.asset_id, start_time: booking.start_time, end_time: booking.end_time });
      await loadData();
      return { success: true };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      return { success: false, error: err?.response?.data?.message || 'Booking conflict' };
    }
  };

  const createMaintenance = async (mt: { asset_id: string }) => {
    try {
      await api.post('/maintenance/', { asset_id: mt.asset_id });
      await loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const updateMaintenanceStatus = async (id: string, status: Maintenance['status']) => {
    try {
      if(status === 'APPROVED') await api.put(`/maintenance/${id}/approve/`);
      else if(status === 'REJECTED') await api.put(`/maintenance/${id}/reject/`);
      else if(status === 'COMPLETED') await api.put(`/maintenance/${id}/complete/`, { resolution_notes: '' });
      await loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const submitAudit = async (assetId: string, auditor: string, status: AuditResultType, notes?: string) => {
    try {
      const auditId = audits.length ? audits[0].id : 1;
      await api.post(`/audits/${auditId}/results/`, { asset_id: assetId, result: status, notes });
      await loadData();
    } catch (err) {
      console.error(err);
    }
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

  const markNotificationRead = async (id: string) => {
    try {
      await api.put(`/notifications/${id}/read/`);
      await loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const markAllNotificationsRead = async () => {
    // There is no bulk read endpoint documented, but we can do it optimistically or wait for the backend to support it.
    // For now we will optimistically update since it's harmless
    const updated = notifications.map(n => ({ ...n, is_read: true }));
    setNotifications(updated);
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
