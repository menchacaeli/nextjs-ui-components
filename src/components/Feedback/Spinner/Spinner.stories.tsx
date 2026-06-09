import type { Meta, StoryObj } from "@storybook/react";
import Spinner from "./Spinner.tsx";

const meta: Meta<typeof Spinner> = {
  title: "Feedback/Spinner",
  component: Spinner,
  tags: ["autodocs"],
  args: { size: "md", label: "Loading…" },
  argTypes: { size: { control: "radio", options: ["xs", "sm", "md", "lg", "xl"] } },
};
export default meta;
type Story = StoryObj<typeof Spinner>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
      <Spinner size="xs" />
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </div>
  ),
};

export const CustomColor: Story = {
  args: { style: { "--spinner-color": "#8b5cf6" } as React.CSSProperties },
};

export const InButton: Story = {
  render: () => (
    <button
      disabled
      style={{
        display: "inline-flex", alignItems: "center", gap: "8px",
        padding: "8px 16px", borderRadius: "6px",
        background: "#3b82f6", color: "#fff", border: "none", fontSize: "14px",
        cursor: "not-allowed", opacity: 0.8,
      }}
    >
      <Spinner size="sm" style={{ "--spinner-color": "#fff", "--spinner-track-color": "rgba(255,255,255,0.3)" } as React.CSSProperties} />
      Processing…
    </button>
  ),
};
