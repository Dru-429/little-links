import Navbar from "@/components/Navbar"
import Form from "@/components/Form"
import { Zap, Shield, BarChart3, Scissors, Globe, Clock } from "lucide-react"

export default function HomePage() {
  const features = [
    {
      icon: <Scissors className="w-8 h-8" />,
      title: "No Login Required",
      description: "Start shortening links immediately without any registration hassle.",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Custom URL Slugs",
      description: "Create memorable, branded short links with your own custom aliases.",
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Blazing Fast",
      description: "Lightning-quick link shortening and redirects for optimal user experience.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "No Chaos, No Ads",
      description: "Clean, distraction-free experience without annoying advertisements.",
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Free Click Tracking",
      description: "Monitor your link performance with detailed analytics and insights.",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Unlimited Usage",
      description: "Shorten as many links as you need without any restrictions or limits.",
    },
  ]

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navbar />

      {/* Hero Section */}
      <main className="relative">
        
        {/* Geometric Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Large Circle */}
          <div className="absolute top-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
          {/* Medium Circle */}
          <div className="absolute top-40 right-32 w-64 h-64 bg-accent/15 rounded-full"></div>
          {/* Small Circles */}
          <div className="absolute top-60 right-20 w-32 h-32 bg-secondary/20 rounded-full"></div>
          <div className="absolute top-32 right-64 w-24 h-24 bg-primary/20 rounded-full"></div>

          {/* Left side geometric shapes */}
          <div className="absolute top-96 left-10 w-48 h-48 bg-secondary/10 rounded-full blur-2xl"></div>
          <div className="absolute top-80 left-32 w-20 h-20 bg-accent/20 rounded-full"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[80vh]">
            {/* Left Content */}
            <div className="space-y-12">
              <div className="space-y-8">
                <h1 className="text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] tracking-tight">
                  Make Your
                  <br />
                  <span className="text-primary">Links Little</span>
                  <br />
                  <span className="text-accent">& Mighty</span>
                </h1>
                <p className="text-xl lg:text-2xl text-muted-foreground leading-relaxed font-light max-w-lg">
                  Transform long URLs into clean, shareable links that pack a punch. Fast, free, and built for the
                  modern web.
                </p>
              </div>

              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span>No signup required</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-secondary rounded-full"></div>
                  <span>Privacy focused</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-accent rounded-full"></div>
                  <span>Instant results</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-accent/50 rounded-full"></div>
                  <span>Track clicks</span>
                </div>
              </div>
            </div>

            {/* Right Content - Form */}
            <div className="relative">
              {/* Background decoration for form */}
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 rounded-3xl blur-xl"></div>
              <div className="relative">
                <Form />
              </div>
            </div>
          </div>
        </div>

        {/* Curved Section Transition */}
        <div className="relative">
          <svg className="w-full h-24 text-primary/20" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0 C300,120 900,120 1200,0 L1200,120 L0,120 Z" fill="currentColor" />
          </svg>
        </div>

        {/* Features Section */}
        <div className="bg-primary/6 py-32 relative">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute bottom-20 left-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl"></div>
            <div className="absolute top-20 right-20 w-48 h-48 bg-accent/10 rounded-full blur-2xl"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-5xl lg:text-6xl font-bold text-foreground mb-8 tracking-tight">
                Why Choose
                <br />
                <span className="text-primary">Little Links?</span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
                Built with simplicity and performance in mind, respecting your time and privacy.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="group text-center space-y-6 p-8 rounded-3xl bg-card/50 backdrop-blur-sm border border-border/30 hover:bg-card/80 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 text-primary group-hover:from-primary/30 group-hover:to-secondary/30 transition-all duration-300">
                    {feature.icon}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-foreground">{feature.title}</h3>
                    <p className="text-muted-foreground leading-relaxed font-light">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="relative py-32">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-4xl mx-auto px-6 lg:px-8 text-center">
            <div className="space-y-12">
              <div className="space-y-6">
                <h3 className="text-4xl lg:text-5xl font-bold text-foreground tracking-tight">
                  Ready to Get
                  <br />
                  <span className="text-accent">Started?</span>
                </h3>
                <p className="text-xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
                  Join thousands of users who trust Little Links for their URL shortening needs.
                </p>
              </div>

              <div className="inline-flex items-center justify-center p-8 rounded-3xl bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 border border-border/30">
                <div className="flex flex-wrap justify-center items-center gap-8 text-base text-muted-foreground font-light">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-primary rounded-full"></div>
                    <span>No signup required</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-accent rounded-full"></div>
                    <span>Instant results</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-secondary rounded-full"></div>
                    <span>Privacy focused</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
