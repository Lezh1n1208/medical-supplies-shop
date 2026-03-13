import { validateUploadFiles } from "@/lib/cloudinary/upload-validation";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { assertNoError } from "@/lib/supabase/assert";
import {
  CategorySchema,
  CreateCategorySchema,
  UpdateCategorySchema,
} from "@/schemas/category.schema";
import { CloudinaryService } from "./cloudinary.service";
import { AppError } from "@/lib/errors";

/* ========================
   SERVICE
======================== */
export class CategoryAdminService {
  static async getAll() {
    const { data, error } = await supabaseAdmin
      .from("categories")
      .select()
      .order("display_order", { ascending: true });

    assertNoError(error);
    return CategorySchema.array().parse(data);
  }

  static async getById(id: string) {
    const { data, error } = await supabaseAdmin
      .from("categories")
      .select()
      .eq("id", id)
      .single();

    assertNoError(error);
    return CategorySchema.parse(data);
  }

  static async create(data: unknown, thumbnail?: File) {
    // 1. Upload thumbnail trước nếu có — để nếu lỗi thì không tạo category
    let thumbnailData: {
      thumbnail_url: string;
      thumbnail_public_id: string;
    } | null = null;

    if (thumbnail) {
      const validation = validateUploadFiles([thumbnail]);
      if (!validation.valid) {
        throw AppError.validation(
          "Ảnh thumbnail không hợp lệ",
          validation.errors,
        );
      }

      let uploaded;
      try {
        uploaded = await CloudinaryService.uploadBuffer(
          Buffer.from(await thumbnail.arrayBuffer()),
          { folder: "categories" },
        );
      } catch {
        throw AppError.internal("Tải ảnh thumbnail thất bại, vui lòng thử lại");
      }

      thumbnailData = {
        thumbnail_url: uploaded.secure_url,
        thumbnail_public_id: uploaded.public_id,
      };
    }

    // 2. Parse + merge thumbnail vào data
    const parsed = CreateCategorySchema.parse({
      ...(data as Record<string, unknown>),
      ...thumbnailData,
    });

    // 3. Insert
    const { data: result, error } = await supabaseAdmin
      .from("categories")
      .insert(parsed)
      .select()
      .single();

    assertNoError(error);
    return CategorySchema.parse(result);
  }

  static async update(id: string, data: unknown, thumbnail?: File) {
    // 1. Upload thumbnail mới nếu có
    let thumbnailData: {
      thumbnail_url: string;
      thumbnail_public_id: string;
    } | null = null;

    if (thumbnail) {
      const validation = validateUploadFiles([thumbnail]);
      if (!validation.valid) {
        throw AppError.validation(
          "Ảnh thumbnail không hợp lệ",
          validation.errors,
        );
      }

      // Lấy public_id cũ để xóa sau khi upload mới thành công
      const { data: existing } = await supabaseAdmin
        .from("categories")
        .select("thumbnail_public_id")
        .eq("id", id)
        .single();

      let uploaded;
      try {
        uploaded = await CloudinaryService.uploadBuffer(
          Buffer.from(await thumbnail.arrayBuffer()),
          { folder: "categories" },
        );
      } catch {
        throw AppError.internal(
          "Cập nhật ảnh thumbnail thất bại, vui lòng thử lại",
        );
      }

      thumbnailData = {
        thumbnail_url: uploaded.secure_url,
        thumbnail_public_id: uploaded.public_id,
      };

      // Xóa ảnh cũ trên Cloudinary sau khi upload mới thành công
      if (existing?.thumbnail_public_id) {
        try {
          await CloudinaryService.delete(existing.thumbnail_public_id);
        } catch (err) {
          console.error("[Category] Failed to delete old thumbnail:", err);
        }
      }
    }

    // 2. Parse + merge
    const parsed = UpdateCategorySchema.parse({
      ...(data as Record<string, unknown>),
      ...thumbnailData,
    });

    // 3. Update
    const { data: result, error } = await supabaseAdmin
      .from("categories")
      .update(parsed)
      .eq("id", id)
      .select()
      .single();

    assertNoError(error);
    return CategorySchema.parse(result);
  }

  static async delete(id: string) {
    // Lấy thumbnail_public_id trước khi xóa
    const { data: existing } = await supabaseAdmin
      .from("categories")
      .select("thumbnail_public_id")
      .eq("id", id)
      .single();

    const { error } = await supabaseAdmin
      .from("categories")
      .delete()
      .eq("id", id);

    assertNoError(error);

    // Xóa ảnh trên Cloudinary sau khi xóa DB thành công
    if (existing?.thumbnail_public_id) {
      try {
        await CloudinaryService.delete(existing.thumbnail_public_id);
      } catch (err) {
        console.error("[Category] Failed to delete thumbnail:", err);
      }
    }

    return { success: true };
  }
}
