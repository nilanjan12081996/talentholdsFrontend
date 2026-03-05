'use client';

import { Search, User, FileText, CheckCircle, Clock, ExternalLink } from 'lucide-react';

const stats = [
  { label: 'Total Candidates', value: '300', icon: User, lightColor: 'bg-[#FFECEC]', iconColor: 'text-[#F53D6B]' },
  { label: 'Active Referrals', value: '68', icon: CheckCircle, lightColor: 'bg-[#ECFCE5]', iconColor: 'text-[#25852F]' },
  { label: 'Total Form Created', value: '356', icon: FileText, lightColor: 'bg-[#E5F7FA]', iconColor: 'text-[#00C2E0]' },
  { label: 'Total Candidates Shortlisted', value: '266', icon: Clock, lightColor: 'bg-[#FFF4DE]', iconColor: 'text-[#FFA800]' },
];

const candidates = [
  { name: 'Sarah Chen', role: 'Senior Developer', source: 'Referral', recruiter: 'mbrown@email.com', stage: 'Interview', stageColor: 'bg-[#E6D6FF] text-[#8624F0] dark:bg-[#2d1a4d] dark:text-[#c084fc]' },
  { name: 'Sarah Chen', role: 'Senior Developer', source: 'Applications', recruiter: 'mbrown@email.com', stage: 'Screening', stageColor: 'bg-[#FFF4DE] text-[#FFA800] dark:bg-[#3d2e1a] dark:text-[#fbbf24]' },
  { name: 'Sarah Chen', role: 'Senior Developer', source: 'Referral', recruiter: 'mbrown@email.com', stage: 'Shortlisted', stageColor: 'bg-[#ECFCE5] text-[#25852F] dark:bg-[#1a3d1a] dark:text-[#4ade80]' },
  { name: 'Sarah Chen', role: 'Senior Developer', source: 'Applications', recruiter: 'mbrown@email.com', stage: 'Rejected', stageColor: 'bg-[#FFECEC] text-[#F53D6B] dark:bg-[#3d1a1a] dark:text-[#f87171]' },
  { name: 'Sarah Chen', role: 'Senior Developer', source: 'Applications', recruiter: 'mbrown@email.com', stage: 'Shortlisted', stageColor: 'bg-[#ECFCE5] text-[#25852F] dark:bg-[#1a3d1a] dark:text-[#4ade80]' },
  { name: 'Sarah Chen', role: 'Senior Developer', source: 'Referral', recruiter: 'mbrown@email.com', stage: 'Interview', stageColor: 'bg-[#E6D6FF] text-[#8624F0] dark:bg-[#2d1a4d] dark:text-[#c084fc]' },
  { name: 'Sarah Chen', role: 'Senior Developer', source: 'Applications', recruiter: 'mbrown@email.com', stage: 'Interview', stageColor: 'bg-[#E6D6FF] text-[#8624F0] dark:bg-[#2d1a4d] dark:text-[#c084fc]' },
  { name: 'Sarah Chen', role: 'Senior Developer', source: 'Applications', recruiter: 'mbrown@email.com', stage: 'Interview', stageColor: 'bg-[#E6D6FF] text-[#8624F0] dark:bg-[#2d1a4d] dark:text-[#c084fc]' },
  { name: 'Sarah Chen', role: 'Senior Developer', source: 'Applications', recruiter: 'mbrown@email.com', stage: 'Screening', stageColor: 'bg-[#FFF4DE] text-[#FFA800] dark:bg-[#3d2e1a] dark:text-[#fbbf24]' },
  { name: 'Sarah Chen', role: 'Senior Developer', source: 'Applications', recruiter: 'mbrown@email.com', stage: 'Screening', stageColor: 'bg-[#FFF4DE] text-[#FFA800] dark:bg-[#3d2e1a] dark:text-[#fbbf24]' },
];

const forms = [
  { title: 'Senior Developer Application', role: 'Senior Developer', responses: 45, fields: 12, date: '1/20/2026' },
  { title: 'Senior Developer Application', role: 'Senior Developer', responses: 45, fields: 12, date: '1/20/2026' },
  { title: 'Senior Developer Application', role: 'Senior Developer', responses: 45, fields: 12, date: '1/20/2026' },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
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

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

        {/* Candidates Table */}
        <div className="xl:col-span-2 rounded-[20px] p-6" style={{ background: 'var(--bg-card)' }}>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Recent Candidates</h2>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Recent candidates who haven't progressed yet.</p>
            </div>
            <div className="relative w-full sm:w-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
              <input
                type="text"
                placeholder="Search"
                className="w-full sm:w-[250px] pl-10 pr-4 py-2 rounded-full text-sm outline-none focus:ring-2 ring-purple-100"
                style={{
                  background: 'var(--bg-main)',
                  color: 'var(--text-primary)',
                }}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr
                  className="text-left text-xs uppercase"
                  style={{ color: 'var(--text-secondary)', borderBottom: '1px solid var(--border-color)' }}
                >
                  <th className="pb-4 font-medium pl-2">Candidate</th>
                  <th className="pb-4 font-medium">Role</th>
                  <th className="pb-4 font-medium">Source</th>
                  <th className="pb-4 font-medium">Recruiter</th>
                  <th className="pb-4 font-medium text-right pr-2">Stage</th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((candidate, i) => (
                  <tr
                    key={i}
                    className="transition-colors hover:opacity-80"
                    style={{ borderBottom: '1px solid var(--border-color)' }}
                  >
                    <td className="py-4 pl-2 font-bold" style={{ color: 'var(--text-primary)' }}>{candidate.name}</td>
                    <td className="py-4 font-medium text-sm" style={{ color: 'var(--text-primary)' }}>{candidate.role}</td>
                    <td className="py-4" style={{ color: 'var(--text-primary)' }}>
                      <div className="flex items-center gap-2 text-sm">
                        <CheckCircle size={14} className="text-[#01B574]" />
                        {candidate.source}
                      </div>
                    </td>
                    <td className="py-4 text-sm" style={{ color: 'var(--text-primary)' }}>{candidate.recruiter}</td>
                    <td className="py-4 text-right pr-2">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold inline-block w-[100px] text-center ${candidate.stageColor}`}>
                        {candidate.stage}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Forms */}
        <div className="rounded-[20px] p-6" style={{ background: 'var(--bg-card)' }}>
          <div className="mb-6">
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Recent Forms</h2>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Create and manage application and referral forms</p>
          </div>
          <div className="space-y-4">
            {forms.map((form, i) => (
              <div
                key={i}
                className="rounded-[16px] p-4 hover:shadow-md transition-shadow"
                style={{ border: '1px solid var(--border-color)' }}
              >
                <div className="flex justify-between items-start mb-2 gap-2">
                  <h3 className="font-bold text-sm leading-tight" style={{ color: 'var(--text-primary)' }}>{form.title}</h3>
                  <div className="flex gap-2 shrink-0">
                    <span className="px-2 py-1 bg-[#E6F6FD] dark:bg-[#1a3340] text-[#00A3FF] text-[10px] font-bold rounded">Job Application</span>
                    <span className="px-2 py-1 bg-[#ECFCE5] dark:bg-[#1a3d1a] text-[#25852F] dark:text-[#4ade80] text-[10px] font-bold rounded">Published</span>
                  </div>
                </div>
                <p className="text-xs mb-4" style={{ color: 'var(--text-secondary)' }}>Application form for {form.role} position</p>
                <div className="flex justify-between text-xs font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
                  <div>
                    <span className="font-normal block mb-1" style={{ color: 'var(--text-secondary)' }}>Responses</span>
                    {form.responses}
                  </div>
                  <div>
                    <span className="font-normal block mb-1" style={{ color: 'var(--text-secondary)' }}>Fields</span>
                    {form.fields}
                  </div>
                  <div>
                    <span className="font-normal block mb-1" style={{ color: 'var(--text-secondary)' }}>Last modified</span>
                    {form.date}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="w-full cursor-pointer bg-[#210043] dark:bg-[#6d28d9] text-white rounded-lg py-2.5 text-sm font-bold flex items-center justify-center gap-2 hover:bg-[#340b61] dark:hover:bg-[#7c3aed] transition-colors">
                    Copy Link
                  </button>
                  <button className="p-2.5 border border-[#8624F0] dark:border-[#7c3aed] text-[#8624F0] dark:text-[#a78bfa] rounded-[8px] hover:bg-[#8624F0]/5 transition-colors cursor-pointer">
                    <ExternalLink size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}