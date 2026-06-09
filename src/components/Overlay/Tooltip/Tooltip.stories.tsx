import type { Meta, StoryObj } from "@storybook/react";
import Tooltip from "./Tooltip.tsx";
import { Info } from "lucide-react";

const meta: Meta<typeof Tooltip> = {
  title: "Overlay/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  args: { content: "This is a helpful tooltip", side: "top", align: "center", delay: 300 },
  argTypes: {
    side:  { control: "radio", options: ["top", "right", "bottom", "left"] },
    align: { control: "radio", options: ["start", "center", "end"] },
  },
  decorators: [(Story) => <div style={{ padding: "80px", display: "flex", justifyContent: "center" }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: (args) => (
    <Tooltip {...args}>
      <button style={{ padding: "8px 16px", border: "1px solid var(--color-gray-300)", borderRadius: "6px", cursor: "pointer", fontSize: "14px" }}>
        Hover me
      </button>
    </Tooltip>
  ),
};

export const OnIcon: Story = {
  args: { content: "Additional context for this field", delay: 100 },
  render: (args) => (
    <Tooltip {...args}>
      <button style={{ border: "none", background: "none", cursor: "pointer", color: "var(--color-gray-400)", padding: "4px" }}>
        <Info size={16} />
      </button>
    </Tooltip>
  ),
};

export const Placements: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "center" }}>
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Tooltip key={side} content={`Tooltip on ${side}`} side={side} delay={0}>
          <button style={{ padding: "8px 12px", border: "1px solid var(--color-gray-300)", borderRadius: "6px", cursor: "pointer", fontSize: "13px" }}>
            {side}
          </button>
        </Tooltip>
      ))}
    </div>
  ),
};

export const NoDelay: Story = { args: { delay: 0 }, render: Default.render };
