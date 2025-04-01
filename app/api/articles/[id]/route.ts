import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { slugify, calculateReadingTime } from "@/lib/utils"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const article = await prisma.article.findUnique({
      where: { id: params.id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    })

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 })
    }

    return NextResponse.json(article)
  } catch (error) {
    console.error("Error fetching article:", error)
    return NextResponse.json({ error: "Failed to fetch article" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await request.json()
    const { title, content, description, published, categoryId, tags, keywords } = body

    // Check if article exists
    const existingArticle = await prisma.article.findUnique({
      where: { id: params.id },
      include: {
        tags: true,
      },
    })

    if (!existingArticle) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 })
    }

    // Generate slug from title if title changed
    const slug = title !== existingArticle.title ? slugify(title) : existingArticle.slug

    // Calculate reading time if content changed
    const readingTime =
      content !== existingArticle.content ? calculateReadingTime(content) : existingArticle.readingTime

    // Update the article
    const article = await prisma.article.update({
      where: { id: params.id },
      data: {
        title,
        content,
        description,
        slug,
        published,
        readingTime,
        keywords,
        ...(categoryId && {
          category: {
            connect: { id: categoryId },
          },
        }),
        ...(tags && {
          tags: {
            deleteMany: {},
            create: tags.map((tagId: string) => ({
              tag: {
                connect: { id: tagId },
              },
            })),
          },
        }),
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        category: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
    })

    return NextResponse.json(article)
  } catch (error) {
    console.error("Error updating article:", error)
    return NextResponse.json({ error: "Failed to update article" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    // Check if article exists
    const existingArticle = await prisma.article.findUnique({
      where: { id: params.id },
    })

    if (!existingArticle) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 })
    }

    // Delete the article
    await prisma.article.delete({
      where: { id: params.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting article:", error)
    return NextResponse.json({ error: "Failed to delete article" }, { status: 500 })
  }
}

