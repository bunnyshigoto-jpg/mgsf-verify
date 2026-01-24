import { notFound, redirect } from "next/navigation"
import { supabase } from "@/lib/supabase"

interface PageProps {
  params: Promise<{
    uuid: string
  }>
}

export default async function Page({ params }: PageProps) {
  // 🔑 关键修复：await params
  const { uuid } = await params

  // 基本 UUID 校验（防乱输）
  const isUUID =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(uuid)

  if (!isUUID) {
    notFound()
  }

  // 查询 Supabase
  const { data, error } = await supabase
    .from("dme_certificates")
    .select("*")
    .eq("uuid", uuid)
    .single()

  // 查不到 or 出错 → not-found
  if (error || !data) {
    notFound()
  }

  // 成功：先原样输出，方便你确认
  redirect(`/verify/${data.certificate_no}`)
}