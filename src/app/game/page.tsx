import type { Metadata } from "next";
import SiteHeader from "../components/SiteHeader";
import SiteFooter from "../components/SiteFooter";
import Parallax from "../components/Parallax";
import CatchGame from "../components/CatchGame";

export const metadata: Metadata = {
  title: "接水果小遊戲 · 寶島鮮果",
  description: "15 秒限時接水果小遊戲，純粹娛樂放鬆一下，順便認識我們家的當季水果表情符號。",
};

export default function GamePage() {
  return (
    <>
      <SiteHeader />

      <main>
        <section className="relative overflow-x-hidden px-6 py-20 sm:px-8 sm:py-28">
          <Parallax
            speed={0.12}
            className="pointer-events-none absolute -left-24 top-0 -z-10 h-72 w-72 rounded-full bg-terracotta/15 blur-3xl"
          />
          <Parallax
            speed={-0.14}
            className="pointer-events-none absolute -right-16 top-24 -z-10 h-80 w-80 rounded-full bg-forest/15 blur-3xl"
          />
          <div className="mx-auto flex max-w-3xl flex-col gap-5 text-center">
            <span className="mx-auto text-xs uppercase tracking-[0.3em] text-terracotta-deep">
              Just for Fun
            </span>
            <h1 className="font-serif text-4xl font-bold leading-[1.2] tracking-tight sm:text-5xl">
              接水果小遊戲
            </h1>
            <p className="text-lg leading-8 text-ink-soft">
              逛累了嗎？花 15 秒接接水果，純粹娛樂放鬆一下。
            </p>
          </div>
        </section>

        <section className="border-t border-line bg-paper px-6 py-16 sm:px-8 sm:py-20">
          <CatchGame />
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
