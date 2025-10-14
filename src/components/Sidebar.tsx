import React, { useState } from "react";
import { Home, Settings, LayoutGrid, Users, LogOut, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { name: "Dashboard", icon: <Home size={18} /> },
  { name: "Projects", icon: <LayoutGrid size={18} /> },
  { name: "Users", icon: <Users size={18} /> },
  { name: "Settings", icon: <Settings size={18} /> },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "relative h-screen transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-56"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        {!collapsed && <h1 className="text-lg font-bold">Arro</h1>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-2 rounded-md hover:bg-muted transition"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Links */}
      <nav className="flex-1 space-y-1 mt-4">
        {links.map((link) => (
          <div
            key={link.name}
            className="relative flex items-center gap-3 px-4 py-2 text-sm rounded-md hover:bg-muted cursor-pointer group"
          >
            <span>{link.icon}</span>
            {!collapsed && <span>{link.name}</span>}

            {/* Tooltip when collapsed */}
            {collapsed && (
              <div className="absolute left-16 bg-popover text-popover-foreground px-2 py-1 text-xs rounded shadow opacity-0 group-hover:opacity-100 transition">
                {link.name}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t mt-auto flex items-center gap-2 cursor-pointer hover:bg-muted">
        <LogOut size={18} />
        {!collapsed && <span>Logout</span>}
      </div>
    </aside>
  );
}
