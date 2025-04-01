"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BarChart, FileText, Home, PlusCircle, Settings, Tag } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  const routes = [
    {
      href: "/dashboard",
      icon: Home,
      title: "Dashboard",
      active: pathname === "/dashboard",
    },
    {
      href: "/dashboard/articles",
      icon: FileText,
      title: "Articles",
      active: pathname === "/dashboard/articles",
    },
    {
      href: "/dashboard/articles/new",
      icon: PlusCircle,
      title: "Create Article",
      active: pathname === "/dashboard/articles/new",
    },
    {
      href: "/dashboard/categories",
      icon: Tag,
      title: "Categories",
      active: pathname === "/dashboard/categories",
    },
    {
      href: "/dashboard/analytics",
      icon: BarChart,
      title: "Analytics",
      active: pathname === "/dashboard/analytics",
    },
    {
      href: "/dashboard/settings",
      icon: Settings,
      title: "Settings",
      active: pathname === "/dashboard/settings",
    },
  ]

  return (
    <div className={cn("pb-12 min-h-screen", className)}>
      <div className="space-y-4 py-4">
        <div className="px-4 py-2">
          <h2 className="mb-2 px-2 text-xl font-semibold tracking-tight">ContentAI Dashboard</h2>
          <div className="space-y-1">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={route.active ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  route.active ? "bg-secondary" : "hover:bg-transparent hover:underline",
                )}
                asChild
              >
                <Link href={route.href}>
                  <route.icon className="mr-2 h-4 w-4" />
                  {route.title}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

