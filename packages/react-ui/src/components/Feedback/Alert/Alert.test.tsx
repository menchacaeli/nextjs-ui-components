import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Alert from './Alert';

describe('Alert', () => {
  it('renders with role="alert"', () => {
    render(<Alert>Something happened</Alert>);
    expect(screen.getByRole('alert')).toBeInTheDocument();
  });

  it('renders children content', () => {
    render(<Alert>Check your input</Alert>);
    expect(screen.getByText('Check your input')).toBeInTheDocument();
  });

  it('renders a title when provided', () => {
    render(<Alert title="Heads up">Content here</Alert>);
    expect(screen.getByText('Heads up')).toBeInTheDocument();
  });

  it('applies variant class', () => {
    render(<Alert variant="error">Error</Alert>);
    expect(screen.getByRole('alert')).toHaveClass('alert--error');
  });

  it('shows dismiss button when dismissible=true', () => {
    render(<Alert dismissible onDismiss={vi.fn()}>Info</Alert>);
    expect(screen.getByRole('button', { name: 'Dismiss' })).toBeInTheDocument();
  });

  it('calls onDismiss when dismiss button clicked', async () => {
    const onDismiss = vi.fn();
    render(<Alert dismissible onDismiss={onDismiss}>Info</Alert>);
    await userEvent.click(screen.getByRole('button', { name: 'Dismiss' }));
    expect(onDismiss).toHaveBeenCalledOnce();
  });

  it('hides dismiss button when dismissible is not set', () => {
    render(<Alert>Info</Alert>);
    expect(screen.queryByRole('button', { name: 'Dismiss' })).not.toBeInTheDocument();
  });
});
