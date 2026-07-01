'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import Image from "next/image";
import loginLogo from "../../assets/imagesource/login_logo.png";
import { Label, TextInput } from 'flowbite-react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../Reducer/AuthSlice';
import Link from 'next/link';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  
  const token = searchParams.get('token');
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [apiError, setApiError] = useState('');
  const [apiSuccess, setApiSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const newPassword = watch("newPassword");

  const onSubmit = (data) => {
    if (!token) {
      setApiError("Reset token is missing from the URL.");
      return;
    }

    setApiError('');
    setApiSuccess('');
    setIsLoading(true);

    const payload = {
      token: token,
      password: data.newPassword
    };

    dispatch(resetPassword(payload)).then((res) => {
      setIsLoading(false);
      if (res?.payload?.statusCode === 200 || res?.meta?.requestStatus === 'fulfilled') {
        setApiSuccess("Password reset successfully! Please login with your new password.");
        setTimeout(() => {
          router.push('/login');
        }, 3000);
      } else {
        const resPayload = res?.payload;
        if (resPayload?.errors) {
          setApiError(resPayload.errors.password || resPayload.errors.token || "Failed to reset password");
        } else if (resPayload?.message) {
          setApiError(resPayload.message);
        } else {
          setApiError("Something went wrong. Please try again or request a new link.");
        }
      }
    });
  };

  return (
    <div className="relative min-h-screen bg-[#faf4fe] flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-[14px] shadow-sm w-full max-w-[585px] p-8 md:p-12 flex flex-col">

        {/* Logo */}
        <div className="w-[60px] h-[65px] mb-4 relative flex items-center justify-center">
          <Image src={loginLogo} alt="loginLogo" />
        </div>

        <h1 className="text-[30px] font-semibold text-[#292929] mb-2 text-left">
          Reset Password
        </h1>

        <p className="text-[18px] text-[#545454] mb-6">
          Enter your new password below.
        </p>
        
        {apiSuccess ? (
          <div className="bg-green-50 text-green-700 p-4 rounded-lg mb-6 text-center">
            {apiSuccess}
            <div className="mt-4">
              <Link href="/login" className="text-green-800 font-bold underline">
                Go to Login
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            
            {/* New Password Field */}
            <Label>New Password</Label>
            <div className="w-full max-w-[440px] mb-4">
              <div className="relative mt-2">
                <TextInput
                  type={showPassword ? 'text' : 'password'}
                  className="border border-[#761ed3] rounded-[10px]"
                  placeholder=''
                  {...register("newPassword", { 
                    required: "New password is required",
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/,
                      message: "Password must be at least 8 chars long, contain 1 uppercase, 1 lowercase, and 1 special character."
                    }
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors z-10"
                >
                  {showPassword
                    ? <AiOutlineEyeInvisible size={20} />
                    : <AiOutlineEye size={20} />
                  }
                </button>
              </div>
              {errors?.newPassword && (
                <span className='text-red-500 text-sm mt-1 block'>{errors?.newPassword?.message}</span>
              )}
            </div>

            {/* Confirm Password Field */}
            <Label>Confirm Password</Label>
            <div className="w-full max-w-[440px] mb-6">
              <div className="relative mt-2">
                <TextInput
                  type={showConfirmPassword ? 'text' : 'password'}
                  className="border border-[#761ed3] rounded-[10px]"
                  placeholder=''
                  {...register("confirmPassword", { 
                    required: "Please confirm your password",
                    validate: value => value === newPassword || "Passwords do not match"
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors z-10"
                >
                  {showConfirmPassword
                    ? <AiOutlineEyeInvisible size={20} />
                    : <AiOutlineEye size={20} />
                  }
                </button>
              </div>
              {errors?.confirmPassword && (
                <span className='text-red-500 text-sm mt-1 block'>{errors?.confirmPassword?.message}</span>
              )}
              {apiError && (
                <span className='text-red-500 text-sm mt-1 block'>{apiError}</span>
              )}
            </div>

            <button
              type='submit'
              disabled={isLoading}
              className="cursor-pointer w-full max-w-[440px] h-[50px] bg-[#761ed3] text-white rounded-[8px] text-[18px] font-medium hover:bg-[#6016ab] transition-colors mb-6 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg aria-hidden="true" className="w-5 h-5 text-white animate-spin fill-[#761ed3]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5422 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                  </svg>
                  Saving...
                </>
              ) : "Save Password"}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
