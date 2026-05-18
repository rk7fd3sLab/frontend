import Link from "next/link";
import { ReactNode } from "react";

const navigationItems = [
  { href: "/", label: "ログイン" },
  { href: "/items", label: "備品一覧" },
  { href: "/request", label: "貸出申請" },
  { href: "/admin", label: "管理画面" },
];

export function AppShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-6 md:px-6 lg:px-8">
      <header className="mb-6 rounded-[28px] border border-white/50 bg-[var(--surface)] px-5 py-4 shadow-[var(--shadow)] backdrop-blur md:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
              Equipment Loan App
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-slate-900 md:text-3xl">
              {title}
            </h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 md:text-base">
              {description}
            </p>
          </div>
          <nav className="flex flex-wrap gap-2">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <div className="flex-1">{children}</div>
    </div>
  );
}