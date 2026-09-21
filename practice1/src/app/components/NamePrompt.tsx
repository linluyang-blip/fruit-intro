"use client";

import { useState, useSyncExternalStore, type FormEvent } from "react";
import { useVisitorName } from "./VisitorNameContext";

const noopSubscribe = () => () => {};

function useHasMounted() {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false
  );
}

export default function NamePrompt() {
  const { name, setName } = useVisitorName();
  const [value, setValue] = useState("");
  const mounted = useHasMounted();

  if (!mounted || name) return null;

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!value.trim()) return;
    setName(value);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 px-6 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-label="輸入您的稱呼"
        className="w-full max-w-sm border border-line bg-cream p-8 text-center shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]"
      >
        <span className="text-xs uppercase tracking-[0.3em] text-terracotta-deep">
          Welcome
        </span>
        <h2 className="mt-4 font-serif text-2xl font-bold tracking-tight">
          歡迎光臨寶島鮮果
        </h2>
        <p className="mt-3 text-sm leading-7 text-ink-soft">
          請問怎麼稱呼您？讓我們好好招呼您逛逛當季水果。
        </p>
        <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="輸入您的稱呼"
            maxLength={20}
            autoFocus
            className="border-b border-line bg-transparent py-2 text-center text-sm text-ink outline-none placeholder:text-ink-soft/60 focus:border-terracotta"
          />
          <button
            type="submit"
            disabled={!value.trim()}
            className="w-full border border-ink bg-ink px-6 py-3 text-sm font-medium tracking-wide text-cream transition hover:bg-terracotta hover:border-terracotta disabled:cursor-not-allowed disabled:opacity-40"
          >
            開始逛逛
          </button>
          <button
            type="button"
            onClick={() => setName("訪客")}
            className="text-xs text-ink-soft transition hover:text-terracotta-deep"
          >
            先不填，直接逛逛
          </button>
        </form>
      </div>
    </div>
  );
}
