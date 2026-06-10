import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Button from './Button.vue';

describe('Button', () => {
  it('renders with default props', () => {
    const wrapper = mount(Button, { props: { text: 'Click me' } });
    expect(wrapper.text()).toBe('Click me');
    expect(wrapper.find('button').exists()).toBe(true);
  });

  it('renders slot content', () => {
    const wrapper = mount(Button, { slots: { default: 'Slot content' } });
    expect(wrapper.text()).toBe('Slot content');
  });

  it('is disabled when disabled prop is true', () => {
    const wrapper = mount(Button, { props: { disabled: true } });
    expect(wrapper.find('button').attributes('disabled')).toBeDefined();
  });

  it('is disabled when loading prop is true', () => {
    const wrapper = mount(Button, { props: { loading: true } });
    expect(wrapper.find('button').attributes('disabled')).toBeDefined();
  });

  it('shows loading spinner when loading', () => {
    const wrapper = mount(Button, { props: { loading: true, text: 'Loading...' } });
    expect(wrapper.find('span.animate-spin').exists()).toBe(true);
  });

  it('applies fullWidth class', () => {
    const wrapper = mount(Button, { props: { fullWidth: true } });
    expect(wrapper.find('button').classes()).toContain('w-full');
  });
});
