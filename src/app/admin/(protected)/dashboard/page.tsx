import { useAdminCategories } from "@/hooks/use-admin-categories";
import { useAdminProducts } from "@/hooks/use-admin-products";
import { useAdminQuoteRequests } from "@/hooks/use-admin-quote-requests";
import { Folder, MessageSquare, Package, Tag } from "lucide-react";

function StatCard({
  label,
  value,
  icon: Icon,
  color,
  isLoading,
}: Readonly<{
  label: string;
  value: number;
  icon: React.ElementType;
  color: string;
  isLoading: boolean;
}>) {
  return (
    <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
      <div
        className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: color + "15" }}
      >
        <Icon size={22} style={{ color }} />
      </div>

      <div>
        <p className="text-[12px] text-gray-400 font-medium mb-0.5">{label}</p>

        {isLoading ? (
          <div className="h-7 w-16 bg-gray-100 rounded animate-pulse" />
        ) : (
          <p className="text-2xl font-bold text-gray-800">{value}</p>
        )}
      </div>
    </div>
  );
}

export default function AdminDashboardPage() {
  const { data: categories, isLoading: loadingCats } = useAdminCategories();
  const { data: products, isLoading: loadingProds } = useAdminProducts();
  const { data: quotes, isLoading: loadingQuotes } = useAdminQuoteRequests();

  const onSaleCount = products?.filter((p) => p.sale_price != null).length ?? 0;

  const stats = [
    {
      label: "Tổng sản phẩm",
      value: products?.length ?? 0,
      icon: Package,
      color: "#1565C0",
      isLoading: loadingProds,
    },
    {
      label: "Tổng danh mục",
      value: categories?.length ?? 0,
      icon: Folder,
      color: "#00897B",
      isLoading: loadingCats,
    },
    {
      label: "Yêu cầu báo giá",
      value: quotes?.length ?? 0,
      icon: MessageSquare,
      color: "#7B1FA2",
      isLoading: loadingQuotes,
    },
    {
      label: "Đang khuyến mãi",
      value: onSaleCount,
      icon: Tag,
      color: "#DC2626",
      isLoading: loadingProds,
    },
  ];

  function renderQuoteContent() {
    if (loadingQuotes) {
      return (
        <div className="p-6 space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={i} className="h-10 bg-gray-50 rounded animate-pulse" />
          ))}
        </div>
      );
    }

    if (!quotes?.length) {
      return (
        <div className="p-8 text-center text-gray-400 text-[13px]">
          Chưa có yêu cầu báo giá nào
        </div>
      );
    }

    return (
      <table className="w-full text-[13px]">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="text-left px-5 py-3 text-gray-400 font-medium">
              Họ tên
            </th>
            <th className="text-left px-5 py-3 text-gray-400 font-medium">
              Số điện thoại
            </th>
            <th className="text-left px-5 py-3 text-gray-400 font-medium">
              Danh mục
            </th>
            <th className="text-left px-5 py-3 text-gray-400 font-medium">
              Thời gian
            </th>
          </tr>
        </thead>

        <tbody>
          {quotes.slice(0, 5).map((q) => (
            <tr
              key={q.id}
              className="border-b border-gray-50 hover:bg-gray-50 transition-colors"
            >
              <td className="px-5 py-3 font-medium text-gray-800">
                {q.full_name}
              </td>

              <td className="px-5 py-3 text-gray-600">{q.phone}</td>

              <td className="px-5 py-3 text-gray-500">
                {q.categories?.name ?? <span className="text-gray-300">—</span>}
              </td>

              <td className="px-5 py-3 text-gray-400">
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
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-[13px] text-gray-400 mt-1">
          Tổng quan hệ thống Ánh Dương Phát
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Recent quotes */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="px-5 py-4 border-b border-gray-100">
          <h2 className="text-[15px] font-bold text-gray-800">
            Yêu cầu báo giá gần đây
          </h2>
        </div>

        <div className="overflow-x-auto">{renderQuoteContent()}</div>
      </div>
    </div>
  );
}
