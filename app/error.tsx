"use client";

import { useEffect } from "react";

import { isBackendUnavailableError } from "@/lib/api";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  if (isBackendUnavailableError(error)) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-3xl items-center px-6 py-16">
        <section className="w-full rounded-[28px] border border-red-100 bg-white p-8 text-slate-800 shadow-[var(--shadow)] md:p-10">
          <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">
            現在、ページの表示処理に問題があります。
          </h1>
          <p className="mt-4 text-base leading-8 text-slate-600">
            しばらくお待ちいただき、再度アクセスをお願いいたします。
          </p>
          <button
            type="button"
            onClick={() => reset()}
            className="mt-8 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-slate-50 transition hover:bg-slate-700"
          >
            再読み込み
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl items-center px-6 py-16">
      <section className="w-full rounded-[28px] border border-slate-200 bg-white p-8 text-slate-800 shadow-[var(--shadow)] md:p-10">
        <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">エラーが発生しました</h1>
        <p className="mt-4 text-base leading-8 text-slate-600">
          しばらく時間をおいてから再度お試しください。
        </p>
        <button
          type="button"
          onClick={() => reset()}
          className="mt-8 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-slate-50 transition hover:bg-slate-700"
        >
          再読み込み
        </button>
      </section>
    </main>
  );
}
