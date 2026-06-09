import { render } from '@testing-library/react';
import Skeleton from './Skeleton';

describe('Skeleton', () => {
  it('renders the correct number of text lines', () => {
    const { container } = render(<Skeleton variant="text" lines={4} />);
    expect(container.querySelectorAll('.skeleton--text-line')).toHaveLength(4);
  });

  it('defaults to 3 text lines', () => {
    const { container } = render(<Skeleton variant="text" />);
    expect(container.querySelectorAll('.skeleton--text-line')).toHaveLength(3);
  });

  it('renders a single element for rectangular variant', () => {
    const { container } = render(<Skeleton variant="rectangular" />);
    expect(container.querySelectorAll('.skeleton')).toHaveLength(1);
    expect(container.querySelector('.skeleton--rectangular')).toBeInTheDocument();
  });

  it('renders a single element for circular variant', () => {
    const { container } = render(<Skeleton variant="circular" />);
    expect(container.querySelector('.skeleton--circular')).toBeInTheDocument();
  });

  it('applies inline width and height styles', () => {
    const { container } = render(<Skeleton variant="rectangular" width={200} height={100} />);
    const el = container.querySelector('.skeleton--rectangular') as HTMLElement;
    expect(el.style.width).toBe('200px');
    expect(el.style.height).toBe('100px');
  });

  it('is aria-hidden for non-text variants', () => {
    const { container } = render(<Skeleton variant="circular" />);
    expect(container.querySelector('.skeleton')).toHaveAttribute('aria-hidden', 'true');
  });
});
