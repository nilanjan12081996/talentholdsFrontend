// 'use client';

// import { useState } from 'react';
// import { usePathname } from 'next/navigation';
// import MobileSidebar from './ui/MobileSidebar';
// import Header from './ui/header';
// import Footer from './ui/footer';
// import Sidebar from './ui/sidebar';
// import Insideheader from './ui/insideheader';

// const publicRoutes = [
//   '/',
//   '/about-us',
//   '/contact',
//   '/privacy-policy',
//   '/support',
//   '/cancellation-policy',
//   '/pricing',
//   '/how-it-works',
//   '/features',
//   '/privacy',
//   '/faqs',
//   '/featured-jobs',
//   '/featured-job-details',
//   '/forgot-password',
//   '/terms-conditions',
//   '/invite-students',
//   '/loading-page',
//   '/google-redirect',
  
// ];

// const noLayoutRoutes = [
//   '/forms/builder','/import'
// ];


// export default function ClientLayoutWrapper({ children }) {
//   const pathname = usePathname();

//   const isPublicRoute =
//     publicRoutes.includes(pathname) ||
//     pathname.startsWith('/featured-job/') ||
//     pathname.startsWith('/reset-password/');


//   const isNoLayoutRoute =
//     noLayoutRoutes.includes(pathname) ||
//     pathname.startsWith('/forms/builder');

//   // Public Layout
//   if (isPublicRoute) {
//     return (
//       <main>
//         <Header />
//         {children}
//         <Footer />
//       </main>
//     );
//   }

//   if (isNoLayoutRoute) {
//     return <>{children}</>;
//   }

//   // Dashboard Layout
//   return (
//     <div className="flex bg-[#eff2f9] min-h-screen">
//       {/* Main Content */}
//       <div className="flex-1 flex flex-col min-w-0">
//         <Insideheader>
//           {children}
//         </Insideheader>
//       </div>
//     </div>
//   );
// }



'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Header from './ui/header';
import Footer from './ui/footer';
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
  '/terms-conditions',
  '/invite-students',
  '/loading-page',
  '/google-redirect',
];

// Routes with zero layout (no header, no footer, no sidebar)
const noLayoutRoutes = [
  '/login',
  '/signup',
  '/forgot-password',
  '/forms/builder',
  '/import',
];

export default function ClientLayoutWrapper({ children }) {
  const pathname = usePathname();
  const [token, setToken] = useState(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    // Read token from localStorage (or cookie) on client mount
    const storedToken =
      localStorage.getItem('talent_hold_token') || sessionStorage.getItem('talent_hold_token') || null;
    setToken(storedToken);
    setHydrated(true);
  }, [pathname]); // re-check on every route change

  const isNoLayoutRoute =
    noLayoutRoutes.includes(pathname) ||
    pathname.startsWith('/forms/builder');

  const isPublicRoute =
    publicRoutes.includes(pathname) ||
    pathname.startsWith('/featured-job/') ||
    pathname.startsWith('/reset-password/');

  // Avoid flash of wrong layout before hydration
  if (!hydrated) return null;

  // 1. No layout at all — login, signup, forgot-password, builder, etc.
  if (isNoLayoutRoute) {
    return <>{children}</>;
  }

  // 2. Authenticated dashboard layout — InsideHeader + Sidebar (no Footer)
  if (token) {
    return (
      <div className="flex bg-[#eff2f9] min-h-screen">
        <div className="flex-1 flex flex-col min-w-0">
          <Insideheader>
            {children}
          </Insideheader>
        </div>
      </div>
    );
  }

  // 3. Public pages — Outside Header + Footer, no sidebar
  if (isPublicRoute) {
    return (
      <main>
        <Header />
        {children}
        <Footer />
      </main>
    );
  }

  // 4. Fallback for any other unauthenticated route — public layout
  return (
    <main>
      <Header />
      {children}
      <Footer />
    </main>
  );
}