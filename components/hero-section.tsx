import { Button } from "@/components/ui/button"
import { BananaIcon } from "@/components/banana-icon"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Decorative banana elements */}
      <div className="absolute top-10 right-20 opacity-20 rotate-12 hidden lg:block">
        <BananaIcon className="w-32 h-32 text-accent" />
      </div>
      <div className="absolute bottom-20 left-10 opacity-10 -rotate-45 hidden lg:block">
        <BananaIcon className="w-48 h-48 text-accent" />
      </div>
      <div className="absolute top-1/2 right-1/3 opacity-5 rotate-90 hidden lg:block">
        <BananaIcon className="w-64 h-64 text-accent" />
      </div>

      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BananaIcon className="w-8 h-8 text-accent" />
            <span className="text-2xl font-bold text-foreground">Nano Banana</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost">View Examples</Button>
            <Button>Start Editing</Button>
          </div>
        </nav>
      </header>

      {/* Announcement Banner */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-center gap-2 bg-accent/10 border border-accent/20 rounded-full px-4 py-2 w-fit mx-auto">
          <span className="text-2xl">🍌</span>
          <span className="text-sm font-medium text-foreground">The AI model that outperforms Flux Kontext</span>
          <Button variant="link" className="text-sm h-auto p-0 text-foreground" asChild>
            <a href="#editor">Try Now →</a>
          </Button>
        </div>
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-balance mb-6">Nano Banana</h1>
          <p className="text-xl md:text-2xl text-muted-foreground text-balance mb-8 leading-relaxed">
            Transform any image with simple text prompts. Nano-banana's advanced model delivers consistent character
            editing and scene preservation that surpasses Flux Kontext. Experience the future of AI image editing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg h-14 px-8" asChild>
              <a href="#editor">
                Start Editing
                <BananaIcon className="w-5 h-5 ml-2" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg h-14 px-8 bg-transparent" asChild>
              <a href="#showcase">View Examples</a>
            </Button>
          </div>
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span>✓ One-shot editing</span>
            <span>•</span>
            <span>✓ Multi-image support</span>
            <span>•</span>
            <span>✓ Natural language</span>
          </div>
        </div>
      </div>
    </section>
  )
}
