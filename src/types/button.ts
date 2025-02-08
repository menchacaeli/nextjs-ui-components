// Theme-related types
export type ThemeSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ThemeVariant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'outline'
  | 'ghost'
  | 'warning'
  | 'info';

export type ThemeShape =
  | 'default'
  | 'rounded'
  | 'pill'
  | 'sharp';

export type AnimationType =
  | 'ripple'
  | 'scale'
  | '';

// Ripple effect type
export interface Ripple {
  x: number;
  y: number;
  id: number;
}

// Main button props interface
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** The text content of the button */
  text?: string;

  /** The visual variant of the button */
  variant?: ThemeVariant;

  /** The size of the button */
  size?: ThemeSize;

  /** The shape of the button corners */
  shape?: ThemeShape;

  /** Whether the button is in a loading state */
  isLoading?: boolean;

  /** The animation effect to apply to the button */
  animation?: AnimationType;

  /** Additional CSS classes to apply to the button */
  className?: string;
}