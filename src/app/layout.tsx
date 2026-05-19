import type { Metadata } from 'next'
import { ReactNode } from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'TechTools - Smart Online Utilities',
  description: 'Fast, free, and modern online tools for developers, creators, and everyday users.',
  icons: {
    icon: '/images/fav-icon.png',
    apple: '/images/fav-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}
