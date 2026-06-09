import type { Meta, StoryObj } from "@storybook/react";
import { Mail, ChevronRight, Download, Plus } from "lucide-react";
import Button from "./Button.tsx";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["filled", "gradient", "outlined", "ghost"],
    },
    color: {
      control: "select",
      options: [
        "primary",
        "secondary",
        "danger",
        "warning",
        "success",
        "info",
        "gray",
      ],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    shape: {
      control: "select",
      options: ["default", "rounded", "pill", "sharp"],
    },
    animation: {
      control: "select",
      options: ["", "ripple", "scale"],
    },
    leadingIcon: { control: false },
    trailingIcon: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: { text: "Button" },
};

// ── Variants ────────────────────────────────────────────────
export const Filled: Story = {
  args: { text: "Filled", variant: "filled", color: "primary" },
};

export const Outlined: Story = {
  args: { text: "Outlined", variant: "outlined", color: "primary" },
};

export const Ghost: Story = {
  args: { text: "Ghost", variant: "ghost", color: "primary" },
};

export const Gradient: Story = {
  args: { text: "Gradient", variant: "gradient", color: "primary" },
};

// ── All Colors ───────────────────────────────────────────────
export const AllColors: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
      {(
        [
          "primary",
          "secondary",
          "danger",
          "warning",
          "success",
          "info",
          "gray",
        ] as const
      ).map((color) => (
        <Button key={color} text={color} color={color} />
      ))}
    </div>
  ),
};

// ── Shapes ───────────────────────────────────────────────────
export const AllShapes: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
      <Button text="Default" shape="default" />
      <Button text="Rounded" shape="rounded" />
      <Button text="Pill" shape="pill" />
      <Button text="Sharp" shape="sharp" />
    </div>
  ),
};

// ── Sizes ────────────────────────────────────────────────────
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px" }}>
      <Button text="Extra Small" size="xs" />
      <Button text="Small" size="sm" />
      <Button text="Medium" size="md" />
      <Button text="Large" size="lg" />
      <Button text="Extra Large" size="xl" />
    </div>
  ),
};

// ── Icons ────────────────────────────────────────────────────
export const WithLeadingIcon: Story = {
  args: { text: "Send Email", leadingIcon: <Mail /> },
};

export const WithTrailingIcon: Story = {
  args: { text: "Next", trailingIcon: <ChevronRight /> },
};

export const WithBothIcons: Story = {
  args: {
    text: "Download",
    leadingIcon: <Download />,
    trailingIcon: <ChevronRight />,
  },
};

// ── Icon Only ────────────────────────────────────────────────
export const IconOnly: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px" }}>
      <Button iconOnly leadingIcon={<Mail />} size="xs" />
      <Button iconOnly leadingIcon={<Mail />} size="sm" />
      <Button iconOnly leadingIcon={<Mail />} size="md" />
      <Button iconOnly leadingIcon={<Mail />} size="lg" />
      <Button iconOnly leadingIcon={<Mail />} size="xl" />
    </div>
  ),
};

export const IconOnlyVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "8px" }}>
      <Button iconOnly leadingIcon={<Plus />} variant="filled" />
      <Button iconOnly leadingIcon={<Plus />} variant="outlined" />
      <Button iconOnly leadingIcon={<Plus />} variant="ghost" />
      <Button iconOnly leadingIcon={<Plus />} variant="gradient" shape="rounded" />
    </div>
  ),
};

// ── States ───────────────────────────────────────────────────
export const Loading: Story = {
  args: { text: "Saving...", loading: true },
};

export const Disabled: Story = {
  args: { text: "Disabled", disabled: true },
};

// ── Animations ───────────────────────────────────────────────
export const RippleAnimation: Story = {
  args: { text: "Click me", animation: "ripple" },
};

export const ScaleAnimation: Story = {
  args: { text: "Press me", animation: "scale" },
};

// ── Full Width ───────────────────────────────────────────────
export const FullWidth: Story = {
  args: { text: "Full Width Button", fullWidth: true },
  decorators: [
    (Story: React.ComponentType) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
};

// ── Theming Demo ─────────────────────────────────────────────
export const CustomTheme: Story = {
  render: () => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
      {/* Override btn tokens inline to show theming capability */}
      <Button text="Square corners" style={{ "--btn-radius": "0" } as React.CSSProperties} />
      <Button text="Custom color" style={{ "--btn-bg": "#6366f1", "--btn-color": "#fff" } as React.CSSProperties} />
      <Button text="Pill" style={{ "--btn-radius": "9999px" } as React.CSSProperties} />
    </div>
  ),
};
