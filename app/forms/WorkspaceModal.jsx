'use client';

import { X, Briefcase } from "lucide-react";

const WorkspaceModal = ({ isOpen, onClose, workspaces, onSelect }) => {
  // Don't render anything if the modal is closed
  if (!isOpen) return null;

  // Ensure workspaces is an array
  const safeWorkspaces = Array.isArray(workspaces) ? workspaces : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Dimmed Background Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose} 
      />

      {/* Modal Content */}
      <div 
        className="relative rounded-[20px] shadow-2xl w-full max-w-md mx-4 p-6 animate-in fade-in zoom-in-95 duration-200" 
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Select Workspace</h2>
            <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Choose where to create your new form</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#8624F0]/5 transition-colors"
          >
            <X className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
          </button>
        </div>

        {/* Workspace List */}
        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {safeWorkspaces.length === 0 ? (
            <p className="text-center text-sm py-4" style={{ color: 'var(--text-secondary)' }}>
              No workspaces available.
            </p>
          ) : (
            safeWorkspaces.map((ws) => (
              <button
                key={ws.id} // Adjust key based on your API response
                onClick={() => onSelect(ws?.id)}
                className="w-full flex items-center gap-4 p-4 rounded-[12px] border transition-all hover:border-[#8624F0] hover:bg-[#8624F0]/5 group text-left"
                style={{ borderColor: 'var(--border-color)', background: 'var(--bg-main)' }}
              >
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#8624F0]/10 text-[#8624F0] group-hover:scale-110 transition-transform">
                  <Briefcase size={20} />
                </div>
                <div>
                  {/* Adjust ws.name if your API uses a different key for the title */}
                  <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                    {ws.name} 
                  </h3>
                  {/* <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                    Click to continue
                  </p> */}
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkspaceModal;