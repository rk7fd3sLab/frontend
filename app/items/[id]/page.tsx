import Link from "next/link";
import { notFound } from "next/navigation";

import { AppShell } from "@/components/app-shell";
import { BackendUnavailablePage } from "@/components/backend-unavailable-page";
import { StatusBadge } from "@/components/status-badge";
import { getEquipmentById, isBackendUnavailableError } from "@/lib/api";
import { EquipmentItem } from "@/lib/equipment";

export const dynamic = "force-dynamic";

export default async function ItemDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  let item: EquipmentItem | null;

  try {
    item = await getEquipmentById(id);
  } catch (error) {
    if (isBackendUnavailableError(error)) {
      return <BackendUnavailablePage />;
    }
    throw error;
  }

  if (!item) {
    notFound();
  }

  return (
    <AppShell
      title="備品詳細"
      description="利用条件や保管情報を確認して、貸出申請へ進みます。"
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[28px] border border-white/60 bg-[var(--surface-strong)] p-8 shadow-[var(--shadow)]">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-sm text-slate-500">{item.category}</p>
              <h2 className="mt-2 text-3xl font-semibold text-slate-900">{item.name}</h2>
            </div>
            <StatusBadge status={item.status} />
          </div>

          <p className="mt-6 rounded-3xl bg-slate-50 p-5 text-sm leading-7 text-slate-700">
            {item.note}
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 p-5">
              <p className="text-sm text-slate-500">保管場所</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{item.location}</p>
            </div>
            <div className="rounded-3xl border border-slate-200 p-5">
              <p className="text-sm text-slate-500">予約期間</p>
              <p className="mt-2 text-lg font-semibold text-slate-900">{item.reservationPeriod}</p>
            </div>
            <div className="rounded-3xl border border-slate-200 p-5 md:col-span-2">
              <p className="text-sm text-slate-500">スペック</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {item.specs.map((spec) => (
                  <li
                    key={spec}
                    className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-800"
                  >
                    {spec}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <aside className="rounded-[28px] border border-white/60 bg-slate-900 p-8 text-slate-50 shadow-[var(--shadow)]">
          <p className="text-sm uppercase tracking-[0.24em] text-slate-400">
            利用状況
          </p>
          <dl className="mt-6 space-y-5 text-sm">
            <div>
              <dt className="text-slate-400">現在の利用者</dt>
              <dd className="mt-1 text-lg font-semibold text-white">
                {item.assignee ?? item.requestedBy ?? "未設定"}
              </dd>
            </div>
            <div>
              <dt className="text-slate-400">貸出ID</dt>
              <dd className="mt-1 text-lg font-semibold text-white">{item.id.toUpperCase()}</dd>
            </div>
            <div>
              <dt className="text-slate-400">返却時の確認</dt>
              <dd className="mt-1 leading-7 text-slate-200">
                本体、電源アダプタ、映像ケーブル、台座の有無を管理画面で確認します。
              </dd>
            </div>
          </dl>

          <div className="mt-8 flex flex-col gap-3">
            <Link
              href={`/request?item=${item.id}`}
              className="rounded-full bg-[var(--accent)] px-5 py-3 text-center font-semibold text-slate-900 transition hover:brightness-95"
            >
              この備品を申請する
            </Link>
            <Link
              href="/items"
              className="rounded-full border border-slate-700 px-5 py-3 text-center font-semibold text-slate-100 transition hover:bg-slate-800"
            >
              一覧へ戻る
            </Link>
          </div>
        </aside>
      </div>
    </AppShell>
  );
}