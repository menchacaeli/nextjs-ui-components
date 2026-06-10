import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Textarea from "./Textarea.tsx";

const meta: Meta<typeof Textarea> = {
  title: "Form/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  args: {
    name: "demo",
    label: "Message",
    placeholder: "Enter your message here...",
    value: "",
    showCount: false,
  },
  argTypes: {
    resize: { control: "select", options: ["none", "vertical", "horizontal", "both"] },
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    showCount: { control: "boolean" },
    error: { control: "text" },
    success: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Textarea>;

const Controlled = (args: React.ComponentProps<typeof Textarea>) => {
  const [value, setValue] = useState(String(args.value ?? ""));
  return <Textarea {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
};

export const Default: Story = {
  render: (args) => <Controlled {...args} />,
};

export const WithValue: Story = {
  render: (args) => <Controlled {...args} />,
  args: { value: "This is some pre-filled text in the textarea." },
};

export const Required: Story = {
  render: (args) => <Controlled {...args} />,
  args: { label: "Feedback", required: true },
};

export const ErrorState: Story = {
  render: (args) => <Controlled {...args} />,
  args: { error: "This field is required", value: "" },
};

export const SuccessState: Story = {
  render: (args) => <Controlled {...args} />,
  args: { success: "Looks good!", value: "My message content." },
};

export const WithCharCount: Story = {
  render: (args) => <Controlled {...args} />,
  args: { showCount: true, maxLength: 280, label: "Tweet", placeholder: "What's on your mind?" },
};

export const NoResize: Story = {
  render: (args) => <Controlled {...args} />,
  args: { resize: "none", label: "Fixed height" },
};

export const Disabled: Story = {
  render: (args) => <Controlled {...args} />,
  args: { disabled: true, value: "This content cannot be edited.", label: "Locked field" },
};

export const AllStates: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "480px" }}>
      <Textarea name="default" label="Default" value="" placeholder="Enter text" onChange={() => {}} />
      <Textarea name="filled" label="With value" value="Some content here." onChange={() => {}} />
      <Textarea name="error" label="Error" value="" error="This field is required" onChange={() => {}} />
      <Textarea name="success" label="Success" value="Valid content." success="Looks good!" onChange={() => {}} />
      <Textarea name="count" label="With count" value="" showCount maxLength={200} onChange={() => {}} />
      <Textarea name="disabled" label="Disabled" value="Can't edit this." disabled onChange={() => {}} />
    </div>
  ),
};
