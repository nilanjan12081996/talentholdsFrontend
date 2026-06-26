'use client';

import { LayoutGrid, FileText, Users, Inbox, Settings, Briefcase, ChevronLeft, ChevronRight, CreditCard, History } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

export default function SidebarContent({ onLinkClick, isExpanded = true, setIsExpanded }) {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', icon: LayoutGrid, path: '/dashboard' },
    { name: 'Forms', icon: FileText, path: '/forms' },
    { name: 'Workspaces', icon: Briefcase, path: '/workspace' },
    { name: 'Candidates', icon: Users, path: '/candidates' },
    { name: 'Inbox', icon: Inbox, path: '/inbox' },
    { name: 'Plans', icon: CreditCard, path: '/plans' },
    { name: 'Transactions', icon: History, path: '/transactions' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <>
      <div className={`h-[130px] flex items-center shrink-0 relative transition-all duration-300 ${isExpanded ? 'px-8' : 'px-0 justify-center'}`}>
        <div className="flex items-center gap-3">
          <div className="w-[30px] h-[32px] shrink-0 bg-gradient-to-b from-[#DA1967] to-[#FB511A] rounded flex items-center justify-center text-white font-bold text-lg">
            H
          </div>
          {isExpanded && (
            <span className="text-[28px] font-bold text-[#360569] dark:text-white leading-none tracking-tight whitespace-nowrap overflow-hidden transition-all duration-300">
              Talent<span className="font-normal">HOLD</span>
            </span>
          )}
        </div>
        
        {/* Toggle Button - only show on desktop where setIsExpanded is passed */}
        {setIsExpanded && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="cursor-pointer absolute -right-[14px] top-[50px] bg-white border border-border-color shadow-sm rounded-full p-1 text-text-secondary hover:text-[#8624f0] z-50 transition-colors"
          >
            {isExpanded ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>
        )}
      </div>

      <div className="flex-1 flex flex-col gap-2 overflow-y-auto overflow-x-hidden">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.path);
          return (
            <Link
              key={item.name}
              href={item.path}
              onClick={onLinkClick}
              className={clsx(
                "relative flex items-center h-[50px] transition-all duration-300 group shrink-0",
                isExpanded ? "px-8" : "px-0 justify-center",
                isActive
                  ? "text-[#2b3674] dark:text-white"
                  : "text-[#a3aed0] hover:text-[#2b3674] dark:hover:text-white"
              )}
              title={!isExpanded ? item.name : undefined}
            >
              {isActive && (
                <div className="absolute right-0 top-0 bottom-0 w-[4px] bg-[#8624f0] rounded-l-full" />
              )}
              <item.icon className={clsx(
                "w-5 h-5 transition-colors shrink-0",
                isExpanded ? "mr-4" : "mr-0",
                isActive
                  ? "text-[#8624f0]"
                  : "text-[#a3aed0] group-hover:text-[#2b3674] dark:group-hover:text-white"
              )} />
              {isExpanded && (
                <span className={clsx("text-lg whitespace-nowrap overflow-hidden transition-all duration-300", isActive ? "font-semibold" : "font-medium")}>
                  {item.name}
                </span>
              )}
            </Link>
          );
        })}
      </div>


    </>
  );
}