import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google"
import "./globals.css"

/* The app ships exactly three families and no serif: Inter for copy and
   UI, Space Grotesk SemiBold for display type and money, JetBrains Mono
   for uppercase eyebrows and inline numbers. See SlashTheme.swift. */
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Slash: Slash your spending",
  description:
    "Slash tracks your shopping and blocks the apps you choose when you overspend. $2.99 a month, and we never sell your data. Join the waitlist.",
}

export const viewport = {
  themeColor: "#0e0b22",
  colorScheme: "dark" as const,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
