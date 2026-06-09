import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Tabs from "./Tabs.tsx";
import { Home, Settings, Users, Bell } from "lucide-react";

const basicItems = [
  { id: "overview", label: "Overview",  content: <p style={{ margin: 0, fontSize: "14px" }}>Overview content goes here.</p> },
  { id: "analytics",label: "Analytics", content: <p style={{ margin: 0, fontSize: "14px" }}>Analytics charts and data.</p> },
  { id: "reports",  label: "Reports",   content: <p style={{ margin: 0, fontSize: "14px" }}>Report exports and history.</p> },
  { id: "disabled", label: "Disabled",  content: null, disabled: true },
];

const iconItems = [
  { id: "home",     label: "Home",      icon: <Home size={14} />,     content: <p style={{ margin: 0, fontSize: "14px" }}>Home dashboard.</p> },
  { id: "team",     label: "Team",      icon: <Users size={14} />,    content: <p style={{ margin: 0, fontSize: "14px" }}>Team members and roles.</p>, badge: 3 },
  { id: "settings", label: "Settings",  icon: <Settings size={14} />, content: <p style={{ margin: 0, fontSize: "14px" }}>Account settings.</p> },
  { id: "notifs",   label: "Notifications", icon: <Bell size={14} />, content: <p style={{ margin: 0, fontSize: "14px" }}>Notification preferences.</p>, badge: "9+" },
];

const meta: Meta<typeof Tabs> = {
  title: "Navigation/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  args: { items: basicItems, variant: "underline" },
  argTypes: { variant: { control: "radio", options: ["underline", "pills", "bordered"] } },
};
export default meta;
type Story = StoryObj<typeof Tabs>;

export const Underline: Story = {};
export const Pills:     Story = { args: { variant: "pills" } };
export const Bordered:  Story = { args: { variant: "bordered" } };

export const WithIcons: Story = { args: { items: iconItems, variant: "underline" } };

export const Controlled: Story = {
  render: (args) => {
    const [active, setActive] = useState("overview");
    return (
      <div>
        <Tabs {...args} activeTab={active} onChange={setActive} />
        <p style={{ fontSize: "12px", color: "var(--color-text-secondary)", marginTop: "8px" }}>
          Active: {active}
        </p>
      </div>
    );
  },
};
