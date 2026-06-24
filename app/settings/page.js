'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { ExternalLink, MoreVertical, Plus, Pencil } from 'lucide-react';
import { getProfile } from '../Reducer/AuthSlice';

export default function Settings() {
  const dispatch = useDispatch();
  const { profileData, loading } = useSelector((state) => state?.auth);

  // Fetch profile on mount
  useEffect(() => {
    dispatch(getProfile());
  }, [dispatch]);

  const profile = profileData?.data || profileData || {};
  const profileName = profile.name || 'Soumalya Chandra';
  const profileEmail = profile.email || 'soumalyachadra76@gmail.com';
  const profileAvatar = profile.avatar || '';

  // Helper to generate initials for avatar placeholder
  const getInitials = (nameString) => {
    if (!nameString) return 'S';
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

  return (
    <div className="space-y-8 pb-12">

      {/* Profile Section */}
      <div className="rounded-[20px] p-8" style={{ background: 'var(--bg-card)' }}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Profile</h3>
          <Link 
            href="/profile" 
            className="flex items-center gap-1.5 text-sm font-semibold text-[#8624F0] hover:text-[#761ed3] transition-colors p-1.5 hover:bg-[#8624F0]/5 rounded-lg active:scale-95"
          >
            <Pencil size={15} />
            <span>Edit Profile</span>
          </Link>
        </div>

        {loading && !profileData ? (
          /* Skeleton Loader */
          <div className="flex items-center gap-4 animate-pulse">
            <div className="w-[56px] h-[56px] bg-gray-200 dark:bg-gray-700 rounded-full" />
            <div className="space-y-2">
              <div className="w-32 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="w-48 h-3 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            {profileAvatar ? (
              <img 
                src={getAvatarUrl(profileAvatar)} 
                alt="Profile Avatar" 
                className="w-[56px] h-[56px] rounded-full object-cover shadow-sm" 
              />
            ) : (
              <div className="w-[56px] h-[56px] bg-[#25852F] rounded-full flex items-center justify-center text-white text-[24px] font-medium shadow-sm">
                {getInitials(profileName).substring(0, 1)}
              </div>
            )}
            <div>
              <h4 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>{profileName}</h4>
              <p style={{ color: 'var(--text-secondary)' }}>{profileEmail}</p>
            </div>
          </div>
        )}
      </div>

      {/* Workspace Info */}
      <div className="rounded-[20px] p-8" style={{ background: 'var(--bg-card)' }}>
        <h3 className="text-xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>Workspace Info</h3>

        <div className="space-y-0">
          <div className="grid grid-cols-[1fr] md:grid-cols-[150px_1fr] gap-4 md:gap-8 items-center py-8" style={{ borderBottom: '1px solid var(--border-color)' }}>
            <label className="font-semibold" style={{ color: 'var(--text-primary)' }}>Logo</label>
            <div className="flex justify-end">
              <div className="w-[68px] h-[68px] rounded-[10px] overflow-hidden">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80" alt="Workspace Logo" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-[1fr] md:grid-cols-[150px_1fr] gap-4 md:gap-8 items-center py-8" style={{ borderBottom: '1px solid var(--border-color)' }}>
            <label className="font-semibold" style={{ color: 'var(--text-primary)' }}>Name</label>
            <div className="flex justify-end">
              <input
                type="text"
                defaultValue="misfiq"
                className="w-full md:w-[390px] h-[64px] rounded-[8px] px-4 font-semibold text-lg outline-none focus:ring-2 ring-[#761ed3]/20 transition-colors"
                style={{ border: '1px solid var(--border-color)', background: 'var(--bg-main)', color: 'var(--text-primary)' }}
              />
            </div>
          </div>

          <div className="grid grid-cols-[1fr] md:grid-cols-[150px_1fr] gap-4 md:gap-8 items-center py-8" style={{ borderBottom: '1px solid var(--border-color)' }}>
            <label className="font-semibold" style={{ color: 'var(--text-primary)' }}>Public Link</label>
            <div className="flex flex-col md:flex-row justify-end gap-0">
              <div
                className="h-[64px] w-[64px] flex items-center justify-center rounded-l-[8px]"
                style={{ border: '1px solid var(--border-color)', borderRight: 'none', background: 'var(--bg-main)' }}
              >
                <ExternalLink style={{ color: 'var(--text-primary)' }} />
              </div>
              <input
                type="text"
                defaultValue="talenthold.com/misfiq-3wij"
                className="w-full md:w-[320px] h-[64px] rounded-r-[8px] px-4 font-semibold text-lg outline-none focus:ring-2 ring-[#761ed3]/20 transition-colors"
                style={{ border: '1px solid var(--border-color)', background: 'var(--bg-main)', color: 'var(--text-primary)' }}
              />
              <button
                className="md:hidden mt-2 p-2 rounded text-center transition-colors"
                style={{ border: '1px solid var(--border-color)', color: 'var(--text-primary)', background: 'var(--bg-main)' }}
              >
                Copy
              </button>
            </div>
          </div>

          <div className="grid grid-cols-[1fr] md:grid-cols-[150px_1fr] gap-4 md:gap-8 items-center py-8">
            <label className="font-semibold" style={{ color: 'var(--text-primary)' }}>Plan</label>
            <div className="flex justify-end items-center gap-6">
              <span className="font-semibold" style={{ color: 'var(--text-secondary)' }}>Free</span>
              <button className="h-[50px] px-6 border border-[#761ed3] text-[#8624F0] font-semibold rounded-[8px] hover:bg-[#761ed3]/5 transition-colors">
                Upgrade
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Workspace Users */}
      <div className="rounded-[20px] p-8" style={{ background: 'var(--bg-card)' }}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Workspace Users</h3>
          <button className="bg-[#210043] dark:bg-[#6d28d9] text-white px-6 py-3 rounded-[8px] font-semibold flex items-center gap-2 hover:bg-[#340b61] dark:hover:bg-[#7c3aed] transition-colors">
            <Plus size={18} /> Invite User
          </button>
        </div>

        <div
          className="rounded-[10px] p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          style={{ border: '1px solid var(--border-color)' }}
        >
          <div className="flex items-center gap-4">
            <div className="w-[56px] h-[56px] bg-[#25852F] rounded-full flex items-center justify-center text-white text-[24px] font-medium">
              S
            </div>
            <div>
              <h4 className="text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>Soumalya Chandra</h4>
              <p style={{ color: 'var(--text-secondary)' }}>soumalyachadra76@gmail.com</p>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-between">
            <div
              className="h-[50px] px-6 rounded-[8px] flex items-center justify-center font-medium"
              style={{ border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
            >
              Admin
            </div>
            <button className="hover:text-[#8624F0] transition-colors" style={{ color: 'var(--text-secondary)' }}>
              <MoreVertical size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}