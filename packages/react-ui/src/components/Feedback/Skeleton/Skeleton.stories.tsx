import type { Meta, StoryObj } from "@storybook/react";
import Skeleton from "./Skeleton.tsx";

const meta: Meta<typeof Skeleton> = {
  title: "Feedback/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  args: { variant: "rectangular", width: 200, height: 100 },
  argTypes: {
    variant: { control: "radio", options: ["text", "circular", "rectangular"] },
  },
};
export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Rectangular: Story = {};
export const Circular: Story = { args: { variant: "circular", width: 48, height: 48 } };
export const TextLines: Story = { args: { variant: "text", lines: 4, width: 300 } };

export const CardLoader: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", alignItems: "flex-start", maxWidth: "360px" }}>
      <Skeleton variant="circular" width={48} height={48} />
      <div style={{ flex: 1 }}>
        <Skeleton variant="text" lines={3} />
      </div>
    </div>
  ),
};
