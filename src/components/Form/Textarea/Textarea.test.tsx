import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Textarea from './Textarea';

describe('Textarea', () => {
  it('renders a textarea', () => {
    render(<Textarea />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('associates label via htmlFor', () => {
    render(<Textarea name="bio" label="Bio" />);
    expect(screen.getByLabelText('Bio')).toBeInTheDocument();
  });

  it('calls onChange when user types', async () => {
    const onChange = vi.fn();
    render(<Textarea value="" onChange={onChange} />);
    await userEvent.type(screen.getByRole('textbox'), 'Hello');
    expect(onChange).toHaveBeenCalled();
  });

  it('sets aria-invalid when error is provided', () => {
    render(<Textarea error="Required" />);
    expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('shows error message', () => {
    render(<Textarea error="Too short" />);
    expect(screen.getByText('Too short')).toBeInTheDocument();
  });

  it('disables the textarea', () => {
    render(<Textarea disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });

  it('sets required attribute', () => {
    render(<Textarea label="Notes" required />);
    expect(screen.getByRole('textbox')).toBeRequired();
  });

  it('shows character count when showCount and maxLength are set', () => {
    render(<Textarea showCount maxLength={100} value="Hello" onChange={vi.fn()} />);
    expect(screen.getByText('5/100')).toBeInTheDocument();
  });
});
