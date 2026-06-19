/**
 * 通用內容渲染工具
 * 自動偵測 HTML / Markdown / 純文字，輸出可安全 innerHTML 的 HTML
 */
import { marked } from "marked";

// 設定 marked 選項：換行轉 <br>，連結在新視窗開啟
marked.setOptions({ breaks: true, gfm: true } as any);

export function renderContent(raw: string | null | undefined): string {
  if (!raw) return "";

  const str = raw.trim();

  // 已是 HTML（含有標籤）→ 直接回傳
  if (/<[a-z][\s\S]*>/i.test(str)) return str;

  // 含有 Markdown 語法（##、**、|、- ）→ 用 marked 解析
  if (/^#{1,6}\s|^\*\*|\*\*$|\|.*\||\n- |\n\d\.\s/.test(str)) {
    return marked.parse(str) as string;
  }

  // 純文字：把 \n\n 轉成 <p>，\n 轉成 <br>
  return str
    .split(/\n\n+/)
    .filter(Boolean)
    .map((p) => `<p>${p.replace(/\n/g, "<br>")}</p>`)
    .join("\n");
}
