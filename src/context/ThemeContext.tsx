import React, { createContext, useContext, useEffect, useState } from "react"

type ThemeContextType = {
  theme: string
  setTheme: (theme: string) => void
  toggleMode: (base: string) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const saved = localStorage.getItem("app-theme") || "blue"
  const [theme, setTheme] = useState<string>(saved)

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme)
    localStorage.setItem("app-theme", theme)
  }, [theme])

  const toggleMode = (base: string) => {
    if (theme === `${base}-dark`) setTheme(base)
    else setTheme(`${base}-dark`)
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
