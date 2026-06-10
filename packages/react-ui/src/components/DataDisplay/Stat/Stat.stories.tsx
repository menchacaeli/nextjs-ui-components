import type { Meta, StoryObj } from "@storybook/react";
import Stat from "./Stat.tsx";
import { Users, DollarSign, TrendingUp, ShoppingCart } from "lucide-react";

const meta: Meta<typeof Stat> = {
  title: "DataDisplay/Stat",
  component: Stat,
  tags: ["autodocs"],
  args: { label: "Total revenue", value: "$45,231.89" },
};
export default meta;
type Story = StoryObj<typeof Stat>;

export const Default: Story = {};

export const WithDelta: Story = {
  args: { delta: 12.5, deltaLabel: "from last month" },
};

export const Negative: Story = {
  args: { delta: -3.2, deltaLabel: "from last month" },
};

export const WithIcon: Story = {
  args: {
    icon: <DollarSign size={20} />,
    delta: 8.1,
    deltaLabel: "from last month",
  },
};

export const StatGrid: Story = {
  render: () => (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px" }}>
      <Stat label="Total Users"   value="12,429"     delta={5.2}   deltaLabel="vs last month" icon={<Users size={20} />} />
      <Stat label="Revenue"       value="$48,291"    delta={12.1}  deltaLabel="vs last month" icon={<DollarSign size={20} />} />
      <Stat label="Growth Rate"   value="18.3%"      delta={2.4}   deltaLabel="vs last month" icon={<TrendingUp size={20} />} />
      <Stat label="Orders"        value="3,842"      delta={-1.8}  deltaLabel="vs last month" icon={<ShoppingCart size={20} />} />
    </div>
  ),
};
