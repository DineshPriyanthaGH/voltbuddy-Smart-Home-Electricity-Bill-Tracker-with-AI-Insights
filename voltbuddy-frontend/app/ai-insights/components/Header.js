import React from 'react';
import Link from 'next/link';
import { HomeIcon, HistoryIcon, SettingsIcon, MenuIcon } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="h-8 w-8 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-blue-600">
              VoltBuddy
            </span>
          </div>
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink
              href="/dashboard"
              icon={<HomeIcon size={18} />}
              label="Dashboard"
              active={false}
            />
            <NavLink
              href="/appliance-management"
              icon={<SettingsIcon size={18} />}
              label="Appliance Management"
              active={false}
            />
            <NavLink
              href="/bill-history"
              icon={<HistoryIcon size={18} />}
              label="Bill History"
              active={false}
            />
            <NavLink
              href="/ai-insights"
              icon={<HomeIcon size={18} />}
              label="AI Insights"
              active={true}
            />
          </nav>
          <div className="flex items-center md:hidden">
            <button className="text-gray-500 hover:text-gray-700">
              <MenuIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

// NavLink uses Next.js Link for client-side routing
function NavLink({ href, icon, label, active }) {
  return (
    <Link
      href={href}
      className={`flex items-center text-sm font-medium ${
        active
          ? 'text-blue-600 border-b-2 border-blue-600'
          : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
      }`}
    >
      <span className="mr-2">{icon}</span>
      {label}
    </Link>
  );
}
