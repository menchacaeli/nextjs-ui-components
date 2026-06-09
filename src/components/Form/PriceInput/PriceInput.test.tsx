import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import PriceInput from './PriceInput';

describe('PriceInput', () => {
  it('renders the price input field', () => {
    render(<PriceInput />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('associates label with input via htmlFor', () => {
    render(<PriceInput label="Amount" id="amount" />);
    expect(screen.getByLabelText('Amount')).toBeInTheDocument();
  });

  it('renders the currency select', () => {
    render(<PriceInput />);
    expect(screen.getByRole('combobox', { name: 'Currency' })).toBeInTheDocument();
  });

  it('renders default currency options', () => {
    render(<PriceInput />);
    const select = screen.getByRole('combobox', { name: 'Currency' });
    expect(select).toHaveValue('USD');
  });

  it('calls onChange when amount is typed', async () => {
    const onChange = vi.fn();
    render(<PriceInput onChange={onChange} />);
    await userEvent.type(screen.getByRole('textbox'), '9');
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ amount: '9' }));
  });

  it('calls onChange when currency is changed', async () => {
    const onChange = vi.fn();
    render(<PriceInput onChange={onChange} />);
    await userEvent.selectOptions(screen.getByRole('combobox', { name: 'Currency' }), 'EUR');
    expect(onChange).toHaveBeenCalledWith(expect.objectContaining({ currency: 'EUR' }));
  });

  it('renders custom currencies', () => {
    render(<PriceInput currencies={['USD', 'JPY']} />);
    const select = screen.getByRole('combobox', { name: 'Currency' });
    expect(select).toContainElement(screen.getByRole('option', { name: 'JPY' }));
  });

  it('renders currency symbol', () => {
    render(<PriceInput currencySymbol="€" />);
    expect(screen.getByText('€')).toBeInTheDocument();
  });

  it('disables input and select when disabled', () => {
    render(<PriceInput disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
    expect(screen.getByRole('combobox', { name: 'Currency' })).toBeDisabled();
  });

  it('marks input as required when required prop set', () => {
    render(<PriceInput required />);
    expect(screen.getByRole('textbox')).toBeRequired();
  });

  it('hides label when showLabel=false', () => {
    render(<PriceInput label="Price" showLabel={false} />);
    expect(screen.queryByText('Price')).not.toBeInTheDocument();
  });

  it('does not accept non-numeric characters', async () => {
    const onChange = vi.fn();
    render(<PriceInput onChange={onChange} />);
    await userEvent.type(screen.getByRole('textbox'), 'abc');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('populates amount from initial value prop', () => {
    render(<PriceInput value={{ amount: '42.50', currency: 'USD' }} />);
    expect(screen.getByRole('textbox')).toHaveValue('42.50');
  });
});
