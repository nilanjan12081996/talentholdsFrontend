'use client';

import { Search, Upload, X } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GrOverview } from 'react-icons/gr';
import { AiOutlineMessage, AiOutlineMail, AiOutlineCalendar } from 'react-icons/ai';
import { BiCommentCheck, BiMap } from 'react-icons/bi';
import { BsTelephone } from 'react-icons/bs';
import { CgFileDocument } from 'react-icons/cg';
import { FaVideo } from 'react-icons/fa';
import { RiArrowDropDownLine } from 'react-icons/ri';

const candidates = [
  { id: 1, name: 'Sarah Chen', email: 'mbrown@email.com', formName: 'UXStudio is hiring for a UI/UX Designer', stage: 'Interview', stageColor: 'bg-[#E6D6FF] text-[#8624F0] dark:bg-[#2d1a4d] dark:text-[#c084fc]', created: '30 Jan, 7:00 PM', type: 'Referral' },
  { id: 2, name: 'Sarah Chen', email: 'mbrown@email.com', formName: "We're hiring a Full-Stack Developer at CloudNest", stage: 'Screening', stageColor: 'bg-[#FFF4DE] text-[#FFA800] dark:bg-[#3d2e1a] dark:text-[#fbbf24]', created: '30 Jan, 7:00 PM', type: 'Job Application' },
  { id: 3, name: 'Sarah Chen', email: 'mbrown@email.com', formName: 'PixelCraft wants a creative Graphic Designer', stage: 'Shortlisted', stageColor: 'bg-[#ECFCE5] text-[#25852F] dark:bg-[#1a3d1a] dark:text-[#4ade80]', created: '30 Jan, 7:00 PM', type: 'Imported Form' },
  { id: 4, name: 'Sarah Chen', email: 'mbrown@email.com', formName: 'PixelCraft wants a creative Graphic Designer', stage: 'Rejected', stageColor: 'bg-[#FFECEC] text-[#F53D6B] dark:bg-[#3d1a1a] dark:text-[#f87171]', created: '30 Jan, 7:00 PM', type: 'Job Application' },
  { id: 5, name: 'Sarah Chen', email: 'mbrown@email.com', formName: 'PixelCraft wants a creative Graphic Designer', stage: 'Shortlisted', stageColor: 'bg-[#ECFCE5] text-[#25852F] dark:bg-[#1a3d1a] dark:text-[#4ade80]', created: '30 Jan, 7:00 PM', type: 'Job Application' },
  { id: 6, name: 'Sarah Chen', email: 'mbrown@email.com', formName: 'PixelCraft wants a creative Graphic Designer', stage: 'Rejected', stageColor: 'bg-[#FFECEC] text-[#F53D6B] dark:bg-[#3d1a1a] dark:text-[#f87171]', created: '30 Jan, 7:00 PM', type: 'Job Application' },
  { id: 7, name: 'Sarah Chen', email: 'mbrown@email.com', formName: 'PixelCraft wants a creative Graphic Designer', stage: 'Interview', stageColor: 'bg-[#E6D6FF] text-[#8624F0] dark:bg-[#2d1a4d] dark:text-[#c084fc]', created: '30 Jan, 7:00 PM', type: 'Referral' },
  { id: 8, name: 'Sarah Chen', email: 'mbrown@email.com', formName: 'Join BrightLabs as a Product Designer', stage: 'Interview', stageColor: 'bg-[#E6D6FF] text-[#8624F0] dark:bg-[#2d1a4d] dark:text-[#c084fc]', created: '30 Jan, 7:00 PM', type: 'Referral' },
  { id: 9, name: 'Sarah Chen', email: 'mbrown@email.com', formName: 'UXStudio is hiring for a UI/UX Designer', stage: 'Interview', stageColor: 'bg-[#E6D6FF] text-[#8624F0] dark:bg-[#2d1a4d] dark:text-[#c084fc]', created: '30 Jan, 7:00 PM', type: 'Referral' },
  { id: 10, name: 'Sarah Chen', email: 'mbrown@email.com', formName: 'UXStudio is hiring for a UI/UX Designer', stage: 'Interview', stageColor: 'bg-[#E6D6FF] text-[#8624F0] dark:bg-[#2d1a4d] dark:text-[#c084fc]', created: '30 Jan, 7:00 PM', type: 'Imported Form' },
];

export default function Candidates() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

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
              className="w-full pl-10 pr-4 py-3 rounded-[10px] text-sm outline-none focus:ring-2 ring-purple-100"
              style={{ background: 'var(--bg-main)', color: 'var(--text-primary)' }}
            />
          </div>
          <button
            onClick={() => router.push('/import')}
            className="cursor-pointer w-full sm:w-auto bg-[#8624F0] text-white px-6 py-3 rounded-[10px] font-bold flex items-center justify-center gap-2 hover:bg-[#6c1dc0] transition-colors whitespace-nowrap"
          >
            <Upload size={18} /> Import Candidates
          </button>
        </div>
      </div>

      <div className="rounded-[20px] py-6 overflow-hidden" style={{ background: 'var(--bg-card)' }}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="text-left text-xs uppercase" style={{ color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                <th className="pb-4 font-bold pl-2">Candidate</th>
                <th className="pb-4 font-bold">Email</th>
                <th className="pb-4 font-bold">Form Name</th>
                <th className="pb-4 font-bold text-center">Form Stage</th>
                <th className="pb-4 font-bold">Created</th>
                <th className="pb-4 font-bold">Form Type</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map((candidate) => (
                <tr
                  key={candidate.id}
                  className="transition-colors hover:opacity-80"
                  style={{ borderBottom: '1px solid var(--border-color)' }}
                >
                  <td
                    className="py-4 pl-2 text-sm font-bold cursor-pointer"
                    style={{ color: 'var(--text-primary)' }}
                    onClick={() => setIsOpen(true)}
                  >
                    {candidate.name}
                  </td>
                  <td className="py-4 text-sm" style={{ color: 'var(--text-primary)' }}>{candidate.email}</td>
                  <td className="py-4 text-sm max-w-[250px] truncate pr-4 font-bold" style={{ color: 'var(--text-primary)' }}>{candidate.formName}</td>
                  <td className="py-4 text-center">
                    <span className={`px-4 py-1.5 rounded-full text-xs font-bold inline-block w-[100px] ${candidate.stageColor}`}>
                      {candidate.stage}
                    </span>
                  </td>
                  <td className="py-4 text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{candidate.created}</td>
                  <td className="py-4 text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{candidate.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isOpen && (
        <div className="popup-overlay">
          <div className="popup-content" style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}>
            <button
              className="close-btn"
              onClick={() => setIsOpen(false)}
              style={{ color: 'var(--text-secondary)' }}
            >
              <X size={18} />
            </button>
            <div className="pt-8">
              <div className="poptop flex justify-between items-center pb-8 mb-8" style={{ borderBottom: '1px solid var(--border-color)' }}>
                <div className="poptop_wrap flex items-center gap-3">
                  <div className="bg-[#8734FB] w-[58px] h-[58px] rounded-full flex justify-center items-center">
                    <p className="text-white text-[16px] font-medium">SC</p>
                  </div>
                  <div className="text-left">
                    <h3 className="text-[20px] leading-[24px] font-medium" style={{ color: 'var(--text-primary)' }}>Sarah Chen</h3>
                    <p className="text-[15px]" style={{ color: 'var(--text-secondary)' }}>Senior Developer</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="w-[45px] h-[45px] bg-[#8624F0] rounded-[14px] flex justify-center items-center cursor-pointer">
                    <GrOverview className="text-[20px] text-white" />
                  </button>
                  <button className="w-[45px] h-[45px] bg-[#AAAAAA] rounded-[14px] flex justify-center items-center cursor-pointer">
                    <AiOutlineMessage className="text-[20px] text-white" />
                  </button>
                  <button className="w-[45px] h-[45px] bg-[#AAAAAA] rounded-[14px] flex justify-center items-center cursor-pointer">
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
                      <p className="text-[17px]" style={{ color: 'var(--text-primary)' }}>sarah.chen@email.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <BsTelephone className="text-[#ADADAD] text-[24px]" />
                    <div className="text-left">
                      <h3 className="text-[12px] leading-[16px]" style={{ color: 'var(--text-secondary)' }}>Phone</h3>
                      <p className="text-[17px]" style={{ color: 'var(--text-primary)' }}>+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <BiMap className="text-[#ADADAD] text-[24px]" />
                    <div className="text-left">
                      <h3 className="text-[12px] leading-[16px]" style={{ color: 'var(--text-secondary)' }}>Location</h3>
                      <p className="text-[17px]" style={{ color: 'var(--text-primary)' }}>San Francisco, CA</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <AiOutlineCalendar className="text-[#ADADAD] text-[24px]" />
                    <div className="text-left">
                      <h3 className="text-[12px] leading-[16px]" style={{ color: 'var(--text-secondary)' }}>Applied</h3>
                      <p className="text-[17px]" style={{ color: 'var(--text-primary)' }}>28/01/2026</p>
                    </div>
                  </div>
                </div>

                <div className="mb-10">
                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="border-[#DCBCFF] border bg-[#F7EFFF] dark:bg-[#2d1a4d] dark:border-[#4a2d6b] p-4 text-left rounded-[10px]">
                      <h3 className="text-[#9A58E2] text-[12px] pb-1">Current Stage</h3>
                      <p className="text-[#660EC4] dark:text-[#c084fc] text-[18px] font-semibold">Interview</p>
                    </div>
                    <div className="border-[#FFE6B8] border bg-[#FFEFD2] dark:bg-[#3d2e1a] dark:border-[#6b4a1a] p-4 text-left rounded-[10px]">
                      <h3 className="text-[#767600] dark:text-[#fbbf24] text-[12px] pb-1">Source</h3>
                      <p className="text-[#695C0D] dark:text-[#fbbf24] text-[18px] font-semibold">Referral</p>
                    </div>
                    <div className="p-4 text-left rounded-[10px]" style={{ background: 'var(--bg-main)', border: '1px solid var(--border-color)' }}>
                      <h3 className="text-[12px] pb-1" style={{ color: 'var(--text-secondary)' }}>Experience</h3>
                      <p className="text-[18px] font-semibold" style={{ color: 'var(--text-primary)' }}>8 years</p>
                    </div>
                  </div>
                  <div className="border-[#AEFFB7] border bg-[#F1FDF4] dark:bg-[#1a3d1a] dark:border-[#2d6b2d] p-4 text-left rounded-[10px]">
                    <h3 className="text-[#25852F] dark:text-[#4ade80] text-[12px] pb-1">Referred by</h3>
                    <p className="text-[#25852F] dark:text-[#4ade80] text-[18px] font-semibold">Mike Johnson</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <p className="text-[14px] font-medium uppercase" style={{ color: 'var(--text-secondary)' }}>Question 1</p>
                  <span className="text-[14px] font-medium" style={{ color: 'var(--text-primary)' }}>UXStudio is hiring for a UI/UX Designer</span>
                </div>
                <div className="flex items-center gap-4">
                  <p className="text-[14px] font-medium uppercase" style={{ color: 'var(--text-secondary)' }}>Question 1</p>
                  <span className="text-[14px] font-medium" style={{ color: 'var(--text-primary)' }}>UXStudio is hiring for a UI/UX Designer</span>
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
          </div>
        </div>
      )}
    </div>
  );
}