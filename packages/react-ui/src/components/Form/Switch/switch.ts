import { InputHTMLAttributes } from "react";

export interface SwitchProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  label?: string;
  labelPosition?: "left" | "right";
  size?: "sm" | "md" | "lg";
}
