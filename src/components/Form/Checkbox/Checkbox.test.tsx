import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Checkbox from './Checkbox';

describe('Checkbox', () => {
  it('renders a checkbox input', () => {
    render(<Checkbox />);
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
  });

  it('renders and associates label', () => {
    render(<Checkbox label="Accept terms" />);
    expect(screen.getByLabelText('Accept terms')).toBeInTheDocument();
  });

  it('fires onChange when clicked', async () => {
    const onChange = vi.fn();
    render(<Checkbox onChange={onChange} />);
    await userEvent.click(screen.getByRole('checkbox'));
    expect(onChange).toHaveBeenCalled();
  });

  it('is disabled when disabled=true', () => {
    render(<Checkbox disabled />);
    expect(screen.getByRole('checkbox')).toBeDisabled();
  });

  it('sets aria-invalid when error is provided', () => {
    render(<Checkbox error="Required" />);
    expect(screen.getByRole('checkbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('shows error message with role="alert"', () => {
    render(<Checkbox error="This is required" />);
    expect(screen.getByRole('alert')).toHaveTextContent('This is required');
  });

  it('sets indeterminate DOM property via ref', () => {
    render(<Checkbox indeterminate />);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.indeterminate).toBe(true);
  });

  it('is checked when checked=true', () => {
    render(<Checkbox checked onChange={vi.fn()} />);
    expect(screen.getByRole('checkbox')).toBeChecked();
  });
});
