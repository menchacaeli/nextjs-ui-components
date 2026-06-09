import { render, screen } from '@testing-library/react';
import Breadcrumb from './Breadcrumb';

const items = [
  { label: 'Home',     href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Widgets' },
];

describe('Breadcrumb', () => {
  it('renders a nav with aria-label="Breadcrumb"', () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByRole('navigation', { name: 'Breadcrumb' })).toBeInTheDocument();
  });

  it('renders links for items with href', () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: 'Products' })).toHaveAttribute('href', '/products');
  });

  it('renders the last item as a span (not a link)', () => {
    render(<Breadcrumb items={items} />);
    expect(screen.queryByRole('link', { name: 'Widgets' })).not.toBeInTheDocument();
    expect(screen.getByText('Widgets')).toBeInTheDocument();
  });

  it('marks the last item with aria-current="page"', () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByText('Widgets')).toHaveAttribute('aria-current', 'page');
  });

  it('renders all item labels', () => {
    render(<Breadcrumb items={items} />);
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Products')).toBeInTheDocument();
    expect(screen.getByText('Widgets')).toBeInTheDocument();
  });
});
