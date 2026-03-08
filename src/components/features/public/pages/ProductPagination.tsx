interface ProductPaginationProps {
  current: number;
  total: number;
  onChange: (page: number) => void;
}

export function ProductPagination({
  current,
  total,
  onChange,
}: Readonly<ProductPaginationProps>) {
  if (total <= 1) return null;

  const pages = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-1.5 mt-10">
      <button
        disabled={current === 1}
        onClick={() => onChange(current - 1)}
        className="px-3 py-2 rounded-lg border text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
        style={{ fontSize: "13px", borderColor: "#E5E7EB", color: "#374151" }}
      >
        ← Trước
      </button>

      {pages.map((p) => (
        <button
          key={p}
          onClick={() => onChange(p)}
          className="w-9 h-9 rounded-lg border font-semibold transition-all"
          style={{
            fontSize: "13px",
            backgroundColor: p === current ? "#1565C0" : "#fff",
            color: p === current ? "#fff" : "#374151",
            borderColor: p === current ? "#1565C0" : "#E5E7EB",
          }}
        >
          {p}
        </button>
      ))}

      <button
        disabled={current === total}
        onClick={() => onChange(current + 1)}
        className="px-3 py-2 rounded-lg border text-sm font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50"
        style={{ fontSize: "13px", borderColor: "#E5E7EB", color: "#374151" }}
      >
        Tiếp →
      </button>
    </div>
  );
}
