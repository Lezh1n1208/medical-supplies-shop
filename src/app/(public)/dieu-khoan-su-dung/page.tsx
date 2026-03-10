export const metadata = {
  title: "Điều khoản sử dụng | Ánh Dương Phát",
};

export default function TermsOfUsePage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Điều khoản sử dụng
      </h1>
      <p className="text-gray-400 text-[13px] mb-8">
        Cập nhật lần cuối: 01/01/2025
      </p>

      <div className="prose prose-gray max-w-none text-[14px] leading-7 space-y-6 text-gray-700">
        <section>
          <h2 className="text-[16px] font-bold text-gray-900 mb-2">
            1. Chấp nhận điều khoản
          </h2>
          <p>
            Khi truy cập và sử dụng website này, bạn đồng ý tuân thủ các điều
            khoản và điều kiện được nêu dưới đây. Nếu bạn không đồng ý, vui lòng
            ngừng sử dụng website.
          </p>
        </section>

        <section>
          <h2 className="text-[16px] font-bold text-gray-900 mb-2">
            2. Thông tin sản phẩm
          </h2>
          <p>
            Chúng tôi cố gắng đảm bảo thông tin sản phẩm trên website là chính
            xác và cập nhật. Tuy nhiên, giá cả và thông số kỹ thuật có thể thay
            đổi mà không cần báo trước. Giá chính thức sẽ được xác nhận khi báo
            giá trực tiếp.
          </p>
        </section>

        <section>
          <h2 className="text-[16px] font-bold text-gray-900 mb-2">
            3. Quyền sở hữu trí tuệ
          </h2>
          <p>
            Toàn bộ nội dung trên website bao gồm hình ảnh, văn bản, logo thuộc
            quyền sở hữu của Công ty TNHH TM & SX Ánh Dương Phát. Nghiêm cấm sao
            chép hoặc sử dụng lại khi chưa có sự cho phép bằng văn bản.
          </p>
        </section>

        <section>
          <h2 className="text-[16px] font-bold text-gray-900 mb-2">
            4. Giới hạn trách nhiệm
          </h2>
          <p>
            Website được cung cấp "nguyên trạng". Chúng tôi không chịu trách
            nhiệm về bất kỳ thiệt hại nào phát sinh từ việc sử dụng hoặc không
            thể sử dụng website này.
          </p>
        </section>

        <section>
          <h2 className="text-[16px] font-bold text-gray-900 mb-2">
            5. Liên hệ
          </h2>
          <p>
            Mọi thắc mắc về điều khoản sử dụng, vui lòng liên hệ hotline{" "}
            <a href="tel:0983498177" className="text-blue-600 hover:underline">
              0983 498 177
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
