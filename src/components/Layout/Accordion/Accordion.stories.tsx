import type { Meta, StoryObj } from "@storybook/react";
import Accordion from "./Accordion.tsx";

const items = [
  {
    id: "q1",
    title: "What is your refund policy?",
    content: "We offer a 30-day money-back guarantee for all plans. Simply contact our support team and we'll process your refund within 2–3 business days.",
  },
  {
    id: "q2",
    title: "How do I cancel my subscription?",
    content: "You can cancel at any time from your account settings. Your access will continue until the end of the billing period.",
  },
  {
    id: "q3",
    title: "Can I upgrade or downgrade my plan?",
    content: "Yes, you can change your plan at any time. Upgrades take effect immediately and are prorated. Downgrades take effect at the next billing cycle.",
  },
  {
    id: "q4",
    title: "Is there a free trial?",
    content: "Yes! All new accounts include a 14-day free trial with full access to all features. No credit card required.",
    disabled: false,
  },
];

const meta: Meta<typeof Accordion> = {
  title: "Layout/Accordion",
  component: Accordion,
  tags: ["autodocs"],
  args: { items, multiple: false },
  argTypes: { multiple: { control: "boolean" } },
};
export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {};
export const DefaultOpen: Story = { args: { defaultOpen: "q1" } };
export const MultipleOpen: Story = { args: { multiple: true, defaultOpen: ["q1", "q3"] } };
export const WithDisabled: Story = {
  args: {
    items: [...items, { id: "q5", title: "Locked question (disabled)", content: "This item cannot be expanded.", disabled: true }],
  },
};
