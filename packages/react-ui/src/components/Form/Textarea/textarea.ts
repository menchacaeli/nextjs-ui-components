import { TextareaHTMLAttributes } from "react";

export interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className"> {
  label?: string;
  error?: string;
  success?: string;
  required?: boolean;
  resize?: "none" | "vertical" | "horizontal" | "both";
  showCount?: boolean;
  className?: string;
}
