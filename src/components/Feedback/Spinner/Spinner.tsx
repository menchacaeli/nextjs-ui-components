import "./Spinner.css";
import { SpinnerProps } from "./spinner.ts";

const Spinner = ({ size = "md", label = "Loading…", className = "", style }: SpinnerProps) => (
  <span
    className={`spinner spinner--${size} ${className}`}
    role="status"
    aria-label={label}
    style={style}
  >
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" style={{ width: "100%", height: "100%" }}>
      <circle
        cx="12" cy="12" r="10"
        stroke="var(--spinner-track-color)"
        strokeWidth="3"
      />
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="var(--spinner-color)"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
    <span className="sr-only">{label}</span>
  </span>
);

export default Spinner;
