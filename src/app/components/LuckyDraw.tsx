"use client";

import { useEffect, useState } from "react";

type Phase = "idle" | "drawing" | "result";

const WIN_RATE = 0.1;

function generateCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return `FRUIT9-${code}`;
}

export default function LuckyDraw() {
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [win, setWin] = useState(false);
  const [code, setCode] = useState("");

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function openModal() {
    setPhase("idle");
    setOpen(true);
  }

  function draw() {
    setPhase("drawing");
    window.setTimeout(() => {
      const isWin = Math.random() < WIN_RATE;
      setWin(isWin);
      setCode(isWin ? generateCode() : "");
      setPhase("result");
    }, 900);
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full border border-terracotta-deep/40 bg-terracotta px-5 py-3 text-sm font-medium tracking-wide text-cream shadow-[0_12px_30px_-10px_rgba(0,0,0,0.5)] transition hover:-translate-y-0.5 hover:bg-terracotta-deep"
      >
        <span aria-hidden>🎁</span>
        抽優惠券
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/60 px-6 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="水果優惠券抽獎"
            className="w-full max-w-sm border border-line bg-cream p-8 text-center shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs uppercase tracking-[0.3em] text-terracotta-deep">
                Lucky Draw
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="關閉"
                className="text-ink-soft transition hover:text-ink"
              >
                ✕
              </button>
            </div>

            {phase !== "result" && (
              <>
                <h3 className="mt-4 font-serif text-2xl font-bold tracking-tight">
                  水果優惠券抽獎
                </h3>
                <p className="mt-3 text-sm leading-7 text-ink-soft">
                  按下按鈕試試手氣，10% 機率抽中全站水果 9 折優惠券！
                </p>
                <button
                  type="button"
                  onClick={draw}
                  disabled={phase === "drawing"}
                  className="mt-6 w-full border border-ink bg-ink px-6 py-3 text-sm font-medium tracking-wide text-cream transition hover:bg-terracotta hover:border-terracotta disabled:opacity-60"
                >
                  {phase === "drawing" ? "抽獎中…" : "開始抽獎"}
                </button>
              </>
            )}

            {phase === "result" &&
              (win ? (
                <>
                  <div className="mt-4 text-4xl">🎉</div>
                  <h3 className="mt-2 font-serif text-2xl font-bold tracking-tight text-terracotta">
                    恭喜中獎！
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-ink-soft">
                    獲得全站水果 9 折優惠券，結帳時輸入以下代碼：
                  </p>
                  <div className="mt-4 border border-dashed border-terracotta-deep/50 bg-paper px-4 py-3 font-mono text-lg tracking-widest text-terracotta-deep">
                    {code}
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="mt-6 w-full border border-ink bg-ink px-6 py-3 text-sm font-medium tracking-wide text-cream transition hover:bg-terracotta hover:border-terracotta"
                  >
                    太棒了
                  </button>
                </>
              ) : (
                <>
                  <div className="mt-4 text-4xl">🍃</div>
                  <h3 className="mt-2 font-serif text-2xl font-bold tracking-tight">
                    銘謝惠顧
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-ink-soft">
                    這次沒有中獎，別灰心，再試一次手氣吧！
                  </p>
                  <div className="mt-6 flex gap-3">
                    <button
                      type="button"
                      onClick={draw}
                      className="flex-1 border border-ink px-6 py-3 text-sm font-medium tracking-wide text-ink transition hover:border-terracotta hover:text-terracotta"
                    >
                      再抽一次
                    </button>
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="flex-1 border border-ink bg-ink px-6 py-3 text-sm font-medium tracking-wide text-cream transition hover:bg-terracotta hover:border-terracotta"
                    >
                      關閉
                    </button>
                  </div>
                </>
              ))}
          </div>
        </div>
      )}
    </>
  );
}
