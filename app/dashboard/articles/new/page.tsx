"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"

interface Category {
  id: string
  name: string
}

interface Tag {
  id: string
  name: string
}

export default function NewArticlePage() {
  const router = useRouter()

  // Form state
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [description, setDescription] = useState("")
  const [published, setPublished] = useState(false)
  const [categoryId, setCategoryId] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [keywords, setKeywords] = useState("")

  // AI generation state
  const [topic, setTopic] = useState("")
  const [tone, setTone] = useState("informative")
  const [isGenerating, setIsGenerating] = useState(false)

  // Data fetching state
  const [categories, setCategories] = useState<Category[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesRes, tagsRes] = await Promise.all([fetch("/api/categories"), fetch("/api/tags")])

        if (!categoriesRes.ok || !tagsRes.ok) {
          throw new Error("Failed to fetch data")
        }

        const categoriesData = await categoriesRes.json()
        const tagsData = await tagsRes.json()

        setCategories(categoriesData)
        setTags(tagsData)
      } catch (error) {
        console.error("Error fetching data:", error)
        setError("Failed to load categories and tags")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleGenerateContent = async () => {
    if (!topic) {
      return
    }

    setIsGenerating(true)

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic,
          keywords,
          tone,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate content")
      }

      const data = await response.json()

      setTitle(data.title)
      setContent(data.content)
      setDescription(data.description)
    } catch (error) {
      console.error("Error generating content:", error)
      setError("Failed to generate content")
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // For demo purposes, we'll use a hardcoded author ID
      // In a real app, you would get this from authentication
      const authorId = "user123"

      const response = await fetch("/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          description,
          published,
          authorId,
          categoryId: categoryId || undefined,
          tags: selectedTags,
          keywords,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to create article")
      }

      const article = await response.json()
      router.push(`/dashboard/articles/${article.id}`)
    } catch (error) {
      console.error("Error creating article:", error)
      setError("Failed to create article")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Create Article</h1>
      </div>

      <Tabs defaultValue="editor">
        <TabsList>
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="ai-generator">AI Generator</TabsTrigger>
        </TabsList>

        <TabsContent value="ai-generator" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Content Generator</CardTitle>
              <CardDescription>Generate article content using AI</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="topic">Topic or Keyword</Label>
                <Input
                  id="topic"
                  placeholder="e.g., Benefits of Content Marketing"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="keywords">Keywords (comma separated)</Label>
                <Input
                  id="keywords"
                  placeholder="e.g., content marketing, SEO, engagement"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tone">Tone</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="informative">Informative</SelectItem>
                    <SelectItem value="conversational">Conversational</SelectItem>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="persuasive">Persuasive</SelectItem>
                    <SelectItem value="entertaining">Entertaining</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleGenerateContent} disabled={!topic || isGenerating}>
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Content
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="editor">
          <form onSubmit={handleSubmit} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Article Details</CardTitle>
                <CardDescription>Enter the details for your article</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    placeholder="Enter article title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Meta Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Enter meta description (for SEO)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="resize-none"
                  />
                  <p className="text-xs text-muted-foreground">{description.length}/160 characters (recommended)</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Enter article content (Markdown supported)"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="min-h-[300px]"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={categoryId} onValueChange={setCategoryId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="keywords">Keywords (comma separated)</Label>
                  <Input
                    id="keywords"
                    placeholder="e.g., content marketing, SEO, engagement"
                    value={keywords}
                    onChange={(e) => setKeywords(e.target.value)}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch id="published" checked={published} onCheckedChange={setPublished} />
                  <Label htmlFor="published">Publish immediately</Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Create Article</Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  )
}

