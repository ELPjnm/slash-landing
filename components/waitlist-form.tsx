"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { joinWaitlist } from "@/app/actions/waitlist";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function WaitlistForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const result = await joinWaitlist(email);

    if (result.success) {
      setStatus("success");
      setMessage(result.message);
      setEmail("");
    } else {
      setStatus("error");
      setMessage(result.message);
    }

    setTimeout(() => {
      setStatus("idle");
      setMessage("");
    }, 5000);
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row gap-3 w-full max-w-md relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <Input
        type="email"
        placeholder="you@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        disabled={status === "loading"}
        className="flex-1 h-12 rounded-xl bg-white/5 border-white/10 focus:border-primary transition-colors text-white placeholder:text-white/40 backdrop-blur-sm"
      />
      <Button
        type="submit"
        disabled={status === "loading"}
        className="h-12 rounded-xl px-6 font-semibold text-white border-0 bg-gradient-to-br from-primary to-secondary shadow-[0_8px_30px_rgba(99,102,241,0.35)] hover:opacity-90 transition-all duration-300"
      >
        {status === "loading" ? "Joining..." : "Join waitlist"}
      </Button>
      {message && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`text-sm ${
            status === "success" ? "text-green-400" : "text-red-400"
          } absolute -bottom-8 left-0 w-full text-center`}
        >
          {message}
        </motion.p>
      )}
    </motion.form>
  );
}
