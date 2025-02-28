import { StackedList, StackedListItem } from "@/ui-components";
import { SidebarProps } from "./sidebar.ts";

const Sidebar = (props: SidebarProps) => {
  const items: Array<StackedListItem> = [
    {
      text: "Avatar",
      value: "avatar",
      selectable: true,
    },
    {
      text: "Badge",
      value: "badge",
      selectable: true,
    },
    {
      text: "Button",
      value: "button",
      selectable: true,
    },
    {
      text: "Option",
      value: "option",
      selectable: true,
    },
    {
      text: "Stacked List",
      value: "stacked-list",
      selectable: true,
    },
    {
      text: "Table",
      value: "table",
      selectable: true,
    },
    {
      text: "Form",
      value: "form",
      selectable: true,
    },
  ];

  return (
    <div className="sidebar">
      <StackedList items={items} onItemClick={props.itemClick} />
    </div>
  );
};

export default Sidebar;
