import { render, screen, fireEvent } from '@testing-library/react';
import Avatar from './Avatar';

describe('Avatar', () => {
  it('renders an image when src is provided', () => {
    render(<Avatar src="photo.jpg" alt="Jane Doe" />);
    expect(screen.getByRole('img', { name: 'Jane Doe' })).toBeInTheDocument();
  });

  it('shows initials when no src is provided', () => {
    render(<Avatar initials="JD" alt="Jane Doe" />);
    expect(screen.getByText('JD')).toBeInTheDocument();
  });

  it('falls back to first letter of alt when image errors', () => {
    render(<Avatar src="bad.jpg" alt="Jane Doe" />);
    fireEvent.error(screen.getByRole('img'));
    expect(screen.getByText('J')).toBeInTheDocument();
  });

  it('shows "?" when no src, initials, or alt', () => {
    render(<Avatar />);
    expect(screen.getByText('?')).toBeInTheDocument();
  });

  it('renders a status indicator when status is set', () => {
    const { container } = render(<Avatar initials="A" status="online" />);
    expect(container.querySelector('.avatar--status')).toBeInTheDocument();
  });

  it('does not render status when not provided', () => {
    const { container } = render(<Avatar initials="A" />);
    expect(container.querySelector('.avatar--status')).not.toBeInTheDocument();
  });
});
