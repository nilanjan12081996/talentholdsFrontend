'use client';

import { useRouter } from 'next/navigation';
import Image from "next/image";
import loginLogo from "../../assets/imagesource/login_logo.png";
import { Label, TextInput } from 'flowbite-react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { login, forgetPassword } from '../Reducer/AuthSlice';
import { useState } from 'react';
import Link from 'next/link';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { ArrowLeft } from 'lucide-react';

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [apiErrors, setApiErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  
  // Forgot Password State
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [isForgotLoading, setIsForgotLoading] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState('');
  const [forgotError, setForgotError] = useState('');

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const {
    register: registerForgot,
    handleSubmit: handleForgotSubmit,
    formState: { errors: forgotErrors },
    reset: resetForgot
  } = useForm();

  const onSubmit = (data) => {
    setApiErrors({});
    setIsLoading(true);
    dispatch(login(data)).then((res) => {
      console.log("Full res:", res);
      console.log("Payload:", res?.payload);

      if (res?.payload?.statusCode === 200) {
        const userId = res?.payload?.id.toString();
        const encodedId = btoa(userId);
        const encodedEmail = btoa(data.email);
        router.push(`/verify?id=${encodedId}&email=${encodedEmail}`);
      } else {
        setIsLoading(false);
        const payload = res?.payload;
        if (payload?.errors) {
          setApiErrors(payload.errors);
        } else if (payload?.message) {
          setApiErrors({ general: payload.message });
        }
      }
    });
  };

  const onForgotSubmit = (data) => {
    setForgotError('');
    setForgotSuccess('');
    setIsForgotLoading(true);
    dispatch(forgetPassword({ email: data.forgotEmail })).then((res) => {
      setIsForgotLoading(false);
      if (res?.payload?.statusCode === 200 || res?.meta?.requestStatus === 'fulfilled') {
        setForgotSuccess("Password reset link has been sent to your email!");
        resetForgot();
      } else {
        const payload = res?.payload;
        if (payload?.errors) {
          setForgotError(payload.errors.email || "Failed to send reset link");
        } else if (payload?.message) {
          setForgotError(payload.message);
        } else {
          setForgotError("Something went wrong. Please try again.");
        }
      }
    });
  };

  return (
    <div className="relative min-h-screen bg-[#faf4fe] flex items-center justify-center p-4 font-sans">
      <Link href="/" className="absolute top-6 left-6 md:top-10 md:left-10 text-[#545454] hover:text-[#761ed3] flex items-center gap-2 font-medium transition-colors z-10">
        <ArrowLeft size={20} />
        Back to Home
      </Link>
      <div className="bg-white rounded-[14px] shadow-sm w-full max-w-[585px] p-8 md:p-12 flex flex-col">

        {/* Logo */}
        <div className="w-[60px] h-[65px] mb-4 relative flex items-center justify-center">
          <Image src={loginLogo} alt="loginLogo" />
        </div>

        {isForgotPassword ? (
          <>
            <h1 className="text-[30px] font-semibold text-[#292929] mb-2 text-left">
              Forgot Password
            </h1>
            <p className="text-[18px] text-[#545454] mb-6">
              Enter your email address and we&apos;ll send you a link to reset your password.
            </p>

            <form onSubmit={handleForgotSubmit(onForgotSubmit)}>
              {/* Email Field */}
              <Label>Email</Label>
              <div className="w-full max-w-[440px] mb-4">
                <TextInput
                  type='email'
                  className="border border-[#761ed3] rounded-[10px] mt-2"
                  {...registerForgot("forgotEmail", { 
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                />
                {forgotErrors?.forgotEmail && (
                  <span className='text-red-500 text-sm mt-1 block'>{forgotErrors?.forgotEmail?.message}</span>
                )}
                {forgotError && (
                  <span className='text-red-500 text-sm mt-1 block'>{forgotError}</span>
                )}
                {forgotSuccess && (
                  <span className='text-green-600 text-sm mt-1 block'>{forgotSuccess}</span>
                )}
              </div>

              <button
                type='submit'
                disabled={isForgotLoading}
                className="cursor-pointer w-full max-w-[440px] h-[50px] bg-[#761ed3] text-white rounded-[8px] text-[18px] font-medium hover:bg-[#6016ab] transition-colors mb-4 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isForgotLoading ? (
                  <>
                    <svg aria-hidden="true" className="w-5 h-5 text-white animate-spin fill-[#761ed3]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5422 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    Sending...
                  </>
                ) : "Send Reset Link"}
              </button>
              
              <button 
                type="button" 
                onClick={() => {
                  setIsForgotPassword(false);
                  setForgotError('');
                  setForgotSuccess('');
                }}
                className="w-full max-w-[440px] text-center text-[15px] text-[#545454] hover:text-[#761ed3] font-medium transition-colors"
              >
                Back to Login
              </button>
            </form>
          </>
        ) : (
          <>
            <h1 className="text-[30px] font-semibold text-[#292929] mb-2 text-left">
              Welcome to TalentHold
            </h1>

            <p className="text-[18px] text-[#545454] mb-6">
              Please Sign up or Sign in below
            </p>

            <form onSubmit={handleSubmit(onSubmit)}>

              {/* Email Field */}
              <Label>Email</Label>
              <div className="w-full max-w-[440px] mb-4">
                <TextInput
                  type='text'
                  className="border border-[#761ed3] rounded-[10px] mt-2"
                  {...register("email", { required: "Email is required" })}
                />
                {errors?.email && (
                  <span className='text-red-500 text-sm mt-1 block'>{errors?.email?.message}</span>
                )}
                {apiErrors?.email && (
                  <span className='text-red-500 text-sm mt-1 block'>{apiErrors.email}</span>
                )}
                {apiErrors?.general && (
                  <span className='text-red-500 text-sm mt-1 block'>{apiErrors.general}</span>
                )}
              </div>

              {/* Password Field */}
              <Label>Password</Label>
              <div className="w-full max-w-[440px] mb-2">
                <div className="relative mt-2">
                  <TextInput
                    type={showPassword ? 'text' : 'password'}
                    className="border border-[#761ed3] rounded-[10px]"
                    placeholder=''
                    {...register("password", { required: "Password is required" })}
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
                {errors?.password && (
                  <span className='text-red-500 text-sm mt-1 block'>{errors?.password?.message}</span>
                )}
                {apiErrors?.password && (
                  <span className='text-red-500 text-sm mt-1 block'>{apiErrors.password}</span>
                )}
              </div>
              
              <div className="w-full max-w-[440px] flex justify-end mb-6">
                <button 
                  type="button" 
                  onClick={() => setIsForgotPassword(true)}
                  className="text-sm font-medium text-[#761ed3] hover:underline cursor-pointer"
                >
                  Forgot Password?
                </button>
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
                    Loading...
                  </>
                ) : "Login"}
              </button>

            </form>

            <div className='text-center mt-2'>
              Don&apos;t have account? <span className='text-blue-500'><Link href="/signup">signup</Link></span>
            </div>
          </>
        )}

      </div>
    </div>
  );
}


// 'use client';

// import { useRouter } from 'next/navigation';
// import Image from "next/image";
// import loginLogo from "../../assets/imagesource/login_logo.png";
// import { Label, TextInput } from 'flowbite-react';
// import { useForm } from 'react-hook-form';
// import { useDispatch } from 'react-redux';
// import { login } from '../Reducer/AuthSlice';
// import { useState } from 'react';
// import Link from 'next/link';

// export default function Login() {
//   const router = useRouter();
  
//   const dispatch=useDispatch()
//     const {
//     register,
//     watch,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit=(data)=>{
//     dispatch(login(data)).then((res)=>{
    
      
//       if(res?.payload?.statusCode===200){
//     const userId = res?.payload?.id.toString(); // Ensure it's a string
      
//       // Encode the ID to Base64
//       const encodedId = btoa(userId); 
      
//       router.push(`/verify?id=${encodedId}`);
//       }
//     })
//   }

//   return (
//     <div className="min-h-screen bg-[#faf4fe] flex items-center justify-center p-4 font-sans">
//       <div className="bg-white rounded-[14px] shadow-sm w-full max-w-[585px] p-8 md:p-12 flex flex-col">
        
//         {/* Logo */}
//         <div className="w-[60px] h-[65px] mb-6 relative flex items-center justify-center">
//           <Image src={loginLogo} alt="loginLogo" />
//         </div>

//         <h1 className="text-[30px] font-semibold text-[#292929] mb-2 text-left">
//           Welcome to TalentHold
//         </h1>

//         <p className="text-[18px] text-[#545454] mb-8">
//           Please Sign up or Sign in below
//         </p>

//         <form onSubmit={handleSubmit(onSubmit)}>
//         <Label>Email</Label>
//         <div className="w-full max-w-[440px] mb-6">
         
//           <TextInput
//           type='text'
//           className="border border-[#761ed3] rounded-[10px] mt-2"
//           {...register("email",{required:"Email is required"})}
//           />
         
//        {
//         errors?.email&&(
//           <span className='text-red-500'>{ errors?.email?.message}</span>
//         )
//        }
//         </div>
//           <Label>Password</Label>
//          <div className="w-full max-w-[440px] mb-6">
//             <TextInput
//           type='password'
//           className="border border-[#761ed3] rounded-[10px]"
//           placeholder=''
//           {...register("password",{required:"Password is required"})}
//           />
//           {
//             errors?.password&&(
//               <span className='text-red-500'>{errors?.password?.message}</span>
//             )
//           }
//          </div>
       

       
//         <button
//           // onClick={() => router.push('/verify')}
//           type='submit'
//           className="w-full max-w-[440px] h-[70px] bg-[#761ed3] text-white rounded-[8px] text-[18px] font-medium hover:bg-[#6016ab] transition-colors mb-8 flex items-center justify-center gap-2"
//         >
//           {/* Continue with email */}
//           Login
//         </button>
//           </form>
//         {/* Divider */}
//         <div className="w-full max-w-[440px] flex items-center gap-4 mb-8">
//           <div className="h-[1px] flex-1 border-t-2 border-dashed border-[#DBDBDB]"></div>
//           <span className="text-[#979797] text-[20px]">Or</span>
//           <div className="h-[1px] flex-1 border-t-2 border-dashed border-[#DBDBDB]"></div>
//         </div>

//         {/* Google Button */}
//         <button
//           onClick={() => router.push('/dashboard')}
//           className="w-full max-w-[440px] h-[70px] bg-[#f7f7f7] border border-[#c9c9c9] rounded-[4px] flex items-center justify-center gap-4 hover:bg-gray-100 transition-colors"
//         >
//           <img
//             src="https://www.svgrepo.com/show/475656/google-color.svg"
//             alt="Google"
//             className="w-[36px] h-[36px]"
//           />
//           <span className="text-[#6b6b6b] text-[20px] font-medium">
//             Continue with Google
//           </span>
//         </button>
//          <div className='text-center mt-2'>Don't have account? <span className='text-blue-500'><Link href="/signup">signup</Link></span> </div>
//       </div>
//     </div>
//   );
// }
