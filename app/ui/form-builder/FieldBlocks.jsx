'use client';

import {
  Type, AlignLeft, Hash, Circle, CheckSquare,
  ChevronDown, Mail, Phone, Calendar, Upload,
  Star, Minus, Heading1, FileText, Video, List
} from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formListData } from "../../Reducer/FormbuilderSlice";

// 1. Map API codes to Lucide icons
const iconMap = {
  SHORT_TEXT: Type,
  LONG_TEXT: AlignLeft,
  EMAIL: Mail,
  PHONE: Phone,
  NUMBER: Hash,
  SELECT: ChevronDown,
  RADIO: Circle,
  CHECKBOX: CheckSquare,
  MULTI_SELECT: List,
  DATE: Calendar,
  FILE: Upload,
  VIDEO: Video,
};

// 2. Map API codes to your OLD frontend types so the parent logic works flawlessly
const typeMap = {
  SHORT_TEXT: "short-text",
  LONG_TEXT: "long-text",
  EMAIL: "email",
  PHONE: "phone",
  NUMBER: "number",
  SELECT: "dropdown",       
  RADIO: "multiple-choice", 
  CHECKBOX: "checkbox",
  DATE: "date",
  FILE: "file-upload",      
  MULTI_SELECT: "multi-select",
  VIDEO: "video"
};

export default function FieldBlocks({ onAddField }) {
  // Pull data and loading status from Redux
  const { formTypeData, loading } = useSelector((state) => state?.formBuilder || {});
  const dispatch = useDispatch();

  // Fetch the dynamic fields when the component mounts
  useEffect(() => {
    dispatch(formListData());
  }, [dispatch]);

  // Ensure fields is always an array to prevent mapping crashes
  const fields = Array.isArray(formTypeData) ? formTypeData : [];

  return (
    <div className="w-64 flex flex-col shrink-0" style={{ background: 'var(--bg-card)', borderRight: '1px solid var(--border-color)' }}>
      <div className="p-4" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Add Fields</h3>
        <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>Click to add to form</p>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-3 space-y-1">
          {/* Show loading state while API runs */}
          {loading ? (
            <p className="text-sm text-center p-4" style={{ color: 'var(--text-secondary)' }}>
              Loading fields...
            </p>
          ) : (
            fields.map((field) => {
              // Get the icon, use FileText as a generic fallback if code is completely new
              const IconComponent = iconMap[field.code] || FileText;
              
              // Get the old string type (fallback to lowercase code if not in map)
              const oldFrontendType = typeMap[field.code] || field.code.toLowerCase();

              return (
                <button
                  key={field.id}
                  // Send the translated type string back to FormBuilderPage.jsx
                  onClick={() => onAddField(oldFrontendType)} 
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all cursor-pointer text-left group hover:bg-[#8624F0]/5"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors group-hover:bg-[#8624F0]/10"
                    style={{ background: 'var(--bg-main)' }}
                  >
                    <IconComponent 
                      className="w-4 h-4 group-hover:text-[#8624F0] transition-colors" 
                      style={{ color: 'var(--text-secondary)' }} 
                    />
                  </div>
                  <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                    {field.name}
                  </span>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}