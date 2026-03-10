import { Product } from "@/schemas/product.schema";
import { formatPrice } from "@/utils/product.utils";

export default function ProductPrice({
  product,
}: Readonly<{ product: Product }>) {
  if (product.price_type === "CONTACT") {
    return <span className="text-purple-600 font-medium">Liên hệ</span>;
  }

  const price = product.sale_price ?? product.price ?? 0;

  return (
    <div>
      <span className="font-medium text-gray-800">{formatPrice(price)}đ</span>

      {product.sale_price && product.price && (
        <span className="text-gray-400 line-through ml-2 text-[11px]">
          {formatPrice(product.price)}đ
        </span>
      )}
    </div>
  );
}
