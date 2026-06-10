import { InputHTMLAttributes } from "react";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  error?: string;
  indeterminate?: boolean;
}
