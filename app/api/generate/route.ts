import { type NextRequest, NextResponse } from "next/server"
import { generateArticleContent, generateArticleTitle, generateArticleDescription } from "@/lib/openai"

export const maxDuration = 60 // Set max duration to 60 seconds

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { topic, keywords, tone } = body

    if (!topic) {
      return NextResponse.json({ error: "Topic is required" }, { status: 400 })
    }

    // Generate title, content, and description in parallel
    const [title, content] = await Promise.all([
      generateArticleTitle(topic),
      generateArticleContent(topic, keywords, tone),
    ])

    // Generate description based on title and topic
    const description = await generateArticleDescription(topic, title)

    return NextResponse.json({
      title,
      content,
      description,
      keywords,
    })
  } catch (error) {
    console.error("Error generating content:", error)
    return NextResponse.json({ error: "Failed to generate content" }, { status: 500 })
  }
}

