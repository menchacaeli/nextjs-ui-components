import { useState, useRef, useCallback, useEffect, useId } from "react";
import { ChevronDown } from "lucide-react";
import { MenuProps } from "./menu.ts";
import "./Menu.css";

const Menu = (props: MenuProps) => {
  const { label = "Options", items, id, className = "", ...rest } = props;

  const [isOpen, setIsOpen]     = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const [position, setPosition] = useState<"bottom" | "top">("bottom");

  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef  = useRef<HTMLDivElement>(null);
  const generatedId  = useId();
  const menuId       = id || generatedId;
  const listId       = `${menuId}--list`;

  const close = useCallback(() => {
    setIsOpen(false);
    setHighlighted(-1);
  }, []);

  const updatePosition = useCallback(() => {
    if (!containerRef.current || !dropdownRef.current) return;
    const { bottom, top } = containerRef.current.getBoundingClientRect();
    const dropH = dropdownRef.current.offsetHeight;
    setPosition(window.innerHeight - bottom < dropH && top > dropH ? "top" : "bottom");
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    updatePosition();
    const onResize = () => updatePosition();
    const onMouse  = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) close();
    };
    window.addEventListener("resize", onResize);
    document.addEventListener("mousedown", onMouse);
    return () => {
      window.removeEventListener("resize", onResize);
      document.removeEventListener("mousedown", onMouse);
    };
  }, [isOpen, updatePosition, close]);

  const enabledIndexes = items
    .map((item, i) => (item.disabled ? -1 : i))
    .filter((i) => i >= 0);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "Enter":
      case " ":
        if (!isOpen) { setIsOpen(true); break; }
        if (highlighted >= 0 && !items[highlighted].disabled) {
          items[highlighted].onClick(items[highlighted].value);
          close();
        }
        e.preventDefault();
        break;
      case "ArrowDown":
        e.preventDefault();
        if (!isOpen) { setIsOpen(true); break; }
        setHighlighted((prev) => {
          const next = enabledIndexes.find((i) => i > prev);
          return next ?? enabledIndexes[0] ?? prev;
        });
        break;
      case "ArrowUp":
        e.preventDefault();
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
    <div
      ref={containerRef}
      className={`menu--container ${className}`}
      {...rest}
    >
      <button
        id={menuId}
        type="button"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={isOpen ? listId : undefined}
        onKeyDown={handleKeyDown}
        onClick={() => setIsOpen((o) => !o)}
        className="menu--trigger"
      >
        {label}
        <span className={`menu--chevron ${isOpen ? "open" : ""}`} aria-hidden="true">
          <ChevronDown size={14} />
        </span>
      </button>

      {isOpen && (
        <div
          ref={dropdownRef}
          id={listId}
          role="menu"
          aria-labelledby={menuId}
          className={`menu--dropdown menu--${position}`}
        >
          {items.map((item, index) => (
            <button
              key={item.value}
              type="button"
              role="menuitem"
              disabled={item.disabled}
              onMouseEnter={() => !item.disabled && setHighlighted(index)}
              onMouseLeave={() => setHighlighted(-1)}
              onClick={() => {
                item.onClick(item.value);
                close();
              }}
              className={`menu--item ${index === highlighted ? "highlighted" : ""} ${item.disabled ? "disabled" : ""}`}
            >
              {item.leadingIcon && (
                <span className="menu--icon" aria-hidden="true">
                  {item.leadingIcon}
                </span>
              )}
              {item.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Menu;
