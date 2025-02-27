import { LucideIcon } from "lucide-react";

interface OptionItem {
  text: string;
  value: string;
  leadingIcon?: LucideIcon;
  onClick: (value: string) => void;
}

export interface OptionProps extends React.HTMLAttributes<HTMLUListElement> {
  text: string;
  items: Array<OptionItem>;
  id?: string;
}
