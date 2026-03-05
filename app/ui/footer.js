import React from 'react'
import Link from 'next/link';

import Image from 'next/image';

import footer_logo from '../../assets/imagesource/footer_logo.png';

import { IoLocationSharp } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#140626] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex flex-col items-center mb-6">
          <div className="flex items-center gap-2 mb-6">
            <Image src={footer_logo} alt='footer_logo' className="" />
          </div>
          <div className='flex lg:justify-center lg:items-center justify-start items-start gap-1 mb-4'>
            <IoLocationSharp className='text-[#761ED3] lg:text-xl text-3xl' />
            <p className="text-center text-[#E2E0E0] text-sm max-w-2xl">
              1234 Main Street, Suite 500, Downtown District, Anytown, State, 12345, USA
            </p>
          </div>
          <div className='flex justify-center items-center gap-3 mb-0'>
            <div className='flex justify-center items-center gap-1 mb-8'>
              <FaPhoneAlt className='text-[#761ED3] text-xl' />
              <p className="text-center text-[#E2E0E0] text-sm max-w-2xl">
                (123) 456-7890
              </p>
            </div>
            <div className='flex justify-center items-center gap-1 mb-8'>
              <FaEnvelope className='text-[#761ED3] text-xl' />
              <p className="text-center text-[#E2E0E0] text-sm max-w-2xl">
                example@email.com
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#E2E0E0] text-sm">
            Create by TalentHold. All Rights Reserved
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-[#E2E0E0] hover:text-white text-sm">Support</Link>
            <Link href="#" className="text-[#E2E0E0] hover:text-white text-sm">Privacy Policy</Link>
            <Link href="#" className="text-[#E2E0E0] hover:text-white text-sm">Terms & Use</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer