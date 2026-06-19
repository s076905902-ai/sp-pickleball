import { redirect } from "next/navigation";

// 不需要會員功能，直接導回首頁
export default function AccountPage() {
  redirect("/");
}
