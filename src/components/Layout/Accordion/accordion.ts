import React from "react";

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItem[];
  defaultOpen?: string | string[];
  /** Allow multiple items open at once */
  multiple?: boolean;
  className?: string;
}
