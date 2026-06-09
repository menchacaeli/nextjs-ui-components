import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from './Input';

describe('Input', () => {
  it('renders a text input by default', () => {
    render(<Input name="q" />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('associates label with input via htmlFor', () => {
    render(<Input name="email" label="Email address" />);
    expect(screen.getByLabelText('Email address')).toBeInTheDocument();
  });

  it('calls onChange when user types', async () => {
    const onChange = vi.fn();
    render(<Input name="q" value="" onChange={onChange} />);
    await userEvent.type(screen.getByRole('textbox'), 'hello');
    expect(onChange).toHaveBeenCalled();
  });

  it('sets aria-invalid when error is provided', () => {
    render(<Input name="q" error="Required" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('shows error message text', () => {
    render(<Input name="q" error="This field is required" />);
    expect(screen.getByText('This field is required')).toBeInTheDocument();
  });

  it('does not set aria-invalid without error', () => {
    render(<Input name="q" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'false');
  });

  it('disables the input when disabled=true', () => {
    render(<Input name="q" disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('sets required attribute', () => {
    render(<Input name="q" label="Name" required />);
    expect(screen.getByRole('textbox')).toBeRequired();
  });

  it('shows success message', () => {
    render(<Input name="q" success="Looks good!" />);
    expect(screen.getByText('Looks good!')).toBeInTheDocument();
  });
});
