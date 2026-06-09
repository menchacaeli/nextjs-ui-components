import { render, screen } from '@testing-library/react';
import Badge from './Badge';

describe('Badge', () => {
  it('renders text', () => {
    render(<Badge text="New" />);
    expect(screen.getByText('New')).toBeInTheDocument();
  });

  it('renders a dot when dot=true', () => {
    const { container } = render(<Badge text="Active" dot />);
    expect(container.querySelector('.badge--dot')).toBeInTheDocument();
  });

  it('does not render a dot by default', () => {
    const { container } = render(<Badge text="Active" />);
    expect(container.querySelector('.badge--dot')).not.toBeInTheDocument();
  });

  it('applies color class for filled variant', () => {
    render(<Badge text="Info" variant="filled" color="blue" />);
    expect(screen.getByText('Info')).toHaveClass('badge--filled-blue');
  });

  it('applies ghost class', () => {
    render(<Badge text="Ghost" variant="ghost" />);
    expect(screen.getByText('Ghost')).toHaveClass('badge--ghost');
  });

  it('applies pill shape class', () => {
    render(<Badge text="Pill" shape="pill" />);
    expect(screen.getByText('Pill')).toHaveClass('badge--pill');
  });
});
