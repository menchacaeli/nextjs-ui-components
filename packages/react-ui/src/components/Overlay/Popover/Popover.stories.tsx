import type { Meta, StoryObj } from "@storybook/react";
import Popover from "./Popover.tsx";
import { Settings, User, LogOut } from "lucide-react";

const meta: Meta<typeof Popover> = {
  title: "Overlay/Popover",
  component: Popover,
  tags: ["autodocs"],
  args: { side: "bottom", align: "start" },
  argTypes: {
    side:  { control: "radio", options: ["top", "right", "bottom", "left"] },
    align: { control: "radio", options: ["start", "center", "end"] },
  },
  decorators: [(Story) => <div style={{ padding: "80px", display: "flex", justifyContent: "center" }}><Story /></div>],
};
export default meta;
type Story = StoryObj<typeof Popover>;

const menuStyle: React.CSSProperties = {
  display: "flex", flexDirection: "column", padding: "4px",
};

const itemStyle: React.CSSProperties = {
  display: "flex", alignItems: "center", gap: "8px", padding: "8px 12px",
  fontSize: "14px", background: "none", border: "none", cursor: "pointer",
  borderRadius: "6px", width: "100%", textAlign: "left", color: "var(--color-text-primary)",
};

export const DropdownMenu: Story = {
  render: (args) => (
    <Popover
      {...args}
      trigger={
        <button style={{ ...itemStyle, border: "1px solid var(--color-gray-300)", width: "auto" }}>
          Options ▾
        </button>
      }
    >
      <div style={menuStyle}>
        <button style={itemStyle} onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-bg-secondary)")} onMouseLeave={(e) => (e.currentTarget.style.background = "none")}><Settings size={14} /> Settings</button>
        <button style={itemStyle} onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-bg-secondary)")} onMouseLeave={(e) => (e.currentTarget.style.background = "none")}><User size={14} /> Profile</button>
        <button style={{ ...itemStyle, color: "var(--color-danger)" }} onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-bg-secondary)")} onMouseLeave={(e) => (e.currentTarget.style.background = "none")}><LogOut size={14} /> Sign out</button>
      </div>
    </Popover>
  ),
};

export const WithContent: Story = {
  render: (args) => (
    <Popover
      {...args}
      trigger={
        <button style={{ padding: "8px 16px", border: "1px solid var(--color-gray-300)", borderRadius: "6px", cursor: "pointer", fontSize: "14px" }}>
          Show info
        </button>
      }
    >
      <div style={{ padding: "16px", maxWidth: "220px" }}>
        <p style={{ margin: "0 0 8px", fontWeight: 600, fontSize: "14px" }}>Quick summary</p>
        <p style={{ margin: 0, fontSize: "13px", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
          Popovers can contain any rich content — text, buttons, forms, or links.
        </p>
      </div>
    </Popover>
  ),
};
