"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface Article {
  id: string
  title: string
  slug: string
  published: boolean
  createdAt: string
  updatedAt: string
  author: {
    name: string | null
  }
  category: {
    name: string
  } | null
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("/api/articles")

        if (!response.ok) {
          throw new Error("Failed to fetch articles")
        }

        const data = await response.json()
        setArticles(data.articles)
      } catch (error) {
        console.error("Error fetching articles:", error)
        setError("Failed to load articles")
      } finally {
        setLoading(false)
      }
    }

    fetchArticles()
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Articles</h1>
        <Button asChild>
          <Link href="/dashboard/articles/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Article
          </Link>
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Articles</CardTitle>
          <CardDescription>Manage your articles</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center">
              <p>Loading articles...</p>
            </div>
          ) : error ? (
            <div className="flex justify-center">
              <p className="text-red-500">{error}</p>
            </div>
          ) : articles.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-6">
              <p className="mb-4 text-muted-foreground">No articles found</p>
              <Button asChild>
                <Link href="/dashboard/articles/new">
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Create your first article
                </Link>
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {articles.map((article) => (
                  <TableRow key={article.id}>
                    <TableCell className="font-medium">
                      <Link href={`/dashboard/articles/${article.id}`} className="hover:underline">
                        {article.title}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Badge variant={article.published ? "default" : "secondary"}>
                        {article.published ? "Published" : "Draft"}
                      </Badge>
                    </TableCell>
                    <TableCell>{article.category?.name || "Uncategorized"}</TableCell>
                    <TableCell>{article.author?.name || "Unknown"}</TableCell>
                    <TableCell>{new Date(article.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/dashboard/articles/${article.id}`}>Edit</Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/dashboard/articles/${article.id}/preview`}>Preview</Link>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

