export interface Column<T> {
  key: keyof T;
  header: string;
  render?: (value: T[keyof T], item: T) => React.ReactNode;
  sortable?: boolean;
  width?: string;
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  selectable?: boolean;
  onRowSelect?: (selectedRows: T[]) => void;
  rowsPerPage?: number;
}
