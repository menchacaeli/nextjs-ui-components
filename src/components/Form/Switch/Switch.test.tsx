import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Switch from './Switch';

describe('Switch', () => {
  it('renders a checkbox with role="switch"', () => {
    render(<Switch />);
    expect(screen.getByRole('switch')).toBeInTheDocument();
  });

  it('renders and associates a label', () => {
    render(<Switch label="Dark mode" />);
    expect(screen.getByLabelText('Dark mode')).toBeInTheDocument();
  });

  it('calls onChange when toggled', async () => {
    const onChange = vi.fn();
    render(<Switch onChange={onChange} />);
    await userEvent.click(screen.getByRole('switch'));
    expect(onChange).toHaveBeenCalled();
  });

  it('is disabled when disabled=true', () => {
    render(<Switch disabled />);
    expect(screen.getByRole('switch')).toBeDisabled();
  });

  it('reflects checked state', () => {
    render(<Switch checked onChange={vi.fn()} />);
    expect(screen.getByRole('switch')).toBeChecked();
  });

  it('applies size class', () => {
    render(<Switch size="lg" />);
    const wrapper = screen.getByRole('switch').closest('label');
    expect(wrapper).toHaveClass('switch--lg');
  });
});
