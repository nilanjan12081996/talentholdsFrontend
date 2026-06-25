'use client';

import { Plus, ExternalLink, Search, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WorkspaceModal from './WorkspaceModal';
import { workspaceList } from '../Reducer/WorkspaceSlice';
import { allFormList } from '../Reducer/FormbuilderSlice';

export default function Forms() {
  const router = useRouter();
  const dispatch = useDispatch();

  // States for Initial Workspace Selection
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const [showInitialModal, setShowInitialModal] = useState(false);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(0);

  // State for "Create New Form" Modal
  const [openworkspaceModal, setWorkspaceModal] = useState(false);

  // Redux Selectors
  const { workspaceData, loading } = useSelector((state) => state?.workspace || {});
  const { allforms } = useSelector((state) => state?.formBuilder)

  // --- UPDATED LOGIC: Extract from data.content based on paginated API response ---
  const formsList = allforms?.data?.content || [];
  console.log("formsList", allforms);

  useEffect(() => {
    dispatch(workspaceList());
  }, [dispatch]);

  // Auto-Select Primary Workspace Logic
  useEffect(() => {
    if (workspaceData?.data && !selectedWorkspace) {
      const workspaces = workspaceData.data;
      const primaryId = localStorage.getItem('primaryWorkspaceId');
      
      if (workspaces.length === 1) {
        handleInitialWorkspaceSelect(workspaces[0].id);
      } else if (workspaces.length > 1 && primaryId && workspaces.find(w => w.id == primaryId)) {
        handleInitialWorkspaceSelect(primaryId);
      } else {
        setShowInitialModal(true);
      }
    }
  }, [workspaceData]);

  // Fetch paginated data when workspace or page changes
  useEffect(() => {
    if (selectedWorkspace) {
      dispatch(allFormList({ id: selectedWorkspace, page: currentPage, size: 6 }));
    }
  }, [selectedWorkspace, currentPage, dispatch]);

  // Handler for Initial Page Load Selection
  const handleInitialWorkspaceSelect = (workspaceId) => {
    console.log("Selected Initial Workspace:", workspaceId);
    setSelectedWorkspace(workspaceId);
    setShowInitialModal(false);
    setCurrentPage(0); // Reset to first page
  };

  // Handler for "Create New Form"
  const handleAddForm = () => {
    setWorkspaceModal(true);
  };

  const handleSelectWorkspace = (workspaceId) => {
    console.log("Selected workspace for new form:", workspaceId);
    setWorkspaceModal(false);
    router.push(`/forms/builder?workspaceId=${workspaceId}`);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] rounded-[20px] p-4 md:p-6" style={{ background: 'var(--bg-card)' }}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shrink-0 mb-6">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Forms</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Create and manage application and referral forms</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="hidden md:flex items-center text-sm gap-4" style={{ color: 'var(--text-secondary)' }}>
            <span className="text-[#8624F0] font-bold cursor-pointer">All Forms ({formsList.length})</span>
          </div>
          <button
            onClick={handleAddForm}
            disabled={!selectedWorkspace}
            className="bg-[#8624F0] text-white px-6 py-3 rounded-[10px] font-bold flex items-center gap-2 hover:bg-[#6c1dc0] transition-colors whitespace-nowrap ml-auto disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus size={18} /> Create New Form
          </button>
        </div>
      </div>

      {/* Conditionally Render Empty State, Loading, or the Grid */}
      {!selectedWorkspace ? (
        <div className="rounded-[20px] py-20 flex flex-col items-center justify-center text-center border-2 border-dashed" style={{ borderColor: 'var(--border-color)' }}>
          <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-[#8624F0]/10 text-[#8624F0]">
            <Search size={24} />
          </div>
          <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>No Workspace Selected</h3>
          <p className="text-sm max-w-sm" style={{ color: 'var(--text-secondary)' }}>
            Please select a workspace to view your forms.
          </p>
          <button
            onClick={() => setShowInitialModal(true)}
            className="mt-6 px-6 py-2 bg-[#8624F0] text-white rounded-[8px] font-medium hover:bg-[#6c1dc0] transition-colors"
          >
            Select Workspace
          </button>
        </div>
      ) : loading ? (
        <div className="rounded-[20px] py-20 flex flex-col items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#8624F0] mb-4" />
          <p style={{ color: 'var(--text-secondary)' }}>Loading forms...</p>
        </div>
      ) : formsList.length === 0 ? (
        <div className="rounded-[20px] py-20 flex flex-col items-center justify-center text-center border border-dashed" style={{ borderColor: 'var(--border-color)' }}>
          <p style={{ color: 'var(--text-secondary)' }}>No forms found for this workspace. Click "Create New Form" to get started.</p>
        </div>
      ) : (
        <div className="flex flex-col flex-1 min-h-0">
          {/* Scrollable Grid Container */}
          <div className="flex-1 overflow-y-auto pr-2 pb-4 custom-scrollbar">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {formsList.map((form) => (
                <div
                  key={form.id}
                  className="rounded-[20px] p-6 shadow-sm hover:shadow-md transition-all flex flex-col h-full"
                  style={{
                    background: 'var(--bg-card)',
                    border: '1px solid var(--border-color)',
                  }}
                >
                  <div className="flex justify-between items-start mb-4 gap-3">
                    <h3 className="font-bold text-lg leading-tight flex-1 truncate" style={{ color: 'var(--text-primary)' }} title={form.title}>
                      {form.title}
                    </h3>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="px-2.5 py-1 bg-[#E6F6FD] dark:bg-[#1a3340] text-[#00A3FF] text-[10px] font-bold rounded-full whitespace-nowrap">
                        Form
                      </span>
                      <span className="px-2.5 py-1 bg-[#ECFCE5] dark:bg-[#1a3d1a] text-[#25852F] dark:text-[#4ade80] text-[10px] font-bold rounded-full whitespace-nowrap">
                        {form.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>

                  <div className="mb-5 flex-1">
                    <span className="font-normal block mb-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
                      Description
                    </span>
                    <p className="text-[13px] leading-relaxed line-clamp-3" style={{ color: 'var(--text-primary)' }}>
                      {form.description ? form.description : 'No description provided.'}
                    </p>
                  </div>

                  <div className="flex justify-between text-xs font-bold mb-6 shrink-0" style={{ color: 'var(--text-primary)' }}>
                    <div>
                      <span className="font-normal block mb-1" style={{ color: 'var(--text-secondary)' }}>Fields</span>
                      {form.fields?.length || 0}
                    </div>
                    <div>
                      <span className="font-normal block mb-1" style={{ color: 'var(--text-secondary)' }}>Created</span>
                      {form.createdAt ? new Date(form.createdAt).toLocaleDateString() : 'N/A'}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => router.push(`/forms/builder?formId=${form.id}&workspaceId=${selectedWorkspace}`)}
                      className="flex-1 border border-[#8624F0] text-[#8624F0] py-2.5 rounded-[8px] font-bold text-sm hover:bg-[#8624F0]/5 transition-colors cursor-pointer"
                    >
                      Edit Form
                    </button>
                    <button
                      onClick={() => {
                        const url = `${window.location.origin}/${form.publicSlug}`;
                        navigator.clipboard.writeText(url);
                        alert("Link copied!");
                      }}
                      className="flex-[2] bg-[#210043] dark:bg-[#6d28d9] text-white py-2.5 rounded-[8px] font-bold text-sm hover:bg-[#340b61] dark:hover:bg-[#7c3aed] transition-colors cursor-pointer"
                    >
                      Copy Link
                    </button>
                    <button
                      onClick={() => window.open(`/${form.publicSlug}`, '_blank')}
                      className="p-2.5 border border-[#8624F0] text-[#8624F0] rounded-[8px] hover:bg-[#8624F0]/5 transition-colors cursor-pointer"
                    >
                      <ExternalLink size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-between items-center pt-4 border-t shrink-0" style={{ borderColor: 'var(--border-color)' }}>
            <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              Showing Page {(allforms?.data?.number || 0) + 1} of {allforms?.data?.totalPages || 1}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
                disabled={allforms?.data?.first ?? true}
                className="px-4 py-2 border border-[#8624F0] text-[#8624F0] rounded-[8px] font-medium text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#8624F0]/5 transition-colors cursor-pointer"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(p => Math.min((allforms?.data?.totalPages || 1) - 1, p + 1))}
                disabled={allforms?.data?.last ?? true}
                className="px-4 py-2 border border-[#8624F0] text-[#8624F0] rounded-[8px] font-medium text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#8624F0]/5 transition-colors cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for "Create New Form" */}
      {openworkspaceModal && (
        <WorkspaceModal
          isOpen={openworkspaceModal}
          onClose={() => setWorkspaceModal(false)}
          workspaces={workspaceData?.data}
          onSelect={handleSelectWorkspace}
        />
      )}

      {/* Modal for Initial Page Load Selection */}
      <WorkspaceModal
        isOpen={showInitialModal}
        onClose={() => setShowInitialModal(false)}
        workspaces={workspaceData?.data}
        onSelect={handleInitialWorkspaceSelect}
      />

    </div>
  );
}