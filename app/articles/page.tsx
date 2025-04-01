import Link from "next/link"
import { ArticleCard } from "@/components/article-card"
import { prisma } from "@/lib/prisma"

export const metadata = {
  title: "Articles | ContentAI",
  description: "Browse our collection of AI-generated articles on various topics.",
}

async function getArticles() {
  try {
    const articles = await prisma.article.findMany({
      where: {
        published: true,
      },
      include: {
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return articles
  } catch (error) {
    console.error("Error fetching articles:", error)
    return []
  }
}

export default async function ArticlesPage() {
  const articles = await getArticles()

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
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">Articles</h1>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Browse our collection of AI-generated articles on various topics
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              {articles.length > 0 ? (
                articles.map((article) => <ArticleCard key={article.id} article={article} />)
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-12">
                  <p className="text-muted-foreground">No articles found</p>
                </div>
              )}
            </div>
          </div>
        </section>
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

