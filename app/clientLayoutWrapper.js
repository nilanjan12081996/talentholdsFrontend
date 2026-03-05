'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import MobileSidebar from './ui/MobileSidebar';
import Header from './ui/header';
import Footer from './ui/footer';
import Sidebar from './ui/sidebar';
import Insideheader from './ui/insideheader';

const publicRoutes = [
  '/',
  '/about-us',
  '/contact',
  '/privacy-policy',
  '/support',
  '/cancellation-policy',
  '/pricing',
  '/how-it-works',
  '/features',
  '/privacy',
  '/faqs',
  '/featured-jobs',
  '/featured-job-details',
  '/forgot-password',
  '/terms-conditions',
  '/invite-students',
  '/loading-page',
  '/google-redirect',
];

const noLayoutRoutes = [
  '/forms/builder','/import'
];


export default function ClientLayoutWrapper({ children }) {
  const pathname = usePathname();

  const isPublicRoute =
    publicRoutes.includes(pathname) ||
    pathname.startsWith('/featured-job/') ||
    pathname.startsWith('/reset-password/');


  const isNoLayoutRoute =
    noLayoutRoutes.includes(pathname) ||
    pathname.startsWith('/forms/builder');

  // Public Layout
  if (isPublicRoute) {
    return (
      <main>
        <Header />
        {children}
        <Footer />
      </main>
    );
  }

  if (isNoLayoutRoute) {
    return <>{children}</>;
  }

  // Dashboard Layout
  return (
    <div className="flex bg-[#eff2f9] min-h-screen">
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Insideheader>
          {children}
        </Insideheader>
      </div>
    </div>
  );
}