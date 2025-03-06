import React, { useState, ChangeEvent } from "react";
import "./PriceInput.css";
import { PriceInputProps } from "./price-input.ts";
import { ChevronDown } from "lucide-react";

const PriceInputWithSelect = (props: PriceInputProps) => {
  const {
    value,
    onChange,
    currencies = ["USD", "EUR", "GBP"],
    defaultCurrency = "USD",
    placeholder = "0.00",
    label = "Price",
    currencySymbol = "$",
    id = "price",
    name = "price",
    disabled = false,
    required = false,
    showLabel = true,
  } = props;

  const [amount, setAmount] = useState(value?.amount || "");
  const [currency, setCurrency] = useState(value?.currency || defaultCurrency);

  const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Allow only numbers and decimal point
    const inputValue = e.target.value;
    if (inputValue === "" || /^(\d+)?\.?\d*$/.test(inputValue)) {
      setAmount(inputValue);
      onChange?.({ amount: inputValue, currency });
    }
  };

  const handleCurrencyChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const newCurrency = e.target.value;
    setCurrency(newCurrency);
    onChange?.({ amount, currency: newCurrency });
  };

  return (
    <div className="price-input--container">
      {showLabel && label && (
        <label
          htmlFor={id}
          className={`price-input--label ${required ? "required" : ""}`}
        >
          {label}
        </label>
      )}
      <div className="price-input--field-wrapper">
        <div className="currency-symbol">{currencySymbol}</div>
        <input
          type="text"
          value={amount}
          onChange={handleAmountChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          id={id}
          name={name}
          className="price-input--field"
        />
        <div className="currency-select--wrapper">
          <select
            id={`${id}-currency`}
            name={`${name}-currency`}
            value={currency}
            onChange={handleCurrencyChange}
            disabled={disabled}
            className="currency-select"
            aria-label="Currency"
          >
            {currencies.map((curr) => (
              <option key={curr} value={curr}>
                {curr}
              </option>
            ))}
          </select>
          <ChevronDown className="dropdown-icon" size={16} />
        </div>
      </div>
    </div>
  );
};

export default PriceInputWithSelect;
