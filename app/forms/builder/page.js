'use client';

import { useState } from "react";
import Link from "next/link";
import {
    ArrowLeft, Eye, Settings as SettingsIcon,
    Share2, GripVertical, Trash2, Plus,
} from "lucide-react";
import FieldBlocks from "../../ui/form-builder/FieldBlocks"
import FieldSettings from "../../ui/form-builder/FieldSettings";
import ShareModal from "../../ui/form-builder/ShareModal";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {createForm} from "../../Reducer/FormbuilderSlice"

export default function FormBuilderPage() {
    const [formTitle, setFormTitle] = useState("Untitled Form");
    const [formDescription, setFormDescription] = useState("");
    const[formLink,setFormLink]=useState()
    const searchParams = useSearchParams();
    const workspaceId = searchParams.get('workspaceId');
    const dispatch = useDispatch();
    // We need formTypeData to get the exact ID for each field type before sending to API
    const { formTypeData } = useSelector((state) => state?.formBuilder || {});
    
    // 1. INITIALIZE STATE WITH DEFAULT FIELDS
    const [fields, setFields] = useState([
        {
            id: `field-default-name`, 
            type: "short-text",
            label: "Full Name", 
            placeholder: "Enter your full name",
            required: true, 
            description: "",
            isDeletable: false // This prevents deletion
        },
        {
            id: `field-default-email`, 
            type: "email",
            label: "Email Address", 
            placeholder: "Enter your email address",
            required: true, 
            description: "",
            isDeletable: false // This prevents deletion
        }
    ]);
    
    const [selectedFieldId, setSelectedFieldId] = useState(null);
    const [showShareModal, setShowShareModal] = useState(false);
    const [isPublished, setIsPublished] = useState(false);

    const selectedField = fields.find((f) => f.id === selectedFieldId);

    const getDefaultLabel = (type) => {
        const labels = {
            "short-text": "Short Answer", "long-text": "Long Answer",
            "email": "Email Address", "phone": "Phone Number",
            "number": "Number", "date": "Date",
            "multiple-choice": "Multiple Choice Question", "checkbox": "Checkboxes",
            "dropdown": "Dropdown", "file-upload": "File Upload",
            "rating": "Rating", "heading": "Heading",
            "paragraph": "Paragraph", "divider": "Divider",
        };
        return labels[type] || "New Field";
    };

    const addField = (type) => {
        const newField = {
            id: `field-${Date.now()}`, type,
            label: getDefaultLabel(type), placeholder: "",
            required: false, description: "",
            options: ["multiple-choice", "checkbox", "dropdown"].includes(type) ? ["Option 1", "Option 2"] : undefined,
            isDeletable: true // 2. NEW FIELDS CAN BE DELETED
        };
        setFields([...fields, newField]);
        setSelectedFieldId(newField.id);
    };

    const updateField = (id, updates) => {
        setFields(fields.map((f) => (f.id === id ? { ...f, ...updates } : f)));
    };

    const deleteField = (id) => {
        setFields(fields.filter((f) => f.id !== id));
        if (selectedFieldId === id) setSelectedFieldId(null);
    };

    const moveField = (fromIndex, toIndex) => {
        const updated = [...fields];
        const [moved] = updated.splice(fromIndex, 1);
        updated.splice(toIndex, 0, moved);
        setFields(updated);
    };

    const handlePublish = async() => {
        // setIsPublished(true);
        // setShowShareModal(true);
        if (!workspaceId) {
            alert("No workspace selected. Please go back and select a workspace.");
            return;
        }
        const apiFieldTypes = Array.isArray(formTypeData) ? formTypeData : [];
        const reverseTypeMap = {
            "short-text": "SHORT_TEXT",
            "long-text": "LONG_TEXT",
            "email": "EMAIL",
            "phone": "PHONE",
            "number": "NUMBER",
            "dropdown": "SELECT",       
            "multiple-choice": "RADIO", 
            "checkbox": "CHECKBOX",
            "date": "DATE",
            "file-upload": "FILE",      
            "multi-select": "MULTI_SELECT",
            "video": "VIDEO"
        };
        const formattedFields = fields.map(field => {
            // 1. Get the API CODE string (e.g., "SHORT_TEXT")
            const apiCode = reverseTypeMap[field.type] || field.type.toUpperCase();
            
            // 2. Find the numerical ID from the formTypeData fetched from Redux
            const apiFieldObj = apiFieldTypes.find(t => t.code === apiCode);
            const fieldTypeId = apiFieldObj ? apiFieldObj.id : 1; // Fallback to 1 if not found

            // 3. Build the base field object
            const payloadField = {
                label: field.label,
                placeholder: field.placeholder || "",
                isRequired: field.required === true, // Ensure boolean
                fieldTypeId: fieldTypeId
            };

            // 4. If it has options, format them to match API
            if (field.options && field.options.length > 0) {
                payloadField.options = field.options.map(opt => ({
                    optionLabel: opt
                }));
            }

            return payloadField;
        });

        // Assemble the final payload
        const payload = {
            title: formTitle,
            description: formDescription,
            workspaceId: parseInt(workspaceId, 10), // Ensure it's a number
            fields: formattedFields
        };

        console.log("Submitting Payload:", payload);

        try {
            // Dispatch the thunk
            const resultAction = await dispatch(createForm(payload));
            
            if (createForm.fulfilled.match(resultAction)) {
                const generatedLink = resultAction.payload?.link;
                
                // 2. SAVE IT TO STATE
                setFormLink(generatedLink);
                setIsPublished(true);
                setShowShareModal(true);
                // Note: resultAction.payload usually contains the newly created form ID from backend
            } else {
                alert("Failed to create form: " + (resultAction.payload?.message || "Unknown error"));
            }
        } catch (error) {
            console.error("Error creating form:", error);
            alert("An error occurred while publishing.");
        }
    };

    return (
        <div className="h-screen flex flex-col overflow-hidden" style={{ background: 'var(--bg-main)' }}>

            {/* Top Bar (Unchanged) */}
            <div
                className="px-6 py-4 flex items-center justify-between shrink-0"
                style={{ background: 'var(--bg-card)', borderBottom: '1px solid var(--border-color)' }}
            >
                <div className="flex items-center gap-4 flex-1">
                    <Link href="/forms">
                        <button
                            className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
                            style={{ color: 'var(--text-primary)' }}
                            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-main)'}
                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                    </Link>
                    <input
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                        className="text-lg font-semibold border-0 outline-none bg-transparent max-w-md"
                        style={{ color: 'var(--text-primary)' }}
                        placeholder="Form Title"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <button
                        className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
                        style={{ color: 'var(--text-secondary)' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-main)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                        <Eye className="w-5 h-5" />
                    </button>
                    <button
                        className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors"
                        style={{ color: 'var(--text-secondary)' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-main)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    >
                        <SettingsIcon className="w-5 h-5" />
                    </button>
                    <button
                        onClick={handlePublish}
                        className="flex items-center gap-2 px-5 py-2 bg-[#8624F0] text-white rounded-[10px] font-bold text-sm hover:bg-[#6c1dc0] transition-colors"
                    >
                        <Share2 className="w-4 h-4" />
                        {isPublished ? "Published" : "Publish"}
                    </button>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden">

                {/* Left: Field Blocks */}
                <FieldBlocks onAddField={addField} />

                {/* Center: Canvas */}
                <div className="flex-1 overflow-y-auto px-8 py-8">
                    <div className="max-w-3xl mx-auto">
                        <div className="rounded-[20px] shadow-sm p-8" style={{ background: 'var(--bg-card)' }}>

                            {/* Form Header */}
                            <div className="mb-8">
                                <input
                                    value={formTitle}
                                    onChange={(e) => setFormTitle(e.target.value)}
                                    className="w-full text-2xl font-bold border-0 outline-none bg-transparent mb-2"
                                    style={{ color: 'var(--text-primary)' }}
                                    placeholder="Form Title"
                                />
                                <textarea
                                    value={formDescription}
                                    onChange={(e) => setFormDescription(e.target.value)}
                                    className="w-full text-sm border-0 outline-none bg-transparent resize-none"
                                    style={{ color: 'var(--text-secondary)' }}
                                    placeholder="Add a description..."
                                    rows={2}
                                />
                            </div>

                            {/* Fields */}
                            {fields.length === 0 ? (
                                // ... (Empty state logic unchanged) ...
                                <div className="text-center py-12 border-2 border-dashed rounded-[16px]" style={{ borderColor: 'var(--border-color)' }}>
                                    <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: 'var(--bg-main)' }}>
                                        <Plus className="w-6 h-6" style={{ color: 'var(--text-secondary)' }} />
                                    </div>
                                    <p className="mb-1" style={{ color: 'var(--text-secondary)' }}>No fields yet</p>
                                    <p className="text-sm" style={{ color: 'var(--text-secondary)', opacity: 0.6 }}>Click blocks from the left panel to get started</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {fields.map((field, index) => (
                                        <DraggableField
                                            key={field.id}
                                            field={field}
                                            index={index}
                                            isSelected={field.id === selectedFieldId}
                                            onSelect={() => setSelectedFieldId(field.id)}
                                            onDelete={() => deleteField(field.id)}
                                            onMove={moveField}
                                        />
                                    ))}
                                </div>
                            )}

                            {fields.length > 0 && (
                                <button
                                    onClick={() => addField("short-text")}
                                    className="w-full mt-6 py-3 border-2 border-dashed rounded-[10px] text-sm font-medium transition-colors flex items-center justify-center gap-2 hover:border-[#8624F0] hover:text-[#8624F0]"
                                    style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}
                                >
                                    <Plus className="w-4 h-4" />
                                    Add Question
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right: Field Settings */}
                {selectedField && (
                    <FieldSettings
                        field={selectedField}
                        onUpdate={(updates) => updateField(selectedField.id, updates)}
                        onClose={() => setSelectedFieldId(null)}
                    />
                )}
            </div>

            <ShareModal
               
                formLink={formLink}
                isOpen={showShareModal}
                onClose={() => setShowShareModal(false)}
            />
        </div>
    );
}

// ─── Draggable Field ──────────────────────────────────────────────
function DraggableField({ field, index, isSelected, onSelect, onDelete, onMove }) {
    const handleDragStart = (e) => e.dataTransfer.setData("dragIndex", index);
    const handleDrop = (e) => {
        const from = parseInt(e.dataTransfer.getData("dragIndex"));
        if (from !== index) onMove(from, index);
    };
    const handleDragOver = (e) => e.preventDefault();

    return (
        <div
            draggable
            onDragStart={handleDragStart}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={onSelect}
            className="group relative p-4 rounded-[12px] border-2 transition-all cursor-pointer"
            style={{
                borderColor: isSelected ? '#8624F0' : 'var(--border-color)',
                background: isSelected ? 'rgba(134, 36, 240, 0.05)' : 'var(--bg-card)',
            }}
        >
            <div className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab">
                <GripVertical className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
            </div>

            <div className="ml-6">
                <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{field.label}</span>
                            {field.required && <span className="text-red-500 text-sm">*</span>}
                        </div>
                        {field.description && (
                            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{field.description}</p>
                        )}
                    </div>
                    
                    {/* 3. ONLY SHOW TRASH CAN IF isDeletable IS NOT FALSE */}
                    {field.isDeletable !== false && (
                        <button
                            onClick={(e) => { e.stopPropagation(); onDelete(); }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity w-8 h-8 flex items-center justify-center rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20"
                        >
                            <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
                        </button>
                    )}
                </div>
                <FieldPreview field={field} />
            </div>
        </div>
    );
}

// ─── Field Preview (Unchanged) ────────────────────────────────────────────────
function FieldPreview({ field }) {
    const inputStyle = {
        background: 'var(--bg-main)',
        border: '1px solid var(--border-color)',
        color: 'var(--text-secondary)',
    };

    const inputClass = "w-full h-[38px] px-3 rounded-[8px] text-sm cursor-not-allowed";

    switch (field.type) {
        case "short-text":
        case "email":
        case "phone":
        case "number":
            return <input disabled placeholder={field.placeholder || "Your answer"} className={inputClass} style={inputStyle} />;
        case "long-text":
            return <textarea disabled placeholder={field.placeholder || "Your answer"} rows={3} className="w-full px-3 py-2 rounded-[8px] text-sm cursor-not-allowed resize-none" style={inputStyle} />;
        case "multiple-choice":
            return (
                <div className="space-y-2">
                    {field.options?.map((option, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded-full border-2" style={{ borderColor: 'var(--border-color)' }} />
                            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{option}</span>
                        </div>
                    ))}
                </div>
            );
        case "checkbox":
            return (
                <div className="space-y-2">
                    {field.options?.map((option, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded border-2" style={{ borderColor: 'var(--border-color)' }} />
                            <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>{option}</span>
                        </div>
                    ))}
                </div>
            );
        case "dropdown":
            return <div className="h-[38px] px-3 flex items-center rounded-[8px] text-sm" style={inputStyle}>Select an option</div>;
        case "date":
            return <input type="date" disabled className={inputClass} style={inputStyle} />;
        case "file-upload":
            return (
                <div className="border-2 border-dashed rounded-[8px] p-6 text-center" style={{ borderColor: 'var(--border-color)' }}>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Click to upload or drag and drop</p>
                </div>
            );
        case "rating":
            return (
                <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((s) => (
                        <div key={s} className="w-8 h-8 rounded flex items-center justify-center text-sm border-2" style={{ borderColor: 'var(--border-color)', color: 'var(--text-secondary)' }}>★</div>
                    ))}
                </div>
            );
        case "heading":
            return <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>{field.label}</h3>;
        case "paragraph":
            return <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{field.description || "Paragraph text"}</p>;
        case "divider":
            return <hr style={{ borderColor: 'var(--border-color)' }} />;
        default:
            return null;
    }
}