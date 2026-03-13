'use client'
import Image from "next/image";
import loginLogo from "../../assets/imagesource/login_logo.png";
import { Label, TextInput } from "flowbite-react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { createWorkspace, workspaceList } from "../Reducer/AuthSlice";
import { toast, ToastContainer } from "react-toastify";

export default function Workspace(){
  const dispatch=useDispatch()
    const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit=(data)=>{
    dispatch(createWorkspace(data)).then((res)=>{
        if(res?.payload?.statusCode===201||res?.payload?.statusCode===200){
            toast.success(res?.payload?.message)
            dispatch(workspaceList())
        }
    })
  }
return(
<>
 <div className="min-h-screen bg-[#faf4fe] flex items-center justify-center p-4 font-sans">
      <div className="bg-white rounded-[14px] shadow-sm w-full max-w-[585px] p-8 md:p-12 flex flex-col">
        
        {/* Logo */}
        <ToastContainer/>
       
        <h1 className="text-[30px] font-semibold text-[#292929] mb-2 text-left">
         Create New Workspace
        </h1>

       

        <form onSubmit={handleSubmit(onSubmit)}>
        <Label>Workspace Name</Label>
        <div className="w-full max-w-[440px] mb-6">
         
          <TextInput
          type='text'
          className="border border-[#761ed3] rounded-[10px] mt-2"
          {...register("name",{required:"Email is required"})}
          />
         
       {
        errors?.name&&(
          <span className='text-red-500'>{ errors?.name?.message}</span>
        )
       }
        </div>
       
       

       
        <button
          // onClick={() => router.push('/verify')}
          type='submit'
          className="w-full max-w-[440px] h-[70px] bg-[#761ed3] text-white rounded-[8px] text-[18px] font-medium hover:bg-[#6016ab] transition-colors mb-8 flex items-center justify-center gap-2"
        >
          
          Create
        </button>
        </form>
       
       
       
      </div>
    </div>
</>
)
}