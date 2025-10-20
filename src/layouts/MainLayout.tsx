import React from "react";
import Sidebar from "@/components/Sidebar";
import ThemeSelector from "@/components/ThemeSelector";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

export default function MainLayout({
  children,
  collapsed,
  setCollapsed,
}: {
  children: React.ReactNode;
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="flex h-screen overflow-hidden transition-colors duration-300">
      {/* Sidebar */}
      <Sidebar collapsed={collapsed} />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 text-foreground transition-colors duration-300 rounded-lg overflow-y-auto">
        {/* Header */}
        <header className="flex items-center justify-between p-6 ">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 rounded-md hover:bg-muted transition"
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
            </button>
            {/* <h1 className="text-2xl font-bold">Arro</h1> */}
          </div>
          <ThemeSelector />
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto rounded-2xl bg-[hsl(var(--content-bg))]">{children}</main>
      </div>
    </div>
  );
}
