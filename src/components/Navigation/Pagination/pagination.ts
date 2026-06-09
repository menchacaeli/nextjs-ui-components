export interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  /** Pages to show on each side of the current page */
  siblings?: number;
  showFirstLast?: boolean;
  className?: string;
}
