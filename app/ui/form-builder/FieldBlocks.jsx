'use client';

import {
  Type, AlignLeft, Hash, Circle, CheckSquare,
  ChevronDown, Mail, Phone, Calendar, Upload,
  Star, Minus, Heading1, FileText, Video, List, Link2,
  Facebook, Twitter, Instagram, Linkedin, Globe, X
} from "lucide-react";
import { useEffect, useState, useRef } from "react";
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
  const [showLinkModal, setShowLinkModal] = useState(false);

  // Fetch the dynamic fields when the component mounts
  useEffect(() => {
    dispatch(formListData());
  }, [dispatch]);

  // Ensure fields is always an array to prevent mapping crashes
  const fields = Array.isArray(formTypeData) ? formTypeData : [];

  const linkMenuRef = useRef(null);

  useEffect(() => {
    if (showLinkModal && linkMenuRef.current) {
      setTimeout(() => {
        linkMenuRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 150);
    }
  }, [showLinkModal]);

  const handleLinkSelect = (platform) => {
    let label = "Link URL";
    let placeholder = "https://...";
    if (platform === "facebook") { label = "Facebook URL"; placeholder = "https://facebook.com/your-profile"; }
    if (platform === "linkedin") { label = "LinkedIn URL"; placeholder = "https://linkedin.com/in/your-profile"; }
    if (platform === "twitter") { label = "Twitter URL"; placeholder = "https://twitter.com/your-profile"; }
    if (platform === "instagram") { label = "Instagram URL"; placeholder = "https://instagram.com/your-profile"; }
    if (platform === "other") { label = "Website URL"; placeholder = "https://your-website.com"; }
    
    onAddField("short-text", label, placeholder);
    setShowLinkModal(false);
  };

  return (
    <>
      <div className="w-64 flex flex-col shrink-0" style={{ background: 'var(--bg-card)', borderRight: '1px solid var(--border-color)' }}>
        <div className="p-4" style={{ borderBottom: '1px solid var(--border-color)' }}>
          <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Add Fields</h3>
          <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>Click to add to form</p>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <div className="p-3 space-y-0.5">
            {/* Show loading state while API runs */}
            {loading ? (
              <p className="text-sm text-center p-4" style={{ color: 'var(--text-secondary)' }}>
                Loading fields...
              </p>
            ) : (
              fields.filter(field => field.code !== 'MULTI_SELECT').map((field) => {
                // Get the icon, use FileText as a generic fallback if code is completely new
                const IconComponent = iconMap[field.code] || FileText;
                
                // Get the old string type (fallback to lowercase code if not in map)
                const oldFrontendType = typeMap[field.code] || field.code.toLowerCase();

                return (
                  <button
                    key={field.id}
                    // Send the translated type string back to FormBuilderPage.jsx
                    onClick={() => onAddField(oldFrontendType)} 
                    className="w-full flex items-center gap-3 px-3 py-1.5 rounded-lg transition-all cursor-pointer text-left group hover:bg-[#8624F0]/5"
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
            
            {/* Custom Link / URL */}
            {!loading && (
              <div>
                <button
                  key="custom-link-field"
                  onClick={() => setShowLinkModal(!showLinkModal)} 
                  className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg transition-all cursor-pointer text-left group hover:bg-[#8624F0]/5"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors group-hover:bg-[#8624F0]/10"
                      style={{ background: 'var(--bg-main)' }}
                    >
                      <Link2 
                        className="w-4 h-4 group-hover:text-[#8624F0] transition-colors" 
                        style={{ color: 'var(--text-secondary)' }} 
                      />
                    </div>
                    <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                      Link / URL
                    </span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${showLinkModal ? 'rotate-180' : ''}`} />
                </button>
                
                {/* Smooth Dropdown Options */}
                <div 
                  ref={linkMenuRef}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${showLinkModal ? 'max-h-64 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}
                >
                  <div className="grid grid-cols-2 gap-2 p-2 bg-gray-50/80 dark:bg-gray-800/80 rounded-xl border border-gray-100 dark:border-gray-700/50">
                    <button 
                      onClick={() => handleLinkSelect("facebook")}
                      className="flex flex-col items-center justify-center gap-1.5 p-2 rounded-lg hover:bg-white dark:hover:bg-gray-700 hover:shadow-sm transition-all group cursor-pointer"
                    >
                      <Facebook className="w-5 h-5 text-gray-400 group-hover:text-[#1877F2] transition-colors" />
                      <span className="text-[10px] font-medium text-gray-600 dark:text-gray-300">Facebook</span>
                    </button>
                    
                    <button 
                      onClick={() => handleLinkSelect("linkedin")}
                      className="flex flex-col items-center justify-center gap-1.5 p-2 rounded-lg hover:bg-white dark:hover:bg-gray-700 hover:shadow-sm transition-all group cursor-pointer"
                    >
                      <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-[#0A66C2] transition-colors" />
                      <span className="text-[10px] font-medium text-gray-600 dark:text-gray-300">LinkedIn</span>
                    </button>
                    
                    <button 
                      onClick={() => handleLinkSelect("twitter")}
                      className="flex flex-col items-center justify-center gap-1.5 p-2 rounded-lg hover:bg-white dark:hover:bg-gray-700 hover:shadow-sm transition-all group cursor-pointer"
                    >
                      <Twitter className="w-5 h-5 text-gray-400 group-hover:text-[#1DA1F2] transition-colors" />
                      <span className="text-[10px] font-medium text-gray-600 dark:text-gray-300">Twitter</span>
                    </button>
                    
                    <button 
                      onClick={() => handleLinkSelect("instagram")}
                      className="flex flex-col items-center justify-center gap-1.5 p-2 rounded-lg hover:bg-white dark:hover:bg-gray-700 hover:shadow-sm transition-all group cursor-pointer"
                    >
                      <Instagram className="w-5 h-5 text-gray-400 group-hover:text-[#E1306C] transition-colors" />
                      <span className="text-[10px] font-medium text-gray-600 dark:text-gray-300">Instagram</span>
                    </button>
                    
                    <button 
                      onClick={() => handleLinkSelect("other")}
                      className="col-span-2 flex items-center justify-center gap-2 p-2 rounded-lg hover:bg-white dark:hover:bg-gray-700 hover:shadow-sm transition-all group cursor-pointer"
                    >
                      <Globe className="w-4 h-4 text-gray-400 group-hover:text-[#8624F0] transition-colors" />
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-300">Other Link</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}