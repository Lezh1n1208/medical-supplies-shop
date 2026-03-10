import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Star, ImageIcon } from "lucide-react";
import ProductPrice from "./product-price";
import ProductBadges from "./product-badges";
import Image from "next/image";
import { AdminProduct } from "@/services/product.admin.service";

export default function ProductRow({
  product,
  onEdit,
  onDelete,
}: Readonly<{
  product: AdminProduct;
  onEdit: (p: AdminProduct) => void;
  onDelete: (id: string) => void;
}>) {
  return (
    <tr className="border-b border-gray-50 hover:bg-gray-50/50">
      <td className="px-5 py-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 relative">
            {product.thumbnail_url ? (
              <Image
                src={product.thumbnail_url}
                alt={product.name}
                fill
                className="object-cover"
              />
            ) : (
              <ImageIcon
                size={16}
                className="absolute inset-0 m-auto text-gray-300"
              />
            )}
          </div>

          <div>
            <p className="font-medium text-gray-800 line-clamp-1">
              {product.name}
            </p>

            <p className="text-gray-400 text-[11px] font-mono">
              {product.slug}
            </p>
          </div>
        </div>
      </td>

      <td className="px-5 py-3 hidden md:table-cell">
        <ProductPrice product={product} />
      </td>

      <td className="px-5 py-3 hidden lg:table-cell">
        <div className="flex items-center gap-1 text-amber-400">
          <Star size={12} fill="currentColor" />
          <span className="text-gray-600 text-[12px]">
            {product.rating?.toFixed(1)}
          </span>
        </div>
      </td>

      <td className="px-5 py-3 hidden lg:table-cell">
        <ProductBadges product={product} />
      </td>

      <td className="px-5 py-3">
        <div className="flex justify-end gap-1.5">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => onEdit(product)}
          >
            <Pencil size={13} />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 text-red-400 hover:text-red-600 hover:bg-red-50"
            onClick={() => onDelete(product.id)}
          >
            <Trash2 size={13} />
          </Button>
        </div>
      </td>
    </tr>
  );
}
