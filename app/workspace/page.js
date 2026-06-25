'use client';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createWorkspace, workspaceList, setPrimaryWorkspace } from '../Reducer/WorkspaceSlice';
import { Plus, Briefcase, Star, X, Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function WorkspacePage() {
  const dispatch = useDispatch();
  const { workspaceData, loading } = useSelector((state) => state?.workspace || {});
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [primaryId, setPrimaryId] = useState(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  useEffect(() => {
    dispatch(workspaceList());
    setPrimaryId(localStorage.getItem('primaryWorkspaceId'));
  }, [dispatch]);

  const workspaces = workspaceData?.data || [];

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
    <div className="px-6 pb-6 md:px-8 md:pb-8 w-full h-[calc(100vh-100px)] flex flex-col">
      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* Header - Fixed */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">My Workspaces</h1>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="cursor-pointer bg-[#761ed3] hover:bg-[#6016ab] text-white px-6 py-3 rounded-xl flex items-center gap-2 font-medium transition-all shadow-sm hover:shadow-md"
        >
          <Plus size={20} />
          Create Workspace
        </button>
      </div>

      {/* Table Container - Scrollable */}
      <div className="mt-6 flex-1 overflow-y-auto bg-bg-card rounded-[20px] shadow-sm border border-border-color relative">
        {loading && workspaces.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="w-10 h-10 animate-spin text-[#761ed3]" />
          </div>
        ) : workspaces.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-12">
            <Briefcase size={48} className="text-gray-300 dark:text-gray-600 mb-4" />
            <h3 className="text-xl font-bold text-text-primary mb-2">No Workspaces Found</h3>
            <p className="text-text-secondary text-center mb-6 max-w-md">
              You don't have any workspaces yet. Create one to start managing your forms and candidates.
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-[#761ed3] hover:bg-[#6016ab] text-white px-6 py-3 rounded-xl flex items-center gap-2 font-medium"
            >
              <Plus size={20} />
              Create First Workspace
            </button>
          </div>
        ) : (
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead className="sticky top-0 bg-bg-card shadow-sm z-10">
              <tr>
                <th className="py-4 px-6 font-semibold text-text-secondary border-b border-border-color">Workspace Details</th>
                <th className="py-4 px-6 font-semibold text-text-secondary border-b border-border-color w-[180px]">Created On</th>
                <th className="py-4 px-6 font-semibold text-text-secondary border-b border-border-color w-[150px]">Status</th>
                <th className="py-4 px-6 font-semibold text-text-secondary border-b border-border-color text-right w-[200px]">Action</th>
              </tr>
            </thead>
            <tbody>
              {workspaces.map((w) => {
                const isPrimary = primaryId == w.id || w.primaryWorkspaceDto != null;
                
                // Format the creation date nicely
                const createdDate = w.createdAt 
                  ? new Date(w.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
                  : 'N/A';

                return (
                  <tr 
                    key={w.id} 
                    className={`transition-colors border-b border-border-color last:border-0 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] ${
                      isPrimary ? 'bg-[#8624F0]/[0.02]' : ''
                    }`}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="h-12 w-12 shrink-0 bg-gradient-to-tr from-[#7B6341] to-[#A8885B] rounded-[10px] flex items-center justify-center text-white text-lg font-bold shadow-sm">
                          {w.name ? w.name.charAt(0).toUpperCase() : 'W'}
                        </div>
                        <div>
                          <h3 className="text-[16px] font-bold text-text-primary mb-0.5">{w.name}</h3>
                          <p className="text-[13px] text-text-secondary truncate max-w-[400px]">
                            {w.description || "No description provided."}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="text-text-secondary text-[13px] font-medium">{createdDate}</span>
                    </td>
                    <td className="py-4 px-6">
                      {isPrimary ? (
                        <span className="bg-[#8624F0] text-white text-[11px] px-3 py-1 rounded-full font-bold uppercase tracking-wider shadow-sm inline-flex items-center gap-1">
                          <Star size={12} className="fill-white" /> Default
                        </span>
                      ) : (
                        <span className="text-text-secondary text-[13px] font-medium">-</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleSetPrimary(w.id)}
                        disabled={isPrimary}
                        className={`cursor-pointer px-4 py-2 rounded-[8px] font-semibold text-[13px] flex items-center justify-center gap-2 transition-colors ml-auto ${
                          isPrimary
                            ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800 dark:text-gray-500'
                            : 'bg-[#F5F0FF] text-[#8B5CF6] hover:bg-[#8624F0] hover:text-white dark:bg-[#2d1a4d] dark:text-[#c084fc] dark:hover:bg-[#8624F0] dark:hover:text-white border border-[#8B5CF6]/20'
                        }`}
                      >
                        {isPrimary ? 'Current Default' : 'Set as Default'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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
                  className="cursor-pointer flex-1 py-3 rounded-xl font-medium text-text-secondary hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="cursor-pointer flex-1 bg-[#761ed3] text-white py-3 rounded-xl font-medium hover:bg-[#6016ab] transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
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