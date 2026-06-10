import { useCallback, useState } from "react";
import { ButtonProps, Ripple } from "./button";
import "./Button.css";

const Button = (props: ButtonProps) => {
  const {
    text = "Button",
    variant = "filled",
    color = "primary",
    size = "md",
    loading = false,
    animation = "",
    shape = "default",
    onClick,
    className = "",
    disabled,
    leadingIcon,
    trailingIcon,
    iconOnly = false,
    fullWidth = false,
    ...rest
  } = props;

  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (animation === "ripple") {
        const button = event.currentTarget;
        const rect = button.getBoundingClientRect();
        const ripple: Ripple = {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top,
          id: Date.now(),
        };
        setRipples((prev) => [...prev, ripple]);
        setTimeout(() => {
          setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
        }, 750);
      }
      onClick?.(event);
    },
    [animation, onClick],
  );

  const buttonClasses = [
    "btn",
    `btn--${variant}-${color}`,
    `btn--${size}`,
    `btn--${shape}`,
    fullWidth && "btn--full",
    animation && `btn--${animation}`,
    iconOnly && "btn--icon-only",
    loading && "btn--loading",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const renderContent = () => {
    if (loading) {
      return (
        <>
          <span className="btn__spinner" aria-hidden="true" />
          {!iconOnly && "Loading..."}
        </>
      );
    }

    if (iconOnly) {
      return leadingIcon ? (
        <span className="btn__icon" aria-hidden="true">{leadingIcon}</span>
      ) : null;
    }

    return (
      <>
        {leadingIcon && (
          <span className="btn__icon" aria-hidden="true">{leadingIcon}</span>
        )}
        {text}
        {trailingIcon && (
          <span className="btn__icon" aria-hidden="true">{trailingIcon}</span>
        )}
      </>
    );
  };

  return (
    <button
      className={buttonClasses}
      disabled={loading || disabled}
      onClick={handleClick}
      type="button"
      {...rest}
    >
      {renderContent()}
      {animation === "ripple" &&
        ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="ripple"
            style={{ left: ripple.x, top: ripple.y }}
          />
        ))}
    </button>
  );
};

export default Button;
