import "./Radio.css";
import { RadioProps } from "./radio.ts";

const Radio = (props: RadioProps) => {
  const { label, disabled, className = "", id, ...rest } = props;
  const radioId = id || `radio-${Math.random().toString(36).slice(2, 9)}`;

  return (
    <label
      className={["radio--wrapper", disabled && "disabled", className].filter(Boolean).join(" ")}
      htmlFor={radioId}
    >
      <span style={{ position: "relative", display: "inline-flex" }}>
        <input
          type="radio"
          id={radioId}
          disabled={disabled}
          className="radio--native"
          {...rest}
        />
        <span className="radio__control" />
      </span>
      {label && <span className="radio--label">{label}</span>}
    </label>
  );
};

export default Radio;
