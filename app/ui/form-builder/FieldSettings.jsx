'use client';

import { X, Plus, Trash2 } from "lucide-react";

export default function FieldSettings({ field, onUpdate, onClose }) {
  const hasOptions = ["multiple-choice", "checkbox", "dropdown"].includes(field.type);

  const addOption = () => {
    const newOptions = [...(field.options || []), `Option ${(field.options?.length || 0) + 1}`];
    onUpdate({ options: newOptions });
  };

  const updateOption = (index, value) => {
    const newOptions = [...(field.options || [])];
    newOptions[index] = value;
    onUpdate({ options: newOptions });
  };

  const deleteOption = (index) => {
    const newOptions = field.options?.filter((_, i) => i !== index);
    onUpdate({ options: newOptions });
  };

  const inputStyle = {
    background: 'var(--bg-main)',
    border: '1px solid var(--border-color)',
    color: 'var(--text-primary)',
  };

  return (
    <div className="w-80 flex flex-col shrink-0" style={{ background: 'var(--bg-card)', borderLeft: '1px solid var(--border-color)' }}>
      {/* Header */}
      <div className="p-4 flex items-center justify-between" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Field Settings</h3>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-[#8624F0]/5"
        >
          <X className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
        </button>
      </div>

      {/* Settings Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-4 space-y-6">

          {/* Label */}
          <div className="space-y-2">
            <label className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Label</label>
            <input
              value={field.label}
              onChange={(e) => onUpdate({ label: e.target.value })}
              placeholder="Field label"
              className="w-full h-[42px] px-3 rounded-[8px] outline-none focus:ring-2 focus:ring-[#8624F0]/30 text-sm"
              style={inputStyle}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Description</label>
            <textarea
              value={field.description || ""}
              onChange={(e) => onUpdate({ description: e.target.value })}
              placeholder="Add a description (optional)"
              rows={2}
              className="w-full px-3 py-2 rounded-[8px] outline-none focus:ring-2 focus:ring-[#8624F0]/30 text-sm resize-none"
              style={inputStyle}
            />
          </div>

          {/* Placeholder */}
          {["short-text", "long-text", "email", "phone", "number"].includes(field.type) && (
            <div className="space-y-2">
              <label className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Placeholder</label>
              <input
                value={field.placeholder || ""}
                onChange={(e) => onUpdate({ placeholder: e.target.value })}
                placeholder="e.g., Enter your answer"
                className="w-full h-[42px] px-3 rounded-[8px] outline-none focus:ring-2 focus:ring-[#8624F0]/30 text-sm"
                style={inputStyle}
              />
            </div>
          )}

          {/* Options */}
          {hasOptions && (
            <div className="space-y-2">
              <label className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Options</label>
              <div className="space-y-2">
                {field.options?.map((option, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      value={option}
                      onChange={(e) => updateOption(index, e.target.value)}
                      className="flex-1 h-[38px] px-3 rounded-[8px] outline-none focus:ring-2 focus:ring-[#8624F0]/30 text-sm"
                      style={inputStyle}
                    />
                    <button
                      onClick={() => deleteOption(index)}
                      className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-500" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addOption}
                  className="w-full py-2 border border-dashed border-[#8624F0] text-[#8624F0] rounded-[8px] text-sm font-medium flex items-center justify-center gap-2 hover:bg-[#8624F0]/5 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Option
                </button>
              </div>
            </div>
          )}

          {/* Required Toggle */}
          {!["heading", "paragraph", "divider"].includes(field.type) && (
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Required</label>
              <button
                onClick={() => onUpdate({ required: !field.required })}
                className={`w-11 h-6 rounded-full transition-colors relative ${field.required ? 'bg-[#8624F0]' : 'bg-gray-200 dark:bg-gray-600'}`}
              >
                <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${field.required ? 'translate-x-5' : 'translate-x-0.5'}`} />
              </button>
            </div>
          )}

          {/* Validation notes */}
          {field.type === "email" && (
            <div className="p-3 rounded-lg" style={{ background: 'var(--bg-main)' }}>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Email validation is automatically applied</p>
            </div>
          )}
          {field.type === "phone" && (
            <div className="p-3 rounded-lg" style={{ background: 'var(--bg-main)' }}>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Phone number validation is automatically applied</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}