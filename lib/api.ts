import { EquipmentItem, InventoryStat, SampleUser } from "@/lib/equipment";
import {
  BackendUnavailableError,
  isBackendUnavailableError,
} from "@/lib/backend-error";

export { isBackendUnavailableError };

const BACKEND_API_BASE_URL = process.env.BACKEND_API_BASE_URL ?? "http://localhost:4000";

function createBackendUnavailableError(path: string, cause?: unknown) {
  return new BackendUnavailableError(path, cause);
}

console.log("Using backend API base URL:", BACKEND_API_BASE_URL);

async function fetchFromBackend<T>(path: string): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${BACKEND_API_BASE_URL}${path}`, {
      cache: "no-store",
    });
  } catch (error) {
    throw createBackendUnavailableError(path, error);
  }

  if (!response.ok) {
    throw new Error(`Backend request failed: ${path} (${response.status})`);
  }

  // 204や空ボディの場合はnullを返す
  if (response.status === 204) {
    return null as T;
  }
  const text = await response.text();
  if (!text) {
    return null as T;
  }
  return JSON.parse(text) as T;
}

export async function getSampleUser() {
  return fetchFromBackend<SampleUser>("/api/user");
}

export async function getInventoryStats() {
  return fetchFromBackend<InventoryStat[]>("/api/stats");
}

export async function getEquipmentItems() {
  return fetchFromBackend<EquipmentItem[]>("/api/equipment");
}

export async function getEquipmentById(id: string) {
  let response: Response;

  try {
    response = await fetch(`${BACKEND_API_BASE_URL}/api/equipment/${id}`, {
      cache: "no-store",
    });
  } catch (error) {
    throw createBackendUnavailableError(`/api/equipment/${id}`, error);
  }

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Backend request failed: /api/equipment/${id} (${response.status})`);
  }

  return (await response.json()) as EquipmentItem;
}

export async function getActiveLoans() {
  return fetchFromBackend<EquipmentItem[]>("/api/active-loans");
}