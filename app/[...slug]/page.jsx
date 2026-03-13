'use client';

import { useEffect, useState, use } from "react"; // <-- Import 'use' from react
import { useDispatch, useSelector } from "react-redux";
import { getForm } from "../Reducer/FormbuilderSlice"

export default function PublicFormPage({ params }) {
    // 1. UNWRAP THE PARAMS PROMISE
    const unwrappedParams = use(params);
    const slugArray = unwrappedParams.slug; 

    const dispatch = useDispatch();
    const { currentForm, loading } = useSelector((state) => state?.formBuilder || {});
    
    const [answers, setAnswers] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // 2. FETCH THE DATA
    useEffect(() => {
        // If the URL is /3/new_test_form/123, slugArray is ["3", "new_test_form", "123"]
        if (slugArray && slugArray.length > 0) {
            // Join it back together: "3/new_test_form/123"
            const joinedSlug = slugArray.join('/');
            
            console.log("Fetching form with slug:", joinedSlug);
            dispatch(getForm(joinedSlug));
        }
    }, [dispatch, slugArray]);

    const handleInputChange = (fieldId, value) => {
        setAnswers(prev => ({
            ...prev,
            [fieldId]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        
        console.log("Submitting answers:", answers);
        
        // TODO: Dispatch your submit response API thunk here
        // await dispatch(submitFormResponse({ formId: currentForm.id, responses: answers }));
        
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccess(true);
        }, 1000);
    };

    // ... Rest of your component (loading checks, isSuccess checks, form rendering) remains exactly the same!

    if (loading) {
        return <div className="text-gray-500 mt-20">Loading form...</div>;
    }

    if (!currentForm) {
        return <div className="text-gray-500 mt-20">Form not found or unavailable.</div>;
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
            {/* Form Header */}
            <div className="bg-white p-8 rounded-t-[20px] border-t-8 border-[#8624F0] shadow-sm mb-4">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{currentForm.title}</h1>
                {currentForm.description && (
                    <p className="text-gray-600 whitespace-pre-wrap">{currentForm.description}</p>
                )}
            </div>

            {/* Form Fields */}
            <form onSubmit={handleSubmit} className="space-y-4">
                {fields.map((field) => (
                    <div key={field.id} className="bg-white p-6 rounded-[12px] shadow-sm border border-gray-100">
                        <label className="block text-base font-medium text-gray-900 mb-1">
                            {field.label} {field.isRequired && <span className="text-red-500">*</span>}
                        </label>
                        {field.description && (
                            <p className="text-sm text-gray-500 mb-4">{field.description}</p>
                        )}
                        
                        <div className="mt-3">
                            <LiveFieldInput 
                                field={field} 
                                value={answers[field.id] || ""} 
                                onChange={(val) => handleInputChange(field.id, val)} 
                            />
                        </div>
                    </div>
                ))}

                {/* Submit Button */}
                <div className="pt-4 flex justify-end">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="px-8 py-3 bg-[#8624F0] text-white rounded-[10px] font-bold hover:bg-[#6c1dc0] transition-colors disabled:opacity-50"
                    >
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </form>
        </div>
    );
}



// ─── Interactive Live Field Input ──────────────────────────────────────────────
function LiveFieldInput({ field, value, onChange }) {
    const inputClass = "w-full p-3 border border-gray-300 rounded-[8px] focus:ring-2 focus:ring-[#8624F0]/30 focus:border-[#8624F0] outline-none transition-all";

    // Note: You will need to map fieldTypeId back to string types, or check the ID directly
    // Assuming fieldTypeId 1 = Short Text, 2 = Long Text, 7 = Radio, etc.
    // Replace these case numbers with your actual API fieldTypeId numbers
    switch (field.fieldTypeId) {
        case 1: // Short Text
        case 3: // Email (Assuming ID 3 is email)
        case 4: // Phone
        case 5: // Number
            return (
                <input 
                    type={field.fieldTypeId === 3 ? "email" : field.fieldTypeId === 5 ? "number" : "text"}
                    required={field.isRequired}
                    placeholder={field.placeholder || "Your answer"} 
                    className={inputClass}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            );
        case 2: // Long Text
            return (
                <textarea 
                    required={field.isRequired}
                    placeholder={field.placeholder || "Your answer"} 
                    rows={4} 
                    className={`${inputClass} resize-y`}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            );
        case 7: // Radio / Multiple Choice
            return (
                <div className="space-y-3">
                    {field.options?.map((opt, i) => (
                        <label key={i} className="flex items-center gap-3 cursor-pointer">
                            <input 
                                type="radio" 
                                name={`field-${field.id}`}
                                required={field.isRequired && !value}
                                value={opt.optionLabel}
                                checked={value === opt.optionLabel}
                                onChange={(e) => onChange(e.target.value)}
                                className="w-5 h-5 text-[#8624F0] border-gray-300 focus:ring-[#8624F0]"
                            />
                            <span className="text-gray-700">{opt.optionLabel}</span>
                        </label>
                    ))}
                </div>
            );
        case 8: // Checkbox
            // Checkboxes need to handle an array of values
            const handleCheckbox = (checked, optionVal) => {
                let currentVals = Array.isArray(value) ? [...value] : [];
                if (checked) currentVals.push(optionVal);
                else currentVals = currentVals.filter(v => v !== optionVal);
                onChange(currentVals);
            };

            return (
                <div className="space-y-3">
                    {field.options?.map((opt, i) => (
                        <label key={i} className="flex items-center gap-3 cursor-pointer">
                            <input 
                                type="checkbox" 
                                value={opt.optionLabel}
                                checked={Array.isArray(value) && value.includes(opt.optionLabel)}
                                onChange={(e) => handleCheckbox(e.target.checked, e.target.value)}
                                className="w-5 h-5 text-[#8624F0] border-gray-300 rounded focus:ring-[#8624F0]"
                            />
                            <span className="text-gray-700">{opt.optionLabel}</span>
                        </label>
                    ))}
                </div>
            );
        case 10: // Date
            return (
                <input 
                    type="date" 
                    required={field.isRequired}
                    className={inputClass}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                />
            );
        // Add cases for File (11), Video (12), etc.
        default:
            return <p className="text-red-500">Unsupported field type</p>;
    }
}