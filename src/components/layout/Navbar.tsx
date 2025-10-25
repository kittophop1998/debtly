// Main Navigation Component

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '../ui';
import { useAuth } from '../../hooks';
import { useSidebar } from '../../store';
import { ROUTES } from '../../lib/constants';

const Navbar: React.FC = () => {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuth();
  const sidebar = useSidebar();

  const navigation = [
    { name: 'Home', href: ROUTES.HOME },
    { name: 'Activities', href: ROUTES.ACTIVITIES },
    { name: 'Search', href: ROUTES.SEARCH },
  ];

  const isActive = (href: string) => {
    if (href === ROUTES.HOME) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and main navigation */}
          <div className="flex">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href={ROUTES.HOME} className="text-2xl font-bold text-teal-600 hover:text-teal-700 transition-colors">
                WeGoWhere
              </Link>
            </div>

            {/* Desktop navigation */}
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${
                    isActive(item.href)
                      ? 'border-teal-500 text-slate-900'
                      : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
                  } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors duration-200`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                {/* Create Activity Button */}
                <Link href={ROUTES.CREATE_ACTIVITY}>
                  <Button
                    variant="primary"
                    size="sm"
                  >
                    Create Activity
                  </Button>
                </Link>

                {/* User Menu */}
                <div className="relative flex items-center space-x-3">
                  {/* Notifications */}
                  <button className="p-2 text-slate-400 hover:text-teal-600 transition-colors">
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-3.5-3.5M9 17H4l3.5-3.5M15 7h5l-3.5 3.5M9 7H4l3.5 3.5" />
                    </svg>
                  </button>

                  {/* Profile dropdown */}
                  <div className="flex items-center space-x-2">
                    <Link
                      href={ROUTES.PROFILE}
                      className="flex items-center space-x-2 p-2 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white text-sm font-medium">
                        {user?.displayName?.charAt(0)?.toUpperCase() || 'U'}
                      </div>
                      <span className="hidden sm:block text-sm font-medium text-slate-700">
                        {user?.displayName}
                      </span>
                    </Link>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleLogout}
                      className="text-slate-500 hover:text-slate-700"
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href={ROUTES.LOGIN}>
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href={ROUTES.REGISTER}>
                  <Button variant="primary" size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile menu button */}
            <button
              onClick={sidebar.toggle}
              className="sm:hidden p-2 rounded-md text-slate-400 hover:text-slate-500 hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-teal-500"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {sidebar.isOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1 bg-white border-t border-slate-200">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={sidebar.close}
                className={`${
                  isActive(item.href)
                    ? 'bg-teal-50 border-teal-500 text-teal-700'
                    : 'border-transparent text-slate-500 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-700'
                } block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors duration-200`}
              >
                {item.name}
              </Link>
            ))}
            
            {isAuthenticated && (
              <Link
                href={ROUTES.CREATE_ACTIVITY}
                onClick={sidebar.close}
                className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-slate-500 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-700 text-base font-medium"
              >
                Create Activity
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;