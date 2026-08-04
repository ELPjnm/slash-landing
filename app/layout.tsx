import type React from "react"
import type { Metadata } from "next"
import {
  Inter,
  Instrument_Serif,
  JetBrains_Mono,
  Space_Grotesk,
} from "next/font/google"
import "./globals.css"

/* The app's four families: Inter for copy, Space Grotesk for display and
   numerals, Instrument Serif for the one italic moment per screen, and
   JetBrains Mono for numeric badges. See design-reference c-base.jsx. */
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

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
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
    "Slash blocks your shopping apps when you overspend. Set a weekly limit, connect your bank, and Slash locks the apps you chose on your iPhone. Join the waitlist.",
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
      className={`${inter.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
