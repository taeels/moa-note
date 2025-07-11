'use client';

import React from 'react';
import Sidebar from './Sidebar';
import { WeekProvider } from '../context/WeekContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <WeekProvider>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        <aside className="w-64 bg-white dark:bg-gray-800 shadow-md">
          <Sidebar username="John Doe" />
        </aside>
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </WeekProvider>
  );
};

export default Layout;
