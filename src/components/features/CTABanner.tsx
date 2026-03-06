"use client";

import { useState } from "react";
import {
  Phone,
  Send,
  CheckCircle,
  Headphones,
  Clock,
  Shield,
} from "lucide-react";

export function CTABanner() {
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    product: "",
  });

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (form.name && form.phone) {
      setSubmitted(true);

      setTimeout(() => {
        setSubmitted(false);
      }, 4000);

      setForm({
        name: "",
        phone: "",
        product: "",
      });
    }
  };

  return (
    <section
      id="contact"
      className="py-16 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #00897B 0%, #00695C 40%, #004D40 100%)",
      }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        {new Array(20).fill(null).map((_, i) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={`circle-${i}`}
            className="absolute rounded-full"
            style={{
              width: `${40 + (i % 5) * 30}px`,
              height: `${40 + (i % 5) * 30}px`,
              backgroundColor: "#fff",
              left: `${(i * 17) % 100}%`,
              top: `${(i * 23) % 100}%`,
              opacity: 0.3,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          {/* LEFT CONTENT */}
          <div className="text-white">
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-5"
              style={{
                backgroundColor: "rgba(255,255,255,0.15)",
                fontSize: "12px",
                fontWeight: 600,
              }}
            >
              <div className="w-2 h-2 rounded-full bg-yellow-300 animate-pulse" />
              Tư vấn miễn phí — Phản hồi trong 30 phút
            </div>

            <h2
              className="text-white mb-4"
              style={{
                fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
                fontWeight: 800,
                lineHeight: 1.2,
              }}
            >
              Cần Tư Vấn Thiết Bị
              <br />
              <span style={{ color: "#FCD34D" }}>Y Tế Chuyên Nghiệp?</span>
            </h2>

            <p
              className="text-green-100 mb-7"
              style={{ fontSize: "15px", lineHeight: 1.8 }}
            >
              Đội ngũ chuyên gia y tế với hơn 15 năm kinh nghiệm sẵn sàng hỗ trợ
              bạn lựa chọn thiết bị phù hợp, tư vấn đấu thầu và cung cấp giải
              pháp trọn gói.
            </p>

            {/* Feature list */}
            <div className="space-y-3">
              {[
                {
                  icon: <Headphones size={16} />,
                  text: "Tư vấn 1-1 với chuyên gia, hoàn toàn miễn phí",
                },
                {
                  icon: <Clock size={16} />,
                  text: "Báo giá chi tiết trong vòng 2 giờ làm việc",
                },
                {
                  icon: <Shield size={16} />,
                  text: "Cam kết hàng chính hãng, đầy đủ CO/CQ & bảo hành",
                },
              ].map((item, index) => (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={`feature-${index}`}
                  className="flex items-center gap-3"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                  >
                    {item.icon}
                  </div>

                  <span className="text-green-50" style={{ fontSize: "14px" }}>
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Hotline */}
            <a
              href="tel:18001234"
              className="inline-flex items-center gap-3 mt-7 px-5 py-3 rounded-xl border-2 border-white/30 text-white hover:bg-white/10 transition-all"
            >
              <div className="w-9 h-9 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                <Phone size={16} style={{ color: "#00897B" }} />
              </div>

              <div>
                <p
                  style={{
                    fontSize: "11px",
                    color: "rgba(255,255,255,0.7)",
                    fontWeight: 500,
                  }}
                >
                  Gọi ngay hotline
                </p>

                <p
                  style={{
                    fontSize: "18px",
                    fontWeight: 800,
                    letterSpacing: "0.03em",
                  }}
                >
                  0983 498 177
                </p>
              </div>
            </a>
          </div>

          {/* RIGHT FORM */}
          <div className="bg-white rounded-2xl p-7 shadow-2xl">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{ backgroundColor: "#ECFDF5" }}
                >
                  <CheckCircle size={32} style={{ color: "#00897B" }} />
                </div>

                <h3
                  className="text-gray-800 mb-2"
                  style={{ fontSize: "1.1rem", fontWeight: 700 }}
                >
                  Đã nhận yêu cầu của bạn!
                </h3>

                <p className="text-gray-500" style={{ fontSize: "14px" }}>
                  Chuyên gia của chúng tôi sẽ liên hệ trong vòng 30 phút trong
                  giờ hành chính.
                </p>
              </div>
            ) : (
              <>
                <h3
                  className="text-gray-800 mb-1"
                  style={{ fontSize: "1.1rem", fontWeight: 700 }}
                >
                  📋 Đăng ký tư vấn miễn phí
                </h3>

                <p className="text-gray-400 mb-5" style={{ fontSize: "13px" }}>
                  Điền thông tin, chuyên gia sẽ liên hệ trong 30 phút
                </p>

                <form onSubmit={handleSubmit} className="space-y-3">
                  {/* NAME */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-gray-600 mb-1"
                      style={{ fontSize: "12px", fontWeight: 600 }}
                    >
                      Họ và tên *
                    </label>

                    <input
                      id="name"
                      type="text"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      placeholder="Nhập họ và tên..."
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all"
                      style={{ fontSize: "13px" }}
                      required
                    />
                  </div>

                  {/* PHONE */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-gray-600 mb-1"
                      style={{ fontSize: "12px", fontWeight: 600 }}
                    >
                      Số điện thoại *
                    </label>

                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      placeholder="Nhập số điện thoại..."
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all"
                      style={{ fontSize: "13px" }}
                      required
                    />
                  </div>

                  {/* HOSPITAL */}
                  <div>
                    <label
                      htmlFor="hospital"
                      className="block text-gray-600 mb-1"
                      style={{ fontSize: "12px", fontWeight: 600 }}
                    >
                      Cơ sở y tế / Bệnh viện
                    </label>

                    <input
                      id="hospital"
                      type="text"
                      placeholder="Tên bệnh viện / phòng khám..."
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all"
                      style={{ fontSize: "13px" }}
                    />
                  </div>

                  {/* PRODUCT */}
                  <div>
                    <label
                      htmlFor="product"
                      className="block text-gray-600 mb-1"
                      style={{ fontSize: "12px", fontWeight: 600 }}
                    >
                      Sản phẩm / dịch vụ cần tư vấn
                    </label>

                    <select
                      id="product"
                      value={form.product}
                      onChange={(e) =>
                        setForm({ ...form, product: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 focus:outline-none focus:border-teal-500 transition-all"
                      style={{ fontSize: "13px" }}
                    >
                      <option value="">-- Chọn danh mục --</option>
                      <option>Thiết bị chẩn đoán</option>
                      <option>Dụng cụ phẫu thuật</option>
                      <option>Thiết bị ICU & Hồi sức</option>
                      <option>Vật tư tiêu hao</option>
                      <option>Thiết bị xét nghiệm</option>
                      <option>Phục hồi chức năng</option>
                      <option>Khác</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl text-white font-bold flex items-center justify-center gap-2 transition-all hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] mt-1"
                    style={{
                      backgroundColor: "#00897B",
                      fontSize: "14px",
                      boxShadow: "0 4px 15px rgba(0,137,123,0.4)",
                    }}
                  >
                    <Send size={15} />
                    Gửi yêu cầu tư vấn miễn phí
                  </button>
                </form>

                <p
                  className="text-center text-gray-400 mt-3"
                  style={{ fontSize: "11px" }}
                >
                  🔒 Thông tin của bạn được bảo mật tuyệt đối
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
