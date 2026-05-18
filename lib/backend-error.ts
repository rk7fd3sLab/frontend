export const BACKEND_UNAVAILABLE_ERROR_CODE = "BACKEND_UNAVAILABLE";

export class BackendUnavailableError extends Error {
  readonly code = BACKEND_UNAVAILABLE_ERROR_CODE;
  readonly path: string;

  constructor(path: string, cause?: unknown) {
    super(`Backend unavailable: ${path}`);
    this.name = "BackendUnavailableError";
    this.path = path;
    if (cause) {
      (this as Error & { cause?: unknown }).cause = cause;
    }
  }
}

/**
 * Type guard that works on both the server (direct instanceof check) and on
 * the client-side error boundary (Next.js preserves `name` across the
 * server→client serialization boundary).
 */
export function isBackendUnavailableError(
  error: unknown,
): error is BackendUnavailableError {
  return (
    error instanceof BackendUnavailableError ||
    (error instanceof Error && error.name === "BackendUnavailableError")
  );
}
