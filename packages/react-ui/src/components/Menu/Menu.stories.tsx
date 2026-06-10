import type { Meta, StoryObj } from "@storybook/react";
import { Settings, User, LogOut, Bell, HelpCircle, Trash2, Edit } from "lucide-react";
import Menu from "./Menu.tsx";

const basicItems = [
  { text: "Edit",     value: "edit",    onClick: (v: string) => console.log(v) },
  { text: "Duplicate", value: "dupe",   onClick: (v: string) => console.log(v) },
  { text: "Archive",  value: "archive", onClick: (v: string) => console.log(v) },
  { text: "Delete",   value: "delete",  onClick: (v: string) => console.log(v) },
];

const iconItems = [
  { text: "Profile",      value: "profile",      leadingIcon: <User size={14} />,      onClick: (v: string) => console.log(v) },
  { text: "Settings",     value: "settings",     leadingIcon: <Settings size={14} />,   onClick: (v: string) => console.log(v) },
  { text: "Notifications", value: "notifications", leadingIcon: <Bell size={14} />,     onClick: (v: string) => console.log(v) },
  { text: "Help",         value: "help",         leadingIcon: <HelpCircle size={14} />, onClick: (v: string) => console.log(v) },
  { text: "Sign out",     value: "signout",      leadingIcon: <LogOut size={14} />,     onClick: (v: string) => console.log(v) },
];

const meta: Meta<typeof Menu> = {
  title: "Navigation/Menu",
  component: Menu,
  tags: ["autodocs"],
  decorators: [
    (Story: React.ComponentType) => (
      <div style={{ padding: "80px 40px", display: "flex", justifyContent: "center" }}>
        <Story />
      </div>
    ),
  ],
  args: {
    label: "Options",
    items: basicItems,
  },
};

export default meta;
type Story = StoryObj<typeof Menu>;

export const Default: Story = {};

export const WithIcons: Story = {
  args: {
    label: "Account",
    items: iconItems,
  },
};

export const WithDisabledItem: Story = {
  args: {
    label: "Actions",
    items: [
      { text: "Edit",   value: "edit",   leadingIcon: <Edit size={14} />,  onClick: (v) => console.log(v) },
      { text: "Delete", value: "delete", leadingIcon: <Trash2 size={14} />, onClick: (v) => console.log(v), disabled: true },
      { text: "Archive", value: "archive", onClick: (v) => console.log(v) },
    ],
  },
};

export const ManyItems: Story = {
  args: {
    label: "More",
    items: [
      ...iconItems,
      { text: "Billing", value: "billing", onClick: (v: string) => console.log(v) },
      { text: "Team",    value: "team",    onClick: (v: string) => console.log(v) },
      { text: "API Keys", value: "api",   onClick: (v: string) => console.log(v) },
    ],
  },
};
