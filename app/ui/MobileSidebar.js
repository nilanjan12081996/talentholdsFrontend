'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import SidebarContent from './SidebarContent';

export default function MobileSidebar({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            className="fixed inset-y-0 left-0 z-50 w-[290px] shadow-xl md:hidden flex flex-col h-full overflow-hidden"
            style={{ background: 'var(--bg-sidebar)' }}
          >
            <div className="relative flex-1 flex flex-col h-full">
              <button
                onClick={onClose}
                className="absolute top-6 right-6 z-50 p-2 rounded-full text-gray-500 dark:text-gray-400 hover:text-[#2b3674] dark:hover:text-white transition-colors"
                style={{ background: 'var(--bg-sidebar)' }}
              >
                <X size={20} />
              </button>
              <SidebarContent onLinkClick={onClose} />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}