import { render, screen } from '@testing-library/react';
import Stat from './Stat';

describe('Stat', () => {
  it('renders label and value', () => {
    render(<Stat label="Revenue" value="$12,000" />);
    expect(screen.getByText('Revenue')).toBeInTheDocument();
    expect(screen.getByText('$12,000')).toBeInTheDocument();
  });

  it('renders no delta element when delta is not provided', () => {
    const { container } = render(<Stat label="Revenue" value="$12,000" />);
    expect(container.querySelector('.stat--delta')).not.toBeInTheDocument();
  });

  it('applies up class for positive delta', () => {
    const { container } = render(<Stat label="Revenue" value="$12k" delta={12} />);
    expect(container.querySelector('.stat--delta-up')).toBeInTheDocument();
  });

  it('applies down class for negative delta', () => {
    const { container } = render(<Stat label="Revenue" value="$12k" delta={-5} />);
    expect(container.querySelector('.stat--delta-down')).toBeInTheDocument();
  });

  it('applies neutral class for zero delta', () => {
    const { container } = render(<Stat label="Revenue" value="$12k" delta={0} />);
    expect(container.querySelector('.stat--delta-neutral')).toBeInTheDocument();
  });

  it('renders delta aria-label with percent text', () => {
    render(<Stat label="Revenue" value="$12k" delta={8} deltaLabel="vs last month" />);
    expect(screen.getByLabelText('+8% vs last month')).toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    render(<Stat label="Revenue" value="$12k" icon={<svg data-testid="icon" />} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
});
