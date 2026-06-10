import type { Meta, StoryObj } from "@storybook/react";
import ToastProvider, { useToast } from "./ToastProvider.tsx";

const meta: Meta = {
  title: "Feedback/Toast",
  tags: ["autodocs"],
  decorators: [(Story) => <ToastProvider><Story /></ToastProvider>],
};
export default meta;
type Story = StoryObj;

const btnStyle: React.CSSProperties = {
  padding: "8px 16px", border: "none", borderRadius: "6px",
  cursor: "pointer", fontSize: "14px", fontWeight: 500, color: "#fff",
};

const ToastDemo = () => {
  const { toast } = useToast();
  return (
    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
      <button style={{ ...btnStyle, background: "var(--color-info)" }}    onClick={() => toast("File uploaded successfully.", { variant: "info",    title: "Info" })}>Info</button>
      <button style={{ ...btnStyle, background: "var(--color-success)" }} onClick={() => toast("Your changes have been saved.", { variant: "success", title: "Saved" })}>Success</button>
      <button style={{ ...btnStyle, background: "var(--color-warning)" }} onClick={() => toast("Your session expires in 5 minutes.", { variant: "warning", title: "Warning" })}>Warning</button>
      <button style={{ ...btnStyle, background: "var(--color-danger)" }}  onClick={() => toast("Failed to connect to server.", { variant: "error",   title: "Error" })}>Error</button>
    </div>
  );
};

const PersistentDemo = () => {
  const { toast } = useToast();
  return (
    <button
      style={{ ...btnStyle, background: "var(--color-gray-700)" }}
      onClick={() => toast("This toast persists until dismissed.", { variant: "info", title: "Persistent", duration: 0 })}
    >
      Persistent toast
    </button>
  );
};

export const AllVariants: Story    = { render: () => <ToastDemo /> };
export const Persistent: Story     = { render: () => <PersistentDemo /> };

export const BottomRight: Story = {
  decorators: [(Story) => <ToastProvider position="bottom-right"><Story /></ToastProvider>],
  render: () => <ToastDemo />,
};
