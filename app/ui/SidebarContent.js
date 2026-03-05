'use client';

import { LayoutGrid, FileText, Users, Inbox, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function SidebarContent({ onLinkClick }) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', icon: LayoutGrid, path: '/dashboard' },
    { name: 'Forms', icon: FileText, path: '/forms' },
    { name: 'Candidates', icon: Users, path: '/candidates' },
    { name: 'Inbox', icon: Inbox, path: '/inbox' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <>
      <div className="h-[130px] flex items-center px-8 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-[30px] h-[32px] bg-gradient-to-b from-[#DA1967] to-[#FB511A] rounded flex items-center justify-center text-white font-bold text-lg">
            H
          </div>
          <span className="text-[28px] font-bold text-[#360569] dark:text-white leading-none tracking-tight">
            Talent<span className="font-normal">HOLD</span>
          </span>
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-2 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.path);
          return (
            <Link
              key={item.name}
              href={item.path}
              onClick={onLinkClick}
              className={clsx(
                "relative flex items-center h-[50px] px-8 transition-colors group shrink-0",
                isActive
                  ? "text-[#2b3674] dark:text-white"
                  : "text-[#a3aed0] hover:text-[#2b3674] dark:hover:text-white"
              )}
            >
              {isActive && (
                <div className="absolute right-0 top-0 bottom-0 w-[4px] bg-[#8624f0] rounded-l-full" />
              )}
              <item.icon className={clsx(
                "w-5 h-5 mr-4 transition-colors",
                isActive
                  ? "text-[#8624f0]"
                  : "text-[#a3aed0] group-hover:text-[#2b3674] dark:group-hover:text-white"
              )} />
              <span className={clsx("text-lg", isActive ? "font-semibold" : "font-medium")}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>

      <div className="p-8 mt-auto shrink-0">
        <div className="relative rounded-[24px] p-6 text-center overflow-hidden bg-gradient-to-br from-[#A676FF] to-[#8624F0] shadow-lg">
          <div className="absolute -top-12 -left-12 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="w-[60px] h-[60px] mx-auto bg-white/20 rounded-full flex items-center justify-center mb-3 border-[4px] border-white/30 backdrop-blur-sm relative z-10">
            <div className="w-8 h-8 bg-gradient-to-b from-white to-white/50 rounded-full" />
          </div>
          <h3 className="text-white font-bold text-lg mb-1 relative z-10">Upgrade to PRO</h3>
          <p className="text-[#e9edf7] text-sm font-medium leading-tight relative z-10">to get access to all premium features!</p>
        </div>
      </div>
    </>
  );
}