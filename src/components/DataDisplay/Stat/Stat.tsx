import "./Stat.css";
import { StatProps } from "./stat.ts";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const Stat = ({ label, value, delta, deltaLabel, icon, className = "" }: StatProps) => {
  const dir = delta == null ? null : delta > 0 ? "up" : delta < 0 ? "down" : "neutral";
  const DeltaIcon = dir === "up" ? TrendingUp : dir === "down" ? TrendingDown : Minus;
  const deltaText = delta == null ? "" : `${delta > 0 ? "+" : ""}${delta}%`;

  return (
    <div className={`stat ${className}`}>
      {icon && (
        <span className="stat--icon-wrap" aria-hidden="true">{icon}</span>
      )}
      <span className="stat--label">{label}</span>
      <span className="stat--value">{value}</span>
      {dir && (
        <span className={`stat--delta stat--delta-${dir}`} aria-label={`${deltaText} ${deltaLabel ?? ""}`.trim()}>
          <DeltaIcon size={14} aria-hidden="true" />
          <span aria-hidden="true">{deltaText}</span>
          {deltaLabel && (
            <span className="stat--delta-label" aria-hidden="true">{deltaLabel}</span>
          )}
        </span>
      )}
    </div>
  );
};

export default Stat;
