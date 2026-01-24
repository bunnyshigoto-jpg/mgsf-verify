"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useRef, useState, Suspense } from "react"
import { supabase } from "@/lib/supabase"

/* =========================================
   5x7 bitmap digits
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
   Canvas render（纯函数）
   ========================================= */
function renderCodeToDataUrl(code: string): string {
  const pixel = 2
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
  ctx.fillStyle = "#D32F2F"

  let offsetX = 0

  for (const ch of code) {
    const glyph = DIGITS_5x7[ch]
    if (!glyph) continue

    glyph.forEach((row, y) => {
      row.split("").forEach((bit, x) => {
        if (bit === "1") {
          ctx.fillRect(offsetX + x * pixel, y * pixel, pixel, pixel)
        }
      })
    })

    offsetX += cols * pixel + gap
  }

  return canvas.toDataURL("image/png")
}

/* =========================================
   Utils
   ========================================= */
const randomSixDigits = () =>
  Math.floor(100000 + Math.random() * 900000).toString()

const isUUID = (v: string) =>
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v)

/* =========================================
   核心逻辑组件（包含 useSearchParams）
   ========================================= */
function VerifyContent() {
  const router = useRouter()
  const sp = useSearchParams()

  const [input, setInput] = useState("")
  const [displayCode, setDisplayCode] = useState("")
  const [imgSrc, setImgSrc] = useState("")

  const hasResolved = useRef(false)
  const hasFetched = useRef(false)

  /* =========================================
     决定显示数字（一次性决策）
     ========================================= */
  useEffect(() => {
    if (hasResolved.current) return

    const uid = sp.get("uid")

    // ① 无 uid → 非扫码 → 随机
    if (!uid) {
      setDisplayCode(randomSixDigits())
      hasResolved.current = true
      return
    }

    // ② uid 非法 → 防注入 → 随机
    if (!isUUID(uid)) {
      setDisplayCode(randomSixDigits())
      hasResolved.current = true
      return
    }

    // ③ 合法 uid → 查询一次
    if (hasFetched.current) return
    hasFetched.current = true

    ;(async () => {
      const { data, error } = await supabase
        .from("dme_certificates")
        .select("certificate_no")
        .eq("uuid", uid)
        .single()

      if (error || !data?.certificate_no) {
        setDisplayCode(randomSixDigits())
        hasResolved.current = true
        return
      }

      // ✅ 成功：显示真实证书号
      setDisplayCode(String(data.certificate_no))
      hasResolved.current = true

      // 清理 uid（不影响已决策状态）
      router.replace("/verify")
    })()
  }, [sp, router])

  /* =========================================
     Canvas 渲染
     ========================================= */
  useEffect(() => {
    if (!displayCode) return
    setImgSrc(renderCodeToDataUrl(displayCode))
  }, [displayCode])

  /* =========================================
     Submit
     ========================================= */
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const id = input.trim()

    if (!/^\d+$/.test(id)) {
      router.push("/verify/not-found")
      return
    }

    router.push(`/verify/${id}`)
  }

  /* =========================================
     UI
     ========================================= */
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center bg-slate-100 px-4 relative">
      <div className="flex flex-col items-center text-center gap-3">
        <img src="/logo-ct-dark.png" className="w-40 lg:w-80 mb-4" />
        <h1 className="text-base lg:text-2xl font-bold text-slate-900">
          မြန်မာနိုင်ငံစာစစ်ဦးစီးဌာန
        </h1>
        <p className="text-[22px] lg:text-[25px]">
          Department of Myanmar Examinations
        </p>
      </div>

      <div className="mt-4 rounded ring-1 ring-slate-400 w-full max-w-lg bg-slate-200">
        <div className="p-5">
          <div
            className="select-none"
            style={{ marginTop: 18, marginBottom: 15, transform: "translateX(-2px)" }}
          >
            {imgSrc && (
              <img
                src={imgSrc}
                alt={displayCode}
                style={{ display: "block", margin: "0 auto" }}
              />
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="အထက်ပါ နံပါတ်အား ရိုက်ထည့်ပါ"
              className="p-3 rounded bg-white ring-1 ring-slate-200 text-base text-slate-500"
            />
            <button className="py-3 bg-blue-900 text-white rounded text-base">
              Submit
            </button>
          </form>
        </div>
      </div>

      <p className="absolute bottom-0 p-2 text-center text-sm">
        Copyright © 2024 Department of Myanmar Examinations.
      </p>
    </div>
  )
}

/* =========================================
   主组件（包裹 Suspense）
   ========================================= */
export default function Page() {
  return (
    <Suspense fallback={
      <div className="h-screen w-full flex items-center justify-center bg-slate-100">
        <div className="text-slate-600">Loading...</div>
      </div>
    }>
      <VerifyContent />
    </Suspense>
  )
}