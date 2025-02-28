import React from "react";
import "./Input.css";
import InputProps from "./input.ts";
import { AlertCircle, CheckCircle } from "lucide-react";

const Input = (props: InputProps) => {
  const {
    type = "text",
    id,
    name,
    value,
    onChange,
    label,
    showLabel = true,
    placeholder,
    required,
    disabled,
    error,
    success,
    className = "",
  } = props;
  // Generate a unique ID if none is provided
  const inputId =
    id || `input-${name}-${Math.random().toString(36).substr(2, 9)}`;

  // Determine message and its type
  const hasMessage = error || success;
  const messageType = error ? "error" : success ? "success" : "";

  return (
    <div className={`input--container ${className}`}>
      {showLabel && label && (
        <label
          htmlFor={inputId}
          className={`input--label ${required ? "required" : ""}`}
        >
          {label}
        </label>
      )}

      <div className="input--wrapper">
        <input
          id={inputId}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`input--field ${messageType} ${error || success ? "with-icon" : ""}`}
          aria-invalid={!!error}
          aria-describedby={hasMessage ? `${inputId}--message` : undefined}
        />

        {error && (
          <div className="input--icon error">
            <AlertCircle size={18} />
          </div>
        )}

        {success && (
          <div className="input--icon success">
            <CheckCircle size={18} />
          </div>
        )}
      </div>

      {hasMessage && (
        <div
          id={`${inputId}--message`}
          className={`input--message ${messageType}`}
        >
          {error ? (
            <span className="message--with-icon">
              <AlertCircle size={14} />
              {error}
            </span>
          ) : success ? (
            <span className="message--with-icon">
              <CheckCircle size={14} />
              {success}
            </span>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Input;
