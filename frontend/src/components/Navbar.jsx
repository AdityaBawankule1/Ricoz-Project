import React from 'react';
import { Link } from 'react-router-dom';

function Navbar({ currentUser, onLogout }) {
  const initials = currentUser?.name
    ? currentUser.name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase()
    : 'KP';

  return (
    <div>
      <nav className="bg-white border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3 w-1/4 justify-start">
              <Link to="/" className="flex items-center gap-2">
                <svg className="h-8 w-8 text-indigo-600 dark:text-indigo-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
                <span className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">
                  Kind Paws
                </span>
              </Link>
            </div>

            <div className="hidden md:flex items-center justify-center gap-6 flex-1">
              <Link to="/trainers" className="text-gray-900 dark:text-white font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Find A Specialist
              </Link>
              <Link to="/booking" className="text-gray-500 dark:text-gray-400 font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Book a Visit
              </Link>
              <Link to="/services" className="text-gray-500 dark:text-gray-400 font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Services
              </Link>
              <Link to="/about" className="text-gray-500 dark:text-gray-400 font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="text-gray-500 dark:text-gray-400 font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Contact
              </Link>
            </div>

            <div className="flex items-center justify-end gap-4 w-1/4">
              <div className="flex items-center justify-center h-9 w-9 rounded-full bg-indigo-600 text-white font-semibold text-sm shadow-sm select-none">
                {initials}
              </div>

              <div className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-200">
                {currentUser?.name || 'Pet Owner'}
              </div>

              <button
                type="button"
                onClick={onLogout}
                className="text-sm font-medium text-gray-600 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-400 transition-colors cursor-pointer"
              >
                Sign out
              </button>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
