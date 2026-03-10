export const metadata = {
  title: "Chính sách bảo mật | Ánh Dương Phát",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Chính sách bảo mật
      </h1>
      <p className="text-gray-400 text-[13px] mb-8">
        Cập nhật lần cuối: 01/01/2025
      </p>

      <div className="prose prose-gray max-w-none text-[14px] leading-7 space-y-6 text-gray-700">
        <section>
          <h2 className="text-[16px] font-bold text-gray-900 mb-2">
            1. Thông tin chúng tôi thu thập
          </h2>
          <p>
            Khi bạn sử dụng website hoặc gửi yêu cầu báo giá, chúng tôi có thể
            thu thập các thông tin sau: họ tên, số điện thoại, địa chỉ email và
            danh mục sản phẩm bạn quan tâm. Thông tin này chỉ được thu thập khi
            bạn chủ động cung cấp.
          </p>
        </section>

        <section>
          <h2 className="text-[16px] font-bold text-gray-900 mb-2">
            2. Mục đích sử dụng thông tin
          </h2>
          <p>Thông tin bạn cung cấp được sử dụng để:</p>
          <ul className="list-disc pl-5 space-y-1 mt-2">
            <li>Liên hệ tư vấn và báo giá sản phẩm theo yêu cầu</li>
            <li>Xử lý đơn hàng và hỗ trợ sau bán hàng</li>
            <li>Cải thiện chất lượng dịch vụ của chúng tôi</li>
          </ul>
        </section>

        <section>
          <h2 className="text-[16px] font-bold text-gray-900 mb-2">
            3. Bảo mật thông tin
          </h2>
          <p>
            Chúng tôi cam kết không chia sẻ, bán hoặc trao đổi thông tin cá nhân
            của bạn với bên thứ ba vì mục đích thương mại. Thông tin của bạn chỉ
            được sử dụng trong phạm vi hoạt động của Công ty TNHH TM & SX Ánh
            Dương Phát.
          </p>
        </section>

        <section>
          <h2 className="text-[16px] font-bold text-gray-900 mb-2">
            4. Liên hệ
          </h2>
          <p>
            Nếu bạn có bất kỳ câu hỏi nào về chính sách bảo mật, vui lòng liên
            hệ chúng tôi qua hotline{" "}
            <a href="tel:0983498177" className="text-blue-600 hover:underline">
              0983 498 177
            </a>{" "}
            hoặc email{" "}
            <a
              href="mailto:huucong2510@gmail.com"
              className="text-blue-600 hover:underline"
            >
              huucong2510@gmail.com
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
}
