import { Bell, User } from 'lucide-react';

export function Topbar() {
  return (
    <header className="h-16 bg-white border-b flex items-center justify-end px-6 sticky top-0 z-10 shadow-sm">
      <div className="flex items-center space-x-4">
        <button className="text-gray-500 hover:text-gray-700">
          <Bell className="w-5 h-5" />
        </button>
        <div className="flex items-center space-x-2 border-l pl-4">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            <User className="w-5 h-5 text-gray-500" />
          </div>
          <span className="text-sm font-medium text-gray-700">Admin User</span>
        </div>
      </div>
    </header>
  );
}
