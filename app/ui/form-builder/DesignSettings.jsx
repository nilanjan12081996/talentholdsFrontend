'use client';

import { X, Upload, Image as ImageIcon, Trash2, AlignLeft, AlignCenter, AlignRight, Eye, EyeOff } from "lucide-react";
import { useRef, useState } from "react";

export default function DesignSettings({ 
  formLogo, setFormLogo, 
  formBgImage, setFormBgImage, 
  setLogoFile, setBgFile,
  requirePassword, setRequirePassword,
  password, setPassword,
  closeForm, setCloseForm,
  markUnsaved,
  onClose 
}) {
  const logoInputRef = useRef(null);
  const bgInputRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

  const inputStyle = {
    background: 'var(--bg-main)',
    border: '1px solid var(--border-color)',
    color: 'var(--text-primary)',
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (setLogoFile) setLogoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormLogo({
          url: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBgUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (setBgFile) setBgFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormBgImage({
          url: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    setFormLogo(null);
    if (setLogoFile) setLogoFile(null);
  };
  const removeBgImage = () => {
    setFormBgImage(null);
    if (setBgFile) setBgFile(null);
  };

  return (
    <div className="w-80 flex flex-col shrink-0 animate-in slide-in-from-right duration-300 ease-in-out" style={{ background: 'var(--bg-card)', borderLeft: '1px solid var(--border-color)' }}>
      {/* Header */}
      <div className="p-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Form Settings</h3>
        {onClose && (
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-[#8624F0]/5"
          >
            <X className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
          </button>
        )}
      </div>

      {/* Settings Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-8">

          {/* General Settings Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>General</h4>
            
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1">
                <p className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>Password Protection</p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Share confidential forms only with authorized people</p>
              </div>
              <div 
                onClick={() => { setRequirePassword(!requirePassword); if(markUnsaved) markUnsaved(); }}
                className={`w-11 h-6 shrink-0 rounded-full cursor-pointer relative transition-colors ${requirePassword ? 'bg-[#8624F0]' : 'bg-[var(--border-color)]'}`}
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
                    onChange={(e) => { setPassword(e.target.value); if(markUnsaved) markUnsaved(); }}
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
              </div>
            )}

            <div className="flex items-center justify-between pt-1 gap-3">
              <div className="flex-1">
                <p className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>Close Form</p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Stop accepting new responses</p>
              </div>
              <div 
                onClick={() => { setCloseForm(!closeForm); if(markUnsaved) markUnsaved(); }}
                className={`w-11 h-6 shrink-0 rounded-full cursor-pointer relative transition-colors ${closeForm ? 'bg-[#8624F0]' : 'bg-[var(--border-color)]'}`}
              >
                <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${closeForm ? 'translate-x-5' : ''}`} />
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-[var(--border-color)]"></div>

          {/* Logo Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Form Logo</h4>
            
            {!formLogo ? (
              <div 
                onClick={() => logoInputRef.current?.click()}
                className="w-full h-[100px] border-2 border-dashed rounded-[10px] flex flex-col items-center justify-center cursor-pointer hover:border-[#8624F0] hover:text-[#8624F0] transition-colors"
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
              >
                <ImageIcon className="w-6 h-6 mb-2" />
                <span className="text-xs font-medium">Upload Logo</span>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative w-full h-[100px] rounded-[10px] overflow-hidden flex items-center justify-center bg-gray-100 dark:bg-gray-800 border" style={{ borderColor: 'var(--border-color)' }}>
                  <img src={formLogo.url} alt="Logo" className="max-h-full max-w-full object-contain" />
                  <button 
                    onClick={removeLogo}
                    className="absolute top-1 right-1 w-6 h-6 bg-white dark:bg-gray-900 rounded-md shadow flex items-center justify-center text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
            <input type="file" accept="image/*" ref={logoInputRef} onChange={handleLogoUpload} className="hidden" />
          </div>

          <div className="w-full h-px bg-[var(--border-color)]"></div>

          {/* Background Image Section */}
          <div className="space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--text-secondary)' }}>Background Image</h4>
            
            {!formBgImage ? (
              <div 
                onClick={() => bgInputRef.current?.click()}
                className="w-full h-[100px] border-2 border-dashed rounded-[10px] flex flex-col items-center justify-center cursor-pointer hover:border-[#8624F0] hover:text-[#8624F0] transition-colors"
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
              >
                <ImageIcon className="w-6 h-6 mb-2" />
                <span className="text-xs font-medium">Upload Background</span>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative w-full h-[100px] rounded-[10px] overflow-hidden flex items-center justify-center bg-gray-100 dark:bg-gray-800 border" style={{ borderColor: 'var(--border-color)' }}>
                  <img src={formBgImage.url} alt="Background" className="max-h-full max-w-full object-cover w-full h-full" />
                  <button 
                    onClick={removeBgImage}
                    className="absolute top-1 right-1 w-6 h-6 bg-white dark:bg-gray-900 rounded-md shadow flex items-center justify-center text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
            <input type="file" accept="image/*" ref={bgInputRef} onChange={handleBgUpload} className="hidden" />
          </div>

        </div>
      </div>
    </div>
  );
}
