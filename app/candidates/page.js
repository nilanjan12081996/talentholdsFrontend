

// 'use client';

// import { Search, Upload, X, Loader2 } from 'lucide-react'; // Added Loader2 for loading state
// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { useDispatch, useSelector } from 'react-redux';
// import { GrOverview } from 'react-icons/gr';
// import { AiOutlineMessage, AiOutlineMail, AiOutlineCalendar } from 'react-icons/ai';
// import { BiCommentCheck, BiMap } from 'react-icons/bi';
// import { BsTelephone } from 'react-icons/bs';
// import { CgFileDocument } from 'react-icons/cg';
// import { FaVideo } from 'react-icons/fa';
// import { RiArrowDropDownLine } from 'react-icons/ri';

// // Import your WorkspaceModal and Redux actions
// import WorkspaceModal from '../forms/WorkspaceModal'; 
// import { getCandidateByWorkspace } from '../Reducer/CandidateSlice';
// import CandidateChat from './CandidateChat';
// // Adjust the path to wherever your CandidateSlice is located


// export default function Candidates() {
//   const router = useRouter();
//   const dispatch = useDispatch();
  
//   // State for Workspace Selection & Popup
//   const [selectedWorkspace, setSelectedWorkspace] = useState(null);
//   const [showWorkspaceModal, setShowWorkspaceModal] = useState(true); 
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedCandidate, setSelectedCandidate] = useState(null); // Track which candidate is clicked
//   const [popupView, setPopupView] = useState('details');

//   // Fetch Workspaces and Candidates from Redux
//   const { workspaceData } = useSelector((state) => state?.auth || {});
  
//   // Grab candidate data and loading state from your CandidateSlice
//   const { candidate, loading } = useSelector((state) => state?.candidate || {});

//   // Safely extract the candidate array from the API payload 
//   // (Adjust `.data` or `.result.data` based on your exact API response structure)
//   const candidateList = candidate?.data?.formDto || candidate?.result?.data || [];
//   console.log("candidateList",candidateList);
  
//   const handleSelectWorkspace = (workspaceId) => {
//     setSelectedWorkspace(workspaceId);
//     setShowWorkspaceModal(false);
    
//     console.log("Fetching candidates for Workspace ID:", workspaceId);
    
//     // Dispatch the API call. Assuming the API expects an object like { workspaceId: id }
//     // dispatch(getCandidateByWorkspace({ workspaceId: workspaceId }));
//     dispatch(getCandidateByWorkspace({ id: workspaceId }))

//   };

//   // Helper function to assign colors based on stage/status (fallback if backend doesn't provide colors)
//   const getStageColor = (stage) => {
//     const stageStr = (stage || '').toLowerCase();
//     if (stageStr.includes('interview')) return 'bg-[#E6D6FF] text-[#8624F0] dark:bg-[#2d1a4d] dark:text-[#c084fc]';
//     if (stageStr.includes('screen')) return 'bg-[#FFF4DE] text-[#FFA800] dark:bg-[#3d2e1a] dark:text-[#fbbf24]';
//     if (stageStr.includes('shortlist')) return 'bg-[#ECFCE5] text-[#25852F] dark:bg-[#1a3d1a] dark:text-[#4ade80]';
//     if (stageStr.includes('reject')) return 'bg-[#FFECEC] text-[#F53D6B] dark:bg-[#3d1a1a] dark:text-[#f87171]';
//     return 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300'; // default
//   };

  
//   return (
//     <div className="space-y-6 rounded-[20px] p-8" style={{ background: 'var(--bg-card)' }}>
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
//         <div>
//           <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Candidates</h1>
//           <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Recent candidates who haven't progressed yet.</p>
//         </div>
//         <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
//           <div className="relative w-full sm:w-[300px]">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
//             <input
//               type="text"
//               placeholder="Search"
//               disabled={!selectedWorkspace}
//               className="w-full pl-10 pr-4 py-3 rounded-[10px] text-sm outline-none focus:ring-2 ring-purple-100 disabled:opacity-50"
//               style={{ background: 'var(--bg-main)', color: 'var(--text-primary)' }}
//             />
//           </div>
//           <button
//             onClick={() => router.push('/import')}
//             disabled={!selectedWorkspace}
//             className="cursor-pointer w-full sm:w-auto bg-[#8624F0] text-white px-6 py-3 rounded-[10px] font-bold flex items-center justify-center gap-2 hover:bg-[#6c1dc0] transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <Upload size={18} /> Import Candidates
//           </button>
//         </div>
//       </div>

//       {/* Conditionally Render Content */}
//       {!selectedWorkspace ? (
//         <div className="rounded-[20px] py-20 flex flex-col items-center justify-center text-center border-2 border-dashed" style={{ borderColor: 'var(--border-color)' }}>
//           <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-[#8624F0]/10 text-[#8624F0]">
//             <Search size={24} />
//           </div>
//           <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>No Workspace Selected</h3>
//           <p className="text-sm max-w-sm" style={{ color: 'var(--text-secondary)' }}>
//             Please select a workspace from the menu to view its candidates.
//           </p>
//           <button 
//             onClick={() => setShowWorkspaceModal(true)}
//             className="mt-6 px-6 py-2 bg-[#8624F0] text-white rounded-[8px] font-medium hover:bg-[#6c1dc0] transition-colors"
//           >
//             Select Workspace
//           </button>
//         </div>
//       ) : loading ? (
//         <div className="rounded-[20px] py-20 flex flex-col items-center justify-center">
//           <Loader2 className="w-8 h-8 animate-spin text-[#8624F0] mb-4" />
//           <p style={{ color: 'var(--text-secondary)' }}>Loading candidates...</p>
//         </div>
//       ) : candidateList.length === 0 ? (
//         <div className="rounded-[20px] py-20 flex flex-col items-center justify-center text-center border border-dashed" style={{ borderColor: 'var(--border-color)' }}>
//           <p style={{ color: 'var(--text-secondary)' }}>No candidates found for this workspace yet.</p>
//         </div>
//       ) : (
//         <div className="rounded-[20px] py-6 overflow-hidden" style={{ background: 'var(--bg-card)' }}>
//           <div className="overflow-x-auto">
//             <table className="w-full min-w-[900px]">
//               <thead>
//                 <tr className="text-left text-xs uppercase" style={{ color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-color)' }}>
//                   <th className="pb-4 font-bold pl-2">Candidate</th>
//                   <th className="pb-4 font-bold">Email</th>
//                   <th className="pb-4 font-bold">Form Name</th>
//                   <th className="pb-4 font-bold text-center">Form Stage</th>
//                   <th className="pb-4 font-bold">Created</th>
//                   <th className="pb-4 font-bold">Form Type</th>
//                 </tr>
//               </thead>
//              <tbody>
//                 {candidateList.map((cand) => {
//                   // Since a candidate might submit multiple forms, we grab the first/latest one for the table row
//                   const latestSubmission = cand.formSubmissionDto?.[0];
//                   const formTitle = latestSubmission?.form?.title || "No Form Associated";
                  
//                   // Stage isn't explicitly defined by name in this payload (currentStageId is null), so we use a fallback
//                   const currentStage = latestSubmission?.currentStageId ? `Stage ${latestSubmission.currentStageId}` : "Applied";
                  
//                   // Format the createdAt date nicely
//                   const formattedDate = cand.createdAt 
//                     ? new Date(cand.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
//                     : 'N/A';

//                   return (
//                     <tr
//                       key={cand.id}
//                       className="transition-colors hover:opacity-80"
//                       style={{ borderBottom: '1px solid var(--border-color)' }}
//                     >
//                       <td
//                         className="py-4 pl-2 text-sm font-bold cursor-pointer hover:text-[#8624F0]"
//                         style={{ color: 'var(--text-primary)' }}
//                         onClick={() => {
//                           setSelectedCandidate(cand);
//                           setIsOpen(true);
//                         }}
//                       >
//                         {cand.fullName || "Unknown"}
//                       </td>
//                       <td className="py-4 text-sm" style={{ color: 'var(--text-primary)' }}>
//                         {cand.email || "N/A"}
//                       </td>
//                       <td className="py-4 text-sm max-w-[250px] truncate pr-4 font-bold" style={{ color: 'var(--text-primary)' }}>
//                         {formTitle}
//                       </td>
//                       <td className="py-4 text-center">
//                         <span className={`px-4 py-1.5 rounded-full text-xs font-bold inline-block w-[100px] ${getStageColor(currentStage)}`}>
//                           {currentStage}
//                         </span>
//                       </td>
//                       <td className="py-4 text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
//                         {formattedDate}
//                       </td>
//                       <td className="py-4 text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
//                         Application
//                       </td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       )}

//       {/* Candidate Detail Popup */}
//       {isOpen && (
//         <div className="popup-overlay">
//           <div className="popup-content" style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}>
//             {/* <button
//               className="close-btn"
//               onClick={() => setIsOpen(false)}
//               style={{ color: 'var(--text-secondary)' }}
//             >
//               <X size={18} />
//             </button> */}
//             {popupView === 'details' && (
//                 <button
//                   className="close-btn"
//                   onClick={() => setIsOpen(false)}
//                   style={{ color: 'var(--text-secondary)' }}
//                 >
//                   <X size={18} />
//                 </button>
//             )}
//             <div className="pt-8">
//               {popupView === 'details' ? (
//                 <>
//                 <div className="poptop flex justify-between items-center pb-8 mb-8" style={{ borderBottom: '1px solid var(--border-color)' }}>
            
//                 <div className="poptop_wrap flex items-center gap-3">
//                   <div className="bg-[#8734FB] w-[58px] h-[58px] rounded-full flex justify-center items-center">
//                     <p className="text-white text-[16px] font-medium">
//                       {/* Safely get initials from fullName */}
//                       {(selectedCandidate?.fullName || "C").substring(0, 2).toUpperCase()}
//                     </p>
//                   </div>
//                   <div className="text-left">
//                     <h3 className="text-[20px] leading-[24px] font-medium" style={{ color: 'var(--text-primary)' }}>
//                       {selectedCandidate?.fullName}
//                     </h3>
//                     <p className="text-[15px]" style={{ color: 'var(--text-secondary)' }}>Candidate</p>
//                   </div>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   {/* Action buttons */}
//                   <button className="w-[45px] h-[45px] bg-[#8624F0] rounded-[14px] flex justify-center items-center cursor-pointer">
//                     <GrOverview className="text-[20px] text-white" />
//                   </button>
//                   <button 
//                   onClick={() => setPopupView('chat')}
//                   className="w-[45px] h-[45px] bg-[#AAAAAA] rounded-[14px] flex justify-center items-center cursor-pointer">
//                     <AiOutlineMessage className="text-[20px] text-white" />
//                   </button>
//                   <button className="w-[45px] h-[45px] bg-[#AAAAAA] rounded-[14px] flex justify-center items-center cursor-pointer">
//                     <BiCommentCheck className="text-[20px] text-white" />
//                   </button>
//                 </div>
//               </div>
//                 </>
//               ):(
//                 <CandidateChat 
//                   candidate={selectedCandidate} 
//                   onBack={() => setPopupView('details')} 
//                 />
//               )}
              
              
//               {/* ... The rest of your Popup Content (You can map selectedCandidate fields here too!) ... */}
             
//               <div className="popmid">
//                  <div className="grid grid-cols-2 gap-4 mb-6">
//                    <div className="flex items-center gap-4">
//                      <AiOutlineMail className="text-[#ADADAD] text-[24px]" />
//                      <div className="text-left">
//                        <h3 className="text-[12px] leading-[16px]" style={{ color: 'var(--text-secondary)' }}>Email</h3>
//                        <p className="text-[17px]" style={{ color: 'var(--text-primary)' }}>{selectedCandidate?.email}</p>
//                      </div>
//                    </div>
//                    <div className="flex items-center gap-4">
//                      <BsTelephone className="text-[#ADADAD] text-[24px]" />
//                      <div className="text-left">
//                        <h3 className="text-[12px] leading-[16px]" style={{ color: 'var(--text-secondary)' }}>Phone</h3>
//                        <p className="text-[17px]" style={{ color: 'var(--text-primary)' }}>+1 (555) 123-4567</p>
//                      </div>
//                    </div>
//                    <div className="flex items-center gap-4">
//                      <BiMap className="text-[#ADADAD] text-[24px]" />
//                      <div className="text-left">
//                        <h3 className="text-[12px] leading-[16px]" style={{ color: 'var(--text-secondary)' }}>Location</h3>
//                        <p className="text-[17px]" style={{ color: 'var(--text-primary)' }}>San Francisco, CA</p>
//                      </div>
//                    </div>
//                    <div className="flex items-center gap-4">
//                      <AiOutlineCalendar className="text-[#ADADAD] text-[24px]" />
//                      <div className="text-left">
//                        <h3 className="text-[12px] leading-[16px]" style={{ color: 'var(--text-secondary)' }}>Applied</h3>
//                        <p className="text-[17px]" style={{ color: 'var(--text-primary)' }}>28/01/2026</p>
//                      </div>
//                    </div>
//                  </div>

//                  <div className="mb-10">
//                    <div className="grid grid-cols-3 gap-4 mb-4">
//                      <div className="border-[#DCBCFF] border bg-[#F7EFFF] dark:bg-[#2d1a4d] dark:border-[#4a2d6b] p-4 text-left rounded-[10px]">
//                        <h3 className="text-[#9A58E2] text-[12px] pb-1">Current Stage</h3>
//                        <p className="text-[#660EC4] dark:text-[#c084fc] text-[18px] font-semibold">Interview</p>
//                      </div>
//                      <div className="border-[#FFE6B8] border bg-[#FFEFD2] dark:bg-[#3d2e1a] dark:border-[#6b4a1a] p-4 text-left rounded-[10px]">
//                        <h3 className="text-[#767600] dark:text-[#fbbf24] text-[12px] pb-1">Source</h3>
//                        <p className="text-[#695C0D] dark:text-[#fbbf24] text-[18px] font-semibold">Referral</p>
//                      </div>
//                      <div className="p-4 text-left rounded-[10px]" style={{ background: 'var(--bg-main)', border: '1px solid var(--border-color)' }}>
//                        <h3 className="text-[12px] pb-1" style={{ color: 'var(--text-secondary)' }}>Experience</h3>
//                        <p className="text-[18px] font-semibold" style={{ color: 'var(--text-primary)' }}>8 years</p>
//                      </div>
//                    </div>
//                    <div className="border-[#AEFFB7] border bg-[#F1FDF4] dark:bg-[#1a3d1a] dark:border-[#2d6b2d] p-4 text-left rounded-[10px]">
//                      <h3 className="text-[#25852F] dark:text-[#4ade80] text-[12px] pb-1">Referred by</h3>
//                      <p className="text-[#25852F] dark:text-[#4ade80] text-[18px] font-semibold">Mike Johnson</p>
//                    </div>
//                  </div>

//                  <div className="flex items-center gap-4 mb-4">
//                    <p className="text-[14px] font-medium uppercase" style={{ color: 'var(--text-secondary)' }}>Question 1</p>
//                    <span className="text-[14px] font-medium" style={{ color: 'var(--text-primary)' }}>UXStudio is hiring for a UI/UX Designer</span>
//                  </div>
//                  <div className="flex items-center gap-4">
//                    <p className="text-[14px] font-medium uppercase" style={{ color: 'var(--text-secondary)' }}>Question 1</p>
//                  <span className="text-[14px] font-medium" style={{ color: 'var(--text-primary)' }}>UXStudio is hiring for a UI/UX Designer</span>
//                  </div>
//               </div>

//                 <div className="popbottom mt-8">
//                  <div className="flex gap-4 mb-4">
//                    <button className="flex items-center justify-center gap-2 border border-[#761ED3] text-[#761ED3] hover:text-white text-[15px] leading-[40px] rounded-[8px] w-full cursor-pointer hover:bg-[#761ED3] transition-colors">
//                      <CgFileDocument className="text-[18px]" /> View Resume
//                    </button>
//                    <button className="flex items-center justify-center gap-2 border border-[#761ED3] text-[#761ED3] hover:text-white text-[15px] leading-[40px] rounded-[8px] w-full cursor-pointer hover:bg-[#761ED3] transition-colors">
//                      <FaVideo className="text-[18px]" /> Watch Video
//                    </button>
//                  </div>
//                 <button className="flex items-center justify-center gap-1 border bg-[#210043] dark:bg-[#6d28d9] text-white text-[14px] leading-[40px] rounded-[8px] w-full cursor-pointer hover:bg-[#761ED3] transition-colors">
//                  <RiArrowDropDownLine className="text-[20px]" /> Shortlisted
//                  </button>
//                </div>

//             </div>
//           </div>
//         </div>
//       )}

//       {/* Workspace Modal */}
//       <WorkspaceModal 
//         isOpen={showWorkspaceModal} 
//         onClose={() => {
//             if (selectedWorkspace) setShowWorkspaceModal(false);
//         }} 
//         workspaces={workspaceData?.data || []}
//         onSelect={handleSelectWorkspace}
//       />
//     </div>
//   );
// }



'use client';

import { Search, Upload, X, Loader2 } from 'lucide-react'; 
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { GrOverview } from 'react-icons/gr';
import { AiOutlineMessage, AiOutlineMail, AiOutlineCalendar } from 'react-icons/ai';
import { BiCommentCheck, BiMap } from 'react-icons/bi';
import { BsTelephone } from 'react-icons/bs';
import { CgFileDocument } from 'react-icons/cg';
import { FaVideo } from 'react-icons/fa';
import { RiArrowDropDownLine } from 'react-icons/ri';

// Import your WorkspaceModal and Redux actions
import WorkspaceModal from '../forms/WorkspaceModal'; 
import { getCandidateByWorkspace } from '../Reducer/CandidateSlice';
import CandidateChat from './CandidateChat';

export default function Candidates() {
  const router = useRouter();
  const dispatch = useDispatch();
  
  // State for Workspace Selection & Popup
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const [showWorkspaceModal, setShowWorkspaceModal] = useState(true); 
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null); 
  const [popupView, setPopupView] = useState('details');

  // Fetch Workspaces and Candidates from Redux
  const { workspaceData } = useSelector((state) => state?.auth || {});
  const { candidate, loading } = useSelector((state) => state?.candidate || {});

  // --- NEW FLATTENING LOGIC BASED ON YOUR JSON ---
  const rawForms = candidate?.data?.formDto || [];
  const candidateList = [];

  rawForms.forEach((form) => {
    const submissions = form.submissions || [];
    console.log("submissions",submissions);
    
    submissions.forEach((sub) => {
      if (sub.candidate) {
        // Create a flat object combining candidate info and form info
        candidateList.push({
          id: sub.candidate.id, // Candidate ID
          submissionId: sub.id, // Submission ID
          fullName: sub.candidate.fullName,
          email: sub.candidate.email,
          createdAt: sub.candidate.createdAt,
          submittedAt: sub.submittedAt,
          formTitle: form.title, // Grab the title from the parent form object
          formId: form.id,               // <--- ADD THIS
          workspaceId: form.workspaceId, // <--- ADD THIS
          currentStage: sub.currentStageId ? `Stage ${sub.currentStageId}` : "Applied",
          rawCandidateData: sub.candidate // Keep the raw data just in case
        });
      }
    });
  });

  const handleSelectWorkspace = (workspaceId) => {
    setSelectedWorkspace(workspaceId);
    setShowWorkspaceModal(false);
    console.log("Fetching candidates for Workspace ID:", workspaceId);
    dispatch(getCandidateByWorkspace({ id: workspaceId }));
  };

  const getStageColor = (stage) => {
    const stageStr = (stage || '').toLowerCase();
    if (stageStr.includes('interview')) return 'bg-[#E6D6FF] text-[#8624F0] dark:bg-[#2d1a4d] dark:text-[#c084fc]';
    if (stageStr.includes('screen')) return 'bg-[#FFF4DE] text-[#FFA800] dark:bg-[#3d2e1a] dark:text-[#fbbf24]';
    if (stageStr.includes('shortlist')) return 'bg-[#ECFCE5] text-[#25852F] dark:bg-[#1a3d1a] dark:text-[#4ade80]';
    if (stageStr.includes('reject')) return 'bg-[#FFECEC] text-[#F53D6B] dark:bg-[#3d1a1a] dark:text-[#f87171]';
    return 'bg-[#ECFCE5] text-[#25852F] dark:bg-[#1a3d1a] dark:text-[#4ade80]'; // default to a green 'Applied' color
  };

  return (
    <div className="space-y-6 rounded-[20px] p-8" style={{ background: 'var(--bg-card)' }}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Candidates</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Recent candidates who haven't progressed yet.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
            <input
              type="text"
              placeholder="Search"
              disabled={!selectedWorkspace}
              className="w-full pl-10 pr-4 py-3 rounded-[10px] text-sm outline-none focus:ring-2 ring-purple-100 disabled:opacity-50"
              style={{ background: 'var(--bg-main)', color: 'var(--text-primary)' }}
            />
          </div>
          <button
            onClick={() => router.push('/import')}
            disabled={!selectedWorkspace}
            className="cursor-pointer w-full sm:w-auto bg-[#8624F0] text-white px-6 py-3 rounded-[10px] font-bold flex items-center justify-center gap-2 hover:bg-[#6c1dc0] transition-colors whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Upload size={18} /> Import Candidates
          </button>
        </div>
      </div>

      {/* Conditionally Render Content */}
      {!selectedWorkspace ? (
        <div className="rounded-[20px] py-20 flex flex-col items-center justify-center text-center border-2 border-dashed" style={{ borderColor: 'var(--border-color)' }}>
          <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-[#8624F0]/10 text-[#8624F0]">
            <Search size={24} />
          </div>
          <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>No Workspace Selected</h3>
          <p className="text-sm max-w-sm" style={{ color: 'var(--text-secondary)' }}>
            Please select a workspace from the menu to view its candidates.
          </p>
          <button 
            onClick={() => setShowWorkspaceModal(true)}
            className="mt-6 px-6 py-2 bg-[#8624F0] text-white rounded-[8px] font-medium hover:bg-[#6c1dc0] transition-colors"
          >
            Select Workspace
          </button>
        </div>
      ) : loading ? (
        <div className="rounded-[20px] py-20 flex flex-col items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-[#8624F0] mb-4" />
          <p style={{ color: 'var(--text-secondary)' }}>Loading candidates...</p>
        </div>
      ) : candidateList.length === 0 ? (
        <div className="rounded-[20px] py-20 flex flex-col items-center justify-center text-center border border-dashed" style={{ borderColor: 'var(--border-color)' }}>
          <p style={{ color: 'var(--text-secondary)' }}>No candidates found for this workspace yet.</p>
        </div>
      ) : (
        <div className="rounded-[20px] py-6 overflow-hidden" style={{ background: 'var(--bg-card)' }}>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="text-left text-xs uppercase" style={{ color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                  <th className="pb-4 font-bold pl-2">Candidate</th>
                  <th className="pb-4 font-bold">Email</th>
                  <th className="pb-4 font-bold">Form Name</th>
                  <th className="pb-4 font-bold text-center">Form Stage</th>
                  <th className="pb-4 font-bold">Applied On</th>
                </tr>
              </thead>
             <tbody>
                {candidateList.map((cand, index) => {
                  const formattedDate = cand.submittedAt 
                    ? new Date(cand.submittedAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
                    : 'N/A';

                  return (
                    <tr
                      // using index as fallback if multiple submissions have same candidate id
                      key={cand.submissionId || index} 
                      className="transition-colors hover:opacity-80"
                      style={{ borderBottom: '1px solid var(--border-color)' }}
                    >
                      <td
                        className="py-4 pl-2 text-sm font-bold cursor-pointer hover:text-[#8624F0]"
                        style={{ color: 'var(--text-primary)' }}
                        onClick={() => {
                          setSelectedCandidate(cand);
                          setPopupView('details'); // Reset popup view
                          setIsOpen(true);
                        }}
                      >
                        {cand.fullName || "Unknown"}
                      </td>
                      <td className="py-4 text-sm" style={{ color: 'var(--text-primary)' }}>
                        {cand.email || "N/A"}
                      </td>
                      <td className="py-4 text-sm max-w-[250px] truncate pr-4 font-bold" style={{ color: 'var(--text-primary)' }}>
                        {cand.formTitle}
                      </td>
                      <td className="py-4 text-center">
                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold inline-block w-[100px] ${getStageColor(cand.currentStage)}`}>
                          {cand.currentStage}
                        </span>
                      </td>
                      <td className="py-4 text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                        {formattedDate}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Candidate Detail Popup */}
      {isOpen && (
        <div className="popup-overlay">
          <div className="popup-content" style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}>
            
            {popupView === 'details' && (
                <button
                  className="close-btn"
                  onClick={() => setIsOpen(false)}
                  style={{ color: 'var(--text-secondary)' }}
                >
                  <X size={18} />
                </button>
            )}
            
            <div className="pt-8">
              {popupView === 'details' ? (
                <>
                <div className="poptop flex justify-between items-center pb-8 mb-8" style={{ borderBottom: '1px solid var(--border-color)' }}>
            
                <div className="poptop_wrap flex items-center gap-3">
                  <div className="bg-[#8734FB] w-[58px] h-[58px] rounded-full flex justify-center items-center">
                    <p className="text-white text-[16px] font-medium">
                      {(selectedCandidate?.fullName || "C").substring(0, 2).toUpperCase()}
                    </p>
                  </div>
                  <div className="text-left">
                    <h3 className="text-[20px] leading-[24px] font-medium" style={{ color: 'var(--text-primary)' }}>
                      {selectedCandidate?.fullName}
                    </h3>
                    <p className="text-[15px]" style={{ color: 'var(--text-secondary)' }}>Candidate</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="w-[45px] h-[45px] bg-[#8624F0] rounded-[14px] flex justify-center items-center cursor-pointer">
                    <GrOverview className="text-[20px] text-white" />
                  </button>
                  <button 
                  onClick={() => setPopupView('chat')}
                  className="w-[45px] h-[45px] bg-[#AAAAAA] rounded-[14px] flex justify-center items-center cursor-pointer hover:bg-[#8624F0] transition-colors">
                    <AiOutlineMessage className="text-[20px] text-white" />
                  </button>
                  <button className="w-[45px] h-[45px] bg-[#AAAAAA] rounded-[14px] flex justify-center items-center cursor-pointer hover:bg-[#8624F0] transition-colors">
                    <BiCommentCheck className="text-[20px] text-white" />
                  </button>
                </div>
              </div>
                
                 <div className="popmid">
                   <div className="grid grid-cols-2 gap-4 mb-6">
                     <div className="flex items-center gap-4">
                       <AiOutlineMail className="text-[#ADADAD] text-[24px]" />
                       <div className="text-left">
                         <h3 className="text-[12px] leading-[16px]" style={{ color: 'var(--text-secondary)' }}>Email</h3>
                         <p className="text-[17px]" style={{ color: 'var(--text-primary)' }}>{selectedCandidate?.email}</p>
                       </div>
                     </div>
                     <div className="flex items-center gap-4">
                       <BsTelephone className="text-[#ADADAD] text-[24px]" />
                       <div className="text-left">
                         <h3 className="text-[12px] leading-[16px]" style={{ color: 'var(--text-secondary)' }}>Phone</h3>
                         <p className="text-[17px]" style={{ color: 'var(--text-primary)' }}>N/A</p>
                       </div>
                     </div>
                     <div className="flex items-center gap-4">
                       <BiMap className="text-[#ADADAD] text-[24px]" />
                       <div className="text-left">
                         <h3 className="text-[12px] leading-[16px]" style={{ color: 'var(--text-secondary)' }}>Location</h3>
                         <p className="text-[17px]" style={{ color: 'var(--text-primary)' }}>N/A</p>
                       </div>
                     </div>
                     <div className="flex items-center gap-4">
                       <AiOutlineCalendar className="text-[#ADADAD] text-[24px]" />
                       <div className="text-left">
                         <h3 className="text-[12px] leading-[16px]" style={{ color: 'var(--text-secondary)' }}>Applied</h3>
                         <p className="text-[17px]" style={{ color: 'var(--text-primary)' }}>
                            {selectedCandidate?.submittedAt ? new Date(selectedCandidate.submittedAt).toLocaleDateString() : 'N/A'}
                         </p>
                       </div>
                     </div>
                   </div>

                   <div className="mb-10">
                     <div className="grid grid-cols-3 gap-4 mb-4">
                       <div className="border-[#DCBCFF] border bg-[#F7EFFF] dark:bg-[#2d1a4d] dark:border-[#4a2d6b] p-4 text-left rounded-[10px]">
                         <h3 className="text-[#9A58E2] text-[12px] pb-1">Current Stage</h3>
                         <p className="text-[#660EC4] dark:text-[#c084fc] text-[18px] font-semibold">{selectedCandidate?.currentStage}</p>
                       </div>
                       <div className="border-[#FFE6B8] border bg-[#FFEFD2] dark:bg-[#3d2e1a] dark:border-[#6b4a1a] p-4 text-left rounded-[10px]">
                         <h3 className="text-[#767600] dark:text-[#fbbf24] text-[12px] pb-1">Source</h3>
                         <p className="text-[#695C0D] dark:text-[#fbbf24] text-[18px] font-semibold">Form</p>
                       </div>
                       <div className="p-4 text-left rounded-[10px]" style={{ background: 'var(--bg-main)', border: '1px solid var(--border-color)' }}>
                         <h3 className="text-[12px] pb-1" style={{ color: 'var(--text-secondary)' }}>Form Name</h3>
                         <p className="text-[18px] font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{selectedCandidate?.formTitle}</p>
                       </div>
                     </div>
                   </div>

                  <div className="popbottom mt-8">
                   <div className="flex gap-4 mb-4">
                     <button className="flex items-center justify-center gap-2 border border-[#761ED3] text-[#761ED3] hover:text-white text-[15px] leading-[40px] rounded-[8px] w-full cursor-pointer hover:bg-[#761ED3] transition-colors">
                       <CgFileDocument className="text-[18px]" /> View Resume
                     </button>
                     <button className="flex items-center justify-center gap-2 border border-[#761ED3] text-[#761ED3] hover:text-white text-[15px] leading-[40px] rounded-[8px] w-full cursor-pointer hover:bg-[#761ED3] transition-colors">
                       <FaVideo className="text-[18px]" /> Watch Video
                     </button>
                   </div>
                  <button className="flex items-center justify-center gap-1 border bg-[#210043] dark:bg-[#6d28d9] text-white text-[14px] leading-[40px] rounded-[8px] w-full cursor-pointer hover:bg-[#761ED3] transition-colors">
                   <RiArrowDropDownLine className="text-[20px]" /> Shortlisted
                   </button>
                 </div>

                </div>
                </>
              ):(
                <CandidateChat 
                  candidate={selectedCandidate} 
                  onBack={() => setPopupView('details')} 
                />
              )}
            </div>
          </div>
        </div>
      )}

      {/* Workspace Modal */}
      <WorkspaceModal 
        isOpen={showWorkspaceModal} 
        onClose={() => {
            if (selectedWorkspace) setShowWorkspaceModal(false);
        }} 
        workspaces={workspaceData?.data || []}
        onSelect={handleSelectWorkspace}
      />
    </div>
  );
}















