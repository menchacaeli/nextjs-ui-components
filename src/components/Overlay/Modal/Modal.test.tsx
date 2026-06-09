import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from './Modal';

afterEach(() => {
  document.body.style.overflow = '';
});

describe('Modal', () => {
  it('renders nothing when open=false', () => {
    render(<Modal open={false} onClose={vi.fn()} />);
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('renders a dialog when open=true', () => {
    render(<Modal open onClose={vi.fn()} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });

  it('has aria-modal="true"', () => {
    render(<Modal open onClose={vi.fn()} />);
    expect(screen.getByRole('dialog')).toHaveAttribute('aria-modal', 'true');
  });

  it('renders the title', () => {
    render(<Modal open onClose={vi.fn()} title="Confirm action" />);
    expect(screen.getByText('Confirm action')).toBeInTheDocument();
  });

  it('renders a description', () => {
    render(<Modal open onClose={vi.fn()} description="Are you sure?" />);
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
  });

  it('calls onClose when the close button is clicked', async () => {
    const onClose = vi.fn();
    render(<Modal open onClose={onClose} />);
    await userEvent.click(screen.getByRole('button', { name: 'Close dialog' }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('calls onClose when Escape is pressed', async () => {
    const onClose = vi.fn();
    render(<Modal open onClose={onClose} />);
    await userEvent.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledOnce();
  });

  it('locks body scroll when open', () => {
    render(<Modal open onClose={vi.fn()} />);
    expect(document.body.style.overflow).toBe('hidden');
  });

  it('restores body scroll when closed', () => {
    const { rerender } = render(<Modal open onClose={vi.fn()} />);
    expect(document.body.style.overflow).toBe('hidden');
    rerender(<Modal open={false} onClose={vi.fn()} />);
    expect(document.body.style.overflow).not.toBe('hidden');
  });

  it('renders children in the modal body', () => {
    render(<Modal open onClose={vi.fn()}><p>Modal content</p></Modal>);
    expect(screen.getByText('Modal content')).toBeInTheDocument();
  });

  it('calls onClose when backdrop is clicked', async () => {
    const onClose = vi.fn();
    render(<Modal open onClose={onClose} />);
    const backdrop = document.querySelector('.modal-backdrop') as HTMLElement;
    await userEvent.click(backdrop);
    expect(onClose).toHaveBeenCalled();
  });
});
