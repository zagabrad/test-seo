import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function generateArticleContent(topic: string, keywords = "", tone = "informative") {
  try {
    const prompt = `
      Write a comprehensive, SEO-optimized article about "${topic}".
      
      ${keywords ? `Include these keywords naturally throughout the article: ${keywords}.` : ""}
      
      The article should have:
      - An engaging introduction
      - Well-structured sections with headings
      - A conclusion
      
      Use a ${tone} tone and make it engaging for readers.
      Format the article in markdown.
    `

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      temperature: 0.7,
      maxTokens: 2000,
    })

    return text
  } catch (error) {
    console.error("Error generating article content:", error)
    throw new Error("Failed to generate article content")
  }
}

export async function generateArticleTitle(topic: string) {
  try {
    const prompt = `
      Generate an SEO-optimized, engaging title for an article about "${topic}".
      The title should be concise (under 60 characters), compelling, and include relevant keywords.
      Return only the title text without quotes or additional formatting.
    `

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      temperature: 0.7,
      maxTokens: 60,
    })

    return text.trim()
  } catch (error) {
    console.error("Error generating article title:", error)
    throw new Error("Failed to generate article title")
  }
}

export async function generateArticleDescription(topic: string, title: string) {
  try {
    const prompt = `
      Write a compelling meta description for an article titled "${title}" about "${topic}".
      The description should be under 160 characters, include relevant keywords, and entice readers to click.
      Return only the description text without quotes or additional formatting.
    `

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
      temperature: 0.7,
      maxTokens: 160,
    })

    return text.trim()
  } catch (error) {
    console.error("Error generating article description:", error)
    throw new Error("Failed to generate article description")
  }
}

