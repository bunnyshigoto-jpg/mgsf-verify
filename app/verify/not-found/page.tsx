import Link from "next/link"

export default function VerifyUnavailablePage() {
return (
<main className="min-h-screen w-full bg-slate-50">
{/* 用 padding-top 控制整体上移，而不是 justify-center */}
<div className="w-full flex flex-col items-center text-center px-4 pt-[18vh]">
    
        {/* Logo：放大（对齐你目标图） */}

      <Link href="/verify">  {/* ← 加了这个 */}
       <img
    src="/logo-ct-dark.png"
    alt="Department of Myanmar Examinations"
    className="w-48 sm:w-56 md:w-64 mb-4 cursor-pointer" 
    draggable={false}
  />
</Link>  {/* ← 加了这个 */}

        {/* Myanmar title：比英文更醒目 */}
        <div className="text-[20px] sm:text-[24px] font-semibold text-black leading-tight mb-2">
          မြန်မာနိုင်ငံစာစစ်ဦးစီးဌာန
        </div>

        {/* 英文：需要放大 */}
<div className="text-[26px] font-normal text-black leading-tight mb-6">
Department of Myanmar Examinations
</div>


{/* 错误提示：整句加粗 */}
<div className="font-mono text-[20px] font-bold text-red-500 tracking-wide">
If you believe there is an error, please get in touch with{" "}
<span className="text-blue-600">
qr@myanmarexam.org
</span>.
</div>


</div>
</main>
)
}
