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
  title: "Slash — The Spending Firewall",
  description:
    "Slash blocks your shopping apps when you overspend. Set a weekly limit, connect your bank, and Slash blocks the apps you chose on your iPhone. Join the waitlist.",
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
