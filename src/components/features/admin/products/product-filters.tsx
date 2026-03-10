"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { useAdminCategories } from "@/hooks/use-admin-categories";

const SORT_OPTIONS = [
  { value: "created_at:desc", label: "Mới nhất" },
  { value: "created_at:asc", label: "Cũ nhất" },
  { value: "name:asc", label: "Tên A → Z" },
  { value: "name:desc", label: "Tên Z → A" },
  { value: "price:asc", label: "Giá thấp → cao" },
  { value: "price:desc", label: "Giá cao → thấp" },
];

interface Props {
  search: string;
  setSearch: (v: string) => void;

  categoryId: string;
  setCategoryId: (v: string) => void;

  sortValue: string;
  setSortValue: (v: string) => void;

  resetPage: () => void;
}

export default function ProductFilters({
  search,
  setSearch,
  categoryId,
  setCategoryId,
  sortValue,
  setSortValue,
  resetPage,
}: Readonly<Props>) {
  const { data: categories } = useAdminCategories();

  return (
    <div className="flex flex-wrap gap-3 mb-4">
      {/* Search */}
      <div className="relative flex-1 min-w-[200px] max-w-sm">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <Input
          className="pl-8"
          placeholder="Tìm sản phẩm..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            resetPage();
          }}
        />
      </div>

      {/* Category */}
      <Select
        value={categoryId}
        onValueChange={(v) => {
          setCategoryId(v);
          resetPage();
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Danh mục" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">Tất cả danh mục</SelectItem>

          {categories?.map((cat) => (
            <SelectItem key={cat.id} value={cat.id}>
              {cat.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Sort */}
      <Select
        value={sortValue}
        onValueChange={(v) => {
          setSortValue(v);
          resetPage();
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>

        <SelectContent>
          {SORT_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
