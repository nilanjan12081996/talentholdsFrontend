"use client";
import React, { useState } from "react";
import Link from 'next/link';

import Image from 'next/image';

import logo from '../../assets/imagesource/logo.png';

const Header = () => {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <nav className="fixed w-full z-20 top-0 left-0 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between p-4">
        {/* Logo */}

        <Link href="/" passHref>
          <Image src={logo} alt='logo' className="w-[150px] lg:w-[230px]" />
        </Link>

        {/* Mobile Toggle */}
        <div className="flex lg:order-2 items-center gap-4">
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/login" className="text-gray-900 bg-white hover:text-[#A435F0] font-medium text-base px-5 py-2.5 shadow-lg shadow-purple-200 rounded-lg">
              Log in
            </Link>
            <Link href="/signup" className="shadow-lg shadow-purple-200 text-white bg-[#761ED3] hover:bg-[#8e2dd1] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-base px-5 py-2.5 outline-none transition-all">
              Sign up
            </Link>
          </div>

          <button
            onClick={toggleNavbar}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>

        {/* Menu */}
        <div className={`${isNavbarOpen ? 'block' : 'hidden'} items-center justify-between w-full lg:flex lg:w-auto lg:order-1`} id="navbar-sticky">
          <ul className="flex flex-col p-4 lg:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 lg:flex-row lg:space-x-8 lg:mt-0 lg:border-0 lg:bg-transparent">
            <li>
              <Link href="/" className="block py-2 pl-3 pr-4 font-medium text-white bg-[#8624f0] rounded lg:bg-transparent lg:text-[#761ED3] lg:p-0" aria-current="page">Home</Link>
            </li>
            <li>
              <Link href="#" className="block py-2 pl-3 pr-4 font-medium text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-[#761ED3] lg:p-0">Pricing</Link>
            </li>
            <li>
              <Link href="#" className="block py-2 pl-3 pr-4 font-medium text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-[#761ED3] lg:p-0">Features</Link>
            </li>
            <li className="lg:hidden mt-4 pt-4 border-t border-gray-200 flex flex-col gap-3">
              <Link href="/login" className="block text-center text-gray-900 bg-white border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-sm px-5 py-2.5">
                Log in
              </Link>
              <Link href="/signup" className="block text-center text-white bg-[#8624f0] hover:bg-[#8e2dd1] font-medium rounded-lg text-sm px-5 py-2.5">
                Sign up
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
