import type { Meta, StoryObj } from "@storybook/react";
import Divider from "./Divider.tsx";

const meta: Meta<typeof Divider> = {
  title: "Layout/Divider",
  component: Divider,
  tags: ["autodocs"],
  args: { orientation: "horizontal" },
  argTypes: {
    orientation: { control: "radio", options: ["horizontal", "vertical"] },
    labelAlign:  { control: "radio", options: ["left", "center", "right"] },
  },
};
export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {};

export const WithLabel: Story = { args: { label: "Or continue with" } };

export const LabelLeft: Story = { args: { label: "Section A", labelAlign: "left" } };

export const LabelRight: Story = { args: { label: "Section B", labelAlign: "right" } };

export const Vertical: Story = {
  args: { orientation: "vertical" },
  render: (args) => (
    <div style={{ display: "flex", alignItems: "center", gap: "16px", height: "40px" }}>
      <span>Item A</span>
      <Divider {...args} />
      <span>Item B</span>
      <Divider {...args} />
      <span>Item C</span>
    </div>
  ),
};
