// ─── Product ───────────────────────────────────────────────────────────────
export interface Product {
  id: number;
  name: string;
  brand: string;
  origin: string;
  price: number | null; // null = "Liên hệ báo giá"
  unit: string;
  category: string;
  img: string;
  isNew?: boolean;
}

// ─── Category ──────────────────────────────────────────────────────────────
export interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
  color: string;
  bg: string;
  borderColor: string;
  img: string;
}

// ─── Brand ─────────────────────────────────────────────────────────────────
export interface Brand {
  name: string;
  abbr: string;
  color: string;
}

// ─── News ──────────────────────────────────────────────────────────────────
export interface NewsItem {
  id: number;
  category: string;
  categoryColor: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  img: string;
}

// ─── Testimonial ───────────────────────────────────────────────────────────
export interface Testimonial {
  id: number;
  name: string;
  role: string;
  hospital: string;
  avatar: string;
  avatarColor: string;
  text: string;
  rating: number;
  tag: string;
}

// ─── Stat ──────────────────────────────────────────────────────────────────
export interface Stat {
  value: number;
  suffix: string;
  label: string;
  color: string;
}

// ─── Hero Slide ────────────────────────────────────────────────────────────
export interface HeroSlide {
  id: number;
  badge: string;
  headline: string;
  highlight: string;
  sub: string;
  cta1: string;
  cta2: string;
  img: string;
  accent: string;
}

// ─── Hero Slides ───────────────────────────────────────────────────────────
export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    badge: "Đối tác chính hãng #1 tại Việt Nam",
    headline: "Thiết Bị Y Tế\nChuyên Nghiệp",
    highlight: "Chính Hãng",
    sub: "Cung cấp đầy đủ vật tư, thiết bị y tế chính hãng cho 500+ bệnh viện và phòng khám trên toàn quốc.",
    cta1: "Nhận tư vấn miễn phí",
    cta2: "Xem danh mục sản phẩm",
    img: "https://images.unsplash.com/photo-1758691462848-ba1e929da259?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    accent: "#00897B",
  },
  {
    id: 2,
    badge: "Dịch vụ bảo trì & bảo hành toàn quốc",
    headline: "Vật Tư Tiêu Hao\nĐạt Chuẩn",
    highlight: "ISO & CE",
    sub: "Nguồn cung ổn định, giá cạnh tranh, giao hàng nhanh chóng. Đầy đủ CO/CQ cho mọi sản phẩm.",
    cta1: "Yêu cầu báo giá",
    cta2: "Tìm hiểu thêm",
    img: "https://images.unsplash.com/photo-1766325693728-348c38374d33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    accent: "#1565C0",
  },
  {
    id: 3,
    badge: "Hỗ trợ kỹ thuật 24/7",
    headline: "Giải Pháp Y Tế\nToàn Diện",
    highlight: "Cho Bệnh Viện",
    sub: "Từ thiết bị chẩn đoán, phẫu thuật đến phòng ICU — chúng tôi cung cấp giải pháp trọn gói với đội ngũ kỹ thuật chuyên sâu.",
    cta1: "Liên hệ ngay",
    cta2: "Xem dự án tiêu biểu",
    img: "https://images.unsplash.com/photo-1580281657702-257584239a55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080",
    accent: "#7B1FA2",
  },
];

// ─── Categories ────────────────────────────────────────────────────────────
export const categories: Category[] = [
  {
    id: 1,
    name: "Vật tư tiêu hao",
    slug: "tieu-hao",
    count: 28,
    color: "#D97706",
    bg: "linear-gradient(135deg, #FFFBEB 0%, #FDE68A 100%)",
    borderColor: "#FCD34D",
    img: "https://images.unsplash.com/photo-1747987766141-9d1f2707dd6c?w=300&h=160&fit=crop",
  },
  {
    id: 2,
    name: "Vật tư chỉnh hình",
    slug: "chinh-hinh",
    count: 12,
    color: "#1565C0",
    bg: "linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)",
    borderColor: "#90CAF9",
    img: "https://images.unsplash.com/photo-1671108503276-1d3d5ab23a3a?w=300&h=160&fit=crop",
  },
  {
    id: 3,
    name: "Giấy in y tế",
    slug: "giay-in",
    count: 6,
    color: "#00897B",
    bg: "linear-gradient(135deg, #E0F2F1 0%, #B2DFDB 100%)",
    borderColor: "#80CBC4",
    img: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=300&h=160&fit=crop",
  },
  {
    id: 4,
    name: "Dụng cụ hút dịch",
    slug: "tieu-hao",
    count: 6,
    color: "#7B1FA2",
    bg: "linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%)",
    borderColor: "#CE93D8",
    img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=300&h=160&fit=crop",
  },
  {
    id: 5,
    name: "Đo lường & Chẩn đoán",
    slug: "tieu-hao",
    count: 5,
    color: "#0288D1",
    bg: "linear-gradient(135deg, #E1F5FE 0%, #B3E5FC 100%)",
    borderColor: "#81D4FA",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=300&h=160&fit=crop",
  },
  {
    id: 6,
    name: "Khử khuẩn & Tiệt trùng",
    slug: "tieu-hao",
    count: 4,
    color: "#388E3C",
    bg: "linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)",
    borderColor: "#A5D6A7",
    img: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=300&h=160&fit=crop",
  },
  {
    id: 7,
    name: "Vật tư nội khí quản",
    slug: "tieu-hao",
    count: 4,
    color: "#C62828",
    bg: "linear-gradient(135deg, #FFEBEE 0%, #FFCDD2 100%)",
    borderColor: "#EF9A9A",
    img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=160&fit=crop",
  },
  {
    id: 8,
    name: "Băng bó & Cầm máu",
    slug: "tieu-hao",
    count: 6,
    color: "#E65100",
    bg: "linear-gradient(135deg, #FBE9E7 0%, #FFCCBC 100%)",
    borderColor: "#FFAB91",
    img: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=300&h=160&fit=crop",
  },
];

// ─── Brands ────────────────────────────────────────────────────────────────
export const brands: Brand[] = [
  { name: "Siemens Healthineers", abbr: "SIEMENS", color: "#009999" },
  { name: "Philips Healthcare", abbr: "PHILIPS", color: "#0B5ED7" },
  { name: "GE Healthcare", abbr: "GE", color: "#00338D" },
  { name: "Mindray", abbr: "MINDRAY", color: "#0066CC" },
  { name: "Medtronic", abbr: "MEDTRONIC", color: "#C41230" },
  { name: "BD Medical", abbr: "BD", color: "#00338D" },
  { name: "3M Healthcare", abbr: "3M", color: "#FF0000" },
  { name: "Abbott", abbr: "ABBOTT", color: "#004C97" },
  { name: "Stryker", abbr: "STRYKER", color: "#FFB400" },
  { name: "Biocare", abbr: "BIOCARE", color: "#00897B" },
  { name: "Fisher & Paykel", abbr: "F&P", color: "#005BAA" },
  { name: "Aesculap", abbr: "AESCULAP", color: "#003087" },
];

// ─── News ──────────────────────────────────────────────────────────────────
export const news: NewsItem[] = [
  {
    id: 1,
    category: "Công nghệ Y tế",
    categoryColor: "#1565C0",
    title:
      "Xu hướng thiết bị y tế thông minh AI năm 2025: Những thay đổi đột phá",
    excerpt:
      "Trí tuệ nhân tạo đang cách mạng hóa ngành thiết bị y tế với các hệ thống chẩn đoán tự động, theo dõi bệnh nhân thông minh và robot phẫu thuật thế hệ mới.",
    date: "20 Feb 2026",
    readTime: "5 phút đọc",
    img: "https://images.unsplash.com/photo-1758691462848-ba1e929da259?w=500&h=280&fit=crop",
  },
  {
    id: 2,
    category: "Hướng dẫn đấu thầu",
    categoryColor: "#00897B",
    title: "Hướng dẫn lập hồ sơ đấu thầu thiết bị y tế đạt chuẩn Bộ Y tế 2026",
    excerpt:
      "Tổng hợp đầy đủ quy trình, biểu mẫu và danh sách tài liệu cần thiết khi tham gia đấu thầu mua sắm thiết bị y tế theo Nghị định 24/2024.",
    date: "15 Feb 2026",
    readTime: "8 phút đọc",
    img: "https://images.unsplash.com/photo-1768498950637-88d073faa491?w=500&h=280&fit=crop",
  },
  {
    id: 3,
    category: "Tin tức ngành",
    categoryColor: "#DC2626",
    title:
      "MedPro Việt Nam mở rộng kho bãi tại TP.HCM — Nâng cấp năng lực giao hàng",
    excerpt:
      "Kho hàng mới 2.000m² tại Quận 12 chính thức đi vào hoạt động, giúp rút ngắn thời gian giao hàng còn 4–8 giờ cho khu vực TP.HCM.",
    date: "10 Feb 2026",
    readTime: "3 phút đọc",
    img: "https://images.unsplash.com/photo-1671108503276-1d3d5ab23a3a?w=500&h=280&fit=crop",
  },
];

// ─── Testimonials ──────────────────────────────────────────────────────────
export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "PGS.TS. Nguyễn Văn Thành",
    role: "Trưởng Khoa ICU",
    hospital: "Bệnh viện Bạch Mai, Hà Nội",
    avatar: "NT",
    avatarColor: "#1565C0",
    text: "MedPro Việt Nam đã cung cấp cho chúng tôi các thiết bị ICU chất lượng cao, đúng tiến độ và đầy đủ hồ sơ pháp lý. Đội ngũ kỹ thuật hỗ trợ lắp đặt và vận hành rất chuyên nghiệp. Chúng tôi đã duy trì hợp tác hơn 8 năm và hoàn toàn hài lòng.",
    rating: 5,
    tag: "Thiết bị ICU",
  },
  {
    id: 2,
    name: "TS.BS. Trần Thị Hương",
    role: "Giám đốc Trung tâm Phẫu thuật",
    hospital: "Bệnh viện Chợ Rẫy, TP.HCM",
    avatar: "TH",
    avatarColor: "#00897B",
    text: "Chúng tôi đã nhập hàng trăm bộ dụng cụ phẫu thuật từ MedPro. Sản phẩm đảm bảo tiêu chuẩn CE, giá cạnh tranh hơn 15-20% so với các nhà cung cấp khác. Điều tôi đánh giá cao nhất là dịch vụ tư vấn chuyên sâu và hỗ trợ hồ sơ đấu thầu.",
    rating: 5,
    tag: "Dụng cụ phẫu thuật",
  },
  {
    id: 3,
    name: "ThS. Lê Minh Quang",
    role: "Quản lý Thiết bị Y tế",
    hospital: "Bệnh viện Đại học Y Dược TP.HCM",
    avatar: "MQ",
    avatarColor: "#7B1FA2",
    text: "Nguồn hàng của MedPro rất đa dạng và ổn định. Điều quan trọng với chúng tôi là đầy đủ CO/CQ cho mọi sản phẩm. Đội ngũ bán hàng tư vấn tận tình, giao hàng đúng hạn. Đặc biệt là chính sách bảo hành sau bán hàng rất tốt.",
    rating: 5,
    tag: "Vật tư tiêu hao",
  },
  {
    id: 4,
    name: "BS. Phạm Thị Lan",
    role: "Chủ phòng khám",
    hospital: "Phòng khám Đa khoa Sài Gòn Quốc tế",
    avatar: "PL",
    avatarColor: "#D97706",
    text: "Là phòng khám tư nhân, tôi cần nguồn vật tư ổn định với giá hợp lý. MedPro đáp ứng được cả hai yêu cầu này, cộng thêm việc giao hàng nhanh trong 24h tại TP.HCM. Hotline hỗ trợ 24/7 thực sự rất hữu ích trong những tình huống khẩn cấp.",
    rating: 5,
    tag: "Vật tư tiêu hao",
  },
];

// ─── Products ───────────────────────────────────────────────────────────────
export const products: Product[] = [
  // Vật tư tiêu hao
  {
    id: 1,
    name: "Ống nội khí quản có bóng các size 5–7.5",
    brand: "Greetmed",
    origin: "Trung Quốc",
    price: 14500,
    unit: "Cái",
    category: "tieu-hao",
    img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    name: "Gạc tẩm cồn hộp 100 miếng",
    brand: "Greetmed",
    origin: "Trung Quốc",
    price: 17000,
    unit: "Hộp",
    category: "tieu-hao",
    img: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    name: "Băng dính cố định kim luồn trong suốt 6×7cm",
    brand: "Eurofarm",
    origin: "Italia",
    price: 7875,
    unit: "Miếng",
    category: "tieu-hao",
    img: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    name: "Băng keo cá nhân Innoplast vải đỏ hộp 100 miếng",
    brand: "Innoplast",
    origin: "Thái Lan",
    price: 38000,
    unit: "Hộp",
    category: "tieu-hao",
    img: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=300&fit=crop",
  },
  {
    id: 5,
    name: "Xốp cầm máu tự tiêu Spongostan 7×5×1cm hộp 20",
    brand: "Ethicon",
    origin: "Đan Mạch",
    price: 3661000,
    unit: "Hộp",
    category: "tieu-hao",
    img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
  },
  {
    id: 6,
    name: "Xốp cầm máu mũi UMAXO có dây",
    brand: "UMX",
    origin: "Việt Nam",
    price: 72500,
    unit: "Miếng",
    category: "tieu-hao",
    img: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=400&h=300&fit=crop",
  },
  {
    id: 7,
    name: "Bình tạo ẩm oxy Acare",
    brand: "Acare",
    origin: "Đài Loan",
    price: 415000,
    unit: "Cái",
    category: "tieu-hao",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop",
  },
  {
    id: 8,
    name: "Lọc khuẩn 3 chức năng HME",
    brand: "Canack",
    origin: "Canada",
    price: 35000,
    unit: "Cái",
    category: "tieu-hao",
    img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop",
  },
  {
    id: 9,
    name: "Dây hút nhớt có khóa các size",
    brand: "Greetmed",
    origin: "Trung Quốc",
    price: 2200,
    unit: "Cái",
    category: "tieu-hao",
    img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
  },
  {
    id: 10,
    name: "Dây Foley 2 nhánh các size",
    brand: "Greetmed",
    origin: "Trung Quốc",
    price: 12500,
    unit: "Cái",
    category: "tieu-hao",
    img: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=300&fit=crop",
  },
  {
    id: 11,
    name: "Dây truyền máu B.Braun 180cm",
    brand: "B.Braun",
    origin: "Việt Nam",
    price: 27800,
    unit: "Sợi",
    category: "tieu-hao",
    img: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=400&h=300&fit=crop",
  },
  {
    id: 12,
    name: "Dây nối bơm tiêm điện 140cm Bbraun",
    brand: "B.Braun",
    origin: "Việt Nam",
    price: 15625,
    unit: "Sợi",
    category: "tieu-hao",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop",
  },
  {
    id: 13,
    name: "Vớ tĩnh mạch gối các size S/M/L/XL",
    brand: "Noamed",
    origin: "Thổ Nhĩ Kỳ",
    price: 350000,
    unit: "Đôi",
    category: "tieu-hao",
    img: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=300&fit=crop",
  },
  {
    id: 14,
    name: "Vớ tĩnh mạch dài các size S/M/L/XL",
    brand: "Noamed",
    origin: "Thổ Nhĩ Kỳ",
    price: 485000,
    unit: "Đôi",
    category: "tieu-hao",
    img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
  },
  {
    id: 15,
    name: "Máy đo huyết áp điện tử Omron HEM-8712",
    brand: "Omron",
    origin: "Việt Nam",
    price: 850000,
    unit: "Cái",
    category: "tieu-hao",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop",
    isNew: true,
  },
  {
    id: 16,
    name: "Bộ đo huyết áp cơ Yamasu",
    brand: "Yamasu",
    origin: "Nhật Bản",
    price: 580000,
    unit: "Cái",
    category: "tieu-hao",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop",
  },
  {
    id: 17,
    name: "Nhiệt kế đo trán hồng ngoại Microlife FR1MF1",
    brand: "Microlife",
    origin: "Thụy Sĩ",
    price: 890000,
    unit: "Cái",
    category: "tieu-hao",
    img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop",
    isNew: true,
  },
  {
    id: 18,
    name: "Bộ đo huyết áp cơ ALPK2",
    brand: "ALPK2",
    origin: "Nhật Bản",
    price: 600000,
    unit: "Cái",
    category: "tieu-hao",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop",
  },
  {
    id: 19,
    name: "Bút đánh dấu phẫu thuật Tecfen Medical",
    brand: "Tecfen Medical",
    origin: "Đức",
    price: 95000,
    unit: "Cái",
    category: "tieu-hao",
    img: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=300&fit=crop",
  },
  {
    id: 20,
    name: "Băng keo chỉ thị nhiệt lò hấp Gima 19mm",
    brand: "Gima",
    origin: "Ý",
    price: 95000,
    unit: "Cuộn",
    category: "tieu-hao",
    img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
  },
  {
    id: 21,
    name: "Dung dịch khử khuẩn STERANIOS 2% 5 lít",
    brand: "Anios",
    origin: "Pháp",
    price: 485000,
    unit: "Can",
    category: "tieu-hao",
    img: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=400&h=300&fit=crop",
  },
  {
    id: 22,
    name: "Dung dịch khử khuẩn mức cao CIDEX OPA 3.78L",
    brand: "Johnson & Johnson",
    origin: "Ireland",
    price: 1057472,
    unit: "Can",
    category: "tieu-hao",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop",
  },
  {
    id: 23,
    name: "Viên nén sát khuẩn PRESEPT 2.5Gr hộp 100 viên",
    brand: "Johnson & Johnson",
    origin: "Ireland",
    price: 550000,
    unit: "Hộp",
    category: "tieu-hao",
    img: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=300&fit=crop",
  },
  {
    id: 24,
    name: "Dây hút dịch silicon cuộn 30m (hấp nhiều lần)",
    brand: "Gima",
    origin: "Ý",
    price: 5800000,
    unit: "Cuộn",
    category: "tieu-hao",
    img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop",
  },
  {
    id: 25,
    name: "Xốp cầm máu Merocel hộp 10 miếng",
    brand: "Medtronic",
    origin: "Mỹ",
    price: 140000,
    unit: "Miếng",
    category: "tieu-hao",
    img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
  },
  {
    id: 26,
    name: "Mặt nạ gây mê số 1–4 Greetmed",
    brand: "Greetmed",
    origin: "Trung Quốc",
    price: 38000,
    unit: "Cái",
    category: "tieu-hao",
    img: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=300&fit=crop",
  },
  {
    id: 27,
    name: "Bình hút áp lực âm 200ml",
    brand: "Yudu",
    origin: "Trung Quốc",
    price: 95000,
    unit: "Cái",
    category: "tieu-hao",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop",
  },
  {
    id: 28,
    name: "Bình hút áp lực âm 400ml",
    brand: "Yudu",
    origin: "Trung Quốc",
    price: 105000,
    unit: "Cái",
    category: "tieu-hao",
    img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop",
  },

  // Vật tư chỉnh hình
  {
    id: 29,
    name: 'Băng bó bột Altocast 2" thủy tinh',
    brand: "Altochem",
    origin: "Hàn Quốc",
    price: 73868,
    unit: "Cuộn",
    category: "chinh-hinh",
    img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
  },
  {
    id: 30,
    name: 'Băng bó bột Altocast 3" thủy tinh',
    brand: "Altochem",
    origin: "Hàn Quốc",
    price: 94815,
    unit: "Cuộn",
    category: "chinh-hinh",
    img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
  },
  {
    id: 31,
    name: 'Băng bó bột Altocast 4" thủy tinh',
    brand: "Altochem",
    origin: "Hàn Quốc",
    price: 105840,
    unit: "Cuộn",
    category: "chinh-hinh",
    img: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=300&fit=crop",
  },
  {
    id: 32,
    name: 'Băng bó bột Altocast 5" thủy tinh',
    brand: "Altochem",
    origin: "Hàn Quốc",
    price: 132000,
    unit: "Cuộn",
    category: "chinh-hinh",
    img: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=300&fit=crop",
  },
  {
    id: 33,
    name: "Bông gòn bó bột Natural 5cm×2.7m",
    brand: "Bastos",
    origin: "Hàn Quốc",
    price: 21193,
    unit: "Cuộn",
    category: "chinh-hinh",
    img: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=300&fit=crop",
  },
  {
    id: 34,
    name: "Bông gòn bó bột Natural 7.5cm×2.7m",
    brand: "Bastos",
    origin: "Hàn Quốc",
    price: 26775,
    unit: "Cuộn",
    category: "chinh-hinh",
    img: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=300&fit=crop",
  },
  {
    id: 35,
    name: "Bông gòn bó bột Natural 10cm×2.7m",
    brand: "Bastos",
    origin: "Hàn Quốc",
    price: 34125,
    unit: "Cuộn",
    category: "chinh-hinh",
    img: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=300&fit=crop",
  },
  {
    id: 36,
    name: "Thun vớ Stockinette 5cm×25m dùng bó bột",
    brand: "Bastos",
    origin: "Bồ Đào Nha",
    price: 464100,
    unit: "Cuộn",
    category: "chinh-hinh",
    img: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=400&h=300&fit=crop",
  },
  {
    id: 37,
    name: "Thun vớ Stockinette 10cm×25m dùng bó bột",
    brand: "Bastos",
    origin: "Bồ Đào Nha",
    price: 666750,
    unit: "Cuộn",
    category: "chinh-hinh",
    img: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=400&h=300&fit=crop",
  },
  {
    id: 38,
    name: "Xe lăn CT-Care KY863LAJ-20 công nghệ Nhật",
    brand: "CT-Care",
    origin: "Việt Nam",
    price: 2750000,
    unit: "Cái",
    category: "chinh-hinh",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop",
    isNew: true,
  },
  {
    id: 39,
    name: "Nạng nhôm cho người khuyết tật C39A",
    brand: "Alumin",
    origin: "Trung Quốc",
    price: 200000,
    unit: "Cặp",
    category: "chinh-hinh",
    img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop",
  },
  {
    id: 40,
    name: "Bó mắt cá chân Goodfit full size",
    brand: "Goodfit",
    origin: "Trung Quốc",
    price: 79000,
    unit: "Cái",
    category: "chinh-hinh",
    img: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
  },

  // Giấy in y tế
  {
    id: 41,
    name: "Giấy điện tim Sonomed 50mm×30m",
    brand: "Sonomed",
    origin: "Malaysia",
    price: 21000,
    unit: "Cuộn",
    category: "giay-in",
    img: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=300&fit=crop",
  },
  {
    id: 42,
    name: "Giấy điện tim Sonomed 60mm×30m",
    brand: "Sonomed",
    origin: "Malaysia",
    price: 23000,
    unit: "Cuộn",
    category: "giay-in",
    img: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?w=400&h=300&fit=crop",
  },
  {
    id: 43,
    name: "Giấy điện tim Sonomed 145mm×30m",
    brand: "Sonomed",
    origin: "Malaysia",
    price: 60000,
    unit: "Cuộn",
    category: "giay-in",
    img: "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=400&h=300&fit=crop",
  },
  {
    id: 44,
    name: "Giấy in bill nhiệt 80×80mm",
    brand: "Quen Quen",
    origin: "Việt Nam",
    price: 25000,
    unit: "Cuộn",
    category: "giay-in",
    img: "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=400&h=300&fit=crop",
  },
  {
    id: 45,
    name: "Giấy in kết quả siêu âm Sony 110S",
    brand: "Sony",
    origin: "Nhật Bản",
    price: 155000,
    unit: "Cuộn",
    category: "giay-in",
    img: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=300&fit=crop",
  },
  {
    id: 46,
    name: "Ly giấy dùng một lần 185ml",
    brand: "Hàn Quốc",
    origin: "Hàn Quốc",
    price: 350,
    unit: "Cái",
    category: "giay-in",
    img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop",
  },
];
