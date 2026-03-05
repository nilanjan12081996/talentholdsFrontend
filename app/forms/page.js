'use client';

import { Plus, ExternalLink } from 'lucide-react';
import { useRouter } from 'next/navigation';

const forms = [
  { id: 1, title: 'Senior Developer Application', role: 'Senior Developer', type: 'Job Application', status: 'Published', responses: 45, fields: 12, modified: '1/20/2026' },
  { id: 2, title: 'Senior Developer Application', role: 'Senior Developer', type: 'Job Application', status: 'Published', responses: 45, fields: 12, modified: '1/20/2026' },
  { id: 3, title: 'Senior Developer Application', role: 'Senior Developer', type: 'Job Application', status: 'Published', responses: 45, fields: 12, modified: '1/20/2026' },
  { id: 4, title: 'Senior Developer Application', role: 'Senior Developer', type: 'Job Application', status: 'Published', responses: 45, fields: 12, modified: '1/20/2026' },
  { id: 5, title: 'Senior Developer Application', role: 'Senior Developer', type: 'Job Application', status: 'Published', responses: 45, fields: 12, modified: '1/20/2026' },
  { id: 6, title: 'Senior Developer Application', role: 'Senior Developer', type: 'Job Application', status: 'Published', responses: 45, fields: 12, modified: '1/20/2026' },
  { id: 7, title: 'Senior Developer Application', role: 'Senior Developer', type: 'Job Application', status: 'Published', responses: 45, fields: 12, modified: '1/20/2026' },
  { id: 8, title: 'Senior Developer Application', role: 'Senior Developer', type: 'Job Application', status: 'Published', responses: 45, fields: 12, modified: '1/20/2026' },
  { id: 9, title: 'Senior Developer Application', role: 'Senior Developer', type: 'Job Application', status: 'Published', responses: 45, fields: 12, modified: '1/20/2026' },
];

export default function Forms() {
  const router = useRouter();

  return (
    <div className="space-y-8 rounded-[20px] p-4" style={{ background: 'var(--bg-card)' }}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Forms</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Create and manage application and referral forms</p>
        </div>
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="hidden md:flex items-center text-sm gap-4" style={{ color: 'var(--text-secondary)' }}>
            <span className="text-[#8624F0] font-bold cursor-pointer">All Forms (12)</span>
            <span className="cursor-pointer hover:text-[#8624F0] transition-colors">Referrals (1)</span>
            <span className="cursor-pointer hover:text-[#8624F0] transition-colors">Job Applications (11)</span>
          </div>
          <button
            onClick={() => router.push('/forms/builder')}
            className="bg-[#8624F0] text-white px-6 py-3 rounded-[10px] font-bold flex items-center gap-2 hover:bg-[#6c1dc0] transition-colors whitespace-nowrap ml-auto"
          >
            <Plus size={18} /> Create New Form
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {forms.map((form) => (
          <div
            key={form.id}
            className="rounded-[20px] p-6 shadow-sm hover:shadow-md transition-all"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
            }}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-lg leading-tight max-w-[70%]" style={{ color: 'var(--text-primary)' }}>{form.title}</h3>
              <div className="flex flex-col items-end gap-2">
                <span className="px-3 py-1 bg-[#E6F6FD] dark:bg-[#1a3340] text-[#00A3FF] text-[10px] font-bold rounded-full">{form.type}</span>
                <span className="px-3 py-1 bg-[#ECFCE5] dark:bg-[#1a3d1a] text-[#25852F] dark:text-[#4ade80] text-[10px] font-bold rounded-full">{form.status}</span>
              </div>
            </div>
            <p className="text-xs mb-6" style={{ color: 'var(--text-secondary)' }}>Application form for {form.role} position</p>
            <div className="flex justify-between text-xs font-bold mb-6" style={{ color: 'var(--text-primary)' }}>
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
                {form.modified}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex-1 border border-[#8624F0] text-[#8624F0] py-2.5 rounded-[8px] font-bold text-sm hover:bg-[#8624F0]/5 transition-colors cursor-pointer">
                Edit Form
              </button>
              <button className="flex-[2] bg-[#210043] dark:bg-[#6d28d9] text-white py-2.5 rounded-[8px] font-bold text-sm hover:bg-[#340b61] dark:hover:bg-[#7c3aed] transition-colors cursor-pointer">
                Copy Link
              </button>
              <button className="p-2.5 border border-[#8624F0] text-[#8624F0] rounded-[8px] hover:bg-[#8624F0]/5 transition-colors cursor-pointer">
                <ExternalLink size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}