'use client';

import { Plus, Share2, Search, Loader2, Filter, ArrowUpDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import WorkspaceModal from './WorkspaceModal';
import { workspaceList } from '../Reducer/WorkspaceSlice';
import { allFormList, updateForm } from '../Reducer/FormbuilderSlice';
import ShareModal from '../ui/form-builder/ShareModal';

export default function Forms() {
  const router = useRouter();
  const dispatch = useDispatch();

  // States for Initial Workspace Selection
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const [showInitialModal, setShowInitialModal] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [shareForm, setShareForm] = useState(null);

  // Local state for optimistic UI updates to prevent jumping
  const [localClosedStatus, setLocalClosedStatus] = useState({});

  // State for "Create New Form" Modal
  const [openworkspaceModal, setWorkspaceModal] = useState(false);

  // Search, Filter, Sort, Pagination States
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: '', direction: '' });
  const [currentPage, setCurrentPage] = useState(0);



  // Redux Selectors
  const { workspaceData, loading } = useSelector((state) => state?.workspace || {});
  const { allforms } = useSelector((state) => state?.formBuilder)

  // --- UPDATED LOGIC: Fetch all forms up to 100 and do client-side processing ---
  const rawFormsList = allforms?.data?.content || [];

  // 1. Search & Filter
  const filteredForms = rawFormsList.filter(form => {
    const matchesSearch = (form.title || '').toLowerCase().includes(searchQuery.toLowerCase());
    let matchesFilter = true;
    if (filterStatus === 'active') matchesFilter = !form.isClosed;
    if (filterStatus === 'closed') matchesFilter = form.isClosed;
    return matchesSearch && matchesFilter;
  });

  // 2. Sort
  const sortedForms = [...filteredForms].sort((a, b) => {
    let valA, valB;
    if (sortConfig.key === 'fields') {
      valA = a.fields?.length || 0;
      valB = b.fields?.length || 0;
    } else if (sortConfig.key === 'responses') {
      valA = a.responseCount || 0;
      valB = b.responseCount || 0;
    } else if (sortConfig.key === 'createdAt') {
      valA = new Date(a.createdAt || 0).getTime();
      valB = new Date(b.createdAt || 0).getTime();
    } else { // updatedAt
      valA = new Date(a.updatedAt || a.createdAt || 0).getTime();
      valB = new Date(b.updatedAt || b.createdAt || 0).getTime();
    }

    if (valA < valB) return sortConfig.direction === 'asc' ? -1 : 1;
    if (valA > valB) return sortConfig.direction === 'asc' ? 1 : -1;
    return 0;
  });

  // 3. Pagination
  const itemsPerPage = 6;
  const totalPages = Math.ceil(sortedForms.length / itemsPerPage) || 1;
  const startIndex = currentPage * itemsPerPage;
  const currentFormsList = sortedForms.slice(startIndex, startIndex + itemsPerPage);

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

  // Fetch large data initially when workspace changes
  useEffect(() => {
    if (selectedWorkspace) {
      dispatch(allFormList({ id: selectedWorkspace, page: 0, size: 100 }));
    }
  }, [selectedWorkspace, dispatch]);

  // Reset page to 0 when search/filter/sort changes
  useEffect(() => {
    setCurrentPage(0);
  }, [searchQuery, filterStatus, sortConfig]);

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

  const handleToggleStatus = (form) => {
    const isCurrentlyClosed = localClosedStatus[form.id] !== undefined ? localClosedStatus[form.id] : form.isClosed;
    const newStatus = !isCurrentlyClosed;
    
    // Optimistic UI update (won't trigger re-sort because updatedAt hasn't changed in Redux)
    setLocalClosedStatus(prev => ({ ...prev, [form.id]: newStatus }));

    // The update API expects the complete form structure.
    const payload = {
      id: form.id,
      title: form.title,
      description: form.description,
      workspaceId: selectedWorkspace,
      isClosed: newStatus,
      password: form.password || null,
      fields: (form.fields || []).map(f => {
         const base = {
            id: f.id,
            label: f.label,
            placeholder: f.placeholder || '',
            isRequired: f.isRequired,
            fieldTypeId: f.fieldType?.id || 1,
         };
         if (f.options && f.options.length > 0) {
            base.options = f.options.map(opt => ({
               // Do not pass opt.id because the backend deletes and recreates options, 
               // and passing the id causes an optimistic locking/transaction error.
               optionLabel: opt.optionLabel || opt.label || (typeof opt === 'string' ? opt : '')
            }));
         }
         return base;
      })
    };

    dispatch(updateForm(payload));
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
          <h1 className="text-2xl font-bold flex items-baseline gap-2" style={{ color: 'var(--text-primary)' }}>
            Forms
            {selectedWorkspace && workspaceData?.data && (
              <span className="text-sm font-normal" style={{ color: 'var(--text-secondary)' }}>
                (You are in the <span className="text-[#8624F0] font-bold">{workspaceData.data.find(w => w.id == selectedWorkspace)?.name || ''}</span> workspace)
              </span>
            )}
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Create and manage forms</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <div className="hidden lg:flex items-center text-sm mr-2" style={{ color: 'var(--text-secondary)' }}>
            <span className="text-[#8624F0] font-bold">All Forms ({rawFormsList.length})</span>
          </div>
          <div className="relative w-full sm:w-48">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search Forms..."
              disabled={!selectedWorkspace}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8624f0] focus:border-transparent transition-colors text-sm disabled:opacity-50"
              style={{ borderColor: 'var(--border-color)', background: 'var(--bg-main)', color: 'var(--text-primary)' }}
            />
          </div>

          <div className="relative w-full sm:w-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter size={16} className="text-gray-400" />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              disabled={!selectedWorkspace}
              className="w-full sm:w-auto pl-10 pr-8 py-2 border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#8624f0] focus:border-transparent transition-colors text-sm cursor-pointer disabled:opacity-50"
              style={{ borderColor: 'var(--border-color)', background: 'var(--bg-main)', color: 'var(--text-primary)' }}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="closed">Closed</option>
            </select>
          </div>

          <div className="relative w-full sm:w-auto flex items-center border rounded-lg transition-colors focus-within:ring-2 focus-within:ring-[#8624f0] focus-within:border-transparent" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-main)', color: 'var(--text-primary)' }}>
            <div className="pl-3 pr-2 flex items-center pointer-events-none">
              <ArrowUpDown size={16} className="text-gray-400" />
            </div>
            <select
              value={sortConfig.key}
              onChange={(e) => setSortConfig({ ...sortConfig, key: e.target.value })}
              disabled={!selectedWorkspace}
              className="py-2 pr-2 bg-transparent appearance-none focus:outline-none text-sm cursor-pointer disabled:opacity-50"
              style={{ color: 'var(--text-primary)' }}
            >
              <option value="updatedAt">Last Modified</option>
              <option value="createdAt">Created On</option>
              <option value="fields">Fields</option>
              <option value="responses">Responses</option>
            </select>
            <div className="w-[1px] h-4 bg-gray-300 dark:bg-gray-600 mx-1"></div>
            <select
              value={sortConfig.direction}
              onChange={(e) => setSortConfig({ ...sortConfig, direction: e.target.value })}
              disabled={!selectedWorkspace}
              className="py-2 pl-2 pr-4 bg-transparent appearance-none focus:outline-none text-sm cursor-pointer disabled:opacity-50"
              style={{ color: 'var(--text-primary)' }}
            >
              <option value="desc">Desc</option>
              <option value="asc">Asc</option>
            </select>
          </div>

          <button
            onClick={handleAddForm}
            disabled={!selectedWorkspace}
            className="w-full sm:w-auto bg-[#8624F0] text-white px-5 py-2 rounded-[8px] font-bold flex items-center justify-center gap-2 hover:bg-[#6c1dc0] transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus size={18} /> New Form
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
      ) : currentFormsList.length === 0 ? (
        <div className="rounded-[20px] py-20 flex flex-col items-center justify-center text-center border border-dashed" style={{ borderColor: 'var(--border-color)' }}>
          <p style={{ color: 'var(--text-secondary)' }}>No forms found for this workspace. Click "Create New Form" to get started.</p>
        </div>
      ) : (
        <div className="flex flex-col flex-1 min-h-0">
          {/* Scrollable Grid Container */}
          <div className="flex-1 overflow-y-auto pr-2 pb-4 custom-scrollbar">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {currentFormsList.map((form) => {
                const isFormClosed = localClosedStatus[form.id] !== undefined ? localClosedStatus[form.id] : form.isClosed;
                return (
                  <div
                    key={form.id}
                    className={`rounded-[20px] p-6 shadow-sm hover:shadow-md transition-all flex flex-col h-full ${isFormClosed ? 'opacity-60 grayscale-[20%]' : ''}`}
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
                        <div 
                          onClick={(e) => { e.stopPropagation(); handleToggleStatus(form); }}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <div className={`relative w-10 h-5 rounded-full transition-colors ${!isFormClosed ? 'bg-[#25852F]' : 'bg-gray-300 dark:bg-gray-600'}`}>
                            <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform ${!isFormClosed ? 'translate-x-5' : ''}`} />
                          </div>
                          <span className={`text-[10px] font-bold whitespace-nowrap ${!isFormClosed ? 'text-[#25852F]' : 'text-gray-500'}`}>
                            {!isFormClosed ? 'Active' : 'Closed'}
                          </span>
                        </div>
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

                  <div className="flex justify-between items-center text-[11px] font-bold mb-6 shrink-0 gap-2 text-center" style={{ color: 'var(--text-primary)' }}>
                    <div className="flex flex-col">
                      <span className="font-normal block mb-0.5" style={{ color: 'var(--text-secondary)' }}>Fields</span>
                      {form.fields?.length || 0}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-normal block mb-0.5" style={{ color: 'var(--text-secondary)' }}>Responses</span>
                      {form.responseCount || 0}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-normal block mb-0.5" style={{ color: 'var(--text-secondary)' }}>Created On</span>
                      {form.createdAt ? new Date(form.createdAt).toLocaleDateString() : 'N/A'}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-normal block mb-0.5" style={{ color: 'var(--text-secondary)' }}>Last Modified</span>
                      {form.updatedAt
                        ? new Date(form.updatedAt).toLocaleDateString()
                        : (form.createdAt ? new Date(form.createdAt).toLocaleDateString() : 'N/A')}
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
                      onClick={() => { setShareForm(form); setShareModalOpen(true); }}
                      className="p-2.5 border border-[#8624F0] text-[#8624F0] rounded-[8px] hover:bg-[#8624F0]/5 transition-colors cursor-pointer"
                    >
                      <Share2 size={18} />
                    </button>
                  </div>
                </div>
              );
              })}
            </div>
          </div>

          {/* Pagination Controls */}
          {totalPages > 0 && (
            <div className="flex justify-between items-center pt-4 border-t shrink-0" style={{ borderColor: 'var(--border-color)' }}>
              <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                Showing Page {currentPage + 1} of {totalPages}
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
                  disabled={currentPage === 0}
                  className="px-4 py-2 border border-[#8624F0] text-[#8624F0] rounded-[8px] font-medium text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#8624F0]/5 transition-colors cursor-pointer"
                >
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
                  disabled={currentPage >= totalPages - 1}
                  className="px-4 py-2 border border-[#8624F0] text-[#8624F0] rounded-[8px] font-medium text-sm disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#8624F0]/5 transition-colors cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>
          )}
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

      <ShareModal
        isOpen={shareModalOpen}
        onClose={() => { setShareModalOpen(false); setShareForm(null); }}
        formLink={shareForm?.publicSlug}
        hideSettings={true}
      />
    </div>
  );
}