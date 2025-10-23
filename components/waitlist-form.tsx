"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { joinWaitlist } from "@/app/actions/waitlist"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function WaitlistForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    const result = await joinWaitlist(email)

    if (result.success) {
      setStatus("success")
      setMessage(result.message)
      setEmail("")
    } else {
      setStatus("error")
      setMessage(result.message)
    }

    setTimeout(() => {
      setStatus("idle")
      setMessage("")
    }, 5000)
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <Input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={status === "loading"}
        className="flex-1 bg-muted border-border focus:border-primary transition-colors text-foreground placeholder:text-foreground/50"
      />
      <Button
        type="submit"
        disabled={status === "loading"}
        className="bg-primary hover:bg-primary/90 glow transition-all duration-300"
      >
        {status === "loading" ? "Joining..." : "Join Waitlist"}
      </Button>
      {message && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-sm ${status === "success" ? "text-accent" : "text-red-400"} absolute -bottom-8 left-0`}
        >
          {message}
        </motion.p>
      )}
    </motion.form>
  )
}
