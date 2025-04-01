import Link from "next/link"
import { CalendarIcon, Clock } from "lucide-react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ArticleCardProps {
  article: {
    id: string
    title: string
    description: string | null
    slug: string
    readingTime: number | null
    createdAt: string
    category: {
      name: string
    } | null
  }
}

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="line-clamp-2">
          <Link href={`/articles/${article.slug}`} className="hover:underline">
            {article.title}
          </Link>
        </CardTitle>
        {article.description && <CardDescription className="line-clamp-2">{article.description}</CardDescription>}
      </CardHeader>
      <CardContent className="flex-grow">
        {article.category && (
          <Badge variant="secondary" className="mb-2">
            {article.category.name}
          </Badge>
        )}
      </CardContent>
      <CardFooter className="flex justify-between text-sm text-muted-foreground">
        <div className="flex items-center">
          <CalendarIcon className="mr-1 h-3 w-3" />
          <span>{new Date(article.createdAt).toLocaleDateString()}</span>
        </div>
        {article.readingTime && (
          <div className="flex items-center">
            <Clock className="mr-1 h-3 w-3" />
            <span>{article.readingTime} min read</span>
          </div>
        )}
      </CardFooter>
    </Card>
  )
}

