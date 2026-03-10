"use client";

import { use } from "react";
import Link from "next/link";
import { PackageX, ArrowLeft } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { usePublicProduct } from "@/hooks/use-public-products";
import { ProductBreadcrumb } from "@/components/features/public/pages/ProductBreadcrumb";
import { ProductImageGallery } from "@/components/features/public/pages/ProductImageGallery";
import { ProductInfoPanel } from "@/components/features/public/pages/ProductInfoPanel";
import { ProductDescription } from "@/components/features/public/pages/ProductDescription";
import { RelatedProducts } from "@/components/features/public/pages/RelatedProducts";

function ProductDetailSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Skeleton className="h-4 w-64 mb-6" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
        <Skeleton className="rounded-2xl aspect-square" />
        <div className="space-y-4">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-3/4" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-10 w-40 mt-4" />
          <Skeleton className="h-24 w-full mt-2 rounded-xl" />
          <Skeleton className="h-14 w-full rounded-xl mt-2" />
        </div>
      </div>
    </div>
  );
}

function ProductNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <PackageX size={56} className="text-gray-300 mb-4" />
      <p className="font-bold text-gray-700 mb-1" style={{ fontSize: "18px" }}>
        Không tìm thấy sản phẩm
      </p>
      <p className="text-gray-400 mb-6" style={{ fontSize: "14px" }}>
        Sản phẩm này không tồn tại hoặc đã bị xóa.
      </p>
      <Link
        href="/san-pham"
        className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white font-semibold hover:opacity-90 transition-all"
        style={{ backgroundColor: "#1565C0", fontSize: "14px" }}
      >
        <ArrowLeft size={15} />
        Quay lại danh sách
      </Link>
    </div>
  );
}

export default function ProductDetailPage({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const { id: slug } = use(params);
  const { data: product, isLoading, isError } = usePublicProduct(slug);

  if (isLoading) {
    return (
      <div style={{ backgroundColor: "#F8FAFD", minHeight: "100vh" }}>
        <ProductDetailSkeleton />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div style={{ backgroundColor: "#F8FAFD", minHeight: "100vh" }}>
        <ProductNotFound />
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#F8FAFD", minHeight: "100vh" }}>
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ProductBreadcrumb
          categoryName={product.categories?.name}
          categorySlug={product.categories?.slug}
          productName={product.name}
        />

        {/* Gallery + Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10">
          <ProductImageGallery
            images={product.product_images}
            productName={product.name}
          />
          <ProductInfoPanel
            name={product.name}
            priceType={product.price_type}
            price={product.price}
            salePrice={product.sale_price}
            rating={product.rating}
            isBestSeller={product.is_best_seller}
            categoryName={product.categories?.name}
          />
        </div>

        {/* Description */}
        {product.description && (
          <div className="mb-10">
            <ProductDescription description={product.description} />
          </div>
        )}

        {/* Related */}
        <RelatedProducts
          categorySlug={product.categories?.slug}
          currentProductId={product.id}
        />
      </div>
    </div>
  );
}
