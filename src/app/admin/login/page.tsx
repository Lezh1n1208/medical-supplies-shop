"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async () => {
    if (!username || !password) {
      setError("Vui lòng nhập đầy đủ thông tin");
      return;
    }

    setIsPending(true);
    setError("");

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        setError("Tên đăng nhập hoặc mật khẩu không đúng");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setIsPending(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="min-h-screen bg-[#F1F5F9] flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
            <Image
              src="/logo.png"
              alt="Ánh Dương Phát"
              width={44}
              height={44}
              className="object-contain rounded-lg"
              priority
            />
          </div>

          <h1 className="text-2xl font-semibold text-gray-900">
            Ánh Dương Phát
          </h1>

          <p className="text-sm text-gray-400 mt-1">Đăng nhập trang quản trị</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-7 space-y-5">
          {/* Username */}
          <div className="space-y-2">
            <Label htmlFor="username" className="text-[13px]">
              Tên đăng nhập
            </Label>

            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="admin"
              autoComplete="username"
              autoFocus
              className="h-11"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-[13px]">
              Mật khẩu
            </Label>

            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="••••••••"
                autoComplete="current-password"
                className="h-11 pr-10"
              />

              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-[13px] bg-red-50 px-3 py-2 rounded-lg">
              {error}
            </p>
          )}

          {/* Button */}
          <Button
            className="w-full h-11 text-[15px]"
            onClick={handleSubmit}
            disabled={isPending}
          >
            {isPending && <Loader2 size={16} className="mr-2 animate-spin" />}
            Đăng nhập
          </Button>
        </div>
      </div>
    </div>
  );
}
