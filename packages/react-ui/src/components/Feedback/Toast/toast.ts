export type ToastVariant = "info" | "success" | "warning" | "error";

export interface ToastData {
  id: string;
  message: string;
  variant?: ToastVariant;
  title?: string;
  /** Duration in ms. 0 = persist until dismissed. Default 4000. */
  duration?: number;
  dismissible?: boolean;
}

export interface ToastOptions {
  variant?: ToastVariant;
  title?: string;
  duration?: number;
  dismissible?: boolean;
}

export type ToastPosition =
  | "top-right" | "top-left" | "top-center"
  | "bottom-right" | "bottom-left" | "bottom-center";
