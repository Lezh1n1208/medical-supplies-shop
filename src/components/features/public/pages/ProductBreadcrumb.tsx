import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface ProductBreadcrumbProps {
  categoryName?: string | null;
  categorySlug?: string | null;
  productName: string;
}

export function ProductBreadcrumb({
  categoryName,
  categorySlug,
  productName,
}: Readonly<ProductBreadcrumbProps>) {
  return (
    <nav
      className="flex items-center gap-1.5 flex-wrap mb-6"
      style={{ fontSize: "13px" }}
    >
      <Link
        href="/"
        className="text-gray-500 hover:text-blue-600 transition-colors"
      >
        Trang chủ
      </Link>
      <ChevronRight size={13} className="text-gray-300 flex-shrink-0" />
      <Link
        href="/products"
        className="text-gray-500 hover:text-blue-600 transition-colors"
      >
        Sản phẩm
      </Link>
      {categoryName && categorySlug && (
        <>
          <ChevronRight size={13} className="text-gray-300 flex-shrink-0" />
          <Link
            href={`/products?categorySlug=${categorySlug}`}
            className="text-gray-500 hover:text-blue-600 transition-colors"
          >
            {categoryName}
          </Link>
        </>
      )}
      <ChevronRight size={13} className="text-gray-300 flex-shrink-0" />
      <span className="text-gray-800 font-medium line-clamp-1">
        {productName}
      </span>
    </nav>
  );
}
