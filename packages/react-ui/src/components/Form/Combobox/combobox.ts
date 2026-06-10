export interface ComboboxOption {
  label: string;
  value: string;
  disabled?: boolean;
  group?: string;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  clearable?: boolean;
  disabled?: boolean;
  className?: string;
  id?: string;
}
