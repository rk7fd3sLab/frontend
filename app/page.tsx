import Link from "next/link";

import { BackendUnavailablePage } from "@/components/backend-unavailable-page";
import type { InventoryStat, SampleUser } from "@/lib/equipment";
import { getInventoryStats, getSampleUser, isBackendUnavailableError } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [inventoryStatsResult, sampleUserResult] = await Promise.allSettled([
    getInventoryStats(),
    getSampleUser(),
  ]);


  const results = [inventoryStatsResult, sampleUserResult];
  const rejectedResults = results.filter(
    (result): result is PromiseRejectedResult => result.status === "rejected"
  );

  if (rejectedResults.length > 0) {
    // 1つでも isBackendUnavailableError でないものがあれば throw
    const nonBackendUnavailable = rejectedResults.find(
      (result) => !isBackendUnavailableError(result.reason)
    );
    if (nonBackendUnavailable) {
      throw nonBackendUnavailable.reason;
    }
    // すべて isBackendUnavailableError なら fallback
    return <BackendUnavailablePage />;
  }

  if (
    inventoryStatsResult.status !== "fulfilled" ||
    sampleUserResult.status !== "fulfilled"
  ) {
    throw new Error("Unexpected unsettled result state.");
  }

  const inventoryStats: InventoryStat[] = inventoryStatsResult.value;
  const sampleUser: SampleUser = sampleUserResult.value;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-center px-6 py-10 text-slate-800 lg:px-10">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[32px] border border-white/50 bg-[var(--surface)] p-8 shadow-[var(--shadow)] backdrop-blur md:p-10">
          <div className="mb-10 inline-flex rounded-full border border-blue-200 bg-blue-50 px-4 py-1 text-sm font-medium text-blue-900">
            社内備品貸出ポータル
          </div>
          <div className="space-y-5">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">
              Login
            </p>
            <h1 className="max-w-xl text-4xl font-semibold leading-tight md:text-5xl">
              ノートPCやモニタの予約から返却までを、ひとつの画面導線で管理。
            </h1>
            <p className="max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
              社員向けの備品一覧、貸出申請、管理者による返却処理までを確認できるサンプル実装です。
              サンプルデータを含んでいるため、画面遷移だけですぐに確認できます。
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {inventoryStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-[var(--line)] bg-white/80 p-4"
              >
                <p className="text-sm text-slate-500">{stat.label}</p>
                <p className="mt-3 text-3xl font-semibold text-slate-900">{stat.value}</p>
                <p className="mt-2 text-sm text-slate-600">{stat.caption}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/items"
              className="rounded-full bg-blue-800 px-6 py-3 text-sm font-semibold text-slate-50 transition hover:bg-blue-950"
            >
              デモを開始
            </Link>
            <Link
              href="/admin"
              className="rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
            >
              管理画面を見る
            </Link>
          </div>
        </section>

        <section className="rounded-[32px] border border-white/60 bg-[var(--surface-strong)] p-8 shadow-[var(--shadow)]">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">サンプルログイン</p>
              <h2 className="mt-1 text-2xl font-semibold text-slate-900">社員アカウント</h2>
            </div>
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
              Active
            </span>
          </div>

          <form className="space-y-4">
            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-600">社員番号</span>
              <input
                readOnly
                value={sampleUser.employeeId}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none"
              />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-600">氏名</span>
              <input
                readOnly
                value={sampleUser.name}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none"
              />
            </label>
            <label className="block space-y-2">
              <span className="text-sm font-medium text-slate-600">部門</span>
              <input
                readOnly
                value={sampleUser.department}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 outline-none"
              />
            </label>
            <Link
              href="/items"
              className="mt-4 flex w-full items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 font-semibold text-slate-50 transition hover:bg-slate-800"
            >
              ログインして備品一覧へ
            </Link>
          </form>

          <div className="mt-8 rounded-3xl bg-slate-900 p-6 text-slate-50">
            <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
              今日の予約状況
            </p>
            <p className="mt-3 text-3xl font-semibold">12件の貸出予約</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              午前の返却処理は 3 件未完了です。管理者画面から返却ボタンでステータスを更新できます。
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
