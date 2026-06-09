import "./Switch.css";
import { SwitchProps } from "./switch.ts";

const Switch = (props: SwitchProps) => {
  const {
    label,
    labelPosition = "right",
    size = "md",
    disabled,
    className = "",
    id,
    ...rest
  } = props;

  const switchId = id || `switch-${Math.random().toString(36).slice(2, 9)}`;

  const wrapperClasses = [
    "switch--wrapper",
    `switch--${size}`,
    labelPosition === "left" && "label-left",
    disabled && "disabled",
    className,
  ].filter(Boolean).join(" ");

  return (
    <label className={wrapperClasses} htmlFor={switchId}>
      <span className="switch--input-wrap">
        <input
          type="checkbox"
          id={switchId}
          role="switch"
          disabled={disabled}
          className="switch--native"
          {...rest}
        />
        <span className="switch__track" aria-hidden="true" />
      </span>
      {label && <span className="switch--label">{label}</span>}
    </label>
  );
};

export default Switch;
