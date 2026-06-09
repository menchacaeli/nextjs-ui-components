import type { Meta, StoryObj } from "@storybook/react";
import Card from "./Card.tsx";

const meta: Meta<typeof Card> = {
  title: "Layout/Card",
  component: Card,
  tags: ["autodocs"],
  args: { border: true, shadow: "none", padding: "none" },
  argTypes: {
    shadow:  { control: "radio", options: ["none", "sm", "md", "lg"] },
    padding: { control: "radio", options: ["none", "sm", "md", "lg"] },
  },
};
export default meta;
type Story = StoryObj<typeof Card>;

export const WithSections: Story = {
  render: (args) => (
    <Card {...args} style={{ maxWidth: "400px" }}>
      <Card.Header title="Account settings" description="Manage your profile and preferences." />
      <Card.Body>
        <p style={{ fontSize: "14px", color: "var(--color-text-secondary)", margin: 0 }}>
          Update your name, email address, and notification settings.
        </p>
      </Card.Body>
      <Card.Footer>
        <button style={{ padding: "8px 16px", background: "none", border: "1px solid var(--color-gray-300)", borderRadius: "6px", cursor: "pointer", fontSize: "14px" }}>Cancel</button>
        <button style={{ padding: "8px 16px", background: "var(--color-primary)", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "14px" }}>Save changes</button>
      </Card.Footer>
    </Card>
  ),
};

export const WithPadding: Story = {
  args: { padding: "md", shadow: "sm" },
  render: (args) => (
    <Card {...args} style={{ maxWidth: "320px" }}>
      <p style={{ margin: 0, fontSize: "14px" }}>A simple card with padding applied directly.</p>
    </Card>
  ),
};

export const Shadows: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
      {(["none", "sm", "md", "lg"] as const).map((s) => (
        <Card key={s} shadow={s} padding="md" style={{ width: "160px" }}>
          <p style={{ margin: 0, fontSize: "13px" }}>shadow-{s}</p>
        </Card>
      ))}
    </div>
  ),
};
