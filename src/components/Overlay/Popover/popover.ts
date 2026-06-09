import React from "react";

export interface PopoverProps {
  trigger: React.ReactElement;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  className?: string;
}
