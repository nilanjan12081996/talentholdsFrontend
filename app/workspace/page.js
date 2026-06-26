'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createWorkspace, workspaceList, setPrimaryWorkspace } from '../Reducer/WorkspaceSlice';
import { Plus, Briefcase, Star, X, Loader2, Search, Filter, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function WorkspacePage() {
  const dispatch = useDispatch();
  const { workspaceData, loading } = useSelector((state) => state?.workspace || {});
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [primaryId, setPrimaryId] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const itemsPerPage = 7;

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    dispatch(workspaceList());
    setPrimaryId(localStorage.getItem('primaryWorkspaceId'));
  }, [dispatch]);

  const workspaces = workspaceData?.data || [];

  // Reset to page 1 when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, filterStatus]);

  const filteredWorkspaces = workspaces.filter(w => {
    const searchLower = searchQuery.toLowerCase();
    const isPrimary = primaryId == w.id || w.primaryWorkspaceDto != null;
    
    const matchesSearch = w.name?.toLowerCase().includes(searchLower) || (w.description || '').toLowerCase().includes(searchLower);
    const matchesFilter = filterStatus === 'all' || (filterStatus === 'primary' && isPrimary) || (filterStatus === 'normal' && !isPrimary);
    
    return matchesSearch && matchesFilter;
  });

  const sortedWorkspaces = [...filteredWorkspaces].sort((a, b) => {
    if (!sortConfig.key) return 0;
    
    if (sortConfig.key === 'name') {
      const nameA = a.name || '';
      const nameB = b.name || '';
      return sortConfig.direction === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
    }
    
    if (sortConfig.key === 'date') {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
      return sortConfig.direction === 'asc' ? dateA - dateB : dateB - dateA;
    }
    
    return 0;
  });

  const totalPages = Math.ceil(sortedWorkspaces.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = sortedWorkspaces.slice(startIndex, startIndex + itemsPerPage);

  const handlePrevPage = () => { if (currentPage > 1) setCurrentPage(currentPage - 1); };
  const handleNextPage = () => { if (currentPage < totalPages) setCurrentPage(currentPage + 1); };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') direction = 'desc';
    else if (sortConfig.key === key && sortConfig.direction === 'desc') { key = null; direction = 'asc'; }
    setSortConfig({ key, direction });
  };

  const handleSetPrimary = (id) => {
    dispatch(setPrimaryWorkspace({ workspaceId: id })).then((res) => {
      if (res?.payload?.statusCode === 200 || res?.payload?.statusCode === 201) {
        localStorage.setItem('primaryWorkspaceId', id);
        setPrimaryId(id.toString());
        dispatch(workspaceList()); // Refresh list to update primaryWorkspaceDto flags
        toast.success("Default workspace updated successfully!");
      }
    });
  };

  const onSubmit = (data) => {
    dispatch(createWorkspace(data)).then((res) => {
      if (res?.payload?.statusCode === 201 || res?.payload?.statusCode === 200) {
        toast.success(res?.payload?.message || "Workspace created!");
        dispatch(workspaceList());
        setShowCreateModal(false);
        reset();
      } else {
        toast.error("Failed to create workspace.");
      }
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-100px)] rounded-[20px] p-4 md:p-8 overflow-y-auto" style={{ background: 'var(--bg-card)' }}>
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-text-primary">My Workspaces</h1>
          <p className="text-sm text-text-secondary">
            Manage your workspaces and set your default environment.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={16} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search workspaces..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8624f0] focus:border-transparent transition-colors text-sm"
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
              className="w-full sm:w-auto pl-10 pr-8 py-2 border rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-[#8624f0] focus:border-transparent transition-colors text-sm cursor-pointer"
              style={{ borderColor: 'var(--border-color)', background: 'var(--bg-main)', color: 'var(--text-primary)' }}
            >
              <option value="all">All Workspaces</option>
              <option value="primary">Default Only</option>
              <option value="normal">Normal Only</option>
            </select>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="w-full sm:w-auto bg-[#761ed3] hover:bg-[#6016ab] text-white px-5 py-2 rounded-lg flex items-center justify-center gap-2 font-bold transition-all shadow-sm"
          >
            <Plus size={18} />
            Create
          </button>
        </div>
      </div>

      <div className="rounded-[20px] border flex flex-col" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-main)' }}>
        {loading && workspaces.length === 0 ? (
          <div className="p-16 flex justify-center">
            <Loader2 className="w-10 h-10 animate-spin text-[#761ed3]" />
          </div>
        ) : workspaces.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-lg font-medium text-text-primary">No Workspaces Found</p>
            <p className="mt-1 text-text-secondary">You don't have any workspaces yet. Create one to get started.</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto p-4">
              <table className="w-full border-collapse border" style={{ borderColor: 'var(--border-color)' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}>
                    <th className="py-4 px-4 text-center border font-semibold whitespace-nowrap cursor-pointer hover:bg-gray-50/10 transition-colors" style={{ borderColor: 'var(--border-color)' }} onClick={() => handleSort('name')}>
                      <div className="flex items-center justify-center gap-2">
                        Workspace Name
                        <ArrowUpDown size={14} className={sortConfig.key === 'name' ? 'text-[#8624f0]' : 'text-gray-400'} />
                      </div>
                    </th>
                    <th className="py-4 px-4 text-center border font-semibold whitespace-nowrap cursor-pointer hover:bg-gray-50/10 transition-colors" style={{ borderColor: 'var(--border-color)' }} onClick={() => handleSort('date')}>
                      <div className="flex items-center justify-center gap-2">
                        Created On
                        <ArrowUpDown size={14} className={sortConfig.key === 'date' ? 'text-[#8624f0]' : 'text-gray-400'} />
                      </div>
                    </th>
                    <th className="py-4 px-4 text-center border font-semibold whitespace-nowrap" style={{ borderColor: 'var(--border-color)' }}>Status</th>
                    <th className="py-4 px-4 text-center border font-semibold whitespace-nowrap" style={{ borderColor: 'var(--border-color)' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length > 0 ? (
                    currentItems.map((w) => {
                      const isPrimary = primaryId == w.id || w.primaryWorkspaceDto != null;
                      const createdDate = w.createdAt 
                        ? new Date(w.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
                        : 'N/A';

                      return (
                        <tr key={w.id} className="hover:bg-gray-50/5 transition-colors">
                          <td className="py-4 px-4 border align-middle" style={{ borderColor: 'var(--border-color)' }}>
                            <div className="flex items-center justify-center gap-3">
                              <div className="h-10 w-10 shrink-0 bg-gradient-to-tr from-[#761ED3] to-[#8624F0] rounded-[8px] flex items-center justify-center text-white text-lg font-bold shadow-sm">
                                {w.name ? w.name.charAt(0).toUpperCase() : 'W'}
                              </div>
                              <div className="text-left">
                                <div className="font-bold text-text-primary">{w.name}</div>
                                <div className="text-xs text-text-secondary truncate max-w-[200px]">{w.description || 'No description'}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4 text-center border align-middle font-medium text-text-secondary" style={{ borderColor: 'var(--border-color)' }}>
                            {createdDate}
                          </td>
                          <td className="py-4 px-4 text-center border align-middle" style={{ borderColor: 'var(--border-color)' }}>
                            {isPrimary ? (
                              <span className="bg-purple-100 text-[#8624f0] border border-purple-200 text-xs px-3 py-1 rounded-full font-bold uppercase inline-flex items-center gap-1">
                                <Star size={12} className="fill-[#8624f0]" /> Default
                              </span>
                            ) : (
                              <span className="text-text-secondary text-sm font-medium">-</span>
                            )}
                          </td>
                          <td className="py-4 px-4 text-center border align-middle" style={{ borderColor: 'var(--border-color)' }}>
                            <button
                              onClick={() => handleSetPrimary(w.id)}
                              disabled={isPrimary}
                              className={`cursor-pointer px-4 py-2 rounded-[8px] font-bold text-xs mx-auto flex items-center justify-center gap-2 transition-colors ${
                                isPrimary
                                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                                  : 'bg-[#F5F0FF] text-[#8624f0] hover:bg-[#8624F0] hover:text-white border border-purple-200'
                              }`}
                            >
                              {isPrimary ? 'Current Default' : 'Set as Default'}
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="4" className="py-8 text-center text-sm text-text-secondary">
                        No workspaces found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {filteredWorkspaces.length >= 0 && (
              <div className="flex items-center justify-between px-6 py-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
                <span className="text-sm text-text-secondary">
                  Showing <span className="font-semibold text-text-primary">{startIndex + 1}</span> to <span className="font-semibold text-text-primary">{Math.min(startIndex + itemsPerPage, filteredWorkspaces.length)}</span> of <span className="font-semibold text-text-primary">{filteredWorkspaces.length}</span> entries
                </span>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className="cursor-pointer p-2 border rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`cursor-pointer w-8 h-8 flex items-center justify-center rounded-md text-sm font-bold transition-colors ${
                          currentPage === page 
                            ? 'bg-[#8624f0] text-white' 
                            : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                        }`}
                        style={currentPage !== page ? { color: 'var(--text-primary)' } : {}}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  <button 
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className="cursor-pointer p-2 border rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    style={{ borderColor: 'var(--border-color)', color: 'var(--text-primary)' }}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-bg-card w-full max-w-md rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-border-color">
              <h2 className="text-xl font-bold text-text-primary">Create New Workspace</h2>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="cursor-pointer text-text-secondary hover:text-text-primary transition-colors p-1"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="p-6">
              <div className="mb-6">
                <label className="block text-sm font-semibold text-text-primary mb-2">
                  Workspace Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Acme Corporation"
                  className={`w-full px-4 py-3 rounded-xl border bg-transparent text-text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-[#761ed3]/20 ${
                    errors.name ? 'border-red-500' : 'border-border-color focus:border-[#761ed3]'
                  }`}
                  {...register("name", { required: "Workspace name is required" })}
                />
                {errors.name && (
                  <span className="text-red-500 text-sm mt-2 block">{errors.name.message}</span>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="cursor-pointer flex-1 py-3 rounded-xl font-bold text-text-secondary hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="cursor-pointer flex-1 bg-[#761ed3] text-white py-3 rounded-xl font-bold hover:bg-[#6016ab] transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                >
                  {loading && <Loader2 size={18} className="animate-spin" />}
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}