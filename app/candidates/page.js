'use client';

import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Search, Plus, MoreVertical, Pencil, Trash2, X, Loader2, User, GripVertical, Eye, AlertTriangle, Check
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
import { toast } from 'react-toastify';
import CandidateChat from './CandidateChat';

import { GrOverview } from 'react-icons/gr';
import { AiOutlineMessage, AiOutlineMail, AiOutlineCalendar } from 'react-icons/ai';
import { BiCommentCheck, BiMap } from 'react-icons/bi';
import { BsTelephone } from 'react-icons/bs';
import { CgFileDocument } from 'react-icons/cg';
import { FaVideo } from 'react-icons/fa';
import { RiArrowDropDownLine } from 'react-icons/ri';
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

// ─── Custom Checkbox ───────────────────────────────────────────────────────────
function CustomCheckbox({ checked, indeterminate, onChange, className = '' }) {
    return (
        <div 
            onClick={(e) => { e.stopPropagation(); onChange(!checked); }}
            className={`flex items-center justify-center w-5 h-5 rounded-[6px] border cursor-pointer transition-all duration-200 ${
                checked || indeterminate 
                    ? 'bg-[#8624F0] border-[#8624F0] text-white shadow-sm' 
                    : 'bg-white border-gray-300 hover:border-[#8624F0]/50'
            } ${className}`}
        >
            {checked && !indeterminate && <Check className="w-3.5 h-3.5" strokeWidth={3.5} />}
            {indeterminate && <div className="w-2.5 h-[3px] bg-white rounded-full" />}
        </div>
    );
}

// ─── Custom Dropdown ───────────────────────────────────────────────────────────
function CustomDropdown({ value, onChange, options, placeholder = "Select option..." }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        function handleOut(e) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsOpen(false);
        }
        document.addEventListener('mousedown', handleOut);
        return () => document.removeEventListener('mousedown', handleOut);
    }, []);

    const selectedOption = options.find(o => String(o.value) === String(value));

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <div 
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full px-4 py-3.5 border rounded-[12px] text-sm focus:outline-none cursor-pointer transition-colors flex items-center justify-between shadow-sm ${isOpen ? 'border-[#8624F0] ring-2 ring-[#8624F0]/30 bg-white' : 'border-gray-200 bg-gray-50/50 hover:border-gray-300'}`}
            >
                <span className={selectedOption ? 'text-gray-900 font-medium' : 'text-gray-400'}>
                    {selectedOption ? selectedOption.label : placeholder}
                </span>
                <div className={`text-gray-400 bg-white border border-gray-100 shadow-sm rounded-full p-0.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
            </div>
            
            {isOpen && (
                <div className="w-full mt-2 bg-[#FBF9FF] border border-[#E9D5FF] rounded-[12px] shadow-sm py-1.5 overflow-hidden transition-all">
                    {options.length === 0 ? (
                        <div className="px-4 py-3 text-sm text-gray-500 text-center">No options available</div>
                    ) : (
                        <div className="max-h-60 overflow-y-auto">
                            {options.map((opt) => (
                                <div 
                                    key={opt.value}
                                    onClick={() => { onChange(opt.value); setIsOpen(false); }}
                                    className={`px-4 py-2.5 text-sm cursor-pointer transition-colors flex items-center justify-between ${String(value) === String(opt.value) ? 'bg-[#8624F0]/10 text-[#8624F0] font-medium' : 'text-gray-700 hover:bg-[#8624F0]/5 hover:text-[#8624F0]'}`}
                                >
                                    {opt.label}
                                    {String(value) === String(opt.value) && <Check className="w-4 h-4 text-[#8624F0]" strokeWidth={3} />}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

// ─── Candidate Card ────────────────────────────────────────────────────────────
function CandidateCard({ candidate, onDragStart, onCardClick, isSelected, onToggleSelect }) {
    const avatarColor = getAvatarColor(candidate.fullName);
    return (
        <div
            draggable
            onDragStart={(e) => onDragStart(e, candidate)}
            onClick={(e) => {
                // If they didn't click the checkbox specifically, open candidate details
                onCardClick(candidate);
            }}
            className={`bg-white rounded-[12px] p-4 mb-3 shadow-sm border ${isSelected ? 'border-[#8624F0] ring-1 ring-[#8624F0]/30' : 'border-gray-100'} cursor-grab active:cursor-grabbing hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group relative`}
            style={{ borderLeft: `3px solid ${avatarColor}` }}
        >
            <div className="absolute right-3 top-3">
                <CustomCheckbox 
                    checked={isSelected || false}
                    onChange={() => onToggleSelect(candidate.submissionId)}
                />
            </div>
            <div className="flex items-start gap-3 pr-6">
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
function StageColumn({ stage, candidates, color, isApplied, onDrop, onDragOver, onDragLeave, onDragStart, onEditStage, onDeleteStage, onCardClick, isDragOver, selectedCandidates = [], onToggleSelect, onSelectAll, onInitiateBulkMove }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        function handleOut(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
        }
        document.addEventListener('mousedown', handleOut);
        return () => document.removeEventListener('mousedown', handleOut);
    }, []);

    const stageCandidateIds = candidates.map(c => c.submissionId);
    const selectedInStage = stageCandidateIds.filter(id => selectedCandidates.includes(id));
    const isAllSelected = stageCandidateIds.length > 0 && selectedInStage.length === stageCandidateIds.length;
    const isIndeterminate = selectedInStage.length > 0 && selectedInStage.length < stageCandidateIds.length;

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
            <div className="flex items-center justify-between px-4 pt-4 pb-2">
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

            {/* Bulk Action Bar */}
            {candidates.length > 0 && (
                <div className="px-4 pb-3 flex items-center justify-between">
                    <div 
                        className="flex items-center gap-2 cursor-pointer group"
                        onClick={() => onSelectAll(stage.id, stageCandidateIds, !isAllSelected)}
                    >
                        <CustomCheckbox
                            checked={isAllSelected}
                            indeterminate={isIndeterminate}
                            onChange={(checked) => onSelectAll(stage.id, stageCandidateIds, checked)}
                        />
                        <span className="text-xs font-medium text-gray-500 group-hover:text-gray-700 transition-colors">
                            Select All
                        </span>
                    </div>
                    {selectedInStage.length > 0 && (
                        <button
                            onClick={() => onInitiateBulkMove(stage.id)}
                            className="text-xs font-semibold text-white bg-[#8624F0] hover:bg-[#6c1dc0] px-3 py-1.5 rounded-md transition-colors flex items-center gap-1 shadow-sm cursor-pointer"
                        >
                            Move ({selectedInStage.length})
                        </button>
                    )}
                </div>
            )}

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
                        <CandidateCard 
                            key={c.submissionId} 
                            candidate={c} 
                            onDragStart={onDragStart} 
                            onCardClick={onCardClick}
                            isSelected={selectedCandidates.includes(c.submissionId)}
                            onToggleSelect={onToggleSelect}
                        />
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
    const { stages, stageLoading, localStageMap, localStageUpdateTimes } = useSelector((state) => state?.kanban || {});

    // Local UI state
    const [selectedWorkspace, setSelectedWorkspace] = useState(null);
    const [showWorkspaceModal, setShowWorkspaceModal] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFormFilter, setSelectedFormFilter] = useState('');
    const [dragCandidate, setDragCandidate] = useState(null);
    const [dragOverStage, setDragOverStage] = useState(null);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [popupView, setPopupView] = useState('details');
    const [isOpen, setIsOpen] = useState(false);
    // Stage modal states
    const [showAddStage, setShowAddStage] = useState(false);
    const [newStageName, setNewStageName] = useState('');
    const [editStage, setEditStage] = useState(null);
    const [editStageName, setEditStageName] = useState('');
    const [deleteStageTarget, setDeleteStageTarget] = useState(null);
    
    // Bulk Move states
    const [selectedCandidates, setSelectedCandidates] = useState([]);
    const [bulkMoveSourceStage, setBulkMoveSourceStage] = useState(null);
    const [showBulkMoveModal, setShowBulkMoveModal] = useState(false);
    const [bulkMoveTargetStage, setBulkMoveTargetStage] = useState('');

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
                        : (sub.currentStageId ?? sub.stageMap?.workspaceStageId ?? null);
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
        if (selectedFormFilter && String(c.formId) !== String(selectedFormFilter)) {
            return false;
        }

        if (!searchQuery) return true;
        const q = searchQuery.toLowerCase();
        return (c.fullName || '').toLowerCase().includes(q)
            || (c.email || '').toLowerCase().includes(q)
            || (c.formTitle || '').toLowerCase().includes(q);
    });

    // Group by stage
    const apiAppliedStage = stages.find(s => s.name?.toLowerCase() === 'applied');
    const normalizedCandidates = filteredCandidates.map(c => {
        if (!c.currentStageId && apiAppliedStage) {
            return { ...c, currentStageId: apiAppliedStage.id };
        }
        return c;
    });

    const sortCandidates = (cands) => {
        return cands.sort((a, b) => {
            const timeA = localStageUpdateTimes?.[a.submissionId] || 0;
            const timeB = localStageUpdateTimes?.[b.submissionId] || 0;
            if (timeA !== timeB) return timeB - timeA;
            // Fallback to ID descending
            return b.id - a.id;
        });
    };

    const applied = sortCandidates(normalizedCandidates.filter(c => !c.currentStageId));
    const stageGroups = {};
    stages.forEach(s => { 
        stageGroups[s.id] = sortCandidates(normalizedCandidates.filter(c => c.currentStageId === s.id)); 
    });

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

    // ── Bulk Move Handlers ──
    const handleToggleSelect = (submissionId) => {
        setSelectedCandidates(prev => 
            prev.includes(submissionId) 
                ? prev.filter(id => id !== submissionId)
                : [...prev, submissionId]
        );
    };

    const handleSelectAllInStage = (stageId, candidateIds, isChecked) => {
        if (isChecked) {
            setSelectedCandidates(prev => Array.from(new Set([...prev, ...candidateIds])));
        } else {
            setSelectedCandidates(prev => prev.filter(id => !candidateIds.includes(id)));
        }
    };

    const handleInitiateBulkMove = (stageId) => {
        setBulkMoveSourceStage(stageId);
        setBulkMoveTargetStage('');
        setShowBulkMoveModal(true);
    };

    const handleBulkMoveSubmit = () => {
        if (!bulkMoveTargetStage) {
            toast.error("Please select a target stage.");
            return;
        }

        const sourceCandidateIds = bulkMoveSourceStage === 'applied' 
            ? applied.map(c => c.submissionId) 
            : (stageGroups[bulkMoveSourceStage] || []).map(c => c.submissionId);
        
        const candidatesToMove = selectedCandidates.filter(id => sourceCandidateIds.includes(id));
        
        if (candidatesToMove.length === 0) {
            toast.error("No selected candidates found in this stage.");
            return;
        }

        const targetStageId = bulkMoveTargetStage === 'applied' ? null : Number(bulkMoveTargetStage);
        
        // Optimistic update
        candidatesToMove.forEach(submissionId => {
            dispatch(setLocalStage({ submissionId, stageId: targetStageId }));
        });

        const promises = candidatesToMove.map(submissionId => 
            dispatch(updateCandidateStage({ submissionId, stageId: targetStageId })).unwrap()
        );

        toast.promise(Promise.all(promises), {
            pending: `Moving ${candidatesToMove.length} candidates...`,
            success: 'Successfully moved candidates!',
            error: 'Failed to move some candidates.'
        });

        setSelectedCandidates(prev => prev.filter(id => !candidatesToMove.includes(id)));
        setShowBulkMoveModal(false);
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
                    <select
                        value={selectedFormFilter}
                        onChange={(e) => setSelectedFormFilter(e.target.value)}
                        disabled={!selectedWorkspace}
                        className="px-3 py-2 border rounded-[10px] text-sm focus:outline-none focus:ring-2 focus:ring-[#8624F0]/30 disabled:opacity-50"
                        style={{ borderColor: 'var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-primary)' }}
                    >
                        <option value="">All Forms</option>
                        {rawForms.map(form => (
                            <option key={form.id} value={form.id}>{form.title || 'Untitled Form'}</option>
                        ))}
                    </select>
                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
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

                        {/* Legacy Applied column (only show if API didn't provide one) */}
                        {!apiAppliedStage && (
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
                                selectedCandidates={selectedCandidates}
                                onToggleSelect={handleToggleSelect}
                                onSelectAll={handleSelectAllInStage}
                                onInitiateBulkMove={handleInitiateBulkMove}
                            />
                        )}

                        {/* Custom stages (including backend's Applied stage) */}
                        {stages.map((stage, idx) => {
                            const isApiApplied = stage.name?.toLowerCase() === 'applied';
                            return (
                                <StageColumn
                                    key={stage.id}
                                    stage={stage}
                                    candidates={stageGroups[stage.id] || []}
                                    color={isApiApplied ? APPLIED_COLOR : STAGE_COLORS[idx % STAGE_COLORS.length]}
                                    isApplied={isApiApplied}
                                    onDrop={(e) => handleDrop(e, stage.id)}
                                    onDragOver={(e) => handleDragOver(e, stage.id)}
                                    onDragLeave={handleDragLeave}
                                    onDragStart={handleDragStart}
                                    onEditStage={(s) => { setEditStage(s); setEditStageName(s.name); }}
                                    onDeleteStage={setDeleteStageTarget}
                                    onCardClick={setSelectedCandidate}
                                    isDragOver={dragOverStage === stage.id}
                                    selectedCandidates={selectedCandidates}
                                    onToggleSelect={handleToggleSelect}
                                    onSelectAll={handleSelectAllInStage}
                                    onInitiateBulkMove={handleInitiateBulkMove}
                                />
                            );
                        })}

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
                    <p className="text-sm text-gray-500 mb-4">Give your stage a clear name like "Applied", "Interview", "Hired", or "Rejected".</p>
                    <input
                        autoFocus
                        type="text"
                        value={newStageName}
                        onChange={e => setNewStageName(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleAddStage()}
                        placeholder="e.g. Interview"
                        className="w-full border rounded-[10px] px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#8624F0]/30 mb-4"
                        style={{ borderColor: '#E5E7EB' }}
                    />
                    <div className="flex justify-end gap-2">
                        <button onClick={() => setShowAddStage(false)} className="px-4 py-2 text-sm rounded-[8px] border border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer">Cancel</button>
                        <button
                            onClick={handleAddStage}
                            disabled={stageLoading || !newStageName.trim()}
                            className="px-4 py-2 bg-[#8624F0] text-white text-sm font-semibold rounded-[8px] hover:bg-[#6c1dc0] transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-2"
                        >
                            {stageLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />} Create Stage
                        </button>
                    </div>
                </Modal>
            )}

            {/* ── Bulk Move Candidates Modal ── */}
            {showBulkMoveModal && (
                <Modal title="Move Selected Candidates" onClose={() => setShowBulkMoveModal(false)}>
                    <p className="text-sm text-gray-600 mb-4">
                        You are about to move <strong>
                            {selectedCandidates.filter(id => {
                                const sourceCandidateIds = bulkMoveSourceStage === 'applied' 
                                    ? applied.map(c => c.submissionId) 
                                    : (stageGroups[bulkMoveSourceStage] || []).map(c => c.submissionId);
                                return sourceCandidateIds.includes(id);
                            }).length}
                        </strong> candidate(s). Where would you like to move them?
                    </p>
                    <div className="mb-6">
                        <label className="block text-sm font-semibold text-gray-800 mb-2">Target Stage</label>
                        <CustomDropdown
                            value={bulkMoveTargetStage}
                            onChange={(val) => setBulkMoveTargetStage(val)}
                            options={(() => {
                                const moveOptions = [];
                                if (!apiAppliedStage && bulkMoveSourceStage !== 'applied') {
                                    moveOptions.push({ value: 'applied', label: 'Applied' });
                                }
                                stages.forEach(stage => {
                                    if (stage.id !== bulkMoveSourceStage) {
                                        moveOptions.push({ value: String(stage.id), label: stage.name });
                                    }
                                });
                                return moveOptions;
                            })()}
                            placeholder="Select destination stage..."
                        />
                    </div>
                    <div className="flex justify-end gap-3">
                        <button onClick={() => setShowBulkMoveModal(false)} className="px-5 py-2 text-sm rounded-[8px] border border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer">Cancel</button>
                        <button
                            onClick={handleBulkMoveSubmit}
                            disabled={stageLoading || !bulkMoveTargetStage}
                            className="px-5 py-2 bg-[#8624F0] text-white text-sm font-semibold rounded-[8px] hover:bg-[#6c1dc0] transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-2"
                        >
                            {stageLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />} Move Candidates
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
            {deleteStageTarget && (() => {
                const targetCandidatesCount = allCandidates.filter(c => c.currentStageId === deleteStageTarget.id).length;
                const hasCandidates = targetCandidatesCount > 0;
                
                return (
                    <Modal title={hasCandidates ? "Cannot Delete Stage" : "Delete Stage?"} onClose={() => setDeleteStageTarget(null)}>
                        <div className="text-center mb-6">
                            <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 ${hasCandidates ? 'bg-orange-100' : 'bg-red-100'}`}>
                                {hasCandidates ? (
                                    <AlertTriangle className="w-7 h-7 text-orange-500" />
                                ) : (
                                    <Trash2 className="w-7 h-7 text-red-500" />
                                )}
                            </div>
                            
                            {hasCandidates ? (
                                <p className="text-sm text-gray-500">
                                    <strong className="text-gray-800">"{deleteStageTarget.name}"</strong> stage currently contains <strong className="text-orange-600">{targetCandidatesCount}</strong> candidate(s).<br/><br/>
                                    You cannot delete a stage that has candidates. Please move all candidates to another stage first before deleting.
                                </p>
                            ) : (
                                <p className="text-sm text-gray-500">
                                    Are you sure you want to delete <strong className="text-gray-800">"{deleteStageTarget.name}"</strong>?
                                    This action cannot be undone.
                                </p>
                            )}
                        </div>
                        <div className="flex justify-center gap-3">
                            <button onClick={() => setDeleteStageTarget(null)} className="px-5 py-2 text-sm rounded-[8px] border border-gray-200 text-gray-600 hover:bg-gray-50 cursor-pointer">
                                {hasCandidates ? "Okay, got it" : "Cancel"}
                            </button>
                            
                            {!hasCandidates && (
                                <button
                                    onClick={handleDeleteStage}
                                    disabled={stageLoading}
                                    className="px-5 py-2 bg-red-500 text-white text-sm font-semibold rounded-[8px] hover:bg-red-600 transition-colors cursor-pointer disabled:opacity-50 flex items-center gap-2"
                                >
                                    {stageLoading && <Loader2 className="w-3.5 h-3.5 animate-spin" />} Delete Stage
                                </button>
                            )}
                        </div>
                    </Modal>
                );
            })()}

            {/* ── Candidate Side Drawer (matching screenshot) ── */}
            {selectedCandidate && (
                <div className="fixed inset-0 z-50 flex justify-end">
                    {/* Backdrop */}
                    <div className="absolute inset-0 bg-black/10 backdrop-blur-[1px]" onClick={() => setSelectedCandidate(null)} />

                    {/* Drawer panel */}
                    <div className="relative w-[500px] h-full bg-white shadow-2xl flex flex-col animate-slide-in overflow-hidden z-10 border-l border-gray-100">
                        {/* Header */}
                        <div className="p-6 border-b border-gray-100 relative">
                            {/* Close button */}
                            <button
                                onClick={() => setSelectedCandidate(null)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
                            >
                                <X size={20} />
                            </button>

                            <div className="flex items-start justify-between pr-8">
                                <div>
                                    <div className="flex items-center gap-3 mb-1.5">
                                        <h2 className="text-[20px] font-bold text-gray-800">
                                            {selectedCandidate.formTitle || 'Unknown Form'}
                                        </h2>
                                        <span className="px-3 py-1 bg-purple-100 text-purple-600 text-xs font-semibold rounded-full">
                                            {selectedCandidate.currentStage || 'Applied'}
                                        </span>
                                    </div>
                                    <p className="text-[13px] text-gray-400 font-medium">
                                        Applied: {formatDate(selectedCandidate.submittedAt || selectedCandidate.createdAt)}
                                    </p>
                                </div>
                                
                                <div className="flex gap-2">
                                    <button 
                                        onClick={() => setPopupView('details')}
                                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${popupView === 'details' ? 'bg-[#8624F0] text-white' : 'bg-gray-100 text-gray-500'}`}
                                    >
                                        <Eye size={18} />
                                    </button>
                                    <button 
                                        onClick={() => setPopupView('chat')}
                                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-colors ${popupView === 'chat' ? 'bg-[#8624F0] text-white' : 'bg-gray-200 text-gray-500 hover:bg-gray-300'}`}
                                    >
                                        <AiOutlineMessage size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {popupView === 'details' ? (
                                <>
                                    <h3 className="text-[15px] font-bold text-[#1F2937] mb-6">Form Responses</h3>
                                    
                                    <div className="space-y-6">
                                        {/* Standard fields if they exist */}
                                        {selectedCandidate.fullName && (
                                            <div>
                                                <label className="block text-[13px] font-bold text-gray-700 mb-2">
                                                    Full Name <span className="text-red-500">*</span>
                                                </label>
                                                <div className="w-full bg-[#FCF9FF] border border-[#F3EAFF] rounded-[8px] px-4 py-2.5 text-[14px] text-gray-800 font-medium">
                                                    {selectedCandidate.fullName}
                                                </div>
                                            </div>
                                        )}
                                        
                                        {selectedCandidate.email && (
                                            <div>
                                                <label className="block text-[13px] font-bold text-gray-700 mb-2">
                                                    Email Address <span className="text-red-500">*</span>
                                                </label>
                                                <div className="w-full bg-[#FCF9FF] border border-[#F3EAFF] rounded-[8px] px-4 py-2.5 text-[14px] text-gray-800 font-medium">
                                                    {selectedCandidate.email}
                                                </div>
                                            </div>
                                        )}

                                        {/* Dynamic Form Answers */}
                                        {selectedCandidate.answers?.map((ans, i) => {
                                            const field = selectedCandidate.fields?.find(f => f.id === ans.fieldId);
                                            // Skip standard fields if they are already mapped to candidate core properties, or just show them all
                                            return (
                                                <div key={i}>
                                                    <label className="block text-[13px] font-bold text-gray-700 mb-2">
                                                        {field?.label || `Field ${i + 1}`}
                                                    </label>
                                                    <div className="w-full bg-[#FCF9FF] border border-[#F3EAFF] rounded-[8px] px-4 py-2.5 text-[14px] text-gray-800 font-medium break-words">
                                                        {ans.textValue || ans.numberValue || ans.dateValue || ans.imageUrl || ans.videoUrl || ans.answer || '—'}
                                                    </div>
                                                </div>
                                            );
                                        })}

                                        {(!selectedCandidate.answers || selectedCandidate.answers.length === 0) && (
                                            <p className="text-sm text-gray-400">No additional responses recorded.</p>
                                        )}
                                    </div>
                                </>
                            ) : (
                                <CandidateChat 
                                  candidate={selectedCandidate} 
                                  onBack={() => setPopupView('details')} 
                                />
                            )}
                        </div>

                    </div>
                </div>
            )}
            
            <style jsx global>{`
                @keyframes slide-in {
                    from { transform: translateX(100%); }
                    to   { transform: translateX(0); }
                }
                .animate-slide-in { animation: slide-in 0.25s cubic-bezier(0.16,1,0.3,1); }
            `}</style>

      </div>
    );
}
