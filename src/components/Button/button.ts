import { LucideIcon } from "lucide-react";
import { ThemeColor, ThemeSize } from "@/types/theme";

/**
 * The visual variant of the button.
 * @typedef {"filled" | "gradient" | "outlined" | "ghost"} ButtonVariant
 */
export type ButtonVariant = "filled" | "gradient" | "outlined" | "ghost";

/**
 * The shape of the button corners.
 * @typedef {"default" | "rounded" | "pill" | "sharp"} ButtonShape
 */
export type ButtonShape = "default" | "rounded" | "pill" | "sharp";

/**
 * The animation effect to apply to the button.
 * @typedef {"ripple" | "scale" | ""} AnimationType
 */
export type AnimationType = "ripple" | "scale" | "";

/**
 * Interface representing the ripple effect.
 * @interface Ripple
 * @property {number} x - The x-coordinate of the ripple effect.
 * @property {number} y - The y-coordinate of the ripple effect.
 * @property {number} id - The unique identifier for the ripple effect.
 */
export interface Ripple {
  x: number;
  y: number;
  id: number;
}

/**
 * Main button props interface.
 * Extends the default HTML button attributes.
 * @interface ButtonProps
 * @extends {React.ButtonHTMLAttributes<HTMLButtonElement>}
 * @property {string} [text] - The text content of the button.
 * @property {ButtonVariant} [variant] - The visual variant of the button.
 * @property {ThemeColor} [color] - The color of the button.
 * @property {ThemeSize} [size] - The size of the button.
 * @property {ButtonShape} [shape] - The shape of the button corners.
 * @property {boolean} [isLoading] - Whether the button is in a loading state.
 * @property {AnimationType} [animation] - The animation effect to apply to the button.
 * @property {string} [className] - Additional CSS classes to apply to the button.
 * @property {boolean} [disabled] - Whether the button is disabled.
 * @property {LucideIcon} [leadingIcon] - The icon to display before the button text.
 * @property {LucideIcon} [trailingIcon] - The icon to display after the button text.
 * @property {boolean} [iconOnly] - Whether the button only displays an icon.
 */
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
