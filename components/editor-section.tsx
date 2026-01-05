"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Sparkles } from "lucide-react"

export function EditorSection() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [prompt, setPrompt] = useState("")
  const [previewUrl, setPreviewUrl] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const [outputs, setOutputs] = useState<string[]>([])
  const [error, setError] = useState<string>("")

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.size <= 10 * 1024 * 1024) {
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const handleGenerate = async () => {
    if (!selectedFile || !prompt) return
    setLoading(true)
    setError("")
    try {
      const fd = new FormData()
      fd.append("image", selectedFile)
      fd.append("prompt", prompt)
      const res = await fetch("/api/generate", { method: "POST", body: fd })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || "Generation failed")
      const imgs: string[] = Array.isArray(json?.images) ? json.images : []
      setOutputs(imgs)
    } catch (e: any) {
      setError(e?.message || "Generation failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="editor" className="py-16 md:py-24 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold text-balance mb-4">Get Started</h2>
          <p className="text-xl text-muted-foreground text-balance">Try The AI Editor</p>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto mt-2">
            Experience the power of nano-banana's natural language image editing. Transform any photo with simple text
            commands
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Input Section */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-6">Prompt Engine</h3>
            <p className="text-sm text-muted-foreground mb-6">Transform your image with AI-powered editing</p>

            <div className="space-y-6">
              {/* Model Selection */}
              <div className="space-y-2">
                <Label>AI Model Selection</Label>
                <Select defaultValue="nano-banana">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nano-banana">Nano Banana</SelectItem>
                    <SelectItem value="nano-banana-pro">Nano Banana Pro</SelectItem>
                    <SelectItem value="seedream">SeeDream 4</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Different models offer unique characteristics and styles
                </p>
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <Label>Reference Image</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-accent transition-colors cursor-pointer">
                  <input type="file" accept="image/*" onChange={handleFileSelect} className="hidden" id="file-upload" />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    {previewUrl ? (
                      <div className="space-y-2">
                        <img
                          src={previewUrl || "/placeholder.svg"}
                          alt="Preview"
                          className="max-h-48 mx-auto rounded-lg"
                        />
                        <p className="text-sm text-muted-foreground">Click to change image</p>
                      </div>
                    ) : (
                      <>
                        <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-sm font-medium mb-1">Add Image</p>
                        <p className="text-xs text-muted-foreground">Max 10MB</p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Prompt Input */}
              <div className="space-y-2">
                <Label>Main Prompt</Label>
                <Textarea
                  placeholder="Describe your desired edits... e.g., 'place the creature in a snowy mountain' or 'make the background a sunset beach'"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  rows={4}
                  className="resize-none"
                />
              </div>

              <Button className="w-full" size="lg" disabled={!selectedFile || !prompt || loading} onClick={handleGenerate}>
                <Sparkles className="w-4 h-4 mr-2" />
                {loading ? "Generating..." : "Generate Now"}
              </Button>
            </div>
          </Card>

          {/* Output Section */}
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-6">Output Gallery</h3>
            <p className="text-sm text-muted-foreground mb-6">Your ultra-fast AI creations appear here instantly</p>
            {error && (
              <p className="text-sm text-red-600 mb-4">{error}</p>
            )}

            {outputs.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {outputs.map((url, idx) => (
                  <img key={idx} src={url} alt={`Output ${idx + 1}`} className="w-full rounded-lg border" />
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-96 bg-secondary/50 rounded-lg border-2 border-dashed border-border">
                <div className="text-center px-6">
                  <Sparkles className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium mb-2">Ready for instant generation</p>
                  <p className="text-sm text-muted-foreground">Enter your prompt and unleash the power</p>
                </div>
              </div>
            )}

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">Want more powerful image generation features?</p>
              <Button variant="link" className="mt-2">
                Visit Full Generator →
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
