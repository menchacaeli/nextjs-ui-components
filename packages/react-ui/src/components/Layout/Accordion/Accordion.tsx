import { useState } from "react";
import "./Accordion.css";
import { AccordionProps } from "./accordion.ts";
import { ChevronDown } from "lucide-react";

const Accordion = ({
  items,
  defaultOpen,
  multiple = false,
  className = "",
}: AccordionProps) => {
  const [open, setOpen] = useState<Set<string>>(() => {
    if (!defaultOpen) return new Set();
    return new Set(Array.isArray(defaultOpen) ? defaultOpen : [defaultOpen]);
  });

  const toggle = (id: string) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!multiple) next.clear();
        next.add(id);
      }
      return next;
    });
  };

  return (
    <div className={`accordion ${className}`}>
      {items.map((item) => {
        const isOpen = open.has(item.id);
        return (
          <div
            key={item.id}
            className={["accordion__item", isOpen && "accordion__item--open"].filter(Boolean).join(" ")}
          >
            <button
              type="button"
              className="accordion__trigger"
              disabled={item.disabled}
              aria-expanded={isOpen}
              aria-controls={`accordion-body-${item.id}`}
              id={`accordion-trigger-${item.id}`}
              onClick={() => !item.disabled && toggle(item.id)}
            >
              <span>{item.title}</span>
              <ChevronDown size={16} className="accordion__icon" aria-hidden="true" />
            </button>
            <div
              className="accordion__body"
              id={`accordion-body-${item.id}`}
              role="region"
              aria-labelledby={`accordion-trigger-${item.id}`}
              aria-hidden={!isOpen}
            >
              <div className="accordion__inner">
                <div className="accordion__content">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Accordion;
