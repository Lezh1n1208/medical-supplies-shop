"use client";

import { usePublicProducts } from "@/hooks/use-public-products";
import { ProductCard } from "@/components/features/public/pages/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

interface RelatedProductsProps {
  categorySlug?: string | null;
  currentProductId: string;
}

export function RelatedProducts({
  categorySlug,
  currentProductId,
}: Readonly<RelatedProductsProps>) {
  const { data, isLoading } = usePublicProducts({
    categorySlug: categorySlug ?? undefined,
    limit: 5,
  });

  const items = (data?.items ?? [])
    .filter((p) => p.id !== currentProductId)
    .slice(0, 4);

  if (!isLoading && items.length === 0) return null;

  return (
    <section>
      <h2 className="font-bold text-gray-800 mb-5" style={{ fontSize: "18px" }}>
        Sản phẩm liên quan
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={i}
                className="rounded-xl border border-gray-200 overflow-hidden"
              >
                <Skeleton className="h-[180px]" />
                <div className="p-3 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-8 w-full mt-2" />
                </div>
              </div>
            ))
          : items.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                showRating={false}
              />
            ))}
      </div>
    </section>
  );
}
