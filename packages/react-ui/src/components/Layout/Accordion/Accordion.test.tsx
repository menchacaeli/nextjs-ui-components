import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Accordion from './Accordion';

const items = [
  { id: 'a', title: 'Section A', content: <p>Content A</p> },
  { id: 'b', title: 'Section B', content: <p>Content B</p> },
  { id: 'c', title: 'Section C', content: <p>Content C</p>, disabled: true },
];

describe('Accordion', () => {
  it('renders all trigger buttons', () => {
    render(<Accordion items={items} />);
    expect(screen.getByRole('button', { name: 'Section A' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Section B' })).toBeInTheDocument();
  });

  it('all items start collapsed', () => {
    render(<Accordion items={items} />);
    screen.getAllByRole('button').forEach((btn) => {
      expect(btn).toHaveAttribute('aria-expanded', 'false');
    });
  });

  it('expands an item when its trigger is clicked', async () => {
    render(<Accordion items={items} />);
    await userEvent.click(screen.getByRole('button', { name: 'Section A' }));
    expect(screen.getByRole('button', { name: 'Section A' })).toHaveAttribute('aria-expanded', 'true');
  });

  it('collapses an expanded item when clicked again', async () => {
    render(<Accordion items={items} />);
    await userEvent.click(screen.getByRole('button', { name: 'Section A' }));
    await userEvent.click(screen.getByRole('button', { name: 'Section A' }));
    expect(screen.getByRole('button', { name: 'Section A' })).toHaveAttribute('aria-expanded', 'false');
  });

  it('closes others in single mode (default)', async () => {
    render(<Accordion items={items} />);
    await userEvent.click(screen.getByRole('button', { name: 'Section A' }));
    await userEvent.click(screen.getByRole('button', { name: 'Section B' }));
    expect(screen.getByRole('button', { name: 'Section A' })).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByRole('button', { name: 'Section B' })).toHaveAttribute('aria-expanded', 'true');
  });

  it('allows multiple open in multiple mode', async () => {
    render(<Accordion items={items} multiple />);
    await userEvent.click(screen.getByRole('button', { name: 'Section A' }));
    await userEvent.click(screen.getByRole('button', { name: 'Section B' }));
    expect(screen.getByRole('button', { name: 'Section A' })).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('button', { name: 'Section B' })).toHaveAttribute('aria-expanded', 'true');
  });

  it('cannot toggle a disabled item', async () => {
    render(<Accordion items={items} />);
    await userEvent.click(screen.getByRole('button', { name: 'Section C' }));
    expect(screen.getByRole('button', { name: 'Section C' })).toHaveAttribute('aria-expanded', 'false');
  });

  it('opens defaultOpen items on mount', () => {
    render(<Accordion items={items} defaultOpen="a" />);
    expect(screen.getByRole('button', { name: 'Section A' })).toHaveAttribute('aria-expanded', 'true');
  });
});
