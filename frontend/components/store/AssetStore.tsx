'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { request } from '../../lib/api';

// Types
export interface Department {
  id: string;
  name: string;
  code: string;
  manager: string;
  employeeCount: number;
  budget: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  departmentId: string;
  activeAssetsCount: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  totalAssets: number;
  allocatedAssets: number;
}

export interface AssetHistory {
  id: string;
  date: string;
  type: string;
  description: string;
  performedBy: string;
}

export interface Asset {
  id: string;
  name: string;
  categoryId: string;
  departmentId: string;
  assignedToId: string; // 'none' or employee ID
  status: 'Available' | 'Allocated' | 'Under Maintenance' | 'Retired';
  purchaseDate: string;
  purchaseValue: number;
  lastActivity: string;
  serialNumber: string;
  notes?: string;
  history: AssetHistory[];
  attachments?: { name: string; size: string; date: string }[];
}

export interface Allocation {
  id: string;
  assetId: string;
  employeeId: string;
  allocatedDate: string;
  returnDate?: string;
  status: 'Active' | 'Returned';
  notes?: string;
}

export interface Transfer {
  id: string;
  assetId: string;
  fromDepartmentId: string;
  toDepartmentId: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  requestedDate: string;
  approvedDate?: string;
  requestedBy: string;
}

export interface Booking {
  id: string;
  assetId: string;
  requesterName: string;
  startDate: string;
  endDate: string;
  purpose: string;
  status: 'Pending' | 'Confirmed' | 'Cancelled';
}

export interface Maintenance {
  id: string;
  assetId: string;
  issue: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Requested' | 'Approved' | 'In Progress' | 'Completed';
  assignedTechnician: string;
  createdDate: string;
  cost?: number;
}

export interface Audit {
  id: string;
  assetId: string;
  auditorName: string;
  auditDate: string;
  status: 'Found' | 'Missing' | 'Damaged';
  notes?: string;
}

export interface Notification {
  id: string;
  category: 'Assets' | 'Maintenance' | 'Bookings' | 'Audits' | 'System';
  message: string;
  timestamp: string;
  read: boolean;
}

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
  createBooking: (booking: Omit<Booking, 'id' | 'status'>) => { success: boolean; error?: string };
  createMaintenance: (mt: Omit<Maintenance, 'id' | 'status' | 'createdDate'>) => void;
  updateMaintenanceStatus: (id: string, status: Maintenance['status']) => void;
  submitAudit: (assetId: string, auditor: string, status: Audit['status'], notes?: string) => void;
  addNotification: (category: Notification['category'], message: string) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  
  // Helpers
  getAssetCategory: (asset: Asset) => Category | undefined;
  getAssetDepartment: (asset: Asset) => Department | undefined;
  getAssetEmployee: (asset: Asset) => Employee | undefined;
}

const AssetStoreContext = createContext<AssetStoreContextType | undefined>(undefined);

// Initial Data
const initialDepartments: Department[] = [
  { id: 'd-1', name: 'AI Department', code: 'AIDEPT', manager: 'Dr. Sarah Jenkins', employeeCount: 15, budget: '₹45,00,000' },
  { id: 'd-2', name: 'Engineering', code: 'ENG', manager: 'Marcus Vance', employeeCount: 42, budget: '₹95,00,000' },
  { id: 'd-3', name: 'Product Management', code: 'PM', manager: 'Elena Rostova', employeeCount: 8, budget: '₹20,00,000' },
  { id: 'd-4', name: 'Operations', code: 'OPS', manager: 'Rajesh Kumar', employeeCount: 24, budget: '₹35,00,000' },
  { id: 'd-5', name: 'Sales & Marketing', code: 'SALES', manager: 'Sneha Patel', employeeCount: 18, budget: '₹30,00,000' },
];

const initialEmployees: Employee[] = [
  { id: 'e-1', name: 'Keerthana Vinod', email: 'keerthana.v@assetflow.ai', role: 'Asset Manager', departmentId: 'd-1', activeAssetsCount: 2 },
  { id: 'e-2', name: 'Priya Sharma', email: 'priya.s@assetflow.ai', role: 'Lead ML Engineer', departmentId: 'd-1', activeAssetsCount: 1 },
  { id: 'e-3', name: 'Arjun Kapoor', email: 'arjun.k@assetflow.ai', role: 'Product Designer', departmentId: 'd-3', activeAssetsCount: 1 },
  { id: 'e-4', name: 'Rajesh Kumar', email: 'rajesh.k@assetflow.ai', role: 'Operations Director', departmentId: 'd-4', activeAssetsCount: 1 },
  { id: 'e-5', name: 'Sneha Patel', email: 'sneha.p@assetflow.ai', role: 'Marketing Lead', departmentId: 'd-5', activeAssetsCount: 1 },
  { id: 'e-6', name: 'Amit Mishra', email: 'amit.m@assetflow.ai', role: 'Senior Software Engineer', departmentId: 'd-2', activeAssetsCount: 1 },
];

const initialCategories: Category[] = [
  { id: 'c-1', name: 'Laptops', description: 'Enterprise work computers (Mac, Dell, ThinkPad)', totalAssets: 6, allocatedAssets: 5 },
  { id: 'c-2', name: 'Monitors', description: 'High-res desk displays (4K, UltraSharp)', totalAssets: 3, allocatedAssets: 2 },
  { id: 'c-3', name: 'Mobile', description: 'Testing and management phones (iOS, Android)', totalAssets: 2, allocatedAssets: 0 },
  { id: 'c-4', name: 'Server', description: 'GPU compute clusters and storage nodes', totalAssets: 2, allocatedAssets: 1 },
  { id: 'c-5', name: 'Vehicle', description: 'Corporate logistics and electric vehicles', totalAssets: 1, allocatedAssets: 1 },
];

const initialAssets: Asset[] = [
  {
    id: 'AST-001',
    name: 'Dell Latitude 5440',
    categoryId: 'c-1',
    departmentId: 'd-1',
    assignedToId: 'e-1',
    status: 'Allocated',
    purchaseDate: '2026-01-12',
    purchaseValue: 75000,
    lastActivity: '2 minutes ago',
    serialNumber: 'CN-0ABCDE-12345-678-90GP',
    notes: 'Configured with 32GB RAM and 1TB SSD.',
    history: [
      { id: 'h1', date: '2026-01-12', type: 'Registration', description: 'Registered in the system', performedBy: 'Keerthana Vinod' },
      { id: 'h2', date: '2026-01-12', type: 'Allocation', description: 'Allocated to Keerthana Vinod', performedBy: 'Keerthana Vinod' }
    ],
    attachments: [
      { name: 'purchase_invoice_AST001.pdf', size: '1.2 MB', date: '2026-01-12' },
      { name: 'setup_checklist.docx', size: '340 KB', date: '2026-01-13' }
    ]
  },
  {
    id: 'AST-002',
    name: 'MacBook Pro M3 Max',
    categoryId: 'c-1',
    departmentId: 'd-1',
    assignedToId: 'e-2',
    status: 'Allocated',
    purchaseDate: '2026-02-15',
    purchaseValue: 180000,
    lastActivity: '1 hour ago',
    serialNumber: 'C02F1234Q05D',
    notes: '16-core CPU, 40-core GPU, 48GB Unified Memory.',
    history: [
      { id: 'h3', date: '2026-02-15', type: 'Registration', description: 'Registered in the system', performedBy: 'Keerthana Vinod' },
      { id: 'h4', date: '2026-02-16', type: 'Allocation', description: 'Allocated to Priya Sharma', performedBy: 'Keerthana Vinod' }
    ]
  },
  {
    id: 'AST-003',
    name: 'Dell UltraSharp 27 Monitor',
    categoryId: 'c-2',
    departmentId: 'd-1',
    assignedToId: 'e-1',
    status: 'Allocated',
    purchaseDate: '2026-01-12',
    purchaseValue: 35000,
    lastActivity: '3 days ago',
    serialNumber: 'MX-045612-987',
    history: [
      { id: 'h5', date: '2026-01-12', type: 'Registration', description: 'Registered in the system', performedBy: 'Keerthana Vinod' },
      { id: 'h6', date: '2026-01-12', type: 'Allocation', description: 'Allocated to Keerthana Vinod', performedBy: 'Keerthana Vinod' }
    ]
  },
  {
    id: 'AST-004',
    name: 'iPhone 15 Pro Max',
    categoryId: 'c-3',
    departmentId: 'd-3',
    assignedToId: 'none',
    status: 'Available',
    purchaseDate: '2026-03-01',
    purchaseValue: 120000,
    lastActivity: '1 week ago',
    serialNumber: 'DNPGK902L0P',
    history: [
      { id: 'h7', date: '2026-03-01', type: 'Registration', description: 'Registered in the system', performedBy: 'Keerthana Vinod' }
    ]
  },
  {
    id: 'AST-005',
    name: 'HP EliteDesk Compute Node',
    categoryId: 'c-4',
    departmentId: 'd-2',
    assignedToId: 'none',
    status: 'Under Maintenance',
    purchaseDate: '2025-11-20',
    purchaseValue: 250000,
    lastActivity: '42 minutes ago',
    serialNumber: 'SGH51293K2',
    history: [
      { id: 'h8', date: '2025-11-20', type: 'Registration', description: 'Registered in the system', performedBy: 'System' },
      { id: 'h9', date: '2026-07-12', type: 'Maintenance', description: 'Maintenance MR-012 raised: Fan noise and high temperatures', performedBy: 'Amit Mishra' }
    ]
  },
  {
    id: 'AST-006',
    name: 'Tesla Model 3 Long Range',
    categoryId: 'c-5',
    departmentId: 'd-4',
    assignedToId: 'e-4',
    status: 'Allocated',
    purchaseDate: '2025-08-10',
    purchaseValue: 3500000,
    lastActivity: 'Yesterday',
    serialNumber: '5YJ3E1EB9LF123456',
    history: [
      { id: 'h10', date: '2025-08-10', type: 'Registration', description: 'Registered in the system', performedBy: 'System' },
      { id: 'h11', date: '2025-08-12', type: 'Allocation', description: 'Allocated to Rajesh Kumar (Ops)', performedBy: 'Admin' }
    ]
  },
  {
    id: 'AST-007',
    name: 'Lenovo ThinkPad X1 Carbon Gen 11',
    categoryId: 'c-1',
    departmentId: 'd-2',
    assignedToId: 'e-6',
    status: 'Allocated',
    purchaseDate: '2026-04-05',
    purchaseValue: 110000,
    lastActivity: '4 days ago',
    serialNumber: 'PF4182K9',
    history: [
      { id: 'h12', date: '2026-04-05', type: 'Registration', description: 'Registered in the system', performedBy: 'Keerthana Vinod' },
      { id: 'h13', date: '2026-04-05', type: 'Allocation', description: 'Allocated to Amit Mishra', performedBy: 'Keerthana Vinod' }
    ]
  },
  {
    id: 'AST-008',
    name: 'Samsung Galaxy S24 Ultra',
    categoryId: 'c-3',
    departmentId: 'd-5',
    assignedToId: 'none',
    status: 'Retired',
    purchaseDate: '2024-03-10',
    purchaseValue: 85000,
    lastActivity: '2 weeks ago',
    serialNumber: 'RF9X8102381',
    history: [
      { id: 'h14', date: '2024-03-10', type: 'Registration', description: 'Registered in the system', performedBy: 'Admin' },
      { id: 'h15', date: '2026-06-01', type: 'Retirement', description: 'Retired: Broken screen and battery degradation', performedBy: 'Keerthana Vinod' }
    ]
  },
  {
    id: 'AST-009',
    name: 'ASUS ROG Zephyrus G14 (GPU Cluster Mock)',
    categoryId: 'c-4',
    departmentId: 'd-2',
    assignedToId: 'none',
    status: 'Available',
    purchaseDate: '2026-03-20',
    purchaseValue: 160000,
    lastActivity: '1 week ago',
    serialNumber: 'L8N0CV01832',
    history: [
      { id: 'h16', date: '2026-03-20', type: 'Registration', description: 'Registered in the system', performedBy: 'Keerthana Vinod' }
    ]
  },
  {
    id: 'AST-010',
    name: 'LG UltraFine 5K Display',
    categoryId: 'c-2',
    departmentId: 'd-5',
    assignedToId: 'e-5',
    status: 'Allocated',
    purchaseDate: '2025-06-15',
    purchaseValue: 95000,
    lastActivity: '5 days ago',
    serialNumber: '906NTKR09812',
    history: [
      { id: 'h17', date: '2025-06-15', type: 'Registration', description: 'Registered in system', performedBy: 'Admin' },
      { id: 'h18', date: '2025-06-16', type: 'Allocation', description: 'Allocated to Sneha Patel', performedBy: 'Admin' }
    ]
  }
];

const initialAllocations: Allocation[] = [
  { id: 'al-1', assetId: 'AST-001', employeeId: 'e-1', allocatedDate: '2026-01-12', status: 'Active' },
  { id: 'al-2', assetId: 'AST-002', employeeId: 'e-2', allocatedDate: '2026-02-16', status: 'Active' },
  { id: 'al-3', assetId: 'AST-003', employeeId: 'e-1', allocatedDate: '2026-01-12', status: 'Active' },
  { id: 'al-4', assetId: 'AST-006', employeeId: 'e-4', allocatedDate: '2025-08-12', status: 'Active' },
  { id: 'al-5', assetId: 'AST-007', employeeId: 'e-6', allocatedDate: '2026-04-05', status: 'Active' },
  { id: 'al-6', assetId: 'AST-010', employeeId: 'e-5', allocatedDate: '2025-06-16', status: 'Active' },
];

const initialTransfers: Transfer[] = [
  { id: 'TR-024', assetId: 'AST-001', fromDepartmentId: 'd-1', toDepartmentId: 'd-2', status: 'Approved', requestedDate: '2026-07-12', approvedDate: '2026-07-12', requestedBy: 'Keerthana Vinod' },
  { id: 'TR-025', assetId: 'AST-004', fromDepartmentId: 'd-3', toDepartmentId: 'd-1', status: 'Pending', requestedDate: '2026-07-12', requestedBy: 'Arjun Kapoor' }
];

const initialBookings: Booking[] = [
  { id: 'bk-1', assetId: 'AST-004', requesterName: 'Arjun Kapoor', startDate: '2026-07-15T09:00', endDate: '2026-07-15T17:00', purpose: 'UI testing sessions', status: 'Confirmed' },
  { id: 'bk-2', assetId: 'AST-009', requesterName: 'Priya Sharma', startDate: '2026-07-18T10:30', endDate: '2026-07-18T12:30', purpose: 'ML Model Inference validation', status: 'Confirmed' }
];

const initialMaintenance: Maintenance[] = [
  { id: 'MR-012', assetId: 'AST-005', issue: 'Fan noise and thermal throttling on high CPU load.', priority: 'High', status: 'In Progress', assignedTechnician: 'Alex Mercer', createdDate: '2026-07-12' },
  { id: 'MR-013', assetId: 'AST-001', issue: 'Keyboard key sticky (Enter key)', priority: 'Low', status: 'Requested', assignedTechnician: 'None', createdDate: '2026-07-11' }
];

const initialAudits: Audit[] = [
  { id: 'au-1', assetId: 'AST-001', auditorName: 'Keerthana Vinod', auditDate: '2026-07-10', status: 'Found', notes: 'Asset in pristine condition.' },
  { id: 'au-2', assetId: 'AST-003', auditorName: 'Keerthana Vinod', auditDate: '2026-07-10', status: 'Found' },
];

const initialNotifications: Notification[] = [
  { id: 'n-1', category: 'Assets', message: 'Asset AST-001 has been successfully allocated to Keerthana Vinod.', timestamp: '2 minutes ago', read: false },
  { id: 'n-2', category: 'Maintenance', message: 'Maintenance ticket MR-012 is now In Progress.', timestamp: '18 minutes ago', read: false },
  { id: 'n-3', category: 'Assets', message: 'Transfer TR-024 approved for AI Department → Engineering.', timestamp: '42 minutes ago', read: true },
  { id: 'n-4', category: 'System', message: 'Weekly data backup completed successfully.', timestamp: '2 hours ago', read: true }
];

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

  // Load from local storage and sync with backend
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const loadFromLocalStorage = () => {
      const loadData = <T,>(key: string, initial: T, setter: React.Dispatch<React.SetStateAction<T>>) => {
        const saved = localStorage.getItem(`assetflow_${key}`);
        if (saved) {
          try {
            setter(JSON.parse(saved));
          } catch (e) {
            console.error(`Failed to parse localstorage key assetflow_${key}`, e);
          }
        }
      };

      loadData('departments', initialDepartments, setDepartments);
      loadData('employees', initialEmployees, setEmployees);
      loadData('categories', initialCategories, setCategories);
      loadData('assets', initialAssets, setAssets);
      loadData('allocations', initialAllocations, setAllocations);
      loadData('transfers', initialTransfers, setTransfers);
      loadData('bookings', initialBookings, setBookings);
      loadData('maintenance', initialMaintenance, setMaintenance);
      loadData('audits', initialAudits, setAudits);
      loadData('notifications', initialNotifications, setNotifications);
    };

    // First load from localStorage to ensure instant render with demo data
    loadFromLocalStorage();

    // Then try to fetch fresh data from backend
    const syncWithBackend = async () => {
      try {
        const [
          backendDepts,
          backendEmployees,
          backendCategories,
          backendAssets,
          backendAllocations,
          backendTransfers,
          backendBookings,
          backendMaintenance,
          backendAudits,
          backendNotifications
        ] = await Promise.allSettled([
          request('GET', '/departments/'),
          request('GET', '/employees/'),
          request('GET', '/categories/'),
          request('GET', '/assets/'),
          request('GET', '/allocations/'),
          request('GET', '/transfers/'),
          request('GET', '/bookings/'),
          request('GET', '/maintenance/'),
          request('GET', '/audits/'),
          request('GET', '/notifications/')
        ]);

        if (backendDepts.status === 'fulfilled' && Array.isArray(backendDepts.value) && backendDepts.value.length > 0) {
          setDepartments(backendDepts.value);
        }
        if (backendEmployees.status === 'fulfilled' && Array.isArray(backendEmployees.value) && backendEmployees.value.length > 0) {
          setEmployees(backendEmployees.value);
        }
        if (backendCategories.status === 'fulfilled' && Array.isArray(backendCategories.value) && backendCategories.value.length > 0) {
          setCategories(backendCategories.value);
        }
        if (backendAssets.status === 'fulfilled' && Array.isArray(backendAssets.value) && backendAssets.value.length > 0) {
          // Merge/Map to avoid crashes on missing mock fields
          interface BackendAsset {
            id?: string;
            name?: string;
            categoryId?: string;
            departmentId?: string;
            assignedToId?: string;
            serialNumber?: string;
            status?: 'Available' | 'Allocated' | 'Under Maintenance' | 'Retired';
            purchaseDate?: string;
            purchaseValue?: number;
            lastActivity?: string;
            notes?: string;
            history?: AssetHistory[];
            attachments?: { name: string; size: string; date: string }[];
          }

          const mergedAssets = (backendAssets.value as BackendAsset[]).map((bAsset: BackendAsset) => {
            const localMatch = initialAssets.find(a => a.id === bAsset.id);
            return {
              id: bAsset.id || 'AST-000',
              name: bAsset.name || localMatch?.name || 'Standard Asset',
              categoryId: bAsset.categoryId || localMatch?.categoryId || 'CAT-001',
              departmentId: bAsset.departmentId || localMatch?.departmentId || 'DEP-001',
              assignedToId: bAsset.assignedToId || localMatch?.assignedToId || 'none',
              serialNumber: bAsset.serialNumber || localMatch?.serialNumber || 'SN-MOCK-123',
              status: bAsset.status || localMatch?.status || 'Available',
              purchaseDate: bAsset.purchaseDate || localMatch?.purchaseDate || '2023-01-15',
              purchaseValue: bAsset.purchaseValue || localMatch?.purchaseValue || 1200.0,
              lastActivity: bAsset.lastActivity || localMatch?.lastActivity || 'Just now',
              notes: bAsset.notes || localMatch?.notes || '',
              history: bAsset.history || localMatch?.history || [],
              attachments: bAsset.attachments || localMatch?.attachments || []
            };
          });
          setAssets(mergedAssets);
        }
        if (backendAllocations.status === 'fulfilled' && Array.isArray(backendAllocations.value) && backendAllocations.value.length > 0) {
          setAllocations(backendAllocations.value);
        }
        if (backendTransfers.status === 'fulfilled' && Array.isArray(backendTransfers.value) && backendTransfers.value.length > 0) {
          setTransfers(backendTransfers.value);
        }
        if (backendBookings.status === 'fulfilled' && Array.isArray(backendBookings.value) && backendBookings.value.length > 0) {
          setBookings(backendBookings.value);
        }
        if (backendMaintenance.status === 'fulfilled' && Array.isArray(backendMaintenance.value) && backendMaintenance.value.length > 0) {
          setMaintenance(backendMaintenance.value);
        }
        if (backendAudits.status === 'fulfilled' && Array.isArray(backendAudits.value) && backendAudits.value.length > 0) {
          setAudits(backendAudits.value);
        }
        if (backendNotifications.status === 'fulfilled' && Array.isArray(backendNotifications.value) && backendNotifications.value.length > 0) {
          setNotifications(backendNotifications.value);
        }
      } catch (err) {
        console.error('Error syncing with backend:', err);
      }
    };

    syncWithBackend();
  }, []);

  // Save to local storage helper
  const saveData = (key: string, data: unknown) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`assetflow_${key}`, JSON.stringify(data));
    }
  };

  const addAsset = (newAsset: Omit<Asset, 'id' | 'history'>) => {
    const nextId = `AST-${String(assets.length + 1).padStart(3, '0')}`;
    const assetWithId: Asset = {
      ...newAsset,
      id: nextId,
      history: [
        { id: Math.random().toString(), date: new Date().toISOString().split('T')[0], type: 'Registration', description: `Registered asset ${newAsset.name}`, performedBy: 'Keerthana Vinod' }
      ]
    };
    
    const updated = [assetWithId, ...assets];
    setAssets(updated);
    saveData('assets', updated);

    // Update categories total count
    const updatedCats = categories.map(cat => {
      if (cat.id === newAsset.categoryId) {
        return {
          ...cat,
          totalAssets: cat.totalAssets + 1,
          allocatedAssets: newAsset.status === 'Allocated' ? cat.allocatedAssets + 1 : cat.allocatedAssets
        };
      }
      return cat;
    });
    setCategories(updatedCats);
    saveData('categories', updatedCats);

    // Add activity log
    addNotification('Assets', `New asset registered: ${newAsset.name} (${nextId})`);

    // Sync to backend (POST /api/assets/)
    request('POST', '/assets/', {
      name: newAsset.name,
      categoryId: newAsset.categoryId,
      departmentId: newAsset.departmentId,
      serialNumber: newAsset.serialNumber,
      status: newAsset.status,
      purchaseDate: newAsset.purchaseDate,
      purchaseValue: newAsset.purchaseValue,
      notes: newAsset.notes
    }).catch(err => console.error('Failed to sync new asset to backend:', err));

    return assetWithId;
  };

  const updateAsset = (id: string, updates: Partial<Asset>) => {
    const updated = assets.map(asset => {
      if (asset.id === id) {
        const history = [...asset.history];
        history.push({
          id: Math.random().toString(),
          date: new Date().toISOString().split('T')[0],
          type: 'Update',
          description: `Updated details: ${Object.keys(updates).join(', ')}`,
          performedBy: 'Keerthana Vinod'
        });
        return { ...asset, ...updates, history };
      }
      return asset;
    });
    setAssets(updated);
    saveData('assets', updated);

    // Sync to backend (PUT /api/assets/{id})
    request('PUT', `/assets/${id}`, {
      name: updates.name,
      department_id: updates.departmentId,
      status: updates.status
    }).catch(err => console.error(`Failed to sync asset update ${id} to backend:`, err));
  };

  const allocateAsset = (assetId: string, employeeId: string, notes?: string) => {
    const today = new Date().toISOString().split('T')[0];
    
    // Create allocation
    const newAllocation: Allocation = {
      id: `al-${allocations.length + 1}`,
      assetId,
      employeeId,
      allocatedDate: today,
      status: 'Active',
      notes
    };
    const updatedAllocations = [newAllocation, ...allocations];
    setAllocations(updatedAllocations);
    saveData('allocations', updatedAllocations);

    // Update asset details
    const employee = employees.find(e => e.id === employeeId);
    const updatedAssets = assets.map(asset => {
      if (asset.id === assetId) {
        const history = [...asset.history];
        history.push({
          id: Math.random().toString(),
          date: today,
          type: 'Allocation',
          description: `Allocated to ${employee ? employee.name : 'Unknown Employee'}`,
          performedBy: 'Keerthana Vinod'
        });
        return {
          ...asset,
          assignedToId: employeeId,
          status: 'Allocated' as const,
          lastActivity: 'Just now',
          history
        };
      }
      return asset;
    });
    setAssets(updatedAssets);
    saveData('assets', updatedAssets);

    // Update employee active count
    const updatedEmployees = employees.map(emp => {
      if (emp.id === employeeId) {
        return { ...emp, activeAssetsCount: emp.activeAssetsCount + 1 };
      }
      return emp;
    });
    setEmployees(updatedEmployees);
    saveData('employees', updatedEmployees);

    // Update Category allocation count
    const targetAsset = assets.find(a => a.id === assetId);
    if (targetAsset) {
      const updatedCats = categories.map(cat => {
        if (cat.id === targetAsset.categoryId) {
          return { ...cat, allocatedAssets: cat.allocatedAssets + 1 };
        }
        return cat;
      });
      setCategories(updatedCats);
      saveData('categories', updatedCats);
    }

    addNotification('Assets', `Asset ${assetId} successfully allocated to ${employee?.name}.`);

    // Sync to backend (POST /api/allocations/)
    request('POST', '/allocations/', {
      asset_id: assetId,
      employee_id: employeeId,
      notes: notes || ''
    }).catch(err => console.error('Failed to sync allocation to backend:', err));
  };

  const createTransfer = (assetId: string, toDeptId: string, requestedBy: string) => {
    const today = new Date().toISOString().split('T')[0];
    const targetAsset = assets.find(a => a.id === assetId);
    if (!targetAsset) return;

    const newTransfer: Transfer = {
      id: `TR-${String(transfers.length + 24).padStart(3, '0')}`,
      assetId,
      fromDepartmentId: targetAsset.departmentId,
      toDepartmentId: toDeptId,
      status: 'Pending',
      requestedDate: today,
      requestedBy
    };

    const updated = [newTransfer, ...transfers];
    setTransfers(updated);
    saveData('transfers', updated);

    // Update asset history
    const updatedAssets = assets.map(asset => {
      if (asset.id === assetId) {
        const history = [...asset.history];
        history.push({
          id: Math.random().toString(),
          date: today,
          type: 'Transfer Request',
          description: `Transfer requested from ${departments.find(d => d.id === asset.departmentId)?.name} to ${departments.find(d => d.id === toDeptId)?.name}`,
          performedBy: requestedBy
        });
        return { ...asset, history, lastActivity: 'Just now' };
      }
      return asset;
    });
    setAssets(updatedAssets);
    saveData('assets', updatedAssets);

    addNotification('Assets', `Transfer requested for asset ${assetId} to ${departments.find(d => d.id === toDeptId)?.name}.`);

    // Sync to backend (POST /api/transfers/)
    request('POST', '/transfers/', {
      asset_id: assetId,
      to_department_id: toDeptId
    }).catch(err => console.error('Failed to sync transfer to backend:', err));
  };

  const approveTransfer = (transferId: string) => {
    const today = new Date().toISOString().split('T')[0];
    const transfer = transfers.find(t => t.id === transferId);
    if (!transfer) return;

    // Approve transfer
    const updatedTransfers = transfers.map(t => {
      if (t.id === transferId) {
        return { ...t, status: 'Approved' as const, approvedDate: today };
      }
      return t;
    });
    setTransfers(updatedTransfers);
    saveData('transfers', updatedTransfers);

    // Move asset to new department & reset allocation
    const updatedAssets = assets.map(asset => {
      if (asset.id === transfer.assetId) {
        const history = [...asset.history];
        history.push({
          id: Math.random().toString(),
          date: today,
          type: 'Transfer Approval',
          description: `Transfer approved. Department changed from ${departments.find(d => d.id === transfer.fromDepartmentId)?.name} to ${departments.find(d => d.id === transfer.toDepartmentId)?.name}`,
          performedBy: 'Keerthana Vinod'
        });
        return {
          ...asset,
          departmentId: transfer.toDepartmentId,
          assignedToId: 'none', // Reset assignee during transfer
          status: 'Available' as const,
          lastActivity: 'Just now',
          history
        };
      }
      return asset;
    });
    setAssets(updatedAssets);
    saveData('assets', updatedAssets);

    // Update old employee active count if it was allocated
    const originalAsset = assets.find(a => a.id === transfer.assetId);
    if (originalAsset && originalAsset.assignedToId !== 'none') {
      const updatedEmployees = employees.map(emp => {
        if (emp.id === originalAsset.assignedToId) {
          return { ...emp, activeAssetsCount: Math.max(0, emp.activeAssetsCount - 1) };
        }
        return emp;
      });
      setEmployees(updatedEmployees);
      saveData('employees', updatedEmployees);

      // Decrement allocated category count
      const updatedCats = categories.map(cat => {
        if (cat.id === originalAsset.categoryId) {
          return { ...cat, allocatedAssets: Math.max(0, cat.allocatedAssets - 1) };
        }
        return cat;
      });
      setCategories(updatedCats);
      saveData('categories', updatedCats);
    }

    addNotification('Assets', `Transfer ${transferId} approved. Asset is now Available in Engineering.`);

    // Sync to backend (PUT /api/transfers/{id}/approve/)
    request('PUT', `/transfers/${transferId}/approve/`)
      .catch(err => console.error(`Failed to sync transfer approval ${transferId} to backend:`, err));
  };

  const rejectTransfer = (transferId: string) => {
    const today = new Date().toISOString().split('T')[0];
    const transfer = transfers.find(t => t.id === transferId);
    if (!transfer) return;

    const updatedTransfers = transfers.map(t => {
      if (t.id === transferId) {
        return { ...t, status: 'Rejected' as const };
      }
      return t;
    });
    setTransfers(updatedTransfers);
    saveData('transfers', updatedTransfers);

    const updatedAssets = assets.map(asset => {
      if (asset.id === transfer.assetId) {
        const history = [...asset.history];
        history.push({
          id: Math.random().toString(),
          date: today,
          type: 'Transfer Rejected',
          description: `Transfer request ${transferId} was rejected.`,
          performedBy: 'Keerthana Vinod'
        });
        return { ...asset, history, lastActivity: 'Just now' };
      }
      return asset;
    });
    setAssets(updatedAssets);
    saveData('assets', updatedAssets);

    addNotification('Assets', `Transfer ${transferId} was rejected.`);

    // Sync to backend (PUT /api/transfers/{id}/reject/)
    request('PUT', `/transfers/${transferId}/reject/`)
      .catch(err => console.error(`Failed to sync transfer rejection ${transferId} to backend:`, err));
  };

  const createBooking = (booking: Omit<Booking, 'id' | 'status'>) => {
    const today = new Date().toISOString().split('T')[0];
    
    // Check conflicts
    const conflict = bookings.find(b => {
      if (b.assetId !== booking.assetId || b.status === 'Cancelled') return false;
      const bStart = new Date(b.startDate).getTime();
      const bEnd = new Date(b.endDate).getTime();
      const newStart = new Date(booking.startDate).getTime();
      const newEnd = new Date(booking.endDate).getTime();
      
      return (newStart < bEnd && newEnd > bStart);
    });

    if (conflict) {
      return { 
        success: false, 
        error: `Booking conflict: This asset is already reserved by ${conflict.requesterName} between ${new Date(conflict.startDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} and ${new Date(conflict.endDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}.`
      };
    }

    const newBk: Booking = {
      ...booking,
      id: `bk-${bookings.length + 1}`,
      status: 'Confirmed'
    };

    const updated = [newBk, ...bookings];
    setBookings(updated);
    saveData('bookings', updated);

    // Update asset history
    const updatedAssets = assets.map(asset => {
      if (asset.id === booking.assetId) {
        const history = [...asset.history];
        history.push({
          id: Math.random().toString(),
          date: today,
          type: 'Booking',
          description: `Booked by ${booking.requesterName} for: ${booking.purpose}`,
          performedBy: booking.requesterName
        });
        return { ...asset, history, lastActivity: 'Just now' };
      }
      return asset;
    });
    setAssets(updatedAssets);
    saveData('assets', updatedAssets);

    addNotification('Bookings', `Reservation confirmed for asset ${booking.assetId} by ${booking.requesterName}.`);

    // Sync to backend (POST /api/bookings/)
    request('POST', '/bookings/', {
      asset_id: booking.assetId,
      start_time: booking.startDate,
      end_time: booking.endDate
    }).catch(err => console.error('Failed to sync booking to backend:', err));

    return { success: true };
  };

  const createMaintenance = (mt: Omit<Maintenance, 'id' | 'status' | 'createdDate'>) => {
    const today = new Date().toISOString().split('T')[0];
    const newId = `MR-${String(maintenance.length + 12).padStart(3, '0')}`;
    const newMt: Maintenance = {
      ...mt,
      id: newId,
      status: 'Requested',
      createdDate: today
    };

    const updated = [newMt, ...maintenance];
    setMaintenance(updated);
    saveData('maintenance', updated);

    // Update asset status to Maintenance & add history
    const updatedAssets = assets.map(asset => {
      if (asset.id === mt.assetId) {
        const history = [...asset.history];
        history.push({
          id: Math.random().toString(),
          date: today,
          type: 'Maintenance Request',
          description: `Maintenance ${newId} created: ${mt.issue}`,
          performedBy: 'Keerthana Vinod'
        });
        return { ...asset, status: 'Under Maintenance' as const, history, lastActivity: 'Just now' };
      }
      return asset;
    });
    setAssets(updatedAssets);
    saveData('assets', updatedAssets);

    addNotification('Maintenance', `New Maintenance ticket ${newId} raised for asset ${mt.assetId}.`);

    // Sync to backend (POST /api/maintenance/)
    request('POST', '/maintenance/', {
      asset_id: mt.assetId
    }).catch(err => console.error('Failed to sync maintenance request to backend:', err));
  };

  const updateMaintenanceStatus = (id: string, status: Maintenance['status']) => {
    const today = new Date().toISOString().split('T')[0];
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

    // If completed, move asset back to Available or Allocated
    const updatedAssets = assets.map(asset => {
      if (asset.id === ticket.assetId) {
        const history = [...asset.history];
        history.push({
          id: Math.random().toString(),
          date: today,
          type: 'Maintenance Update',
          description: `Maintenance ticket ${id} marked as ${status}`,
          performedBy: 'Keerthana Vinod'
        });
        
        let newStatus = asset.status;
        if (status === 'Completed') {
          newStatus = asset.assignedToId !== 'none' ? 'Allocated' : 'Available';
        }
        
        return { ...asset, status: newStatus, history, lastActivity: 'Just now' };
      }
      return asset;
    });
    setAssets(updatedAssets);
    saveData('assets', updatedAssets);

    addNotification('Maintenance', `Maintenance ticket ${id} has been marked as ${status}.`);

    // Sync to backend
    const statusStr = status as string;
    if (statusStr === 'Completed') {
      request('PUT', `/maintenance/${id}/complete/`, { resolution_notes: 'Resolved via UI completion' })
        .catch(err => console.error(`Failed to sync maintenance completion ${id} to backend:`, err));
    } else if (statusStr === 'Approved') {
      request('PUT', `/maintenance/${id}/approve/`)
        .catch(err => console.error(`Failed to sync maintenance approval ${id} to backend:`, err));
    } else if (statusStr === 'Rejected') {
      request('PUT', `/maintenance/${id}/reject/`)
        .catch(err => console.error(`Failed to sync maintenance rejection ${id} to backend:`, err));
    }
  };

  const submitAudit = (assetId: string, auditor: string, status: Audit['status'], notes?: string) => {
    const today = new Date().toISOString().split('T')[0];
    const newAudit: Audit = {
      id: `au-${audits.length + 1}`,
      assetId,
      auditorName: auditor,
      auditDate: today,
      status,
      notes
    };

    const updatedAudits = [newAudit, ...audits];
    setAudits(updatedAudits);
    saveData('audits', updatedAudits);

    // Update asset
    const updatedAssets = assets.map(asset => {
      if (asset.id === assetId) {
        const history = [...asset.history];
        history.push({
          id: Math.random().toString(),
          date: today,
          type: 'Audit Audit',
          description: `Asset audited: ${status}. Notes: ${notes || 'None'}`,
          performedBy: auditor
        });
        
        let newStatus = asset.status;
        if (status === 'Damaged') {
          newStatus = 'Under Maintenance';
        } else if (status === 'Missing') {
          newStatus = 'Retired';
        }
        
        return { ...asset, status: newStatus, history, lastActivity: 'Just now' };
      }
      return asset;
    });
    setAssets(updatedAssets);
    saveData('assets', updatedAssets);

    addNotification('Audits', `Audit complete for ${assetId}: Marked as ${status}.`);

    // Sync to backend (POST /api/audits/{id}/results/)
    request('POST', `/audits/1/results/`, {
      asset_id: assetId,
      result: status === 'Found' ? 'FOUND' : status === 'Missing' ? 'MISSING' : 'DAMAGED',
      notes: notes || ''
    }).catch(err => console.error('Failed to sync audit result to backend:', err));
  };

  const addNotification = (category: Notification['category'], message: string) => {
    const newNotif: Notification = {
      id: `n-${notifications.length + 1}`,
      category,
      message,
      timestamp: 'Just now',
      read: false
    };
    const updated = [newNotif, ...notifications];
    setNotifications(updated);
    saveData('notifications', updated);
  };

  const markNotificationRead = (id: string) => {
    const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n);
    setNotifications(updated);
    saveData('notifications', updated);

    // Sync to backend (PUT /api/notifications/{id}/read/)
    request('PUT', `/notifications/${id}/read/`)
      .catch(err => console.error(`Failed to sync notification read ${id} to backend:`, err));
  };

  const markAllNotificationsRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    saveData('notifications', updated);
  };

  const getAssetCategory = (asset: Asset) => categories.find(c => c.id === asset.categoryId);
  const getAssetDepartment = (asset: Asset) => departments.find(d => d.id === asset.departmentId);
  const getAssetEmployee = (asset: Asset) => employees.find(e => e.id === asset.assignedToId);

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
