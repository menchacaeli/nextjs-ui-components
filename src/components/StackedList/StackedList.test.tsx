import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import StackedList from './StackedList';
import { StackedListItem } from './stacked-list';

const items: StackedListItem[] = [
  { text: 'Alice',   value: 'alice',   secondaryText: 'Designer' },
  { text: 'Bob',     value: 'bob',     secondaryText: 'Engineer' },
  { text: 'Charlie', value: 'charlie', secondaryText: 'Manager' },
];

describe('StackedList', () => {
  it('renders all item primary texts', () => {
    render(<StackedList items={items} />);
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Charlie')).toBeInTheDocument();
  });

  it('renders secondary text', () => {
    render(<StackedList items={items} />);
    expect(screen.getByText('Designer')).toBeInTheDocument();
    expect(screen.getByText('Engineer')).toBeInTheDocument();
  });

  it('renders avatar when provided', () => {
    const itemsWithAvatar: StackedListItem[] = [
      { text: 'Dave', value: 'dave', avatar: <img data-testid="avatar" alt="Dave" /> },
    ];
    render(<StackedList items={itemsWithAvatar} />);
    expect(screen.getByTestId('avatar')).toBeInTheDocument();
  });

  it('renders secondary action when provided', () => {
    const itemsWithAction: StackedListItem[] = [
      { text: 'Eve', value: 'eve', secondaryAction: <button>Edit</button> },
    ];
    render(<StackedList items={itemsWithAction} />);
    expect(screen.getByRole('button', { name: 'Edit' })).toBeInTheDocument();
  });

  it('calls onItemClick when a selectable item is clicked', async () => {
    const onItemClick = vi.fn();
    const selectableItems: StackedListItem[] = [
      { text: 'Frank', value: 'frank', selectable: true },
    ];
    render(<StackedList items={selectableItems} onItemClick={onItemClick} />);
    await userEvent.click(screen.getByText('Frank'));
    expect(onItemClick).toHaveBeenCalledWith(selectableItems[0]);
  });

  it('does not call onItemClick for non-selectable items', async () => {
    const onItemClick = vi.fn();
    render(<StackedList items={items} onItemClick={onItemClick} />);
    await userEvent.click(screen.getByText('Alice'));
    expect(onItemClick).not.toHaveBeenCalled();
  });

  it('renders a list element', () => {
    render(<StackedList items={items} />);
    expect(screen.getByRole('list')).toBeInTheDocument();
  });

  it('renders correct number of list items', () => {
    render(<StackedList items={items} />);
    expect(screen.getAllByRole('listitem')).toHaveLength(3);
  });
});
