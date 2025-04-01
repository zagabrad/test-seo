import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { slugify, calculateReadingTime } from "@/lib/utils"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const published = searchParams.get("published")
    const categoryId = searchParams.get("category")
    const tagId = searchParams.get("tag")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    const where: any = {}

    if (published !== null) {
      where.published = published === "true"
    }

    if (categoryId) {
      where.categoryId = categoryId
    }

    if (tagId) {
      where.tags = {
        some: {
          tagId,
        },
      }
    }

    const [articles, total] = await Promise.all([
      prisma.article.findMany({
        where,
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
        orderBy: {
          createdAt: "desc",
        },
        skip,
        take: limit,
      }),
      prisma.article.count({ where }),
    ])

    return NextResponse.json({
      articles,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error fetching articles:", error)
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, content, description, published, authorId, categoryId, tags, keywords } = body

    // Generate slug from title
    const slug = slugify(title)

    // Calculate reading time
    const readingTime = calculateReadingTime(content)

    // Create the article
    const article = await prisma.article.create({
      data: {
        title,
        content,
        description,
        slug,
        published: published || false,
        readingTime,
        keywords,
        author: {
          connect: { id: authorId },
        },
        ...(categoryId && {
          category: {
            connect: { id: categoryId },
          },
        }),
        ...(tags &&
          tags.length > 0 && {
            tags: {
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
    console.error("Error creating article:", error)
    return NextResponse.json({ error: "Failed to create article" }, { status: 500 })
  }
}

