import { render, screen } from '@testing-library/react';
import Spinner from './Spinner';

describe('Spinner', () => {
  it('renders with role="status"', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('has default aria-label "Loading…"', () => {
    render(<Spinner />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Loading…');
  });

  it('accepts a custom label', () => {
    render(<Spinner label="Processing payment" />);
    expect(screen.getByRole('status')).toHaveAttribute('aria-label', 'Processing payment');
  });

  it('applies size class', () => {
    render(<Spinner size="lg" />);
    expect(screen.getByRole('status')).toHaveClass('spinner--lg');
  });

  it('applies custom className', () => {
    render(<Spinner className="my-spinner" />);
    expect(screen.getByRole('status')).toHaveClass('my-spinner');
  });
});
