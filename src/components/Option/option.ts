import { LucideIcon } from "lucide-react";

interface ListItem {
  text: string;
  value: string;
  leadingIcon?: LucideIcon;
  onClick: (value: string) => void;
}

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  text: string;
  items: ListItem[];
  id?: string;
}
