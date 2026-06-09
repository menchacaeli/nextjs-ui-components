import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Switch from "./Switch.tsx";

const meta: Meta<typeof Switch> = {
  title: "Form/Switch",
  component: Switch,
  tags: ["autodocs"],
  args: {
    label: "Enable notifications",
    size: "md",
    labelPosition: "right",
  },
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    labelPosition: { control: "radio", options: ["left", "right"] },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

const Controlled = (args: React.ComponentProps<typeof Switch>) => {
  const [checked, setChecked] = useState(!!args.checked);
  return <Switch {...args} checked={checked} onChange={(e) => setChecked(e.target.checked)} />;
};

export const Default: Story = {
  render: (args) => <Controlled {...args} />,
};

export const On: Story = {
  render: (args) => <Controlled {...args} />,
  args: { checked: true },
};

export const LabelLeft: Story = {
  render: (args) => <Controlled {...args} />,
  args: { labelPosition: "left", label: "Dark mode" },
};

export const NoLabel: Story = {
  render: (args) => <Controlled {...args} />,
  args: { label: undefined },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <Switch key={size} label={`Size: ${size}`} size={size} defaultChecked />
      ))}
    </div>
  ),
};

export const Disabled: Story = {
  render: (args) => <Controlled {...args} />,
  args: { disabled: true, label: "Disabled (off)" },
};

export const DisabledOn: Story = {
  render: (args) => <Controlled {...args} />,
  args: { disabled: true, checked: true, label: "Disabled (on)" },
};

export const SettingsGroup: Story = {
  render: () => {
    const [settings, setSettings] = useState({
      notifications: true,
      newsletter: false,
      darkMode: false,
      twoFactor: true,
    });
    const toggle = (key: keyof typeof settings) =>
      setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "360px" }}>
        {(Object.entries(settings) as [keyof typeof settings, boolean][]).map(([key, val]) => (
          <div key={key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: "14px", color: "var(--color-text-primary)" }}>
              {key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}
            </span>
            <Switch checked={val} onChange={() => toggle(key)} size="sm" />
          </div>
        ))}
      </div>
    );
  },
};

export const CustomTheme: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    checked: true,
    label: "Custom color",
    style: { "--switch-track-on": "#6366f1" } as React.CSSProperties,
  },
};
