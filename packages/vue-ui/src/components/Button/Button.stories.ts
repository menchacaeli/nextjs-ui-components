import type { Meta, StoryObj } from '@storybook/vue3';
import Button from './Button.vue';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['filled', 'gradient', 'outlined', 'ghost'] },
    color: { control: 'select', options: ['primary', 'secondary', 'danger', 'warning', 'success'] },
    size: { control: 'select', options: ['xs', 'sm', 'md', 'lg', 'xl'] },
    shape: { control: 'select', options: ['default', 'rounded', 'pill', 'sharp'] },
  },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: { text: 'Button', variant: 'filled', color: 'primary', size: 'md' },
};

export const Outlined: Story = {
  args: { text: 'Button', variant: 'outlined', color: 'primary', size: 'md' },
};

export const Loading: Story = {
  args: { text: 'Loading', loading: true },
};

export const Disabled: Story = {
  args: { text: 'Disabled', disabled: true },
};
