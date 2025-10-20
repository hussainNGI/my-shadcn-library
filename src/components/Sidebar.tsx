import React from "react";
import { Home, Settings, LayoutGrid, Users } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { name: "Dashboard", icon: <Home size={18} /> },
  { name: "Projects", icon: <LayoutGrid size={18} /> },
  { name: "Users", icon: <Users size={18} /> },
  { name: "Settings", icon: <Settings size={18} /> },
];

export default function Sidebar({ collapsed }: { collapsed: boolean }) {
  return (
    <aside
      className={cn(
        "relative h-screen transition-all duration-300 flex flex-col bg-background",
        collapsed ? "w-16" : "w-[16.25rem]"
      )}
    >
      <div className="flex items-center p-4 mt-2">
        {!collapsed && <h1 className="text-lg font-bold">Arro</h1>}
      </div>

      <nav className="flex-1 space-y-1 mt-4">
        {links.map((link) => (
          <div
            key={link.name}
            className="relative flex items-center gap-3 px-4 py-2 text-sm rounded-md hover:bg-muted cursor-pointer group z-[999]"
          >
            <span>{link.icon}</span>
            {!collapsed && <span>{link.name}</span>}

            {collapsed && (
              <div className="absolute left-16 bg-popover text-popover-foreground px-2 py-1 text-xs rounded shadow opacity-0 group-hover:opacity-100 transition">
                {link.name}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
}
