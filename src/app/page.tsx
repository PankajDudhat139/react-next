'use client';

import { useAuth } from './context/auth-context';

export default function Home() {
  const { isAuthenticated, isLoading } = useAuth();

  // Don't render anything if not authenticated or still loading
  if (!isAuthenticated || isLoading) {
    return null; // The auth provider will handle redirecting
  }

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to Your Todo App</h1>
      <p className="mb-4">
        You have successfully logged in to the application. Use the navigation to access your todo list.
      </p>
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h2 className="text-xl font-semibold mb-2">Quick Tips</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>Click on the Todo link in the navigation to manage your tasks</li>
          <li>Use the logout button when you`re done</li>
          <li>All routes are protected and require authentication</li>
        </ul>
      </div>
    </div>
  );
}