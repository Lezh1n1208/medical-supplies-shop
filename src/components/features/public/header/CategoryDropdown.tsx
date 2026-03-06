"use client";

import Link from "next/link";
import Image from "next/image";
import { usePublicCategories } from "@/hooks/use-public-categories";

interface CategoryDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CategoryDropdown({
  isOpen,
  onClose,
}: Readonly<CategoryDropdownProps>) {
  const { data: categories = [], isLoading } = usePublicCategories();

  if (!isOpen) return null;

  const sortedCategories = [...categories].sort(
    (a, b) => (a.display_order ?? 0) - (b.display_order ?? 0),
  );

  const renderContent = () => {
    if (isLoading) {
      return <div className="px-4 py-3 text-sm text-gray-500">Đang tải...</div>;
    }

    if (sortedCategories.length === 0) {
      return (
        <div className="px-4 py-3 text-sm text-gray-500">Không có danh mục</div>
      );
    }

    return sortedCategories.map((cat) => (
      <Link
        key={cat.id}
        href={`/san-pham?categorySlug=${cat.slug}`}
        onClick={onClose}
        className="flex items-center gap-2 px-4 py-2.5 text-gray-700 hover:bg-blue-50 hover:text-blue-700 text-[13px] transition-colors"
      >
        {cat.thumbnail_url && (
          <Image
            src={cat.thumbnail_url}
            alt={cat.name}
            width={24}
            height={24}
            className="object-contain rounded"
          />
        )}
        {cat.name}
      </Link>
    ));
  };

  return (
    <div className="absolute top-full left-0 mt-1 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
      {renderContent()}
    </div>
  );
}
