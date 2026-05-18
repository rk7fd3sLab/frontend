type BackendUnavailablePageProps = {
  title?: string;
};

export function BackendUnavailablePage({
  title = "現在、ページの表示処理に問題があります。",
}: BackendUnavailablePageProps) {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl items-center px-6 py-16">
      <section className="w-full rounded-[28px] border border-red-100 bg-white p-8 text-slate-800 shadow-[var(--shadow)] md:p-10">
        <h1 className="text-2xl font-semibold text-slate-900 md:text-3xl">{title}</h1>
        <p className="mt-4 text-base leading-8 text-slate-600">
          しばらくお待ちいただき、再度アクセスをお願いいたします。
        </p>
      </section>
    </main>
  );
}
