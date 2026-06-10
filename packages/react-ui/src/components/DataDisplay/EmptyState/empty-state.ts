import React from "react";

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  /** Slot for CTA button(s) */
  action?: React.ReactNode;
  className?: string;
}
