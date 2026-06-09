import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Popover from './Popover';

describe('Popover', () => {
  it('renders the trigger element', () => {
    render(
      <Popover trigger={<button>Open</button>}>
        <p>Popover content</p>
      </Popover>
    );
    expect(screen.getByRole('button', { name: 'Open' })).toBeInTheDocument();
  });

  it('does not show content initially', () => {
    render(
      <Popover trigger={<button>Open</button>}>
        <p>Popover content</p>
      </Popover>
    );
    expect(screen.queryByText('Popover content')).not.toBeInTheDocument();
  });

  it('shows content when trigger is clicked', async () => {
    render(
      <Popover trigger={<button>Open</button>}>
        <p>Popover content</p>
      </Popover>
    );
    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByText('Popover content')).toBeInTheDocument();
  });

  it('hides content when trigger is clicked again', async () => {
    render(
      <Popover trigger={<button>Open</button>}>
        <p>Popover content</p>
      </Popover>
    );
    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.queryByText('Popover content')).not.toBeInTheDocument();
  });

  it('closes when Escape is pressed', async () => {
    render(
      <Popover trigger={<button>Open</button>}>
        <p>Popover content</p>
      </Popover>
    );
    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByText('Popover content')).toBeInTheDocument();
    await userEvent.keyboard('{Escape}');
    expect(screen.queryByText('Popover content')).not.toBeInTheDocument();
  });

  it('renders ReactNode children inside popover', async () => {
    render(
      <Popover trigger={<button>Open</button>}>
        <button>Action</button>
        <input placeholder="Search" />
      </Popover>
    );
    await userEvent.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  });
});
