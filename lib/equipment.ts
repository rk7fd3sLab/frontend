export type EquipmentStatus = "available" | "in_use" | "reserved";

export type EquipmentItem = {
  id: string;
  name: string;
  category: "ノートPC" | "モニタ" | "周辺機器";
  location: string;
  status: EquipmentStatus;
  assignee: string | null;
  requestedBy: string | null;
  reservationPeriod: string;
  specs: string[];
  note: string;
};

export type InventoryStat = {
  label: string;
  value: string;
  caption: string;
};

export type SampleUser = {
  employeeId: string;
  name: string;
  department: string;
};

export const statusLabelMap: Record<EquipmentStatus, string> = {
  available: "空き",
  in_use: "使用中",
  reserved: "予約済み",
};

export const statusClassNameMap: Record<EquipmentStatus, string> = {
  available: "bg-emerald-50 text-emerald-700 border-emerald-200",
  in_use: "bg-amber-50 text-amber-700 border-amber-200",
  reserved: "bg-blue-50 text-blue-700 border-blue-200",
};