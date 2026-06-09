import React from "react";

export interface StatProps {
  label: string;
  value: string | number;
  /** Percentage change — positive = up, negative = down */
  delta?: number;
  /** Contextual label shown after the delta, e.g. "vs last month" */
  deltaLabel?: string;
  icon?: React.ReactNode;
  className?: string;
}
