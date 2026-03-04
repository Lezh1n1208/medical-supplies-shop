"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6 text-center">
      <h1 className="text-6xl font-bold text-gray-900">404</h1>

      <h2 className="mt-4 text-2xl font-semibold text-gray-700">
        Trang không tồn tại
      </h2>

      <p className="mt-3 max-w-md text-gray-500">
        Có thể đường dẫn bạn nhập sai hoặc trang đã bị xóa.
      </p>

      <div className="mt-6 flex gap-4">
        <Link
          href="/"
          className="rounded-lg bg-black px-5 py-2 text-white transition hover:bg-gray-800"
        >
          Về trang chủ
        </Link>

        <button
          onClick={() => globalThis.history.back()}
          className="rounded-lg border px-5 py-2 transition hover:bg-gray-100"
        >
          Quay lại
        </button>
      </div>
    </div>
  );
}
