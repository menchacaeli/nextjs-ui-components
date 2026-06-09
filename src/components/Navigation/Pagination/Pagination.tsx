import "./Pagination.css";
import { PaginationProps } from "./pagination.ts";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

const buildPages = (page: number, total: number, siblings: number): (number | "…")[] => {
  const window = 5 + siblings * 2;
  if (total <= window) return range(1, total);

  const left  = Math.max(page - siblings, 1);
  const right = Math.min(page + siblings, total);
  const showLeft  = left > 2;
  const showRight = right < total - 1;

  if (!showLeft && showRight)  return [...range(1, 3 + siblings * 2), "…", total];
  if (showLeft  && !showRight) return [1, "…", ...range(total - (3 + siblings * 2) + 1, total)];
  return [1, "…", ...range(left, right), "…", total];
};

const Pagination = ({
  page,
  totalPages,
  onChange,
  siblings = 1,
  showFirstLast = false,
  className = "",
}: PaginationProps) => {
  const pages = buildPages(page, totalPages, siblings);

  return (
    <nav aria-label="Pagination" className={`pagination ${className}`}>
      {showFirstLast && (
        <button
          className="pagination__btn"
          disabled={page === 1}
          onClick={() => onChange(1)}
          aria-label="First page"
        >
          <ChevronsLeft size={14} aria-hidden="true" />
        </button>
      )}
      <button
        className="pagination__btn"
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        aria-label="Previous page"
      >
        <ChevronLeft size={14} aria-hidden="true" />
      </button>

      {pages.map((p, i) =>
        p === "…" ? (
          <span key={`ellipsis-${i}`} className="pagination__ellipsis" aria-hidden="true">…</span>
        ) : (
          <button
            key={p}
            className={["pagination__btn", p === page && "pagination__btn--active"].filter(Boolean).join(" ")}
            onClick={() => onChange(p as number)}
            aria-label={`Page ${p}`}
            aria-current={p === page ? "page" : undefined}
          >
            {p}
          </button>
        )
      )}

      <button
        className="pagination__btn"
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        aria-label="Next page"
      >
        <ChevronRight size={14} aria-hidden="true" />
      </button>
      {showFirstLast && (
        <button
          className="pagination__btn"
          disabled={page === totalPages}
          onClick={() => onChange(totalPages)}
          aria-label="Last page"
        >
          <ChevronsRight size={14} aria-hidden="true" />
        </button>
      )}
    </nav>
  );
};

export default Pagination;
