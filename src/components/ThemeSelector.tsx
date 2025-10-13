import React from "react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Sun, Moon, Palette } from "lucide-react"
import { useTheme } from "@/context/ThemeContext"

const THEMES = ["blue", "green", "rose", "violet", "amber", "emerald", "cyan", "gray"]

export default function ThemeSelector() {
  const { theme, setTheme, toggleMode } = useTheme()
  const base = theme.replace("-dark", "")
  const isDark = theme.endsWith("-dark")

  return (
    <div className="flex items-center gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex items-center gap-2"
          >
            <Palette className="w-4 h-4" />
            <span className="capitalize">{base}</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="p-2 w-40">
          {THEMES.map((t) => (
            <DropdownMenuItem
              key={t}
              onClick={() => setTheme(isDark ? `${t}-dark` : t)}
              className={`cursor-pointer ${
                base === t ? "bg-primary/10 font-semibold" : ""
              }`}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex items-center gap-2">
        <Sun className="w-4 h-4 text-yellow-500" />
        <Switch checked={isDark} onCheckedChange={() => toggleMode(base)} />
        <Moon className="w-4 h-4 text-blue-400" />
      </div>
    </div>
  )
}
