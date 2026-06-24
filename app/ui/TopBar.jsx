'use client';

import { Moon, Sun, Bell, Info, Menu } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import imgAvatar from "../../assets/imagesource/imgAvatarImg.png";
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpCircle, Check, Plus, LogOut, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { workspaceList, logout, getProfile } from '../Reducer/AuthSlice';

export default function TopBar({ onMenuClick }) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { isDark, toggleTheme } = useTheme();
    const { workspaceData, profileData } = useSelector((state) => state?.auth);
    const dispatch = useDispatch();

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
        dispatch(workspaceList());
        dispatch(getProfile());
    }, [dispatch]);

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

    console.log("workspaceData", workspaceData);
    console.log("profileData", profileData);


    return (
        <div className="bg-bg-card border border-transparent dark:border-border-color rounded-full p-2 pl-6 pr-2 shadow-sm flex items-center justify-between gap-4 h-[60px] w-full md:w-auto transition-all">

            <div className="flex items-center gap-4">
                {/* Mobile Menu Button */}
                <button
                    onClick={onMenuClick}
                    className="md:hidden p-1 text-[#A3AED0] hover:text-[#2b3674] transition-colors -ml-2"
                >
                    <Menu size={24} />
                </button>

                <div className="flex items-center gap-4 text-[#A3AED0] hidden sm:flex">
                    <button className="hover:text-[#2b3674] transition-colors"><Bell size={20} /></button>
                    <button
                        onClick={toggleTheme}
                        className="hover:text-[#2b3674] dark:hover:text-white transition-colors"
                    >
                        {isDark ? <Sun size={20} /> : <Moon size={20} />}
                    </button>
                    <button className="hover:text-[#2b3674] transition-colors"><Info size={20} /></button>
                </div>
            </div>

            <div className="relative" ref={dropdownRef}>
                <div onClick={() => setIsOpen(!isOpen)}>
                    <div className="flex items-center gap-3 cursor-pointer">
                        <div className="text-right hidden sm:block">
                            <p className="text-text-primary font-bold text-sm leading-tight">{profileName}</p>
                            <p className="text-text-secondary text-xs">Free Plan</p>
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
                                <span className="text-xs text-text-secondary">Free Plan</span>
                            </div>
                        </div>

                        {/* Upgrade Button */}
                        <button
                            onClick={() => router.push('/pricing-plans')}
                            className="cursor-pointer w-full bg-[#1E0B38] hover:bg-[#2d1154] text-white rounded-lg py-2.5 flex items-center justify-center gap-2 text-sm font-medium transition-colors"
                        >
                            <ArrowUpCircle size={18} />
                            Upgrade Plan
                        </button>

                        <div className="border-b border-border-color my-4"></div>
                        <p className="text-xs font-semibold text-text-secondary mb-2 px-1">Workspace</p>

                        {/* Active Workspace */}
                        {
                            workspaceData?.data?.map((work)=>{
                                return(
                                    <>
                                        <div className="flex items-center justify-between p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer mb-4">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 bg-[#7B6341] rounded flex items-center justify-center text-white text-sm">
                                    I
                                </div>
                                <span className="font-bold text-text-primary text-sm">{work?.name}</span>
                            </div>
                            <Check size={16} className="text-text-primary" strokeWidth={3} />
                        </div>
                                    </>
                                )
                            })
                        }
                    
                      

                        {/* Add Workspace */}
                        <button
                            onClick={() => router.push('/workspace')}
                            className="cursor-pointer w-full bg-[#F5F0FF] hover:bg-[#ede5ff] text-[#8B5CF6] rounded-lg py-2.5 flex items-center justify-center gap-2 text-sm font-medium transition-colors"
                        >
                            <Plus size={18} />
                            Add new workspace
                        </button>

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
                                onClick={() => {
                                    dispatch(logout());
                                    router.push('/login');
                                }}
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