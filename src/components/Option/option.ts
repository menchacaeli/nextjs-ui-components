interface ListItem {
  text: string;
  value: string;
  onClick: (value: string) => void;
}

export interface ListProps extends React.HTMLAttributes<HTMLUListElement> {
  items: ListItem[];
  id?: string;
}
