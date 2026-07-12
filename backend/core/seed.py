from sqlalchemy.orm import Session
from core import models

def seed_db(db: Session):
    # Check if we already have data
    if db.query(models.Department).first():
        return

    # Seed Departments
    departments = [
        models.Department(id='d-1', name='AI Department', code='AIDEPT', manager='Dr. Sarah Jenkins', employeeCount=15, budget='₹45,00,000'),
        models.Department(id='d-2', name='Engineering', code='ENG', manager='Marcus Vance', employeeCount=42, budget='₹95,00,000'),
        models.Department(id='d-3', name='Product Management', code='PM', manager='Elena Rostova', employeeCount=8, budget='₹20,00,000'),
        models.Department(id='d-4', name='Operations', code='OPS', manager='Rajesh Kumar', employeeCount=24, budget='₹35,00,000'),
        models.Department(id='d-5', name='Sales & Marketing', code='SALES', manager='Sneha Patel', employeeCount=18, budget='₹30,00,000'),
    ]
    for d in departments:
        db.add(d)

    # Seed Employees
    employees = [
        models.Employee(id='e-1', name='Keerthana Vinod', email='keerthana.v@assetflow.ai', role='Asset Manager', departmentId='d-1', activeAssetsCount=2),
        models.Employee(id='e-2', name='Priya Sharma', email='priya.s@assetflow.ai', role='Lead ML Engineer', departmentId='d-1', activeAssetsCount=1),
        models.Employee(id='e-3', name='Arjun Kapoor', email='arjun.k@assetflow.ai', role='Product Designer', departmentId='d-3', activeAssetsCount=1),
        models.Employee(id='e-4', name='Rajesh Kumar', email='rajesh.k@assetflow.ai', role='Operations Director', departmentId='d-4', activeAssetsCount=1),
        models.Employee(id='e-5', name='Sneha Patel', email='sneha.p@assetflow.ai', role='Marketing Lead', departmentId='d-5', activeAssetsCount=1),
        models.Employee(id='e-6', name='Amit Mishra', email='amit.m@assetflow.ai', role='Senior Software Engineer', departmentId='d-2', activeAssetsCount=1),
    ]
    for e in employees:
        db.add(e)

    # Seed Categories
    categories = [
        models.Category(id='c-1', name='Laptops', description='Enterprise work computers (Mac, Dell, ThinkPad)', totalAssets=6, allocatedAssets=5),
        models.Category(id='c-2', name='Monitors', description='High-res desk displays (4K, UltraSharp)', totalAssets=3, allocatedAssets=2),
        models.Category(id='c-3', name='Mobile', description='Testing and management phones (iOS, Android)', totalAssets=2, allocatedAssets=0),
        models.Category(id='c-4', name='Server', description='GPU compute clusters and storage nodes', totalAssets=2, allocatedAssets=1),
        models.Category(id='c-5', name='Vehicle', description='Corporate logistics and electric vehicles', totalAssets=1, allocatedAssets=1),
    ]
    for c in categories:
        db.add(c)

    db.commit()

    # Seed Assets
    assets = [
        models.Asset(
            id='AST-001',
            name='Dell Latitude 5440',
            categoryId='c-1',
            departmentId='d-1',
            assignedToId='e-1',
            status='Allocated',
            purchaseDate='2026-01-12',
            purchaseValue=75000.0,
            lastActivity='2 minutes ago',
            serialNumber='CN-0ABCDE-12345-678-90GP',
            notes='Configured with 32GB RAM and 1TB SSD.',
            history=[
                {'id': 'h1', 'date': '2026-01-12', 'type': 'Registration', 'description': 'Registered in the system', 'performedBy': 'Keerthana Vinod'},
                {'id': 'h2', 'date': '2026-01-12', 'type': 'Allocation', 'description': 'Allocated to Keerthana Vinod', 'performedBy': 'Keerthana Vinod'}
            ],
            attachments=[
                {'name': 'purchase_invoice_AST001.pdf', 'size': '1.2 MB', 'date': '2026-01-12'},
                {'name': 'setup_checklist.docx', 'size': '340 KB', 'date': '2026-01-13'}
            ]
        ),
        models.Asset(
            id='AST-002',
            name='MacBook Pro M3 Max',
            categoryId='c-1',
            departmentId='d-1',
            assignedToId='e-2',
            status='Allocated',
            purchaseDate='2026-02-15',
            purchaseValue=180000.0,
            lastActivity='1 hour ago',
            serialNumber='C02F1234Q05D',
            notes='16-core CPU, 40-core GPU, 48GB Unified Memory.',
            history=[
                {'id': 'h3', 'date': '2026-02-15', 'type': 'Registration', 'description': 'Registered in the system', 'performedBy': 'Keerthana Vinod'},
                {'id': 'h4', 'date': '2026-02-16', 'type': 'Allocation', 'description': 'Allocated to Priya Sharma', 'performedBy': 'Keerthana Vinod'}
            ],
            attachments=[]
        ),
        models.Asset(
            id='AST-003',
            name='Dell UltraSharp 27 Monitor',
            categoryId='c-2',
            departmentId='d-1',
            assignedToId='e-1',
            status='Allocated',
            purchaseDate='2026-01-12',
            purchaseValue=35000.0,
            lastActivity='3 days ago',
            serialNumber='MX-045612-987',
            history=[
                {'id': 'h5', 'date': '2026-01-12', 'type': 'Registration', 'description': 'Registered in the system', 'performedBy': 'Keerthana Vinod'},
                {'id': 'h6', 'date': '2026-01-12', 'type': 'Allocation', 'description': 'Allocated to Keerthana Vinod', 'performedBy': 'Keerthana Vinod'}
            ],
            attachments=[]
        ),
        models.Asset(
            id='AST-004',
            name='iPhone 15 Pro Max',
            categoryId='c-3',
            departmentId='d-3',
            assignedToId='none',
            status='Available',
            purchaseDate='2026-03-01',
            purchaseValue=120000.0,
            lastActivity='1 week ago',
            serialNumber='DNPGK902L0P',
            history=[
                {'id': 'h7', 'date': '2026-03-01', 'type': 'Registration', 'description': 'Registered in the system', 'performedBy': 'Keerthana Vinod'}
            ],
            attachments=[]
        ),
        models.Asset(
            id='AST-005',
            name='HP EliteDesk Compute Node',
            categoryId='c-4',
            departmentId='d-2',
            assignedToId='none',
            status='Under Maintenance',
            purchaseDate='2025-11-20',
            purchaseValue=250000.0,
            lastActivity='42 minutes ago',
            serialNumber='SGH51293K2',
            history=[
                {'id': 'h8', 'date': '2025-11-20', 'type': 'Registration', 'description': 'Registered in the system', 'performedBy': 'System'},
                {'id': 'h9', 'date': '2026-07-12', 'type': 'Maintenance', 'description': 'Maintenance MR-012 raised: Fan noise and high temperatures', 'performedBy': 'Amit Mishra'}
            ],
            attachments=[]
        ),
        models.Asset(
            id='AST-006',
            name='Tesla Model 3 Long Range',
            categoryId='c-5',
            departmentId='d-4',
            assignedToId='e-4',
            status='Allocated',
            purchaseDate='2025-08-10',
            purchaseValue=3500000.0,
            lastActivity='Yesterday',
            serialNumber='5YJ3E1EB9LF123456',
            history=[
                {'id': 'h10', 'date': '2025-08-10', 'type': 'Registration', 'description': 'Registered in the system', 'performedBy': 'System'},
                {'id': 'h11', 'date': '2025-08-12', 'type': 'Allocation', 'description': 'Allocated to Rajesh Kumar (Ops)', 'performedBy': 'Admin'}
            ],
            attachments=[]
        ),
        models.Asset(
            id='AST-007',
            name='Lenovo ThinkPad X1 Carbon Gen 11',
            categoryId='c-1',
            departmentId='d-2',
            assignedToId='e-6',
            status='Allocated',
            purchaseDate='2026-04-05',
            purchaseValue=110000.0,
            lastActivity='4 days ago',
            serialNumber='PF4182K9',
            history=[
                {'id': 'h12', 'date': '2026-04-05', 'type': 'Registration', 'description': 'Registered in the system', 'performedBy': 'Keerthana Vinod'},
                {'id': 'h13', 'date': '2026-04-05', 'type': 'Allocation', 'description': 'Allocated to Amit Mishra', 'performedBy': 'Keerthana Vinod'}
            ],
            attachments=[]
        ),
        models.Asset(
            id='AST-008',
            name='Samsung Galaxy S24 Ultra',
            categoryId='c-3',
            departmentId='d-5',
            assignedToId='none',
            status='Retired',
            purchaseDate='2024-03-10',
            purchaseValue=85000.0,
            lastActivity='2 weeks ago',
            serialNumber='RF9X8102381',
            history=[
                {'id': 'h14', 'date': '2024-03-10', 'type': 'Registration', 'description': 'Registered in the system', 'performedBy': 'Admin'},
                {'id': 'h15', 'date': '2026-06-01', 'type': 'Retirement', 'description': 'Retired: Broken screen and battery degradation', 'performedBy': 'Keerthana Vinod'}
            ],
            attachments=[]
        ),
        models.Asset(
            id='AST-009',
            name='ASUS ROG Zephyrus G14 (GPU Cluster Mock)',
            categoryId='c-4',
            departmentId='d-2',
            assignedToId='none',
            status='Available',
            purchaseDate='2026-03-20',
            purchaseValue=160000.0,
            lastActivity='1 week ago',
            serialNumber='L8N0CV01832',
            history=[
                {'id': 'h16', 'date': '2026-03-20', 'type': 'Registration', 'description': 'Registered in the system', 'performedBy': 'Keerthana Vinod'}
            ],
            attachments=[]
        ),
        models.Asset(
            id='AST-010',
            name='LG UltraFine 5K Display',
            categoryId='c-2',
            departmentId='d-5',
            assignedToId='e-5',
            status='Allocated',
            purchaseDate='2025-06-15',
            purchaseValue=95000.0,
            lastActivity='5 days ago',
            serialNumber='906NTKR09812',
            history=[
                {'id': 'h17', 'date': '2025-06-15', 'type': 'Registration', 'description': 'Registered in system', 'performedBy': 'Admin'},
                {'id': 'h18', 'date': '2025-06-16', 'type': 'Allocation', 'description': 'Allocated to Sneha Patel', 'performedBy': 'Admin'}
            ],
            attachments=[]
        )
    ]
    for a in assets:
        db.add(a)

    # Seed Allocations
    allocations = [
        models.Allocation(id='al-1', assetId='AST-001', employeeId='e-1', allocatedDate='2026-01-12', status='Active'),
        models.Allocation(id='al-2', assetId='AST-002', employeeId='e-2', allocatedDate='2026-02-16', status='Active'),
        models.Allocation(id='al-3', assetId='AST-003', employeeId='e-1', allocatedDate='2026-01-12', status='Active'),
        models.Allocation(id='al-4', assetId='AST-006', employeeId='e-4', allocatedDate='2025-08-12', status='Active'),
        models.Allocation(id='al-5', assetId='AST-007', employeeId='e-6', allocatedDate='2026-04-05', status='Active'),
        models.Allocation(id='al-6', assetId='AST-010', employeeId='e-5', allocatedDate='2025-06-16', status='Active'),
    ]
    for al in allocations:
        db.add(al)

    # Seed Transfers
    transfers = [
        models.Transfer(id='TR-024', assetId='AST-001', fromDepartmentId='d-1', toDepartmentId='d-2', status='Approved', requestedDate='2026-07-12', approvedDate='2026-07-12', requestedBy='Keerthana Vinod'),
        models.Transfer(id='TR-025', assetId='AST-004', fromDepartmentId='d-3', toDepartmentId='d-1', status='Pending', requestedDate='2026-07-12', requestedBy='Arjun Kapoor')
    ]
    for t in transfers:
        db.add(t)

    # Seed Bookings
    bookings = [
        models.Booking(id='bk-1', assetId='AST-004', requesterName='Arjun Kapoor', startDate='2026-07-15T09:00', endDate='2026-07-15T17:00', purpose='UI testing sessions', status='Confirmed'),
        models.Booking(id='bk-2', assetId='AST-009', requesterName='Priya Sharma', startDate='2026-07-18T10:30', endDate='2026-07-18T12:30', purpose='ML Model Inference validation', status='Confirmed')
    ]
    for b in bookings:
        db.add(b)

    # Seed Maintenance
    maintenance = [
        models.Maintenance(id='MR-012', assetId='AST-005', issue='Fan noise and thermal throttling on high CPU load.', priority='High', status='In Progress', assignedTechnician='Alex Mercer', createdDate='2026-07-12'),
        models.Maintenance(id='MR-013', assetId='AST-001', issue='Keyboard key sticky (Enter key)', priority='Low', status='Requested', assignedTechnician='None', createdDate='2026-07-11')
    ]
    for m in maintenance:
        db.add(m)

    # Seed Audits
    audits = [
        models.Audit(id='au-1', assetId='AST-001', auditorName='Keerthana Vinod', auditDate='2026-07-10', status='Found', notes='Asset in pristine condition.'),
        models.Audit(id='au-2', assetId='AST-003', auditorName='Keerthana Vinod', auditDate='2026-07-10', status='Found')
    ]
    for au in audits:
        db.add(au)

    # Seed Notifications
    notifications = [
        models.Notification(id='n-1', category='Assets', message='Asset AST-001 has been successfully allocated to Keerthana Vinod.', timestamp='2 minutes ago', read=False),
        models.Notification(id='n-2', category='Maintenance', message='Maintenance ticket MR-012 is now In Progress.', timestamp='18 minutes ago', read=False),
        models.Notification(id='n-3', category='Assets', message='Transfer TR-024 approved for AI Department → Engineering.', timestamp='42 minutes ago', read=True),
        models.Notification(id='n-4', category='System', message='Weekly data backup completed successfully.', timestamp='2 hours ago', read=True)
    ]
    for n in notifications:
        db.add(n)

    db.commit()
