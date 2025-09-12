'use client';

import Link from "next/link";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      {/* Navigation Bar */}
      <header className="w-full bg-gray-100 shadow-md sticky top-0 z-50">
        <div className="flex flex-col sm:flex-row justify-between items-center py-4 px-5 gap-2 sm:gap-0">
          <div className="flex items-center gap-2">
            <Link href="/" className="no-underline">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                School Data Manager
              </h2>
            </Link>
          </div>
          <nav className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-4 text-sm sm:text-base">
            <Link href="/showSchools" className="no-underline text-gray-600 hover:text-blue-500">
              Show Schools
            </Link>
            <Link href="/addSchool" className="no-underline text-gray-600 hover:text-blue-500">
              Add School
            </Link>
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
              className="cursor-pointer text-gray-600"
            >
              <circle cx="12" cy="7" r="4" />
              <path d="M12 15a8 8 0 0 0-8 8H4a8 8 0 0 0 16 0z" />
            </svg>
          </nav>
        </div>
      </header>

      <main className="flex-grow pt-8 pb-10 px-5 bg-white">
        {children}
      </main>

      <footer className="w-full text-center py-4 text-sm text-gray-500 border-t bg-gray-100">
        <p>© {new Date().getFullYear()} School Data Manager. All rights reserved.</p>
      </footer>
    </SessionProvider>
  );
}
