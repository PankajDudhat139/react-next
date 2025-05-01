'use client';

import Link from 'next/link';
import { useAuth } from '../context/auth-context';

export default function Nav() {
  const { isAuthenticated, logout, isLoading } = useAuth();

  // Don't show nav when loading or not authenticated
  if (!isAuthenticated || isLoading) {
    return null;
  }

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link href="/" className="hover:text-blue-300 transition-colors">
            Home
          </Link>
          <Link href="/todo" className="hover:text-blue-300 transition-colors">
            Todo
          </Link>
        </div>
        <button 
          onClick={logout}
          className="px-3 py-1 bg-red-600 rounded text-white hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}