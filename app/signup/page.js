'use client';

import { useRouter } from 'next/navigation';
import Image from "next/image";
import loginLogo from "../../assets/imagesource/login_logo.png";
import { Label, TextInput } from 'flowbite-react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { login, registration, sendOtp, resendOtp } from '../Reducer/AuthSlice';
import { workspaceList } from '../Reducer/WorkspaceSlice';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { ArrowLeft } from 'lucide-react';

export default function Login() {
  const { workspaceData } = useSelector((state) => state?.workspace)
  const router = useRouter();
  const [userId, setUserId] = useState()
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [apiErrors, setApiErrors] = useState({});
  const dispatch = useDispatch()
  
  const [step, setStep] = useState(1);
  const [savedData, setSavedData] = useState(null);
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [otpArr, setOtpArr] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  const handleOtpChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtpArr([...otpArr.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      setOtpArr([...otpArr.map((d, idx) => (idx === index ? "" : d))]);
      if (e.target.previousSibling) {
        e.target.previousSibling.focus();
      }
    } else if (e.key === "ArrowLeft") {
      if (e.target.previousSibling) {
        e.target.previousSibling.focus();
      }
    } else if (e.key === "ArrowRight") {
      if (e.target.nextSibling) {
        e.target.nextSibling.focus();
      }
    }
  };

  useEffect(() => {
    let interval;
    if (step === 2 && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (step === 2 && timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const startTimer = () => {
    setTimer(60);
    setCanResend(false);
  }

  const handleResendOtp = () => {
    setApiErrors({});
    dispatch(sendOtp({ email: savedData?.email })).then((res) => {
      const payload = res?.payload;
      if (payload?.statusCode === 200) {
        setGeneratedOtp(payload.otp.toString());
        startTimer();
      } else {
        setApiErrors({ general: payload?.message || "Failed to resend OTP" });
      }
    });
  }

  const handleVerifyOtp = () => {
    setApiErrors({});
    const enteredOtp = otpArr.join("");
    if (enteredOtp.length !== 6) {
      setApiErrors({ otp: "Please enter a valid 6-digit OTP" });
      return;
    }
    if (enteredOtp === generatedOtp) {
      setIsVerifyingOtp(true);
      dispatch(registration(savedData)).then((res) => {
        setIsVerifyingOtp(false);
        console.log("res", res);

        const payload = res?.payload;
        const status = res?.meta?.requestStatus;

        if (status === "fulfilled" && (payload?.statusCode === 200 || payload?.statusCode === 201)) {
          dispatch(workspaceList()).then((res) => {
            console.log("res", res);
            if (res?.payload?.data?.length <= 0) {
              router.push('/workspace');
            } else {
              router.push('/dashboard');
            }
          })
        } else {
          if (payload?.errors) {
            setApiErrors(payload.errors);
          } else if (payload?.message) {
            setApiErrors({ general: payload.message });
          }
        }
      })
    } else {
      setApiErrors({ otp: "Invalid OTP" });
    }
  }

  const {
    register,
    watch,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setApiErrors({});
    setIsSendingOtp(true);
    const { confirmPassword, ...submitData } = data;
    
    dispatch(sendOtp({ email: submitData.email })).then((res) => {
      setIsSendingOtp(false);
      console.log("sendOtp res", res);
      const payload = res?.payload;
      const status = res?.meta?.requestStatus;

      if (status === "fulfilled" && payload?.statusCode === 200) {
        setSavedData(submitData);
        setGeneratedOtp(payload.otp.toString());
        setStep(2);
        startTimer();
      } else {
        if (payload?.errors) {
          setApiErrors(payload.errors);
        } else if (payload?.message) {
          setApiErrors({ general: payload.message });
        } else {
           setApiErrors({ general: "Failed to send OTP" });
        }
      }
    });
  }

  console.log("workspaceList", workspaceData);

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

        {step === 1 ? (
          <>
            <h1 className="text-[30px] font-semibold text-[#292929] mb-2 text-left">
              Welcome to TalentHold
            </h1>

            <p className="text-[18px] text-[#545454] mb-6">
              Please Sign up or Sign in below
            </p>
          </>
        ) : (
          <div className="text-left mb-6 mt-4">
            <h1 className="text-[28px] font-semibold text-[#292929] mb-2">
              Enter confirmation code
            </h1>
            <p className="text-[#545454] text-[16px]">
              To confirm your email, we just sent a 6 digit code<br/>to <span className="font-semibold text-black">{savedData?.email}</span>
            </p>
          </div>
        )}

        {step === 1 ? (
        <form onSubmit={handleSubmit(onSubmit)}>

          {/* Name Field */}
          <Label>Company Name</Label>
          <div className="w-full max-w-[440px] mb-4">
            <TextInput
              type='text'
              className="border border-[#761ed3] rounded-[10px] mt-2"
              {...register("name", { required: "Company name is required" })}
            />
            {errors?.name && (
              <span className='text-red-500 text-sm mt-1 block'>{errors?.name?.message}</span>
            )}
            {apiErrors?.name && (
              <span className='text-red-500 text-sm mt-1 block'>{apiErrors.name}</span>
            )}
          </div>

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
          <div className="w-full max-w-[440px] mb-4">
            <div className="relative mt-2">
              <TextInput
                type={showPassword ? 'text' : 'password'}
                className="border border-[#761ed3] rounded-[10px]"
                placeholder=''
                {...register("password", { 
                  required: "Password is required",
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/,
                    message: "Password must contain at least 1 uppercase letter, 1 lowercase letter, 1 special character, and be 8+ chars long"
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
            {errors?.password && (
              <span className='text-red-500 text-sm mt-1 block'>{errors?.password?.message}</span>
            )}
            {apiErrors?.password && (
              <span className='text-red-500 text-sm mt-1 block'>{apiErrors.password}</span>
            )}
          </div>

          {/* Confirm Password Field */}
          <Label>Confirm Password</Label>
          <div className="w-full max-w-[440px] mb-4">
            <div className="relative mt-2">
              <TextInput
                type={showConfirmPassword ? 'text' : 'password'}
                className="border border-[#761ed3] rounded-[10px]"
                placeholder=''
                {...register("confirmPassword", { 
                  required: "Confirm password is required",
                  validate: (val) => {
                    if (getValues("password") !== val) {
                      return "Passwords do not match";
                    }
                  }
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
          </div>

          {/* Mobile Field */}
          {/* <Label>Mobile Number</Label>
          <div className="w-full max-w-[440px] mb-4">
            <TextInput
              type='text'
              className="border border-[#761ed3] rounded-[10px]"
              placeholder=''
              {...register("mobile", { required: "Mobile Number is required" })}
            />
            {errors?.mobile && (
              <span className='text-red-500 text-sm mt-1 block'>{errors?.mobile?.message}</span>
            )}
            {apiErrors?.mobile && (
              <span className='text-red-500 text-sm mt-1 block'>{apiErrors.mobile}</span>
            )}
          </div> */}

          <button
            type='submit'
            disabled={isSendingOtp}
            className="w-full max-w-[440px] h-[50px] bg-[#761ed3] text-white rounded-[8px] text-[18px] font-medium hover:bg-[#6016ab] transition-colors mb-6 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSendingOtp ? (
              <>
                <svg aria-hidden="true" className="w-5 h-5 text-white animate-spin fill-[#761ed3]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5422 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                Loading...
              </>
            ) : "Register"}
          </button>

        </form>
        ) : (
          <div className="w-full max-w-[440px] flex flex-col gap-4 mb-6">
            <div className="flex gap-2 sm:gap-3 justify-start mb-2">
              {otpArr.map((data, index) => {
                return (
                  <input
                    className="w-12 h-12 sm:w-14 sm:h-14 border border-[#d9d9d9] rounded-[8px] text-center text-xl font-semibold focus:border-[#761ed3] focus:ring-1 focus:ring-[#761ed3] outline-none transition-all"
                    type="text"
                    name="otp"
                    maxLength="1"
                    key={index}
                    value={data}
                    onChange={e => handleOtpChange(e.target, index)}
                    onKeyDown={e => handleOtpKeyDown(e, index)}
                    onFocus={e => e.target.select()}
                  />
                );
              })}
            </div>
            {apiErrors?.otp && (
              <span className='text-red-500 text-sm block -mt-2'>{apiErrors.otp}</span>
            )}
            {apiErrors?.general && (
              <span className='text-red-500 text-sm block -mt-2'>{apiErrors.general}</span>
            )}

            <div className="flex items-center gap-2 mt-2 text-[15px] mb-2">
              <span className="text-[#545454]">
                Didn't receive the code?
              </span>
              <button
                onClick={handleResendOtp}
                disabled={!canResend}
                className={`font-semibold ${canResend ? 'text-[#761ed3] hover:underline cursor-pointer' : 'text-gray-400 cursor-not-allowed'}`}
              >
                {timer > 0 ? `Resend (${timer}s)` : "Resend"}
              </button>
            </div>

            <button
              onClick={handleVerifyOtp}
              disabled={isVerifyingOtp}
              className="w-full h-[50px] bg-[#761ed3] text-white rounded-[8px] text-[18px] font-medium hover:bg-[#6016ab] transition-colors mt-2 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isVerifyingOtp ? (
              <>
                <svg aria-hidden="true" className="w-5 h-5 text-white animate-spin fill-[#761ed3]" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5422 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                Loading...
              </>
              ) : "Submit"}
            </button>

          </div>
        )}

        {step === 1 && (
          <></>
        )}

        <div className='text-center mt-2'>
          already have an account? <span className='text-blue-500'><Link href="/login">signin</Link></span>
        </div>

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
// import { useDispatch, useSelector } from 'react-redux';
// import { login, registration, workspaceList } from '../Reducer/AuthSlice';
// import { useState } from 'react';
// import Link from 'next/link';

// export default function Login() {
//   const{workspaceData}=useSelector((state)=>state?.auth)
//   const router = useRouter();
//   const[userId,setUserId]=useState()
//   const dispatch=useDispatch()
//     const {
//     register,
//     watch,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit=(data)=>{
//     dispatch(registration(data)).then((res)=>{
//       console.log("res",res);
      
//       if(res?.payload?.statusCode===200||res?.payload?.statusCode===201){
//     // const userId = res?.payload?.id.toString(); // Ensure it's a string
      
//     //   // Encode the ID to Base64
//     //   const encodedId = btoa(userId); 
      
//     //   router.push(`/verify?id=${encodedId}`);
//    // router.push("/dashboard");
//    dispatch(workspaceList()).then((res)=>{
//     console.log("res",res);
//     if(res?.payload?.data.length<=0){
//        router.push('/workspace');
//     }
//     else{
//       router.push('/dashboard');
//     }
    
//    })
//       }
//     })
//   }
// console.log("workspaceList",workspaceData);

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
//         <Label>Name</Label>
//         <div className="w-full max-w-[440px] mb-6">
         
//           <TextInput
//           type='text'
//           className="border border-[#761ed3] rounded-[10px] mt-2"
//           {...register("name",{required:"Name is required"})}
//           />
         
//        {
//         errors?.name&&(
//           <span className='text-red-500'>{ errors?.name?.message}</span>
//         )
//        }
//         </div>
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
//             <Label>Mobile</Label>
//          <div className="w-full max-w-[440px] mb-6">
//             <TextInput
//           type='text'
//           className="border border-[#761ed3] rounded-[10px]"
//           placeholder=''
//           {...register("mobile",{required:"Mobile Number is required"})}
//           />
//           {
//             errors?.mobile&&(
//               <span className='text-red-500'>{errors?.mobile?.message}</span>
//             )
//           }
//          </div>
       

       
//         <button
//           // onClick={() => router.push('/verify')}
//           type='submit'
//           className="w-full max-w-[440px] h-[70px] bg-[#761ed3] text-white rounded-[8px] text-[18px] font-medium hover:bg-[#6016ab] transition-colors mb-8 flex items-center justify-center gap-2"
//         >
//           {/* Continue with email */}
//           Register
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
//         <div className='text-center mt-2'>already have an account? <span className='text-blue-500'><Link href="/login">signin</Link></span> </div>
//       </div>
//     </div>
//   );
// }
