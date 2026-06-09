import { render, screen } from '@testing-library/react';
import Card from './Card';

describe('Card', () => {
  it('renders children', () => {
    render(<Card><p>Card content</p></Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('applies border class by default', () => {
    const { container } = render(<Card>Content</Card>);
    expect(container.firstChild).toHaveClass('card--bordered');
  });

  it('removes border class when border=false', () => {
    const { container } = render(<Card border={false}>Content</Card>);
    expect(container.firstChild).not.toHaveClass('card--bordered');
  });

  it('applies shadow class', () => {
    const { container } = render(<Card shadow="md">Content</Card>);
    expect(container.firstChild).toHaveClass('card--shadow-md');
  });

  it('applies padding class', () => {
    const { container } = render(<Card padding="lg">Content</Card>);
    expect(container.firstChild).toHaveClass('card--padding-lg');
  });
});

describe('Card.Header', () => {
  it('renders title and description', () => {
    render(<Card><Card.Header title="My Card" description="Some info" /></Card>);
    expect(screen.getByText('My Card')).toBeInTheDocument();
    expect(screen.getByText('Some info')).toBeInTheDocument();
  });

  it('renders actions slot', () => {
    render(<Card><Card.Header title="T" actions={<button>Edit</button>} /></Card>);
    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
  });

  it('renders children when no title/description', () => {
    render(<Card><Card.Header><span>Custom header</span></Card.Header></Card>);
    expect(screen.getByText('Custom header')).toBeInTheDocument();
  });
});

describe('Card.Body', () => {
  it('renders children', () => {
    render(<Card><Card.Body><p>Body content</p></Card.Body></Card>);
    expect(screen.getByText('Body content')).toBeInTheDocument();
  });
});

describe('Card.Footer', () => {
  it('renders children', () => {
    render(<Card><Card.Footer><button>Save</button></Card.Footer></Card>);
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });
});
