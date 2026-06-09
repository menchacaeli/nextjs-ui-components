import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button', () => {
  it('renders button text', () => {
    render(<Button text="Click me" />);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const onClick = vi.fn();
    render(<Button text="Go" onClick={onClick} />);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it('does not call onClick when disabled', async () => {
    const onClick = vi.fn();
    render(<Button text="Go" onClick={onClick} disabled />);
    await userEvent.click(screen.getByRole('button'));
    expect(onClick).not.toHaveBeenCalled();
  });

  it('is disabled when loading', () => {
    render(<Button text="Save" loading />);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('shows Loading text when loading', () => {
    render(<Button text="Save" loading />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders leading and trailing icons', () => {
    render(
      <Button
        text="Save"
        leadingIcon={<svg data-testid="lead" />}
        trailingIcon={<svg data-testid="trail" />}
      />
    );
    expect(screen.getByTestId('lead')).toBeInTheDocument();
    expect(screen.getByTestId('trail')).toBeInTheDocument();
  });

  it('applies fullWidth class', () => {
    render(<Button text="Go" fullWidth />);
    expect(screen.getByRole('button')).toHaveClass('btn--full');
  });
});
