import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number | string, currency = "TWD"): string {
  const num = typeof price === "string" ? parseFloat(price) : price;
  return new Intl.NumberFormat("zh-TW", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}

export function formatDate(date: Date | string, locale = "zh-TW"): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "...";
}

export function scoreLabel(score: number): string {
  if (score >= 85) return "極高";
  if (score >= 70) return "高";
  if (score >= 55) return "中等";
  if (score >= 40) return "低";
  return "極低";
}

export function scoreColor(score: number): string {
  if (score >= 85) return "text-green-600";
  if (score >= 70) return "text-lime-600";
  if (score >= 55) return "text-yellow-600";
  if (score >= 40) return "text-orange-500";
  return "text-red-500";
}

export const SUITABLE_FOR_LABELS: Record<string, string> = {
  BEGINNER: "新手",
  INTERMEDIATE: "中階",
  ADVANCED: "高階",
  TENNIS_CONVERT: "網球轉換",
  FEMALE: "女性",
  DOUBLES: "雙打",
  SINGLES: "單打",
};

export const ORDER_STATUS_LABELS: Record<string, string> = {
  PENDING_PAYMENT: "待付款",
  TRANSFER_NOTIFIED: "已通知匯款",
  PENDING_CONFIRM: "待確認",
  PREPARING: "備貨中",
  SHIPPED: "已出貨",
  COMPLETED: "已完成",
  CANCELLED: "已取消",
  RETURNING: "退貨中",
  REFUNDED: "已退款",
};

export const SHIPPING_METHOD_LABELS: Record<string, string> = {
  POST_OFFICE: "郵局",
  SEVEN_ELEVEN: "7-ELEVEN",
  FAMILY_MART: "全家",
  HOME_DELIVERY: "宅配",
};
