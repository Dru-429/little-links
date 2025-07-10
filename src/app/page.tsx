import Navbar from "@/components/Navbar"
import Form from "@/components/Form"
import { Zap, Shield, BarChart3, Scissors, Globe, Clock } from "lucide-react"

export default function HomePage() {
  const features = [
    {
      icon: <Scissors className="w-8 h-8 text-primary" />,
      title: "No Login Required",
      description: "Start shortening links immediately without any registration hassle.",
    },
    {
      icon: <Globe className="w-8 h-8 text-primary" />,
      title: "Custom URL Slugs",
      description: "Create memorable, branded short links with your own custom aliases.",
    },
    {
      icon: <Zap className="w-8 h-8 text-primary" />,
      title: "Blazing Fast",
      description: "Lightning-quick link shortening and redirects for optimal user experience.",
    },
    {
      icon: <Shield className="w-8 h-8 text-primary" />,
      title: "No Chaos, No Ads",
      description: "Clean, distraction-free experience without annoying advertisements.",
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-primary" />,
      title: "Free Click Tracking",
      description: "Monitor your link performance with detailed analytics and insights.",
    },
    {
      icon: <Clock className="w-8 h-8 text-primary" />,
      title: "Unlimited Usage",
      description: "Shorten as many links as you need without any restrictions or limits.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      <Navbar />

      {/* Hero Section */}
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Content */}
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-primary leading-tight">
                Make Your Links
                <span className="block text-secondary">Little & Mighty</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Transform unwieldy URLs into clean, shareable links that pack a punch. Fast, free, and built for the
                modern web.
              </p>
            </div>

            {/* Form Component */}
            <div className="w-full max-w-4xl">
              <Form />
            </div>
          </div>

          {/* Features Section */}
          <div className="mt-24">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Why Choose Little Links?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Built with simplicity and performance in mind, respecting your time and privacy.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group p-6 rounded-xl bg-card/30 backdrop-blur-sm border border-border/50 hover:bg-card/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-primary">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-24 text-center">
            <div className="max-w-3xl mx-auto p-8 rounded-2xl bg-gradient-to-r from-primary/5 via-secondary/5 to-muted/20 border border-border">
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">Ready to Get Started?</h3>
              <p className="text-lg text-muted-foreground mb-6">
                Join thousands of users who trust Little Links for their URL shortening needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="text-sm text-muted-foreground">
                  ✨ No signup required • 🚀 Instant results • 🔒 Privacy focused
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
