import React, { useState, useRef, useMemo, useId } from "react";
import {
  useFloating, autoUpdate, offset, flip, shift,
  size as floatingSize,
} from "@floating-ui/react";
import "./Combobox.css";
import { ComboboxProps } from "./combobox.ts";
import { ChevronDown, Check, X } from "lucide-react";

const Combobox = ({
  options,
  value,
  onChange,
  placeholder = "Select or search…",
  label,
  error,
  clearable = false,
  disabled = false,
  className = "",
  id: propId,
}: ComboboxProps) => {
  const generatedId    = useId();
  const inputId        = propId ?? generatedId;
  const selectedOption = options.find((o) => o.value === value);

  const [query,       setQuery]       = useState("");
  const [open,        setOpen]        = useState(false);
  const [highlighted, setHighlighted] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const { refs, floatingStyles } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: "bottom-start",
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(4),
      flip({ padding: 8 }),
      shift({ padding: 8 }),
      floatingSize({
        apply({ rects, elements }) {
          Object.assign(elements.floating.style, { width: `${rects.reference.width}px` });
        },
      }),
    ],
  });

  const filtered = useMemo(() => {
    if (!query) return options;
    const q = query.toLowerCase();
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, query]);

  const openDropdown = () => {
    if (!disabled) { setQuery(""); setOpen(true); setHighlighted(0); }
  };

  const closeDropdown = () => { setOpen(false); setQuery(""); };

  const select = (val: string) => {
    onChange?.(val);
    closeDropdown();
  };

  const clear = (e: React.MouseEvent) => {
    e.stopPropagation();
    onChange?.("");
    setQuery("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "Enter") { e.preventDefault(); openDropdown(); }
      return;
    }
    switch (e.key) {
      case "ArrowDown": e.preventDefault(); setHighlighted((p) => Math.min(p + 1, filtered.length - 1)); break;
      case "ArrowUp":   e.preventDefault(); setHighlighted((p) => Math.max(p - 1, 0)); break;
      case "Enter":
        e.preventDefault();
        if (filtered[highlighted] && !filtered[highlighted].disabled) select(filtered[highlighted].value);
        break;
      case "Escape": closeDropdown(); break;
      case "Tab":    closeDropdown(); break;
    }
  };

  // Show selected label when closed, show query text when open
  const displayValue = open ? query : (selectedOption?.label ?? "");

  // Group options
  const groups = useMemo(() => {
    const grouped = new Map<string, typeof filtered>();
    filtered.forEach((opt) => {
      const key = opt.group ?? "";
      if (!grouped.has(key)) grouped.set(key, []);
      grouped.get(key)!.push(opt);
    });
    return grouped;
  }, [filtered]);

  let optionIndex = 0;

  return (
    <div className={`combobox ${className}`}>
      {label && <label htmlFor={inputId} className="combobox--label">{label}</label>}

      <div
        ref={refs.setReference}
        className={["combobox--field", error && "error", disabled && "disabled"].filter(Boolean).join(" ")}
      >
        <input
          ref={inputRef}
          id={inputId}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-autocomplete="list"
          aria-haspopup="listbox"
          aria-invalid={!!error}
          disabled={disabled}
          className="combobox--input"
          placeholder={placeholder}
          value={displayValue}
          onChange={(e) => { setQuery(e.target.value); if (!open) setOpen(true); setHighlighted(0); }}
          onFocus={openDropdown}
          onBlur={() => setTimeout(closeDropdown, 150)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          spellCheck={false}
        />
        <div className="combobox--actions">
          {clearable && value && !disabled && (
            <button
              type="button"
              className="combobox--clear"
              onMouseDown={clear}
              tabIndex={-1}
              aria-label="Clear selection"
            >
              <X size={14} aria-hidden="true" />
            </button>
          )}
          <span className={`combobox--chevron-btn ${open ? "open" : ""}`} aria-hidden="true">
            <ChevronDown size={16} />
          </span>
        </div>
      </div>

      {open && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          className="combobox--dropdown"
          role="listbox"
          aria-label={label}
        >
          {filtered.length === 0 ? (
            <div className="combobox--empty">No options found</div>
          ) : (
            Array.from(groups.entries()).map(([group, opts]) => (
              <div key={group}>
                {group && <div className="combobox--group-label">{group}</div>}
                {opts.map((opt) => {
                  const idx = optionIndex++;
                  return (
                    <button
                      key={opt.value}
                      type="button"
                      role="option"
                      aria-selected={opt.value === value}
                      disabled={opt.disabled}
                      className={[
                        "combobox--option",
                        idx === highlighted    && "highlighted",
                        opt.value === value    && "selected",
                      ].filter(Boolean).join(" ")}
                      onMouseDown={(e) => { e.preventDefault(); if (!opt.disabled) select(opt.value); }}
                      onMouseEnter={() => setHighlighted(idx)}
                    >
                      <span>{opt.label}</span>
                      {opt.value === value && (
                        <Check size={14} className="combobox--check" aria-hidden="true" />
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>
      )}

      {error && <span className="combobox--error-text" role="alert">{error}</span>}
    </div>
  );
};

export default Combobox;
