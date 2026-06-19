"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, RotateCcw } from "lucide-react";
import { formatPrice, SUITABLE_FOR_LABELS } from "@/lib/utils";

interface RecommendedProduct {
  id: string;
  name: string;
  slug: string;
  price: number;
  salePrice?: number | null;
  mainImage?: string | null;
  brandName: string;
  suitableFor: string[];
  reason: string;
}

const questions = [
  {
    id: "budget",
    question: "你的預算是多少？",
    options: [
      { value: "under3k", label: "3,000 以下", desc: "平價入門，CP 值高" },
      { value: "3kto6k", label: "3,000 – 6,000", desc: "中階品質，性能均衡" },
      { value: "over6k", label: "6,000 以上", desc: "頂級材質，競賽規格" },
    ],
  },
  {
    id: "level",
    question: "你的程度如何？",
    options: [
      { value: "beginner", label: "新手", desc: "剛接觸匹克球，還在學習規則" },
      { value: "intermediate", label: "中階", desc: "打了一段時間，想提升技術" },
      { value: "advanced", label: "高階", desc: "有比賽經驗，追求頂尖性能" },
    ],
  },
  {
    id: "style",
    question: "你偏好哪種打法？",
    options: [
      { value: "control", label: "控制型", desc: "精準落點，細膩 dink 戰術" },
      { value: "balanced", label: "平衡型", desc: "攻守兼顧，全方位球拍" },
      { value: "power", label: "力量型", desc: "大力扣殺，主動攻擊" },
    ],
  },
  {
    id: "background",
    question: "你有其他球類運動背景嗎？",
    options: [
      { value: "none", label: "純新手", desc: "從匹克球開始" },
      { value: "tennis", label: "網球背景", desc: "熟悉網拍，需要適應厚芯球拍" },
      { value: "badminton", label: "羽球背景", desc: "習慣輕拍，快速反應" },
      { value: "tabletennis", label: "桌球背景", desc: "旋轉控制能力強" },
    ],
  },
];

export default function AiAdvisor() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentQ, setCurrentQ] = useState(0);
  const [results, setResults] = useState<RecommendedProduct[] | null>(null);
  const [loading, setLoading] = useState(false);

  function answer(questionId: string, value: string) {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);
    if (currentQ < questions.length - 1) {
      setCurrentQ((q) => q + 1);
    } else {
      fetchRecommendations(newAnswers);
    }
  }

  async function fetchRecommendations(ans: Record<string, string>) {
    setLoading(true);
    try {
      const res = await fetch("/api/ai/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(ans),
      });
      const data = await res.json();
      setResults(data.recommendations ?? []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setAnswers({});
    setCurrentQ(0);
    setResults(null);
  }

  if (loading) {
    return (
      <div className="text-center py-16">
        <div className="text-4xl mb-4 animate-bounce">🤖</div>
        <p className="font-medium text-gray-700">分析你的需求中...</p>
      </div>
    );
  }

  if (results !== null) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900">為你推薦的球拍</h2>
          <button onClick={reset} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-brand-600">
            <RotateCcw className="w-3.5 h-3.5" /> 重新測試
          </button>
        </div>
        {results.length === 0 ? (
          <p className="text-center text-gray-500 py-10">暫時找不到符合的球拍，請聯絡客服</p>
        ) : (
          <div className="space-y-4">
            {results.map((p, i) => (
              <div key={p.id} className="border rounded-xl p-5 flex gap-4">
                <div className="w-8 h-8 bg-brand-600 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">{i + 1}</div>
                <div className="relative w-20 h-20 bg-gray-50 rounded-lg shrink-0 overflow-hidden">
                  {p.mainImage ? (
                    <Image src={p.mainImage} alt={p.name} fill className="object-contain p-1" />
                  ) : (
                    <div className="flex items-center justify-center h-full text-2xl">🏓</div>
                  )}
                </div>
                <div className="flex-1">
                  <p className="text-xs text-gray-500">{p.brandName}</p>
                  <p className="font-bold text-gray-900">{p.name}</p>
                  <p className="text-brand-700 font-bold text-sm mt-0.5">{formatPrice(p.salePrice ?? p.price)}</p>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">{p.reason}</p>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {p.suitableFor.map((tag) => (
                      <span key={tag} className="text-[10px] bg-brand-50 text-brand-700 px-2 py-0.5 rounded-full">
                        {SUITABLE_FOR_LABELS[tag] ?? tag}
                      </span>
                    ))}
                  </div>
                  <Link href={`/products/${p.slug}`} className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700">
                    查看詳情 <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  const q = questions[currentQ];
  const progress = (currentQ / questions.length) * 100;

  return (
    <div>
      <div className="mb-8">
        <div className="flex justify-between text-xs text-gray-500 mb-2">
          <span>問題 {currentQ + 1}/{questions.length}</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-brand-500 rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <h2 className="text-xl font-bold text-gray-900 mb-6">{q.question}</h2>
      <div className="space-y-3">
        {q.options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => answer(q.id, opt.value)}
            className="w-full text-left p-4 border rounded-xl hover:border-[#1F6B4F] hover:bg-brand-50 transition-all group"
          >
            <div className="font-medium text-gray-900 group-hover:text-brand-700">{opt.label}</div>
            <div className="text-sm text-gray-500 mt-0.5">{opt.desc}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
