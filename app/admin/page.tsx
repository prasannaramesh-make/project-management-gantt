"use client"

import { useState } from "react"
import { supabase } from "../../lib/supabase"

const ADMIN_EMAIL = "prasanna.ramesh@techmobius.com"

export default function AdminPage() {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")

  const handleInvite = async () => {
    const { data: userData } = await supabase.auth.getUser()

    if (!userData.user || userData.user.email !== ADMIN_EMAIL) {
      setMessage("Unauthorized")
      return
    }

    const res = await fetch("/api/invite-user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        name,
        adminEmail: userData.user.email,
      }),
    })

    const result = await res.json()
    setMessage(result.message || result.error)
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Add User</h1>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ display: "block", marginBottom: 10 }}
      />

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", marginBottom: 10 }}
      />

      <button onClick={handleInvite}>Invite User</button>

      {message && <p>{message}</p>}
    </div>
  )
}
