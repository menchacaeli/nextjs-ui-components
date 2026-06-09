import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Select from './Select';

const options = [
  { label: 'Apple',  value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry', disabled: true },
];

describe('Select', () => {
  it('renders a select element', () => {
    render(<Select options={options} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('associates label via htmlFor', () => {
    render(<Select options={options} label="Fruit" name="fruit" />);
    expect(screen.getByLabelText('Fruit')).toBeInTheDocument();
  });

  it('renders all options', () => {
    render(<Select options={options} />);
    expect(screen.getByRole('option', { name: 'Apple' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Banana' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Cherry' })).toBeInTheDocument();
  });

  it('renders a placeholder option that is disabled', () => {
    render(<Select options={options} placeholder="Pick one" />);
    const placeholder = screen.getByRole('option', { name: 'Pick one' });
    expect(placeholder).toBeDisabled();
  });

  it('sets aria-invalid when error is provided', () => {
    render(<Select options={options} error="Required" />);
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('shows error message', () => {
    render(<Select options={options} error="Please select an option" />);
    expect(screen.getByText('Please select an option')).toBeInTheDocument();
  });

  it('calls onChange when an option is selected', async () => {
    const onChange = vi.fn();
    render(<Select options={options} onChange={onChange} />);
    await userEvent.selectOptions(screen.getByRole('combobox'), 'banana');
    expect(onChange).toHaveBeenCalled();
  });

  it('sets required attribute', () => {
    render(<Select options={options} required />);
    expect(screen.getByRole('combobox')).toBeRequired();
  });
});
