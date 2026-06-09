import React from "react";

export interface TabItem {
  id: string;
  label: string;
  content?: React.ReactNode;
  icon?: React.ReactNode;
  disabled?: boolean;
  badge?: string | number;
}

export interface TabsProps {
  items: TabItem[];
  defaultTab?: string;
  /** Controlled active tab id */
  activeTab?: string;
  onChange?: (id: string) => void;
  variant?: "underline" | "pills" | "bordered";
  className?: string;
}
