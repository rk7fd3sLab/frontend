import { EquipmentStatus, statusClassNameMap, statusLabelMap } from "@/lib/equipment";

export function StatusBadge({ status }: { status: EquipmentStatus }) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${statusClassNameMap[status]}`}
    >
      {statusLabelMap[status]}
    </span>
  );
}