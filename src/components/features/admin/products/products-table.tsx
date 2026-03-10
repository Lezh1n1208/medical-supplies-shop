import { Product } from "@/schemas/product.schema";
import ProductRow from "./product-row";
import { AdminProduct } from "@/services/product.admin.service";

export default function ProductsTable({
  items,
  onEdit,
  onDelete,
}: Readonly<{
  items: AdminProduct[];
  onEdit: (p: Product) => void;
  onDelete: (id: string) => void;
}>) {
  return (
    <table className="w-full text-[13px]">
      <thead>
        <tr className="border-b border-gray-100 bg-gray-50/50">
          <th className="text-left px-5 py-3 text-gray-400 font-medium">
            Sản phẩm
          </th>

          <th className="text-left px-5 py-3 text-gray-400 font-medium hidden md:table-cell">
            Giá
          </th>

          <th className="text-left px-5 py-3 text-gray-400 font-medium hidden lg:table-cell">
            Đánh giá
          </th>

          <th className="text-left px-5 py-3 text-gray-400 font-medium hidden lg:table-cell">
            Nhãn
          </th>

          <th className="text-right px-5 py-3 text-gray-400 font-medium">
            Hành động
          </th>
        </tr>
      </thead>

      <tbody>
        {items.map((p) => (
          <ProductRow
            key={p.id}
            product={p}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
}
