'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Camera,
  Lock,
  Phone,
  User,
  Mail,
  Save,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Building2
} from 'lucide-react';
import { getProfile, updateProfile, uploadAvatar } from '../Reducer/AuthSlice';

export default function Profile() {
  const dispatch = useDispatch();
  const { profileData, loading } = useSelector((state) => state?.auth);

  // Form states
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');

  // UI operation states
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [toast, setToast] = useState({ show: false, type: '', message: '' });

  const fileInputRef = useRef(null);

  // Fetch profile on mount
  useEffect(() => {
    dispatch(getProfile()).then((res) => {
      setIsInitialLoading(false);
    }).catch(() => {
      setIsInitialLoading(false);
    });
  }, [dispatch]);

  // Sync state with fetched profile data
  useEffect(() => {
    if (profileData) {
      const data = profileData.data || profileData;
      setName(data.name || '');
      setMobile(data.mobile || '');
      setEmail(data.email || '');
      setAvatar(data.avatar || '');
    }
  }, [profileData]);

  // Show auto-dismiss toast
  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    setTimeout(() => {
      setToast({ show: false, type: '', message: '' });
    }, 4000);
  };

  // Helper to generate initials for avatar placeholder
  const getInitials = (nameString) => {
    if (!nameString) return 'U';
    const parts = nameString.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
    return (parts[0].substring(0, 1) + parts[1].substring(0, 1)).toUpperCase();
  };

  // Helper to resolve avatar image URL
  const getAvatarUrl = (avatarPath) => {
    if (!avatarPath) return '';
    if (avatarPath.startsWith('http://') || avatarPath.startsWith('https://')) {
      return avatarPath;
    }
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
    const cleanBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    const cleanPath = avatarPath.startsWith('/') ? avatarPath : `/${avatarPath}`;
    return `${cleanBase}${cleanPath}`;
  };

  // Trigger file selection for avatar upload
  const handleAvatarClick = () => {
    if (isUploading || isSaving) return;
    fileInputRef.current.click();
  };

  // Handle avatar upload
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate size and format
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      showToast('error', 'Invalid format. Use JPEG, PNG, or WEBP.');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      showToast('error', 'File size exceeds 2MB limit.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    setIsUploading(true);
    dispatch(uploadAvatar(formData))
      .then((res) => {
        setIsUploading(false);
        if (res?.meta?.requestStatus === 'fulfilled' || res?.payload?.statusCode === 200) {
          showToast('success', 'Avatar updated successfully!');
          dispatch(getProfile()); // Refresh profile information
        } else {
          showToast('error', res?.payload?.message || 'Failed to upload avatar.');
        }
      })
      .catch((err) => {
        setIsUploading(false);
        showToast('error', 'An error occurred while uploading.');
      });
  };

  // Handle profile form save
  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      showToast('error', 'Name is required.');
      return;
    }

    setIsSaving(true);
    dispatch(updateProfile({ name, mobile }))
      .then((res) => {
        setIsSaving(false);
        if (res?.meta?.requestStatus === 'fulfilled' || res?.payload?.statusCode === 200) {
          showToast('success', 'Profile changes saved successfully!');
          dispatch(getProfile()); // Refresh profile information
        } else {
          showToast('error', res?.payload?.message || 'Failed to update profile.');
        }
      })
      .catch((err) => {
        setIsSaving(false);
        showToast('error', 'An error occurred while saving.');
      });
  };

  // Detect whether inputs are modified
  const currentProfile = profileData?.data || profileData || {};
  const isFormPristine =
    name === (currentProfile.name || '') &&
    mobile === (currentProfile.mobile || '');

  return (
    <div className="space-y-8 pb-12 relative max-w-3xl mx-auto mt-6">
      {/* Toast Alert */}
      {toast.show && (
        <div
          className={`fixed top-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-xl shadow-xl transition-all duration-300 border backdrop-blur-md animate-in fade-in slide-in-from-top-4 ${toast.type === 'success'
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
              : 'bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400'
            }`}
        >
          {toast.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <span className="font-semibold text-[15px]">{toast.message}</span>
        </div>
      )}

      {/* Profile Section */}
      <div className="rounded-[24px] p-8 shadow-sm transition-all duration-300 hover:shadow-md" style={{ background: 'var(--bg-card)' }}>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text-primary)' }}>Profile Settings</h3>
            <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Manage your public identity, mobile credentials and avatar</p>
          </div>
        </div>

        {isInitialLoading ? (
          /* Skeleton Loading State */
          <div className="space-y-8 animate-pulse">
            <div className="flex items-center gap-6">
              <div className="w-[88px] h-[88px] bg-gray-200 dark:bg-gray-700 rounded-full" />
              <div className="space-y-2">
                <div className="w-48 h-5 bg-gray-200 dark:bg-gray-700 rounded" />
                <div className="w-32 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
              </div>
            </div>
            <div className="grid grid-cols-1 gap-6">
              <div className="h-14 bg-gray-200 dark:bg-gray-700 rounded-xl" />
              <div className="h-14 bg-gray-200 dark:bg-gray-700 rounded-xl" />
              <div className="h-14 bg-gray-200 dark:bg-gray-700 rounded-xl" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-8">
            {/* Avatar Section */}
            <div className="flex flex-col sm:flex-row items-center gap-6 pb-6 border-b border-[var(--border-color)]">
              <div
                onClick={handleAvatarClick}
                className="group relative w-[88px] h-[88px] rounded-full overflow-hidden cursor-pointer shadow-md bg-gradient-to-tr from-[#761ed3] to-[#8624F0] flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95"
              >
                {avatar ? (
                  <img src={getAvatarUrl(avatar)} alt="Avatar" className="w-full h-full object-cover group-hover:opacity-40 transition-opacity duration-300" />
                ) : (
                  <span className="text-white text-3xl font-bold tracking-wider group-hover:opacity-30 transition-opacity duration-300">
                    {getInitials(name)}
                  </span>
                )}

                {/* Upload Hover Overlay */}
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white gap-1">
                  <Camera size={20} className="transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="text-[10px] font-semibold tracking-wider">CHANGE</span>
                </div>

                {/* Upload Spinner */}
                {isUploading && (
                  <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
                    <Loader2 className="w-8 h-8 text-white animate-spin" />
                  </div>
                )}
              </div>

              {/* Upload Input & Details */}
              <div className="text-center sm:text-left space-y-1.5">
                <h4 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Company Logo</h4>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Supports JPG, PNG or WEBP formats. Max size 2MB.</p>
                <button
                  type="button"
                  onClick={handleAvatarClick}
                  disabled={isUploading || isSaving}
                  className="mt-2 text-xs font-semibold px-4 py-2 border rounded-lg transition-all hover:bg-black/5 dark:hover:bg-white/5 active:scale-95 disabled:opacity-50"
                  style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                >
                  Upload File
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/jpeg,image/png,image/webp"
                  className="hidden"
                />
              </div>
            </div>

            {/* Profile Form */}
            <form onSubmit={handleSaveProfile} className="space-y-6">
              <div className="grid grid-cols-1 gap-6">

                {/* Name Input */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold flex items-center gap-1.5" style={{ color: 'var(--text-primary)' }}>
                    <Building2 size={16} className="text-[#8624F0]" /> Company / Organization Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Enter name"
                    className="w-full h-[56px] rounded-xl px-4 font-semibold text-md outline-none focus:ring-2 focus:ring-[#8624F0]/30 transition-all border"
                    style={{ border: '1px solid var(--border-color)', background: 'var(--bg-main)', color: 'var(--text-primary)' }}
                    disabled={isSaving || isUploading}
                  />
                </div>

                {/* Email Input (ReadOnly) */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold flex items-center gap-1.5" style={{ color: 'var(--text-primary)' }}>
                    <Mail size={16} className="text-gray-400" /> Email Address
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      readOnly
                      className="w-full h-[56px] rounded-xl pl-4 pr-10 font-semibold text-md cursor-not-allowed opacity-75 border"
                      style={{ border: '1px solid var(--border-color)', background: 'var(--bg-main)', color: 'var(--text-secondary)' }}
                    />
                    <Lock size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  </div>
                </div>

                {/* Mobile Input */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold flex items-center gap-1.5" style={{ color: 'var(--text-primary)' }}>
                    <Phone size={16} className="text-[#8624F0]" /> Mobile Number
                  </label>
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="Enter mobile number"
                    className="w-full h-[56px] rounded-xl px-4 font-semibold text-md outline-none focus:ring-2 focus:ring-[#8624F0]/30 transition-all border"
                    style={{ border: '1px solid var(--border-color)', background: 'var(--bg-main)', color: 'var(--text-primary)' }}
                    disabled={isSaving || isUploading}
                  />
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex justify-end pt-4">
                <button
                  type="submit"
                  disabled={isSaving || isUploading || isFormPristine}
                  className="h-[52px] px-8 bg-[#8624F0] hover:bg-[#761ed3] active:scale-95 text-white font-bold rounded-xl flex items-center gap-2 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#8624F0]"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Saving Profile...
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      Save Changes
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
