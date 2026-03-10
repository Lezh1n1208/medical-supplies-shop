export const metadata = {
  title: "Chính sách đổi trả | Ánh Dương Phát",
};

export default function ReturnPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Chính sách đổi trả
      </h1>
      <p className="text-gray-400 text-[13px] mb-8">
        Cập nhật lần cuối: 01/01/2025
      </p>

      <div className="prose prose-gray max-w-none text-[14px] leading-7 space-y-6 text-gray-700">
        <section>
          <h2 className="text-[16px] font-bold text-gray-900 mb-2">
            1. Điều kiện đổi trả
          </h2>
          <p>Chúng tôi chấp nhận đổi trả trong các trường hợp sau:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Sản phẩm bị lỗi kỹ thuật do nhà sản xuất</li>
            <li>Sản phẩm giao không đúng chủng loại, quy cách so với đơn hàng</li>
            <li>Sản phẩm bị hư hỏng trong quá trình vận chuyển</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[16px] font-bold text-gray-900 mb-2">
            2. Thời gian đổi trả
          </h2>
          <p>
            Yêu cầu đổi trả phải được thông báo trong vòng{" "}
            <strong>3 ngày làm việc</strong> kể từ ngày nhận hàng. Sau thời
            gian này, chúng tôi không giải quyết các khiếu nại liên quan đến
            chất lượng sản phẩm.
          </p>
        </section>

        <section>
          <h2 className="text-[16px] font-bold text-gray-900 mb-2">
            3. Hàng không được đổi trả
          </h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Sản phẩm đã qua sử dụng hoặc đã mở seal</li>
            <li>Vật tư tiêu hao y tế đã qua tiệt trùng hoặc sử dụng một lần</li>
            <li>Sản phẩm bị hư hỏng do lỗi người dùng</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[16px] font-bold text-gray-900 mb-2">
            4. Quy trình đổi trả
          </h2>
          <p>
            Để yêu cầu đổi trả, vui lòng liên hệ trực tiếp qua hotline{" "}
            <a
              href="tel:0983498177"
              className="text-blue-600 hover:underline"
            >
              0983 498 177
            </a>{" "}
            hoặc email{" "}
            <a
              href="mailto:huucong2510@gmail.com"
              className="text-blue-600 hover:underline"
            >
              huucong2510@gmail.com
            </a>{" "}
            kèm ảnh chụp sản phẩm và mô tả vấn đề. Đội ngũ sẽ phản hồi trong
            vòng 24 giờ trong ngày làm việc.
          </p>
        </section>
      </div>
    </div>
  );
}
