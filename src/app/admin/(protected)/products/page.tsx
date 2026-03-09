"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  ImageIcon,
  Search,
  Star,
  Tag,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

import type { Product } from "@/schemas/product.schema";
import { useAdminCategories } from "@/hooks/use-admin-categories";
import {
  useAdminProducts,
  useCreateProduct,
  useDeleteProduct,
  useUpdateProduct,
} from "@/hooks/use-admin-products";
import { AdminProductFilters } from "@/services/product.admin.service";
import { useQueryClient } from "@tanstack/react-query";

// ===== HELPERS =====
function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function formatPrice(n: number) {
  return new Intl.NumberFormat("vi-VN").format(n);
}

// ===== PRODUCT FORM DIALOG =====
interface ProductFormDialogProps {
  open: boolean;
  onClose: () => void;
  editing?: Product;
}

function ProductFormDialog({ open, onClose, editing }: ProductFormDialogProps) {
  const { data: categories } = useAdminCategories();
  const { mutate: create, isPending: creating } = useCreateProduct();
  const { mutate: update, isPending: updating } = useUpdateProduct();
  const isPending = creating || updating;

  const [name, setName] = useState(editing?.name ?? "");
  const [slug, setSlug] = useState(editing?.slug ?? "");
  const [description, setDescription] = useState(editing?.description ?? "");
  const [categoryId, setCategoryId] = useState(editing?.category_id ?? "");
  const [priceType, setPriceType] = useState<"FIXED" | "CONTACT">(
    editing?.price_type ?? "FIXED",
  );
  const [price, setPrice] = useState(editing?.price?.toString() ?? "");
  const [salePrice, setSalePrice] = useState(
    editing?.sale_price?.toString() ?? "",
  );
  const [isBestSeller, setIsBestSeller] = useState(
    editing?.is_best_seller ?? false,
  );
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const handleNameChange = (v: string) => {
    setName(v);
    if (!editing) setSlug(slugify(v));
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files ?? []);
    setFiles(selected);
    setPreviews(selected.map((f) => URL.createObjectURL(f)));
  };

  const handleSubmit = () => {
    const data = {
      name,
      slug,
      description: description || undefined,
      category_id: categoryId || undefined,
      price_type: priceType,
      price: priceType === "FIXED" && price ? Number(price) : undefined,
      sale_price:
        priceType === "FIXED" && salePrice ? Number(salePrice) : undefined,
      is_best_seller: isBestSeller,
    };

    if (editing) {
      update(
        { id: editing.id, data, files: files.length > 0 ? files : undefined },
        { onSuccess: onClose },
      );
    } else {
      create({ data, files }, { onSuccess: onClose });
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editing ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Ảnh */}
          <div className="space-y-2">
            <Label>Ảnh sản phẩm</Label>
            <div className="flex flex-wrap gap-2">
              {previews.map((src, i) => (
                <div
                  key={i}
                  className="w-20 h-20 rounded-lg overflow-hidden relative border border-gray-200"
                >
                  <Image src={src} alt="" fill className="object-cover" />
                </div>
              ))}
              <Label
                htmlFor="product-files"
                className="w-20 h-20 rounded-lg border-2 border-dashed border-gray-200 flex flex-col items-center justify-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all text-gray-400 hover:text-blue-500"
              >
                <Plus size={18} />
                <span className="text-[10px] mt-0.5">Thêm ảnh</span>
              </Label>
              <input
                id="product-files"
                type="file"
                accept="image/jpeg,image/png,image/webp"
                multiple
                className="hidden"
                onChange={handleFiles}
              />
            </div>
            {editing && files.length === 0 && (
              <p className="text-[11px] text-gray-400">
                Để trống nếu không muốn thay đổi ảnh
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-1.5">
              <Label>Tên sản phẩm</Label>
              <Input
                value={name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="Băng gạc vô trùng..."
              />
            </div>

            <div className="col-span-2 space-y-1.5">
              <Label>Slug</Label>
              <Input value={slug} onChange={(e) => setSlug(e.target.value)} />
            </div>

            <div className="space-y-1.5">
              <Label>Danh mục</Label>
              <Select value={categoryId} onValueChange={setCategoryId}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1.5">
              <Label>Loại giá</Label>
              <Select
                value={priceType}
                onValueChange={(v) => setPriceType(v as "FIXED" | "CONTACT")}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FIXED">Giá cố định</SelectItem>
                  <SelectItem value="CONTACT">Liên hệ báo giá</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {priceType === "FIXED" && (
              <>
                <div className="space-y-1.5">
                  <Label>Giá gốc (đ)</Label>
                  <Input
                    type="number"
                    min={0}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="150000"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label>Giá khuyến mãi (đ)</Label>
                  <Input
                    type="number"
                    min={0}
                    value={salePrice}
                    onChange={(e) => setSalePrice(e.target.value)}
                    placeholder="Để trống nếu không có"
                  />
                </div>
              </>
            )}

            <div className="col-span-2 space-y-1.5">
              <Label>Mô tả</Label>
              <Textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                placeholder="Mô tả sản phẩm..."
              />
            </div>

            <div className="col-span-2 flex items-center justify-between py-1 px-3 bg-gray-50 rounded-lg">
              <div>
                <p className="text-[13px] font-medium text-gray-700">
                  Sản phẩm bán chạy
                </p>
                <p className="text-[11px] text-gray-400">
                  Hiển thị badge "Bán chạy" trên card
                </p>
              </div>
              <Switch
                checked={isBestSeller}
                onCheckedChange={setIsBestSeller}
              />
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            Hủy
          </Button>
          <Button onClick={handleSubmit} disabled={isPending || !name || !slug}>
            {isPending && <Loader2 size={14} className="mr-2 animate-spin" />}
            {editing ? "Lưu thay đổi" : "Tạo sản phẩm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const PAGE_SIZE = 20;

const SORT_OPTIONS = [
  {
    value: "created_at:desc",
    label: "Mới nhất",
    sortBy: "created_at",
    sortOrder: "desc",
  },
  {
    value: "created_at:asc",
    label: "Cũ nhất",
    sortBy: "created_at",
    sortOrder: "asc",
  },
  { value: "name:asc", label: "Tên A → Z", sortBy: "name", sortOrder: "asc" },
  { value: "name:desc", label: "Tên Z → A", sortBy: "name", sortOrder: "desc" },
  {
    value: "price:asc",
    label: "Giá thấp → cao",
    sortBy: "price",
    sortOrder: "asc",
  },
  {
    value: "price:desc",
    label: "Giá cao → thấp",
    sortBy: "price",
    sortOrder: "desc",
  },
] as const satisfies Array<{
  value: string;
  label: string;
  sortBy: AdminProductFilters["sortBy"];
  sortOrder: AdminProductFilters["sortOrder"];
}>;

type SortValue = (typeof SORT_OPTIONS)[number]["value"];

// ===== MAIN PAGE =====
export default function AdminProductsPage() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [categoryId, setCategoryId] = useState("all");
  const [sortValue, setSortValue] = useState<SortValue>("created_at:desc");
  const [page, setPage] = useState(1);
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Product | undefined>();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Debounce search — reset page khi search thay đổi
  useEffect(() => {
    const t = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 300);
    return () => clearTimeout(t);
  }, [search]);

  const activeSort = SORT_OPTIONS.find((o) => o.value === sortValue)!;

  const { data: categories } = useAdminCategories();
  const { data, isLoading } = useAdminProducts({
    search: debouncedSearch || undefined,
    categoryId: categoryId !== "all" ? categoryId : undefined,
    sortBy: activeSort.sortBy,
    sortOrder: activeSort.sortOrder,
    page,
    limit: PAGE_SIZE,
  });
  const { mutate: deleteProduct } = useDeleteProduct();

  const items = data?.items ?? [];
  const totalPages = data?.totalPages ?? 0;
  const total = data?.total ?? 0;

  const queryClient = useQueryClient();

  const handleEdit = (p: Product) => {
    setEditing(p);
    setFormOpen(true);
  };
  const handleCloseForm = () => {
    setFormOpen(false);
    setEditing(undefined);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
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

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <Input
            className="pl-8"
            placeholder="Tìm sản phẩm..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Category */}
        <Select
          value={categoryId}
          onValueChange={(v) => {
            setCategoryId(v);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Danh mục" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tất cả danh mục</SelectItem>
            {categories?.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Sort */}
        <Select
          value={sortValue}
          onValueChange={(v) => {
            setSortValue(v as SortValue);
            setPage(1);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>
                {opt.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-6 space-y-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-14 bg-gray-50 rounded animate-pulse" />
            ))}
          </div>
        ) : !items.length ? (
          <div className="p-12 text-center text-gray-400 text-[13px]">
            {search || categoryId !== "all"
              ? "Không tìm thấy sản phẩm nào"
              : "Chưa có sản phẩm nào"}
          </div>
        ) : (
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
                <tr
                  key={p.id}
                  className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 relative">
                        <ImageIcon
                          size={16}
                          className="absolute inset-0 m-auto text-gray-300"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 line-clamp-1">
                          {p.name}
                        </p>
                        <p className="text-gray-400 text-[11px] font-mono">
                          {p.slug}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 hidden md:table-cell">
                    {p.price_type === "CONTACT" ? (
                      <span className="text-purple-600 font-medium">
                        Liên hệ
                      </span>
                    ) : (
                      <div>
                        <span className="font-medium text-gray-800">
                          {formatPrice(p.sale_price ?? p.price ?? 0)}đ
                        </span>
                        {p.sale_price != null && p.price != null && (
                          <span className="text-gray-400 line-through ml-2 text-[11px]">
                            {formatPrice(p.price)}đ
                          </span>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-3 hidden lg:table-cell">
                    <div className="flex items-center gap-1 text-amber-400">
                      <Star size={12} fill="currentColor" />
                      <span className="text-gray-600 text-[12px]">
                        {p.rating?.toFixed(1)}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3 hidden lg:table-cell">
                    <div className="flex gap-1">
                      {p.is_best_seller && (
                        <Badge
                          variant="secondary"
                          className="text-[10px] gap-1 bg-blue-50 text-blue-600"
                        >
                          <Trophy size={9} />
                          Bán chạy
                        </Badge>
                      )}
                      {p.sale_price != null && (
                        <Badge
                          variant="secondary"
                          className="text-[10px] gap-1 bg-red-50 text-red-600"
                        >
                          <Tag size={9} />
                          Khuyến mãi
                        </Badge>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleEdit(p)}
                      >
                        <Pencil size={13} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-red-400 hover:text-red-600 hover:bg-red-50"
                        onClick={() => setDeletingId(p.id)}
                      >
                        <Trash2 size={13} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center mt-4 text-[13px] text-gray-500">
          <div className="flex gap-1.5">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
            >
              ← Trước
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter(
                (p) => p === 1 || p === totalPages || Math.abs(p - page) <= 1,
              )
              .reduce<(number | "...")[]>((acc, p, i, arr) => {
                if (i > 0 && p - (arr[i - 1] as number) > 1) acc.push("...");
                acc.push(p);
                return acc;
              }, [])
              .map((p, i) =>
                p === "..." ? (
                  <span key={`ellipsis-${i}`} className="px-2 py-1">
                    …
                  </span>
                ) : (
                  <Button
                    key={p}
                    variant={p === page ? "default" : "outline"}
                    size="sm"
                    className="w-8"
                    onClick={() => setPage(p as number)}
                  >
                    {p}
                  </Button>
                ),
              )}
            <Button
              variant="outline"
              size="sm"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
            >
              Tiếp →
            </Button>
          </div>
        </div>
      )}

      {/* Form dialog */}
      {formOpen && (
        <ProductFormDialog
          open={formOpen}
          onClose={handleCloseForm}
          editing={editing}
        />
      )}

      {/* Delete confirm */}
      <AlertDialog
        open={!!deletingId}
        onOpenChange={(v) => !v && setDeletingId(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xóa sản phẩm?</AlertDialogTitle>
            <AlertDialogDescription>
              Toàn bộ ảnh của sản phẩm sẽ bị xóa khỏi Cloudinary. Hành động này
              không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600"
              onClick={() => {
                if (deletingId) {
                  deleteProduct(deletingId);
                  setDeletingId(null);
                }
              }}
            >
              Xóa
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
