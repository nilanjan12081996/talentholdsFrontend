'use client';

import { Search, Paperclip, Send, ChevronDown, Archive, Filter, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import clsx from 'clsx';

const users = [
  { id: 1, name: 'Soumalya Chandra', role: 'UI Designer Job Recruitment', message: 'Thanks for applying, Soumalya! What...', fullMessage: 'Thanks for applying, Soumalya! What would be a good time to chat?', time: '7:01 PM', initials: 'S', color: 'bg-[#25852F]', email: 'Example07@gmail.com', phone: '+917234565890', created: '30 Jan, 7:00 PM', status: 'Shortlisted' },
  { id: 2, name: 'Sarah Chen', role: 'Senior React Developer', message: 'I am available for an interview on...', fullMessage: 'I am available for an interview on Monday at 10 AM.', time: 'Yesterday', initials: 'S', color: 'bg-[#FF5630]', email: 'sarah.chen@example.com', phone: '+1234567890', created: '29 Jan, 2:30 PM', status: 'Interview' },
  { id: 3, name: 'Michael Brown', role: 'Product Manager', message: 'Can you please send me the...', fullMessage: 'Can you please send me the updated requirements document?', time: 'Yesterday', initials: 'M', color: 'bg-[#FFAB00]', email: 'm.brown@example.com', phone: '+1987654321', created: '28 Jan, 11:15 AM', status: 'Screening' },
];

export default function Inbox() {
  const [selectedId, setSelectedId] = useState(1);
  const [mobileView, setMobileView] = useState('list');

  const selectedUser = users.find(u => u.id === selectedId) || users[0];

  return (
    <div
      className="h-[calc(100vh-140px)] flex rounded-[20px] overflow-hidden shadow-sm relative"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
    >
      {/* Left: Messages List */}
      <div
        className={clsx(
          "w-full md:w-[280px] lg:w-[340px] flex flex-col shrink-0 absolute md:relative z-10 h-full transition-transform duration-300",
          mobileView === 'list' ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        )}
        style={{ background: 'var(--bg-card)', borderRight: '1px solid var(--border-color)' }}
      >
        <div className="p-6" style={{ borderBottom: '1px solid var(--border-color)' }}>
          <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Messages</h2>
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <button
                className="w-full flex justify-between items-center px-3 py-2 rounded-[6px] text-sm hover:border-[#8624F0] transition-colors"
                style={{ border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-secondary)' }}
              >
                All Forms <ChevronDown size={16} />
              </button>
            </div>
            <button
              className="w-[40px] flex items-center justify-center rounded-[6px] hover:text-[#8624F0] hover:border-[#8624F0] transition-colors"
              style={{ border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
            >
              <Search size={18} />
            </button>
            <button
              className="w-[40px] flex items-center justify-center rounded-[6px] hover:text-[#8624F0] hover:border-[#8624F0] transition-colors"
              style={{ border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
            >
              <Filter size={18} />
            </button>
          </div>
          <div className="flex items-center gap-2 text-sm pl-1 cursor-pointer hover:text-[#8624F0] transition-colors" style={{ color: 'var(--text-secondary)' }}>
            <Archive size={14} /> <span>Archived</span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => { setSelectedId(user.id); setMobileView('chat'); }}
              className={clsx(
                "p-4 flex items-start gap-3 cursor-pointer transition-colors border-l-4",
                selectedId === user.id ? "border-[#8624F0]" : "border-transparent"
              )}
              style={{
                background: selectedId === user.id ? 'var(--bg-main)' : 'var(--bg-card)',
              }}
            >
              <div className={clsx("w-[42px] h-[42px] rounded-full text-white flex items-center justify-center font-medium shrink-0 text-lg", user.color)}>
                {user.initials}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold truncate text-[16px]" style={{ color: 'var(--text-primary)' }}>{user.name}</h3>
                <p className="text-[12px] truncate leading-tight" style={{ color: 'var(--text-secondary)' }}>
                  {user.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Middle: Chat Area */}
      <div
        className={clsx(
          "flex-1 flex flex-col min-w-0 absolute md:relative z-0 h-full w-full md:w-auto transition-transform duration-300",
          mobileView === 'chat' || mobileView === 'details' ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
        )}
        style={{ background: 'var(--bg-card)' }}
      >
        <div
          className="h-[80px] flex items-center justify-between px-6 shrink-0"
          style={{ borderBottom: '1px solid var(--border-color)', background: 'var(--bg-card)' }}
        >
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileView('list')} className="md:hidden mr-2" style={{ color: 'var(--text-primary)' }}>
              <ArrowLeft size={20} />
            </button>
            <h2 className="text-xl font-bold truncate" style={{ color: 'var(--text-primary)' }}>{selectedUser.name}</h2>
          </div>
          <span className="bg-[#f7efff] dark:bg-[#2d1a4d] text-[#8624f0] dark:text-[#c084fc] text-[12px] px-3 py-0.5 rounded-[8px] truncate">
            {selectedUser.role}
          </span>
        </div>

        <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-6" style={{ background: 'var(--bg-card)' }}>
          <div className="flex justify-center">
            <span className="bg-[#f7efff] dark:bg-[#2d1a4d] text-[#8624f0] dark:text-[#c084fc] text-[12px] px-4 py-1 rounded-[8px]">Today</span>
          </div>
          <div className="self-end max-w-[85%] md:max-w-[70%]">
            <div className="bg-[#2a0058] text-white p-4 rounded-t-[6px] rounded-bl-[6px] text-[13px] leading-relaxed">
              <p>{selectedUser.fullMessage}</p>
            </div>
            <div className="flex items-center justify-end gap-1 mt-1">
              <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>7:01 PM</span>
            </div>
          </div>
        </div>

        <div className="p-6 shrink-0 flex items-center gap-4">
          <div
            className="w-[42px] h-[42px] rounded-full hidden md:flex items-center justify-center text-white font-bold text-lg shrink-0"
            style={{ background: 'linear-gradient(90deg, #A90C85 0%, #F52156 19%, #FC561C 61%, #F7360E 91%)' }}
          >
            I
          </div>
          <div
            className="flex-1 rounded-[4px] w-full h-[50px] flex items-center px-4 gap-3 shadow-sm"
            style={{ border: '1px solid var(--border-color)', background: 'var(--bg-card)' }}
          >
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 bg-transparent outline-none text-sm w-full "
              style={{ color: 'var(--text-primary)' }}
            />
            <button className="hover:text-[#2B3674] transition-colors" style={{ color: 'var(--text-secondary)' }}>
              <Paperclip size={20} />
            </button>
            <button className="w-[34px] h-[34px] rounded-[3px] bg-[#8624F0] text-white flex items-center justify-center hover:bg-[#6c1dc0] transition-colors shrink-0">
              <Send size={16} className="ml-0.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Right: Profile Details */}
      <div
        className="hidden xl:flex w-[350px] flex-col p-6 overflow-y-auto shrink-0"
        style={{ background: 'var(--bg-card)', borderLeft: '1px solid var(--border-color)' }}
      >
        <div className="flex flex-col items-center mb-6">
          <div className={clsx("w-[80px] h-[80px] rounded-full text-white flex items-center justify-center text-3xl font-medium mb-4 relative", selectedUser.color)}>
            {selectedUser.initials}
            <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'var(--bg-card)' }}>
              <div className="w-4 h-4 bg-[#01B574] rounded-full border-2" style={{ borderColor: 'var(--bg-card)' }}></div>
            </div>
          </div>
          <h3 className="font-bold text-xl" style={{ color: 'var(--text-primary)' }}>{selectedUser.name}</h3>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{selectedUser.email}</p>
        </div>

        <div className="w-full relative mb-8">
          <button className="w-full bg-[#210043] dark:bg-[#6d28d9] text-white h-[40px] rounded-[8px] text-sm font-semibold flex justify-center items-center gap-2 px-4 relative hover:bg-[#340b61] dark:hover:bg-[#7c3aed] transition-colors">
            <span className="absolute left-1/2 -translate-x-1/2">{selectedUser.status}</span>
            <ChevronDown size={16} className="absolute right-4" />
          </button>
        </div>

        <div className="flex mb-6" style={{ borderBottom: '1px solid var(--border-color)' }}>
          <button className="flex-1 pb-3 border-b-2 border-[#181059] dark:border-[#8624F0] font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Overview</button>
          <button className="flex-1 pb-3 font-medium text-sm border-b-2 border-transparent hover:border-gray-200 transition-colors" style={{ color: 'var(--text-secondary)' }}>Feedback</button>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-medium mb-3" style={{ color: 'var(--text-primary)' }}>Comments</h4>
            <div className="flex gap-3 items-center">
              <div className="w-[28px] h-[28px] rounded-full bg-[#25852F] text-white text-xs flex items-center justify-center shrink-0">S</div>
              <input
                type="text"
                placeholder="Add a comment..."
                className="text-xs w-full outline-none border-b border-transparent focus:border-gray-200 py-1 bg-transparent"
                style={{ color: 'var(--text-secondary)' }}
              />
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Created</h4>
            <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{selectedUser.created}</div>
          </div>
          <div>
            <h4 className="text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Phone Number</h4>
            <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{selectedUser.phone}</div>
          </div>
        </div>
      </div>
    </div>
  );
}