"use client"

import { useState } from "react"

export default function NewCertificatePage() {
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setMsg(null)

    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())

    try {
      const res = await fetch("/api/certificates/new", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      const json = await res.json().catch(() => ({}))

      if (!res.ok || !json.ok) {
        setMsg("❌ " + (json.error || `Request failed (${res.status})`))
        return
      }

      setMsg(`✅ Certificate saved successfully (UUID: ${json.uuid})`)
      form.reset()
    } catch (err: any) {
      setMsg("❌ Network / server error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F7FA] p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-xl p-8 shadow">
        <h1 className="text-xl font-semibold mb-6">
          New Certificate Entry
        </h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          {/* Certificate No */}
          <input
            name="certificate_no"
            placeholder="Certificate Number"
            required
            className="border px-3 py-2 rounded"
          />

          {/* Exam Year */}
          <input
            name="exam_year"
            placeholder="Exam Year"
            required
            className="border px-3 py-2 rounded"
          />

          {/* Seat No */}
          <input
            name="seat_no"
            placeholder="Seat Number"
            className="border px-3 py-2 rounded"
          />

          {/* Student Name */}
          <input
            name="student_name"
            placeholder="Student Name"
            required
            className="border px-3 py-2 rounded"
          />

          {/* Date of Birth */}
          <input
            name="dob"
            placeholder="Date of Birth"
            className="border px-3 py-2 rounded"
          />

          {/* Father Name */}
          <input
            name="father_name"
            placeholder="Father Name"
            className="border px-3 py-2 rounded"
          />

          {/* Mother Name */}
          <input
            name="mother_name"
            placeholder="Mother Name"
            className="border px-3 py-2 rounded"
          />

          {/* Compilation */}
          <select
            name="compilation"
            className="border px-3 py-2 rounded"
            defaultValue=""
          >
            <option value="" disabled>
              Select Compilation
            </option>
            <option value="STEAMS-1">STEAMS-1</option>
            <option value="STEAMS-2">STEAMS-2</option>
            <option value="STAMS-1">STAMS-1</option>
            <option value="STAMS-2">STAMS-2</option>
          </select>

          {/* Distinctions */}
          <input
            name="distinctions"
            placeholder="Distinctions (if any)"
            className="border px-3 py-2 rounded col-span-2"
          />

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="col-span-2 mt-4 bg-blue-900 text-white py-2 rounded hover:bg-blue-800 disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save Certificate"}
          </button>
        </form>

        {/* Message */}
        {msg && (
          <div className="mt-4 text-sm">
            {msg}
          </div>
        )}
      </div>
    </div>
  )
}
