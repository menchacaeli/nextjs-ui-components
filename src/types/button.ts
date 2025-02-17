import { LucideIcon } from "lucide-react";
import { ThemeColor, ThemeSize } from "@/types/theme";

/**
 * The visual variant of the button.
 */
export type ButtonVariant = "filled" | "gradient" | "outlined" | "ghost";

/**
 * The shape of the button corners.
 */
export type ButtonShape = "default" | "rounded" | "pill" | "sharp";

/**
 * The animation effect to apply to the button.
 */
export type AnimationType = "ripple" | "scale" | "";

/**
 * Interface representing the ripple effect.
 */
export interface Ripple {
  /** The x-coordinate of the ripple effect. */
  x: number;
  /** The y-coordinate of the ripple effect. */
  y: number;
  /** The unique identifier for the ripple effect. */
  id: number;
}

/**
 * Main button props interface.
 * Extends the default HTML button attributes.
 */
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The text content of the button. */
  text?: string;
  /** The visual variant of the button. */
  variant?: ButtonVariant;
  /** The color of the button. */
  color?: ThemeColor;
  /** The size of the button. */
  size?: ThemeSize;
  /** The shape of the button corners. */
  shape?: ButtonShape;
  /** Whether the button is in a loading state. */
  loading?: boolean;
  /** The animation effect to apply to the button. */
  animation?: AnimationType;
  /** Additional CSS classes to apply to the button. */
  className?: string;
  /** Whether the button is disabled. */
  disabled?: boolean;
  /** The icon to display before the button text. */
  leadingIcon?: LucideIcon;
  /** The icon to display after the button text. */
  trailingIcon?: LucideIcon;
  /** Whether the button only displays an icon. */
  iconOnly?: boolean;
}
