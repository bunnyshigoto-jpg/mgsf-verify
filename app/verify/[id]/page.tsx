// mgsf-verify/app/verify/[id]/page.tsx
import { supabase } from "@/lib/supabase"
import { notFound, redirect } from "next/navigation"
import React from "react"


type Props = {
params: {
id: string
}
}


// 阿拉伯数字 → 缅甸数字
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


function Row({ label, value }: { label: string; value: string }) {
return (
<div className="grid grid-cols-12 items-center py-2 text-[16px] leading-7">
<div className="col-span-5 pl-2 text-slate-900 font-normal">
{label}
</div>
<div className="col-span-2 text-center text-slate-400 select-none">
-
</div>
<div className="col-span-5 text-slate-900 font-normal">
{value || "-"}
</div>
</div>
)
}


export default async function Page({ params }: Props) {
  const { id } = await params  // ✅ 正确：先 await


// ① 路由层第一道防线（非法输入直接跳转到错误页）
if (!/^\d+$/.test(id)) {
  redirect("/verify/not-found")
}


// ② 数据库查询
const { data, error } = await supabase
.from("dme_certificates")
.select("*")
.eq("certificate_no", id)
.single()


// ③ 查不到 = 跳转到自定义错误页
if (error || !data) {
  redirect("/verify/not-found")
}


const compilations = [
{
code: "STEAMS-1",
mm: "မြန်မာစာ၊ အင်္ဂလိပ်စာ ၊ သင်္ချာ ၊ ဓါတုဗေဒ ၊ ရူပဗေဒ ၊ ဇီဝဗေဒ",
en: "Myanmar, English, Mathematics, Chemistry, Physics, Biology",
},
{
code: "STEAMS-2",
mm: "မြန်မာစာ၊ အင်္ဂလိပ်စာ ၊ သင်္ချာ ၊ ဓါတုဗေဒ ၊ ရူပဗေဒ ၊ ဘောဂဗေဒ",
en: "Myanmar, English, Mathematics, Chemistry, Physics, Economics",
},
{
code: "STAMS-1",
mm: "မြန်မာစာ၊ အင်္ဂလိပ်စာ ၊ သင်္ချာ ၊ ပထဝီဝင် ၊ သမိုင်း ၊ ‌ဘောဂဗေဒ",
en: "Myanmar, English, Mathematics, Geography, History, Economics",
},
{
code: "STAMS-2",
mm: "မြန်မာစာ၊ အင်္ဂလိပ်စာ ၊ သင်္ချာ ၊ စိတ်ကြိုက်မြန်မာစာ ၊ လူမှုရေးသိပ္ပံ ၊ ဘောဂဗေဒ",
en: "Myanmar, English, Mathematics, Selected Myanmar, Social Science, Economics",
},
]

  return (
    <div
      className="min-h-screen w-full"
      style={{
        backgroundColor: "#F1F5F9", // ✅ 全域背景
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Arial, sans-serif',
      }}
    >
      {/* ✅ 宽度：桌机加宽，但仍保持“卡片居中收窄”感觉 */}
      <div className="mx-auto w-full px-4 py-10 lg:px-0">
        <div className="mx-auto w-full max-w-[980px] lg:w-1/2">
          {/* ================= 上半：证书信息卡片 ================= */}
          <div
            className="rounded-[18px] p-4 sm:p-5 md:p-6"
            style={{
              backgroundColor: "#F8FAFC", // ✅ 上半表格底色
              boxShadow:
                "rgb(255,255,255) 0 0 0 0, rgb(100,116,139) 0 0 0 1px, rgba(0,0,0,0) 0 0 0 0",
              filter:
                "drop-shadow(rgba(0,0,0,0.07) 0px 4px 3px) drop-shadow(rgba(0,0,0,0.06) 0px 2px 2px)",
            }}
          >
            {/* Header：logo 与两行标题对齐（你强调要“平行”） */}
            <div className="flex items-center gap-6 pt-4 pb-2">
  {/* 左侧 Logo：≈ 1/4 */}
  <div className="w-1/4 flex justify-center">
    <img
      src="/logo-ct-dark.png"
      alt="Logo"
      className="w-36 h-auto object-contain"
      draggable={false}
    />
  </div>

  {/* 右侧标题：≈ 2/3，区域内居中 */}
  <div className="w-2/3 flex flex-col items-center justify-center text-center">
    <div className="text-[18px] leading-9 font-semibold text-slate-900">
      ပညာရေးဝန်ကြီးဌာန - Ministry of Education
    </div>
    <div className="text-[18px] leading-9 font-semibold text-slate-900">
      မြန်မာနိုင်ငံစာစစ်ဦးစီးဌာန - Department of Myanmar Examinations
    </div>
  </div>
</div>

            {/* 中标题：无下划线，加粗，小一号 */}
<div className="text-center mt-5 mb-5">
<div className="inline-block">
<div className="text-[12px] sm:text-[20px] font-semibold text-slate-900">
အောင်လက်မှတ်အချက်အလက်များ
</div>
</div>
</div>

            {/* 数据区：虚线分隔（接近你截图） */}
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

          {/* ================= 下半：Compilation / Subjects 表格 ================= */}
          <div className="mt-6 overflow-x-auto">
            <div
              className="rounded-[12px] inline-block min-w-full"
              style={{
                boxShadow:
                  "rgb(255,255,255) 0 0 0 0, rgb(226,232,240) 0 0 0 1px, rgba(0,0,0,0) 0 0 0 0",
                filter:
                  "drop-shadow(rgba(0,0,0,0.06) 0px 2px 2px) drop-shadow(rgba(0,0,0,0.05) 0px 1px 1px)",
                backgroundColor: "#FFFFFF",
              }}
            >
              <table className="w-full border-separate border-spacing-0">
                <thead>
                  <tr style={{ backgroundColor: "#F8FAFC" }}>
                    <th
                      className="w-[18%] px-6 py-5 text-[16px] font-normal text-slate-900 text-center align-middle"
                      style={{
                        borderBottom: "1px solid rgb(229,231,235)",
                        borderRight: "1px solid rgb(229,231,235)",
                      }}
                    >
                      <div className="leading-7">
                        ဘာသာတွဲ
                        <br />
                        (Compilations)
                      </div>
                    </th>
                    <th
                      className="px-6 py-5 text-[16px] font-normal text-slate-900 text-center align-middle"
                      style={{ borderBottom: "1px solid rgb(229,231,235)" }}
                    >
                      <div className="leading-7">
                        ဘာသာရပ်များ
                        <br />
                        (Subjects)
                      </div>
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {compilations.map((item, idx) => {
                    const rowBg = idx % 2 === 0 ? "#F1F5F9" : "#FFFFFF"
                    const bottomLine =
                      idx === compilations.length - 1
                        ? "transparent"
                        : "rgb(229,231,235)"

                    return (
                      <React.Fragment key={item.code}>
                        <tr style={{ backgroundColor: rowBg }}>
                          <td
                            rowSpan={2}
                            className="px-5 py-0 text-[16px] font-normal text-slate-900 text-center align-middle"
                            style={{
                              borderBottom: `1px solid ${bottomLine}`,
                              borderRight: "1px solid rgb(229,231,235)",
                            }}
                          >
                            {item.code}
                          </td>

                          <td
                            className="pl-3 pr-6 pt-4 pb-3 text-[16px] leading-6 font-normal text-slate-900 align-top"
                            style={{
                              borderBottom: "1px solid rgb(229,231,235)",
                            }}
                          >
                            {item.mm}
                          </td>
                        </tr>

                        <tr style={{ backgroundColor: rowBg }}>
                          <td
                            className="pl-3 pr-6 pt-3 pb-4 text-[16px] leading-6 font-normal text-slate-900 align-top whitespace-nowrap tracking-tight"
                            style={{
                              borderBottom: `1px solid ${bottomLine}`,
                            }}
                          >
                            {item.en}
                          </td>
                        </tr>
                      </React.Fragment>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          </div>
{/* ================= Footer 文案区（整条灰底，从左到右） ================= */}
<div className="w-full bg-slate-100">
  <div className="mx-auto w-full max-w-[980px] px-4 py-4 text-center text-slate-700">
    <p className="text-[14px] leading-6">
      "အောင်လက်မှတ်ပါ အချက်အလက်များနှင့် အထက်ဖော်ပြပါ အချက်အလက်များ ကွဲလွဲမှုရှိလျင်{" "}
      <a className="text-blue-600" href="mailto:qr@myanmarexam.org">
        qr@myanmarexam.org
      </a>{" "}
      သို့ ဆက်သွယ် ဆောင်ရွက်နိုင်ပါသည်။"
    </p>

    <p className="text-[14px] leading-6 mt-1">
      "If the details on the certificate differ from the above information,
      kindly reach out to{" "}
      <span className="text-blue-600">qr@myanmarexam.org</span>."
    </p>
  </div>
</div>

{/* ================= Copyright 区（整条白底，很薄） ================= */}
<div className="w-full bg-white">
  <div className="mx-auto w-full max-w-[980px] px-4 py-3 text-center">
    <div className="text-[14px] text-slate-600">
      Copyright. © 2024 All rights reserved. Department of Myanmar Examinations.
    </div>
  </div>
</div>
      </div>
    </div>
  )
}