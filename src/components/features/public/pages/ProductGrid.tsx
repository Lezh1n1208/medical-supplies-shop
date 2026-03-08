import { PackageX } from "lucide-react";
import { ProductCard } from "@/components/features/public/pages/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import type { ProductListItem } from "@/services/product.public.service";

const SKELETON_COUNT = 16;

interface ProductGridProps {
  items: ProductListItem[];
  isLoading: boolean;
  isError: boolean;
  onClearFilters: () => void;
}

export function ProductGrid({
  items,
  isLoading,
  isError,
  onClearFilters,
}: Readonly<ProductGridProps>) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            className="rounded-xl overflow-hidden border border-gray-200"
          >
            <Skeleton className="h-[180px] w-full" />
            <div className="p-3 space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-8 w-full mt-2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <PackageX size={48} className="text-gray-300 mb-4" />
        <p className="font-semibold text-gray-500" style={{ fontSize: "16px" }}>
          Không thể tải sản phẩm
        </p>
        <p className="text-gray-400 mt-1" style={{ fontSize: "13px" }}>
          Vui lòng thử lại sau
        </p>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <PackageX size={48} className="text-gray-300 mb-4" />
        <p className="font-semibold text-gray-500" style={{ fontSize: "16px" }}>
          Không có sản phẩm nào
        </p>
        <p className="text-gray-400 mt-1" style={{ fontSize: "13px" }}>
          Thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác
        </p>
        <button
          onClick={onClearFilters}
          className="mt-4 px-4 py-2 rounded-lg text-white font-semibold transition-all hover:opacity-90"
          style={{ backgroundColor: "#1565C0", fontSize: "13px" }}
        >
          Xóa bộ lọc
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
