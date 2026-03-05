"use client";
import { StatsBar } from "@/components/features/StatsBar";
import { TestimonialsSection } from "@/components/features/TestimonialsSection";
import { BrandsSection } from "@/components/features/BrandsSection";
import { Shield, Award, Users, TrendingUp } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-white">
      <main>
        {/* ───────── HERO ───────── */}
        <section
          className="py-26 text-white"
          style={{
            background: "linear-gradient(135deg, #0D2B6E 0%, #1565C0 100%)",
          }}
        >
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight">
              Đồng Hành Cùng Ngành Y Tế Việt Nam
            </h1>

            <p className="text-blue-100 text-base leading-relaxed max-w-2xl mx-auto">
              Thành lập năm 2020, kế thừa nền tảng kinh nghiệm từ Vật Tư Y Tế
              Khang An, Ánh Dương Phát không ngừng mở rộng năng lực cung ứng và
              khẳng định vị thế trong lĩnh vực vật tư – thiết bị y tế.
            </p>

            {/* Key numbers */}
            <div className="grid grid-cols-3 gap-6 mt-10 max-w-md mx-auto">
              {[
                { val: "500+", label: "Khách hàng" },
                { val: "1.000+", label: "Sản phẩm" },
                { val: "5+ năm", label: "Phát triển" },
              ].map((item, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={i}>
                  <div className="text-2xl font-bold">{item.val}</div>
                  <div className="text-blue-200 text-xs mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────── GIÁ TRỊ CỐT LÕI ───────── */}
        <section className="py-10 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold mb-10 text-center">
              Giá trị cốt lõi
            </h2>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                {
                  icon: <Shield size={20} />,
                  title: "Chất lượng",
                  desc: "Kiểm soát chặt chẽ, đáp ứng tiêu chuẩn an toàn.",
                },
                {
                  icon: <Award size={20} />,
                  title: "Uy tín",
                  desc: "Đặt chữ tín lên hàng đầu trong hợp tác lâu dài.",
                },
                {
                  icon: <Users size={20} />,
                  title: "Tận tâm",
                  desc: "Phục vụ khách hàng chuyên nghiệp và trách nhiệm.",
                },
                {
                  icon: <TrendingUp size={20} />,
                  title: "Bền vững",
                  desc: "Không ngừng đổi mới và nâng cao dịch vụ.",
                },
              ].map((item, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={i} className="text-center">
                  <div className="w-9 h-9 mx-auto mb-3 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h3 className="font-semibold mb-2 text-sm">{item.title}</h3>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <StatsBar />
        <TestimonialsSection />
        <BrandsSection />
      </main>
    </div>
  );
}
