import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const isSuccess = toast.type === 'success' || !toast.type;
  const isError = toast.type === 'error';

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-md animate-bounce-subtle">
      <div
        className={`flex items-start gap-3 p-4 rounded-xl shadow-xl border backdrop-blur-md transition-all duration-300 ${
          isSuccess
            ? 'bg-emerald-900/90 text-white border-emerald-500/50 shadow-emerald-900/20'
            : isError
            ? 'bg-rose-900/90 text-white border-rose-500/50 shadow-rose-900/20'
            : 'bg-slate-900/90 text-white border-slate-700 shadow-slate-900/20'
        }`}
      >
        <div className="mt-0.5 flex-shrink-0">
          {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
          {isError && <AlertCircle className="w-5 h-5 text-rose-400" />}
          {!isSuccess && !isError && <Info className="w-5 h-5 text-blue-400" />}
        </div>
        <div className="flex-1 text-sm font-medium pr-2">
          {toast.message}
        </div>
        <button
          onClick={onClose}
          className="text-slate-300 hover:text-white transition-colors"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
