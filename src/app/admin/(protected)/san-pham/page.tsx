"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/schemas/product.schema";
import { useAdminProducts } from "@/hooks/use-admin-products";
import type { AdminProductFilters } from "@/services/product.admin.service";
import ProductFilters from "@/components/features/admin/products/product-filters";
import ProductsTable from "@/components/features/admin/products/products-table";
import Pagination from "@/components/features/admin/products/pagination";
import ProductFormDialog from "@/components/features/admin/products/product-form-dialog";
import DeleteProductDialog from "@/components/features/admin/products/delete-product-dialog";

const PAGE_SIZE = 20;

export default function AdminProductsPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [categoryId, setCategoryId] = useState("all");
  const [sortValue, setSortValue] = useState("created_at:desc");
  const [page, setPage] = useState(1);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Product | undefined>();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);
    return () => clearTimeout(t);
  }, [search]);

  const [sortBy, sortOrder] = sortValue.split(":") as [
    AdminProductFilters["sortBy"],
    AdminProductFilters["sortOrder"],
  ];

  const { data, isLoading } = useAdminProducts({
    search: debouncedSearch || undefined,
    categoryId: categoryId === "all" ? undefined : categoryId,
    sortBy,
    sortOrder,
    page,
    limit: PAGE_SIZE,
  });

  const items = data?.items ?? [];
  const totalPages = data?.totalPages ?? 0;
  const total = data?.total ?? 0;

  const handleEdit = (p: Product) => {
    setEditing(p);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setEditing(undefined);
  };

  let content;

  if (isLoading) {
    content = (
      <div className="p-6 space-y-3">
        {Array.from({ length: 8 }).map((_, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={i} className="h-14 bg-gray-50 rounded animate-pulse" />
        ))}
      </div>
    );
  } else if (items.length) {
    content = (
      <ProductsTable
        items={items}
        onEdit={handleEdit}
        onDelete={setDeletingId}
      />
    );
  } else {
    content = (
      <div className="p-12 text-center text-gray-400 text-[13px]">
        {search || categoryId !== "all"
          ? "Không tìm thấy sản phẩm nào"
          : "Chưa có sản phẩm nào"}
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sản phẩm</h1>
          <p className="text-[13px] text-gray-400 mt-1">{total} sản phẩm</p>
        </div>

        <Button onClick={() => setFormOpen(true)}>
          <Plus size={15} className="mr-1.5" />
          Thêm sản phẩm
        </Button>
      </div>

      <ProductFilters
        search={search}
        setSearch={setSearch}
        categoryId={categoryId}
        setCategoryId={setCategoryId}
        sortValue={sortValue}
        setSortValue={setSortValue}
        resetPage={() => setPage(1)}
      />

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {content}
      </div>

      {totalPages > 1 && (
        <Pagination page={page} totalPages={totalPages} setPage={setPage} />
      )}

      {formOpen && (
        <ProductFormDialog
          open={formOpen}
          onClose={handleCloseForm}
          editing={editing}
        />
      )}

      <DeleteProductDialog
        productId={deletingId}
        onClose={() => setDeletingId(null)}
      />
    </div>
  );
}
