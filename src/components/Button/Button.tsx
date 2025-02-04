// CustomButton.tsx
import React, { useCallback, useState } from 'react';
import { ButtonProps, Ripple } from '@/types/button';
import './button.css';

const Button = (props: ButtonProps) => {
  const {
    text = 'Button',
    variant = 'primary',
    size = 'md',
    isLoading = false,
    animation = '',
    shape = 'default',
    onClick,
    className = '',
    disabled
  } = props;

  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    if (animation === 'ripple') {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      const ripple: Ripple = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
        id: Date.now()
      };

      setRipples(prev => [...prev, ripple]);

      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== ripple.id));
      }, 600);
    }

    onClick?.(event);
  }, [animation, onClick]);

  const buttonClasses = [
    'btn',
    `btn--${variant}`,
    `btn--${size}`,
    `btn--${shape}`,
    animation && `btn--${animation}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <button
      className={buttonClasses}
      disabled={isLoading || disabled}
      onClick={handleClick}
      type="button"
      {...props}
    >
      {isLoading && <div className={`btn--spinner btn--spinner-${size}`} />}&nbsp;
      {text}
      {animation === 'ripple' && ripples.map(ripple => (
        <span
          key={ripple.id}
          className="ripple"
          style={{
            left: ripple.x,
            top: ripple.y
          }}
        />
      ))}
    </button>
  );
};

export default Button;