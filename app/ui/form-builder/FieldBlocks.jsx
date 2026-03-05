'use client';

import {
  Type, AlignLeft, Hash, Circle, CheckSquare,
  ChevronDown, Mail, Phone, Calendar, Upload,
  Star, Minus, Heading1, FileText,
} from "lucide-react";

const blocks = [
  { id: "1", icon: Type, label: "Short Text", type: "short-text" },
  { id: "2", icon: AlignLeft, label: "Long Text", type: "long-text" },
  { id: "3", icon: Hash, label: "Number", type: "number" },
  { id: "4", icon: Circle, label: "Multiple Choice", type: "multiple-choice" },
  { id: "5", icon: CheckSquare, label: "Checkbox", type: "checkbox" },
  { id: "6", icon: ChevronDown, label: "Dropdown", type: "dropdown" },
  { id: "7", icon: Mail, label: "Email", type: "email" },
  { id: "8", icon: Phone, label: "Phone", type: "phone" },
  { id: "9", icon: Calendar, label: "Date", type: "date" },
  { id: "10", icon: Upload, label: "File Upload", type: "file-upload" },
  { id: "11", icon: Star, label: "Rating", type: "rating" },
  { id: "12", icon: Minus, label: "Divider", type: "divider" },
  { id: "13", icon: Heading1, label: "Heading", type: "heading" },
  { id: "14", icon: FileText, label: "Paragraph", type: "paragraph" },
];

export default function FieldBlocks({ onAddField }) {
  return (
    <div className="w-64 flex flex-col shrink-0" style={{ background: 'var(--bg-card)', borderRight: '1px solid var(--border-color)' }}>
      <div className="p-4" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Add Fields</h3>
        <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>Click to add to form</p>
      </div>
      <div className="flex-1 overflow-y-auto">
        <div className="p-3 space-y-1">
          {blocks.map((block) => (
            <button
              key={block.id}
              onClick={() => onAddField(block.type)}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all cursor-pointer text-left group hover:bg-[#8624F0]/5"
            >
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors group-hover:bg-[#8624F0]/10"
                style={{ background: 'var(--bg-main)' }}
              >
                <block.icon className="w-4 h-4 group-hover:text-[#8624F0] transition-colors" style={{ color: 'var(--text-secondary)' }} />
              </div>
              <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{block.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}