import { AlertTriangle, X } from "lucide-react";

export default function DeleteConfirmModal({ isOpen, onClose, onConfirm, isDeleting }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={!isDeleting ? onClose : undefined} />
      
      <div className="relative w-full max-w-sm rounded-2xl shadow-xl overflow-hidden" style={{ background: 'var(--bg-card)' }}>
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>Delete Field?</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                Are you sure you want to delete this field? This action is permanent and cannot be undone.
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 flex items-center justify-end gap-3" style={{ background: 'var(--bg-main)', borderTop: '1px solid var(--border-color)' }}>
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2 rounded-xl text-sm font-medium transition-colors hover:bg-gray-200 dark:hover:bg-gray-800 disabled:opacity-50"
            style={{ color: 'var(--text-primary)' }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isDeleting}
            className="px-4 py-2 rounded-xl text-sm font-medium bg-red-600 text-white transition-colors hover:bg-red-700 disabled:opacity-70 flex items-center gap-2"
          >
            {isDeleting ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Deleting...
              </>
            ) : (
              "Yes, Delete"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
