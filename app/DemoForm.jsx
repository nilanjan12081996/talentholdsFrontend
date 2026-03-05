// 'use client';
// import { Button, Datepicker, Label, Textarea, TextInput } from "flowbite-react"
// import Image from "next/image"
// import contact_img from "../assets/imagesource/contact_img.png";
// import captcha_img from "../assets/imagesource/captcha_img.png";
// import { useForm } from "react-hook-form";
// import { useSelector } from "react-redux";
// import { getCountry } from "./Reducer/PartnerSlice";
// const DemoForm=()=>{
//       const { countryList } = useSelector((state) => state.partner);

//   useEffect(() => {
//     dispatch(getCountry());
//   }, [dispatch]);

//       const {
//         register,
//         handleSubmit,
//         formState: { errors },
//         reset,
//       } = useForm();
//     return(
//         <>
//         <div className="lg:flex gap-12">
//                   <div className="lg:w-7/12">
//                     <div className="flex gap-4 form_area mb-4">
//                       <div className="w-6/12">
//                         <div className="mb-0 block">
//                           <Label htmlFor="base">Name <span>*</span></Label>
//                         </div>
//                         <TextInput id="base" type="text" sizing="md" placeholder="Enter Name" />
//                       </div>
//                       <div className="w-6/12">
//                         <div className="mb-0 block">
//                           <Label htmlFor="base">Email Address <span>*</span></Label>
//                         </div>
//                         <TextInput id="base" type="email" sizing="md" placeholder="Enter Email" />
//                       </div>
//                     </div>
//                     <div className="flex gap-4 form_area mb-4">
//                       <div className="w-6/12">
//                         <div className="mb-0 block">
//                           <Label htmlFor="base">Phone <span>*</span></Label>
//                         </div>
//                         <TextInput id="base" type="text" sizing="md" />
//                       </div>
//                       <div className="w-6/12">
//                         <div className="mb-0 block">
//                           <Label htmlFor="base">Organization Name <span>*</span></Label>
//                         </div>
//                         <TextInput id="base" type="text" sizing="md" />
//                       </div>
//                     </div>
//                     <div className="flex gap-4 form_area mb-4">
//                       <div className="w-6/12">
//                         <div className="mb-0 block">
//                           <Label htmlFor="base">Job Level <span>*</span></Label>
//                         </div>
//                         <TextInput id="base" type="text" sizing="md" />
//                       </div>
//                       <div className="w-6/12">
//                         <div className="mb-0 block">
//                           <Label htmlFor="base">Country <span>*</span></Label>
//                         </div>
//                          <Select
//                         {...register("country_id", { required: "Country is required" })}
                        
//                         >
//                         <option value="">Select Country</option>
//                         {countryList?.data?.map((country) => (
//                             <option key={country.value} value={country.value}>
//                             {country.label}
//                             </option>
//                         ))}
//                         </Select>
//                         {errors.country && <span className="text-red-500 text-xs">{errors.country.message}</span>}
//                       </div>
//                     </div>
//                     <div className="flex gap-4 form_area mb-4">
//                       <div className="w-6/12">
//                         <div className="mb-0 block">
//                           <Label htmlFor="base">Website <span>*</span></Label>
//                         </div>
//                         <TextInput id="base" type="email" sizing="md" />
//                       </div>
//                       <div className="w-6/12">
//                         <div className="mb-0 block">
//                           <Label htmlFor="base">Business <span>*</span></Label>
//                         </div>
//                         <TextInput id="base" type="text" sizing="md" />
//                       </div>
//                     </div>
//                     <div className="lg:flex gap-4 form_area mb-4">
//                       <div className="lg:w-6/12">
//                         <div className="mb-0 block">
//                           <Label htmlFor="base">Message <span>*</span></Label>
//                         </div>
//                         <Textarea id="comment" placeholder="Enter Message" required rows={5} />
//                       </div>
//                       <div className="lg:w-6/12">
//                         <div className="mb-0 block">
//                           <Label htmlFor="base">Date <span>*</span></Label>
//                         </div>
//                         <Datepicker />
//                         <div className="mt-2">
//                            <Image src={captcha_img} alt='captcha_img' className="w-9/12" />
//                         </div>
//                       </div>
//                     </div>
//                     <div className="form_area">
//                       <Button  type="submit">Request a Demo</Button>
//                     </div>
//                   </div>
//                   <div className="lg:w-5/12 mt-4 lg:mt-0">
//                     <Image src={contact_img} alt='contact_img' />
//                   </div>
//               </div>
//         </>
//     )
// }
// export default DemoForm






'use client';

import {
  Button,
  Datepicker,
  Label,
  Textarea,
  TextInput,
  Select,
} from "flowbite-react";
import Image from "next/image";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import contact_img from "../assets/imagesource/contact_img.png";
import captcha_img from "../assets/imagesource/captcha_img.png";

import { getCountry } from "./Reducer/PartnerSlice";
import { demoRequest } from "./Reducer/DemoSlice";
import { toast, ToastContainer } from "react-toastify";


const DemoForm = () => {
  const dispatch = useDispatch();
  const { countryList } = useSelector((state) => state.partner);
  const { loading } = useSelector((state) => state.demo); 

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    dispatch(getCountry());
  }, [dispatch]);

  const onSubmit = (data) => {
    dispatch(demoRequest(data)).then((res)=>{
      console.log(res,"res");
      
        if(res?.payload?.status_code===200){
             toast.success(res?.payload?.message)
          reset()
         
        }
    })
    
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
       <ToastContainer/>
      <div className="lg:flex gap-12">
        <div className="lg:w-7/12">

          {/* Name & Email */}
          <div className="flex gap-4 form_area mb-4">
            <div className="w-6/12">
              <Label>Name *</Label>
              <TextInput
                placeholder="Enter Name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
            </div>

            <div className="w-6/12">
              <Label>Email Address *</Label>
              <TextInput
                type="email"
                placeholder="Enter Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: "Invalid email",
                  },
                })}
              />
              {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
            </div>
          </div>

          {/* Phone & Organization */}
          <div className="flex gap-4 form_area mb-4">
            <div className="w-6/12">
              <Label>Phone *</Label>
              <TextInput
                {...register("phone", { required: "Phone is required" })}
              />
              {errors.phone && <p className="text-red-500 text-xs">{errors.phone.message}</p>}
            </div>

            <div className="w-6/12">
              <Label>Organization Name *</Label>
              <TextInput
                {...register("org_name", { required: "Organization is required" })}
              />
              {errors.org_name && <p className="text-red-500 text-xs">{errors.org_name.message}</p>}
            </div>
          </div>

          {/* Job Level & Country */}
          <div className="flex gap-4 form_area mb-4">
            <div className="w-6/12">
              <Label>Job Level *</Label>
              <TextInput
                {...register("job_level", { required: "Job level is required" })}
              />
              {errors.job_level && <p className="text-red-500 text-xs">{errors.job_level.message}</p>}
            </div>

            <div className="w-6/12">
              <Label>Country *</Label>
              <Select
                {...register("country_id", { required: "Country is required" })}
              >
                <option value="">Select Country</option>
                {countryList?.data?.map((country) => (
                  <option key={country.value} value={country.value}>
                    {country.label}
                  </option>
                ))}
              </Select>
              {errors.country_id && <p className="text-red-500 text-xs">{errors.country_id.message}</p>}
            </div>
          </div>

          {/* Website & Business */}
          <div className="flex gap-4 form_area mb-4">
            <div className="w-6/12">
              <Label>Website *</Label>
              <TextInput
                {...register("website", { required: "Website is required" })}
              />
              {errors.website && <p className="text-red-500 text-xs">{errors.website.message}</p>}
            </div>

            <div className="w-6/12">
              <Label>Business *</Label>
              <TextInput
                {...register("business", { required: "Business is required" })}
              />
              {errors.business && <p className="text-red-500 text-xs">{errors.business.message}</p>}
            </div>
          </div>

          {/* Message & Date */}
          <div className="lg:flex gap-4 form_area mb-4">
            <div className="lg:w-6/12">
              <Label>Message *</Label>
              <Textarea
                rows={5}
                {...register("message", { required: "Message is required" })}
              />
              {errors.message && <p className="text-red-500 text-xs">{errors.message.message}</p>}
            </div>

            <div className="lg:w-6/12">
              <Label>Date *</Label>
              {/* <Datepicker
                onSelectedDateChanged={(date) =>
                  register("demo_date").onChange({
                    target: { value: date },
                  })
                }
              /> */}
        <Controller
          name="demo_date"
          control={control}
          rules={{ required: "Date is required" }}
          render={({ field }) => (
            <Datepicker
              onChange={(date) => {
                const formattedDate = date.toLocaleDateString("en-CA"); // YYYY-MM-DD
                field.onChange(formattedDate);
              }}
            />
          )}
        />

        {errors.demo_date && (
          <p className="text-red-500 text-xs">{errors.demo_date.message}</p>
        )}


              <div className="mt-2">
                <Image src={captcha_img} alt="captcha" className="w-9/12" />
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="form_area submit_btn">
          <Button type="submit" disabled={loading}  className={loading ? "opacity-60 cursor-not-allowed" : ""}>
            {loading ? "Waiting..." : "Request a Demo"}
          </Button>
          </div>
        </div>

        <div className="lg:w-5/12 mt-4 lg:mt-0">
          <Image src={contact_img} alt="contact" />
        </div>
      </div>
    </form>
  );
};

export default DemoForm;
