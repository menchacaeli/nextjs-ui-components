import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tabs from './Tabs';

const items = [
  { id: 'one',   label: 'One',   content: <p>Panel One</p> },
  { id: 'two',   label: 'Two',   content: <p>Panel Two</p> },
  { id: 'three', label: 'Three', content: <p>Panel Three</p>, disabled: true },
];

describe('Tabs', () => {
  it('renders a tablist', () => {
    render(<Tabs items={items} />);
    expect(screen.getByRole('tablist')).toBeInTheDocument();
  });

  it('renders all tab buttons', () => {
    render(<Tabs items={items} />);
    expect(screen.getAllByRole('tab')).toHaveLength(3);
  });

  it('selects the first tab by default', () => {
    render(<Tabs items={items} />);
    expect(screen.getByRole('tab', { name: 'One' })).toHaveAttribute('aria-selected', 'true');
  });

  it('shows the first panel by default', () => {
    render(<Tabs items={items} />);
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Panel One');
  });

  it('switches panel when a tab is clicked', async () => {
    render(<Tabs items={items} />);
    await userEvent.click(screen.getByRole('tab', { name: 'Two' }));
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Panel Two');
    expect(screen.getByRole('tab', { name: 'Two' })).toHaveAttribute('aria-selected', 'true');
  });

  it('does not select a disabled tab', async () => {
    render(<Tabs items={items} />);
    await userEvent.click(screen.getByRole('tab', { name: 'Three' }));
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Panel One');
  });

  it('calls onChange when a tab is selected', async () => {
    const onChange = vi.fn();
    render(<Tabs items={items} onChange={onChange} />);
    await userEvent.click(screen.getByRole('tab', { name: 'Two' }));
    expect(onChange).toHaveBeenCalledWith('two');
  });

  it('respects controlled activeTab prop', () => {
    render(<Tabs items={items} activeTab="two" />);
    expect(screen.getByRole('tab', { name: 'Two' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Panel Two');
  });
});
