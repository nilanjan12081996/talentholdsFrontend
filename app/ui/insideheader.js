'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './sidebar';
import MobileSidebar from './MobileSidebar';
import TopBar from './TopBar'; 

const Insideheader = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  // Helper to format breadcrumbs and page titles dynamically
  const getHeaderInfo = (path) => {
    const cleanPath = path.split('?')[0].replace(/\/$/, ''); // Remove query parameters & trailing slash
    
    // Explicit exact path overrides
    const overrides = {
      '/dashboard': { title: 'Main Dashboard', breadcrumb: 'Pages / Dashboard' },
      '/profile': { title: 'Profile Settings', breadcrumb: 'Pages / Profile' },
      '/forms': { title: 'My Forms', breadcrumb: 'Pages / Forms' },
      '/forms/builder': { title: 'Form Builder', breadcrumb: 'Pages / Forms / Builder' },
      '/candidates': { title: 'Candidates Management', breadcrumb: 'Pages / Candidates' },
      '/inbox': { title: 'Inbox Messages', breadcrumb: 'Pages / Inbox' },
      '/workspace': { title: 'Workspaces', breadcrumb: 'Pages / Workspace' },
    };

    if (overrides[cleanPath]) {
      return overrides[cleanPath];
    }

    // Dynamic parser fallback for arbitrary subroutes
    const segments = cleanPath.split('/').filter(Boolean);
    if (segments.length === 0) {
      return { title: 'Main Dashboard', breadcrumb: 'Pages / Dashboard' };
    }

    const formatSegment = (s) => s.split(/[-_]+/).map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    const title = formatSegment(segments[segments.length - 1]);
    const breadcrumb = 'Pages / ' + segments.map(formatSegment).join(' / ');

    return { title, breadcrumb };
  };

  const { title: pageTitle, breadcrumb: breadcrumbText } = getHeaderInfo(pathname);

  return (
    <div className="flex min-h-screen bg-bg-main font-sans text-text-primary">
      <Sidebar />
      <MobileSidebar 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
      />

      <main className="flex-1 p-4 md:p-8 overflow-y-auto max-h-screen flex flex-col w-full relative">
        <div className="lg:flex justify-between items-center mb-10 w-full">
          <div className='mb-4 lg:mb-0'>
            <p className='text-text-secondary text-[14px] font-medium'>{breadcrumbText}</p>
            <h2 className="text-xl lg:text-[30px] font-bold text-text-primary tracking-tight">
              {pageTitle}
            </h2>
          </div>
          <TopBar onMenuClick={() => setIsMobileMenuOpen(true)} />
        </div>

        {children}
      </main>
    </div>
  );
};

export default Insideheader;