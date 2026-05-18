import Link from "next/link";

import { AppShell } from "@/components/app-shell";
import { BackendUnavailablePage } from "@/components/backend-unavailable-page";
import { StatusBadge } from "@/components/status-badge";
import { getEquipmentItems, isBackendUnavailableError } from "@/lib/api";
import { EquipmentItem } from "@/lib/equipment";

export const dynamic = "force-dynamic";

export default async function ItemsPage() {
  let equipmentItems: EquipmentItem[];

  try {
    equipmentItems = await getEquipmentItems();
  } catch (error) {
    if (isBackendUnavailableError(error)) {
      return <BackendUnavailablePage />;
    }
    throw error;
  }

  return (
    <AppShell
      title="備品一覧"
      description="空き状況を確認しながら、ノートPCやモニタの詳細画面へ移動できます。"
    >
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {equipmentItems.map((item) => (
          <article
            key={item.id}
            className="rounded-[28px] border border-white/60 bg-[var(--surface-strong)] p-6 shadow-[var(--shadow)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-slate-500">{item.category}</p>
                <h2 className="mt-2 text-xl font-semibold text-slate-900">{item.name}</h2>
              </div>
              <StatusBadge status={item.status} />
            </div>

            <dl className="mt-6 space-y-3 text-sm text-slate-600">
              <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3">
                <dt>保管場所</dt>
                <dd className="font-medium text-slate-900">{item.location}</dd>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 px-4 py-3">
                <dt>予約期間</dt>
                <dd className="font-medium text-slate-900">{item.reservationPeriod}</dd>
              </div>
              <div className="rounded-2xl bg-slate-50 px-4 py-3">
                <dt>スペック</dt>
                <dd className="mt-2 text-slate-900">{item.specs.join(" / ")}</dd>
              </div>
            </dl>

            <div className="mt-6 flex gap-3">
              <Link
                href={`/items/${item.id}`}
                className="flex-1 rounded-full bg-slate-950 px-4 py-3 text-center text-sm font-semibold text-slate-50 transition hover:bg-slate-800"
              >
                詳細を見る
              </Link>
              <Link
                href={`/request?item=${item.id}`}
                className="rounded-full border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-slate-400"
              >
                申請
              </Link>
            </div>
          </article>
        ))}
      </section>
    </AppShell>
  );
}