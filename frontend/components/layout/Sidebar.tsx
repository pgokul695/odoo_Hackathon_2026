import Link from 'next/link';

export function Sidebar() {
  const groups = [
    {
      title: 'Authentication',
      links: [{ name: 'Login', href: '/login' }, { name: 'Signup', href: '/signup' }]
    },
    {
      title: 'Dashboard',
      links: [{ name: 'Dashboard', href: '/dashboard' }]
    },
    {
      title: 'Organization',
      links: [
        { name: 'Departments', href: '/departments' },
        { name: 'Employees', href: '/employees' },
        { name: 'Categories', href: '/categories' }
      ]
    },
    {
      title: 'Assets',
      links: [{ name: 'Asset List', href: '/assets' }]
    },
    {
      title: 'Operations',
      links: [
        { name: 'Allocations', href: '/allocations' },
        { name: 'Bookings', href: '/bookings' },
        { name: 'Maintenance', href: '/maintenance' }
      ]
    },
    {
      title: 'Governance',
      links: [{ name: 'Audits', href: '/audits' }]
    },
    {
      title: 'Reports',
      links: [{ name: 'Reports', href: '/reports' }]
    },
    {
      title: 'Notifications',
      links: [{ name: 'Notifications', href: '/notifications' }]
    },
    {
      title: 'Settings',
      links: [{ name: 'Settings', href: '/settings' }]
    }
  ];

  return (
    <aside className="w-64 bg-gray-900 text-gray-300 h-screen overflow-y-auto flex-shrink-0">
      <div className="p-4 text-xl font-bold text-white tracking-wider border-b border-gray-800">
        AssetFlow
      </div>
      <nav className="p-4 space-y-6">
        {groups.map((g) => (
          <div key={g.title}>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              {g.title}
            </h3>
            <ul className="space-y-1">
              {g.links.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="block px-3 py-2 rounded-md hover:bg-gray-800 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}
