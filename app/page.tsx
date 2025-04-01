import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArticleCard } from "@/components/article-card"
import { prisma } from "@/lib/prisma"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle2, ChevronRight, FileText, Lightbulb, Rocket, Search, Settings, Zap } from "lucide-react"
import { Input } from "@/components/ui/input"

export const metadata = {
  title: "AI Content Generator | Create High-Quality Articles in Seconds",
  description:
    "Generate SEO-optimized, engaging articles with our advanced AI content generator. Save time and boost your content marketing strategy with high-quality content.",
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
      take: 6,
    })

    return articles
  } catch (error) {
    console.error("Error fetching articles:", error)
    return []
  }
}

export default async function LandingPage() {
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
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-primary">
              How It Works
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary">
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
            <Button asChild>
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Generate High-Quality Articles with AI in Seconds
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Create SEO-optimized, engaging content that ranks higher and converts better. Save time and scale your
                  content marketing strategy.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" asChild>
                  <Link href="/dashboard">Start Creating Content</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="#how-it-works">See How It Works</Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <Image
                src="/placeholder.svg?height=400&width=600"
                width={600}
                height={400}
                alt="AI Content Generator"
                className="rounded-xl border shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Latest Articles</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Explore our latest AI-generated content
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
          {articles.length > 0 && (
            <div className="flex justify-center">
              <Button asChild variant="outline">
                <Link href="/articles">View All Articles</Link>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Social Proof */}
      <section className="w-full border-t border-b py-6">
        <div className="container flex flex-wrap items-center justify-center gap-4 px-4 text-center md:px-6 lg:gap-10">
          <div className="text-center">
            <div className="text-3xl font-bold">10,000+</div>
            <div className="text-sm text-muted-foreground">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">500,000+</div>
            <div className="text-sm text-muted-foreground">Articles Generated</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">98%</div>
            <div className="text-sm text-muted-foreground">Customer Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">4.9/5</div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                Advanced Features
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Create Content That Ranks and Converts
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our AI-powered platform helps you create high-quality, SEO-optimized content that engages your audience
                and drives results.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">SEO Optimization</h3>
              <p className="text-center text-muted-foreground">
                Generate content optimized for search engines with proper keyword density, meta descriptions, and
                headings.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Content Variety</h3>
              <p className="text-center text-muted-foreground">
                Create blog posts, articles, product descriptions, social media content, and more with specialized
                templates.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <Settings className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Customization</h3>
              <p className="text-center text-muted-foreground">
                Adjust tone, style, length, and format to match your brand voice and content requirements.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <Rocket className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Bulk Generation</h3>
              <p className="text-center text-muted-foreground">
                Scale your content production by generating multiple articles simultaneously with our batch processing
                feature.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <Lightbulb className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Topic Research</h3>
              <p className="text-center text-muted-foreground">
                Discover trending topics and keywords in your niche to create content that resonates with your audience.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 shadow-sm">
              <div className="rounded-full bg-primary/10 p-3">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold">Instant Results</h3>
              <p className="text-center text-muted-foreground">
                Generate high-quality, ready-to-publish content in seconds, not hours or days.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Simple Process</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">How ContentAI Works</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Create high-quality content in just three simple steps. No technical skills required.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
            <div className="relative flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-lg font-bold text-primary-foreground">
                1
              </div>
              <h3 className="pt-4 text-xl font-bold">Enter Your Topic</h3>
              <p className="text-center text-muted-foreground">
                Provide a topic, keyword, or brief description of the content you want to create.
              </p>
              <Image
                src="/placeholder.svg?height=200&width=300"
                width={300}
                height={200}
                alt="Enter topic interface"
                className="rounded-lg border"
              />
            </div>
            <div className="relative flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-lg font-bold text-primary-foreground">
                2
              </div>
              <h3 className="pt-4 text-xl font-bold">Customize Settings</h3>
              <p className="text-center text-muted-foreground">
                Select content type, tone, length, and other parameters to match your requirements.
              </p>
              <Image
                src="/placeholder.svg?height=200&width=300"
                width={300}
                height={200}
                alt="Customize settings interface"
                className="rounded-lg border"
              />
            </div>
            <div className="relative flex flex-col items-center space-y-4 rounded-lg border bg-background p-6 shadow-sm">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-lg font-bold text-primary-foreground">
                3
              </div>
              <h3 className="pt-4 text-xl font-bold">Generate & Edit</h3>
              <p className="text-center text-muted-foreground">
                Click generate, review the content, make any necessary edits, and export or publish.
              </p>
              <Image
                src="/placeholder.svg?height=200&width=300"
                width={300}
                height={200}
                alt="Generate and edit interface"
                className="rounded-lg border"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Demo Section */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  See It In Action
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Experience the Power of AI Content Generation
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
                  Watch how ContentAI transforms a simple topic into a comprehensive, SEO-optimized article in seconds.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button size="lg" asChild>
                  <Link href="#get-started">
                    Try It Yourself <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="overflow-hidden rounded-xl border shadow-xl">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  width={600}
                  height={400}
                  alt="ContentAI demo"
                  className="aspect-video object-cover"
                />
                <div className="flex items-center justify-center bg-black p-2">
                  <div className="h-3 w-16 rounded-full bg-white/20"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Pricing Plans</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Choose the Perfect Plan for Your Needs
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Flexible pricing options designed to scale with your content requirements.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
            <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
              <div className="mb-4">
                <h3 className="text-2xl font-bold">Starter</h3>
                <p className="text-muted-foreground">Perfect for individuals and small blogs</p>
              </div>
              <div className="mb-4 flex items-baseline">
                <span className="text-4xl font-bold">$29</span>
                <span className="ml-1 text-muted-foreground">/month</span>
              </div>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                  <span>50 articles per month</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                  <span>Basic SEO optimization</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                  <span>3 content types</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                  <span>Email support</span>
                </li>
              </ul>
              <Button size="lg" variant="outline" className="mt-auto">
                Get Started
              </Button>
            </div>
            <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm relative">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-primary px-4 py-1 text-sm font-medium text-primary-foreground">
                Most Popular
              </div>
              <div className="mb-4">
                <h3 className="text-2xl font-bold">Professional</h3>
                <p className="text-muted-foreground">Ideal for growing businesses and content teams</p>
              </div>
              <div className="mb-4 flex items-baseline">
                <span className="text-4xl font-bold">$79</span>
                <span className="ml-1 text-muted-foreground">/month</span>
              </div>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                  <span>200 articles per month</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                  <span>Advanced SEO optimization</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                  <span>All content types</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                  <span>Bulk generation</span>
                </li>
              </ul>
              <Button size="lg" className="mt-auto">
                Get Started
              </Button>
            </div>
            <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
              <div className="mb-4">
                <h3 className="text-2xl font-bold">Enterprise</h3>
                <p className="text-muted-foreground">For large organizations with high-volume needs</p>
              </div>
              <div className="mb-4 flex items-baseline">
                <span className="text-4xl font-bold">$199</span>
                <span className="ml-1 text-muted-foreground">/month</span>
              </div>
              <ul className="mb-6 space-y-2">
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                  <span>Unlimited articles</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                  <span>Premium SEO optimization</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                  <span>Custom content types</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                  <span>Dedicated account manager</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                  <span>API access</span>
                </li>
                <li className="flex items-center">
                  <CheckCircle2 className="mr-2 h-4 w-4 text-primary" />
                  <span>White-label options</span>
                </li>
              </ul>
              <Button size="lg" variant="outline" className="mt-auto">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Testimonials</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">What Our Customers Say</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Don't just take our word for it. See what content creators, marketers, and businesses have to say about
                ContentAI.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
            <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5 text-yellow-500"
                    >
                      <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z" />
                    </svg>
                  ))}
                </div>
              </div>
              <blockquote className="mt-4 flex-1">
                <p className="text-muted-foreground">
                  "ContentAI has revolutionized our content strategy. We've increased our blog output by 300% while
                  maintaining high quality. The SEO optimization features have helped us rank for competitive keywords."
                </p>
              </blockquote>
              <div className="mt-6 flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-muted"></div>
                <div>
                  <p className="text-sm font-medium">Sarah Johnson</p>
                  <p className="text-sm text-muted-foreground">Marketing Director, TechCorp</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5 text-yellow-500"
                    >
                      <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z" />
                    </svg>
                  ))}
                </div>
              </div>
              <blockquote className="mt-4 flex-1">
                <p className="text-muted-foreground">
                  "As a solo entrepreneur, ContentAI has been a game-changer. I can now create high-quality blog posts
                  in minutes instead of hours. The content is engaging and my audience loves it."
                </p>
              </blockquote>
              <div className="mt-6 flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-muted"></div>
                <div>
                  <p className="text-sm font-medium">Michael Chen</p>
                  <p className="text-sm text-muted-foreground">Founder, GrowthHackers</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col rounded-lg border bg-background p-6 shadow-sm">
              <div className="flex items-center space-x-2">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-5 w-5 text-yellow-500"
                    >
                      <path d="M12 2l2.4 7.4h7.6l-6 4.6 2.3 7-6.3-4.6-6.3 4.6 2.3-7-6-4.6h7.6z" />
                    </svg>
                  ))}
                </div>
              </div>
              <blockquote className="mt-4 flex-1">
                <p className="text-muted-foreground">
                  "Our e-commerce business has seen a 40% increase in conversions since using ContentAI for our product
                  descriptions. The ability to customize tone and style to match our brand voice is invaluable."
                </p>
              </blockquote>
              <div className="mt-6 flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-muted"></div>
                <div>
                  <p className="text-sm font-medium">Emily Rodriguez</p>
                  <p className="text-sm text-muted-foreground">CMO, StyleBoutique</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">FAQ</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Frequently Asked Questions</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Find answers to common questions about ContentAI and AI-generated content.
              </p>
            </div>
          </div>
          <div className="mx-auto max-w-3xl py-12">
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="pricing">Pricing</TabsTrigger>
                <TabsTrigger value="technical">Technical</TabsTrigger>
              </TabsList>
              <TabsContent value="general" className="mt-6 space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="text-lg font-medium">Is the content unique and plagiarism-free?</h3>
                  <p className="mt-2 text-muted-foreground">
                    Yes, all content generated by ContentAI is 100% unique and plagiarism-free. Our AI creates original
                    content based on your inputs and does not copy from existing sources.
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="text-lg font-medium">How does ContentAI optimize content for SEO?</h3>
                  <p className="mt-2 text-muted-foreground">
                    ContentAI analyzes top-ranking content for your target keywords and incorporates SEO best practices
                    including proper keyword density, semantic keywords, optimal heading structure, and meta
                    descriptions.
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="text-lg font-medium">Can I edit the generated content?</h3>
                  <p className="mt-2 text-muted-foreground">
                    You have full control to edit, refine, and customize the generated content to match your exact
                    requirements before publishing or exporting.
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="text-lg font-medium">What types of content can I create?</h3>
                  <p className="mt-2 text-muted-foreground">
                    ContentAI can generate blog posts, articles, product descriptions, social media content, email
                    newsletters, landing page copy, and more. Our platform supports various content formats and styles.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="pricing" className="mt-6 space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="text-lg font-medium">Do you offer a free trial?</h3>
                  <p className="mt-2 text-muted-foreground">
                    Yes, we offer a 14-day free trial with limited features so you can experience the power of ContentAI
                    before committing to a paid plan.
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="text-lg font-medium">Can I upgrade or downgrade my plan?</h3>
                  <p className="mt-2 text-muted-foreground">
                    Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next
                    billing cycle.
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="text-lg font-medium">Do you offer annual billing?</h3>
                  <p className="mt-2 text-muted-foreground">
                    Yes, we offer annual billing with a 20% discount compared to monthly billing.
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="text-lg font-medium">What happens if I exceed my monthly article limit?</h3>
                  <p className="mt-2 text-muted-foreground">
                    If you reach your monthly limit, you can purchase additional credits or upgrade to a higher plan.
                    We'll notify you when you're approaching your limit.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="technical" className="mt-6 space-y-4">
                <div className="rounded-lg border p-4">
                  <h3 className="text-lg font-medium">Is my data secure?</h3>
                  <p className="mt-2 text-muted-foreground">
                    Yes, we take data security seriously. All data is encrypted in transit and at rest. We do not share
                    your content or data with third parties.
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="text-lg font-medium">Do you offer an API?</h3>
                  <p className="mt-2 text-muted-foreground">
                    Yes, our Enterprise plan includes API access for seamless integration with your existing workflows
                    and systems.
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="text-lg font-medium">What languages do you support?</h3>
                  <p className="mt-2 text-muted-foreground">
                    ContentAI currently supports English, Spanish, French, German, Italian, Portuguese, Dutch, and
                    Japanese. We're continuously adding support for more languages.
                  </p>
                </div>
                <div className="rounded-lg border p-4">
                  <h3 className="text-lg font-medium">Can I integrate ContentAI with my CMS?</h3>
                  <p className="mt-2 text-muted-foreground">
                    Yes, ContentAI integrates with popular CMS platforms including WordPress, Shopify, and Webflow.
                    Enterprise customers can request custom integrations.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="get-started" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Ready to Transform Your Content Strategy?
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Join thousands of content creators, marketers, and businesses who are saving time and creating better
                content with ContentAI.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
              <form className="flex flex-col gap-2 sm:flex-row">
                <Input type="email" placeholder="Enter your email" className="max-w-lg flex-1" />
                <Button type="submit">Start Free Trial</Button>
              </form>
              <p className="text-xs text-muted-foreground">
                No credit card required. 14-day free trial.{" "}
                <Link href="/terms" className="underline underline-offset-2">
                  Terms & Conditions
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Rest of the landing page content... */}

      <footer className="w-full border-t bg-background">
        <div className="container flex flex-col gap-6 py-12 px-4 md:px-6 md:flex-row md:justify-between">
          <div className="flex flex-col gap-6 md:w-1/3">
            <Link href="/" className="text-xl font-bold">
              ContentAI
            </Link>
            <p className="text-sm text-muted-foreground">
              ContentAI is the leading AI content generation platform for creating high-quality, SEO-optimized content
              that ranks and converts.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8 md:flex-1">
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium">Product</h3>
              <nav className="flex flex-col gap-2">
                <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground">
                  Features
                </Link>
                <Link href="#pricing" className="text-sm text-muted-foreground hover:text-foreground">
                  Pricing
                </Link>
              </nav>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium">Resources</h3>
              <nav className="flex flex-col gap-2">
                <Link href="/articles" className="text-sm text-muted-foreground hover:text-foreground">
                  Articles
                </Link>
              </nav>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium">Company</h3>
              <nav className="flex flex-col gap-2">
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  About
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
              </nav>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium">Legal</h3>
              <nav className="flex flex-col gap-2">
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                  Terms of Service
                </Link>
              </nav>
            </div>
          </div>
        </div>
        <div className="border-t py-6">
          <div className="container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
            <p className="text-center text-sm text-muted-foreground md:text-left">
              &copy; {new Date().getFullYear()} ContentAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

