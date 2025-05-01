'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from './components/Nav';
import LoadingSpinner from './components/LoadingSpinner';
import { AuthProvider, useAuth } from './context/auth-context';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// This component wraps the content and shows loading spinner when needed
function AppContent({ children }: { children: React.ReactNode }) {
  const { isLoading } = useAuth();
  
  return (
    <>
      <Nav />
      <main className="container mx-auto p-4">
        {children}
      </main>
      {isLoading && <LoadingSpinner />}
    </>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <AppContent>
            {children}
          </AppContent>
        </AuthProvider>
      </body>
    </html>
  );
}