export interface PriceValue {
  amount: string;
  currency: string;
}

export interface PriceInputProps {
  value?: PriceValue;
  onChange?: (value: PriceValue) => void;
  currencies?: Array<string>;
  defaultCurrency?: string;
  placeholder?: string;
  label?: string;
  currencySymbol?: string;
  id?: string;
  name?: string;
  disabled?: boolean;
  required?: boolean;
  showLabel?: boolean;
}
