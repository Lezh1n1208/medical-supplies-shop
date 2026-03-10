"use client";

import { useEffect, useState } from "react";
import { Search, Phone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAdminQuoteRequests } from "@/hooks/use-admin-quote-requests";
import { buildPagination } from "@/utils/product.utils";

const PAGE_SIZE = 20;

function SkeletonRows() {
  return (
    <div className="p-6 space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={`skeleton-${i}`}
          className="h-12 bg-gray-50 rounded animate-pulse"
        />
      ))}
    </div>
  );
}

export default function AdminQuoteRequestsPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);

    return () => clearTimeout(t);
  }, [search]);

  const { data, isLoading } = useAdminQuoteRequests({
    search: debouncedSearch || undefined,
    page,
    limit: PAGE_SIZE,
  });

  const items = data?.items ?? [];
  const totalPages = data?.totalPages ?? 0;
  const total = data?.total ?? 0;

  let tableContent;

  if (isLoading) {
    tableContent = <SkeletonRows />;
  } else if (items.length) {
    tableContent = (
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
          {items.map((q) => (
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
    );
  } else {
    tableContent = (
      <div className="p-12 text-center text-gray-400 text-[13px]">
        {search ? "Không tìm thấy kết quả" : "Chưa có yêu cầu nào"}
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Yêu cầu báo giá</h1>
        <p className="text-[13px] text-gray-400 mt-1">{total} yêu cầu</p>
      </div>

      {/* SEARCH */}
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

      {/* TABLE */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {tableContent}
      </div>

      {/* PAGINATION */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <div className="flex gap-1.5 text-[13px]">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              ← Trước
            </Button>

            {buildPagination(page, totalPages).map((p, i) => {
              if (p === "...") {
                return (
                  // eslint-disable-next-line react/no-array-index-key
                  <span key={`ellipsis-${i}`} className="px-2 py-1">
                    …
                  </span>
                );
              }

              return (
                <Button
                  key={p}
                  variant={p === page ? "default" : "outline"}
                  size="sm"
                  className="w-8"
                  onClick={() => setPage(p)}
                >
                  {p}
                </Button>
              );
            })}

            <Button
              variant="outline"
              size="sm"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Tiếp →
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
