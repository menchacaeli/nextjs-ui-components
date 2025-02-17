import { ThemeSize } from "@/types/theme";

/**
 * The status of the avatar.
 * @typedef {"online" | "offline" | "away" | "busy"} AvatarStatus
 */
type AvatarStatus = "online" | "offline" | "away" | "busy";

/**
 * Interface representing the properties of an Avatar component.
 * @interface AvatarProps
 * @property {string} [src] - The source URL of the avatar image.
 * @property {string} [alt] - The alternative text for the avatar image.
 * @property {string} [initials] - The initials to display if no image is provided.
 * @property {ThemeSize} [size] - The size of the avatar.
 * @property {AvatarStatus} [status] - The status indicator for the avatar.
 * @property {string} className - Additional CSS classes to apply to the avatar.
 */
export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  initials?: string;
  size?: ThemeSize;
  status?: AvatarStatus;
  className?: string;
}
