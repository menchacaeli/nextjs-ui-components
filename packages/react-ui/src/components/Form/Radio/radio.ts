import React, { InputHTMLAttributes } from "react";

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
}

export interface RadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  name: string;
  value?: string;
  onChange?: (value: string) => void;
  options: RadioOption[];
  label?: string;
  error?: string;
  direction?: "horizontal" | "vertical";
  style?: React.CSSProperties;
  className?: string;
}
