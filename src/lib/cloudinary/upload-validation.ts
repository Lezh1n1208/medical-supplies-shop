const ALLOWED_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_FILE_COUNT = 10;

export interface ValidationError {
  file: string;
  reason: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationError[];
}

export function validateUploadFiles(files: File[]): ValidationResult {
  const errors: ValidationError[] = [];

  if (files.length === 0) {
    return {
      valid: false,
      errors: [{ file: "_", reason: "No files provided" }],
    };
  }

  if (files.length > MAX_FILE_COUNT) {
    return {
      valid: false,
      errors: [
        {
          file: "_",
          reason: `Too many files. Maximum is ${MAX_FILE_COUNT}, received ${files.length}`,
        },
      ],
    };
  }

  for (const file of files) {
    if (!ALLOWED_MIME_TYPES.has(file.type)) {
      errors.push({
        file: file.name,
        reason: `Invalid type "${file.type}". Allowed: jpeg, png, webp`,
      });
    }

    if (file.size > MAX_FILE_SIZE) {
      errors.push({
        file: file.name,
        reason: `File too large (${(file.size / 1024 / 1024).toFixed(2)}MB). Maximum is 5MB`,
      });
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
