import { useState } from "react";
import "./Table.css";
import { TableProps } from "./table.ts";
import { Button } from "@/components";

function Table<T extends { id: string | number }>({
  data,
  columns,
  selectable = false,
  onRowSelect,
  rowsPerPage = 10,
}: TableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<Set<T["id"]>>(new Set());
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);

  const handleSort = (column: keyof T) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const handleSelectAll = () => {
    if (selectedRows.size === data.length) {
      setSelectedRows(new Set());
      onRowSelect?.([]);
    } else {
      const newSelected = new Set(data.map((item) => item.id));
      setSelectedRows(newSelected);
      onRowSelect?.(data);
    }
  };

  const handleSelectRow = (row: T) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(row.id)) {
      newSelected.delete(row.id);
    } else {
      newSelected.add(row.id);
    }
    setSelectedRows(newSelected);
    onRowSelect?.(data.filter((item) => newSelected.has(item.id)));
  };

  const CustomCheckbox = ({
    checked,
    onChange,
  }: {
    checked: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }) => (
    <label className="table-checkbox">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="checkmark"></span>
    </label>
  );

  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn) return 0;
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return sortDirection === "asc"
      ? aValue < bValue
        ? -1
        : 1
      : bValue < aValue
        ? -1
        : 1;
  });

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            {selectable && (
              <th className="checkbox-cell">
                <CustomCheckbox
                  checked={selectedRows.size === data.length}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleSelectAll();
                  }}
                />
              </th>
            )}
            {columns.map((column) => (
              <th
                key={String(column.key)}
                style={{ width: column.width }}
                className={column.sortable ? "sortable" : ""}
                onClick={() => column.sortable && handleSort(column.key)}
              >
                {column.header}
                {column.sortable && sortColumn === column.key && (
                  <span className="sort-indicator">
                    {sortDirection === "asc" ? " ↑" : " ↓"}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row) => (
            <tr
              key={row.id}
              className={`${selectedRows.has(row.id) ? "selected" : ""} ${selectable ? "selectable" : ""}`}
              onClick={() => selectable && handleSelectRow(row)}
            >
              {selectable && (
                <td className="checkbox-cell">
                  <CustomCheckbox
                    checked={selectedRows.has(row.id)}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleSelectRow(row);
                    }}
                  />
                </td>
              )}
              {columns.map((column) => (
                <td key={String(column.key)}>
                  {column.render
                    ? column.render(row[column.key], row)
                    : String(row[column.key])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="pagination">
          <Button
            text={"Previous"}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          />
          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            text={"Next"}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          />
        </div>
      )}
    </div>
  );
}

export default Table;
