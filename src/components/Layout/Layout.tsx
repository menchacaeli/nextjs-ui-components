import "./Layout.css";
import React from "react";
import { LayoutProps } from "@/components/Layout/layout.ts";

const Layout = ({ sidebar, main }: LayoutProps) => {
  return (
    <div className="layout">
      <div className="layout-sidebar">{sidebar}</div>
      <div className="layout-main">{main}</div>
    </div>
  );
};

export default Layout;
