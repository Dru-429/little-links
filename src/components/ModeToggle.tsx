"use client"

import * as React from "react"
import { Moon, Sun, Monitor, Palette } from "lucide-react"
import { useTheme } from "next-themes"
import { motion } from "framer-motion"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = React.useState(false)

  const themeOptions = [
    {
      value: "light",
      label: "Light",
      icon: Sun,
      description: "Bright and clean",
    },
    {
      value: "dark",
      label: "Dark",
      icon: Moon,
      description: "Easy on the eyes",
    },
    {
      value: "system",
      label: "System",
      icon: Monitor,
      description: "Follows your device",
    },
  ]

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative overflow-hidden backdrop-blur-md bg-primary/10 hover:bg-primary/20 border border-secondary/20 hover:border-secondary/20 rounded-2xl px-4 py-2 h-auto md:min-w-[100px] transition-all duration-500 hover:scale-105 hover:shadow-md hover:shadow-background/10"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/20 via-backgorund-500/20 to-accent-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative flex items-center gap-2 z-10 text-foreground font-semibold">
          <div className="relative w-5 h-5 flex items-center justify-center">
            <Sun className={`absolute transition-all duration-700 ease-in-out ${theme === "light" ? "scale-100 rotate-0 opacity-100" : "scale-0 rotate-180 opacity-0"}`} />
            <Moon className={`absolute transition-all duration-700 ease-in-out ${theme === "dark" ? "scale-100 rotate-0 opacity-100" : "scale-0 -rotate-180 opacity-0"}`} />
            <Monitor className={`absolute transition-all duration-700 ease-in-out ${theme === "system" ? "scale-100 rotate-0 opacity-100" : "scale-0 rotate-90 opacity-0"}`} />
          </div>

          <span className="hidden md:inline text-sm font-medium bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent group-hover:from-accent-200 group-hover:to-background-200 transition-all duration-500">
            {
              theme === "light"
                ? " Light"
                : theme === "dark"
                ? " Dark"
                : " System"
            }
          </span>

          <div
            className={`w-2 h-2 border-r-2 border-b-2 border-foreground transform transition-transform duration-300 ${isOpen ? "-rotate-45 translate-y-0.5" : "rotate-45 -translate-y-0.5"}`}
          />
        </div>

        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/0 via-pink-500/0 to-blue-500/0 group-hover:from-purple-500/10 group-hover:via-pink-500/10 group-hover:to-blue-500/10 transition-all duration-500 blur-xl" />
      </button>

      {isOpen && (
        <motion.div 
          className="absolute right-0 z-50 mt-2 w-56 backdrop-blur-2xl bg-primary/30 border border-primary/74 rounded-2xl shadow-2xl shadow-black/20 overflow-hidden"
          initial={{ opacity: 0, scale: 0,}}
          animate={{ opacity: 1, scale: 1, }}
          exit={{ opacity: 0, scale: 0, }} 
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {/* Header */}
          <div className="px-4 py-3 border-b border-secondary/10 flex items-center gap-2">
            <Palette className="w-4 h-4 text-foreground/80" />
            <span className="text-sm font-bold text-foreground/90">Choose Theme</span>
          </div>

          {/* Theme Options */}
          <div className="p-2">
            {themeOptions.map((option, index) => {
              const Icon = option.icon
              const isSelected = theme === option.value

              return (
                <div
                  key={index}
                  onClick={() => {
                    setTheme(option.value)
                    setIsOpen(false)
                  }}
                  className={`group relative overflow-hidden rounded-xl p-2 mb-2 cursor-pointer transition-all duration-300 hover:bg-secondary/10 ${
                    isSelected ? "bg-secondary/15 shadow-md" : ""
                  }`}
                >
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-accent rounded-r-full" />
                  )}

                  <div className="flex items-center gap-3 relative z-10">
                    <div
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        isSelected
                          ? "bg-gradient-to-br from-primary/60 to-accent/60 shadow-lg"
                          : "bg-accent/5 group-hover:bg-secondary/10"
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 transition-all duration-300 ${
                          isSelected
                            ? "text-foreground scale-110"
                            : "text-secondary/70 group-hover:text-foreground group-hover:scale-105"
                        }`}
                      />
                    </div>

                    <div className="flex-1">
                      <div
                        className={`font-medium transition-colors duration-300 ${
                          isSelected ? "text-foreground" : "text-foreground/80 group-hover:text-foreground font-semibold"
                        }`}
                      >
                        {option.label}
                      </div>
                      <div className="text-xs text-foreground/50 group-hover:text-foreground/70 transition-colors duration-300 font-semibold">
                        {option.description}
                      </div>
                    </div>

                    {isSelected && (
                      <div className="w-2 h-2 rounded-full bg-gradient-to-br from-foreground to-secondary animate-pulse" />
                    )}
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-pink-500/0 to-blue-500/0 group-hover:from-purple-500/5 group-hover:via-pink-500/5 group-hover:to-blue-500/5 transition-all duration-500" />
                </div>
              )
            })}
          </div>

        </motion.div>
      )}
    </div>
  )
}
