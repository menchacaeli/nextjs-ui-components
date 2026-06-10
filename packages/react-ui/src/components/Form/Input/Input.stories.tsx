import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Input from "./Input.tsx";

const meta: Meta<typeof Input> = {
  title: "Form/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    name: "demo",
    label: "Label",
    placeholder: "Placeholder text",
    value: "",
    showLabel: true,
  },
  argTypes: {
    type: { control: "select", options: ["text", "email", "password", "number", "tel", "url"] },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    error: { control: "text" },
    success: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

const Controlled = (args: React.ComponentProps<typeof Input>) => {
  const [value, setValue] = useState(String(args.value ?? ""));
  return <Input {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
};

export const Default: Story = {
  render: (args) => <Controlled {...args} />,
};

export const WithValue: Story = {
  render: (args) => <Controlled {...args} />,
  args: { value: "Hello world" },
};

export const Required: Story = {
  render: (args) => <Controlled {...args} />,
  args: { label: "Email address", required: true, placeholder: "you@example.com" },
};

export const ErrorState: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "Email address",
    value: "not-an-email",
    error: "Please enter a valid email address",
  },
};

export const SuccessState: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "Username",
    value: "elimenchaca",
    success: "Username is available",
  },
};

export const Disabled: Story = {
  render: (args) => <Controlled {...args} />,
  args: { label: "Disabled field", value: "Can't edit this", disabled: true },
};

export const NoLabel: Story = {
  render: (args) => <Controlled {...args} />,
  args: { showLabel: false, placeholder: "Search..." },
};

export const Password: Story = {
  render: (args) => <Controlled {...args} />,
  args: { type: "password", label: "Password", placeholder: "••••••••" },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "400px" }}>
      <Input name="default" label="Default" value="" placeholder="Enter text" onChange={() => {}} />
      <Input name="filled" label="With value" value="Some value" onChange={() => {}} />
      <Input name="error" label="Error" value="bad input" error="This field is required" onChange={() => {}} />
      <Input name="success" label="Success" value="valid input" success="Looks good!" onChange={() => {}} />
      <Input name="disabled" label="Disabled" value="Can't edit" disabled onChange={() => {}} />
    </div>
  ),
};
