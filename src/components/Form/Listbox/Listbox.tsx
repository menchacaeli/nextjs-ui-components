import { useState, useId, useEffect, useCallback } from "react";
import {
  useFloating,
  offset,
  flip,
  shift,
  size as floatingSize,
  autoUpdate,
} from "@floating-ui/react";
import { Check, ChevronDown } from "lucide-react";
import { ListboxProps } from "./listbox.ts";
import "./Listbox.css";

const Listbox = (props: ListboxProps) => {
  const {
    options,
    value,
    onChange,
    label,
    placeholder = "Select an option",
    error,
    required,
    disabled,
    id,
    className = "",
  } = props;

  const [open, setOpen]           = useState(false);
  const [highlighted, setHighlighted] = useState(-1);

  const generatedId = useId();
  const listboxId   = id || generatedId;
  const listId      = `${listboxId}--list`;

  const { refs, floatingStyles } = useFloating({
    placement: "bottom-start",
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(4),
      flip({ padding: 8 }),
      shift({ padding: 8 }),
      floatingSize({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, {
            width: `${rects.reference.width}px`,
          });
        },
      }),
    ],
  });

  const selected = options.find((o) => o.value === value);

  const close = useCallback(() => {
    setOpen(false);
    setHighlighted(-1);
  }, []);

  const select = useCallback(
    (val: string) => {
      onChange?.(val);
      close();
    },
    [onChange, close],
  );

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      const ref = refs.reference.current as Element | null;
      const floating = refs.floating.current;
      if (!ref?.contains(e.target as Node) && !floating?.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open, refs, close]);

  const enabledIndexes = options
    .map((o, i) => (o.disabled ? -1 : i))
    .filter((i) => i >= 0);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "Enter":
      case " ":
        if (!open) { setOpen(true); break; }
        if (highlighted >= 0) select(options[highlighted].value);
        e.preventDefault();
        break;
      case "ArrowDown":
        e.preventDefault();
        if (!open) { setOpen(true); break; }
        setHighlighted((prev) => {
          const next = enabledIndexes.find((i) => i > prev);
          return next ?? enabledIndexes[0] ?? prev;
        });
        break;
      case "ArrowUp":
        e.preventDefault();
        if (!open) { setOpen(true); break; }
        setHighlighted((prev) => {
          const next = [...enabledIndexes].reverse().find((i) => i < prev);
          return next ?? enabledIndexes[enabledIndexes.length - 1] ?? prev;
        });
        break;
      case "Escape":
      case "Tab":
        close();
        break;
    }
  };

  return (
    <div className={`listbox ${className}`}>
      {label && (
        <label
          id={`${listboxId}--label`}
          className={`listbox--label ${required ? "required" : ""}`}
        >
          {label}
        </label>
      )}

      <button
        ref={refs.setReference}
        id={listboxId}
        type="button"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={open ? listId : undefined}
        aria-labelledby={label ? `${listboxId}--label` : undefined}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${listboxId}--error` : undefined}
        disabled={disabled}
        onKeyDown={handleKeyDown}
        onClick={() => !disabled && setOpen((o) => !o)}
        className={`listbox--button ${error ? "error" : ""} ${disabled ? "disabled" : ""}`}
      >
        <span className={`listbox--value ${!selected ? "placeholder" : ""}`}>
          {selected ? (
            <>
              {selected.icon && (
                <span className="listbox--option-icon" aria-hidden="true">
                  {selected.icon}
                </span>
              )}
              {selected.label}
            </>
          ) : (
            placeholder
          )}
        </span>
        <span className={`listbox--chevron ${open ? "open" : ""}`} aria-hidden="true">
          <ChevronDown size={16} />
        </span>
      </button>

      {open && (
        <ul
          ref={refs.setFloating}
          id={listId}
          role="listbox"
          aria-labelledby={label ? `${listboxId}--label` : undefined}
          style={floatingStyles}
          className="listbox--dropdown"
        >
          {options.map((option, index) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              aria-disabled={option.disabled}
              onMouseEnter={() => !option.disabled && setHighlighted(index)}
              onMouseLeave={() => setHighlighted(-1)}
              onClick={() => !option.disabled && select(option.value)}
              className={`listbox--option ${option.value === value ? "selected" : ""} ${index === highlighted ? "highlighted" : ""} ${option.disabled ? "disabled" : ""}`}
            >
              {option.icon && (
                <span className="listbox--option-icon" aria-hidden="true">
                  {option.icon}
                </span>
              )}
              <span className="listbox--option-text">
                {option.label}
                {option.description && (
                  <span className="listbox--option-desc">{option.description}</span>
                )}
              </span>
              {option.value === value && (
                <span className="listbox--check" aria-hidden="true">
                  <Check size={14} />
                </span>
              )}
            </li>
          ))}
        </ul>
      )}

      {error && (
        <p id={`${listboxId}--error`} className="listbox--error">
          {error}
        </p>
      )}
    </div>
  );
};

export default Listbox;
