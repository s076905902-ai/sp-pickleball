"use client";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, XCircle } from "lucide-react";

export default function ReviewActions({ id, isPublished }: { id: string; isPublished: boolean }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const update = (published: boolean) => {
    startTransition(async () => {
      await fetch(`/api/admin/reviews/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isPublished: published }),
      });
      router.refresh();
    });
  };

  return (
    <div className="flex gap-1 ml-4 shrink-0">
      {!isPublished && (
        <button onClick={() => update(true)} disabled={isPending}
          className="flex items-center gap-1 text-xs bg-[#123524] text-white px-3 py-1.5 rounded-lg hover:bg-[#1F6B4F] disabled:opacity-60">
          <CheckCircle className="w-3 h-3" /> 通過
        </button>
      )}
      <button onClick={() => update(false)} disabled={isPending}
        className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg disabled:opacity-60 ${isPublished ? "bg-gray-100 text-gray-600 hover:bg-gray-200" : "bg-red-100 text-red-600 hover:bg-red-200"}`}>
        <XCircle className="w-3 h-3" /> {isPublished ? "撤回" : "拒絕"}
      </button>
    </div>
  );
}
