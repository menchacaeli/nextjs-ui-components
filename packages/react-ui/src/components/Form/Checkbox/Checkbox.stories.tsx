import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Checkbox from "./Checkbox.tsx";

const meta: Meta<typeof Checkbox> = {
  title: "Form/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  args: {
    label: "Accept terms and conditions",
  },
  argTypes: {
    disabled: { control: "boolean" },
    indeterminate: { control: "boolean" },
    error: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

const Controlled = (args: React.ComponentProps<typeof Checkbox>) => {
  const [checked, setChecked] = useState(!!args.checked);
  return <Checkbox {...args} checked={checked} onChange={(e) => setChecked(e.target.checked)} />;
};

export const Default: Story = {
  render: (args) => <Controlled {...args} />,
};

export const Checked: Story = {
  render: (args) => <Controlled {...args} />,
  args: { checked: true },
};

export const Indeterminate: Story = {
  render: (args) => <Controlled {...args} />,
  args: { indeterminate: true, label: "Select all" },
};

export const WithError: Story = {
  render: (args) => <Controlled {...args} />,
  args: { error: "You must accept the terms to continue" },
};

export const Disabled: Story = {
  render: (args) => <Controlled {...args} />,
  args: { disabled: true, label: "Disabled option" },
};

export const DisabledChecked: Story = {
  render: (args) => <Controlled {...args} />,
  args: { disabled: true, checked: true, label: "Disabled and checked" },
};

export const NoLabel: Story = {
  render: (args) => <Controlled {...args} />,
  args: { label: undefined },
};

export const Group: Story = {
  render: () => {
    const options = ["Notifications", "Newsletter", "Product updates", "Security alerts"];
    const [selected, setSelected] = useState<string[]>(["Notifications"]);
    const toggle = (opt: string) =>
      setSelected((prev) =>
        prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]
      );
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {options.map((opt) => (
          <Checkbox
            key={opt}
            label={opt}
            checked={selected.includes(opt)}
            onChange={() => toggle(opt)}
          />
        ))}
      </div>
    );
  },
};

export const SelectAll: Story = {
  render: () => {
    const items = ["Item A", "Item B", "Item C", "Item D"];
    const [selected, setSelected] = useState<string[]>([]);
    const allSelected = selected.length === items.length;
    const someSelected = selected.length > 0 && !allSelected;

    const toggleAll = () => setSelected(allSelected ? [] : [...items]);
    const toggleItem = (item: string) =>
      setSelected((prev) =>
        prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
      );

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <Checkbox
          label="Select all"
          checked={allSelected}
          indeterminate={someSelected}
          onChange={toggleAll}
        />
        <div style={{ paddingLeft: "24px", display: "flex", flexDirection: "column", gap: "8px" }}>
          {items.map((item) => (
            <Checkbox
              key={item}
              label={item}
              checked={selected.includes(item)}
              onChange={() => toggleItem(item)}
            />
          ))}
        </div>
      </div>
    );
  },
};

export const CustomTheme: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    checked: true,
    label: "Custom color",
    style: { "--checkbox-color": "#6366f1" } as React.CSSProperties,
  },
};
