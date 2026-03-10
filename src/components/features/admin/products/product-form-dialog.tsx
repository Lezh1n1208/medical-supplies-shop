"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus, Loader2, Star, X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { useAdminCategories } from "@/hooks/use-admin-categories";
import {
  useCreateProduct,
  useUpdateProduct,
  useProductImages,
  useDeleteProductImage,
  useSetThumbnail,
} from "@/hooks/use-admin-products";
import type { Product } from "@/schemas/product.schema";
import { slugify } from "@/utils/product.utils";

interface Props {
  open: boolean;
  onClose: () => void;
  editing?: Product;
}

export default function ProductFormDialog({
  open,
  onClose,
  editing,
}: Readonly<Props>) {
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

  const { data: existingImages = [], isLoading: loadingImages } =
    useProductImages(editing?.id);
  const { mutate: deleteImage, isPending: deletingImage } =
    useDeleteProductImage(editing?.id ?? "");
  const { mutate: setThumbnailImage } = useSetThumbnail(editing?.id ?? "");

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

  const renderExistingImages = () => {
    if (loadingImages) {
      return (
        <div className="flex gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              className="w-20 h-20 rounded-lg bg-gray-100 animate-pulse"
            />
          ))}
        </div>
      );
    }

    if (existingImages.length === 0) {
      return (
        <p className="text-[11px] text-gray-300 italic">Chưa có ảnh nào</p>
      );
    }

    return (
      <div className="flex flex-wrap gap-2">
        {existingImages.map((img) => (
          <div key={img.id} className="relative group w-20 h-20">
            <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-200 relative">
              <Image src={img.image_url} alt="" fill className="object-cover" />
            </div>

            {img.is_thumbnail && (
              <div className="absolute top-0.5 left-0.5 bg-amber-400 rounded-full p-0.5">
                <Star size={9} fill="white" className="text-white" />
              </div>
            )}

            <div className="absolute inset-0 bg-black/50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5">
              {!img.is_thumbnail && (
                <button
                  type="button"
                  onClick={() => setThumbnailImage(img.id)}
                  className="w-6 h-6 bg-amber-400 hover:bg-amber-500 rounded-full flex items-center justify-center transition-colors"
                  title="Đặt làm thumbnail"
                >
                  <Star size={10} fill="white" className="text-white" />
                </button>
              )}

              <button
                type="button"
                onClick={() => deleteImage(img.id)}
                disabled={deletingImage}
                className="w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-colors disabled:opacity-50"
                title="Xóa ảnh"
              >
                <X size={10} className="text-white" />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
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
          <div className="space-y-3">
            <Label>Ảnh sản phẩm</Label>

            {editing && (
              <div>
                <p className="text-[11px] text-gray-400 mb-1.5">Ảnh hiện tại</p>
                {renderExistingImages()}
              </div>
            )}

            <div>
              {editing && (
                <p className="text-[11px] text-gray-400 mb-1.5">Thêm ảnh mới</p>
              )}

              <div className="flex flex-wrap gap-2">
                {previews.map((src, i) => (
                  <div
                    // eslint-disable-next-line react/no-array-index-key
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
            </div>
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
