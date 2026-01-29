import { supabaseAdmin } from "@/lib/supabaseAdmin"
import { redirect } from "next/navigation"
import Link from "next/link"
import React from "react"

type Props = {
  params: Promise<{
    uid: string
  }>
}

/* ================= Myanmar digits ================= */
function toMyanmarNumber(input: string): string {
  const map: Record<string, string> = {
    "0": "၀",
    "1": "၁",
    "2": "၂",
    "3": "၃",
    "4": "၄",
    "5": "၅",
    "6": "၆",
    "7": "၇",
    "8": "၈",
    "9": "၉",
  }
  return (input ?? "").toString().replace(/[0-9]/g, (d) => map[d])
}

/* ================= Row ================= */
function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-12 items-center py-2 text-[16px] leading-7">
      <div className="col-span-5 pl-2 text-[#2E2E2E]">{label}</div>
      <div className="col-span-2 text-center text-slate-400 select-none">-</div>
      <div className="col-span-5 text-[#2E2E2E]">{value || "-"}</div>
    </div>
  )
}

export default async function Page({ params }: Props) {
  const { uid } = await params

  // UUID guard
  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(uid)
  ) {
    redirect("/verify/not-found")
  }

  const { data, error } = await supabaseAdmin
    .from("dme_certificates")
    .select("*")
    .eq("uuid", uid)
    .single()

  if (error || !data) {
    redirect("/verify/not-found")
  }

  /* ================= Compilation subjects ================= */
  const COMPILATION_SUBJECTS = [
    {
      code: "STEAMS-1",
      mm: "မြန်မာစာ၊ အင်္ဂလိပ်စာ၊ သင်္ချာ၊ ဓာတုဗေဒ၊ ရူပဗေဒ၊ ဇီဝဗေဒ",
      en: "Myanmar, English, Mathematics, Chemistry, Physics, Biology",
    },
    {
      code: "STEAMS-2",
      mm: "မြန်မာစာ၊ အင်္ဂလိပ်စာ၊ သင်္ချာ၊ ဓာတုဗေဒ၊ ရူပဗေဒ၊ ဘောဂဗေဒ",
      en: "Myanmar, English, Mathematics, Chemistry, Physics, Economics",
    },
    {
      code: "STAMS-1",
      mm: "မြန်မာစာ၊ အင်္ဂလိပ်စာ၊ သင်္ချာ၊ ပထဝီဝင်၊ သမိုင်း၊ ဘောဂဗေဒ",
      en: "Myanmar, English, Mathematics, Geography, History, Economics",
    },
    {
      code: "STAMS-2",
      mm: "မြန်မာစာ၊ အင်္ဂလိပ်စာ၊ သင်္ချာ၊ စိတ်ကြိုက်မြန်မာစာ၊ လူမှုရေးသိပ္ပံ၊ ဘောဂဗေဒ",
      en: "Myanmar, English, Mathematics, Selected Myanmar, Social Science, Economics",
    },
  ]

  return (
    <div className="min-h-screen w-full bg-[#F5F7FA]">
      <div className="mx-auto w-full px-4 py-10 lg:px-0">
        <div className="mx-auto w-full max-w-[980px] lg:w-1/2">
          {/* ================= Certificate Card ================= */}
          <div
            className="rounded-[18px] p-4 sm:p-5 md:p-6"
            style={{
              backgroundColor: "#FFFFFF",
              boxShadow: "rgb(100,116,139) 0 0 0 1px",
              filter: "drop-shadow(rgba(0,0,0,0.07) 0px 4px 3px)",
            }}
          >
            {/* Header */}
            <div className="flex items-center gap-6 pt-4 pb-2">
              <div className="w-1/4 flex justify-center">
                <Link href="/verify">
                  <img
                    src="/logo-ct-dark.png"
                    alt="Logo"
                    className="w-36 h-auto object-contain cursor-pointer"
                    draggable={false}
                  />
                </Link>
              </div>

              <div className="w-2/3 flex flex-col items-center text-center">
                <div className="text-[18px] leading-9 font-semibold text-[#2E2E2E]">
                  ပညာရေးဝန်ကြီးဌာန - Ministry of Education
                </div>
                <div className="text-[18px] leading-9 font-semibold text-[#2E2E2E]">
                  မြန်မာနိုင်ငံစာစစ်ဦးစီးဌာန - Department of Myanmar Examinations
                </div>
              </div>
            </div>

            {/* Title */}
            <div className="text-center mt-5 mb-5">
              <div className="text-[20px] font-semibold text-[#2E2E2E]">
                အောင်လက်မှတ်အချက်အလက်များ
              </div>
            </div>

            {/* Certificate Data */}
            <div className="divide-y divide-dotted divide-slate-200">
              <Row label="လက်မှတ်အမှတ်" value={toMyanmarNumber(data.certificate_no)} />
              <Row label="အောင်မြင်ခုနှစ်" value={data.exam_year} />
              <Row label="ခုံနံပါတ်" value={data.seat_no} />
              <Row label="အမည်" value={data.student_name} />
              <Row label="မွေးသက္ကရာဇ်" value={data.dob} />
              <Row label="အဖအမည်" value={data.father_name} />
              <Row label="အမိအမည်" value={data.mother_name} />
              <Row label="ဘာသာတွဲ" value={data.compilation} />
              <Row label="ဂုဏ်ထူးရဘာသာများ" value={data.distinctions} />
            </div>
          </div>

          {/* ================= Subjects Table (MATCH PHOTO) ================= */}
          <div
            className="mt-8 overflow-hidden rounded-xl"
            style={{ background: "#F3F7FC", border: "1px solid #CBD5E1" }}
          >
            {/* Header */}
            <div
              className="grid grid-cols-12"
              style={{ background: "#F6FAFF", borderBottom: "1px dashed #CBD5E1" }}
            >
              <div
                className="col-span-4 px-4 py-4 text-center font-medium"
                style={{ borderRight: "1px solid #CBD5E1" }}
              >
                ဘာသာတွဲ<br />
                <span className="text-sm font-normal">(Compilations)</span>
              </div>
              <div className="col-span-8 px-4 py-4 text-center font-medium">
                ဘာသာရပ်များ<br />
                <span className="text-sm font-normal">(Subjects)</span>
              </div>
            </div>

            {/* Rows */}
            {COMPILATION_SUBJECTS.map((row, idx) => (
              <div
                key={row.code}
                className="grid grid-cols-12"
                style={{
                  background: idx % 2 === 0 ? "#F1F6FD" : "#F7FBFF",
                  borderBottom:
                    idx !== COMPILATION_SUBJECTS.length - 1
                      ? "1px dashed #CBD5E1"
                      : "none",
                }}
              >
                <div
                  className="col-span-4 px-4 py-8 flex items-center justify-center font-semibold"
                  style={{ borderRight: "1px solid #CBD5E1" }}
                >
                  {row.code}
                </div>

                <div className="col-span-8 px-4 py-6">
                  <div className="text-[#2E2E2E]">{row.mm}</div>
                  <div
                    className="mt-4 pt-3 text-[#2E2E2E]"
                    style={{ borderTop: "2px solid #C7D7F2" }}
                  >
                    {row.en}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ================= Footer ================= */}
          <div className="mt-6 text-center text-[14px] text-[#2E2E2E]">
            အောင်လက်မှတ်ပါ အချက်အလက်များနှင့် အထက်ဖော်ပြပါ အချက်အလက်များ ကွဲလွဲမှုရှိလျင်{" "}
            <span className="text-blue-600">qr@myanmarexam.org</span> သို့ ဆက်သွယ်နိုင်ပါသည်။
          </div>

          <div className="mt-2 text-center text-[14px] text-[#2E2E2E]">
            If the details on the certificate differ from the above information,
            kindly reach out to{" "}
            <span className="text-blue-600">qr@myanmarexam.org</span>.
          </div>

          <div className="mt-6 text-center text-[14px] text-slate-600">
            Copyright © 2024 Department of Myanmar Examinations.
          </div>
        </div>
      </div>
    </div>
  )
}
