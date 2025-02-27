import { OptionProps } from "./option.ts";
import Button from "../Button/Button.tsx";
import { ChevronDown } from "lucide-react";
import "./Option.css";
import { useEffect, useState, useRef, useCallback } from "react";

const Option = (props: OptionProps) => {
  const { text = "options", items } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<"bottom" | "top">(
    "bottom",
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const updateDropdownPosition = useCallback(() => {
    if (!containerRef.current || !dropdownRef.current) return;

    const buttonRect = containerRef.current.getBoundingClientRect();
    const dropdownHeight = dropdownRef.current.offsetHeight;
    const windowHeight = window.innerHeight;

    // Check if there's enough space below
    const spaceBelow = windowHeight - buttonRect.bottom;
    // Check if there's enough space above
    const spaceAbove = buttonRect.top;

    // Set position based on available space
    if (spaceBelow < dropdownHeight && spaceAbove > dropdownHeight) {
      setDropdownPosition("top");
    } else {
      setDropdownPosition("bottom");
    }
  }, []);

  const toggleOption = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  // Handle click outside
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  // Update position when dropdown opens or window resizes
  useEffect(() => {
    if (isOpen) {
      updateDropdownPosition();
      window.addEventListener("resize", updateDropdownPosition);
      return () => window.removeEventListener("resize", updateDropdownPosition);
    }
  }, [isOpen, updateDropdownPosition]);

  return (
    <div className={"option--container"} ref={containerRef}>
      <Button
        text={text}
        trailingIcon={ChevronDown}
        className={"option--button"}
        onClick={toggleOption}
      />
      {isOpen && (
        <div
          className={`option--dropdown ${dropdownPosition === "top" ? "option--top" : "option--bottom"}`}
          ref={dropdownRef}
        >
          {items.map((item, index) => {
            const LeadingIcon = item.leadingIcon;
            return (
              <div
                key={index}
                className={"option--item"}
                onClick={() => item.onClick(item.value)}
              >
                {LeadingIcon && (
                  <LeadingIcon className={"option--icon"} aria-hidden="true" />
                )}
                <span className={"option--text"}>{item.text}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Option;
