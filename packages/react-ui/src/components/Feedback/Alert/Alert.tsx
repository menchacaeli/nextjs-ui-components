import "./Alert.css";
import { AlertProps } from "./alert.ts";
import { Info, CheckCircle, AlertTriangle, XCircle, X } from "lucide-react";

const ICONS = {
  info:    Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error:   XCircle,
};

const Alert = ({
  variant = "info",
  title,
  children,
  icon = true,
  dismissible,
  onDismiss,
  className = "",
}: AlertProps) => {
  const Icon = ICONS[variant];

  return (
    <div className={`alert alert--${variant} ${className}`} role="alert">
      {icon && (
        <Icon size={18} className="alert--icon" aria-hidden="true" />
      )}
      <div className="alert--body">
        {title && <span className="alert--title">{title}</span>}
        <div className="alert--content">{children}</div>
      </div>
      {dismissible && (
        <button
          type="button"
          className="alert--dismiss"
          onClick={onDismiss}
          aria-label="Dismiss"
        >
          <X size={14} aria-hidden="true" />
        </button>
      )}
    </div>
  );
};

export default Alert;
