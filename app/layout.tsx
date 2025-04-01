import type React from "react"
import "@/app/globals.css"
import { ThemeProvider } from "@/components/theme-provider"

export const metadata = {
  title: {
    default: "AI Content Generator | Create High-Quality Articles in Seconds",
    template: "%s | ContentAI",
  },
  description:
    "Generate SEO-optimized, engaging articles with our advanced AI content generator. Save time and boost your content marketing strategy with high-quality content.",
  keywords: [
    "AI content generator",
    "article generator",
    "content creation",
    "SEO content",
    "AI writing assistant",
    "blog post generator",
  ],
  authors: [{ name: "ContentAI" }],
  creator: "ContentAI",
  publisher: "ContentAI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://contentai.com",
    title: "AI Content Generator | Create High-Quality Articles in Seconds",
    description:
      "Generate SEO-optimized, engaging articles with our advanced AI content generator. Save time and boost your content marketing strategy with high-quality content.",
    siteName: "ContentAI",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Content Generator | Create High-Quality Articles in Seconds",
    description:
      "Generate SEO-optimized, engaging articles with our advanced AI content generator. Save time and boost your content marketing strategy with high-quality content.",
    creator: "@contentai",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://contentai.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "ContentAI",
              url: "https://contentai.com",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://contentai.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'