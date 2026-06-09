import type { Meta, StoryObj } from "@storybook/react";
import StackedList from "./StackedList.tsx";
import Avatar from "../Avatar/Avatar.tsx";
import Badge from "../Badge/Badge.tsx";
import Button from "../Button/Button.tsx";

const users = [
  { text: "Alice Martin", value: "alice", secondaryText: "alice@example.com", avatar: <Avatar initials="AM" size="sm" status="online" /> },
  { text: "Bob Chen", value: "bob", secondaryText: "bob@example.com", avatar: <Avatar initials="BC" size="sm" status="offline" /> },
  { text: "Carol Davis", value: "carol", secondaryText: "carol@example.com", avatar: <Avatar initials="CD" size="sm" status="busy" /> },
  { text: "David Kim", value: "david", secondaryText: "david@example.com", avatar: <Avatar initials="DK" size="sm" status="away" /> },
];

const meta: Meta<typeof StackedList> = {
  title: "Components/StackedList",
  component: StackedList,
  tags: ["autodocs"],
  args: {
    items: users,
  },
};

export default meta;
type Story = StoryObj<typeof StackedList>;

export const Default: Story = {};

export const Selectable: Story = {
  args: {
    items: users.map((u) => ({ ...u, selectable: true })),
    onItemClick: (item) => console.log("Clicked:", item.value),
  },
};

export const WithSecondaryActions: Story = {
  args: {
    items: users.map((u) => ({
      ...u,
      secondaryAction: <Button text="View" size="sm" variant="outlined" color="primary" />,
    })),
  },
};

export const WithBadges: Story = {
  args: {
    items: [
      { ...users[0], secondaryAction: <Badge text="Admin" variant="filled" color="blue" /> },
      { ...users[1], secondaryAction: <Badge text="Member" variant="filled" color="gray" /> },
      { ...users[2], secondaryAction: <Badge text="Viewer" variant="outlined" color="purple" /> },
      { ...users[3], secondaryAction: <Badge text="Pending" variant="filled" color="yellow" dot /> },
    ],
  },
};

export const SimpleList: Story = {
  args: {
    items: [
      { text: "First item", value: "1" },
      { text: "Second item", value: "2", secondaryText: "with description" },
      { text: "Third item", value: "3" },
    ],
  },
};

export const NoAvatars: Story = {
  args: {
    items: users.map(({ text, value, secondaryText }) => ({ text, value, secondaryText })),
  },
};
