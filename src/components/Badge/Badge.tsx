import "./Badge.css";
import { BadgeProps } from "./badge";

const Badge = (props: BadgeProps) => {
  const {
    text = "",
    variant = "filled",
    color = "gray",
    shape = "default",
    dot = false,
  } = props;

  const variantClass = variant === "ghost" ? "badge--ghost" : `badge--${variant}-${color}`;
  const badgeClasses = ["badge", variantClass, shape !== "default" && `badge--${shape}`]
    .filter(Boolean)
    .join(" ");

  const badgeDotClasses = ["badge--dot", `badge--dot-${color}`]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={badgeClasses}>
      {dot && <span className={badgeDotClasses} />}
      {text}
    </span>
  );
};

export default Badge;
