import { SelectHTMLAttributes } from "react";

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, "className"> {
  options: SelectOption[];
  label?: string;
  placeholder?: string;
  error?: string;
  success?: string;
  required?: boolean;
  className?: string;
}
