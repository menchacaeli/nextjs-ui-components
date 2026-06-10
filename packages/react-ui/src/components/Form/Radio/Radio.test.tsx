import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Radio from './Radio';
import RadioGroup from './RadioGroup';

describe('Radio', () => {
  it('renders a radio input', () => {
    render(<Radio name="color" value="red" />);
    expect(screen.getByRole('radio')).toBeInTheDocument();
  });

  it('renders and associates a label', () => {
    render(<Radio name="color" value="red" label="Red" />);
    expect(screen.getByLabelText('Red')).toBeInTheDocument();
  });

  it('is disabled when disabled=true', () => {
    render(<Radio name="color" value="red" disabled />);
    expect(screen.getByRole('radio')).toBeDisabled();
  });

  it('is checked when checked=true', () => {
    render(<Radio name="color" value="red" checked onChange={vi.fn()} />);
    expect(screen.getByRole('radio')).toBeChecked();
  });
});

describe('RadioGroup', () => {
  const options = [
    { label: 'Red',   value: 'red' },
    { label: 'Green', value: 'green' },
    { label: 'Blue',  value: 'blue', disabled: true },
  ];

  it('renders all options', () => {
    render(<RadioGroup name="color" options={options} />);
    expect(screen.getAllByRole('radio')).toHaveLength(3);
  });

  it('has role="radiogroup"', () => {
    render(<RadioGroup name="color" options={options} label="Color" />);
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
  });

  it('all radios share the same name', () => {
    render(<RadioGroup name="color" options={options} />);
    const radios = screen.getAllByRole('radio') as HTMLInputElement[];
    expect(radios.every((r) => r.name === 'color')).toBe(true);
  });

  it('calls onChange with the selected value', async () => {
    const onChange = vi.fn();
    render(<RadioGroup name="color" options={options} onChange={onChange} />);
    await userEvent.click(screen.getByLabelText('Green'));
    expect(onChange).toHaveBeenCalledWith('green');
  });

  it('marks the correct option as checked', () => {
    render(<RadioGroup name="color" options={options} value="red" onChange={vi.fn()} />);
    expect(screen.getByLabelText('Red')).toBeChecked();
    expect(screen.getByLabelText('Green')).not.toBeChecked();
  });

  it('disables individual options', () => {
    render(<RadioGroup name="color" options={options} />);
    expect(screen.getByLabelText('Blue')).toBeDisabled();
  });

  it('shows error message with role="alert"', () => {
    render(<RadioGroup name="color" options={options} error="Selection required" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Selection required');
  });
});
