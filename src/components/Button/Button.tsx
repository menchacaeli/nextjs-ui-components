import React, { useCallback, useState } from "react";
import { ButtonProps, Ripple } from "@/types/button";
import "./button.css";

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
    leadingIcon: LeadingIcon,
    trailingIcon: TrailingIcon,
    iconOnly = false,
  } = props;

  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (animation === "ripple") {
        rippleEffect(event);
      }

      onClick?.(event);
    },
    [animation, onClick],
  );

  const rippleEffect = (event: React.MouseEvent<HTMLButtonElement>) => {
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
    }, 600);
  };

  const buttonClasses = [
    "btn",
    `btn--${variant}-${color}`,
    `btn--${size}`,
    `btn--${shape}`,
    animation && `btn--${animation}`,
    iconOnly && "btn--icon-only",
    loading && "btn--loading",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const iconClasses = ["btn-icon", `btn-icon--${size}`]
    .filter(Boolean)
    .join(" ");

  const renderContent = () => {
    if (loading) {
      return (
        <>
          <div className={`btn--spinner btn--spinner-${size}`} />
          {!iconOnly && "Loading..."}
        </>
      );
    }

    if (iconOnly && LeadingIcon) {
      return <LeadingIcon className={iconClasses} aria-hidden="true" />;
    }

    return (
      <>
        {LeadingIcon && (
          <LeadingIcon
            className={`${iconClasses} leading-icon`}
            aria-hidden="true"
          />
        )}
        {text}
        {TrailingIcon && (
          <TrailingIcon
            className={`${iconClasses} trailing-icon`}
            aria-hidden="true"
          />
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
      {...props}
    >
      {renderContent()}
      {animation === "ripple" &&
        ripples.map((ripple) => (
          <span
            key={ripple.id}
            className="ripple"
            style={{
              left: ripple.x,
              top: ripple.y,
            }}
          />
        ))}
    </button>
  );
};

export default Button;
