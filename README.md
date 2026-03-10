# Medical Supplies Shop — Cửa Hàng Vật Tư Y Tế

Ứng dụng thương mại điện tử vật tư y tế xây dựng bằng **Next.js 16 App Router**, tích hợp **Supabase** (cơ sở dữ liệu & xác thực), **Cloudinary** (lưu trữ ảnh) và **TanStack Query** (quản lý state bất đồng bộ).

---

## Mục lục

- [Tính năng](#tính-năng)
- [Công nghệ sử dụng](#công-nghệ-sử-dụng)
- [Kiến trúc dự án](#kiến-trúc-dự-án)
- [Cấu trúc thư mục](#cấu-trúc-thư-mục)
- [Cơ sở dữ liệu](#cơ-sở-dữ-liệu)
- [Xác thực Admin](#xác-thực-admin)
- [Tìm kiếm Full-Text](#tìm-kiếm-full-text)
- [Quản lý ảnh](#quản-lý-ảnh)
- [Cài đặt](#cài-đặt)
- [Biến môi trường](#biến-môi-trường)
- [Scripts](#scripts)

---

## Tính năng

### Trang công khai (Public)

| Trang                                 | Mô tả                                                              |
| ------------------------------------- | ------------------------------------------------------------------ |
| Trang chủ (`/`)                       | Banner, sản phẩm nổi bật, danh mục                                 |
| Sản phẩm (`/san-pham`)                | Lưới sản phẩm với tìm kiếm, lọc theo danh mục, sắp xếp, phân trang |
| Chi tiết sản phẩm (`/san-pham/[id]`)  | Bộ ảnh carousel, mô tả, giá bán                                    |
| Dịch vụ, Giới thiệu, Tin tức, Liên hệ | Trang tĩnh thông tin doanh nghiệp                                  |
| Yêu cầu báo giá                       | Form gửi yêu cầu báo giá theo danh mục                             |
| Floating contacts                     | Nút nổi Zalo / điện thoại                                          |

- **Tìm kiếm thông minh**: gõ từ không dấu cũng tìm được ("bang gac" → "Băng Gạc")
- **Gợi ý tìm kiếm realtime** ngay trên thanh header
- **Responsive hoàn toàn** – mobile, tablet, desktop

### Trang quản trị (Admin — `/admin`)

| Module          | Tính năng                                                                     |
| --------------- | ----------------------------------------------------------------------------- |
| Dashboard       | Thống kê tổng sản phẩm, danh mục, yêu cầu báo giá; danh sách báo giá mới nhất |
| Sản phẩm        | CRUD đầy đủ, upload nhiều ảnh, đặt ảnh thumbnail, lọc/sắp xếp/phân trang      |
| Danh mục        | CRUD với ảnh thumbnail, sắp xếp thứ tự hiển thị                               |
| Yêu cầu báo giá | Xem danh sách, tìm kiếm (tên/SĐT), phân trang server-side                     |
| Đăng nhập       | Session-based với HMAC-signed cookie, hết hạn sau 4 giờ                       |

---

## Công nghệ sử dụng

| Danh mục          | Công nghệ                                                                                                                                       |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework         | [Next.js 16.1.6](https://nextjs.org) — App Router, Server Components                                                                            |
| UI Layer          | [React 19](https://react.dev), [Tailwind CSS v4](https://tailwindcss.com), [Radix UI](https://radix-ui.com), [shadcn/ui](https://ui.shadcn.com) |
| Icons             | [Lucide React](https://lucide.dev)                                                                                                              |
| State / Data      | [TanStack Query v5](https://tanstack.com/query)                                                                                                 |
| Database          | [Supabase](https://supabase.com) (PostgreSQL + SSR client)                                                                                      |
| Image Storage     | [Cloudinary](https://cloudinary.com)                                                                                                            |
| Schema Validation | [Zod](https://zod.dev)                                                                                                                          |
| Toast             | [Sonner](https://sonner.emilkowal.ski)                                                                                                          |
| Charts            | [Recharts](https://recharts.org)                                                                                                                |
| Carousel          | [Embla Carousel](https://www.embla-carousel.com)                                                                                                |
| Language          | TypeScript 5                                                                                                                                    |

---

## Kiến trúc dự án

```

Browser
│
├── Public pages (React Server + Client Components)
│ └── Gọi API routes nội bộ (/api/...) qua TanStack Query hooks
│
└── Admin pages (Client Components, protected by Middleware)
└── Gọi API routes nội bộ (/api/admin/...) qua TanStack Query hooks

API Routes (/api)
└── Gọi Service layer → Supabase / Cloudinary

```

### Phân lớp (Layering)

1. **Schemas** (`src/schemas/`) — Zod schemas xác thực dữ liệu đầu vào/ra
2. **Services** (`src/services/`) — Logic truy vấn Supabase, xử lý Cloudinary
3. **API Routes** (`src/app/api/`) — HTTP handlers, parse request → gọi service → trả JSON
4. **API Client** (`src/lib/api/`) — `fetch` wrapper phía client gọi các API routes
5. **Hooks** (`src/hooks/`) — TanStack Query hooks bọc API client, xử lý cache & mutation
6. **Components / Pages** — Chỉ dùng hooks, không chứa logic data trực tiếp

---

## Cấu trúc thư mục

```

src/
├── app/
│ ├── (public)/ # Route group — layout công khai (header + footer)
│ │ ├── page.tsx # Trang chủ
│ │ ├── san-pham/ # Danh sách & chi tiết sản phẩm
│ │ ├── dich-vu/
│ │ ├── gioi-thieu/
│ │ ├── tin-tuc/
│ │ └── lien-he/
│ ├── admin/
│ │ ├── login/ # Trang đăng nhập admin
│ │ └── (protected)/ # Route group — yêu cầu session hợp lệ
│ │ ├── page.tsx # Dashboard
│ │ ├── san-pham/ # Quản lý sản phẩm
│ │ ├── danh-muc/ # Quản lý danh mục
│ │ └── yeu-cau-bao-gia/ # Yêu cầu báo giá
│ └── api/
│ ├── products/ # Public product API
│ ├── categories/ # Public category API
│ ├── quote-requests/ # Public quote request API
│ └── admin/ # Admin-only API (protected by middleware)
│ ├── products/
│ ├── categories/
│ ├── quote-requests/
│ ├── upload/
│ ├── login/
│ └── logout/
├── components/
│ ├── features/
│ │ ├── admin/ # Components dùng cho trang admin
│ │ └── public/ # Components dùng cho trang công khai
│ └── ui/ # shadcn/ui base components
├── hooks/ # TanStack Query hooks
├── lib/
│ ├── auth.ts # Session auth logic (HMAC)
│ ├── env.ts # Đọc biến môi trường an toàn
│ ├── api/ # Fetch client wrappers
│ ├── cloudinary/ # Cloudinary client + validation
│ ├── query/ # TanStack Query provider + query keys
│ └── supabase/ # Supabase clients (server / admin / browser)
├── schemas/ # Zod schemas
├── services/ # Business logic + Supabase queries
├── types/ # TypeScript types (inferred từ schemas)
├── constants/ # navigation links, colors
└── proxy.ts # Next.js Middleware (admin session guard)

```

---

## Cơ sở dữ liệu

Dùng **Supabase (PostgreSQL)**. Các bảng chính:

### `products`

| Cột              | Kiểu                      | Ghi chú                 |
| ---------------- | ------------------------- | ----------------------- |
| `id`             | `uuid`                    | PK                      |
| `name`           | `text`                    | Tên sản phẩm            |
| `slug`           | `text`                    | URL-friendly, unique    |
| `category_id`    | `uuid`                    | FK → `categories`       |
| `description`    | `text`                    |                         |
| `price_type`     | `enum('FIXED','CONTACT')` |                         |
| `price`          | `numeric`                 | Bắt buộc khi `FIXED`    |
| `sale_price`     | `numeric`                 | Phải ≤ `price`          |
| `is_best_seller` | `boolean`                 |                         |
| `rating`         | `numeric`                 | 0–5                     |
| `search_vector`  | `tsvector`                | Full-text search        |
| `name_unaccent`  | `text`                    | `lower(unaccent(name))` |
| `created_at`     | `timestamptz`             |                         |
| `updated_at`     | `timestamptz`             |                         |

### `product_images`

| Cột            | Kiểu      | Ghi chú                       |
| -------------- | --------- | ----------------------------- |
| `id`           | `uuid`    | PK                            |
| `product_id`   | `uuid`    | FK → `products`               |
| `image_url`    | `text`    | Cloudinary URL                |
| `public_id`    | `text`    | Cloudinary public_id (để xóa) |
| `is_thumbnail` | `boolean` | Ảnh đại diện                  |

### `categories`

| Cột                   | Kiểu   | Ghi chú         |
| --------------------- | ------ | --------------- |
| `id`                  | `uuid` | PK              |
| `name`                | `text` |                 |
| `slug`                | `text` | unique          |
| `display_order`       | `int`  | Thứ tự hiển thị |
| `thumbnail_url`       | `text` | Cloudinary URL  |
| `thumbnail_public_id` | `text` |                 |

### `quote_requests`

| Cột           | Kiểu          | Ghi chú                           |
| ------------- | ------------- | --------------------------------- |
| `id`          | `uuid`        | PK                                |
| `full_name`   | `text`        |                                   |
| `phone`       | `text`        | Format `0xxxxxxxxx` hoặc `+84...` |
| `category_id` | `uuid`        | FK → `categories` (nullable)      |
| `created_at`  | `timestamptz` |                                   |

### tsvector cho tìm kiếm

```sql
search_vector =
  setweight(to_tsvector('simple', name), 'A')
  || setweight(to_tsvector('simple', unaccent(name)), 'A')
  || setweight(to_tsvector('simple', description), 'B')
```

Tìm kiếm dùng `plainto_tsquery('simple', ...)` kết hợp với `name_unaccent ILIKE` làm fallback — cho phép tìm không dấu và chuỗi tự nhiên.

---

## Xác thực Admin

Không dùng Supabase Auth cho admin. Thay vào đó sử dụng session-based auth tự cài:

1. **Đăng nhập**: so sánh `ADMIN_USERNAME` / `ADMIN_PASSWORD` từ env
2. **Session cookie**: `admin_session = payload.HMAC_SHA256(payload, ADMIN_SECRET)`
3. **Xác minh**: dùng `timingSafeEqual` để tránh timing attack
4. **Middleware** (`src/proxy.ts`): bảo vệ tất cả route `/admin/*` (trừ `/admin/login`) và `/api/admin/*`
5. **Hết hạn**: 4 giờ, `httpOnly + secure + sameSite=strict`

---

## Tìm kiếm Full-Text

Hỗ trợ **tìm kiếm tiếng Việt không dấu**:

- Database lưu tsvector với từ điển `simple` + field `name_unaccent`
- API dùng `plfts(simple)` (tương đương `plainto_tsquery`) — nhận text thô
- Kết hợp `OR name_unaccent ILIKE` để bắt các trường hợp không ra kết quả tsvector
- Header gợi ý realtime (debounce) khi gõ tìm kiếm
- Trang `/san-pham` đọc URL param `?search=` để đồng bộ với header search

---

## Quản lý ảnh

- **Upload**: POST `/api/admin/upload` — multipart/form-data, server gọi Cloudinary SDK
- **Giới hạn**: tối đa 10 ảnh/lần, 5 MB/ảnh, định dạng JPEG / PNG / WebP
- **Rollback**: nếu tạo sản phẩm thất bại sau khi upload ảnh, ảnh đã upload được xóa khỏi Cloudinary
- **Thumbnail**: mỗi sản phẩm có 1 ảnh thumbnail (flag `is_thumbnail`), có thể đổi trong admin
- **Next.js Image**: `remotePatterns` cấu hình cho domain `res.cloudinary.com`

---

## Cài đặt

### Yêu cầu

- Node.js ≥ 18
- npm / yarn / pnpm
- Tài khoản Supabase và Cloudinary

### Các bước

```bash
# 1. Clone repository
git clone <repo-url>
cd medical-supplies-shop

# 2. Cài dependencies
npm install

# 3. Tạo file môi trường
cp .env.example .env.local
# Điền đầy đủ các biến (xem mục Biến môi trường bên dưới)

# 4. Khởi động dev server
npm run dev
```

Ứng dụng chạy tại [http://localhost:3000](http://localhost:3000)  
Admin panel tại [http://localhost:3000/admin](http://localhost:3000/admin)

---

## Biến môi trường

Tạo file `.env.local` tại root dự án với nội dung sau:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://<project-ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
SUPABASE_SERVICE_ROLE_KEY=<service-role-key>

# Cloudinary
CLOUDINARY_CLOUD_NAME=<cloud-name>
CLOUDINARY_API_KEY=<api-key>
CLOUDINARY_API_SECRET=<api-secret>

# Admin Auth
ADMIN_USERNAME=admin
ADMIN_PASSWORD=<mật-khẩu-mạnh>
ADMIN_SECRET=<chuỗi-ngẫu-nhiên-dài-để-ký-session>
```

> ⚠️ `SUPABASE_SERVICE_ROLE_KEY` và `ADMIN_SECRET` **không được** đưa lên client hay commit vào Git.

---

## Scripts

```bash
npm run dev      # Khởi động development server (http://localhost:3000)
npm run build    # Build production
npm run start    # Chạy production build
npm run lint     # Kiểm tra lỗi ESLint
```
