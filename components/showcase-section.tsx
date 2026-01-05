import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const showcaseItems = [
  {
    title: "Ultra-Fast Mountain Generation",
    description: "Created in 0.8 seconds with Nano Banana's optimized neural engine",
    image: "/dramatic-mountain-landscape-with-snow-peaks-at-sun.jpg",
  },
  {
    title: "Instant Garden Creation",
    description: "Complex scene rendered in milliseconds using Nano Banana technology",
    image: "/beautiful-garden-with-colorful-flowers-and-pond.jpg",
  },
  {
    title: "Real-time Beach Synthesis",
    description: "Nano Banana delivers photorealistic results at lightning speed",
    image: "/tropical-beach.png",
  },
  {
    title: "Rapid Aurora Generation",
    description: "Advanced effects processed instantly with Nano Banana AI",
    image: "/northern-lights-aurora-borealis-over-snowy-landsca.jpg",
  },
]

export function ShowcaseSection() {
  return (
    <section id="showcase" className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-balance mb-4">Showcase</h2>
          <p className="text-xl text-muted-foreground text-balance">Lightning-Fast AI Creations</p>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto mt-2">
            See what Nano Banana generates in milliseconds
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {showcaseItems.map((item, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="aspect-video relative overflow-hidden bg-muted">
                <img src={item.image || "/placeholder.svg"} alt={item.title} className="w-full h-full object-cover" />
                <Badge className="absolute top-4 left-4 bg-accent text-accent-foreground">Nano Banana Speed</Badge>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground mb-4">Experience the power of Nano Banana yourself</p>
          <Button size="lg" asChild>
            <a href="#editor">Try Nano Banana Generator</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
