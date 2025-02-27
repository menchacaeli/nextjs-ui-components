import { ThemeColor, ThemeSize } from "@/types/theme";

type BadgeVariant = "filled" | "outlined" | "ghost";

type BadgeShape = "default" | "pill";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  text?: string;
  variant?: BadgeVariant;
  color?: ThemeColor;
  shape?: BadgeShape;
  size?: ThemeSize;
  dot?: boolean;
}
