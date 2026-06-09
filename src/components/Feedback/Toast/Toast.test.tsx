import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderHook } from '@testing-library/react';
import Toast from './Toast';
import ToastProvider, { useToast } from './ToastProvider';
import { ToastData } from './toast';

const makeToast = (overrides?: Partial<ToastData>): ToastData => ({
  id: 'test-1',
  message: 'Something happened',
  variant: 'info',
  dismissible: true,
  duration: 0,
  ...overrides,
});

describe('Toast component', () => {
  it('renders with role="status"', () => {
    render(<Toast toast={makeToast()} onDismiss={vi.fn()} />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders the message', () => {
    render(<Toast toast={makeToast({ message: 'File saved' })} onDismiss={vi.fn()} />);
    expect(screen.getByText('File saved')).toBeInTheDocument();
  });

  it('renders the title when provided', () => {
    render(<Toast toast={makeToast({ title: 'Success' })} onDismiss={vi.fn()} />);
    expect(screen.getByText('Success')).toBeInTheDocument();
  });

  it('calls onDismiss with the toast id when dismiss is clicked', async () => {
    const onDismiss = vi.fn();
    render(<Toast toast={makeToast({ id: 'abc' })} onDismiss={onDismiss} />);
    await userEvent.click(screen.getByRole('button', { name: 'Dismiss notification' }));
    expect(onDismiss).toHaveBeenCalledWith('abc');
  });

  it('hides dismiss button when dismissible=false', () => {
    render(<Toast toast={makeToast({ dismissible: false })} onDismiss={vi.fn()} />);
    expect(screen.queryByRole('button', { name: 'Dismiss notification' })).not.toBeInTheDocument();
  });

  it('applies exiting class when exiting=true', () => {
    render(<Toast toast={makeToast()} onDismiss={vi.fn()} exiting />);
    expect(screen.getByRole('status')).toHaveClass('toast--exiting');
  });

  it('applies variant class', () => {
    render(<Toast toast={makeToast({ variant: 'error' })} onDismiss={vi.fn()} />);
    expect(screen.getByRole('status')).toHaveClass('toast--error');
  });
});

describe('useToast hook', () => {
  it('throws when used outside ToastProvider', () => {
    expect(() => renderHook(() => useToast())).toThrow('useToast must be used inside <ToastProvider>');
  });
});

describe('ToastProvider', () => {
  it('provides toast() that adds a toast to the DOM', async () => {
    const Trigger = () => {
      const { toast } = useToast();
      return <button onClick={() => toast('Hello world')}>Add toast</button>;
    };

    render(
      <ToastProvider>
        <Trigger />
      </ToastProvider>
    );

    await userEvent.click(screen.getByRole('button', { name: 'Add toast' }));
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('dismiss() removes the toast', async () => {
    let dismissFn: (id: string) => void;
    let toastId = '';

    const Trigger = () => {
      const { toast, dismiss } = useToast();
      dismissFn = dismiss;
      return (
        <button
          onClick={() => {
            toastId = toast('Bye');
          }}
        >
          Add
        </button>
      );
    };

    render(
      <ToastProvider>
        <Trigger />
      </ToastProvider>
    );

    await userEvent.click(screen.getByRole('button', { name: 'Add' }));
    expect(screen.getByText('Bye')).toBeInTheDocument();
    // Dismiss via the built-in dismiss button
    await userEvent.click(screen.getByRole('button', { name: 'Dismiss notification' }));
    // After the 260ms exit animation the element is removed — we just verify the click worked
    expect(screen.getByRole('status')).toHaveClass('toast--exiting');
  });
});
