"use client";
import { useState } from "react";
import { Search, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useAdminQuoteRequests } from "@/hooks/use-admin-quote-requests";

export default function AdminQuoteRequestsPage() {
  const { data: quotes, isLoading } = useAdminQuoteRequests();
  const [search, setSearch] = useState("");

  const filtered = quotes?.filter(
    (q) =>
      q.full_name.toLowerCase().includes(search.toLowerCase()) ||
      q.phone.includes(search),
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Yêu cầu báo giá</h1>
        <p className="text-[13px] text-gray-400 mt-1">
          {quotes?.length ?? 0} yêu cầu (tối đa 100 records)
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-4 max-w-sm">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <Input
          className="pl-8"
          placeholder="Tìm theo tên hoặc SĐT..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-6 space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-12 bg-gray-50 rounded animate-pulse" />
            ))}
          </div>
        ) : !filtered?.length ? (
          <div className="p-12 text-center text-gray-400 text-[13px]">
            {search ? "Không tìm thấy kết quả" : "Chưa có yêu cầu nào"}
          </div>
        ) : (
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-5 py-3 text-gray-400 font-medium">
                  Họ tên
                </th>
                <th className="text-left px-5 py-3 text-gray-400 font-medium">
                  Số điện thoại
                </th>
                <th className="text-left px-5 py-3 text-gray-400 font-medium hidden md:table-cell">
                  Danh mục quan tâm
                </th>
                <th className="text-left px-5 py-3 text-gray-400 font-medium hidden lg:table-cell">
                  Thời gian
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((q) => (
                <tr
                  key={q.id}
                  className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-5 py-3 font-medium text-gray-800">
                    {q.full_name}
                  </td>
                  <td className="px-5 py-3">
                    <a
                      href={`tel:${q.phone}`}
                      className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      <Phone size={12} />
                      {q.phone}
                    </a>
                  </td>
                  <td className="px-5 py-3 hidden md:table-cell">
                    {q.categories ? (
                      <span className="px-2 py-0.5 bg-teal-50 text-teal-700 rounded-md text-[11px] font-medium">
                        {q.categories.name}
                      </span>
                    ) : (
                      <span className="text-gray-300">—</span>
                    )}
                  </td>
                  <td className="px-5 py-3 text-gray-400 hidden lg:table-cell">
                    {new Date(q.created_at).toLocaleDateString("vi-VN", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
