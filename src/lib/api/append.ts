/**
 * Append object data into FormData safely
 */
const appendFormData = (formData: FormData, data: Record<string, unknown>) => {
  Object.entries(data).forEach(([key, value]) => {
    if (value == null) return;

    if (value instanceof File) {
      formData.append(key, value);
      return;
    }

    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean"
    ) {
      formData.append(key, String(value));
      return;
    }

    if (typeof value === "object") {
      formData.append(key, JSON.stringify(value));
    }
  });
};
