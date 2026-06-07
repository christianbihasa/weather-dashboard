import React from "react";
import { AlertTriangle, X } from "lucide-react";

function ErrorBanner({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="bg-amber-950/30 border border-amber-500/20 text-amber-400 p-3.5 rounded-xl flex items-center justify-between gap-3 mb-6 transition-all animate-fadeIn">
      <div className="flex items-center gap-2.5">
        <AlertTriangle className="text-amber-500 shrink-0" size={18} />
        <p className="text-xs font-medium tracking-wide">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="text-amber-400/50 hover:text-amber-300 p-1 rounded-lg hover:bg-amber-500/10 transition-colors cursor-pointer"
          aria-label="Dismiss error"
        >
          <X size={14} />
        </button>
      )}
    </div>
  );
}

export default ErrorBanner;
