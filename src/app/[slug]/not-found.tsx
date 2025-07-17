import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { LinkIcon, Home, Search } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <Card className="border-0 shadow-2xl bg-card/90 backdrop-blur-xl">
          <CardContent className="p-12 text-center space-y-8">
            {/* Icon */}
            <div className="w-20 h-20 mx-auto bg-destructive/10 rounded-full flex items-center justify-center">
              <LinkIcon className="w-10 h-10 text-destructive" />
            </div>

            {/* Content */}
            <div className="space-y-4">
              <h1 className="text-3xl font-bold text-foreground">Link Not Found</h1>
              <p className="text-muted-foreground leading-relaxed">
                The shortened link you are looking for dose not exist or may have been removed.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4">
              <Button asChild className="w-full h-12 rounded-xl bg-gradient-to-r from-primary to-secondary">
                <Link href="/" className="flex items-center gap-3">
                  <Home className="w-5 h-5" />
                  Go Home
                </Link>
              </Button>

              <Button asChild variant="outline" className="w-full h-12 rounded-xl bg-transparent">
                <Link href="/stats" className="flex items-center gap-3">
                  <Search className="w-5 h-5" />
                  Check Link Stats
                </Link>
              </Button>
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-border/30">
              <p className="text-sm text-muted-foreground">Need help? Contact support or try creating a new link.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
