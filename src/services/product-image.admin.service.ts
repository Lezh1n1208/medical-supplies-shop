import { supabaseAdmin } from "@/lib/supabase/admin";
import { validateUploadFiles } from "@/lib/cloudinary/upload-validation";
import { ProductImageSchema } from "@/schemas/product-image.schema";
import { CloudinaryService } from "./cloudinary.service";
import { assertNoError } from "@/lib/supabase/assert";

export class ProductImageAdminService {
  // Upload nhiều ảnh và lưu vào DB
  static async uploadMany(productId: string, files: File[]) {
    // Validate
    const validation = validateUploadFiles(files);
    if (!validation.valid) {
      throw Object.assign(new Error("Validation failed"), {
        code: "VALIDATION_ERROR",
        details: validation.errors,
      });
    }

    // Lấy sort_order hiện tại cao nhất để tiếp nối
    const { data: existing } = await supabaseAdmin
      .from("product_images")
      .select("sort_order")
      .eq("product_id", productId)
      .order("sort_order", { ascending: false })
      .limit(1)
      .single();

    const startOrder = existing ? existing.sort_order + 1 : 0;

    // Upload song song lên Cloudinary
    const uploaded = await Promise.all(
      files.map(async (file) =>
        CloudinaryService.uploadBuffer(Buffer.from(await file.arrayBuffer()), {
          folder: "products",
        }),
      ),
    );

    // Ảnh đầu tiên là thumbnail nếu chưa có ảnh nào
    const { count } = await supabaseAdmin
      .from("product_images")
      .select("*", { count: "exact", head: true })
      .eq("product_id", productId);

    const hasExisting = (count ?? 0) > 0;

    // Insert vào DB
    const rows = uploaded.map((result, index) => ({
      product_id: productId,
      image_url: result.secure_url,
      public_id: result.public_id,
      width: result.width,
      height: result.height,
      format: result.format,
      bytes: result.bytes,
      is_thumbnail: !hasExisting && index === 0,
      sort_order: startOrder + index,
    }));

    const { data, error } = await supabaseAdmin
      .from("product_images")
      .insert(rows)
      .select();

    assertNoError(error);
    return ProductImageSchema.array().parse(data);
  }

  // Xóa 1 ảnh (DB + Cloudinary)
  static async deleteOne(imageId: string) {
    const { data, error } = await supabaseAdmin
      .from("product_images")
      .delete()
      .eq("id", imageId)
      .select()
      .single();

    assertNoError(error);

    // Xóa trên Cloudinary sau khi xóa DB thành công
    await CloudinaryService.delete(data.public_id);

    // Nếu ảnh bị xóa là thumbnail → tự động set thumbnail mới
    if (data.is_thumbnail) {
      await supabaseAdmin
        .from("product_images")
        .update({ is_thumbnail: true })
        .eq("product_id", data.product_id)
        .order("sort_order", { ascending: true })
        .limit(1);
    }

    return { success: true };
  }

  // Đổi thumbnail
  static async setThumbnail(productId: string, imageId: string) {
    // Bỏ thumbnail cũ
    const { error: clearError } = await supabaseAdmin
      .from("product_images")
      .update({ is_thumbnail: false })
      .eq("product_id", productId);

    assertNoError(clearError);

    // Set thumbnail mới
    const { data, error } = await supabaseAdmin
      .from("product_images")
      .update({ is_thumbnail: true })
      .eq("id", imageId)
      .eq("product_id", productId)
      .select()
      .single();

    assertNoError(error);
    return ProductImageSchema.parse(data);
  }

  // Xóa toàn bộ ảnh của 1 product (dùng khi delete product)
  static async deleteAllByProduct(productId: string) {
    const { data, error } = await supabaseAdmin
      .from("product_images")
      .delete()
      .eq("product_id", productId)
      .select();

    assertNoError(error);

    if (data && data.length > 0) {
      await Promise.all(
        data.map((img) => CloudinaryService.delete(img.public_id)),
      );
    }
  }

  static async getByProduct(productId: string) {
    const { data, error } = await supabaseAdmin
      .from("product_images")
      .select("*")
      .eq("product_id", productId)
      .order("sort_order", { ascending: true });

    assertNoError(error);
    return ProductImageSchema.array().parse(data);
  }
}
