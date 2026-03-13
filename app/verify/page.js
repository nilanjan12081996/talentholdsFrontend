'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import Image from "next/image";
import loginLogo from "../../assets/imagesource/login_logo.png";
import { verifyOtp, workspaceList } from '../Reducer/AuthSlice';
import { useDispatch, useSelector } from 'react-redux';

export default function Verify() {
  const searchParams = useSearchParams();
  const [userId, setUserId] = useState(null);
  const{otpData}=useSelector((state)=>state?.auth)
  const router = useRouter();
  const dispatch=useDispatch()
  const [code, setCode] = useState(['', '', '', '', '', '']);


  useEffect(() => {
    const encodedId = searchParams.get('id');
    if (encodedId) {
      try {
        // Decode the Base64 string back to the original ID
        const decodedId = atob(encodedId);
        setUserId(decodedId);
      } catch (e) {
        console.error("Invalid encoded ID", e);
        // Handle error (e.g., redirect back to login)
      }
    }
  }, [searchParams]);


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
            
           })
      } else {
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
            get@ziontutorial.com
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

        <p className="text-[#545454] text-[18px] mb-8 w-full max-w-[440px] text-left">
          Didn&apos;t receive the code?
        </p>

        <button
          onClick={handleSubmit}
          className="w-full max-w-[440px] h-[70px] bg-[#761ed3] text-white rounded-[8px] text-[18px] font-medium hover:bg-[#6016ab] transition-colors"
        >
          Submit
        </button>
      </div>
    </div>
  );
}
