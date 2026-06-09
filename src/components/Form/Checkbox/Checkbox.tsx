import { useRef, useEffect } from "react";
import "./Checkbox.css";
import { CheckboxProps } from "./checkbox.ts";

const Checkbox = (props: CheckboxProps) => {
  const {
    label,
    error,
    indeterminate = false,
    disabled,
    className = "",
    id,
    ...rest
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const checkboxId = id || `checkbox-${Math.random().toString(36).slice(2, 9)}`;

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  const wrapperClasses = [
    "checkbox--wrapper",
    disabled && "disabled",
    error && "error",
    className,
  ].filter(Boolean).join(" ");

  return (
    <div>
      <label className={wrapperClasses} htmlFor={checkboxId}>
        <span className="checkbox--input-wrap">
          <input
            ref={inputRef}
            type="checkbox"
            id={checkboxId}
            disabled={disabled}
            className="checkbox--native"
            aria-invalid={!!error}
            {...rest}
          />
          <span className={`checkbox__control ${indeterminate ? "indeterminate" : ""}`} />
        </span>
        {label && <span className="checkbox--label">{label}</span>}
      </label>
      {error && <span className="checkbox--error" role="alert">{error}</span>}
    </div>
  );
};

export default Checkbox;
