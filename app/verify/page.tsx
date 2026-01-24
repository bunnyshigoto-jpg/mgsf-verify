"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

/* =========================================
   5x7 bitmap digits（老派、硬、不现代）
   ========================================= */
const DIGITS_5x7: Record<string, string[]> = {
  "0": ["01110","10001","10011","10101","11001","10001","01110"],
  "1": ["00100","01100","00100","00100","00100","00100","01110"],
  "2": ["01110","10001","00001","00010","00100","01000","11111"],
  "3": ["11110","00001","00001","01110","00001","00001","11110"],
  "4": ["00010","00110","01010","10010","11111","00010","00010"],
  "5": ["11111","10000","11110","00001","00001","10001","01110"],
  "6": ["00110","01000","10000","11110","10001","10001","01110"],
  "7": ["11111","00001","00010","00100","01000","01000","01000"],
  "8": ["01110","10001","10001","01110","10001","10001","01110"],
  "9": ["01110","10001","10001","01111","00001","00010","01100"],
}

/* =========================================
   Canvas：数字 → PNG DataURL
   （⚠️ 必须是顶层函数）
   ========================================= */
function renderCodeToDataUrl(code: string): string {
  const pixel = 2   // 🔴 关键：尺寸已经调小
  const gap = 1
  const rows = 7
  const cols = 5

  const width = code.length * cols * pixel + (code.length - 1) * gap
  const height = rows * pixel

  const canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height

  const ctx = canvas.getContext("2d")
  if (!ctx) return ""

  ctx.imageSmoothingEnabled = false
  ctx.clearRect(0, 0, width, height)
  ctx.fillStyle = "#D32F2F"

  let offsetX = 0

  for (const ch of code) {
    const glyph = DIGITS_5x7[ch]
    if (!glyph) continue

    glyph.forEach((row, y) => {
      row.split("").forEach((bit, x) => {
        if (bit === "1") {
          ctx.fillRect(
            offsetX + x * pixel,
            y * pixel,
            pixel,
            pixel
          )
        }
      })
    })

    offsetX += cols * pixel + gap
  }

  return canvas.toDataURL("image/png")
}

/* =========================================
   工具
   ========================================= */
function randomSixDigits(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

/* =========================================
   Page
   ========================================= */
export default function Page() {
  const router = useRouter()
  const sp = useSearchParams()

  const [cap, setCap] = useState("")
  const [displayCode, setDisplayCode] = useState("")
  const [codeImgSrc, setCodeImgSrc] = useState("")
  const [realCode, setRealCode] = useState<string | null>(null)

  /* 决定显示什么数字 */
  useEffect(() => {
  const uid = sp.get("uid")

  // ① 只有「带 uid 的访问」才算扫码
  if (!uid) {
    setDisplayCode(randomSixDigits())
    return
  }

  // ② 基本 UUID 格式校验（防乱输）
  const isUUID =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(uid)

  if (!isUUID) {
    setDisplayCode(randomSixDigits())
    return
  }

  // ③ 用 uid 查 Supabase（只取 certificate_no）
  ;(async () => {
    const { data, error } = await supabase
      .from("dme_certificates")
      .select("certificate_no")
      .eq("uuid", uid)
      .single()

    if (error || !data?.certificate_no) {
      setDisplayCode(randomSixDigits())
      return
    }

    // ✅ 只有「有效扫码」才能显示真实数字
    setDisplayCode(data.certificate_no)
  })()
}, [sp])

  /* 数字 → Canvas 图片 */
  useEffect(() => {
    if (!displayCode) return
    setCodeImgSrc(renderCodeToDataUrl(displayCode))
  }, [displayCode])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault()

  const inputValue = cap.trim()
  const uid = sp.get("uid")

  // 基本防御
  if (!uid || !realCode) {
    router.push("/verify/not-found")
    return
  }

  // 必须是纯数字
  if (!/^\d+$/.test(inputValue)) {
    router.push("/verify/not-found")
    return
  }

  // 人机确认：和刚才查到的 certificate_no 比较
  if (inputValue !== realCode) {
    router.push("/verify/not-found")
    return
  }

  // ✅ 验证通过：只用 uuid 进入最终页
  router.push(`/verify/uuid/${uid}`)
}

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-slate-100 px-4 relative">

      {/* Header */}
      <div className="flex flex-col items-center text-center gap-3">
        <img src="/logo-ct-dark.png" className="w-40 lg:w-80 mb-4" />
        <h1 className="text-base lg:text-2xl font-bold text-slate-900">
          မြန်မာနိုင်ငံစာစစ်ဦးစီးဌာန
        </h1>
        <p className="text-[22px] lg:text-[25px]">
          Department of Myanmar Examinations
        </p>
      </div>

      {/* Card */}
      <div
  className="mt-4 rounded ring-1 ring-slate-400 w-full max-w-lg"
  style={{ backgroundColor: "#E2E8F0" }}
>
        <div className="p-5">

          {/* 红色数字（刻意不完全居中） */}
          <div
            className="select-none"
            style={{
              marginTop: 18,
              marginBottom: 15,
              paddingLeft: 0,
              transform: "translateX(-2px)",
            }}
          >
            {codeImgSrc && (
              <img
                src={codeImgSrc}
alt={displayCode}
style={{ display: "block", margin: "0 auto" }}
/>
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
            <input
              type="text"
              value={cap}
              onChange={(e) => setCap(e.target.value)}
              placeholder="အထက်ပါ နံပါတ်အား ရိုက်ထည့်ပါ"
              className="p-3 w-full rounded bg-white ring-1 ring-slate-200 text-base text-slate-500"
            />

            <button
              type="submit"
              className="py-3 bg-blue-900 text-white w-full rounded text-base"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <p className="absolute bottom-0 p-2 text-center text-sm">
        Copyright © 2024 Department of Myanmar Examinations.
      </p>
    </div>
  )
}
