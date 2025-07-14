"use client"

import type React from "react"

import { useState } from "react"
import { Search, BarChart3, Calendar, MousePointer, LinkIcon, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Navbar from "@/components/Navbar"

interface LinkStats {
  shortSlug: string
  originalUrl: string
  clicks: number
  createdAt: string
}

interface ApiResponse {
  success: boolean
  message: string
  stats?: LinkStats
}

export default function StatsPage() {
  const [searchUrl, setSearchUrl] = useState("")
  const [stats, setStats] = useState<LinkStats | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [copied, setCopied] = useState(false)

  const extractSlug = (url: string): string => {
    // Remove whitespace
    const cleanUrl = url.trim()

    // If it's just a slug (no protocol), return as is
    if (!cleanUrl.includes("/")) {
      return cleanUrl
    }

    // Extract slug from full URL
    try {
      const urlObj = new URL(cleanUrl)
      return urlObj.pathname.substring(1) // Remove leading slash
    } catch {
      // If URL parsing fails, try to extract slug from the end
      const parts = cleanUrl.split("/")
      return parts[parts.length - 1]
    }
  }

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchUrl.trim()) return

    setIsLoading(true)
    setError("")
    setStats(null)

    try {
      const slug = extractSlug(searchUrl)
      const response = await fetch(`/api/stats?slug=${encodeURIComponent(slug)}`)
      const data: ApiResponse = await response.json()

      if (data.success && data.stats) {
        setStats(data.stats)
        toast({
          title: "Stats loaded successfully!",
          description: "Link statistics have been retrieved.",
        })
      } else {
        setError(data.message || "Failed to fetch stats")
        toast({
          title: "Link not found",
          description: data.message || "The shortened link could not be found.",
          variant: "destructive",
        })
      }
    } catch (err) {
      setError("Failed to fetch stats. Please try again.")
      toast({
        title: "Error",
        description: "Failed to fetch link statistics.",
        variant: "destructive",
      })
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      toast({
        title: "Copied to clipboard!",
        description: "The URL has been copied.",
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the URL manually.",
        variant: "destructive",
      })
      console.log(err)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const resetSearch = () => {
    setSearchUrl("")
    setStats(null)
    setError("")
    setCopied(false)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center space-y-8 mb-16">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight">
                Link <span className="text-primary">Statistics</span>
              </h1>
              <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
                Track the performance of your shortened links with detailed analytics and insights.
              </p>
            </div>
          </div>

          {/* Search Section */}
          <div className="mb-16">
            <Card className="border-0 shadow-2xl bg-card/90 backdrop-blur-xl">
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl font-bold text-foreground mb-2">Check Your Link Stats</CardTitle>
                <p className="text-muted-foreground font-light">
                  Paste your shortened link here to view detailed statistics
                </p>
              </CardHeader>
              <CardContent className="p-8">
                <form onSubmit={handleSearch} className="space-y-6">
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="Paste your link here (e.g., https://ltl.ink/abc123 or just abc123)"
                      value={searchUrl}
                      onChange={(e) => setSearchUrl(e.target.value)}
                      className="h-14 text-base bg-input border-2 border-border/30 focus:border-primary rounded-2xl px-6 pr-14 transition-all duration-300"
                      required
                    />
                    <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  </div>
                  <Button
                    type="submit"
                    className="w-full h-14 text-base font-semibold rounded-2xl bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transition-all duration-300 shadow-lg hover:shadow-xl"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Fetching Stats...
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <BarChart3 className="w-5 h-5" />
                        Get Statistics
                      </div>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Error State */}
          {error && (
            <div className="mb-16">
              <Card className="border-2 border-destructive/20 bg-destructive/5">
                <CardContent className="p-8 text-center">
                  <div className="space-y-4">
                    <div className="w-16 h-16 mx-auto bg-destructive/10 rounded-full flex items-center justify-center">
                      <Search className="w-8 h-8 text-destructive" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground">Link Not Found</h3>
                    <p className="text-muted-foreground">{error}</p>
                    <Button onClick={resetSearch} variant="outline" className="bg-transparent">
                      Try Another Link
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Stats Display */}
          {stats && (
            <div className="space-y-8">
              {/* Overview Card */}
              <Card className="border-0 shadow-2xl bg-card/90 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
                    <LinkIcon className="w-6 h-6 text-primary" />
                    Link Overview
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Short Link */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Shortened Link</label>
                    <div className="flex items-center gap-3 p-4 bg-background/50 rounded-xl border border-border/30">
                      <code className="flex-1 font-mono text-primary">https://ltl.ink/{stats.shortSlug}</code>
                      <Button
                        onClick={() => copyToClipboard(`https://ltl.ink/${stats.shortSlug}`)}
                        variant="outline"
                        size="sm"
                        className="bg-transparent"
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  {/* Original URL */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-muted-foreground">Original URL</label>
                    <div className="p-4 bg-background/50 rounded-xl border border-border/30">
                      <p className="text-foreground break-all">{stats.originalUrl}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Click Count */}
                <Card className="border-0 shadow-xl bg-gradient-to-br from-primary/10 to-secondary/10">
                  <CardContent className="p-8 text-center">
                    <div className="space-y-4">
                      <div className="w-16 h-16 mx-auto bg-primary/20 rounded-2xl flex items-center justify-center">
                        <MousePointer className="w-8 h-8 text-primary" />
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-foreground">{stats.clicks.toLocaleString()}</p>
                        <p className="text-muted-foreground font-light">Total Clicks</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Created Date */}
                <Card className="border-0 shadow-xl bg-gradient-to-br from-accent/10 to-secondary/10">
                  <CardContent className="p-8 text-center">
                    <div className="space-y-4">
                      <div className="w-16 h-16 mx-auto bg-accent/20 rounded-2xl flex items-center justify-center">
                        <Calendar className="w-8 h-8 text-accent" />
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-foreground">{formatDate(stats.createdAt)}</p>
                        <p className="text-muted-foreground font-light">Created On</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={resetSearch}
                  variant="outline"
                  className="bg-transparent border-2 rounded-xl hover:bg-primary/10 transition-all duration-300"
                >
                  Check Another Link
                </Button>
                <Button
                  onClick={() => window.open(`https://ltl.ink/${stats.shortSlug}`, "_blank")}
                  className="bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 rounded-xl transition-all duration-300"
                >
                  Visit Link
                </Button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!stats && !error && !isLoading && (
            <div className="text-center py-16">
              <div className="space-y-6">
                <div className="w-24 h-24 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <BarChart3 className="w-12 h-12 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-semibold text-foreground">Ready to Check Stats?</h3>
                  <p className="text-muted-foreground font-light">
                    Enter your shortened link above to view detailed analytics and performance metrics.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
