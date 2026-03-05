'use client';

import { Moon, Sun, Bell, Info, Menu } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import imgAvatar from "../../assets/imagesource/imgAvatarImg.png";
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import { ArrowUpCircle, Check, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function TopBar({ onMenuClick }) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { isDark, toggleTheme } = useTheme();

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

    return (
        <div className="bg-white rounded-full p-2 pl-6 pr-2 shadow-sm flex items-center justify-between gap-4 h-[60px] w-full md:w-auto transition-all">

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
                            <p className="text-[#151d48] font-bold text-sm leading-tight">Musfiq</p>
                            <p className="text-[#737791] text-xs">Free Plan</p>
                        </div>
                        <Image
                            src={imgAvatar}
                            alt="Profile"
                            width={40}
                            height={40}
                            className="rounded-full object-cover shrink-0"
                        />
                    </div>
                </div>

                {/* Dropdown */}
                {isOpen && (
                    <div className="absolute top-full mt-4 right-0 w-[340px] bg-white rounded-xl shadow-2xl p-4 border border-gray-100 z-50">

                        {/* Current Workspace */}
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-10 w-10 bg-[#7B6341] rounded-md flex items-center justify-center text-white font-medium text-lg">
                                I
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold text-gray-900">Iksen</span>
                                <span className="text-xs text-gray-500">Free Plan</span>
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

                        <div className="border-b border-gray-100 my-4"></div>
                        <p className="text-xs font-semibold text-gray-400 mb-2 px-1">Workspace</p>

                        {/* Active Workspace */}
                        <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 cursor-pointer mb-4">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 bg-[#7B6341] rounded flex items-center justify-center text-white text-sm">
                                    I
                                </div>
                                <span className="font-bold text-gray-800 text-sm">Iksen</span>
                            </div>
                            <Check size={16} className="text-gray-800" strokeWidth={3} />
                        </div>

                        {/* Add Workspace */}
                        <button
                            onClick={() => router.push('/create-workspace')}
                            className="cursor-pointer w-full bg-[#F5F0FF] hover:bg-[#ede5ff] text-[#8B5CF6] rounded-lg py-2.5 flex items-center justify-center gap-2 text-sm font-medium transition-colors"
                        >
                            <Plus size={18} />
                            Add new workspace
                        </button>

                    </div>
                )}
            </div>
        </div>
    );
}