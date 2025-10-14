import React from "react";
import { ThemeProvider } from "./context/ThemeContext";
import ThemeSelector from "./components/ThemeSelector";
import MainLayout from "./layouts/MainLayout";
import ComponentsShowcase from "./pages/ComponentsShowcase";

export default function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background text-foreground transition-theme duration-300">
        <header className="flex items-center justify-between p-6">
          <h1 className="text-2xl font-bold">Shadcn Theme Demo</h1>
          <ThemeSelector />
        </header>

        <MainLayout>
          <ComponentsShowcase />
        </MainLayout>
      </div>
    </ThemeProvider>
  );
}
