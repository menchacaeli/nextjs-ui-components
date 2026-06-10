import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pagination from './Pagination';

describe('Pagination', () => {
  it('renders a navigation landmark', () => {
    render(<Pagination page={1} totalPages={5} onChange={vi.fn()} />);
    expect(screen.getByRole('navigation', { name: 'Pagination' })).toBeInTheDocument();
  });

  it('disables the previous button on page 1', () => {
    render(<Pagination page={1} totalPages={5} onChange={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Previous page' })).toBeDisabled();
  });

  it('disables the next button on the last page', () => {
    render(<Pagination page={5} totalPages={5} onChange={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Next page' })).toBeDisabled();
  });

  it('calls onChange with page - 1 when previous is clicked', async () => {
    const onChange = vi.fn();
    render(<Pagination page={3} totalPages={5} onChange={onChange} />);
    await userEvent.click(screen.getByRole('button', { name: 'Previous page' }));
    expect(onChange).toHaveBeenCalledWith(2);
  });

  it('calls onChange with page + 1 when next is clicked', async () => {
    const onChange = vi.fn();
    render(<Pagination page={3} totalPages={5} onChange={onChange} />);
    await userEvent.click(screen.getByRole('button', { name: 'Next page' }));
    expect(onChange).toHaveBeenCalledWith(4);
  });

  it('marks the current page with aria-current="page"', () => {
    render(<Pagination page={2} totalPages={5} onChange={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Page 2' })).toHaveAttribute('aria-current', 'page');
  });

  it('calls onChange with the correct page when a page button is clicked', async () => {
    const onChange = vi.fn();
    render(<Pagination page={1} totalPages={5} onChange={onChange} />);
    await userEvent.click(screen.getByRole('button', { name: 'Page 3' }));
    expect(onChange).toHaveBeenCalledWith(3);
  });

  it('shows first/last buttons when showFirstLast=true', () => {
    render(<Pagination page={3} totalPages={5} onChange={vi.fn()} showFirstLast />);
    expect(screen.getByRole('button', { name: 'First page' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Last page' })).toBeInTheDocument();
  });
});
