import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Select from "./Select.tsx";

const countries = [
  { label: "United States", value: "us" },
  { label: "Canada", value: "ca" },
  { label: "United Kingdom", value: "gb" },
  { label: "Australia", value: "au" },
  { label: "Germany", value: "de" },
  { label: "France", value: "fr" },
  { label: "Japan", value: "jp" },
];

const roles = [
  { label: "Admin", value: "admin" },
  { label: "Editor", value: "editor" },
  { label: "Viewer", value: "viewer" },
  { label: "Guest", value: "guest", disabled: true },
];

const meta: Meta<typeof Select> = {
  title: "Form/Select",
  component: Select,
  tags: ["autodocs"],
  args: {
    label: "Country",
    placeholder: "Select a country",
    options: countries,
  },
  argTypes: {
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    error: { control: "text" },
    success: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

const Controlled = (args: React.ComponentProps<typeof Select>) => {
  const [value, setValue] = useState(String(args.value ?? ""));
  return <Select {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
};

export const Default: Story = {
  render: (args) => <Controlled {...args} />,
};

export const WithValue: Story = {
  render: (args) => <Controlled {...args} />,
  args: { value: "us" },
};

export const Required: Story = {
  render: (args) => <Controlled {...args} />,
  args: { required: true },
};

export const ErrorState: Story = {
  render: (args) => <Controlled {...args} />,
  args: { error: "Please select a country" },
};

export const SuccessState: Story = {
  render: (args) => <Controlled {...args} />,
  args: { success: "Valid selection", value: "us" },
};

export const Disabled: Story = {
  render: (args) => <Controlled {...args} />,
  args: { disabled: true, value: "us" },
};

export const WithDisabledOption: Story = {
  render: (args) => <Controlled {...args} />,
  args: { label: "Role", placeholder: "Select a role", options: roles },
};

export const NoLabel: Story = {
  render: (args) => <Controlled {...args} />,
  args: { label: undefined, placeholder: "Filter by country" },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "360px" }}>
      <Select label="Default" options={countries} placeholder="Select..." value="" onChange={() => {}} />
      <Select label="With value" options={countries} value="ca" onChange={() => {}} />
      <Select label="Error" options={countries} value="" error="Selection required" onChange={() => {}} />
      <Select label="Success" options={countries} value="gb" success="Valid" onChange={() => {}} />
      <Select label="Disabled" options={countries} value="au" disabled onChange={() => {}} />
    </div>
  ),
};
