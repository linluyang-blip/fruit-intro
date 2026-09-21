"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useVisitorName } from "./VisitorNameContext";

const navLinks = [
  { href: "/#fruits", label: "當季水果" },
  { href: "/#seasons", label: "產季月曆" },
  { href: "/#about", label: "關於寶島" },
  { href: "/blog", label: "產地筆記" },
  { href: "/game", label: "小遊戲" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { name, clearName } = useVisitorName();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-shadow duration-300 ${
        scrolled ? "shadow-[0_8px_24px_-12px_rgba(0,0,0,0.45)]" : ""
      }`}
    >
      <div className="border-b border-terracotta-deep/40 bg-forest text-cream">
        <div className="relative mx-auto flex max-w-6xl items-center justify-between px-6 py-4 sm:px-8">
          <Link href="/" className="flex items-baseline gap-2">
            <span className="font-serif text-xl font-bold tracking-tight">
              寶島鮮果
            </span>
            <span className="hidden text-[11px] uppercase tracking-[0.2em] text-cream/50 sm:inline">
              Est. Taiwan
            </span>
          </Link>

          <nav className="hidden gap-10 text-sm md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative py-1 tracking-wide text-cream/80 transition hover:text-cream"
              >
                {link.label}
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-terracotta transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {name && (
              <span className="hidden items-center gap-2 text-xs tracking-wide text-cream/70 lg:flex">
                嗨，{name} 👋
                <button
                  type="button"
                  onClick={clearName}
                  className="text-cream/50 underline-offset-2 transition hover:text-terracotta hover:underline"
                >
                  登出
                </button>
              </span>
            )}
            <Link
              href="/#contact"
              className="hidden border border-cream/30 px-4 py-1.5 text-sm tracking-wide transition hover:border-terracotta hover:text-terracotta md:inline-block"
            >
              聯絡我們
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label="開啟選單"
              className="grid h-9 w-9 place-items-center border border-cream/30 text-base md:hidden"
            >
              {open ? "✕" : "☰"}
            </button>
          </div>

          {open && (
            <nav className="absolute left-0 right-0 top-full z-20 flex flex-col border-t border-cream/10 bg-forest text-sm text-cream/85 md:hidden">
              {name && (
                <span className="flex items-center justify-between border-b border-cream/10 px-6 py-3 text-xs text-cream/70">
                  嗨，{name} 👋
                  <button
                    type="button"
                    onClick={() => {
                      clearName();
                      setOpen(false);
                    }}
                    className="text-cream/50 underline-offset-2 transition hover:text-terracotta hover:underline"
                  >
                    登出
                  </button>
                </span>
              )}
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-cream/10 px-6 py-3 transition hover:bg-forest-deep hover:text-cream"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/#contact"
                onClick={() => setOpen(false)}
                className="px-6 py-3 text-terracotta"
              >
                聯絡我們
              </Link>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}
