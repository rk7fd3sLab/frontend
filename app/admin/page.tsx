import { AppShell } from "@/components/app-shell";
import { BackendUnavailablePage } from "@/components/backend-unavailable-page";
import { StatusBadge } from "@/components/status-badge";
import { getActiveLoans, isBackendUnavailableError } from "@/lib/api";
import { EquipmentItem } from "@/lib/equipment";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  let activeLoans: EquipmentItem[];

  try {
    activeLoans = await getActiveLoans();
  } catch (error) {
    if (isBackendUnavailableError(error)) {
      return <BackendUnavailablePage />;
    }
    throw error;
  }

  return (
    <AppShell
      title="管理画面（返却処理）"
      description="貸出中または予約済みの備品を一覧し、返却処理の導線をまとめています。"
    >
      <section className="rounded-[28px] border border-white/60 bg-[var(--surface-strong)] p-6 shadow-[var(--shadow)] md:p-8">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
              Return Control
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-900">
              返却処理待ちの備品
            </h2>
          </div>
          <div className="rounded-2xl bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
            未返却 {activeLoans.length} 件
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-3 text-left text-sm text-slate-700">
            <thead>
              <tr className="text-slate-500">
                <th className="px-4 py-2">備品名</th>
                <th className="px-4 py-2">利用者</th>
                <th className="px-4 py-2">期間</th>
                <th className="px-4 py-2">状態</th>
                <th className="px-4 py-2">操作</th>
              </tr>
            </thead>
            <tbody>
              {activeLoans.map((item) => (
                <tr key={item.id} className="rounded-2xl bg-slate-50">
                  <td className="rounded-l-2xl px-4 py-4 font-medium text-slate-900">
                    {item.name}
                  </td>
                  <td className="px-4 py-4">{item.assignee ?? item.requestedBy}</td>
                  <td className="px-4 py-4">{item.reservationPeriod}</td>
                  <td className="px-4 py-4">
                    <StatusBadge status={item.status} />
                  </td>
                  <td className="rounded-r-2xl px-4 py-4">
                    <button className="rounded-full bg-emerald-700 px-4 py-2 text-sm font-semibold text-slate-50 transition hover:bg-emerald-800">
                      返却ボタン
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </AppShell>
  );
}