'use client';

import { useState } from "react";
import { X, Eye, EyeOff } from "lucide-react";

export default function SettingsModal({ 
  isOpen, 
  onClose,
  requirePassword,
  setRequirePassword,
  password,
  setPassword,
  closeForm,
  setCloseForm,
  onSave,
  markUnsaved
}) {
  const [showPassword, setShowPassword] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative rounded-[20px] shadow-2xl w-full max-w-md mx-4 p-6" style={{ background: 'var(--bg-card)' }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Form Settings</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#8624F0]/5 transition-colors"
          >
            <X className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
          </button>
        </div>

        {/* Settings */}
        <div className="p-4 rounded-[10px] space-y-3 mb-6" style={{ background: 'var(--bg-main)' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>Password Protection</p>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Require a password to access this form</p>
            </div>
            <div 
              onClick={() => { setRequirePassword(!requirePassword); markUnsaved(); }}
              className={`w-11 h-6 rounded-full cursor-pointer relative transition-colors ${requirePassword ? 'bg-[#8624F0]' : 'bg-[var(--border-color)]'}`}
            >
              <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${requirePassword ? 'translate-x-5' : ''}`} />
            </div>
          </div>
          
          {requirePassword && (
            <div className="pt-3 border-t animate-in fade-in slide-in-from-top-2" style={{ borderColor: 'var(--border-color)' }}>
              <label className="text-sm font-medium mb-2 block" style={{ color: 'var(--text-primary)' }}>Set Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); markUnsaved(); }}
                  className="w-full h-[40px] pl-3 pr-10 rounded-[8px] text-sm outline-none focus:ring-2 focus:ring-[#8624F0]/30"
                  style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                  placeholder="Enter a secure password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center justify-center w-6 h-6 rounded hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div className="flex justify-end mt-2">
                <button
                  onClick={() => onSave()}
                  className="px-4 py-1.5 rounded-[6px] bg-[#8624F0] text-white text-xs font-medium hover:bg-[#6c1dc0] transition-colors"
                >
                  Save Password
                </button>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-1">
            <div>
              <p className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>Close Form</p>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Stop accepting new responses</p>
            </div>
            <div 
              onClick={() => { setCloseForm(!closeForm); markUnsaved(); }}
              className={`w-11 h-6 rounded-full cursor-pointer relative transition-colors ${closeForm ? 'bg-[#8624F0]' : 'bg-[var(--border-color)]'}`}
            >
              <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${closeForm ? 'translate-x-5' : ''}`} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-4" style={{ borderTop: '1px solid var(--border-color)' }}>
          <button
            onClick={() => { onSave(); onClose(); }}
            className="px-6 py-2.5 rounded-[8px] bg-[#8624F0] text-white font-medium text-sm transition-colors hover:bg-[#6c1dc0]"
          >
            Save & Close
          </button>
        </div>
      </div>
    </div>
  );
}
