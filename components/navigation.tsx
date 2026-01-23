'use client'

import Link from 'next/link'
import { BananaIcon } from '@/components/banana-icon'
import { AuthState } from '@/components/auth-provider'
import { ThemeToggle } from '@/components/theme-toggle'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function Navigation() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <BananaIcon className="w-8 h-8 text-accent" />
          <span className="text-2xl font-bold text-foreground">Nano Banana</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/generator"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Image Editor
          </Link>
          <Link
            href="/showcase"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Showcase
          </Link>
          <Link
            href="/pricing-paypal"
            className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
          >
            Pricing
          </Link>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle */}
          <ThemeToggle />

          {/* Auth State */}
          <AuthState />

          {/* CTA Button */}
          <Link href="/generator">
            <button className="hidden sm:flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md text-sm font-medium transition-colors">
              <span>Launch Now</span>
              <BananaIcon className="w-4 h-4" />
            </button>
          </Link>
        </div>
      </nav>
    </header>
  )
}
