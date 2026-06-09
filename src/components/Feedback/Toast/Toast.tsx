import "./Toast.css";
import { ToastData } from "./toast.ts";
import { Info, CheckCircle, AlertTriangle, XCircle, X } from "lucide-react";

interface ToastItemProps {
  toast: ToastData;
  onDismiss: (id: string) => void;
  exiting?: boolean;
}

const ICONS = {
  info:    Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error:   XCircle,
};

const Toast = ({ toast, onDismiss, exiting = false }: ToastItemProps) => {
  const variant = toast.variant ?? "info";
  const Icon    = ICONS[variant];

  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className={["toast", `toast--${variant}`, exiting && "toast--exiting"].filter(Boolean).join(" ")}
    >
      <Icon size={18} className="toast__icon" aria-hidden="true" />
      <div className="toast__body">
        {toast.title && <span className="toast__title">{toast.title}</span>}
        <p className="toast__message">{toast.message}</p>
      </div>
      {toast.dismissible !== false && (
        <button
          type="button"
          className="toast__dismiss"
          onClick={() => onDismiss(toast.id)}
          aria-label="Dismiss notification"
        >
          <X size={14} aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

export default Toast;
