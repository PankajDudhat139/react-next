'use client';

import Link from 'next/link';
import { useAuth } from '../context/auth-context';
import { useCart } from '../context/cart-context';

export default function Nav() {
  const { user, logout } = useAuth();
  const { getCartCount } = useCart();
  const cartItemCount = getCartCount();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-blue-600">
            MyShop
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link href="/products" className="text-gray-700 hover:text-blue-600">
              Products
            </Link>
            
            {/* Cart Icon with Count */}
            <Link href="/cart" className="relative">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                className="text-gray-700"
              >
                <circle cx="8" cy="21" r="1"></circle>
                <circle cx="19" cy="21" r="1"></circle>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-semibold w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItemCount}
                </span>
              )}
            </Link>
            
            {/* User Authentication Section */}
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Hello, {user.displayName || user.email}</span>
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}