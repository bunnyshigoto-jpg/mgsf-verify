import { NextResponse } from "next/server"
import crypto from "crypto"
import { supabaseAdmin } from "@/lib/supabaseAdmin"

function isUUID(v: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v)
}
function randomSixDigits() {
  return Math.floor(100000 + Math.random() * 900000).toString()
}
function sha256(s: string) {
  return crypto.createHash("sha256").update(s).digest("hex")
}

export async function POST(req: Request) {
  const { uid } = await req.json()

  if (!uid || !isUUID(uid)) {
    return NextResponse.json({ error: "Invalid uid" }, { status: 400 })
  }

  // ensure UID exists in dme_certificates (same person)
  const { data: cert, error: certErr } = await supabaseAdmin
    .from("dme_certificates")
    .select("uuid")
    .eq("uuid", uid)
    .single()

  if (certErr || !cert) {
    return NextResponse.json({ error: "UID not found" }, { status: 404 })
  }

  const code = randomSixDigits()
  const expiresAt = new Date(Date.now() + 2 * 60 * 1000).toISOString() // 2 min

  const { error } = await supabaseAdmin
    .from("dme_login_codes")
    .upsert({
      uid,
      code_hash: sha256(code),
      expires_at: expiresAt,
      updated_at: new Date().toISOString(),
    })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ code, expiresAt })
}
