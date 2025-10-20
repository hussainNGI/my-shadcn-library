import React, { useState } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import MainLayout from "./layouts/MainLayout";
import ComponentsShowcase from "./pages/ComponentsShowcase";

export default function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <ThemeProvider>
      <MainLayout collapsed={collapsed} setCollapsed={setCollapsed}>
        <ComponentsShowcase />
      </MainLayout>
    </ThemeProvider>
  );
}
