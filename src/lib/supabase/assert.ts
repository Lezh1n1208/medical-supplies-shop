import { AppError } from "@/lib/errors";

interface SupabaseError {
  message: string;
  code?: string;
  details?: string | null;
  hint?: string | null;
}

// Map theo Postgres error code (unique constraint, FK, ...)
const POSTGRES_CODE_MAP: Record<string, () => AppError> = {
  "23505": () =>
    AppError.conflict("Dữ liệu đã tồn tại (slug hoặc tên bị trùng)"),
  "23503": () => AppError.badRequest("Dữ liệu tham chiếu không hợp lệ"),
  "23502": () => AppError.badRequest("Thiếu trường bắt buộc"),
  PGRST116: () => AppError.notFound(),
};

// Map theo tên CHECK constraint (code 23514)
const CHECK_CONSTRAINT_MAP: Record<string, string> = {
  products_price_logic_check:
    "Giá sản phẩm không hợp lệ: loại giá 'Cố định' phải có giá, loại 'Liên hệ' không được nhập giá",
  products_sale_price_logic_check:
    "Giá khuyến mãi không hợp lệ: phải nhỏ hơn hoặc bằng giá gốc",
};

export function assertNoError(error: SupabaseError | null): void {
  if (!error) return;

  // CHECK constraint violation — phân biệt bằng tên constraint trong message
  if (error.code === "23514") {
    const matched = Object.keys(CHECK_CONSTRAINT_MAP).find((name) =>
      error.message.includes(name),
    );
    throw AppError.badRequest(
      matched
        ? CHECK_CONSTRAINT_MAP[matched]
        : "Dữ liệu vi phạm ràng buộc của hệ thống",
    );
  }

  const factory = error.code ? POSTGRES_CODE_MAP[error.code] : undefined;
  if (factory) throw factory();

  console.error("[Supabase Error]", error);
  throw AppError.internal();
}
