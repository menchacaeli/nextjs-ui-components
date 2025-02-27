import React from "react";

export interface StackedListItem {
  text: string;
  value?: unknown;
  secondaryText?: string;
  avatar?: React.ReactNode;
  action?: (value: unknown) => void;
  secondaryAction?: React.ReactNode;
  selectable?: boolean;
  itemClick?: (item: StackedListItem) => void;
}

export interface StackedListProps
  extends React.HTMLAttributes<HTMLUListElement> {
  items: StackedListItem[];
  id?: string;
  onItemClick?: (item: StackedListItem) => void;
}
