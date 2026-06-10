import React, { createContext, useContext, useState, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import Toast from "./Toast.tsx";
import { ToastData, ToastOptions, ToastPosition } from "./toast.ts";

interface ToastContextValue {
  toast:      (message: string, options?: ToastOptions) => string;
  dismiss:    (id: string) => void;
  dismissAll: () => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export const useToast = (): ToastContextValue => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
};

interface ToastProviderProps {
  children:  React.ReactNode;
  position?: ToastPosition;
  maxToasts?: number;
}

const ToastProvider = ({
  children,
  position  = "top-right",
  maxToasts = 5,
}: ToastProviderProps) => {
  const [toasts,  setToasts]  = useState<ToastData[]>([]);
  const [exiting, setExiting] = useState<Set<string>>(new Set());
  const timers = useRef(new Map<string, ReturnType<typeof setTimeout>>());

  const dismiss = useCallback((id: string) => {
    setExiting((prev) => new Set([...prev, id]));
    setTimeout(() => {
      setToasts((prev)  => prev.filter((t) => t.id !== id));
      setExiting((prev) => { const n = new Set(prev); n.delete(id); return n; });
    }, 260);
    const t = timers.current.get(id);
    if (t) { clearTimeout(t); timers.current.delete(id); }
  }, []);

  const toast = useCallback((message: string, options: ToastOptions = {}): string => {
    const id: string = Math.random().toString(36).slice(2, 9);
    const data: ToastData = {
      id,
      message,
      variant:     options.variant    ?? "info",
      title:       options.title,
      duration:    options.duration   ?? 4000,
      dismissible: options.dismissible ?? true,
    };

    setToasts((prev) => [...prev.slice(-(maxToasts - 1)), data]);

    if (data.duration && data.duration > 0) {
      timers.current.set(id, setTimeout(() => dismiss(id), data.duration));
    }
    return id;
  }, [dismiss, maxToasts]);

  const dismissAll = useCallback(() => {
    setToasts((prev) => { prev.forEach((t) => dismiss(t.id)); return prev; });
  }, [dismiss]);

  return (
    <ToastContext.Provider value={{ toast, dismiss, dismissAll }}>
      {children}
      {typeof document !== "undefined" && createPortal(
        <div
          className={`toast-container toast-container--${position}`}
          aria-label="Notifications"
        >
          {toasts.map((t) => (
            <Toast
              key={t.id}
              toast={t}
              onDismiss={dismiss}
              exiting={exiting.has(t.id)}
            />
          ))}
        </div>,
        document.body
      )}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
