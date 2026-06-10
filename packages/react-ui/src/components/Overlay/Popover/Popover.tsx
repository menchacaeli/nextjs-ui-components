import React, { useState, useRef } from "react";
import {
  useFloating, autoUpdate, offset, flip, shift, arrow,
  FloatingArrow, useClick, useDismiss, useInteractions,
  type Placement,
} from "@floating-ui/react";
import "./Popover.css";
import { PopoverProps } from "./popover.ts";

const Popover = ({
  trigger,
  children,
  side = "bottom",
  align = "start",
  className = "",
}: PopoverProps) => {
  const [open, setOpen] = useState(false);
  const arrowRef = useRef(null);

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

  const click   = useClick(context);
  const dismiss = useDismiss(context);
  const { getReferenceProps, getFloatingProps } = useInteractions([click, dismiss]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type AnyElement = React.ReactElement<any>;
  const child     = React.Children.only(trigger) as AnyElement;
  const triggerEl = React.cloneElement(child, {
    ref: refs.setReference,
    ...getReferenceProps(child.props),
  });

  return (
    <>
      {triggerEl}
      {open && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          className={`popover__content ${className}`}
          {...getFloatingProps()}
        >
          <FloatingArrow ref={arrowRef} context={context} className="popover__arrow" />
          {children}
        </div>
      )}
    </>
  );
};

export default Popover;
