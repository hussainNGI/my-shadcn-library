import React from "react";
import {
  Home,
  Settings,
  LayoutGrid,
  Users,
  Building2,
  ChevronDown,
  HelpCircle,
  LogOut,
  User as UserIcon,
  CreditCard,
  ChevronsUpDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const links = [
  { name: "Dashboard", icon: <Home size={18} /> },
  { name: "Projects", icon: <LayoutGrid size={18} /> },
  { name: "Users", icon: <Users size={18} /> },
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
        {collapsed ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="w-8 h-8 p-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0">
                <Building2 className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" sideOffset={8} className="z-[1002]">
              <DropdownMenuLabel>Companies</DropdownMenuLabel>
              <DropdownMenuItem>
                <Building2 className="w-4 h-4 mr-2" /> Acme Inc.
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Building2 className="w-4 h-4 mr-2" /> Globex Corp.
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LayoutGrid className="w-4 h-4 mr-2" /> Manage Companies
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between px-2 py-2 h-10 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
              >
                <span className="flex items-center gap-2">
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-muted">
                    <Building2 className="w-3.5 h-3.5" />
                  </span>
                  <span className="font-medium">Acme Inc.</span>
                </span>
                <ChevronsUpDown className="w-4 h-4 opacity-70" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64 z-[1002]">
              <DropdownMenuLabel>Switch company</DropdownMenuLabel>
              <DropdownMenuItem>
                <Building2 className="w-4 h-4 mr-2" /> Acme Inc.
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Building2 className="w-4 h-4 mr-2" /> Globex Corp.
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LayoutGrid className="w-4 h-4 mr-2" /> Manage Companies
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
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

      <div className="mt-auto p-2">
        <Separator className="my-2" />
        <div className="space-y-1">
          <div className="relative flex items-center gap-3 px-2 py-2 text-sm rounded-md hover:bg-muted cursor-pointer group">
            <Settings className="w-4 h-4" />
            {!collapsed && <span>Settings</span>}
            {collapsed && (
              <div className="absolute left-16 bg-popover text-popover-foreground px-2 py-1 text-xs rounded shadow opacity-0 group-hover:opacity-100 transition">
                Settings
              </div>
            )}
          </div>
          <div className="relative flex items-center gap-3 px-2 py-2 text-sm rounded-md hover:bg-muted cursor-pointer group">
            <HelpCircle className="w-4 h-4" />
            {!collapsed && <span>Get Help</span>}
            {collapsed && (
              <div className="absolute left-16 bg-popover text-popover-foreground px-2 py-1 text-xs rounded shadow opacity-0 group-hover:opacity-100 transition">
                Get Help
              </div>
            )}
          </div>
        </div>
        <div className="mt-2">
          {collapsed ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="w-8 h-8 p-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0">
                  <UserIcon className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" sideOffset={8} className="w-56 z-[1002]">
                <DropdownMenuLabel>
                  <div className="flex flex-col">
                    <span className="font-medium">shadcn</span>
                    <span className="text-xs text-muted-foreground">shadcnm@example.com</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <UserIcon className="w-4 h-4 mr-2" /> Companies
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard className="w-4 h-4 mr-2" /> Users
                </DropdownMenuItem>
                
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="w-4 h-4 mr-2" /> Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="w-full justify-between gap-2 px-2 py-2 h-10 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0">
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium leading-none">acme Company</span>
                    <span className="text-xs text-muted-foreground">acmem@example.com</span>
                  </div>
                  <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-muted">
                    <ChevronsUpDown className="w-3.5 h-3.5" />
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 z-[1002]">
                <DropdownMenuLabel>My account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <UserIcon className="w-4 h-4 mr-2" /> Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard className="w-4 h-4 mr-2" /> Billing
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="w-4 h-4 mr-2" /> Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="w-4 h-4 mr-2" /> Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </aside>
  );
}
