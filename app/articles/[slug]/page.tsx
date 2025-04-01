import Link from "next/link"
import { notFound } from "next/navigation"
import { CalendarIcon, Clock, Tag } from "lucide-react"
import { prisma } from "@/lib/prisma"

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug)

  if (!article) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found.",
    }
  }

  return {
    title: article.title,
    description: article.description || `Read ${article.title} on ContentAI`,
    openGraph: {
      title: article.title,
      description: article.description || `Read ${article.title} on ContentAI`,
      type: "article",
      publishedTime: article.createdAt,
      modifiedTime: article.updatedAt,
      authors: [article.author?.name || "ContentAI"],
      tags: article.keywords?.split(",").map((k) => k.trim()) || [],
    },
  }
}

async function getArticleBySlug(slug: string) {
  try {
    const article = await prisma.article.findUnique({
      where: {
        slug,
        published: true,
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
        category: true,
      },
    })

    return article
  } catch (error) {
    console.error("Error fetching article:", error)
    return null
  }
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticleBySlug(params.slug)

  if (!article) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-xl font-bold">
              ContentAI
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/#features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="/#how-it-works" className="text-sm font-medium hover:text-primary">
              How It Works
            </Link>
            <Link href="/#pricing" className="text-sm font-medium hover:text-primary">
              Pricing
            </Link>
            <Link href="/articles" className="text-sm font-medium hover:text-primary">
              Articles
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium hover:text-primary">
              Login
            </Link>
            <Link href="/dashboard" className="text-sm font-medium hover:text-primary">
              Dashboard
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <article className="container max-w-3xl px-4 py-12 md:py-20">
          <div className="mb-8 space-y-4">
            <Link href="/articles" className="text-sm text-muted-foreground hover:text-primary">
              ← Back to Articles
            </Link>
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{article.title}</h1>
            {article.description && <p className="text-xl text-muted-foreground">{article.description}</p>}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center">
                <CalendarIcon className="mr-1 h-4 w-4" />
                <time dateTime={article.createdAt}>{new Date(article.createdAt).toLocaleDateString()}</time>
              </div>
              {article.readingTime && (
                <div className="flex items-center">
                  <Clock className="mr-1 h-4 w-4" />
                  <span>{article.readingTime} min read</span>
                </div>
              )}
              {article.category && (
                <div className="flex items-center">
                  <Tag className="mr-1 h-4 w-4" />
                  <span>{article.category.name}</span>
                </div>
              )}
            </div>
          </div>

          <div className="prose max-w-none">
            {/* In a real app, you would render markdown here */}
            <div className="whitespace-pre-wrap">{article.content}</div>
          </div>
        </article>
      </main>

      <footer className="w-full border-t bg-background">
        <div className="container py-6">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ContentAI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

