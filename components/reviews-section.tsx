import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

const reviews = [
  {
    name: "AIArtistPro",
    role: "Digital Creator",
    content:
      "This editor completely changed my workflow. The character consistency is incredible - miles ahead of Flux Kontext!",
    avatar: "AP",
  },
  {
    name: "ContentCreator",
    role: "UGC Specialist",
    content:
      "Creating consistent AI influencers has never been easier. It maintains perfect face details across edits!",
    avatar: "CC",
  },
  {
    name: "PhotoEditor",
    role: "Professional Editor",
    content: "One-shot editing is basically solved with this tool. The scene blending is so natural and realistic!",
    avatar: "PE",
  },
]

export function ReviewsSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-balance mb-4">User Reviews</h2>
          <p className="text-xl text-muted-foreground text-balance">What creators are saying</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {reviews.map((review, index) => (
            <Card key={index} className="p-6">
              <div className="flex items-start gap-4 mb-4">
                <Avatar>
                  <AvatarFallback className="bg-accent text-accent-foreground">{review.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{review.name}</p>
                  <p className="text-sm text-muted-foreground">{review.role}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">"{review.content}"</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
