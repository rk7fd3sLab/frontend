import Link from "next/link";

import { AppShell } from "@/components/app-shell";
import { getEquipmentById, getEquipmentItems, getSampleUser } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function RequestPage({
  searchParams,
}: {
  searchParams: Promise<{ item?: string }>;
}) {
  const { item: itemId } = await searchParams;
  const sampleUser = await getSampleUser();

  let selectedItem = await getEquipmentById(itemId ?? "eq-001");
  if (!selectedItem) {
    const equipmentItems = await getEquipmentItems();
    selectedItem = equipmentItems[0] ?? null;
  }

  return (
    <AppShell
      title="貸出申請"
      description="利用目的と期間を確認し、申請内容をそのまま管理者レビューへ渡します。"
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <section className="rounded-[28px] border border-white/60 bg-[var(--surface-strong)] p-8 shadow-[var(--shadow)]">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-600">申請者</span>
              <input
                readOnly
                value={sampleUser.name}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-600">社員番号</span>
              <input
                readOnly
                value={sampleUser.employeeId}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
              />
            </label>
            <label className="space-y-2 md:col-span-2">
              <span className="text-sm font-medium text-slate-600">対象備品</span>
              <input
                readOnly
                value={selectedItem?.name ?? "備品未選択"}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-600">利用開始日</span>
              <input
                readOnly
                value="2026-05-10"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
              />
            </label>
            <label className="space-y-2">
              <span className="text-sm font-medium text-slate-600">返却予定日</span>
              <input
                readOnly
                value="2026-05-15"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
              />
            </label>
            <label className="space-y-2 md:col-span-2">
              <span className="text-sm font-medium text-slate-600">利用目的</span>
              <textarea
                readOnly
                value="客先での検証作業およびプレゼンテーション用。会議室で外部ディスプレイ接続を予定。"
                className="min-h-32 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3"
              />
            </label>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button className="rounded-full bg-blue-800 px-6 py-3 text-sm font-semibold text-slate-50 transition hover:bg-blue-950">
              申請を送信
            </button>
            <Link
              href={selectedItem ? `/items/${selectedItem.id}` : "/items"}
              className="rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
            >
              詳細へ戻る
            </Link>
          </div>
        </section>

        <aside className="rounded-[28px] border border-white/60 bg-white/90 p-8 shadow-[var(--shadow)]">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
            申請サマリー
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900">
            {selectedItem?.category ?? "未選択"} / {selectedItem?.name ?? "備品未選択"}
          </h2>
          <p className="mt-4 text-sm leading-7 text-slate-600">
            申請後は管理画面に即時反映され、返却ボタンで備品ステータスを空きへ戻す想定です。
          </p>

          <div className="mt-6 space-y-3 rounded-3xl bg-slate-50 p-5 text-sm text-slate-700">
            <p>利用部署: {sampleUser.department}</p>
            <p>貸出場所: {selectedItem?.location ?? "未設定"}</p>
            <p>付属品: 電源アダプタ / HDMI ケーブル / キャリングケース</p>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}