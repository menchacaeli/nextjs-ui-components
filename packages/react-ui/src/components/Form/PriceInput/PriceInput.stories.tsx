import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import PriceInput from "./PriceInput.tsx";

const meta: Meta<typeof PriceInput> = {
  title: "Form/PriceInput",
  component: PriceInput,
  tags: ["autodocs"],
  args: {
    label: "Price",
    placeholder: "0.00",
    currencySymbol: "$",
    currencies: ["USD", "EUR", "GBP"],
    defaultCurrency: "USD",
    showLabel: true,
    disabled: false,
    required: false,
  },
  argTypes: {
    disabled: { control: "boolean" },
    required: { control: "boolean" },
    showLabel: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof PriceInput>;

const Controlled = (args: React.ComponentProps<typeof PriceInput>) => {
  const [value, setValue] = useState(args.value);
  return <PriceInput {...args} value={value} onChange={setValue} />;
};

export const Default: Story = {
  render: (args) => <Controlled {...args} />,
};

export const WithValue: Story = {
  render: (args) => <Controlled {...args} />,
  args: { value: { amount: "99.99", currency: "USD" } },
};

export const EuroCurrency: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    label: "Price (EUR)",
    currencySymbol: "€",
    defaultCurrency: "EUR",
    currencies: ["EUR", "USD", "GBP", "CHF"],
    value: { amount: "149.00", currency: "EUR" },
  },
};

export const Disabled: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    value: { amount: "29.99", currency: "USD" },
    disabled: true,
  },
};

export const Required: Story = {
  render: (args) => <Controlled {...args} />,
  args: { required: true },
};

export const NoLabel: Story = {
  render: (args) => <Controlled {...args} />,
  args: { showLabel: false },
};

export const ManyCurrencies: Story = {
  render: (args) => <Controlled {...args} />,
  args: {
    currencies: ["USD", "EUR", "GBP", "JPY", "CAD", "AUD", "CHF"],
  },
};
