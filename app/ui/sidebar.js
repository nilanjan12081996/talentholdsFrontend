'use client';

import { useState } from 'react';
import SidebarContent from './SidebarContent';

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div 
      className={`transition-all duration-300 ease-in-out bg-bg-sidebar h-screen hidden md:flex flex-col shrink-0 rounded-br-[20px] relative z-10 sticky top-0 ${
        isExpanded ? 'w-[290px]' : 'w-[100px]'
      }`} 
      style={{background: 'var(--bg-sidebar)'}}
    >
      <SidebarContent isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
    </div>
  );
}