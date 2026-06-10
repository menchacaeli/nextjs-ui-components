import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Combobox from './Combobox';

const options = [
  { label: 'Apple',  value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry', disabled: true },
  { label: 'Apricot', value: 'apricot' },
];

describe('Combobox', () => {
  it('renders an input with role="combobox"', () => {
    render(<Combobox options={options} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('associates label with input via htmlFor/id', () => {
    render(<Combobox options={options} label="Fruit" />);
    expect(screen.getByLabelText('Fruit')).toBeInTheDocument();
  });

  it('is closed by default', () => {
    render(<Combobox options={options} />);
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('opens dropdown on focus', async () => {
    render(<Combobox options={options} />);
    await userEvent.click(screen.getByRole('combobox'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
  });

  it('shows all options when opened', async () => {
    render(<Combobox options={options} />);
    await userEvent.click(screen.getByRole('combobox'));
    expect(screen.getAllByRole('option')).toHaveLength(4);
  });

  it('filters options as user types', async () => {
    render(<Combobox options={options} />);
    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.type(screen.getByRole('combobox'), 'ap');
    const visibleOptions = screen.getAllByRole('option');
    expect(visibleOptions).toHaveLength(2);
    expect(screen.getByRole('option', { name: /Apple/i })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: /Apricot/i })).toBeInTheDocument();
  });

  it('shows "No options found" when no matches', async () => {
    render(<Combobox options={options} />);
    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.type(screen.getByRole('combobox'), 'zzz');
    expect(screen.getByText('No options found')).toBeInTheDocument();
  });

  it('calls onChange when an option is selected', async () => {
    const onChange = vi.fn();
    render(<Combobox options={options} onChange={onChange} />);
    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.click(screen.getByRole('option', { name: 'Apple' }));
    expect(onChange).toHaveBeenCalledWith('apple');
  });

  it('marks selected option with aria-selected', async () => {
    render(<Combobox options={options} value="banana" />);
    await userEvent.click(screen.getByRole('combobox'));
    expect(screen.getByRole('option', { name: 'Banana' })).toHaveAttribute('aria-selected', 'true');
  });

  it('sets aria-invalid when error is provided', () => {
    render(<Combobox options={options} error="Required" />);
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('renders error text with role="alert"', () => {
    render(<Combobox options={options} error="Something went wrong" />);
    expect(screen.getByRole('alert')).toHaveTextContent('Something went wrong');
  });

  it('renders clear button when clearable and value is set', async () => {
    render(<Combobox options={options} value="apple" clearable onChange={vi.fn()} />);
    expect(screen.getByRole('button', { name: 'Clear selection' })).toBeInTheDocument();
  });

  it('calls onChange with empty string when clear button is clicked', async () => {
    const onChange = vi.fn();
    render(<Combobox options={options} value="apple" clearable onChange={onChange} />);
    await userEvent.click(screen.getByRole('button', { name: 'Clear selection' }));
    expect(onChange).toHaveBeenCalledWith('');
  });

  it('does not open when disabled', async () => {
    render(<Combobox options={options} disabled />);
    await userEvent.click(screen.getByRole('combobox'));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('input is disabled when disabled prop is set', () => {
    render(<Combobox options={options} disabled />);
    expect(screen.getByRole('combobox')).toBeDisabled();
  });
});
