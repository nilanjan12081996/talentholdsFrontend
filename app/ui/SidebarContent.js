'use client';

import { LayoutGrid, FileText, Users, Inbox, Settings, Briefcase, ChevronLeft, ChevronRight, CreditCard } from 'lucide-react';
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

      <div className={`mt-auto shrink-0 transition-all duration-300 ${isExpanded ? 'p-8 opacity-100' : 'h-0 p-0 opacity-0 overflow-hidden'}`}>
        <Link href="/plans" onClick={onLinkClick} className="block relative rounded-[24px] p-6 text-center overflow-hidden bg-gradient-to-br from-[#A676FF] to-[#8624F0] shadow-lg hover:shadow-xl transition-all hover:scale-105">
          <div className="absolute -top-12 -left-12 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="w-[60px] h-[60px] mx-auto bg-white/20 rounded-full flex items-center justify-center mb-3 border-[4px] border-white/30 backdrop-blur-sm relative z-10">
            <div className="w-8 h-8 bg-gradient-to-b from-white to-white/50 rounded-full" />
          </div>
          <h3 className="text-white font-bold text-lg mb-1 relative z-10 whitespace-nowrap">Upgrade to PRO</h3>
          <p className="text-[#e9edf7] text-sm font-medium leading-tight relative z-10">to get access to all premium features!</p>
        </Link>
      </div>
    </>
  );
}