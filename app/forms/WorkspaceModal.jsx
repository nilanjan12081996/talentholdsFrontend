'use client';

import { X, Briefcase, Star } from "lucide-react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setPrimaryWorkspace } from "../Reducer/WorkspaceSlice";

const WorkspaceModal = ({ isOpen, onClose, workspaces, onSelect }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  if (!isOpen) return null;

  const safeWorkspaces = Array.isArray(workspaces) ? workspaces : [];

  const handleSetPrimary = (e, wsId) => {
    e.stopPropagation();
    // Dispatch backend API call
    dispatch(setPrimaryWorkspace({ workspaceId: wsId })).then(() => {
        // Save to local storage
        localStorage.setItem('primaryWorkspaceId', wsId);
        // Alert the user
        alert("Workspace set as Default successfully!");
        onClose();
        onSelect(wsId);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose} 
      />

      <div 
        className="relative rounded-[20px] shadow-2xl w-full max-w-md mx-4 p-6 animate-in fade-in zoom-in-95 duration-200" 
        style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Select Workspace</h2>
            <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Choose where to proceed</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#8624F0]/5 transition-colors"
          >
            <X className="w-5 h-5" style={{ color: 'var(--text-secondary)' }} />
          </button>
        </div>

        <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
          {safeWorkspaces.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-[#8624F0]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#8624F0]">
                <Briefcase size={28} />
              </div>
              <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
                You haven't created any workspaces yet.
              </p>
              <button
                onClick={() => router.push('/workspace')}
                className="px-6 py-2.5 bg-[#8624F0] text-white rounded-[10px] font-bold hover:bg-[#6c1dc0] transition-colors"
              >
                Create Workspace
              </button>
            </div>
          ) : (
            safeWorkspaces.map((ws) => {
              const isPrimary = typeof window !== 'undefined' && localStorage.getItem('primaryWorkspaceId') == ws.id;
              
              return (
                <div
                  key={ws.id}
                  className="w-full flex items-center gap-3 p-3 rounded-[12px] border transition-all hover:border-[#8624F0] hover:bg-[#8624F0]/5 group"
                  style={{ borderColor: isPrimary ? '#8624F0' : 'var(--border-color)', background: isPrimary ? '#8624F010' : 'var(--bg-main)' }}
                >
                  <button
                    onClick={() => onSelect(ws?.id)}
                    className="flex-1 flex items-center gap-4 text-left"
                  >
                    <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#8624F0]/10 text-[#8624F0] group-hover:scale-110 transition-transform">
                      <Briefcase size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm" style={{ color: 'var(--text-primary)' }}>
                        {ws.name}
                        {isPrimary && <span className="ml-2 text-[10px] bg-[#8624F0] text-white px-2 py-0.5 rounded-full">Default</span>}
                      </h3>
                    </div>
                  </button>
                  
                  {/* Set as Default Action */}
                  <button
                    onClick={(e) => handleSetPrimary(e, ws.id)}
                    title={isPrimary ? "Already Default" : "Set as Default"}
                    className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors ${
                      isPrimary 
                        ? 'text-[#facc15]' 
                        : 'text-gray-300 hover:text-[#facc15] hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Star className="w-5 h-5" fill={isPrimary ? "currentColor" : "none"} />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkspaceModal;