import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Menu from './Menu';

const items = [
  { text: 'Edit',   value: 'edit',   onClick: vi.fn() },
  { text: 'Delete', value: 'delete', onClick: vi.fn() },
  { text: 'Archive', value: 'archive', onClick: vi.fn(), disabled: true },
];

beforeEach(() => {
  items.forEach((item) => item.onClick.mockClear());
});

describe('Menu', () => {
  it('renders the trigger button', () => {
    render(<Menu label="Actions" items={items} />);
    expect(screen.getByRole('button', { name: /actions/i })).toBeInTheDocument();
  });

  it('trigger has aria-haspopup="menu"', () => {
    render(<Menu label="Actions" items={items} />);
    expect(screen.getByRole('button', { name: /actions/i })).toHaveAttribute('aria-haspopup', 'menu');
  });

  it('menu is closed by default', () => {
    render(<Menu label="Actions" items={items} />);
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('opens the menu when trigger is clicked', async () => {
    render(<Menu label="Actions" items={items} />);
    await userEvent.click(screen.getByRole('button', { name: /actions/i }));
    expect(screen.getByRole('menu')).toBeInTheDocument();
  });

  it('renders menu items when open', async () => {
    render(<Menu label="Actions" items={items} />);
    await userEvent.click(screen.getByRole('button', { name: /actions/i }));
    expect(screen.getByRole('menuitem', { name: 'Edit' })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Delete' })).toBeInTheDocument();
  });

  it('calls item onClick and closes menu', async () => {
    render(<Menu label="Actions" items={items} />);
    await userEvent.click(screen.getByRole('button', { name: /actions/i }));
    await userEvent.click(screen.getByRole('menuitem', { name: 'Edit' }));
    expect(items[0].onClick).toHaveBeenCalledWith('edit');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('closes on Escape key', async () => {
    render(<Menu label="Actions" items={items} />);
    await userEvent.click(screen.getByRole('button', { name: /actions/i }));
    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('menu')).not.toBeInTheDocument();
  });

  it('disabled item is not clickable', async () => {
    render(<Menu label="Actions" items={items} />);
    await userEvent.click(screen.getByRole('button', { name: /actions/i }));
    const archiveBtn = screen.getByRole('menuitem', { name: 'Archive' });
    expect(archiveBtn).toBeDisabled();
  });

  it('navigates items with arrow keys', async () => {
    render(<Menu label="Actions" items={items} />);
    const trigger = screen.getByRole('button', { name: /actions/i });
    // Open via click, then navigate with keyboard while trigger retains focus
    await userEvent.click(trigger);
    trigger.focus();
    await userEvent.keyboard('{ArrowDown}');  // highlight index 0 (Edit)
    await userEvent.keyboard('{Enter}');       // select highlighted item
    expect(items[0].onClick).toHaveBeenCalledWith('edit');
  });
});
