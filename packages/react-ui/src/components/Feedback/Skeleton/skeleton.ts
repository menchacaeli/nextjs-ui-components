import React from "react";

export interface SkeletonProps {
  variant?: "text" | "circular" | "rectangular";
  width?: string | number;
  height?: string | number;
  /** Number of text lines when variant="text" */
  lines?: number;
  className?: string;
  style?: React.CSSProperties;
}
