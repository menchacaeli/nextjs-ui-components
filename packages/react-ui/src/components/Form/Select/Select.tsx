import "./Select.css";
import { SelectProps } from "./select.ts";

const ChevronDown = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const Select = (props: SelectProps) => {
  const {
    options,
    label,
    placeholder,
    error,
    success,
    required,
    className = "",
    id,
    name,
    ...rest
  } = props;

  const selectId = id || `select-${name}-${Math.random().toString(36).slice(2, 9)}`;
  const messageType = error ? "error" : success ? "success" : "";

  return (
    <div className={`select--container ${className}`}>
      {label && (
        <label
          htmlFor={selectId}
          className={`select--label ${required ? "required" : ""}`}
        >
          {label}
        </label>
      )}

      <div className="select--wrapper">
        <select
          id={selectId}
          name={name}
          required={required}
          aria-invalid={!!error}
          aria-describedby={error || success ? `${selectId}--message` : undefined}
          className={`select--field ${messageType}`}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} disabled={opt.disabled}>
              {opt.label}
            </option>
          ))}
        </select>
        <span className="select--chevron">
          <ChevronDown />
        </span>
      </div>

      {(error || success) && (
        <span
          id={`${selectId}--message`}
          className={`select--message ${messageType}`}
        >
          {error || success}
        </span>
      )}
    </div>
  );
};

export default Select;
