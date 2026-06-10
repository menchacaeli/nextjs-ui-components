import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Listbox from './Listbox';

const options = [
  { label: 'Apple',  value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry', disabled: true },
];

describe('Listbox', () => {
  it('renders the trigger button', () => {
    render(<Listbox options={options} />);
    expect(screen.getByRole('combobox')).toBeInTheDocument();
  });

  it('shows placeholder text when no value selected', () => {
    render(<Listbox options={options} placeholder="Pick a fruit" />);
    expect(screen.getByText('Pick a fruit')).toBeInTheDocument();
  });

  it('shows selected label when value provided', () => {
    render(<Listbox options={options} value="banana" />);
    expect(screen.getByRole('combobox')).toHaveTextContent('Banana');
  });

  it('associates label with trigger via aria-labelledby', () => {
    render(<Listbox options={options} label="Fruit" />);
    expect(screen.getByText('Fruit')).toBeInTheDocument();
    const trigger = screen.getByRole('combobox');
    expect(trigger).toHaveAttribute('aria-labelledby');
  });

  it('is closed by default', () => {
    render(<Listbox options={options} />);
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('opens dropdown when clicked', async () => {
    render(<Listbox options={options} />);
    await userEvent.click(screen.getByRole('combobox'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'true');
  });

  it('renders all options when open', async () => {
    render(<Listbox options={options} />);
    await userEvent.click(screen.getByRole('combobox'));
    expect(screen.getAllByRole('option')).toHaveLength(3);
  });

  it('calls onChange when an option is clicked', async () => {
    const onChange = vi.fn();
    render(<Listbox options={options} onChange={onChange} />);
    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.click(screen.getByRole('option', { name: 'Apple' }));
    expect(onChange).toHaveBeenCalledWith('apple');
  });

  it('closes dropdown after selecting an option', async () => {
    render(<Listbox options={options} onChange={vi.fn()} />);
    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.click(screen.getByRole('option', { name: 'Apple' }));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('marks disabled option with aria-disabled', async () => {
    render(<Listbox options={options} />);
    await userEvent.click(screen.getByRole('combobox'));
    expect(screen.getByRole('option', { name: 'Cherry' })).toHaveAttribute('aria-disabled', 'true');
  });

  it('does not call onChange for disabled option', async () => {
    const onChange = vi.fn();
    render(<Listbox options={options} onChange={onChange} />);
    await userEvent.click(screen.getByRole('combobox'));
    await userEvent.click(screen.getByRole('option', { name: 'Cherry' }));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('sets aria-invalid when error is provided', () => {
    render(<Listbox options={options} error="Required" />);
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-invalid', 'true');
  });

  it('renders error text when error is provided', () => {
    render(<Listbox options={options} error="Please select an option" />);
    expect(screen.getByText('Please select an option')).toBeInTheDocument();
  });

  it('does not open when disabled', async () => {
    render(<Listbox options={options} disabled />);
    await userEvent.click(screen.getByRole('combobox'));
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('closes with Escape key', async () => {
    render(<Listbox options={options} />);
    await userEvent.click(screen.getByRole('combobox'));
    expect(screen.getByRole('listbox')).toBeInTheDocument();
    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
  });

  it('marks selected option with aria-selected', async () => {
    render(<Listbox options={options} value="banana" />);
    await userEvent.click(screen.getByRole('combobox'));
    expect(screen.getByRole('option', { name: 'Banana' })).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByRole('option', { name: 'Apple' })).toHaveAttribute('aria-selected', 'false');
  });
});
