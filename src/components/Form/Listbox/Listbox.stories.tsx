import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { MapPin, Globe, Briefcase, Star } from "lucide-react";
import Listbox from "./Listbox.tsx";

const frameworks = [
  { label: "React",   value: "react" },
  { label: "Vue",     value: "vue" },
  { label: "Angular", value: "angular" },
  { label: "Svelte",  value: "svelte" },
  { label: "Solid",   value: "solid" },
];

const countries = [
  { label: "United States", value: "us", description: "North America", icon: <MapPin size={14} /> },
  { label: "United Kingdom", value: "uk", description: "Europe",       icon: <Globe size={14} /> },
  { label: "Canada",         value: "ca", description: "North America", icon: <MapPin size={14} /> },
  { label: "Australia",      value: "au", description: "Oceania",       icon: <Globe size={14} /> },
  { label: "Germany",        value: "de", description: "Europe",        icon: <Globe size={14} /> },
];

const roles = [
  { label: "Viewer",        value: "viewer",    description: "Read-only access",          icon: <Star size={14} /> },
  { label: "Member",        value: "member",    description: "Can edit content",          icon: <Briefcase size={14} /> },
  { label: "Admin",         value: "admin",     description: "Full administrative access", icon: <Briefcase size={14} /> },
  { label: "Owner",         value: "owner",     description: "Billing and settings",      icon: <Star size={14} />, disabled: true },
];

const meta: Meta<typeof Listbox> = {
  title: "Form/Listbox",
  component: Listbox,
  tags: ["autodocs"],
  decorators: [
    (Story: React.ComponentType) => (
      <div style={{ padding: "40px", maxWidth: "360px", margin: "0 auto" }}>
        <Story />
      </div>
    ),
  ],
  args: {
    options: frameworks,
    label: "Framework",
    placeholder: "Select a framework",
  },
};

export default meta;
type Story = StoryObj<typeof Listbox>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return <Listbox {...args} value={value} onChange={setValue} />;
  },
};

export const WithDescription: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return <Listbox {...args} value={value} onChange={setValue} />;
  },
  args: {
    options: roles,
    label: "Role",
    placeholder: "Assign a role",
  },
};

export const WithIcons: Story = {
  render: (args) => {
    const [value, setValue] = useState("us");
    return <Listbox {...args} value={value} onChange={setValue} />;
  },
  args: {
    options: countries,
    label: "Country",
    placeholder: "Select a country",
  },
};

export const Required: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return <Listbox {...args} value={value} onChange={setValue} />;
  },
  args: {
    required: true,
    label: "Framework",
  },
};

export const WithError: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return <Listbox {...args} value={value} onChange={setValue} />;
  },
  args: {
    error: "Please select a framework to continue.",
    label: "Framework",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: "react",
    label: "Framework",
    options: frameworks,
  },
};
