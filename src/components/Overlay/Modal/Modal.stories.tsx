import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Modal from "./Modal.tsx";

const meta: Meta<typeof Modal> = {
  title: "Overlay/Modal",
  component: Modal,
  tags: ["autodocs"],
  args: { open: false, title: "Confirm action", size: "md", closeOnBackdrop: true },
  argTypes: {
    size: { control: "radio", options: ["sm", "md", "lg", "xl", "full"] },
  },
};
export default meta;
type Story = StoryObj<typeof Modal>;

const Trigger = (args: React.ComponentProps<typeof Modal>) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{ padding: "8px 16px", background: "var(--color-primary)", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "14px" }}
      >
        Open modal
      </button>
      <Modal {...args} open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export const Default: Story = {
  render: (args) => <Trigger {...args} />,
  args: {
    title: "Delete project",
    description: "This action cannot be undone. All project data will be permanently removed.",
    children: <p style={{ margin: 0, fontSize: "14px", color: "var(--color-text-secondary)" }}>Are you sure you want to delete <strong>My Project</strong>?</p>,
    footer: (
      <>
        <button style={{ padding: "8px 16px", background: "none", border: "1px solid var(--color-gray-300)", borderRadius: "6px", cursor: "pointer", fontSize: "14px" }}>Cancel</button>
        <button style={{ padding: "8px 16px", background: "var(--color-danger)", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "14px" }}>Delete</button>
      </>
    ),
  },
};

export const Small: Story = { render: (args) => <Trigger {...args} />, args: { size: "sm", title: "Quick confirm", children: <p style={{ margin: 0, fontSize: "14px" }}>Are you sure?</p> } };
export const Large: Story = { render: (args) => <Trigger {...args} />, args: { size: "lg", title: "Detailed view" } };

export const WithForm: Story = {
  render: (args) => <Trigger {...args} />,
  args: {
    title: "Edit profile",
    children: (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div><label style={{ display: "block", fontSize: "14px", fontWeight: 500, marginBottom: "4px" }}>Name</label><input defaultValue="Jane Doe" style={{ width: "100%", padding: "8px 12px", border: "1px solid var(--color-gray-300)", borderRadius: "6px", fontSize: "14px", boxSizing: "border-box" }} /></div>
        <div><label style={{ display: "block", fontSize: "14px", fontWeight: 500, marginBottom: "4px" }}>Email</label><input defaultValue="jane@example.com" style={{ width: "100%", padding: "8px 12px", border: "1px solid var(--color-gray-300)", borderRadius: "6px", fontSize: "14px", boxSizing: "border-box" }} /></div>
      </div>
    ),
  },
};
