'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import Image from "next/image";
import loginLogo from "../../assets/imagesource/login_logo.png";
import { verifyOtp, resendOtp } from '../Reducer/AuthSlice';
import { workspaceList } from '../Reducer/WorkspaceSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function Verify() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const { otpData } = useSelector((state) => state?.auth)
  const router = useRouter();
  const dispatch = useDispatch()
  const [code, setCode] = useState(['', '', '', '', '', '']);

  // Resend OTP states
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);

  let userId = null;
  let email = '';
  const encodedId = searchParams.get('id');
  const encodedEmail = searchParams.get('email');
  
  if (encodedId) {
    try {
      userId = atob(encodedId);
    } catch (e) {
      console.error("Invalid encoded ID", e);
    }
  }
  
  if (encodedEmail) {
    try {
      email = atob(encodedEmail);
    } catch (e) {
      console.error("Invalid encoded email", e);
    }
  }

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const startTimer = () => {
    setTimer(60);
    setCanResend(false);
  }

  const handleResendOtp = () => {
    if (!email || !userId) return;
    setIsSendingOtp(true);
    dispatch(resendOtp({ email, id: Number(userId) })).then((res) => {
      setIsSendingOtp(false);
      const payload = res?.payload;
      if (payload?.statusCode === 200) {
        startTimer();
      } else {
        alert(payload?.message || "Failed to resend OTP");
      }
    });
  }

  const handleInputChange = (value, index) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
  };

  // const handleSubmit = () => {
  //   router.push('/dashboard');
  // };

  const handleSubmit = () => {
    // 1. Join the array of digits into a single string (e.g., "123456")
    const otpString = code.join('');

    // 2. Validate that we have both the ID and the full OTP
    if (!userId || otpString.length < 6) {
      alert("Please enter the full 6-digit code.");
      return;
    }

    setIsLoading(true);

    // 3. Prepare the payload
    const payload = {
      id: Number(userId), // Convert back to number if your API expects an integer
      otp: otpString
    };

    // 4. Dispatch the Thunk
    dispatch(verifyOtp(payload)).then((res) => {
      if (res?.payload?.statusCode === 200) {
        //router.push('/dashboard');
         dispatch(workspaceList()).then((res)=>{
            console.log("res",res);
            if(res?.payload?.data?.length<=0){
              router.push('/workspace');
            }
            else{
              router.push('/dashboard');
            }
            
           });
      } else {
        setIsLoading(false);
        // Handle error (e.g., show a toast or error message)
        console.error("Verification failed", res.payload);
      }
    });
  };
console.log("otpData",otpData);

  return (
    <div className="min-h-screen bg-[#faf4fe] flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-[14px] shadow-sm w-full max-w-[585px] p-8 md:p-12 flex flex-col">
        
        {/* Logo */}
        <div className="w-[60px] h-[65px] mb-6 relative flex items-center justify-center">
          <Image src={loginLogo} alt="loginLogo" />
        </div>

        <h1 className="text-[30px] font-semibold text-[#292929] mb-4">
          Enter confirmation code
        </h1>

        <p className="text-[18px] text-[#545454] max-w-[440px] mb-8">
          To confirm your email, we just sent a 6 digit code to{" "}
          <span className="font-medium text-black">
            {email || "your email address"}
          </span>
        </p>

        {/* OTP Inputs */}
        <div className="flex gap-2 md:gap-4 mb-8 justify-center w-full max-w-[440px]">
          {code.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleInputChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`w-[45px] h-[50px] md:w-[56px] md:h-[60px] border ${
                digit ? 'border-[#761ed3]' : 'border-[#cfcfcf]'
              } rounded-[10px] text-center text-2xl font-medium focus:border-[#761ed3] focus:outline-none focus:ring-2 ring-[#761ed3]/20 transition-all`}
            />
          ))}
        </div>

        <div className="flex items-center gap-2 mb-8 w-full max-w-[440px] text-left">
          <span className="text-[#545454] text-[16px]">
            Didn&apos;t receive the code?
          </span>
          <button
            onClick={handleResendOtp}
            disabled={!canResend || isSendingOtp}
            className={`font-semibold text-[16px] ${canResend ? 'text-[#761ed3] hover:underline cursor-pointer' : 'text-gray-400 cursor-not-allowed'}`}
          >
            {isSendingOtp ? "Sending..." : (timer > 0 ? `Resend (${timer}s)` : "Resend")}
          </button>
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full max-w-[440px] h-[50px] bg-[#761ed3] text-white rounded-[8px] text-[18px] font-medium hover:bg-[#6016ab] transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
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
    </div>
  );
}
