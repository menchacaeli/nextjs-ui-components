import { Layout, Sidebar, MainContent } from "@/components";
import { useState } from "react";
import { StackedListItem } from "@/ui-components";

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("");

  const handleSidebarItemClick = (item: StackedListItem) => {
    setActiveSection(item.value as string);
  };

  return (
    <div style={{ backgroundColor: "var(--color-bg-primary)" }}>
      <Layout
        sidebar={<Sidebar itemClick={handleSidebarItemClick} />}
        main={<MainContent activeSection={activeSection} />}
      />
    </div>
  );
}
