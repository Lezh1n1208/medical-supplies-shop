"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { MessageSquare, X, CheckCircle, Loader2 } from "lucide-react";
import { usePublicCategories } from "@/hooks/use-public-categories";
import { useCreateQuoteRequest } from "@/hooks/use-public-quote-requests";

interface ContactItem {
  id: string;
  label: string;
  sublabel: string;
  href: string;
  color: string;
  ripple: string;
  iconSrc: string;
}

const contacts: ContactItem[] = [
  {
    id: "facebook",
    label: "Facebook",
    sublabel: "Nhắn tin ngay",
    href: "https://facebook.com",
    color: "#1877F2",
    ripple: "rgba(24,119,242,0.35)",
    iconSrc: "/social/facebook.png",
  },
  {
    id: "zalo",
    label: "Zalo",
    sublabel: "0983.498.177",
    href: "https://zalo.me/0983498177",
    color: "#0068FF",
    ripple: "rgba(0,104,255,0.35)",
    iconSrc: "/social/zalo.png",
  },
  {
    id: "maps",
    label: "Google Maps",
    sublabel: "Xem đường đi",
    href: "https://maps.google.com/?q=135/9+KP+Tan+Phu+2+Tan+Dong+Hiep+Ho+Chi+Minh",
    color: "#EA4335",
    ripple: "rgba(234,67,53,0.35)",
    iconSrc: "/social/google-maps.png",
  },
];

// ===== QUOTE PANEL =====
function QuotePanel({ onClose }: Readonly<{ onClose: () => void }>) {
  const { data: categories } = usePublicCategories();
  const {
    mutate: submitQuote,
    isPending,
    isSuccess,
    isError,
    error,
  } = useCreateQuoteRequest();

  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    category_id: "",
  });
  const [fieldErrors, setFieldErrors] = useState<{
    full_name?: string;
    phone?: string;
  }>({});

  const validate = () => {
    const errors: typeof fieldErrors = {};
    if (!form.full_name.trim()) errors.full_name = "Vui lòng nhập họ tên";
    if (!form.phone.trim()) errors.phone = "Vui lòng nhập số điện thoại";
    else if (!/^(0|\+84)\d{8,10}$/.test(form.phone))
      errors.phone = "Số điện thoại không hợp lệ";
    return errors;
  };

  const handleSubmit = () => {
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }
    setFieldErrors({});
    submitQuote({
      full_name: form.full_name.trim(),
      phone: form.phone.trim(),
      category_id: form.category_id || undefined,
    });
  };

  // Tự đóng sau 3s khi thành công
  useEffect(() => {
    if (!isSuccess) return;
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [isSuccess, onClose]);

  return (
    <div className="w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3"
        style={{ backgroundColor: "#00897B" }}
      >
        <div className="flex items-center gap-2">
          <MessageSquare size={14} className="text-white" />
          <span className="text-white font-bold text-[13px]">
            Báo giá nhanh
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-white/80 hover:text-white transition-colors"
        >
          <X size={15} />
        </button>
      </div>

      {/* Body */}
      <div className="p-4">
        {isSuccess ? (
          <div className="py-4 flex flex-col items-center text-center gap-2">
            <CheckCircle size={36} className="text-teal-500" />
            <p className="text-gray-800 font-bold text-[13px]">
              Gửi thành công!
            </p>
            <p className="text-gray-400 text-[11px]">
              Chúng tôi sẽ liên hệ trong giờ hành chính.
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            <p className="text-gray-400 text-[11px] mb-1">
              Phản hồi trong giờ hành chính
            </p>

            <div>
              <input
                type="text"
                placeholder="Họ và tên"
                value={form.full_name}
                onChange={(e) => {
                  setForm((v) => ({ ...v, full_name: e.target.value }));
                  setFieldErrors((v) => ({ ...v, full_name: undefined }));
                }}
                className="w-full px-3 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:border-teal-500 transition-all text-[12px]"
                style={{
                  borderColor: fieldErrors.full_name ? "#ef4444" : "#e5e7eb",
                }}
              />
              {fieldErrors.full_name && (
                <p className="text-red-500 mt-0.5 text-[10px]">
                  {fieldErrors.full_name}
                </p>
              )}
            </div>

            <div>
              <input
                type="tel"
                placeholder="Số điện thoại / Zalo"
                value={form.phone}
                onChange={(e) => {
                  setForm((v) => ({ ...v, phone: e.target.value }));
                  setFieldErrors((v) => ({ ...v, phone: undefined }));
                }}
                className="w-full px-3 py-2 border rounded-lg bg-gray-50 focus:outline-none focus:border-teal-500 transition-all text-[12px]"
                style={{
                  borderColor: fieldErrors.phone ? "#ef4444" : "#e5e7eb",
                }}
              />
              {fieldErrors.phone && (
                <p className="text-red-500 mt-0.5 text-[10px]">
                  {fieldErrors.phone}
                </p>
              )}
            </div>

            <select
              value={form.category_id}
              onChange={(e) =>
                setForm((v) => ({ ...v, category_id: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 focus:outline-none focus:border-teal-500 transition-all text-[12px]"
            >
              <option value="">-- Danh mục --</option>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            {isError && (
              <p className="text-red-500 text-center text-[10px]">
                {error?.message ?? "Có lỗi xảy ra, vui lòng thử lại"}
              </p>
            )}

            <button
              onClick={handleSubmit}
              disabled={isPending}
              className="w-full py-2 rounded-lg text-white font-semibold transition-all hover:opacity-90 flex items-center justify-center gap-1.5 disabled:opacity-60 disabled:cursor-not-allowed text-[12px]"
              style={{ backgroundColor: "#00897B" }}
            >
              {isPending ? (
                <>
                  <Loader2 size={12} className="animate-spin" /> Đang gửi...
                </>
              ) : (
                "Gửi yêu cầu"
              )}
            </button>

            <p className="text-center text-gray-400 text-[10px]">
              🔒 Thông tin được bảo mật tuyệt đối
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// ===== FLOATING CONTACTS =====
export function FloatingContacts() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [quoteOpen, setQuoteOpen] = useState(false);

  return (
    <>
      <style>{`
        @keyframes ripple-ring {
          0%   { transform: scale(1);   opacity: 0.6; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes shake {
          0%, 85%, 100% { transform: rotate(0deg); }
          88%            { transform: rotate(-18deg); }
          91%            { transform: rotate(16deg); }
          94%            { transform: rotate(-10deg); }
          97%            { transform: rotate(8deg); }
        }
        @keyframes tooltip-in {
          from { opacity: 0; transform: translateX(6px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes panel-in {
          from { opacity: 0; transform: translateY(8px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .float-btn { animation: shake 4s ease-in-out infinite; }
        .float-btn:nth-child(2) { animation-delay: 1.3s; }
        .float-btn:nth-child(3) { animation-delay: 2.6s; }
        .ripple-1 { animation: ripple-ring 2s ease-out infinite; }
        .ripple-2 { animation: ripple-ring 2s ease-out infinite 0.7s; }
        .float-tooltip { animation: tooltip-in 0.18s ease forwards; }
        .quote-panel { animation: panel-in 0.2s ease forwards; }
      `}</style>

      <aside
        className="fixed z-50 flex flex-col items-end gap-3"
        style={{ bottom: "24px", right: "20px" }}
        aria-label="Liên hệ nhanh"
      >
        {/* Quote panel — hiện phía trên các contact buttons */}
        {quoteOpen && (
          <div className="quote-panel mb-1">
            <QuotePanel onClose={() => setQuoteOpen(false)} />
          </div>
        )}

        {/* Quote button */}
        <div className="relative flex items-center justify-end">
          {hoveredId === "quote" && !quoteOpen && (
            <div className="float-tooltip absolute right-16 flex flex-col items-end pointer-events-none">
              <span
                className="text-white font-bold whitespace-nowrap rounded-lg px-3 py-1.5 shadow-lg"
                style={{
                  fontSize: "12px",
                  backgroundColor: "#00897B",
                  lineHeight: 1.4,
                }}
              >
                Báo giá nhanh
                <br />
                <span
                  style={{ fontSize: "10px", fontWeight: 400, opacity: 0.9 }}
                >
                  Phản hồi trong giờ hành chính
                </span>
              </span>
              <div
                style={{
                  width: 0,
                  height: 0,
                  borderTop: "5px solid transparent",
                  borderBottom: "5px solid transparent",
                  borderLeft: "6px solid #00897B",
                  position: "absolute",
                  right: "-6px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
            </div>
          )}

          <button
            onClick={() => setQuoteOpen((v) => !v)}
            onMouseEnter={() => setHoveredId("quote")}
            onMouseLeave={() => setHoveredId(null)}
            aria-label="Báo giá nhanh"
            className="relative flex items-center justify-center rounded-full shadow-xl transition-transform duration-150 hover:scale-110 active:scale-95"
            style={{
              width: "52px",
              height: "52px",
              backgroundColor: quoteOpen ? "#00695C" : "#00897B",
              boxShadow: "0 4px 18px rgba(0,137,123,0.4)",
              zIndex: 1,
            }}
          >
            {quoteOpen ? (
              <X size={22} className="text-white" />
            ) : (
              <MessageSquare size={22} className="text-white" />
            )}
          </button>
        </div>

        {/* Contact buttons */}
        {contacts.map((c) => (
          <div key={c.id} className="relative flex items-center justify-end">
            {hoveredId === c.id && (
              <div className="float-tooltip absolute right-16 flex flex-col items-end pointer-events-none">
                <span
                  className="text-white font-bold whitespace-nowrap rounded-lg px-3 py-1.5 shadow-lg"
                  style={{
                    fontSize: "12px",
                    backgroundColor: c.color,
                    lineHeight: 1.4,
                  }}
                >
                  {c.label}
                  <br />
                  <span
                    style={{ fontSize: "10px", fontWeight: 400, opacity: 0.9 }}
                  >
                    {c.sublabel}
                  </span>
                </span>
                <div
                  style={{
                    width: 0,
                    height: 0,
                    borderTop: "5px solid transparent",
                    borderBottom: "5px solid transparent",
                    borderLeft: `6px solid ${c.color}`,
                    position: "absolute",
                    right: "-6px",
                    top: "50%",
                    transform: "translateY(-50%)",
                  }}
                />
              </div>
            )}

            <div className="relative flex items-center justify-center float-btn">
              <span
                className="ripple-1 absolute inset-0 rounded-full pointer-events-none"
                style={{ backgroundColor: c.ripple }}
              />
              <span
                className="ripple-2 absolute inset-0 rounded-full pointer-events-none"
                style={{ backgroundColor: c.ripple }}
              />
              <a
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={c.label}
                onMouseEnter={() => setHoveredId(c.id)}
                onMouseLeave={() => setHoveredId(null)}
                className="relative flex items-center justify-center rounded-full shadow-xl transition-transform duration-150 hover:scale-110 active:scale-95"
                style={{
                  width: "52px",
                  height: "52px",
                  backgroundColor: c.color,
                  boxShadow: `0 4px 18px ${c.ripple}`,
                  zIndex: 1,
                }}
              >
                <Image
                  src={c.iconSrc}
                  alt={c.label}
                  width={50}
                  height={50}
                  className="object-contain"
                  style={{ padding: "4px" }}
                  unoptimized
                />
              </a>
            </div>
          </div>
        ))}
      </aside>
    </>
  );
}
