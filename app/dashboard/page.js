'use client';

import { Search, User, FileText, CheckCircle, Clock, ExternalLink, HardDrive } from 'lucide-react';

// Stats array will be generated dynamically now

import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { workspaceList } from '../Reducer/WorkspaceSlice';
import { getCandidateByWorkspace } from '../Reducer/CandidateSlice';
import { allFormList } from '../Reducer/FormbuilderSlice';
import { getStorageInfo } from '../Reducer/StorageSlice';
import api from '../Reducer/api';

// We will use dynamic forms now instead of static forms

export default function Dashboard() {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [dashboardStats, setDashboardStats] = useState({
    totalCandidates: 0,
    totalWorkspaces: 0,
    totalForms: 0,
    totalShortlisted: 0
  });
  const [stages, setStages] = useState([]);

  const { workspaceData } = useSelector((state) => state?.workspace || {});
  const { candidate } = useSelector((state) => state?.candidate || {});
  const { allforms } = useSelector((state) => state?.formBuilder || {});
  const { storageInfo } = useSelector((state) => state?.storage || {});

  useEffect(() => {
    dispatch(workspaceList());

    // Fetch dynamic dashboard stats
    api.get('/dashboard/stats').then(res => {
      if (res.data?.status) {
        setDashboardStats(res.data.data);
      }
    }).catch(err => console.error("Failed to fetch dashboard stats", err));

    // Fetch storage info
    dispatch(getStorageInfo());
  }, [dispatch]);

  useEffect(() => {
    if (workspaceData?.data && workspaceData.data.length > 0) {
      const primaryId = localStorage.getItem('primaryWorkspaceId');
      const targetWorkspace = (primaryId && workspaceData.data.find(w => w.id == primaryId)) ? primaryId : workspaceData.data[0].id;

      dispatch(getCandidateByWorkspace({ id: targetWorkspace }));
      dispatch(allFormList({ id: targetWorkspace, page: 0, size: 20 }));

      // Fetch stages for proper mapping
      api.get(`/workspace-stages/workspace/${targetWorkspace}`).then(res => {
        if (res.data?.data) {
          setStages(res.data.data);
        }
      }).catch(err => console.error("Failed to fetch stages", err));
    }
  }, [workspaceData, dispatch]);

  const rawForms = candidate?.data?.formDto || [];
  let candidateList = [];

  rawForms.forEach((form) => {
    const submissions = form.submissions || [];
    submissions.forEach((sub) => {
      if (sub.candidate) {
        candidateList.push({
          id: sub.candidate.id,
          submissionId: sub.id,
          fullName: sub.candidate.fullName,
          email: sub.candidate.email,
          createdAt: sub.candidate.createdAt,
          submittedAt: sub.submittedAt,
          formTitle: form.title,
          currentStage: stages?.find(s => String(s.id) === String(sub.currentStageId))?.name || (sub.currentStageId ? `Stage ${sub.currentStageId}` : "Applied")
        });
      }
    });
  });

  const getStageColor = (stage) => {
    const stageStr = (stage || '').toLowerCase();
    if (stageStr.includes('interview')) return 'bg-[#E6D6FF] text-[#8624F0] dark:bg-[#2d1a4d] dark:text-[#c084fc]';
    if (stageStr.includes('screen')) return 'bg-[#FFF4DE] text-[#FFA800] dark:bg-[#3d2e1a] dark:text-[#fbbf24]';
    if (stageStr.includes('shortlist')) return 'bg-[#ECFCE5] text-[#25852F] dark:bg-[#1a3d1a] dark:text-[#4ade80]';
    if (stageStr.includes('reject')) return 'bg-[#FFECEC] text-[#F53D6B] dark:bg-[#3d1a1a] dark:text-[#f87171]';
    return 'bg-[#ECFCE5] text-[#25852F] dark:bg-[#1a3d1a] dark:text-[#4ade80]';
  };

  const filteredCandidates = candidateList.filter(cand => {
    const searchLower = searchQuery.toLowerCase();
    return (
      (cand.fullName || '').toLowerCase().includes(searchLower) ||
      (cand.email || '').toLowerCase().includes(searchLower) ||
      (cand.formTitle || '').toLowerCase().includes(searchLower)
    );
  }).sort((a, b) => {
    const dateA = a.submittedAt ? new Date(a.submittedAt).getTime() : 0;
    const dateB = b.submittedAt ? new Date(b.submittedAt).getTime() : 0;
    return dateB - dateA; // Sort descending
  }).slice(0, 10); // Take only 10 candidates

  const formatBytes = (bytes) => {
    if (!bytes || bytes === 0) return '0 KB';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formattedUsedStorage = storageInfo?.totalStorageUsedBytes ? formatBytes(storageInfo.totalStorageUsedBytes) : '0 KB';
  const storageLimitGB = storageInfo?.totalStorageLimitGb || '0';
  const storageString = `${formattedUsedStorage} / ${storageLimitGB} GB`;

  const dynamicStats = [
    { label: 'Total Candidates', value: dashboardStats.totalCandidates, icon: User, lightColor: 'bg-[#FFECEC]', iconColor: 'text-[#F53D6B]' },
    { label: 'Total Workspace', value: dashboardStats.totalWorkspaces, icon: CheckCircle, lightColor: 'bg-[#ECFCE5]', iconColor: 'text-[#25852F]' },
    { label: 'Total Form Created', value: dashboardStats.totalForms, icon: FileText, lightColor: 'bg-[#E5F7FA]', iconColor: 'text-[#00C2E0]' },
    { label: 'Storage Used', value: storageString, icon: HardDrive, lightColor: 'bg-[#FFF4DE]', iconColor: 'text-[#FFA800]' },
  ];

  const dynamicForms = [...(allforms?.data?.content || [])]
    .sort((a, b) => {
      const dateA = new Date(a.updatedAt || a.createdAt || 0).getTime();
      const dateB = new Date(b.updatedAt || b.createdAt || 0).getTime();
      return dateB - dateA;
    })
    .slice(0, 4);

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col gap-8">

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 shrink-0">
        {dynamicStats.map((stat, index) => (
          <div
            key={index}
            className="p-6 rounded-[20px] flex items-center gap-4 transition-shadow"
            style={{ background: 'var(--bg-card)' }}
          >
            <div className={`w-14 h-14 rounded-full flex items-center justify-center ${stat.lightColor} ${stat.iconColor}`}>
              <stat.icon size={28} />
            </div>
            <div>
              <p className="text-sm mb-1" style={{ color: 'var(--text-secondary)' }}>{stat.label}</p>
              <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 flex-1 min-h-0 pb-4">

        {/* Candidates Table */}
        <div className="xl:col-span-2 rounded-[20px] p-6 flex flex-col h-full overflow-hidden" style={{ background: 'var(--bg-card)' }}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4 shrink-0">
            <div>
              <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Recent Candidates</h2>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Recent candidates who haven't progressed yet.</p>
            </div>
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
              <input
                type="text"
                placeholder="Search candidates"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full sm:w-[250px] pl-10 pr-4 py-2 rounded-full text-sm outline-none focus:ring-2 ring-purple-100"
                style={{
                  background: 'var(--bg-main)',
                  color: 'var(--text-primary)',
                }}
              />
            </div>
          </div>

          <div className="flex-1 overflow-auto pr-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar]:h-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#8624F0] [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#6c1dc0]">
            <table className="w-full min-w-[600px] border-collapse">
              <thead className="sticky top-0 z-10 bg-[#F8F9FA] dark:bg-[#1a1a2e]">
                <tr className="text-center text-xs uppercase" style={{ color: 'var(--text-secondary)' }}>
                  <th className="py-3 px-4 font-medium rounded-l-[10px]">Candidate</th>
                  <th className="py-3 px-4 font-medium">Email</th>
                  <th className="py-3 px-4 font-medium">Form Name</th>
                  <th className="py-3 px-4 font-medium">Applied On</th>
                  <th className="py-3 px-4 font-medium rounded-r-[10px]">Stage</th>
                </tr>
              </thead>
              <tbody className="before:content-[''] before:block before:h-2">
                {filteredCandidates.map((candidate, i) => (
                  <tr
                    key={i}
                    className="transition-colors hover:bg-gray-50 dark:hover:bg-[#1a1a2e]/50 group cursor-pointer"
                  >
                    <td className="py-3 px-4 border-b group-last:border-0" style={{ borderColor: 'var(--border-color)' }}>
                      <span className="font-bold mx-auto block" style={{ color: 'var(--text-primary)' }} title={candidate.fullName}>
                        {candidate.fullName}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-medium text-sm text-center border-b group-last:border-0" style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}>{candidate.email || 'N/A'}</td>
                    <td className="py-3 px-4 text-sm text-center border-b group-last:border-0" style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}>
                      <span className="truncate block max-w-[120px] mx-auto" title={candidate.formTitle}>{candidate.formTitle}</span>
                    </td>
                    <td className="py-3 px-4 text-sm text-center border-b group-last:border-0" style={{ color: 'var(--text-primary)', borderColor: 'var(--border-color)' }}>
                      {candidate.submittedAt ? new Date(candidate.submittedAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="py-3 px-4 text-center border-b group-last:border-0" style={{ borderColor: 'var(--border-color)' }}>
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold inline-block w-[100px] text-center ${getStageColor(candidate.currentStage)}`}>
                        {candidate.currentStage}
                      </span>
                    </td>
                  </tr>
                ))}
                {filteredCandidates.length === 0 && (
                  <tr>
                    <td colSpan="5" className="py-8 text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
                      No candidates found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Forms */}
        <div className="rounded-[20px] p-6 flex flex-col h-full overflow-hidden" style={{ background: 'var(--bg-card)' }}>
          <div className="mb-6 shrink-0">
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Recent Forms</h2>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Create and manage forms</p>
          </div>
          <div className="space-y-4 flex-1 overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[#8624F0] [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-[#6c1dc0]">
            {dynamicForms.map((form, i) => (
              <div
                key={i}
                className={`rounded-[16px] p-4 hover:shadow-md transition-shadow ${form.isClosed ? 'opacity-60 grayscale-[20%]' : ''}`}
                style={{ border: '1px solid var(--border-color)' }}
              >
                <div className="flex justify-between items-start mb-2 gap-2">
                  <h3 className="font-bold text-sm leading-tight" style={{ color: 'var(--text-primary)' }}>{form.title}</h3>
                  <div className="flex gap-2 shrink-0">
                    <span className="px-2 py-1 bg-[#E6F6FD] dark:bg-[#1a3340] text-[#00A3FF] text-[10px] font-bold rounded">Form</span>
                    {form.isClosed ? (
                      <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-[10px] font-bold rounded">Closed</span>
                    ) : (
                      <span className="px-2 py-1 bg-[#ECFCE5] dark:bg-[#1a3d1a] text-[#25852F] dark:text-[#4ade80] text-[10px] font-bold rounded">Active</span>
                    )}
                  </div>
                </div>
                <p className="text-xs mb-4 line-clamp-1" style={{ color: 'var(--text-secondary)' }}>{form.description || "No description provided."}</p>
                <div className="flex justify-between text-[11px] font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                  <div className="flex flex-col items-center">
                    <span className="font-normal block mb-1" style={{ color: 'var(--text-secondary)' }}>Responses</span>
                    {form.responseCount || 0}
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-normal block mb-1" style={{ color: 'var(--text-secondary)' }}>Fields</span>
                    {form.fields?.length || 0}
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="font-normal block mb-1" style={{ color: 'var(--text-secondary)' }}>Last modified</span>
                    {form.updatedAt ? new Date(form.updatedAt).toLocaleDateString() : (form.createdAt ? new Date(form.createdAt).toLocaleDateString() : 'N/A')}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => {
                    const url = `${window.location.origin}/${form.publicSlug}`;
                    navigator.clipboard.writeText(url);
                    alert("Link copied!");
                  }} className="w-full cursor-pointer bg-[#210043] dark:bg-[#6d28d9] text-white rounded-lg py-2.5 text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#340b61] dark:hover:bg-[#7c3aed] transition-colors">
                    Copy Link
                  </button>
                  <button onClick={() => window.open(`/${form.publicSlug}`, '_blank')} className="p-2.5 border border-[#8624F0] dark:border-[#7c3aed] text-[#8624F0] dark:text-[#a78bfa] rounded-[8px] hover:bg-[#8624F0]/5 transition-colors cursor-pointer">
                    <ExternalLink size={18} />
                  </button>
                </div>
              </div>
            ))}
            {dynamicForms.length === 0 && (
              <div className="text-center py-8 text-sm" style={{ color: 'var(--text-secondary)' }}>
                No recent forms available.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}