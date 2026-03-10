export function slugify(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replaceAll(/[\u0300-\u036f]/g, "")
    .replaceAll("đ", "d")
    .replaceAll(/[^a-z0-9\s-]/g, "")
    .trim()
    .replaceAll(/\s+/g, "-");
}

export function formatPrice(n: number) {
  return new Intl.NumberFormat("vi-VN").format(n);
}

export function buildPagination(page: number, totalPages: number) {
  const pages: (number | "...")[] = [];

  for (let p = 1; p <= totalPages; p++) {
    if (p === 1 || p === totalPages || Math.abs(p - page) <= 1) {
      if (pages.length > 0) {
        const prev = pages.at(-1);
        if (typeof prev === "number" && p - prev > 1) {
          pages.push("...");
        }
      }
      pages.push(p);
    }
  }

  return pages;
}
