import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import RadioGroup from "./RadioGroup.tsx";
import Radio from "./Radio.tsx";

const planOptions = [
  { label: "Starter — Free", value: "starter" },
  { label: "Pro — $12/mo", value: "pro" },
  { label: "Enterprise — Contact us", value: "enterprise" },
];

const sizeOptions = [
  { label: "Small", value: "sm" },
  { label: "Medium", value: "md" },
  { label: "Large", value: "lg" },
  { label: "Extra large (unavailable)", value: "xl", disabled: true },
];

const meta: Meta<typeof RadioGroup> = {
  title: "Form/Radio",
  component: RadioGroup,
  tags: ["autodocs"],
  args: {
    name: "demo",
    label: "Select a plan",
    options: planOptions,
    direction: "vertical",
  },
  argTypes: {
    direction: { control: "radio", options: ["vertical", "horizontal"] },
    error: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

const Controlled = (args: React.ComponentProps<typeof RadioGroup>) => {
  const [value, setValue] = useState(args.value ?? "");
  return <RadioGroup {...args} value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: (args) => <Controlled {...args} />,
};

export const WithValue: Story = {
  render: (args) => <Controlled {...args} />,
  args: { value: "pro" },
};

export const Horizontal: Story = {
  render: (args) => <Controlled {...args} />,
  args: { direction: "horizontal", label: "Size", options: sizeOptions, name: "size" },
};

export const WithDisabledOption: Story = {
  render: (args) => <Controlled {...args} />,
  args: { options: sizeOptions, name: "size-disabled", label: "T-shirt size" },
};

export const WithError: Story = {
  render: (args) => <Controlled {...args} />,
  args: { error: "Please select a plan to continue" },
};

export const NoGroupLabel: Story = {
  render: (args) => <Controlled {...args} />,
  args: { label: undefined },
};

export const StandaloneRadio: Story = {
  render: () => {
    const [val, setVal] = useState("a");
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <Radio name="standalone" value="a" label="Option A" checked={val === "a"} onChange={() => setVal("a")} />
        <Radio name="standalone" value="b" label="Option B" checked={val === "b"} onChange={() => setVal("b")} />
        <Radio name="standalone" value="c" label="Option C" checked={val === "c"} onChange={() => setVal("c")} />
      </div>
    );
  },
};

export const CustomTheme: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    value: "pro",
    style: { "--radio-color": "#6366f1" } as React.CSSProperties,
  },
};
