import "./Divider.css";
import { DividerProps } from "./divider.ts";

const Divider = ({
  orientation = "horizontal",
  label,
  labelAlign = "center",
  className = "",
  style,
}: DividerProps) => {
  if (orientation === "vertical") {
    return (
      <span
        className={`divider divider--vertical ${className}`}
        style={style}
        role="separator"
        aria-orientation="vertical"
      />
    );
  }

  const alignClass = labelAlign !== "center" ? `divider--${labelAlign}` : "";

  return (
    <div
      className={["divider divider--horizontal", alignClass, className].filter(Boolean).join(" ")}
      style={style}
      role="separator"
      aria-orientation="horizontal"
    >
      <span className="divider--line" aria-hidden="true" />
      {label && <span className="divider--label">{label}</span>}
      <span className="divider--line" aria-hidden="true" />
    </div>
  );
};

export default Divider;
