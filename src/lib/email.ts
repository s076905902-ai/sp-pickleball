/**
 * SP Pickleball — Email 通知模組（Resend）
 * 只保留兩封：客戶下單確認 + 商家新訂單通知
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY;
// 未驗證網域前使用 Resend 預設寄件人；驗證 sportspoint.tw 後改回 no-reply@sportspoint.tw
const FROM = "SP Pickleball <onboarding@resend.dev>";
const MERCHANT_EMAIL = "s076905902@gmail.com";
const LINE_URL = "https://line.me/ti/p/QfXjVSMKha";

function formatPrice(n: number) {
  return `NT$ ${n.toLocaleString("zh-TW")}`;
}

function formatDate(d: Date) {
  return d.toLocaleString("zh-TW", {
    timeZone: "Asia/Taipei",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

interface OrderItem {
  productName: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

interface OrderEmailData {
  orderNumber: string;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  total: number;
  items: OrderItem[];
  createdAt: Date;
}

// ── Shared item rows ──────────────────────────────────────
function itemRows(items: OrderItem[]) {
  return items
    .map(
      (i) => `
      <tr>
        <td style="padding:10px 12px;border-bottom:1px solid #E5E2D8;color:#111;font-size:14px;">${i.productName}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #E5E2D8;text-align:center;color:#555;font-size:14px;">${i.quantity}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #E5E2D8;text-align:right;color:#111;font-size:14px;">${formatPrice(i.unitPrice)}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #E5E2D8;text-align:right;font-weight:600;color:#111;font-size:14px;">${formatPrice(i.total)}</td>
      </tr>`
    )
    .join("");
}

// ── 1. 客戶下單成功通知 ───────────────────────────────────
function customerEmailHtml(data: OrderEmailData): string {
  return `<!DOCTYPE html>
<html lang="zh-TW">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#F7F6F2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:600px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08);">

    <!-- Header -->
    <div style="background:#111111;padding:32px 40px;">
      <p style="margin:0;color:#C8A45D;font-size:12px;letter-spacing:3px;text-transform:uppercase;font-weight:600;">SP PICKLEBALL</p>
      <h1 style="margin:8px 0 0;color:#FAFAF8;font-size:22px;font-weight:700;">✅ 下單成功！</h1>
    </div>

    <!-- Body -->
    <div style="padding:32px 40px;">
      <p style="color:#111;font-size:15px;margin:0 0 8px;">親愛的 ${data.buyerName} 您好，</p>
      <p style="color:#555;font-size:14px;margin:0 0 28px;line-height:1.6;">感謝您的訂購！以下是您的訂單詳情，請保存此信件。</p>

      <!-- Order meta -->
      <div style="background:#F7F6F2;border-radius:10px;padding:16px 20px;margin-bottom:24px;">
        <p style="margin:0 0 6px;font-size:13px;color:#888;">訂單編號</p>
        <p style="margin:0;font-size:18px;font-weight:700;color:#111;letter-spacing:1px;">${data.orderNumber}</p>
        <p style="margin:8px 0 0;font-size:13px;color:#888;">下單時間：${formatDate(data.createdAt)}</p>
      </div>

      <!-- Items table -->
      <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
        <thead>
          <tr style="background:#F7F6F2;">
            <th style="padding:10px 12px;text-align:left;font-size:12px;color:#888;font-weight:600;">商品</th>
            <th style="padding:10px 12px;text-align:center;font-size:12px;color:#888;font-weight:600;">數量</th>
            <th style="padding:10px 12px;text-align:right;font-size:12px;color:#888;font-weight:600;">單價</th>
            <th style="padding:10px 12px;text-align:right;font-size:12px;color:#888;font-weight:600;">小計</th>
          </tr>
        </thead>
        <tbody>${itemRows(data.items)}</tbody>
      </table>

      <!-- Total -->
      <div style="text-align:right;margin-bottom:28px;">
        <span style="font-size:13px;color:#888;">免運費 ·&nbsp;</span>
        <span style="font-size:18px;font-weight:700;color:#111;">總計 ${formatPrice(data.total)}</span>
      </div>

      <!-- LINE CTA -->
      <div style="background:#F0FFF6;border:1.5px solid #1F6B4F;border-radius:12px;padding:20px 24px;margin-bottom:24px;">
        <p style="margin:0 0 4px;font-weight:700;color:#123524;font-size:15px;">📲 下一步：加入 LINE 完成付款</p>
        <p style="margin:0 0 16px;font-size:13px;color:#444;line-height:1.6;">
          請點擊下方按鈕加入我們的 LINE，<strong>提供訂單編號 ${data.orderNumber}</strong>，<br>
          我們將於 30 分鐘內提供匯款帳號與付款流程。
        </p>
        <a href="${LINE_URL}" style="display:inline-block;background:#06C755;color:#fff;font-weight:700;font-size:14px;padding:12px 28px;border-radius:50px;text-decoration:none;">
          💬 點我加入 LINE
        </a>
      </div>

      <p style="font-size:13px;color:#888;line-height:1.6;margin:0;">
        如有任何問題，請透過 LINE 與我們聯繫，或寄信至
        <a href="mailto:${MERCHANT_EMAIL}" style="color:#1F6B4F;">${MERCHANT_EMAIL}</a>。
      </p>
    </div>

    <!-- Footer -->
    <div style="background:#F7F6F2;padding:20px 40px;text-align:center;">
      <p style="margin:0;font-size:12px;color:#AAA;">© SP Pickleball · sportspoint.tw · 台灣匹克球拍專賣</p>
    </div>
  </div>
</body>
</html>`;
}

// ── 2. 商家新訂單通知 ─────────────────────────────────────
function merchantEmailHtml(data: OrderEmailData): string {
  return `<!DOCTYPE html>
<html lang="zh-TW">
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#F7F6F2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:600px;margin:32px auto;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,.08);">

    <!-- Header -->
    <div style="background:#123524;padding:24px 40px;">
      <p style="margin:0;color:#C8A45D;font-size:12px;letter-spacing:3px;text-transform:uppercase;font-weight:600;">SP PICKLEBALL · 後台通知</p>
      <h1 style="margin:6px 0 0;color:#FAFAF8;font-size:20px;font-weight:700;">🛒 新訂單 ${data.orderNumber}</h1>
    </div>

    <div style="padding:28px 40px;">

      <!-- Customer info -->
      <h2 style="margin:0 0 12px;font-size:14px;color:#888;letter-spacing:1px;text-transform:uppercase;">客戶資料</h2>
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px;">
        <tr><td style="padding:6px 0;font-size:13px;color:#888;width:80px;">姓名</td><td style="padding:6px 0;font-size:14px;font-weight:600;color:#111;">${data.buyerName}</td></tr>
        <tr><td style="padding:6px 0;font-size:13px;color:#888;">電話</td><td style="padding:6px 0;font-size:14px;color:#111;"><a href="tel:${data.buyerPhone}" style="color:#1F6B4F;">${data.buyerPhone}</a></td></tr>
        <tr><td style="padding:6px 0;font-size:13px;color:#888;">Email</td><td style="padding:6px 0;font-size:14px;color:#111;"><a href="mailto:${data.buyerEmail}" style="color:#1F6B4F;">${data.buyerEmail}</a></td></tr>
        <tr><td style="padding:6px 0;font-size:13px;color:#888;">下單時間</td><td style="padding:6px 0;font-size:14px;color:#111;">${formatDate(data.createdAt)}</td></tr>
      </table>

      <!-- Items -->
      <h2 style="margin:0 0 12px;font-size:14px;color:#888;letter-spacing:1px;text-transform:uppercase;">商品明細</h2>
      <table style="width:100%;border-collapse:collapse;margin-bottom:16px;">
        <thead>
          <tr style="background:#F7F6F2;">
            <th style="padding:10px 12px;text-align:left;font-size:12px;color:#888;font-weight:600;">商品</th>
            <th style="padding:10px 12px;text-align:center;font-size:12px;color:#888;font-weight:600;">數量</th>
            <th style="padding:10px 12px;text-align:right;font-size:12px;color:#888;font-weight:600;">單價</th>
            <th style="padding:10px 12px;text-align:right;font-size:12px;color:#888;font-weight:600;">小計</th>
          </tr>
        </thead>
        <tbody>${itemRows(data.items)}</tbody>
      </table>

      <div style="text-align:right;margin-bottom:24px;padding:12px;background:#F7F6F2;border-radius:8px;">
        <span style="font-size:16px;font-weight:700;color:#111;">訂單總計：${formatPrice(data.total)}</span>
        <span style="font-size:13px;color:#888;margin-left:8px;">（免運費）</span>
      </div>

      <p style="font-size:13px;color:#888;margin:0;">可至後台 <strong>/admin/orders</strong> 查看完整訂單詳情。</p>
    </div>

    <div style="background:#F7F6F2;padding:16px 40px;text-align:center;">
      <p style="margin:0;font-size:12px;color:#AAA;">SP Pickleball 後台自動通知 · 請勿直接回覆此信</p>
    </div>
  </div>
</body>
</html>`;
}

// ── Send via Resend API ───────────────────────────────────
async function sendEmail(to: string, subject: string, html: string): Promise<void> {
  if (!RESEND_API_KEY) {
    console.warn("[email] RESEND_API_KEY 未設定，略過寄信");
    return;
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ from: FROM, to, subject, html }),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error("[email] Resend 錯誤:", err);
    } else {
      console.log(`[email] ✅ 已寄送至 ${to}`);
    }
  } catch (e) {
    console.error("[email] 寄信失敗:", e);
  }
}

// ── Public API ────────────────────────────────────────────
export async function sendOrderEmails(data: OrderEmailData): Promise<void> {
  await Promise.all([
    // 1. 客戶確認信（有填 Email 才寄）
    data.buyerEmail
      ? sendEmail(
          data.buyerEmail,
          `✅ 下單成功 ${data.orderNumber} — SP Pickleball`,
          customerEmailHtml(data)
        )
      : Promise.resolve(),

    // 2. 商家通知
    sendEmail(
      MERCHANT_EMAIL,
      `🛒 新訂單 ${data.orderNumber}（${data.buyerName}）`,
      merchantEmailHtml(data)
    ),
  ]);
}
