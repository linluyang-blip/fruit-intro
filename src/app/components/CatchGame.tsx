"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";

const GAME_SECONDS = 15;
const BEST_SCORE_KEY = "baodao-catch-best-score";
const FRUITS = ["🥭", "🍍", "🍈", "🍎", "🌸", "🍇", "🍊", "🍑"];
const BASKET_Y = 90;
const CATCH_X_RADIUS = 10;
const CATCH_Y_RADIUS = 8;

const bestListeners = new Set<() => void>();

function emitBestChange() {
  for (const listener of bestListeners) listener();
}

function subscribeBest(listener: () => void) {
  bestListeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    bestListeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

function getBestSnapshot() {
  try {
    return window.localStorage.getItem(BEST_SCORE_KEY) ?? "0";
  } catch {
    return "0";
  }
}

function getServerBestSnapshot() {
  return "0";
}

function commitBest(newScore: number) {
  try {
    const stored = Number(window.localStorage.getItem(BEST_SCORE_KEY)) || 0;
    if (newScore > stored) {
      window.localStorage.setItem(BEST_SCORE_KEY, String(newScore));
      emitBestChange();
    }
  } catch {
    // localStorage unavailable (e.g. private browsing)
  }
}

type Phase = "idle" | "playing" | "over";

type FallingFruit = {
  id: number;
  x: number;
  y: number;
  speed: number;
  emoji: string;
};

let nextFruitId = 0;

export default function CatchGame() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [score, setScore] = useState(0);
  const best = Number(
    useSyncExternalStore(subscribeBest, getBestSnapshot, getServerBestSnapshot)
  ) || 0;
  const [timeLeft, setTimeLeft] = useState(GAME_SECONDS);
  const [basketX, setBasketX] = useState(50);
  const [fruits, setFruits] = useState<FallingFruit[]>([]);

  const areaRef = useRef<HTMLDivElement>(null);
  const basketXRef = useRef(50);
  const rafRef = useRef<number | null>(null);
  const spawnTimerRef = useRef(0);

  const moveBasketTo = useCallback((clientX: number) => {
    const area = areaRef.current;
    if (!area) return;
    const rect = area.getBoundingClientRect();
    const percent = ((clientX - rect.left) / rect.width) * 100;
    const clamped = Math.min(95, Math.max(5, percent));
    basketXRef.current = clamped;
    setBasketX(clamped);
  }, []);

  useEffect(() => {
    if (phase !== "playing") return;

    let lastTime: number | null = null;
    let elapsed = 0;
    let currentScore = 0;
    let currentFruits: FallingFruit[] = [];

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        basketXRef.current = Math.max(5, basketXRef.current - 6);
        setBasketX(basketXRef.current);
      } else if (e.key === "ArrowRight") {
        basketXRef.current = Math.min(95, basketXRef.current + 6);
        setBasketX(basketXRef.current);
      }
    };
    window.addEventListener("keydown", onKeyDown);

    const tick = (timestamp: number) => {
      if (lastTime === null) lastTime = timestamp;
      const dt = (timestamp - lastTime) / 1000;
      lastTime = timestamp;
      elapsed += dt;

      const remaining = GAME_SECONDS - elapsed;
      setTimeLeft(Math.max(0, remaining));

      if (remaining <= 0) {
        setFruits([]);
        setPhase("over");
        commitBest(currentScore);
        return;
      }

      spawnTimerRef.current -= dt;
      if (spawnTimerRef.current <= 0) {
        const interval = Math.max(0.4, 0.95 - elapsed * 0.025);
        spawnTimerRef.current = interval + Math.random() * 0.3;
        currentFruits = [
          ...currentFruits,
          {
            id: nextFruitId++,
            x: 8 + Math.random() * 84,
            y: -8,
            speed: 26 + Math.random() * 18,
            emoji: FRUITS[Math.floor(Math.random() * FRUITS.length)],
          },
        ];
      }

      const survivors: FallingFruit[] = [];
      for (const fruit of currentFruits) {
        const nextY = fruit.y + fruit.speed * dt;
        const dx = Math.abs(fruit.x - basketXRef.current);
        const dy = Math.abs(nextY - BASKET_Y);

        if (nextY >= 60 && dx < CATCH_X_RADIUS && dy < CATCH_Y_RADIUS) {
          currentScore += 1;
          setScore(currentScore);
          continue;
        }
        if (nextY > 108) continue;

        survivors.push({ ...fruit, y: nextY });
      }
      currentFruits = survivors;
      setFruits(currentFruits);

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [phase]);

  function startGame() {
    basketXRef.current = 50;
    spawnTimerRef.current = 0.3;
    setBasketX(50);
    setScore(0);
    setTimeLeft(GAME_SECONDS);
    setFruits([]);
    setPhase("playing");
  }

  return (
    <div className="mx-auto max-w-2xl">
      {phase === "playing" && (
        <div className="mb-4 flex items-center justify-between text-sm font-medium tracking-wide text-ink-soft">
          <span>⏱ 剩餘 {Math.ceil(timeLeft)} 秒</span>
          <span>🧺 得分：{score}</span>
        </div>
      )}

      <div
        ref={areaRef}
        onPointerMove={(e) => phase === "playing" && moveBasketTo(e.clientX)}
        onTouchMove={(e) => {
          if (phase !== "playing") return;
          e.preventDefault();
          moveBasketTo(e.touches[0].clientX);
        }}
        className="relative h-[420px] w-full touch-none overflow-hidden border border-line bg-gradient-to-b from-forest/15 via-cream to-paper select-none sm:h-[480px]"
      >
        {phase !== "playing" &&
          fruits.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center px-6">
              {phase === "idle" && (
                <div className="text-center">
                  <span className="text-xs uppercase tracking-[0.3em] text-terracotta-deep">
                    Mini Game
                  </span>
                  <h3 className="mt-4 font-serif text-2xl font-bold tracking-tight">
                    接水果小遊戲
                  </h3>
                  <p className="mx-auto mt-3 max-w-xs text-sm leading-7 text-ink-soft">
                    水果會從天而降，移動籃子接住它們，
                    15 秒內看你能接到幾顆！
                  </p>
                  {best > 0 && (
                    <p className="mt-3 text-xs text-terracotta-deep">
                      🏆 最佳紀錄：{best} 顆
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={startGame}
                    className="mt-6 border border-ink bg-ink px-6 py-3 text-sm font-medium tracking-wide text-cream transition hover:bg-terracotta hover:border-terracotta"
                  >
                    開始遊戲
                  </button>
                </div>
              )}

              {phase === "over" && (
                <div className="text-center">
                  <div className="text-4xl">
                    {score > 0 ? "🎉" : "🍃"}
                  </div>
                  <h3 className="mt-2 font-serif text-2xl font-bold tracking-tight">
                    時間到！
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-ink-soft">
                    這次接到了 <span className="font-bold text-terracotta">{score}</span> 顆水果
                  </p>
                  <p className="mt-1 text-xs text-terracotta-deep">
                    🏆 最佳紀錄：{best} 顆
                  </p>
                  <button
                    type="button"
                    onClick={startGame}
                    className="mt-6 border border-ink bg-ink px-6 py-3 text-sm font-medium tracking-wide text-cream transition hover:bg-terracotta hover:border-terracotta"
                  >
                    再玩一次
                  </button>
                </div>
              )}
            </div>
          )}

        {phase === "playing" &&
          fruits.map((fruit) => (
            <span
              key={fruit.id}
              className="absolute text-3xl leading-none"
              style={{
                left: `${fruit.x}%`,
                top: `${fruit.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              aria-hidden
            >
              {fruit.emoji}
            </span>
          ))}

        {phase === "playing" && (
          <span
            className="absolute text-5xl leading-none"
            style={{
              left: `${basketX}%`,
              top: `${BASKET_Y}%`,
              transform: "translate(-50%, -50%)",
            }}
            aria-hidden
          >
            🧺
          </span>
        )}
      </div>

      <p className="mt-4 text-center text-xs text-ink-soft">
        移動滑鼠、手指拖曳，或用鍵盤左右鍵操作籃子。
      </p>
    </div>
  );
}
