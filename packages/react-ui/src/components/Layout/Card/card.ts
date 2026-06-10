import React from "react";

export interface CardProps {
  children: React.ReactNode;
  padding?: "none" | "sm" | "md" | "lg";
  shadow?: "none" | "sm" | "md" | "lg";
  border?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface CardSectionProps {
  children?: React.ReactNode;
  className?: string;
}
