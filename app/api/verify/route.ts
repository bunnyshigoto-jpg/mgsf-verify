import { NextResponse } from "next/server"
import crypto from "crypto"
import { supabaseAdmin } from "@/lib/supabaseAdmin"

function sha256(s: string) {
  return crypto.createHash("sha256").update(s).digest("hex")
}

export async function POST(req: Request) {
  const { uid, code } = await req.json()

  if (!uid || !/^\d{6}$/.test(String(code || ""))) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const { data, error } = await supabaseAdmin
    .from("dme_login_codes")
    .select("code_hash, expires_at")
    .eq("uid", uid)
    .single()

  if (error || !data) return NextResponse.json({ ok: false }, { status: 401 })

  const expired = new Date(data.expires_at).getTime() < Date.now()
  const match = data.code_hash === sha256(code)

  if (!match || expired) return NextResponse.json({ ok: false }, { status: 401 })

  return NextResponse.json({ ok: true, redirectTo: `/verify/uid/${uid}` })
}
