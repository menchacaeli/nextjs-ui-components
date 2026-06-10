import React from "react";

export interface ListboxOption {
  label: string;
  value: string;
  description?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface ListboxProps {
  options: ListboxOption[];
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  placeholder?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  id?: string;
  name?: string;
  className?: string;
}
