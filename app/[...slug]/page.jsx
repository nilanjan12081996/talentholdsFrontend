// 'use client';

// import { useEffect, useState, use } from "react"; // <-- Import 'use' from react
// import { useDispatch, useSelector } from "react-redux";
// import { getForm } from "../Reducer/FormbuilderSlice"

// export default function PublicFormPage({ params }) {
//     // 1. UNWRAP THE PARAMS PROMISE
//     const unwrappedParams = use(params);
//     const slugArray = unwrappedParams.slug; 

//     const dispatch = useDispatch();
//     const { currentForm, loading } = useSelector((state) => state?.formBuilder || {});
    
//     const [answers, setAnswers] = useState({});
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [isSuccess, setIsSuccess] = useState(false);

//     // 2. FETCH THE DATA
//     useEffect(() => {
//         // If the URL is /3/new_test_form/123, slugArray is ["3", "new_test_form", "123"]
//         if (slugArray && slugArray.length > 0) {
//             // Join it back together: "3/new_test_form/123"
//             const joinedSlug = slugArray.join('/');
            
//             console.log("Fetching form with slug:", joinedSlug);
//             dispatch(getForm(joinedSlug));
//         }
//     }, [dispatch, slugArray]);

//     const handleInputChange = (fieldId, value) => {
//         setAnswers(prev => ({
//             ...prev,
//             [fieldId]: value
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setIsSubmitting(true);
        
//         console.log("Submitting answers:", answers);
        
//         // TODO: Dispatch your submit response API thunk here
//         // await dispatch(submitFormResponse({ formId: currentForm.id, responses: answers }));
        
//         setTimeout(() => {
//             setIsSubmitting(false);
//             setIsSuccess(true);
//         }, 1000);
//     };

//     // ... Rest of your component (loading checks, isSuccess checks, form rendering) remains exactly the same!

//     if (loading) {
//         return <div className="text-gray-500 mt-20">Loading form...</div>;
//     }

//     if (!currentForm) {
//         return <div className="text-gray-500 mt-20">Form not found or unavailable.</div>;
//     }

//     if (isSuccess) {
//         return (
//             <div className="w-full max-w-2xl bg-white p-8 rounded-[20px] shadow-sm text-center border border-green-200">
//                 <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">✓</div>
//                 <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
//                 <p className="text-gray-600">Your response has been successfully submitted.</p>
//             </div>
//         );
//     }

//     const fields = currentForm.fields || [];

//     return (
//         <div className="w-full max-w-2xl">
//             {/* Form Header */}
//             <div className="bg-white p-8 rounded-t-[20px] border-t-8 border-[#8624F0] shadow-sm mb-4">
//                 <h1 className="text-3xl font-bold text-gray-900 mb-2">{currentForm.title}</h1>
//                 {currentForm.description && (
//                     <p className="text-gray-600 whitespace-pre-wrap">{currentForm.description}</p>
//                 )}
//             </div>

//             {/* Form Fields */}
//             <form onSubmit={handleSubmit} className="space-y-4">
//                 {fields.map((field) => (
//                     <div key={field.id} className="bg-white p-6 rounded-[12px] shadow-sm border border-gray-100">
//                         <label className="block text-base font-medium text-gray-900 mb-1">
//                             {field.label} {field.isRequired && <span className="text-red-500">*</span>}
//                         </label>
//                         {field.description && (
//                             <p className="text-sm text-gray-500 mb-4">{field.description}</p>
//                         )}
                        
//                         <div className="mt-3">
//                             <LiveFieldInput 
//                                 field={field} 
//                                 value={answers[field.id] || ""} 
//                                 onChange={(val) => handleInputChange(field.id, val)} 
//                             />
//                         </div>
//                     </div>
//                 ))}

//                 {/* Submit Button */}
//                 <div className="pt-4 flex justify-end">
//                     <button
//                         type="submit"
//                         disabled={isSubmitting}
//                         className="px-8 py-3 bg-[#8624F0] text-white rounded-[10px] font-bold hover:bg-[#6c1dc0] transition-colors disabled:opacity-50"
//                     >
//                         {isSubmitting ? "Submitting..." : "Submit"}
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// }



// // ─── Interactive Live Field Input ──────────────────────────────────────────────
// function LiveFieldInput({ field, value, onChange }) {
//     const inputClass = "w-full p-3 border border-gray-300 rounded-[8px] focus:ring-2 focus:ring-[#8624F0]/30 focus:border-[#8624F0] outline-none transition-all";

//     // Note: You will need to map fieldTypeId back to string types, or check the ID directly
//     // Assuming fieldTypeId 1 = Short Text, 2 = Long Text, 7 = Radio, etc.
//     // Replace these case numbers with your actual API fieldTypeId numbers
//     switch (field.fieldTypeId) {
//         case 1: // Short Text
//         case 3: // Email (Assuming ID 3 is email)
//         case 4: // Phone
//         case 5: // Number
//             return (
//                 <input 
//                     type={field.fieldTypeId === 3 ? "email" : field.fieldTypeId === 5 ? "number" : "text"}
//                     required={field.isRequired}
//                     placeholder={field.placeholder || "Your answer"} 
//                     className={inputClass}
//                     value={value}
//                     onChange={(e) => onChange(e.target.value)}
//                 />
//             );
//         case 2: // Long Text
//             return (
//                 <textarea 
//                     required={field.isRequired}
//                     placeholder={field.placeholder || "Your answer"} 
//                     rows={4} 
//                     className={`${inputClass} resize-y`}
//                     value={value}
//                     onChange={(e) => onChange(e.target.value)}
//                 />
//             );
//         case 7: // Radio / Multiple Choice
//             return (
//                 <div className="space-y-3">
//                     {field.options?.map((opt, i) => (
//                         <label key={i} className="flex items-center gap-3 cursor-pointer">
//                             <input 
//                                 type="radio" 
//                                 name={`field-${field.id}`}
//                                 required={field.isRequired && !value}
//                                 value={opt.optionLabel}
//                                 checked={value === opt.optionLabel}
//                                 onChange={(e) => onChange(e.target.value)}
//                                 className="w-5 h-5 text-[#8624F0] border-gray-300 focus:ring-[#8624F0]"
//                             />
//                             <span className="text-gray-700">{opt.optionLabel}</span>
//                         </label>
//                     ))}
//                 </div>
//             );
//         case 8: // Checkbox
//             // Checkboxes need to handle an array of values
//             const handleCheckbox = (checked, optionVal) => {
//                 let currentVals = Array.isArray(value) ? [...value] : [];
//                 if (checked) currentVals.push(optionVal);
//                 else currentVals = currentVals.filter(v => v !== optionVal);
//                 onChange(currentVals);
//             };

//             return (
//                 <div className="space-y-3">
//                     {field.options?.map((opt, i) => (
//                         <label key={i} className="flex items-center gap-3 cursor-pointer">
//                             <input 
//                                 type="checkbox" 
//                                 value={opt.optionLabel}
//                                 checked={Array.isArray(value) && value.includes(opt.optionLabel)}
//                                 onChange={(e) => handleCheckbox(e.target.checked, e.target.value)}
//                                 className="w-5 h-5 text-[#8624F0] border-gray-300 rounded focus:ring-[#8624F0]"
//                             />
//                             <span className="text-gray-700">{opt.optionLabel}</span>
//                         </label>
//                     ))}
//                 </div>
//             );
//         case 10: // Date
//             return (
//                 <input 
//                     type="date" 
//                     required={field.isRequired}
//                     className={inputClass}
//                     value={value}
//                     onChange={(e) => onChange(e.target.value)}
//                 />
//             );
//         // Add cases for File (11), Video (12), etc.
//         default:
//             return <p className="text-red-500">Unsupported field type</p>;
//     }
// }


// 'use client';

// import { useEffect, useState, use } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useForm } from "react-hook-form"; // 1. Import React Hook Form
// import { getForm, saveForm } from "../Reducer/FormbuilderSlice"; 

// export default function PublicFormPage({ params }) {
//     const unwrappedParams = use(params);
//     const slugArray = unwrappedParams.slug; 

//     const dispatch = useDispatch();
//     const { currentForm, loading } = useSelector((state) => state?.formBuilder || {});
    
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [isSuccess, setIsSuccess] = useState(false);

//     // 2. Initialize React Hook Form
//     const { 
//         register, 
//         handleSubmit, 
//         formState: { errors } 
//     } = useForm();

//     useEffect(() => {
//         if (slugArray && slugArray.length > 0) {
//             const joinedSlug = slugArray.join('/');
//             dispatch(getForm(joinedSlug));
//         }
//     }, [dispatch, slugArray]);

//     // 3. React Hook Form handles the state, so onSubmit receives the organized data automatically!
//     const onSubmit = async (data) => {
//         setIsSubmitting(true);
//         const fields = currentForm?.fields || [];
        
//         // Find the specific fields for Name and Email
//         const nameField = fields.find(f => f.label?.toLowerCase().includes("name"));
//         const emailField = fields.find(f => f.formFieldType?.code === "EMAIL" || f.label?.toLowerCase().includes("email"));

//         // Extract their values safely from the RHF data object
//         const fullNameValue = nameField ? data[nameField.id] : "";
//         const emailValue = emailField ? data[emailField.id] : "";

//         const requestSubmissionAnsDto = [];

//         Object.keys(data).forEach(fieldId => {
//             const parsedFieldId = parseInt(fieldId, 10);
            
//             if (nameField && parsedFieldId === nameField.id) return;
//             if (emailField && parsedFieldId === emailField.id) return;

//             let ansValue = data[fieldId];
            
//             // React Hook Form handles checkboxes as arrays automatically! We just join them.
//             if (Array.isArray(ansValue)) {
//                 ansValue = ansValue.join(", ");
//             }

//             if (ansValue !== undefined && ansValue !== "" && ansValue !== false) {
//                 requestSubmissionAnsDto.push({
//                     fieldId: parsedFieldId,
//                     ans: String(ansValue)
//                 });
//             }
//         });

//         const payload = {
//             fullName: fullNameValue || "Unknown User", 
//             email: emailValue || "no-email@provided.com",
//             requestFormSubmissionDto: {
//                 formId: currentForm.id,
//                 requestSubmissionAnsDto: requestSubmissionAnsDto
//             }
//         };

//         console.log("Submitting Payload:", payload);
        
//         try {
//             const resultAction = await dispatch(saveForm(payload));
            
//             if (saveForm.fulfilled.match(resultAction)) {
//                 setIsSuccess(true);
//             } else {
//                 alert("Failed to submit form: " + (resultAction.payload?.message || "Unknown error"));
//             }
//         } catch (error) {
//             console.error("Submission error:", error);
//             alert("An error occurred while submitting.");
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     if (loading) {
//         return <div className="text-gray-500 mt-20 flex justify-center w-full">Loading form...</div>;
//     }

//     if (!currentForm) {
//         return <div className="text-gray-500 mt-20 flex justify-center w-full">Form not found or unavailable.</div>;
//     }

//     if (isSuccess) {
//         return (
//             <div className="w-full max-w-2xl bg-white p-8 rounded-[20px] shadow-sm text-center border border-green-200">
//                 <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">✓</div>
//                 <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
//                 <p className="text-gray-600">Your response has been successfully submitted.</p>
//             </div>
//         );
//     }

//     const fields = currentForm.fields || [];

//     return (
//         <div className="w-full max-w-2xl">
//             <div className="bg-white p-8 rounded-t-[20px] border-t-8 border-[#8624F0] shadow-sm mb-4">
//                 <h1 className="text-3xl font-bold text-gray-900 mb-2">{currentForm.title}</h1>
//                 {currentForm.description && (
//                     <p className="text-gray-600 whitespace-pre-wrap">{currentForm.description}</p>
//                 )}
//             </div>

//             {/* 4. Use RHF's handleSubmit wrapper */}
//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//                 {fields.map((field) => (
//                     <div key={field.id} className="bg-white p-6 rounded-[12px] shadow-sm border border-gray-100">
//                         <label className="block text-base font-medium text-gray-900 mb-1">
//                             {field.label} {field.isRequired && <span className="text-red-500">*</span>}
//                         </label>
//                         {field.description && (
//                             <p className="text-sm text-gray-500 mb-4">{field.description}</p>
//                         )}
                        
//                         <div className="mt-3">
//                             {/* 5. Pass the register function to the inputs */}
//                             <LiveFieldInput 
//                                 field={field} 
//                                 register={register} 
//                             />
                            
//                             {/* 6. Display validation errors dynamically */}
//                             {errors[field.id] && (
//                                 <p className="text-red-500 text-sm mt-2 font-medium">
//                                     {errors[field.id].message}
//                                 </p>
//                             )}
//                         </div>
//                     </div>
//                 ))}

//                 <div className="pt-4 flex justify-end pb-12">
//                     <button
//                         type="submit"
//                         disabled={isSubmitting}
//                         className="px-8 py-3 bg-[#8624F0] text-white rounded-[10px] font-bold hover:bg-[#6c1dc0] transition-colors disabled:opacity-50"
//                     >
//                         {isSubmitting ? "Submitting..." : "Submit"}
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// }

// // ─── Interactive Live Field Input (Updated for RHF) ───────────────────────────
// function LiveFieldInput({ field, register }) {
//     const inputClass = "w-full p-3 border border-gray-300 rounded-[8px] focus:ring-2 focus:ring-[#8624F0]/30 focus:border-[#8624F0] outline-none transition-all";

//     // Create the validation rules object based on the API's isRequired flag
//     const validationRules = {
//         required: field.isRequired ? "This field is required" : false
//     };

//     // Use the field's ID as the unique name for React Hook Form
//     const fieldName = String(field.id);

//     switch (field.fieldTypeId) {
//         case 1: // Short Text
//         case 3: // Email 
//         case 4: // Phone
//         case 5: // Number
//             return (
//                 <input 
//                     type={field.fieldTypeId === 3 ? "email" : field.fieldTypeId === 5 ? "number" : "text"}
//                     placeholder={field.placeholder || "Your answer"} 
//                     className={inputClass}
//                     {...register(fieldName, validationRules)}
//                 />
//             );
            
//         case 2: // Long Text
//             return (
//                 <textarea 
//                     placeholder={field.placeholder || "Your answer"} 
//                     rows={4} 
//                     className={`${inputClass} resize-y`}
//                     {...register(fieldName, validationRules)}
//                 />
//             );
            
//         case 7: // Radio / Multiple Choice
//             return (
//                 <div className="space-y-3">
//                     {field.options?.map((opt, i) => (
//                         <label key={i} className="flex items-center gap-3 cursor-pointer">
//                             <input 
//                                 type="radio" 
//                                 value={opt.optionLabel}
//                                 className="w-5 h-5 text-[#8624F0] border-gray-300 focus:ring-[#8624F0]"
//                                 {...register(fieldName, validationRules)}
//                             />
//                             <span className="text-gray-700">{opt.optionLabel}</span>
//                         </label>
//                     ))}
//                 </div>
//             );
            
//         case 8: // Checkbox
//             return (
//                 <div className="space-y-3">
//                     {field.options?.map((opt, i) => (
//                         <label key={i} className="flex items-center gap-3 cursor-pointer">
//                             <input 
//                                 type="checkbox" 
//                                 value={opt.optionLabel}
//                                 className="w-5 h-5 text-[#8624F0] border-gray-300 rounded focus:ring-[#8624F0]"
//                                 {...register(fieldName, validationRules)}
//                             />
//                             <span className="text-gray-700">{opt.optionLabel}</span>
//                         </label>
//                     ))}
//                 </div>
//             );
            
//         case 10: // Date
//             return (
//                 <input 
//                     type="date" 
//                     className={inputClass}
//                     {...register(fieldName, validationRules)}
//                 />
//             );

//         case 11: // File Upload
//         case 12: // Video Upload
//             return (
//                 <input 
//                     type="file"
//                     // If it's 12, restrict to video files. Otherwise allow all files (or specify as needed)
//                     accept={field.fieldTypeId === 12 ? "video/*" : "*/*"}
//                     className="block w-full text-sm text-gray-500 
//                         file:mr-4 file:py-2.5 file:px-4 
//                         file:rounded-[8px] file:border-0 
//                         file:text-sm file:font-semibold 
//                         file:bg-[#8624F0]/10 file:text-[#8624F0] 
//                         hover:file:bg-[#8624F0]/20 
//                         border border-gray-300 rounded-[8px] p-2 cursor-pointer transition-all"
//                     {...register(fieldName, validationRules)}
//                 />
//             );
            
//         default:
//             return <p className="text-red-500">Unsupported field type</p>;
//     }
// }














'use client';

import { useEffect, useState, use } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form"; 
// 1. Import the new upload thunks
import { getForm, saveForm, uploadImageForm, uploadVideoForm } from "../Reducer/FormbuilderSlice"; 

export default function PublicFormPage({ params }) {
    const unwrappedParams = use(params);
    const slugArray = unwrappedParams.slug; 

    const dispatch = useDispatch();
    const { currentForm, loading } = useSelector((state) => state?.formBuilder || {});
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        if (slugArray && slugArray.length > 0) {
            const joinedSlug = slugArray.join('/');
            dispatch(getForm(joinedSlug));
        }
    }, [dispatch, slugArray]);

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        const fields = currentForm?.fields || [];
        
        const nameField = fields.find(f => f.label?.toLowerCase().includes("name"));
        const emailField = fields.find(f => f.formFieldType?.code === "EMAIL" || f.label?.toLowerCase().includes("email"));

        const fullNameValue = nameField ? data[nameField.id] : "";
        const emailValue = emailField ? data[emailField.id] : "";

        const requestSubmissionAnsDto = [];
        const fileUploadTasks = []; // 2. Array to hold files pending upload

        // 3. Separate files from text data
        fields.forEach(field => {
            const fieldId = field.id;
            let ansValue = data[fieldId];

            if (!ansValue) return;

            if (field.fieldTypeId === 11 || field.fieldTypeId === 12) {
                // React Hook Form captures files as a FileList array
                if (ansValue.length > 0) {
                    fileUploadTasks.push({
                        field: field,
                        file: ansValue[0] // Extract the actual File object
                    });
                }
            } else {
                // Handle standard text/checkbox answers
                if (nameField && fieldId === nameField.id) return;
                if (emailField && fieldId === emailField.id) return;

                if (Array.isArray(ansValue)) {
                    ansValue = ansValue.join(", ");
                }

                if (ansValue !== undefined && ansValue !== "" && ansValue !== false) {
                    requestSubmissionAnsDto.push({
                        fieldId: fieldId,
                        ans: String(ansValue)
                    });
                }
            }
        });

        const payload = {
            fullName: fullNameValue || "Unknown User", 
            email: emailValue || "no-email@provided.com",
            requestFormSubmissionDto: {
                formId: currentForm.id,
                requestSubmissionAnsDto: requestSubmissionAnsDto
            }
        };

        try {
            // 4. Step One: Save the text payload
            const resultAction = await dispatch(saveForm(payload));
            
            if (saveForm.fulfilled.match(resultAction)) {
                console.log("resultAction",resultAction);
                
                
                // IMPORTANT: Extract the submissionId returned by your API!
                // Update `resultAction.payload.data?.id` to match wherever your API returns the submission ID
                const submissionId = resultAction.payload?.result?.data?.id || resultAction.payload?.submissionId;

                // 5. Step Two: Execute file uploads concurrently
                if (fileUploadTasks.length > 0 && submissionId) {
                    const uploadPromises = fileUploadTasks.map(task => {
                        if (task.field.fieldTypeId === 11) {
                            return dispatch(uploadImageForm({
                                file: task.file,
                                submissionId: submissionId,
                                fieldId: task.field.id,
                                 email: emailValue,
                                 formId:currentForm.id
                            })).unwrap(); // .unwrap() throws an error if the thunk fails
                        } 
                        if (task.field.fieldTypeId === 12) {
                            return dispatch(uploadVideoForm({
                                file: task.file,
                                fileName: task.file.name,
                                submissionId: submissionId,
                                fieldId: task.field.id,
                                email: emailValue,
                                formId: currentForm.id
                            })).unwrap();
                        }
                    });

                    // Wait for all images/videos to finish uploading
                    await Promise.all(uploadPromises);
                }

                setIsSuccess(true);
            } else {
                alert("Failed to submit form: " + (resultAction.payload?.message || "Unknown error"));
            }
        } catch (error) {
            console.error("Submission or Upload error:", error);
            alert("An error occurred while uploading your files. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) {
        return <div className="text-gray-500 mt-20 flex justify-center w-full">Loading form...</div>;
    }

    if (!currentForm) {
        return <div className="text-gray-500 mt-20 flex justify-center w-full">Form not found or unavailable.</div>;
    }

    if (isSuccess) {
        return (
            <div className="w-full max-w-2xl bg-white p-8 rounded-[20px] shadow-sm text-center border border-green-200">
                <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">✓</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
                <p className="text-gray-600">Your response has been successfully submitted.</p>
            </div>
        );
    }

    const fields = currentForm.fields || [];

    return (
        <div className="w-full max-w-2xl">
            <div className="bg-white p-8 rounded-t-[20px] border-t-8 border-[#8624F0] shadow-sm mb-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{currentForm.title}</h1>
                {currentForm.description && (
                    <p className="text-gray-600 whitespace-pre-wrap">{currentForm.description}</p>
                )}
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {fields.map((field) => (
                    <div key={field.id} className="bg-white p-6 rounded-[12px] shadow-sm border border-gray-100">
                        <label className="block text-base font-medium text-gray-900 mb-1">
                            {field.label} {field.isRequired && <span className="text-red-500">*</span>}
                        </label>
                        {field.description && (
                            <p className="text-sm text-gray-500 mb-4">{field.description}</p>
                        )}
                        
                        <div className="mt-3">
                            <LiveFieldInput field={field} register={register} />
                            
                            {errors[field.id] && (
                                <p className="text-red-500 text-sm mt-2 font-medium">
                                    {errors[field.id].message}
                                </p>
                            )}
                        </div>
                    </div>
                ))}

                <div className="pt-4 flex justify-end pb-12">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-3 bg-[#8624F0] text-white rounded-[10px] font-bold hover:bg-[#6c1dc0] transition-colors disabled:opacity-50"
                    >
                        {isSubmitting ? "Submitting Data..." : "Submit"}
                    </button>
                </div>
            </form>
        </div>
    );
}

// ─── Interactive Live Field Input ───────────────────────────
function LiveFieldInput({ field, register }) {
    const inputClass = "w-full p-3 border border-gray-300 rounded-[8px] focus:ring-2 focus:ring-[#8624F0]/30 focus:border-[#8624F0] outline-none transition-all";

    const validationRules = {
        required: field.isRequired ? "This field is required" : false
    };

    const fieldName = String(field.id);

    switch (field.fieldTypeId) {
        case 1: 
        case 3:  
        case 4: 
        case 5: 
            return (
                <input 
                    type={field.fieldTypeId === 3 ? "email" : field.fieldTypeId === 5 ? "number" : "text"}
                    placeholder={field.placeholder || "Your answer"} 
                    className={inputClass}
                    {...register(fieldName, validationRules)}
                />
            );
            
        case 2: 
            return (
                <textarea 
                    placeholder={field.placeholder || "Your answer"} 
                    rows={4} 
                    className={`${inputClass} resize-y`}
                    {...register(fieldName, validationRules)}
                />
            );
            
        case 7: 
            return (
                <div className="space-y-3">
                    {field.options?.map((opt, i) => (
                        <label key={i} className="flex items-center gap-3 cursor-pointer">
                            <input 
                                type="radio" 
                                value={opt.optionLabel}
                                className="w-5 h-5 text-[#8624F0] border-gray-300 focus:ring-[#8624F0]"
                                {...register(fieldName, validationRules)}
                            />
                            <span className="text-gray-700">{opt.optionLabel}</span>
                        </label>
                    ))}
                </div>
            );
            
        case 8: 
            return (
                <div className="space-y-3">
                    {field.options?.map((opt, i) => (
                        <label key={i} className="flex items-center gap-3 cursor-pointer">
                            <input 
                                type="checkbox" 
                                value={opt.optionLabel}
                                className="w-5 h-5 text-[#8624F0] border-gray-300 rounded focus:ring-[#8624F0]"
                                {...register(fieldName, validationRules)}
                            />
                            <span className="text-gray-700">{opt.optionLabel}</span>
                        </label>
                    ))}
                </div>
            );
            
        case 10: 
            return (
                <input 
                    type="date" 
                    className={inputClass}
                    {...register(fieldName, validationRules)}
                />
            );

        case 11: // Image Upload
        case 12: // Video Upload
            return (
                <input 
                    type="file"
                    accept={field.fieldTypeId === 12 ? "video/*" : "image/*"}
                    className="block w-full text-sm text-gray-500 
                        file:mr-4 file:py-2.5 file:px-4 
                        file:rounded-[8px] file:border-0 
                        file:text-sm file:font-semibold 
                        file:bg-[#8624F0]/10 file:text-[#8624F0] 
                        hover:file:bg-[#8624F0]/20 
                        border border-gray-300 rounded-[8px] p-2 cursor-pointer transition-all"
                    {...register(fieldName, validationRules)}
                />
            );
            
        default:
            return <p className="text-red-500">Unsupported field type</p>;
    }
}