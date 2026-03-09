interface ProductDescriptionProps {
  description?: string | null;
}

export function ProductDescription({
  description,
}: Readonly<ProductDescriptionProps>) {
  if (!description) return null;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 md:p-8">
      <h2
        className="font-bold text-gray-800 mb-5 pb-4 border-b border-gray-100"
        style={{ fontSize: "17px" }}
      >
        Mô tả sản phẩm
      </h2>
      <p
        className="text-gray-600 leading-relaxed whitespace-pre-wrap"
        style={{ fontSize: "14px" }}
      >
        {description}
      </p>
    </div>
  );
}
