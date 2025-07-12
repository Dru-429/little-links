"use client"

import Link from "next/link"
import { Github } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-bold text-foreground transition-all duration-300"
            >
              Little Links
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <Link href="/" className="text-foreground hover:text-primary font-medium transition-colors relative group">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/stats"
                className="text-muted-foreground hover:text-primary px-4 py-2 text-base font-medium transition-colors duration-300"
              >
                Stats
              </Link>
              <Link
                href="/about"
                className="text-muted-foreground hover:text-primary px-4 py-2 text-base font-medium transition-colors duration-300"
              >
                About
              </Link>
              <Button
                variant="outline"
                size="default"
                asChild
                className="ml-4 bg-transparent border-2 rounded-xl hover:bg-primary/10 transition-all duration-300"
              >
                <Link
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Github className="h-4 w-4" />
                  <span className="hidden lg:inline">GitHub</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="outline" size="default" asChild className="border-2 rounded-xl bg-transparent">
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
