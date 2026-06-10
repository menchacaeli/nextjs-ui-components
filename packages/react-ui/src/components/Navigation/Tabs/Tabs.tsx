import { useState } from "react";
import "./Tabs.css";
import { TabsProps } from "./tabs.ts";

const Tabs = ({
  items,
  defaultTab,
  activeTab: controlledTab,
  onChange,
  variant = "underline",
  className = "",
}: TabsProps) => {
  const [internalTab, setInternalTab] = useState(defaultTab ?? items[0]?.id ?? "");
  const activeId = controlledTab ?? internalTab;

  const select = (id: string) => {
    setInternalTab(id);
    onChange?.(id);
  };

  const activeItem = items.find((i) => i.id === activeId);

  return (
    <div className={`tabs tabs--${variant} ${className}`}>
      <div className="tabs__list" role="tablist">
        {items.map((item) => (
          <button
            key={item.id}
            role="tab"
            type="button"
            id={`tab-${item.id}`}
            aria-controls={`panel-${item.id}`}
            aria-selected={item.id === activeId}
            disabled={item.disabled}
            onClick={() => !item.disabled && select(item.id)}
            className={[
              "tabs__tab",
              item.id === activeId && "tabs__tab--active",
            ].filter(Boolean).join(" ")}
          >
            {item.icon && <span aria-hidden="true">{item.icon}</span>}
            {item.label}
            {item.badge != null && (
              <span className="tabs__badge">{item.badge}</span>
            )}
          </button>
        ))}
      </div>

      {activeItem?.content != null && (
        <div
          className="tabs__panel"
          role="tabpanel"
          id={`panel-${activeItem.id}`}
          aria-labelledby={`tab-${activeItem.id}`}
        >
          {activeItem.content}
        </div>
      )}
    </div>
  );
};

export default Tabs;
