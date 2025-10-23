"use server"

import { getSupabaseServerClient } from "@/lib/supabase/server"

export async function joinWaitlist(email: string) {
  try {
    const supabase = await getSupabaseServerClient()

    const { error } = await supabase.from("waitlist").insert([{ email }])

    if (error) {
      if (error.code === "23505") {
        return { success: false, message: "This email is already on the waitlist." }
      }
      throw error
    }

    return { success: true, message: "Successfully joined the waitlist!" }
  } catch (error) {
    console.error("Waitlist error:", error)
    return { success: false, message: "Something went wrong. Please try again." }
  }
}
