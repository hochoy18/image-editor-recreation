import { NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData()
    const file = form.get("image") as File | null
    const prompt = String(form.get("prompt") || "").trim()

    if (!file || !prompt) {
      return NextResponse.json({ error: "Missing image or prompt" }, { status: 400 })
    }

    const key = process.env.OPENROUTER_API_KEY
    if (!key) {
      return NextResponse.json({ error: "Server missing OPENROUTER_API_KEY" }, { status: 500 })
    }

    // Convert uploaded image to a data URL for image_url input
    const mime = file.type || "image/png"
    const buffer = Buffer.from(await file.arrayBuffer())
    const dataUrl = `data:${mime};base64,${buffer.toString("base64")}`

    const body = {
      model: "google/gemini-2.5-flash-image",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            { type: "image_url", image_url: { url: dataUrl } },
          ],
        },
      ],
    }

    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
        "HTTP-Referer": process.env.OPENROUTER_HTTP_REFERRER || "http://localhost:3000",
        "X-Title": process.env.OPENROUTER_SITE_TITLE || "image-editor-recreation",
      },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      const text = await res.text()
      return NextResponse.json({ error: `OpenRouter error: ${res.status}`, details: text }, { status: 502 })
    }

    const json: any = await res.json()
    const message = json?.choices?.[0]?.message
    const images: string[] = []

    // Collect images from structured content parts
    const content = message?.content
    if (Array.isArray(content)) {
      for (const part of content) {
        if (part?.type === "image_url" && part?.image_url?.url) images.push(part.image_url.url)
        if (part?.type === "output_image" && part?.image?.url) images.push(part.image.url)
        // Base64 fallback (if API returns inline image data)
        const b64 = part?.image?.b64 || part?.image?.base64 || part?.image?.b64_json
        const mimeGuess = part?.image?.mime || "image/png"
        if (!part?.image?.url && b64) images.push(`data:${mimeGuess};base64,${b64}`)
      }
    } else if (typeof content === "string") {
      // Fallback: extract image links from string content
      const urlRegex = /(https?:\/\/[^\s)\]"']+\.(?:png|jpg|jpeg|gif|webp))/gi
      let m: RegExpExecArray | null
      while ((m = urlRegex.exec(content)) !== null) images.push(m[1])
    }

    // Some providers (e.g. certain OpenRouter adapters) may attach image parts
    // directly on the message object (e.g. message.images) instead of content[].
    const messageImages = Array.isArray((message as any)?.images) ? (message as any).images : []
    for (const part of messageImages) {
      if (part?.type === "image_url" && part?.image_url?.url) images.push(part.image_url.url)
      if (part?.type === "output_image" && part?.image?.url) images.push(part.image.url)
      const b64 = part?.image?.b64 || part?.image?.base64 || part?.image?.b64_json
      const mimeGuess = part?.image?.mime || "image/png"
      if (!part?.image?.url && b64) images.push(`data:${mimeGuess};base64,${b64}`)
    }

    return NextResponse.json({ images, raw: message })
  } catch (err: any) {
    console.error("/api/generate error:", err?.response?.data || err?.message || err)
    return NextResponse.json({ error: "Generation failed", details: err?.message || "Unknown error" }, { status: 500 })
  }
}
