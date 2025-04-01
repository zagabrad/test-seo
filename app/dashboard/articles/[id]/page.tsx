"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Article {
  id: string
  title: string
  content: string
  description: string | null
  slug: string
  published: boolean
  keywords: string | null
  categoryId: string | null
  tags: {
    tagId: string
  }[]
}

interface Category {
  id: string
  name: string
}

interface Tag {
  id: string
  name: string
}

export default function EditArticlePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { id } = params

  // Form state
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [description, setDescription] = useState("")
  const [published, setPublished] = useState(false)
  const [categoryId, setCategoryId] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [keywords, setKeywords] = useState("")

  // Data fetching state
  const [article, setArticle] = useState<Article | null>(null)
  const [categories, setCategories] = useState<Category[]>([])
  const [tags, setTags] = useState<Tag[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [articleRes, categoriesRes, tagsRes] = await Promise.all([
          fetch(`/api/articles/${id}`),
          fetch("/api/categories"),
          fetch("/api/tags"),
        ])

        if (!articleRes.ok || !categoriesRes.ok || !tagsRes.ok) {
          throw new Error("Failed to fetch data")
        }

        const articleData = await articleRes.json()
        const categoriesData = await categoriesRes.json()
        const tagsData = await tagsRes.json()

        setArticle(articleData)
        setTitle(articleData.title)
        setContent(articleData.content)
        setDescription(articleData.description || "")
        setPublished(articleData.published)
        setCategoryId(articleData.categoryId || "")
        setSelectedTags(articleData.tags.map((t: any) => t.tagId))
        setKeywords(articleData.keywords || "")

        setCategories(categoriesData)
        setTags(tagsData)
      } catch (error) {
        console.error("Error fetching data:", error)
        setError("Failed to load article data")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)

    try {
      const response = await fetch(`/api/articles/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          description,
          published,
          categoryId: categoryId || undefined,
          tags: selectedTags,
          keywords,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update article")
      }

      router.push("/dashboard/articles")
    } catch (error) {
      console.error("Error updating article:", error)
      setError("Failed to update article")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-red-500">{error}</p>
        <Button onClick={() => router.push("/dashboard/articles")} className="mt-4">
          Back to Articles
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Edit Article</h1>
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => router.push("/dashboard/articles")}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              if (confirm("Are you sure you want to delete this article?")) {
                fetch(`/api/articles/${id}`, { method: "DELETE" })
                  .then(() => router.push("/dashboard/articles"))
                  .catch((err) => console.error("Error deleting article:", err))
              }
            }}
          >
            Delete
          </Button>
        </div>
      </div>

      <Tabs defaultValue="editor">
        <TabsList>
          <TabsTrigger value="editor">Editor</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="editor">
          <form onSubmit={handleSubmit} className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Article Details</CardTitle>
                <CardDescription>Edit the details for your article</CardDescription>
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
                  <Label htmlFor="published">Published</Label>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={saving}>
                  {saving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>

        <TabsContent value="preview">
          <Card>
            <CardHeader>
              <CardTitle>{title || "Untitled Article"}</CardTitle>
              {description && <CardDescription>{description}</CardDescription>}
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                {/* In a real app, you would render markdown here */}
                <pre className="whitespace-pre-wrap">{content}</pre>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

