import "./EmptyState.css";
import { EmptyStateProps } from "./empty-state.ts";

const EmptyState = ({ icon, title, description, action, className = "" }: EmptyStateProps) => (
  <div className={`empty-state ${className}`}>
    {icon && (
      <span className="empty-state--icon" aria-hidden="true">{icon}</span>
    )}
    <p className="empty-state--title">{title}</p>
    {description && (
      <p className="empty-state--description">{description}</p>
    )}
    {action && (
      <div className="empty-state--actions">{action}</div>
    )}
  </div>
);

export default EmptyState;
