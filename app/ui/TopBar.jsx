'use client';

import { Moon, Sun, Bell, Info, Menu } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import imgAvatar from "../../assets/imagesource/imgAvatarImg.png";
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpCircle, Check, Plus, LogOut, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { logout, getProfile } from '../Reducer/AuthSlice';
import { getPlans, getCurrentSubscription, cancelSubscription } from '../Reducer/PlanSlice';
import { workspaceList } from '../Reducer/WorkspaceSlice';
import Swal from 'sweetalert2';

export default function TopBar({ onMenuClick }) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { isDark, toggleTheme } = useTheme();
    const { profileData } = useSelector((state) => state?.auth);
    const { plans, currentSubscription } = useSelector((state) => state?.plan || {});
    const { workspaceData } = useSelector((state) => state?.workspace || {});
    const dispatch = useDispatch();

    const [selectedWorkspace, setSelectedWorkspace] = useState('');

    useEffect(() => {
        const storedId = localStorage.getItem('primaryWorkspaceId');
        if (storedId) setSelectedWorkspace(storedId);
    }, []);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    useEffect(() => {
        dispatch(getProfile());
        dispatch(getPlans());
        dispatch(getCurrentSubscription());
        dispatch(workspaceList());
    }, [dispatch]);

    const handleWorkspaceChange = (e) => {
        const newId = e.target.value;
        setSelectedWorkspace(newId);
        localStorage.setItem('primaryWorkspaceId', newId);
        window.location.reload(); // Refresh to update all components
    };

    const profile = profileData?.data || profileData || {};
    const profileName = profile.name || 'User';
    const profileAvatar = profile.avatar || '';

    const getInitials = (nameString) => {
        if (!nameString) return 'U';
        const parts = nameString.trim().split(/\s+/);
        if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
        return (parts[0].substring(0, 1) + parts[1].substring(0, 1)).toUpperCase();
    };

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

    const currentPlanName = plans?.data?.find(p => p.id === currentSubscription?.planId)?.name || 'Free Plan';
    const isActive = currentSubscription && currentSubscription.status === 'active';

    const handleCancelSubscription = () => {
        if (!currentSubscription?.id) return;
        setIsOpen(false);
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this! Your premium features will be revoked.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, cancel it!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(cancelSubscription(currentSubscription.id)).then((res) => {
                    if (res?.payload?.success || res?.payload?.statusCode === 200) {
                        Swal.fire('Cancelled!', 'Your subscription has been cancelled.', 'success');
                        dispatch(getCurrentSubscription()); // Refresh
                    } else {
                        Swal.fire('Error', res?.payload?.message || 'Failed to cancel subscription', 'error');
                    }
                });
            }
        });
    };

    const handleLogout = () => {
        setIsOpen(false);
        Swal.fire({
            title: 'Logout?',
            text: "Are you sure you want to log out of your account?",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, log out!'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(logout());
                router.push('/login');
            }
        });
    };


    return (
        <div className="bg-bg-card border border-transparent dark:border-border-color rounded-full p-2 pl-6 pr-2 shadow-sm flex items-center justify-between gap-4 h-[60px] w-full md:w-auto transition-all">

            <div className="flex items-center gap-4">
                {/* Mobile Menu Button */}
                <button
                    onClick={onMenuClick}
                    className="cursor-pointer md:hidden p-1 text-[#A3AED0] hover:text-[#2b3674] transition-colors -ml-2"
                >
                    <Menu size={24} />
                </button>

                <div className="flex items-center gap-4 text-[#A3AED0] hidden sm:flex">
                    {/* Workspace Selector */}
                    {workspaceData?.data?.length > 0 && (
                        <div className="relative flex items-center mr-2">
                            <select
                                value={selectedWorkspace}
                                onChange={handleWorkspaceChange}
                                className="cursor-pointer appearance-none bg-[#8624F0]/10 text-[#8624F0] font-semibold text-sm py-1.5 pl-3 pr-8 rounded-lg outline-none border border-transparent hover:border-[#8624F0]/30 transition-all dark:bg-[#8624F0]/20 dark:text-[#c084fc]"
                            >
                                <option value="" disabled>Select Workspace</option>
                                {workspaceData.data.map((ws) => (
                                    <option key={ws.id} value={ws.id} className="text-gray-900 dark:text-gray-100">
                                        {ws.name}
                                    </option>
                                ))}
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#8624F0] dark:text-[#c084fc]">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                </svg>
                            </div>
                        </div>
                    )}
                    <button
                        onClick={toggleTheme}
                        className="cursor-pointer hover:text-[#2b3674] dark:hover:text-white transition-colors"
                    >
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                </div>
            </div>

            <div className="relative" ref={dropdownRef}>
                <div onClick={() => setIsOpen(!isOpen)}>
                    <div className="flex items-center gap-3 cursor-pointer">
                        <div className="text-right hidden sm:block">
                            <p className="text-text-primary font-bold text-sm leading-tight">{profileName}</p>
                            <p className="text-text-secondary text-xs">{currentPlanName}</p>
                        </div>
                        {profileAvatar ? (
                            <img
                                src={getAvatarUrl(profileAvatar)}
                                alt="Profile"
                                className="rounded-full object-cover shrink-0 w-10 h-10 border border-gray-100 shadow-sm"
                            />
                        ) : (
                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#761ed3] to-[#8624F0] text-white flex items-center justify-center font-bold text-sm shrink-0 border border-gray-100 shadow-sm">
                                {getInitials(profileName)}
                            </div>
                        )}
                    </div>
                </div>

                {/* Dropdown */}
                {isOpen && (
                    <div className="absolute top-full mt-4 right-0 w-[340px] bg-bg-card rounded-xl shadow-2xl p-4 border border-border-color z-50">

                        {/* Current Workspace */}
                        <div className="flex items-center gap-3 mb-4">
                            {profileAvatar ? (
                                <img
                                    src={getAvatarUrl(profileAvatar)}
                                    alt="Profile"
                                    className="h-10 w-10 rounded-md object-cover border border-gray-100 shadow-sm"
                                />
                            ) : (
                                <div className="h-10 w-10 bg-gradient-to-tr from-[#761ed3] to-[#8624F0] text-white rounded-md flex items-center justify-center font-bold text-md border border-gray-100 shadow-sm">
                                    {getInitials(profileName)}
                                </div>
                            )}
                            <div className="flex flex-col">
                                <span className="font-bold text-text-primary">{profileName}</span>
                                <span className="text-xs text-text-secondary">{currentPlanName}</span>
                            </div>
                        </div>

                        {/* Plan Action Buttons */}
                        {!isActive ? (
                            <button
                                onClick={() => router.push('/plans')}
                                className="cursor-pointer w-full bg-[#1E0B38] hover:bg-[#2d1154] text-white rounded-lg py-2.5 flex items-center justify-center gap-2 text-sm font-medium transition-colors"
                            >
                                <ArrowUpCircle size={18} />
                                Upgrade Plan
                            </button>
                        ) : (
                            <div className="flex flex-col gap-2">
                                <div className="w-full bg-[#25852F] text-white rounded-lg py-2.5 flex items-center justify-center gap-2 text-sm font-medium">
                                    <Check size={18} />
                                    Active Plan: {currentPlanName}
                                </div>
                                <button
                                    onClick={handleCancelSubscription}
                                    className="cursor-pointer w-full bg-red-500 hover:bg-red-600 text-white rounded-lg py-2.5 flex items-center justify-center gap-2 text-sm font-medium transition-colors"
                                >
                                    Cancel Plan
                                </button>
                            </div>
                        )}

                        <div className="border-t border-border-color my-3"></div>

                        {/* Menu Actions */}
                        <div className="space-y-1">
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    router.push('/profile');
                                }}
                                className="cursor-pointer w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-text-primary hover:bg-black/5 dark:hover:bg-white/5 transition-colors font-semibold"
                            >
                                <User size={16} className="text-text-secondary" />
                                View Profile
                            </button>

                            <button
                                onClick={handleLogout}
                                className="cursor-pointer w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors font-semibold"
                            >
                                <LogOut size={16} className="text-red-500" />
                                Log Out
                            </button>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}