import "./Card.css";
import { CardProps, CardSectionProps } from "./card.ts";
import React from "react";

interface HeaderProps extends CardSectionProps {
  title?: string;
  description?: string;
  actions?: React.ReactNode;
}

const Card = ({
  children,
  padding = "none",
  shadow = "none",
  border = true,
  className = "",
  style,
}: CardProps) => {
  const classes = [
    "card",
    border && "card--bordered",
    shadow !== "none" && `card--shadow-${shadow}`,
    padding !== "none" && `card--padding-${padding}`,
    className,
  ].filter(Boolean).join(" ");

  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
};

const Header = ({ title, description, actions, children, className = "" }: HeaderProps) => (
  <div className={`card__header ${className}`}>
    {(title || description) ? (
      <div>
        {title && <p className="card__header-title">{title}</p>}
        {description && <p className="card__header-description">{description}</p>}
      </div>
    ) : children}
    {actions && <div>{actions}</div>}
  </div>
);

const Body = ({ children, className = "" }: CardSectionProps) => (
  <div className={`card__body ${className}`}>{children}</div>
);

const Footer = ({ children, className = "" }: CardSectionProps) => (
  <div className={`card__footer ${className}`}>{children}</div>
);

Card.Header = Header;
Card.Body   = Body;
Card.Footer = Footer;

export default Card;
