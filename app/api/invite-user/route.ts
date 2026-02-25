import { NextResponse } from "next/server"
import { supabaseAdmin } from "../../../lib/supabase-admin"

const ADMIN_EMAIL = "prasanna.ramesh@techmobius.com"

export async function POST(req: Request) {
  const body = await req.json()
  const { email, name, adminEmail } = body

  // Check admin
  if (adminEmail !== ADMIN_EMAIL) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
  }

  // Validate domain
  if (
    !email.endsWith("@techmobius.com") &&
    !email.endsWith("@xtract.io")
  ) {
    return NextResponse.json({ error: "Invalid domain" }, { status: 400 })
  }

  // Send invite
  const { data, error } = await supabaseAdmin.auth.admin.inviteUserByEmail(
    email,
    {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/setup-password`,
    }
  )

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ message: "Invite sent successfully" })
}
