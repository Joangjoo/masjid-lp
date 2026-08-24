import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export interface ToastProps {
  id: string;
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ id, message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, 4000);
    return () => clearTimeout(timer);
  }, [id, onClose]);

  const bgColors = {
    success: 'bg-emerald-900/90 border-emerald-500/30 text-emerald-100',
    error: 'bg-rose-900/90 border-rose-500/30 text-rose-100',
    info: 'bg-sky-900/90 border-sky-500/30 text-sky-100',
  };

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />,
    error: <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />,
    info: <Info className="w-5 h-5 text-sky-400 shrink-0" />,
  };

  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-xl backdrop-blur-md transition-all duration-300 ${bgColors[type]}`}>
      {icons[type]}
      <span className="text-sm font-medium pr-2">{message}</span>
      <button
        onClick={() => onClose(id)}
        className="p-1 hover:bg-white/10 rounded-lg transition"
      >
        <X className="w-4 h-4 opacity-70 hover:opacity-100" />
      </button>
    </div>
  );
};
