import React from "react";

export interface MenuItem {
  text: string;
  value: string;
  leadingIcon?: React.ReactNode;
  disabled?: boolean;
  onClick: (value: string) => void;
}

export interface MenuProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string;
  items: MenuItem[];
  id?: string;
}
