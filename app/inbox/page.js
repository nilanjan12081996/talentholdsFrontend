// 'use client';

// import { Search, Paperclip, Send, ChevronDown, Archive, Filter, ArrowLeft } from 'lucide-react';
// import { useState } from 'react';
// import clsx from 'clsx';

// const users = [
//   { id: 1, name: 'Soumalya Chandra', role: 'UI Designer Job Recruitment', message: 'Thanks for applying, Soumalya! What...', fullMessage: 'Thanks for applying, Soumalya! What would be a good time to chat?', time: '7:01 PM', initials: 'S', color: 'bg-[#25852F]', email: 'Example07@gmail.com', phone: '+917234565890', created: '30 Jan, 7:00 PM', status: 'Shortlisted' },
//   { id: 2, name: 'Sarah Chen', role: 'Senior React Developer', message: 'I am available for an interview on...', fullMessage: 'I am available for an interview on Monday at 10 AM.', time: 'Yesterday', initials: 'S', color: 'bg-[#FF5630]', email: 'sarah.chen@example.com', phone: '+1234567890', created: '29 Jan, 2:30 PM', status: 'Interview' },
//   { id: 3, name: 'Michael Brown', role: 'Product Manager', message: 'Can you please send me the...', fullMessage: 'Can you please send me the updated requirements document?', time: 'Yesterday', initials: 'M', color: 'bg-[#FFAB00]', email: 'm.brown@example.com', phone: '+1987654321', created: '28 Jan, 11:15 AM', status: 'Screening' },
// ];

// export default function Inbox() {
//   const [selectedId, setSelectedId] = useState(1);
//   const [mobileView, setMobileView] = useState('list');

//   const selectedUser = users.find(u => u.id === selectedId) || users[0];

//   return (
//     <div
//       className="h-[calc(100vh-140px)] flex rounded-[20px] overflow-hidden shadow-sm relative"
//       style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
//     >
//       {/* Left: Messages List */}
//       <div
//         className={clsx(
//           "w-full md:w-[280px] lg:w-[340px] flex flex-col shrink-0 absolute md:relative z-10 h-full transition-transform duration-300",
//           mobileView === 'list' ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
//         )}
//         style={{ background: 'var(--bg-card)', borderRight: '1px solid var(--border-color)' }}
//       >
//         <div className="p-6" style={{ borderBottom: '1px solid var(--border-color)' }}>
//           <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Messages</h2>
//           <div className="flex gap-2 mb-4">
//             <div className="relative flex-1">
//               <button
//                 className="w-full flex justify-between items-center px-3 py-2 rounded-[6px] text-sm hover:border-[#8624F0] transition-colors"
//                 style={{ border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-secondary)' }}
//               >
//                 All Forms <ChevronDown size={16} />
//               </button>
//             </div>
//             <button
//               className="w-[40px] flex items-center justify-center rounded-[6px] hover:text-[#8624F0] hover:border-[#8624F0] transition-colors"
//               style={{ border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
//             >
//               <Search size={18} />
//             </button>
//             <button
//               className="w-[40px] flex items-center justify-center rounded-[6px] hover:text-[#8624F0] hover:border-[#8624F0] transition-colors"
//               style={{ border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
//             >
//               <Filter size={18} />
//             </button>
//           </div>
//           <div className="flex items-center gap-2 text-sm pl-1 cursor-pointer hover:text-[#8624F0] transition-colors" style={{ color: 'var(--text-secondary)' }}>
//             <Archive size={14} /> <span>Archived</span>
//           </div>
//         </div>

//         <div className="flex-1 overflow-y-auto">
//           {users.map((user) => (
//             <div
//               key={user.id}
//               onClick={() => { setSelectedId(user.id); setMobileView('chat'); }}
//               className={clsx(
//                 "p-4 flex items-start gap-3 cursor-pointer transition-colors border-l-4",
//                 selectedId === user.id ? "border-[#8624F0]" : "border-transparent"
//               )}
//               style={{
//                 background: selectedId === user.id ? 'var(--bg-main)' : 'var(--bg-card)',
//               }}
//             >
//               <div className={clsx("w-[42px] h-[42px] rounded-full text-white flex items-center justify-center font-medium shrink-0 text-lg", user.color)}>
//                 {user.initials}
//               </div>
//               <div className="flex-1 min-w-0">
//                 <h3 className="font-bold truncate text-[16px]" style={{ color: 'var(--text-primary)' }}>{user.name}</h3>
//                 <p className="text-[12px] truncate leading-tight" style={{ color: 'var(--text-secondary)' }}>
//                   {user.message}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Middle: Chat Area */}
//       <div
//         className={clsx(
//           "flex-1 flex flex-col min-w-0 absolute md:relative z-0 h-full w-full md:w-auto transition-transform duration-300",
//           mobileView === 'chat' || mobileView === 'details' ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
//         )}
//         style={{ background: 'var(--bg-card)' }}
//       >
//         <div
//           className="h-[80px] flex items-center justify-between px-6 shrink-0"
//           style={{ borderBottom: '1px solid var(--border-color)', background: 'var(--bg-card)' }}
//         >
//           <div className="flex items-center gap-3">
//             <button onClick={() => setMobileView('list')} className="md:hidden mr-2" style={{ color: 'var(--text-primary)' }}>
//               <ArrowLeft size={20} />
//             </button>
//             <h2 className="text-xl font-bold truncate" style={{ color: 'var(--text-primary)' }}>{selectedUser.name}</h2>
//           </div>
//           <span className="bg-[#f7efff] dark:bg-[#2d1a4d] text-[#8624f0] dark:text-[#c084fc] text-[12px] px-3 py-0.5 rounded-[8px] truncate">
//             {selectedUser.role}
//           </span>
//         </div>

//         <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-6" style={{ background: 'var(--bg-card)' }}>
//           <div className="flex justify-center">
//             <span className="bg-[#f7efff] dark:bg-[#2d1a4d] text-[#8624f0] dark:text-[#c084fc] text-[12px] px-4 py-1 rounded-[8px]">Today</span>
//           </div>
//           <div className="self-end max-w-[85%] md:max-w-[70%]">
//             <div className="bg-[#2a0058] text-white p-4 rounded-t-[6px] rounded-bl-[6px] text-[13px] leading-relaxed">
//               <p>{selectedUser.fullMessage}</p>
//             </div>
//             <div className="flex items-center justify-end gap-1 mt-1">
//               <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>7:01 PM</span>
//             </div>
//           </div>
//         </div>

//         <div className="p-6 shrink-0 flex items-center gap-4">
//           <div
//             className="w-[42px] h-[42px] rounded-full hidden md:flex items-center justify-center text-white font-bold text-lg shrink-0"
//             style={{ background: 'linear-gradient(90deg, #A90C85 0%, #F52156 19%, #FC561C 61%, #F7360E 91%)' }}
//           >
//             I
//           </div>
//           <div
//             className="flex-1 rounded-[4px] w-full h-[50px] flex items-center px-4 gap-3 shadow-sm"
//             style={{ border: '1px solid var(--border-color)', background: 'var(--bg-card)' }}
//           >
//             <input
//               type="text"
//               placeholder="Type your message..."
//               className="flex-1 bg-transparent outline-none text-sm w-full "
//               style={{ color: 'var(--text-primary)' }}
//             />
//             <button className="hover:text-[#2B3674] transition-colors" style={{ color: 'var(--text-secondary)' }}>
//               <Paperclip size={20} />
//             </button>
//             <button className="w-[34px] h-[34px] rounded-[3px] bg-[#8624F0] text-white flex items-center justify-center hover:bg-[#6c1dc0] transition-colors shrink-0">
//               <Send size={16} className="ml-0.5" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Right: Profile Details */}
//       <div
//         className="hidden xl:flex w-[350px] flex-col p-6 overflow-y-auto shrink-0"
//         style={{ background: 'var(--bg-card)', borderLeft: '1px solid var(--border-color)' }}
//       >
//         <div className="flex flex-col items-center mb-6">
//           <div className={clsx("w-[80px] h-[80px] rounded-full text-white flex items-center justify-center text-3xl font-medium mb-4 relative", selectedUser.color)}>
//             {selectedUser.initials}
//             <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'var(--bg-card)' }}>
//               <div className="w-4 h-4 bg-[#01B574] rounded-full border-2" style={{ borderColor: 'var(--bg-card)' }}></div>
//             </div>
//           </div>
//           <h3 className="font-bold text-xl" style={{ color: 'var(--text-primary)' }}>{selectedUser.name}</h3>
//           <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{selectedUser.email}</p>
//         </div>

//         <div className="w-full relative mb-8">
//           <button className="w-full bg-[#210043] dark:bg-[#6d28d9] text-white h-[40px] rounded-[8px] text-sm font-semibold flex justify-center items-center gap-2 px-4 relative hover:bg-[#340b61] dark:hover:bg-[#7c3aed] transition-colors">
//             <span className="absolute left-1/2 -translate-x-1/2">{selectedUser.status}</span>
//             <ChevronDown size={16} className="absolute right-4" />
//           </button>
//         </div>

//         <div className="flex mb-6" style={{ borderBottom: '1px solid var(--border-color)' }}>
//           <button className="flex-1 pb-3 border-b-2 border-[#181059] dark:border-[#8624F0] font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Overview</button>
//           <button className="flex-1 pb-3 font-medium text-sm border-b-2 border-transparent hover:border-gray-200 transition-colors" style={{ color: 'var(--text-secondary)' }}>Feedback</button>
//         </div>

//         <div className="space-y-6">
//           <div>
//             <h4 className="text-sm font-medium mb-3" style={{ color: 'var(--text-primary)' }}>Comments</h4>
//             <div className="flex gap-3 items-center">
//               <div className="w-[28px] h-[28px] rounded-full bg-[#25852F] text-white text-xs flex items-center justify-center shrink-0">S</div>
//               <input
//                 type="text"
//                 placeholder="Add a comment..."
//                 className="text-xs w-full outline-none border-b border-transparent focus:border-gray-200 py-1 bg-transparent"
//                 style={{ color: 'var(--text-secondary)' }}
//               />
//             </div>
//           </div>
//           <div>
//             <h4 className="text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Created</h4>
//             <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{selectedUser.created}</div>
//           </div>
//           <div>
//             <h4 className="text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Phone Number</h4>
//             <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>{selectedUser.phone}</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// 'use client';

// import { Search, Paperclip, Send, ChevronDown, Archive, Filter, ArrowLeft } from 'lucide-react';
// import { useState, useEffect, useRef } from 'react';
// import clsx from 'clsx';
// import axios from 'axios';
// import SockJS from 'sockjs-client';
// import { Client } from '@stomp/stompjs';

// // 1. Environment Variables Setup
// // API_BASE will be: http://localhost:8087/api/inbox/candidate
// const API_BASE = `${process.env.NEXT_PUBLIC_API_BASE_URL}/inbox/candidate`;

// // Safely derive the WebSocket URL by removing '/api' from the base URL
// const SOCKET_URL = process.env.NEXT_PUBLIC_API_BASE_URL 
//   ? process.env.NEXT_PUBLIC_API_BASE_URL.replace('/api', '') + '/ws-chat'
//   : "http://localhost:8087/ws-chat";

// // Hardcoded for this view (You can replace this with Redux state later)
// const WORKSPACE_ID = 1; 

// export default function Inbox() {
//   const [mobileView, setMobileView] = useState('list'); // 'list' | 'chat' | 'details'
  
//   // Real-time API States
//   const [threads, setThreads] = useState([]);
//   const [activeThread, setActiveThread] = useState(null);
//   const [messages, setMessages] = useState([]);
//   const [inputText, setInputText] = useState('');
  
//   // Refs to avoid stale closures inside WebSocket callbacks
//   const stompClientRef = useRef(null);
//   const activeGroupIdRef = useRef(null);
//   const messagesEndRef = useRef(null);

//   // 1. Keep the ref perfectly in sync with the active chat
//   useEffect(() => {
//     activeGroupIdRef.current = activeThread?.messageGroupId;
//   }, [activeThread]);

//   // 2. Initial Data Load & WebSocket Connection Setup
//   useEffect(() => {
//     // Fetch Sidebar Threads
//     const fetchThreads = async () => {
//       try {
//         const res = await axios.get(`${API_BASE}/threads/${WORKSPACE_ID}`);
//         if (res.data.status) {
//           setThreads(res.data.data || []);
//           if (res.data.data?.length > 0) {
//             setActiveThread(res.data.data[0]); // Auto-select first thread on load
//           }
//         }
//       } catch (err) {
//         console.error("Failed to load threads", err);
//       }
//     };
//     fetchThreads();

//     // Setup WebSocket
//     const socket = new SockJS(SOCKET_URL);
//     const stompClient = new Client({
//       webSocketFactory: () => socket,
//       debug: () => {}, // Disable spammy console logs
//       onConnect: () => {
//         console.log('Socket Connected Successfully!');
//         // Subscribe to Workspace Topic
//         stompClient.subscribe(`/topic/workspace/${WORKSPACE_ID}`, (message) => {
//           const newMsg = JSON.parse(message.body);
//           handleIncomingSocketMessage(newMsg);
//         });
//       },
//       onStompError: (err) => console.error('STOMP Error:', err),
//     });

//     stompClient.activate();
//     stompClientRef.current = stompClient;

//     // Cleanup on unmount
//     return () => {
//       stompClient.deactivate(); 
//     };
//   }, []);

//   // 3. Fetch Message History when the active thread changes
//   useEffect(() => {
//     if (!activeThread) return;
    
//     const fetchHistory = async () => {
//       try {
//         const res = await axios.get(`${API_BASE}/history/${activeThread.messageGroupId}`);
//         if (res.data.status) {
//           setMessages(res.data.data || []);
//         }
//       } catch (err) {
//         console.error("Failed to load history", err);
//       }
//     };
//     fetchHistory();
//   }, [activeThread]);

//   // 4. Auto-scroll to the bottom of messages
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [messages]);

//   // 5. Handle Incoming WebSocket Messages (The Real-Time Magic)
//   const handleIncomingSocketMessage = (newMsg) => {
//     // A. If the message belongs to the currently open chat, append it to the UI
//     if (activeGroupIdRef.current === newMsg.messageGroupId) {
//       setMessages((prev) => [...prev, newMsg]);
//     }

//     // B. Reorder sidebar threads (move to top) and update preview text
//     setThreads((prevThreads) => {
//       const index = prevThreads.findIndex((c) => c.messageGroupId === newMsg.messageGroupId);
//       let updatedThreads = [...prevThreads];
      
//       if (index !== -1) {
//         const chatToMove = updatedThreads.splice(index, 1)[0];
//         chatToMove.latestMessageContent = newMsg.content;
//         chatToMove.latestMessageTime = newMsg.sentAt;
//         updatedThreads.unshift(chatToMove);
//       } else {
//         // A brand new candidate started chatting!
//         updatedThreads.unshift({
//           messageGroupId: newMsg.messageGroupId,
//           workspaceId: newMsg.workspaceId,
//           formId: newMsg.formId || 1,
//           candidateEmail: newMsg.candidateEmail || "New Candidate",
//           candidateName: newMsg.candidateName || "New Candidate",
//           latestMessageContent: newMsg.content,
//           sentAt: newMsg.sentAt
//         });
//       }
//       return updatedThreads;
//     });
//   };

//   // 6. Send Message HTTP Request
//   const handleSendMessage = async () => {
//     if (!inputText.trim() || !activeThread) return;

//     const payload = {
//       candidateEmail: activeThread.candidateEmail,
//       messageBody: inputText.trim(),
//       workspaceId: WORKSPACE_ID,
//       formId: activeThread.formId
//     };

//     setInputText(''); // Clear UI instantly for good UX

//     try {
//       const res = await axios.post(`${API_BASE}/reply`, payload);
//       if (!res.data.status) {
//         alert("Failed to send message: " + (res.data.message || "Error"));
//       }
//       // Note: We don't manually push to 'messages' array here because the Java backend 
//       // will instantly broadcast it back via WebSocket, triggering handleIncomingSocketMessage.
//     } catch (err) {
//       console.error("Error sending message", err);
//     }
//   };

//   // Handle Enter Key for sending
//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   // UI Helper Functions
//   const getInitials = (name) => name ? name.substring(0, 2).toUpperCase() : 'U';
//   const formatTime = (isoString) => {
//     if (!isoString) return '';
//     return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//   };
//   const formatDate = (isoString) => {
//     if (!isoString) return '';
//     return new Date(isoString).toLocaleDateString([], { day: '2-digit', month: 'short', year: 'numeric' });
//   };

//   return (
//     <div
//       className="h-[calc(100vh-140px)] flex rounded-[20px] overflow-hidden shadow-sm relative"
//       style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
//     >
//       {/* Left: Messages List (Sidebar) */}
//       <div
//         className={clsx(
//           "w-full md:w-[280px] lg:w-[340px] flex flex-col shrink-0 absolute md:relative z-10 h-full transition-transform duration-300",
//           mobileView === 'list' ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
//         )}
//         style={{ background: 'var(--bg-card)', borderRight: '1px solid var(--border-color)' }}
//       >
//         <div className="p-6" style={{ borderBottom: '1px solid var(--border-color)' }}>
//           <h2 className="text-xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Messages</h2>
//           <div className="flex gap-2 mb-4">
//             <div className="relative flex-1">
//               <button
//                 className="w-full flex justify-between items-center px-3 py-2 rounded-[6px] text-sm hover:border-[#8624F0] transition-colors"
//                 style={{ border: '1px solid var(--border-color)', background: 'var(--bg-card)', color: 'var(--text-secondary)' }}
//               >
//                 All Forms <ChevronDown size={16} />
//               </button>
//             </div>
//             <button
//               className="w-[40px] flex items-center justify-center rounded-[6px] hover:text-[#8624F0] hover:border-[#8624F0] transition-colors"
//               style={{ border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
//             >
//               <Search size={18} />
//             </button>
//             <button
//               className="w-[40px] flex items-center justify-center rounded-[6px] hover:text-[#8624F0] hover:border-[#8624F0] transition-colors"
//               style={{ border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
//             >
//               <Filter size={18} />
//             </button>
//           </div>
//           <div className="flex items-center gap-2 text-sm pl-1 cursor-pointer hover:text-[#8624F0] transition-colors" style={{ color: 'var(--text-secondary)' }}>
//             <Archive size={14} /> <span>Archived</span>
//           </div>
//         </div>

//         {/* Real-time Thread List */}
//         <div className="flex-1 overflow-y-auto">
//           {threads.length === 0 && (
//              <p className="p-6 text-center text-sm" style={{ color: 'var(--text-secondary)' }}>No messages found.</p>
//           )}
//           {threads.map((thread) => {
//             const displayName = thread.candidateName || thread.candidateEmail;
//             const isActive = activeThread?.messageGroupId === thread.messageGroupId;

//             return (
//               <div
//                 key={thread.messageGroupId}
//                 onClick={() => { setActiveThread(thread); setMobileView('chat'); }}
//                 className={clsx(
//                   "p-4 flex items-start gap-3 cursor-pointer transition-colors border-l-4",
//                   isActive ? "border-[#8624F0]" : "border-transparent"
//                 )}
//                 style={{ background: isActive ? 'var(--bg-main)' : 'var(--bg-card)' }}
//               >
//                 <div className="w-[42px] h-[42px] rounded-full text-white flex items-center justify-center font-medium shrink-0 text-lg bg-[#8624F0]">
//                   {getInitials(displayName)}
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <div className="flex justify-between items-center mb-1">
//                     <h3 className="font-bold truncate text-[16px]" style={{ color: 'var(--text-primary)' }}>{displayName}</h3>
//                   </div>
//                   <p className="text-[12px] truncate leading-tight" style={{ color: 'var(--text-secondary)' }}>
//                     {thread.latestMessageContent || "No messages yet"}
//                   </p>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* Middle: Chat Area */}
//       {activeThread ? (
//         <div
//           className={clsx(
//             "flex-1 flex flex-col min-w-0 absolute md:relative z-0 h-full w-full md:w-auto transition-transform duration-300",
//             mobileView === 'chat' || mobileView === 'details' ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
//           )}
//           style={{ background: 'var(--bg-card)' }}
//         >
//           {/* Chat Header */}
//           <div
//             className="h-[80px] flex items-center justify-between px-6 shrink-0"
//             style={{ borderBottom: '1px solid var(--border-color)', background: 'var(--bg-card)' }}
//           >
//             <div className="flex items-center gap-3">
//               <button onClick={() => setMobileView('list')} className="md:hidden mr-2" style={{ color: 'var(--text-primary)' }}>
//                 <ArrowLeft size={20} />
//               </button>
//               <h2 className="text-xl font-bold truncate" style={{ color: 'var(--text-primary)' }}>
//                 {activeThread.candidateName || activeThread.candidateEmail}
//               </h2>
//             </div>
//             <span className="bg-[#f7efff] dark:bg-[#2d1a4d] text-[#8624f0] dark:text-[#c084fc] text-[12px] px-3 py-0.5 rounded-[8px] truncate">
//               {activeThread.formId ? `Form #${activeThread.formId}` : 'Application'}
//             </span>
//           </div>

//           {/* Chat Messages */}
//           <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-6" style={{ background: 'var(--bg-card)' }}>
//             {messages.length === 0 && (
//                <div className="flex-1 flex items-center justify-center">
//                  <p style={{ color: 'var(--text-secondary)' }}>Send a message to start the conversation.</p>
//                </div>
//             )}
            
//             {messages.map((msg, idx) => {
//               // Adjust this condition based on how your backend identifies the sender. 
//               // Using the prototype's logic: 'CANDIDATE' is the other person.
//               const isCandidate = msg.senderType === 'CANDIDATE';
              
//               return (
//                 <div key={idx} className={clsx("max-w-[85%] md:max-w-[70%] flex flex-col", isCandidate ? "self-start" : "self-end items-end")}>
//                   <div 
//                     className={clsx(
//                       "p-4 text-[13px] leading-relaxed shadow-sm", 
//                       isCandidate 
//                         ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-t-[12px] rounded-br-[12px]" // Left Bubble (Candidate)
//                         : "bg-[#2a0058] dark:bg-[#8624F0] text-white rounded-t-[12px] rounded-bl-[12px]" // Right Bubble (Recruiter)
//                     )}
//                   >
//                     <p>{msg.content}</p>
//                   </div>
//                   <div className="flex items-center gap-1 mt-1">
//                     <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>{formatTime(msg.sentAt)}</span>
//                   </div>
//                 </div>
//               );
//             })}
//             <div ref={messagesEndRef} /> {/* Invisible element to force scroll to bottom */}
//           </div>

//           {/* Chat Input Box */}
//           <div className="p-6 shrink-0 flex items-center gap-4">
//             <div
//               className="flex-1 rounded-[4px] w-full h-[50px] flex items-center px-4 gap-3 shadow-sm"
//               style={{ border: '1px solid var(--border-color)', background: 'var(--bg-card)' }}
//             >
//               <input
//                 type="text"
//                 placeholder="Type your message..."
//                 value={inputText}
//                 onChange={(e) => setInputText(e.target.value)}
//                 onKeyDown={handleKeyDown}
//                 className="flex-1 bg-transparent outline-none text-sm w-full"
//                 style={{ color: 'var(--text-primary)' }}
//               />
//               <button className="hover:text-[#2B3674] transition-colors" style={{ color: 'var(--text-secondary)' }}>
//                 <Paperclip size={20} />
//               </button>
//               <button 
//                 onClick={handleSendMessage}
//                 disabled={!inputText.trim()}
//                 className="w-[34px] h-[34px] rounded-[3px] bg-[#8624F0] text-white flex items-center justify-center hover:bg-[#6c1dc0] transition-colors shrink-0 disabled:opacity-50"
//               >
//                 <Send size={16} className="ml-0.5" />
//               </button>
//             </div>
//           </div>
//         </div>
//       ) : (
//         /* Empty State when no thread is selected */
//         <div className="flex-1 hidden md:flex items-center justify-center" style={{ background: 'var(--bg-card)' }}>
//            <p style={{ color: 'var(--text-secondary)' }}>Select a candidate from the left to start chatting</p>
//         </div>
//       )}

//       {/* Right: Profile Details */}
//       {activeThread && (
//         <div
//           className="hidden xl:flex w-[350px] flex-col p-6 overflow-y-auto shrink-0"
//           style={{ background: 'var(--bg-card)', borderLeft: '1px solid var(--border-color)' }}
//         >
//           <div className="flex flex-col items-center mb-6">
//             <div className="w-[80px] h-[80px] rounded-full text-white flex items-center justify-center text-3xl font-medium mb-4 relative bg-[#8624F0]">
//               {getInitials(activeThread.candidateName || activeThread.candidateEmail)}
//               <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'var(--bg-card)' }}>
//                 <div className="w-4 h-4 bg-[#01B574] rounded-full border-2" style={{ borderColor: 'var(--bg-card)' }}></div>
//               </div>
//             </div>
//             <h3 className="font-bold text-xl text-center" style={{ color: 'var(--text-primary)' }}>
//               {activeThread.candidateName || "Candidate"}
//             </h3>
//             <p className="text-sm mt-1 text-center" style={{ color: 'var(--text-secondary)' }}>
//               {activeThread.candidateEmail}
//             </p>
//           </div>

//           <div className="w-full relative mb-8">
//             <button className="w-full bg-[#210043] dark:bg-[#6d28d9] text-white h-[40px] rounded-[8px] text-sm font-semibold flex justify-center items-center gap-2 px-4 relative hover:bg-[#340b61] dark:hover:bg-[#7c3aed] transition-colors">
//               <span className="absolute left-1/2 -translate-x-1/2">Active</span>
//             </button>
//           </div>

//           <div className="flex mb-6" style={{ borderBottom: '1px solid var(--border-color)' }}>
//             <button className="flex-1 pb-3 border-b-2 border-[#181059] dark:border-[#8624F0] font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Overview</button>
//             <button className="flex-1 pb-3 font-medium text-sm border-b-2 border-transparent hover:border-gray-200 transition-colors" style={{ color: 'var(--text-secondary)' }}>Feedback</button>
//           </div>

//           <div className="space-y-6">
//             <div>
//               <h4 className="text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Latest Message</h4>
//               <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
//                 {formatDate(activeThread.latestMessageTime)} at {formatTime(activeThread.latestMessageTime)}
//               </div>
//             </div>
//             <div>
//               <h4 className="text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Form Context</h4>
//               <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
//                 {activeThread.formId ? `Submitted via Form ID: ${activeThread.formId}` : "Direct Application"}
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }












'use client';

import { Search, Paperclip, Send, ChevronDown, Archive, Filter, ArrowLeft } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import clsx from 'clsx';
import axios from 'axios';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { useDispatch, useSelector } from 'react-redux';
import WorkspaceModal from '../forms/WorkspaceModal';

// Import your WorkspaceModal (Adjust path if needed)


// 1. Environment Variables Setup
const API_BASE = `${process.env.NEXT_PUBLIC_API_BASE_URL}/inbox/candidate`;

// Safely derive the WebSocket URL
const SOCKET_URL = process.env.NEXT_PUBLIC_API_BASE_URL 
  ? process.env.NEXT_PUBLIC_API_BASE_URL.replace('/api', '') + '/ws-chat'
  : "http://localhost:8087/ws-chat";


export default function Inbox() {
  const dispatch = useDispatch();
  const [mobileView, setMobileView] = useState('list'); // 'list' | 'chat' | 'details'
  
  // --- NEW WORKSPACE STATES ---
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const [showWorkspaceModal, setShowWorkspaceModal] = useState(true); // Open by default
  const { workspaceData } = useSelector((state) => state?.auth || {});

  // Real-time API States
  const [threads, setThreads] = useState([]);
  const [activeThread, setActiveThread] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  
  // Refs to avoid stale closures inside WebSocket callbacks
  const stompClientRef = useRef(null);
  const activeGroupIdRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Keep the ref perfectly in sync with the active chat
  useEffect(() => {
    activeGroupIdRef.current = activeThread?.messageGroupId;
  }, [activeThread]);


  // --- UPDATED: Initial Data Load & WebSocket Connection Setup ---
  // Now relies on `selectedWorkspace`
  useEffect(() => {
    if (!selectedWorkspace) return; // Wait until workspace is selected!

    // Fetch Sidebar Threads
    const fetchThreads = async () => {
      try {
        const res = await axios.get(`${API_BASE}/threads/${selectedWorkspace}`);
        if (res.data.status) {
          setThreads(res.data.data || []);
          if (res.data.data?.length > 0) {
            setActiveThread(res.data.data[0]); // Auto-select first thread on load
          }
        }
      } catch (err) {
        console.error("Failed to load threads", err);
      }
    };
    fetchThreads();

    // Setup WebSocket
    const socket = new SockJS(SOCKET_URL);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      debug: () => {}, // Disable spammy console logs
      onConnect: () => {
        console.log('Socket Connected Successfully to Workspace:', selectedWorkspace);
        // Subscribe to Dynamic Workspace Topic
        stompClient.subscribe(`/topic/workspace/${selectedWorkspace}`, (message) => {
          const newMsg = JSON.parse(message.body);
          handleIncomingSocketMessage(newMsg);
        });
      },
      onStompError: (err) => console.error('STOMP Error:', err),
    });

    stompClient.activate();
    stompClientRef.current = stompClient;

    // Cleanup on unmount or when workspace changes
    return () => {
      stompClient.deactivate(); 
    };
  }, [selectedWorkspace]); // Re-run if workspace changes

  // Fetch Message History when the active thread changes
  useEffect(() => {
    if (!activeThread) return;
    
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`${API_BASE}/history/${activeThread.messageGroupId}`);
        if (res.data.status) {
          setMessages(res.data.data || []);
        }
      } catch (err) {
        console.error("Failed to load history", err);
      }
    };
    fetchHistory();
  }, [activeThread]);

  // Auto-scroll to the bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handle Incoming WebSocket Messages 
  const handleIncomingSocketMessage = (newMsg) => {
    if (activeGroupIdRef.current === newMsg.messageGroupId) {
      setMessages((prev) => [...prev, newMsg]);
    }

    setThreads((prevThreads) => {
      const index = prevThreads.findIndex((c) => c.messageGroupId === newMsg.messageGroupId);
      let updatedThreads = [...prevThreads];
      
      if (index !== -1) {
        const chatToMove = updatedThreads.splice(index, 1)[0];
        chatToMove.latestMessageContent = newMsg.content;
        chatToMove.latestMessageTime = newMsg.sentAt;
        updatedThreads.unshift(chatToMove);
      } else {
        updatedThreads.unshift({
          messageGroupId: newMsg.messageGroupId,
          workspaceId: newMsg.workspaceId,
          formId: newMsg.formId || 1,
          candidateEmail: newMsg.candidateEmail || "New Candidate",
          candidateName: newMsg.candidateName || "New Candidate",
          latestMessageContent: newMsg.content,
          sentAt: newMsg.sentAt
        });
      }
      return updatedThreads;
    });
  };

  // --- UPDATED: Send Message Payload ---
  const handleSendMessage = async () => {
    if (!inputText.trim() || !activeThread || !selectedWorkspace) return;

    const payload = {
      candidateEmail: activeThread.candidateEmail,
      messageBody: inputText.trim(),
      workspaceId: selectedWorkspace, // Use dynamic workspace
      formId: activeThread.formId
    };

    setInputText(''); 

    try {
      const res = await axios.post(`${API_BASE}/reply`, payload);
      if (!res.data.status) {
        alert("Failed to send message: " + (res.data.message || "Error"));
      }
    } catch (err) {
      console.error("Error sending message", err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // --- NEW: Workspace Selection Handler ---
  const handleSelectWorkspace = (workspaceId) => {
    setSelectedWorkspace(workspaceId);
    setShowWorkspaceModal(false);
    // Reset states when changing workspace
    setThreads([]);
    setActiveThread(null);
    setMessages([]);
  };


  // UI Helper Functions
  const getInitials = (name) => name ? name.substring(0, 2).toUpperCase() : 'U';
  const formatTime = (isoString) => {
    if (!isoString) return '';
    return new Date(isoString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  const formatDate = (isoString) => {
    if (!isoString) return '';
    return new Date(isoString).toLocaleDateString([], { day: '2-digit', month: 'short', year: 'numeric' });
  };

  return (
    <div
      className="h-[calc(100vh-140px)] flex rounded-[20px] overflow-hidden shadow-sm relative"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)' }}
    >
      {/* Conditionally Render Empty State if no workspace is selected */}
      {!selectedWorkspace ? (
        <div className="w-full flex flex-col items-center justify-center text-center p-8">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-[#8624F0]/10 text-[#8624F0]">
            <Search size={24} />
          </div>
          <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>No Workspace Selected</h3>
          <p className="text-sm max-w-sm" style={{ color: 'var(--text-secondary)' }}>
            Please select a workspace to view your inbox messages.
          </p>
          <button 
            onClick={() => setShowWorkspaceModal(true)}
            className="mt-6 px-6 py-2 bg-[#8624F0] text-white rounded-[8px] font-medium hover:bg-[#6c1dc0] transition-colors"
          >
            Select Workspace
          </button>
        </div>
      ) : (
        <>
          {/* Left: Messages List (Sidebar) */}
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
                  className="w-[40px] flex items-center justify-center rounded-[6px] hover:text-[#8624F0] transition-colors"
                  style={{ border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
                >
                  <Search size={18} />
                </button>
                <button
                  className="w-[40px] flex items-center justify-center rounded-[6px] hover:text-[#8624F0] transition-colors"
                  style={{ border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
                >
                  <Filter size={18} />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm pl-1 cursor-pointer hover:text-[#8624F0] transition-colors" style={{ color: 'var(--text-secondary)' }}>
                  <Archive size={14} /> <span>Archived</span>
                </div>
                <button onClick={() => setShowWorkspaceModal(true)} className="text-xs text-[#8624F0] hover:underline font-medium">
                  Change Workspace
                </button>
              </div>
            </div>

            {/* Real-time Thread List */}
            <div className="flex-1 overflow-y-auto">
              {threads.length === 0 && (
                <p className="p-6 text-center text-sm" style={{ color: 'var(--text-secondary)' }}>No messages found.</p>
              )}
              {threads.map((thread) => {
                const displayName = thread.candidateName || thread.candidateEmail;
                const isActive = activeThread?.messageGroupId === thread.messageGroupId;

                return (
                  <div
                    key={thread.messageGroupId}
                    onClick={() => { setActiveThread(thread); setMobileView('chat'); }}
                    className={clsx(
                      "p-4 flex items-start gap-3 cursor-pointer transition-colors border-l-4",
                      isActive ? "border-[#8624F0]" : "border-transparent"
                    )}
                    style={{ background: isActive ? 'var(--bg-main)' : 'var(--bg-card)' }}
                  >
                    <div className="w-[42px] h-[42px] rounded-full text-white flex items-center justify-center font-medium shrink-0 text-lg bg-[#8624F0]">
                      {getInitials(displayName)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-bold truncate text-[16px]" style={{ color: 'var(--text-primary)' }}>{displayName}</h3>
                      </div>
                      <p className="text-[12px] truncate leading-tight" style={{ color: 'var(--text-secondary)' }}>
                        {thread.latestMessageContent || "No messages yet"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Middle: Chat Area */}
          {activeThread ? (
            <div
              className={clsx(
                "flex-1 flex flex-col min-w-0 absolute md:relative z-0 h-full w-full md:w-auto transition-transform duration-300",
                mobileView === 'chat' || mobileView === 'details' ? 'translate-x-0' : 'translate-x-full md:translate-x-0'
              )}
              style={{ background: 'var(--bg-card)' }}
            >
              {/* Chat Header */}
              <div
                className="h-[80px] flex items-center justify-between px-6 shrink-0"
                style={{ borderBottom: '1px solid var(--border-color)', background: 'var(--bg-card)' }}
              >
                <div className="flex items-center gap-3">
                  <button onClick={() => setMobileView('list')} className="md:hidden mr-2" style={{ color: 'var(--text-primary)' }}>
                    <ArrowLeft size={20} />
                  </button>
                  <h2 className="text-xl font-bold truncate" style={{ color: 'var(--text-primary)' }}>
                    {activeThread.candidateName || activeThread.candidateEmail}
                  </h2>
                </div>
                <span className="bg-[#f7efff] dark:bg-[#2d1a4d] text-[#8624f0] dark:text-[#c084fc] text-[12px] px-3 py-0.5 rounded-[8px] truncate">
                  {activeThread.formId ? `Form #${activeThread.formId}` : 'Application'}
                </span>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-6 overflow-y-auto flex flex-col gap-6" style={{ background: 'var(--bg-card)' }}>
                {messages.length === 0 && (
                  <div className="flex-1 flex items-center justify-center">
                    <p style={{ color: 'var(--text-secondary)' }}>Send a message to start the conversation.</p>
                  </div>
                )}
                
                {messages.map((msg, idx) => {
                  const isCandidate = msg.senderType === 'CANDIDATE';
                  
                  return (
                    <div key={idx} className={clsx("max-w-[85%] md:max-w-[70%] flex flex-col", isCandidate ? "self-start" : "self-end items-end")}>
                      <div 
                        className={clsx(
                          "p-4 text-[13px] leading-relaxed shadow-sm", 
                          isCandidate 
                            ? "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-t-[12px] rounded-br-[12px]" 
                            : "bg-[#2a0058] dark:bg-[#8624F0] text-white rounded-t-[12px] rounded-bl-[12px]" 
                        )}
                      >
                        <p>{msg.content}</p>
                      </div>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-[10px]" style={{ color: 'var(--text-secondary)' }}>{formatTime(msg.sentAt)}</span>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Chat Input Box */}
              <div className="p-6 shrink-0 flex items-center gap-4">
                <div
                  className="flex-1 rounded-[4px] w-full h-[50px] flex items-center px-4 gap-3 shadow-sm"
                  style={{ border: '1px solid var(--border-color)', background: 'var(--bg-card)' }}
                >
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent outline-none text-sm w-full"
                    style={{ color: 'var(--text-primary)' }}
                  />
                  <button className="hover:text-[#2B3674] transition-colors" style={{ color: 'var(--text-secondary)' }}>
                    <Paperclip size={20} />
                  </button>
                  <button 
                    onClick={handleSendMessage}
                    disabled={!inputText.trim()}
                    className="w-[34px] h-[34px] rounded-[3px] bg-[#8624F0] text-white flex items-center justify-center hover:bg-[#6c1dc0] transition-colors shrink-0 disabled:opacity-50"
                  >
                    <Send size={16} className="ml-0.5" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 hidden md:flex items-center justify-center" style={{ background: 'var(--bg-card)' }}>
              <p style={{ color: 'var(--text-secondary)' }}>Select a candidate from the left to start chatting</p>
            </div>
          )}

          {/* Right: Profile Details */}
          {activeThread && (
            <div
              className="hidden xl:flex w-[350px] flex-col p-6 overflow-y-auto shrink-0"
              style={{ background: 'var(--bg-card)', borderLeft: '1px solid var(--border-color)' }}
            >
              <div className="flex flex-col items-center mb-6">
                <div className="w-[80px] h-[80px] rounded-full text-white flex items-center justify-center text-3xl font-medium mb-4 relative bg-[#8624F0]">
                  {getInitials(activeThread.candidateName || activeThread.candidateEmail)}
                  <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full flex items-center justify-center" style={{ background: 'var(--bg-card)' }}>
                    <div className="w-4 h-4 bg-[#01B574] rounded-full border-2" style={{ borderColor: 'var(--bg-card)' }}></div>
                  </div>
                </div>
                <h3 className="font-bold text-xl text-center" style={{ color: 'var(--text-primary)' }}>
                  {activeThread.candidateName || "Candidate"}
                </h3>
                <p className="text-sm mt-1 text-center" style={{ color: 'var(--text-secondary)' }}>
                  {activeThread.candidateEmail}
                </p>
              </div>

              <div className="w-full relative mb-8">
                <button className="w-full bg-[#210043] dark:bg-[#6d28d9] text-white h-[40px] rounded-[8px] text-sm font-semibold flex justify-center items-center gap-2 px-4 relative hover:bg-[#340b61] dark:hover:bg-[#7c3aed] transition-colors">
                  <span className="absolute left-1/2 -translate-x-1/2">Active</span>
                </button>
              </div>

              <div className="flex mb-6" style={{ borderBottom: '1px solid var(--border-color)' }}>
                <button className="flex-1 pb-3 border-b-2 border-[#181059] dark:border-[#8624F0] font-bold text-sm" style={{ color: 'var(--text-primary)' }}>Overview</button>
                <button className="flex-1 pb-3 font-medium text-sm border-b-2 border-transparent hover:border-gray-200 transition-colors" style={{ color: 'var(--text-secondary)' }}>Feedback</button>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Latest Message</h4>
                  <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    {formatDate(activeThread.latestMessageTime)} at {formatTime(activeThread.latestMessageTime)}
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-1" style={{ color: 'var(--text-primary)' }}>Form Context</h4>
                  <div className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    {activeThread.formId ? `Submitted via Form ID: ${activeThread.formId}` : "Direct Application"}
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* Workspace Modal Overlay */}
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