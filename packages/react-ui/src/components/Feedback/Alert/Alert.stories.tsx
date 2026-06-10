import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Alert from "./Alert.tsx";

const meta: Meta<typeof Alert> = {
  title: "Feedback/Alert",
  component: Alert,
  tags: ["autodocs"],
  args: {
    variant: "info",
    children: "Your account has been updated successfully.",
    icon: true,
  },
  argTypes: {
    variant: { control: "radio", options: ["info", "success", "warning", "error"] },
  },
};
export default meta;
type Story = StoryObj<typeof Alert>;

export const Info: Story = { args: { variant: "info" } };
export const Success: Story = { args: { variant: "success", children: "Your changes have been saved." } };
export const Warning: Story = { args: { variant: "warning", children: "Your subscription expires in 3 days." } };
export const Error: Story   = { args: { variant: "error",   children: "There was a problem processing your request." } };

export const WithTitle: Story = {
  args: {
    variant: "error",
    title:   "Payment failed",
    children: "Your card was declined. Please update your payment method and try again.",
  },
};

export const Dismissible: Story = {
  render: (args) => {
    const [visible, setVisible] = useState(true);
    return visible
      ? <Alert {...args} dismissible onDismiss={() => setVisible(false)} />
      : <button onClick={() => setVisible(true)}>Show alert</button>;
  },
  args: { variant: "warning", title: "Action required", children: "Please verify your email address." },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Alert variant="info"    title="Info">    New features are available in this release.</Alert>
      <Alert variant="success" title="Success"> Your profile has been updated.</Alert>
      <Alert variant="warning" title="Warning"> You are approaching your storage limit.</Alert>
      <Alert variant="error"   title="Error">   Failed to connect to the server.</Alert>
    </div>
  ),
};
