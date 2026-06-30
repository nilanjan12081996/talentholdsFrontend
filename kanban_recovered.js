'use client';

import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Search, Plus, MoreVertical, Pencil, Trash2, X, Loader2, User, GripVertical
} from 'lucide-react';
import { getCandidateByWorkspace } from '../Reducer/CandidateSlice';
import { workspaceList } from '../Reducer/WorkspaceSlice';
import {
    getWorkspaceStages,
    createWorkspaceStage,
    updateWorkspaceStage,
    deleteWorkspaceStage,
    updateCandidateStage,
    setLocalStage,
    rollbackLocalStage,
    clearStages,
} from '../Reducer/KanbanSlice';
import WorkspaceModal from '../forms/WorkspaceModal';
import { toast } from 'react-hot-toast';

// ─── Color palette for stages ─────────────────────────────────────────────────
const STAGE_COLORS = [
    { bg: '#EDE9FE', text: '#7C3AED', border: '#C4B5FD', dot: '#7C3AED' },
    { bg: '#DBEAFE', text: '#1D4ED8', border: '#93C5FD', dot: '#1D4ED8' },
    { bg: '#D1FAE5', text: '#065F46', border: '#6EE7B7', dot: '#065F46' },
    { bg: '#FEF3C7', text: '#92400E', border: '#FCD34D', dot: '#92400E' },
    { bg: '#FCE7F3', text: '#9D174D', border: '#F9A8D4', dot: '#9D174D' },
    { bg: '#E0F2FE', text: '#0369A1', border: '#7DD3FC', dot: '#0369A1' },
    { bg: '#F3F4F6', text: '#374151', border: '#D1D5DB', dot: '#374151' },
];
const APPLIED_COLOR = { bg: '#ECFCE5', text: '#065F46', border: '#6EE7B7', dot: '#25852F' };

// ─── Helpers ──────────────────────────────────────────────────────────────────
function getInitials(name) {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
}
function getAvatarColor(name) {
    const colors = ['#8624F0', '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#EC4899', '#06B6D4'];
    if (!name) return colors[0];
    return colors[name.charCodeAt(0) % colors.length];
}
function formatDate(dateStr) {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

// ─── Candidate Card ────────────────────────────────────────────────────────────
function CandidateCard({ candidate, onDragStart, onCardClick }) {
    const avatarColor = getAvatarColor(candidate.fullName);
    return (
        <div
            draggable
            onDragStart={(e) => onDragStart(e, candidate)}
            onClick={() => onCardClick(candidate)}
            className="bg-white rounded-[12px] p-4 mb-3 shadow-sm border border-gray-100 cursor-grab active:cursor-grabbing hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group"
            style={{ borderLeft: `3px solid ${avatarColor}` }}
        >
            <div className="flex items-start gap-3">
                <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                    style={{ background: avatarColor }}
                >
                    {getInitials(candidate.fullName)}
                </div>
                <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 text-sm truncate">{candidate.fullName || 'Unknown'}</p>
                    <p className="text-gray-500 text-xs truncate mt-0.5">{candidate.email}</p>
                </div>
                <GripVertical className="w-4 h-4 text-gray-300 group-hover:text-gray-400 flex-shrink-0 mt-0.5" />
            </div>
            <div className="mt-3 flex items-center justify-between gap-2">
                <span className="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-full truncate max-w-[140px]">
                    {candidate.formTitle || 'Form'}
                </span>
                <span className="text-xs text-gray-400 flex-shrink-0">
                    {formatDate(candidate.submittedAt || candidate.createdAt)}
                </span>
            </div>
        </div>
    );
}

// ─── Stage Column ──────────────────────────────────────────────────────────────
function StageColumn({ stage, candidates, color, isApplied, onDrop, onDragOver, onDragLeave, onDragStart, onEditStage, onDeleteStage, onCardClick, isDragOver }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        function handleOut(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
        }
        document.addEventListener('mousedown', handleOut);
        return () => document.removeEventListener('mousedown', handleOut);
    }, []);

    return (
        <div
            className="flex flex-col rounded-[16px] min-w-[280px] max-w-[280px] transition-all duration-200"
            style={{
                background: isDragOver ? color.bg : 'var(--bg-card)',
                border: `1.5px solid ${isDragOver ? color.border : 'var(--border-color)'}`,
                boxShadow: isDragOver ? `0 0 0 2px ${color.border}` : undefined,
            }}
            onDrop={onDrop}
            onDragOver={(e) => { e.preventDefault(); onDragOver(e, stage.id); }}
            onDragLeave={onDragLeave}
        >
            {/* Header */}
            <div className="flex items-center justify-between px-4 pt-4 pb-3">
                <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: color.dot }} />
                    <span className="font-bold text-sm" style={{ color: color.dot }}>{stage.name}</span>
                    <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{ background: color.bg, color: color.dot, border: `1px solid ${color.border}` }}
                    >
                        {candidates.length}
                    </span>
                </div>
                {!isApplied && (
                    <div className="relative" ref={menuRef}>
                        <button
                            onClick={() => setMenuOpen(o => !o)}
                            className="w-7 h-7 rounded-lg flex items-center justify-center hover:bg-black/5 transition-colors cursor-pointer"
                        >
                            <MoreVertical className="w-4 h-4 text-gray-400" />
                        </button>
                        {menuOpen && (
                            <div className="absolute right-0 top-8 w-36 bg-white rounded-[10px] shadow-xl border border-gray-100 z-50 overflow-hidden">
                                <button
                                    onClick={() => { setMenuOpen(false); onEditStage(stage); }}
                                    className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors"
                                >
                                    <Pencil className="w-3.5 h-3.5" /> Edit Stage
                                </button>
                                <button
                                    onClick={() => { setMenuOpen(false); onDeleteStage(stage); }}
                                    className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 cursor-pointer transition-colors"
                                >
                                    <Trash2 className="w-3.5 h-3.5" /> Delete Stage
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Cards area */}
            <div className="flex-1 px-3 pb-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 320px)' }}>
                {candidates.length === 0 ? (
                    <div
                        className="h-20 rounded-[10px] border-2 border-dashed flex items-center justify-center text-xs"
                        style={{ borderColor: isDragOver ? color.border : 'var(--border-color)', color: color.dot, opacity: isDragOver ? 0.8 : 0.4 }}
                    >
                        {isDragOver ? 'Drop here' : 'No candidates'}
                    </div>
                ) : (
                    candidates.map(c => (
                        <CandidateCard key={c.submissionId} candidate={c} onDragStart={onDragStart} onCardClick={onCardClick} />
                    ))
                )}
            </div>
        </div>
    );
}

// ─── Modal Component ───────────────────────────────────────────────────────────
function Modal({ title, onClose, children }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
            <div className="relative bg-white rounded-[20px] shadow-2xl w-full max-w-md mx-4 p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-gray-900">{title}</h2>
                    <button onClick={onClose} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer">
                        <X className="w-4 h-4 text-gray-500" />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function Candidates() {
    const dispatch = useDispatch();

    // Redux state
    const { workspaceData } = useSelector((state) => state?.workspace || {});
    const { candidate, loading: candidateLoading } = useSelector((state) => state?.candidate || {});
    const { stages, stageLoading, localStageMap } = useSelector((state) => state?.kanban || {});

    // Local UI state
    const [selectedWorkspace, setSelectedWorkspace] = useState(null);
    const [showWorkspaceModal, setShowWorkspaceModal] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [dragCandidate, setDragCandidate] = useState(null);
    const [dragOverStage, setDragOverStage] = useState(null);
    const [selectedCandidate, setSelectedCandidate] = useState(null);

    // Stage modal states
    const [showAddStage, setShowAddStage] = useState(false);
    const [newStageName, setNewStageName] = useState('');
    const [editStage, setEditStage] = useState(null);
    const [editStageName, setEditStageName] = useState('');
    const [deleteStageTarget, setDeleteStageTarget] = useState(null);

    // Load workspaces on mount
    useEffect(() => { dispatch(workspaceList()); }, [dispatch]);

    // Auto-select workspace
    useEffect(() => {
        if (workspaceData?.data && !selectedWorkspace) {
            const workspaces = workspaceData.data;
            const primaryId = localStorage.getItem('primaryWorkspaceId');
            if (workspaces.length === 1) {
                handleSelectWorkspace(workspaces[0].id);
            } else if (primaryId && workspaces.find(w => w.id == primaryId)) {
                handleSelectWorkspace(primaryId);
            } else {
                setShowWorkspaceModal(true);
            }
        }
    }, [workspaceData]);

    const handleSelectWorkspace = (workspaceId) => {
        setSelectedWorkspace(workspaceId);
        setShowWorkspaceModal(false);
        dispatch(clearStages());
        dispatch(getCandidateByWorkspace({ id: workspaceId }));
        dispatch(getWorkspaceStages(workspaceId));
    };

    // ─── Build flat candidate list from Redux ────────────────────────────────────
    const rawForms = candidate?.data?.formDto || [];
    const allCandidates = [];
    rawForms.forEach(form => {
        (form.submissions || []).forEach(sub => {
            if (sub.candidate) {
                // localStageMap overrides the server's stageMap value for optimistic updates
                const stageId = (sub.submissionId in localStageMap)
                    ? localStageMap[sub.submissionId]
                    : (sub.id in localStageMap)
                        ? localStageMap[sub.id]
                        : (sub.stageMap?.workspaceStageId ?? null);
                allCandidates.push({
                    id: sub.candidate.id,
                    submissionId: sub.id,
                    fullName: sub.candidate.fullName,
                    email: sub.candidate.email,
                    createdAt: sub.candidate.createdAt,
                    submittedAt: sub.submittedAt,
                    formTitle: form.title,
                    formId: form.id,
                    currentStageId: stageId,
                    answers: sub.formSubmissionAnswerDto || [],
                    fields: form.fields || [],
                });
            }
        });
    });

    const filteredCandidates = allCandidates.filter(c => {
        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return (c.fullName || '').toLowerCase().includes(q)
            || (c.email || '').toLowerCase().includes(q)
            || (c.formTitle || '').toLowerCase().includes(q);
    });

    // Group by stage
    const applied = filteredCandidates.filter(c => !c.currentStageId);
    const stageGroups = {};
    stages.forEach(s => { stageGroups[s.id] = filteredCandidates.filter(c => c.currentStageId === s.id); });

    // ─── Drag & Drop ─────────────────────────────────────────────────────────────
    const handleDragStart = (e, candidate) => {
        setDragCandidate(candidate);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragOver = (e, stageId) => {
        e.preventDefault();
        setDragOverStage(stageId);
    };

    const handleDragLeave = () => setDragOverStage(null);

    const handleDrop = (e, targetStageId) => {
        e.preventDefault();
        setDragOverStage(null);
        if (!dragCandidate) return;
        const prevStageId = dragCandidate.currentStageId;
        // null means "Applied", so null == null is same column — don't fire
        if (prevStageId === targetStageId) { setDragCandidate(null); return; }
        if (!prevStageId && !targetStageId) { setDragCandidate(null); return; }

        const submissionId = dragCandidate.submissionId;

        // Optimistic update
        dispatch(setLocalStage({ submissionId, stageId: targetStageId }));

        // API call
        dispatch(updateCandidateStage({ submissionId, stageId: targetStageId }))
            .unwrap()
            .then(() => toast.success('Stage updated!'))
            .catch((err) => {
                toast.error(err?.message || 'Failed to update stage');
                // Rollback
                dispatch(rollbackLocalStage({ submissionId, prevStageId }));
            });

        setDragCandidate(null);
    };

    // ─── Stage CRUD via Redux ─────────────────────────────────────────────────────
    const handleAddStage = () => {
        if (!newStageName.trim()) return;
        dispatch(createWorkspaceStage({ name: newStageName.trim(), workspaceId: Number(selectedWorkspace), status: 1 }))
            .unwrap()
            .then(() => { setNewStageName(''); setShowAddStage(false); toast.success('Stage created!'); })
            .catch(err => toast.error(err?.message || 'Failed to create stage'));
    };

    const handleEditStage = () => {
        if (!editStageName.trim() || !editStage) return;
        dispatch(updateWorkspaceStage({
            id: editStage.id,
            payload: { name: editStageName.trim(), workspaceId: Number(selectedWorkspace), status: editStage.status ?? 1 }
        }))
            .unwrap()
            .then(() => { setEditStage(null); setEditStageName(''); toast.success('Stage updated!'); })
            .catch(err => toast.error(err?.message || 'Failed to update stage'));
    };

    const handleDeleteStage = () => {
        if (!deleteStageTarget) return;
        dispatch(deleteWorkspaceStage(deleteStageTarget.id))
            .unwrap()
            .then(() => { setDeleteStageTarget(null); toast.success('Stage deleted!'); })
            .catch(err => toast.error(err?.message || 'Failed to delete stage'));
    };

    const workspaceName = workspaceData?.data?.find(w => w.id == selectedWorkspace)?.name || '';

    return (
        <div className="flex flex-col h-[calc(100vh-90px)] p-4 md:p-6 overflow-hidden" style={{ background: 'var(--bg-main)' }}>

            {/* ── Header ── */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 flex-shrink-0">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                        Candidates
                        {workspaceName && (
                            <span className="text-sm font-normal px-2.5 py-1 rounded-full bg-[#8624F0]/10 text-[#8624F0]">
                                {workspaceName}
                            </span>
                        )}
                    </h1>
                    <p className="text-sm mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                        Drag & drop candidates between stages to track progress
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                        <input
                            type="text"
                            placeholder="Search candidates..."
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                            disabled={!selectedWorkspace}
                            className="pl-9 pr-4 py-2 border rounded-[10px] text-sm focus:outline-none focus:ring-2 focus:ring-[#8624F0]/30 disabled:opacity-50 w-52"
                            style={{ borderColor: 'var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-primary)' }}
                        />
                    </div>
                    <button
                        onClick={() => setShowAddStage(true)}
                        disabled={!selectedWorkspace}
                        className="flex items-center gap-1.5 px-4 py-2 bg-[#8624F0] text-white rounded-[10px] text-sm font-semibold hover:bg-[#6c1dc0] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Plus className="w-4 h-4" /> Add Stage
                    </button>
                </div>
            </div>

            {/* ── Board ── */}
            {!selectedWorkspace ? (
                <div className="flex-1 flex flex-col items-center justify-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-[#8624F0]/10 flex items-center justify-center">
                        <User className="w-8 h-8 text-[#8624F0]" />
                    </div>
                    <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>Select a Workspace</h3>
                    <p className="text-sm text-center max-w-xs" style={{ color: 'var(--text-secondary)' }}>
                        Choose a workspace to view and manage your candidates on the Kanban board.
                    </p>
                    <button
                        onClick={() => setShowWorkspaceModal(true)}
                        className="px-6 py-2 bg-[#8624F0] text-white rounded-[10px] font-medium hover:bg-[#6c1dc0] transition-colors cursor-pointer"
                    >
                        Choose Workspace
                    </button>
                </div>
            ) : candidateLoading ? (
                <div className="flex-1 flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-[#8624F0]" />
                </div>
            ) : (
                <div className="flex-1 overflow-x-auto pb-2">
                    <div className="flex gap-4 h-full" style={{ minWidth: 'max-content' }}>

                        {/* Applied column */}
                        <StageColumn
                            stage={{ id: null, name: 'Applied' }}
                            candidates={applied}
                            color={APPLIED_COLOR}
                            isApplied={true}
                            onDrop={(e) => handleDrop(e, null)}
                            onDragOver={(e) => handleDragOver(e, 'applied')}
                            onDragLeave={handleDragLeave}
                            onDragStart={handleDragStart}
                            onEditStage={() => {}}
                            onDeleteStage={() => {}}
                            onCardClick={setSelectedCandidate}
                            isDragOver={dragOverStage === 'applied'}
                        />

                        {/* Custom stages */}
                        {stages.map((stage, idx) => (
                            <StageColumn
                                key={stage.id}
                                stage={stage}
                                candidates={stageGroups[stage.id] || []}
                                color={STAGE_COLORS[idx % STAGE_COLORS.length]}
                                isApplied={false}
                                onDrop={(e) => handleDrop(e, stage.id)}
                                onDragOver={(e) => handleDragOver(e, stage.id)}
                                onDragLeave={handleDragLeave}
                                onDragStart={handleDragStart}
                                onEditStage={(s) => { setEditStage(s); setEditStageName(s.name); }}
                                onDeleteStage={setDeleteStageTarget}
                                onCardClick={setSelectedCandidate}
                                isDragOver={dragOverStage === stage.id}
                            />
                        ))}

                        {/* Add Stage button column */}
                        <div
                            onClick={() => setShowAddStage(true)}
                            className="flex flex-col items-center justify-center min-w-[200px] rounded-[16px] border-2 border-dashed cursor-pointer hover:border-[#8624F0] hover:bg-[#8624F0]/5 transition-all duration-200 group"
                            style={{ borderColor: 'var(--border-color)' }}
                        >
                            <div className="w-10 h-10 rounded-full bg-[#8624F0]/10 flex items-center justify-center mb-2 group-hover:bg-[#8624F0]/20 transition-colors">
                                <Plus className="w-5 h-5 text-[#8624F0]" />
                            </div>
                            <p className="text-sm font-semibold text-[#8624F0]">Add Stage</p>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Workspace Modal ── */}
            <WorkspaceModal
                isOpen={showWorkspaceModal}
                onClose={() => { if (selectedWorkspace) setShowWorkspaceModal(false); }}
                workspaces={workspaceData?.data || []}
                onSelect={handleSelectWorkspace}
            />

            {/* ── Add Stage Modal ── */}
            {showAddStage && (
                <Modal title="Create New Stage" onClose={() => setShowAddStage(false)}>
                    <p className="text-sm text-gray-500 mb-4">Give your stage a clear name like "Phone Screen", "Interview", or "Offer".</p>
                    <input
                        autoFocus
                        type="text"
                        value={newStageName}
                        onChange={e => setNewStageName(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleAddStage()}
                        placeholder="e.g. Phone Screen"
                        className="w-full border rounded-[10px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#8624F0]/30 mb-4"
                        style={{ borderColor: '#E5E7EB' }}
                    />
                    <div className="flex justify-end gap-2">
                        <button onClick={() => setShowAddStage(false)} className="px-4 py-2 text-sm rounded-[8px] border border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer">Cancel</button>
                        <button
                            onClick={handleAddStage}
                            disabled={stageLoading || !newStageName.trim()}
                            className="px-5 py-2 bg-[#8624F0] text-white text-sm font-semibold rounded-[8px] hover:bg-[#6c1dc0] transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-2"
                        >
                            {stageLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />} Create Stage
                        </button>
                    </div>
                </Modal>
            )}

            {/* ── Edit Stage Modal ── */}
            {editStage && (
                <Modal title="Edit Stage" onClose={() => setEditStage(null)}>
                    <input
                        autoFocus
                        type="text"
                        value={editStageName}
                        onChange={e => setEditStageName(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleEditStage()}
                        placeholder="Stage name..."
                        className="w-full border rounded-[10px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#8624F0]/30 mb-4"
                        style={{ borderColor: '#E5E7EB' }}
                    />
                    <div className="flex justify-end gap-2">
                        <button onClick={() => setEditStage(null)} className="px-4 py-2 text-sm rounded-[8px] border border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer">Cancel</button>
                        <button
                            onClick={handleEditStage}
                            disabled={stageLoading || !editStageName.trim()}
                            className="px-5 py-2 bg-[#8624F0] text-white text-sm font-semibold rounded-[8px] hover:bg-[#6c1dc0] transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-2"
                        >
                            {stageLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />} Save Changes
                        </button>
                    </div>
                </Modal>
            )}

            {/* ── Delete Stage Confirm Modal ── */}
            {deleteStageTarget && (
                <Modal title="Delete Stage?" onClose={() => setDeleteStageTarget(null)}>
                    <div className="text-center mb-6">
                        <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                            <Trash2 className="w-7 h-7 text-red-500" />
                        </div>
                        <p className="text-sm text-gray-500">
                            Are you sure you want to delete <strong className="text-gray-800">"{deleteStageTarget.name}"</strong>?
                            Candidates in this stage will be moved back to <strong>Applied</strong>.
                        </p>
                    </div>
                    <div className="flex justify-center gap-3">
                        <button onClick={() => setDeleteStageTarget(null)} className="px-5 py-2 text-sm rounded-[8px] border border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer">Cancel</button>
                        <button
                            onClick={handleDeleteStage}
                            disabled={stageLoading}
                            className="px-5 py-2 bg-red-500 text-white text-sm font-semibold rounded-[8px] hover:bg-red-600 transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-2"
                        >
                            {stageLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />} Delete Stage
                        </button>
                    </div>
                </Modal>
            )}

            {/* ── Candidate Detail Side Drawer ── */}
            {selectedCandidate && (
                <div className="fixed inset-0 z-50 flex">
                    <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={() => setSelectedCandidate(null)} />
                    <div className="w-full max-w-md bg-white h-full shadow-2xl overflow-y-auto flex flex-col animate-slide-in">
                        {/* Drawer header */}
                        <div className="flex items-center justify-between p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
                            <h2 className="text-lg font-bold text-gray-900">Candidate Details</h2>
                            <button onClick={() => setSelectedCandidate(null)} className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-gray-100 transition-colors cursor-pointer">
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        {/* Profile section */}
                        <div className="p-6 border-b border-gray-100">
                            <div className="flex items-center gap-4 mb-5">
                                <div
                                    className="w-16 h-16 rounded-full flex items-center justify-center text-white text-xl font-bold flex-shrink-0"
                                    style={{ background: getAvatarColor(selectedCandidate.fullName) }}
                                >
                                    {getInitials(selectedCandidate.fullName)}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900">{selectedCandidate.fullName}</h3>
                                    <p className="text-gray-500 text-sm mt-0.5">{selectedCandidate.email}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-gray-50 rounded-[10px] p-3">
                                    <p className="text-xs text-gray-400 mb-1">Form</p>
                                    <p className="text-sm font-semibold text-gray-700 truncate">{selectedCandidate.formTitle}</p>
                                </div>
                                <div className="bg-gray-50 rounded-[10px] p-3">
                                    <p className="text-xs text-gray-400 mb-1">Applied On</p>
                                    <p className="text-sm font-semibold text-gray-700">{formatDate(selectedCandidate.submittedAt || selectedCandidate.createdAt)}</p>
                                </div>
                            </div>
                        </div>

                        {/* Form responses */}
                        <div className="p-6 flex-1">
                            <h4 className="font-bold text-gray-800 mb-4 text-sm uppercase tracking-wide">Form Responses</h4>
                            {selectedCandidate.answers?.length > 0 ? (
                                <div className="space-y-3">
                                    {selectedCandidate.answers.map((ans, i) => {
                                        const field = selectedCandidate.fields?.find(f => f.id === ans.fieldId);
                                        return (
                                            <div key={i} className="border border-gray-100 rounded-[10px] p-3 bg-gray-50">
                                                <p className="text-xs text-gray-400 mb-1">{field?.label || `Field ${i + 1}`}</p>
                                                <p className="text-sm font-medium text-gray-800 break-words">{ans.answer || '—'}</p>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="text-center py-10 text-gray-400 text-sm">No responses recorded</div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            <style jsx global>{`
                @keyframes slide-in {
                    from { transform: translateX(100%); opacity: 0; }
                    to   { transform: translateX(0);    opacity: 1; }
                }
                .animate-slide-in { animation: slide-in 0.25s ease; }
            `}</style>
        </div>
    );
}
