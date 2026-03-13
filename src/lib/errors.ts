export class AppError extends Error {
  constructor(
    message: string,
    public readonly code: string,
    public readonly status: number,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = "AppError";
  }

  static notFound(message = "Không tìm thấy") {
    return new AppError(message, "NOT_FOUND", 404);
  }

  static conflict(message: string) {
    return new AppError(message, "CONFLICT", 409);
  }

  static validation(message: string, details?: unknown) {
    return new AppError(message, "VALIDATION_ERROR", 422, details);
  }

  static badRequest(message: string) {
    return new AppError(message, "BAD_REQUEST", 400);
  }

  static internal(message = "Đã xảy ra lỗi, vui lòng thử lại") {
    return new AppError(message, "INTERNAL", 500);
  }
}
