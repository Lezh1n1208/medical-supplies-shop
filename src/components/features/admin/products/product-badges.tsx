import { Product } from "@/schemas/product.schema";
import { Badge } from "@/components/ui/badge";
import { Trophy, Tag } from "lucide-react";

export default function ProductBadges({
  product,
}: Readonly<{ product: Product }>) {
  const badges = [];

  if (product.is_best_seller) {
    badges.push(
      <Badge
        key="best"
        variant="secondary"
        className="text-[10px] gap-1 bg-blue-50 text-blue-600"
      >
        <Trophy size={9} />
        Bán chạy
      </Badge>,
    );
  }

  if (product.sale_price != null) {
    badges.push(
      <Badge
        key="sale"
        variant="secondary"
        className="text-[10px] gap-1 bg-red-50 text-red-600"
      >
        <Tag size={9} />
        Khuyến mãi
      </Badge>,
    );
  }

  return <div className="flex gap-1">{badges}</div>;
}
