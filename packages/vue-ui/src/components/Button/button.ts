export type ButtonVariant = 'filled' | 'gradient' | 'outlined' | 'ghost';
export type ButtonShape = 'default' | 'rounded' | 'pill' | 'sharp';
export type ThemeColor =
  | 'primary' | 'secondary' | 'danger' | 'warning' | 'success'
  | 'info' | 'gray' | 'red' | 'yellow' | 'green' | 'blue'
  | 'purple' | 'pink' | 'white' | 'black';
export type ThemeSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface ButtonProps {
  text?: string;
  variant?: ButtonVariant;
  color?: ThemeColor;
  size?: ThemeSize;
  shape?: ButtonShape;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}
