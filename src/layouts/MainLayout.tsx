import React from "react";
import Sidebar from "@/components/Sidebar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-[calc(100vh-5rem)] overflow-hidden transition-colors duration-300">
      {/* Sidebar */}
      <Sidebar />

      {/* Content Area */}
      <main
        className="flex-1 overflow-y-auto p-6 bg-[hsl(var(--content-bg))] text-foreground transition-colors duration-300 rounded-lg"
      >
        {children}
      </main>
    </div>
  );
}
