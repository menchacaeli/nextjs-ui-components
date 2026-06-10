import "./Textarea.css";
import { TextareaProps } from "./textarea.ts";

const Textarea = (props: TextareaProps) => {
  const {
    label,
    error,
    success,
    required,
    resize = "vertical",
    showCount = false,
    className = "",
    id,
    name,
    value,
    maxLength,
    ...rest
  } = props;

  const textareaId = id || `textarea-${name}-${Math.random().toString(36).slice(2, 9)}`;
  const messageType = error ? "error" : success ? "success" : "";
  const currentLength = typeof value === "string" ? value.length : 0;
  const showFooter = (error || success) || (showCount && maxLength);

  return (
    <div className={`textarea--container ${className}`}>
      {label && (
        <label
          htmlFor={textareaId}
          className={`textarea--label ${required ? "required" : ""}`}
        >
          {label}
        </label>
      )}

      <textarea
        id={textareaId}
        name={name}
        value={value}
        maxLength={maxLength}
        required={required}
        aria-invalid={!!error}
        aria-describedby={error || success ? `${textareaId}--message` : undefined}
        className={`textarea--field ${messageType}`}
        style={{ resize }}
        {...rest}
      />

      {showFooter && (
        <div className="textarea--footer">
          {(error || success) && (
            <span
              id={`${textareaId}--message`}
              className={`textarea--message ${messageType}`}
            >
              {error || success}
            </span>
          )}
          {showCount && maxLength && (
            <span className={`textarea--count ${currentLength >= maxLength ? "at-limit" : ""}`}>
              {currentLength}/{maxLength}
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Textarea;
