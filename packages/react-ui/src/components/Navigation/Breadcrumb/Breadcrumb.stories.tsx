import type { Meta, StoryObj } from "@storybook/react";
import Breadcrumb from "./Breadcrumb.tsx";
import { Slash } from "lucide-react";

const meta: Meta<typeof Breadcrumb> = {
  title: "Navigation/Breadcrumb",
  component: Breadcrumb,
  tags: ["autodocs"],
  args: {
    items: [
      { label: "Home",     href: "#" },
      { label: "Products", href: "#" },
      { label: "Details" },
    ],
  },
};
export default meta;
type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {};

export const DeepPath: Story = {
  args: {
    items: [
      { label: "Dashboard", href: "#" },
      { label: "Settings",  href: "#" },
      { label: "Team",      href: "#" },
      { label: "Members",   href: "#" },
      { label: "Edit" },
    ],
  },
};

export const CustomSeparator: Story = {
  args: {
    separator: <Slash size={12} />,
  },
};

export const TextSeparator: Story = {
  args: { separator: "/" },
};
