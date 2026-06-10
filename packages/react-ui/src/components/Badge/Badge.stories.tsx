import type { Meta, StoryObj } from "@storybook/react";
import Badge from "./Badge.tsx";

const meta: Meta<typeof Badge> = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: {
    text: "Badge",
    variant: "filled",
    color: "blue",
    shape: "default",
    dot: false,
  },
  argTypes: {
    variant: { control: "select", options: ["filled", "outlined", "ghost"] },
    color: {
      control: "select",
      options: ["gray", "red", "yellow", "green", "blue", "purple", "pink"],
    },
    shape: { control: "select", options: ["default", "pill"] },
    dot: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {};

export const AllColors: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
      {(["gray", "red", "yellow", "green", "blue", "purple", "pink"] as const).map((color) => (
        <Badge key={color} text={color} variant="filled" color={color} />
      ))}
    </div>
  ),
};

export const Filled: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
      {(["gray", "red", "yellow", "green", "blue", "purple", "pink"] as const).map((color) => (
        <Badge key={color} text={color} variant="filled" color={color} />
      ))}
    </div>
  ),
};

export const Outlined: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
      {(["gray", "red", "yellow", "green", "blue", "purple", "pink"] as const).map((color) => (
        <Badge key={color} text={color} variant="outlined" color={color} />
      ))}
    </div>
  ),
};

export const Ghost: Story = {
  args: { variant: "ghost", text: "Ghost badge" },
};

export const Pill: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
      {(["gray", "red", "yellow", "green", "blue", "purple", "pink"] as const).map((color) => (
        <Badge key={color} text={color} variant="filled" color={color} shape="pill" />
      ))}
    </div>
  ),
};

export const WithDot: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
      {(["gray", "red", "yellow", "green", "blue", "purple", "pink"] as const).map((color) => (
        <Badge key={color} text={color} variant="filled" color={color} dot />
      ))}
    </div>
  ),
};

export const StatusDots: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
      {(["gray", "red", "yellow", "green", "blue", "purple", "pink"] as const).map((color) => (
        <Badge key={color} text="" variant="filled" color={color} dot />
      ))}
    </div>
  ),
};

export const AllShapes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px" }}>
      <Badge text="Default" variant="filled" color="blue" shape="default" />
      <Badge text="Pill" variant="filled" color="blue" shape="pill" />
    </div>
  ),
};

export const CustomTheme: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "8px" }}>
      <Badge
        text="Custom"
        variant="filled"
        color="blue"
        style={
          { "--badge-bg": "#6366f1", "--badge-color": "#fff" } as React.CSSProperties
        }
      />
      <Badge
        text="Square"
        variant="filled"
        color="green"
        style={{ "--badge-radius": "0" } as React.CSSProperties}
      />
    </div>
  ),
};
