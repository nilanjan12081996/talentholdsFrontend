'use client';

import React, { useState } from 'react';
import Sidebar from './sidebar';
import MobileSidebar from './MobileSidebar';
import TopBar from './TopBar'; 

const Insideheader = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            <p className='text-text-secondary text-[14px] font-medium'>Pages / Dashboard</p>
            <h2 className="text-xl lg:text-[30px] font-bold text-text-primary tracking-tight">
              Main Dashboard
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