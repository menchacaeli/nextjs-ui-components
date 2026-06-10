import React from "react";

export type AlertVariant = "info" | "success" | "warning" | "error";

export interface AlertProps {
  variant?: AlertVariant;
  title?: string;
  children: React.ReactNode;
  /** Show the default icon for the variant */
  icon?: boolean;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
}
