"use client";

import { Button } from "@/components/ui/button";
import { buildPagination } from "@/utils/product.utils";

export default function Pagination({
  page,
  totalPages,
  setPage,
}: Readonly<{
  page: number;
  totalPages: number;
  setPage: (p: number) => void;
}>) {
  const pages = buildPagination(page, totalPages);

  return (
    <div className="flex justify-center mt-4">
      <div className="flex gap-1.5">
        <Button
          variant="outline"
          size="sm"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          ← Trước
        </Button>

        {pages.map((p, i) => {
          const key = `${p}-${i}`;

          if (p === "...") {
            return (
              <span key={key} className="px-2 py-1">
                …
              </span>
            );
          }

          return (
            <Button
              key={key}
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
          onClick={() => setPage(page + 1)}
        >
          Tiếp →
        </Button>
      </div>
    </div>
  );
}
