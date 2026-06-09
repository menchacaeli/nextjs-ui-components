import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import Pagination from "./Pagination.tsx";

const meta: Meta<typeof Pagination> = {
  title: "Navigation/Pagination",
  component: Pagination,
  tags: ["autodocs"],
  args: { page: 5, totalPages: 20, siblings: 1 },
};
export default meta;
type Story = StoryObj<typeof Pagination>;

const Controlled = (args: React.ComponentProps<typeof Pagination>) => {
  const [page, setPage] = useState(args.page);
  return <Pagination {...args} page={page} onChange={setPage} />;
};

export const Default: Story = { render: (args) => <Controlled {...args} /> };

export const FewPages: Story = {
  render: (args) => <Controlled {...args} />,
  args: { page: 2, totalPages: 5 },
};

export const WithFirstLast: Story = {
  render: (args) => <Controlled {...args} />,
  args: { showFirstLast: true },
};

export const ManySiblings: Story = {
  render: (args) => <Controlled {...args} />,
  args: { siblings: 2 },
};
