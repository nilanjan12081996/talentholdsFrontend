'use client';

import { useRouter } from 'next/navigation';
import Image from "next/image";
import loginLogo from "../../assets/imagesource/login_logo.png";
import { Label, TextInput } from 'flowbite-react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login, registration } from '../Reducer/AuthSlice';
import { useState } from 'react';
import Link from 'next/link';

export default function Login() {
  const router = useRouter();
  const[userId,setUserId]=useState()
  const dispatch=useDispatch()
    const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit=(data)=>{
    dispatch(registration(data)).then((res)=>{
      console.log("res",res);
      
      if(res?.payload?.statusCode===200||res?.payload?.statusCode===201){
    // const userId = res?.payload?.id.toString(); // Ensure it's a string
      
    //   // Encode the ID to Base64
    //   const encodedId = btoa(userId); 
      
    //   router.push(`/verify?id=${encodedId}`);
    router.push("/dashboard");
      }
    })
  }

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

        <form onSubmit={handleSubmit(onSubmit)}>
        <Label>Name</Label>
        <div className="w-full max-w-[440px] mb-6">
         
          <TextInput
          type='text'
          className="border border-[#761ed3] rounded-[10px] mt-2"
          {...register("name",{required:"Name is required"})}
          />
         
       {
        errors?.name&&(
          <span className='text-red-500'>{ errors?.name?.message}</span>
        )
       }
        </div>
        <Label>Email</Label>
        <div className="w-full max-w-[440px] mb-6">
         
          <TextInput
          type='text'
          className="border border-[#761ed3] rounded-[10px] mt-2"
          {...register("email",{required:"Email is required"})}
          />
         
       {
        errors?.email&&(
          <span className='text-red-500'>{ errors?.email?.message}</span>
        )
       }
        </div>
          <Label>Password</Label>
         <div className="w-full max-w-[440px] mb-6">
            <TextInput
          type='password'
          className="border border-[#761ed3] rounded-[10px]"
          placeholder=''
          {...register("password",{required:"Password is required"})}
          />
          {
            errors?.password&&(
              <span className='text-red-500'>{errors?.password?.message}</span>
            )
          }
         </div>
            <Label>Mobile</Label>
         <div className="w-full max-w-[440px] mb-6">
            <TextInput
          type='text'
          className="border border-[#761ed3] rounded-[10px]"
          placeholder=''
          {...register("mobile",{required:"Mobile Number is required"})}
          />
          {
            errors?.mobile&&(
              <span className='text-red-500'>{errors?.mobile?.message}</span>
            )
          }
         </div>
       

       
        <button
          // onClick={() => router.push('/verify')}
          type='submit'
          className="w-full max-w-[440px] h-[70px] bg-[#761ed3] text-white rounded-[8px] text-[18px] font-medium hover:bg-[#6016ab] transition-colors mb-8 flex items-center justify-center gap-2"
        >
          {/* Continue with email */}
          Login
        </button>
          </form>
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
        <div className='text-center mt-2'>already have an account? <span className='text-blue-500'><Link href="/login">signin</Link></span> </div>
      </div>
    </div>
  );
}
