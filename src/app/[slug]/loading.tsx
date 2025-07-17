import { Card, CardContent } from "@/components/ui/card"
import { LinkIcon } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-6">
      <div className="max-w-md w-full">
        <Card className="border-0 shadow-2xl bg-card/90 backdrop-blur-xl">
          <CardContent className="p-12 text-center space-y-8">
            {/* Animated Icon */}
            <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
              <LinkIcon className="w-10 h-10 text-primary animate-pulse" />
            </div>

            {/* Content */}
            <div className="space-y-4">
              <h1 className="text-2xl font-bold text-foreground">Redirecting...</h1>
              <p className="text-muted-foreground">Please wait while we redirect you to your destination.</p>
            </div>

            {/* Loading Animation */}
            <div className="flex justify-center">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-primary rounded-full animate-bounce"></div>
                <div
                  className="w-3 h-3 bg-secondary rounded-full animate-bounce"
                  style={{ animationDelay: "0.1s" }}
                ></div>
                <div className="w-3 h-3 bg-accent rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
