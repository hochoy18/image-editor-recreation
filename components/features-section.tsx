import { Card } from "@/components/ui/card"
import { MessageSquare, User, Palette, Zap, Images, Users } from "lucide-react"

const features = [
  {
    icon: MessageSquare,
    title: "Natural Language Editing",
    description:
      "Edit images using simple text prompts. Nano-banana AI understands complex instructions like GPT for images",
  },
  {
    icon: User,
    title: "Character Consistency",
    description:
      "Maintain perfect character details across edits. This model excels at preserving faces and identities",
  },
  {
    icon: Palette,
    title: "Scene Preservation",
    description: "Seamlessly blend edits with original backgrounds. Superior scene fusion compared to Flux Kontext",
  },
  {
    icon: Zap,
    title: "One-Shot Editing",
    description:
      "Perfect results in a single attempt. Nano-banana solves one-shot image editing challenges effortlessly",
  },
  {
    icon: Images,
    title: "Multi-Image Context",
    description: "Process multiple images simultaneously. Support for advanced multi-image editing workflows",
  },
  {
    icon: Users,
    title: "AI UGC Creation",
    description: "Create consistent AI influencers and UGC content. Perfect for social media and marketing campaigns",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-balance mb-4">Core Features</h2>
          <p className="text-xl text-muted-foreground text-balance">Why Choose Nano Banana?</p>
          <p className="text-base text-muted-foreground max-w-3xl mx-auto mt-2">
            Nano-banana is the most advanced AI image editor on LMArena. Revolutionize your photo editing with natural
            language understanding
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <feature.icon className="w-10 h-10 mb-4 text-accent" />
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
