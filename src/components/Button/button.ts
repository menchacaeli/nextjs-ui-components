import { LucideIcon } from "lucide-react";
import { ThemeColor, ThemeSize } from "@/types/theme";

export type ButtonVariant = "filled" | "gradient" | "outlined" | "ghost";
export type ButtonShape = "default" | "rounded" | "pill" | "sharp";
export type AnimationType = "ripple" | "scale" | "";

export interface Ripple {
  x: number;
  y: number;
  id: number;
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  variant?: ButtonVariant;
  color?: ThemeColor;
  size?: ThemeSize;
  shape?: ButtonShape;
  loading?: boolean;
  animation?: AnimationType;
  className?: string;
  disabled?: boolean;
  leadingIcon?: LucideIcon;
  trailingIcon?: LucideIcon;
  iconOnly?: boolean;
  fullWidth?: boolean;
}
