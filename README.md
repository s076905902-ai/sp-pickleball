# SP Pickleball 🏓

台灣最完整的匹克球拍電商與知識平台。

## 技術架構

- **Framework**: Next.js 15 (App Router, SSR/SSG)
- **Language**: TypeScript
- **Styling**: TailwindCSS + shadcn/ui
- **Database**: PostgreSQL + Prisma ORM
- **Auth**: NextAuth v5 (Google OAuth + Credentials)
- **Deploy**: Vercel + Cloudflare CDN

---

## 快速開始

### 1. 安裝依賴

```bash
npm install
```

### 2. 設定環境變數

```bash
cp .env.example .env.local
```

編輯 `.env.local` 填入以下必要值：
- `DATABASE_URL` — PostgreSQL 連線字串（推薦使用 [Neon](https://neon.tech) 或 [Supabase](https://supabase.com)）
- `NEXTAUTH_SECRET` — 隨機密鑰（`openssl rand -base64 32`）
- `NEXTAUTH_URL` — 本機 `http://localhost:3000`，Vercel 上填正式網域
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` — Google OAuth 憑證

### 3. 初始化資料庫

```bash
# 生成 Prisma client
npm run db:generate

# 推送 schema 到資料庫
npm run db:push

# 填入測試資料
npm run db:seed
```

### 4. 啟動開發伺服器

```bash
npm run dev
```

前台：http://localhost:3000  
後台：http://localhost:3000/admin

---

## 部署到 Vercel

1. **建立 Vercel 專案**，連結此 GitHub repo

2. **設定環境變數**（在 Vercel Dashboard → Settings → Environment Variables）：
   ```
   DATABASE_URL=postgresql://...（使用 Neon 或 Supabase）
   NEXTAUTH_SECRET=...
   NEXTAUTH_URL=https://yourdomain.com
   GOOGLE_CLIENT_ID=...
   GOOGLE_CLIENT_SECRET=...
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   NEXT_PUBLIC_SITE_NAME=SP Pickleball
   ```

3. **Build Command**（已在 vercel.json 設定）：
   ```
   npx prisma generate && next build
   ```

4. **Cloudflare CDN 設定**：
   - 在 Cloudflare 新增你的網域
   - DNS → CNAME 指向 Vercel 的 cname.vercel-dns.com
   - 開啟 Proxy（橘色雲）以啟用 CDN 快取

---

## shadcn/ui 元件安裝

本專案需要 shadcn/ui，首次設定執行：

```bash
npx shadcn@latest init
```

然後安裝需要的元件：

```bash
npx shadcn@latest add button card dialog select toast accordion tabs
```

---

## 專案結構

```
sp-pickleball/
├── prisma/
│   ├── schema.prisma      # 完整資料模型（18 個 model）
│   └── seed.ts            # 初始測試資料
├── src/
│   ├── app/
│   │   ├── (frontend)/    # 前台路由（SSR/SSG）
│   │   │   ├── page.tsx           # 首頁
│   │   │   ├── products/          # 商品列表 + 詳頁
│   │   │   ├── categories/[slug]/ # 分類頁
│   │   │   ├── brands/[slug]/     # 品牌頁
│   │   │   ├── compare/           # 比較頁
│   │   │   ├── blog/              # 知識庫
│   │   │   ├── faq/               # FAQ
│   │   │   ├── ai/                # AI 選拍顧問
│   │   │   ├── cart/              # 購物車
│   │   │   ├── checkout/          # 結帳（通知匯款）
│   │   │   └── ...靜態頁面
│   │   ├── admin/         # 後台管理（需登入）
│   │   │   ├── page.tsx           # 儀表板
│   │   │   ├── products/          # 商品管理
│   │   │   ├── orders/            # 訂單管理
│   │   │   ├── seo/               # SEO 管理
│   │   │   ├── geo/               # GEO 管理
│   │   │   └── ...
│   │   ├── api/           # API Routes
│   │   │   ├── products/          # 商品 API
│   │   │   ├── orders/            # 訂單 API
│   │   │   ├── cart/              # 購物車 API
│   │   │   ├── ai/recommend/      # AI 推薦 API
│   │   │   └── stock-notify/      # 到貨通知 API
│   │   ├── feeds/
│   │   │   └── google-merchant.xml/  # Google Merchant Feed
│   │   ├── sitemap.ts     # 自動 sitemap.xml
│   │   └── robots.ts      # robots.txt
│   ├── components/
│   │   ├── layout/        # Header, Footer
│   │   ├── product/       # ProductCard, ProductFilters
│   │   ├── cart/          # AddToCartButton
│   │   ├── ai/            # AiAdvisor 問卷元件
│   │   ├── seo/           # JsonLd, AnalyticsScripts
│   │   └── ui/            # shadcn/ui 基礎元件
│   └── lib/
│       ├── prisma.ts          # Prisma client singleton
│       ├── auth.ts            # NextAuth 設定
│       ├── seo.ts             # Metadata builder
│       ├── schema-markup.ts   # JSON-LD Schema 產生器
│       ├── merchant-feed.ts   # Google Merchant Feed
│       ├── internal-links.ts  # 內部連結引擎
│       └── utils.ts           # 工具函式
```

---

## SEO / GEO 功能說明

### SEO 自動化
- 每個商品頁 SSG 產生，Lighthouse SEO 分數目標 90+
- `src/app/sitemap.ts` 自動包含所有 PUBLISHED 商品、品牌、分類、文章
- `src/app/robots.ts` 正確封鎖後台路由
- 每頁支援自訂 Title、Description、Canonical、OG Image、noIndex

### Schema Markup
已實作（`src/lib/schema-markup.ts`）：
- `Product` + `Offer` — 商品頁
- `FAQPage` — 商品頁 FAQ、分類頁、品牌頁
- `Article` — 文章頁
- `BreadcrumbList` — 所有有層級的頁面
- `Organization` + `WebSite` + `SearchAction` — 全域 Layout
- `LocalBusiness` — 首頁

### GEO 欄位
在 `/admin/geo` 說明，在各商品/品牌/分類編輯頁可設定：
- AI Summary（50-150字）
- AI FAQ（5-8 Q&A）
- AI Quick Answer
- Structured Content
- Pros / Cons

### Google Merchant Center Feed
- URL: `/feeds/google-merchant.xml`
- 每小時 ISR 更新
- 欄位：id, title, description, image_link, price, sale_price, availability, brand, gtin, mpn, condition

---

## 訂單流程（通知匯款）

1. 用戶選好商品 → 加入購物車
2. 結帳頁填入姓名、電話、配送方式
3. 送出訂單 → 系統顯示匯款帳號
4. 用戶在 24 小時內完成匯款
5. 在訂單頁或 LINE 通知匯款
6. 後台確認後 → 狀態更新為「備貨中」→「已出貨」

---

## AI 選拍顧問

前台路由：`/ai`  
API：`/api/ai/recommend`

問卷流程：
1. 預算（3,000 以下 / 3,000-6,000 / 6,000 以上）
2. 程度（新手 / 中階 / 高階）
3. 打法（控制 / 平衡 / 力量）
4. 背景（純新手 / 網球 / 羽球 / 桌球）

輸出 3 支推薦球拍 + 推薦理由 + 導向商品頁

---

## 後台權限角色

| 角色 | 說明 |
|------|------|
| OWNER | 最高權限，可做所有操作 |
| ADMIN | 可管理商品、訂單、內容 |
| SEO_EDITOR | 只能編輯 SEO/GEO 欄位 |
| CONTENT_EDITOR | 只能編輯文章、FAQ |
| CUSTOMER_SERVICE | 只能查看/處理訂單 |
| WAREHOUSE | 只能更新出貨狀態 |
| VIEWER | 只能查看，無法修改 |

---

## 前台路由清單

```
/                    首頁
/products            商品列表（SSG + 篩選）
/products/[slug]     商品詳頁（SSG + Schema）
/categories/[slug]   分類頁（SSG）
/brands/[slug]       品牌頁（SSG）
/compare             比較中心
/compare/[slug]      詳細比較頁
/blog                知識庫列表
/blog/[slug]         文章詳頁
/faq                 常見問題（FAQPage Schema）
/ai                  AI 選拍顧問
/academy             Academy 課程
/cart                購物車（Client）
/checkout            結帳（通知匯款）
/account             會員中心
/orders/[id]         訂單詳頁
/about               關於我們
/contact             聯絡我們
/shipping            運費說明
/returns             退換貨政策
/privacy             隱私權政策
/terms               服務條款
```

---

## 開發注意事項

1. **shadcn/ui 元件**：`src/components/ui/toaster.tsx` 是 stub，需執行 `npx shadcn@latest add toast` 安裝真實元件

2. **圖片**：商品主圖請上傳至 Cloudinary 或 Uploadthing，在 `next.config.ts` 的 `remotePatterns` 已預先設定

3. **Admin 保護**：`src/app/admin/layout.tsx` 目前無路由保護，**部署前必須加入 auth 中介層**，參考：
   ```ts
   // src/middleware.ts
   export { auth as middleware } from "@/lib/auth"
   export const config = { matcher: ["/admin/:path*"] }
   ```

4. **Prisma Migrations**：生產環境請使用 `npm run db:migrate` 而非 `db:push`

5. **第二階段功能**（尚未實作）：
   - 比較頁 `/compare/[slug]` 的詳細比較 UI
   - 站內搜尋
   - 影片 SEO
   - 地區 SEO Landing Page

---

## 聯絡

如有問題，請聯絡 SP Pickleball 開發團隊。
