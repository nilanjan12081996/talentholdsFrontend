'use client';

import { useState } from "react";
import { Copy, QrCode, Code, X } from "lucide-react";

export default function ShareModal({ formId, isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState("link");
  const formUrl = `https://yourapp.com/f/${formId}`;
  const embedCode = `<iframe src="${formUrl}" width="100%" height="600" frameborder="0"></iframe>`;

  const copyToClipboard = (text, message) => {
    navigator.clipboard.writeText(text);
    alert(message);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative rounded-[20px] shadow-2xl w-full max-w-2xl mx-4 p-6" style={{ background: 'var(--bg-card)' }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Share Your Form</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#8624F0]/5 transition-colors"
          >
            <X className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-[10px] mb-6" style={{ background: 'var(--bg-main)' }}>
          {["link", "embed", "qr"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 py-2 rounded-[8px] text-sm font-medium transition-colors capitalize"
              style={{
                background: activeTab === tab ? 'var(--bg-card)' : 'transparent',
                color: activeTab === tab ? 'var(--text-primary)' : 'var(--text-secondary)',
                boxShadow: activeTab === tab ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
              }}
            >
              {tab === "qr" ? "QR Code" : tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab: Link */}
        {activeTab === "link" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Form URL</label>
              <div className="flex gap-2">
                <input
                  value={formUrl}
                  readOnly
                  className="flex-1 h-[42px] px-3 rounded-[8px] text-sm outline-none"
                  style={{ background: 'var(--bg-main)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                />
                <button
                  onClick={() => copyToClipboard(formUrl, "Link copied!")}
                  className="px-4 bg-[#8624F0] text-white rounded-[8px] text-sm font-medium flex items-center gap-2 hover:bg-[#6c1dc0] transition-colors"
                >
                  <Copy className="w-4 h-4" /> Copy
                </button>
              </div>
            </div>

            <div className="p-4 rounded-[10px] space-y-3" style={{ background: 'var(--bg-main)' }}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>Password Protection</p>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Require a password to access this form</p>
                </div>
                <div className="w-11 h-6 rounded-full cursor-pointer" style={{ background: 'var(--border-color)' }} />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-sm" style={{ color: 'var(--text-primary)' }}>Close Form</p>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>Stop accepting new responses</p>
                </div>
                <div className="w-11 h-6 rounded-full cursor-pointer" style={{ background: 'var(--border-color)' }} />
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-[10px] p-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-green-900 dark:text-green-300 text-sm">Form is live!</p>
                  <p className="text-xs text-green-700 dark:text-green-400 mt-1">Your form is now accepting responses at the URL above</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab: Embed */}
        {activeTab === "embed" && (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Embed Code</label>
              <div className="relative">
                <textarea
                  value={embedCode}
                  readOnly
                  rows={4}
                  className="w-full px-3 py-2 rounded-[8px] font-mono text-xs outline-none pr-12 resize-none"
                  style={{ background: 'var(--bg-main)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
                />
                <button
                  onClick={() => copyToClipboard(embedCode, "Embed code copied!")}
                  className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-[#8624F0]/10 transition-colors"
                >
                  <Copy className="w-4 h-4" style={{ color: 'var(--text-secondary)' }} />
                </button>
              </div>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-[10px]">
              <div className="flex gap-3">
                <Code className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-900 dark:text-blue-300 text-sm">How to embed</p>
                  <p className="text-xs text-blue-700 dark:text-blue-400 mt-1">Copy the code above and paste it into your website's HTML</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab: QR */}
        {activeTab === "qr" && (
          <div className="space-y-4">
            <div className="flex flex-col items-center justify-center py-8">
              <div className="w-48 h-48 rounded-[10px] flex items-center justify-center mb-4" style={{ background: 'var(--bg-main)' }}>
                <QrCode className="w-24 h-24" style={{ color: 'var(--text-secondary)' }} />
              </div>
              <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>QR Code for your form</p>
              <button className="px-6 py-2.5 bg-[#210043] dark:bg-[#6d28d9] text-white rounded-[8px] font-medium text-sm hover:bg-[#340b61] dark:hover:bg-[#7c3aed] transition-colors">
                Download QR Code
              </button>
            </div>
            <div className="p-4 rounded-[10px]" style={{ background: 'var(--bg-main)' }}>
              <p className="text-xs text-center" style={{ color: 'var(--text-secondary)' }}>Scan this QR code to access your form on mobile devices</p>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end mt-6 pt-4" style={{ borderTop: '1px solid var(--border-color)' }}>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-[8px] font-medium text-sm transition-colors hover:bg-[#8624F0]/5"
            style={{ border: '1px solid var(--border-color)', color: 'var(--text-primary)' }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}