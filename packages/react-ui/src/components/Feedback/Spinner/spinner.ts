import React from "react";

export interface SpinnerProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Accessible label for screen readers */
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}
