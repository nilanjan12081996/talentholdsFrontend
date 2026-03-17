// 'use client';

// import { useState } from 'react';
// import { useDispatch } from 'react-redux';
// import { ArrowLeft, Send, Paperclip, Zap, Calendar, MessageSquare } from 'lucide-react';
// // IMPORTANT: Adjust this path to point to your actual slice where fisrtMessgaeSend is defined
// import { fisrtMessgaeSend } from '../Reducer/CandidateSlice'; 

// export default function CandidateChat({ candidate, onBack }) {
//     console.log("candidate",candidate);
    
//   const dispatch = useDispatch();
//   const [message, setMessage] = useState('');
//   const [isSending, setIsSending] = useState(false);
  
//   // 1. Initialize chat history as completely empty
//   const [chatHistory, setChatHistory] = useState([]);

//   const handleSendMessage = async () => {
//     if (!message.trim()) return;

//     const newMessageText = message;
//     setMessage(''); // Clear input immediately for better UX
//     setIsSending(true);

//     // Optimistically add the message to the UI
//     const newMsgObj = {
//       id: Date.now(),
//       text: newMessageText,
//       sender: 'me',
//       time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//     };
//     setChatHistory(prev => [...prev, newMsgObj]);

//     // Construct your API payload
//     const payload = {
//       candidateEmail: candidate?.email,
//       formId:candidate?.formSubmissionDto?.[0]?.formId,
//       workspaceId:candidate?.formSubmissionDto?.[0]?.form?.workspaceId,
//       messageBody: newMessageText,
//     };

//     try {
//       const resultAction = await dispatch(fisrtMessgaeSend(payload));
      
//       if (fisrtMessgaeSend.fulfilled.match(resultAction)) {
//         console.log("Message sent successfully!");
//       } else {
//         alert("Failed to send message.");
//         // Optional: remove the optimistic message if it failed
//         setChatHistory(prev => prev.filter(msg => msg.id !== newMsgObj.id));
//       }
//     } catch (error) {
//       console.error("Error sending message:", error);
//     } finally {
//       setIsSending(false);
//     }
//   };

//   const handleKeyDown = (e) => {
//     // Send message if Enter is pressed (and Shift isn't held down)
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSendMessage();
//     }
//   };

//   return (
//     <div className="flex flex-col h-[500px] w-full" style={{ background: 'var(--bg-card)' }}>
//       {/* Chat Header inside the popup */}
//       <div className="flex items-center gap-3 pb-4 mb-4" style={{ borderBottom: '1px solid var(--border-color)' }}>
//         <button 
//           onClick={onBack}
//           className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
//         >
//           <ArrowLeft size={18} style={{ color: 'var(--text-secondary)' }} />
//         </button>
//         <div>
//           <h3 className="text-[16px] font-bold" style={{ color: 'var(--text-primary)' }}>Chat with {candidate?.fullName || candidate?.name || "Candidate"}</h3>
//           <p className="text-[12px] text-green-500">Online</p>
//         </div>
//       </div>

//       {/* Chat Messages Area */}
//       <div className="flex-1 overflow-y-auto px-2 space-y-4 mb-4 flex flex-col">
//         {/* 2. Show Empty State if no messages exist */}
//         {chatHistory.length === 0 ? (
//           <div className="flex-1 flex flex-col items-center justify-center text-center opacity-60">
//             <MessageSquare size={40} className="mb-3" style={{ color: 'var(--text-secondary)' }} />
//             <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>No messages yet</p>
//             <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
//               Send a message to start the conversation with {candidate?.fullName?.split(' ')[0] || 'this candidate'}.
//             </p>
//           </div>
//         ) : (
//           <>
//             <div className="text-center mb-4">
//               <span className="bg-gray-100 dark:bg-gray-800 text-gray-500 text-xs px-3 py-1 rounded-full font-medium">
//                 Today
//               </span>
//             </div>

//             {chatHistory.map((msg) => (
//               <div key={msg.id} className={`flex flex-col max-w-[75%] ${msg.sender === 'me' ? 'self-end items-end' : 'self-start items-start'}`}>
//                 <div 
//                   className={`px-4 py-2 rounded-[12px] ${
//                     msg.sender === 'me' 
//                       ? 'bg-[#2A2B3D] text-white rounded-br-sm' 
//                       : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-sm' 
//                   }`}
//                 >
//                   <p className="text-[14px]">{msg.text}</p>
//                 </div>
//                 <span className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
//                   {msg.time} {msg.sender === 'me' && <span className="text-[#8624F0]">✓✓</span>}
//                 </span>
//               </div>
//             ))}
//           </>
//         )}
//       </div>

//       {/* Input Area */}
//       <div className="p-2 border rounded-[12px] flex flex-col gap-2 bg-white dark:bg-[#1a1b26]" style={{ borderColor: 'var(--border-color)' }}>
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           onKeyDown={handleKeyDown}
//           placeholder="Type your message..."
//           className="w-full bg-transparent border-none outline-none text-sm px-2 py-1"
//           style={{ color: 'var(--text-primary)' }}
//         />
        
//         <div className="flex items-center justify-between mt-2">
//           {/* Left Action Icons */}
//           <div className="flex items-center gap-3 px-2 text-gray-400">
//             <button className="hover:text-[#8624F0] transition-colors"><Zap size={18} /></button>
//             <button className="hover:text-[#8624F0] transition-colors"><Paperclip size={18} /></button>
//             <button className="hover:text-[#8624F0] transition-colors"><Calendar size={18} /></button>
//           </div>
          
//           {/* Send Button */}
//           <button 
//             onClick={handleSendMessage}
//             disabled={isSending || !message.trim()}
//             className="w-8 h-8 bg-[#8624F0] text-white rounded-full flex items-center justify-center hover:bg-[#6c1dc0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <Send size={14} />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }



'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ArrowLeft, Send, Paperclip, Zap, Calendar, MessageSquare } from 'lucide-react';
// IMPORTANT: Adjust this path to point to your actual slice where fisrtMessgaeSend is defined
import { fisrtMessgaeSend } from '../Reducer/CandidateSlice'; 

export default function CandidateChat({ candidate, onBack }) {
  console.log("Chat Candidate Data:", candidate);
    
  const dispatch = useDispatch();
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  
  // 1. Initialize chat history as completely empty
  const [chatHistory, setChatHistory] = useState([]);

  // const handleSendMessage = async () => {
  //   if (!message.trim()) return;

  //   const newMessageText = message;
  //   setMessage(''); // Clear input immediately for better UX
  //   setIsSending(true);

  //   // Optimistically add the message to the UI
  //   const newMsgObj = {
  //     id: Date.now(),
  //     text: newMessageText,
  //     sender: 'me',
  //     time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  //   };
  //   setChatHistory(prev => [...prev, newMsgObj]);

  //   // Construct your API payload using the newly flattened properties
  //   const payload = {
  //     candidateEmail: candidate?.email,
  //     formId: candidate?.formId,           // <--- Grabbing directly!
  //     workspaceId: candidate?.workspaceId, // <--- Grabbing directly!
  //     messageBody: newMessageText,
  //   };

  //   console.log("Sending Payload:", payload);

  //   try {
  //     const resultAction = await dispatch(fisrtMessgaeSend(payload));
      
  //     if (fisrtMessgaeSend.fulfilled.match(resultAction)) {
  //       console.log("Message sent successfully!");
  //     } else {
  //       alert("Failed to send message.");
  //       // Revert the optimistic UI update if it failed
  //       setChatHistory(prev => prev.filter(msg => msg.id !== newMsgObj.id));
  //     }
  //   } catch (error) {
  //     console.error("Error sending message:", error);
  //   } finally {
  //     setIsSending(false);
  //   }
  // };

  
  
  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const newMessageText = message;
    setMessage(''); // Clear input immediately for better UX
    setIsSending(true);

    // Optimistically add the message to the UI
    const newMsgObj = {
      id: Date.now(),
      text: newMessageText,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setChatHistory(prev => [...prev, newMsgObj]);

    // --- EXACT PAYLOAD STRUCTURE FOR YOUR API ---
    const payload = {
      candidateEmail: candidate?.email,
      formId: candidate?.formId,           // Pulled from formDto[i].id
      workspaceId: candidate?.workspaceId, // Pulled from formDto[i].workspaceId
      messageBody: newMessageText,
    };

    console.log("Sending API Payload:", payload);

    try {
      const resultAction = await dispatch(fisrtMessgaeSend(payload));
      
      if (fisrtMessgaeSend.fulfilled.match(resultAction)) {
        console.log("Message sent successfully!");
      } else {
        alert("Failed to send message.");
        // Optional: remove the optimistic message if it failed
        setChatHistory(prev => prev.filter(msg => msg.id !== newMsgObj.id));
      }
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSending(false);
    }
  };
  
  
  
  const handleKeyDown = (e) => {
    // Send message if Enter is pressed (and Shift isn't held down)
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[500px] w-full" style={{ background: 'var(--bg-card)' }}>
      {/* Chat Header inside the popup */}
      <div className="flex items-center gap-3 pb-4 mb-4" style={{ borderBottom: '1px solid var(--border-color)' }}>
        <button 
          onClick={onBack}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
        >
          <ArrowLeft size={18} style={{ color: 'var(--text-secondary)' }} />
        </button>
        <div>
          <h3 className="text-[16px] font-bold" style={{ color: 'var(--text-primary)' }}>
            Chat with {candidate?.fullName || candidate?.name || "Candidate"}
          </h3>
          <p className="text-[12px] text-green-500">Online</p>
        </div>
      </div>

      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto px-2 space-y-4 mb-4 flex flex-col">
        {chatHistory.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center opacity-60">
            <MessageSquare size={40} className="mb-3" style={{ color: 'var(--text-secondary)' }} />
            <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>No messages yet</p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
              Send a message to start the conversation with {candidate?.fullName?.split(' ')[0] || 'this candidate'}.
            </p>
          </div>
        ) : (
          <>
            <div className="text-center mb-4">
              <span className="bg-gray-100 dark:bg-gray-800 text-gray-500 text-xs px-3 py-1 rounded-full font-medium">
                Today
              </span>
            </div>

            {chatHistory.map((msg) => (
              <div key={msg.id} className={`flex flex-col max-w-[75%] ${msg.sender === 'me' ? 'self-end items-end' : 'self-start items-start'}`}>
                <div 
                  className={`px-4 py-2 rounded-[12px] ${
                    msg.sender === 'me' 
                      ? 'bg-[#2A2B3D] text-white rounded-br-sm' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-sm' 
                  }`}
                >
                  <p className="text-[14px]">{msg.text}</p>
                </div>
                <span className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
                  {msg.time} {msg.sender === 'me' && <span className="text-[#8624F0]">✓✓</span>}
                </span>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="p-2 border rounded-[12px] flex flex-col gap-2 bg-white dark:bg-[#1a1b26]" style={{ borderColor: 'var(--border-color)' }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          className="w-full bg-transparent border-none outline-none text-sm px-2 py-1"
          style={{ color: 'var(--text-primary)' }}
        />
        
        <div className="flex items-center justify-between mt-2">
          {/* Left Action Icons */}
          <div className="flex items-center gap-3 px-2 text-gray-400">
            <button className="hover:text-[#8624F0] transition-colors"><Zap size={18} /></button>
            <button className="hover:text-[#8624F0] transition-colors"><Paperclip size={18} /></button>
            <button className="hover:text-[#8624F0] transition-colors"><Calendar size={18} /></button>
          </div>
          
          {/* Send Button */}
          <button 
            onClick={handleSendMessage}
            disabled={isSending || !message.trim()}
            className="w-8 h-8 bg-[#8624F0] text-white rounded-full flex items-center justify-center hover:bg-[#6c1dc0] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}