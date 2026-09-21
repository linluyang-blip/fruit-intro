import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper text-ink">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:grid-cols-2 sm:px-8 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div className="flex flex-col gap-4">
          <span className="font-serif text-xl font-bold">寶島鮮果</span>
          <p className="max-w-xs text-sm leading-7 text-ink-soft">
            從屏東的芒果田到梨山的高冷果園，把台灣一整年的當季鮮果，
            直送到你手上。
          </p>
          <div className="flex gap-5 pt-1 text-xs uppercase tracking-[0.15em] text-ink-soft">
            <a href="#" className="border-b border-transparent transition hover:border-terracotta hover:text-terracotta">
              Facebook
            </a>
            <a href="#" className="border-b border-transparent transition hover:border-terracotta hover:text-terracotta">
              Instagram
            </a>
            <a href="#" className="border-b border-transparent transition hover:border-terracotta hover:text-terracotta">
              Line
            </a>
          </div>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-terracotta-deep">探索</div>
          <ul className="mt-5 space-y-3 text-sm text-ink-soft">
            <li>
              <Link href="/#fruits" className="transition hover:text-ink">當季水果</Link>
            </li>
            <li>
              <Link href="/#seasons" className="transition hover:text-ink">產季月曆</Link>
            </li>
            <li>
              <Link href="/#about" className="transition hover:text-ink">關於寶島</Link>
            </li>
            <li>
              <Link href="/blog" className="transition hover:text-ink">產地筆記</Link>
            </li>
            <li>
              <Link href="/game" className="transition hover:text-ink">接水果小遊戲</Link>
            </li>
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-terracotta-deep">服務</div>
          <ul className="mt-5 space-y-3 text-sm text-ink-soft">
            <li>
              <Link href="/#contact" className="transition hover:text-ink">訂閱通知</Link>
            </li>
            <li>
              <a href="#" className="transition hover:text-ink">產地小農合作</a>
            </li>
            <li>
              <a href="#" className="transition hover:text-ink">常見問題</a>
            </li>
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-terracotta-deep">聯絡方式</div>
          <ul className="mt-5 space-y-3 text-sm text-ink-soft">
            <li>service@baodao-fruit.tw</li>
            <li>0800-000-000</li>
            <li>台灣．屏東</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-6 py-6 text-xs text-ink-soft sm:flex-row sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} 寶島鮮果 · 本站為練習用示範網站，內容僅供參考。</p>
          <div className="flex gap-6">
            <a href="#" className="transition hover:text-ink">隱私權政策</a>
            <a href="#" className="transition hover:text-ink">服務條款</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
