import type { Meta, StoryObj } from "@storybook/react";
import Avatar from "./Avatar.tsx";

const meta: Meta<typeof Avatar> = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  args: {
    size: "md",
    initials: "AB",
  },
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md", "lg", "xl"] },
    status: {
      control: "select",
      options: [undefined, "online", "offline", "busy", "away"],
    },
    src: { control: "text" },
    alt: { control: "text" },
    initials: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Default: Story = {};

export const WithImage: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=3",
    alt: "User avatar",
    initials: undefined,
  },
};

export const WithInitials: Story = {
  args: { initials: "JD" },
};

export const Fallback: Story = {
  args: {
    src: "https://broken-url.example/image.jpg",
    alt: "Jane Doe",
    initials: undefined,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "12px" }}>
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <Avatar key={size} size={size} initials={size.toUpperCase()} />
      ))}
    </div>
  ),
};

export const WithStatus: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px" }}>
      {(["online", "offline", "busy", "away"] as const).map((status) => (
        <div key={status} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
          <Avatar initials={status[0].toUpperCase()} status={status} />
          <span style={{ fontSize: "12px", color: "#64748b" }}>{status}</span>
        </div>
      ))}
    </div>
  ),
};

export const AllSizesWithStatus: Story = {
  render: () => (
    <div style={{ display: "flex", alignItems: "flex-end", gap: "16px" }}>
      {(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
        <Avatar key={size} size={size} initials={size.toUpperCase()} status="online" />
      ))}
    </div>
  ),
};

export const ImageWithStatus: Story = {
  args: {
    src: "https://i.pravatar.cc/150?img=5",
    alt: "User",
    status: "online",
  },
};

export const CustomTheme: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px" }}>
      <Avatar
        initials="CU"
        style={{ "--avatar-bg": "#6366f1", "--avatar-color": "#fff" } as React.CSSProperties}
      />
      <Avatar
        initials="GR"
        style={{ "--avatar-bg": "#10b981", "--avatar-color": "#fff" } as React.CSSProperties}
      />
    </div>
  ),
};
