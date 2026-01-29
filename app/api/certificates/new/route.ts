export const runtime = "nodejs"

import { NextResponse } from "next/server"
import { supabaseAdmin } from "@/lib/supabaseAdmin"
import { randomUUID } from "crypto"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const payload = {
      uuid: randomUUID(),
      certificate_no: String(body.certificate_no || "").trim(),
      exam_year: String(body.exam_year || "").trim(),
      seat_no: String(body.seat_no || "").trim(),
      student_name: String(body.student_name || "").trim(),
      dob: String(body.dob || "").trim(),
      father_name: String(body.father_name || "").trim(),
      mother_name: String(body.mother_name || "").trim(),
      compilation: String(body.compilation || "").trim(),
      distinctions: String(body.distinctions || "").trim(),
    }

    if (!payload.certificate_no || !payload.exam_year || !payload.student_name) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields: certificate_no, exam_year, student_name" },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseAdmin
      .from("dme_certificates")
      .insert(payload)
      .select("uuid")
      .single()

    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    }

    return NextResponse.json({ ok: true, uuid: data.uuid })
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message || "Server error" }, { status: 500 })
  }
}
