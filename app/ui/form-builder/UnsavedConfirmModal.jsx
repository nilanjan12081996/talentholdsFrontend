'use client';

import { AlertCircle } from "lucide-react";

export default function UnsavedConfirmModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative w-full max-w-sm rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in-95" style={{ background: 'var(--bg-card)' }}>
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center shrink-0">
              <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Unsaved Changes</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                You have unsaved changes. Are you sure you want to leave without saving?
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 flex items-center justify-end gap-3" style={{ background: 'var(--bg-main)', borderTop: '1px solid var(--border-color)' }}>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-sm font-medium transition-colors hover:bg-gray-200 dark:hover:bg-gray-800"
            style={{ color: 'var(--text-primary)' }}
          >
            Stay
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-xl text-sm font-medium bg-amber-600 text-white transition-colors hover:bg-amber-700"
          >
            Leave without saving
          </button>
        </div>
      </div>
    </div>
  );
}
