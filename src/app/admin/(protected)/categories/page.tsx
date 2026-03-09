"use client";
import { useState } from "react";
import Image from "next/image";
import { Plus, Pencil, Trash2, Loader2, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

import type { Category } from "@/schemas/category.schema";
import {
  useAdminCategories,
  useCreateCategory,
  useDeleteCategory,
  useUpdateCategory,
} from "@/hooks/use-admin-categories";

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

// ===== FORM DIALOG =====
interface CategoryFormDialogProps {
  open: boolean;
  onClose: () => void;
  editing?: Category;
}

function CategoryFormDialog({
  open,
  onClose,
  editing,
}: CategoryFormDialogProps) {
  const { mutate: create, isPending: creating } = useCreateCategory();
  const { mutate: update, isPending: updating } = useUpdateCategory();
  const isPending = creating || updating;

  const [name, setName] = useState(editing?.name ?? "");
  const [slug, setSlug] = useState(editing?.slug ?? "");
  const [displayOrder, setDisplayOrder] = useState(
    editing?.display_order?.toString() ?? "0",
  );
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(
    editing?.thumbnail_url ?? null,
  );

  const handleNameChange = (v: string) => {
    setName(v);
    if (!editing) setSlug(slugify(v));
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setThumbnail(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = () => {
    const data = {
      name,
      slug,
      display_order: Number(displayOrder),
    };

    if (editing) {
      update(
        { id: editing.id, data, thumbnail: thumbnail ?? undefined },
        { onSuccess: onClose },
      );
    } else {
      create(
        { data, thumbnail: thumbnail ?? undefined },
        { onSuccess: onClose },
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {editing ? "Chỉnh sửa danh mục" : "Thêm danh mục mới"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Thumbnail */}
          <div className="flex flex-col items-center gap-3">
            <div className="w-24 h-24 rounded-xl border-2 border-dashed border-gray-200 overflow-hidden flex items-center justify-center bg-gray-50 relative">
              {preview ? (
                <Image
                  src={preview}
                  alt="preview"
                  fill
                  className="object-cover"
                />
              ) : (
                <ImageIcon size={28} className="text-gray-300" />
              )}
            </div>
            <Label
              htmlFor="thumbnail"
              className="text-[12px] text-blue-600 cursor-pointer hover:underline"
            >
              {preview ? "Đổi ảnh" : "Chọn ảnh thumbnail"}
            </Label>
            <input
              id="thumbnail"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={handleFile}
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="name">Tên danh mục</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => handleNameChange(e.target.value)}
              placeholder="Vật tư tiêu hao"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="vat-tu-tieu-hao"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="order">Thứ tự hiển thị</Label>
            <Input
              id="order"
              type="number"
              min={0}
              value={displayOrder}
              onChange={(e) => setDisplayOrder(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isPending}>
            Hủy
          </Button>
          <Button onClick={handleSubmit} disabled={isPending || !name || !slug}>
            {isPending && <Loader2 size={14} className="mr-2 animate-spin" />}
            {editing ? "Lưu thay đổi" : "Tạo danh mục"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ===== MAIN PAGE =====
export default function AdminCategoriesPage() {
  const { data: categories, isLoading } = useAdminCategories();
  const { mutate: deleteCategory } = useDeleteCategory();

  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<Category | undefined>();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleEdit = (cat: Category) => {
    setEditing(cat);
    setFormOpen(true);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setEditing(undefined);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Danh mục</h1>
          <p className="text-[13px] text-gray-400 mt-1">
            {categories?.length ?? 0} danh mục
          </p>
        </div>
        <Button onClick={() => setFormOpen(true)}>
          <Plus size={15} className="mr-1.5" />
          Thêm danh mục
        </Button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="p-6 space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-14 bg-gray-50 rounded animate-pulse" />
            ))}
          </div>
        ) : !categories?.length ? (
          <div className="p-12 text-center text-gray-400 text-[13px]">
            Chưa có danh mục nào. Thêm danh mục đầu tiên!
          </div>
        ) : (
          <table className="w-full text-[13px]">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/50">
                <th className="text-left px-5 py-3 text-gray-400 font-medium">
                  Danh mục
                </th>
                <th className="text-left px-5 py-3 text-gray-400 font-medium">
                  Slug
                </th>
                <th className="text-center px-5 py-3 text-gray-400 font-medium">
                  Thứ tự
                </th>
                <th className="text-right px-5 py-3 text-gray-400 font-medium">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat: any) => (
                <tr
                  key={cat.id}
                  className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
                >
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 relative">
                        {cat.thumbnail_url ? (
                          <Image
                            src={cat.thumbnail_url}
                            alt={cat.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageIcon size={14} className="text-gray-300" />
                          </div>
                        )}
                      </div>
                      <span className="font-medium text-gray-800">
                        {cat.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-400 font-mono text-[12px]">
                    {cat.slug}
                  </td>
                  <td className="px-5 py-3 text-center text-gray-500">
                    {cat.display_order}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0"
                        onClick={() => handleEdit(cat)}
                      >
                        <Pencil size={13} />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-red-400 hover:text-red-600 hover:bg-red-50"
                        onClick={() => setDeletingId(cat.id)}
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

      {/* Form dialog */}
      {formOpen && (
        <CategoryFormDialog
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
            <AlertDialogTitle>Xóa danh mục?</AlertDialogTitle>
            <AlertDialogDescription>
              Hành động này không thể hoàn tác. Các sản phẩm thuộc danh mục này
              sẽ không còn liên kết.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 hover:bg-red-600"
              onClick={() => {
                if (deletingId) {
                  deleteCategory(deletingId);
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
