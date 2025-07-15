"use client"

import Link from "next/link"
import { Github, Menu, X, SquareScissors } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "./ModeToggle"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import clsx from "clsx"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])


  return (
    <header className="fixed top-0 z-50 w-full flex justify-center">
      <nav
        className={clsx(
          "w-full transition-all duration-500 ease-in",
          isScrolled
            ? "fixed translate-y-[25px] bg-primary/60 shadow-xl border border-border rounded-full backdrop-blur-xl w-[40%] px-10 max-w-7xl md:min-w-[800px]"
            : "fixed top-0 left-0 right-0 bg-transparent rounded-b-3xl border-b border-border/30 backdrop-blur"
        )}
      >
        <div className=" mx-auto px-6 lg:px-8 w-full" >
        <div className={` flex items-center h-20 transition-all duration-100 ease-in ${isScrolled ? "justify-around": "justify-between"}`}>
            <Link
              href="/"
              className="text-2xl font-bold text-foreground flex items-center gap-2"
            >
              <SquareScissors className="h-7 w-7 hover:scale-105" />
              Little Links
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href='/'
                className="hover:text-accent font-semibold transition-colors relative group"
              >
                Generate
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </Link>

              <Link
                href="/stats"
                className="hover:text-accent font-semibold transition-colors relative group"
              >
                Stats
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
              </Link>

              <ModeToggle />
            </div>

            <Button variant="secondary" className="ml-4 rounded-xl bg-transparent border-2 hover:bg-primary/10">
              <Link href="https://github.com/Dru-429/little-links" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-foreground">
                <Github className="h-4 w-4" />
                <span className="hidden lg:inline">GitHub</span>
              </Link>
            </Button>

            {/* Mobile Toggle */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X /> : <Menu />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden px-6 pb-4"
            >
              <div className="flex flex-col gap-4">
                <Link
                  href='/'
                  onClick={() => setMenuOpen(false)}
                  className="text-left text-foreground hover:text-accent font-medium"
                >
                  Generate
                </Link>
                <Link
                  href='/stats'
                  onClick={() => setMenuOpen(false)}
                  className="text-left text-foreground hover:text-accent font-medium"
                >
                  Stats
                </Link>
                <Link href="https://github.com/Dru-429/little-links" target="_blank" className="text-left text-foreground hover:text-accent font-medium">GitHub</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}
