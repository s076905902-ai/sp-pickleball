import prisma from "@/lib/prisma";
import ReviewActions from "./ReviewActions";

export default async function AdminReviewsPage() {
  const reviews = await prisma.review.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
    include: { product: { select: { name: true } } },
  });

  const pending = reviews.filter(r => !r.isPublished);
  const published = reviews.filter(r => r.isPublished);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">評價管理</h1>
          <p className="text-sm text-gray-500 mt-1">待審核 {pending.length} 則 · 已發布 {published.length} 則</p>
        </div>
      </div>

      {pending.length > 0 && (
        <div className="mb-8">
          <h2 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span className="w-2 h-2 bg-yellow-400 rounded-full inline-block"></span>
            待審核評價
          </h2>
          <div className="space-y-3">
            {pending.map(r => <ReviewCard key={r.id} review={r} />)}
          </div>
        </div>
      )}

      <div>
        <h2 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-[#1F6B4F] rounded-full inline-block"></span>
          已發布評價
        </h2>
        {published.length === 0 ? (
          <div className="bg-white border rounded-xl py-12 text-center text-gray-400">尚無已發布評價</div>
        ) : (
          <div className="bg-white border rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="text-left px-4 py-3 font-medium text-gray-500">評論者</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">商品</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">評分</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">內容</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">日期</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-500">操作</th>
                </tr>
              </thead>
              <tbody>
                {published.map(r => (
                  <tr key={r.id} className="border-b hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">{r.authorName}</td>
                    <td className="px-4 py-3 text-gray-500 text-xs">{r.product.name}</td>
                    <td className="px-4 py-3">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</td>
                    <td className="px-4 py-3 text-gray-600 max-w-xs truncate">{r.content}</td>
                    <td className="px-4 py-3 text-gray-400 text-xs">{new Date(r.createdAt).toLocaleDateString("zh-TW")}</td>
                    <td className="px-4 py-3"><ReviewActions id={r.id} isPublished={true} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function ReviewCard({ review }: { review: any }) {
  return (
    <div className="bg-white border border-yellow-200 rounded-xl p-5">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="font-semibold text-gray-900">{review.authorName}</span>
            <span className="text-yellow-500">{"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}</span>
            <span className="text-xs text-gray-400">{review.product.name}</span>
          </div>
          {review.title && <p className="font-medium text-gray-800 mb-1">{review.title}</p>}
          <p className="text-gray-600 text-sm">{review.content}</p>
        </div>
        <ReviewActions id={review.id} isPublished={false} />
      </div>
    </div>
  );
}
