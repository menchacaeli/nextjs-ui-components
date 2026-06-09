import "./Radio.css";
import { RadioGroupProps } from "./radio.ts";
import Radio from "./Radio.tsx";

const RadioGroup = (props: RadioGroupProps) => {
  const {
    name,
    value,
    onChange,
    options,
    label,
    error,
    direction = "vertical",
    style,
    className = "",
  } = props;

  return (
    <div className={`radio-group ${className}`} role="radiogroup" aria-label={label} aria-invalid={!!error} style={style}>
      {label && <span className="radio-group--label">{label}</span>}
      <div className={`radio-group--options ${direction}`}>
        {options.map((opt) => (
          <Radio
            key={opt.value}
            name={name}
            value={opt.value}
            label={opt.label}
            disabled={opt.disabled}
            checked={value === opt.value}
            onChange={() => onChange?.(opt.value)}
          />
        ))}
      </div>
      {error && <span className="radio-group--error" role="alert">{error}</span>}
    </div>
  );
};

export default RadioGroup;
