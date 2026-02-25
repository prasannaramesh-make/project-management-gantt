"use client"

import { useState } from "react"
import { supabase } from "../../lib/supabase"
import { useRouter } from "next/navigation"

export default function SetupPassword() {
  const router = useRouter()
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [message, setMessage] = useState("")

  const handleSetPassword = async () => {
    if (password !== confirm) {
      setMessage("Passwords do not match")
      return
    }

    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setMessage(error.message)
      return
    }

    setMessage("Password set successfully. Please login.")
    router.push("/login")
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Set Password</h1>

      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", marginBottom: 10 }}
      />

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        style={{ display: "block", marginBottom: 10 }}
      />

      <button onClick={handleSetPassword}>Set Password</button>

      {message && <p>{message}</p>}
    </div>
  )
}
