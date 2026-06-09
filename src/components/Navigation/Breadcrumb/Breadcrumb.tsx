import "./Breadcrumb.css";
import { BreadcrumbProps } from "./breadcrumb.ts";
import { ChevronRight } from "lucide-react";

const Breadcrumb = ({ items, separator, className = "" }: BreadcrumbProps) => {
  const sep = separator ?? <ChevronRight size={14} aria-hidden="true" />;

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="breadcrumb__list">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={i} className="breadcrumb__item">
              {i > 0 && (
                <span className="breadcrumb__separator" aria-hidden="true">{sep}</span>
              )}
              {isLast || !item.href ? (
                <span
                  className="breadcrumb__current"
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              ) : (
                <a href={item.href} className="breadcrumb__link">{item.label}</a>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
