import React, { useState, useRef } from "react";
import {
  useFloating, autoUpdate, offset, flip, shift, arrow,
  FloatingArrow, type Placement,
} from "@floating-ui/react";
import "./Tooltip.css";
import { TooltipProps } from "./tooltip.ts";

const Tooltip = ({
  content,
  children,
  side = "top",
  align = "center",
  delay = 300,
  disabled = false,
  className = "",
}: TooltipProps) => {
  const [open, setOpen] = useState(false);
  const arrowRef = useRef(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const placement: Placement = align === "center" ? side : `${side}-${align}`;

  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(8),
      flip({ padding: 8 }),
      shift({ padding: 8 }),
      arrow({ element: arrowRef }),
    ],
  });

  const show = () => {
    timerRef.current = setTimeout(() => setOpen(true), delay);
  };

  const hide = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setOpen(false);
  };

  if (disabled) return children;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type AnyElement = React.ReactElement<any>;
  const child = React.Children.only(children) as AnyElement;
  const trigger = React.cloneElement(child, {
    ref:          refs.setReference,
    onMouseEnter: (e: React.MouseEvent) => { show();         child.props.onMouseEnter?.(e); },
    onMouseLeave: (e: React.MouseEvent) => { hide();         child.props.onMouseLeave?.(e); },
    onFocus:      (e: React.FocusEvent) => { setOpen(true);  child.props.onFocus?.(e); },
    onBlur:       (e: React.FocusEvent) => { setOpen(false); child.props.onBlur?.(e); },
  });

  return (
    <>
      {trigger}
      {open && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          className={`tooltip__content ${className}`}
          role="tooltip"
        >
          <FloatingArrow ref={arrowRef} context={context} className="tooltip__arrow" />
          {content}
        </div>
      )}
    </>
  );
};

export default Tooltip;
