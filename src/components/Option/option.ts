import React from "react";

interface OptionItem {
  text: string;
  value: string;
  leadingIcon?: React.ReactNode;
  onClick: (value: string) => void;
}

export interface OptionProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  items: Array<OptionItem>;
  id?: string;
}
