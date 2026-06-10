import type { Meta, StoryObj } from "@storybook/react";
import EmptyState from "./EmptyState.tsx";
import { Inbox, Search, FolderOpen, Users } from "lucide-react";

const meta: Meta<typeof EmptyState> = {
  title: "DataDisplay/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
  args: {
    title: "No results found",
    description: "Try adjusting your search or filter to find what you're looking for.",
    icon: <Search size={24} />,
  },
};
export default meta;
type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {};

export const WithAction: Story = {
  args: {
    icon:        <Inbox size={24} />,
    title:       "Your inbox is empty",
    description: "When you receive messages, they will appear here.",
    action:      <button style={{ padding: "8px 16px", background: "#3b82f6", color: "#fff", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "14px", fontWeight: 500 }}>Compose message</button>,
  },
};

export const NoFiles: Story = {
  args: {
    icon:        <FolderOpen size={24} />,
    title:       "No files uploaded",
    description: "Upload your first file to get started.",
  },
};

export const NoTeamMembers: Story = {
  args: {
    icon:  <Users size={24} />,
    title: "No team members yet",
  },
};
