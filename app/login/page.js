'use client';

import { useRouter } from 'next/navigation';
import Image from "next/image";
import loginLogo from "../../assets/imagesource/login_logo.png";

export default function Login() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#faf4fe] flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-[14px] shadow-sm w-full max-w-[585px] p-8 md:p-12 flex flex-col">
        
        {/* Logo */}
        <div className="w-[60px] h-[65px] mb-6 relative flex items-center justify-center">
          <Image src={loginLogo} alt="loginLogo" />
        </div>

        <h1 className="text-[30px] font-semibold text-[#292929] mb-2 text-left">
          Welcome to TalentHold
        </h1>

        <p className="text-[18px] text-[#545454] mb-8">
          Please Sign up or Sign in below
        </p>

        {/* Email Input */}
        <div className="w-full max-w-[440px] mb-6">
          <div className="border border-[#761ed3] rounded-[10px] h-[70px] flex items-center px-6 bg-white">
            <span className="text-[#0c0c0c] font-medium text-[16px]">get</span>
            <span className="text-[#4f4f4f] text-[16px]">@</span>
            <span className="text-black font-medium text-[16px]">
              ziontutorial.com
            </span>
          </div>
        </div>

        {/* Continue with Email Button */}
        <button
          onClick={() => router.push('/verify')}
          className="w-full max-w-[440px] h-[70px] bg-[#761ed3] text-white rounded-[8px] text-[18px] font-medium hover:bg-[#6016ab] transition-colors mb-8 flex items-center justify-center gap-2"
        >
          Continue with email
        </button>

        {/* Divider */}
        <div className="w-full max-w-[440px] flex items-center gap-4 mb-8">
          <div className="h-[1px] flex-1 border-t-2 border-dashed border-[#DBDBDB]"></div>
          <span className="text-[#979797] text-[20px]">Or</span>
          <div className="h-[1px] flex-1 border-t-2 border-dashed border-[#DBDBDB]"></div>
        </div>

        {/* Google Button */}
        <button
          onClick={() => router.push('/dashboard')}
          className="w-full max-w-[440px] h-[70px] bg-[#f7f7f7] border border-[#c9c9c9] rounded-[4px] flex items-center justify-center gap-4 hover:bg-gray-100 transition-colors"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-[36px] h-[36px]"
          />
          <span className="text-[#6b6b6b] text-[20px] font-medium">
            Continue with Google
          </span>
        </button>
      </div>
    </div>
  );
}
