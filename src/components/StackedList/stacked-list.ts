import React from "react";

export interface StackedListItem {
  text: string;
  secondaryText?: string;
  avatar?: React.ReactNode;
  action?: (value: unknown) => void;
  secondaryAction?: React.ReactNode;
}

export interface StackedListProps
  extends React.HTMLAttributes<HTMLUListElement> {
  items: StackedListItem[];
  id?: string;
}
