import React from "react";

export interface DividerProps {
  orientation?: "horizontal" | "vertical";
  label?: string;
  labelAlign?: "left" | "center" | "right";
  className?: string;
  style?: React.CSSProperties;
}
