import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tooltip from './Tooltip';

describe('Tooltip', () => {
  it('renders the trigger child', () => {
    render(
      <Tooltip content="Helpful hint">
        <button>Hover me</button>
      </Tooltip>
    );
    expect(screen.getByRole('button', { name: 'Hover me' })).toBeInTheDocument();
  });

  it('does not show tooltip content initially', () => {
    render(
      <Tooltip content="Helpful hint">
        <button>Trigger</button>
      </Tooltip>
    );
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('shows tooltip with role="tooltip" on focus', async () => {
    render(
      <Tooltip content="Helpful hint" delay={0}>
        <button>Trigger</button>
      </Tooltip>
    );
    await userEvent.tab();
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    expect(screen.getByRole('tooltip')).toHaveTextContent('Helpful hint');
  });

  it('hides tooltip on blur', async () => {
    render(
      <Tooltip content="Helpful hint" delay={0}>
        <button>Trigger</button>
      </Tooltip>
    );
    await userEvent.tab();
    expect(screen.getByRole('tooltip')).toBeInTheDocument();
    await userEvent.tab();
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('renders ReactNode content inside tooltip', async () => {
    render(
      <Tooltip content={<span data-testid="rich-content">Rich!</span>} delay={0}>
        <button>Trigger</button>
      </Tooltip>
    );
    await userEvent.tab();
    expect(screen.getByTestId('rich-content')).toBeInTheDocument();
  });

  it('returns children directly when disabled', () => {
    render(
      <Tooltip content="Hidden hint" disabled>
        <button>Trigger</button>
      </Tooltip>
    );
    expect(screen.getByRole('button', { name: 'Trigger' })).toBeInTheDocument();
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });
});
